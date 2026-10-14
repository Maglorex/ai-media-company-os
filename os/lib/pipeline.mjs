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
const PSEUDO_SCORE = /\b\d+\s*\/\s*\d+\b|\b(score|puan|toplam skor|weighted|ağırlıklı)\b|\d+\s*(puan|points?)\b/i;

export function lintStoryViability(md) {
  const errors = [];
  const need = ['Why viewers care', 'Central question', 'Real packaging promise', 'Evidence sufficiency', 'Visual opportunity', 'Differentiation', 'Feasibility', 'Verdict', 'Recommendation', 'Biggest risk', 'What would change this verdict'];
  const fields = {};
  for (const line of norm(md).split('\n')) { const f = line.match(/^- \*\*(.+?):\*\*\s*(.*)$/); if (f) fields[f[1].trim()] = f[2].trim(); }
  for (const n of need) if (!fields[n] || words(fields[n]).length < 1) errors.push(`missing field: ${n}`);
  if (fields.Verdict && !/^(PURSUE|REVISE|KILL)\b/.test(fields.Verdict)) errors.push(`verdict must be PURSUE | REVISE | KILL, got "${fields.Verdict}"`);
  if (PSEUDO_SCORE.test(norm(md).replace(/^>.*$/gm, ''))) errors.push('pseudo-score / total score found');
  if (fields['Central question'] && !/\?/.test(fields['Central question'])) errors.push('central question must be a question');
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
    const rights = b.fields['Rights / Asset Readiness'] || '';
    if (/UNKNOWN_RIGHTS|UNRESOLVED_RIGHTS|\bREJECTED\b/.test(rights) && !/not used|kullanılmaz/i.test(rights)) errors.push(`${b.id}: asset with unclear/rejected rights planned (HARD)`);
    if (rights && !/(READY|TO PRODUCE|TO FIND|BLOCKED)/.test(rights)) errors.push(`${b.id}: rights field needs readiness (READY / TO PRODUCE / TO FIND / BLOCKED)`);
    if (b.fields['Anti-PowerPoint'] && words(b.fields['Anti-PowerPoint']).length < 8) errors.push(`${b.id}: Anti-PowerPoint scene test not answered`);
  }
  return errors;
}

const QA_AREAS = ['Central question strength', 'Narrative curiosity', 'Visual curiosity', 'Audiovisual momentum plan', 'Story progression', 'Evidence clarity', 'Anti-PowerPoint', 'CASE identity', 'Payoff'];

export function lintCreativeQA(md, { producedBy } = {}) {
  const errors = [];
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
  for (const a of QA_AREAS) {
    const s = sections[a];
    if (!s) { errors.push(`missing area: ${a}`); continue; }
    if (!/^(STRONG|OK|WEAK|MISSING)\b/.test(s.Rating || '')) errors.push(`${a}: rating must be STRONG | OK | WEAK | MISSING`);
    if (words(s.Reason).length < 8) errors.push(`${a}: reason too thin`);
    if (/^(WEAK|MISSING)/.test(s.Rating || '')) weak.push(a);
  }
  const verdict = (norm(md).match(/^- \*\*Verdict:\*\*\s*(\S+)/m) || [])[1] || '';
  if (!/^(PASS|REVISE|BLOCKED)$/.test(verdict)) errors.push(`verdict must be PASS | REVISE | BLOCKED, got "${verdict}"`);
  if (verdict === 'PASS' && weak.length) errors.push(`PASS with WEAK/MISSING areas: ${weak.join(', ')}`);
  const changes = (norm(md).split('- **Required changes:**')[1] || '').trim();
  if (verdict === 'REVISE' && words(changes).length < 10) errors.push('REVISE must list concrete required changes');
  return errors;
}
