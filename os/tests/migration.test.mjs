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
];
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
  assert.deepEqual(changed().filter((c) => KEEP.some((k) => k.test(c.path))).map((c) => c.path), []);
});

test('migration: değişiklikler yalnız onaylı Stage 1 kapsamında', { skip: !hasBase && 'pre-v2-checkpoint tag yok' }, () => {
  const outside = changed().filter((c) => !STAGE1_ALLOWED.some((a) => a.test(c.path))).map((c) => c.path);
  assert.deepEqual(outside, []);
});

test('migration: decision-log ve lessons yalnız ekleme aldı (geçmiş yeniden yazılmadı)', { skip: !hasBase && 'pre-v2-checkpoint tag yok' }, () => {
  for (const f of ['company/decision-log.md', 'company/lessons.md']) {
    const before = git('show', `${BASE}:${f}`).trimEnd();
    assert.ok(read(f).startsWith(before), `${f}: existing content changed`);
  }
});
