// OS v2 migration koruması: kanonik Stage 0 checkpoint'ten beri değişen dosyalar yalnız onaylı aşama kapsamında olabilir;
// KEEP alanları (veri ve araçlar) değişmez; hiçbir dosya silinmez.
// Checkpoint commit SHA + tree ile doğrulanır (os/checkpoints.json): yerel `pre-v2-checkpoint` tag'i gerekmez, atlama yok —
// aynı remote branch'ten gelen temiz clone'da da çalışır. Tag'in tutarlılığı Main-PC-only testtedir (os/tests/main-pc/).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { git, read } from '../lib/records.mjs';
import { checkpoints, verifyCheckpoint } from '../lib/checkpoints.mjs';

const CP = checkpoints().pre_v2_checkpoint;
const BASE = CP.commit;

test("migration: kanonik checkpoint bu clone'da doğrulanıyor (SHA + tree, HEAD'in atası)", () => {
  assert.equal(CP.scope, 'shared');
  assert.deepEqual(verifyCheckpoint(CP), []);
});

// Stage 1 (D-042) onaylı kapsam. Yeni aşama onaylanınca bu liste o aşamanın kapsamıyla genişletilir.
const STAGE1_ALLOWED = [
  /^\.gitignore$/,
  /^CLAUDE\.md$/,
  /^os\//,
  /^company\/charter\.md$/,
  /^company\/state\//,
  /^company\/decision-log\.md$/,
  /^company\/lessons\.md$/,
  /^company\/backlog\.md$/,
  /^dashboards\/company\.md$/,
  /^\.claude\/rules\/(governance|git-and-secrets|founder-approval|evidence-and-research|self-repair-and-escalation|company-memory)\.md$/,
  /^\.claude\/skills\/(founder-interface|founder-brief|founder-help|session-close|system-health-check)\/SKILL\.md$/,
  /^\.claude\/agents\/analytics-analyst\.md$/,
  // Stage 1 acceptance düzeltmeleri (Founder 2026-10-14: prototype politikası D-043, kanal sızıntısı D-044)
  /^\.claude\/rules\/documentary-creative-standards\.md$/,
  /^\.claude\/skills\/(documentary-edit-plan|documentary-production-handoff|documentary-script|documentary-creative-treatment|video-launch-os|source-to-visual)\/SKILL\.md$/,
  /^channels\/the-industrial-casebook\/v1-procedures\.md$/,
  // Stage 2 — The Industrial Casebook channel canon (Founder 2026-10-14, D-045)
  /^channels\/the-industrial-casebook\/canon\//,
  /^\.claude\/rules\/brand-and-visual-system\.md$/,
  /^\.claude\/skills\/(documentary-visual-storytelling|muted-preview-gate|documentary-virality-gate|growth-idea-scoring)\/SKILL\.md$/,
  /^\.claude\/agents\/documentary-creative-director\.md$/,
  /^\.claude\/skills\/documentary-production-handoff\/TEMPLATE\.md$/,
  // Stage 2 — eski kanal belgelerine yalnız SUPERSEDED/HISTORICAL işareti (içerik korunur; aşağıdaki test doğrular)
  /^intelligence\/creative\/brand\/(dynamic-case-ident-system|brand-system-v1|case-register|logo-banner-brief)\.md$/,
  /^intelligence\/creative\/(documentary-style-benchmarks|doctrine\/documentary-production-doctrine-v1)\.md$/,
  // Stage 2 compatibility cleanup (Founder 2026-10-14): skill uyumu + eski kanal adı
  /^\.claude\/skills\/(documentary-packaging|documentary-music-sfx|documentary-voice-director)\/SKILL\.md$/,
  /^\.claude\/skills\/documentary-visual-storytelling\/VISUAL-LANGUAGE-LIBRARY\.md$/,
  // Stage 3 — creative production pipeline (Founder 2026-10-14, D-046)
  /^\.claude\/skills\/(story-viability|production-scene-plan|creative-qa)\//,
  /^\.claude\/skills\/documentary-visual-plan\/SKILL\.md$/,
  /^\.claude\/agents\/(creative-qa-evaluator|production-engineer|research-analyst)\.md$/,
  /^channels\/the-industrial-casebook\/(pipeline|cases)\//,
  // Stage 4 — factory interface: Handoff v2, Strong PC boot contract, asset manifest, rights hard-fail, CCR (Founder 2026-10-15, D-047)
  /^\.claude\/skills\/(documentary-production-handoff|strong-pc-preflight)\//,
  // Stage 5 — calibration design (Founder 2026-10-15): kanal kalibrasyon paketi
  /^channels\/the-industrial-casebook\/calibration\//,
  // Stage 5 — CAL-S5 kalibrasyon kodu (D-048): yalnız bu alt klasör
  /^production\/remotion\/src\/calibration\//,
  // Stage 5 — D-048 kalibrasyon kredi kullanımı (yalnız ekleme): usage ledger
  /^finance\/ledgers\/usage\.csv$/,
  // Gate 1B P1 taşınabilirlik düzeltmesi (Founder 2026-10-16): runtime için deterministik EOL + arşiv baytlarının korunması — yalnız bu tek dosya
  /^\.gitattributes$/,
];
const MARKED_ONLY = ['intelligence/creative/brand/dynamic-case-ident-system.md', 'intelligence/creative/brand/brand-system-v1.md', 'intelligence/creative/brand/case-register.md',
  'intelligence/creative/brand/logo-banner-brief.md', 'intelligence/creative/documentary-style-benchmarks.md', 'intelligence/creative/doctrine/documentary-production-doctrine-v1.md'];
const KEEP_EXCEPTIONS = [/^channels\/the-industrial-casebook\/v1-procedures\.md$/, /^channels\/the-industrial-casebook\/(canon|pipeline|cases|calibration)\//, /^production\/remotion\/src\/calibration\//, /^finance\/ledgers\/usage\.csv$/, ...MARKED_ONLY.map((p) => new RegExp(`^${p.replace(/[.\/]/g, (c) => `\\${c}`)}$`))]; // CLAUDE.md'den taşınan v1 kanal metni (yeni dosya)
const KEEP = [/^production\//, /^finance\//, /^intelligence\//, /^channels\//, /^company\/(strategy|constraints|mission|goals|machines)\.md$/];

const changed = () => {
  const committed = git('diff', '--name-status', `${BASE}`, '--').split('\n').filter(Boolean);
  const untracked = git('ls-files', '--others', '--exclude-standard').split('\n').filter(Boolean).map((f) => `A\t${f}`);
  return [...committed, ...untracked].map((l) => { const [s, ...p] = l.split('\t'); return { status: s, path: p[p.length - 1] }; });
};

test('migration: hiçbir dosya silinmedi', () => {
  assert.deepEqual(changed().filter((c) => c.status.startsWith('D')).map((c) => c.path), []);
});

test('migration: KEEP alanları değişmedi', () => {
  assert.deepEqual(changed().filter((c) => KEEP.some((k) => k.test(c.path)) && !KEEP_EXCEPTIONS.some((e) => e.test(c.path))).map((c) => c.path), []);
});

test('migration: değişiklikler yalnız onaylı Stage 1–4 kapsamında', () => {
  const outside = changed().filter((c) => !STAGE1_ALLOWED.some((a) => a.test(c.path))).map((c) => c.path);
  assert.deepEqual(outside, []);
});

test('migration: decision-log ve lessons yalnız ekleme aldı (geçmiş yeniden yazılmadı)', () => {
  for (const f of ['company/decision-log.md', 'company/lessons.md']) {
    const before = git('show', `${BASE}:${f}`).trimEnd();
    assert.ok(read(f).startsWith(before), `${f}: existing content changed`);
  }
});

// Gate 1B P1: etkin Git öznitelikleri (dosya metni değil). Canlı runtime her checkout'ta LF; arşiv kanıtı hiç EOL dönüşümü görmez
// (aksi halde Windows checkout'u arşivi CRLF'ye çevirir ve genesis'teki bayt SHA-256'sı tutmaz).
test('migration: runtime EOL öznitelikleri — canlı dosyalar text+eol=lf, arşiv -text ve eol belirtilmemiş', () => {
  const attrs = (p) => Object.fromEntries(git('check-attr', 'text', 'eol', '--', p).trim().split('\n').map((l) => l.split(': ').slice(1)));
  for (const p of ['company/state/runtime/events.jsonl', 'company/state/runtime/state.json', 'company/state/runtime/jobs/JOB-X.json', 'company/state/runtime/actions/ACT-X.json']) {
    assert.deepEqual(attrs(p), { text: 'set', eol: 'lf' }, p);
  }
  for (const p of ['company/state/runtime/archive/events-unversioned-2026-10-16.jsonl', 'company/state/runtime/archive/state-unversioned-2026-10-16.json']) {
    assert.deepEqual(attrs(p), { text: 'unset', eol: 'unspecified' }, p);
  }
});

test('migration: işaretlenen eski kanal belgelerinde içerik korunuyor (yalnız işaret eklendi)', () => {
  for (const f of MARKED_ONLY) {
    const before = git('show', `${BASE}:${f}`).split('\n').map((l) => l.trimEnd()).filter(Boolean);
    const now = new Set(read(f).split('\n').map((l) => l.trimEnd()));
    const lost = before.filter((l) => !now.has(l));
    // brand-system-v1: §C başlığı + iki doctrine atfı (film grameri → canon 05) bilinçli değişti
    const allowed = f.endsWith('brand-system-v1.md') ? 3 : 1;
    assert.ok(lost.length <= allowed, `${f}: ${lost.length} original lines changed (allowed ${allowed})`);
    assert.match(read(f), /SUPERSEDED|HISTORICAL/, `${f}: marker missing`);
  }
});
