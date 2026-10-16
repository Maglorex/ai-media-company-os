// Company OS control plane (Gate 1B) — genel yerel eylem kaydı, receipt ve idempotency. Durum olaylardan türetilir;
// actions/*.json yalnız projeksiyondur. Gate 1B gerçek ücretli/uzak eylem yapmaz: executor/verifier çağırandan gelir.
// Yetki gereksinimi çağıranın seçimi değildir: eylem türünün güvenilir policy'sinden gelir (policyFor); kayıtsız tür fail-closed.
// Kurallar:
//  A. Aynı action_id + aynı intent + aynı policy, EXECUTED/VERIFIED sonrası → ikinci yürütme yok (executor çağrılmaz).
//  B. Aynı action_id + farklı intent → IDEMPOTENCY_CONFLICT; aynı intent + farklı policy → POLICY_CONFLICT (zayıf eylem döndürülmez).
//  C. Belirsiz dış sonuç (UNKNOWN, executor hatası, kaydı yapılamamış EXECUTING) asla VERIFIED olmaz ve yeniden yürütülmez.
//     Çökme sonrası dış sağlayıcıda yan etkinin olup olmadığını kanıtlamanın genel yolu yoktur: durum "belirsiz / uzlaştırma gerekli"dir.
//     Sağlayıcıya özgü idempotency/uzlaştırma gelecekteki eylem adaptörlerinin işidir.
//  D. Receipt/intent/kanıt secret içeremez; secret benzeri receipt saklanmaz, sonuç UNKNOWN sayılır.
import { ControlError, isPlainObject, nonEmpty, canon, clone, policyFor, requestGrant, secretFindings, assertNoSecrets, safeIdError } from './common.mjs';
import { mutate, loadModel } from './runtime.mjs';
import { fingerprintOf, identityOf } from './model.mjs';

export { ACTION_STATES, fingerprintOf, identityOf } from './model.mjs';

const REQ_FIELDS = ['action_id', 'kind', 'job_id', 'intent', 'requested_by'];

function checkReq(req) {
  if (!isPlainObject(req)) throw new ControlError('ACTION_INVALID', 'request must be an object');
  for (const k of ['authority', 'policy', 'required_authority', 'requires_ref']) {
    if (k in req) throw new ControlError('ACTION_INVALID', `${k} cannot be chosen by the caller; it comes from the trusted policy for the action kind`);
  }
  const unknown = Object.keys(req).filter((k) => !REQ_FIELDS.includes(k));
  if (unknown.length) throw new ControlError('ACTION_INVALID', `unknown fields: ${unknown.join(', ')}`);
  const idErr = safeIdError('action', req.action_id);
  if (idErr) throw new ControlError('ACTION_ID_INVALID', idErr);
}

// Kayıtlı eylemin hem intent'i hem güvenilir policy'si istekle/güncel policy tablosuyla aynı olmalı.
function sameIdentityOrThrow(rt, a, req) {
  if (a.fingerprint !== fingerprintOf({ kind: req.kind, job_id: req.job_id ?? null, intent: req.intent })) {
    throw new ControlError('IDEMPOTENCY_CONFLICT', `${a.action_id} already exists with a different intent`);
  }
  const current = policyFor(rt, a.kind);
  if (canon(current) !== canon(a.policy)) {
    throw new ControlError('POLICY_CONFLICT', `${a.action_id} was recorded under policy ${a.policy.policy_id}; the current trusted policy differs (${current.policy_id})`);
  }
}

// req: { action_id, kind, job_id?, intent, requested_by }. requested_by yalnız atıftır.
export function prepareAction(rt, req, { actor_role }) {
  checkReq(req);
  return mutate(rt, { actor_role }, (m) => {
    const existing = m.actions[req.action_id];
    if (existing) {
      sameIdentityOrThrow(rt, existing, req);
      return { result: () => ({ action: clone(existing), replay: true }) };
    }
    const policy = policyFor(rt, req.kind);
    const job_id = req.job_id ?? null;
    const fingerprint = fingerprintOf({ kind: req.kind, job_id, intent: req.intent });
    const action = { action_id: req.action_id, kind: req.kind, job_id, intent: clone(req.intent), fingerprint, policy, identity: identityOf(fingerprint, policy), requested_by: req.requested_by };
    return { event: { type: 'ACTION_PREPARED', job_id, details: { action } }, result: (n) => ({ action: clone(n.actions[req.action_id]), replay: false }) };
  });
}

// Yetki yalnız rt.authority doğrulayıcısından; actor_role yalnız kaydı yapanın atfıdır.
export function authorizeAction(rt, id, { actor_role, approval_ref = null }) {
  return mutate(rt, { actor_role }, (m) => {
    const a = m.actions[id];
    if (!a) throw new ControlError('ACTION_NOT_FOUND', String(id));
    if (a.state !== 'PREPARED') {
      if (a.grant) return { result: () => ({ action: clone(a), replay: true }) };
      throw new ControlError('ACTION_STATE', `${id} is ${a.state}; cannot authorize`);
    }
    const current = policyFor(rt, a.kind);
    if (canon(current) !== canon(a.policy)) throw new ControlError('POLICY_CONFLICT', `${id}: trusted policy changed since PREPARED`);
    if (a.policy.requires_ref && !nonEmpty(approval_ref)) throw new ControlError('AUTHORITY_REF_REQUIRED', `${id} needs an approval reference`);
    const grant = requestGrant(rt, { authority: a.policy.required_authority, purpose: `action.authorize:${a.kind}`, subject: a.identity, approval_ref }, actor_role);
    return { event: { type: 'ACTION_AUTHORIZED', job_id: a.job_id, details: { action_id: id, grant } }, result: (n) => ({ action: clone(n.actions[id]), replay: false }) };
  });
}

function normalizeOutcome(out) {
  if (!isPlainObject(out) || !['SUCCESS', 'FAILURE', 'UNKNOWN'].includes(out.outcome)) return { outcome: 'UNKNOWN', receipt: { note: 'executor returned no recognizable outcome' } };
  let receipt;
  try { receipt = JSON.parse(JSON.stringify(out.receipt ?? {})); } catch { return { outcome: 'UNKNOWN', receipt: { note: 'receipt was not serializable' } }; }
  if (!isPlainObject(receipt)) return { outcome: 'UNKNOWN', receipt: { note: 'receipt was not an object' } };
  const leaks = secretFindings(receipt);
  if (leaks.length) return { outcome: 'UNKNOWN', receipt: { withheld: true, note: `receipt withheld: ${leaks.length} secret-like finding(s)` } };
  return { outcome: out.outcome, receipt };
}

// req: aynı { action_id, kind, job_id?, intent, requested_by }. executor(action) → { outcome, receipt } (senkron).
export function executeAction(rt, req, executor, { actor_role }) {
  checkReq(req);
  const started = mutate(rt, { actor_role }, (m) => {
    const a = m.actions[req.action_id];
    if (!a) throw new ControlError('ACTION_NOT_FOUND', req.action_id);
    sameIdentityOrThrow(rt, a, req);
    if (a.state === 'EXECUTED' || a.state === 'VERIFIED') return { result: () => ({ action: clone(a), replay: true }) };
    if (a.state === 'EXECUTING') throw new ControlError('AMBIGUOUS_IN_FLIGHT', `${a.action_id} was started and its result never recorded; reconcile before any retry`);
    if (a.state === 'FAILED') throw new ControlError('ACTION_FAILED_TERMINAL', `${a.action_id} failed; use a new action_id`);
    if (a.state !== 'AUTHORIZED') throw new ControlError('NOT_AUTHORIZED', `${a.action_id} is ${a.state}`);
    return { event: { type: 'ACTION_EXECUTING', job_id: a.job_id, details: { action_id: a.action_id } }, result: (n) => ({ action: clone(n.actions[a.action_id]), replay: false }) };
  });
  if (started.replay) return started;

  let out;
  try { out = executor(clone(started.action)); }
  catch (e) { out = { outcome: 'UNKNOWN', receipt: { note: 'executor threw; external effect unknown' } }; void e; }
  const { outcome, receipt } = normalizeOutcome(out);

  // Sonuç kaydı PAUSED iken de yapılır (yürütme başlamıştı). Bu kayıt başarısız olursa eylem EXECUTING'de kalır → belirsiz, yeniden yürütülmez.
  return mutate(rt, { actor_role, allowPaused: true }, (m) => {
    const a = m.actions[req.action_id];
    if (a.state !== 'EXECUTING') throw new ControlError('ACTION_STATE', `${a.action_id} changed during execution (${a.state})`);
    const event = outcome === 'FAILURE'
      ? { type: 'ACTION_FAILED', job_id: a.job_id, details: { action_id: a.action_id, phase: 'execution', reason: 'executor reported FAILURE', data: receipt } }
      : { type: 'ACTION_EXECUTED', job_id: a.job_id, details: { action_id: a.action_id, result: outcome, receipt } };
    return { event, result: (n) => ({ action: clone(n.actions[a.action_id]), replay: false }) };
  });
}

// verifier(action) → { verified: true | false | <diğer>, evidence }. Yalnız result SUCCESS + verified === true → VERIFIED.
export function verifyAction(rt, id, verifier, { actor_role }) {
  const m0 = loadModel(rt);
  if (m0.mode === 'PAUSED') throw new ControlError('PAUSED', 'company is PAUSED; verification refused');
  const pre = m0.actions[id];
  if (!pre) throw new ControlError('ACTION_NOT_FOUND', String(id));
  if (pre.state === 'VERIFIED') return { action: clone(pre), replay: true };
  if (pre.state !== 'EXECUTED') throw new ControlError('ACTION_STATE', `${id} is ${pre.state}; only EXECUTED can be verified`);
  if (pre.result !== 'SUCCESS') throw new ControlError('VERIFY_REFUSED_AMBIGUOUS', `${id} result is ${pre.result}; an ambiguous result cannot become VERIFIED`);
  const v = verifier(clone(pre));
  if (v?.verified !== true && v?.verified !== false) throw new ControlError('VERIFY_INCONCLUSIVE', `${id} stays EXECUTED; verifier gave no definite answer`);
  const evidence = isPlainObject(v.evidence) ? JSON.parse(JSON.stringify(v.evidence)) : {};
  assertNoSecrets(evidence, 'verification evidence');
  return mutate(rt, { actor_role }, (m) => {
    const a = m.actions[id];
    if (a.state !== 'EXECUTED' || a.result !== 'SUCCESS') throw new ControlError('ACTION_STATE', `${id} changed during verification`);
    const event = v.verified
      ? { type: 'ACTION_VERIFIED', job_id: a.job_id, details: { action_id: id, verification: { verified: true, evidence } } }
      : { type: 'ACTION_FAILED', job_id: a.job_id, details: { action_id: id, phase: 'verification', reason: 'verification failed', data: { verified: false, evidence } } };
    return { event, result: (n) => ({ action: clone(n.actions[id]), replay: false }) };
  });
}

export function readAction(rt, id) {
  const a = loadModel(rt).actions[id];
  if (!a) throw new ControlError('ACTION_NOT_FOUND', String(id));
  return clone(a);
}
export function listActions(rt) {
  return Object.values(loadModel(rt).actions).map(clone);
}
