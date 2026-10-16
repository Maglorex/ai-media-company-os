// Gate 1D-A — git.safe_sync: geçici yerel bare uzak depolarla düşmanca testler. Gerçek origin / GitHub'a hiçbir komut gitmez.
// TEST-ONLY politika yalnız bu dosyada kurulur: uzak = geçici bare yol, makine profili = sabit `node -e` adımı.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync, existsSync, readdirSync, readFileSync, unlinkSync, copyFileSync, symlinkSync, statSync, utimesSync } from 'node:fs';
import { join, isAbsolute } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync, execFileSync } from 'node:child_process';
import { findGit, gitCandidates, locateGit, pathGitCandidates } from '../lib/gitbin.mjs';
import { ROOT } from '../lib/records.mjs';
import { runtimeContext } from '../lib/control/common.mjs';
import { initRuntime, pauseCompany } from '../lib/control/runtime.mjs';
import { createJob, transitionJob, assignJob } from '../lib/control/jobs.mjs';
import { safeSync, syncContext, transportDir, syncGitEnv, profileEnv, HOST_ENV_ACCEPTED } from '../lib/control/safe-sync.mjs';
import { PRODUCTION_SYNC_POLICY, buildPushArgs, buildFetchArgs, buildLsRemoteArgs, routineBranch, isProtectedPath, ambiguousWindowsPath, executableShadowName } from '../lib/control/sync-policy.mjs';

const MACHINE = 'TEST-PC';
const gitEnv = () => { const e = { ...process.env, GIT_TERMINAL_PROMPT: '0', LC_ALL: 'C' }; for (const k of Object.keys(e)) if (/^GIT_(DIR|WORK_TREE|INDEX_FILE|CONFIG.*)$/i.test(k)) delete e[k]; return e; };
const g = (cwd, ...args) => {
  const r = spawnSync(findGit(), args, { cwd, env: gitEnv(), encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`setup git ${args.join(' ')} failed: ${r.stderr}`);
  return r.stdout.trim();
};
const ALL_TRACES = [];

const testPolicy = (url, extra = {}) => Object.freeze({
  ...PRODUCTION_SYNC_POLICY,
  policy_id: 'TEST-ONLY:safe-sync',
  remote: Object.freeze({ name: 'origin', url }),
  machine_profiles: Object.freeze({ [MACHINE]: 'TEST', 'OTHER-PC': 'TEST' }),
  // Gate 1D-B: geçici depoda yetkili runtime kontrol dalı 'main'; tek yazıcı test makinesi.
  control_branch: 'main',
  runtime_writer: MACHINE,
  profiles: Object.freeze({ TEST: Object.freeze([Object.freeze({ name: 'test-only-pass', argv: Object.freeze(['-e', 'process.exit(0)']) })]) }),
  ...extra,
});

function fixture(fn, { job = {} } = {}) {
  const base = mkdtempSync(join(tmpdir(), 'cos-sync-'));
  const bare = join(base, 'remote.git');
  const work = join(base, 'work');
  let t = Date.UTC(2026, 9, 16);
  const now = () => new Date((t += 1000)).toISOString();
  try {
    g(base, 'init', '--bare', '-q', '-b', 'main', bare);
    g(base, 'init', '-q', '-b', 'main', work);
    for (const [k, v] of [['user.name', 'fixture'], ['user.email', 'fixture@example.invalid'], ['core.autocrlf', 'false']]) g(work, 'config', k, v);
    g(work, 'remote', 'add', 'origin', bare);
    const rt = runtimeContext({ dir: join(work, 'company', 'state', 'runtime'), machine: MACHINE, now });
    initRuntime(rt, { actor_role: 'coo' });
    createJob(rt, { job_id: 'JOB-T1', type: 'task', scope: 'company', owner_role: 'coo', owner_machine: MACHINE, branch: 'job/JOB-T1', canonical_inputs: [], expected_outputs: [], ...job }, { actor_role: 'coo' });
    writeFileSync(join(work, 'README.md'), 'base\n');
    writeFileSync(join(work, '.gitignore'), 'local.tmp\n');
    g(work, 'add', '-A'); g(work, 'commit', '-q', '-m', 'base');
    g(work, 'push', '-q', 'origin', 'main');
    g(work, 'checkout', '-q', '-b', 'job/JOB-T1');
    const f = {
      base, bare, work, rt, now,
      policy: testPolicy(bare),
      commit(path, content, msg = `edit ${path}`) { mkdirSync(join(work, path, '..'), { recursive: true }); writeFileSync(join(work, path), content); g(work, 'add', '-A'); g(work, 'commit', '-q', '-m', msg); return g(work, 'rev-parse', 'HEAD'); },
      head: () => g(work, 'rev-parse', 'HEAD'),
      remote: (b = 'job/JOB-T1') => { const r = spawnSync(findGit(), ['rev-parse', '--verify', '-q', `refs/heads/${b}`], { cwd: bare, env: gitEnv(), encoding: 'utf8' }); return r.status === 0 ? r.stdout.trim() : null; },
      publish: () => g(work, 'push', '-q', 'origin', 'job/JOB-T1'),
      ctx(o = {}) { const trace = []; ALL_TRACES.push(trace); return syncContext({ repoDir: work, policy: f.policy, machine: MACHINE, now, trace, ...o }); },
      // autocrlf klon sırasında kapalı: aksi hâlde genel core.autocrlf=true checkout'u CRLF yazar ve diğer makinenin `add -A`'sı
      // protected dosyaları (runtime, .gitignore) satır sonu değişikliğiyle commit eder — alma sınırı bunu haklı olarak engeller.
      other() { const o = join(base, `other-${Math.random().toString(16).slice(2)}`); g(base, 'clone', '-q', '--config', 'core.autocrlf=false', bare, o); for (const [k, v] of [['user.name', 'other'], ['user.email', 'other@example.invalid'], ['core.autocrlf', 'false']]) g(o, 'config', k, v); g(o, 'checkout', '-q', 'job/JOB-T1'); return o; },
    };
    return fn(f);
  } finally { rmSync(base, { recursive: true, force: true }); }
}
// Kontrol dalında (main) runtime değişikliği kaydeder, commit + push eder (Founder'ın manuel push'unun fikstür karşılığı), job dalına döner.
const onControl = (f, fn) => { const cur = g(f.work, 'symbolic-ref', '--short', 'HEAD'); g(f.work, 'checkout', '-q', 'main'); fn(); g(f.work, 'add', '-A'); g(f.work, 'commit', '-q', '-m', 'control-plane event'); g(f.work, 'push', '-q', 'origin', 'main'); g(f.work, 'checkout', '-q', cur); };
const pushes = (trace) => trace.filter((a) => a[0] === 'push');
// Ağ veya ref hareketi yapabilecek hiçbir git alt komutu çalışmadı (hoisted: dosyanın her yerinden kullanılabilir).
function noNet(trace) { return !trace.some((a) => ['ls-remote', 'fetch', 'push', 'merge'].includes(a[0])); }
const run = (f, mode = 'sync', o = {}) => { const ctx = f.ctx(o); const r = safeSync(ctx, { mode }); return { r, trace: ctx.trace, ctx }; };
const blocked = (r, code) => { assert.equal(r.ok, false, JSON.stringify(r)); assert.equal(r.result, 'BLOCKED'); assert.equal(r.code, code, r.message); };
const fakeKey = () => `ghp_${'Z'.repeat(36)}`; // çalışma anında kurulur

// ---------- sınıflandırma ve taşıma ----------
test('EQUAL: no-op, push yok; makbuz .git içinde, takip edilmez', () => fixture((f) => {
  f.publish();
  const { r, trace } = run(f);
  assert.equal(r.result, 'NOOP_EQUAL');
  assert.equal(r.classification, 'EQUAL');
  assert.equal(pushes(trace).length, 0);
  assert.equal(g(f.work, 'status', '--porcelain'), '', 'receipt never dirties the worktree');
  assert.ok(transportDir(f.ctx()).replace(/\\/g, '/').includes('/.git/ai-media-company/transport'));
}));

test('LOCAL_AHEAD: force\'suz tam refspec push; uzak ref doğrulanır; makbuz VERIFIED', () => fixture((f) => {
  f.publish();
  const head = f.commit('notes.md', 'work\n');
  const { r, trace, ctx } = run(f);
  assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
  assert.equal(f.remote(), head);
  assert.deepEqual(pushes(trace), [['push', '--porcelain', '--no-signed', '--no-follow-tags', '--recurse-submodules=no', 'origin', `${head}:refs/heads/job/JOB-T1`]]);
  const receipt = JSON.parse(readFileSync(join(transportDir(ctx), `${r.action_id}.json`), 'utf8'));
  assert.equal(receipt.state, 'VERIFIED');
  assert.equal(receipt.remote_head_after, head);
  assert.equal(receipt.history_scan.result, 'PASS');
  assert.ok(!existsSync(join(f.work, 'company', 'state', 'runtime', 'transport')), 'no transport receipt in canonical runtime');
  assert.equal(g(f.work, 'status', '--porcelain'), '');
}));

test('REMOTE_AHEAD: yalnız fast-forward alma; merge commit yok; yerel HEAD = uzak commit', () => fixture((f) => {
  f.publish();
  const o = f.other();
  writeFileSync(join(o, 'from-other.md'), 'x\n'); g(o, 'add', '-A'); g(o, 'commit', '-q', '-m', 'other'); g(o, 'push', '-q', 'origin', 'job/JOB-T1');
  const target = f.remote();
  const { r, trace } = run(f);
  assert.equal(r.result, 'FAST_FORWARDED', r.message);
  assert.equal(f.head(), target);
  assert.equal(g(f.work, 'rev-list', '--parents', '-n', '1', 'HEAD').split(' ').length, 2, 'no merge commit');
  assert.equal(pushes(trace).length, 0);
  assert.ok(trace.some((a) => a[0] === 'merge' && a.includes('--ff-only')));
}));

test('DIVERGED: engellenir; merge/rebase/reset/push yok; iki taraf değişmez', () => fixture((f) => {
  f.publish();
  const o = f.other();
  writeFileSync(join(o, 'a.md'), 'a\n'); g(o, 'add', '-A'); g(o, 'commit', '-q', '-m', 'remote side'); g(o, 'push', '-q', 'origin', 'job/JOB-T1');
  const remoteBefore = f.remote();
  const localBefore = f.commit('b.md', 'b\n');
  const { r, trace } = run(f);
  blocked(r, 'DIVERGED');
  assert.equal(f.remote(), remoteBefore);
  assert.equal(f.head(), localBefore);
  assert.ok(!trace.some((a) => ['push', 'merge', 'rebase', 'reset'].includes(a[0])));
}));

// ---------- dal / iş bağlama ----------
test('routine olmayan dallar engellenir: main, master, os-v2-migration, draft/*, archive/*', () => fixture((f) => {
  for (const b of ['main', 'master', 'os-v2-migration', 'draft/x', 'archive/y', 'feature/x', 'job/job-lower', 'jobs/JOB-T1']) {
    if (b !== 'main') g(f.work, 'checkout', '-q', '-B', b);
    else g(f.work, 'checkout', '-q', 'main');
    const { r, trace } = run(f);
    blocked(r, 'BRANCH_NOT_ELIGIBLE');
    assert.ok(!trace.some((a) => ['ls-remote', 'fetch', 'push'].includes(a[0])), `${b}: no network before policy passes`);
  }
}));

test('iş bağlama: olmayan iş, dal uyuşmazlığı, sahip makine uyuşmazlığı, COMPLETE iş', () => {
  fixture((f) => { g(f.work, 'checkout', '-q', '-b', 'job/JOB-NONE'); blocked(run(f).r, 'JOB_NOT_FOUND'); });
  fixture((f) => { blocked(run(f).r, 'JOB_BRANCH_MISMATCH'); }, { job: { branch: 'job/JOB-ELSEWHERE' } });
  fixture((f) => { f.publish(); f.commit('n.md', 'n\n'); const { r, trace } = run(f, 'sync', { machine: 'OTHER-PC' }); blocked(r, 'JOB_OWNER_MISMATCH'); assert.equal(pushes(trace).length, 0); });
  fixture((f) => { blocked(run(f, 'sync', { machine: 'UNREGISTERED-PC' }).r, 'JOB_OWNER_MISMATCH'); });
  fixture((f) => {
    // Gate 1D-B: COMPLETE yetkili uzak kontrol dalında (main) kaydedilmeli; job dalındaki yerel runtime yetki değildir.
    onControl(f, () => { for (const s of ['READY', 'IN_PROGRESS', 'COMPLETE']) transitionJob(f.rt, 'JOB-T1', s, { actor_role: 'coo', reason: s }); });
    blocked(run(f).r, 'JOB_COMPLETE');
  });
});

// ---------- yerel ön kontrol ----------
test('ön kontrol: kirli ağaç (değişmiş ve izlenmeyen) engellenir; yok sayılan dosya engellemez; ayrık HEAD engellenir', () => fixture((f) => {
  f.publish();
  writeFileSync(join(f.work, 'README.md'), 'changed\n');
  blocked(run(f).r, 'WORKTREE_DIRTY');
  g(f.work, 'checkout', '--', 'README.md');
  writeFileSync(join(f.work, 'new.md'), 'x');
  blocked(run(f).r, 'WORKTREE_DIRTY');
  unlinkSync(join(f.work, 'new.md'));
  writeFileSync(join(f.work, 'local.tmp'), 'ignored');
  assert.equal(run(f, 'status').r.result, 'PREFLIGHT_PASS');
  g(f.work, 'checkout', '-q', '--detach');
  blocked(run(f).r, 'DETACHED_HEAD');
}));

test('uzak politika: URL veya push URL uyuşmazlığı ve üretim politikası geçici depoda engellenir', () => fixture((f) => {
  f.publish();
  blocked(run(f, 'sync', { policy: testPolicy(join(f.base, 'elsewhere.git')) }).r, 'REMOTE_POLICY_MISMATCH');
  const prod = run(f, 'sync', { policy: PRODUCTION_SYNC_POLICY });
  blocked(prod.r, 'REMOTE_POLICY_MISMATCH');
  assert.ok(!prod.trace.some((a) => ['ls-remote', 'fetch', 'push'].includes(a[0])), 'production policy never contacts a non-approved remote');
  g(f.work, 'remote', 'set-url', '--push', 'origin', join(f.base, 'evil.git'));
  blocked(run(f).r, 'REMOTE_POLICY_MISMATCH');
}));

test('PAUSED ve sağlıksız Gate 1B runtime engellenir', () => {
  fixture((f) => {
    f.publish();
    pauseCompany(f.rt, { actor_role: 'coo', reason: 'drill' });
    g(f.work, 'add', '-A'); g(f.work, 'commit', '-q', '-m', 'pause');
    const { r, trace } = run(f);
    blocked(r, 'COMPANY_PAUSED');
    assert.equal(pushes(trace).length, 0);
  });
  fixture((f) => {
    f.publish();
    const st = join(f.work, 'company', 'state', 'runtime', 'state.json');
    writeFileSync(st, readFileSync(st, 'utf8').replace('"OPERATING"', '"PAUSED"'));
    g(f.work, 'add', '-A'); g(f.work, 'commit', '-q', '-m', 'tamper projection');
    blocked(run(f).r, 'RUNTIME_UNHEALTHY');
  });
});

// ---------- komut kurulumu ----------
test('komut kurulumu: keyfi refspec, force, silme, joker, etiket imkânsız', () => {
  const sha = 'a'.repeat(40);
  assert.deepEqual(buildPushArgs('origin', sha, 'job/JOB-T1'), ['push', '--porcelain', '--no-signed', '--no-follow-tags', '--recurse-submodules=no', 'origin', `${sha}:refs/heads/job/JOB-T1`]);
  for (const [s, b] of [['HEAD', 'job/JOB-T1'], [`+${sha}`, 'job/JOB-T1'], ['', 'job/JOB-T1'], [sha, 'main'], [sha, 'job/*'], [sha, 'refs/tags/v1'], [sha, ':job/JOB-T1'], [sha, 'job/JOB-T1:refs/heads/main']]) {
    assert.throws(() => buildPushArgs('origin', s, b), `accepted ${s} ${b}`);
  }
  assert.throws(() => buildPushArgs('--force', sha, 'job/JOB-T1'));
  assert.throws(() => buildFetchArgs('origin', 'refs/heads/*'));
  assert.throws(() => buildLsRemoteArgs('origin', '*'));
  assert.deepEqual(buildFetchArgs('origin', 'job/JOB-T1'), ['fetch', '--no-tags', '--no-prune', '--no-write-fetch-head', '--refmap=', '--recurse-submodules=no', 'origin', 'refs/heads/job/JOB-T1']);
  assert.deepEqual(routineBranch('job/JOB-T1'), { job_id: 'JOB-T1' });
  // Giriş noktası refspec/force/uzak almaz: bilinmeyen seçenekler etkisizdir.
  fixture((f) => {
    f.publish();
    const head = f.commit('n.md', 'n\n');
    const ctx = f.ctx();
    const r = safeSync(ctx, { mode: 'sync', refspec: '+HEAD:refs/heads/main', force: true, remote: 'https://example.invalid/x.git' });
    assert.equal(r.result, 'PUSHED_VERIFIED');
    assert.deepEqual(pushes(ctx.trace), [buildPushArgs('origin', head, 'job/JOB-T1')]);
    assert.equal(f.remote('main'), g(f.work, 'rev-parse', 'main'), 'main untouched');
  });
});

// ---------- protected yollar / secret / doğrulama ----------
test('protected control-plane yolu değişen routine push SYSTEM_CHANGE_REQUIRED ile durur', () => {
  for (const p of ['os/lib/control/x.mjs', '.claude/settings.json', 'company/state/runtime/note.md', 'os/tests/x.test.mjs', '.gitattributes']) {
    fixture((f) => {
      f.publish();
      f.commit(p, 'x\n');
      const before = f.remote();
      const { r, trace } = run(f);
      blocked(r, 'SYSTEM_CHANGE_REQUIRED');
      assert.deepEqual(r.protected_paths, [p]);
      assert.equal(f.remote(), before);
      assert.equal(pushes(trace).length, 0);
    });
  }
  fixture((f) => { // eklenip sonra geri alınan protected dosya da aralıkta sayılır
    f.publish();
    f.commit('os/control/tmp.mjs', 'x\n');
    g(f.work, 'rm', '-q', 'os/control/tmp.mjs'); g(f.work, 'commit', '-q', '-m', 'revert');
    blocked(run(f).r, 'SYSTEM_CHANGE_REQUIRED');
  });
});

test('secret taraması — mevcut ağaçta veya eklenip sonraki commit\'te silinmiş secret push\'u durdurur; değer basılmaz', () => {
  fixture((f) => {
    f.publish();
    f.commit('config.txt', `token ${fakeKey()}\n`);
    const { r, trace } = run(f);
    blocked(r, 'SECRET_DETECTED');
    assert.ok(!JSON.stringify(r).includes(fakeKey()), 'secret value never reported');
    assert.equal(pushes(trace).length, 0);
  });
  fixture((f) => {
    f.publish();
    const before = f.remote();
    const leak = f.commit('leak.txt', `key ${fakeKey()}\n`, 'add');
    g(f.work, 'rm', '-q', 'leak.txt'); g(f.work, 'commit', '-q', '-m', 'remove');
    assert.ok(!existsSync(join(f.work, 'leak.txt')));
    const { r, trace } = run(f);
    blocked(r, 'SECRET_DETECTED');
    assert.ok(r.secret_findings.some((x) => x.path === 'leak.txt' && x.category === 'github token'));
    assert.ok(!JSON.stringify(r).includes(fakeKey()));
    assert.match(r.message, /github token @ leak\.txt/);
    void leak;
    assert.equal(f.remote(), before);
    assert.equal(pushes(trace).length, 0);
  });
  fixture((f) => { // commit mesajındaki secret
    f.publish();
    writeFileSync(join(f.work, 'n.md'), 'n\n'); g(f.work, 'add', '-A'); g(f.work, 'commit', '-q', '-m', `oops ${fakeKey()}`);
    blocked(run(f).r, 'SECRET_DETECTED');
  });
});

test('doğrulama profili başarısızsa push asla olmaz; çağıran test komutu veremez', () => fixture((f) => {
  f.publish();
  f.commit('n.md', 'n\n');
  const before = f.remote();
  const failing = testPolicy(f.bare, { profiles: Object.freeze({ TEST: Object.freeze([{ name: 'test-only-fail', argv: ['-e', 'process.exit(3)'] }]) }) });
  const { r, trace } = run(f, 'sync', { policy: failing });
  blocked(r, 'VERIFICATION_FAILED');
  assert.deepEqual(r.verification, [{ name: 'test-only-fail', ok: false, exit: 3 }]);
  assert.equal(f.remote(), before);
  assert.equal(pushes(trace).length, 0);
  const td = transportDir(f.ctx());
  assert.ok(!existsSync(td) || readdirSync(td).length === 0, 'no STARTED receipt before verification passes');
  const prod = PRODUCTION_SYNC_POLICY.profiles;
  assert.deepEqual(prod.MAIN_PC.map((s) => s.argv.join(' ')), ['--test os/tests/*.test.mjs', '--test os/tests/main-pc/*.test.mjs']);
  assert.deepEqual(prod.FACTORY.map((s) => s.argv.join(' ')), ['--test os/tests/*.test.mjs']);
  assert.ok(Object.isFrozen(PRODUCTION_SYNC_POLICY) && Object.isFrozen(prod.MAIN_PC));
}));

// ---------- idempotency / uzlaştırma ----------
test('başarılı push sonrası tekrar: ikinci push yok (REPLAY_VERIFIED)', () => fixture((f) => {
  f.publish();
  f.commit('n.md', 'n\n');
  assert.equal(run(f).r.result, 'PUSHED_VERIFIED');
  const { r, trace } = run(f);
  assert.equal(r.result, 'REPLAY_VERIFIED');
  assert.equal(pushes(trace).length, 0);
}));

test('çökme: push kabul edildi, makbuz STARTED kaldı → uzak okuma ile RECONCILED_SUCCESS, yeniden push yok; makbuz tamamen kaybolsa da uzak okuma başarıyı uzlaştırır', () => fixture((f) => {
  f.publish();
  const head = f.commit('n.md', 'n\n');
  assert.throws(() => run(f, 'sync', { hooks: { afterPush: () => { throw new Error('simulated crash after git accepted the push'); } } }), /simulated crash/);
  assert.equal(f.remote(), head, 'git accepted the push');
  const dir = transportDir(f.ctx());
  const [file] = readdirSync(dir);
  assert.equal(JSON.parse(readFileSync(join(dir, file), 'utf8')).state, 'STARTED');
  const { r, trace } = run(f);
  assert.equal(r.result, 'RECONCILED_SUCCESS');
  assert.equal(pushes(trace).length, 0);
  assert.equal(JSON.parse(readFileSync(join(dir, file), 'utf8')).state, 'RECONCILED_SUCCESS');
  unlinkSync(join(dir, file)); // makbuz kaybı
  const lost = run(f);
  assert.equal(lost.r.result, 'NOOP_EQUAL');
  assert.equal(pushes(lost.trace).length, 0);
  assert.equal(JSON.parse(readFileSync(join(dir, file), 'utf8')).state, 'RECONCILED_EQUAL');
}));

test('çökme push\'tan önce: uzak hâlâ eski commit → tam kontrollerle yeniden deneme uygun', () => fixture((f) => {
  f.publish();
  const head = f.commit('n.md', 'n\n');
  assert.throws(() => run(f, 'sync', { hooks: { beforePush: () => { throw new Error('simulated crash before push'); } } }), /simulated crash/);
  assert.notEqual(f.remote(), head);
  const { r } = run(f);
  assert.equal(r.result, 'PUSHED_VERIFIED');
  assert.equal(f.remote(), head);
}));

test('belirsiz uzlaştırma sırasında uzak üçüncü bir commit\'e geçtiyse engellenir', () => fixture((f) => {
  f.publish();
  f.commit('n.md', 'n\n');
  assert.throws(() => run(f, 'sync', { hooks: { afterPush: () => { throw new Error('simulated crash'); } } }));
  const o = f.other();
  g(o, 'pull', '-q', '--ff-only', 'origin', 'job/JOB-T1');
  writeFileSync(join(o, 'third.md'), '3\n'); g(o, 'add', '-A'); g(o, 'commit', '-q', '-m', 'third'); g(o, 'push', '-q', 'origin', 'job/JOB-T1');
  const third = f.remote();
  const { r, trace } = run(f);
  blocked(r, 'REMOTE_CHANGED_AMBIGUOUS');
  assert.equal(pushes(trace).length, 0);
  assert.equal(f.remote(), third);
}));

// ---------- ilk yayın ----------
test('uzak dal yok: kayıtlı yayın tabanı yoksa engellenir; uzak kontrol dalındaki JOB_ASSIGNED tabanıyla yayın; uzakta olmayan taban engellenir', () => {
  fixture((f) => {
    f.commit('n.md', 'n\n');
    const { r, trace } = run(f);
    blocked(r, 'FIRST_PUBLICATION_NOT_PERMITTED');
    assert.equal(r.classification, 'REMOTE_BRANCH_MISSING');
    assert.equal(pushes(trace).length, 0);
    assert.equal(f.remote(), null);
  });
  fixture((f) => {
    const baseSha = g(f.work, 'rev-parse', 'main');
    const head = f.commit('n.md', 'n\n');
    onControl(f, () => assignJob(f.rt, 'JOB-T1', { actor_role: 'coo', to_machine: MACHINE, base_commit: baseSha, reason: 'first publication base' }));
    const r = run(f).r;
    assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
    assert.equal(f.remote(), head);
  });
  fixture((f) => {
    const local = f.commit('local-only.md', 'x\n');
    f.commit('n.md', 'n\n');
    onControl(f, () => assignJob(f.rt, 'JOB-T1', { actor_role: 'coo', to_machine: MACHINE, base_commit: local, reason: 'local-only base' }));
    blocked(run(f).r, 'BASE_NOT_ON_REMOTE');
  });
});

// ---------- dry-run / status ----------
test('dry-run: hiçbir dal, uzak veya makbuz değişmez; status ağa hiç çıkmaz', () => fixture((f) => {
  f.publish();
  const head = f.commit('n.md', 'n\n');
  const before = f.remote();
  const d = run(f, 'dry-run');
  assert.equal(d.r.result, 'WOULD_PUSH');
  assert.deepEqual(d.r.push_args, buildPushArgs('origin', head, 'job/JOB-T1'));
  assert.equal(f.remote(), before);
  assert.equal(pushes(d.trace).length, 0);
  assert.ok(!existsSync(transportDir(f.ctx())) || readdirSync(transportDir(f.ctx())).length === 0, 'dry-run writes no receipt');
  const s = run(f, 'status');
  assert.equal(s.r.result, 'PREFLIGHT_PASS');
  assert.ok(!s.trace.some((a) => ['ls-remote', 'fetch', 'push', 'merge'].includes(a[0])), 'status is local-only');
  const o = f.other();
  g(o, 'reset', '-q', '--hard', before);
  writeFileSync(join(o, 'x.md'), 'x\n'); g(o, 'add', '-A'); g(o, 'commit', '-q', '-m', 'x');
  g(f.work, 'reset', '-q', '--hard', before);
  g(o, 'push', '-q', 'origin', 'job/JOB-T1');
  const ff = run(f, 'dry-run');
  assert.equal(ff.r.result, 'WOULD_FAST_FORWARD');
  assert.equal(f.head(), before, 'dry-run does not move the local branch');
}));

// ---------- Revision 1: taşıma güven sınırı (bağımsız incelemenin P1 bulguları) ----------
const sh = (p) => p.replace(/\\/g, '/');
// Zararsız sentinel hook/programı: yalnız bir dosyaya satır ekler.
const sentinelScript = (file, sentinel, label) => writeFileSync(file, `#!/bin/sh\necho ${label} >> "${sh(sentinel)}"\nexit 0\n`, { mode: 0o755 });
const HOOK_NAMES = ['pre-push', 'post-merge', 'pre-merge-commit', 'reference-transaction', 'post-checkout', 'post-rewrite', 'pre-auto-gc', 'push-to-checkout'];
const installHooks = (dir, sentinel) => { mkdirSync(dir, { recursive: true }); for (const h of HOOK_NAMES) sentinelScript(join(dir, h), sentinel, h); };
const sentinelText = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '');
// Diğer makineden uzak dala bir commit iter (o klonun hook'u yok).
const remoteCommit = (f, path, content, o = f.other()) => { mkdirSync(join(o, path, '..'), { recursive: true }); writeFileSync(join(o, path), content); g(o, 'add', '-A'); g(o, 'commit', '-q', '-m', `remote ${path}`); g(o, 'push', '-q', 'origin', 'job/JOB-T1'); return o; };
// Çalışma ağacına dokunmadan aralığa X (yolu ekler) + Y (ağacı geri yükler) commit'leri ekler; Git yolu birebir korunur.
function hiddenCommit(f, path, content) {
  const env = { ...gitEnv(), GIT_INDEX_FILE: join(f.base, 'tmp-index') };
  const x = (args, input) => { const r = spawnSync(findGit(), args, { cwd: f.work, env, input, encoding: 'utf8' }); if (r.status !== 0) throw new Error(`${args[0]}: ${r.stderr}`); return r.stdout.trim(); };
  x(['read-tree', 'HEAD']);
  const blob = x(['hash-object', '-w', '--stdin'], content);
  x(['update-index', '--add', '--cacheinfo', `100644,${blob},${path}`]);
  const X = x(['commit-tree', x(['write-tree']), '-p', 'HEAD', '-m', 'X']);
  const Y = x(['commit-tree', 'HEAD^{tree}', '-p', X, '-m', 'Y']);
  unlinkSync(join(f.base, 'tmp-index'));
  g(f.work, 'update-ref', 'refs/heads/job/JOB-T1', Y);
  return Y;
}

test('R1 uzak hedef kümesi: ikinci url/pushurl, kötü ilk pushurl engellenir; kötü depo değişmez', () => {
  for (const setup of [
    (f, evil) => g(f.work, 'config', '--add', 'remote.origin.url', evil),
    (f, evil) => { g(f.work, 'config', 'remote.origin.pushurl', f.bare); g(f.work, 'config', '--add', 'remote.origin.pushurl', evil); },
    (f, evil) => { g(f.work, 'config', 'remote.origin.pushurl', evil); g(f.work, 'config', '--add', 'remote.origin.pushurl', f.bare); },
  ]) {
    fixture((f) => {
      f.publish();
      const evil = join(f.base, 'evil.git');
      g(f.base, 'init', '--bare', '-q', evil); g(f.work, 'push', '-q', evil, 'job/JOB-T1');
      const evilBefore = g(evil, 'rev-parse', 'refs/heads/job/JOB-T1');
      setup(f, evil);
      f.commit('n.md', 'n\n');
      const before = f.remote();
      const { r, trace } = run(f);
      blocked(r, 'REMOTE_POLICY_MISMATCH');
      assert.equal(g(evil, 'rev-parse', 'refs/heads/job/JOB-T1'), evilBefore, 'evil remote unchanged');
      assert.equal(f.remote(), before);
      assert.ok(!trace.some((a) => ['ls-remote', 'fetch', 'push'].includes(a[0])), 'blocked before any transport');
    });
  }
});

test('R1 özel taşıma yapılandırması: vcs (yardımcı hiç çalışmaz), uploadpack, receivepack ve mirror=true/yes/on/1/bozuk engellenir', () => {
  fixture((f) => {
    f.publish();
    const sentinel = join(f.base, 'VCS_SENTINEL');
    const bin = join(f.base, 'bin'); mkdirSync(bin);
    sentinelScript(join(bin, 'git-remote-sentinelvcs'), sentinel, 'vcs');
    g(f.work, 'config', 'remote.origin.vcs', 'sentinelvcs');
    f.commit('n.md', 'n\n');
    const path = process.env.PATH;
    process.env.PATH = `${bin}${process.platform === 'win32' ? ';' : ':'}${path}`;
    try { for (const m of ['status', 'dry-run', 'sync']) blocked(run(f, m).r, 'REMOTE_POLICY_MISMATCH'); } finally { process.env.PATH = path; }
    assert.ok(!existsSync(sentinel), 'remote helper never executed');
  });
  for (const [key, cmd] of [['uploadpack', 'git-upload-pack'], ['receivepack', 'git-receive-pack']]) {
    fixture((f) => {
      f.publish();
      const sentinel = join(f.base, 'PACK_SENTINEL');
      g(f.work, 'config', `remote.origin.${key}`, `echo ran >> "${sh(sentinel)}"; ${cmd}`);
      f.commit('n.md', 'n\n');
      const before = f.remote();
      const { r, trace } = run(f);
      blocked(r, 'REMOTE_POLICY_MISMATCH');
      assert.ok(!existsSync(sentinel), `${key} program never executed`);
      assert.equal(f.remote(), before);
      assert.equal(pushes(trace).length, 0);
    });
  }
  for (const v of ['true', 'yes', 'on', '1', 'maybe']) {
    fixture((f) => {
      f.publish();
      g(f.work, 'config', 'remote.origin.mirror', v);
      f.commit('n.md', 'n\n');
      const { r, trace } = run(f);
      blocked(r, 'REMOTE_POLICY_MISMATCH');
      assert.equal(pushes(trace).length, 0, `mirror=${v}`);
    });
  }
  fixture((f) => { f.publish(); g(f.work, 'config', 'remote.origin.mirror', 'false'); f.commit('n.md', 'n\n'); assert.equal(run(f).r.result, 'PUSHED_VERIFIED'); });
});

// Revision 6: R1'in "çalışmaz" garantisi korunur ve sıkılaşır — yerel hook dosyası, core.hooksPath ve yerel fsmonitor artık yalnız
// bastırılmaz, ön kontrolde reddedilir (doğrulama profilinin torun git süreçleri de onları çalıştıramasın). Dosya/ayar değişmez.
test('R1/R6 hook bastırma: .git/hooks, core.hooksPath ve yerel fsmonitor hiçbir safe-sync komutunda çalışmaz; ön kontrolde reddedilir (push, alma, status, dry-run)', () => {
  for (const direction of ['push', 'receive']) {
    fixture((f) => { // .git/hooks
      f.publish();
      const sentinel = join(f.base, 'HOOK_SENTINEL');
      installHooks(join(f.work, '.git', 'hooks'), sentinel);
      if (direction === 'push') f.commit('n.md', 'n\n'); else remoteCommit(f, 'from-other.md', 'x\n');
      const local = f.head(); const remote = f.remote();
      const before = sentinelText(sentinel); // kurulum commit'lerinin (safe-sync dışı) tetiklediği satırlar
      for (const m of ['status', 'dry-run', 'sync']) { const { r, trace } = run(f, m); blocked(r, 'GIT_HOOK_FILE_PRESENT'); assert.ok(noNet(trace), `${direction}/${m}: no transport`); }
      assert.equal(sentinelText(sentinel), before, 'no client hook ran during safe-sync');
      assert.ok(readdirSync(join(f.work, '.git', 'hooks')).includes('pre-push'), 'user hooks are not deleted');
      assert.equal(f.head(), local); assert.equal(f.remote(), remote);
    });
  }
  fixture((f) => { // yapılandırılmış core.hooksPath
    f.publish();
    const sentinel = join(f.base, 'HOOK_SENTINEL');
    const custom = join(f.base, 'custom-hooks');
    installHooks(custom, sentinel);
    g(f.work, 'config', 'core.hooksPath', sh(custom));
    remoteCommit(f, 'from-other.md', 'x\n');
    const local = f.head();
    const before = sentinelText(sentinel);
    for (const m of ['status', 'dry-run', 'sync']) { const { r, trace } = run(f, m); blocked(r, 'HOOKS_PATH_CONFIGURED'); assert.ok(noNet(trace)); assert.ok(!r.message.includes(sh(custom)), 'path never reported'); }
    assert.equal(sentinelText(sentinel), before);
    assert.equal(f.head(), local);
    assert.equal(g(f.work, 'config', 'core.hooksPath'), sh(custom), 'user hooksPath setting untouched');
  });
  fixture((f) => { // yerel fsmonitor programı
    f.publish();
    const sentinel = join(f.base, 'FSM_SENTINEL');
    const prog = join(f.base, 'fsmonitor.sh');
    sentinelScript(prog, sentinel, 'fsmonitor');
    f.commit('n.md', 'n\n');
    g(f.work, 'config', 'core.fsmonitor', sh(prog));
    for (const m of ['status', 'dry-run', 'sync']) { const { r, trace } = run(f, m); blocked(r, 'FSMONITOR_CONFIGURED'); assert.ok(noNet(trace)); assert.ok(!r.message.includes(sh(prog))); }
    assert.ok(!existsSync(sentinel), 'fsmonitor program never executed');
    assert.equal(g(f.work, 'config', 'core.fsmonitor'), sh(prog), 'setting untouched');
  });
  fixture((f) => { // ön kontrolden SONRA (push'tan hemen önce) beliren hook: safe-sync'in kendi -c bastırması hâlâ çalışır
    f.publish();
    const sentinel = join(f.base, 'HOOK_SENTINEL');
    const head = f.commit('n.md', 'n\n');
    const r = run(f, 'sync', { hooks: { beforePush: () => installHooks(join(f.work, '.git', 'hooks'), sentinel) } }).r;
    assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
    assert.equal(f.remote(), head);
    assert.equal(sentinelText(sentinel), '', 'pre-push / reference-transaction suppressed on the direct git call');
  });
});

test('R1 replace/graft/shallow: gizlenen secret veya protected değişiklik uzağa ulaşmaz; varlıkları engeller', () => {
  fixture((f) => { // replace blob secret'ı gizleyemez
    f.publish();
    const before = f.remote();
    f.commit('cfg.txt', `token ${fakeKey()}\n`);
    const bad = g(f.work, 'rev-parse', 'HEAD:cfg.txt');
    const clean = spawnSync(findGit(), ['hash-object', '-w', '--stdin'], { cwd: f.work, env: gitEnv(), input: 'clean\n', encoding: 'utf8' }).stdout.trim();
    g(f.work, 'replace', bad, clean);
    const { r, trace } = run(f);
    blocked(r, 'REPLACE_REFS_PRESENT');
    assert.equal(f.remote(), before);
    assert.equal(spawnSync(findGit(), ['cat-file', '-e', bad], { cwd: f.bare }).status === 0, false, 'secret blob never reached the remote');
    assert.equal(pushes(trace).length, 0);
    assert.ok(g(f.work, 'for-each-ref', 'refs/replace/'), 'replace ref is reported, not deleted');
  });
  fixture((f) => { // graft önceki secret + protected commit'i gizleyemez
    f.publish();
    const tip = f.remote();
    writeFileSync(join(f.work, 'leak.txt'), `k ${fakeKey()}\n`); mkdirSync(join(f.work, 'os'), { recursive: true }); writeFileSync(join(f.work, 'os', 'x.mjs'), 'x\n');
    g(f.work, 'add', '-A'); g(f.work, 'commit', '-q', '-m', 'A');
    g(f.work, 'rm', '-q', 'leak.txt', 'os/x.mjs'); g(f.work, 'commit', '-q', '-m', 'B');
    g(f.work, 'replace', '--graft', 'HEAD', tip);
    blocked(run(f).r, 'REPLACE_REFS_PRESENT');
    assert.equal(f.remote(), tip);
  });
  fixture((f) => { // eski info/grafts
    f.publish();
    f.commit('n.md', 'n\n');
    writeFileSync(join(f.work, '.git', 'info', 'grafts'), `${f.head()}\n`);
    blocked(run(f).r, 'GRAFTS_PRESENT');
    assert.ok(existsSync(join(f.work, '.git', 'info', 'grafts')), 'grafts file not deleted');
  });
  fixture((f) => { // shallow depo
    f.publish();
    const shallow = join(f.base, 'shallow');
    g(f.base, 'clone', '-q', '--depth', '1', '--config', 'core.autocrlf=false', '--branch', 'job/JOB-T1', `file://${sh(f.bare)}`, shallow);
    const trace = [];
    const r = safeSync(syncContext({ repoDir: shallow, policy: testPolicy(`file://${sh(f.bare)}`), machine: MACHINE, now: f.now, trace }), { mode: 'sync' });
    ALL_TRACES.push(trace);
    blocked(r, 'SHALLOW_REPOSITORY');
  });
});

test('R1 Windows yol kanonikleştirme: büyük/küçük harf varyantları protected; DOS kısa ad takma adı belirsiz yol olarak engellenir', () => {
  for (const p of ['os/x', 'OS/x', 'Os/lib/control/x.mjs', '.claude/s.json', '.CLAUDE/settings.local.json', '.ClAuDe/x', 'Company/State/Runtime/x.json', 'claude.md', 'CLAUDE.MD', '.GitIgnore', '.GITATTRIBUTES', 'oſ/x']) {
    assert.equal(isProtectedPath(p), true, p);
  }
  for (const p of ['osx/a', 'docs/os/x', 'CLAUDE.md.bak', 'company/state/other.md']) assert.equal(isProtectedPath(p), false, p);
  for (const p of ['CLAUDE~1/settings.json', 'docs/PROGRA~2/x', 'a~1.txt', 'os./x', 'x ', 'a:b']) assert.ok(ambiguousWindowsPath(p), p);
  assert.equal(ambiguousWindowsPath('docs/notes-1.md'), null);
  for (const p of ['OS/tests/evil.test.mjs', '.CLAUDE/settings.local.json', '.ClAuDe/commands/x.md', 'Company/State/Runtime/x.json', 'CLAUDE.MD', '.GITIGNORE']) {
    fixture((f) => {
      f.publish();
      const before = f.remote();
      hiddenCommit(f, p, 'x\n');
      const { r, trace } = run(f);
      blocked(r, 'SYSTEM_CHANGE_REQUIRED');
      assert.equal(r.protected_paths.length, 1);
      assert.equal(r.protected_paths[0].toLowerCase(), p.toLowerCase(), 'Git path reported, not renamed');
      assert.equal(f.remote(), before);
      assert.equal(pushes(trace).length, 0);
    });
  }
  fixture((f) => {
    f.publish();
    const before = f.remote();
    hiddenCommit(f, 'CLAUDE~1/settings.json', '{}\n');
    const { r, trace } = run(f);
    blocked(r, 'UNSAFE_WINDOWS_PATH');
    assert.equal(r.ambiguous_paths[0].reason, 'dos-short-name-alias');
    assert.equal(f.remote(), before);
    assert.equal(pushes(trace).length, 0);
  });
});

test('R1 alma sınırı: uzaktan gelen protected değişiklik (geri alınmış olsa da) ve secret yerel HEAD hareket etmeden engellenir', () => {
  fixture((f) => {
    f.publish();
    const local = f.head();
    remoteCommit(f, 'os/control/x.mjs', 'x\n');
    const { r, trace } = run(f);
    blocked(r, 'SYSTEM_CHANGE_REQUIRED');
    assert.equal(r.classification, 'REMOTE_AHEAD');
    assert.match(r.message, /receive/);
    assert.equal(f.head(), local, 'local HEAD did not move');
    assert.ok(!trace.some((a) => a[0] === 'merge'));
    blocked(run(f, 'dry-run').r, 'SYSTEM_CHANGE_REQUIRED');
  });
  fixture((f) => { // A: protected değişir, B: geri yüklenir
    f.publish();
    const local = f.head();
    const o = remoteCommit(f, '.gitignore', 'changed\n');
    remoteCommit(f, '.gitignore', 'local.tmp\n', o);
    blocked(run(f).r, 'SYSTEM_CHANGE_REQUIRED');
    assert.equal(f.head(), local);
  });
  fixture((f) => {
    f.publish();
    const local = f.head();
    const o = remoteCommit(f, 'leak.txt', `k ${fakeKey()}\n`);
    g(o, 'rm', '-q', 'leak.txt'); g(o, 'commit', '-q', '-m', 'rm'); g(o, 'push', '-q', 'origin', 'job/JOB-T1');
    blocked(run(f).r, 'SECRET_DETECTED');
    assert.equal(f.head(), local);
  });
});

test('R1 gizli index bayrakları: assume-unchanged ve skip-worktree doğrulama/taşımadan önce engellenir; bayraklar temizlenmez', () => {
  for (const flag of ['--assume-unchanged', '--skip-worktree']) {
    fixture((f) => {
      f.publish();
      f.commit('n.md', 'n\n');
      g(f.work, 'update-index', flag, 'README.md');
      writeFileSync(join(f.work, 'README.md'), 'hidden local edit\n');
      const before = f.remote();
      const { r, trace } = run(f);
      blocked(r, 'HIDDEN_INDEX_FLAGS');
      assert.equal(f.remote(), before);
      assert.ok(!trace.some((a) => ['ls-remote', 'fetch', 'push'].includes(a[0])));
      assert.ok(!existsSync(join(f.work, '.git', 'ai-media-company')), 'no receipt, no verification');
      assert.match(g(f.work, 'ls-files', '-v', 'README.md'), /^[hS] /, 'flag left in place');
    });
  }
});

test('R1 UTF-16 secret taraması — BOM\'lu UTF-16LE/BE ve sonradan silinen UTF-16LE secret engellenir; değer basılmaz', () => {
  const u16le = (s) => Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(s, 'utf16le')]);
  const u16be = (s) => Buffer.concat([Buffer.from([0xfe, 0xff]), Buffer.from(s, 'utf16le').swap16()]);
  for (const enc of [u16le, u16be]) {
    fixture((f) => {
      f.publish();
      writeFileSync(join(f.work, 'ps-out.txt'), enc(`token ${fakeKey()}\r\n`)); g(f.work, 'add', '-A'); g(f.work, 'commit', '-q', '-m', 'u16');
      const { r } = run(f);
      blocked(r, 'SECRET_DETECTED');
      assert.ok(!JSON.stringify(r).includes(fakeKey()));
    });
  }
  fixture((f) => {
    f.publish();
    const before = f.remote();
    writeFileSync(join(f.work, 'ps-out.txt'), u16le(`token ${fakeKey()}\r\n`)); g(f.work, 'add', '-A'); g(f.work, 'commit', '-q', '-m', 'add');
    g(f.work, 'rm', '-q', 'ps-out.txt'); g(f.work, 'commit', '-q', '-m', 'remove');
    const { r } = run(f);
    blocked(r, 'SECRET_DETECTED');
    assert.ok(r.secret_findings.some((x) => x.path === 'ps-out.txt'));
    assert.equal(f.remote(), before);
  });
});

test('R1 fetch ref yazmaz: inceleme/dry-run fetch refs/remotes, FETCH_HEAD, etiket veya dal değiştirmez', () => fixture((f) => {
  f.publish();
  const o = remoteCommit(f, 'from-other.md', 'x\n');
  g(o, 'tag', 'v-test'); g(o, 'push', '-q', 'origin', 'v-test');
  const refs = () => g(f.work, 'for-each-ref', '--format=%(refname) %(objectname)');
  const fetchHead = join(f.work, '.git', 'FETCH_HEAD');
  const before = refs();
  assert.equal(existsSync(fetchHead), false);
  const d = run(f, 'dry-run');
  assert.equal(d.r.result, 'WOULD_FAST_FORWARD');
  assert.ok(d.trace.some((a) => a[0] === 'fetch'), 'objects were fetched');
  assert.equal(refs(), before, 'no local ref changed');
  assert.equal(existsSync(fetchHead), false, 'no FETCH_HEAD');
  assert.ok(!refs().includes('refs/tags/v-test'));
  assert.equal(run(f).r.result, 'FAST_FORWARDED');
  assert.equal(g(f.work, 'rev-parse', 'refs/remotes/origin/job/JOB-T1'), before.split('\n').find((l) => l.startsWith('refs/remotes/origin/job/JOB-T1')).split(' ')[1], 'tracking ref unchanged by receive');
  assert.equal(existsSync(fetchHead), false);
}));

test('R1 git yürütülebilir dosyası tek noktada çözülür ve status\'ta raporlanır', () => fixture((f) => {
  f.publish();
  const { r } = run(f, 'status');
  assert.equal(r.result, 'PREFLIGHT_PASS');
  assert.ok(typeof r.git_executable === 'string' && r.git_executable.length > 0);
  assert.ok(r.checks.includes('history-integrity') && r.checks.includes('no-hidden-index-flags'));
}));

// ---------- Revision 2: yürütme + TLS güven sınırı ----------
// Ortam değişkenlerini geçici olarak ayarlar ve her durumda geri yükler.
function withEnv(vars, fn) {
  const saved = Object.fromEntries(Object.keys(vars).map((k) => [k, process.env[k]]));
  Object.assign(process.env, vars);
  try { return fn(); } finally { for (const [k, v] of Object.entries(saved)) { if (v === undefined) delete process.env[k]; else process.env[k] = v; } }
}
const noTransport = (trace) => !trace.some((a) => ['ls-remote', 'fetch', 'push', 'merge'].includes(a[0]));

test('R2 TLS: miras GIT_SSL_NO_VERIFY/GIT_PROXY_COMMAND/askpass ortamı git\'e geçmez; sslVerify=false (genel, bozuk, onaylı URL\'ye özgü) taşımadan önce engellenir; doğrulanmış varsayılan çalışır', () => {
  const askSentinel = join(tmpdir(), `cos-askpass-${process.pid}-${Date.now()}`);
  withEnv({ GIT_SSL_NO_VERIFY: '1', GIT_PROXY_COMMAND: 'x', GIT_ASKPASS: 'x', SSH_ASKPASS: 'x', SSH_ASKPASS_REQUIRE: 'force' }, () => {
    const env = syncGitEnv();
    for (const k of ['GIT_SSL_NO_VERIFY', 'GIT_PROXY_COMMAND', 'GIT_ASKPASS', 'SSH_ASKPASS', 'SSH_ASKPASS_REQUIRE']) assert.equal(env[k], undefined, k);
    assert.equal(env.GIT_TERMINAL_PROMPT, '0');
    assert.equal(env.GIT_NO_REPLACE_OBJECTS, '1');
  });
  fixture((f) => { // GIT_ASKPASS sentinel programı ortamda olsa da çalışmaz; push başarılı
    f.publish();
    const prog = join(f.base, 'askpass.sh'); sentinelScript(prog, askSentinel, 'askpass');
    const head = f.commit('n.md', 'n\n');
    const r = withEnv({ GIT_SSL_NO_VERIFY: '1', GIT_ASKPASS: sh(prog), SSH_ASKPASS: sh(prog) }, () => run(f).r);
    assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
    assert.equal(f.remote(), head);
    assert.ok(!existsSync(askSentinel), 'askpass program never executed');
    assert.ok(r.checks.includes('transport-trust'));
  });
  for (const v of ['false', 'no', '0', 'maybe']) {
    fixture((f) => {
      f.publish();
      g(f.work, 'config', 'http.sslVerify', v);
      f.commit('n.md', 'n\n');
      const { r, trace } = run(f);
      blocked(r, 'TLS_VERIFICATION_DISABLED');
      assert.ok(noTransport(trace), `http.sslVerify=${v}: blocked before transport`);
    });
  }
  fixture((f) => { // onaylı URL'ye özgü sslVerify=false (URL biçimli onaylı uzak)
    const url = `file:///${sh(f.bare)}`;
    f.policy = testPolicy(url);
    g(f.work, 'remote', 'set-url', 'origin', url);
    f.publish();
    const head = f.commit('n.md', 'n\n');
    assert.equal(run(f).r.result, 'PUSHED_VERIFIED', 'default verified configuration reaches the TEMP transport');
    assert.equal(f.remote(), head);
    g(f.work, 'config', `http.${url}.sslVerify`, 'false');
    f.commit('m.md', 'm\n');
    const { r, trace } = run(f);
    blocked(r, 'TLS_VERIFICATION_DISABLED');
    assert.ok(noTransport(trace));
    assert.equal(f.remote(), head);
  });
});

test('R2 push imzası / push seçeneği: push.gpgSign + gpg.program sentinel asla çalışmaz; miras push.pushOption gönderilmez; merge.verifySignatures programı çalışmaz', () => {
  fixture((f) => {
    f.publish();
    g(f.bare, 'config', 'receive.certNonceSeed', 'test-only-seed'); // uzak imzalı push'u destekler → imza istenirse gpg çalışırdı
    const sentinel = join(f.base, 'GPG_SENTINEL');
    const prog = join(f.base, 'gpg.sh'); sentinelScript(prog, sentinel, 'gpg');
    for (const [k, v] of [['push.gpgSign', 'true'], ['gpg.program', sh(prog)], ['gpg.openpgp.program', sh(prog)], ['gpg.ssh.program', sh(prog)], ['gpg.x509.program', sh(prog)], ['push.pushOption', 'inherited-option']]) g(f.work, 'config', k, v);
    const head = f.commit('n.md', 'n\n');
    const { r, trace } = run(f); // uzak push seçeneklerini ilan etmez: miras seçenek gönderilseydi push reddedilirdi
    assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
    assert.equal(f.remote(), head, 'exact intended branch pushed');
    assert.ok(!existsSync(sentinel), 'signing program never executed');
    assert.ok(!pushes(trace).flat().some((a) => /^(-o|--push-option|--signed)/.test(a)));
    g(f.work, 'config', 'merge.verifySignatures', 'true');
    remoteCommit(f, 'from-other.md', 'x\n');
    assert.equal(run(f).r.result, 'FAST_FORWARDED', 'unsigned remote commit fast-forwarded without running a verifier');
    assert.ok(!existsSync(sentinel));
  });
});

test('R2 askpass / depo-yerel credential helper: core.askPass ve local credential.helper (genel ve URL\'ye özgü) sentinel çalışmadan engellenir', () => {
  for (const [key, value] of [['core.askPass', null], ['credential.helper', '!'], ['credential.https://example.invalid.helper', '!']]) {
    fixture((f) => {
      f.publish();
      const sentinel = join(f.base, 'CRED_SENTINEL');
      const prog = join(f.base, 'cred.sh'); sentinelScript(prog, sentinel, 'cred');
      f.commit('n.md', 'n\n');
      g(f.work, 'config', key, value === null ? sh(prog) : `!sh "${sh(prog)}"`);
      for (const m of ['status', 'dry-run', 'sync']) {
        const { r, trace } = run(f, m);
        blocked(r, key === 'core.askPass' ? 'ASKPASS_CONFIGURED' : 'REPO_CREDENTIAL_HELPER');
        assert.ok(noTransport(trace));
      }
      assert.ok(!existsSync(sentinel), `${key} program never executed`);
      assert.ok(g(f.work, 'config', '--get', key), 'configuration left untouched');
    });
  }
});

test('R2 içerik filtresi: herhangi derinlikteki .gitattributes protected; etkin filtre alma öncesi engeller, filtre programı asla çalışmaz, HEAD hareket etmez', () => {
  for (const p of ['.gitattributes', 'assets/.gitattributes', 'src/.GITATTRIBUTES', 'a/b/c/.GitAttributes']) assert.equal(isProtectedPath(p), true, p);
  assert.equal(isProtectedPath('docs/gitattributes.md'), false);
  const evilFilter = (f) => {
    const sentinel = join(f.base, 'FILTER_SENTINEL');
    const prog = join(f.base, 'filter.sh'); sentinelScript(prog, sentinel, 'filter');
    for (const k of ['smudge', 'clean', 'process']) g(f.work, 'config', `filter.evil.${k}`, sh(prog));
    return sentinel;
  };
  fixture((f) => { // gelen hedef ağaçta filtreli yol (öznitelik info/attributes'tan; filtre sürücüsü yapılandırılmış)
    f.publish();
    const local = f.head();
    writeFileSync(join(f.work, '.git', 'info', 'attributes'), '*.dat filter=evil\n');
    const sentinel = evilFilter(f);
    remoteCommit(f, 'data/x.dat', 'payload\n');
    for (const m of ['dry-run', 'sync']) {
      const { r, trace } = run(f, m);
      blocked(r, 'EXTERNAL_FILTER_PRESENT');
      assert.equal(r.classification, 'REMOTE_AHEAD');
      assert.ok(!trace.some((a) => a[0] === 'merge'), 'no worktree update');
    }
    assert.equal(f.head(), local, 'local HEAD did not move');
    assert.ok(!existsSync(join(f.work, 'data')), 'nothing checked out');
    assert.ok(!existsSync(sentinel), 'filter program never executed');
    assert.ok(g(f.work, 'config', 'filter.evil.smudge'), 'user filter configuration untouched');
  });
  fixture((f) => { // izlenen yolda filtre: status (clean filtresi) çalışmadan ön kontrol durur
    f.publish();
    writeFileSync(join(f.work, '.git', 'info', 'attributes'), 'README.md filter=evil\n');
    const sentinel = evilFilter(f);
    const { r, trace } = run(f, 'status');
    blocked(r, 'EXTERNAL_FILTER_PRESENT');
    assert.ok(!trace.some((a) => a[0] === 'status'), 'blocked before git status');
    assert.ok(!existsSync(sentinel));
  });
  fixture((f) => { // gelen iç içe .gitattributes eklenmesi
    f.publish();
    const local = f.head();
    remoteCommit(f, 'assets/.gitattributes', '*.bin filter=evil\n');
    const { r } = run(f);
    blocked(r, 'SYSTEM_CHANGE_REQUIRED');
    assert.deepEqual(r.protected_paths, ['assets/.gitattributes']);
    assert.equal(f.head(), local);
  });
  fixture((f) => { // push tarafı: eklenip geri alınan iç içe .GITATTRIBUTES
    f.publish();
    const before = f.remote();
    hiddenCommit(f, 'src/.GITATTRIBUTES', '* filter=evil\n');
    blocked(run(f).r, 'SYSTEM_CHANGE_REQUIRED');
    assert.equal(f.remote(), before);
  });
});

test('R2 doğrulama profili ortamı: NODE_OPTIONS --require sentinel ve NODE_PATH profil alt sürecine geçmez; profil adımı yine çalışır', () => fixture((f) => {
  f.publish();
  const sentinel = join(f.base, 'NODE_SENTINEL');
  const marker = join(f.base, 'PROFILE_RAN');
  const mod = join(f.base, 'inject.cjs');
  writeFileSync(mod, `require('fs').writeFileSync(${JSON.stringify(sentinel)}, 'injected');\n`);
  f.policy = testPolicy(f.bare, { profiles: Object.freeze({ TEST: Object.freeze([Object.freeze({ name: 'marker', argv: Object.freeze(['-e', `require('fs').writeFileSync(${JSON.stringify(marker)}, String(process.env.NODE_PATH ?? ''))`]) })]) }) });
  const head = f.commit('n.md', 'n\n');
  const r = withEnv({ NODE_OPTIONS: `--require=${sh(mod)}`, NODE_PATH: sh(f.base) }, () => run(f).r);
  assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
  assert.equal(f.remote(), head);
  assert.ok(existsSync(marker), 'verification profile step ran');
  assert.equal(readFileSync(marker, 'utf8'), '', 'NODE_PATH not inherited');
  assert.ok(!existsSync(sentinel), 'NODE_OPTIONS --require module never executed');
}));

// ---------- Revision 3: depo-yerel HTTP/TLS/proxy yapılandırma sınırı ----------
test('R3 depo-yerel http.* ve remote proxy: LOCAL/WORKTREE kapsamında status dahil ağsız engellenir; değer silinmez', () => {
  const cases = [
    ['http.proxy', 'http://127.0.0.1:9'], ['http.sslCAInfo', 'C:/x/ca.pem'], ['http.sslCAPath', 'C:/x/certs'], ['http.sslBackend', 'openssl'],
    ['http.schannelUseSSLCAInfo', 'true'], ['http.extraHeader', 'X-Test: 1'], ['http.proxyAuthMethod', 'basic'], ['http.pinnedPubkey', 'sha256//x'],
    ['http.sslVerify', 'true'], ['remote.origin.proxy', 'http://127.0.0.1:9'], ['remote.origin.proxyAuthMethod', 'basic'], ['URL:sslCAInfo', 'C:/x/ca.pem'],
  ];
  for (const [key0, value] of cases) {
    fixture((f) => {
      const url = `file:///${sh(f.bare)}`;
      f.policy = testPolicy(url);
      g(f.work, 'remote', 'set-url', 'origin', url);
      f.publish();
      f.commit('n.md', 'n\n');
      const before = f.remote();
      const key = key0.startsWith('URL:') ? `http.${url}.${key0.slice(4)}` : key0;
      g(f.work, 'config', key, value);
      for (const m of ['status', 'dry-run', 'sync']) {
        const { r, trace } = run(f, m);
        blocked(r, 'REPO_HTTP_CONFIG_FORBIDDEN');
        assert.ok(noTransport(trace), `${key} (${m}): no network call`);
        assert.ok(!r.message.includes(value), 'value never reported');
      }
      assert.equal(f.remote(), before);
      assert.equal(g(f.work, 'config', '--get', key), value, 'setting left untouched');
    });
  }
  fixture((f) => { // WORKTREE kapsamı
    f.publish();
    f.commit('n.md', 'n\n');
    g(f.work, 'config', 'extensions.worktreeConfig', 'true');
    for (const key of ['http.proxy', 'remote.origin.proxy']) {
      g(f.work, 'config', '--worktree', key, 'http://127.0.0.1:9');
      assert.match(g(f.work, 'config', '--show-scope', '--get', key), /^worktree\t/);
      const { r, trace } = run(f, 'status');
      blocked(r, 'REPO_HTTP_CONFIG_FORBIDDEN');
      assert.ok(noTransport(trace));
      g(f.work, 'config', '--worktree', '--unset', key);
    }
    assert.equal(run(f).r.result, 'PUSHED_VERIFIED', 'clean again after the worktree settings are gone');
  });
});

test('R3 host sınırı: GLOBAL http.* reddedilmez; GIT_SSL_CAINFO/CAPATH/PROXY_SSL_CAINFO git\'e geçmez; olağan TEMP safe-sync çalışır', () => {
  withEnv({ GIT_SSL_CAINFO: 'C:/x/ca.pem', GIT_SSL_CAPATH: 'C:/x/certs', GIT_PROXY_SSL_CAINFO: 'C:/x/p.pem', GIT_SSL_NO_VERIFY: '1', GIT_PROXY_COMMAND: 'x' }, () => {
    const env = syncGitEnv();
    for (const k of ['GIT_SSL_CAINFO', 'GIT_SSL_CAPATH', 'GIT_PROXY_SSL_CAINFO', 'GIT_SSL_NO_VERIFY', 'GIT_PROXY_COMMAND']) assert.equal(env[k], undefined, k);
  });
  fixture((f) => {
    f.publish();
    const head = f.commit('n.md', 'n\n');
    // Geçici HOME: gerçek kullanıcı yapılandırmasına dokunmadan GLOBAL kapsamlı örnek http.* ayarları (file:// taşımayı etkilemez).
    const home = join(f.base, 'home'); mkdirSync(home);
    writeFileSync(join(home, '.gitconfig'), '[http]\n\tproxy = http://127.0.0.1:9\n\tsslCAInfo = C:/x/ca.pem\n\textraHeader = X-Host: 1\n');
    const r = withEnv({ HOME: home, USERPROFILE: home, XDG_CONFIG_HOME: join(home, 'xdg'), GIT_SSL_CAINFO: 'C:/x/ca.pem', GIT_SSL_CAPATH: 'C:/x/certs', GIT_PROXY_SSL_CAINFO: 'C:/x/p.pem' }, () => {
      assert.match(g(f.work, 'config', '--show-scope', '--get', 'http.proxy'), /^global\t/, 'fixture setting is GLOBAL scope');
      return run(f).r;
    });
    assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
    assert.equal(f.remote(), head);
  });
});

// ---------- Revision 4: credential.*, git yürütülebilir dosyası, host yapılandırma konumu, ortam ----------
test('R4 depo-yerel credential.*: GCM ayarları (trace, traceSecrets, httpProxy, store, URL\'ye özgü) status/dry-run/sync\'te ağsız engellenir; değer ve URL basılmaz; silinmez', () => {
  const cases = [
    ['credential.trace', 'TRACEPATH'], ['credential.traceSecrets', 'true'], ['credential.httpProxy', 'http://127.0.0.1:9'],
    ['credential.credentialStore', 'plaintext'], ['credential.plaintextStorePath', 'STOREPATH'], ['credential.useHttpPath', 'true'],
    [['credential.https://bob', 'hunter2plainpw@example.invalid.provider'].join(':'), 'generic'], // çalışma anında kurulur (kaynakta URL-credential biçimi yok) ['credential.https://github.com.username', 'someone-else'],
  ];
  for (const [key, value0] of cases) {
    fixture((f) => {
      f.publish();
      f.commit('n.md', 'n\n');
      const before = f.remote();
      const trace = join(f.base, 'gcm-trace.log');
      const value = value0 === 'TRACEPATH' ? sh(trace) : value0 === 'STOREPATH' ? sh(join(f.base, 'store')) : value0;
      g(f.work, 'config', key, value);
      for (const m of ['status', 'dry-run', 'sync']) {
        const { r, trace: t } = run(f, m);
        blocked(r, 'REPO_CREDENTIAL_CONFIG_FORBIDDEN');
        assert.ok(noTransport(t), `${key} (${m}): blocked before any network / credential-manager activity`);
        assert.ok(!r.message.includes(value), 'value never reported');
        assert.ok(!/hunter2plainpw|example\.invalid|github\.com/.test(r.message), 'URL subsection (incl. embedded credentials) never reported');
      }
      assert.equal(f.remote(), before);
      assert.ok(!existsSync(trace), 'credential manager never ran');
      assert.equal(g(f.work, 'config', '--get', key), value, 'setting left untouched');
    });
  }
  fixture((f) => { // include.path, etkin includeIf (onbranch) ve WORKTREE kapsamı atlatamaz
    f.publish();
    f.commit('n.md', 'n\n');
    const inc = join(f.base, 'inc.cfg'); writeFileSync(inc, `[credential]\n\ttrace = ${sh(join(f.base, 't.log'))}\n`);
    for (const k of ['include.path', 'includeIf.onbranch:job/**.path']) {
      g(f.work, 'config', k, sh(inc));
      assert.match(g(f.work, 'config', '--show-scope', '--get', 'credential.trace'), /^local\t/, `${k}: include is active and LOCAL`);
      const { r, trace } = run(f, 'status');
      blocked(r, 'REPO_CREDENTIAL_CONFIG_FORBIDDEN');
      assert.ok(noTransport(trace));
      g(f.work, 'config', '--unset', k);
    }
    g(f.work, 'config', 'extensions.worktreeConfig', 'true');
    g(f.work, 'config', '--worktree', 'credential.traceSecrets', 'true');
    blocked(run(f, 'status').r, 'REPO_CREDENTIAL_CONFIG_FORBIDDEN');
    g(f.work, 'config', '--worktree', '--unset', 'credential.traceSecrets');
    assert.equal(run(f).r.result, 'PUSHED_VERIFIED', 'clean again once the local credential settings are gone');
  });
  fixture((f) => { // R2 hata önceliği korunur: helper + diğer credential.* → REPO_CREDENTIAL_HELPER
    f.publish();
    g(f.work, 'config', 'credential.trace', 'x');
    g(f.work, 'config', 'credential.helper', '!true');
    blocked(run(f, 'status').r, 'REPO_CREDENTIAL_HELPER');
  });
});

test('R4 host credential manager korunur: SYSTEM/GLOBAL credential.* (GCM helper, trace ayarı) reddedilmez; depo dışı GLOBAL çalışır', () => {
  fixture((f) => {
    f.publish();
    const sys = spawnSync(findGit(), ['config', '--show-scope', '--get-all', 'credential.helper'], { cwd: f.work, env: gitEnv(), encoding: 'utf8' });
    if (sys.status === 0 && /^system\t/m.test(sys.stdout)) assert.equal(run(f, 'status').r.result, 'PREFLIGHT_PASS', 'host SYSTEM credential helper (e.g. GCM) accepted');
    const home = join(f.base, 'home'); mkdirSync(home);
    writeFileSync(join(home, '.gitconfig'), '[credential]\n\thelper = manager\n\tcredentialStore = wincredman\n[credential "https://example.invalid"]\n\tprovider = generic\n');
    const head = f.commit('n.md', 'n\n');
    const r = withEnv({ HOME: home, USERPROFILE: home }, () => {
      assert.match(g(f.work, 'config', '--show-scope', '--get', 'credential.credentialstore'), /^global\t/);
      return run(f).r;
    });
    assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
    assert.equal(f.remote(), head);
  });
});

test('R4 host yapılandırma konumu: HOME/XDG depo içini gösteriyorsa veya GLOBAL include depo içi dosyayı yüklüyorsa engellenir', () => {
  const variants = [
    ['HOME→git dir', (f) => { writeFileSync(join(f.work, '.git', '.gitconfig'), '[http]\n\tproxy = http://127.0.0.1:9\n'); return { HOME: join(f.work, '.git'), USERPROFILE: join(f.work, '.git') }; }],
    ['XDG→git dir', (f) => { mkdirSync(join(f.work, '.git', 'xdg', 'git'), { recursive: true }); writeFileSync(join(f.work, '.git', 'xdg', 'git', 'config'), '[credential]\n\ttrace = x\n'); const home = join(f.base, 'home-x'); mkdirSync(home); return { HOME: home, USERPROFILE: home, XDG_CONFIG_HOME: join(f.work, '.git', 'xdg') }; }],
    ['GLOBAL include→repo file', (f) => { writeFileSync(join(f.work, '.git', 'evil.cfg'), '[http]\n\tproxy = http://127.0.0.1:9\n'); const home = join(f.base, 'home-i'); mkdirSync(home); writeFileSync(join(home, '.gitconfig'), `[include]\n\tpath = ${sh(join(f.work, '.git', 'evil.cfg'))}\n`); return { HOME: home, USERPROFILE: home }; }],
  ];
  for (const [label, setup] of variants) {
    fixture((f) => {
      f.publish();
      f.commit('n.md', 'n\n');
      const before = f.remote();
      const env = setup(f);
      for (const m of ['status', 'sync']) {
        const { r, trace } = withEnv(env, () => run(f, m));
        blocked(r, 'HOST_CONFIG_IN_REPOSITORY');
        assert.ok(noTransport(trace), `${label} (${m})`);
      }
      assert.equal(f.remote(), before);
    });
  }
});

test('R4 git gölgeleme savunması: gelen/giden git.exe, GIT.EXE, git.cmd, git.bat, alt klasör git.com, git-*.exe engellenir; kökte yok sayılan git.exe ön kontrolü durdurur', () => {
  for (const p of ['git.exe', 'GIT.EXE', 'Git.Cmd', 'git.bat', 'git', 'sub/git.com', 'git-credential-manager.exe', 'git.ps1']) assert.ok(executableShadowName(p), p);
  for (const p of ['gitbin.mjs', '.gitignore', 'docs/git-guide.md', 'git-notes.md', 'digit.exe']) assert.equal(executableShadowName(p), null, p);
  for (const p of ['git.exe', 'GIT.EXE', 'Git.Cmd', 'git.bat', 'sub/git.com', 'git-remote-https.exe']) {
    fixture((f) => { // alma: yerel HEAD ve çalışma ağacı değişmez (içerik zararsız metin; hiçbir şey çalıştırılmaz)
      f.publish();
      const local = f.head();
      remoteCommit(f, p, 'harmless sentinel text, never executed\n');
      for (const m of ['dry-run', 'sync']) {
        const { r, trace } = run(f, m);
        blocked(r, 'UNSAFE_EXECUTABLE_NAME');
        assert.equal(r.classification, 'REMOTE_AHEAD');
        assert.ok(!trace.some((a) => a[0] === 'merge'), 'no worktree update');
      }
      assert.equal(f.head(), local, 'local HEAD did not move');
      assert.ok(!existsSync(join(f.work, p)), 'nothing checked out');
    });
  }
  fixture((f) => { // gönderme: eklenip geri alınan git.exe de uzağa ulaşmaz
    f.publish();
    const before = f.remote();
    hiddenCommit(f, 'git.exe', 'x\n');
    const { r, trace } = run(f);
    blocked(r, 'UNSAFE_EXECUTABLE_NAME');
    assert.equal(f.remote(), before);
    assert.equal(pushes(trace).length, 0);
  });
  fixture((f) => { // kökte yok sayılan (ignored) git.exe: WORKTREE_DIRTY yakalamaz, ön kontrol yakalar; dosya silinmez
    writeFileSync(join(f.work, '.git', 'info', 'exclude'), 'GIT.EXE\n');
    f.publish();
    writeFileSync(join(f.work, 'GIT.EXE'), 'harmless\n');
    const { r, trace } = run(f, 'status');
    blocked(r, 'UNSAFE_EXECUTABLE_NAME');
    assert.ok(noTransport(trace));
    assert.ok(existsSync(join(f.work, 'GIT.EXE')), 'file left in place');
  });
});

test('R4 git yürütülebilir dosyası: aday listesi yalnız mutlak; göreli/boş PATH, geçerli klasör ve depo içi PATH dizinleri atlanır; tüketiciler ortak bulucuyu kullanır', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cos-gitres-'));
  try {
    const name = process.platform === 'win32' ? 'git.exe' : 'git';
    const mk = (d) => { mkdirSync(d, { recursive: true }); writeFileSync(join(d, name), ''); return join(d, name); };
    const goodDir = join(dir, 'good'); const good = mk(goodDir);
    const cwdDir = join(dir, 'cwd'); mk(cwdDir);
    const repoRoot = join(dir, 'repo'); mk(join(repoRoot, 'tools'));
    const sepc = process.platform === 'win32' ? ';' : ':';
    const PATH = ['.', 'relative', '', cwdDir, join(repoRoot, 'tools'), goodDir].join(sepc);
    const c = pathGitCandidates({ env: { PATH }, cwd: cwdDir, repoRoot });
    assert.deepEqual(c, [good], 'only the absolute, non-repository, non-cwd PATH entry');
    const all = gitCandidates({ env: { PATH, LOCALAPPDATA: 'relative-appdata', ProgramFiles: 'relative-pf' }, cwd: cwdDir, repoRoot });
    assert.ok(all.every((p) => isAbsolute(p)), 'no bare or relative candidate');
    const probed = [];
    assert.equal(locateGit({ env: { PATH: `.${sepc}relative` }, cwd: cwdDir, repoRoot, probe: (b) => { probed.push(b); return true; } }), null, 'bare/relative names never probed');
    assert.deepEqual(probed, []);
  } finally { rmSync(dir, { recursive: true, force: true }); }
  assert.ok(isAbsolute(findGit()), 'findGit returns an absolute path');
  for (const f of ['os/lib/records.mjs', 'os/lib/control/doctor.mjs', 'os/lib/factory.mjs', 'os/lib/control/safe-sync.mjs', 'os/factory/fixtures.mjs']) {
    const src = readFileSync(join(ROOT, f), 'utf8');
    assert.ok(!/(execFileSync|spawnSync|execSync|spawn|execFile)\(\s*['"]git(\.exe)?['"]/.test(src), `${f}: no bare git invocation`);
  }
});

test('R4 Windows: NoDefaultCurrentDirectoryInExePath ayarsızken geçerli klasördeki sahte git.exe ne yoklamada ne çalıştırmada seçilir (zararsız sentinel)', { skip: process.platform !== 'win32' && 'Windows-only (libuv current-directory lookup)' }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'cos-shadow-'));
  try {
    // Sahte git.exe = node.exe kopyası (zararsız): `--version` ile çalışırsa git değil Node sürümü ("v…") basar.
    copyFileSync(process.execPath, join(dir, 'git.exe'));
    const env = { ...process.env };
    for (const k of Object.keys(env)) if (/^(NoDefaultCurrentDirectoryInExePath|NODE_TEST_CONTEXT|NODE_OPTIONS)$/i.test(k)) delete env[k];
    const pk = Object.keys(env).find((k) => k.toUpperCase() === 'PATH');
    env[pk] = `${dir};${env[pk]}`; // geçerli klasör PATH'te mutlak dizin olarak da yer alsa atlanır
    // Çocuk süreç child_process'i sarar: gitbin yüklenmeden ÖNCE her alt süreç çağrısının dosya argümanı kaydedilir (yoklama dahil).
    const url = new URL('../lib/gitbin.mjs', import.meta.url).href;
    const script = `const cp = require('child_process'); const seen = [];
for (const fn of ['execFileSync', 'spawnSync', 'execFile', 'spawn']) { const orig = cp[fn]; cp[fn] = (file, ...a) => { seen.push(String(file)); return orig(file, ...a); }; }
require('module').syncBuiltinESMExports();
import(${JSON.stringify(url)}).then((m) => { const bin = m.findGit(); const version = cp.execFileSync(bin, ['--version'], { encoding: 'utf8' }).trim(); console.log(JSON.stringify({ bin, version, seen })); });`;
    const out = JSON.parse(execFileSync(process.execPath, ['-e', script], { cwd: dir, env, encoding: 'utf8' }));
    assert.match(out.version, /^git version /, 'the real git ran');
    assert.ok(isAbsolute(out.bin) && !out.bin.toLowerCase().startsWith(dir.toLowerCase()), `resolved outside the current directory: ${out.bin}`);
    assert.ok(out.seen.length >= 2, 'discovery probe and the run were observed');
    for (const s of out.seen) {
      assert.ok(isAbsolute(s), `only absolute executables spawned (probe included): ${s}`);
      assert.ok(!s.toLowerCase().startsWith(dir.toLowerCase()), `nothing spawned from the current directory: ${s}`);
    }
    // Kontrol: aynı ortamda çıplak 'git' çağrısı gerçekten geçerli klasördeki dosyayı seçerdi (testin anlamlı olduğunu gösterir).
    const control = execFileSync(process.execPath, ['-e', `process.stdout.write(require('child_process').execFileSync('git', ['--version'], { encoding: 'utf8' }))`], { cwd: dir, env, encoding: 'utf8' }).trim();
    assert.equal(control, process.version, 'control: a bare-name spawn here would have run the shadow binary');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('R4 ortam: iz/GCM-depo/TLS-zayıflatma/CA değişkenleri silinir; kabul edilen host proxy/istemci kimliği/konum değişkenleri korunur; GIT_TRACE/GCM_TRACE dosyası oluşmaz', () => {
  const strip = ['GCM_TRACE', 'GCM_TRACE_SECRETS', 'GCM_TRACE_MSAUTH', 'GCM_DEBUG', 'GCM_CREDENTIAL_STORE', 'GCM_PLAINTEXT_STORE_PATH', 'GIT_TRACE', 'GIT_TRACE_CURL', 'GIT_TRACE_REDACT', 'GIT_TRACE_PACKET', 'GIT_TRACE2', 'GIT_TRACE2_EVENT', 'GIT_CURL_VERBOSE', 'GIT_SSL_VERSION', 'GIT_SSL_CIPHER_LIST', 'SSL_CERT_FILE', 'SSL_CERT_DIR', 'CURL_CA_BUNDLE', 'GIT_SSH', 'git_trace_curl', 'gcm_trace_secrets'];
  const keep = ['HTTPS_PROXY', 'https_proxy', 'ALL_PROXY', 'NO_PROXY', 'GCM_HTTP_PROXY', 'GIT_HTTP_PROXY_AUTHMETHOD', 'GIT_SSL_CERT', 'GIT_SSL_KEY'];
  withEnv(Object.fromEntries([...strip, ...keep].map((k) => [k, 'x'])), () => {
    const env = syncGitEnv();
    for (const k of strip) assert.equal(env[k], undefined, `${k} stripped`);
    // Windows'ta ortam adları büyük/küçük harf duyarsızdır (HTTPS_PROXY ile https_proxy aynı değişken): adı duyarsız ara.
    for (const k of keep) assert.equal(Object.entries(env).find(([n]) => n.toLowerCase() === k.toLowerCase())?.[1], 'x', `${k} kept (accepted host environment)`);
  });
  assert.ok(Object.keys(HOST_ENV_ACCEPTED).length >= 3, 'accepted host environment is documented');
  fixture((f) => {
    f.publish();
    const head = f.commit('n.md', 'n\n');
    const files = ['git-trace.log', 'git-trace2.log', 'gcm-trace.log', 'packet.log'].map((n) => join(f.base, n));
    const r = withEnv({ GIT_TRACE: files[0], GIT_TRACE2_EVENT: files[1], GCM_TRACE: files[2], GIT_TRACE_PACKET: files[3], GIT_TRACE_REDACT: '0' }, () => run(f).r);
    assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
    assert.equal(f.remote(), head);
    for (const p of files) assert.ok(!existsSync(p), `${p}: no trace written`);
  });
});

// ---------- Revision 5: yapılandırmayla tanımlı hook'lar, core.alternateRefsCommand, objects/info/alternates ----------
// Reddetmeden önce yalnız salt-okur alt komutlar çalışmış olmalı (hook / alternate-refs tüketebilecek hiçbir çağrı yok).
const onlyReadsBefore = (trace) => trace.every((a) => ['rev-parse', 'config'].includes(a[0]));
const HOOK_EVENTS = ['pre-push', 'reference-transaction', 'post-merge', 'post-index-change', 'post-checkout'];
// Zararsız sentinel komutu: yalnız marker dosyasına satır ekler. Arkadaşça ad secret-benzeri parça taşır (redaksiyon kontrolü).
const setHooks = (f, marker, { scopeArgs = [], name = 'bob-hunter2plainpw' } = {}) => {
  HOOK_EVENTS.forEach((ev, i) => {
    g(f.work, 'config', ...scopeArgs, '--add', `hook.${name}${i}.event`, ev);
    g(f.work, 'config', ...scopeArgs, `hook.${name}${i}.command`, `echo ${ev} >> '${sh(marker)}'`);
  });
};
const assertHookBlocked = (r, trace, marker, label) => {
  blocked(r, 'GIT_CONFIG_HOOK_FORBIDDEN');
  assert.ok(onlyReadsBefore(trace), `${label}: only rev-parse/config ran before the rejection: ${JSON.stringify(trace.map((a) => a[0]))}`);
  assert.ok(!/hunter2plainpw|bob-|echo|>>/.test(r.message) && !r.message.includes(sh(marker)), `${label}: hook name/command never reported: ${r.message}`);
  assert.ok(!existsSync(marker), `${label}: no configured hook executed`);
};

test('R5 yapılandırma hook\'u (LOCAL): pre-push/reference-transaction/post-merge/post-index-change status, dry-run ve sync\'te (giden ve gelen) çalışmaz; ad/komut basılmaz; ayar değişmez', () => {
  for (const direction of ['push', 'receive']) {
    fixture((f) => {
      f.publish();
      if (direction === 'push') f.commit('n.md', 'n\n'); else remoteCommit(f, 'from-other.md', 'x\n');
      const local = f.head(); const remote = f.remote();
      const marker = join(f.base, 'hook-marker.log');
      setHooks(f, marker);
      // Kontrol (yalnız yapılandırma hook'u destekleyen Git ≥ 2.54; ör. GitHub Desktop'un 2.53'ünde `hook list` yok): hook Git için
      // etkin (listelenir, çalıştırılmaz). Reddetme Git sürümünden bağımsızdır (fail-closed).
      const listed = spawnSync(findGit(), ['hook', 'list', 'pre-push'], { cwd: f.work, env: gitEnv(), encoding: 'utf8' });
      if (listed.status === 0) assert.match(listed.stdout, /bob-hunter2plainpw0/, 'control: the configured hook is active for Git');
      for (const m of ['status', 'dry-run', 'sync']) { const { r, trace } = run(f, m); assertHookBlocked(r, trace, marker, `${direction}/${m}`); }
      assert.equal(f.head(), local, 'local HEAD unchanged');
      assert.equal(f.remote(), remote, 'remote unchanged');
      assert.equal(g(f.work, 'config', '--get', 'hook.bob-hunter2plainpw0.event'), 'pre-push', 'rejected configuration left untouched');
      assert.match(g(f.work, 'config', '--get', 'hook.bob-hunter2plainpw1.command'), /^echo reference-transaction/);
    });
  }
});

test('R5 yapılandırma hook\'u: WORKTREE kapsamı, include.path ve etkin includeIf ile atlatılamaz; GLOBAL (yalıtılmış HOME) da reddedilir', () => {
  fixture((f) => {
    f.publish();
    f.commit('n.md', 'n\n');
    const marker = join(f.base, 'hook-marker.log');
    g(f.work, 'config', 'extensions.worktreeConfig', 'true');
    setHooks(f, marker, { scopeArgs: ['--worktree'] });
    assert.match(g(f.work, 'config', '--show-scope', '--get', 'hook.bob-hunter2plainpw0.event'), /^worktree\t/);
    for (const m of ['status', 'dry-run', 'sync']) { const { r, trace } = run(f, m); assertHookBlocked(r, trace, marker, `worktree/${m}`); assert.match(r.message, /worktree/); }
    HOOK_EVENTS.forEach((_, i) => g(f.work, 'config', '--worktree', '--remove-section', `hook.bob-hunter2plainpw${i}`));
    const inc = join(f.base, 'inc.cfg');
    writeFileSync(inc, HOOK_EVENTS.map((ev, i) => `[hook "bob-hunter2plainpw${i}"]\n\tevent = ${ev}\n\tcommand = echo ${ev} >> '${sh(marker)}'\n`).join(''));
    for (const k of ['include.path', 'includeIf.onbranch:job/**.path']) {
      g(f.work, 'config', k, sh(inc));
      assert.match(g(f.work, 'config', '--show-scope', '--get', 'hook.bob-hunter2plainpw0.event'), /^local\t/, `${k}: include active`);
      for (const m of ['status', 'sync']) { const { r, trace } = run(f, m); assertHookBlocked(r, trace, marker, `${k}/${m}`); }
      g(f.work, 'config', '--unset', k);
    }
    assert.equal(run(f).r.result, 'PUSHED_VERIFIED', 'clean again once the hook configuration is gone');
  });
  fixture((f) => { // GLOBAL: depo dışındaki host yapılandırması da safe-sync'te hook çalıştıramaz (bilinçli karar: her kapsam reddedilir)
    f.publish();
    f.commit('n.md', 'n\n');
    const before = f.remote();
    const marker = join(f.base, 'hook-marker.log');
    const home = join(f.base, 'home-h'); mkdirSync(home);
    const cfg = HOOK_EVENTS.map((ev, i) => `[hook "bob-hunter2plainpw${i}"]\n\tevent = ${ev}\n\tcommand = echo ${ev} >> '${sh(marker)}'\n`).join('') + '[credential]\n\thelper = manager\n';
    writeFileSync(join(home, '.gitconfig'), cfg);
    withEnv({ HOME: home, USERPROFILE: home }, () => {
      assert.match(g(f.work, 'config', '--show-scope', '--get', 'hook.bob-hunter2plainpw0.event'), /^global\t/);
      for (const m of ['status', 'dry-run', 'sync']) { const { r, trace } = run(f, m); assertHookBlocked(r, trace, marker, `global/${m}`); assert.match(r.message, /global/); }
    });
    assert.equal(f.remote(), before);
    assert.equal(readFileSync(join(home, '.gitconfig'), 'utf8'), cfg, 'host configuration untouched');
  });
});

test('R5 core.alternateRefsCommand: LOCAL, WORKTREE, include ve GLOBAL kapsamında (alternates olsun olmasın) dry-run/sync\'te çalışmaz', () => {
  const variants = [
    ['local', (f, v) => { g(f.work, 'config', 'core.alternateRefsCommand', v); }],
    ['worktree', (f, v) => { g(f.work, 'config', 'extensions.worktreeConfig', 'true'); g(f.work, 'config', '--worktree', 'core.alternateRefsCommand', v); }],
    ['include', (f, v) => { const inc = join(f.base, 'alt.cfg'); writeFileSync(inc, `[core]\n\talternateRefsCommand = ${v}\n`); g(f.work, 'config', 'include.path', sh(inc)); }],
    ['global', (f, v) => { const home = join(f.base, 'home-a'); mkdirSync(home); writeFileSync(join(home, '.gitconfig'), `[core]\n\talternateRefsCommand = ${v}\n`); return { HOME: home, USERPROFILE: home }; }],
  ];
  for (const [label, setup] of variants) {
    for (const direction of ['push', 'receive']) {
      fixture((f) => {
        f.publish();
        if (direction === 'push') f.commit('n.md', 'n\n'); else remoteCommit(f, 'from-other.md', 'x\n');
        const local = f.head(); const remote = f.remote();
        const marker = join(f.base, 'altrefs-marker.log');
        const env = setup(f, `echo altrefs >> '${sh(marker)}'; true`) ?? {};
        for (const m of ['status', 'dry-run', 'sync']) {
          const { r, trace } = withEnv(env, () => run(f, m));
          blocked(r, 'ALTERNATE_REFS_COMMAND_FORBIDDEN');
          assert.ok(onlyReadsBefore(trace), `${label}/${direction}/${m}: no fetch/push before rejection`);
          assert.ok(!r.message.includes('echo') && !r.message.includes(sh(marker)), 'command never reported');
          assert.match(r.message, new RegExp(label === 'include' ? 'local' : label));
        }
        assert.ok(!existsSync(marker), `${label}/${direction}: alternate-refs command never executed`);
        assert.equal(f.head(), local); assert.equal(f.remote(), remote);
      });
    }
  }
});

test('R5 objects/info/alternates: normal depo, bağlı worktree (common dir), ayrı git dir, boş dosya, http-alternates ve junction fail-closed; dosya değişmez', () => {
  const altStore = (f) => { const alt = join(f.base, 'alt.git'); g(f.base, 'init', '--bare', '-q', alt); return `${sh(join(alt, 'objects'))}\n`; };
  const check = (f, ctxOpts, label, files) => {
    for (const m of ['status', 'dry-run', 'sync']) {
      const { r, trace } = run(f, m, ctxOpts);
      blocked(r, 'GIT_OBJECT_ALTERNATES_FORBIDDEN');
      assert.ok(onlyReadsBefore(trace), `${label}/${m}: only rev-parse/config before rejection`);
    }
    for (const [p, content] of files) assert.equal(readFileSync(p, 'utf8'), content, `${label}: alternates file left untouched`);
  };
  fixture((f) => { // normal depo: dolu ve boş alternates, http-alternates
    f.publish(); f.commit('n.md', 'n\n');
    const info = join(f.work, '.git', 'objects', 'info');
    for (const [name, content] of [['alternates', altStore(f)], ['alternates', ''], ['http-alternates', 'https://example.invalid/objects\n']]) {
      const p = join(info, name); writeFileSync(p, content);
      check(f, {}, `normal/${name}${content ? '' : '(empty)'}`, [[p, content]]);
      unlinkSync(p);
    }
    const j = join(info, 'alternates'); // klasör/junction girişi de "var" sayılır
    try { symlinkSync(join(f.base, 'alt-target'), j, 'junction'); } catch { mkdirSync(j); }
    for (const m of ['status', 'sync']) blocked(run(f, m).r, 'GIT_OBJECT_ALTERNATES_FORBIDDEN');
    rmSync(j, { recursive: true, force: true });
    assert.equal(run(f).r.result, 'PUSHED_VERIFIED', 'normal sync once alternates are gone');
  });
  fixture((f) => { // bağlı worktree: alternates common dir'de; ayrıca worktree kapsamlı hook
    f.publish();
    g(f.work, 'checkout', '-q', 'main');
    const wt = join(f.base, 'wt');
    g(f.work, 'worktree', 'add', '-q', wt, 'job/JOB-T1');
    writeFileSync(join(wt, 'n.md'), 'n\n'); g(wt, 'add', '-A'); g(wt, 'commit', '-q', '-m', 'wt');
    assert.equal(run(f, 'status', { repoDir: wt }).r.result, 'PREFLIGHT_PASS', 'linked worktree baseline');
    const p = join(f.work, '.git', 'objects', 'info', 'alternates'); const content = altStore(f); writeFileSync(p, content);
    check(f, { repoDir: wt }, 'linked-worktree', [[p, content]]);
    unlinkSync(p);
    const marker = join(f.base, 'hook-marker.log');
    g(wt, 'config', 'extensions.worktreeConfig', 'true');
    g(wt, 'config', '--worktree', 'hook.x.event', 'pre-push'); g(wt, 'config', '--worktree', 'hook.x.command', `echo x >> '${sh(marker)}'`);
    const { r, trace } = run(f, 'sync', { repoDir: wt });
    assertHookBlocked(r, trace, marker, 'linked-worktree hook');
    g(wt, 'config', '--worktree', '--remove-section', 'hook.x');
    assert.equal(run(f, 'sync', { repoDir: wt }).r.result, 'PUSHED_VERIFIED', 'linked worktree syncs normally');
  });
  fixture((f) => { // ayrı git dir (.git bir dosya)
    f.publish(); f.commit('n.md', 'n\n');
    const sep = join(f.base, 'separate.git');
    g(f.work, 'init', '-q', `--separate-git-dir=${sep}`);
    assert.ok(!statSync(join(f.work, '.git')).isDirectory(), '.git is a gitfile');
    assert.equal(run(f, 'status').r.result, 'PREFLIGHT_PASS', 'separate git dir baseline');
    const p = join(sep, 'objects', 'info', 'alternates'); const content = altStore(f); writeFileSync(p, content);
    check(f, {}, 'separate-git-dir', [[p, content]]);
  });
});

test('R5 normal davranış: yasak yapılandırma yokken push/alma çalışır; ilgisiz anahtarlar (core.alternateRefsPrefixes, host credential helper) engellenmez', () => fixture((f) => {
  f.publish();
  g(f.work, 'config', 'core.alternateRefsPrefixes', 'refs/heads/');
  const s = run(f, 'status').r;
  assert.equal(s.result, 'PREFLIGHT_PASS', s.message);
  assert.ok(s.checks.indexOf('no-config-execution') === 1, 'config-execution check runs right after the repository check');
  const head = f.commit('n.md', 'n\n');
  assert.equal(run(f).r.result, 'PUSHED_VERIFIED');
  assert.equal(f.remote(), head);
  remoteCommit(f, 'from-other.md', 'x\n');
  const target = f.remote();
  assert.equal(run(f).r.result, 'FAST_FORWARDED');
  assert.equal(f.head(), target);
}));

// ---------- Revision 6 ----------
const noStatusBefore = (trace) => !trace.some((a) => a[0] === 'status');
test('R6 gitlink: index\'e eklenmiş ve HEAD\'e commit edilmiş gitlink status\'tan ÖNCE GITLINK_FORBIDDEN; status alt modüle girmez', () => fixture((f) => {
  f.publish();
  const head = f.head(); const remote = f.remote();
  g(f.work, 'update-index', '--add', '--cacheinfo', `160000,${head},vendor/lib`); // yalnız index (çalışma ağacında depo yok)
  for (const m of ['status', 'dry-run', 'sync']) { const { r, trace } = run(f, m); blocked(r, 'GITLINK_FORBIDDEN'); assert.ok(noStatusBefore(trace) && noNet(trace), `index/${m}: no status/transport before rejection`); }
  g(f.work, 'commit', '-q', '-m', 'gitlink');
  const withLink = f.head();
  g(f.work, 'rm', '-q', '--cached', 'vendor/lib'); // index'ten çıkar: HEAD'deki gitlink yine yakalanır
  for (const m of ['status', 'sync']) { const { r, trace } = run(f, m); blocked(r, 'GITLINK_FORBIDDEN'); assert.ok(noStatusBefore(trace) && noNet(trace), `head/${m}`); }
  assert.equal(f.head(), withLink, 'no checkout/ref movement'); assert.equal(f.remote(), remote, 'remote unchanged');
}));

test('R6 status alt modül özyinelemesi kapalı: ön kontroldeki status --ignore-submodules=all; doğrudan git çağrıları submodule.recurse=false', () => fixture((f) => {
  f.publish();
  const { r, trace } = run(f, 'status');
  assert.equal(r.result, 'PREFLIGHT_PASS', r.message);
  const st = trace.filter((a) => a[0] === 'status');
  assert.equal(st.length, 1);
  assert.ok(st[0].includes('--ignore-submodules=all') && !st[0].includes('--ignore-submodules=none'));
  assert.ok(r.checks.indexOf('no-gitlinks') === r.checks.indexOf('no-config-execution') + 1 && r.checks.indexOf('no-gitlinks') < r.checks.indexOf('clean-worktree'), 'gitlink check precedes status');
  assert.match(readFileSync(join(ROOT, 'os', 'lib', 'control', 'safe-sync.mjs'), 'utf8'), /'-c', 'submodule\.recurse=false'/);
}));

// R5 incelemesindeki P1-1'in regresyonu: alt modülün kendi yapılandırmasındaki sentinel hook (yalnız marker dosyasına satır ekler).
test('R6 alt modül: .gitmodules\'lü alt modülün yapılandırma hook\'u status/dry-run/sync\'te çalışmaz (GITLINK_FORBIDDEN); kontrol: korumasız status onu çalıştırır', () => fixture((f) => {
  f.publish();
  const src = join(f.base, 'subsrc');
  g(f.base, 'init', '-q', '-b', 'main', src); g(src, 'config', 'user.name', 's'); g(src, 'config', 'user.email', 's@example.invalid');
  writeFileSync(join(src, 'x.txt'), 'x\n'); g(src, 'add', '-A'); g(src, 'commit', '-q', '-m', 's');
  g(f.work, '-c', 'protocol.file.allow=always', 'submodule', 'add', '-q', src, 'sub'); g(f.work, 'commit', '-q', '-m', 'add sub');
  const sub = join(f.work, 'sub'); const subHead = g(sub, 'rev-parse', 'HEAD');
  const marker = join(f.base, 'sub-marker.log');
  g(sub, 'config', 'hook.s.event', 'post-index-change'); g(sub, 'config', 'hook.s.command', `echo sub >> '${sh(marker)}'`);
  const stale = () => { const t = new Date(Date.now() - 3600e3 - Math.floor(Math.random() * 1e6)); utimesSync(join(sub, 'x.txt'), t, t); };
  const local = f.head(); const remote = f.remote();
  for (const m of ['status', 'dry-run', 'sync']) { stale(); const { r, trace } = run(f, m); blocked(r, 'GITLINK_FORBIDDEN'); assert.ok(noStatusBefore(trace) && noNet(trace), m); }
  assert.ok(!existsSync(marker), 'submodule hook never ran during safe-sync');
  if (spawnSync(findGit(), ['hook', 'list', 'pre-push'], { cwd: f.work, env: gitEnv() }).status !== 129) { // Git ≥ 2.54: kontrol
    stale(); spawnSync(findGit(), ['status', '--porcelain', '--ignore-submodules=none'], { cwd: f.work, env: gitEnv() });
    assert.ok(existsSync(marker), 'control: an unprotected recursive status does run the submodule hook (the test would detect a regression)');
  }
  assert.equal(f.head(), local); assert.equal(f.remote(), remote); assert.equal(g(sub, 'rev-parse', 'HEAD'), subHead, 'submodule not checked out');
  assert.equal(g(sub, 'config', '--get', 'hook.s.event'), 'post-index-change', 'submodule configuration untouched');
}));

test('R6 hook/fsmonitor yüzeyi: GLOBAL core.hooksPath, WORKTREE fsmonitor, hooks klasöründe sample olmayan girişler ve bağlı worktree common dir reddedilir; yalnız *.sample geçer; hiçbir şey değişmez', () => {
  fixture((f) => {
    f.publish(); f.commit('n.md', 'n\n');
    const remote = f.remote();
    assert.equal(run(f, 'status').r.result, 'PREFLIGHT_PASS', 'git init default *.sample hooks are permitted');
    const home = join(f.base, 'home-hp'); mkdirSync(home);
    const cfg = `[core]\n\thooksPath = ${sh(join(f.base, 'nowhere'))}\n[credential]\n\thelper = manager\n`;
    writeFileSync(join(home, '.gitconfig'), cfg);
    withEnv({ HOME: home, USERPROFILE: home }, () => { const r = run(f, 'sync').r; blocked(r, 'HOOKS_PATH_CONFIGURED'); assert.match(r.message, /global/); assert.ok(!r.message.includes('nowhere')); });
    assert.equal(readFileSync(join(home, '.gitconfig'), 'utf8'), cfg, 'host configuration untouched');
    g(f.work, 'config', 'extensions.worktreeConfig', 'true'); g(f.work, 'config', '--worktree', 'core.fsmonitor', 'true');
    blocked(run(f, 'status').r, 'FSMONITOR_CONFIGURED');
    g(f.work, 'config', '--worktree', '--unset', 'core.fsmonitor');
    const hooks = join(f.work, '.git', 'hooks');
    for (const [label, make, undo] of [
      ['uppercase name', (p) => writeFileSync(join(p, 'PRE-PUSH'), '#!/bin/sh\nexit 0\n'), (p) => unlinkSync(join(p, 'PRE-PUSH'))],
      ['.exe variant', (p) => writeFileSync(join(p, 'pre-push.exe'), ''), (p) => unlinkSync(join(p, 'pre-push.exe'))],
      ['directory named *.sample', (p) => mkdirSync(join(p, 'x.sample')), (p) => rmSync(join(p, 'x.sample'), { recursive: true })],
      ['unrelated file', (p) => writeFileSync(join(p, 'README'), 'notes\n'), (p) => unlinkSync(join(p, 'README'))],
    ]) {
      make(hooks);
      for (const m of ['status', 'sync']) { const { r, trace } = run(f, m); blocked(r, 'GIT_HOOK_FILE_PRESENT'); assert.ok(noNet(trace), `${label}/${m}`); }
      assert.ok(readdirSync(hooks).length > 0); undo(hooks);
    }
    assert.equal(f.remote(), remote, 'remote unchanged');
    assert.equal(run(f).r.result, 'PUSHED_VERIFIED', 'normal sync once the hooks directory holds only samples');
  });
  fixture((f) => { // bağlı worktree: hook common dir'de
    f.publish();
    g(f.work, 'checkout', '-q', 'main');
    const wt = join(f.base, 'wt'); g(f.work, 'worktree', 'add', '-q', wt, 'job/JOB-T1');
    writeFileSync(join(f.work, '.git', 'hooks', 'pre-push'), '#!/bin/sh\nexit 0\n');
    blocked(run(f, 'status', { repoDir: wt }).r, 'GIT_HOOK_FILE_PRESENT');
    unlinkSync(join(f.work, '.git', 'hooks', 'pre-push'));
    assert.equal(run(f, 'status', { repoDir: wt }).r.result, 'PREFLIGHT_PASS');
  });
});

test('R6 profil ortamı: miras GIT_CONFIG_* (her harf biçimi), GIT_DIR, NODE_OPTIONS silinir; yalnız şirketin GIT_CONFIG_COUNT/KEY/VALUE sertleştirmesi eklenir', () => {
  const vars = { GIT_CONFIG_COUNT: '1', GIT_CONFIG_KEY_0: 'core.hooksPath', GIT_CONFIG_VALUE_0: '/inherited', GIT_CONFIG_PARAMETERS: "'core.fsmonitor'='/inherited'", GIT_DIR: '/inherited', NODE_OPTIONS: '--no-warnings', Git_Config_Key_7: '/inherited' };
  const e = withEnv(vars, () => profileEnv('/company-empty-hooks'));
  assert.ok(!Object.values(e).some((v) => String(v).includes('/inherited')), 'no inherited override survives');
  assert.ok(!Object.keys(e).some((k) => /^(NODE_OPTIONS|NODE_PATH|GIT_DIR|GIT_CONFIG_PARAMETERS)$/i.test(k)));
  const keys = Object.keys(e).filter((k) => /^GIT_CONFIG_/i.test(k));
  assert.deepEqual(keys.sort(), ['GIT_CONFIG_COUNT', ...[0, 1, 2, 3].flatMap((i) => [`GIT_CONFIG_KEY_${i}`, `GIT_CONFIG_VALUE_${i}`])].sort());
  assert.equal(e.GIT_CONFIG_COUNT, '4');
  assert.deepEqual([0, 1, 2, 3].map((i) => [e[`GIT_CONFIG_KEY_${i}`], e[`GIT_CONFIG_VALUE_${i}`]]),
    [['core.hooksPath', '/company-empty-hooks'], ['core.fsmonitor', 'false'], ['submodule.recurse', 'false'], ['diff.ignoreSubmodules', 'all']]);
});

// Gerçek bir profil adımı kendi git alt süreçlerini başlatır (testlerin records.git() davranışı gibi): torun git sertleştirmeyi miras alır.
test('R6 profil torun git süreçleri: komut kapsamında boş hooks klasörü + fsmonitor=false görür; GLOBAL (host) fsmonitor sentinel profilde çalışmaz; kontrol: korumasız status çalıştırır', () => fixture((f) => {
  f.publish();
  const head = f.commit('n.md', 'n\n');
  const sentinel = join(f.base, 'FSM_SENTINEL'); const prog = join(f.base, 'fsmonitor.sh');
  sentinelScript(prog, sentinel, 'fsmonitor');
  const home = join(f.base, 'home-fsm'); mkdirSync(home);
  writeFileSync(join(home, '.gitconfig'), `[core]\n\tfsmonitor = ${sh(prog)}\n[credential]\n\thelper = manager\n`);
  const out = join(f.base, 'profile-view.txt');
  const code = [
    "const { spawnSync } = require('node:child_process'); const fs = require('node:fs');",
    'const [git, out] = process.argv.slice(1);',
    "const q = (a) => spawnSync(git, a, { encoding: 'utf8' });",
    "const t = new Date(Date.now() - 7200e3); fs.utimesSync('README.md', t, t);",
    "q(['status', '--porcelain']); q(['diff', '--name-status', 'HEAD', '--']);",
    "fs.writeFileSync(out, ['core.hooksPath', 'core.fsmonitor', 'submodule.recurse', 'diff.ignoreSubmodules'].map((k) => k + '=' + q(['config', '--show-scope', '--get', k]).stdout.trim()).join('\\n'));",
  ].join('\n');
  const policy = testPolicy(f.bare, { profiles: Object.freeze({ TEST: Object.freeze([Object.freeze({ name: 'git-spawning-profile', argv: Object.freeze(['-e', code, findGit(), out]) })]) }) });
  const inherited = { HOME: home, USERPROFILE: home, GIT_CONFIG_COUNT: '1', GIT_CONFIG_KEY_0: 'core.fsmonitor', GIT_CONFIG_VALUE_0: sh(prog) };
  const r = withEnv(inherited, () => run(f, 'sync', { policy }).r);
  assert.equal(r.result, 'PUSHED_VERIFIED', r.message);
  assert.equal(f.remote(), head);
  const view = Object.fromEntries(readFileSync(out, 'utf8').split('\n').map((l) => l.split('=')));
  for (const [k, v] of Object.entries({ 'core.fsmonitor': 'command\tfalse', 'submodule.recurse': 'command\tfalse', 'diff.ignoreSubmodules': 'command\tall' })) assert.equal(view[k], v, k);
  assert.match(view['core.hooksPath'], /^command\t.*cos-safe-sync-hooks-/, 'descendant git sees the company empty hooks directory');
  assert.ok(!existsSync(view['core.hooksPath'].split('\t')[1]), 'empty hooks directory removed after the profile');
  assert.ok(!existsSync(sentinel), 'host fsmonitor program never ran inside the verification profile');
  withEnv({ HOME: home, USERPROFILE: home }, () => { const t = new Date(Date.now() - 9000e3); utimesSync(join(f.work, 'README.md'), t, t); spawnSync(findGit(), ['status', '--porcelain'], { cwd: f.work, env: gitEnv() }); });
  assert.ok(existsSync(sentinel), 'control: the same host fsmonitor does run for an unprotected git status');
}));

test('R6 profil girdisi: yok sayılan profil test dosyası / os/ modül dosyası UNTRACKED_PROFILE_CODE; ilgisiz yok sayılan dosya engellemez; dosya silinmez', () => fixture((f) => {
  f.publish(); f.commit('n.md', 'n\n');
  writeFileSync(join(f.work, '.git', 'info', 'exclude'), '*.ignored.*\n');
  const policy = testPolicy(f.bare, { profiles: Object.freeze({ TEST: Object.freeze([Object.freeze({ name: 'glob', argv: Object.freeze(['--test', 'os/tests/*.test.mjs']) })]) }) });
  mkdirSync(join(f.work, 'os', 'tests'), { recursive: true }); mkdirSync(join(f.work, 'os', 'notes'), { recursive: true });
  writeFileSync(join(f.work, 'os', 'notes', 'n.ignored.log'), 'log\n'); writeFileSync(join(f.work, 'top.ignored.mjs'), '');
  assert.equal(run(f, 'status', { policy }).r.result, 'PREFLIGHT_PASS', 'unrelated ignored files (log under os/, module outside os/) do not block');
  for (const p of ['os/tests/x.ignored.test.mjs', 'os/lib/y.ignored.json']) {
    mkdirSync(join(f.work, p, '..'), { recursive: true }); writeFileSync(join(f.work, p), '');
    for (const m of ['status', 'sync']) { const { r, trace } = run(f, m, { policy }); blocked(r, 'UNTRACKED_PROFILE_CODE'); assert.ok(noNet(trace), `${p}/${m}`); }
    assert.ok(existsSync(join(f.work, p)), 'file left in place'); unlinkSync(join(f.work, p));
  }
  assert.equal(spawnSync(findGit(), ['check-ignore', '-q', 'os/tests/x-secret.test.mjs'], { cwd: ROOT, env: gitEnv() }).status, 0, 'production .gitignore really ignores such a profile file (the gap this check closes)');
}));

// R6 kapanış düzeltmesi (bağımsız inceleme F1): Windows'ta Node --test glob'u ve dosya sistemi büyük/küçük harf duyarsız; profil pathspec'i
// de öyle olmalı. Zararsız sentinel: dosya çalışırsa yalnız marker dosyasına satır ekler (CJS ve ESM'de çalışan dinamik import).
test('R6 F1 profil girdisi büyük/küçük harf: .MJS / karışık uzantı / OS/Tests yolu UNTRACKED_PROFILE_CODE; profil çalışmadan reddedilir; ilgisiz yok sayılan dosya geçer', () => fixture((f) => {
  f.publish(); f.commit('n.md', 'n\n');
  const remote = f.remote();
  writeFileSync(join(f.work, '.git', 'info', 'exclude'), '*secret*\n');
  const marker = join(f.base, 'F1_RAN');
  const body = (p) => `import('node:fs').then((fs) => fs.appendFileSync(${JSON.stringify(marker)}, ${JSON.stringify(`${p}\n`)}));\n`;
  const policy = testPolicy(f.bare, { profiles: Object.freeze({ TEST: Object.freeze([Object.freeze({ name: 'glob', argv: Object.freeze(['--test', 'os/tests/*.test.mjs']) })]) }) });
  mkdirSync(join(f.work, 'OS', 'Tests'), { recursive: true }); mkdirSync(join(f.work, 'OS', 'Lib'), { recursive: true }); // yol harf varyantı: klasör büyük harfle oluşur
  writeFileSync(join(f.work, 'OS', 'Lib', 'n-secret.LOG'), 'log\n'); writeFileSync(join(f.work, 'top-secret.MJS'), body('top'));
  assert.equal(run(f, 'status', { policy }).r.result, 'PREFLIGHT_PASS', 'unrelated ignored files (non-module under OS/, module outside os/) do not block');
  for (const p of ['OS/Tests/b-secret.test.MJS', 'OS/Tests/c-secret.Test.Mjs', 'OS/Tests/g-secret.test.mjs', 'OS/Lib/d-secret.CJS', 'OS/Lib/e-secret.Js', 'OS/Lib/h-secret.JSON']) {
    writeFileSync(join(f.work, p), body(p));
    for (const m of ['status', 'sync']) { const { r, trace } = run(f, m, { policy }); blocked(r, 'UNTRACKED_PROFILE_CODE'); assert.ok(noNet(trace) && !r.verification, `${p}/${m}: rejected before transport and before the profile`); }
    assert.ok(existsSync(join(f.work, p)), 'file left in place'); unlinkSync(join(f.work, p));
  }
  assert.ok(!existsSync(marker), 'no ignored profile input ever executed');
  if (process.platform === 'win32') { // kontrol: aynı .MJS dosyası profil komutuyla gerçekten çalışır (test bir gerilemeyi yakalar)
    const p = 'OS/Tests/b-secret.test.MJS'; writeFileSync(join(f.work, p), body(p));
    spawnSync(process.execPath, ['--test', 'os/tests/*.test.mjs'], { cwd: f.work, env: profileEnv(join(f.base, 'none')), stdio: 'ignore', windowsHide: true });
    assert.ok(existsSync(marker), 'control: Node --test on Windows does run an uppercase .MJS ignored file');
  }
  assert.equal(f.remote(), remote, 'remote unchanged: every sync was rejected');
}));

// ---------- CLI / genel ----------
test('CLI JSON: üretim politikası sabit; geçici depoya yönlendirilse bile onaysız uzağa dokunmaz', () => fixture((f) => {
  f.publish();
  const cli = join(ROOT, 'os', 'control', 'company.mjs');
  let out;
  try { out = execFileSync(process.execPath, [cli, 'safe-sync', 'sync', '--json', '--repo-dir', f.work], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { out = e.stdout; }
  const r = JSON.parse(out);
  assert.equal(r.schema, 'safe-sync-result/1');
  assert.equal(r.policy_id, 'safe-sync/1');
  assert.equal(r.code, 'REMOTE_POLICY_MISMATCH');
  assert.equal(PRODUCTION_SYNC_POLICY.remote.url, 'https://github.com/Maglorex/ai-media-company-os.git');
}));

test('genel: hiçbir testte gerçek origin/GitHub çağrılmadı; force/silme/joker/etiket argümanı hiç üretilmedi', () => {
  assert.ok(ALL_TRACES.length > 20, 'traces collected');
  for (const args of ALL_TRACES.flat()) {
    assert.ok(!args.some((a) => /github\.com/i.test(a)), `real remote contacted: ${args.join(' ')}`);
    if (args[0] === 'push') {
      assert.ok(!args.some((a) => /^(-f|--force.*|--delete|-d|--mirror|--all|--tags|--prune)$/.test(a) || a.startsWith('+') || a.startsWith(':')), args.join(' '));
    }
    assert.ok(!['reset', 'rebase', 'remote', 'clean', 'tag', 'branch', 'checkout', 'pull'].includes(args[0]) || (args[0] === 'remote' && args[1] === 'get-url'), `forbidden git subcommand: ${args.join(' ')}`);
  }
});
