# Growth / Content Intelligence

> Amaç: Şirketin sınırlı kaynağını (Founder saati, AI, para) **izlenme ve büyüme ihtimali en yüksek fikirlere** ayırmak ve her yayından öğrenip bir sonraki seçimi daha iyi yapmak.
> Sahip: COO. Analiz: `analytics-analyst` (kanal verisi), `research-analyst` (talep / rakip / outlier). Prosedürler: `growth-idea-scoring`, `growth-performance-review` skill'leri.
> Kurulum: 2026-10-10 (v1.0). Kanal henüz yok; sistem veri gelmeden önce hazır, veri geldikçe ağırlık kendi verimize kayar.

## 1. Temel ilkeler
1. **Tahmin ≠ sonuç.** Yayın öncesi tahmin (`forecasts/`) yayından önce **kilitlenir** ve sonradan değiştirilmez. Yayın sonrası gerçek sonuç (`results/`, `data/video-metrics.csv`) ayrı dosyada tutulur. Karşılaştırma `calibration.md`'de yapılır.
2. **Kesin tahmin yok.** "Viral olur" denmez. Tahmin her zaman **aralık + güven düzeyi + dayandığı kanıt** olarak yazılır. Dil: "Bu fikir P3'e göre daha güçlü, çünkü …", "Kanal ortalamasının üstünde olma ihtimali orta".
3. **Kanıt hiyerarşisi** (üstteki alttakini ezer):
   | Seviye | Kaynak | Ne zaman geçerli |
   |---|---|---|
   | K1 | Kanalın kendi yayın sonrası verisi (Studio) | ≥5 yayınlı videoda 28 günlük veri oluşunca **birincil** |
   | K2 | Kanalın kendi deneyleri (Test & Compare, EXP-XXX) | Deney eşiği karşılandığında |
   | K3 | Niş karşılaştırmaları: rakip/outlier kaydı (`outliers.md`) | Her zaman; K1 oluşunca ikincil |
   | K4 | Genel YouTube heuristics'leri (`heuristics.md`) | Yalnız K1–K3 yokken veya çelişmiyorsa |
   Çelişkide üst seviye kazanır ve çelişki `heuristics.md` → "Geçersiz kılınanlar" bölümüne yazılır.
4. **Yatırım dili.** Her fikir bir yatırımdır: beklenen getiri sinyali ÷ (Founder saati + doğrudan maliyet). Maliyet tarafı Finance'ten gelir (`finance/README.md`).
5. **Küçük veri uyarısı.** <5 video veya <1.000 gösterim: sonuç "Belirsiz"; ölçüt değiştirilmez (`analytics-analyst` kuralları).

## 2. Akış (fikirden öğrenime)
```
Fikir (idea-registry: I-XXX)
  → Talep/rakip sinyali (outliers.md, research-analyst)
  → Yatırım puanı + kilitli tahmin (growth-idea-scoring → forecasts/FC-XXX)
  → [mevcut kapılar: documentary-virality-gate → packaging → evidence ledger → üretim]
  → Yayın (video_id: VID-XXX; maliyet finance/ledgers'ta aynı video_id ile)
  → Kontrol noktaları 48s / 7g / 28g / 90g (growth-performance-review → results/VID-XXX, data/video-metrics.csv)
  → Tahmin vs gerçek (calibration.md) → öğrenim (company/lessons.md) → puan ağırlıkları güncellenir
```
Bu sistem mevcut documentary kapılarını **tekrarlamaz**: virality gate "bu fikir üretilebilir/izlenebilir mi?" sorusunu; Growth "kaynaklarımızı bu fikre mi, diğerine mi ayıralım ve ne bekliyoruz?" sorusunu cevaplar.

## 3. Kimlikler (tüm sistemlerde ortak anahtar)
- `I-XXX` — fikir (idea-registry). Elenen fikirler silinmez, durumu değişir.
- `FC-XXX` — kilitli yayın öncesi tahmin.
- `VID-XXX` — üretime giren video. **Finance ledger'ları, metrik CSV'si ve sonuç dosyaları bu anahtarı kullanır.**
- `OL-XXX` — rakip/outlier kaydı.
- `PT-XXX` — packaging testi (title/thumbnail; Test & Compare).

## 4. Dosyalar
| Dosya | İçerik |
|---|---|
| `idea-registry.md` | Fikir portföyü, durum, yatırım puanı, kaynak ayırma kararı |
| `outliers.md` | Rakip/outlier ve talep/rekabet sinyalleri |
| `heuristics.md` | Puanlama kriterleri, ağırlıklar, genel kurallar ve kendi verimizle geçersiz kılınanlar |
| `forecasts/_TEMPLATE.md` | Yayın öncesi kilitli tahmin şablonu |
| `results/_TEMPLATE.md` | Yayın sonrası sonuç kartı şablonu |
| `packaging-tests.md` | Title/thumbnail testleri (PT-XXX) |
| `data/video-metrics.csv` | Video × kontrol noktası metrikleri (Studio dışa aktarımından) |
| `calibration.md` | Tahmin vs gerçek sicili; tahmin isabeti |

## 5. Metrik sözlüğü (`data/video-metrics.csv` sütunları)
`impressions` gösterim · `ctr_pct` gösterim tıklama oranı · `views` · `avd_sec` ortalama izleme süresi · `apv_pct` ortalama izlenme yüzdesi · `watch_hours` · `ret_30s_pct` 30. saniye retention · `src_browse_pct` / `src_suggested_pct` / `src_search_pct` / `src_external_pct` / `src_other_pct` trafik kaynakları · `subs_gained` · `subs_per_1k_views` · `returning_viewers_pct` · `rpm_usd` · `revenue_usd`.
Veri girişi: Founder'ın Studio CSV dışa aktarımı veya ileride Founder onaylı YouTube Analytics API (credential repoya girmez). Elle girilen değerler `source` sütununda belirtilir.

## 6. Kaynak ayırma kuralı (v1)
- Üretime girecek fikirler **yatırım puanı** ile sıralanır (`heuristics.md` §2). Puan farkı <8 ise puan tek başına karar ölçütü değildir (L-001); öğrenme değeri ve maliyet bakılır.
- Portföy kuralı (K1 oluşana kadar): her 3 videonun en az 2'si en güçlü kanıtlı alt konudan; en fazla 1'i "keşif" (yeni alt konu / yeni format açısı). Keşif videosunun amacı `forecasts`'ta açıkça "öğrenme" olarak yazılır.
- K1 oluştuktan sonra: alt konu × trafik kaynağı × maliyet performansı ile alt konu bütçesi yeniden dağıtılır (`growth-performance-review` §C).
