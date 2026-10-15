// Stage 4 (D-047) — factory interface: Handoff v2, Strong PC boot contract, asset manifest + rights hard-fail, CCR,
// teslim raporu (technical QA), yedek. Fixture'lar gerçek git + gerçek dosya sistemi kullanır; render yok.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { read, git, parseCsv, ROOT } from '../lib/records.mjs';
import { readinessErrors, lintScenePlan } from '../lib/pipeline.mjs';
import {
  STATUS, overall, rightsVerdict, validateManifest, scanCode, gateHandoff, parseManifest, parseHandoff, lintHandoff, shingles, renderHandoff,
  lintCCR, lintDeliveryReport, backupStatus, mediaInfo, hashFile, preflight, makeEnv,
} from '../lib/factory.mjs';
import { runScenarios, png, wav, SCENE_PLAN } from '../factory/fixtures.mjs';

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
