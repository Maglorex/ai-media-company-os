# ChatGPT Stage B Prompt Paketi (2026-10-06)

> Kullanım: aşağıdaki bloğu olduğu gibi ChatGPT'ye (Plus, web araması/Deep Research açık) yapıştır. Yanıtı olduğu gibi Claude'a yapıştır; Claude doğrular, etiketler ve ilgili `intelligence/` dosyasına işler. Yanıt gelene kadar kaynak doğrulanmamış `[VARSAYIM]` sayılır.

---

**Rol:** Kıdemli YouTube pazar analisti ve veri araştırmacısı.

**Bağlam:** Yeni, faceless (yüz/sunucu yok), AI destekli senaryo ve seslendirmeyle (hazır ElevenLabs sesleri), orijinal long-form (10–25 dk) YouTube kanalı kuracağız. Kitle: İngilizce, uluslararası. Ücretli reklam ve dış satış yok; yalnızca organik büyüme. Ürettiğimiz her şey orijinal anlatıdır; başkasının içeriğini yeniden paketlemeyeceğiz. Aşağıdaki 4 aday nişi karşılaştırıyoruz:
- N1: Nedensellik tarih anlatıları ("X neden oldu?", yaklaşık 1500–1990 dönemi)
- N2: İş, teknoloji ve ekonomi tarihi hikâyeleri (şirket yükseliş/çöküşleri, ürün ve endüstri tarihi, finansal tarih)
- N3: Mühendislik, altyapı ve felaket/mühendislik başarısızlığı hikâyeleri
- N4: Doğa, derin deniz ve derin zaman (jeolojik/evrimsel) anlatıları
(Yedek: uzay ve astronomi.)

**Görev:** Her niş için aşağıdaki 5 soruyu, ardından 6 ve 7. maddeleri güncel verilerle yanıtla:
1. **Gerçek talep:** Niş için temsilî 10 arama ifadesinin (YouTube arama + Google Trends) son 12 aylık göreli hacmi ve trend yönü. Hacim verisi bulunamazsa açıkça "doğrulanamadı" yaz.
2. **Küçük kanal kanıtı:** 2024–2026'da sıfırdan başlayıp 0–50K abone aralığında dikkate değer izlenme alan (özellikle faceless/AI destekli anlatılı) en az 5 gerçek kanal örneği: kanal adı/link, abone sayısı, 3 en iyi videosunun izlenmesi, kanal yaşı. Bulamazsan "bulunamadı" yaz.
3. **Gerçek RPM:** Nişe özgü RPM aralığı, en az iki bağımsız kaynakla; kaynakları ve yöntemlerini belirt. Kaynaklar çelişirse çelişkiyi açıkça yaz.
4. **AI ses ve YPP:** AI/sentetik sesli anlatım kanallarının YouTube Partner Program (monetizasyon) başvurusunda 2025 ortasından sonra karşılaştığı kabul/ret vakaları; "inauthentic content" ve "reused content" politikasının nişe özgü yorumları. Yalnızca resmî YouTube sayfaları kesin bilgi sayılır; diğerlerini "yorum" olarak etiketle.
5. **AI görsel etiketi:** Fotogerçekçi AI rekonstrüksiyon/tarihsel sahne görsellerinin YouTube'un AI açıklama/etiket kuralları ve güncel uygulaması (2026 dahil); hangi görsel türleri açıklama gerektirir?

6. **YPP eşik değişikliği:** YouTube'un resmî Help Center / topluluk duyurusuna göre 2027-02-01'den itibaren yeni YPP başvuruları için 1.000 abone + 8.000 izlenme saati (veya 20M Shorts izlenmesi) şartı gerçekten geliyor mu? Resmî sayfa linkini ver; mevcut ortaklara etkisini ve 500 abone fan-funding katmanını teyit et.
7. **Niş özel doğrulamalar:**
   - N2: Business Casual (Business Casual kanalı) son 12 ayda güncel izlenme/trafik alıyor mu, yoksa 1,1M ortalama yalnızca ömür boyu mu? Ruined America, The Money Files, Lost Industries kanallarının abone ve izlenme verilerini teyit et. "Business & Finance" kanallarında gerçek Studio verisiyle RPM medyanı nedir (AIR Media-Tech medyan ≈ $2 mi, blog derlemeleri $6–28 mi?).
   - N3: Ölüm veya felaket içerikli belgesel anlatımlarında (kaza görüntüsü olmadan) reklam uygunluğu (limited ads) deneyimleri; güncel resmî reklamveren dostu içerik rehberi. Blackout Docs ve Mentour's Black Box video izlenme dağılımı.
   - N1: 2024–2026'da sıfırdan başlayıp büyüyen tarih kanalı örnekleri (Context History vb. dışında).
   - N4: 0–20K aralığında doğrudan deep-sea/derin zaman kanalı büyüme örnekleri; fotogerçekçi AI rekonstrüksiyon etiketinin güncel uygulaması.

**Kapsam / sınırlar:** Yalnızca 2024–2026 verisi (eski veriyi tarihiyle belirt). İngilizce içerik. Yatırım/sağlık tavsiyesi, haber/tepki içerikleri kapsam dışı. Tahmin ile veriyi ayır.

**Yöntem:** Güncel web araştırması yap. Her iddia için kaynak linki ve tarih ver. Bilmediğin veya doğrulayamadığın şeyi açıkça "doğrulanamadı" diye belirt; tahmini veri gibi sunma.

**Çıktı formatı:**
1. Kısa özet (≤5 madde)
2. Bulgular — niş (N1–N4) ve soru (1–5) bazında; her biri: iddia · kaynak · tarih · güven (yüksek/orta/düşük)
3. Belirsizlikler ve çelişkili kaynaklar
4. Karşılaştırma tablosu: niş × (talep, küçük kanal kanıtı, RPM aralığı, YPP/AI riski, AI görsel etiket riski); sonda hangi nişin bu verilere göre öne çıktığına dair bağımsız görüşün (gerekçeli)

---

**Geri dönüş:** Founder yanıtı olduğu gibi Claude'a yapıştırır.
