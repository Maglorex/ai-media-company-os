// MAIN-PC-ONLY tarihsel kontroller (Stage 0 kayıtları). Shared paket (`os/tests/*.test.mjs`) bunlara bağlı değildir;
// bu dosya yalnız yerel ref'leri barındıran Main PC'de çalıştırılır: node --test "os/tests/main-pc/*.test.mjs"
// Production güvenliğini etkilemez; tarihsel kaydın yerel ref'lerle tutarlılığını doğrular. Ref yoksa FAIL (atlama yok).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { git, read, parseCsv } from '../../lib/records.mjs';
import { checkpoints } from '../../lib/checkpoints.mjs';

const cfg = checkpoints();
const rev = (r) => { try { return git('rev-parse', '--verify', '--quiet', r).trim(); } catch { return null; } };

test('[main-pc-only] pre-v2-checkpoint tag kanonik checkpoint commit\'ine işaret ediyor', () => {
  const cp = cfg.pre_v2_checkpoint;
  assert.equal(rev(`${cp.local_tag}^{commit}`), cp.commit, `local tag ${cp.local_tag} missing or moved`);
});

test('[main-pc-only] makineye özel ref\'ler kayıtlı commit/tree\'de ve registry git: dosyaları orada', () => {
  for (const r of cfg.machine_local_refs) {
    assert.equal(rev(`${r.ref}^{commit}`), r.commit, `${r.ref} missing or moved`);
    assert.equal(rev(`${r.ref}^{tree}`), r.tree);
  }
  for (const a of parseCsv(read('company/state/artifact-registry.csv')).filter((x) => x.path.startsWith('git:'))) {
    const [, ref, ...p] = a.path.split(':');
    git('cat-file', '-e', `${ref}:${p.join(':')}`);
  }
});
