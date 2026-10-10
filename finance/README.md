# Finance / CFO

> Amaç: Şirketin ve **her videonun** gerçek ekonomik durumunu bilmek: ne harcadık, ne kazandık, hangi video kendini amorti etti, nakit nereye gidiyor, vergide hangi eşiğe yaklaşıyoruz.
> Sahip: COO. Uzman: `finance-controller` agent'ı. Prosedürler: `cfo-review` (kayıt, aylık kapanış, video ekonomisi), `tax-watch` (vergi takibi) skill'leri.
> Kurulum: 2026-10-10 (v1.0). Para birimi: **TRY ana** (vergi ve nakit), USD ikincil (servis fiyatları ve YouTube geliri USD).

## 1. İlkeler
1. **Tahmin ≠ gerçek.** Tahminler `ledgers/estimates.csv`'de, gerçek harcama/gelir `ledgers/expenses.csv` ve `ledgers/revenue.csv`'de. Gerçek satır yalnız fatura, banka/kart hareketi, servis faturalama sayfası veya API ölçümü gibi bir kanıtla girilir (`evidence` sütunu zorunlu).
2. **Ölçülen kullanım önce.** API veren servislerde (ElevenLabs vb.) kullanım API yanıtı/kullanım uç noktasından ölçülür ve `ledgers/usage.csv`'ye yazılır. Ölçülemeyen kullanım `measured=no` ile işaretlenir.
3. **Nakit ≠ ekonomik maliyet.** Abonelik kotası içindeki kredi kullanımı ek nakit çıkarmaz ama ekonomik maliyeti vardır (kota payı). Raporlar ikisini ayrı gösterir.
4. **Founder zamanı maliyet değil, yönetim metriğidir.** `ledgers/time.csv`'de saat olarak tutulur; P&L'e girmez. Founder isterse saat başı "gölge değer" tanımlanır (varsayılan: kapalı).
5. **Secret yok.** Fatura PDF'leri, kart numarası, banka bilgisi, IBAN, vergi numarası repoya girmez. `evidence` sütununa yalnız "Adobe fatura 2026-10, Founder e-postası" gibi tarif yazılır.
6. **Ücretli işlem yok.** Bu sistem harcama yapmaz; harcama önerisi `founder-approval.md`'ye tabidir.
7. **Vergi kesin bilgi değildir.** `tax-watch/` resmî kaynakla doğrulanması gereken bir izleme alanıdır; muhasebeci/GİB teyidi gereken nokta Founder'a sade dille bildirilir.

## 2. Kayıt dosyaları (`ledgers/`, CSV — tek doğruluk kaynağı)
| Dosya | Ne tutar | Ana sütunlar |
|---|---|---|
| `expenses.csv` | Gerçekleşen her gider | tarih, servis, kategori, `cost_type` (fixed/variable/one_time), tutar + para birimi + kur + TRY, `allocation` (video/channel/company), `video_id`, `period` (hizmet ayı), `paid_date` |
| `revenue.csv` | Her gelir | kaynak (adsense/sponsor/affiliate/membership/other), `video_id`, kazanıldığı ay, banka giriş tarihi, brüt/net, ABD stopajı, banka stopajı, özel hesaba mı geldi |
| `usage.csv` | Servis kullanımı (kredi, karakter, token, GB) | servis, `video_id`, birim, miktar, `measured`, kaynak |
| `time.csv` | Founder ve AI çalışma süresi | kişi, `video_id`, aktivite, saat, `measured` |
| `estimates.csv` | Yayın/ay öncesi tahminler | `video_id` veya ay, kategori, tahmini TRY, tahmini saat, dayanak |
| `fx.csv` | Kullanılan kurlar | tarih, para birimi, TRY kuru, kaynak (TCMB vb.) |

Servis envanteri ve sabit gider kuralları: `subscriptions.md`. Video ekonomisi: `videos/VID-XXX.md`. Aylık P&L: `pnl/YYYY-MM.md`. Hesaplama: `tools/finance_report.py` (yalnız standart kütüphane; dış bağımlılık yok).

## 3. Kategoriler
`ai_llm` (Claude, ChatGPT, API kullanımı) · `voice` (ElevenLabs) · `creative_software` (Adobe vb.) · `storage_backup` · `other_saas` · `assets_licenses` (stok görsel/müzik lisansı) · `equipment` (donanım) · `software_one_time` · `bank_fees` · `other`.

## 4. Video başına maliyet modeli
| Katman | Ne girer | Nasıl |
|---|---|---|
| **Doğrudan nakit** | Yalnız bu video için ödenen para (ör. tek görsel lisansı, kota aşımı ses kredisi) | `expenses.csv`, `allocation=video` |
| **Doğrudan ekonomik** | Bu videonun abonelik kotasından tükettiği pay (ör. ElevenLabs kredisi × kredi birim değeri) | `usage.csv` × `subscriptions.md` birim değeri |
| **Dağıtılmış sabit** | Aylık sabit giderlerin (Claude, ChatGPT, Adobe, ElevenLabs aboneliği, depolama) videoya düşen payı | Kural v1: ay içindeki sabit gider, o ay **videoya bağlı çalışma saatleri** oranında videolara dağıtılır; videoya bağlı olmayan saatlerin payı kanal/şirket genelinde kalır |
| **Tam yüklü maliyet** | Doğrudan nakit + doğrudan ekonomik + dağıtılmış sabit | Rapor |
| **Founder saati** | Bu videoya harcanan Founder saati (ayrı metrik) | `time.csv` |
Tek seferlik ekipman/yazılım (`one_time`): video maliyetine dağıtılmaz; şirket yatırımı olarak P&L'de ayrı satır ve geri dönüş takibi.
Kanal kurulum işleri (ses seçimi testi, marka kimliği, şablon kurulumu): `allocation=channel` — ilk videoya yüklenmez, kanal yatırımı olarak izlenir.

## 5. Video başına gelir ve kârlılık
- Gelir: AdSense (RPM × izlenme/1000; gerçek değer Studio gelir raporundan) + sponsor + affiliate + diğer, `video_id` ile.
- **Video kâr/zarar** = video geliri − tam yüklü maliyet (ayrıca: − doğrudan maliyet).
- **Break-even izlenme** = tam yüklü maliyet ÷ (kanal RPM ÷ 1000). RPM bilinmediği sürece (L-002) senaryo olarak 3 RPM bandıyla gösterilir ve öyle etiketlenir.
- **Geri dönüş süresi** = kümülatif video gelirinin tam yüklü maliyeti geçtiği ay sayısı (henüz geçmediyse "geri dönmedi" + mevcut hızla tahmini, `[TAHMİN]`).

## 6. Aylık kapanış (her ayın ilk haftası)
`cfo-review` §B: faturaları topla → gider/gelir satırları → kur → sabit gider dağıtımı → `pnl/YYYY-MM.md` (P&L + nakit akışı + tahmin vs gerçek) → `tax-watch` güncellemesi → Founder'a 4 satırlık özet.

## 7. Diğer sistemlerle bağ
- Growth: aynı `video_id`; maliyet ve kârlılık Growth'un C6 kriterine ve sonuç kartına girer (`intelligence/growth/README.md`).
- Production: P3 ve sonraki videoların ölçülen ses kredisi `production/.../voice-ledger.md`'de **operasyonel** kayıttır; finans tarafı aynı ölçümü `usage.csv`'ye kaynak referansıyla alır. Süre ölçümü production time-log'unda başlar; finans `time.csv` video toplamını tutar.
- Pano: `dashboards/company.md` Finans bölümü aylık kapanış özetini gösterir.
- Claude kullanım verimliliği (model yönlendirme, context yükü, oturum kullanım ölçümü): `efficiency/` (D-023).
