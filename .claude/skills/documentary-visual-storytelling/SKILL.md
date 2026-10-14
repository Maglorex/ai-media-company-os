---
name: documentary-visual-storytelling
description: Bütün belgesel videoları (N2 / Industrial Casebook) için görsel anlatım prosedürü (kurallar kanal canon'undadır, D-045) — her sahnenin işi, görsel yenilenme, visual language library, arşiv footage kuralı, seçici tipografi ve altyazı, ritim, ChatGPT görsel akışı ve "slideshow" teşhis testleri. Creative treatment, görsel plan, edit plan, production handoff yazılırken ve prototype/final video değerlendirilirken kullan. Asset indirmez, görsel üretmez.
---

# Documentary Visual Storytelling

> **Kanal canon'u önce gelir (D-045):** The Industrial Casebook için yaratıcı/growth kurallarının tek yetkili kaynağı `channels/the-industrial-casebook/canon/README.md`. Bu skill prosedürdür; çelişkide canon kazanır. AI kararı TIC-18'in beş ölçütüyle verilir (§9); teşhis testleri (§10) DIAGNOSTIC'tir. Film dili: canon `05-editorial-motion-and-cinematography.md`.

Kapsam: bütün faceless belgesel videolar. Kurallar: kanal canon'u (`.claude/rules/documentary-creative-standards.md` yükleyicisi üzerinden). Kanıt/haklar: `documentary-evidence-ledger`. Doctrine: `intelligence/creative/doctrine/documentary-production-doctrine-v1.md` (anlatı/görsel/motion grameri, anti-pattern, prototype rubric). Benchmark: `intelligence/creative/documentary-style-benchmarks.md`. Kütüphane ayrıntısı: `VISUAL-LANGUAGE-LIBRARY.md` (bu klasör). **Marka ve sahne kararı (D-031):** `intelligence/creative/brand/brand-system-v1.md` · `source-to-visual` (karar sırası, AI politikası, hazır prompt şablonu — bu skill'in §9'undan önce gelir) · `muted-preview-gate`.

## 1. Sahne işi kuralı
Bir sahne yalnız anlatıcının söylediği nesneyi göstermek için var olamaz. Her sahne en az bir iş yapar ve bu iş planda yazılır:
**yeni bilgi · merak · gerilim · karşılaştırma · nedensellik · ölçek · yer/zaman · kanıt · duygusal atmosfer · payoff.**
"Narrator 'gemi' dedi → gemi fotoğrafı" bir iş değildir; gemi fotoğrafı ancak ölçek, yer/zaman, karşıtlık veya atmosfer işi görüyorsa kalır.

## 2. Varsayılan olmayan çözüm
Fotoğraf + yavaş zoom/pan ve tam ekran bilgi kartı **varsayılan değildir**. Kullanılabilir, ama gerekçesi yazılır ve art arda zincir oluşturmaz. Bilgi kartı yerine öncelik: bilgiyi görüntünün üstüne/içine entegre etmek (belgede vurgu, haritada etiket, footage üstünde kısa sayı).

## 3. Görsel yenilenme = yeni bilgi veya yeni bakış
- Sabit "her X saniyede kesme" kuralı yok. Her görsel durumun bir **bilgi bütçesi** var: izleyici onu okuduğunda (rakam okundu, yer tanındı, belge satırı görüldü) bütçe biter.
- Bütçesi bitmiş görsel, yeni bir şey katmadan ekranda kalmaz. Sonraki durum ya yeni bilgi (yeni belge, yeni rakam, yeni yer) ya yeni bakış (detaya inmek, ölçeğe çıkmak, karşılaştırmaya açmak, zamanı ilerletmek) getirir.
- Hareket yalnız "hareket olsun" diye eklenmez. Kamera hareketi bir şeye götürür: satıra, detaya, karşıtlığa, ölçeğe.
- Uzun bekleme bilinçli olabilir (alıntının okunması, bir rakamın oturması, atmosfer) — gerekçesi yazılır.

## 4. Hook ve vaat görünürlüğü
Title/thumbnail'ın sattığı ana çatışma/merak erken bölümde **görsel olarak** da görünür: thumbnail'daki obje veya belge ilk dakikada ekrana gelir. Bağlam (kuruluş, tarihçe, "ne tür bir gemiydi") otomatik olarak başa konmaz; ancak bir sonraki kanıtı anlamak için gerektiği anda, gerektiği kadar verilir.

## 5. Visual language library
Her videoda hepsi zorunlu değil; seçim sahnenin işine göre yapılır. Ayrıntı, ne zaman/hangi araç/hak notu: `VISUAL-LANGUAGE-LIBRARY.md`.
archive footage · archive photography · primary documents · motion graphics · maps · diagrams · charts · technical cutaways · 2.5D photo/parallax · object isolation · timeline animation · selective kinetic typography · AI-generated illustration · stylized reconstruction · atmospheric establishing visuals.
Bir videonun görsel dili treatment'ta 3–6 ana araçla tanımlanır (imza araç + destekler); her bölümün baskın aracı yazılır ki video tek bir araca (ör. foto+pan) çökmesin.

## 6. Arşiv footage kuralı
- Her video araştırmasında, uygun olduğunda, **hareketli görüntü** taranır (yalnız fotoğraf değil): National Archives (NARA), Library of Congress, devlet film arşivleri, müze arşivleri, public-domain film koleksiyonları (ör. Internet Archive / Prelinger), üretici tarihî filmleri, newsreel arşivleri. Görev `research-analyst`'e verilir; sonuç video klasöründe `<video>-archive-footage-scan.md`.
- **Arşivde bulunmak telif güvenliği demek değildir.** Newsreel'ler (Universal, Pathé, Polygoon vb.), sonradan eklenmiş müzik/anlatım, üçüncü taraf dijitalleştirme kopyaları ayrı hak taşıyabilir. Her footage evidence/rights ledger'a V-ID ile, sahibinin kendi sayfasındaki hak ifadesiyle girer. Kontrol: sahibin kullanım kaydı, telif ibaresi/hak beyanı (jenerik dahil), devlet çalışanı işi mi yüklenici işi mi ve hak devri, ticari YouTube kullanımı. Açıkça güvenli değilse (`unclear`) **prototype dahil** production asset'i olmaz, indirilip üretim klasörüne konmaz; yalnız referans olarak izlenebilir (D-026). Yüklenici (contractor) yapımı devlet filmleri otomatik kamu malı sayılmaz.
- Footage, söylenen olayın kaydı değilse öyle sunulmaz (dönem/yer altyazısı doğru; "temsili" ise belirtilir).

## 7. Tipografi ve altyazı
- **YouTube closed captions her videoda hazırlanır** (VO zaman damgalarından SRT; yayın QA'sında kontrol).
- Sürekli hardcoded (TikTok tipi) altyazı varsayılan değildir.
- Ekran tipografisi seçicidir, yalnız şu anlar için: kritik sayı · kısa alıntı · dönüm noktası · yer/tarih · önemli isim · kısa payoff. Her tipografi anı handoff'ta listelenir.
- Kendi retention verimiz oluştukça altyazı/tipografi yaklaşımı deneyle (`intelligence/experiments/`) geliştirilir.

## 8. Ses ve müzik yönü
Müzik ve SFX yönü treatment'ta **işlev** olarak yazılır (gerilim kurmak, nefes, dönüm noktası, payoff), anlatıcıyla yarışmaz. Kaynak, lisans, audio ledger ve attribution: `documentary-music-sfx` (D-024). Treatment yalnız yönü verir, parça seçimi ve kaydı o skill'dedir. Ses kurgusu: `.claude/rules/audio-production.md`.

## 9. AI görsel (ChatGPT Image Generation) akışı
- **Karar ölçütleri (TIC-18):** scene need · accuracy need · rights · disclosure · production value. Gerçek arşivin var olması AI'ı kendiliğinden dışlamaz ve AI otomatik son çare değildir; önce sahnenin ne anlatması gerektiği, sonra araç seçilir (TIC-19). Tipik kullanımlar: açıklayıcı illüstrasyon · görünmeyen süreç · blueprint/cutaway/diyagram · mekânsal açıklama · atmosferik ama **açıkça illüstratif** sahne · visual reset · thumbnail asset.
- **Ne zaman değil (HARD, TIC-17):** doğrulanmamış yerleşim/görünüş ayrıntısını gerçek gibi göstermesi gerekiyorsa; kanıt taşıması beklenen her yerde (AI kanıt değildir).
- **Founder deneyimi:** Founder "ChatGPT'ye ne yazayım?" diye düşünmez. COO, `VISUAL-LANGUAGE-LIBRARY.md` §AI prompt formatıyla tek kod bloğunda eksiksiz prompt verir: "Bu sahne için ChatGPT'ye şunu olduğu gibi gönder:". Gelen görsel production klasörüne konur, asset kaydına `AI-GENERATED / ILLUSTRATIVE` + prompt + sahne ile işlenir.
- **Ekranda:** AI görsel arşiv katmanından stil olarak ayrılır (stilize, foto-gerçekçi değil); gerekirse küçük "Illustration" etiketi. Asla arşiv kanıtı gibi gösterilmez, kaynak etiketi taklit edilmez.
- **Açıklama riski:** Gerçek bir olayın/yerin foto-gerçekçi yeniden üretimi yapılırsa Release Gate G-11'de (`pre-publish-qa`) disclosure değerlendirilir (D-036) (resmî YouTube sayfası yayın öncesi yeniden kontrol edilir). Kurallar ayrıca: `production/tools/README.md` §ChatGPT Image Generation.

## 10. Teşhis testleri (treatment, handoff ve QA'da çalıştırılır — DIAGNOSTIC)
1. **Literal test:** Sahnelerin çoğu yalnız "söyleneni gösteriyor" mu? → iş eklenmeli.
2. **Slideshow testi:** Primary görsellerin dizisi "fotoğraf/kart → fotoğraf/kart" zinciri mi? Bir bölüm tek araca mı çöktü?
3. **Sessiz izleme testi:** Ses kapalıyken görsel dizi hikâyenin iskeletini (yer, ölçek, karşıtlık, kanıt) anlatıyor mu?
4. **Ölü görüntü testi:** Bilgi bütçesi bitmiş halde kalan görsel durum var mı?
5. **Vaat testi:** Thumbnail'daki obje/çatışma ve başlığın sözü erken bölümde görünüyor mu?
6. **Kanıt ayrımı testi:** Arşiv, bizim grafiğimiz ve AI illüstrasyon ekranda birbirinden ayırt edilebiliyor mu?
Testte kalan madde Founder'a gitmeden düzeltilir.

## 11. Benchmark prensipleri
`intelligence/creative/documentary-style-benchmarks.md` (PROVISIONAL v0.1) kare incelemesiyle gözlenmiş prensipler (P-1 paradoks önce · P-2 belge fiziksel nesne · P-3 yer ile aç · P-4 sonuç tek karede · P-5 tek araca çöküş yok) treatment ve handoff'ta referans verilir; taklit edilmez.

## 12. Veri önceliği
Kendi kanal verimiz (retention eğrisi, Founder prototype kararları, CF kayıtları) benchmark'tan ve genel creator tavsiyelerinden önce gelir. Benchmark prensipleri test edilecek hipotezdir.
