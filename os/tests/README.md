# os/tests — Company OS deterministik testleri

Çalıştırma (repo kökünde; Node yerleşik test koşucusu, paket yok; Main PC ve Strong PC'de aynı):

```
node --test "os/tests/*.test.mjs"
```

| Dosya | Ne doğrular |
|---|---|
| `integrity.test.mjs` | Kernel dosyaları; `.claude/**`'un Git'te takip edilmesi (gitignore tuzağı); `.gitignore` istisnalarının dar olması; agent/skill frontmatter; CLAUDE.md'deki skill/agent adları; rule registry kapsamı ve katman türetmesi; D-/L-/CF- numara sırası; active-decisions ↔ decision-log; artifact registry (statü, yol, `superseded_by`, tek ACTIVE); kayıtsız case/kanal dosyası olmaması; tek güncel durum; kernel yol referansları; HARD çekirdek maddelerin kaybolmaması; secret biçim taraması |
| `precedence.test.mjs` | L0–L5 öncelik çözücüsü, kapsam uygulanabilirliği, DIAGNOSTIC'in karar verememesi, aynı katman çelişkisinde `BLOCKED_BY_CANONICAL_GAP`, yukarı-yükselme yasağı, yalnız ACTIVE artifact'ın talimat olması, governance.md ↔ `os/precedence.json` eşliği |
| `migration.test.mjs` | `pre-v2-checkpoint`'ten beri: silinen dosya yok, KEEP alanları (production/finance/intelligence/channels, strateji dosyaları) değişmedi, değişiklikler onaylı aşama kapsamında, decision-log/lessons yalnız ekleme aldı. Tag yoksa atlanır. |

Yeni aşama Founder tarafından onaylandığında `migration.test.mjs`'deki izin listesi yalnız o aşamanın kapsamıyla genişletilir. Ölçüler (context boyutu, dosya sayısı) test hedefi değildir; DIAGNOSTIC olarak raporlanır (governance §8).
