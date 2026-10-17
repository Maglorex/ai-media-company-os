// Stage 4 (D-047) — factory interface: Handoff v2, Strong PC boot contract, asset manifest + rights hard-fail, CCR,
// teslim raporu (technical QA), yedek. Fixture'lar gerçek git + gerçek dosya sistemi kullanır; render yok.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, mkdirSync, rmSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import { read, git, parseCsv, ROOT } from '../lib/records.mjs';
import { readinessErrors, lintScenePlan } from '../lib/pipeline.mjs';
import {
  STATUS, overall, rightsVerdict, validateManifest, scanCode, gateHandoff, parseManifest, parseHandoff, lintHandoff, shingles, renderHandoff,
  lintCCR, lintDeliveryReport, backupStatus, mediaInfo, hashFile, preflight, makeEnv, issueHandoff, findGit,
  CANONICAL_CONTROL_BRANCH, STRONG_PC_MACHINE,
} from '../lib/factory.mjs';
import { runScenarios, png, wav, SCENE_PLAN, QA_PASS, PATHS, ledger as fxLedger, manifest as fxManifest } from '../factory/fixtures.mjs';
import { runtimeContext, canon } from '../lib/control/common.mjs';
import { initRuntime, pauseCompany } from '../lib/control/runtime.mjs';
import { parseEventLog, buildEvent } from '../lib/control/events.mjs';
import { replay } from '../lib/control/model.mjs';
import { createJob, transitionJob, assignJob } from '../lib/control/jobs.mjs';
import { recordAssignment, startJobBranch, syncContext } from '../lib/control/safe-sync.mjs';
import { PRODUCTION_SYNC_POLICY } from '../lib/control/sync-policy.mjs';

const CASE = 'channels/the-industrial-casebook/cases/VID-001/';
const HANDOFF = `${CASE}handoff/07-production-handoff-v1.md`;
const LEDGER = 'production/pilots/2026-10-n2-pilot-test/VID-001-rights-ledger.csv';
const codes = (fs) => fs.filter((f) => f.level === 'block').map((f) => f.code);
const canonShingles = () => shingles(git('ls-files', 'channels/the-industrial-casebook/canon').split('\n').filter((p) => p.endsWith('.md')).map(read));

test('Strong PC boot contract: fixture senaryoları (doğru handoff, yanlış commit, kirli ağaç, eksik/yanlış asset, reddedilmiş hak, eski handoff, legacy handoff, açık CCR)', () => {
  const results = runScenarios();
  const by = Object.fromEntries(results.map((r) => [r.name, r]));
  for (const r of results) assert.ok(r.ok, `${r.name}: expected ${r.expected}, got ${r.got} — ${r.findings.map((f) => f.detail).join(' | ')}`);
  assert.deepEqual(by['correct handoff'].findings, []);
  assert.ok(codes(by['wrong commit (later change to the scene plan)'].findings).includes('commit-drift'));
  assert.ok(codes(by['wrong commit (later change to the scene plan)'].findings).includes('canonical-stale'));
  assert.ok(codes(by['dirty working tree'].findings).includes('working-tree'));
  assert.ok(codes(by['missing asset'].findings).includes('asset-missing'));
  assert.ok(codes(by['asset hash/dimensions mismatch'].findings).includes('asset-hash'));
  assert.ok(codes(by['asset hash/dimensions mismatch'].findings).includes('asset-dimensions'));
  assert.ok(codes(by['rejected rights (forged ISSUED)'].findings).includes('rights'), 'gate is recomputed; a forged ISSUED status does not pass');
  assert.ok(codes(by['stale handoff (v1 after v2 issued)'].findings).includes('stale-handoff'));
  assert.ok(codes(by['legacy v1-format handoff'].findings).includes('legacy-handoff'));
  assert.deepEqual(codes(by['open creative change request'].findings), ['ccr-open']);
});

test('rights hard-fail: ledger satırı zorunlu, kredi hak değildir, REJECTED/çözülmemiş geçemez', () => {
  const ext = { asset_id: 'V-01', origin: 'external', rights_ref: 'V-01' };
  const clear = { asset_id: 'V-01', rights_status: 'CLEAR', license_basis: 'public-domain-usgov', commercial_use: 'yes', proof_location: 'proof/v01.png', manual_review_needed: 'no' };
  assert.equal(rightsVerdict(ext, clear).ok, true);
  assert.match(rightsVerdict(ext, undefined).why, /not in rights ledger/);
  assert.match(rightsVerdict(ext, { ...clear, rights_status: 'REJECTED' }).why, /REJECTED/);
  assert.match(rightsVerdict(ext, { ...clear, rights_status: 'UNKNOWN_RIGHTS' }).why, /unresolved/);
  assert.match(rightsVerdict(ext, { ...clear, license_basis: 'unknown', attribution_text: 'Photo: Someone' }).why, /attribution does not replace rights/, 'credit is not rights');
  assert.match(rightsVerdict(ext, { ...clear, manual_review_needed: 'yes' }).why, /manual/);
  assert.match(rightsVerdict(ext, { ...clear, proof_location: 'NEEDS VERIFICATION' }).why, /proof/);
  assert.match(rightsVerdict(ext, { ...clear, rights_status: 'CLEAR_WITH_ATTRIBUTION' }).why, /attribution text/);
  assert.equal(rightsVerdict({ asset_id: 'OG-01', origin: 'own', rights_ref: 'own' }).ok, true);
  const row = (o) => ({ asset_id: 'V-01', use: 'REQUIRED', role: 'BOTH', origin: 'external', readiness: 'READY', expected_path: 'a/V-01.png', sha256: 'a'.repeat(64), width: '10', height: '10', rights_ref: 'V-01', recoverability: 'REDOWNLOADABLE', provenance: 'https://x', ...o });
  const st = (rows, ledger = [clear]) => overall(validateManifest(rows, ledger));
  assert.equal(st([row()]), STATUS.READY);
  assert.equal(st([row({ readiness: 'NEEDS_RIGHTS' })]), STATUS.RIGHTS);
  assert.equal(st([row({ readiness: 'NEEDS_SOURCE' })]), STATUS.ASSET);
  assert.equal(st([row({ readiness: 'MISSING' })]), STATUS.ASSET);
  assert.equal(st([row()], []), STATUS.RIGHTS, 'external production asset missing from the ledger');
  assert.equal(st([row()], [{ ...clear, rights_status: 'REJECTED' }]), STATUS.RIGHTS);
  assert.equal(st([row({ sha256: 'prefix:abcd' })]), STATUS.ASSET, 'prefix hash is not a hash check');
  assert.equal(st([row({ use: 'QUARANTINED', readiness: '—' })], [{ ...clear, rights_status: 'REJECTED' }]), STATUS.READY, 'quarantined asset is recorded, not used');
  assert.equal(st([row({ origin: 'ai', rights_ref: 'V-01' })], [{ ...clear, license_basis: 'ai-generated-own' }]), STATUS.RIGHTS, 'AI asset without provenance/disclosure');
  assert.ok(validateManifest([row({ recoverability: 'LOCAL_ONLY' })], [clear]).some((f) => f.code === 'irreplaceable-unprotected' && f.level === 'warn'));
});

test('Stage 3 readiness korunur: planlamada NEEDS_SOURCE/NEEDS_RIGHTS serbest, handoff\'ta HARD STOP', () => {
  const plan = SCENE_PLAN.replace('V-01 public domain — READY', 'V-01 public domain, NEEDS_RIGHTS (proof capture pending)');
  assert.deepEqual(readinessErrors('V-01 public domain, NEEDS_RIGHTS (proof capture pending)'), []);
  assert.deepEqual(lintScenePlan(plan), [], 'creative planning accepts an unresolved-rights scene idea');
  const g = gateHandoff({ registry: [], scenePlan: { path: 'x/05-scene-plan-v1.md', text: plan }, qa: { path: 'q', text: '' }, manifestRows: [], ledgerRows: [] });
  assert.ok(g.some((f) => f.code === 'scene-plan-readiness' && f.status === STATUS.RIGHTS), 'handoff gate stops it');
});

test('legacy composition: reddedilmiş V-21 eski P3 kompozisyonu üzerinden geçemez', () => {
  const files = git('ls-files', 'production/remotion/src').split('\n').filter(Boolean).map((p) => ({ path: p, text: read(p) }));
  const manifestRows = parseManifest(read(`${CASE}handoff/asset-manifest.csv`));
  const ledgerRows = parseCsv(read(LEDGER));
  const viaLegacy = scanCode(files, { manifestRows, ledgerRows, allowed: ['production/remotion/src/videos/p3/'], forbidden: [] });
  assert.ok(viaLegacy.some((f) => f.status === STATUS.RIGHTS && f.level === 'block' && /Animatic\.tsx references V-21 \(REJECTED\)/.test(f.detail)));
  const viaImport = scanCode(files, { manifestRows, ledgerRows, allowed: ['production/remotion/src/Root.tsx'], forbidden: ['production/remotion/src/videos/p3/'] });
  assert.ok(viaImport.some((f) => f.code === 'legacy-import' && f.level === 'block'), 'importing the legacy composition is blocked');
  const fenced = scanCode(files, { manifestRows, ledgerRows, allowed: ['production/remotion/src/brand/', 'production/remotion/src/templates/'], forbidden: ['production/remotion/src/videos/p3/'] });
  assert.ok(fenced.some((f) => f.code === 'legacy-contamination' && /V-21/.test(f.detail)), 'contamination is reported even when fenced off');
});

test('P3 handoff dry-run: Stage 3 artifact\'larıyla BLOCKED (zorla READY yok), eski handoff v3 inherit edilmez', () => {
  const c = parseHandoff(read(HANDOFF));
  assert.ok(c, 'P3 handoff v2 contract exists');
  assert.equal(c.status, 'BLOCKED');
  assert.deepEqual(lintHandoff(read(HANDOFF), { canonShingles: canonShingles() }), []);
  assert.ok(c.not_inherited.includes('P3-HANDOFF-V3'));
  assert.equal(c.scene_plan.path, `${CASE}dry-run-v2/05-scene-plan-v2.md`);
  assert.equal(c.approvals.render, 'NOT_APPROVED');
  assert.ok(!c.allowed_actions.includes('render-review-copy'), 'no render in this stage');
  const reg = parseCsv(read('company/state/artifact-registry.csv'));
  assert.notEqual(reg.find((r) => r.path === HANDOFF)?.status, 'ACTIVE', 'a blocked handoff is never ACTIVE');
  assert.equal(reg.find((r) => r.artifact_id === 'P3-HANDOFF-V3').status, 'FROZEN');
  // Gate bugünkü repoda yeniden hesaplanır: hâlâ BLOCKED ve gerçek nedenlerle.
  const files = git('ls-files', 'production/remotion/src').split('\n').filter(Boolean).map((p) => ({ path: p, text: read(p) }));
  const g = gateHandoff({ registry: reg, scenePlan: { path: c.scene_plan.path, text: read(c.scene_plan.path) }, qa: { path: c.creative_qa.path, text: read(c.creative_qa.path) },
    manifestRows: parseManifest(read(c.asset_manifest.path)), ledgerRows: parseCsv(read(c.rights_ledger.path)), codeFiles: files,
    allowedCodePaths: c.allowed_code_paths, forbiddenCodePaths: c.forbidden_code_paths });
  assert.notEqual(overall(g), STATUS.READY);
  for (const code of ['scene-plan-not-approved', 'qa-not-pass', 'rights', 'no-hash']) assert.ok(codes(g).includes(code), `P3 blocker ${code}`);
  assert.ok(g.some((f) => /V-05: not in rights ledger/.test(f.detail)), 'DF-6 rights rows are still missing');
  const old = preflight({ env: makeEnv(ROOT), handoffPath: 'production/pilots/2026-10-n2-pilot-test/P3-production-handoff-prototype-v3.md' });
  assert.equal(old.status, STATUS.VERSION, '"Eski P3 handoff v3 hazır görünüyor" is rejected');
});

test('handoff ince kalır: doctrine kopyası, bilinmeyen içerik alanı ve Founder\'a sistem sorusu reddedilir', () => {
  const md = read(HANDOFF);
  const sh = canonShingles();
  const canonPara = read('channels/the-industrial-casebook/canon/04-visual-storytelling.md').split('\n').filter((l) => l.split(' ').length > 25).slice(0, 3).join('\n');
  assert.ok(lintHandoff(`${md}\n## Visual doctrine\n${canonPara}\n`, { canonShingles: sh }).some((e) => /copies canon/.test(e)), '"Handoff içine bütün doctrine\'i kopyalayalım" is rejected');
  const c = parseHandoff(md);
  const re = (patch) => lintHandoff(renderHandoff({ ...c, ...patch }));
  assert.ok(re({ doctrine: 'all rules here' }).some((e) => /unknown contract key "doctrine"/.test(e)));
  assert.ok(re({ founder_actions: [{ mode: 'FOUNDER_DECISION', category: 'taste', question: 'Which tool should we use for SP-07: After Effects or Blender?' }] }).some((e) => /system question/.test(e)), '"Founder hangi tool\'u kullanacağımıza karar versin" is rejected');
  assert.ok(re({ founder_actions: [{ mode: 'GUIDED_ACTION', step: 'Push the branch' }] }).some((e) => /GUIDED_ACTION needs command_or_prompt/.test(e)));
  assert.ok(re({ status: 'ISSUED' }).some((e) => /ISSUED with open blockers/.test(e)), 'cannot mark a blocked handoff READY');
  assert.ok(re({ forbidden_actions: c.forbidden_actions.filter((a) => a !== 'final-creative-pass') }).some((e) => /final-creative-pass/.test(e)));
  assert.ok(re({ allowed_actions: [...c.allowed_actions, 'render-review-copy'] }).some((e) => /approvals.render/.test(e)));
});

const CCR = (o = {}) => Object.entries({
  CCR: 'CCR-001', Handoff: 'VID-001-HO@v1', Scene: 'SP-07', Category: 'TECHNICAL_INFEASIBLE',
  Problem: 'The line-draw build cannot keep the component labels legible at review size.',
  'Why the current plan fails': 'Eleven labels on one frame overlap once the drawing reaches full scale.',
  'Proposed change': 'Split the build into two holds with the same components and the same order.',
  'Truth / evidence impact': 'none', 'Cost / time impact': 'none', 'Raised by': 'Strong PC (production-engineer)', Status: 'OPEN', 'Decision by': 'pending', ...o,
}).map(([k, v]) => `- **${k}:** ${v}`).join('\n');

test('CCR: Strong PC sessizce değiştiremez; karar Main PC creative authority\'de', () => {
  assert.deepEqual(lintCCR(CCR()), []);
  assert.ok(lintCCR(CCR({ 'Proposed change': 'I changed the story so the scene is easier to build.' })).some((e) => /must precede the change/.test(e)), '"Scene teknik olarak zor, ben hikâyeyi değiştirdim" is rejected');
  assert.ok(lintCCR(CCR({ Status: 'APPROVED', 'Decision by': 'Strong PC (production-engineer)' })).some((e) => /only Main PC/.test(e)));
  assert.deepEqual(lintCCR(CCR({ Status: 'APPROVED', 'Decision by': 'Main PC creative authority (COO)' })), []);
  assert.ok(lintCCR(CCR({ 'Truth / evidence impact': 'the cost figure changes' })).some((e) => /ledger rows/.test(e)));
  assert.ok(lintCCR(CCR({ Status: 'APPROVED', 'Decision by': 'Main PC creative authority (COO)', 'Cost / time impact': 'new VO credits ~400' })).some((e) => /Founder decision/.test(e)));
  assert.ok(lintCCR(CCR({ Category: 'I_DONT_LIKE_IT' })).some((e) => /Category/.test(e)));
});

const DELIVERY = (o = {}) => {
  const areas = { Version: 'PASS — preflight READY_FOR_PRODUCTION at commit abc', Assets: 'PASS — all required assets hash-verified', Rights: 'PASS — ledger rows clear for every external asset',
    'Render validity': 'PASS — ffprobe stream check clean', 'Missing files/frames': 'PASS — no missing frames in frame scan', Captions: 'PASS — SRT built from final VO timing',
    'Measurable audio': 'PASS — integrated loudness within target range', Resolution: 'PASS — 1920x1080 review copy', 'Technical delivery': 'PASS — files in 06_renders with report',
    Backup: 'PASS — produced assets copied and hash-verified', ...o.areas };
  return [`> handoff: VID-001-HO@v1 · producer: Strong PC (production-engineer)`, '', '## Technical QA', ...Object.entries(areas).map(([k, v]) => `- **${k}:** ${v}`),
    `- **Technical verdict:** ${o.verdict || 'PASS'}`, `- **Creative QA:** ${o.creative || 'PENDING_INDEPENDENT'}`, '', '## Scenes',
    ...(o.scenes || ['- **SP-01:** AS_PLANNED', '- **SP-02:** MICRO — framing adjusted to keep the sentence inside safe area']), '', '## Assets used', ...(o.assets || ['- V-05', '- OG-02']), '',
    '## Tool changes', ...(o.tools || ['- none']), ...(o.extra || [])].join('\n');
};

test('teslim raporu: Strong PC teknik QA yapar, final creative PASS veremez, asset/hikâye değiştiremez', () => {
  const manifestRows = parseManifest(read(`${CASE}handoff/asset-manifest.csv`));
  const lint = (o) => lintDeliveryReport(DELIVERY(o), { manifestRows });
  assert.deepEqual(lint(), []);
  assert.ok(lint({ creative: 'PASS' }).some((e) => /PENDING_INDEPENDENT/.test(e)), '"Strong PC kendi videosuna creative PASS verdi" is rejected');
  assert.ok(lint({ extra: ['', 'Overall: final creative PASS — looks great.'] }).some((e) => /claims a creative verdict/.test(e)));
  assert.ok(lint({ assets: ['- V-05', '- V-99'] }).some((e) => /not in manifest/.test(e)), '"Asset yok, ben başka bir fotoğraf seçtim" is rejected');
  assert.ok(lint({ assets: ['- V-21'] }).some((e) => /outside handoff scope/.test(e)));
  assert.ok(lint({ scenes: ['- **SP-01:** REPLACED — used another photo because V-05 was missing'] }).some((e) => /no approved CCR/.test(e)));
  assert.ok(lint({ scenes: ['- **SP-01:** MICRO — timing changed so the story lands differently'] }).some((e) => /no approved CCR/.test(e)));
  assert.deepEqual(lint({ scenes: ['- **SP-07:** CCR-001 APPROVED — split build per decision'] }), []);
  assert.ok(lint({ tools: ['- SP-07: After Effects → Blender · reason: looks richer · intent: preserved'] }).some((e) => /scene need or accuracy/.test(e)), 'more expensive is not automatically better');
  assert.ok(lint({ tools: ['- SP-05: After Effects → static image · reason: faster · intent: reduced'] }).some((e) => /reduces the scene intent/.test(e)), 'cannot lower the creative purpose to make production easier');
  assert.ok(lint({ areas: { Captions: 'FAIL — SRT missing for SP-09' } }).some((e) => /PASS with a FAIL area/.test(e)));
});

test('yedek/kurtarılabilirlik: yalnız bu PC\'de olan ve kaybolursa geri gelmeyecek dosya bulunur', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cos-backup-'));
  try {
    const prod = join(dir, 'prod'), bk = join(dir, 'bk');
    const put = (root, rel, buf) => { mkdirSync(join(root, rel, '..'), { recursive: true }); writeFileSync(join(root, rel), buf); };
    put(prod, '01_archive/V-01.png', png(4, 4));
    put(prod, '03_vo/vo-take.wav', wav(0.5));
    put(prod, '02_graphics/OG-01.png', png(8, 8));
    put(prod, '05_premiere/project.prproj', Buffer.from('project'));
    put(bk, '03_vo/vo-take.wav', wav(0.5));
    put(bk, '05_premiere/project.prproj', Buffer.from('project-OLD'));
    const manifestRows = [{ asset_id: 'V-01', expected_path: '01_archive/V-01.png', recoverability: 'REDOWNLOADABLE', sha256: hashFile(join(prod, '01_archive/V-01.png')), provenance: 'https://example.org/v01' }];
    const r = backupStatus({ productionRoot: prod, backupRoots: [bk], manifestRows });
    assert.deepEqual(r.REDOWNLOADABLE, ['01_archive/V-01.png']);
    assert.deepEqual(r.PROTECTED, ['03_vo/vo-take.wav']);
    assert.deepEqual(r.UNPROTECTED.sort(), ['02_graphics/OG-01.png', '05_premiere/project.prproj'], 'a stale backup copy (different hash) is not protection');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('medya ölçümü paketsiz: PNG/JPEG boyutu, WAV/MP4 süresi', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cos-media-'));
  try {
    writeFileSync(join(dir, 'a.png'), png(37, 21));
    writeFileSync(join(dir, 'a.wav'), wav(1.25));
    const mvhd = Buffer.alloc(8 + 100); mvhd.writeUInt32BE(108, 0); mvhd.write('mvhd', 4); mvhd.writeUInt32BE(1000, 8 + 12); mvhd.writeUInt32BE(4500, 8 + 16);
    const moov = Buffer.concat([Buffer.from([0, 0, 0, 8 + mvhd.length]), Buffer.from('moov'), mvhd]);
    writeFileSync(join(dir, 'a.mp4'), Buffer.concat([Buffer.from([0, 0, 0, 8]), Buffer.from('ftyp'), moov]));
    const jpg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 4, 0, 0, 0xff, 0xc0, 0, 11, 8, 0, 90, 1, 64, 3, 1, 0x22, 0, 0xff, 0xd9]);
    writeFileSync(join(dir, 'a.jpg'), jpg);
    assert.deepEqual(mediaInfo(join(dir, 'a.png')), { width: 37, height: 21 });
    assert.deepEqual(mediaInfo(join(dir, 'a.jpg')), { width: 320, height: 90 });
    assert.equal(mediaInfo(join(dir, 'a.wav')).duration, 1.25);
    assert.equal(mediaInfo(join(dir, 'a.mp4')).duration, 4.5);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('acceptance: Founder\'ın 8 kötü davranışı Stage 4 belgesinde REJECT; CLI\'da atlama/zorlama seçeneği yok', () => {
  const doc = read('os/factory/README.md');
  for (const bad of ['Commit biraz farklı ama devam edelim.', 'Rights sonra çözülür.', 'Asset yok, ben başka bir fotoğraf seçtim.', 'Eski P3 handoff v3 hazır görünüyor, onu kullanalım.',
    'Scene teknik olarak zor, ben hikâyeyi değiştirdim.', 'Strong PC kendi videosuna creative PASS verdi.', 'Handoff içine bütün doctrine\'i kopyalayalım.', 'Founder hangi tool\'u kullanacağımıza karar versin.']) {
    const line = doc.split('\n').find((l) => l.includes(bad));
    assert.ok(line && /\| REJECT \|/.test(line), `missing REJECT row: ${bad}`);
  }
  const cli = read('os/factory/factory.mjs');
  assert.ok(!/--(force|skip|ignore|override|allow-mismatch)|production-root-override/.test(cli), 'no bypass flags on the boot contract');
  const skill = read('.claude/skills/documentary-production-handoff/SKILL.md');
  assert.match(skill, /Production Scene Plan/);
  const inputRows = skill.split('## 1. Girdi')[1].split('## 2.')[0].split('\n').filter((l) => l.startsWith('|'));
  for (const old of ['visual-plan', 'edit-plan', 'source-to-visual', 'visual-storytelling']) assert.ok(!inputRows.some((l) => l.includes(old)), `handoff v2 must not take ${old} as input`);
  assert.match(skill, /SUPERSEDED, D-046\) girdi değildir/);
  assert.match(read('.claude/skills/strong-pc-preflight/SKILL.md'), /final creative PASS/);
  assert.match(read('.claude/agents/production-engineer.md'), /strong-pc-preflight/);
});

// ---------------------------------------------------------------- Gate 1D-B / Stage 4 Factory job-branch preflight entegrasyonu
const MAIN_PC = 'WIN-028TMNOG5MJ';
const STRONG_PC = STRONG_PC_MACHINE;
const REG_HEAD = 'artifact_id,path,scope,type,version,status,superseded_by,decision_ref,note';
const FX_CANON = `# Fixture canon\nThe viewer should always understand why a scene exists before the scene asks for more attention from them.\nDocuments are evidence anchors; the presentation visual is a separate decision made for the viewer's understanding.`;
const BASE_REG_ROWS = [
  'FX-CANON,channels/fx/canon/README.md,channel:fx,canon-readme,1,ACTIVE,,D-000,',
  `FX-SP-V1,${PATHS.scenePlan},case:VID-T,scene-plan,1,ACTIVE,,D-000,`,
  `FX-QA-V1,${PATHS.qa},case:VID-T,creative-qa,1,ACTIVE,,D-000,`,
  `FX-MANIFEST,${PATHS.manifest},case:VID-T,production-asset-manifest,1,ACTIVE,,D-000,`,
  `FX-RIGHTS,${PATHS.rights},case:VID-T,rights-ledger,1,ACTIVE,,D-000,`,
  `FX-EVIDENCE,${PATHS.evidence},case:VID-T,evidence-ledger,1,ACTIVE,,D-000,`,
];

const gitCleanEnv = () => {
  const e = { ...process.env, GIT_TERMINAL_PROMPT: '0', LC_ALL: 'C' };
  for (const k of Object.keys(e)) if (/^GIT_(DIR|WORK_TREE|INDEX_FILE|CONFIG.*)$/i.test(k)) delete e[k];
  return e;
};
const runGit = (cwd, ...args) => execFileSync(findGit(), args, { cwd, env: gitCleanEnv(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

const makeJobPolicy = (url, extra = {}) => Object.freeze({
  ...PRODUCTION_SYNC_POLICY,
  policy_id: 'TEST-ONLY:factory-job-branch',
  remote: Object.freeze({ name: 'origin', url }),
  ...extra,
});

// Gerçek yerel bare origin + Main PC (os-v2-migration) + Strong PC (job/<JOB-ID>) kurulumu; ağ erişimi yoktur.
function withJobFixture(fn, opts = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'cos-factory-job-'));
  const bare = join(dir, 'origin.git').replace(/\\/g, '/');
  const mainRepo = join(dir, 'main');
  const strongRepo = join(dir, 'strong');
  const prod = join(dir, 'prod');
  let clock = Date.UTC(2026, 9, 17, 10, 0, 0);
  const now = () => new Date((clock += 1000)).toISOString();
  const jobId = opts.jobId || 'JOB-CAL-S5';
  const jobBranch = opts.jobBranch || `job/${jobId}`;
  const jobScope = opts.jobScope || 'case:VID-T';
  try {
    mkdirSync(mainRepo, { recursive: true });
    mkdirSync(join(prod, '01_archive'), { recursive: true });
    writeFileSync(join(prod, '01_archive/V-01_page.png'), png(64, 48));
    writeFileSync(join(prod, '01_archive/V-09_old.jpg'), Buffer.from('rejected photo bytes'));
    const sha = hashFile(join(prod, '01_archive/V-01_page.png'));

    const reg = [...BASE_REG_ROWS];
    const writeMain = (rel, content) => { const p = join(mainRepo, rel); mkdirSync(join(p, '..'), { recursive: true }); writeFileSync(p, content); };
    const writeReg = (repo = mainRepo) => { const p = join(repo, 'company/state/artifact-registry.csv'); mkdirSync(join(p, '..'), { recursive: true }); writeFileSync(p, [REG_HEAD, ...reg].join('\n') + '\n'); };

    writeMain('os/VERSION', 'fx-1\n');
    writeMain('company/charter.md', '# Charter (fixture)\n');
    writeMain('.claude/rules/governance.md', '# Governance (fixture)\n');
    writeMain('channels/fx/canon/README.md', FX_CANON);
    writeMain('company/state/current-state.md', '# Current State (fixture)\n');
    writeMain(PATHS.scenePlan, SCENE_PLAN);
    writeMain(PATHS.qa, QA_PASS);
    writeMain(PATHS.manifest, fxManifest(sha));
    writeMain(PATHS.rights, fxLedger('CLEAR'));
    writeMain(PATHS.evidence, '# Evidence ledger (fixture)\n| C-01 | cost line | V-01 |\n');
    writeMain('production/remotion/src/videos/vid-t/Scene.tsx', "export const src = 'V-01_page.png'; // V-01\n");
    writeMain('production/remotion/src/videos/legacy/Old.tsx', "export const old = 'photos/V-09_old.jpg'; // legacy\n");
    writeReg();

    const rt = runtimeContext({ dir: join(mainRepo, 'company', 'state', 'runtime'), machine: MAIN_PC, now });
    initRuntime(rt, { actor_role: 'coo' });

    runGit(dir, 'init', '--bare', '-q', '-b', CANONICAL_CONTROL_BRANCH, bare);
    runGit(mainRepo, 'init', '-q', '-b', CANONICAL_CONTROL_BRANCH);
    for (const [k, v] of [['user.name', 'main-pc'], ['user.email', 'main@example.invalid'], ['core.autocrlf', 'false']]) runGit(mainRepo, 'config', k, v);
    runGit(mainRepo, 'remote', 'add', 'origin', bare);
    runGit(mainRepo, 'add', '-A');
    runGit(mainRepo, 'commit', '-q', '-m', 'fixture: base');

    const policy = makeJobPolicy(bare, opts.policyExtra || {});
    const issue = (version = 1) => {
      const { contract, md } = issueHandoff(makeEnv(mainRepo, { policy, machine: MAIN_PC }), {
        id: 'VID-T-HO', version, case: 'VID-T', channel: 'fx', scenePlanPath: PATHS.scenePlan, qaPath: PATHS.qa, manifestPath: PATHS.manifest,
        rightsPath: PATHS.rights, evidencePath: PATHS.evidence, productionRoot: prod.replace(/\\/g, '/'),
        allowedCode: ['production/remotion/src/videos/vid-t/'], forbiddenCode: ['production/remotion/src/videos/legacy/'],
        supersedes: version > 1 ? `VID-T-HO@v${version - 1}` : null,
      });
      writeMain(PATHS.handoff(version), md);
      for (let i = 0; i < reg.length; i++) {
        if (reg[i].startsWith('FX-HO-') && /,ACTIVE,/.test(reg[i])) reg[i] = reg[i].replace(',ACTIVE,,', `,SUPERSEDED,FX-HO-V${version},`);
      }
      reg.push(`FX-HO-V${version},${PATHS.handoff(version)},case:VID-T,production-handoff,${version},${contract.status === 'ISSUED' ? 'ACTIVE' : 'DRAFT'},,D-000,`);
      writeReg();
      runGit(mainRepo, 'add', '-A');
      runGit(mainRepo, 'commit', '-q', '-m', `fixture: issue handoff v${version}`);
      return contract;
    };

    const createControlJob = () => {
      createJob(rt, {
        job_id: jobId, type: 'production', scope: jobScope, owner_role: 'production-engineer',
        owner_machine: opts.initialOwner || MAIN_PC, branch: jobBranch, canonical_inputs: [PATHS.handoff(1)], expected_outputs: [],
      }, { actor_role: 'coo' });
      transitionJob(rt, jobId, 'READY', { actor_role: 'coo', reason: 'ready for Strong PC' });
      runGit(mainRepo, 'add', '-A');
      runGit(mainRepo, 'commit', '-q', '-m', `runtime: create ${jobId}`);
    };

    // Sıra seçeneği: handoff-then-job (gerçek CAL-S5 akışı: handoff required_commit'te yayınlanır, ardından kontrol dalında iş açılır ve atanır)
    // veya job-then-handoff (iş önce açılır, sonra handoff yayınlanır ve atanır).
    let handoff;
    let handoffCommit;
    if (opts.order === 'job-then-handoff') {
      createControlJob();
      handoff = issue(1);
      handoffCommit = runGit(mainRepo, 'rev-parse', 'HEAD');
    } else {
      handoff = issue(1);
      handoffCommit = runGit(mainRepo, 'rev-parse', 'HEAD');
      createControlJob();
    }
    runGit(mainRepo, 'push', '-q', 'origin', CANONICAL_CONTROL_BRANCH);
    const publicationBase = runGit(mainRepo, 'rev-parse', 'HEAD');

    if (opts.assign !== false) {
      const assignRes = recordAssignment(syncContext({ repoDir: mainRepo, policy, machine: MAIN_PC, now }), {
        job_id: jobId, to_machine: opts.assignTo || STRONG_PC, actor_role: 'coo', reason: 'assign job to Strong PC',
      });
      assert.equal(assignRes.base_commit, publicationBase);
      runGit(mainRepo, 'add', '-A');
      runGit(mainRepo, 'commit', '-q', '-m', `runtime: assign ${jobId}`);
      if (opts.pushAssignment !== false) {
        runGit(mainRepo, 'push', '-q', 'origin', CANONICAL_CONTROL_BRANCH);
      }
    }

    runGit(dir, 'clone', '-q', '--config', 'core.autocrlf=false', bare, strongRepo);
    for (const [k, v] of [['user.name', 'strong-pc'], ['user.email', 'strong@example.invalid'], ['core.autocrlf', 'false']]) runGit(strongRepo, 'config', k, v);

    if (opts.startViaSafeSync !== false && opts.assign !== false && opts.pushAssignment !== false && (opts.assignTo || STRONG_PC) === STRONG_PC && jobBranch === `job/${jobId}`) {
      const startRes = startJobBranch(syncContext({ repoDir: strongRepo, policy, machine: STRONG_PC, now }), { job_id: jobId });
      assert.equal(startRes.result, 'JOB_BRANCH_STARTED', startRes.message);
    } else if (opts.checkoutBranch !== null) {
      runGit(strongRepo, 'checkout', '-q', '-b', opts.checkoutBranch || `job/${jobId}`, publicationBase);
    }

    const onMainControl = (cb, msg = 'control update', push = true) => {
      cb(rt);
      runGit(mainRepo, 'add', '-A');
      runGit(mainRepo, 'commit', '-q', '-m', msg);
      if (push) runGit(mainRepo, 'push', '-q', 'origin', CANONICAL_CONTROL_BRANCH);
      return runGit(mainRepo, 'rev-parse', 'HEAD');
    };
    const commitStrong = (rel, content, msg = `strong: ${rel}`) => {
      const p = join(strongRepo, rel);
      mkdirSync(join(p, '..'), { recursive: true });
      writeFileSync(p, content);
      runGit(strongRepo, 'add', '-A');
      runGit(strongRepo, 'commit', '-q', '-m', msg);
      return runGit(strongRepo, 'rev-parse', 'HEAD');
    };
    const runPreflight = (over = {}) => preflight({
      env: makeEnv(over.repoDir || strongRepo, { policy: over.policy || policy, machine: over.machine || STRONG_PC }),
      handoffPath: over.handoffPath || PATHS.handoff(over.version || 1),
      expect: over.expect !== undefined ? over.expect : { id: 'VID-T-HO', version: over.version || 1 },
    });

    return fn({ dir, bare, mainRepo, strongRepo, prod, rt, now, policy, handoff, handoffCommit, publicationBase, jobId, issue, onMainControl, commitStrong, runPreflight });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('Gate 1D-B / Stage 4: geçerli job/<JOB-ID> dalında (handoff→job→assign ve job→handoff→assign sıralarıyla) ve kontrol dalında preflight READY_FOR_PRODUCTION', () => {
  // 1) Gerçek CAL-S5 sırası: handoff required_commit'te yayınlanır, ardından os-v2-migration'da iş oluşturulur (runtime ilerler) ve JOB_ASSIGNED ile Strong PC'ye atanır.
  withJobFixture((f) => {
    assert.notEqual(f.handoff.repo.required_commit, f.publicationBase, 'control branch advanced with runtime commits between required_commit and publication_base');
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.READY, r.findings.map((x) => `${x.code}: ${x.detail}`).join(' | '));
    assert.deepEqual(codes(r.findings), []);
    assert.equal(r.observed.job.job_id, 'JOB-CAL-S5');
    assert.equal(r.observed.job.owner_machine, STRONG_PC);
    assert.equal(r.observed.job.publication_base, f.publicationBase);
  }, { order: 'handoff-then-job' });

  // 2) Ters sıra: iş önce oluşturulur, sonra handoff yayınlanır (required_commit → publication_base arasında yalnız handoff/registry commit'i vardır), ardından JOB_ASSIGNED ile atanır.
  withJobFixture((f) => {
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.READY, r.findings.map((x) => `${x.code}: ${x.detail}`).join(' | '));
    assert.deepEqual(codes(r.findings), []);
    // Kontrol dalında (Main PC) olağan preflight davranışı da korunur: publicationBase commit'inde kontrol dalı READY döner.
    runGit(f.mainRepo, 'checkout', '-q', '-B', CANONICAL_CONTROL_BRANCH, f.publicationBase);
    const atBase = f.runPreflight({ repoDir: f.mainRepo, machine: MAIN_PC });
    assert.equal(atBase.status, STATUS.READY);
  }, { order: 'job-then-handoff' });
});

test('Gate 1D-B / Stage 4 REJECT (1): kanonik atama yok (atanmamış iş, push edilmemiş atama, uzakta olmayan iş)', () => {
  // JOB_ASSIGNED hiç yazılmamış (publication_base = null, owner_machine = MAIN_PC)
  withJobFixture((f) => {
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('job-binding:JOB_OWNER_MISMATCH') || codes(r.findings).includes('publication-base'));
  }, { assign: false });

  // JOB_ASSIGNED Main PC'de commit edildi ama origin/os-v2-migration'a push edilmedi (yerel/push edilmemiş atama yetki değildir)
  withJobFixture((f) => {
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('job-binding:JOB_OWNER_MISMATCH') || codes(r.findings).includes('publication-base'));
  }, { pushAssignment: false });

  // Uzak kontrol dalında hiç var olmayan bir job/<ID> dalı
  withJobFixture((f) => {
    runGit(f.strongRepo, 'checkout', '-q', '-b', 'job/JOB-GHOST', f.publicationBase);
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('job-binding:JOB_NOT_FOUND'));
  });
});

test('Gate 1D-B / Stage 4 REJECT (2): yanlış makine kimliği veya yanlış job.owner_machine', () => {
  // İş Strong PC'ye atanmış ama preflight Main PC veya kayıtsız bir makine kimliğiyle çalıştırılıyor
  withJobFixture((f) => {
    for (const badMachine of [MAIN_PC, 'OTHER-PC', 'UNREGISTERED-PC']) {
      const r = f.runPreflight({ machine: badMachine });
      assert.equal(r.status, STATUS.VERSION, `rejected for machine=${badMachine}`);
      assert.ok(codes(r.findings).includes('job-owner'), `job-owner code present for ${badMachine}`);
    }
  });

  // İş uzak kontrol dalında Main PC'ye yeniden atanmış (owner_machine !== DESKTOP-KVLH9B2)
  withJobFixture((f) => {
    f.onMainControl((rt) => assignJob(rt, f.jobId, { actor_role: 'coo', to_machine: MAIN_PC, base_commit: f.publicationBase, reason: 'reassign back to Main PC' }));
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('job-binding:JOB_OWNER_MISMATCH') || codes(r.findings).includes('job-owner'));
  });
});

test('Gate 1D-B / Stage 4 REJECT (3): yanlış iş kapsamı (scope), dal uyuşmazlığı veya kanonik olmayan kontrol dalı', () => {
  // İş kapsamı başka bir vakaya veya genel company'ye ait (case:VID-T değil)
  for (const wrongScope of ['company', 'case:OTHER-CASE']) {
    withJobFixture((f) => {
      const r = f.runPreflight();
      assert.equal(r.status, STATUS.VERSION, `rejected for scope=${wrongScope}`);
      assert.ok(codes(r.findings).includes('job-scope'), `job-scope code present for ${wrongScope}`);
    }, { jobScope: wrongScope });
  }

  // İşin kayıtlı branch alanı yerel job/<ID> dalıyla uyuşmuyor
  withJobFixture((f) => {
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('job-binding:JOB_BRANCH_MISMATCH'));
  }, { jobBranch: 'job/JOB-OTHER', startViaSafeSync: false, checkoutBranch: 'job/JOB-CAL-S5' });

  // Politikadaki control_branch kanonik os-v2-migration değil
  withJobFixture((f) => {
    const nonCanonical = makeJobPolicy(f.bare, { control_branch: 'main' });
    const r = f.runPreflight({ policy: nonCanonical });
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('control-branch'));
  });
});

test('Gate 1D-B / Stage 4 REJECT (4) & (5): COMPLETE iş veya PAUSED şirket (yerel job dalı eski/sağlıklı görünse bile uzak kontrol dalı otoritedir)', () => {
  // 4) Uzak kontrol dalında iş COMPLETE durumuna geçmiş
  withJobFixture((f) => {
    f.onMainControl((rt) => {
      transitionJob(rt, f.jobId, 'IN_PROGRESS', { actor_role: 'coo', reason: 'started' });
      transitionJob(rt, f.jobId, 'COMPLETE', { actor_role: 'coo', reason: 'finished' });
    });
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('job-binding:JOB_COMPLETE'));
  });

  // 5) Uzak kontrol dalında şirket PAUSED moduna alınmış
  withJobFixture((f) => {
    f.onMainControl((rt) => pauseCompany(rt, { actor_role: 'coo', reason: 'emergency stop' }));
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('job-binding:COMPANY_PAUSED'));
  });
});

test('Gate 1D-B / Stage 4 REJECT (6): değiştirilmiş veya geçersiz uzak olay günlüğü (hash zinciri kırık, yeniden hash\'lenmiş semantik hata, eksik log)', () => {
  // 6a) Uzak events.jsonl içinde tahrifat (hash zinciri kırılır)
  withJobFixture((f) => {
    const logPath = join(f.mainRepo, 'company/state/runtime/events.jsonl');
    const raw = readFileSync(logPath, 'utf8');
    writeFileSync(logPath, raw.replace('"reason":"ready for Strong PC"', '"reason":"forged reason"'));
    runGit(f.mainRepo, 'add', '-A');
    runGit(f.mainRepo, 'commit', '-q', '-m', 'tamper remote event log');
    runGit(f.mainRepo, 'push', '-q', 'origin', CANONICAL_CONTROL_BRANCH);
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('remote-runtime:REMOTE_RUNTIME_BROKEN'));
  });

  // 6b) Uzak events.jsonl geçerli hash zinciriyle (buildEvent ile gerçek Company OS olay şemasında) oluşturulmuş fakat anlamsal replay hatası içeriyor (var olmayan işe geçiş)
  withJobFixture((f) => {
    const logPath = join(f.mainRepo, 'company/state/runtime/events.jsonl');
    const before = parseEventLog(readFileSync(logPath, 'utf8'));
    assert.equal(before.ok, true);
    const badEvent = buildEvent(f.rt, before.head, 'coo', {
      type: 'JOB_STATE_CHANGED',
      job_id: 'JOB-DOES-NOT-EXIST',
      details: { from: 'READY', to: 'IN_PROGRESS', reason: 'semantic replay failure test', blockers: [], next_owner: null },
    });
    const forgedRaw = [...before.events, badEvent].map((e) => canon(e)).join('\n') + '\n';
    // 1. parseEventLog() yapısal ve hash zinciri olarak geçerli kabul eder:
    const parsed = parseEventLog(forgedRaw);
    assert.equal(parsed.ok, true, `parseEventLog errors: ${parsed.errors.join('; ')}`);
    assert.deepEqual(parsed.errors, []);
    // 2. replay() olayı anlamsal olarak reddeder:
    const replayed = replay(parsed.events);
    assert.ok(replayed.errors.length > 0, 'replay must reject the semantically invalid event');
    assert.match(replayed.errors[0], /JOB_NOT_FOUND/);
    // 3. Factory preflight uzak runtime'ı beklenen engelleyici bulguyla reddeder:
    writeFileSync(logPath, forgedRaw);
    runGit(f.mainRepo, 'add', '-A');
    runGit(f.mainRepo, 'commit', '-q', '-m', 'valid hash chain but invalid semantic replay');
    runGit(f.mainRepo, 'push', '-q', 'origin', CANONICAL_CONTROL_BRANCH);
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('remote-runtime:REMOTE_RUNTIME_BROKEN'));
  });
});

test('Gate 1D-B / Stage 4 REJECT (7): geçersiz publication_base veya soy ağacı (required_commit öncesi taban, yerel HEAD publication_base soyundan değil, uzakta olmayan taban)', () => {
  // 7a) publication_base handoff'un required_commit'inden ÖNCEKİ bir commit'e işaret ediyor
  withJobFixture((f) => {
    const rootCommit = f.handoff.repo.root_commit;
    assert.notEqual(rootCommit, f.handoff.repo.required_commit);
    f.onMainControl((rt) => assignJob(rt, f.jobId, { actor_role: 'coo', to_machine: STRONG_PC, base_commit: rootCommit, reason: 'stale base before handoff' }));
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('publication-base'));
  }, { assign: false, order: 'job-then-handoff' });

  // 7b) Yerel HEAD, kayıtlı publication_base'in soyundan gelmiyor (yerel job dalı handoffCommit'te, yani publicationBase öncesinde kaldı)
  withJobFixture((f) => {
    assert.notEqual(f.handoffCommit, f.publicationBase);
    runGit(f.strongRepo, 'checkout', '-q', '-B', `job/${f.jobId}`, f.handoffCommit);
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('publication-base'));
  }, { order: 'handoff-then-job' });

  // 7c) Kayıtlı publication_base uzak kontrol dalı geçmişinde yer almıyor (yalnız yan dalda bulunan bir commit)
  withJobFixture((f) => {
    const sideSha = f.commitStrong('channels/fx/cases/VID-T/ccr/CCR-001.md', CCR({ Handoff: 'VID-T-HO@v1', Scene: 'SP-01', Status: 'APPROVED', 'Decision by': 'Main PC creative authority (COO)' }) + '\n');
    f.onMainControl((rt) => assignJob(rt, f.jobId, { actor_role: 'coo', to_machine: STRONG_PC, base_commit: sideSha, reason: 'non-control base' }));
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('publication-base'));
  }, { assign: false });
});

test('Gate 1D-B / Stage 4 REJECT (8): job dalında yetkisiz runtime değişiklikleri (geçerli hash zincirli yerel olay + projeksiyon veya eklenip geri alınan runtime dosyası)', () => {
  // 8a) Job dalında geçerli hash zinciri ve deterministik projeksiyonlarla bile olsa runtime değişikliği kesinlikle yasaktır
  withJobFixture((f) => {
    const localRt = runtimeContext({ dir: join(f.strongRepo, 'company', 'state', 'runtime'), machine: STRONG_PC, now: f.now });
    transitionJob(localRt, f.jobId, 'IN_PROGRESS', { actor_role: 'production-engineer', reason: 'local self-transition on job branch' });
    runGit(f.strongRepo, 'add', '-A');
    runGit(f.strongRepo, 'commit', '-q', '-m', 'unauthorized runtime commit on job branch');
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('job-runtime-drift'));
    assert.ok(codes(r.findings).includes('commit-drift'));
  });

  // 8b) Job dalında company/state/runtime/ altında bir dosya eklenip sonraki commit'te silinse (net ağaç farkı sıfır olsa) bile rangeChanged yakalar
  withJobFixture((f) => {
    f.commitStrong('company/state/runtime/forged.json', '{"forged":true}\n', 'add runtime file');
    runGit(f.strongRepo, 'rm', '-q', 'company/state/runtime/forged.json');
    runGit(f.strongRepo, 'commit', '-q', '-m', 'revert runtime file');
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('job-runtime-drift'));
  });
});

test('Gate 1D-B / Stage 4 REJECT (9): eski handoff (v1 sonrası v2 yayınlanmış) veya kanonik blob kayması (canon / scene plan)', () => {
  // 9a) Stale handoff: v2 yayınlandıktan sonra job dalında v1 ile preflight çalıştırılması reddedilir
  withJobFixture((f) => {
    f.issue(2);
    runGit(f.mainRepo, 'push', '-q', 'origin', CANONICAL_CONTROL_BRANCH);
    const newBase = runGit(f.mainRepo, 'rev-parse', 'HEAD');
    f.onMainControl((rt) => assignJob(rt, f.jobId, { actor_role: 'coo', to_machine: STRONG_PC, base_commit: newBase, reason: 'assign at v2 base' }));
    runGit(f.strongRepo, 'fetch', '-q', 'origin', CANONICAL_CONTROL_BRANCH);
    runGit(f.strongRepo, 'checkout', '-q', '-B', `job/${f.jobId}`, newBase);
    const rStale = f.runPreflight({ version: 1 });
    assert.equal(rStale.status, STATUS.VERSION);
    assert.ok(codes(rStale.findings).includes('stale-handoff'));
    // Aynı dalda aktif v2 handoff ise geçer:
    const rActive = f.runPreflight({ version: 2 });
    assert.equal(rActive.status, STATUS.READY);
  }, { assign: false });

  // 9b) Kanonik blob kayması: canon dosyası değişmişse hem commit-drift hem canonical-stale ile reddedilir
  withJobFixture((f) => {
    f.commitStrong('channels/fx/canon/README.md', FX_CANON + '\n<!-- drift -->\n');
    const r = f.runPreflight();
    assert.equal(r.status, STATUS.VERSION);
    assert.ok(codes(r.findings).includes('commit-drift'));
    assert.ok(codes(r.findings).includes('canonical-stale'));
  });
});

test('Gate 1D-B / Stage 4 REJECT (10): os/, governance, rights-ledger.csv veya 05-scene-plan-v1.md üzerinde yetkisiz değişiklikler', () => {
  withJobFixture((f) => {
    for (const [rel, content, extraCode] of [
      ['os/VERSION', 'fx-1\n<!-- touch -->\n', 'os-version'],
      ['company/charter.md', '# Charter modified on job branch\n', null],
      ['.claude/rules/governance.md', '# Governance modified on job branch\n', null],
      [PATHS.rights, fxLedger('CLEAR') + '# comment\n', 'canonical-stale'],
      [PATHS.scenePlan, SCENE_PLAN + '\n<!-- scene plan edit -->\n', 'canonical-stale'],
    ]) {
      runGit(f.strongRepo, 'checkout', '-q', '-B', `job/${f.jobId}`, f.publicationBase);
      f.commitStrong(rel, content);
      const r = f.runPreflight();
      assert.equal(r.status, STATUS.VERSION, `rejected unauthorized change to ${rel}`);
      assert.ok(codes(r.findings).includes('commit-drift'), `commit-drift reported for ${rel}`);
      if (extraCode) assert.ok(codes(r.findings).includes(extraCode), `${extraCode} reported for ${rel}`);
    }
  });
});

test('Gate 1D-B / Stage 4 REJECT (11): geçmiş incelemesi (rangeChanged / diff / rev-list / diff-tree) kullanılamazsa veya başarısız olursa fail-closed reddedilir', () => {
  withJobFixture((f) => {
    const baseEnv = makeEnv(f.strongRepo, { policy: f.policy, machine: STRONG_PC });
    // 1) env.rangeChanged mevcut değilse env.changed'e geri düşülmez (no fallback):
    const rNoRange = preflight({
      env: { ...baseEnv, rangeChanged: undefined },
      handoffPath: PATHS.handoff(1),
      expect: { id: 'VID-T-HO', version: 1 },
    });
    assert.equal(rNoRange.status, STATUS.VERSION);
    assert.ok(codes(rNoRange.findings).includes('history-inspection-failed'));

    // 2) env.rangeChanged null döndürürse veya hata fırlatırsa fail-closed reddedilir:
    for (const badRangeChanged of [() => null, () => { throw new Error('git rev-list failed'); }]) {
      const rFail = preflight({
        env: { ...baseEnv, rangeChanged: badRangeChanged },
        handoffPath: PATHS.handoff(1),
        expect: { id: 'VID-T-HO', version: 1 },
      });
      assert.equal(rFail.status, STATUS.VERSION);
      assert.ok(codes(rFail.findings).includes('history-inspection-failed'));
    }

    // 3) makeEnv().rangeChanged içinde diff / rev-list / diff-tree gerçek bir Git hatasıyla karşılaştığında boş dizi yerine null döner
    // ve ara commit'in ağaç nesnesi eksik/bozuk olduğunda (uç ağaçlar aynı olsa bile) preflight READY_FOR_PRODUCTION üretemez:
    assert.equal(baseEnv.rangeChanged('invalid-revision-000', f.publicationBase), null, 'failed git diff/rev-list must return null, never []');
    const midCommit = f.commitStrong('company/state/runtime/forged.json', '{"forged":true}\n', 'intermediate runtime edit');
    const midTree = runGit(f.strongRepo, 'rev-parse', `${midCommit}^{tree}`);
    runGit(f.strongRepo, 'rm', '-q', 'company/state/runtime/forged.json');
    runGit(f.strongRepo, 'commit', '-q', '-m', 'revert intermediate runtime edit');
    // Ara commit'in tree nesnesi silinirse: uçlar arası diff ve rev-list çalışsa bile ara commit için diff-tree başarısız olur:
    const objPath = join(f.strongRepo, '.git', 'objects', midTree.slice(0, 2), midTree.slice(2));
    unlinkSync(objPath);
    assert.equal(baseEnv.rangeChanged(f.publicationBase, baseEnv.head()), null, 'failed diff-tree on intermediate commit must return null');
    const rBrokenTree = f.runPreflight();
    assert.equal(rBrokenTree.status, STATUS.VERSION);
    assert.ok(codes(rBrokenTree.findings).includes('history-inspection-failed'));
  });
});
