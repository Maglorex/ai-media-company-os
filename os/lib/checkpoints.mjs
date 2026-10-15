// Tarihsel referansların taşınabilir doğrulaması (Stage 4 portability). Paket yok.
// Shared: kanonik checkpoint commit SHA + tree ile (tag gerekmez). Main-PC-only: yerel ref'ler yalnız o makinede.
import { git as defaultGit, read } from './records.mjs';

export const checkpoints = () => JSON.parse(read('os/checkpoints.json'));

const tryGit = (g, ...a) => { try { return g(...a).trim(); } catch { return null; } };

// Kanonik checkpoint: tam SHA, bu clone'da mevcut, HEAD'in atası ve kayıtlı tree ile aynı. Yanlış SHA → hata (atlama yok).
export function verifyCheckpoint(cp, g = defaultGit) {
  const errors = [];
  if (!/^[0-9a-f]{40}$/.test(cp?.commit || '')) return ['checkpoint commit must be a full 40-hex SHA'];
  if (tryGit(g, 'cat-file', '-t', cp.commit) !== 'commit') return [`checkpoint commit ${cp.commit.slice(0, 12)} not in this repository's history`];
  if (tryGit(g, 'merge-base', '--is-ancestor', cp.commit, 'HEAD') === null) errors.push(`checkpoint ${cp.commit.slice(0, 12)} is not an ancestor of HEAD`);
  const tree = tryGit(g, 'rev-parse', `${cp.commit}^{tree}`);
  if (tree !== cp.tree) errors.push(`checkpoint tree mismatch (${tree?.slice(0, 12)} ≠ recorded ${cp.tree?.slice(0, 12)})`);
  return errors;
}

// Registry'deki `git:<ref>:<yol>` satırları: ref os/checkpoints.json'da makineye özel olarak beyan edilmiş olmalı
// ve böyle bir satır asla ACTIVE (talimat) olamaz. İçerik kontrolü Main PC'de (os/tests/main-pc/).
export function registryGitRowErrors(rows, cfg) {
  const local = new Map((cfg.machine_local_refs || []).map((r) => [r.ref, r]));
  const errors = [];
  for (const a of rows.filter((r) => r.path.startsWith('git:'))) {
    const [, ref] = a.path.split(':');
    if (!local.has(ref)) errors.push(`${a.artifact_id}: git ref "${ref}" is not declared in os/checkpoints.json machine_local_refs`);
    if (a.status === 'ACTIVE') errors.push(`${a.artifact_id}: an artifact that lives only in a machine-local ref cannot be ACTIVE`);
  }
  return errors;
}
