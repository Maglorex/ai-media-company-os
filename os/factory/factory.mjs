#!/usr/bin/env node
// Company OS v2 — Stage 4 factory CLI (D-047). Paket yok. Protokol: os/factory/README.md.
//   issue     (Main PC)   handoff'u üretir; gate geçmezse BLOCKED yazar (zorla READY yok)
//   preflight (Strong PC) boot contract; yalnız READY_FOR_PRODUCTION üretime izin verir. Atlama/zorlama seçeneği YOKTUR.
//   backup    (Strong PC) production dosyalarının kurtarılabilirliği (yalnız bu PC'de olan dosyayı bulur)
//   lint      handoff | ccr | delivery
//   selftest  gerçek git + gerçek dosya sistemiyle boot contract senaryoları (render yok)
import { writeFileSync } from 'node:fs';
import { ROOT } from '../lib/records.mjs';
import { makeEnv, issueHandoff, preflight, backupStatus, lintHandoff, lintCCR, lintDeliveryReport, parseManifest, shingles, STATUS } from '../lib/factory.mjs';
import { runScenarios } from './fixtures.mjs';

const [cmd, ...rest] = process.argv.slice(2);
const opts = {};
const pos = [];
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith('--')) { const k = rest[i].slice(2); const v = rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[++i] : true; (opts[k] ??= []).push(v); }
  else pos.push(rest[i]);
}
const one = (k, d) => (opts[k] ? opts[k][opts[k].length - 1] : d);
const list = (k) => (opts[k] || []).flatMap((v) => String(v).split(',')).map((s) => s.trim()).filter(Boolean);
const repoDir = one('repo', ROOT);
const env = () => makeEnv(repoDir);
const print = (o) => console.log(JSON.stringify(o, null, 2));

function showFindings(findings) {
  for (const f of findings) console.log(`  ${f.level === 'block' ? '✖' : f.level === 'warn' ? '!' : '·'} ${f.status.padEnd(28)} ${f.code.padEnd(26)} ${f.detail}`);
}

if (cmd === 'issue') {
  const req = ['id', 'version', 'case', 'channel', 'scene-plan', 'qa', 'manifest', 'rights', 'evidence', 'production-root', 'out'];
  const missing = req.filter((k) => !opts[k]);
  if (missing.length) { console.error(`missing: ${missing.map((k) => `--${k}`).join(' ')}`); process.exit(1); }
  const approvals = Object.fromEntries(list('approve').map((kv) => kv.split('=')));
  const { contract, md } = issueHandoff(env(), {
    id: one('id'), version: Number(one('version')), case: one('case'), channel: one('channel'), scope: one('scope'),
    scenePlanPath: one('scene-plan'), qaPath: one('qa'), manifestPath: one('manifest'), rightsPath: one('rights'), evidencePath: one('evidence'),
    productionRoot: one('production-root'), allowedCode: list('allowed-code'), forbiddenCode: list('forbidden-code'),
    supersedes: one('supersedes', null), notInherited: list('not-inherited'), approvals,
  });
  writeFileSync(`${repoDir}/${one('out')}`, md);
  console.log(`${contract.handoff_id} v${contract.handoff_version}: ${contract.status} → ${one('out')}`);
  showFindings(contract.blockers);
  process.exit(contract.status === 'ISSUED' ? 0 : 2);
} else if (cmd === 'preflight') {
  if (!opts.handoff) { console.error('usage: preflight --handoff <repo path> [--expect ID@vN] [--json]'); process.exit(1); }
  const exp = one('expect') ? (([id, v]) => ({ id, version: Number(v) }))(String(one('expect')).split('@v')) : null;
  const r = preflight({ env: env(), handoffPath: one('handoff'), expect: exp });
  if (opts.json) print(r);
  else {
    console.log(`STRONG PC PREFLIGHT · ${one('handoff')}`);
    console.log(`RESULT: ${r.status}`);
    showFindings(r.findings);
    if (r.observed?.assets) for (const [id, a] of Object.entries(r.observed.assets)) console.log(`  observed ${id}: ${a.exists === false ? 'missing' : `sha256 ${a.sha256} ${a.width ? `${a.width}×${a.height}` : ''}${a.duration ? ` ${a.duration.toFixed(3)}s` : ''}`}`);
    if (r.status !== STATUS.READY) console.log('Production does not start. No fallback: report this result to Main PC (COO).');
  }
  process.exit(r.status === STATUS.READY ? 0 : 2);
} else if (cmd === 'backup') {
  if (!opts['production-root']) { console.error('usage: backup --production-root <dir> [--backup-root <dir> ...] [--manifest <repo path>] [--require-protected]'); process.exit(1); }
  const manifestRows = opts.manifest ? parseManifest(env().readFile(one('manifest')) || '') : [];
  const r = backupStatus({ productionRoot: one('production-root'), backupRoots: opts['backup-root'] || [], manifestRows });
  for (const [k, v] of Object.entries(r)) console.log(`${k.padEnd(15)} ${v.length}${k === 'UNPROTECTED' && v.length ? `  ← only on this PC: ${v.slice(0, 10).join(', ')}${v.length > 10 ? ' …' : ''}` : ''}`);
  process.exit(opts['require-protected'] && r.UNPROTECTED.length ? 3 : 0);
} else if (cmd === 'lint') {
  const [kind, file] = pos;
  const text = env().readFile(file);
  if (text === null) { console.error(`not found: ${file}`); process.exit(1); }
  const canon = env().listFiles('channels').filter((p) => /\/canon\/.*\.md$/.test(p)).map((p) => env().readFile(p));
  const errs = kind === 'handoff' ? lintHandoff(text, { canonShingles: shingles(canon) })
    : kind === 'ccr' ? lintCCR(text)
      : kind === 'delivery' ? lintDeliveryReport(text, { manifestRows: parseManifest(env().readFile(one('manifest')) || '') })
        : [`unknown lint kind: ${kind}`];
  for (const e of errs) console.log(`✖ ${e}`);
  console.log(errs.length ? `FAIL (${errs.length})` : 'PASS');
  process.exit(errs.length ? 2 : 0);
} else if (cmd === 'selftest') {
  console.log('STAGE 4 BOOT CONTRACT SELF-TEST (fixtures; real git + real files; no render)');
  const results = runScenarios((r) => console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.name.padEnd(46)} expected ${r.expected.padEnd(28)} got ${r.got}`));
  const ok = results.every((r) => r.ok);
  console.log(`SELFTEST ${ok ? 'PASS' : 'FAIL'} (${results.filter((r) => r.ok).length}/${results.length})`);
  process.exit(ok ? 0 : 2);
} else {
  console.log('usage: node os/factory/factory.mjs <issue|preflight|backup|lint|selftest> …   (see os/factory/README.md)');
  process.exit(cmd ? 1 : 0);
}
