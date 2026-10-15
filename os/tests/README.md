# os/tests — Company OS deterministik testleri

Çalıştırma (repo kökünde; Node yerleşik test koşucusu, paket yok; Main PC ve Strong PC'de aynı):

```
node --test "os/tests/*.test.mjs"
```

| Dosya | Ne doğrular |
|---|---|
| `integrity.test.mjs` | Kernel dosyaları; `.claude/**`'un Git'te takip edilmesi (gitignore tuzağı); `.gitignore` istisnalarının dar olması; agent/skill frontmatter; CLAUDE.md'deki skill/agent adları; rule registry kapsamı ve katman türetmesi; D-/L-/CF- numara sırası; active-decisions ↔ decision-log; artifact registry (statü, yol, `superseded_by`, tek ACTIVE); kayıtsız case/kanal dosyası olmaması; tek güncel durum; kernel yol referansları; HARD çekirdek maddelerin kaybolmaması; secret biçim taraması |
| `precedence.test.mjs` | L0–L5 öncelik çözücüsü, kapsam uygulanabilirliği, DIAGNOSTIC'in karar verememesi, aynı katman çelişkisinde `BLOCKED_BY_CANONICAL_GAP`, yukarı-yükselme yasağı, yalnız ACTIVE artifact'ın talimat olması, governance.md ↔ `os/precedence.json` eşliği |
| `factory.test.mjs` | Stage 4 (D-047): Strong PC boot contract senaryoları gerçek git + dosya sistemiyle (doğru handoff READY; yanlış commit, kirli ağaç, eski/legacy handoff VERSION_MISMATCH; eksik/yanlış asset ASSET; reddedilmiş hak RIGHTS; açık CCR CCR_REQUIRED); rights hard-fail; Stage 3 readiness korunumu; legacy kompozisyon (V-21) taraması; P3 handoff dry-run BLOCKED; handoff inceliği (doctrine kopyası, Founder'a sistem sorusu); CCR; teslim raporu (technical QA, creative PASS yok); yedek sınıflandırması; medya ölçümü; atlama seçeneği yok |
| `migration.test.mjs` | Kanonik Stage 0 checkpoint'ten (`os/checkpoints.json`: commit SHA + tree; yerel tag gerekmez, atlama yok) beri: silinen dosya yok, KEEP alanları (production/finance/intelligence/channels, strateji dosyaları) değişmedi, değişiklikler onaylı aşama kapsamında, decision-log/lessons yalnız ekleme aldı |
| `portability.test.mjs` | Shared paket taşınabilir: PATH'te git yokken GitHub Desktop'un gömülü git'i bulunur (`os/lib/gitbin.mjs`; kişisel sabit yol yok); checkpoint SHA doğrulaması (yanlış SHA → FAIL); registry `git:` satırları yalnız beyan edilmiş makineye özel ref'te ve asla ACTIVE değil; **temiz clone simülasyonu** (`--no-tags --single-branch`, draft branch yok, PATH'te git yok) içinde shared paket fail 0, production/version/rights testleri dahil |

Yeni aşama Founder tarafından onaylandığında `migration.test.mjs`'deki izin listesi yalnız o aşamanın kapsamıyla genişletilir. Ölçüler (context boyutu, dosya sayısı) test hedefi değildir; DIAGNOSTIC olarak raporlanır (governance §8).

**Main-PC-only tarihsel kontroller** (shared paketin parçası değil; production güvenliğini etkilemez): `node --test "os/tests/main-pc/*.test.mjs"` — yerel `pre-v2-checkpoint` tag'inin ve `draft/os-v2-phase1-plan` branch'inin `os/checkpoints.json`'daki commit/tree'ye işaret ettiğini ve registry `git:` dosyalarının orada olduğunu doğrular. Yalnız bu ref'leri barındıran Main PC'de çalışır; ref yoksa FAIL. Makineye özel ref shared integrity şartı olamaz; yeni makine/clone bu ref'leri yaratmaz.
