// The Industrial Casebook channel canon (D-045) — kanal kapsamı testleri.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, read, exists, parseTable, parseCsv } from '../lib/records.mjs';
import { deriveLayer, applies, resolve } from '../lib/precedence.mjs';

const CH = 'channel:the-industrial-casebook';
const DIR = 'channels/the-industrial-casebook/canon';
const canonFiles = readdirSync(join(ROOT, DIR)).filter((f) => f.endsWith('.md')).sort();
const rules = parseTable(read(`${DIR}/07-rule-register.md`), '## Kurallar');
const ruleIds = new Set(rules.map((r) => r.ID));
const registry = parseCsv(read('company/state/artifact-registry.csv'));
const NUMERIC_TARGET = /\d+\s*(%|sn\b|saniye|sec\b|seconds)|%\s*\d/i;

test('canon dosyaları mevcut ve registry\'de ACTIVE, kanal kapsamında', () => {
  for (const f of ['README.md', '01-viewer-promise.md', '02-ideas-growth-packaging.md', '03-opening-and-case-intro.md', '04-visual-storytelling.md',
    '05-editorial-motion-and-cinematography.md', '06-prototype-and-calibration.md', '07-rule-register.md', '08-rejected-decisions.md', '09-v1-source-map.md']) {
    assert.ok(canonFiles.includes(f), `missing canon file ${f}`);
  }
  for (const f of canonFiles) {
    const row = registry.find((a) => a.path === `${DIR}/${f}`);
    assert.ok(row, `unregistered canon file ${f}`);
    assert.equal(row.status, 'ACTIVE');
    assert.equal(row.scope, CH);
  }
});

test('kural kaydı: TIC-01… sıralı, kanal kapsamlı, geçerli sınıf, katman türetmesi tutarlı', () => {
  rules.forEach((r, i) => assert.equal(r.ID, `TIC-${String(i + 1).padStart(2, '0')}`));
  for (const r of rules) {
    assert.equal(r.Kapsam, CH, `${r.ID} scope`);
    assert.ok(['—', 'HARD', 'HEURISTIC', 'EXPERIMENT', 'DIAGNOSTIC'].includes(r['Sınıf']), `${r.ID} class ${r['Sınıf']}`);
    assert.equal(r.Katman, deriveLayer({ type: 'RULE', scope: r.Kapsam, class: r['Sınıf'] === '—' ? undefined : r['Sınıf'] }), `${r.ID} layer`);
    for (const ref of r.Canon.match(/`(\d\d|README)`/g) || []) {
      const key = ref.replace(/`/g, '');
      assert.ok(canonFiles.some((f) => f.startsWith(key)), `${r.ID} points to missing canon section ${key}`);
    }
  }
});

test('kanal canon\'u HARD üretmez: HARD satırları şirket kaynağına dayanır', () => {
  for (const r of rules.filter((x) => x['Sınıf'] === 'HARD')) {
    assert.match(r.Kaynak, /\.claude\/rules\/|company\/charter\.md|production\/rights\//, `${r.ID} HARD must cite a company source`);
  }
});

test('sabit yüzde/saniye/oran bağlayıcı kural olamaz (TIC-29)', () => {
  for (const r of rules.filter((x) => x['Sınıf'] === '—' || x['Sınıf'] === 'HARD')) {
    assert.ok(!NUMERIC_TARGET.test(r.Kural), `${r.ID} binding rule contains a numeric target`);
  }
  for (const f of ['README.md', '01-viewer-promise.md', '02-ideas-growth-packaging.md', '03-opening-and-case-intro.md', '04-visual-storytelling.md',
    '05-editorial-motion-and-cinematography.md', '06-prototype-and-calibration.md']) {
    const hit = read(`${DIR}/${f}`).split('\n').find((l) => NUMERIC_TARGET.test(l));
    assert.equal(hit, undefined, `${f}: numeric target in canon prose`);
  }
});

test('her kural canon bölümlerinde anılıyor', () => {
  const prose = canonFiles.filter((f) => !['07-rule-register.md'].includes(f)).map((f) => read(`${DIR}/${f}`)).join('\n');
  for (const id of ruleIds) assert.ok(prose.includes(id), `${id} not referenced in any canon section`);
});

test('Founder\'ın kötü kararları REJECT ediliyor ve bağlayıcı/HARD bir kurala dayanıyor', () => {
  const rows = parseTable(read(`${DIR}/08-rejected-decisions.md`), '## Reddedilenler');
  const required = [
    "\"Gerçek fotoğraf bulduk, visualization'a gerek yok.\"",
    '"Her videoda archive %55 olsun."',
    '"Her videonun ilk 7 saniyesi aynı formül olsun."',
    '"CASE LABEL zaten intro."',
    '"AI kullanıldıysa evidence sayılır."',
    '"Video güzel görünüyorsa story zayıf olabilir."',
  ];
  for (const q of required) {
    const row = rows.find((r) => r['Kötü karar'] === q);
    assert.ok(row, `missing rejection: ${q}`);
    assert.equal(row['Sonuç'], 'REJECT');
    const ids = row.Kural.match(/TIC-\d\d/g) || [];
    assert.ok(ids.length > 0 && ids.every((id) => ruleIds.has(id)), `${q}: unknown rule`);
    assert.ok(ids.some((id) => ['—', 'HARD'].includes(rules.find((r) => r.ID === id)['Sınıf'])), `${q}: needs a binding or HARD rule`);
  }
});

test('kabul soruları canon\'da cevaplanıyor (13 soru → mevcut bölüm)', () => {
  const rows = parseTable(read(`${DIR}/README.md`), '## Kabul soruları → nerede cevaplanır');
  assert.equal(rows.length, 13);
  for (const r of rows) {
    const key = (r['Bölüm'].match(/`(\d\d)`/) || [])[1];
    if (key) assert.ok(canonFiles.some((f) => f.startsWith(key)), `missing section ${key}`);
  }
});

test('canon başka kanala uygulanmaz; şirket katmanının altında kalır', () => {
  const canonRule = { id: 'TIC-11', type: 'RULE', scope: CH };
  assert.equal(applies(canonRule, { channel: 'another-channel' }), false);
  assert.equal(resolve([canonRule], { channel: 'another-channel' }).result, 'NO_APPLICABLE_RULE');
  const companyHard = { id: 'EVIDENCE-HARD', type: 'RULE', scope: 'company', class: 'HARD' };
  assert.equal(resolve([canonRule, companyHard], { channel: 'the-industrial-casebook' }).winner.id, 'EVIDENCE-HARD');
  assert.match(read(`${DIR}/README.md`), /Başka kanal bu canon'u devralmaz/);
});

test('eski kanal kaynakları canon\'a devredildi (SUPERSEDED/HISTORICAL/yükleyici)', () => {
  const st = (id) => registry.find((a) => a.artifact_id === id);
  assert.equal(st('CH-TIC-V1-PROCEDURES').status, 'SUPERSEDED');
  assert.equal(st('CH-TIC-V1-PROCEDURES').superseded_by, 'CH-TIC-CANON');
  assert.equal(st('CH-TIC-IDENT-V1').status, 'SUPERSEDED');
  assert.notEqual(st('CH-TIC-DOCTRINE-V1').status, 'ACTIVE');
  assert.notEqual(st('CH-TIC-BENCHMARKS-V01').status, 'ACTIVE');
  for (const f of ['.claude/rules/documentary-creative-standards.md', '.claude/rules/brand-and-visual-system.md']) {
    const t = read(f);
    assert.ok(t.includes('channels/the-industrial-casebook/canon/'), `${f} must load the canon`);
    assert.ok(!NUMERIC_TARGET.test(t) && !/Prototype kapısı/i.test(t), `${f} must not carry v1 rules`);
  }
  assert.match(read('channels/the-industrial-casebook/v1-procedures.md'), /^> \*\*SUPERSEDED/);
  assert.ok(read('CLAUDE.md').includes('channels/the-industrial-casebook/canon/README.md'));
  assert.ok(!read('CLAUDE.md').includes('v1-procedures.md'));
});

test('prosedür skill\'leri canon\'a tabi olduğunu söylüyor', () => {
  for (const f of ['.claude/skills/source-to-visual/SKILL.md', '.claude/skills/documentary-visual-storytelling/SKILL.md', '.claude/skills/muted-preview-gate/SKILL.md',
    '.claude/skills/documentary-creative-treatment/SKILL.md', '.claude/skills/documentary-virality-gate/SKILL.md', '.claude/skills/growth-idea-scoring/SKILL.md',
    '.claude/agents/documentary-creative-director.md']) {
    assert.ok(read(f).includes('D-045'), `${f} must point to the channel canon`);
  }
  assert.ok(exists('channels/the-industrial-casebook/canon/README.md'));
});

test('karar kaydı: D-045 kanal kapsamında aktif; D-029 ve D-034 canon\'a devredildi', () => {
  const md = read('company/state/active-decisions.md');
  const act = parseTable(md, '## Aktif kararlar');
  const ina = parseTable(md, '## Aktif olmayan kararlar (yalnız tarih)');
  assert.equal(act.find((r) => r.ID === 'D-045')?.Kapsam, CH);
  for (const id of ['D-029', 'D-034']) assert.ok(/D-045/.test(ina.find((r) => r.ID === id)?.Yerine || ''), `${id} replaced by D-045`);
});

test('eski talimatlar canon\'u geçersiz kılamaz: videoya özel ident zorunluluğu ve bağlayıcı muted gate yok', () => {
  const files = ['.claude/skills/documentary-production-handoff/SKILL.md', '.claude/skills/documentary-production-handoff/TEMPLATE.md',
    '.claude/agents/documentary-creative-director.md', '.claude/skills/muted-preview-gate/SKILL.md', '.claude/skills/documentary-creative-treatment/SKILL.md',
    '.claude/skills/documentary-visual-storytelling/SKILL.md'];
  const bad = [/Dynamic Case Ident \(D-034\)/, /boş ident alanı = eksik handoff/, /ident render'ı videoya özel/, /her video için ident concept/i,
    /\(bağlayıcı, D-032\)/, /REVISE ise Founder'a gitmez/, /Bağlayıcı taban/, /≤ ~6 sn/, /prototype QA'sında zorunlu/];
  const hits = [];
  for (const f of files) for (const b of bad) if (b.test(read(f))) hits.push(`${f} ~ ${b}`);
  assert.deepEqual(hits, []);
});

test('kanal kapsamlı SUPERSEDED/HISTORICAL belgeler dosya içinde de işaretli', () => {
  const rows = registry.filter((a) => a.scope === CH && ['SUPERSEDED', 'HISTORICAL'].includes(a.status) && a.path.endsWith('.md'));
  assert.ok(rows.length >= 4);
  for (const a of rows) {
    const head = read(a.path).split('\n').slice(0, 6).join('\n');
    assert.match(head, /SUPERSEDED|HISTORICAL/, `${a.path}: in-file marker missing`);
  }
  assert.match(read('intelligence/creative/brand/brand-system-v1.md'), /## C\. Intro \/ ident — SUPERSEDED/);
});
