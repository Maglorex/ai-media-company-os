// Company OS control plane (Gate 1B) — events.jsonl: yürütme durumunun YETKİLİ YAZMA MODELİ.
// state.json, jobs/*.json, actions/*.json bu kayıttan türetilen projeksiyonlardır.
// Hash zinciri bozulma/kurcalama TESPİTİ içindir; kriptografik değiştirilemezlik değildir:
// dosyaya yazabilen biri zinciri baştan yeniden hesaplayabilir. Git geçmişi ve makine dışı kopyalar ayrıca kanıt sağlar.
import { readFileSync, existsSync, openSync, closeSync, writeSync, fsyncSync, fstatSync, readSync } from 'node:fs';
import { join } from 'node:path';
import { canon, sha256, ControlError, ROLE, isIso, isPlainObject, isSafeId } from './common.mjs';

export const EVENTS_FILE = 'events.jsonl';
export const GENESIS_HASH = '0'.repeat(64);
export const EVENT_TYPES = [
  'RUNTIME_INITIALIZED', 'RUNTIME_REPROJECTED',
  'COMPANY_PAUSED', 'COMPANY_RESUMED',
  'JOB_CREATED', 'JOB_STATE_CHANGED', 'JOB_APPROVED', 'JOB_ASSIGNED',
  'ACTION_PREPARED', 'ACTION_AUTHORIZED', 'ACTION_EXECUTING', 'ACTION_EXECUTED', 'ACTION_VERIFIED', 'ACTION_FAILED',
];
// Olay sürümü: gelecekteki Company OS sürümleri eski olayların şemasını tahmin etmek yerine açıkça ele alabilsin diye vardır.
// Gate 1B yalnız sürüm 1'i bilir; sürümü eksik veya bilinmeyen olay fail-closed reddedilir. Upcaster/migration çerçevesi yok.
export const EVENT_VERSION = 1;
export const SUPPORTED_EVENT_VERSIONS = [1];
const KEYS = ['event_version', 'seq', 'ts', 'type', 'actor_role', 'machine', 'job_id', 'details', 'prev_hash', 'hash'].sort().join();

export function hashEvent(event) {
  const { hash, ...rest } = event;
  return sha256(canon(rest));
}

// Tek olayın biçim kontrolü (anlamsal kontrol model.applyEvent'tedir).
export function eventShapeErrors(e, expectedSeq, expectedPrev) {
  const errors = [];
  if (!isPlainObject(e)) return ['not an object'];
  // Sürüm, başka hiçbir alan yorumlanmadan önce doğrulanır.
  if (!('event_version' in e)) return ['missing event_version (unversioned events are not accepted)'];
  if (!SUPPORTED_EVENT_VERSIONS.includes(e.event_version)) return [`unsupported event_version ${JSON.stringify(e.event_version)}`];
  if (Object.keys(e).sort().join() !== KEYS) return ['wrong field set'];
  if (e.seq !== expectedSeq) errors.push(`sequence break (seq ${e.seq}, expected ${expectedSeq})`);
  if (!EVENT_TYPES.includes(e.type)) errors.push(`unknown event type ${e.type}`);
  if (!isIso(e.ts)) errors.push('bad timestamp');
  if (!ROLE.test(e.actor_role ?? '')) errors.push('bad actor_role');
  if (typeof e.machine !== 'string' || !e.machine) errors.push('bad machine');
  if (!(e.job_id === null || isSafeId('job', e.job_id))) errors.push('bad job_id (not a safe job id)');
  if (!isPlainObject(e.details)) errors.push('details must be an object');
  if (e.prev_hash !== expectedPrev) errors.push('prev_hash does not match previous event hash');
  if (e.hash !== hashEvent(e)) errors.push('event hash mismatch (content changed)');
  return errors;
}

// Salt-okunur: dosya biçimi + zincir. { ok, events[], head, errors[] }
export function readEventLog(dir) {
  const file = join(dir, EVENTS_FILE);
  if (!existsSync(file)) return { ok: false, events: [], head: null, errors: ['events.jsonl missing'] };
  return parseEventLog(readFileSync(file, 'utf8'));
}

// Saf ayrıştırma + zincir doğrulaması (Gate 1D-B: uzak kontrol dalındaki günlük de aynı kurallarla doğrulanır).
export function parseEventLog(raw) {
  const errors = [];
  if (raw.length === 0) return { ok: false, events: [], head: null, errors: ['events.jsonl is empty (no genesis event)'] };
  if (!raw.endsWith('\n')) errors.push('events.jsonl does not end with a newline (torn or hand-edited final line)');
  const lines = raw.split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  const events = [];
  let prev = GENESIS_HASH;
  lines.forEach((line, i) => {
    let e;
    try { e = JSON.parse(line.replace(/\r$/, '')); } catch { errors.push(`line ${i + 1}: unparseable`); prev = null; return; }
    for (const err of eventShapeErrors(e, i + 1, prev ?? e?.prev_hash)) errors.push(`line ${i + 1}: ${err}`);
    prev = e.hash;
    events.push(e);
  });
  const last = events[events.length - 1];
  return { ok: errors.length === 0, events, head: last ? { seq: last.seq, hash: last.hash } : null, errors };
}

export function buildEvent(rt, head, actor_role, { type, job_id = null, details }) {
  const e = { event_version: EVENT_VERSION, seq: head ? head.seq + 1 : 1, ts: rt.now(), type, actor_role, machine: rt.machine, job_id, details, prev_hash: head ? head.hash : GENESIS_HASH };
  e.hash = hashEvent(e);
  const errors = eventShapeErrors(e, e.seq, e.prev_hash);
  if (errors.length) throw new ControlError('EVENT_INVALID', errors.join('; '));
  return e;
}

// Tam olarak bir kanonik JSON olay + '\n' ekler ve fsync eder. Sondaki satır sonu eksikse ekleme reddedilir.
export function appendEventDurable(dir, event) {
  const file = join(dir, EVENTS_FILE);
  if (!existsSync(file)) throw new ControlError('EVENT_LOG_BROKEN', 'events.jsonl missing');
  const fd = openSync(file, 'r+');
  try {
    const size = fstatSync(fd).size;
    if (size > 0) {
      const b = Buffer.alloc(1);
      readSync(fd, b, 0, 1, size - 1);
      if (b[0] !== 0x0a) throw new ControlError('EVENT_LOG_BROKEN', 'events.jsonl does not end with a newline; append refused');
    }
    writeSync(fd, `${canon(event)}\n`, size);
    fsyncSync(fd);
  } finally { closeSync(fd); }
}
