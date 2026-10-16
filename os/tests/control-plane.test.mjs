// Gate 1B — yerel control plane: olay günlüğü yetkili yazma modeli, replay, projeksiyon uyuşmazlığı, PAUSED, job + Founder kapısı,
// dışlayıcı kaynak, eylem policy'si / receipt / idempotency, secret taraması, salt-okunur doctor.
// Her test geçici bir runtime klasöründe deterministik saatle çalışır; gerçek company/state/runtime yalnız okunur.
// TEST-ONLY doğrulayıcı ve policy yalnız bu dosyada tanımlıdır; üretim kodunda karşılığı yoktur, CLI enjekte edemez.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync, writeFileSync, unlinkSync, readdirSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { ROOT } from '../lib/records.mjs';
import { runtimeContext, ControlError, DEFAULT_RUNTIME_DIR, NO_TRUSTED_AUTHORITY, PRODUCTION_ACTION_POLICY, secretFindings, canon, safeIdError, recordPath } from '../lib/control/common.mjs';
import { initRuntime, pauseCompany, resumeCompany, getMode, reproject, inspect, loadModel } from '../lib/control/runtime.mjs';
import { hashEvent, GENESIS_HASH, appendEventDurable, EVENT_VERSION } from '../lib/control/events.mjs';
import { projectionsOf } from '../lib/control/model.mjs';
import { createJob, readJob, listJobs, transitionJob, approveJob, TRANSITIONS, JOB_STATES } from '../lib/control/jobs.mjs';
import { prepareAction, authorizeAction, executeAction, verifyAction, readAction, listActions } from '../lib/control/actions.mjs';
import { doctor } from '../lib/control/doctor.mjs';

const code = (c) => (e) => { assert.ok(e instanceof ControlError, `expected ControlError ${c}, got ${e}`); assert.equal(e.code, c, e.message); return true; };

// ---------- TEST-ONLY dikişler ----------
const testOnlyAuthority = (seen = [], extra = {}) => ({
  id: 'TEST-ONLY-fixture',
  verify(req) {
    seen.push(req);
    if (!req.approval_ref) throw new ControlError('AUTHORITY_REF_REQUIRED', 'test fixture needs an approval_ref');
    return { source: 'TEST-ONLY', approval_ref: req.approval_ref, ...extra };
  },
});
const TEST_ONLY_POLICY = Object.freeze({
  'fixture.noop': { policy_id: 'TEST-ONLY:fixture.noop@1', required_authority: 'founder', requires_ref: true },
  'fixture.coo': { policy_id: 'TEST-ONLY:fixture.coo@1', required_authority: 'coo', requires_ref: false },
});
const WEAKER_TEST_ONLY_POLICY = Object.freeze({
  'fixture.noop': { policy_id: 'TEST-ONLY:fixture.noop@weak', required_authority: 'coo', requires_ref: false },
});

function withRt(fn, { authority = testOnlyAuthority(), actionPolicy = TEST_ONLY_POLICY } = {}) {
  const base = mkdtempSync(join(tmpdir(), 'cos-control-'));
  let t = Date.UTC(2026, 9, 16, 0, 0, 0);
  const now = () => new Date((t += 1000)).toISOString();
  const rt = runtimeContext({ dir: join(base, 'rt'), now, machine: 'TEST-MACHINE', authority, actionPolicy });
  rt.with = (o) => runtimeContext({ dir: rt.dir, now, machine: 'TEST-MACHINE', authority: rt.authority, actionPolicy: rt.actionPolicy, ...o });
  try { initRuntime(rt, { actor_role: 'coo' }); return fn(rt); }
  finally { rmSync(base, { recursive: true, force: true }); }
}
const LIVE = { authority: NO_TRUSTED_AUTHORITY };
const events = (rt) => readFileSync(join(rt.dir, 'events.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const job = (o = {}) => ({ job_id: 'JOB-T1', type: 'production', scope: 'case:CAL-S5', owner_role: 'production-engineer', owner_machine: 'STRONG-PC',
  branch: 'os-v2-migration', canonical_inputs: ['channels/the-industrial-casebook/cases/CAL-S5/handoff/x.md'], expected_outputs: ['review/a.mp4'], ...o });
const act = (o = {}) => ({ action_id: 'ACT-T1', kind: 'fixture.noop', job_id: null, intent: { target: 'fixture', n: 1 }, requested_by: 'coo', ...o });
const AS = (r) => ({ actor_role: r });
const FOUNDER_OK = { actor_role: 'coo', approval_ref: 'D-999' };
const ok = (receipt = { ref: 'fixture-1' }) => () => ({ outcome: 'SUCCESS', receipt });
const tamper = (rt, rel, fn) => { const f = join(rt.dir, rel); const v = JSON.parse(readFileSync(f, 'utf8')); fn(v); writeFileSync(f, JSON.stringify(v, null, 2)); };
const snapshot = (dir) => existsSync(dir)
  ? readdirSync(dir, { recursive: true }).sort().map((p) => { const f = join(dir, p); return statSync(f).isFile() ? `${p}:${readFileSync(f, 'utf8')}` : p; })
  : [];
const toAwaitingFounder = (rt, id = 'JOB-T1') => { for (const s of ['READY', 'IN_PROGRESS', 'AWAITING_FOUNDER']) transitionJob(rt, id, s, { actor_role: 'coo', reason: `to ${s}` }); };
// Gerçek secret biçimleri çalışma anında kurulur; takip edilen dosyada secret biçimi bulunmaz.
const FAKE = {
  stripe: () => `sk_${'live'}_${'a1B2c3D4e5F6g7H8'}`,
  jwt: () => `eyJ${'hbGciOiJIUzI1NiJ9'}.eyJ${'zdWIiOiIxMjM0In0'}.${'c2lnbmF0dXJlLXZhbHVl'}`,
  github: () => `ghp_${'A'.repeat(36)}`,
  pem: () => `-----BEGIN ${'RSA PRIVATE'} KEY-----\nMIIB\n-----END RSA PRIVATE KEY-----`,
  password: () => `${'pass'}word=${'hunter2-xyz'}`,
};

// ---------- runtime / olay günlüğü ----------
test('runtime: init → genesis olayı + replay ile birebir projeksiyonlar; ikinci init reddedilir', () => withRt((rt) => {
  const [e] = events(rt);
  assert.equal(e.type, 'RUNTIME_INITIALIZED');
  assert.equal(e.prev_hash, GENESIS_HASH);
  const m = loadModel(rt);
  assert.equal(m.mode, 'OPERATING');
  assert.deepEqual(m.head, { seq: 1, hash: e.hash });
  assert.deepEqual(JSON.parse(readFileSync(join(rt.dir, 'state.json'), 'utf8')), JSON.parse(JSON.stringify(projectionsOf(m)['state.json'])));
  assert.equal(doctor(rt).status, 'HEALTHY');
  assert.throws(() => initRuntime(rt, AS('coo')), code('ALREADY_INITIALIZED'));
}));

test('olay günlüğü: her mutasyon tek kanonik, sıralı, hash-zincirli olay yazar; projeksiyonlar replay ile aynı', () => withRt((rt) => {
  createJob(rt, job(), AS('coo'));
  transitionJob(rt, 'JOB-T1', 'READY', { actor_role: 'coo', reason: 'inputs ready' });
  pauseCompany(rt, { actor_role: 'coo', reason: 'test' });
  resumeCompany(rt, { actor_role: 'coo', reason: 'test done', approval_ref: 'D-999' });
  const raw = readFileSync(join(rt.dir, 'events.jsonl'), 'utf8');
  assert.ok(raw.endsWith('\n'));
  const ev = events(rt);
  assert.deepEqual(ev.map((e) => e.type), ['RUNTIME_INITIALIZED', 'JOB_CREATED', 'JOB_STATE_CHANGED', 'COMPANY_PAUSED', 'COMPANY_RESUMED']);
  raw.trim().split('\n').forEach((line, i) => {
    assert.equal(line, canon(ev[i]), 'one canonical JSON event per line');
    assert.equal(ev[i].seq, i + 1);
    assert.equal(ev[i].hash, hashEvent(ev[i]));
    assert.equal(ev[i].prev_hash, i ? ev[i - 1].hash : GENESIS_HASH);
  });
  assert.deepEqual(inspect(rt).divergence, []);
}));

test('fail-closed: olay günlüğü eksik / bozuk / zinciri kırık / anlamsal sahte olay', () => {
  withRt((rt) => { // içerik değişti
    createJob(rt, job(), AS('coo'));
    const f = join(rt.dir, 'events.jsonl');
    const lines = readFileSync(f, 'utf8').trim().split('\n');
    const t = JSON.parse(lines[1]); t.details.job.owner_machine = 'MAIN-PC';
    writeFileSync(f, `${lines[0]}\n${JSON.stringify(t)}\n`);
    assert.throws(() => transitionJob(rt, 'JOB-T1', 'READY', { actor_role: 'coo', reason: 'x' }), code('EVENT_LOG_BROKEN'));
    assert.throws(() => pauseCompany(rt, { actor_role: 'coo', reason: 'x' }), code('EVENT_LOG_BROKEN'));
    assert.throws(() => readJob(rt, 'JOB-T1'), code('EVENT_LOG_BROKEN'));
    assert.equal(doctor(rt).status, 'BROKEN_EVENT_LOG');
  });
  withRt((rt) => { // satır silindi
    createJob(rt, job(), AS('coo'));
    createJob(rt, job({ job_id: 'JOB-T2' }), AS('coo'));
    const f = join(rt.dir, 'events.jsonl');
    const lines = readFileSync(f, 'utf8').trim().split('\n');
    writeFileSync(f, `${lines[0]}\n${lines[2]}\n`);
    assert.ok(inspect(rt).log.errors.some((e) => /sequence break/.test(e)));
    assert.throws(() => createJob(rt, job({ job_id: 'JOB-T3' }), AS('coo')), code('EVENT_LOG_BROKEN'));
  });
  withRt((rt) => { // zinciri doğru yeniden hesaplanmış ama anlamsal olarak sahte olay (grant'siz resume) replay'de reddedilir
    pauseCompany(rt, { actor_role: 'coo', reason: 'brake' });
    const head = loadModel(rt).head;
    const forged = { event_version: 1, seq: head.seq + 1, ts: '2026-10-16T01:00:00Z', type: 'COMPANY_RESUMED', actor_role: 'founder', machine: 'X', job_id: null, details: { reason: 'trust me' }, prev_hash: head.hash };
    forged.hash = hashEvent(forged);
    writeFileSync(join(rt.dir, 'events.jsonl'), `${readFileSync(join(rt.dir, 'events.jsonl'), 'utf8')}${canon(forged)}\n`);
    assert.ok(inspect(rt).replayErrors.some((e) => /COMPANY_RESUMED/.test(e)));
    assert.throws(() => getMode(rt), code('EVENT_LOG_BROKEN'));
    assert.equal(doctor(rt).status, 'BROKEN_EVENT_LOG');
  });
  withRt((rt) => { // günlük yok / klasör yok
    unlinkSync(join(rt.dir, 'events.jsonl'));
    assert.throws(() => createJob(rt, job(), AS('coo')), code('EVENT_LOG_BROKEN'));
    assert.equal(doctor(rt).status, 'BROKEN_EVENT_LOG');
    const gone = runtimeContext({ dir: join(rt.dir, 'nope') });
    assert.throws(() => createJob(gone, job(), AS('coo')), code('RUNTIME_MISSING'));
    assert.equal(doctor(gone).status, 'RUNTIME_MISSING');
    assert.ok(!existsSync(gone.dir), 'doctor must not create the runtime directory');
  });
});

test('S4 olay biçimi: sondaki satır sonu eksikse ekleme reddedilir ve hiçbir dosya değişmez', () => withRt((rt) => {
  createJob(rt, job(), AS('coo'));
  const f = join(rt.dir, 'events.jsonl');
  writeFileSync(f, readFileSync(f, 'utf8').replace(/\n$/, ''));
  const before = snapshot(rt.dir);
  assert.throws(() => transitionJob(rt, 'JOB-T1', 'READY', { actor_role: 'coo', reason: 'x' }), code('EVENT_LOG_BROKEN'));
  assert.throws(() => appendEventDurable(rt.dir, { any: 'thing' }), code('EVENT_LOG_BROKEN'), 'the append primitive itself refuses');
  assert.deepEqual(snapshot(rt.dir), before);
  const d = doctor(rt);
  assert.equal(d.status, 'BROKEN_EVENT_LOG');
  assert.ok(d.problems.some((p) => /does not end with a newline/.test(p)));
}));

// ---------- S2: projeksiyon kurcalama davranışı değiştiremez ----------
test('S2: state.json OPERATING dese de olaylar PAUSED ise PAUSED geçerlidir; mutasyon fail-closed', () => withRt((rt) => {
  pauseCompany(rt, { actor_role: 'coo', reason: 'brake' });
  tamper(rt, 'state.json', (s) => { s.mode = 'OPERATING'; s.mode_reason = null; });
  assert.equal(getMode(rt).mode, 'PAUSED');
  assert.throws(() => createJob(rt, job(), AS('coo')), code('PROJECTION_DIVERGENCE'));
  const d = doctor(rt);
  assert.equal(d.status, 'PROJECTION_DIVERGENCE');
  assert.equal(d.company_mode, 'PAUSED');
  assert.equal(d.projected_mode, 'OPERATING');
  reproject(rt, { actor_role: 'coo', reason: 'restore projection after tamper test' });
  assert.throws(() => createJob(rt, job(), AS('coo')), code('PAUSED'), 'after reprojection the authoritative PAUSED still applies');
}));

test('S2: elle temizlenen kaynak sahibi sahipliği bırakmaz', () => withRt((rt) => {
  createJob(rt, job({ state: 'READY', resource_claims: ['production'] }), AS('coo'));
  createJob(rt, job({ job_id: 'JOB-T2', type: 'render', state: 'READY', resource_claims: ['production'] }), AS('coo'));
  transitionJob(rt, 'JOB-T1', 'IN_PROGRESS', { actor_role: 'coo', reason: 'start' });
  tamper(rt, 'state.json', (s) => { s.resource_ownership = {}; });
  assert.throws(() => transitionJob(rt, 'JOB-T2', 'IN_PROGRESS', { actor_role: 'coo', reason: 'start' }), code('PROJECTION_DIVERGENCE'));
  assert.equal(doctor(rt).runtime.resource_ownership.production, 'JOB-T1 @ STRONG-PC', 'ownership is derived from events');
  reproject(rt, { actor_role: 'coo', reason: 'restore' });
  assert.throws(() => transitionJob(rt, 'JOB-T2', 'IN_PROGRESS', { actor_role: 'coo', reason: 'start' }), code('RESOURCE_OWNED'));
}));

test('S2: iş projeksiyonu elle COMPLETE yapılırsa yetkili durum değişmez', () => withRt((rt) => {
  createJob(rt, job({ state: 'READY' }), AS('coo'));
  transitionJob(rt, 'JOB-T1', 'IN_PROGRESS', { actor_role: 'coo', reason: 'start' });
  tamper(rt, 'jobs/JOB-T1.json', (j) => { j.state = 'COMPLETE'; });
  assert.equal(readJob(rt, 'JOB-T1').state, 'IN_PROGRESS');
  assert.equal(listJobs(rt)[0].state, 'IN_PROGRESS');
  assert.throws(() => createJob(rt, job({ job_id: 'JOB-T2' }), AS('coo')), code('PROJECTION_DIVERGENCE'));
  assert.ok(doctor(rt).problems.some((p) => /jobs\/JOB-T1\.json: differs/.test(p)));
  // Olay günlüğünde karşılığı olmayan sahte iş dosyası da uyuşmazlıktır ve reproject onu sessizce kabul etmez
  writeFileSync(join(rt.dir, 'jobs', 'JOB-FAKE.json'), JSON.stringify({ ...readJob(rt, 'JOB-T1'), job_id: 'JOB-FAKE', state: 'COMPLETE' }));
  assert.throws(() => reproject(rt, { actor_role: 'coo', reason: 'x' }), code('UNEXPECTED_PROJECTION_FILES'));
  assert.ok(existsSync(join(rt.dir, 'jobs', 'JOB-FAKE.json')), 'nothing is deleted');
}));

test('S2: eylem projeksiyonu EXECUTED→AUTHORIZED veya VERIFIED→PREPARED geri alınsa executor tekrar çağrılmaz', () => withRt((rt) => {
  let calls = 0;
  const exec = () => { calls++; return { outcome: 'SUCCESS', receipt: { n: calls } }; };
  for (const id of ['ACT-R1', 'ACT-R2']) { prepareAction(rt, act({ action_id: id }), AS('coo')); authorizeAction(rt, id, FOUNDER_OK); executeAction(rt, act({ action_id: id }), exec, AS('coo')); }
  verifyAction(rt, 'ACT-R2', () => ({ verified: true, evidence: { ok: 1 } }), AS('coo'));
  assert.equal(calls, 2);
  tamper(rt, 'actions/ACT-R1.json', (a) => { a.state = 'AUTHORIZED'; a.result = null; a.receipt = null; });
  tamper(rt, 'actions/ACT-R2.json', (a) => { a.state = 'PREPARED'; a.grant = null; a.verification = null; });
  assert.equal(readAction(rt, 'ACT-R1').state, 'EXECUTED');
  assert.equal(readAction(rt, 'ACT-R2').state, 'VERIFIED');
  assert.throws(() => executeAction(rt, act({ action_id: 'ACT-R1' }), exec, AS('coo')), code('PROJECTION_DIVERGENCE'));
  assert.throws(() => executeAction(rt, act({ action_id: 'ACT-R2' }), exec, AS('coo')), code('PROJECTION_DIVERGENCE'));
  assert.throws(() => authorizeAction(rt, 'ACT-R2', FOUNDER_OK), code('PROJECTION_DIVERGENCE'));
  assert.equal(calls, 2, 'projection rollback never causes a second execution');
  assert.equal(doctor(rt).status, 'PROJECTION_DIVERGENCE');
  reproject(rt, { actor_role: 'coo', reason: 'restore' });
  assert.equal(executeAction(rt, act({ action_id: 'ACT-R1' }), exec, AS('coo')).replay, true);
  assert.equal(executeAction(rt, act({ action_id: 'ACT-R2' }), exec, AS('coo')).replay, true);
  assert.equal(calls, 2);
}));

test('olay eklendi ama projeksiyon yazılamadı: geçmiş geri alınmaz; sonraki mutasyonlar fail-closed; açık reproject kurtarır', () => withRt((rt) => {
  rmSync(join(rt.dir, 'jobs'), { recursive: true });
  assert.throws(() => createJob(rt, job(), AS('coo')), code('PROJECTION_WRITE_FAILED'));
  const ev = events(rt);
  assert.equal(ev[ev.length - 1].type, 'JOB_CREATED', 'the authoritative event stays committed');
  assert.equal(readJob(rt, 'JOB-T1').state, 'PLANNED', 'reads come from the event log');
  assert.throws(() => createJob(rt, job({ job_id: 'JOB-T2' }), AS('coo')), code('PROJECTION_DIVERGENCE'));
  assert.throws(() => pauseCompany(rt, { actor_role: 'coo', reason: 'x' }), code('PROJECTION_DIVERGENCE'));
  const d = doctor(rt);
  assert.equal(d.status, 'PROJECTION_DIVERGENCE');
  assert.ok(d.problems.some((p) => /REPROJECTION REQUIRED/.test(p)));
  const logBefore = readFileSync(join(rt.dir, 'events.jsonl'), 'utf8');
  mkdirSync(join(rt.dir, 'jobs'));
  assert.deepEqual(reproject(rt, { actor_role: 'coo', reason: 'jobs dir restored' }).repaired.sort(), ['jobs/JOB-T1.json', 'state.json']);
  assert.ok(readFileSync(join(rt.dir, 'events.jsonl'), 'utf8').startsWith(logBefore), 'history is appended to, never rewritten');
  assert.equal(events(rt).at(-1).type, 'RUNTIME_REPROJECTED');
  assert.equal(doctor(rt).status, 'HEALTHY');
}));

// ---------- S1: olaydan önce dosya değişikliği yok ----------
test('S1: reddedilen olay (secret gerekçe, secret onay referansı, secret grant meta verisi) hiçbir dosyayı değiştirmez', () => {
  withRt((rt) => {
    createJob(rt, job(), AS('coo'));
    toAwaitingFounder(rt);
    prepareAction(rt, act(), AS('coo'));
    pauseCompany(rt, { actor_role: 'coo', reason: 'brake' });
    resumeCompany(rt, { actor_role: 'coo', reason: 'ok', approval_ref: 'D-1' });
    const before = snapshot(rt.dir);
    assert.throws(() => transitionJob(rt, 'JOB-T1', 'BLOCKED', { actor_role: 'coo', reason: FAKE.password(), blockers: ['x'] }), code('SECRET_REJECTED'));
    assert.throws(() => transitionJob(rt, 'JOB-T1', 'BLOCKED', { actor_role: 'coo', reason: 'x', blockers: [FAKE.stripe()] }), code('SECRET_REJECTED'));
    assert.throws(() => approveJob(rt, 'JOB-T1', { actor_role: 'coo', approval_ref: `Bearer ${FAKE.jwt()}` }), code('SECRET_REJECTED'));
    assert.throws(() => authorizeAction(rt, 'ACT-T1', { actor_role: 'coo', approval_ref: FAKE.github() }), code('SECRET_REJECTED'));
    assert.throws(() => createJob(rt, job({ job_id: 'JOB-T9', canonical_inputs: [FAKE.pem()] }), AS('coo')), code('SECRET_REJECTED'));
    assert.throws(() => prepareAction(rt, act({ action_id: 'ACT-T9', intent: { ELEVENLABS_API_KEY: 'abc' } }), AS('coo')), code('SECRET_REJECTED'));
    assert.throws(() => transitionJob(rt, 'JOB-T1', 'COMPLETE', { actor_role: 'coo', reason: 'semantic reject' }), code('FOUNDER_APPROVAL_REQUIRED'));
    assert.deepEqual(snapshot(rt.dir), before, 'no projection and no event changed');
  });
  withRt((rt) => { // doğrulayıcının grant meta verisi secret içeriyor
    prepareAction(rt, act(), AS('coo'));
    const before = snapshot(rt.dir);
    assert.throws(() => authorizeAction(rt, 'ACT-T1', FOUNDER_OK), code('SECRET_REJECTED'));
    assert.deepEqual(snapshot(rt.dir), before);
    assert.equal(readAction(rt, 'ACT-T1').state, 'PREPARED');
  }, { authority: { id: 'TEST-ONLY-leaky', verify: (r) => ({ source: `Bearer ${FAKE.jwt()}`, approval_ref: r.approval_ref }) } });
});

// ---------- PAUSED / resume ----------
test('PAUSED: mutasyonlar reddedilir; okuma ve doctor çalışır; canlı resume rol dizesine güvenmez', () => withRt((rt) => {
  createJob(rt, job(), AS('coo'));
  prepareAction(rt, act(), AS('coo'));
  pauseCompany(rt, { actor_role: 'systems-operator', reason: 'incident drill' });
  assert.throws(() => pauseCompany(rt, { actor_role: 'coo', reason: 'again' }), code('ALREADY_PAUSED'));
  assert.throws(() => createJob(rt, job({ job_id: 'JOB-T2' }), AS('coo')), code('PAUSED'));
  assert.throws(() => transitionJob(rt, 'JOB-T1', 'READY', { actor_role: 'coo', reason: 'x' }), code('PAUSED'));
  assert.throws(() => prepareAction(rt, act({ action_id: 'ACT-T2' }), AS('coo')), code('PAUSED'));
  assert.throws(() => authorizeAction(rt, 'ACT-T1', { actor_role: 'founder', approval_ref: 'D-1' }), code('PAUSED'));
  let calls = 0;
  assert.throws(() => executeAction(rt, act(), () => { calls++; return { outcome: 'SUCCESS' }; }, AS('coo')), code('PAUSED'));
  assert.equal(calls, 0);
  const d = doctor(rt);
  assert.equal(d.company_mode, 'PAUSED');
  assert.equal(d.status, 'HEALTHY', 'PAUSED is a mode, not a fault');
  assert.equal(readJob(rt, 'JOB-T1').state, 'PLANNED');
  const n = events(rt).length;
  for (const actor of ['founder', 'coo']) {
    assert.throws(() => resumeCompany(rt, { actor_role: actor, reason: 'I am the founder', approval_ref: 'D-999' }), code('FOUNDER_APPROVAL_REQUIRED'));
  }
  assert.equal(getMode(rt).mode, 'PAUSED');
  assert.equal(events(rt).length, n, 'refused resume writes nothing');
}, LIVE));

test('resume: yalnız TEST-ONLY trusted authority ile; grant olaya ve pause\'a bağlı', () => {
  const seen = [];
  withRt((rt) => {
    pauseCompany(rt, { actor_role: 'coo', reason: 'brake' });
    assert.throws(() => resumeCompany(rt, { actor_role: 'coo', reason: ' ', approval_ref: 'D-1' }), code('REASON_REQUIRED'));
    resumeCompany(rt, { actor_role: 'research-analyst', reason: 'approved', approval_ref: 'D-998' });
    assert.equal(getMode(rt).mode, 'OPERATING');
    const ev = events(rt).at(-1);
    assert.equal(ev.details.grant.source, 'TEST-ONLY');
    assert.equal(ev.details.grant.subject, 'pause@2');
    assert.equal(ev.details.grant.recorded_by, 'research-analyst');
    assert.deepEqual(seen.map((s) => s.purpose), ['company.resume']);
    assert.throws(() => resumeCompany(rt, { actor_role: 'coo', reason: 'x', approval_ref: 'D-1' }), code('NOT_PAUSED'));
  }, { authority: testOnlyAuthority(seen) });
});

// ---------- S3: Founder iş kapısı ----------
test('S3: canlı yolda AWAITING_FOUNDER rol dizesi, approval_ref veya çağıran approvals ile geçilemez', () => withRt((rt) => {
  assert.throws(() => createJob(rt, job({ approvals: [{ by: 'founder', ref: 'D-048', at: '2026-10-15T10:00:00Z' }] }), AS('founder')), code('JOB_INVALID'));
  createJob(rt, job({ resource_claims: ['production'] }), AS('founder'));
  toAwaitingFounder(rt);
  const n = events(rt).length;
  for (const to of ['COMPLETE', 'READY', 'IN_PROGRESS', 'BLOCKED']) {
    assert.throws(() => transitionJob(rt, 'JOB-T1', to, { actor_role: 'founder', reason: 'approved by me', blockers: ['x'], next_owner: 'founder' }), code('FOUNDER_APPROVAL_REQUIRED'));
  }
  assert.throws(() => approveJob(rt, 'JOB-T1', { actor_role: 'founder', approval_ref: 'D-048' }), code('FOUNDER_APPROVAL_REQUIRED'));
  assert.equal(events(rt).length, n);
  assert.equal(readJob(rt, 'JOB-T1').state, 'AWAITING_FOUNDER');
  assert.deepEqual(readJob(rt, 'JOB-T1').approvals, []);
  // Sahte onay projeksiyona yazılsa bile yetki değildir
  tamper(rt, 'jobs/JOB-T1.json', (j) => { j.approvals = [{ source: 'founder', approval_ref: 'D-048' }]; j.founder_gate.approval = { source: 'founder' }; });
  assert.throws(() => transitionJob(rt, 'JOB-T1', 'COMPLETE', { actor_role: 'founder', reason: 'x' }), code('PROJECTION_DIVERGENCE'));
  assert.equal(readJob(rt, 'JOB-T1').founder_gate.approval, null);
  assert.ok(doctor(rt).warnings.some((w) => /waiting for a trusted Founder approval: JOB-T1/.test(w)));
}, LIVE));

test('S3: TEST-ONLY trusted onay kapıyı açar; onay o girişe bağlıdır, yeniden girişte yeni onay gerekir', () => withRt((rt) => {
  createJob(rt, job(), AS('coo'));
  toAwaitingFounder(rt);
  assert.throws(() => approveJob(rt, 'JOB-T1', { actor_role: 'coo' }), code('AUTHORITY_REF_REQUIRED'));
  const j = approveJob(rt, 'JOB-T1', FOUNDER_OK);
  assert.equal(j.approvals.length, 1);
  assert.equal(j.approvals[0].source, 'TEST-ONLY');
  assert.equal(j.approvals[0].subject, `JOB-T1@${j.founder_gate.entered_seq}`);
  assert.throws(() => approveJob(rt, 'JOB-T1', FOUNDER_OK), code('ALREADY_APPROVED'));
  transitionJob(rt, 'JOB-T1', 'IN_PROGRESS', { actor_role: 'coo', reason: 'approved' });
  transitionJob(rt, 'JOB-T1', 'AWAITING_FOUNDER', { actor_role: 'coo', reason: 'second review' });
  assert.throws(() => transitionJob(rt, 'JOB-T1', 'COMPLETE', { actor_role: 'coo', reason: 'reuse old approval' }), code('FOUNDER_APPROVAL_REQUIRED'));
  approveJob(rt, 'JOB-T1', FOUNDER_OK);
  assert.equal(transitionJob(rt, 'JOB-T1', 'COMPLETE', { actor_role: 'coo', reason: 'done' }).state, 'COMPLETE');
  assert.equal(readJob(rt, 'JOB-T1').approvals.length, 2);
}));

// ---------- jobs ----------
test('job: şema, izinli geçişler, terminal COMPLETE, BLOCKED engel ister', () => withRt((rt) => {
  assert.deepEqual(Object.keys(TRANSITIONS).sort(), [...JOB_STATES].sort());
  const { branch, ...noBranch } = job();
  for (const bad of [noBranch, job({ scope: 'everything' }), job({ job_id: 'job-lower' }), job({ surprise: 1 }), job({ budget: { credits: -1 } }),
    job({ state: 'COMPLETE' }), job({ resource_claims: ['Production'] }), job({ resource_claims: ['production', 'production'] })]) {
    assert.throws(() => createJob(rt, bad, AS('coo')), code('JOB_INVALID'));
  }
  assert.throws(() => createJob(rt, job(), AS('Not A Role')), code('ACTOR_INVALID'));
  assert.equal(events(rt).length, 1, 'rejected creates write no events');
  createJob(rt, job({ budget: { credits: 150, money_try: 0 } }), AS('coo'));
  assert.throws(() => createJob(rt, job(), AS('coo')), code('JOB_EXISTS'));
  assert.throws(() => transitionJob(rt, 'JOB-T1', 'COMPLETE', { actor_role: 'coo', reason: 'skip' }), code('INVALID_TRANSITION'));
  assert.throws(() => transitionJob(rt, 'JOB-T1', 'DONE', { actor_role: 'coo', reason: 'x' }), code('JOB_STATE_INVALID'));
  assert.throws(() => transitionJob(rt, 'JOB-T1', 'BLOCKED', { actor_role: 'coo', reason: 'x' }), code('BLOCKER_REQUIRED'));
  assert.throws(() => transitionJob(rt, 'JOB-T1', 'READY', { actor_role: 'coo' }), code('REASON_REQUIRED'));
  assert.throws(() => transitionJob(rt, 'JOB-NOPE', 'READY', { actor_role: 'coo', reason: 'x' }), code('JOB_NOT_FOUND'));
  for (const [to, extra] of [['READY'], ['IN_PROGRESS'], ['AWAITING_FACTORY'], ['IN_PROGRESS'], ['AWAITING_QA'], ['IN_PROGRESS'], ['BLOCKED', { blockers: ['asset hash mismatch'] }], ['IN_PROGRESS'], ['COMPLETE']]) {
    assert.equal(transitionJob(rt, 'JOB-T1', to, { actor_role: 'coo', reason: `to ${to}`, ...extra }).state, to);
  }
  assert.deepEqual(readJob(rt, 'JOB-T1').blockers, []);
  for (const s of JOB_STATES) assert.throws(() => transitionJob(rt, 'JOB-T1', s, { actor_role: 'coo', reason: 'x', blockers: ['x'] }), code('INVALID_TRANSITION'));
}));

test('dışlayıcı kaynak: iş türünden bağımsız, açık resource_claims ile; sahiplik olaylardan türetilir', () => withRt((rt) => {
  createJob(rt, job({ job_id: 'JOB-A', type: 'production', state: 'READY', resource_claims: ['production'] }), AS('coo'));
  createJob(rt, job({ job_id: 'JOB-B', type: 'production-render', state: 'READY', resource_claims: ['production'] }), AS('coo'));
  createJob(rt, job({ job_id: 'JOB-C', type: 'production', state: 'READY' }), AS('coo'));
  createJob(rt, job({ job_id: 'JOB-D', type: 'production', state: 'READY' }), AS('coo'));
  transitionJob(rt, 'JOB-A', 'IN_PROGRESS', { actor_role: 'coo', reason: 'start' });
  assert.throws(() => transitionJob(rt, 'JOB-B', 'IN_PROGRESS', { actor_role: 'coo', reason: 'start' }), code('RESOURCE_OWNED'), 'a different type name does not bypass the claim');
  transitionJob(rt, 'JOB-C', 'IN_PROGRESS', { actor_role: 'coo', reason: 'type alone is descriptive' });
  transitionJob(rt, 'JOB-D', 'IN_PROGRESS', { actor_role: 'coo', reason: 'type alone is descriptive' });
  for (const s of ['AWAITING_FACTORY', 'IN_PROGRESS', 'BLOCKED']) {
    transitionJob(rt, 'JOB-A', s, { actor_role: 'coo', reason: s, blockers: ['x'] });
    assert.throws(() => transitionJob(rt, 'JOB-B', 'IN_PROGRESS', { actor_role: 'coo', reason: 'start' }), code('RESOURCE_OWNED'), `held while ${s}`);
  }
  transitionJob(rt, 'JOB-A', 'READY', { actor_role: 'coo', reason: 'release' });
  assert.deepEqual(loadModel(rt).resources, {});
  transitionJob(rt, 'JOB-B', 'IN_PROGRESS', { actor_role: 'coo', reason: 'start' });
  assert.equal(doctor(rt).runtime.resource_ownership.production, 'JOB-B @ STRONG-PC');
}));

// ---------- eylem policy'si ----------
test('policy: üretim policy tablosu boş → kayıtsız tür fail-closed; çağıran yetki gereksinimi seçemez', () => {
  withRt((rt) => {
    assert.equal(rt.actionPolicy, PRODUCTION_ACTION_POLICY);
    assert.throws(() => prepareAction(rt, act(), AS('founder')), code('ACTION_KIND_UNREGISTERED'));
    assert.equal(events(rt).length, 1);
  }, { authority: NO_TRUSTED_AUTHORITY, actionPolicy: PRODUCTION_ACTION_POLICY });
  withRt((rt) => {
    for (const k of ['authority', 'policy', 'required_authority', 'requires_ref']) {
      assert.throws(() => prepareAction(rt, { ...act(), [k]: k === 'requires_ref' ? false : 'coo' }, AS('founder')), code('ACTION_INVALID'));
    }
    assert.throws(() => prepareAction(rt, act({ kind: 'fixture.unknown' }), AS('coo')), code('ACTION_KIND_UNREGISTERED'));
  });
});

test('policy: aynı action_id + aynı intent + daha zayıf policy → mevcut güçlü eylem sessizce döndürülmez', () => {
  const seen = [];
  withRt((rt) => {
    prepareAction(rt, act(), AS('coo'));
    const weak = rt.with({ actionPolicy: WEAKER_TEST_ONLY_POLICY });
    assert.throws(() => prepareAction(weak, act(), AS('coo')), code('POLICY_CONFLICT'));
    assert.throws(() => authorizeAction(weak, 'ACT-T1', { actor_role: 'coo' }), code('POLICY_CONFLICT'));
    assert.deepEqual(seen, [], 'verifier never consulted under a downgraded policy');
    authorizeAction(rt, 'ACT-T1', FOUNDER_OK);
    let calls = 0;
    assert.throws(() => executeAction(weak, act(), () => { calls++; return { outcome: 'SUCCESS' }; }, AS('coo')), code('POLICY_CONFLICT'));
    assert.equal(calls, 0);
    const a = readAction(rt, 'ACT-T1');
    assert.equal(a.policy.required_authority, 'founder');
    assert.equal(a.grant.authority, 'founder');
  }, { authority: testOnlyAuthority(seen) });
});

test('spoof: canlı yolda `founder` rol dizesi Founder ya da başka korumalı yetkiyi veremez', () => withRt((rt) => {
  prepareAction(rt, act({ requested_by: 'founder' }), AS('founder'));
  prepareAction(rt, act({ action_id: 'ACT-T2', kind: 'fixture.coo' }), AS('coo'));
  const n = events(rt).length;
  for (const actor of ['founder', 'coo', 'production-engineer']) {
    assert.throws(() => authorizeAction(rt, 'ACT-T1', { actor_role: actor, approval_ref: 'D-999' }), code('FOUNDER_APPROVAL_REQUIRED'));
  }
  assert.throws(() => authorizeAction(rt, 'ACT-T2', { actor_role: 'coo' }), code('TRUSTED_AUTHORITY_UNAVAILABLE'));
  assert.equal(events(rt).length, n);
  let calls = 0;
  assert.throws(() => executeAction(rt, act({ requested_by: 'founder' }), () => { calls++; return { outcome: 'SUCCESS' }; }, AS('founder')), code('NOT_AUTHORIZED'));
  assert.equal(calls, 0);
}, LIVE));

test('trusted authority: biçimsiz doğrulayıcı cevabı yetki sayılmaz', () => withRt((rt) => {
  prepareAction(rt, act(), AS('coo'));
  assert.throws(() => authorizeAction(rt, 'ACT-T1', FOUNDER_OK), code('AUTHORITY_REJECTED'));
  assert.equal(readAction(rt, 'ACT-T1').state, 'PREPARED');
}, { authority: { id: 'TEST-ONLY-broken', verify: () => true } }));

// ---------- eylem yaşam döngüsü ve idempotency ----------
test('eylem: PREPARED → AUTHORIZED → EXECUTING → EXECUTED → VERIFIED; grant policy\'ye ve kimliğe bağlı', () => withRt((rt) => {
  createJob(rt, job(), AS('coo'));
  const { action } = prepareAction(rt, act({ job_id: 'JOB-T1' }), AS('coo'));
  assert.equal(action.policy.policy_id, 'TEST-ONLY:fixture.noop@1');
  assert.throws(() => executeAction(rt, act({ job_id: 'JOB-T1' }), ok(), AS('coo')), code('NOT_AUTHORIZED'));
  assert.throws(() => authorizeAction(rt, 'ACT-T1', { actor_role: 'founder' }), code('AUTHORITY_REF_REQUIRED'));
  const au = authorizeAction(rt, 'ACT-T1', FOUNDER_OK).action;
  assert.deepEqual({ ...au.grant, at: undefined }, { authority: 'founder', purpose: 'action.authorize:fixture.noop', subject: action.identity, source: 'TEST-ONLY',
    approval_ref: 'D-999', verifier: 'TEST-ONLY-fixture', recorded_by: 'coo', at: undefined });
  const ex = executeAction(rt, act({ job_id: 'JOB-T1' }), ok({ ref: 'fixture-42', tokens_used: 10 }), AS('coo')).action;
  assert.equal(ex.state, 'EXECUTED');
  assert.deepEqual(ex.receipt, { ref: 'fixture-42', tokens_used: 10 });
  assert.equal(verifyAction(rt, 'ACT-T1', () => ({ verified: true, evidence: { checked: 'fixture-42' } }), AS('coo')).action.state, 'VERIFIED');
  assert.deepEqual(events(rt).filter((e) => e.type.startsWith('ACTION_')).map((e) => e.type),
    ['ACTION_PREPARED', 'ACTION_AUTHORIZED', 'ACTION_EXECUTING', 'ACTION_EXECUTED', 'ACTION_VERIFIED']);
  assert.ok(events(rt).filter((e) => e.type.startsWith('ACTION_')).every((e) => e.job_id === 'JOB-T1'));
  assert.throws(() => prepareAction(rt, act({ action_id: 'ACT-T9', job_id: 'JOB-NOPE' }), AS('coo')), code('JOB_NOT_FOUND'));
}));

test('idempotency A: aynı action_id + aynı intent EXECUTED/VERIFIED sonrası ikinci kez yürütülmez', () => withRt((rt) => {
  prepareAction(rt, act(), AS('coo'));
  const n = events(rt).length;
  assert.equal(prepareAction(rt, act({ intent: { n: 1, target: 'fixture' } }), AS('coo')).replay, true, 'key order is not a different intent');
  assert.equal(events(rt).length, n);
  authorizeAction(rt, 'ACT-T1', FOUNDER_OK);
  let calls = 0;
  const exec = () => { calls++; return { outcome: 'SUCCESS', receipt: { n: calls } }; };
  executeAction(rt, act(), exec, AS('coo'));
  const again = executeAction(rt, act(), exec, AS('coo'));
  assert.equal(again.replay, true);
  assert.deepEqual(again.action.receipt, { n: 1 });
  verifyAction(rt, 'ACT-T1', () => ({ verified: true }), AS('coo'));
  assert.equal(executeAction(rt, act(), exec, AS('coo')).replay, true);
  assert.equal(calls, 1);
  assert.equal(verifyAction(rt, 'ACT-T1', () => { throw new Error('must not run'); }, AS('coo')).replay, true);
}));

test('idempotency B: aynı action_id + farklı intent → IDEMPOTENCY_CONFLICT', () => withRt((rt) => {
  prepareAction(rt, act(), AS('coo'));
  assert.throws(() => prepareAction(rt, act({ intent: { target: 'fixture', n: 2 } }), AS('coo')), code('IDEMPOTENCY_CONFLICT'));
  assert.throws(() => prepareAction(rt, act({ kind: 'fixture.coo' }), AS('coo')), code('IDEMPOTENCY_CONFLICT'));
  authorizeAction(rt, 'ACT-T1', FOUNDER_OK);
  let calls = 0;
  assert.throws(() => executeAction(rt, act({ intent: { target: 'elsewhere', n: 1 } }), () => { calls++; return { outcome: 'SUCCESS' }; }, AS('coo')), code('IDEMPOTENCY_CONFLICT'));
  assert.equal(calls, 0);
}));

test('idempotency C: belirsiz sonuç VERIFIED olamaz, yeniden yürütülmez; kaydı yapılamayan yürütme belirsiz kalır', () => withRt((rt) => {
  const ready = (id) => { prepareAction(rt, act({ action_id: id }), AS('coo')); authorizeAction(rt, id, FOUNDER_OK); };
  ready('ACT-U1');
  let calls = 0;
  const unknown = () => { calls++; return { outcome: 'UNKNOWN', receipt: { note: 'timeout after send' } }; };
  assert.equal(executeAction(rt, act({ action_id: 'ACT-U1' }), unknown, AS('coo')).action.result, 'UNKNOWN');
  assert.throws(() => verifyAction(rt, 'ACT-U1', () => ({ verified: true }), AS('coo')), code('VERIFY_REFUSED_AMBIGUOUS'));
  assert.equal(executeAction(rt, act({ action_id: 'ACT-U1' }), unknown, AS('coo')).replay, true);
  assert.equal(calls, 1);
  ready('ACT-U2');
  assert.equal(executeAction(rt, act({ action_id: 'ACT-U2' }), () => { throw new Error('socket hang up'); }, AS('coo')).action.result, 'UNKNOWN');
  ready('ACT-U3');
  assert.equal(executeAction(rt, act({ action_id: 'ACT-U3' }), () => 'ok', AS('coo')).action.result, 'UNKNOWN');
  // Gerçek yol: dış yan etki oldu ama sonuç kaydı yapılamadı (yürütme sırasında başka bir süreç kilidi tuttu / süreç çöktü)
  ready('ACT-U4');
  let sideEffects = 0;
  const lockDuringRun = () => { sideEffects++; writeFileSync(join(rt.dir, '.lock'), JSON.stringify({ pid: 1, machine: 'OTHER', at: 'x' })); return { outcome: 'SUCCESS', receipt: {} }; };
  assert.throws(() => executeAction(rt, act({ action_id: 'ACT-U4' }), lockDuringRun, AS('coo')), code('LOCKED'));
  assert.equal(readAction(rt, 'ACT-U4').state, 'EXECUTING', 'the side effect happened but its result is not recorded');
  unlinkSync(join(rt.dir, '.lock'));
  assert.throws(() => executeAction(rt, act({ action_id: 'ACT-U4' }), lockDuringRun, AS('coo')), code('AMBIGUOUS_IN_FLIGHT'));
  assert.throws(() => verifyAction(rt, 'ACT-U4', () => ({ verified: true }), AS('coo')), code('ACTION_STATE'));
  assert.equal(sideEffects, 1, 'never re-executed automatically');
  ready('ACT-U5');
  executeAction(rt, act({ action_id: 'ACT-U5' }), ok(), AS('coo'));
  assert.throws(() => verifyAction(rt, 'ACT-U5', () => ({ verified: 'maybe' }), AS('coo')), code('VERIFY_INCONCLUSIVE'));
  assert.equal(verifyAction(rt, 'ACT-U5', () => ({ verified: false }), AS('coo')).action.state, 'FAILED');
  ready('ACT-U6');
  assert.equal(executeAction(rt, act({ action_id: 'ACT-U6' }), () => ({ outcome: 'FAILURE', receipt: { http: 500 } }), AS('coo')).action.state, 'FAILED');
  assert.throws(() => executeAction(rt, act({ action_id: 'ACT-U6' }), ok(), AS('coo')), code('ACTION_FAILED_TERMINAL'));
  const d = doctor(rt);
  assert.deepEqual(d.actions.in_flight, ['ACT-U4']);
  assert.deepEqual(d.actions.unknown_result, ['ACT-U1', 'ACT-U2', 'ACT-U3']);
  assert.equal(listActions(rt).filter((x) => x.state === 'VERIFIED').length, 0);
}));

test('idempotency D: secret içeren receipt saklanmaz ve sonuç UNKNOWN; secret kanıt reddedilir', () => withRt((rt) => {
  prepareAction(rt, act(), AS('coo'));
  authorizeAction(rt, 'ACT-T1', FOUNDER_OK);
  const a = executeAction(rt, act(), () => ({ outcome: 'SUCCESS', receipt: { access_token: 'abc', ref: FAKE.github() } }), AS('coo')).action;
  assert.equal(a.result, 'UNKNOWN');
  assert.equal(a.receipt.withheld, true);
  const raw = snapshot(rt.dir).join('\n');
  assert.ok(!raw.includes(FAKE.github()) && !raw.includes('access_token'), 'secret never reaches disk');
  prepareAction(rt, act({ action_id: 'ACT-T2' }), AS('coo'));
  authorizeAction(rt, 'ACT-T2', FOUNDER_OK);
  executeAction(rt, act({ action_id: 'ACT-T2' }), ok(), AS('coo'));
  assert.throws(() => verifyAction(rt, 'ACT-T2', () => ({ verified: true, evidence: { header: `Bearer ${FAKE.jwt()}` } }), AS('coo')), code('SECRET_REJECTED'));
  assert.equal(readAction(rt, 'ACT-T2').state, 'EXECUTED');
}));

// ---------- secret tarayıcı ----------
test('secret tarayıcı: temsilî biçimler yakalanır, yalnız kategori + yol raporlanır; masum metin geçer', () => {
  const hits = {
    'sk_live key': { v: FAKE.stripe() },
    'jwt bearer': { h: `Bearer ${FAKE.jwt()}` },
    'bare jwt': { v: FAKE.jwt() },
    ELEVENLABS_API_KEY: { ELEVENLABS_API_KEY: 'x' },
    'x-api-key': { 'x-api-key': 'x' },
    'xi-api-key': { headers: { 'xi-api-key': 'x' } },
    auth_token: { auth_token: 'x' },
    authToken: { authToken: 'x' },
    'password=': { note: FAKE.password() },
    Authorization: { Authorization: 'x' },
    'private key block': { pem: FAKE.pem() },
    'github token': { list: [FAKE.github()] },
    'url credentials': { url: `https://user:${'pw123'}@example.invalid/x` },
  };
  for (const [name, value] of Object.entries(hits)) {
    const f = secretFindings(value);
    assert.ok(f.length > 0, `not detected: ${name}`);
    for (const line of f) assert.ok(!line.includes(FAKE.jwt()) && !line.includes(FAKE.stripe()) && !line.includes('hunter2') && !line.includes(FAKE.github()), `finding leaks a value: ${name}`);
  }
  assert.match(secretFindings({ a: { b: [FAKE.stripe()] } })[0], /^\$\.a\.b\[0\] \(stripe-style key\)$/);
  for (const clean of [{ tokens_used: 12 }, { authority: 'founder', required_authority: 'founder' }, { note: 'Basic authentication of the narrator' },
    { note: 'Bearer of bad news' }, { approval_ref: 'D-048' }, { hash: 'a'.repeat(64) }, { session_count: 3 }]) {
    assert.deepEqual(secretFindings(clean), [], `false positive: ${JSON.stringify(clean)}`);
  }
});

// ---------- kilit / geçici dosya / doctor ----------
test('fail-closed: kilit duruyorsa mutasyon reddedilir; kilit silinmez; doctor STALE_LOCK + elle kurtarma', () => withRt((rt) => {
  const lockFile = join(rt.dir, '.lock');
  writeFileSync(lockFile, JSON.stringify({ pid: 4242, machine: 'OTHER-PC', at: '2026-10-16T00:00:00Z' }));
  assert.throws(() => createJob(rt, job(), AS('coo')), code('LOCKED'));
  assert.throws(() => pauseCompany(rt, { actor_role: 'coo', reason: 'x' }), code('LOCKED'));
  assert.throws(() => reproject(rt, { actor_role: 'coo', reason: 'x' }), code('LOCKED'));
  const r = doctor(rt);
  assert.equal(r.status, 'STALE_LOCK');
  assert.deepEqual(r.lock, { pid: 4242, machine: 'OTHER-PC', at: '2026-10-16T00:00:00Z' });
  assert.ok(r.problems.some((p) => /MANUAL RECOVERY REQUIRED/.test(p) && /pid 4242 on OTHER-PC/.test(p)));
  writeFileSync(lockFile, 'garbage');
  assert.deepEqual(doctor(rt).lock, { unreadable: true });
  assert.ok(existsSync(lockFile), 'never auto-deleted');
}));

test('geçici dosya: kesintiye uğramış yazım kanıtı görünür, silinmez, mutasyonu ve reproject\'i durdurur', () => withRt((rt) => {
  createJob(rt, job(), AS('coo'));
  const leftover = join(rt.dir, 'jobs', '.JOB-T1.json.tmp-999-deadbeef');
  writeFileSync(leftover, '{"half":');
  const d = doctor(rt);
  assert.equal(d.status, 'INTERRUPTED_WRITE');
  assert.deepEqual(d.temp_files, ['jobs/.JOB-T1.json.tmp-999-deadbeef']);
  assert.throws(() => transitionJob(rt, 'JOB-T1', 'READY', { actor_role: 'coo', reason: 'x' }), code('INTERRUPTED_WRITE'));
  assert.throws(() => reproject(rt, { actor_role: 'coo', reason: 'x' }), code('INTERRUPTED_WRITE'));
  assert.ok(existsSync(leftover));
  writeFileSync(join(rt.dir, '.state.json.tmp-1-ab'), '');
  assert.equal(doctor(rt).temp_files.length, 2);
}));

test('doctor: salt-okunur, gerekli alanları raporlar, UNKNOWN uydurmaz', () => withRt((rt) => {
  createJob(rt, job(), AS('coo'));
  pauseCompany(rt, { actor_role: 'coo', reason: 'read-only check' });
  const before = snapshot(rt.dir);
  const r = doctor(rt);
  assert.deepEqual(snapshot(rt.dir), before, 'doctor wrote nothing');
  assert.equal(r.status, 'HEALTHY');
  assert.equal(r.company_mode, 'PAUSED');
  assert.equal(r.runtime.schema, 'company-runtime/1');
  assert.equal(r.runtime.control_plane_version, '1B.3');
  assert.equal(r.jobs.by_state.PLANNED, 1);
  assert.equal(r.node, process.version);
  assert.match(r.git, /^git version /);
  assert.match(r.repo.commit, /^[0-9a-f]{40}$/);
  assert.ok([true, false].includes(r.repo.clean));
  assert.equal(r.company_os_version, readFileSync(join(ROOT, 'os', 'VERSION'), 'utf8').trim());
  assert.match(r.claude_code_version, /^UNKNOWN/);
  assert.match(r.claude_model, /^UNKNOWN/);
  assert.match(r.trusted_authority, /^INJECTED/);
}));

test('gerçek company/state/runtime: olay günlüğü geçerli, projeksiyonlar replay ile aynı, TEST-ONLY yetki yok; doctor değiştirmez', () => {
  const rt = runtimeContext({ dir: DEFAULT_RUNTIME_DIR });
  const s = inspect(rt);
  assert.deepEqual([...s.log.errors, ...s.replayErrors], []);
  assert.deepEqual(s.divergence, []);
  assert.deepEqual(s.tempFiles, []);
  assert.ok(!s.locked, 'no stale lock in the committed runtime');
  assert.ok(!/TEST-ONLY/.test(readFileSync(join(DEFAULT_RUNTIME_DIR, 'events.jsonl'), 'utf8')), 'no TEST-ONLY grant or policy in the real event log');
  assert.ok(s.log.events.every((e) => e.event_version === EVENT_VERSION), 'every real event is versioned');
  const pred = s.log.events[0].details.predecessor;
  if (pred) {
    assert.equal(createHash('sha256').update(readFileSync(join(DEFAULT_RUNTIME_DIR, pred.file))).digest('hex'), pred.sha256, 'archived predecessor log is byte-identical to what genesis recorded');
  }
  const before = snapshot(DEFAULT_RUNTIME_DIR);
  const r = doctor(rt);
  assert.deepEqual(snapshot(DEFAULT_RUNTIME_DIR), before);
  assert.equal(r.status, 'HEALTHY', r.problems.join('\n'));
  assert.match(r.trusted_authority, /^UNAVAILABLE/);
});

// ---------- CLI (gerçek üretim yolu: doğrulayıcı/policy enjekte edilmez) ----------
test('CLI: --as founder hiçbir korumalı işlemi açmaz; status PAUSED iken çalışır', () => withRt((rt) => {
  const cli = join(ROOT, 'os', 'control', 'company.mjs');
  const run = (...a) => {
    try { return { code: 0, out: execFileSync(process.execPath, [cli, ...a, '--runtime-dir', rt.dir], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) }; }
    catch (e) { return { code: e.status, out: `${e.stdout}${e.stderr}` }; }
  };
  const jf = join(rt.dir, '..', 'job.json');
  writeFileSync(jf, JSON.stringify(job()));
  assert.equal(run('job', 'create', '--file', jf, '--as', 'coo').code, 0);
  for (const s of ['READY', 'IN_PROGRESS', 'AWAITING_FOUNDER']) assert.equal(run('job', 'transition', 'JOB-T1', s, '--as', 'coo', '--reason', s).code, 0);
  const t = run('job', 'transition', 'JOB-T1', 'COMPLETE', '--as', 'founder', '--reason', 'approved');
  assert.equal(t.code, 1);
  assert.match(t.out, /REFUSED FOUNDER_APPROVAL_REQUIRED/);
  assert.match(run('job', 'approve', 'JOB-T1', '--as', 'founder', '--approval-ref', 'D-048').out, /REFUSED FOUNDER_APPROVAL_REQUIRED/);
  prepareAction(rt.with({ authority: NO_TRUSTED_AUTHORITY }), act(), AS('coo')); // TEST-ONLY policy ile hazırlanmış eylem
  assert.match(run('action', 'authorize', 'ACT-T1', '--as', 'founder', '--approval-ref', 'D-999').out, /REFUSED ACTION_KIND_UNREGISTERED|REFUSED FOUNDER_APPROVAL_REQUIRED/);
  assert.equal(readAction(rt, 'ACT-T1').state, 'PREPARED');
  assert.equal(run('pause', '--as', 'coo', '--reason', 'cli test').code, 0);
  const spoof = run('resume', '--as', 'founder', '--reason', 'done', '--approval-ref', 'D-999');
  assert.equal(spoof.code, 1);
  assert.match(spoof.out, /REFUSED FOUNDER_APPROVAL_REQUIRED/);
  const st = run('status');
  assert.equal(st.code, 0);
  assert.match(st.out, /Mode \(events\):\s+PAUSED \(cli test\)/);
  assert.equal(run('events', 'verify').code, 0);
  assert.equal(run('nonsense').code, 2);
}, LIVE));

// ---------- olay sürümü ----------
// Son olayı değiştirip (isteğe bağlı) hash'i yeniden hesaplar: zincir bütünlüğü sağlam ama içerik sahte senaryoları için.
function rewriteLast(rt, fn, { rehash = true } = {}) {
  const f = join(rt.dir, 'events.jsonl');
  const lines = readFileSync(f, 'utf8').trim().split('\n');
  const e = JSON.parse(lines.at(-1));
  fn(e);
  if (rehash) e.hash = hashEvent(e);
  lines[lines.length - 1] = JSON.stringify(e);
  writeFileSync(f, `${lines.join('\n')}\n`);
}

test('olay sürümü: her yeni olay güncel sürümü taşır ve normal replay olur', () => withRt((rt) => {
  createJob(rt, job(), AS('coo'));
  pauseCompany(rt, { actor_role: 'coo', reason: 'p' });
  resumeCompany(rt, { actor_role: 'coo', reason: 'r', approval_ref: 'D-1' });
  prepareAction(rt, act(), AS('coo'));
  assert.equal(EVENT_VERSION, 1);
  assert.ok(events(rt).every((e) => e.event_version === 1));
  assert.equal(doctor(rt).status, 'HEALTHY');
  assert.equal(loadModel(rt).head.seq, 5);
}));

test('olay sürümü: eksik veya bilinmeyen sürüm (hash yeniden hesaplanmış olsa bile) fail-closed', () => {
  for (const [label, fn, re] of [
    ['missing', (e) => { delete e.event_version; }, /missing event_version/],
    ['future', (e) => { e.event_version = 2; }, /unsupported event_version 2/],
    ['zero', (e) => { e.event_version = 0; }, /unsupported event_version 0/],
    ['string', (e) => { e.event_version = '1'; }, /unsupported event_version "1"/],
    ['null', (e) => { e.event_version = null; }, /unsupported event_version null/],
  ]) {
    withRt((rt) => {
      createJob(rt, job(), AS('coo'));
      rewriteLast(rt, fn);
      const s = inspect(rt);
      assert.ok(s.log.errors.some((x) => re.test(x)), `${label}: ${s.log.errors.join('; ')}`);
      const before = snapshot(rt.dir);
      assert.throws(() => transitionJob(rt, 'JOB-T1', 'READY', { actor_role: 'coo', reason: 'x' }), code('EVENT_LOG_BROKEN'));
      assert.throws(() => reproject(rt, { actor_role: 'coo', reason: 'x' }), code('EVENT_LOG_BROKEN'));
      assert.throws(() => readJob(rt, 'JOB-T1'), code('EVENT_LOG_BROKEN'));
      assert.deepEqual(snapshot(rt.dir), before, `${label}: nothing written`);
      assert.equal(doctor(rt).status, 'BROKEN_EVENT_LOG');
    });
  }
});

test('olay sürümü: hash\'in kapsamındadır; hash yeniden hesaplanmadan sürüm değiştirmek/silmek bütünlüğü bozar', () => withRt((rt) => {
  createJob(rt, job(), AS('coo'));
  const e = events(rt).at(-1);
  assert.notEqual(hashEvent(e), hashEvent({ ...e, event_version: 2 }));
  const { event_version, ...unversioned } = e;
  void event_version;
  assert.notEqual(hashEvent(e), hashEvent(unversioned));
  // Geçerli sürüm korunur ama başka bir alan sürümle birlikte "yeniden etiketlenirse" hash kırılır
  rewriteLast(rt, (x) => { x.event_version = 1; x.actor_role = 'founder'; }, { rehash: false });
  assert.ok(inspect(rt).log.errors.some((x) => /hash mismatch/.test(x)));
  assert.equal(doctor(rt).status, 'BROKEN_EVENT_LOG');
}));

test('olay sürümü: genesis, arşivlenmiş sürümsüz günlüğe bayt hash\'iyle bağlanır; arşiv yeniden oynatılmaz', () => {
  const base = mkdtempSync(join(tmpdir(), 'cos-pred-'));
  try {
    const rt = runtimeContext({ dir: join(base, 'rt') });
    mkdirSync(join(rt.dir, 'archive'), { recursive: true });
    const legacy = '{"seq":1,"type":"RUNTIME_INITIALIZED"}\n{"seq":2,"type":"RUNTIME_REPROJECTED"}\n';
    writeFileSync(join(rt.dir, 'archive', 'events-old.jsonl'), legacy);
    assert.throws(() => initRuntime(rt, { actor_role: 'coo', predecessor: { file: '../outside.jsonl', reason: 'x' } }), code('PREDECESSOR_INVALID'));
    initRuntime(rt, { actor_role: 'coo', predecessor: { file: 'archive/events-old.jsonl', reason: 'unversioned' } });
    const g = events(rt)[0];
    assert.equal(g.details.predecessor.line_count, 2);
    assert.match(g.details.predecessor.sha256, /^[0-9a-f]{64}$/);
    assert.equal(readFileSync(join(rt.dir, 'archive', 'events-old.jsonl'), 'utf8'), legacy, 'archive untouched');
    assert.equal(doctor(rt).status, 'HEALTHY');
  } finally { rmSync(base, { recursive: true, force: true }); }
});

// ---------- güvenli kimlik / yol kaçışı ----------
const UNSAFE_BODIES = ['../escape', '..\\escape', 'C:\\escape', 'C:escape', '/absolute', '\\\\server\\share', 'foo/bar', 'foo\\bar', '.', '..', '   ', '',
  ' X', 'X ', '\tX', 'X\n', 'X\u0000', 'x', 'Abc', 'X.', '.X', '-X', 'CON', 'nul', 'COM1', 'LPT9', 'CON.txt', 'X\u00c9', 'X\u2215Y', 'X:Y', 'X*', 'X?', 'a'.repeat(65)];
const unsafeIds = (prefix) => [
  '../escape', '..\\escape', 'C:\\escape', '/absolute', 'foo/bar', 'foo\\bar', '.', '..', '   ', ` ${prefix}-X`, `${prefix}-X `,
  ...UNSAFE_BODIES.map((b) => `${prefix}-${b}`), `${prefix.toLowerCase()}-X`, `${prefix}X`, `${prefix}--X`.replace('--', '-/'),
];

test('güvenli kimlik: tek doğrulayıcı tehlikeli job_id/action_id\'leri reddeder, temizlemez; geçerli kimlik kabul edilir', () => {
  for (const [kind, prefix] of [['job', 'JOB'], ['action', 'ACT']]) {
    for (const id of unsafeIds(prefix)) {
      assert.ok(safeIdError(kind, id), `${kind} accepted unsafe id ${JSON.stringify(id)}`);
      assert.throws(() => recordPath('/tmp/rt', kind, id), code('ID_UNSAFE'));
    }
    for (const id of [`${prefix}-OK`, `${prefix}-OK_1.2`, `${prefix}-A-B_C.D9`, `${prefix}-${'A'.repeat(64)}`]) assert.equal(safeIdError(kind, id), null, `${kind} rejected ${id}`);
    assert.ok(safeIdError(kind, 42) && safeIdError(kind, null) && safeIdError(kind, undefined));
  }
});

test('yol kaçışı: reddedilen hiçbir kimlik jobs/ veya actions/ dışında (ya da içinde) dosya oluşturmaz', () => withRt((rt) => {
  const base = join(rt.dir, '..');
  const before = snapshot(base);
  for (const id of unsafeIds('JOB')) assert.throws(() => createJob(rt, job({ job_id: id }), AS('coo')), code('JOB_INVALID'), JSON.stringify(id));
  for (const id of unsafeIds('ACT')) assert.throws(() => prepareAction(rt, act({ action_id: id }), AS('coo')), code('ACTION_ID_INVALID'), JSON.stringify(id));
  for (const id of ['../escape', 'JOB-../x']) {
    assert.throws(() => transitionJob(rt, id, 'READY', { actor_role: 'coo', reason: 'x' }), code('JOB_NOT_FOUND'));
    assert.throws(() => readJob(rt, id), code('JOB_NOT_FOUND'));
    assert.throws(() => readAction(rt, id), code('ACTION_NOT_FOUND'));
  }
  assert.deepEqual(snapshot(base), before, 'no file created anywhere under the temp root');
  assert.equal(events(rt).length, 1, 'no event written');
  createJob(rt, job({ job_id: 'JOB-OK_1.2' }), AS('coo'));
  prepareAction(rt, act({ action_id: 'ACT-OK_1.2' }), AS('coo'));
  assert.ok(existsSync(join(rt.dir, 'jobs', 'JOB-OK_1.2.json')));
  assert.ok(existsSync(join(rt.dir, 'actions', 'ACT-OK_1.2.json')));
  assert.equal(JSON.parse(readFileSync(join(rt.dir, 'jobs', 'JOB-OK_1.2.json'), 'utf8')).job_id, 'JOB-OK_1.2', 'file name and id match exactly');
}));

test('yol kaçışı: zinciri doğru, kaçış kimliği taşıyan sahte olay replay\'de reddedilir; reproject hiçbir dosya yazmaz', () => withRt((rt) => {
  createJob(rt, job(), AS('coo'));
  const base = join(rt.dir, '..');
  rewriteLast(rt, (e) => { e.job_id = 'JOB-../../escape'; e.details.job.job_id = 'JOB-../../escape'; });
  const before = snapshot(base);
  assert.equal(doctor(rt).status, 'BROKEN_EVENT_LOG');
  assert.throws(() => reproject(rt, { actor_role: 'coo', reason: 'x' }), code('EVENT_LOG_BROKEN'));
  assert.throws(() => createJob(rt, job({ job_id: 'JOB-T2' }), AS('coo')), code('EVENT_LOG_BROKEN'));
  assert.deepEqual(snapshot(base), before);
  assert.ok(!existsSync(join(base, 'escape.json')) && !existsSync(join(base, '..', 'escape.json')));
}));
