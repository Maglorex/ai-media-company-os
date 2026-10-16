// Stage 4 portability: shared Company OS testleri yeni clone edilmiş, PATH'te git olmayan (GitHub Desktop git'li) bir makinede
// ekstra yerel branch/tag yaratmadan temiz geçmeli. Main-PC-only tarihsel kontroller ayrı: os/tests/main-pc/.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname, delimiter, isAbsolute } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { ROOT, git, read, parseCsv } from '../lib/records.mjs';
import { gitCandidates, locateGit, findGit } from '../lib/gitbin.mjs';
import { checkpoints, verifyCheckpoint, registryGitRowErrors } from '../lib/checkpoints.mjs';

const NESTED = process.env.COMPANYOS_NESTED_TEST === '1';
const hasDesktopGit = () => gitCandidates({ env: { LOCALAPPDATA: process.env.LOCALAPPDATA } }).some((p) => existsSync(p));
// PATH'ten git içeren dizinleri çıkarır (Strong PC simülasyonu).
const pathWithoutGit = () => (process.env.PATH || process.env.Path || '').split(delimiter)
  .filter((d) => d && !existsSync(join(d, 'git.exe')) && !existsSync(join(d, 'git'))).join(delimiter);
const envWithoutGit = (extra = {}) => {
  const env = { ...process.env, ...extra };
  for (const k of Object.keys(env)) if (k.toUpperCase() === 'PATH') delete env[k];
  env.PATH = pathWithoutGit();
  return env;
};

test('git discovery: PATH\'te git yok ama GitHub Desktop git\'i var → en yeni gömülü git seçilir; kişisel sabit yol yok', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cos-gitbin-'));
  try {
    const base = join(dir, 'GitHubDesktop');
    for (const v of ['app-3.6.6', 'app-3.10.0', 'app-3.9.1']) { const p = join(base, v, 'resources', 'app', 'git', 'cmd'); mkdirSync(p, { recursive: true }); writeFileSync(join(p, 'git.exe'), ''); }
    mkdirSync(join(base, 'packages'));
    const want = join(base, 'app-3.10.0', 'resources', 'app', 'git', 'cmd', 'git.exe');
    const probe = (bin) => bin === want; // PATH'teki 'git' çalışmıyor
    assert.equal(locateGit({ env: { LOCALAPPDATA: dir }, probe }), want);
    assert.equal(locateGit({ env: { LOCALAPPDATA: dir, ProgramFiles: join(dir, 'PF') }, probe: () => false }), null, 'no git anywhere → explicit failure, not a guess');
    const pfGit = join(dir, 'PF', 'Git', 'cmd', 'git.exe'); mkdirSync(dirname(pfGit), { recursive: true }); writeFileSync(pfGit, '');
    assert.equal(locateGit({ env: { ProgramFiles: join(dir, 'PF') }, probe: (b) => b === pfGit }), pfGit, 'standard Git for Windows install');
    // PATH'teki git hâlâ önce gelir — ama artık çıplak 'git' değil, mutlak yol olarak (Gate 1D-A R4).
    const pathBin = join(dir, 'pathbin'); mkdirSync(pathBin); const pathGit = join(pathBin, process.platform === 'win32' ? 'git.exe' : 'git'); writeFileSync(pathGit, '');
    assert.equal(locateGit({ env: { LOCALAPPDATA: dir, PATH: pathBin }, probe: (b) => b === pathGit || b === want }), pathGit, 'PATH git still preferred when present');
    const probed = [];
    locateGit({ env: { LOCALAPPDATA: dir, PATH: pathBin }, probe: (b) => { probed.push(b); return false; } });
    assert.ok(probed.length > 0 && probed.every((b) => isAbsolute(b)), 'only absolute candidates are ever probed');
  } finally { rmSync(dir, { recursive: true, force: true }); }
  const src = read('os/lib/gitbin.mjs');
  assert.ok(!/[A-Z]:\\\\Users|Administrator|Berkan|\/Users\//.test(src), 'no personal hardcoded path');
  assert.ok(!/execFileSync\('git'/.test(read('os/lib/records.mjs')), 'records.mjs must not call PATH git directly');
  assert.match(read('os/lib/factory.mjs'), /from '\.\/gitbin\.mjs'/, 'factory uses the shared discovery');
});

test('git discovery (gerçek süreç): PATH\'ten git çıkarılınca records.mjs ve factory GitHub Desktop git\'iyle çalışır', { skip: !hasDesktopGit() && 'GitHub Desktop not installed on this machine' }, () => {
  const script = `import { git } from ${JSON.stringify(new URL('../lib/records.mjs', import.meta.url).href)};
import { makeEnv, findGit } from ${JSON.stringify(new URL('../lib/factory.mjs', import.meta.url).href)};
console.log(JSON.stringify({ head: git('rev-parse', 'HEAD').trim(), envHead: makeEnv(${JSON.stringify(ROOT)}).head(), bin: findGit() }));`;
  const out = JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', script], { cwd: ROOT, env: envWithoutGit(), encoding: 'utf8' }));
  const head = git('rev-parse', 'HEAD').trim();
  assert.equal(out.head, head);
  assert.equal(out.envHead, head);
  assert.match(out.bin, /GitHubDesktop[\\/]app-[^\\/]+[\\/]resources[\\/]app[\\/]git[\\/]cmd[\\/]git\.exe$/);
});

test('kanonik checkpoint SHA ile doğrulanır; yanlış SHA FAIL verir (atlama yok)', () => {
  const cp = checkpoints().pre_v2_checkpoint;
  assert.deepEqual(verifyCheckpoint(cp), []);
  assert.match(verifyCheckpoint({ ...cp, commit: 'f'.repeat(40) })[0], /not in this repository's history/);
  const head = git('rev-parse', 'HEAD').trim();
  assert.ok(verifyCheckpoint({ ...cp, commit: head }).some((e) => /tree mismatch/.test(e)), 'a real but wrong commit is rejected');
  assert.ok(verifyCheckpoint({ ...cp, tree: '0'.repeat(40) }).some((e) => /tree mismatch/.test(e)));
  assert.match(verifyCheckpoint({ ...cp, commit: cp.commit.slice(0, 12) })[0], /full 40-hex/);
  const mig = read('os/tests/migration.test.mjs');
  assert.ok(!/skip:/.test(mig), 'migration tests are not skipped when a local tag is missing');
  assert.ok(!/rev-parse', '--verify', '--quiet', `\$\{BASE\}/.test(mig) && !/const BASE = 'pre-v2-checkpoint'/.test(mig), 'no dependency on the local tag');
});

test('registry git: satırları: beyan edilmemiş ref veya ACTIVE statü reddedilir', () => {
  const cfg = checkpoints();
  const row = (o) => ({ artifact_id: 'X', path: 'git:draft/os-v2-phase1-plan:company/os-v2/A.md', status: 'DRAFT', ...o });
  assert.deepEqual(registryGitRowErrors([row()], cfg), []);
  assert.match(registryGitRowErrors([row({ path: 'git:some-local-branch:a.md' })], cfg)[0], /not declared/);
  assert.match(registryGitRowErrors([row({ status: 'ACTIVE' })], cfg)[0], /cannot be ACTIVE/);
  assert.deepEqual(registryGitRowErrors(parseCsv(read('company/state/artifact-registry.csv')), cfg), []);
  assert.ok(cfg.machine_local_refs.every((r) => r.scope === 'main-pc-only'));
});

// Yeni clone simülasyonu: aynı branch, --no-tags --single-branch (draft branch ve pre-v2 tag yok), çalışma ağacı aynen,
// PATH'te git yok (GitHub Desktop varsa). Shared paket orada fail 0 ile geçmeli; production güvenlik testleri dahil.
test('temiz clone (draft branch yok, pre-v2 tag yok, PATH\'te git yok): shared test paketi geçer', { skip: NESTED && 'nested run', timeout: 600000 }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'cos-clone-'));
  const clone = join(dir, 'repo');
  const bin = findGit();
  const g = (cwd, ...a) => execFileSync(bin, a, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 });
  try {
    const branch = git('rev-parse', '--abbrev-ref', 'HEAD').trim();
    g(dir, 'clone', '-q', '--no-tags', '--single-branch', '--branch', branch, ROOT, clone);
    // Çalışma ağacı (commit'lenmemiş değişiklikler dahil) aynen taşınır; böylece test edilen şey bu ağaçtır.
    for (const f of git('ls-files', '-co', '--exclude-standard').split('\n').filter(Boolean)) {
      if (!existsSync(join(ROOT, f))) continue;
      mkdirSync(dirname(join(clone, f)), { recursive: true });
      copyFileSync(join(ROOT, f), join(clone, f));
    }
    g(clone, 'config', 'user.name', 'clone-test'); g(clone, 'config', 'user.email', 'clone-test@example.invalid');
    g(clone, 'add', '-A');
    try { g(clone, 'commit', '-q', '-m', 'working tree overlay'); } catch { /* değişiklik yoksa */ }
    assert.equal(g(clone, 'tag', '-l').trim(), '', 'clone must have no tags');
    assert.ok(!/draft\/os-v2-phase1-plan/.test(g(clone, 'branch', '-a')), 'clone must not have the draft branch');
    const env = hasDesktopGit() ? envWithoutGit({ COMPANYOS_NESTED_TEST: '1' }) : { ...process.env, COMPANYOS_NESTED_TEST: '1' };
    delete env.NODE_TEST_CONTEXT; // iç içe test koşucusu: ana koşucunun bağlamı devralınmaz
    let out;
    try { out = execFileSync(process.execPath, ['--test', 'os/tests/*.test.mjs'], { cwd: clone, env, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); }
    catch (e) { out = `${e.stdout}\n${e.stderr}`; }
    const n = (k) => Number((out.match(new RegExp(`^ℹ ${k} (\\d+)`, 'm')) || [])[1]);
    assert.equal(n('fail'), 0, `shared suite failed in a clean clone:\n${out.split('\n').filter((l) => /^✖|Error|expected|actual/.test(l)).slice(0, 30).join('\n')}`);
    assert.ok(n('pass') > 80, 'suite ran');
    const skipped = (out.match(/^﹣ .*# SKIP.*$/gm) || []).concat(out.match(/^.* # SKIP .*$/gm) || []);
    assert.ok(n('skipped') <= 1 && skipped.every((l) => /nested run/.test(l)), `only this nested self-test may skip:\n${skipped.join('\n')}`);
    for (const name of ['Strong PC boot contract', 'rights hard-fail', 'P3 handoff dry-run', 'migration: kanonik checkpoint']) assert.ok(out.includes(`✔ ${name}`), `production/version/rights safety test ran and passed: ${name}`);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
