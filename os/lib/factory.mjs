// Company OS v2 — Stage 4 factory interface (D-047). Paket yok.
// Main PC → Strong PC teslimi: Production Handoff v2 sözleşmesi, issuance gate'i, Strong PC boot contract (preflight),
// asset manifest + rights hard-fail, Creative Change Request (CCR), teslim raporu (technical QA) ve yedek durumu.
// Kural: uyuşmazlıkta production başlamaz; Strong PC fallback uydurmaz. Protokol: os/factory/README.md.
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, statSync, readdirSync, openSync, readSync, closeSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { parseCsv } from './records.mjs';
import { parseBlocks, header, lintScenePlan, productionBlockers, lintCreativeQA } from './pipeline.mjs';

const norm = (t) => (t || '').replace(/\r\n/g, '\n');
const words = (t) => (t || '').split(/\s+/).filter(Boolean);
const HEX40 = /^[0-9a-f]{40}$/;
const HEX64 = /^[0-9a-f]{64}$/i;

// ---------------------------------------------------------------- durumlar
export const STATUS = {
  READY: 'READY_FOR_PRODUCTION',
  VERSION: 'BLOCKED_BY_VERSION_MISMATCH',
  GAP: 'BLOCKED_BY_CANONICAL_GAP',
  RIGHTS: 'BLOCKED_BY_RIGHTS',
  ASSET: 'BLOCKED_BY_ASSET',
  CCR: 'CCR_REQUIRED',
};
// Birden çok engel varsa raporlanan birincil durum (hepsi yine listelenir).
const ORDER = [STATUS.VERSION, STATUS.GAP, STATUS.RIGHTS, STATUS.ASSET, STATUS.CCR];
export const finding = (status, code, detail, level = 'block') => ({ status, code, detail, level });
export function overall(findings) {
  const blocks = findings.filter((f) => f.level === 'block');
  for (const s of ORDER) if (blocks.some((f) => f.status === s)) return s;
  return STATUS.READY;
}

// ---------------------------------------------------------------- manifest + rights
export const MANIFEST_COLUMNS = ['asset_id', 'use', 'scenes', 'role', 'origin', 'readiness', 'expected_path', 'sha256', 'width', 'height', 'duration_s',
  'rights_ref', 'provenance', 'disclosure', 'recoverability', 'backup_ref', 'notes'];
export const USE = ['REQUIRED', 'OPTIONAL', 'QUARANTINED'];
export const ROLE = ['EVIDENCE_ANCHOR', 'PRESENTATION_VISUAL', 'BOTH'];
export const ORIGIN = ['external', 'own', 'ai'];
export const MANIFEST_READINESS = ['READY', 'TO_PRODUCE', 'NEEDS_SOURCE', 'NEEDS_RIGHTS', 'MISSING'];
export const RECOVERABILITY = ['IN_GIT', 'REDOWNLOADABLE', 'BACKED_UP', 'LOCAL_ONLY', 'NOT_YET_PRODUCED'];
const CLEAR = ['CLEAR', 'CLEAR_WITH_ATTRIBUTION'];
const IMAGE_EXT = /\.(png|jpe?g)$/i;
const AV_EXT = /\.(wav|mp4|mov|m4a|mp3)$/i;
export const ASSET_ID = /(?<![A-Za-z0-9])((?:V|AI|OG)-\d{2})(?!\d)/g;

export const parseManifest = (text) => parseCsv(norm(text));

// Hak kararı yalnız rights ledger satırından çıkar; kredi/atıf metni hak değildir (production/rights/README.md, D-036).
export function rightsVerdict(row, ledgerRow) {
  if (row.origin === 'own' && (row.rights_ref || '').trim() === 'own') return { ok: true };
  if (!ledgerRow) return { ok: false, why: `${row.asset_id}: not in rights ledger (external/AI asset needs a ledger row; a credit line is not rights)` };
  const st = (ledgerRow.rights_status || '').trim();
  if (st === 'REJECTED') return { ok: false, why: `${row.asset_id}: rights REJECTED` };
  if (!CLEAR.includes(st)) return { ok: false, why: `${row.asset_id}: rights ${st || 'empty'} (unresolved)` };
  if (/^yes$/i.test(ledgerRow.manual_review_needed || '')) return { ok: false, why: `${row.asset_id}: manual rights review still needed` };
  if (!ledgerRow.license_basis || /^unknown$/i.test(ledgerRow.license_basis)) return { ok: false, why: `${row.asset_id}: license basis unknown (attribution does not replace rights)` };
  if (!/^yes$/i.test(ledgerRow.commercial_use || '')) return { ok: false, why: `${row.asset_id}: commercial use not confirmed` };
  if (!ledgerRow.proof_location || /NEEDS VERIFICATION|^unknown$/i.test(ledgerRow.proof_location)) return { ok: false, why: `${row.asset_id}: no rights proof recorded` };
  if (st === 'CLEAR_WITH_ATTRIBUTION' && !(ledgerRow.attribution_text || '').trim()) return { ok: false, why: `${row.asset_id}: attribution text missing` };
  if (row.origin === 'ai' && ledgerRow.license_basis !== 'ai-generated-own') return { ok: false, why: `${row.asset_id}: AI asset must be ai-generated-own` };
  return { ok: true };
}

// Manifest doğrulaması (Main PC issuance ve Strong PC preflight aynı fonksiyonu kullanır).
export function validateManifest(rows, ledgerRows) {
  const out = [];
  const ledger = new Map(ledgerRows.map((r) => [r.asset_id, r]));
  const ids = rows.map((r) => r.asset_id);
  for (const dup of ids.filter((x, i) => ids.indexOf(x) !== i)) out.push(finding(STATUS.ASSET, 'manifest-duplicate', `duplicate asset_id ${dup}`));
  for (const r of rows) {
    const id = r.asset_id || '(no id)';
    if (!USE.includes(r.use)) { out.push(finding(STATUS.ASSET, 'manifest-use', `${id}: use must be ${USE.join(' / ')}`)); continue; }
    if (r.use === 'QUARANTINED') {
      const st = ledger.get(r.rights_ref || r.asset_id)?.rights_status;
      if (CLEAR.includes(st)) out.push(finding(STATUS.ASSET, 'manifest-quarantine', `${id}: quarantined but ledger says ${st} — fix the record`));
      else out.push(finding(STATUS.RIGHTS, 'quarantined', `${id}: quarantined (${st || 'not in ledger'}) — must not be used`, 'info'));
      continue;
    }
    if (!ROLE.includes(r.role)) out.push(finding(STATUS.ASSET, 'manifest-role', `${id}: role must be ${ROLE.join(' / ')}`));
    if (!ORIGIN.includes(r.origin)) out.push(finding(STATUS.ASSET, 'manifest-origin', `${id}: origin must be ${ORIGIN.join(' / ')}`));
    if (!MANIFEST_READINESS.includes(r.readiness)) { out.push(finding(STATUS.ASSET, 'manifest-readiness', `${id}: readiness must be ${MANIFEST_READINESS.join(' / ')}`)); continue; }
    if (!RECOVERABILITY.includes(r.recoverability)) out.push(finding(STATUS.ASSET, 'manifest-recoverability', `${id}: recoverability must be ${RECOVERABILITY.join(' / ')}`));
    if (r.use !== 'REQUIRED') continue;
    if (r.readiness === 'NEEDS_RIGHTS') out.push(finding(STATUS.RIGHTS, 'needs-rights', `${id}: NEEDS_RIGHTS — HARD STOP at handoff`));
    if (r.readiness === 'NEEDS_SOURCE' || r.readiness === 'MISSING') out.push(finding(STATUS.ASSET, 'not-ready', `${id}: ${r.readiness} — HARD STOP at handoff`));
    if (r.readiness === 'TO_PRODUCE' && r.origin === 'external') out.push(finding(STATUS.ASSET, 'external-to-produce', `${id}: an external asset cannot be TO_PRODUCE (needs a source)`));
    if (r.readiness === 'READY') {
      if (!r.expected_path) out.push(finding(STATUS.ASSET, 'no-path', `${id}: READY asset has no expected_path`));
      if (r.origin !== 'own' || r.expected_path) {
        if (!HEX64.test(r.sha256 || '')) out.push(finding(STATUS.ASSET, 'no-hash', `${id}: full SHA-256 not recorded${r.sha256 ? ` (only "${r.sha256}")` : ''}`));
        if (IMAGE_EXT.test(r.expected_path || '') && !(+r.width > 0 && +r.height > 0)) out.push(finding(STATUS.ASSET, 'no-dimensions', `${id}: image dimensions not recorded`));
        if (AV_EXT.test(r.expected_path || '') && !(+r.duration_s > 0)) out.push(finding(STATUS.ASSET, 'no-duration', `${id}: duration not recorded`));
      }
    }
    if (r.readiness === 'READY' || r.readiness === 'TO_PRODUCE') {
      const v = rightsVerdict(r, ledger.get(r.rights_ref || r.asset_id));
      if (!v.ok) out.push(finding(STATUS.RIGHTS, 'rights', v.why));
    }
    if (r.origin === 'ai' && (!(r.provenance || '').trim() || !(r.disclosure || '').trim())) out.push(finding(STATUS.RIGHTS, 'ai-provenance', `${id}: AI asset needs provenance (prompt, date, tool) and disclosure`));
    if (r.recoverability === 'REDOWNLOADABLE' && !/https?:\/\//.test(r.provenance || '') && !/\.pdf|render/i.test(r.provenance || '')) out.push(finding(STATUS.ASSET, 'recoverability', `${id}: REDOWNLOADABLE without a source to re-obtain it — treat as LOCAL_ONLY`, 'warn'));
    if (r.recoverability === 'LOCAL_ONLY' && !(r.backup_ref || '').trim()) out.push(finding(STATUS.ASSET, 'irreplaceable-unprotected', `${id}: exists only on the production PC and has no verified backup`, 'warn'));
  }
  return out;
}

// ---------------------------------------------------------------- kod taraması (legacy composition / reddedilmiş asset)
export function scanCode(files, { manifestRows, ledgerRows, allowed, forbidden }) {
  const out = [];
  const man = new Map(manifestRows.map((r) => [r.asset_id, r]));
  const ledger = new Map(ledgerRows.map((r) => [r.asset_id, r]));
  const under = (p, list) => list.some((d) => p === d || p.startsWith(d.endsWith('/') ? d : `${d}/`));
  const bad = (id) => { const st = ledger.get(man.get(id)?.rights_ref || id)?.rights_status; return st && !CLEAR.includes(st) ? st : null; };
  for (const { path, text } of files) {
    const refs = [...new Set([...norm(text).matchAll(ASSET_ID)].map((m) => m[1]))];
    if (under(path, forbidden)) {
      for (const id of refs) if (bad(id)) out.push(finding(STATUS.RIGHTS, 'legacy-contamination', `${path} references ${id} (${bad(id)}) — legacy path is forbidden by the handoff; never import it`, 'info'));
      continue;
    }
    if (!under(path, allowed)) continue;
    for (const id of refs) {
      const row = man.get(id);
      if (bad(id)) out.push(finding(STATUS.RIGHTS, 'code-rights', `${path} references ${id} (${bad(id)})`));
      else if (!row) out.push(finding(STATUS.RIGHTS, 'code-unmanifested', `${path} references ${id}, which is not in the asset manifest`));
      else if (row.use !== 'REQUIRED') out.push(finding(STATUS.ASSET, 'code-out-of-scope', `${path} references ${id} (${row.use}) — not a required asset of this handoff`));
    }
    for (const m of norm(text).matchAll(/(?:from|import\(|require\()\s*['"]([^'"]+)['"]/g)) {
      const spec = m[1].replace(/\\/g, '/');
      const hit = forbidden.find((d) => spec.includes(d.replace(/^.*?src\//, '').replace(/\/$/, '')));
      if (hit) out.push(finding(STATUS.VERSION, 'legacy-import', `${path} imports "${spec}" from forbidden legacy path ${hit}`));
    }
  }
  return out;
}

// ---------------------------------------------------------------- issuance gate (Main PC)
// Strong PC aynı gate'i preflight'ta yeniden hesaplar: handoff'taki "ISSUED" yazısına güvenilmez.
export function gateHandoff({ registry, scenePlan, qa, manifestRows, ledgerRows, codeFiles = [], allowedCodePaths = [], forbiddenCodePaths = [] }) {
  const out = [];
  const reg = (path) => registry.find((r) => r.path === path);
  const sp = reg(scenePlan.path);
  if (!scenePlan.text) out.push(finding(STATUS.GAP, 'scene-plan-missing', `Production Scene Plan not found: ${scenePlan.path}`));
  else {
    if (!sp) out.push(finding(STATUS.GAP, 'scene-plan-unregistered', `${scenePlan.path} is not in the artifact registry`));
    else if (sp.status !== 'ACTIVE') out.push(finding(STATUS.GAP, 'scene-plan-not-approved', `Production Scene Plan ${sp.artifact_id} is ${sp.status}; only an ACTIVE (approved) plan can be handed off`));
    for (const e of lintScenePlan(scenePlan.text)) out.push(finding(STATUS.GAP, 'scene-plan-lint', e));
    for (const b of productionBlockers(scenePlan.text)) out.push(finding(/NEEDS_RIGHTS|UNKNOWN_RIGHTS|UNRESOLVED_RIGHTS|REJECTED/.test(b) ? STATUS.RIGHTS : STATUS.ASSET, 'scene-plan-readiness', b));
  }
  if (!qa.text) out.push(finding(STATUS.GAP, 'qa-missing', `Independent Creative QA not found: ${qa.path}`));
  else {
    const q = reg(qa.path);
    if (q && ['SUPERSEDED', 'HISTORICAL', 'REJECTED'].includes(q.status)) out.push(finding(STATUS.GAP, 'qa-stale', `Creative QA ${q.artifact_id} is ${q.status}`));
    const verdict = (norm(qa.text).match(/^- \*\*Verdict:\*\*\s*(\S+)/m) || [])[1] || '(none)';
    if (verdict !== 'PASS') out.push(finding(STATUS.GAP, 'qa-not-pass', `Independent Creative QA verdict is ${verdict}; handoff needs PASS`));
    const errs = lintCreativeQA(qa.text);
    if (errs.length) {
      const legacy = lintCreativeQA(qa.text, { legacy: true }).length === 0;
      out.push(finding(STATUS.GAP, 'qa-format', legacy ? 'Creative QA uses the historical rating format; a current-format independent QA is required' : `Creative QA invalid: ${errs.slice(0, 3).join('; ')}`));
    }
    const spName = basename(scenePlan.path);
    const short = (spName.match(/^(\d{2}-scene-plan)(?:-(v\d+))?/) || []);
    const covers = norm(qa.text).includes(spName) || (short[2] && new RegExp(`\\b05-${short[2]}\\b`).test(qa.text));
    if (!covers) out.push(finding(STATUS.GAP, 'qa-coverage', `Creative QA does not name ${spName}`));
  }
  const manIds = new Set(manifestRows.map((r) => r.asset_id));
  if (scenePlan.text) {
    for (const b of parseBlocks(scenePlan.text, /^SP-\d{2}$/)) {
      const ids = new Set([...`${b.fields['Evidence Anchor'] || ''} ${b.fields['Rights / Asset Readiness'] || ''}`.matchAll(ASSET_ID)].map((m) => m[1]));
      for (const id of ids) {
        const row = manifestRows.find((r) => r.asset_id === id);
        if (!manIds.has(id)) out.push(finding(STATUS.ASSET, 'plan-asset-unmanifested', `${b.id} uses ${id}, which is not in the asset manifest`));
        else if (row.use !== 'REQUIRED') out.push(finding(STATUS.ASSET, 'plan-asset-not-required', `${b.id} uses ${id}, but the manifest marks it ${row.use}`));
      }
    }
  }
  out.push(...validateManifest(manifestRows, ledgerRows));
  out.push(...scanCode(codeFiles, { manifestRows, ledgerRows, allowed: allowedCodePaths, forbidden: forbiddenCodePaths }));
  return out;
}

// ---------------------------------------------------------------- handoff contract
export const CONTRACT_KEYS = ['handoff_format', 'handoff_id', 'handoff_version', 'supersedes', 'not_inherited', 'case', 'channel', 'scope', 'repo', 'os_version',
  'current_state', 'canon', 'scene_plan', 'creative_qa', 'asset_manifest', 'rights_ledger', 'evidence_ledger', 'production_root', 'required_assets',
  'allowed_code_paths', 'forbidden_code_paths', 'allowed_actions', 'forbidden_actions', 'approvals', 'founder_actions', 'blockers', 'status', 'next_gate'];
export const ALLOWED_ACTIONS = ['verify-preflight', 'build-scenes-in-scope', 'micro-technical-adjustments', 'produce-TO_PRODUCE-assets-per-plan',
  'technical-qa', 'render-review-copy', 'raise-ccr', 'write-delivery-report', 'backup-produced-assets'];
export const FORBIDDEN_BASELINE = ['creative-change-without-approved-ccr', 'asset-substitution', 'use-unmanifested-asset', 'use-rights-unresolved-asset',
  'use-legacy-handoff-or-composition', 'final-creative-pass', 'write-doctrine', 'spend-money', 'publish', 'push', 'work-outside-scope'];
const APPROVAL_VALUES = ['APPROVED', 'NOT_APPROVED', 'NOT_NEEDED'];
// Sistemin çözeceği sorular Founder'a taşınmaz (governance §4, pipeline §5).
const SYSTEM_QUESTION = /\b(which|hangi)\s+(tool|araç|branch|dal|klasör|folder|commit|software|program)\b|\bAE mi\b|\bBlender m[ıi]\b|\bRemotion m[uü]\b|After Effects m[ıi]\b|tool choice|araç seçimi|choose (the )?tool/i;
const REF_KEYS = ['current_state', 'scene_plan', 'creative_qa', 'asset_manifest', 'rights_ledger', 'evidence_ledger'];

export function parseHandoff(md) {
  const m = norm(md).match(/```json handoff-contract\n([\s\S]*?)\n```/);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}

// Kanon metninden 12 kelimelik pencereler (handoff'a doctrine kopyalanmasını yakalar).
export function shingles(texts, n = 12) {
  const set = new Set();
  for (const t of texts) {
    const w = words(norm(t).toLowerCase().replace(/[`*_|>#\[\]()]/g, ' '));
    for (let i = 0; i + n <= w.length; i++) set.add(w.slice(i, i + n).join(' '));
  }
  return set;
}

export function lintHandoff(md, { canonShingles } = {}) {
  const errors = [];
  const c = parseHandoff(md);
  if (!c) return ['no handoff-contract JSON block (legacy handoff format is not a v2 handoff)'];
  for (const k of CONTRACT_KEYS) if (!(k in c)) errors.push(`missing contract key: ${k}`);
  for (const k of Object.keys(c)) if (!CONTRACT_KEYS.includes(k)) errors.push(`unknown contract key "${k}" — durable doctrine and creative content belong in canonical files, referenced by path + blob`);
  if (c.handoff_format !== 2) errors.push('handoff_format must be 2');
  if (!(Number.isInteger(c.handoff_version) && c.handoff_version > 0)) errors.push('handoff_version must be a positive integer');
  for (const k of ['origin', 'root_commit', 'branch', 'required_commit']) if (!c.repo?.[k]) errors.push(`repo.${k} missing`);
  for (const k of ['root_commit', 'required_commit']) if (c.repo?.[k] && !HEX40.test(c.repo[k])) errors.push(`repo.${k} must be a full commit SHA`);
  const refs = [...REF_KEYS.map((k) => [k, c[k]]), ...(Array.isArray(c.canon) ? c.canon.map((r, i) => [`canon[${i}]`, r]) : [['canon', null]])];
  for (const [k, r] of refs) if (!r?.path || !HEX40.test(r?.blob || '')) errors.push(`${k} must be {path, blob} (pinned canonical reference)`);
  if (!Array.isArray(c.canon) || c.canon.length === 0) errors.push('canon must list the channel canon files (path + blob)');
  if (c.scene_plan && !(c.scene_plan.artifact_id && c.scene_plan.version)) errors.push('scene_plan must carry artifact_id and version');
  for (const a of c.allowed_actions || []) if (!ALLOWED_ACTIONS.includes(a)) errors.push(`allowed action not in vocabulary: ${a}`);
  for (const f of FORBIDDEN_BASELINE) if (!(c.forbidden_actions || []).includes(f)) errors.push(`forbidden_actions must include ${f}`);
  for (const [k, v] of Object.entries(c.approvals || {})) if (!APPROVAL_VALUES.includes(v)) errors.push(`approvals.${k} must be ${APPROVAL_VALUES.join(' / ')}`);
  if ((c.allowed_actions || []).includes('render-review-copy') && c.approvals?.render !== 'APPROVED') errors.push('render is allowed only with approvals.render = APPROVED (Founder)');
  for (const fa of c.founder_actions || []) {
    const text = JSON.stringify(fa);
    if (SYSTEM_QUESTION.test(text)) errors.push(`founder action asks a system question (tool/branch/folder are system decisions): ${text.slice(0, 80)}`);
    if (fa.mode === 'GUIDED_ACTION') { for (const k of ['step', 'command_or_prompt', 'path', 'expected']) if (!fa[k]) errors.push(`GUIDED_ACTION needs ${k}`); }
    else if (fa.mode === 'FOUNDER_DECISION') { if (!['money', 'publication', 'external', 'irreversible', 'strategy', 'taste'].includes(fa.category)) errors.push('FOUNDER_DECISION category must be money / publication / external / irreversible / strategy / taste'); }
    else errors.push(`founder action mode must be GUIDED_ACTION or FOUNDER_DECISION, got ${fa.mode}`);
  }
  if (!['ISSUED', 'BLOCKED'].includes(c.status)) errors.push('status must be ISSUED or BLOCKED');
  const blocks = (c.blockers || []).filter((b) => b.level !== 'info' && b.level !== 'warn');
  if (c.status === 'ISSUED' && blocks.length) errors.push('status ISSUED with open blockers');
  if (c.status === 'BLOCKED' && !blocks.length) errors.push('status BLOCKED without blockers');
  for (const b of blocks) if (!Object.values(STATUS).includes(b.status)) errors.push(`blocker status not in vocabulary: ${b.status}`);
  if (!words(c.next_gate).length) errors.push('next_gate missing');
  if (canonShingles) {
    const hits = [...shingles([md])].filter((s) => canonShingles.has(s));
    if (hits.length) errors.push(`handoff copies canon/doctrine text (${hits.length} 12-word overlaps, e.g. "${hits[0]}") — reference the canon file instead`);
  }
  return errors;
}

export function renderHandoff(c) {
  const blocks = c.blockers.filter((b) => b.level === 'block');
  const lines = [
    `# ${c.case} — Production Handoff v2 · ${c.handoff_id} v${c.handoff_version}`,
    '',
    `> status: ${c.status} · generated by \`node os/factory/factory.mjs issue\` · format 2 · do not edit the contract by hand — re-issue instead.`,
    `> Strong PC: before any production run \`node os/factory/factory.mjs preflight --handoff <this file> --expect ${c.handoff_id}@v${c.handoff_version}\`. Only \`${STATUS.READY}\` permits work.`,
    '> Creative content (scenes, visual ideas, tools) lives in the pinned Production Scene Plan; channel rules live in the pinned canon. Neither is copied here.',
    '',
    '## Contract',
    '```json handoff-contract',
    JSON.stringify(c, null, 2),
    '```',
    '',
    `## Result: ${c.status === 'ISSUED' ? 'ISSUED' : `BLOCKED — ${overall(c.blockers)}`}`,
  ];
  if (blocks.length) for (const b of blocks) lines.push(`- ${b.status} · ${b.code} · ${b.detail}`);
  else lines.push('- no blockers');
  const notes = c.blockers.filter((b) => b.level !== 'block');
  if (notes.length) { lines.push('', '## Notes (not blocking)'); for (const b of notes) lines.push(`- ${b.level} · ${b.code} · ${b.detail}`); }
  lines.push('', `## Next gate`, c.next_gate, '');
  return lines.join('\n');
}

// ---------------------------------------------------------------- git / dosya ortamı
let gitBinCache;
export function findGit() {
  if (gitBinCache) return gitBinCache;
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return (gitBinCache = 'git'); } catch { /* PATH'te yok */ }
  // Strong PC: git PATH'te yok; GitHub Desktop'un gömülü git'i kullanılır (company/machines.md).
  const base = process.env.LOCALAPPDATA ? join(process.env.LOCALAPPDATA, 'GitHubDesktop') : null;
  if (base && existsSync(base)) {
    const apps = readdirSync(base).filter((d) => /^app-/.test(d)).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
    for (const a of apps) { const p = join(base, a, 'resources', 'app', 'git', 'cmd', 'git.exe'); if (existsSync(p)) return (gitBinCache = p); }
  }
  throw new Error('git not found (PATH or GitHub Desktop)');
}

export function makeEnv(repoDir) {
  const bin = findGit();
  const run = (...args) => execFileSync(bin, args, { cwd: repoDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 }).replace(/\r\n/g, '\n');
  const tryRun = (...args) => { try { return run(...args); } catch { return null; } };
  const lines = (t) => (t || '').split('\n').map((x) => x.trim()).filter(Boolean);
  return {
    repoDir,
    head: () => tryRun('rev-parse', 'HEAD')?.trim() || null,
    branch: () => tryRun('rev-parse', '--abbrev-ref', 'HEAD')?.trim() || null,
    origin: () => tryRun('remote', 'get-url', 'origin')?.trim() || null,
    roots: () => lines(tryRun('rev-list', '--max-parents=0', 'HEAD')),
    commitExists: (c) => tryRun('cat-file', '-e', `${c}^{commit}`) !== null,
    isAncestor: (a, b) => tryRun('merge-base', '--is-ancestor', a, b) !== null,
    changed: (a, b) => lines(tryRun('diff', '--name-only', a, b)),
    dirty: () => lines(tryRun('status', '--porcelain')),
    blob: (rev, path) => tryRun('rev-parse', `${rev}:${path}`)?.trim() || null,
    readFile: (p) => (existsSync(join(repoDir, p)) ? norm(readFileSync(join(repoDir, p), 'utf8')) : null),
    listFiles: (prefix) => lines(tryRun('ls-files', '--', prefix)),
    fileInfo,
  };
}

export function hashFile(abs) {
  const h = createHash('sha256');
  const fd = openSync(abs, 'r');
  const buf = Buffer.alloc(1 << 20);
  try { let pos = 0, n; while ((n = readSync(fd, buf, 0, buf.length, pos)) > 0) { h.update(buf.subarray(0, n)); pos += n; } } finally { closeSync(fd); }
  return h.digest('hex');
}

function readAt(fd, pos, len) { const b = Buffer.alloc(len); const n = readSync(fd, b, 0, len, pos); return b.subarray(0, n); }

// Paketsiz medya ölçümü: PNG/JPEG boyutu, WAV/MP4/MOV süresi. Ölçülemeyen biçim null döner (hash yine bağlayıcıdır).
export function mediaInfo(abs) {
  const ext = extname(abs).toLowerCase();
  const fd = openSync(abs, 'r');
  try {
    if (ext === '.png') {
      const b = readAt(fd, 0, 24);
      if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null;
      return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    }
    if (ext === '.jpg' || ext === '.jpeg') {
      let pos = 2;
      for (let guard = 0; guard < 10000; guard++) {
        const m = readAt(fd, pos, 4);
        if (m.length < 4 || m[0] !== 0xff) return null;
        const marker = m[1];
        if (marker === 0xff) { pos += 1; continue; }
        const len = m.readUInt16BE(2);
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          const s = readAt(fd, pos + 4, 5);
          return { width: s.readUInt16BE(3), height: s.readUInt16BE(1) };
        }
        pos += 2 + len;
      }
      return null;
    }
    if (ext === '.wav') {
      const h = readAt(fd, 0, 12);
      if (h.toString('ascii', 0, 4) !== 'RIFF' || h.toString('ascii', 8, 12) !== 'WAVE') return null;
      let pos = 12, byteRate = 0;
      for (let guard = 0; guard < 1000; guard++) {
        const ch = readAt(fd, pos, 8);
        if (ch.length < 8) return null;
        const id = ch.toString('ascii', 0, 4), size = ch.readUInt32LE(4);
        if (id === 'fmt ') byteRate = readAt(fd, pos + 8, 16).readUInt32LE(8);
        if (id === 'data') return byteRate ? { duration: size / byteRate } : null;
        pos += 8 + size + (size % 2);
      }
      return null;
    }
    if (['.mp4', '.mov', '.m4a'].includes(ext)) {
      const total = statSync(abs).size;
      const box = (start, end, type) => {
        let pos = start;
        while (pos + 8 <= end) {
          const h = readAt(fd, pos, 16);
          let size = h.readUInt32BE(0), hdr = 8;
          if (size === 1) { size = Number(h.readBigUInt64BE(8)); hdr = 16; } else if (size === 0) size = end - pos;
          if (size < 8) return null;
          if (h.toString('ascii', 4, 8) === type) return { start: pos + hdr, end: pos + size };
          pos += size;
        }
        return null;
      };
      const moov = box(0, total, 'moov');
      const mvhd = moov && box(moov.start, moov.end, 'mvhd');
      if (!mvhd) return null;
      const b = readAt(fd, mvhd.start, 32);
      const v1 = b[0] === 1;
      const timescale = v1 ? b.readUInt32BE(20) : b.readUInt32BE(12);
      const duration = v1 ? Number(b.readBigUInt64BE(24)) : b.readUInt32BE(16);
      return timescale ? { duration: duration / timescale } : null;
    }
    return null;
  } finally { closeSync(fd); }
}

export function fileInfo(abs) {
  if (!existsSync(abs) || !statSync(abs).isFile()) return { exists: false };
  return { exists: true, size: statSync(abs).size, sha256: hashFile(abs), ...(mediaInfo(abs) || {}) };
}

// ---------------------------------------------------------------- Strong PC boot contract (preflight)
const caseDir = (c) => `channels/${c.channel}/cases/${c.case}/`;

export function preflight({ env, handoffPath, expect = null, productionRoot = null }) {
  const out = [];
  const observed = {};
  const done = (extra = {}) => ({ status: overall(out), findings: out, observed, ...extra });
  const md = env.readFile(handoffPath);
  if (md === null) { out.push(finding(STATUS.VERSION, 'handoff-missing', `handoff not found at ${handoffPath}`)); return done(); }
  const c = parseHandoff(md);
  if (!c) { out.push(finding(STATUS.VERSION, 'legacy-handoff', `${handoffPath} is not a v2 handoff contract (legacy handoffs are never inherited)`)); return done(); }
  for (const e of lintHandoff(md)) out.push(finding(STATUS.VERSION, 'handoff-invalid', e));
  if (expect && (expect.id !== c.handoff_id || expect.version !== c.handoff_version)) out.push(finding(STATUS.VERSION, 'handoff-expected', `expected ${expect.id}@v${expect.version}, file is ${c.handoff_id}@v${c.handoff_version}`));
  if (c.status !== 'ISSUED') {
    const recorded = (c.blockers || []).filter((b) => b.level === 'block');
    out.push(...recorded.map((b) => ({ ...b, code: `recorded:${b.code}` })));
    if (!recorded.length) out.push(finding(STATUS.GAP, 'not-issued', 'handoff was not issued'));
  }
  // repo / branch / commit / çalışma ağacı
  const origin = env.origin();
  if (!origin || !origin.replace(/\.git$/, '').endsWith(c.repo.origin)) out.push(finding(STATUS.VERSION, 'repo', `origin is ${origin || '(none)'}; handoff requires ${c.repo.origin}`));
  if (!env.roots().includes(c.repo.root_commit)) out.push(finding(STATUS.VERSION, 'repo-root', 'repository root commit differs (different repository)'));
  const branch = env.branch();
  if (branch !== c.repo.branch) out.push(finding(STATUS.VERSION, 'branch', `branch is ${branch}; handoff requires ${c.repo.branch}`));
  const head = env.head();
  observed.head = head;
  if (!env.commitExists(c.repo.required_commit)) out.push(finding(STATUS.VERSION, 'commit-unknown', `required commit ${c.repo.required_commit.slice(0, 12)} not present — fetch/pull first`));
  else if (!env.isAncestor(c.repo.required_commit, head)) out.push(finding(STATUS.VERSION, 'commit', `HEAD ${head?.slice(0, 12)} does not contain required commit ${c.repo.required_commit.slice(0, 12)}`));
  else {
    const allowed = new Set([handoffPath, 'company/state/artifact-registry.csv', 'company/state/current-state.md']);
    const drift = env.changed(c.repo.required_commit, head).filter((p) => !allowed.has(p) && !p.startsWith(`${caseDir(c)}ccr/`));
    if (drift.length) out.push(finding(STATUS.VERSION, 'commit-drift', `commits after the handoff changed ${drift.slice(0, 5).join(', ')}${drift.length > 5 ? ` (+${drift.length - 5})` : ''} — re-issue the handoff`));
  }
  const dirty = env.dirty();
  if (dirty.length) out.push(finding(STATUS.VERSION, 'working-tree', `working tree not clean: ${dirty.slice(0, 5).join(' | ')}`));
  const ver = (env.readFile('os/VERSION') || '').trim();
  if (ver !== c.os_version) out.push(finding(STATUS.VERSION, 'os-version', `os/VERSION is ${ver}; handoff requires ${c.os_version}`));
  // stale handoff (registry)
  const registry = parseCsv(env.readFile('company/state/artifact-registry.csv') || '');
  const row = registry.find((r) => r.path === handoffPath);
  if (c.status === 'ISSUED') {
    if (!row) out.push(finding(STATUS.VERSION, 'handoff-unregistered', 'handoff is not in the artifact registry'));
    else if (row.status !== 'ACTIVE') out.push(finding(STATUS.VERSION, 'stale-handoff', `handoff is ${row.status}${row.superseded_by ? ` (superseded by ${row.superseded_by})` : ''} — stale handoff`));
    else if (String(row.version) !== String(c.handoff_version)) out.push(finding(STATUS.VERSION, 'handoff-version', `registry version ${row.version} ≠ contract ${c.handoff_version}`));
  }
  // sabitlenmiş kanonik dosyalar
  const pinned = [...REF_KEYS.filter((k) => k !== 'current_state').map((k) => [k, c[k]]), ...(c.canon || []).map((r) => ['canon', r])];
  for (const [k, r] of pinned) {
    if (!r?.path) continue;
    const now = env.blob('HEAD', r.path);
    if (!now) out.push(finding(STATUS.GAP, 'canonical-missing', `${k}: ${r.path} missing at HEAD`));
    else if (now !== r.blob) out.push(finding(STATUS.VERSION, 'canonical-stale', `${k}: ${r.path} changed since the handoff (stale ${k === 'canon' ? 'canon' : k})`));
    const reg = registry.find((x) => x.path === r.path);
    if (reg && ['SUPERSEDED', 'HISTORICAL', 'REJECTED'].includes(reg.status)) out.push(finding(STATUS.VERSION, 'canonical-status', `${k}: ${r.path} is ${reg.status}`));
  }
  if (c.current_state?.path && env.blob(c.repo.required_commit, c.current_state.path) !== c.current_state.blob) out.push(finding(STATUS.VERSION, 'state-pin', 'current_state pin does not match the required commit'));
  // gate'i yeniden hesapla (ISSUED yazısına güvenme)
  const manifestRows = parseManifest(env.readFile(c.asset_manifest?.path) || '');
  const ledgerRows = parseCsv(env.readFile(c.rights_ledger?.path) || '');
  const codeFiles = (c.allowed_code_paths || []).concat(c.forbidden_code_paths || []).flatMap((p) => env.listFiles(p)).map((p) => ({ path: p, text: env.readFile(p) || '' }));
  const g = gateHandoff({ registry, scenePlan: { path: c.scene_plan?.path, text: env.readFile(c.scene_plan?.path) }, qa: { path: c.creative_qa?.path, text: env.readFile(c.creative_qa?.path) },
    manifestRows, ledgerRows, codeFiles, allowedCodePaths: c.allowed_code_paths || [], forbiddenCodePaths: c.forbidden_code_paths || [] });
  const seen = new Set(out.map((f) => f.detail));
  for (const f of g) if (!seen.has(f.detail)) out.push(f);
  const req = new Set(manifestRows.filter((r) => r.use === 'REQUIRED').map((r) => r.asset_id));
  const listed = new Set(c.required_assets || []);
  for (const id of req) if (!listed.has(id)) out.push(finding(STATUS.VERSION, 'required-assets', `manifest requires ${id}, handoff does not list it`));
  for (const id of listed) if (!req.has(id)) out.push(finding(STATUS.ASSET, 'required-assets', `handoff lists ${id}, manifest does not require it`));
  // dosya sistemi: hash / boyut / süre
  const root = productionRoot || c.production_root;
  observed.production_root = root;
  observed.assets = {};
  for (const r of manifestRows.filter((x) => x.use === 'REQUIRED' && x.readiness === 'READY' && x.expected_path)) {
    const info = env.fileInfo(join(root, r.expected_path));
    observed.assets[r.asset_id] = info.exists ? { sha256: info.sha256, width: info.width, height: info.height, duration: info.duration } : { exists: false };
    if (!info.exists) { out.push(finding(STATUS.ASSET, 'asset-missing', `${r.asset_id}: not found at ${r.expected_path}`)); continue; }
    if (HEX64.test(r.sha256 || '') && info.sha256 !== r.sha256.toLowerCase()) out.push(finding(STATUS.ASSET, 'asset-hash', `${r.asset_id}: SHA-256 mismatch`));
    if (+r.width > 0 && info.width !== undefined && (info.width !== +r.width || info.height !== +r.height)) out.push(finding(STATUS.ASSET, 'asset-dimensions', `${r.asset_id}: ${info.width}×${info.height}, expected ${r.width}×${r.height}`));
    if (+r.duration_s > 0 && info.duration !== undefined && Math.abs(info.duration - +r.duration_s) > 0.05) out.push(finding(STATUS.ASSET, 'asset-duration', `${r.asset_id}: ${info.duration.toFixed(3)} s, expected ${r.duration_s} s`));
  }
  // açık CCR
  for (const p of env.listFiles(`${caseDir(c)}ccr`).filter((x) => x.endsWith('.md'))) {
    const t = env.readFile(p) || '';
    const f = fields(t);
    if (!(f.Handoff || '').includes(`${c.handoff_id}@v${c.handoff_version}`)) continue;
    if (/^OPEN\b/.test(f.Status || '')) out.push(finding(STATUS.CCR, 'ccr-open', `${f.CCR || p}: open creative change request — Main PC creative authority must decide`));
    if (/^APPROVED\b/.test(f.Status || '')) out.push(finding(STATUS.VERSION, 'ccr-approved', `${f.CCR || p}: approved change needs a re-issued handoff (v${c.handoff_version + 1})`));
  }
  return done({ contract: { id: c.handoff_id, version: c.handoff_version, case: c.case } });
}

// ---------------------------------------------------------------- Creative Change Request
const fields = (md) => { const o = {}; for (const line of norm(md).split('\n')) { const f = line.match(/^- \*\*(.+?):\*\*\s*(.*)$/); if (f && !(f[1].trim() in o)) o[f[1].trim()] = f[2].trim(); } return o; };
export const CCR_CATEGORIES = ['TECHNICAL_INFEASIBLE', 'SCENE_NOT_WORKING', 'VISUAL_UNAVAILABLE', 'TIMING_STORY'];
const ALREADY_DONE = /\b(already (applied|implemented|changed|rendered)|i (changed|replaced|rewrote)|uygulad[ıi]m|değiştirdim|yeniden yazd[ıi]m)\b/i;

export function lintCCR(md) {
  const errors = [];
  const f = fields(md);
  const need = ['CCR', 'Handoff', 'Scene', 'Category', 'Problem', 'Why the current plan fails', 'Proposed change', 'Truth / evidence impact', 'Cost / time impact', 'Raised by', 'Status', 'Decision by'];
  for (const n of need) if (!f[n]) errors.push(`missing field: ${n}`);
  if (f.CCR && !/^CCR-\d{3}$/.test(f.CCR)) errors.push('CCR id must be CCR-NNN');
  if (f.Handoff && !/@v\d+/.test(f.Handoff)) errors.push('Handoff must name id@vN');
  if (f.Scene && !/\bSP-\d{2}\b/.test(f.Scene)) errors.push('Scene must name SP-NN');
  if (f.Category && !CCR_CATEGORIES.includes(f.Category)) errors.push(`Category must be ${CCR_CATEGORIES.join(' / ')}`);
  for (const k of ['Problem', 'Why the current plan fails', 'Proposed change']) if (f[k] && words(f[k]).length < 6) errors.push(`${k} too thin`);
  const status = (f.Status || '').split(/\s/)[0];
  if (f.Status && !['OPEN', 'APPROVED', 'REJECTED'].includes(status)) errors.push('Status must be OPEN / APPROVED / REJECTED');
  if (ALREADY_DONE.test(`${f['Proposed change'] || ''} ${f.Problem || ''}`)) errors.push('CCR must precede the change (Strong PC does not change the plan first and ask later)');
  const raiser = (f['Raised by'] || '').toLowerCase();
  const decider = (f['Decision by'] || '').toLowerCase();
  if (status !== 'OPEN') {
    if (!/main pc|coo|creative authority/.test(decider)) errors.push('only Main PC creative authority decides a CCR');
    if (decider && raiser && decider === raiser) errors.push('the raiser cannot decide its own CCR');
    if (/strong pc|production-engineer|render pc/.test(decider)) errors.push('Strong PC cannot decide a CCR');
  } else if (decider && !/^pending\b/.test(decider)) errors.push('an OPEN CCR has Decision by: pending');
  const truth = f['Truth / evidence impact'] || '';
  if (truth && !/^none\b/i.test(truth) && !/\b(C|Q|V|E)-\d{2}\b/.test(truth)) errors.push('truth impact must be "none" or name ledger rows (evidence ledger route)');
  if (status === 'APPROVED' && f['Cost / time impact'] && !/^none\b/i.test(f['Cost / time impact']) && /\b(credit|kredi|\$|usd|tl|paid|ücret)/i.test(f['Cost / time impact']) && !/founder/.test(decider)) errors.push('a CCR that costs money needs a Founder decision');
  return errors;
}

// ---------------------------------------------------------------- teslim raporu (Strong PC technical QA)
export const TECH_AREAS = ['Version', 'Assets', 'Rights', 'Render validity', 'Missing files/frames', 'Captions', 'Measurable audio', 'Resolution', 'Technical delivery', 'Backup'];
const MICRO = /^(framing|crop|timing|easing|colou?r match|template fix|layer order|export setting|safe area)\b/i;
const CREATIVE_WORDS = /\b(story|narrat|script|claim|hook|structure|replac|substitut|another (photo|image|asset)|different (photo|image|asset)|new scene|cut the scene|hikâye|başka|senaryo)\w*/i;

export function lintDeliveryReport(md, { manifestRows = [] } = {}) {
  const errors = [];
  const t = norm(md);
  const f = fields(t);
  if (!/@v\d+/.test(header(t, 'handoff'))) errors.push('header must name handoff id@vN');
  for (const a of TECH_AREAS) {
    if (!f[a]) { errors.push(`missing technical area: ${a}`); continue; }
    if (!/^(PASS|FAIL|N\/A)\b/.test(f[a])) errors.push(`${a}: must be PASS / FAIL / N/A + evidence`);
    else if (words(f[a]).length < 4) errors.push(`${a}: evidence missing`);
  }
  const tv = f['Technical verdict'] || '';
  if (!/^(PASS|FAIL)$/.test(tv)) errors.push('Technical verdict must be PASS or FAIL');
  if (tv === 'PASS' && TECH_AREAS.some((a) => /^FAIL/.test(f[a] || ''))) errors.push('Technical verdict PASS with a FAIL area');
  if (f['Creative QA'] !== 'PENDING_INDEPENDENT') errors.push('Creative QA must be PENDING_INDEPENDENT (Strong PC cannot give a creative verdict)');
  const noCreative = t.replace(/^- \*\*Creative QA:\*\* PENDING_INDEPENDENT$/m, '');
  if (/creative (qa )?(verdict|pass)|creative[- ]?pass|final (creative )?pass|yaratıcı (onay|pass)/i.test(noCreative)) errors.push('Strong PC report claims a creative verdict/PASS (charter §9: producer cannot pass its own work)');
  const approvedCcr = new Set([...t.matchAll(/\b(CCR-\d{3}) APPROVED\b/g)].map((m) => m[1]));
  for (const [k, v] of Object.entries(f).filter(([k]) => /^SP-\d{2}$/.test(k))) {
    if (/^AS_PLANNED\b/.test(v)) continue;
    const ccr = v.match(/^(CCR-\d{3}) APPROVED\b/);
    if (ccr) continue;
    const micro = v.match(/^MICRO\s*—\s*(.+)$/);
    if (micro && MICRO.test(micro[1]) && !CREATIVE_WORDS.test(micro[1])) continue;
    errors.push(`${k}: deviation "${v.slice(0, 60)}" is not a micro technical adjustment and has no approved CCR`);
  }
  if (!Object.keys(f).some((k) => /^SP-\d{2}$/.test(k))) errors.push('Scenes section must report each scene (AS_PLANNED / MICRO — … / CCR-NNN APPROVED)');
  const used = (t.split(/^## Assets used\s*$/m)[1] || '').split(/^## /m)[0];
  const man = new Map(manifestRows.map((r) => [r.asset_id, r]));
  for (const m of used.matchAll(/^- (\S+)/gm)) {
    const id = m[1].replace(/[`,;]/g, '');
    const row = man.get(id);
    if (!row) errors.push(`asset used but not in manifest: ${id} (substitution needs a CCR and a re-issued handoff)`);
    else if (row.use !== 'REQUIRED') errors.push(`asset used outside handoff scope: ${id} (${row.use})`);
  }
  if (!used.trim()) errors.push('Assets used section missing');
  const tools = (t.split(/^## Tool changes\s*$/m)[1] || '').split(/^## /m)[0];
  for (const line of tools.split('\n').filter((l) => /^- /.test(l) && !/^- none\b/i.test(l))) {
    if (!/reason:\s*\S+/i.test(line)) errors.push(`tool change without reason: ${line.slice(2, 60)}`);
    const intent = (line.match(/intent:\s*(\w+)/i) || [])[1];
    if (!intent) errors.push(`tool change must state intent: preserved | reduced — ${line.slice(2, 60)}`);
    if (/reduced/i.test(intent || '') && !approvedCcr.size) errors.push('tool change that reduces the scene intent needs an approved CCR');
    if (/(blender|3d|ai video|ai image)/i.test(line.split('→')[1] || '') && !/reason:\s*(scene need|accuracy)/i.test(line)) errors.push('escalating to 3D/AI needs reason: scene need or accuracy (more expensive is not automatically better)');
  }
  return errors;
}

// ---------------------------------------------------------------- yedek / kurtarılabilirlik
function walk(dir, base = dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, base, acc); else if (e.isFile()) acc.push(p.slice(base.length + 1).replace(/\\/g, '/'));
  }
  return acc;
}

// Her production dosyası için: PROTECTED (yedekte aynı hash) · REDOWNLOADABLE (manifest kaynağı + tam hash) · IN_GIT · UNPROTECTED (yalnız bu PC'de).
export function backupStatus({ productionRoot, backupRoots = [], manifestRows = [] }) {
  const byPath = new Map(manifestRows.filter((r) => r.expected_path).map((r) => [r.expected_path.replace(/\\/g, '/'), r]));
  const files = walk(productionRoot);
  const result = { PROTECTED: [], REDOWNLOADABLE: [], IN_GIT: [], UNPROTECTED: [] };
  for (const rel of files) {
    const row = byPath.get(rel);
    if (row?.recoverability === 'IN_GIT') { result.IN_GIT.push(rel); continue; }
    if (row?.recoverability === 'REDOWNLOADABLE' && HEX64.test(row.sha256 || '') && /https?:\/\/|\.pdf|render/i.test(row.provenance || '')) { result.REDOWNLOADABLE.push(rel); continue; }
    const abs = join(productionRoot, rel);
    const size = statSync(abs).size;
    let sha;
    const ok = backupRoots.some((b) => {
      const copy = join(b, rel);
      if (!existsSync(copy) || statSync(copy).size !== size) return false;
      sha ??= hashFile(abs);
      return hashFile(copy) === sha;
    });
    (ok ? result.PROTECTED : result.UNPROTECTED).push(rel);
  }
  return result;
}

// ---------------------------------------------------------------- issuance (Main PC)
// Handoff üretilir, elle yazılmaz: commit'e, kanona, scene plan'e, QA'ya, manifest'e ve ledger'lara blob ile sabitlenir.
export const repoSlug = (url) => ((url || '').match(/[:/]([^/:]+\/[^/]+?)(?:\.git)?\/?$/) || [])[1] || null;

export function issueHandoff(env, o) {
  if (env.dirty().length) throw new Error('working tree not clean — commit first (a handoff pins a commit)');
  const head = env.head();
  const registry = parseCsv(env.readFile('company/state/artifact-registry.csv') || '');
  const pin = (p) => { const b = env.blob(head, p); if (!b) throw new Error(`not committed: ${p}`); return { path: p, blob: b }; };
  const regRow = (p) => registry.find((r) => r.path === p) || {};
  const manifestRows = parseManifest(env.readFile(o.manifestPath) || '');
  const ledgerRows = parseCsv(env.readFile(o.rightsPath) || '');
  const codeFiles = o.allowedCode.concat(o.forbiddenCode).flatMap((p) => env.listFiles(p)).map((p) => ({ path: p, text: env.readFile(p) || '' }));
  const blockers = gateHandoff({ registry, scenePlan: { path: o.scenePlanPath, text: env.readFile(o.scenePlanPath) }, qa: { path: o.qaPath, text: env.readFile(o.qaPath) },
    manifestRows, ledgerRows, codeFiles, allowedCodePaths: o.allowedCode, forbiddenCodePaths: o.forbiddenCode });
  const status = blockers.some((b) => b.level === 'block') ? 'BLOCKED' : 'ISSUED';
  const approvals = { render: 'NOT_APPROVED', vo_credits: 'NOT_APPROVED', paid_assets: 'NOT_NEEDED', ai_generation: 'NOT_NEEDED', ...(o.approvals || {}) };
  const allowed = ALLOWED_ACTIONS.filter((a) => a !== 'render-review-copy' || approvals.render === 'APPROVED');
  const sp = regRow(o.scenePlanPath);
  const contract = {
    handoff_format: 2,
    handoff_id: o.id,
    handoff_version: o.version,
    supersedes: o.supersedes || null,
    not_inherited: o.notInherited || [],
    case: o.case,
    channel: o.channel,
    scope: o.scope || 'all scenes in the pinned scene plan',
    repo: { origin: repoSlug(env.origin()), root_commit: env.roots()[0], branch: env.branch(), required_commit: head },
    os_version: (env.readFile('os/VERSION') || '').trim(),
    current_state: pin('company/state/current-state.md'),
    canon: env.listFiles(`channels/${o.channel}/canon`).map(pin),
    scene_plan: { artifact_id: sp.artifact_id || null, version: sp.version || null, status: sp.status || null, ...pin(o.scenePlanPath) },
    creative_qa: { artifact_id: regRow(o.qaPath).artifact_id || null, ...pin(o.qaPath) },
    asset_manifest: pin(o.manifestPath),
    rights_ledger: pin(o.rightsPath),
    evidence_ledger: pin(o.evidencePath),
    production_root: o.productionRoot,
    required_assets: manifestRows.filter((r) => r.use === 'REQUIRED').map((r) => r.asset_id),
    allowed_code_paths: o.allowedCode,
    forbidden_code_paths: o.forbiddenCode,
    allowed_actions: allowed,
    forbidden_actions: FORBIDDEN_BASELINE,
    approvals,
    founder_actions: o.founderActions || [],
    blockers,
    status,
    next_gate: o.nextGate || (status === 'ISSUED'
      ? 'Strong PC preflight READY_FOR_PRODUCTION → production in scope → delivery report (technical QA) → independent Creative QA (creative-qa) on the render'
      : `Resolve blockers on Main PC (creative authority), then re-issue as ${o.id} v${o.version + 1}; nothing goes to Strong PC before that`),
  };
  return { contract, md: renderHandoff(contract) };
}
