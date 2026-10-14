// Öncelik çözücüsü ve yukarı-yükselme yasağı (governance §2–§3).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve, deriveLayer, applies, promotionErrors, artifactUsableAsInstruction, config } from '../lib/precedence.mjs';
import { read, parseTable } from '../lib/records.mjs';

const TIC = { channel: 'the-industrial-casebook', case: 'VID-001' };
const r = (id, type, scope, cls, extra = {}) => ({ id, type, scope, class: cls, status: 'ACTIVE', ...extra });

test('katman türetmesi', () => {
  assert.equal(deriveLayer(r('a', 'RULE', 'channel:x', 'HARD')), 'L0');
  assert.equal(deriveLayer(r('a', 'DECISION', 'company')), 'L1');
  assert.equal(deriveLayer(r('a', 'RULE', 'channel:x')), 'L2');
  assert.equal(deriveLayer(r('a', 'STATE', 'case:VID-001')), 'L3');
  assert.equal(deriveLayer(r('a', 'DECISION', 'case:VID-001', 'CASE-SPECIFIC')), 'L4');
  assert.equal(deriveLayer(r('a', 'DECISION', 'case:VID-001')), 'L4');
  for (const c of ['HEURISTIC', 'EXPERIMENT', 'DIAGNOSTIC']) assert.equal(deriveLayer(r('a', 'RULE', 'company', c)), 'L5');
  assert.throws(() => deriveLayer(r('a', 'RULE', 'company', 'IMPORTANT')));
  assert.throws(() => deriveLayer(r('a', 'RULE', 'project:x')));
});

test('L0 HARD her katmanı yener', () => {
  const out = resolve([r('canon', 'RULE', 'channel:the-industrial-casebook'), r('hard', 'RULE', 'company', 'HARD'), r('case', 'DECISION', 'case:VID-001', 'CASE-SPECIFIC')], TIC);
  assert.equal(out.winner.id, 'hard');
});

test('sıra: L1 > L2 > L3 > L4 > L5', () => {
  const chain = [
    r('heur', 'RULE', 'channel:the-industrial-casebook', 'HEURISTIC'),
    r('casedec', 'DECISION', 'case:VID-001', 'CASE-SPECIFIC'),
    r('state', 'STATE', 'case:VID-001'),
    r('canon', 'RULE', 'channel:the-industrial-casebook'),
    r('company', 'DECISION', 'company'),
  ];
  const expected = ['company', 'canon', 'state', 'casedec', 'heur'];
  for (let i = 0; i < expected.length; i++) {
    const out = resolve(chain.slice(0, chain.length - i), TIC);
    assert.equal(out.winner.id, expected[i]);
  }
});

test('case kararı kanal heuristic\'ini yener (hikâye heuristic\'i bilinçli değiştirebilir)', () => {
  const out = resolve([r('h', 'RULE', 'channel:the-industrial-casebook', 'HEURISTIC'), r('c', 'DECISION', 'case:VID-001', 'CASE-SPECIFIC')], TIC);
  assert.equal(out.winner.id, 'c');
});

test('başka kanalın / case\'in kaydı uygulanmaz', () => {
  assert.equal(applies(r('x', 'RULE', 'channel:other-channel'), TIC), false);
  assert.equal(applies(r('x', 'DECISION', 'case:VID-002'), TIC), false);
  assert.equal(applies(r('x', 'DECISION', 'company'), {}), true);
  const out = resolve([r('other', 'RULE', 'channel:other-channel', 'HARD'), r('mine', 'RULE', 'channel:the-industrial-casebook')], TIC);
  assert.equal(out.winner.id, 'mine');
  assert.equal(resolve([r('o', 'DECISION', 'case:VID-002')], TIC).result, 'NO_APPLICABLE_RULE');
});

test('aktif olmayan kayıt yok sayılır', () => {
  const out = resolve([r('old', 'DECISION', 'company', undefined, { status: 'INACTIVE' }), r('canon', 'RULE', 'channel:the-industrial-casebook')], TIC);
  assert.equal(out.winner.id, 'canon');
});

test('DIAGNOSTIC tek başına karar vermez', () => {
  assert.equal(resolve([r('d', 'RULE', 'company', 'DIAGNOSTIC')], TIC).result, 'DIAGNOSTIC_ONLY');
  const out = resolve([r('d', 'RULE', 'company', 'DIAGNOSTIC'), r('h', 'RULE', 'channel:the-industrial-casebook', 'HEURISTIC')], TIC);
  assert.equal(out.winner.id, 'h');
});

test('aynı katmanda çelişki: supersedes yoksa BLOCKED_BY_CANONICAL_GAP, varsa yeni kayıt', () => {
  const a = r('a', 'RULE', 'channel:the-industrial-casebook');
  const b = r('b', 'RULE', 'channel:the-industrial-casebook');
  const gap = resolve([a, b], TIC);
  assert.equal(gap.result, 'BLOCKED_BY_CANONICAL_GAP');
  assert.deepEqual(gap.candidates.sort(), ['a', 'b']);
  const won = resolve([a, { ...b, supersedes: ['a'] }], TIC);
  assert.equal(won.winner.id, 'b');
});

test('yukarı otomatik yükselme yasağı', () => {
  assert.equal(promotionErrors(r('ch', 'RULE', 'channel:the-industrial-casebook', undefined, { evidence_scopes: ['case:VID-001'] })).length, 1);
  assert.equal(promotionErrors(r('co', 'RULE', 'company', 'HEURISTIC', { evidence_scopes: ['channel:the-industrial-casebook'] })).length, 1);
  assert.equal(promotionErrors(r('ok', 'RULE', 'channel:the-industrial-casebook', undefined, { evidence_scopes: ['case:VID-001'], promoted_by: 'D-099' })).length, 0);
  assert.equal(promotionErrors(r('same', 'DECISION', 'case:VID-001', 'CASE-SPECIFIC', { evidence_scopes: ['case:VID-001'] })).length, 0);
  assert.equal(promotionErrors(r('obs', 'RULE', 'company', 'HARD', { origin: 'founder-observation' })).length, 1);
});

test('yalnız ACTIVE artifact talimattır', () => {
  assert.equal(artifactUsableAsInstruction('ACTIVE'), true);
  for (const s of ['DRAFT', 'FROZEN', 'SUPERSEDED', 'HISTORICAL', 'REJECTED']) assert.equal(artifactUsableAsInstruction(s), false);
  assert.throws(() => artifactUsableAsInstruction('READY'));
});

test('gerçek kayıtlar: kernel kararı (D-042, L1) P3 case kararını (D-019) yener; kanal kararı başka kanala uygulanmaz', () => {
  const rows = parseTable(read('company/state/active-decisions.md'), '## Aktif kararlar');
  const toRec = (row) => ({ id: row.ID, type: row['Tür'], scope: row.Kapsam, class: row['Sınıf'] === '—' ? undefined : row['Sınıf'], status: row.Durum });
  const get = (id) => toRec(rows.find((x) => x.ID === id));
  assert.equal(resolve([get('D-019'), get('D-042')], TIC).winner.id, 'D-042');
  assert.equal(applies(get('D-034'), { channel: 'some-future-channel' }), false);
  assert.equal(resolve([get('D-034'), get('D-041')], TIC).winner.id, 'D-034');
});

test('governance.md öncelik tablosu os/precedence.json ile aynı', () => {
  const rows = parseTable(read('.claude/rules/governance.md'), '## 2. Öncelik (precedence) — çelişkide kazanan');
  const ids = rows.map((x) => x['Sıra'].replace(/\*/g, ''));
  assert.deepEqual(ids, config.layers.map((l) => l.id));
  rows.forEach((row, i) => assert.equal(row.Katman, config.layers[i].name));
});
