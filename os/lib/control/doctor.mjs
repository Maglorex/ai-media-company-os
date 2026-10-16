// Company OS control plane (Gate 1B) — SALT-OKUNUR company doctor / status.
// Hiçbir dosya yazmaz, onarmaz, silmez (kilit ve geçici dosyalar dahil); git'i --no-optional-locks ile çağırır.
// Durum yetkili olay replay'inden okunur; projeksiyonlar yalnız karşılaştırılır. Secret ve env değeri basmaz.
// Güvenilir yerel tespiti olmayan alanlar (Claude Code sürümü, model) UNKNOWN'dur; çıkarım yapılmaz.
import { existsSync, readFileSync } from 'node:fs';
import { hostname } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { findGit } from '../gitbin.mjs';
import { ROOT } from '../records.mjs';
import { readJson, NO_TRUSTED_AUTHORITY, PRODUCTION_ACTION_POLICY } from './common.mjs';
import { inspect } from './runtime.mjs';
import { JOB_STATES, ACTION_STATES } from './model.mjs';

// Öncelik sırası: ilk eşleşen genel durumdur; tüm koşullar `conditions` içinde listelenir.
export const STATUSES = ['RUNTIME_MISSING', 'BROKEN_EVENT_LOG', 'STALE_LOCK', 'INTERRUPTED_WRITE', 'PROJECTION_DIVERGENCE', 'HEALTHY'];

function tryGit(repoRoot, ...args) {
  try { return execFileSync(findGit(), ['--no-optional-locks', ...args], { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { return null; }
}
const countBy = (items, keys) => Object.fromEntries(keys.map((k) => [k, items.filter((x) => x.state === k).length]));

export function doctor(rt, { repoRoot = ROOT } = {}) {
  const s = inspect(rt);
  const conditions = [];
  const problems = [];
  const warnings = [];
  const m = s.model;

  if (!s.exists) { conditions.push('RUNTIME_MISSING'); problems.push(`runtime directory missing: ${rt.dir}`); }
  else if (!s.log.ok || s.replayErrors.length) {
    conditions.push('BROKEN_EVENT_LOG');
    problems.push(...s.log.errors.map((e) => `events: ${e}`), ...s.replayErrors.map((e) => `replay: ${e}`));
  }
  let lock = null;
  if (s.locked) {
    const meta = readJson(join(rt.dir, '.lock'));
    lock = meta.ok && meta.value && typeof meta.value === 'object' ? { pid: meta.value.pid ?? null, machine: meta.value.machine ?? null, at: meta.value.at ?? null } : { unreadable: true };
    conditions.push('STALE_LOCK');
    problems.push(`lock: ${lock.unreadable ? 'unreadable lock file' : `pid ${lock.pid} on ${lock.machine} since ${lock.at}`}; all mutations refuse. `
      + 'MANUAL RECOVERY REQUIRED: confirm no control-plane mutation is still running on that machine, then remove the lock by hand. Doctor never deletes it.');
  }
  if (s.tempFiles.length) {
    conditions.push('INTERRUPTED_WRITE');
    problems.push(`leftover temp files (evidence of an interrupted atomic write; inspect, then remove by hand; never auto-deleted): ${s.tempFiles.join(', ')}`);
  }
  if (s.divergence.length) {
    conditions.push('PROJECTION_DIVERGENCE');
    problems.push(...s.divergence.map((d) => `projection: ${d}`));
    problems.push('RECOVERY/REPROJECTION REQUIRED: the event log is authoritative; after investigating, run `node os/control/company.mjs reproject --as <role> --reason "<why>"`.');
  }
  const status = STATUSES.find((x) => conditions.includes(x)) ?? 'HEALTHY';

  const jobs = m ? Object.values(m.jobs) : [];
  const actions = m ? Object.values(m.actions) : [];
  const inFlight = actions.filter((a) => a.state === 'EXECUTING').map((a) => a.action_id);
  const unknown = actions.filter((a) => a.state === 'EXECUTED' && a.result === 'UNKNOWN').map((a) => a.action_id);
  if (inFlight.length) warnings.push(`actions started but never recorded (ambiguous; reconciliation required, never re-executed): ${inFlight.join(', ')}`);
  if (unknown.length) warnings.push(`actions with UNKNOWN external result (cannot be VERIFIED): ${unknown.join(', ')}`);
  const pendingFounder = jobs.filter((j) => j.state === 'AWAITING_FOUNDER' && !j.founder_gate?.approval).map((j) => j.job_id);
  if (pendingFounder.length) warnings.push(`jobs waiting for a trusted Founder approval: ${pendingFounder.join(', ')}`);

  const projState = readJson(join(rt.dir, 'state.json'));
  const porcelain = tryGit(repoRoot, 'status', '--porcelain');
  const osVersionFile = join(repoRoot, 'os', 'VERSION');
  const usingDefaults = (rt.authority ?? NO_TRUSTED_AUTHORITY) === NO_TRUSTED_AUTHORITY && (rt.actionPolicy ?? PRODUCTION_ACTION_POLICY) === PRODUCTION_ACTION_POLICY;
  const report = {
    status,
    healthy: status === 'HEALTHY',
    conditions,
    company_mode: m?.mode ?? 'UNKNOWN',
    mode_reason: m?.mode_reason ?? null,
    projected_mode: projState.ok ? projState.value?.mode ?? null : null,
    runtime: {
      dir: rt.dir,
      schema: m?.schema ?? null,
      control_plane_version: m?.control_plane_version ?? null,
      active_gate: m?.active_gate ?? null,
      resource_ownership: m ? Object.fromEntries(Object.entries(m.resources).map(([r, h]) => [r, `${h.job_id} @ ${h.owner_machine}`])) : {},
    },
    trusted_authority: usingDefaults
      ? 'UNAVAILABLE (Gate 1B: Founder-gated job exits, action authorization and resume fail closed; role strings are not authority; no action kinds registered)'
      : 'INJECTED (test/integration context — not authentication)',
    lock,
    temp_files: s.tempFiles,
    events: { ok: s.log.ok && !s.replayErrors.length, count: s.log.events.length, head_seq: s.log.head?.seq ?? null },
    jobs: { total: jobs.length, by_state: countBy(jobs, JOB_STATES) },
    actions: { total: actions.length, by_state: countBy(actions, ACTION_STATES), in_flight: inFlight, unknown_result: unknown },
    repo: {
      branch: tryGit(repoRoot, 'rev-parse', '--abbrev-ref', 'HEAD') ?? 'UNKNOWN',
      commit: tryGit(repoRoot, 'rev-parse', 'HEAD') ?? 'UNKNOWN',
      clean: porcelain === null ? 'UNKNOWN' : porcelain === '',
      changed_paths: porcelain ? porcelain.split('\n').length : 0,
    },
    machine: hostname(),
    node: process.version,
    git: tryGit(repoRoot, '--version') ?? 'UNKNOWN',
    company_os_version: existsSync(osVersionFile) ? readFileSync(osVersionFile, 'utf8').trim() : 'UNKNOWN',
    claude_code_version: 'UNKNOWN (not reliably detectable from a local process)',
    claude_model: 'UNKNOWN (not reliably detectable from a local process)',
    problems,
    warnings,
  };
  if (report.repo.clean === false) warnings.push(`working tree has ${report.repo.changed_paths} changed path(s)`);
  return report;
}

export function formatReport(r) {
  const states = (o) => Object.entries(o).filter(([, n]) => n).map(([k, n]) => `${k} ${n}`).join(', ') || 'none';
  const res = Object.entries(r.runtime.resource_ownership).map(([k, v]) => `${k} → ${v}`).join(', ') || 'none';
  const lines = [
    `COMPANY DOCTOR — ${r.status}${r.conditions.length > 1 ? ` (also: ${r.conditions.slice(1).join(', ')})` : ''}`,
    `Mode (events):     ${r.company_mode}${r.mode_reason ? ` (${r.mode_reason})` : ''}${r.projected_mode && r.projected_mode !== r.company_mode ? ` · state.json claims ${r.projected_mode} (ignored)` : ''}`,
    `Runtime:           schema ${r.runtime.schema ?? '—'} · control plane ${r.runtime.control_plane_version ?? '—'} · gate ${r.runtime.active_gate ?? '—'}`,
    `Resources held:    ${res}`,
    `Trusted authority: ${r.trusted_authority}`,
    `Lock:              ${r.lock ? 'PRESENT — manual recovery required' : 'none'} · temp files ${r.temp_files.length}`,
    `Event log:         ${r.events.ok ? 'valid' : 'BROKEN'} · ${r.events.count} events · head #${r.events.head_seq ?? '—'}`,
    `Jobs:              ${r.jobs.total} · ${states(r.jobs.by_state)}`,
    `Actions:           ${r.actions.total} · ${states(r.actions.by_state)}`,
    `Repo:              ${r.repo.branch} @ ${String(r.repo.commit).slice(0, 12)} · ${r.repo.clean === true ? 'clean' : r.repo.clean === false ? `dirty (${r.repo.changed_paths})` : 'UNKNOWN'}`,
    `Machine:           ${r.machine} · Node ${r.node} · ${r.git} · Company OS ${r.company_os_version}`,
    `Claude Code:       ${r.claude_code_version}`,
    `Model:             ${r.claude_model}`,
  ];
  for (const p of r.problems) lines.push(`PROBLEM  ${p}`);
  for (const w of r.warnings) lines.push(`WARNING  ${w}`);
  return lines.join('\n');
}
