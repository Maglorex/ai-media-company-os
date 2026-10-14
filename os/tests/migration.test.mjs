// OS v2 migration koruması: pre-v2-checkpoint'ten beri değişen dosyalar yalnız onaylı aşama kapsamında olabilir;
// KEEP alanları (veri ve araçlar) değişmez; hiçbir dosya silinmez. Tag yoksa (ör. tag'siz klon) test atlanır.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { git, read } from '../lib/records.mjs';

const BASE = 'pre-v2-checkpoint';
let hasBase = true;
try { git('rev-parse', '--verify', '--quiet', `${BASE}^{commit}`); } catch { hasBase = false; }

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
];
const MARKED_ONLY = ['intelligence/creative/brand/dynamic-case-ident-system.md', 'intelligence/creative/brand/brand-system-v1.md', 'intelligence/creative/brand/case-register.md',
  'intelligence/creative/brand/logo-banner-brief.md', 'intelligence/creative/documentary-style-benchmarks.md', 'intelligence/creative/doctrine/documentary-production-doctrine-v1.md'];
const KEEP_EXCEPTIONS = [/^channels\/the-industrial-casebook\/v1-procedures\.md$/, /^channels\/the-industrial-casebook\/canon\//, ...MARKED_ONLY.map((p) => new RegExp(`^${p.replace(/[.\/]/g, (c) => `\\${c}`)}$`))]; // CLAUDE.md'den taşınan v1 kanal metni (yeni dosya)
const KEEP = [/^production\//, /^finance\//, /^intelligence\//, /^channels\//, /^company\/(strategy|constraints|mission|goals|machines)\.md$/];

const changed = () => {
  const committed = git('diff', '--name-status', `${BASE}`, '--').split('\n').filter(Boolean);
  const untracked = git('ls-files', '--others', '--exclude-standard').split('\n').filter(Boolean).map((f) => `A\t${f}`);
  return [...committed, ...untracked].map((l) => { const [s, ...p] = l.split('\t'); return { status: s, path: p[p.length - 1] }; });
};

test('migration: hiçbir dosya silinmedi', { skip: !hasBase && 'pre-v2-checkpoint tag yok' }, () => {
  assert.deepEqual(changed().filter((c) => c.status.startsWith('D')).map((c) => c.path), []);
});

test('migration: KEEP alanları değişmedi', { skip: !hasBase && 'pre-v2-checkpoint tag yok' }, () => {
  assert.deepEqual(changed().filter((c) => KEEP.some((k) => k.test(c.path)) && !KEEP_EXCEPTIONS.some((e) => e.test(c.path))).map((c) => c.path), []);
});

test('migration: değişiklikler yalnız onaylı Stage 1–2 kapsamında', { skip: !hasBase && 'pre-v2-checkpoint tag yok' }, () => {
  const outside = changed().filter((c) => !STAGE1_ALLOWED.some((a) => a.test(c.path))).map((c) => c.path);
  assert.deepEqual(outside, []);
});

test('migration: decision-log ve lessons yalnız ekleme aldı (geçmiş yeniden yazılmadı)', { skip: !hasBase && 'pre-v2-checkpoint tag yok' }, () => {
  for (const f of ['company/decision-log.md', 'company/lessons.md']) {
    const before = git('show', `${BASE}:${f}`).trimEnd();
    assert.ok(read(f).startsWith(before), `${f}: existing content changed`);
  }
});

test('migration: işaretlenen eski kanal belgelerinde içerik korunuyor (yalnız işaret eklendi)', { skip: !hasBase && 'pre-v2-checkpoint tag yok' }, () => {
  for (const f of MARKED_ONLY) {
    const before = git('show', `${BASE}:${f}`).split('\n').map((l) => l.trimEnd()).filter(Boolean);
    const now = new Set(read(f).split('\n').map((l) => l.trimEnd()));
    const lost = before.filter((l) => !now.has(l));
    assert.ok(lost.length <= 1, `${f}: ${lost.length} original lines changed (only one marked header/heading allowed)`);
    assert.match(read(f), /SUPERSEDED|HISTORICAL/, `${f}: marker missing`);
  }
});
