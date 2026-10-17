// The Industrial Casebook creative production pipeline (D-046) — testler.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, read, exists, parseTable } from '../lib/records.mjs';
import { lintStoryViability, lintBeatSheet, lintScenePlan, lintCreativeQA, header, readinessErrors, productionBlockers } from '../lib/pipeline.mjs';

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
  // hakkı çözülmemiş kaynak READY gibi sunuluyor
  assert.ok(lintScenePlan(sp({ ...GOOD_SP, 'Rights / Asset Readiness': 'V-20 UNKNOWN_RIGHTS — READY' })).some((e) => /presented as READY/.test(e)));
  // alan eksik
  const { 'Sound Role': _s, ...missing } = GOOD_SP;
  assert.ok(lintScenePlan(sp(missing)).some((e) => /missing Sound Role/.test(e)));
});

test('lint: story viability puan üretmez, sözel karar verir', () => {
  const base = ['Why viewers care', 'Central question', 'Real packaging promise', 'Evidence sufficiency', 'Visual opportunity', 'Differentiation', 'Feasibility', 'Recommendation', 'Biggest risk', 'What would change this verdict']
    .map((k) => `- **${k}:** ${k === 'Central question' ? 'Why did it cost more?' : k === 'Evidence sufficiency' ? 'Ledger C-04, Q-01' : 'text here'}`).join('\n');
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
  const qa = (author, evaluator, rating, verdict, changes = '', inputs = 'channels/the-industrial-casebook/cases/VID-001/dry-run-v2/05-scene-plan-v2.md, channels/the-industrial-casebook/canon/README.md') => `> author: ${author} · evaluator: ${evaluator} · date: x · inputs: ${inputs}\n## Areas\n${body(rating)}## Verdict\n- **Verdict:** ${verdict}\n- **Required changes:** ${changes}\n`;
  assert.deepEqual(lintCreativeQA(qa('COO main session', 'creative-qa-evaluator', 'PASS', 'PASS')), []);
  assert.ok(lintCreativeQA(qa('COO main session', 'COO main session', 'PASS', 'PASS')).some((e) => /self-QA/.test(e)));
  assert.ok(lintCreativeQA(qa('production agent', 'creative-qa-evaluator', 'PASS', 'PASS'), { producedBy: 'creative-qa-evaluator' }).some((e) => /producing session/.test(e)));
  assert.ok(lintCreativeQA(qa('COO', 'evaluator', 'BLOCKER', 'PASS')).some((e) => /PASS with BLOCKER/.test(e)));
  assert.ok(lintCreativeQA(qa('COO', 'evaluator', 'CONCERN', 'REVISE', 'fix it')).some((e) => /concrete required changes/.test(e)));
});

test('P3 dry-run: pipeline gerçek case\'te çalıştı (lint temiz, QA bağımsız ve döngü işledi)', () => {
  assert.deepEqual(lintStoryViability(read(`${DR}/01-story-viability.md`)), []);
  assert.deepEqual(lintBeatSheet(read(`${DR}/03-beat-sheet-v2.md`)), []);
  assert.deepEqual(lintScenePlan(read(`${DR}/05-scene-plan-v2.md`)), []);
  const author = header(read(`${DR}/05-scene-plan-v2.md`), 'author');
  const ev = [];
  for (const f of ['06-creative-qa-v1.md', '06-creative-qa-v2.md']) {
    const qa = read(`${DR}/${f}`);
    assert.deepEqual(lintCreativeQA(qa, { producedBy: 'COO main session', legacy: true }), [], f);
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

// ---- Stage 3 acceptance düzeltmeleri (Founder 2026-10-14) ----

test('acceptance: yaratıcı planlama asset/hak hazırlığına mahkûm değil; durum açık olmalı', () => {
  const strongIdea = { ...GOOD_SP, 'Rights / Asset Readiness': 'archival newsreel of the ship leaving port (to be located at NARA) — NEEDS_SOURCE; V-20 photo, rights UNKNOWN_RIGHTS (licence proof missing) — NEEDS_RIGHTS; own graphic — TO_PRODUCE' };
  assert.deepEqual(lintScenePlan(sp(strongIdea)), [], 'explicit NEEDS_SOURCE / NEEDS_RIGHTS must not reject a creative scene');
  assert.ok(readinessErrors('V-05 public domain').some((e) => /readiness not stated/.test(e)), 'unstated readiness');
  assert.ok(readinessErrors('V-19 — READY').some((e) => /rights status hidden/.test(e)), 'hidden rights');
  assert.ok(readinessErrors('V-20 UNKNOWN_RIGHTS — READY').some((e) => /presented as READY/.test(e)), 'unresolved rights shown as real/ready');
  assert.ok(readinessErrors('V-21 REJECTED — NEEDS_RIGHTS').some((e) => /rejected asset/.test(e)), 'rejected asset');
  assert.ok(readinessErrors('V-05 public domain — READY or NEEDS_SOURCE').some((e) => /ambiguous/.test(e)), 'ambiguous readiness');
  assert.ok(readinessErrors('a newsreel we might find — MISSING').length === 0);
});

test('acceptance: HARD STOP Stage 4 handoff\'ta (çözülmemiş hak / eksik asset Strong PC\'ye gidemez)', () => {
  const plan = sp({ ...GOOD_SP, 'Rights / Asset Readiness': 'V-02 public domain — READY; newsreel — NEEDS_SOURCE; V-20 UNKNOWN_RIGHTS — NEEDS_RIGHTS; diagram — MISSING; own graphic — TO_PRODUCE' });
  const blockers = productionBlockers(plan);
  assert.equal(blockers.length, 3, blockers.join(' | '));
  assert.deepEqual(productionBlockers(sp(GOOD_SP)), []);
  const t = read('channels/the-industrial-casebook/pipeline/README.md');
  assert.match(t, /HARD STOP Stage 4 handoff'tadır/);
});

test('acceptance: Creative QA nitel — skor, ağırlık veya sabit PASS eşiği yok', () => {
  const areas = ['Central question strength', 'Narrative curiosity', 'Visual curiosity', 'Audiovisual momentum plan', 'Story progression', 'Evidence clarity', 'Anti-PowerPoint', 'CASE identity', 'Payoff'];
  const doc = (rating, extra = '', verdictBlock = '- **Verdict:** PASS\n- **Accepted concerns:** none\n- **Required changes:** none') =>
    `> author: COO main session · evaluator: creative-qa-evaluator · date: x · inputs: channels/the-industrial-casebook/cases/VID-001/dry-run-v2/05-scene-plan-v2.md\n## Areas\n${areas.map((a) => `### ${a}\n- **Rating:** ${rating}\n- **Reason:** this area was checked against the canon with specific beat references ${extra}\n`).join('')}## Verdict\n${verdictBlock}\n`;
  assert.deepEqual(lintCreativeQA(doc('PASS')), []);
  assert.ok(lintCreativeQA(doc('PASS', '— overall 84/100')).some((e) => /numeric\/composite score/.test(e)), '84/100 proxy');
  assert.ok(lintCreativeQA(doc('PASS', '— weighted score 4.2')).some((e) => /numeric\/composite score/.test(e)), 'weighted score');
  assert.ok(lintCreativeQA(doc('8')).some((e) => /qualitative, no score/.test(e)), 'numeric rating');
  assert.ok(lintCreativeQA(doc('STRONG')).some((e) => /PASS \| CONCERN \| BLOCKER/.test(e)), 'legacy labels only for historical reports');
  assert.ok(lintCreativeQA(doc('CONCERN', '', '- **Verdict:** PASS\n- **Accepted concerns:** none\n- **Required changes:** none')).some((e) => /Accepted concerns/.test(e)));
  assert.ok(!/STRONG \| OK \| WEAK \| MISSING/.test(read('.claude/skills/creative-qa/TEMPLATE.md')));
  assert.match(read('.claude/skills/creative-qa/SKILL.md'), /Toplam puan, ağırlıklı skor veya sabit PASS eşiği \*\*yoktur\*\*/);
});

test('acceptance: Story Viability kanıt yoksa güven uydurmaz (repo-only epistemik test)', () => {
  const sv = (evidence, verdict) => ['Why viewers care', 'Central question', 'Real packaging promise', 'Evidence sufficiency', 'Visual opportunity', 'Differentiation', 'Feasibility', 'Recommendation', 'Biggest risk', 'What would change this verdict']
    .map((k) => `- **${k}:** ${k === 'Central question' ? 'Why was Concorde barred from landing in New York in 1977?' : k === 'Evidence sufficiency' ? evidence : 'text here'}`).join('\n') + `\n- **Verdict:** ${verdict}`;
  const generalKnowledge = 'Well known from general knowledge: noise complaints and local opposition; no repository evidence.';
  assert.ok(lintStoryViability(sv(generalKnowledge, 'PURSUE')).some((e) => /PURSUE without repository evidence/.test(e)), 'general knowledge cannot justify PURSUE');
  assert.deepEqual(lintStoryViability(sv(generalKnowledge, 'REVISE — research/evidence required')), []);
  assert.ok(lintStoryViability(sv(generalKnowledge, 'REVISE')).some((e) => /research\/evidence required/.test(e)));
  assert.deepEqual(lintStoryViability(sv('Primary source in ledger: C-04, Q-01', 'PURSUE')), []);
  assert.deepEqual(lintStoryViability(sv('Research file `intelligence/market-research/2026-10-06-faz1-stage-a-sentez.md`', 'PURSUE')), []);
  assert.match(read('.claude/skills/story-viability/SKILL.md'), /REVISE — research\/evidence required/);
});

test('acceptance: bağımsız değerlendirici yalnız kanonik artifact paketini alır', () => {
  const agent = read('.claude/agents/creative-qa-evaluator.md');
  const tools = (agent.match(/^tools:\s*(.*)$/m) || [])[1] || '';
  assert.ok(!/\b(Bash|Agent|Edit|WebFetch|WebSearch)\b/.test(tools), `evaluator tools must stay read + report only: ${tools}`);
  assert.match(agent, /üreticinin sohbet gerekçesi sende yoktur/);
  assert.match(read('.claude/skills/creative-qa/SKILL.md'), /Girdi paketi \(yalnız kanonik\)/);
  assert.match(read('channels/the-industrial-casebook/pipeline/README.md'), /kanonik girdi paketi/);
  const base = (inputs) => `> author: COO main session · evaluator: creative-qa-evaluator · date: x · inputs: ${inputs}\n## Areas\n## Verdict\n- **Verdict:** PASS\n`;
  assert.ok(lintCreativeQA(base('summary from the producer conversation')).some((e) => /input package|repository artifacts only/.test(e)));
  assert.ok(lintCreativeQA(base('channels/x/05-scene-plan-v2.md, producer\'s reasoning notes')).some((e) => /repository artifacts only/.test(e)));
  assert.ok(lintCreativeQA('> author: a · evaluator: b · date: x\n').some((e) => /input package/.test(e)));
});

test('os kodunda görünmez kontrol karakteri yok (regex kaçış hatası koruması)', () => {
  const files = ['os/lib/pipeline.mjs', 'os/lib/precedence.mjs', 'os/lib/records.mjs', ...readdirSync(join(ROOT, 'os/tests')).filter((f) => f.endsWith('.mjs')).map((f) => `os/tests/${f}`)];
  const bad = files.filter((f) => /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(read(f)));
  assert.deepEqual(bad, []);
});
