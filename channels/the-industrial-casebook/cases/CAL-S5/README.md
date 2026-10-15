# CAL-S5 — Stage 5 kalibrasyon case'i

> date: 2026-10-15 · author: COO main session · decision: D-048 (Strong PC render zamanı + ≤150 ElevenLabs kredisi; yeni ödeme yok; P3 production/yayın kapsam dışı) · tasarım: `channels/the-industrial-casebook/calibration/`
> CAL-S5 bir video değildir. P3 malzemesi yalnız kalibrasyon malzemesidir; Golden Lock P3'ün hikâye/açılış yapısını kilitlemez. J40 yalnız demo NEXT CASE payload'ıdır (`CASE 00X`). CTA kopyası kanal sloganı değildir.

## Dosyalar
| Dosya | Durum |
|---|---|
| `05-scene-plan-v2.md` | Production Scene Plan v2 (14 SP: 9 golden/referans + 5 anti-reference; QA v1 düzeltmeleri); v1 SUPERSEDED |
| `06-creative-qa-v1.md` | Bağımsız creative QA (`creative-qa-evaluator`, ayrı bağlam) |
| `rights-ledger.csv` + `rights-proof/2026-10-15-web-captures.md` | Kullanılan her harici/AI asset için hak satırı ve resmî sayfa kanıtı |
| `handoff/asset-manifest.csv` | Stage 4 production manifest'i (`production_root: D:/CompanyOS-Production`) |
| `handoff/07-production-handoff-vN.md` | `factory.mjs issue` çıktısı |

## Önkoşul akışı
1. Scene plan + bağımsız QA PASS → scene plan `ACTIVE`.
2. **Müzik (M-01):** Founder GUIDED ACTION — YouTube Audio Library'den ≤3 parça → Strong PC `D:\CompanyOS-Production\CAL-S5\04_music\`.
3. **Strong PC gözlem turu (salt-okunur + tek indirme):** push sonrası Strong PC Claude: (a) V-90'ı manifest'teki NASA URL'sinden `CAL-S5/01_archive/` altına indirir (hash Main PC'de sabitlendi; preflight doğrular); (b) `preflight --json` ile mevcut dosyaların tam SHA-256/boyut değerlerini, AI-01'in süresini ve `04_music` dosyalarının hash/sürelerini raporlar. Render, VO üretimi, düzenleme yok.
4. Main PC gözlenen değerleri manifest'e, müzik satırlarını audio ledger + manifest'e işler → handoff yeni sürümle `ISSUED`.
5. Push → Strong PC preflight `READY_FOR_PRODUCTION` → kalibrasyon render'ları (D-048 kapsamı) → teslim raporu → bağımsız creative QA (render) → Founder preview paketi → Golden Lock (ayrı Founder kararı).

## Kredi tavanı
AI-03 (L1–L3, ≈240 karakter) ve gerekirse tek tekrar: toplam ≤150 kredi (D-048). Ölçülen kredi teslim raporuyla `finance/ledgers/usage.csv`'ye işlenir; tavan aşılacaksa üretim durur.
