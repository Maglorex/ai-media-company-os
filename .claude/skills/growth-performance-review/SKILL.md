---
name: growth-performance-review
description: Yayınlanan videonun 48 saat / 7 gün / 28 gün / 90 gün sonuçlarını kaydeder, kilitli tahminle karşılaştırır, ekonomik sonucu Finance'ten okur ve öğrenim + kaynak ayırma önerisi çıkarır. Bir video kontrol noktasına geldiğinde, Founder Studio verisi paylaştığında veya aylık büyüme değerlendirmesinde kullan.
---

# Growth — Yayın Sonrası Performans Değerlendirmesi

Sistem: `intelligence/growth/README.md`. Analiz `analytics-analyst` agent'ına verilebilir; nihai öneri COO'nundur.

## Ne zaman
- **Erken launch** (ilk anlamlı gösterim; aşırı yorumlanmaz) + 48 saat, 7 gün, 28 gün, 90 gün (yararlıysa) (takvim `founder-brief` tarafından izlenir; D-035).
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
5. Öğrenim adayı ve sonraki deney önerisi; örneklem küçük veya sonuçlar dağınıksa "Belirsiz" etiketiyle.

## B2. Analiz çerçevesi — resmî kavram ≠ bizim proxy'miz (D-036)
YouTube'un resmî öneri kavramları (P-04): **Appeal** (izlemeyi seçtiler mi) · **Engagement** (izlemeye devam ettiler mi) · **Satisfaction** (memnun kaldılar mı; YouTube anket vb. dahil kendi sinyalleriyle ölçer, **bize görünmez**). Bizim Studio'da gördüğümüz metrikler bu kavramların **iç proxy'leridir**; "YouTube'un resmî satisfaction sinyali" diye etiketlenmez.
| Sınıf | Metrik (Studio) | Etiket |
|---|---|---|
| Appeal proxy | gösterim · trafik kaynağına göre CTR · Home/Suggested gösterim payı · native A/B sonucu (watch time share) | INTERNAL PROXY (A/B sonucu = YouTube ölçümü) |
| Engagement proxy | watch time · AVD · ortalama izlenen % · ilk 30 sn intro retention · düşüş/sıçrama/top moments | INTERNAL PROXY |
| Outcome (satisfaction'ın yerine geçmez) | beğeni/yorum (bağlam) · kazanılan abone · geri dönen izleyici · end screen CTR · sonraki izleme | INTERNAL OUTCOME |
| Discovery | Search terms · Suggested kaynak videolar · Browse · External | TRAFFIC CONTEXT |
- **Sabit evrensel eşik yok.** Karşılaştırma: trafik kaynağı · video yaşı · gösterim hacmi · aynı formattaki kanal baz çizgisi · benzer uzunluk · kendi geçmişimiz.
- Search terms ve Suggested kaynakları bir sonraki talep araştırmasına (`video-launch-os` §2) girer.
- **Her analiz turunun kayıt formatı** (results/VID-XXX.md "Bulgular" tablosu):
| Observation | Confidence (Düşük/Orta/Yüksek + örneklem) | Possible cause | Evidence | Action | Rule update needed? (Hayır / Aday → L-/CF-) |
|---|---|---|---|---|---|
- **Tek videodan genelleme yok:** tek videoya dayalı bulgu en fazla "Aday"; kural güncellemesi için tekrar (≥2 video aynı yön) veya güçlü deney gerekir.

## D. Öğren → sistemi değiştir (her postmortem)
Sorun sınıfı: **TOPIC · PACKAGING · SEARCH INTENT · HOOK · NARRATIVE · VISUAL · AUDIO · RIGHTS · PUBLISHING · DISTRIBUTION**.
- Videoya özgü → yalnız o video / bir sonraki deney.
- Sistemik, tekrar edebilir → ilgili doctrine/skill/rule aynı turda güncellenir (CF- veya L- kaydıyla); Founder aynı dersi yeniden keşfetmez.

## C. Aylık büyüme değerlendirmesi
- Alt konu × (CTR, APV, izlenme saati, abone/1k, video başına maliyet) tablosu.
- Trafik kaynağı karışımı değişimi.
- Kaynak ayırma önerisi: hangi alt konuya daha fazla video, hangisi keşifte kalsın, hangisi dursun. K1 güveni düşükse yalnız gözlem ve sinyal.
- `heuristics.md` §4: kendi verimizin çürüttüğü genel kural varsa ekle.
- Tekrar doğrulanan öğrenim → `company/lessons.md`; strateji etkisi varsa `decision-review`.

## Founder'a sunum
```
[Video] 28 günde: [1 cümle sonuç, baz çizgisine göre].
Beklentimize göre: [tuttu / altında / üstünde] — çünkü [kanıtlı tek sebep].
Para tarafı: [maliyet], [gelir], [kâr/zarar]; kendini [X] izlenmede amorti eder.
Bundan sonra: [tek öneri].
```

- **Launch değişkenleri (D-035/D-036):** publish package (dağıtım tipi, A/B sonucu, yayın zamanı deneyi) sonuç kartına bağlanır.
- **Marka değişkenleri (D-031):** sonuç kartına case accent, thumbnail DNA (object/evidence/conflict), ident biçimi ve muted preview gate sonucu yazılır; bunlar zamanla CTR/retention ile karşılaştırılır (tek videodan kural çıkarılmaz).

## Kurallar
- Korelasyonu nedensellik gibi sunma; küçük örneklemi belirt.
- Sonuç kartı tahmini değiştirmez; başarısız tahminler silinmez.
- Studio/API erişimi için credential repoya girmez; API bağlantısı Founder onayı gerektirir.
