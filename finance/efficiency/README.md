# Efficiency — Claude kullanım verimliliği

> Amaç: Claude Pro / Claude Code kullanım limitini kaliteyi düşürmeden verimli kullanmak; doğru işi doğru modele ve context'e yönlendirmek.
> Sahip: COO. Karar: D-023. Ölçüm kaydı: `efficiency-log.md`.

## 1. Efficiency Audit v1 — 2026-10-10

### Doğrulanan ortam [VERİ]
- Claude Code **2.1.295** (Claude desktop app içindeki `claude.exe`). Kurulu binary'de doğrulanan alanlar:
  - Agent frontmatter: `model`, `effort` (`low`/`medium`/`high`/`max`), `maxTurns`, `omitClaudeMd`, `disallowedTools`, `skills`, `memory`, `background`, `isolation`.
  - Skill frontmatter: `paths`, `disable-model-invocation`, `user-invocable`, `effort`, `model`, `context`, `agent`.
  - `.claude/rules/*.md` için `paths` ile kapsam daraltma (dosya Read/Write/Edit edildiğinde yüklenir).
- Üçüncü taraf "token saver", plugin, Agent Teams kullanılmadı; prompt cache ayarları değiştirilmedi.

### Baseline (değişiklik öncesi, byte = UTF-8)
| Parça | Önce | Sonra | Not |
|---|---|---|---|
| Agent sayısı | 5 | 6 | + `company-file-scanner` |
| Skill sayısı | 20 | 20 | |
| `CLAUDE.md` | 55 satır / 5.451 B | 56 satır / 6.172 B | + model yönlendirme satırı |
| Her oturumda yüklenen rules | 7 dosya / 13.887 B | 6 dosya / 11.223 B | ses kuralı yalnız `production/**` |
| Skill description toplamı (her oturum) | 6.726 B | 6.715 B | founder-help çakışması giderildi |
| Agent description toplamı (her oturum) | ~1.53 KB | 1.85 KB | scanner eklendi |
| **Proje kaynaklı sabit yük (yaklaşık)** | **~27.6 KB** | **~26.0 KB** (production'da ~28.8 KB) | ≈ 8–9 bin token mertebesi [TAHMİN] |

Yorum: Proje dosyalarının sabit context yükü zaten küçük. Asıl kullanım; uzun oturumlar, büyük dosya okumaları, ana modelin mekanik taramalar ve uzman işlerini kendisinin yapması. Kazanç beklentisi context küçültmeden değil **model yönlendirmesinden** gelir. Kesin tasarruf yüzdesi ölçülmedi; `efficiency-log.md` ile ölçülecek.

### En ağır parçalar
- Skill gövdeleri (yalnız çağrılınca yüklenir): `founder-interface` 10 KB, `documentary-voice-director` 6 KB, `skill-evaluator` 5.8 KB, `documentary-virality-gate` 5.6 KB. Her oturumda yüklenmedikleri için kısaltılmadı.
- Global rules 11 KB: onay, güvenlik, hafıza, kanıt, eskalasyon — bilinçli olarak global ve kısaltılmadan bırakıldı.

## 2. Model yönlendirme
| İş | Model | Nerede |
|---|---|---|
| Dosya bulma, birebir ifade arama, repo taraması, değişen dosyalar, metadata/frontmatter envanteri, var/yok, checksum/manifest, kayıtta eksik alan, checklist durumu, mekanik format kontrolü, secret-kalıp taraması | **HAIKU** | `company-file-scanner` (salt-okunur, effort low, maxTurns 12, CLAUDE.md'siz) |
| Araştırma sentezi, kanıt değerlendirmesi | **SONNET** | `research-analyst` |
| Growth / metrik / deney analizi | **SONNET** | `analytics-analyst` |
| Finance / CFO / vergi takibi | **SONNET** | `finance-controller` |
| Production kodlama, render, normal debugging | **SONNET** | `production-engineer` |
| Company OS sağlığı, Skill Lab teknik incelemesi | **SONNET** | `systems-operator` (nihai güvenlik kararı COO + Founder) |
| Strateji, niş, önemli yaratıcı karar (script/packaging/virality gate), karmaşık kaynak çelişkisi, yüksek etkili mimari değişiklik, Founder'a nihai öneri | **INHERIT (ana model)** | Ana oturum (COO) |

Kurallar:
- Tek-iki dosyalık bakış ana oturumda doğrudan yapılır; subagent başlatmanın kendi sabit maliyeti vardır. Scanner yalnız geniş taramada kullanılır.
- Uzman agent'lara `maxTurns` konmadı: araştırma ve kodlama yapay turn sınırıyla eksik kalmamalı.
- `omitClaudeMd` yalnız scanner'da: görevin bütün bağlamı delegasyon mesajında verilir; secret-değer gösterme yasağı ve salt-okunurluk agent'ın kendi talimatında. Şirket politikası gereken uzmanlarda kapalı.
- Ucuz model çıktısı önemli kararı tek başına belirlemez; COO doğrular (özellikle secret eşleşmesi, kanıt ve kaynak bulguları).

## 3. Bilinçli olarak ucuzlatılmayanlar
- Senaryo, packaging, virality gate, evidence ledger kararları ana modelde kalır (skill'ler ana oturumda çalışır).
- Founder Interface, onay, güvenlik, secret ve hafıza kuralları global kaldı; metinleri kısaltılmadı.
- `disable-model-invocation` hiçbir skill'e uygulanmadı: tüm skill'lerin Founder'ın doğal cümlelerinden kendiliğinden tetiklenmesi gerekiyor.
- Tekrarlar (ör. `self-repair` ve `founder-approval`'daki onay listesi) güvenlik metni olduğu için birleştirilmedi; ileride ölçüm anlamlı fark gösterirse yeniden değerlendirilir.

## 4. Yeniden değerlendirme koşulları
- Sonnet uzman çıktısında kalite düşüşü (kaynak hatası, eksik kanıt, hatalı kod) 2 kez görülürse o agent `inherit`'e döner.
- Scanner bir secret değeri gösterirse veya dosya değiştirirse hemen kapatılır ve L- kaydı açılır.
- Ses kuralı `production/` dışında bir ses işinde atlanırsa `paths` kaldırılıp global yapılır.

## 5. Ölçüm ritmi ve değerlendirme
- `/usage` ölçümü Founder'ın hafızasına bırakılmaz. `session-close`, yalnız ölçüme değer bir oturumdan sonra (normal iş oturumu; son ölçümden beri en az 2 oturum) tek işlem ister: "Claude Code'da /usage aç ve Session ile Weekly yüzdelerini bana söyle." Her oturumda istenmez.
- 5–10 normal Company OS oturumu birikince baseline ile karşılaştırılır ve dört soru cevaplanır:
  1. Kullanım davranışı iyileşti mi (oturum başına limit %, mekanik işin ana modelde kalma sıklığı)?
  2. Kalite problemi oluştu mu (kaynak/kanıt hatası, kod hatası, kaçan secret)?
  3. Hangi agent gereğinden fazla kullanım yapıyor?
  4. Hangi routing değişikliği gerçekten işe yaradı?
- Sonuç `efficiency-log.md` altına yazılır; gerekiyorsa §4 koşullarıyla routing düzeltilir. Bu checkpoint'ten sonra yeni yönetim sistemi kurulmaz.
