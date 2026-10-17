// The Industrial Casebook creative pipeline (D-046) — artifact lint'leri. Paket yok.
// Her lint hata mesajı dizisi döner; boş dizi = geçerli.

const norm = (t) => t.replace(/\r\n/g, '\n');

// "### ID — ad" bloklarını ve "- **Alan:** değer" satırlarını okur.
export function parseBlocks(md, idPattern) {
  const blocks = [];
  let cur = null;
  for (const line of norm(md).split('\n')) {
    const h = line.match(/^###\s+(\S+)/);
    if (h) {
      cur = idPattern.test(h[1]) ? { id: h[1], fields: {} } : null;
      if (cur) blocks.push(cur);
      continue;
    }
    if (/^##\s/.test(line)) { cur = null; continue; }
    const f = cur && line.match(/^- \*\*(.+?):\*\*\s*(.*)$/);
    if (f) cur.fields[f[1].trim()] = f[2].trim();
  }
  return blocks;
}

export function header(md, key) {
  const m = norm(md).match(new RegExp(`${key}:\\s*([^·\\n]+)`));
  return m ? m[1].trim() : '';
}

const words = (t) => (t || '').split(/\s+/).filter(Boolean);
const LEDGER_ID = /\b(C|Q|V|E)-\d{2}\b/;
const REPO_EVIDENCE_PATH = /`?(intelligence|production|channels\/[\w-]+\/cases)\/[^`\s]+`?/;
const PSEUDO_SCORE = /\b\d+(\.\d+)?\s*\/\s*(5|10|100)\b|\b(score[ds]?|scoring|puan(lama)?|toplam skor|weighted|ağırlıklı|composite)\b|\d+\s*(puan|points?)\b/i;

export function lintStoryViability(md) {
  const errors = [];
  const need = ['Why viewers care', 'Central question', 'Real packaging promise', 'Evidence sufficiency', 'Visual opportunity', 'Differentiation', 'Feasibility', 'Verdict', 'Recommendation', 'Biggest risk', 'What would change this verdict'];
  const fields = {};
  for (const line of norm(md).split('\n')) { const f = line.match(/^- \*\*(.+?):\*\*\s*(.*)$/); if (f) fields[f[1].trim()] = f[2].trim(); }
  for (const n of need) if (!fields[n] || words(fields[n]).length < 1) errors.push(`missing field: ${n}`);
  if (fields.Verdict && !/^(PURSUE|REVISE|KILL)\b/.test(fields.Verdict)) errors.push(`verdict must be PURSUE | REVISE | KILL, got "${fields.Verdict}"`);
  if (PSEUDO_SCORE.test(norm(md).replace(/^>.*$/gm, ''))) errors.push('pseudo-score / total score found');
  if (fields['Central question'] && !/\?/.test(fields['Central question'])) errors.push('central question must be a question');
  // Kanıt yoksa güven uydurulmaz: PURSUE yalnız repo kanıtına (ledger ID veya repo araştırma dosyası) dayanabilir.
  const ev = fields['Evidence sufficiency'] || '';
  const hasRepoEvidence = LEDGER_ID.test(ev) || REPO_EVIDENCE_PATH.test(ev);
  if (/^PURSUE\b/.test(fields.Verdict || '') && !hasRepoEvidence) errors.push('PURSUE without repository evidence (ledger IDs or research files) — verdict must be REVISE — research/evidence required');
  if (/^REVISE\b/.test(fields.Verdict || '') && !hasRepoEvidence && !/research\/evidence required/i.test(fields.Verdict)) errors.push('REVISE without repository evidence must say "research/evidence required"');
  return errors;
}

const FUNCTIONS = ['NEW CURIOSITY', 'BREAK ASSUMPTION', 'NEW INFORMATION', 'EXPLAIN SYSTEM', 'SHOW SCALE', 'BRING EVIDENCE', 'HUMAN DIMENSION', 'CONNECT IDEAS', 'SET UP PAYOFF', 'PAYOFF'];

export function lintBeatSheet(md) {
  const errors = [];
  const blocks = parseBlocks(md, /^B-\d{2}$/);
  if (blocks.length < 3) errors.push('beat sheet needs at least 3 beats');
  const need = ['Story Function', 'Viewer Question / Curiosity State', 'Claim', 'Evidence Anchor', 'Payoff / Next Question', 'Earns screen time because'];
  for (const b of blocks) {
    for (const n of need) if (!b.fields[n]) errors.push(`${b.id}: missing ${n}`);
    const fn = b.fields['Story Function'] || '';
    if (fn && !FUNCTIONS.some((f) => fn.toUpperCase().includes(f))) errors.push(`${b.id}: Story Function must use the beat vocabulary`);
    if (/^(context|background|info(rmation)?|bilgi|bağlam)\.?$/i.test(fn.trim())) errors.push(`${b.id}: "true information" alone is not a story function`);
    const ev = b.fields['Evidence Anchor'] || '';
    if (ev && !LEDGER_ID.test(ev) && !/none — framing beat/i.test(ev)) errors.push(`${b.id}: Evidence Anchor must cite ledger IDs or "none — framing beat"`);
    if (b.fields['Earns screen time because'] && words(b.fields['Earns screen time because']).length < 6) errors.push(`${b.id}: screen-time reason too thin`);
  }
  if (blocks.length && !blocks.some((b) => /PAYOFF/i.test(b.fields['Story Function'] || ''))) errors.push('beat sheet has no PAYOFF beat');
  return errors;
}

const ASSET_TOKEN = /\b([\w.-]+\.(jpe?g|png|tiff?|webp|pdf|mp4|mov|psd|ai|aep)|[CQVE]-\d{2}|AI-\d{2}|SP-\d{2}|B-\d{2})\b/gi;
const MOTION_PURPOSE = /\b(reveal|spatial|scale|mechanism|transformation|progression|hold)\b|^none\s*—/i;

export function lintScenePlan(md) {
  const errors = [];
  const blocks = parseBlocks(md, /^SP-\d{2}$/);
  if (blocks.length < 1) errors.push('scene plan has no SP blocks');
  const need = ['Beat', 'Story Function', 'Claim', 'Evidence Anchor', 'Presentation Visual', 'Visual Idea', 'Motion / Spatial Behaviour', 'Transition Logic', 'Sound Role', 'UI Role', 'Rights / Asset Readiness', 'Anti-PowerPoint', 'Tool'];
  for (const b of blocks) {
    for (const n of need) if (!b.fields[n]) errors.push(`${b.id}: missing ${n}`);
    const pv = b.fields['Presentation Visual'] || '';
    const pvWords = words(pv.replace(ASSET_TOKEN, ' ').replace(/[`*_()\[\],;:+]/g, ' '));
    if (pv && pvWords.length < 6) errors.push(`${b.id}: Presentation Visual is an asset reference, not a visual idea`);
    if (b.fields['Visual Idea'] && words(b.fields['Visual Idea']).length < 12) errors.push(`${b.id}: Visual Idea too thin to describe a scene`);
    const mo = b.fields['Motion / Spatial Behaviour'] || '';
    if (mo && !MOTION_PURPOSE.test(mo)) errors.push(`${b.id}: motion must state what it carries (or "none — reason")`);
    const ev = b.fields['Evidence Anchor'] || '';
    if (ev && !LEDGER_ID.test(ev) && !/none — framing beat/i.test(ev)) errors.push(`${b.id}: Evidence Anchor must cite ledger IDs or "none — framing beat"`);
    for (const e of readinessErrors(b.fields['Rights / Asset Readiness'] || '')) errors.push(`${b.id}: ${e}`);
    if (b.fields['Anti-PowerPoint'] && words(b.fields['Anti-PowerPoint']).length < 8) errors.push(`${b.id}: Anti-PowerPoint scene test not answered`);
  }
  return errors;
}

// Asset hazırlığı (creative planning). Yaratıcı fikir asset henüz yok/hak çözülmedi diye reddedilmez;
// ama durum açık olmalı, hak durumu saklanmamalı ve hakkı çözülmemiş kaynak READY gibi sunulmamalı.
export const READINESS = ['READY', 'TO_PRODUCE', 'NEEDS_SOURCE', 'NEEDS_RIGHTS', 'MISSING'];
const READINESS_RE = new RegExp(`\\b(${READINESS.join('|')})\\b`, 'g');
const RIGHTS_TERM = /public domain|\bPD\b|CC0|CC BY|CLEAR(_WITH_ATTRIBUTION)?|UNKNOWN_RIGHTS|UNRESOLVED_RIGHTS|\bREJECTED\b|ai-generated-own|NEEDS_RIGHTS|unrestricted/i;
const UNRESOLVED = /UNKNOWN_RIGHTS|UNRESOLVED_RIGHTS|NEEDS_RIGHTS|rights unknown|unclear rights/i;
const ASSET_REF = /\b(V-\d{2}|AI-\d{2})\b/;

export function readinessErrors(field) {
  const errors = [];
  if (!field.trim()) return ['missing Rights / Asset Readiness'];
  const items = field.split(';').map((x) => x.trim()).filter(Boolean);
  for (const item of items) {
    const states = [...new Set(item.match(READINESS_RE) || [])];
    if (states.length === 0) { errors.push(`readiness not stated (${READINESS.join(' / ')}): "${item.slice(0, 60)}"`); continue; }
    if (states.length > 1) errors.push(`ambiguous readiness ${states.join('+')}: "${item.slice(0, 60)}"`);
    if (ASSET_REF.test(item) && !RIGHTS_TERM.test(item)) errors.push(`rights status hidden for asset: "${item.slice(0, 60)}"`);
    if (states.includes('READY') && UNRESOLVED.test(item)) errors.push(`unresolved-rights asset presented as READY (HARD): "${item.slice(0, 60)}"`);
    if (/\bREJECTED\b/.test(item) && !/not used|kullanılmaz/i.test(item)) errors.push(`rejected asset planned for use (HARD): "${item.slice(0, 60)}"`);
  }
  return errors;
}

// Stage 4 handoff HARD STOP: Strong PC'ye gidecek planda yalnız READY veya TO_PRODUCE kalabilir.
export function productionBlockers(md) {
  const blockers = [];
  for (const b of parseBlocks(md, /^SP-\d{2}$/)) {
    for (const item of (b.fields['Rights / Asset Readiness'] || '').split(';').map((x) => x.trim()).filter(Boolean)) {
      const states = item.match(READINESS_RE) || [];
      if (states.some((st) => ['NEEDS_SOURCE', 'NEEDS_RIGHTS', 'MISSING'].includes(st)) || UNRESOLVED.test(item) || /\bREJECTED\b/.test(item)) blockers.push(`${b.id}: ${item.slice(0, 80)}`);
    }
  }
  return blockers;
}

const QA_AREAS = ['Central question strength', 'Narrative curiosity', 'Visual curiosity', 'Audiovisual momentum plan', 'Story progression', 'Evidence clarity', 'Anti-PowerPoint', 'CASE identity', 'Payoff'];

const QA_RATINGS = /^(PASS|CONCERN|BLOCKER)\b/;
const QA_RATINGS_LEGACY = /^(STRONG|OK|WEAK|MISSING)\b/; // QA v1/v2 dry-run raporları (tarihsel, nitel)
// Skor kalıpları (x/10, x/100, 'score', 'puan', 'weighted'); kanıt kesirleri (ör. 27/67 mürettebat) skor değildir.
const QA_NUMERIC = /\b\d+(\.\d+)?\s*\/\s*(5|10|100)\b|\b\d+\s*(points?|puan)\b|\b(score[ds]?|scoring|puanlama|weighted|ağırlıklı|composite|toplam skor|pass threshold|geçme eşiği)\b/i;
const PRODUCER_CONTEXT = /(conversation|chat log|sohbet|producer'?s? (notes|reasoning)|üreticinin (notları|gerekçesi|düşünce))/i;

export function lintCreativeQA(md, { producedBy, legacy = false } = {}) {
  const errors = [];
  const ratingRe = legacy ? QA_RATINGS_LEGACY : QA_RATINGS;
  if (!legacy) {
    const inputs = header(md, 'inputs');
    if (!inputs) errors.push('QA must list its input package (inputs:) — canonical artifacts, canon, evidence only');
    else if (!/[\w-]+\/[\w./-]+\.(md|csv)/.test(inputs) || PRODUCER_CONTEXT.test(inputs)) errors.push('QA inputs must be repository artifacts only (no producer conversation/reasoning)');
  }
  if (QA_NUMERIC.test(norm(md).replace(/^>.*$/gm, ''))) errors.push('numeric/composite score or threshold found in QA');
  const author = header(md, 'author');
  const evaluator = header(md, 'evaluator');
  if (!author || !evaluator) errors.push('QA must state author and evaluator');
  if (author && evaluator && author.toLowerCase() === evaluator.toLowerCase()) errors.push('evaluator is the author (self-QA not allowed)');
  if (producedBy && evaluator && evaluator.toLowerCase().includes(producedBy.toLowerCase())) errors.push('evaluator is the producing session');
  const sections = {};
  let cur = null;
  for (const line of norm(md).split('\n')) {
    const h = line.match(/^###\s+(.+)$/);
    if (h) { cur = h[1].trim(); sections[cur] = {}; continue; }
    if (/^##\s/.test(line)) cur = null;
    const f = cur && line.match(/^- \*\*(Rating|Reason):\*\*\s*(.*)$/);
    if (f) sections[cur][f[1]] = f[2].trim();
  }
  const weak = [];
  const blockers = [];
  for (const a of QA_AREAS) {
    const s = sections[a];
    if (!s) { errors.push(`missing area: ${a}`); continue; }
    if (!ratingRe.test(s.Rating || '')) errors.push(`${a}: rating must be ${legacy ? 'STRONG | OK | WEAK | MISSING' : 'PASS | CONCERN | BLOCKER'} (qualitative, no score)`);
    if (words(s.Reason).length < 8) errors.push(`${a}: reason too thin`);
    if (/^(WEAK|MISSING|CONCERN|BLOCKER)/.test(s.Rating || '')) weak.push(a);
    if (/^BLOCKER/.test(s.Rating || '')) blockers.push(a);
  }
  const verdict = (norm(md).match(/^- \*\*Verdict:\*\*\s*(\S+)/m) || [])[1] || '';
  if (!/^(PASS|REVISE|BLOCKED)$/.test(verdict)) errors.push(`verdict must be PASS | REVISE | BLOCKED, got "${verdict}"`);
  if (verdict === 'PASS' && blockers.length) errors.push(`PASS with BLOCKER areas: ${blockers.join(', ')}`);
  if (verdict === 'PASS' && legacy && weak.length) errors.push(`PASS with WEAK/MISSING areas: ${weak.join(', ')}`);
  if (verdict === 'PASS' && !legacy && weak.length) {
    const accepted = (norm(md).split('- **Accepted concerns:**')[1] || '').trim();
    if (words(accepted).length < 8) errors.push(`PASS with CONCERN areas needs written "Accepted concerns" (${weak.join(', ')})`);
  }
  const changes = (norm(md).split('- **Required changes:**')[1] || '').trim();
  if (verdict === 'REVISE' && words(changes).length < 10) errors.push('REVISE must list concrete required changes');
  return errors;
}
