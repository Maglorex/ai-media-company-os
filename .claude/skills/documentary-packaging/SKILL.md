---
name: documentary-packaging
description: Tam senaryodan önce bir video fikri için dürüst ama güçlü title + thumbnail vaadi tasarlar (5 concept), her vaadin videodaki kanıtla karşılanıp karşılanmadığını kontrol eder, birincil öneri + yedek seçer. Görsel üretmez, karar vermez.
---

# Documentary Packaging

Kapsam: `Industrial & Technology Autopsies` (N2), faceless, belge-öncelikli belgesel. Girdi: `documentary-virality-gate` sonucu `READY FOR PILOT` olan fikir + kaynak/kanıt notları (örn. `production/pilots/.../P*.md`). Çıktı: packaging değerlendirme dosyası; görsel, senaryo, ses veya render üretilmez.

## Ne yapmaz
- Tıklanma veya CTR **tahmin etmez**; "algoritma böyle ister" demez.
- Nihai packaging'i seçmez: öneri danışma notudur; onay `decision-review`/Founder'dadır. Yayın, thumbnail yapımı, harcama ve araç kurulumu başlatmaz.
- Sabit kural koymaz: CTR eşiği, zorunlu kelime, "yüz kullan", karakter sayısı yok. Uzunluk ve düzen bağlama göre değerlendirilir.

## Veri önceliği
Şirketin kendi CTR / Test & Compare / Studio verisi her zaman genel internet heuristic'lerinden üstündür; çelişirse şirket verisi kazanır. Üçüncü taraf creator tavsiyeleri `[VARSAYIM]` etiketli **test edilecek hipotezdir**. Kanal yayına başlamadan önce tüm title/thumbnail kararları hipotezdir ve öyle yazılır.

## İlkeler
1. **Evidence First:** başlık ve thumbnail'in temel iddiası mevcut birincil/güçlü kaynakla desteklenmeli; her iddia kaynak notuna bağlanır.
2. **One Promise:** her çift tek merak vaadi taşır.
3. **Thumbnail ≠ Title:** thumbnail başlığı tekrarlamaz; ikisi birlikte tek mesaj.
4. **Documentary Fit:** yüz/talking-head varsayımı yok. Belge, ürün, gemi, makine, teknik çizim, sayı, grafik, logo, harita, fiziksel sonuç kullanılabilir.
5. **Specificity:** "failure/disaster/mistake" gibi soyut kelime yerine videoya özgü gerçek unsur.
6. **Curiosity Without Distortion:** boşluk yarat, sonucu yanlış temsil etme. Yasak: kanıtın söylemediği nedensellik, karşılaştırmalı farkı "zarar/kayıp" diye sunmak, uydurma dram, doğrulanmamış sonucu merkeze koymak.
7. **Feed Readability:** küçük boyutta tek bakışta anlaşılır: en fazla 1 ana obje + 1 yardımcı unsur; text zorunlu değil, gerekiyorsa çok kısa.
8. **Originality:** rakip thumbnail taklit edilmez; fark mümkünse belge/grafik/teknik kanıttan gelir.
9. **Sourceable Visuals:** temel görselin lisans/kaynak durumu önceden kontrol edilebilir olmalı (kamu malı mı, öğe bazında doğrulandı mı).
10. **Testable Hypotheses:** her seçim "şu varsayım test edilecek" biçiminde yazılır.

## Süreç
1. Vaadi tek cümleyle yaz; **doğruluk sınırlarını** listele (kanıtın söylediği / söylemediği). Sınır ihlali olan concept elenir.
2. **5 concept** üret (farklı merak açıları; hepsi aynı sınırlar içinde).
3. Her concept için tablo satırı (aşağıda), sonra karşılaştır.
4. **Birincil öneri + 1 yedek** seç. Yedek, birincil başarısız olursa (ilk veri, Test & Compare) geçilecek alternatif; birincil kadar doğru olmalı. Koşullu yedek ise koşulu yazılır.
5. Birincil için: evidence güvenlik gerekçesi, kalan en büyük risk, yapım öncesi kapı koşulları.

## Concept formatı (her biri)
Title · Thumbnail concept · Ana obje (+ yardımcı unsur) · Varsa text · İzleyicide oluşan soru · Videonun vaadi nasıl karşılayacağı · Evidence doğruluğu (Güçlü/Orta/Zayıf + kaynak) · Lisans/görsel riski · En büyük zayıflık.

## Kaynak
`ravsau/youtuber-skills` `youtube-packaging` (commit `603367b`, MIT) prensiplerinden esinlenilerek yeniden yazıldı; metin kopyalanmadı. Kayıt: `intelligence/skill-lab/registry.md` SL-002.
