// Company OS control plane (Gate 1B) — deterministik olay yeniden oynatma (replay) ve projeksiyonlar.
// applyEvent tek anlamsal doğrulayıcıdır: hem replay'de hem yazımdan ÖNCE aday olay için çalışır.
// Yetki (mod, iş durumu, eylem durumu, onaylar, kaynak sahipliği) yalnız buradan türetilir; projeksiyon dosyaları türevdir.
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ControlError, ROLE, isPlainObject, nonEmpty, canon, sha256, readJson, TEMP_MARK, isSafeId, safeIdError, recordPath } from './common.mjs';
import { scopeKind } from '../precedence.mjs';

export const SCHEMA = 'company-runtime/1';
export const PREDECESSOR_FILE = /^archive\/[A-Za-z0-9][A-Za-z0-9._-]{0,80}\.jsonl$/;
export const MODES = ['OPERATING', 'PAUSED'];
export const JOB_STATES = ['PLANNED', 'READY', 'IN_PROGRESS', 'BLOCKED', 'AWAITING_FOUNDER', 'AWAITING_FACTORY', 'AWAITING_QA', 'COMPLETE'];
export const TRANSITIONS = {
  PLANNED: ['READY', 'BLOCKED'],
  READY: ['IN_PROGRESS', 'BLOCKED', 'PLANNED'],
  IN_PROGRESS: ['AWAITING_FOUNDER', 'AWAITING_FACTORY', 'AWAITING_QA', 'BLOCKED', 'COMPLETE'],
  BLOCKED: ['PLANNED', 'READY', 'IN_PROGRESS'],
  AWAITING_FOUNDER: ['READY', 'IN_PROGRESS', 'BLOCKED', 'COMPLETE'],
  AWAITING_FACTORY: ['IN_PROGRESS', 'BLOCKED'],
  AWAITING_QA: ['IN_PROGRESS', 'BLOCKED', 'COMPLETE'],
  COMPLETE: [],
};
// Bu durumlara geçen iş, tuttuğu dışlayıcı kaynakları bırakır. IN_PROGRESS'e giriş kaynakları talep eder.
const RELEASES = ['PLANNED', 'READY', 'COMPLETE'];
export const ACTION_STATES = ['PREPARED', 'AUTHORIZED', 'EXECUTING', 'EXECUTED', 'VERIFIED', 'FAILED'];
export const ACTION_KIND = /^[a-z][a-z0-9.-]{1,60}$/;
const SLUG = /^[a-z][a-z0-9-]{1,40}$/;
export const JOB_FIELDS = ['job_id', 'type', 'scope', 'owner_role', 'owner_machine', 'branch', 'state', 'canonical_inputs', 'expected_outputs',
  'resource_claims', 'blockers', 'next_owner', 'external_actions', 'budget'];
const GRANT_FIELDS = ['authority', 'purpose', 'subject', 'source', 'approval_ref', 'verifier', 'recorded_by'];

export const fingerprintOf = ({ kind, job_id = null, intent }) => sha256(canon({ kind, job_id, intent }));
// Policy, eylemin korumalı kimliğinin parçasıdır: aynı intent + farklı policy aynı eylem değildir.
export const identityOf = (fingerprint, policy) => sha256(canon({ fingerprint, policy }));

const fail = (code, msg) => { throw new ControlError(code, msg); };
const keysExactly = (o, keys, what, code = 'EVENT_REJECTED') => {
  if (!isPlainObject(o)) fail(code, `${what} must be an object`);
  const got = Object.keys(o).sort().join();
  if (got !== [...keys].sort().join()) fail(code, `${what} fields must be exactly ${keys.join(', ')}`);
};
const strList = (v) => Array.isArray(v) && v.every((x) => nonEmpty(x));

export function emptyModel() {
  return { initialized: false, schema: null, control_plane_version: null, active_gate: null, mode: null, mode_reason: null, mode_changed_at: null,
    paused_seq: null, head: null, last_ts: null, jobs: {}, actions: {}, resources: {} };
}

function checkGrant(g, { authority, purpose, subject }) {
  keysExactly(g, GRANT_FIELDS, 'grant');
  if (g.authority !== authority) fail('AUTHORITY_MISMATCH', `grant is for ${g.authority}, ${authority} required`);
  if (g.purpose !== purpose || g.subject !== subject) fail('AUTHORITY_MISMATCH', 'grant is bound to a different purpose/subject');
  if (!nonEmpty(g.source) || !nonEmpty(g.verifier)) fail('EVENT_REJECTED', 'grant needs source and verifier');
  if (!(g.approval_ref === null || nonEmpty(g.approval_ref))) fail('EVENT_REJECTED', 'grant.approval_ref must be null or text');
  if (!ROLE.test(g.recorded_by ?? '')) fail('EVENT_REJECTED', 'grant.recorded_by must be a role');
}

export function validateJobRecord(j) {
  keysExactly(j, JOB_FIELDS, 'job', 'JOB_INVALID');
  const errors = [];
  if (!isSafeId('job', j.job_id)) errors.push(safeIdError('job', j.job_id));
  if (!SLUG.test(j.type ?? '')) errors.push(`type must match ${SLUG}`);
  try { scopeKind(j.scope); } catch { errors.push(`invalid scope ${j.scope}`); }
  if (!ROLE.test(j.owner_role ?? '')) errors.push('owner_role invalid');
  if (!nonEmpty(j.owner_machine)) errors.push('owner_machine required');
  if (!nonEmpty(j.branch)) errors.push('branch required');
  if (!JOB_STATES.includes(j.state)) errors.push(`invalid state ${j.state}`);
  for (const k of ['canonical_inputs', 'expected_outputs', 'blockers', 'external_actions']) if (!strList(j[k])) errors.push(`${k} must be a list of non-empty strings`);
  if (!(Array.isArray(j.resource_claims) && j.resource_claims.every((r) => SLUG.test(r)) && new Set(j.resource_claims).size === j.resource_claims.length)) {
    errors.push(`resource_claims must be unique slugs matching ${SLUG}`);
  }
  if (!(j.next_owner === null || ROLE.test(j.next_owner ?? ''))) errors.push('next_owner must be null or a role');
  if (!(j.budget === null || (isPlainObject(j.budget) && Object.values(j.budget).every((n) => typeof n === 'number' && Number.isFinite(n) && n >= 0)))) {
    errors.push('budget must be null or an object of non-negative numbers');
  }
  if (errors.length) fail('JOB_INVALID', errors.join('; '));
}

function jobOf(m, e) {
  const j = m.jobs[e.job_id];
  if (!j) fail('JOB_NOT_FOUND', String(e.job_id));
  return j;
}
function actionOf(m, e) {
  const a = m.actions[e.details?.action_id];
  if (!a) fail('ACTION_NOT_FOUND', String(e.details?.action_id));
  if (e.job_id !== a.job_id) fail('EVENT_REJECTED', 'event job_id must match the action job_id');
  return a;
}
const needState = (a, states) => { if (!states.includes(a.state)) fail('ACTION_STATE', `${a.action_id} is ${a.state}`); };

// Olayı modele uygular (m'yi değiştirir). Geçersizse ControlError fırlatır.
export function applyEvent(m, e) {
  const d = e.details;
  if (e.type !== 'RUNTIME_INITIALIZED' && !m.initialized) fail('EVENT_REJECTED', 'runtime not initialized');
  switch (e.type) {
    case 'RUNTIME_INITIALIZED':
      if (m.initialized || e.seq !== 1) fail('EVENT_REJECTED', 'genesis must be the first event');
      keysExactly(d, ['schema', 'control_plane_version', 'active_gate', 'predecessor'], 'details');
      if (d.schema !== SCHEMA) fail('EVENT_REJECTED', `unsupported schema ${d.schema}`);
      if (!nonEmpty(d.control_plane_version) || !nonEmpty(d.active_gate)) fail('EVENT_REJECTED', 'version and gate required');
      // predecessor: arşivlenmiş, değiştirilmemiş önceki günlüğe (ör. sürümsüz Gate 1B öncesi günlük) bayt hash'iyle bağ; yeniden oynatılmaz.
      if (d.predecessor !== null) {
        keysExactly(d.predecessor, ['file', 'sha256', 'line_count', 'reason'], 'details.predecessor');
        if (!PREDECESSOR_FILE.test(d.predecessor.file) || !/^[0-9a-f]{64}$/.test(d.predecessor.sha256)
          || !Number.isInteger(d.predecessor.line_count) || d.predecessor.line_count < 1 || !nonEmpty(d.predecessor.reason)) fail('EVENT_REJECTED', 'predecessor invalid');
      }
      Object.assign(m, { initialized: true, schema: d.schema, control_plane_version: d.control_plane_version, active_gate: d.active_gate,
        mode: 'OPERATING', mode_reason: null, mode_changed_at: e.ts });
      break;
    case 'RUNTIME_REPROJECTED':
      keysExactly(d, ['reason', 'repaired', 'control_plane_version'], 'details');
      if (!nonEmpty(d.reason) || !strList(d.repaired) || !nonEmpty(d.control_plane_version)) fail('EVENT_REJECTED', 'reprojection details invalid');
      m.control_plane_version = d.control_plane_version;
      break;
    case 'COMPANY_PAUSED':
      keysExactly(d, ['reason'], 'details');
      if (!nonEmpty(d.reason)) fail('REASON_REQUIRED', 'pause needs a reason');
      if (m.mode === 'PAUSED') fail('ALREADY_PAUSED', m.mode_reason);
      Object.assign(m, { mode: 'PAUSED', mode_reason: d.reason, mode_changed_at: e.ts, paused_seq: e.seq });
      break;
    case 'COMPANY_RESUMED':
      keysExactly(d, ['reason', 'grant'], 'details');
      if (!nonEmpty(d.reason)) fail('REASON_REQUIRED', 'resume needs a reason');
      if (m.mode !== 'PAUSED') fail('NOT_PAUSED', 'company is already OPERATING');
      checkGrant(d.grant, { authority: 'founder', purpose: 'company.resume', subject: `pause@${m.paused_seq}` });
      Object.assign(m, { mode: 'OPERATING', mode_reason: null, mode_changed_at: e.ts, paused_seq: null });
      break;
    case 'JOB_CREATED': {
      keysExactly(d, ['job'], 'details');
      validateJobRecord(d.job);
      if (e.job_id !== d.job.job_id) fail('EVENT_REJECTED', 'event job_id must match the job');
      if (m.jobs[d.job.job_id]) fail('JOB_EXISTS', d.job.job_id);
      if (!['PLANNED', 'READY'].includes(d.job.state)) fail('JOB_INVALID', 'new jobs start as PLANNED or READY');
      if (d.job.blockers.length) fail('JOB_INVALID', 'only BLOCKED jobs carry blockers');
      m.jobs[d.job.job_id] = { ...d.job, approvals: [], founder_gate: null, publication_base: null, created_at: e.ts, updated_at: e.ts };
      break;
    }
    case 'JOB_STATE_CHANGED': {
      keysExactly(d, ['from', 'to', 'reason', 'blockers', 'next_owner'], 'details');
      const j = jobOf(m, e);
      if (d.from !== j.state) fail('JOB_STATE_STALE', `${j.job_id} is ${j.state}, not ${d.from}`);
      if (!JOB_STATES.includes(d.to)) fail('JOB_STATE_INVALID', String(d.to));
      if (!TRANSITIONS[j.state].includes(d.to)) fail('INVALID_TRANSITION', `${j.state} -> ${d.to} not allowed for ${j.job_id}`);
      if (!nonEmpty(d.reason)) fail('REASON_REQUIRED', 'state change needs a reason');
      if (!strList(d.blockers)) fail('JOB_INVALID', 'blockers must be a list of non-empty strings');
      if (d.to === 'BLOCKED' && !d.blockers.length) fail('BLOCKER_REQUIRED', `${j.job_id}: entering BLOCKED needs a blocker`);
      if (d.to !== 'BLOCKED' && d.blockers.length) fail('JOB_INVALID', 'only BLOCKED jobs carry blockers');
      if (!(d.next_owner === null || ROLE.test(d.next_owner ?? ''))) fail('JOB_INVALID', 'next_owner must be null or a role');
      // Founder kapısı: AWAITING_FOUNDER'dan çıkış yalnız yetki-doğrulanmış JOB_APPROVED olayından sonra.
      if (j.state === 'AWAITING_FOUNDER' && !j.founder_gate?.approval) fail('FOUNDER_APPROVAL_REQUIRED', `${j.job_id} is awaiting a trusted Founder approval`);
      // Dışlayıcı kaynak talebi (iş türünden bağımsız).
      if (d.to === 'IN_PROGRESS') {
        for (const r of j.resource_claims) {
          const h = m.resources[r];
          if (h && h.job_id !== j.job_id) fail('RESOURCE_OWNED', `resource ${r} is held by ${h.job_id} on ${h.owner_machine}`);
        }
        for (const r of j.resource_claims) if (!m.resources[r]) m.resources[r] = { job_id: j.job_id, owner_machine: j.owner_machine, owner_role: j.owner_role, since: e.ts };
      }
      if (RELEASES.includes(d.to)) for (const r of j.resource_claims) if (m.resources[r]?.job_id === j.job_id) delete m.resources[r];
      Object.assign(j, { state: d.to, blockers: d.blockers, next_owner: d.next_owner, updated_at: e.ts,
        founder_gate: d.to === 'AWAITING_FOUNDER' ? { entered_seq: e.seq, approval: null } : null });
      break;
    }
    // Gate 1D-B: iş sahipliği devri yalnız bu olayla (projeksiyon elle değişmez). İlk atama yayın tabanını sabitler; sonra değişmez.
    // Etkin kaynak tutan iş devredilemez (zamanlayıcı/lease yok): önce PLANNED/READY'ye alınıp kaynağı bırakmalı.
    case 'JOB_ASSIGNED': {
      keysExactly(d, ['to_machine', 'base_commit', 'reason'], 'details');
      const j = jobOf(m, e);
      if (j.state === 'COMPLETE') fail('JOB_COMPLETE', `${j.job_id} is COMPLETE and cannot be reassigned`);
      if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,62}$/.test(d.to_machine ?? '')) fail('JOB_INVALID', 'to_machine must be a machine name');
      if (!/^[0-9a-f]{40}$/.test(d.base_commit ?? '')) fail('JOB_INVALID', 'base_commit must be a full commit id');
      if (!nonEmpty(d.reason)) fail('REASON_REQUIRED', 'assignment needs a reason');
      if (j.publication_base && d.base_commit !== j.publication_base) fail('PUBLICATION_BASE_IMMUTABLE', `${j.job_id} publication base is fixed at ${j.publication_base.slice(0, 12)}`);
      if (j.publication_base && d.to_machine === j.owner_machine) fail('ALREADY_ASSIGNED', `${j.job_id} is already assigned to ${d.to_machine}`);
      const held = Object.entries(m.resources).filter(([, h]) => h.job_id === j.job_id).map(([r]) => r);
      if (held.length) fail('ASSIGNMENT_RESOURCE_HELD', `${j.job_id} holds ${held.join(', ')}; release it (PLANNED/READY) before reassignment`);
      Object.assign(j, { owner_machine: d.to_machine, publication_base: j.publication_base ?? d.base_commit, updated_at: e.ts });
      break;
    }
    case 'JOB_APPROVED': {
      keysExactly(d, ['grant'], 'details');
      const j = jobOf(m, e);
      if (j.state !== 'AWAITING_FOUNDER') fail('JOB_STATE', `${j.job_id} is ${j.state}, not AWAITING_FOUNDER`);
      if (j.founder_gate.approval) fail('ALREADY_APPROVED', j.job_id);
      checkGrant(d.grant, { authority: 'founder', purpose: 'job.founder-gate', subject: `${j.job_id}@${j.founder_gate.entered_seq}` });
      const approval = { ...d.grant, at: e.ts };
      j.founder_gate = { ...j.founder_gate, approval };
      j.approvals = [...j.approvals, approval];
      j.updated_at = e.ts;
      break;
    }
    case 'ACTION_PREPARED': {
      keysExactly(d, ['action'], 'details');
      const a = d.action;
      keysExactly(a, ['action_id', 'kind', 'job_id', 'intent', 'fingerprint', 'policy', 'identity', 'requested_by'], 'action', 'ACTION_INVALID');
      if (!isSafeId('action', a.action_id)) fail('ACTION_INVALID', safeIdError('action', a.action_id));
      if (!ACTION_KIND.test(a.kind ?? '')) fail('ACTION_INVALID', `kind must match ${ACTION_KIND}`);
      if (m.actions[a.action_id]) fail('ACTION_EXISTS', a.action_id);
      if (e.job_id !== a.job_id) fail('EVENT_REJECTED', 'event job_id must match the action job_id');
      if (a.job_id !== null && !m.jobs[a.job_id]) fail('JOB_NOT_FOUND', String(a.job_id));
      if (!isPlainObject(a.intent)) fail('ACTION_INVALID', 'intent must be an object');
      if (a.fingerprint !== fingerprintOf(a)) fail('ACTION_INVALID', 'fingerprint does not match kind/job_id/intent');
      keysExactly(a.policy, ['policy_id', 'required_authority', 'requires_ref'], 'action.policy');
      if (!nonEmpty(a.policy.policy_id) || !ROLE.test(a.policy.required_authority ?? '') || typeof a.policy.requires_ref !== 'boolean') fail('ACTION_INVALID', 'policy invalid');
      if (a.identity !== identityOf(a.fingerprint, a.policy)) fail('ACTION_INVALID', 'identity does not match fingerprint/policy');
      if (!ROLE.test(a.requested_by ?? '')) fail('ACTION_INVALID', 'requested_by must be a role');
      m.actions[a.action_id] = { ...a, state: 'PREPARED', result: null, receipt: null, verification: null, failure: null, grant: null,
        created_at: e.ts, updated_at: e.ts, authorized_at: null, executing_at: null, executed_at: null, verified_at: null, failed_at: null };
      break;
    }
    case 'ACTION_AUTHORIZED': {
      keysExactly(d, ['action_id', 'grant'], 'details');
      const a = actionOf(m, e);
      needState(a, ['PREPARED']);
      checkGrant(d.grant, { authority: a.policy.required_authority, purpose: `action.authorize:${a.kind}`, subject: a.identity });
      if (a.policy.requires_ref && !nonEmpty(d.grant.approval_ref)) fail('AUTHORITY_REF_REQUIRED', `${a.action_id} needs an approval reference`);
      Object.assign(a, { state: 'AUTHORIZED', grant: { ...d.grant, at: e.ts }, authorized_at: e.ts, updated_at: e.ts });
      break;
    }
    case 'ACTION_EXECUTING': {
      keysExactly(d, ['action_id'], 'details');
      const a = actionOf(m, e);
      needState(a, ['AUTHORIZED']);
      Object.assign(a, { state: 'EXECUTING', executing_at: e.ts, updated_at: e.ts });
      break;
    }
    case 'ACTION_EXECUTED': {
      keysExactly(d, ['action_id', 'result', 'receipt'], 'details');
      const a = actionOf(m, e);
      needState(a, ['EXECUTING']);
      if (!['SUCCESS', 'UNKNOWN'].includes(d.result)) fail('EVENT_REJECTED', 'EXECUTED result must be SUCCESS or UNKNOWN');
      if (!isPlainObject(d.receipt)) fail('EVENT_REJECTED', 'receipt must be an object');
      Object.assign(a, { state: 'EXECUTED', result: d.result, receipt: d.receipt, executed_at: e.ts, updated_at: e.ts });
      break;
    }
    case 'ACTION_FAILED': {
      keysExactly(d, ['action_id', 'phase', 'reason', 'data'], 'details');
      const a = actionOf(m, e);
      if (!nonEmpty(d.reason) || !isPlainObject(d.data)) fail('EVENT_REJECTED', 'failure needs reason and data');
      if (d.phase === 'execution') {
        needState(a, ['EXECUTING']);
        Object.assign(a, { result: 'FAILURE', receipt: d.data });
      } else if (d.phase === 'verification') {
        needState(a, ['EXECUTED']);
        if (a.result !== 'SUCCESS') fail('VERIFY_REFUSED_AMBIGUOUS', `${a.action_id} result is ${a.result}`);
        if (d.data.verified !== false) fail('EVENT_REJECTED', 'verification failure must record verified=false');
        a.verification = d.data;
      } else fail('EVENT_REJECTED', `unknown failure phase ${d.phase}`);
      Object.assign(a, { state: 'FAILED', failure: { phase: d.phase, reason: d.reason }, failed_at: e.ts, updated_at: e.ts });
      break;
    }
    case 'ACTION_VERIFIED': {
      keysExactly(d, ['action_id', 'verification'], 'details');
      const a = actionOf(m, e);
      needState(a, ['EXECUTED']);
      if (a.result !== 'SUCCESS') fail('VERIFY_REFUSED_AMBIGUOUS', `${a.action_id} result is ${a.result}; an ambiguous result cannot become VERIFIED`);
      keysExactly(d.verification, ['verified', 'evidence'], 'verification');
      if (d.verification.verified !== true || !isPlainObject(d.verification.evidence)) fail('EVENT_REJECTED', 'VERIFIED needs verified=true and evidence');
      Object.assign(a, { state: 'VERIFIED', verification: d.verification, verified_at: e.ts, updated_at: e.ts });
      break;
    }
    default:
      fail('EVENT_REJECTED', `unknown event type ${e.type}`);
  }
  m.head = { seq: e.seq, hash: e.hash };
  m.last_ts = e.ts;
  return m;
}

// Deterministik replay. İlk anlamsal hatada durur.
export function replay(events) {
  const m = emptyModel();
  for (const e of events) {
    try { applyEvent(m, e); }
    catch (err) { return { model: m, errors: [`event #${e.seq} (${e.type}): ${err.message}`] }; }
  }
  if (!m.initialized) return { model: m, errors: ['no genesis event'] };
  return { model: m, errors: [] };
}

// Modelden beklenen projeksiyon dosyaları (göreli yol → içerik).
export function projectionsOf(m) {
  const out = {
    'state.json': {
      schema: m.schema, control_plane_version: m.control_plane_version, mode: m.mode, mode_reason: m.mode_reason, mode_changed_at: m.mode_changed_at,
      active_gate: m.active_gate, resource_ownership: m.resources, event_head: m.head, updated_at: m.last_ts,
    },
  };
  for (const [id, j] of Object.entries(m.jobs)) { assertId('job', id); out[`jobs/${id}.json`] = j; }
  for (const [id, a] of Object.entries(m.actions)) { assertId('action', id); out[`actions/${id}.json`] = a; }
  return out;
}
const assertId = (kind, id) => { const e = safeIdError(kind, id); if (e) fail('ID_UNSAFE', e); };

// Projeksiyon göreli yolunu mutlak yola çevirir; kayıt dosyaları yalnız recordPath üzerinden (kimlik doğrulama + klasör içi kontrol).
export function projectionPath(dir, rel) {
  if (rel === 'state.json') return join(dir, rel);
  const m = /^(jobs|actions)\/(.+)\.json$/.exec(rel);
  if (!m) fail('ID_UNSAFE', `not a projection path: ${rel}`);
  return recordPath(dir, m[1] === 'jobs' ? 'job' : 'action', m[2]);
}

// Salt-okunur: diskteki projeksiyonları modelle karşılaştırır; geçici dosyaları ayrıca listeler (silmez).
export function compareProjections(dir, m) {
  const expected = projectionsOf(m);
  const divergence = [];
  const tempFiles = [];
  for (const [rel, obj] of Object.entries(expected)) {
    const r = readJson(projectionPath(dir, rel));
    if (!r.ok) divergence.push(`${rel}: ${r.error}`);
    else if (canon(r.value) !== canon(obj)) divergence.push(`${rel}: differs from replayed event state`);
  }
  for (const sub of ['', 'jobs', 'actions']) {
    const d = join(dir, sub);
    if (!existsSync(d)) continue;
    for (const name of readdirSync(d)) {
      const rel = sub ? `${sub}/${name}` : name;
      if (name.includes(TEMP_MARK)) { tempFiles.push(rel); continue; }
      if (!sub || name === '.gitkeep') continue;
      if (!(rel in expected)) divergence.push(`${rel}: ${statSync(join(d, name)).isDirectory() ? 'unexpected directory' : 'no such record in the event log'}`);
    }
  }
  return { divergence, tempFiles };
}
