# Servis ve Sabit Gider Envanteri

> Her ücretli/ücretsiz servis burada bir satır. **Liste fiyatı ≠ gerçek ödeme.** Gerçek tutar yalnız faturadan `ledgers/expenses.csv`'ye girer. Yeni ücretli servis Founder onayı gerektirir.
> Son gözden geçirme: 2026-10-10.

| Servis | Plan | Döngü | Liste fiyatı (doğrulanmadı) | Gerçek fatura | Başlangıç | Kullanım ölçümü | Dağıtım | Kaynak |
|---|---|---|---|---|---|---|---|---|
| Claude | Pro | Aylık | ~20 USD/ay + vergiler [TAHMİN] | Fatura girilmedi | Kuruluştan önce | Abonelik — video başına ölçülemez; oturum saati `time.csv` (AI) | Sabit → saat oranıyla | constraints.md |
| ChatGPT | Plus | Aylık | ~20 USD/ay + vergiler [TAHMİN] | Fatura girilmedi | Kuruluştan önce | Abonelik — ölçülemez | Sabit → saat oranıyla | constraints.md |
| ElevenLabs | Starter | Aylık | 6 USD/ay; ilk ay 1 USD promosyon (D-015) | Ödeme Founder'da; tutar girilmedi | 2026-10-08 | **API ile ölçülür**: istek başı `character-cost` başlığı; aylık kota API'den (2026-10-08: 63.174) | Kota payı → video (ekonomik); abonelik → sabit | D-015, voice-ledger |
| Adobe Creative Cloud | Pro (Founder beyanı) | Bilinmiyor | Bilinmiyor | Girilmedi | Bilinmiyor | Abonelik — ölçülemez | Sabit → saat oranıyla | machines.md |
| GitHub | Ücretsiz (varsayım) | — | 0 | — | — | — | — | machines.md |
| Depolama / yedek | Tanımlı değil | — | — | — | — | GB | Sabit | — |
| Remotion | Free License (≤3 kişi) | — | 0 | — | — | — | — | backlog 2026-10-08 |
| Diğer AI/SaaS | — | — | — | — | — | — | — | — |

## Birim değer (ekonomik maliyet için)
| Servis | Formül | Güncel değer |
|---|---|---|
| ElevenLabs kredi | aylık gerçek fatura (TRY) ÷ aylık kredi kotası | Fatura girilince hesaplanır |

## Eksik bilgi (ilk aylık kapanışta toplanacak — Founder'dan tek seferde)
- Claude, ChatGPT, ElevenLabs, Adobe için son fatura tutarları (para birimi + vergi dahil) ve ödeme tarihleri.
- Adobe planının adı ve şirket/kişisel kullanımı (şirket gideri sayılıp sayılmayacağı muhasebeci sorusu).
- Kullanılan depolama/yedek servisi varsa.
