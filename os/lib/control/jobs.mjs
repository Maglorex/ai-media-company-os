// Company OS control plane (Gate 1B) — genel iş (job) komutları. Tüm durum olaylardan türetilir (model.mjs);
// jobs/*.json yalnız projeksiyondur. Dağıtık zamanlayıcı, lease, timeout yok.
// Dışlayıcılık iş türünden değil açık `resource_claims`'ten gelir. Onaylar çağırandan kabul edilmez:
// yalnız yetki-doğrulanmış JOB_APPROVED olayından türetilir.
import { ControlError, isPlainObject, nonEmpty, requestGrant, clone, safeIdError } from './common.mjs';
import { mutate, loadModel } from './runtime.mjs';
import { JOB_FIELDS } from './model.mjs';

export { JOB_STATES, TRANSITIONS } from './model.mjs';

const DEFAULTS = { state: 'PLANNED', resource_claims: [], blockers: [], next_owner: null, external_actions: [], budget: null };

export function createJob(rt, input, { actor_role }) {
  if (!isPlainObject(input)) throw new ControlError('JOB_INVALID', 'input must be an object');
  if ('approvals' in input) throw new ControlError('JOB_INVALID', 'approvals cannot be supplied by the caller; they are derived only from authority-verified approval events');
  const unknown = Object.keys(input).filter((k) => !JOB_FIELDS.includes(k));
  if (unknown.length) throw new ControlError('JOB_INVALID', `unknown fields: ${unknown.join(', ')}`);
  const idErr = safeIdError('job', input.job_id);
  if (idErr) throw new ControlError('JOB_INVALID', idErr);
  const job = { ...DEFAULTS, ...clone(input) };
  return mutate(rt, { actor_role }, () => ({
    event: { type: 'JOB_CREATED', job_id: job.job_id, details: { job } },
    result: (m) => m.jobs[job.job_id],
  }));
}

export function transitionJob(rt, id, to, { actor_role, reason, blockers, next_owner }) {
  if (!nonEmpty(reason)) throw new ControlError('REASON_REQUIRED', 'state change needs a reason');
  return mutate(rt, { actor_role }, (m) => {
    const j = m.jobs[id];
    if (!j) throw new ControlError('JOB_NOT_FOUND', String(id));
    const details = {
      from: j.state, to, reason: reason.trim(),
      blockers: to === 'BLOCKED' ? (blockers ?? j.blockers) : [],
      next_owner: next_owner !== undefined ? next_owner : j.next_owner,
    };
    return { event: { type: 'JOB_STATE_CHANGED', job_id: id, details }, result: (n) => n.jobs[id] };
  });
}

// AWAITING_FOUNDER kapısından geçiş için güvenilir Founder onayı. Gate 1B canlı yolunda → FOUNDER_APPROVAL_REQUIRED.
export function approveJob(rt, id, { actor_role, approval_ref = null }) {
  return mutate(rt, { actor_role }, (m) => {
    const j = m.jobs[id];
    if (!j) throw new ControlError('JOB_NOT_FOUND', String(id));
    if (j.state !== 'AWAITING_FOUNDER') throw new ControlError('JOB_STATE', `${id} is ${j.state}, not AWAITING_FOUNDER`);
    if (j.founder_gate.approval) throw new ControlError('ALREADY_APPROVED', id);
    const grant = requestGrant(rt, { authority: 'founder', purpose: 'job.founder-gate', subject: `${id}@${j.founder_gate.entered_seq}`, approval_ref }, actor_role);
    return { event: { type: 'JOB_APPROVED', job_id: id, details: { grant } }, result: (n) => n.jobs[id] };
  });
}

// Okumalar yetkili replay modelinden gelir; projeksiyon dosyası değiştirilse bile cevap değişmez.
export function readJob(rt, id) {
  const j = loadModel(rt).jobs[id];
  if (!j) throw new ControlError('JOB_NOT_FOUND', String(id));
  return clone(j);
}
export function listJobs(rt) {
  return Object.values(loadModel(rt).jobs).map(clone);
}
