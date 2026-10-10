---
name: growth-performance-review
description: Yayınlanan videonun 48 saat / 7 gün / 28 gün / 90 gün sonuçlarını kaydeder, kilitli tahminle karşılaştırır, ekonomik sonucu Finance'ten okur ve öğrenim + kaynak ayırma önerisi çıkarır. Bir video kontrol noktasına geldiğinde, Founder Studio verisi paylaştığında veya aylık büyüme değerlendirmesinde kullan.
---

# Growth — Yayın Sonrası Performans Değerlendirmesi

Sistem: `intelligence/growth/README.md`. Analiz `analytics-analyst` agent'ına verilebilir; nihai öneri COO'nundur.

## Ne zaman
- Yayın + 48 saat, 7 gün, 28 gün, 90 gün (takvim `founder-brief` tarafından izlenir).
- Founder Studio dışa aktarımı paylaştığında.
- Ayda bir: kanal geneli büyüme değerlendirmesi (§C).

## A. Veri girişi
1. Veri yoksa Founder'a tek, net adım ver: hangi Studio raporu, hangi tarih aralığı, hangi sütunlar (README §5). Tahmin uydurma.
2. Sayıları `data/video-metrics.csv`'ye video_id + checkpoint satırı olarak ekle; `source` sütununa dışa aktarım adı/tarihi.
3. Gelir sütunları (rpm_usd, revenue_usd) ayrıca `finance/ledgers/revenue.csv`'ye gelir olarak işlenir (tek doğruluk kaynağı: finans tarafı gelirin, growth tarafı metrik bağlamının sahibidir).

## B. Video sonuç kartı
1. `results/VID-XXX.md` yoksa şablondan oluştur; kontrol noktası satırını doldur.
2. 28 gün noktasında: FC ile karşılaştır, `calibration.md`'ye satır ekle. Başarı tanımı FC'de yazandır; değiştirilmez.
3. Retention eğrisindeki belirgin düşüşleri edit plan sahnelerine eşle (production dosyalarını yalnız oku).
4. Ekonomi: `python finance/tools/finance_report.py --videos` çıktısından VID'in maliyet/gelir/kâr ve break-even izlenmesini oku; sonuç kartına yalnız bağlantı ve tek cümle yaz.
5. Öğrenim adayı ve sonraki deney önerisi (≤5 video: "Belirsiz" etiketiyle).

## C. Aylık büyüme değerlendirmesi
- Alt konu × (CTR, APV, izlenme saati, abone/1k, video başına maliyet) tablosu.
- Trafik kaynağı karışımı değişimi.
- Kaynak ayırma önerisi: hangi alt konuya daha fazla video, hangisi keşifte kalsın, hangisi dursun. ≥5 video yoksa yalnız gözlem.
- `heuristics.md` §4: kendi verimizin çürüttüğü genel kural varsa ekle.
- Tekrar doğrulanan öğrenim → `company/lessons.md`; strateji etkisi varsa `decision-review`.

## Founder'a sunum
```
[Video] 28 günde: [1 cümle sonuç, baz çizgisine göre].
Beklentimize göre: [tuttu / altında / üstünde] — çünkü [kanıtlı tek sebep].
Para tarafı: [maliyet], [gelir], [kâr/zarar]; kendini [X] izlenmede amorti eder.
Bundan sonra: [tek öneri].
```

## Kurallar
- Korelasyonu nedensellik gibi sunma; küçük örneklemi belirt.
- Sonuç kartı tahmini değiştirmez; başarısız tahminler silinmez.
- Studio/API erişimi için credential repoya girmez; API bağlantısı Founder onayı gerektirir.
