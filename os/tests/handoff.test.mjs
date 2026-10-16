// Gate 1D-B — makineler arası iş devri ve kontrollü ilk yayın: tek yerel bare uzak + iki geçici klon (MAIN-PC = tek runtime yazıcısı,
// FACTORY-PC = yalnız okuyucu). Gerçek origin / GitHub'a hiçbir komut gitmez. TEST-ONLY politika yalnız bu dosyada.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { findGit } from '../lib/gitbin.mjs';
import { ControlError, runtimeContext } from '../lib/control/common.mjs';
import { initRuntime, loadModel } from '../lib/control/runtime.mjs';
import { readEventLog } from '../lib/control/events.mjs';
import { replay, projectionsOf } from '../lib/control/model.mjs';
import { createJob, transitionJob, assignJob } from '../lib/control/jobs.mjs';
import { safeSync, syncContext, startJobBranch, recordAssignment } from '../lib/control/safe-sync.mjs';
import { PRODUCTION_SYNC_POLICY } from '../lib/control/sync-policy.mjs';

const MAIN = 'MAIN-PC';
const FAC = 'FACTORY-PC';
const JOB = 'JOB-H1';
const BR = `job/${JOB}`;
const gitEnv = () => { const e = { ...process.env, GIT_TERMINAL_PROMPT: '0', LC_ALL: 'C' }; for (const k of Object.keys(e)) if (/^GIT_(DIR|WORK_TREE|INDEX_FILE|CONFIG.*)$/i.test(k)) delete e[k]; return e; };
const g = (cwd, ...args) => {
  const r = spawnSync(findGit(), args, { cwd, env: gitEnv(), encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`setup git ${args.join(' ')} failed: ${r.stderr}`);
  return r.stdout.trim();
};
const code = (c) => (e) => { assert.ok(e instanceof ControlError, String(e)); assert.equal(e.code, c, e.message); return true; };
const TRACES = [];

const policyFor = (url, profileArgv = ['-e', 'process.exit(0)']) => Object.freeze({
  ...PRODUCTION_SYNC_POLICY,
  policy_id: 'TEST-ONLY:safe-sync-handoff',
  remote: Object.freeze({ name: 'origin', url }),
  machine_profiles: Object.freeze({ [MAIN]: 'TEST', [FAC]: 'TEST' }),
  profiles: Object.freeze({ TEST: Object.freeze([Object.freeze({ name: 'test-only', argv: Object.freeze(profileArgv) })]) }),
  control_branch: 'main',
  runtime_writer: MAIN,
});

function setup(fn, { job = {} } = {}) {
  const base = mkdtempSync(join(tmpdir(), 'cos-handoff-'));
  const bare = join(base, 'remote.git');
  const main = join(base, 'main');
  const fac = join(base, 'factory');
  let t = Date.UTC(2026, 9, 17);
  const now = () => new Date((t += 1000)).toISOString();
  const cfg = (d, who) => { for (const [k, v] of [['user.name', who], ['user.email', `${who}@example.invalid`], ['core.autocrlf', 'false']]) g(d, 'config', k, v); };
  try {
    g(base, 'init', '--bare', '-q', '-b', 'main', bare);
    g(base, 'init', '-q', '-b', 'main', main);
    cfg(main, 'main-pc');
    g(main, 'remote', 'add', 'origin', bare);
    const rt = runtimeContext({ dir: join(main, 'company', 'state', 'runtime'), machine: MAIN, now });
    initRuntime(rt, { actor_role: 'coo' });
    createJob(rt, { job_id: JOB, type: 'render', scope: 'company', owner_role: 'production-engineer', owner_machine: MAIN, branch: BR, canonical_inputs: [], expected_outputs: [], ...job }, { actor_role: 'coo' });
    writeFileSync(join(main, 'README.md'), 'base\n');
    g(main, 'add', '-A'); g(main, 'commit', '-q', '-m', 'base');
    g(main, 'push', '-q', 'origin', 'main');
    g(base, 'clone', '-q', '-c', 'core.autocrlf=false', bare, fac); // geçici klon yapılandırması: checkout CRLF'ye çevrilmesin
    cfg(fac, 'factory-pc');
    const policy = policyFor(bare);
    const ctx = (dir, machine, o = {}) => { const trace = []; TRACES.push(trace); return syncContext({ repoDir: dir, policy: o.policy ?? policy, machine, now, trace, hooks: o.hooks ?? {} }); };
    const h = {
      base, bare, main, fac, rt, now, policy,
      mainCtx: (o) => ctx(main, MAIN, o),
      facCtx: (o) => ctx(fac, FAC, o),
      // Main PC iş akışı: kaydet → commit → (Founder'ın manuel push'unun fikstür karşılığı) push.
      assign(to, { push = true, reason = `assign to ${to}` } = {}) {
        const r = recordAssignment(h.mainCtx(), { job_id: JOB, to_machine: to, reason, actor_role: 'coo' });
        g(main, 'add', '-A'); g(main, 'commit', '-q', '-m', `assign ${to}`);
        if (push) g(main, 'push', '-q', 'origin', 'main');
        return r;
      },
      controlEvent(fn, { push = true } = {}) { fn(); g(main, 'add', '-A'); g(main, 'commit', '-q', '-m', 'control event'); if (push) g(main, 'push', '-q', 'origin', 'main'); },
      facCommit(path, content) { mkdirSync(join(fac, path, '..'), { recursive: true }); writeFileSync(join(fac, path), content); g(fac, 'add', '-A'); g(fac, 'commit', '-q', '-m', `edit ${path}`); return g(fac, 'rev-parse', 'HEAD'); },
      remoteRef: (b) => { const r = spawnSync(findGit(), ['rev-parse', '--verify', '-q', `refs/heads/${b}`], { cwd: bare, env: gitEnv(), encoding: 'utf8' }); return r.status === 0 ? r.stdout.trim() : null; },
    };
    return fn(h);
  } finally { rmSync(base, { recursive: true, force: true }); }
}
const blocked = (r, c) => { assert.equal(r.ok, false, JSON.stringify(r)); assert.equal(r.code, c, r.message); };
const pushes = (trace) => trace.filter((a) => a[0] === 'push');

// 1 ---------------------------------------------------------------------------------------------------------------------------
test('1 atama: JOB_ASSIGNED olayıyla sahip değişir, ilk taban sabitlenir ve değişmez; deterministik replay; yalnız Main PC kontrol dalı', () => setup((h) => {
  const mainHead = g(h.main, 'rev-parse', 'HEAD');
  const r = h.assign(FAC);
  assert.equal(r.base_commit, mainHead);
  assert.equal(r.job.owner_machine, FAC);
  assert.equal(r.job.publication_base, mainHead);
  const log = readEventLog(h.rt.dir);
  assert.equal(log.events.at(-1).type, 'JOB_ASSIGNED');
  const a = replay(log.events); const b = replay(log.events);
  assert.deepEqual(a.errors, []);
  assert.deepEqual(projectionsOf(a.model), projectionsOf(b.model), 'replay is deterministic');
  assert.equal(JSON.parse(readFileSync(join(h.rt.dir, 'jobs', `${JOB}.json`), 'utf8')).owner_machine, FAC, 'projection derived from the event');
  // Geri atama tabanı korur; farklı taban reddedilir
  const back = h.assign(MAIN);
  assert.equal(back.job.publication_base, mainHead);
  assert.throws(() => assignJob(h.rt, JOB, { actor_role: 'coo', to_machine: FAC, base_commit: 'f'.repeat(40), reason: 'move base' }), code('PUBLICATION_BASE_IMMUTABLE'));
  assert.throws(() => assignJob(h.rt, JOB, { actor_role: 'coo', to_machine: MAIN, base_commit: mainHead, reason: 'same' }), code('ALREADY_ASSIGNED'));
  // İş akışı sınırı
  assert.throws(() => recordAssignment(h.facCtx(), { job_id: JOB, to_machine: FAC, reason: 'x', actor_role: 'coo' }), code('RUNTIME_WRITER_ONLY'));
  assert.throws(() => recordAssignment(h.mainCtx(), { job_id: JOB, to_machine: 'UNKNOWN-PC', reason: 'x', actor_role: 'coo' }), code('UNKNOWN_MACHINE'));
  writeFileSync(join(h.main, 'dirty.md'), 'x');
  assert.throws(() => recordAssignment(h.mainCtx(), { job_id: JOB, to_machine: FAC, reason: 'x', actor_role: 'coo' }), code('WORKTREE_DIRTY'));
  rmSync(join(h.main, 'dirty.md'));
  g(h.main, 'checkout', '-q', '-b', 'not-control');
  assert.throws(() => recordAssignment(h.mainCtx(), { job_id: JOB, to_machine: FAC, reason: 'x', actor_role: 'coo' }), code('CONTROL_BRANCH_REQUIRED'));
  g(h.main, 'checkout', '-q', 'main');
  // COMPLETE iş yeniden atanamaz
  h.controlEvent(() => { for (const s of ['READY', 'IN_PROGRESS', 'COMPLETE']) transitionJob(h.rt, JOB, s, { actor_role: 'coo', reason: s }); });
  assert.throws(() => recordAssignment(h.mainCtx(), { job_id: JOB, to_machine: FAC, reason: 'x', actor_role: 'coo' }), code('JOB_COMPLETE'));
}));

test('1b etkin kaynak tutan iş devredilemez; kaynak bırakılınca devredilir', () => setup((h) => {
  h.controlEvent(() => { for (const s of ['READY', 'IN_PROGRESS']) transitionJob(h.rt, JOB, s, { actor_role: 'coo', reason: s }); });
  assert.throws(() => recordAssignment(h.mainCtx(), { job_id: JOB, to_machine: FAC, reason: 'x', actor_role: 'coo' }), code('ASSIGNMENT_RESOURCE_HELD'));
  assert.equal(loadModel(h.rt).jobs[JOB].owner_machine, MAIN);
  h.controlEvent(() => transitionJob(h.rt, JOB, 'BLOCKED', { actor_role: 'coo', reason: 'pause', blockers: ['handoff'] }));
  assert.throws(() => recordAssignment(h.mainCtx(), { job_id: JOB, to_machine: FAC, reason: 'x', actor_role: 'coo' }), code('ASSIGNMENT_RESOURCE_HELD'), 'BLOCKED from IN_PROGRESS still holds');
  h.controlEvent(() => transitionJob(h.rt, JOB, 'READY', { actor_role: 'coo', reason: 'release' }));
  assert.equal(h.assign(FAC).job.owner_machine, FAC);
  assert.deepEqual(loadModel(h.rt).resources, {});
}, { job: { resource_claims: ['production'] } }));

// 2 ---------------------------------------------------------------------------------------------------------------------------
test('2 ilk yayın: kayıtlı tabandan start → commit → force\'suz push; kontrol dalı push edilmez', () => setup((h) => {
  const { base_commit } = h.assign(FAC);
  const mainTipBefore = h.remoteRef('main');
  const s = startJobBranch(h.facCtx(), { job_id: JOB });
  assert.equal(s.result, 'JOB_BRANCH_STARTED', s.message);
  assert.equal(s.publication_base, base_commit);
  assert.equal(g(h.fac, 'rev-parse', 'HEAD'), base_commit);
  blocked(startJobBranch(h.facCtx(), { job_id: JOB }), 'BRANCH_EXISTS');
  const head = h.facCommit('render/notes.md', 'render notes\n');
  const ctx = h.facCtx();
  const r = safeSync(ctx, { mode: 'sync' });
  assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
  assert.equal(r.classification, 'REMOTE_BRANCH_MISSING');
  assert.equal(r.publication_base, base_commit);
  assert.equal(h.remoteRef(BR), head);
  assert.equal(h.remoteRef('main'), mainTipBefore, 'control branch is never pushed by safe-sync');
  assert.deepEqual(pushes(ctx.trace).map((a) => a.at(-1)), [`${head}:refs/heads/${BR}`]);
  // Korunan sınırlar ilk yayında da geçerli
  h.facCommit('os/lib/control/x.mjs', 'x\n');
  blocked(safeSync(h.facCtx(), { mode: 'sync' }), 'SYSTEM_CHANGE_REQUIRED');
}));

// 3 ---------------------------------------------------------------------------------------------------------------------------
test('3 push edilmemiş atama kabul edilmez (yerel commit yetki değildir)', () => setup((h) => {
  h.assign(FAC, { push: false });
  blocked(startJobBranch(h.facCtx(), { job_id: JOB }), 'JOB_OWNER_MISMATCH');
  // Uzakta hiç olmayan iş
  h.controlEvent(() => createJob(h.rt, { job_id: 'JOB-H2', type: 'render', scope: 'company', owner_role: 'coo', owner_machine: FAC, branch: 'job/JOB-H2', canonical_inputs: [], expected_outputs: [] }, { actor_role: 'coo' }), { push: false });
  blocked(startJobBranch(h.facCtx(), { job_id: 'JOB-H2' }), 'JOB_NOT_FOUND');
  // Uzakta iş var ama tabanı kayıtlı değil (atanmamış)
  g(h.main, 'push', '-q', 'origin', 'main'); // önceki yerel kontrol commit'leri şimdi push edilir; JOB-H2 hiç atanmadı
  blocked(startJobBranch(h.facCtx(), { job_id: 'JOB-H2' }), 'JOB_NOT_ASSIGNED');
}));

// 4 ---------------------------------------------------------------------------------------------------------------------------
test('4 yeniden atama önceki makinenin sahipliğini iptal eder; doğrulama sırasında kontrol dalı hareket ederse push yok', () => setup((h) => {
  h.assign(FAC);
  startJobBranch(h.facCtx(), { job_id: JOB });
  h.facCommit('a.md', 'a\n');
  assert.equal(safeSync(h.facCtx(), { mode: 'sync' }).result, 'PUSHED_VERIFIED');
  const published = h.remoteRef(BR);
  h.assign(MAIN);
  h.facCommit('b.md', 'b\n');
  const r = safeSync(h.facCtx(), { mode: 'sync' });
  blocked(r, 'JOB_OWNER_MISMATCH');
  assert.equal(h.remoteRef(BR), published);
}));

test('4b bayat yetki: sahiplik doğrulandıktan sonra (doğrulama profili sırasında) yeniden atama push edilirse CONTROL_CHANGED', () => setup((h) => {
  h.assign(FAC);
  startJobBranch(h.facCtx(), { job_id: JOB });
  h.facCommit('a.md', 'a\n');
  // Main PC'de geri atama hazırlanır ama henüz push edilmez; doğrulama profili sırasında push edilir (eşzamanlı Founder push'u).
  h.assign(MAIN, { push: false });
  const script = `require('child_process').execFileSync(${JSON.stringify(findGit())}, ['-C', ${JSON.stringify(h.main)}, 'push', '-q', 'origin', 'main'], { stdio: 'ignore' })`;
  const r = safeSync(h.facCtx({ policy: policyFor(h.bare, ['-e', script]) }), { mode: 'sync' });
  blocked(r, 'CONTROL_CHANGED');
  assert.equal(h.remoteRef(BR), null, 'nothing published under stale authority');
}));

// 5 ---------------------------------------------------------------------------------------------------------------------------
test('5 kurcalanmış yerel runtime (geçerli zincirli sahte JOB_ASSIGNED dahil) sahiplik vermez', () => setup((h) => {
  // Uzakta iş MAIN-PC'de, taban kayıtlı.
  const { base_commit } = h.assign(MAIN);
  g(h.fac, 'fetch', '-q', 'origin');
  g(h.fac, 'switch', '-q', '-c', BR, base_commit);
  // Factory kendi yerel runtime'ına geçerli bir olay ekler (kütüphane çağrısı) ve commit eder → yerel olarak sağlıklı, "sahip FACTORY".
  const frt = runtimeContext({ dir: join(h.fac, 'company', 'state', 'runtime'), machine: FAC, now: h.now });
  assignJob(frt, JOB, { actor_role: 'coo', to_machine: FAC, base_commit, reason: 'forged locally' });
  g(h.fac, 'add', '-A'); g(h.fac, 'commit', '-q', '-m', 'forged');
  assert.equal(loadModel(frt).jobs[JOB].owner_machine, FAC, 'local snapshot claims ownership');
  const r = safeSync(h.facCtx(), { mode: 'sync' });
  blocked(r, 'JOB_OWNER_MISMATCH');
  assert.equal(h.remoteRef(BR), null);
}));

// 6 ---------------------------------------------------------------------------------------------------------------------------
test('6 bozuk veya eksik uzak olay günlüğü fail-closed', () => {
  setup((h) => {
    h.assign(FAC);
    const f = join(h.rt.dir, 'events.jsonl');
    const lines = readFileSync(f, 'utf8').trim().split('\n');
    const e = JSON.parse(lines.at(-1)); e.details.to_machine = 'EVIL-PC'; lines[lines.length - 1] = JSON.stringify(e);
    writeFileSync(f, `${lines.join('\n')}\n`);
    g(h.main, 'add', '-A'); g(h.main, 'commit', '-q', '-m', 'tamper'); g(h.main, 'push', '-q', 'origin', 'main');
    blocked(startJobBranch(h.facCtx(), { job_id: JOB }), 'REMOTE_RUNTIME_BROKEN');
  });
  setup((h) => {
    h.assign(FAC);
    startJobBranch(h.facCtx(), { job_id: JOB });
    h.facCommit('a.md', 'a\n');
    g(h.main, 'rm', '-q', 'company/state/runtime/events.jsonl'); g(h.main, 'commit', '-q', '-m', 'remove log'); g(h.main, 'push', '-q', 'origin', 'main');
    blocked(safeSync(h.facCtx(), { mode: 'sync' }), 'REMOTE_RUNTIME_MISSING');
    assert.equal(h.remoteRef(BR), null);
  });
});

// 7 ---------------------------------------------------------------------------------------------------------------------------
test('7 geçersiz yayın soyu: kayıtlı tabandan türemeyen job dalı reddedilir', () => setup((h) => {
  const first = g(h.main, 'rev-parse', 'HEAD');
  writeFileSync(join(h.main, 'more.md'), 'more\n'); g(h.main, 'add', '-A'); g(h.main, 'commit', '-q', '-m', 'more'); g(h.main, 'push', '-q', 'origin', 'main');
  const { base_commit } = h.assign(FAC);
  assert.notEqual(base_commit, first);
  g(h.fac, 'fetch', '-q', 'origin');
  g(h.fac, 'switch', '-q', '-c', BR, first); // tabandan değil, tabanın atasından
  h.facCommit('a.md', 'a\n');
  const r = safeSync(h.facCtx(), { mode: 'sync' });
  blocked(r, 'BASE_INVALID');
  assert.equal(h.remoteRef(BR), null);
}));

// genel ------------------------------------------------------------------------------------------------------------------------
test('genel: gerçek origin/GitHub çağrılmadı; safe-sync kontrol dalını hiç push etmedi; force/silme yok', () => {
  assert.ok(TRACES.length > 10);
  for (const args of TRACES.flat()) {
    assert.ok(!args.some((a) => /github\.com/i.test(a)), args.join(' '));
    if (args[0] === 'push') {
      assert.ok(args.at(-1).endsWith(`:refs/heads/${BR}`), `only job branch pushes: ${args.join(' ')}`);
      assert.ok(!args.some((a) => /^(-f|--force.*|--delete|-d|--mirror|--all|--tags)$/.test(a) || a.startsWith('+') || a.startsWith(':')));
    }
  }
});
