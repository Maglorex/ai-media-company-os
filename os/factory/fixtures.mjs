// Stage 4 fixture/simulation: gerçek git + gerçek dosya sistemiyle küçük bir repo ve production klasörü kurar.
// Testler (os/tests/factory.test.mjs) ve Strong PC self-test (factory.mjs selftest) aynı senaryoları çalıştırır.
// Gerçek production dosyası taşınmaz; render yapılmaz.
import { mkdirSync, writeFileSync, rmSync, mkdtempSync, unlinkSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { deflateSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';
import { findGit, makeEnv, issueHandoff, preflight, hashFile, parseHandoff, renderHandoff, STATUS } from '../lib/factory.mjs';

const CRC = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (buf) => { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type, 'ascii'), data]); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, crc]); };

// Geçerli (decode edilebilir) gri PNG.
export function png(width, height, shade = 128) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 0; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const raw = Buffer.alloc((width + 1) * height, shade);
  for (let y = 0; y < height; y++) raw[y * (width + 1)] = 0;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

// PCM WAV (sessiz), süre ölçümü için.
export function wav(seconds, rate = 8000) {
  const data = Buffer.alloc(Math.round(seconds * rate) * 2);
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(rate, 24); h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}

const CANON = `# Fixture canon
The viewer should always understand why a scene exists before the scene asks for more attention from them.
Documents are evidence anchors; the presentation visual is a separate decision made for the viewer's understanding.`;

export const SCENE_PLAN = `# VID-T — Production Scene Plan v1

> author: COO main session · status: ACTIVE

### SP-01 — The ledger line
- **Beat:** B-01
- **Story Function:** BRING EVIDENCE
- **Claim:** The fixture report states one cost line.
- **Evidence Anchor:** C-01, V-01
- **Presentation Visual:** The report page arrives as an object and its single cost line lifts away into an open gap between two labels.
- **Visual Idea:** The page arrives as an object, the camera reaches the line, only that line sharpens, then it detaches and settles as an open bracket the viewer wants closed.
- **Motion / Spatial Behaviour:** reveal and transformation; the camera holds after the move.
- **Transition Logic:** The open bracket becomes the shape the next scene fills.
- **Sound Role:** Narration over a restrained bed; silence when the bracket opens.
- **UI Role:** highlight — one amber line with its source mark.
- **Rights / Asset Readiness:** V-01 public domain — READY; bracket own graphic — TO_PRODUCE
- **Anti-PowerPoint:** A slide would show the page; here finding the line becomes the open question the viewer wants closed.
- **Tool:** After Effects for the page move; no 3D needed because the flat page is the idea.
`;

const AREAS = ['Central question strength', 'Narrative curiosity', 'Visual curiosity', 'Audiovisual momentum plan', 'Story progression', 'Evidence clarity', 'Anti-PowerPoint', 'CASE identity', 'Payoff'];
export const QA_PASS = `# VID-T — Independent Creative QA v1

> author: COO main session · evaluator: creative-qa-evaluator (separate context) · inputs: channels/fx/cases/VID-T/05-scene-plan-v1.md, channels/fx/canon/README.md · skill: creative-qa

${AREAS.map((a) => `### ${a}\n- **Rating:** PASS\n- **Reason:** The fixture scene handles this area clearly and nothing needs to change here.\n`).join('\n')}
## Verdict
- **Verdict:** PASS
- **Accepted concerns:** none
- **Required changes:** none
`;

const LEDGER_HEAD = 'asset_id,asset_type,source,creator_owner,source_url_or_provenance,license_basis,attribution_required,attribution_text,retrieval_date,proof_location,allowed_transformations,commercial_use,restrictions_expiry,usage_locations,rights_status,rights_confidence,manual_review_needed,notes';
export const ledger = (v01Status = 'CLEAR') => [LEDGER_HEAD,
  `V-01,document,Fixture Archive,US Government,https://example.org/v01,public-domain-usgov,no,,2026-10-15,fixture/proof/v01.png,any,yes,none,,${v01Status},high,no,fixture`,
  'V-09,photo,Fixture Commons,unknown,https://example.org/v09,unknown,no,,2026-10-15,,unclear,unclear,UNKNOWN,none,REJECTED,high,no,DO NOT USE'].join('\n') + '\n';

const MANIFEST_HEAD = 'asset_id,use,scenes,role,origin,readiness,expected_path,sha256,width,height,duration_s,rights_ref,provenance,disclosure,recoverability,backup_ref,notes';
export const manifest = (sha) => [MANIFEST_HEAD,
  `V-01,REQUIRED,SP-01,BOTH,external,READY,01_archive/V-01_page.png,${sha},64,48,,V-01,https://example.org/v01,,REDOWNLOADABLE,,fixture page`,
  'OG-01,REQUIRED,SP-01,PRESENTATION_VISUAL,own,TO_PRODUCE,02_graphics/OG-01_bracket.png,,,,,own,own graphic,,NOT_YET_PRODUCED,,bracket',
  'V-09,QUARANTINED,,PRESENTATION_VISUAL,external,—,01_archive/V-09_old.jpg,,,,,V-09,https://example.org/v09,,LOCAL_ONLY,,rights REJECTED'].join('\n') + '\n';

const REG_HEAD = 'artifact_id,path,scope,type,version,status,superseded_by,decision_ref,note';
const CASE = 'channels/fx/cases/VID-T';
export const PATHS = {
  scenePlan: `${CASE}/05-scene-plan-v1.md`, qa: `${CASE}/06-creative-qa-v1.md`, manifest: `${CASE}/handoff/asset-manifest.csv`,
  rights: `${CASE}/rights-ledger.csv`, evidence: `${CASE}/evidence-ledger.md`, handoff: (v) => `${CASE}/handoff/07-production-handoff-v${v}.md`,
};
const BASE_REG = [
  'FX-CANON,channels/fx/canon/README.md,channel:fx,canon-readme,1,ACTIVE,,D-000,',
  `FX-SP-V1,${PATHS.scenePlan},case:VID-T,scene-plan,1,ACTIVE,,D-000,`,
  `FX-QA-V1,${PATHS.qa},case:VID-T,creative-qa,1,ACTIVE,,D-000,`,
  `FX-MANIFEST,${PATHS.manifest},case:VID-T,production-asset-manifest,1,ACTIVE,,D-000,`,
  `FX-RIGHTS,${PATHS.rights},case:VID-T,rights-ledger,1,ACTIVE,,D-000,`,
  `FX-EVIDENCE,${PATHS.evidence},case:VID-T,evidence-ledger,1,ACTIVE,,D-000,`,
];

export class Fixture {
  constructor({ v01Status = 'CLEAR' } = {}) {
    this.dir = mkdtempSync(join(tmpdir(), 'cos-factory-'));
    this.repo = join(this.dir, 'repo');
    this.prod = join(this.dir, 'prod');
    this.backup = join(this.dir, 'backup');
    this.reg = [...BASE_REG];
    this.git = (...args) => execFileSync(findGit(), args, { cwd: this.repo, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    mkdirSync(this.repo, { recursive: true });
    this.writeProd('01_archive/V-01_page.png', png(64, 48));
    this.writeProd('01_archive/V-09_old.jpg', Buffer.from('rejected photo bytes'));
    this.sha = hashFile(join(this.prod, '01_archive/V-01_page.png'));
    this.write('os/VERSION', 'fx-1\n');
    this.write('channels/fx/canon/README.md', CANON);
    this.write('company/state/current-state.md', '# Current State (fixture)\n');
    this.write(PATHS.scenePlan, SCENE_PLAN);
    this.write(PATHS.qa, QA_PASS);
    this.write(PATHS.manifest, manifest(this.sha));
    this.write(PATHS.rights, ledger(v01Status));
    this.write(PATHS.evidence, '# Evidence ledger (fixture)\n| C-01 | cost line | V-01 |\n');
    this.write('production/remotion/src/videos/vid-t/Scene.tsx', "export const src = 'V-01_page.png'; // V-01\n");
    this.write('production/remotion/src/videos/legacy/Old.tsx', "export const old = 'photos/V-09_old.jpg'; // legacy\n");
    this.writeReg();
    this.git('init', '-q', '-b', 'fx-branch');
    this.git('config', 'user.name', 'fixture'); this.git('config', 'user.email', 'fixture@example.invalid'); this.git('config', 'core.autocrlf', 'false');
    this.git('remote', 'add', 'origin', 'https://github.com/fixture/fx-repo.git');
    this.commit('fixture: base');
  }
  write(rel, content) { const p = join(this.repo, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, content); }
  read(rel) { return readFileSync(join(this.repo, rel), 'utf8'); }
  writeProd(rel, buf) { const p = join(this.prod, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, buf); }
  writeReg() { this.write('company/state/artifact-registry.csv', [REG_HEAD, ...this.reg].join('\n') + '\n'); }
  commit(msg) { this.git('add', '-A'); this.git('commit', '-q', '-m', msg); return this.git('rev-parse', 'HEAD').trim(); }
  env() { return makeEnv(this.repo); }
  issue(version = 1, extra = {}) {
    const { contract, md } = issueHandoff(this.env(), {
      id: 'VID-T-HO', version, case: 'VID-T', channel: 'fx', scenePlanPath: PATHS.scenePlan, qaPath: PATHS.qa, manifestPath: PATHS.manifest,
      rightsPath: PATHS.rights, evidencePath: PATHS.evidence, productionRoot: this.prod.replace(/\\/g, '/'),
      allowedCode: ['production/remotion/src/videos/vid-t/'], forbiddenCode: ['production/remotion/src/videos/legacy/'],
      supersedes: version > 1 ? `VID-T-HO@v${version - 1}` : null, ...extra,
    });
    this.write(PATHS.handoff(version), md);
    this.reg = this.reg.map((r) => (r.startsWith('FX-HO-') && /,ACTIVE,/.test(r) ? r.replace(',ACTIVE,,', `,SUPERSEDED,FX-HO-V${version},`) : r));
    this.reg.push(`FX-HO-V${version},${PATHS.handoff(version)},case:VID-T,production-handoff,${version},${contract.status === 'ISSUED' ? 'ACTIVE' : 'DRAFT'},,D-000,`);
    this.writeReg();
    this.commit(`fixture: issue handoff v${version}`);
    return contract;
  }
  preflight(version = 1, opts = {}) { return preflight({ env: this.env(), handoffPath: opts.path || PATHS.handoff(version), expect: opts.expect ?? { id: 'VID-T-HO', version } }); }
  cleanup() { rmSync(this.dir, { recursive: true, force: true }); }
}

// Strong PC boot contract senaryoları: [ad, beklenen durum, kurulum]. Her senaryo kendi temiz fixture'ında çalışır.
export const SCENARIOS = [
  ['correct handoff', STATUS.READY, (fx) => { fx.issue(1); return fx.preflight(1); }],
  ['wrong commit (later change to the scene plan)', STATUS.VERSION, (fx) => {
    fx.issue(1); fx.write(PATHS.scenePlan, SCENE_PLAN + '\n<!-- quiet edit -->\n'); fx.commit('edit plan after handoff'); return fx.preflight(1);
  }],
  ['dirty working tree', STATUS.VERSION, (fx) => { fx.issue(1); fx.write('os/VERSION', 'fx-2\n'); return fx.preflight(1); }],
  ['missing asset', STATUS.ASSET, (fx) => { fx.issue(1); unlinkSync(join(fx.prod, '01_archive/V-01_page.png')); return fx.preflight(1); }],
  ['asset hash/dimensions mismatch', STATUS.ASSET, (fx) => { fx.issue(1); fx.writeProd('01_archive/V-01_page.png', png(80, 48)); return fx.preflight(1); }],
  ['rejected rights (forged ISSUED)', STATUS.RIGHTS, (fx) => {
    const c = fx.issue(1);
    if (c.status !== 'BLOCKED') throw new Error('issuance should have been BLOCKED');
    const forged = { ...c, status: 'ISSUED', blockers: [] };
    fx.write(PATHS.handoff(1), renderHandoff(forged));
    fx.reg = fx.reg.map((r) => r.replace(',production-handoff,1,DRAFT,', ',production-handoff,1,ACTIVE,'));
    fx.writeReg(); fx.commit('forge: rights later');
    return fx.preflight(1);
  }, { v01Status: 'REJECTED' }],
  ['stale handoff (v1 after v2 issued)', STATUS.VERSION, (fx) => { fx.issue(1); fx.issue(2); return fx.preflight(1); }],
  ['legacy v1-format handoff', STATUS.VERSION, (fx) => {
    fx.write(`${CASE}/handoff/P-old-handoff-v3.md`, '# Production Handoff v3\n> Durum: HAZIR\n');
    fx.reg.push(`FX-OLD,${CASE}/handoff/P-old-handoff-v3.md,case:VID-T,legacy-handoff,3,FROZEN,,D-000,`); fx.writeReg(); fx.commit('old');
    return fx.preflight(3, { path: `${CASE}/handoff/P-old-handoff-v3.md`, expect: null });
  }],
  ['open creative change request', STATUS.CCR, (fx) => {
    fx.issue(1);
    fx.write(`${CASE}/ccr/CCR-001.md`, ['# CCR-001', '- **CCR:** CCR-001', '- **Handoff:** VID-T-HO@v1', '- **Scene:** SP-01', '- **Category:** TECHNICAL_INFEASIBLE',
      '- **Problem:** The page move cannot hold the line legibly at review resolution.', '- **Why the current plan fails:** The scanned line is too thin to read after the lift.',
      '- **Proposed change:** Redraw the bracket move at a larger scale with the same line and meaning.', '- **Truth / evidence impact:** none', '- **Cost / time impact:** none',
      '- **Raised by:** Strong PC (production-engineer)', '- **Status:** OPEN', '- **Decision by:** pending'].join('\n') + '\n');
    fx.commit('ccr'); return fx.preflight(1);
  }],
];

export function runScenarios(log = () => {}) {
  const results = [];
  for (const [name, expected, run, opts] of SCENARIOS) {
    const fx = new Fixture(opts);
    try {
      const r = run(fx);
      results.push({ name, expected, got: r.status, ok: r.status === expected, findings: r.findings.filter((f) => f.level === 'block') });
    } catch (e) {
      results.push({ name, expected, got: `ERROR ${e.message}`, ok: false, findings: [] });
    } finally { fx.cleanup(); }
    log(results[results.length - 1]);
  }
  return results;
}

export { parseHandoff };
