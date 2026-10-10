---
name: cfo-review
description: Şirketin ve her videonun ekonomisini yönetir — gider/gelir/kullanım/süre kaydı (tahmin ve gerçek ayrı), aylık kapanış (P&L, nakit akışı, sabit gider dağıtımı) ve video başına maliyet, kâr/zarar, break-even izlenme ve geri dönüş süresi. Bir harcama/gelir/fatura/ölçülen kullanım oluştuğunda, video yayından önce maliyet tahmini gerektiğinde, ayın ilk haftasında veya Founder "ne harcadık / kâr ediyor muyuz?" dediğinde kullan. Harcama yapmaz.
---

# CFO Review

Sistem: `finance/README.md`. Uzman: `finance-controller` agent'ı. Hesaplama: `python finance/tools/finance_report.py` (`--check`, `--month YYYY-MM`, `--videos`, `--tax YYYY`).

## A. Kayıt (olay anında)
| Olay | Nereye | Zorunlu |
|---|---|---|
| Fatura / kart / banka hareketi | `ledgers/expenses.csv` | kanıt tarifi, para birimi, kur, TRY, `cost_type`, `allocation`, `period`, `paid_date` |
| Ölçülen servis kullanımı (ör. ElevenLabs `character-cost`) | `ledgers/usage.csv` | `measured=yes`, kaynak (ör. voice-ledger satır no / request_id) |
| Founder veya AI çalışma süresi | `ledgers/time.csv` | `video_id` veya `allocation=company/channel`, ölçülen mi |
| Gelir (AdSense, sponsor, affiliate, diğer) | `ledgers/revenue.csv` | brüt, stopajlar, banka giriş tarihi, `dedicated_account` |
| Video/ay öncesi tahmin | `ledgers/estimates.csv` | dayanak; `[TAHMİN]` |
| Kur | `ledgers/fx.csv` | kaynak (TCMB veya bankanın uyguladığı kur) |
Kurallar: Tahmin asla gerçek dosyasına yazılmaz. Kanıtsız gerçek satır girilmez. Kart/IBAN/vergi no/fatura PDF'i repoya girmez. Production makinesindeki ölçümler (voice-ledger, time-log) finans dosyalarına kaynak referansıyla aktarılır; production dosyaları düzenlenmez.

## B. Aylık kapanış (ayın ilk haftası)
1. Eksik faturaları tek listede Founder'dan iste (`subscriptions.md` → "Eksik bilgi").
2. Gider/gelir satırlarını gir; `--check` temiz olana kadar düzelt.
3. Birim değerleri hesapla (`ledgers/unit-values.csv`: ör. ElevenLabs aylık fatura TRY ÷ aylık kredi kotası).
4. `--month` ve `--videos` çalıştır → `pnl/YYYY-MM.md` (şablon `pnl/_TEMPLATE.md`).
5. Tahmin vs gerçek: %20'den büyük sapma varsa nedenini yaz; tekrarlıyorsa `company/lessons.md` önerisi.
6. `tax-watch` skill'ini çalıştır (aylık kontrol).
7. Pano için 4 satırlık Founder özeti (şablondaki biçim).

## C. Video ekonomisi
- Yayından önce: `estimates.csv`'ye video tahmini (Founder saati, doğrudan maliyet). Growth tahmin kilidiyle (`growth-idea-scoring` §B) aynı anda.
- Yayından sonra 28. ve 90. gün: `videos/VID-XXX.md` kartı; tam yüklü maliyet, gelir, kâr/zarar, break-even izlenme, geri dönüş süresi.
- RPM kendi verimiz olmadan bilinmez (L-002): break-even 3 RPM senaryosuyla ve "senaryo" etiketiyle verilir.

## Founder'a dil
- Rakamlar TL, yuvarlak ve tek cümle bağlamla. "Bu video şimdilik [X TL] zararda; mevcut hızla [Y] izlenmede kendini çıkarır (tahmin)."
- Harcama önerisi çıkarsa `founder-approval.md` formatı; maliyet tasarrufu önerisi tek öneri olarak.

## Sınırlar
- Ödeme, abonelik açma/kapama, plan değiştirme yapılmaz; harici hesap (banka, AdSense, Stripe vb.) bağlanmaz — her biri Founder onayı.
- Muhasebe/vergi kararı verilmez; `tax-watch`'a yönlendirilir.
