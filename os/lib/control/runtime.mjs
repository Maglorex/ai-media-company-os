// Company OS control plane (Gate 1B) — yetkili durum yükleme, tek mutation kapısı, init, PAUSED/resume, açık yeniden projeksiyon.
// events.jsonl YETKİLİ yazma modelidir; state.json, jobs/*.json, actions/*.json türetilmiş projeksiyonlardır.
// Projeksiyonlar asla yetki kaynağı değildir: her mutasyon önce olaylardan yeniden oynatır, projeksiyonları karşılaştırır;
// uyuşmazlıkta fail-closed reddeder. Normal işleyişte projeksiyonlar sessizce onarılmaz; onarım yalnız açık `reproject` ile.
import { mkdirSync, existsSync, openSync, closeSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { withLock, writeJsonAtomic, ControlError, ROLE, nonEmpty, canon, clone, sha256, assertNoSecrets, requestGrant } from './common.mjs';
import { readEventLog, buildEvent, appendEventDurable, EVENTS_FILE } from './events.mjs';
import { replay, applyEvent, projectionsOf, compareProjections, projectionPath, SCHEMA, PREDECESSOR_FILE } from './model.mjs';

export const CONTROL_PLANE_VERSION = '1B.3';
export const RESUME_AUTHORITY = 'founder';

// Salt-okunur tam inceleme: olay günlüğü, replay, projeksiyon uyuşmazlığı, geçici dosyalar, kilit.
export function inspect(rt) {
  const exists = existsSync(rt.dir);
  const log = exists ? readEventLog(rt.dir) : { ok: false, events: [], head: null, errors: ['runtime directory missing'] };
  const rep = log.ok ? replay(log.events) : { model: null, errors: [] };
  const model = log.ok && !rep.errors.length ? rep.model : null;
  const proj = model ? compareProjections(rt.dir, model) : { divergence: [], tempFiles: exists ? compareTempOnly(rt.dir) : [] };
  return { exists, log, replayErrors: rep.errors, model, divergence: proj.divergence, tempFiles: proj.tempFiles, locked: existsSync(join(rt.dir, '.lock')) };
}
function compareTempOnly(dir) {
  // Olay günlüğü bozukken de geçici dosyalar görünür kalsın.
  return compareProjections(dir, { schema: null, jobs: {}, actions: {}, resources: {} }).tempFiles;
}

// Okuma API'leri için: yalnız olay günlüğü + replay sağlamsa yetkili modeli döndürür (projeksiyon uyuşmazlığı okumayı engellemez;
// okumalar zaten projeksiyonu değil modeli kullanır).
export function loadModel(rt) {
  const s = inspect(rt);
  if (!s.exists) throw new ControlError('RUNTIME_MISSING', rt.dir);
  if (!s.log.ok) throw new ControlError('EVENT_LOG_BROKEN', s.log.errors.join('; '));
  if (s.replayErrors.length) throw new ControlError('EVENT_LOG_BROKEN', s.replayErrors.join('; '));
  return s.model;
}

function writeProjections(rt, next, prev) {
  const want = projectionsOf(next);
  const had = prev ? projectionsOf(prev) : {};
  // state.json en son: kısmi başarısızlıkta head uyuşmazlığı görünür kalır.
  const order = Object.keys(want).filter((r) => r !== 'state.json').concat('state.json');
  for (const rel of order) if (!(rel in had) || canon(had[rel]) !== canon(want[rel])) writeJsonAtomic(projectionPath(rt.dir, rel), want[rel]);
}

// Aday olayı tam doğrula (secret + anlamsal), yetkili olarak ekle, projeksiyonları güncelle, sonra yeniden doğrula.
function commit(rt, model, actor_role, spec, { rewriteAll = false } = {}) {
  const event = buildEvent(rt, model.head, actor_role, spec);
  assertNoSecrets(event, 'event');                       // grant, gerekçe, onay referansı, receipt dahil — yazımdan önce
  const next = applyEvent(clone(model), event);          // anlamsal doğrulama — yazımdan önce
  appendEventDurable(rt.dir, event);                     // yetkili kayıt (fsync)
  try { writeProjections(rt, next, rewriteAll ? null : model); }
  catch (err) {
    throw new ControlError('PROJECTION_WRITE_FAILED', `event #${event.seq} is committed but projections could not be written (${err.code ?? err.message}); `
      + 'all mutations now fail closed until an operator investigates and runs `reproject`');
  }
  const after = compareProjections(rt.dir, next);
  if (after.divergence.length || after.tempFiles.length) {
    throw new ControlError('PROJECTION_DIVERGENCE', `event #${event.seq} committed; projections do not match replay: ${[...after.divergence, ...after.tempFiles].join('; ')}`);
  }
  return { event, next };
}

// Tek mutation kapısı. plan(model) → { event?: {type, job_id?, details}, result?: (model) => any }.
export function mutate(rt, { actor_role, allowPaused = false }, plan) {
  if (!ROLE.test(actor_role ?? '')) throw new ControlError('ACTOR_INVALID', `actor_role must match ${ROLE}`);
  return withLock(rt, () => {
    const s = inspect(rt);
    if (!s.log.ok) throw new ControlError('EVENT_LOG_BROKEN', s.log.errors.join('; '));
    if (s.replayErrors.length) throw new ControlError('EVENT_LOG_BROKEN', s.replayErrors.join('; '));
    if (s.tempFiles.length) throw new ControlError('INTERRUPTED_WRITE', `leftover temp files (evidence of an interrupted write; manual recovery required): ${s.tempFiles.join(', ')}`);
    if (s.divergence.length) throw new ControlError('PROJECTION_DIVERGENCE', `projections differ from the authoritative event log (recovery/reprojection required): ${s.divergence.join('; ')}`);
    if (s.model.mode === 'PAUSED' && !allowPaused) throw new ControlError('PAUSED', `company is PAUSED (${s.model.mode_reason}); mutation refused`);
    const out = plan(s.model);
    if (!out?.event) return out?.result ? out.result(s.model) : undefined;
    const { next } = commit(rt, s.model, actor_role, out.event);
    return out.result ? out.result(next) : next;
  });
}

// predecessor: { file: 'archive/<ad>.jsonl', reason } — önceden elle archive/'a taşınmış eski günlük. Dosya okunur (salt-okunur),
// bayt hash'i ve satır sayısı genesis'e yazılır; eski olaylar yeniden oynatılmaz ve değiştirilmez.
export function initRuntime(rt, { actor_role, active_gate = '1B', predecessor = null }) {
  if (!ROLE.test(actor_role ?? '')) throw new ControlError('ACTOR_INVALID', `actor_role must match ${ROLE}`);
  if (existsSync(join(rt.dir, 'state.json')) || existsSync(join(rt.dir, EVENTS_FILE))) throw new ControlError('ALREADY_INITIALIZED', rt.dir);
  let pred = null;
  if (predecessor) {
    if (!PREDECESSOR_FILE.test(predecessor.file ?? '') || !nonEmpty(predecessor.reason)) throw new ControlError('PREDECESSOR_INVALID', 'predecessor needs file archive/<name>.jsonl and a reason');
    const bytes = readFileSync(join(rt.dir, predecessor.file));
    pred = { file: predecessor.file, sha256: sha256(bytes), line_count: bytes.toString('utf8').split('\n').filter((l) => l.trim()).length, reason: predecessor.reason.trim() };
  }
  for (const d of ['', 'jobs', 'actions']) mkdirSync(join(rt.dir, d), { recursive: true });
  return withLock(rt, () => {
    closeSync(openSync(join(rt.dir, EVENTS_FILE), 'wx'));
    const genesis = { type: 'RUNTIME_INITIALIZED', details: { schema: SCHEMA, control_plane_version: CONTROL_PLANE_VERSION, active_gate, predecessor: pred } };
    const { next } = commit(rt, replay([]).model, actor_role, genesis, { rewriteAll: true });
    return projectionsOf(next)['state.json'];
  });
}

export function getMode(rt) {
  const m = loadModel(rt);
  return { mode: m.mode, reason: m.mode_reason, since: m.mode_changed_at };
}

// Duraklatma emniyet frenidir: yetki istemez (actor_role yalnız atıf).
export function pauseCompany(rt, { actor_role, reason }) {
  if (!nonEmpty(reason)) throw new ControlError('REASON_REQUIRED', 'pause needs a reason');
  return mutate(rt, { actor_role, allowPaused: true }, (m) => {
    if (m.mode === 'PAUSED') throw new ControlError('ALREADY_PAUSED', m.mode_reason);
    return { event: { type: 'COMPANY_PAUSED', details: { reason: reason.trim() } }, result: (n) => projectionsOf(n)['state.json'] };
  });
}

// PAUSED'dan çıkış korumalı yetkidir; yetki yalnız rt.authority doğrulayıcısından gelir ve olay içinde grant olarak saklanır.
// Gate 1B canlı yolunda doğrulayıcı yok → FOUNDER_APPROVAL_REQUIRED.
export function resumeCompany(rt, { actor_role, reason, approval_ref = null }) {
  if (!nonEmpty(reason)) throw new ControlError('REASON_REQUIRED', 'resume needs a reason');
  return mutate(rt, { actor_role, allowPaused: true }, (m) => {
    if (m.mode !== 'PAUSED') throw new ControlError('NOT_PAUSED', 'company is already OPERATING');
    const grant = requestGrant(rt, { authority: RESUME_AUTHORITY, purpose: 'company.resume', subject: `pause@${m.paused_seq}`, approval_ref }, actor_role);
    return { event: { type: 'COMPANY_RESUMED', details: { reason: reason.trim(), grant } }, result: (n) => projectionsOf(n)['state.json'] };
  });
}

// AÇIK kurtarma: projeksiyonları yetkili olay durumundan yeniden yazar ve bunu bir olayla kaydeder. Olay geçmişini değiştirmez.
// Geçici dosyalar veya olay günlüğünde karşılığı olmayan projeksiyon dosyaları varsa reddeder (elle inceleme gerekir; hiçbir şey silinmez).
export function reproject(rt, { actor_role, reason }) {
  if (!ROLE.test(actor_role ?? '')) throw new ControlError('ACTOR_INVALID', `actor_role must match ${ROLE}`);
  if (!nonEmpty(reason)) throw new ControlError('REASON_REQUIRED', 'reproject needs a reason');
  return withLock(rt, () => {
    const s = inspect(rt);
    if (!s.log.ok || s.replayErrors.length) throw new ControlError('EVENT_LOG_BROKEN', [...s.log.errors, ...s.replayErrors].join('; '));
    if (s.tempFiles.length) throw new ControlError('INTERRUPTED_WRITE', `inspect and remove leftover temp files by hand first: ${s.tempFiles.join(', ')}`);
    const orphans = s.divergence.filter((x) => /no such record|unexpected directory/.test(x));
    if (orphans.length) throw new ControlError('UNEXPECTED_PROJECTION_FILES', `move these aside by hand first: ${orphans.join('; ')}`);
    const repaired = s.divergence.map((x) => x.split(':')[0]);
    commit(rt, s.model, actor_role, { type: 'RUNTIME_REPROJECTED', details: { reason: reason.trim(), repaired, control_plane_version: CONTROL_PLANE_VERSION } }, { rewriteAll: true });
    return { repaired };
  });
}
