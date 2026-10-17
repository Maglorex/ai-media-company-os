// Company OS v2 — kural önceliği çözücüsü (governance §2–§3, os/precedence.json).
// Paket yok; Node yerleşik modülleri. Main PC ve Strong PC'de aynı çalışır.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
export const config = JSON.parse(readFileSync(join(here, '..', 'precedence.json'), 'utf8'));

const rankOf = (layerId) => config.layers.find((l) => l.id === layerId).rank;

export function scopeKind(scope) {
  if (scope === 'company') return 'company';
  if (/^channel:[a-z0-9-]+$/.test(scope)) return 'channel';
  if (/^case:[A-Za-z0-9-]+$/.test(scope)) return 'case';
  throw new Error(`invalid scope: ${scope}`);
}

// Kaydın katmanını türetir. record: { type, scope, class? }
export function deriveLayer(record) {
  const cls = record.class || null;
  if (cls && !config.classes.includes(cls)) throw new Error(`invalid class: ${cls}`);
  if (cls === 'HARD') return 'L0';
  if (cls === 'HEURISTIC' || cls === 'EXPERIMENT' || cls === 'DIAGNOSTIC') return 'L5';
  if (cls === 'CASE-SPECIFIC') return 'L4';
  if (record.type === 'STATE') return 'L3';
  const kind = scopeKind(record.scope);
  if (kind === 'case') return 'L4';
  if (kind === 'channel') return 'L2';
  return 'L1';
}

// context: { channel?: 'the-industrial-casebook', case?: 'VID-001' }
export function applies(record, context = {}) {
  const kind = scopeKind(record.scope);
  if (kind === 'company') return true;
  const id = record.scope.split(':')[1];
  if (kind === 'channel') return context.channel === id;
  return context.case === id;
}

export function isActive(record) {
  return config.active_statuses.includes(record.status || 'ACTIVE');
}

// Çelişen kayıtlar arasında kazananı seçer.
// Dönüş: { result: 'WINNER', winner } | { result: 'BLOCKED_BY_CANONICAL_GAP', candidates } | { result: 'DIAGNOSTIC_ONLY' } | { result: 'NO_APPLICABLE_RULE' }
export function resolve(records, context = {}) {
  const live = records.filter((r) => isActive(r) && applies(r, context));
  if (live.length === 0) return { result: 'NO_APPLICABLE_RULE' };
  const deciding = live.filter((r) => r.class !== 'DIAGNOSTIC');
  if (deciding.length === 0) return { result: config.diagnostic_only_result };
  const withRank = deciding.map((r) => ({ r, rank: rankOf(deriveLayer(r)) }));
  const best = Math.min(...withRank.map((x) => x.rank));
  const top = withRank.filter((x) => x.rank === best).map((x) => x.r);
  if (top.length === 1) return { result: 'WINNER', winner: top[0] };
  const ids = new Set(top.map((r) => r.id));
  const superseding = top.filter((r) => {
    const sup = new Set(r.supersedes || []);
    return [...ids].every((id) => id === r.id || sup.has(id));
  });
  if (superseding.length === 1) return { result: 'WINNER', winner: superseding[0] };
  return { result: config.gap_result, candidates: top.map((r) => r.id) };
}

// Yukarı otomatik yükselme yasağı (governance §3). Geçersizse hata mesajı dizisi döner.
export function promotionErrors(record) {
  const errors = [];
  const own = config.scope_rank[scopeKind(record.scope)];
  const evidence = record.evidence_scopes || [];
  if (evidence.length > 0) {
    const widest = Math.min(...evidence.map((s) => config.scope_rank[scopeKind(s)]));
    if (own < widest && !record.promoted_by) {
      errors.push(`${record.id}: scope ${record.scope} is wider than its evidence (${evidence.join(', ')}) and has no promoted_by decision`);
    }
  }
  if (record.origin === 'founder-observation' && record.class === 'HARD' && !record.promoted_by) {
    errors.push(`${record.id}: founder observation cannot become HARD without promoted_by decision`);
  }
  return errors;
}

// Artifact talimat olarak kullanılabilir mi?
export function artifactUsableAsInstruction(status) {
  if (!config.artifact_statuses.includes(status)) throw new Error(`invalid artifact status: ${status}`);
  return config.artifact_instruction_statuses.includes(status);
}
