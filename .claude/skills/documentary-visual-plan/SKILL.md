---
name: documentary-visual-plan
description: Founder onaylı documentary script'ini sahne sahne üretilebilir bir görsel plana çevirir; her görseli anlatıya, evidence ledger'a ve kullanım hakkına bağlar, eksik/riskli asset'leri işaretler. Asset indirmez, görsel/video üretmez, kurgu veya render başlatmaz.
---

# Documentary Visual Plan

Kapsam: N2 belge-öncelikli faceless belgeseller. Ön koşul: Founder onaylı script + güncel `documentary-evidence-ledger` + `documentary-creative-treatment` (görsel dil). **Bağlayıcı taban: `documentary-visual-storytelling`** (sahne işi kuralı, visual language library, footage kuralı, teşhis testleri); bu skill onunla çelişirse o geçerlidir. Çıktı: `production/.../<video>-visual-plan-vN.md`. Founder'a tablo varsayılan olarak gösterilmez (`founder-interface`); sade özet verilir, "Detayları göster" ile açılır.

## Her sahne için cevaplanır
İzleyici ne duyuyor · **sahnenin işi ne** (yeni bilgi/merak/gerilim/karşılaştırma/nedensellik/ölçek/yer-zaman/kanıt/atmosfer/payoff) · ekranda ne görmeli · görsel bu işi nasıl yapıyor (yalnız söyleneni göstermek yetmez) · materyal gerçek mi (arşiv/belge/fotoğraf) yoksa bizim üretimimiz mi (grafik/harita/motion) · kaynak/lisans belli mi · bulunması gereken asset var mı · aynı görsel gereğinden uzun kalıyor mu.

## Kurallar
1. **Görsel hikâyeye hizmet eder.** Dekorasyon değil, anlamayı kolaylaştırma.
2. **Kanıt ekranda.** Güçlü belge/rapor/tablo/teknik kanıt varsa ekranda gerçekten gösterilir (alıntılanan satır vurgulanır, sayfa künyesi küçük not olarak).
3. **Generic stock'a bağımlılık yok.** Gerçek arşiv film her videoda aranır (`documentary-visual-storytelling` §6). Araç seçimi sabit öncelik sırasıyla değil sahnenin işine göre yapılır; fotoğraf + yavaş pan ve tam ekran bilgi kartı varsayılan değildir. Uzun, alakasız stock kullanılmaz; kısa ve açıkça "atmosfer" amaçlı kullanım planda gerekçelendirilir.
4. **Uydurma kanıt yok.** Bizim grafik/animasyon/rekonstrüksiyonumuz gerçek belge gibi sunulmaz. Görsel dil ayrımı zorunludur (ör. arşiv: kaynak etiketi + doğal doku; bizim grafiklerimiz: tutarlı marka stili + "illustration/graphic" niteliği). Belge sayfalarında metin ve sayılar değiştirilmez; yalnız kırpma, büyütme, vurgu, temizlik.
5. **Haklara duyarlı.** Her dış asset bir ledger görsel ID'sine (V-xx) bağlanır. Durum: public domain · CC (tür; BY-SA'nın video için yükümlülükleri ayrıca not edilir) · attribution required · permission required · unclear. `unclear` ve `permission required` final için güvenli sayılmaz.
6. **Üretilebilirlik.** Mevcut/ücretsiz araçlarla yapılabilir olmalı: zoom/pan, belge vurgusu, basit 2D grafik, harita, motion typography, şema animasyonu (Remotion/FFmpeg veya mevcut editör). Pahalı AI video servisini zorunlu kılan format tasarlanmaz. AI görsel yalnız kural 9'a göre ve Founder'ın ChatGPT'de üretmesiyle kullanılır; bu skill görsel üretmez.
7. **Görsel yenilenme = yeni bilgi veya yeni bakış.** Sabit kesme kuralı yok; ama bilgi bütçesi bitmiş görsel yeni bir şey katmadan kalmaz. Hareket bir şeye götürür (satıra, detaya, ölçeğe, karşıtlığa); "hareket olsun" diye eklenmez. Plan sonunda §10 teşhis testleri çalıştırılır.
8. **Script bütünlüğü.** Görsel bulunamadı diye senaryoya yeni factual claim eklenmez, metin değiştirilmez. Asset sorunu "production problemi" olarak işaretlenir ve alternatif görsel çözüm önerilir.
9. **AI görsel (ChatGPT Image Generation):** yalnız gerçek asset yoksa veya anlatılan şey zaten açıklayıcı bir görselleştirmeyse değerlendirilir; tarihî kanıt uydurmaz, gerçek arşiv/belge/olay kaydı gibi sunulmaz. Planda tür `AI-GENERATED / ILLUSTRATIVE` olarak yazılır; YouTube sentetik içerik açıklama gerekliliği yayın öncesi kontrol edilir. Fayda varsa Founder'a eksiksiz prompt hazır verilir (amaç, gösterilecek nesne/olay, doğruluk sınırları, dönem, kompozisyon, en-boy oranı — video için 16:9, stil, kesinlikle gösterilmemesi gereken yanlış unsurlar). Kurallar: `production/tools/README.md`.
10. **Zorluk ölçeği:** Kolay (mevcut asset + basit hareket) · Orta (özgün grafik/harita) · Zor (özgün teknik animasyon veya bulunması zor asset).

## Sahne kaydı (çalışma dosyası, her sahne)
Script/VO bölümü (ilk–son kelimeler veya paragraf no) · sahnenin işi · visual language aracı · visual objective · primary visual · secondary/supporting visual · asset source/status (hazır / aranacak / üretilecek) · rights status (ledger V-ID) · motion/edit idea · production difficulty · notlar (süre, tekrar riski).

## Dosya sonunda
Asset envanteri (hazır / aranacak / üretilecek) · riskli/eksik asset listesi ve alternatifleri · üretilecek özgün grafik listesi (stil şablonu adayları) · ledger'a eklenecek yeni V-ID'ler.

## Founder'a özet (sade Türkçe)
Görsel plan hazır mı · genel görsel tarz · en güçlü 3 görsel an · eksik/riskli asset · mevcut araçlarla uygulanabilir mi · sıradaki doğal adım.
