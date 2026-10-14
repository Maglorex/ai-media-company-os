// The Industrial Casebook creative production pipeline (D-046) — testler.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, read, exists, parseTable } from '../lib/records.mjs';
import { lintStoryViability, lintBeatSheet, lintScenePlan, lintCreativeQA, header } from '../lib/pipeline.mjs';

const PIPE = 'channels/the-industrial-casebook/pipeline';
const DR = 'channels/the-industrial-casebook/cases/VID-001/dry-run-v2';
const SUPERSEDED = ['documentary-virality-gate', 'documentary-visual-plan', 'documentary-edit-plan', 'source-to-visual', 'documentary-visual-storytelling'];
const ACTIVE_PIPELINE = ['story-viability', 'documentary-packaging', 'documentary-creative-treatment', 'documentary-script', 'production-scene-plan', 'creative-qa'];

const sp = (fields) => `### SP-01 — x\n${Object.entries(fields).map(([k, v]) => `- **${k}:** ${v}`).join('\n')}\n`;
const GOOD_SP = {
  Beat: 'B-02', 'Story Function': 'BRING EVIDENCE', Claim: 'GAO found about $2M more than the average subsidy.', 'Evidence Anchor': 'C-04, Q-01',
  'Presentation Visual': 'The report opens like a case file and the sentence is lifted into an open comparison gap',
  'Visual Idea': 'The cover opens, the camera reaches the sentence, the phrase detaches and settles between two labels as an open bracket that stays on screen',
  'Motion / Spatial Behaviour': 'reveal and transformation', 'Transition Logic': 'The bracket becomes the next scene\'s shape',
  'Sound Role': 'Silence on the question', 'UI Role': 'highlight', 'Rights / Asset Readiness': 'V-02 public domain — READY',
  'Anti-PowerPoint': 'A slide would show the sentence; here finding it becomes the open question the viewer wants closed',
  Tool: 'After Effects — bespoke file-opening',
};

test('pipeline belgesi ve yeni skill/agent mevcut; kanal canon\'una bağlı', () => {
  assert.ok(exists(`${PIPE}/README.md`) && exists(`${PIPE}/consolidation-map.md`));
  for (const s of ACTIVE_PIPELINE) {
    const t = read(`.claude/skills/${s}/SKILL.md`);
    assert.ok(t.includes('D-045') || t.includes('canon'), `${s} must defer to the channel canon`);
    assert.ok(t.includes('D-046') || t.includes('pipeline/README.md'), `${s} must point to the pipeline`);
  }
  assert.ok(exists('.claude/agents/creative-qa-evaluator.md'));
  assert.ok(read('CLAUDE.md').includes('channels/the-industrial-casebook/pipeline/README.md'));
});

test('eski skill\'ler SUPERSEDED (silinmedi) ve yerleri gösteriliyor', () => {
  for (const s of SUPERSEDED) {
    const t = read(`.claude/skills/${s}/SKILL.md`);
    const desc = t.split('\n').find((l) => l.startsWith('description:'));
    assert.match(desc, /^description: "SUPERSEDED \(D-046\)/, `${s}: description must start with SUPERSEDED`);
    assert.match(t, /> \*\*SUPERSEDED — 2026-10-14 \(D-046/, `${s}: body banner missing`);
  }
});

test('skill/agent frontmatter açıklamaları geçerli YAML (tırnaksız değerde ": " yok)', () => {
  const files = [
    ...readdirSync(join(ROOT, '.claude/skills')).map((d) => `.claude/skills/${d}/SKILL.md`),
    ...readdirSync(join(ROOT, '.claude/agents')).map((f) => `.claude/agents/${f}`),
  ];
  const bad = [];
  for (const f of files) {
    const fm = read(f).match(/^---\n([\s\S]*?)\n---/);
    for (const l of (fm ? fm[1] : '').split('\n')) {
      const m = l.match(/^(\w+):\s*(.*)$/);
      if (!m || ['paths'].includes(m[1])) continue;
      const v = m[2];
      if (v && !/^["']/.test(v) && /:\s/.test(v)) bad.push(`${f} (${m[1]})`);
    }
  }
  assert.deepEqual(bad, []);
});

test('konsolidasyon haritası: her eski davranışın yeni yeri kanıtlı', () => {
  const rows = parseTable(read(`${PIPE}/consolidation-map.md`), '## Eşleme');
  assert.ok(rows.length >= 25);
  const pool = ['.claude/skills/production-scene-plan/SKILL.md', `${PIPE}/README.md`].map(read).join('\n');
  for (const r of rows) {
    const phrase = r['Kanıt ifadesi'];
    const path = (r['Yeni yer'].match(/`([^`]+\.md)`/) || [])[1];
    const target = path ? read(path) : pool;
    assert.ok(target.includes(phrase), `${r['Eski skill']} / ${r['Davranış']}: phrase not found → "${phrase}"`);
  }
  for (const s of SUPERSEDED) assert.ok(rows.some((r) => r['Eski skill'].startsWith(s)), `${s} not mapped`);
});

test('Founder\'ın 7 kötü kararı pipeline\'da REJECT', () => {
  const rows = parseTable(read(`${PIPE}/README.md`), '## 7. Reddedilen kararlar');
  for (const q of ['"Belgeyi bulduk, ekranda gösterelim yeter."', '"Visual plan\'a asset dosya adlarını yazmak yeterli."', '"Script lock olduysa hikâye problemi bile değiştirilemez."',
    '"Her beat\'e motion ekleyelim."', '"En pahalı 3D çözüm her zaman daha iyidir."', '"AI en son çaredir."', '"Production agent kendi işine creative PASS verebilir."']) {
    const row = rows.find((r) => r['Kötü karar'] === q);
    assert.ok(row, `missing: ${q}`);
    assert.equal(row['Sonuç'], 'REJECT');
  }
});

test('lint: kötü kararlar makine tarafından da reddediliyor', () => {
  assert.deepEqual(lintScenePlan(sp(GOOD_SP)), []);
  // belge gösterildi, sahne fikri yok
  assert.ok(lintScenePlan(sp({ ...GOOD_SP, 'Presentation Visual': 'V-02 full screen', 'Anti-PowerPoint': 'shown' })).length >= 2);
  // asset dosya adı yeterli sanıldı
  assert.ok(lintScenePlan(sp({ ...GOOD_SP, 'Presentation Visual': 'photo123.jpg, V-05', 'Visual Idea': 'photo123.jpg' })).some((e) => /asset reference/.test(e)));
  // her beat'e amaçsız motion
  assert.ok(lintScenePlan(sp({ ...GOOD_SP, 'Motion / Spatial Behaviour': 'slow zoom so it keeps moving' })).some((e) => /motion must state/.test(e)));
  // hakkı belirsiz asset
  assert.ok(lintScenePlan(sp({ ...GOOD_SP, 'Rights / Asset Readiness': 'V-20 UNKNOWN_RIGHTS — READY' })).some((e) => /HARD/.test(e)));
  // alan eksik
  const { 'Sound Role': _s, ...missing } = GOOD_SP;
  assert.ok(lintScenePlan(sp(missing)).some((e) => /missing Sound Role/.test(e)));
});

test('lint: story viability puan üretmez, sözel karar verir', () => {
  const base = ['Why viewers care', 'Central question', 'Real packaging promise', 'Evidence sufficiency', 'Visual opportunity', 'Differentiation', 'Feasibility', 'Recommendation', 'Biggest risk', 'What would change this verdict']
    .map((k) => `- **${k}:** ${k === 'Central question' ? 'Why did it cost more?' : 'text here'}`).join('\n');
  assert.deepEqual(lintStoryViability(`${base}\n- **Verdict:** PURSUE`), []);
  assert.ok(lintStoryViability(`${base}\n- **Verdict:** PURSUE (score 78/100)`).some((e) => /pseudo-score/.test(e)));
  assert.ok(lintStoryViability(`${base}\n- **Verdict:** READY FOR PILOT`).some((e) => /PURSUE \| REVISE \| KILL/.test(e)));
});

test('lint: beat "bu bilgi doğru" diye screen time kazanmaz', () => {
  const beat = (id, fn) => `### ${id} — x\n- **Story Function:** ${fn}\n- **Viewer Question / Curiosity State:** q\n- **Claim:** c\n- **Evidence Anchor:** C-04\n- **Payoff / Next Question:** p\n- **Earns screen time because:** it changes what the viewer expects next\n`;
  assert.deepEqual(lintBeatSheet(beat('B-01', 'NEW CURIOSITY') + beat('B-02', 'BRING EVIDENCE') + beat('B-03', 'PAYOFF')), []);
  assert.ok(lintBeatSheet(beat('B-01', 'context') + beat('B-02', 'BRING EVIDENCE') + beat('B-03', 'PAYOFF')).some((e) => /story function/i.test(e)));
});

test('lint: üreten oturum kendi işine creative PASS veremez; REVISE gerekçe ister', () => {
  const areas = ['Central question strength', 'Narrative curiosity', 'Visual curiosity', 'Audiovisual momentum plan', 'Story progression', 'Evidence clarity', 'Anti-PowerPoint', 'CASE identity', 'Payoff'];
  const body = (rating) => areas.map((a) => `### ${a}\n- **Rating:** ${rating}\n- **Reason:** this area was checked against the canon with specific beat references\n`).join('');
  const qa = (author, evaluator, rating, verdict, changes = '') => `> author: ${author} · evaluator: ${evaluator} · date: x\n## Areas\n${body(rating)}## Verdict\n- **Verdict:** ${verdict}\n- **Required changes:** ${changes}\n`;
  assert.deepEqual(lintCreativeQA(qa('COO main session', 'creative-qa-evaluator', 'OK', 'PASS')), []);
  assert.ok(lintCreativeQA(qa('COO main session', 'COO main session', 'OK', 'PASS')).some((e) => /self-QA/.test(e)));
  assert.ok(lintCreativeQA(qa('production agent', 'creative-qa-evaluator', 'OK', 'PASS'), { producedBy: 'creative-qa-evaluator' }).some((e) => /producing session/.test(e)));
  assert.ok(lintCreativeQA(qa('COO', 'evaluator', 'WEAK', 'PASS')).some((e) => /PASS with WEAK/.test(e)));
  assert.ok(lintCreativeQA(qa('COO', 'evaluator', 'WEAK', 'REVISE', 'fix it')).some((e) => /concrete required changes/.test(e)));
});

test('P3 dry-run: pipeline gerçek case\'te çalıştı (lint temiz, QA bağımsız ve döngü işledi)', () => {
  assert.deepEqual(lintStoryViability(read(`${DR}/01-story-viability.md`)), []);
  assert.deepEqual(lintBeatSheet(read(`${DR}/03-beat-sheet-v2.md`)), []);
  assert.deepEqual(lintScenePlan(read(`${DR}/05-scene-plan-v2.md`)), []);
  const author = header(read(`${DR}/05-scene-plan-v2.md`), 'author');
  const ev = [];
  for (const f of ['06-creative-qa-v1.md', '06-creative-qa-v2.md']) {
    const qa = read(`${DR}/${f}`);
    assert.deepEqual(lintCreativeQA(qa, { producedBy: 'COO main session' }), [], f);
    assert.equal(header(qa, 'author'), author);
    ev.push(header(qa, 'evaluator'));
  }
  assert.notEqual(ev[0], ev[1], 'QA v2 must be a different evaluator');
  const pkg = read(`${DR}/02-packaging-hypothesis.md`);
  for (const f of ['Title hypothesis', 'Thumbnail hypothesis', 'Viewer promise', 'Central curiosity gap']) assert.ok(pkg.includes(`**${f}:**`), f);
  const plan = read(`${DR}/05-scene-plan-v2.md`);
  assert.match(plan, /bespoke/i, 'at least one bespoke animation opportunity');
  assert.match(plan, /Evidence Pull/, 'document beat transformed, not just shown');
});
