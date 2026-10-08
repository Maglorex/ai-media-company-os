---
name: documentary-virality-gate
description: Bir video fikri tam senaryo, seslendirme veya production zamanı harcanmadan önce üretime değer mi diye 12 kapıda değerlendirir; READY FOR PILOT / REVISE BEFORE PILOT / DO NOT PRIORITIZE sonucu ve tek düzeltme önerir. Viral tahmini yapmaz, karar vermez.
---

# Documentary Virality Gate

Kapsam: `Industrial & Technology Autopsies` (N2) için 10–25 dk belge-öncelikli, faceless belgesel fikirleri. Girdi: çalışma başlığı + fikir özeti (örn. `production/pilots/.../P*.md`). Senaryo gerekmez.

## Ne yapmaz
- Viral olacağını, CTR'yi veya retention'ı **tahmin etmez**.
- SHIP/KILL vermez. Sonuç **danışma notudur**; fikrin önceliği ve üretime girmesi `decision-review` ve Founder'da kalır (`founder-approval.md`).
- Yayın, ses üretimi (ElevenLabs), harcama veya araç kurulumu başlatmaz.

## Veri önceliği kuralı (değişmez)
1. Company OS'un **kendi YouTube Studio / deney verisi** her zaman genel internet heuristic'lerinden üstündür; çelişirse şirket verisi kazanır ve çelişki not edilir.
2. Üçüncü taraf creator/strateji tavsiyeleri (hook süresi, pacing, CTR/retention eşikleri, "algoritma kuralları") **şirket verisi değildir**; kesin gerçek olarak kullanılmaz.
3. CTR, retention, hook süresi gibi **sayısal eşik** yalnızca Company OS'un kendi deneylerinden (`intelligence/experiments/`, Studio verisi) geliyorsa ve kaynağı gösteriliyorsa kullanılır. Böyle veri yoksa kapılar yalnızca niteliksel değerlendirilir.
4. Platform politikası iddiaları yalnızca resmî YouTube kaynağıyla `[VERİ]`; diğerleri `[VARSAYIM]` (`evidence-and-research.md`).

## Derecelendirme
Her kapı: **Güçlü · Orta · Zayıf · Bilinmiyor** + 1 cümle gerekçe (kaynak/kanıt gösterilir). Sayısal puan toplanmaz.
**Zorunlu kapılar:** 2 Critical Decision, 3 Evidence, 4 Visual Proof, 11 Policy/Legal.

## Kapılar
| # | Kapı | Soru | Zayıf sayılır |
|---|---|---|---|
| 1 | Core Promise | İzleyici neden izlemeli? Tek cümlelik, açık vaat var mı? | Vaat konu adından ibaret |
| 2 | Critical Decision | Tek bir karar/kırılma/sistemik hata etrafında kurulabiliyor mu, yoksa kronolojik tarih mi? | Kronoloji; nedensellik kaynaksız |
| 3 | Evidence Strength | Ana iddialar birincil/güçlü ikincil kaynakla destekleniyor mu? Merkezde ekrana konabilir gerçek belge var mı? | Merkez iddia yorum/tek ikincil kaynak |
| 4 | Visual Proof | Önemli noktaların çoğu belge/arşiv/çizim/grafikle gösterilebilir mi? | Fikir generic stock'a yaslanıyor |
| 5 | Packaging Potential | Yanıltıcı olmayan title + thumbnail üretilebiliyor mu? Yüz gerekmez; belge, nesne, makine, grafik, fiziksel sonuç olur. | Her çerçeve ya yanıltıcı ya boş |
| 6 | Curiosity Gap | İzleyicinin cevabını baştan bilmediği net bir soru var mı; videoda gerçekten cevaplanabiliyor mu? | Cevap başlıkta veya herkesçe biliniyor / cevaplanamıyor |
| 7 | Stakes | Kritik kararın sonucu (para, teknoloji, endüstri, sistem, tarih) ağırlıklı mı? | Sonuç yerel/önemsiz |
| 8 | Originality | Aynı açıyla büyük kanallarca çok işlendi mi? İşlendiyse belge-öncelikli yaklaşım gerçek fark yaratıyor mu? | Aynı açı, fark kozmetik |
| 9 | Documentary Fit | 10–25 dk'yı doğal taşıyacak derinlik var mı? | Uzatma gerekiyor veya 10 dk'ya sığmıyor |
| 10 | Production Feasibility | Mevcut araç, ücretsiz arşiv ve özgün grafikle üretilebilir mi? Lisans/özel footage/pahalı AI video riski? | Ücretli veya izinli materyale bağımlı |
| 11 | Policy / Legal Risk | Reused/inauthentic content, telif, yaşayan kişiye doğrulanamayan iddia, hukuki risk? | Doğrulanamayan suçlama, lisanssız ana materyal |
| 12 | Only Us | Bu videoyu bizim kanalımızdan anlamlı kılan unsur (özgün birincil belge, az bilinen kaynak, özgün veri görselleştirme/teknik açıklama, farklı karar analizi)? | Başka kanalla yer değiştirilebilir |

## Sonuç kuralı (mekanik, kesin skor değil)
- **READY FOR PILOT:** Dört zorunlu kapının hepsi Güçlü; diğerlerinde en fazla 2 Zayıf ve her birinin düzeltme/kabul notu var.
- **DO NOT PRIORITIZE:** Bir zorunlu kapı Zayıf **ve** düzeltilemiyor (kaynak yok, görsel kanıt yok, hukuki risk giderilemiyor); veya zorunlu kapılar birlikte Bilinmiyor.
- **REVISE BEFORE PILOT:** Diğer tüm durumlar (zorunlu kapıda Orta/Zayıf-ama-düzeltilebilir, ya da 3+ Zayıf).
- *Pilot üretim testi bağlamında* (örn. EXP-001) amaç üretim modelini ölçmekse 6, 8 ve 12. kapıdaki zayıflık sonucu tek başına bloke etmez ama sonuca not düşülür: "test için uygun, yayın önceliği için değil".

## Çıktı (her değerlendirmede)
```
Core promise: ...
En güçlü 3: ...
En zayıf 3: ...
Evidence: [durum, merkez belge]
Packaging: [durum]
Production riski: ...
Policy/legal riski: ...
Sonuç: READY FOR PILOT | REVISE BEFORE PILOT | DO NOT PRIORITIZE
Pilot öncesi tek en önemli düzeltme: ...
```
Altında 12 kapılık tablo (kapı · derece · gerekçe · yalnızca Zayıf/Orta için tek uygulanabilir düzeltme). Kanıt etiketleri `[VERİ]/[VARSAYIM]/[TAHMİN]` yalnızca belirsizliğin sonucu etkilediği yerde. Çıktı değerlendirilen fikrin yanındaki dosyaya veya `production/pilots/` altına kaydedilir.

## Kaynak
Mantık, `ravsau/youtuber-skills` `youtube-virality-gate`'ten (commit `603367b`, MIT) esinlenerek yeniden yazıldı; metin kopyalanmadı. Kayıt: `intelligence/skill-lab/registry.md` SL-002, değerlendirme `intelligence/skill-lab/evaluations/2026-10-08-youtuber-skills.md`.
