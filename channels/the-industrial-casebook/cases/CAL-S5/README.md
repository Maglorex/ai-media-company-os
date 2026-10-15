# CAL-S5 — Stage 5 kalibrasyon case'i

> date: 2026-10-15 · author: COO main session · decision: D-048 (Strong PC render zamanı + ≤150 ElevenLabs kredisi; yeni ödeme yok; P3 production/yayın kapsam dışı) · tasarım: `channels/the-industrial-casebook/calibration/`
> CAL-S5 bir video değildir. P3 malzemesi yalnız kalibrasyon malzemesidir; Golden Lock P3'ün hikâye/açılış yapısını kilitlemez. J40 yalnız demo NEXT CASE payload'ıdır (`CASE 00X`). CTA kopyası kanal sloganı değildir.

## Dosyalar
| Dosya | Durum |
|---|---|
| `05-scene-plan-v4.md` | Production Scene Plan v4 — **ACTIVE** (14 SP; v1–v3 SUPERSEDED; v3/v4 yalnız hazırlık, asset bağlama, müzik karşılaştırma planı) |
| `06-creative-qa-v1.md` … `06-creative-qa-v4.md` | Bağımsız creative QA: v1 REVISE → v2 PASS → v3 REVISE → **v4 PASS** |
| `rights-ledger.csv` + `rights-proof/2026-10-15-web-captures.md` | Kullanılan her harici/AI asset için hak satırı ve resmî sayfa kanıtı |
| `handoff/asset-manifest.csv` | Stage 4 production manifest'i (`production_root: D:/CompanyOS-Production`) |
| `handoff/07-production-handoff-v1.md` | `factory.mjs issue` çıktısı — **BLOCKED** (asset readiness) |
| `handoff/measurement-request-v1.md` | Strong PC salt-okunur ölçüm turu: tam hash/boyut/süre + müzik hak doğrulaması |
| `handoff/measurement-report-v1.md` | Strong PC ölçümü (2026-10-15): tam hash/boyut/süre, V-90 doğrulandı, M-01…M-04 hakları CLEAR, AI-01/02 yedeği yok |

## Önkoşul akışı
1. Scene plan + bağımsız QA PASS → scene plan `ACTIVE`.
2. **Müzik:** Founder dört aday parçayı Strong PC `D:/CompanyOS-Production/CAL-S5/04_music/` klasörüne koydu (master: `_audio-library/`) — 2026-10-15. Manifest'te M-01…M-04 `NEEDS_RIGHTS` (lisans doğrulanmadı; hash/süre ölçülmedi); hiçbiri GOLDEN değil.
3. **Strong PC gözlem turu (salt-okunur + tek indirme):** push sonrası Strong PC Claude: (a) V-90'ı manifest'teki NASA URL'sinden `CAL-S5/01_archive/` altına indirir (hash Main PC'de sabitlendi; preflight doğrular); (b) `preflight --json` ile mevcut dosyaların tam SHA-256/boyut değerlerini, AI-01'in süresini ve `04_music` dosyalarının hash/sürelerini raporlar. Render, VO üretimi, düzenleme yok.
4. Main PC gözlenen değerleri manifest'e, müzik satırlarını audio ledger + manifest'e işler → handoff yeni sürümle `ISSUED`.
5. Push → Strong PC preflight `READY_FOR_PRODUCTION` → kalibrasyon render'ları (D-048 kapsamı) → teslim raporu → bağımsız creative QA (render) → Founder preview paketi → Golden Lock (ayrı Founder kararı).

## Kredi tavanı
AI-03 (L1–L3, ≈240 karakter) ve gerekirse tek tekrar: toplam ≤150 kredi (D-048). Ölçülen kredi teslim raporuyla `finance/ledgers/usage.csv`'ye işlenir; tavan aşılacaksa üretim durur.
