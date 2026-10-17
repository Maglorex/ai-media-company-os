---
name: production-scene-plan
description: The Industrial Casebook için tek yetkili Production Scene Plan — script/beat sheet'i sahne sahne gerçek görsel fikre çevirir; her önemli beat'te Story Function, Claim, Evidence Anchor, Presentation Visual, Visual Idea, Motion / Spatial Behaviour, Transition Logic, Sound Role, UI Role, Rights / Asset Readiness, Anti-PowerPoint scene test ve scene'den sonra araç önerisi. Asset listesi değildir. Eski visual-plan, edit-plan, source-to-visual ve visual-storytelling'in yerini alır. Pipeline aşama 5 (D-046). Asset indirmez, görsel/render üretmez.
---

# Production Scene Plan

> Kanal canon'u önce gelir (D-045): özellikle `04-visual-storytelling.md` (TIC-13, TIC-15–TIC-19, TIC-23–TIC-24) ve `05-editorial-motion-and-cinematography.md` (TIC-20, TIC-21, TIC-25). Pipeline: `channels/the-industrial-casebook/pipeline/README.md`. Girdi: `03-beat-sheet.md`, `04-script-vN.md` (veya dry-run'da beat sheet), evidence ledger, rights ledger, asset manifest. Çıktı: `channels/the-industrial-casebook/cases/<VID>/05-scene-plan-vN.md` (`TEMPLATE.md`). Araç ayrıntıları: `TOOL-LIBRARY.md`.
> Bu skill eski `documentary-visual-plan`, `documentary-edit-plan`, `source-to-visual` ve `documentary-visual-storytelling`'in davranışlarını tek planda toplar (eşleme: `channels/the-industrial-casebook/pipeline/consolidation-map.md`). Zaman kodları ve VO senkronu final VO'dan sonra Stage 4 handoff'ta üretilir.

## 1. Sıra: önce sahne, sonra araç
1. Beat'in **Story Function**'ı ve **Claim**'i beat sheet'ten gelir.
2. **Evidence Anchor:** claim'i ne kanıtlıyor? (ledger satırı). Kanıt dürüstlüğü HARD: etiket ledger'a bağlı, belgeye sahte öğe eklenmez, çekilen değer birebir.
3. **Presentation Visual:** izleyiciye bu fikri en iyi ne anlatır / hissettirir? Evidence Anchor ile **ayrı karardır**; gerçek source bulunması bu kararı bitirmez (TIC-15).
4. **Visual Idea:** sahnenin kendisi — ne görülür, nasıl değişir, izleyici neyi anlar.
5. **Anti-PowerPoint scene test:** "Bu gerçekten scene mi, yoksa hareket verilmiş slide mı?" — cevap cümleyle.
6. **Tool:** sahne belli olduktan sonra önerilir (TOOL-LIBRARY); gerekçe: sahnenin ihtiyacı · doğruluk · haklar · maliyet/karmaşıklık · production value. Pahalı/karmaşık araç kendiliğinden daha iyi değildir. AI otomatik son çare değildir: beş ölçüt (scene need, accuracy need, rights, disclosure, production value — TIC-18).

## 2. Her önemli beat bloğu (`### SP-NN — kısa ad`; alanlar zorunlu)
- **Beat:** B-NN (beat sheet) — bir SP yalnız **ardışık** beat'leri birleştirebilir; beat sırası scene plan'de sessizce değiştirilmez, gerekirse önce beat sheet değişiklik kaydıyla değişir
- **Story Function:** …
- **Claim:** … (veya "none — framing beat")
- **Evidence Anchor:** ledger ID'leri (C-/Q-/V-/E-) veya "none — framing beat"
- **Presentation Visual:** izleyiciye anlamı taşıyan görüntü — **dosya adı veya asset ID tek başına yeterli değildir**
- **Visual Idea:** sahnenin akışı (başlangıç durumu → değişim → izleyicide kalan anlam)
- **Motion / Spatial Behaviour:** hareketin taşıdığı şey (reveal · spatial · scale · mechanism · transformation · progression · hold) veya "none — gerekçe" (TIC-20; her beat'e motion eklenmez)
- **Transition Logic:** bu sahnenin sonucu bir sonrakinin başlangıcına nasıl dönüşür (TIC-21) veya bilinçli kesme/noktalama nedeni
- **Sound Role:** narration / müzik / ambiyans / sessizlik / SFX'in bu sahnedeki işi (TIC-22)
- **UI Role:** guide / compare / label / highlight / source clarity — veya "none" (UI'sız daha güçlüyse UI yok, TIC-23)
- **Rights / Asset Readiness:** her asset için (`;` ile ayrılmış) V-/AI- ID veya "own graphic" + **hak durumu açıkça** (rights ledger / evidence ledger §C) + **tek hazırlık durumu**: `READY` (dosya var, hak kanıtlı) · `TO_PRODUCE` (bizim üreteceğimiz grafik/AI) · `NEEDS_SOURCE` (fikir güçlü, kaynak aranacak) · `NEEDS_RIGHTS` (kaynak var, hak çözülmedi) · `MISSING` (gerekli ama yok). Yaratıcı planlama mevcut asset havuzuna mahkûm değildir: güçlü bir Presentation Visual, açıkça `NEEDS_SOURCE`/`NEEDS_RIGHTS` işaretliyse reddedilmez. Reddedilen: hazırlığı belirsiz asset · hak durumu saklanan asset · hakkı çözülmemiş kaynağın `READY` (gerçek ve kullanılabilir) gibi sunulması · `REJECTED` asset'in kullanım planı
- **Anti-PowerPoint:** scene test cevabı
- **Tool:** önerilen araç(lar) + tek cümle gerekçe
Örnek mantık: *"Belgedeki maliyet satırını Evidence Anchor olarak göster; rakamı izole et; ardından rakamı servicing infrastructure'ın fiziksel parçalarına dönüşen açıklayıcı sekansa bağla."* — "Presentation Visual = photo123.jpg" kabul edilmez.
Lint: `os/lib/pipeline.mjs` (`lintScenePlan`) alanları, dosya-adı-yalnız Presentation Visual'ı, Motion amacını, Evidence Anchor ve hak alanını kontrol eder.

## 3. Korunan kurallar (eski skill'lerden)
- **Arşiv footage:** her videoda uygun olduğunda hareketli görüntü taranır (NARA, LoC, müze ve PD koleksiyonları). Arşivde bulunmak telif güvenliği değildir; `unclear` asset prototype dahil kullanılmaz. Footage söylenen olayın kaydı değilse öyle sunulmaz.
- **Fotoğraf dönüştürme:** uzun yavaş zoom varsayılan değildir; önce "bu fotoğraftan hangi hikâye bilgisi çıkar?" — subject isolation, katman ayrımı, detail reveal, spatial crop, before/after, map/document continuity, Object Carry. Arşiv doğal renginde kalır.
- **Belge:** fiziksel nesne gibi ele alınır; okunabilir süre verilir; söylenen rakam ekranda aynı anlamla görünür.
- **Katman ayrımı:** arşiv (gerçek, kaynak etiketi) · bizim açıklama grafiğimiz (marka dili, belge taklidi yok) · illüstrasyon/rekonstrüksiyon (stilize, gerekirse "Illustration").
- **Tipografi ve altyazı:** closed captions her videoda (SRT); ekran tipografisi yalnız kritik sayı, kısa alıntı, dönüm noktası, yer/tarih, isim, payoff.
- **Script bütünlüğü:** görsel bulunamadı diye yeni factual claim eklenmez; görsel sorunu "production problem" olarak işaretlenir; hikâye değişikliği gerekiyorsa script change kaydıyla (pipeline §2).
- **Haklar:** her harici asset bir V-ID'ye ve rights ledger satırına bağlanır; CC BY-SA yükümlülükleri ayrıca not edilir.
- **Dünya ataması:** Archive / Evidence / Engineering / Case UI (Brand System v1 kimliği).

## 4. Planın sonunda
- **Scene progression özeti:** sahneler merak yolculuğunu nasıl ilerletiyor (beat sheet ile tutarlı mı).
- **Teşhis (DIAGNOSTIC, hedef değil):** literal sahneler (yalnız söyleneni gösteren) · tek araca çöken bölüm · bilgi bütçesi bitmiş görüntü · promise'in görsel karşılığı · kanıt/illüstrasyon ayrımı · sessiz izlemede iskelet okunuyor mu.
- **Asset durumu:** READY / TO_PRODUCE / NEEDS_SOURCE / NEEDS_RIGHTS / MISSING listesi ve riskler. **HARD STOP Stage 4'tedir:** handoff'a giren planda `NEEDS_SOURCE`, `NEEDS_RIGHTS`, `MISSING` veya çözülmemiş hak varsa iş Strong PC'ye gidemez (`os/lib/pipeline.mjs` `productionBlockers`; rights ledger satırı da zorunlu). Bu aşamada çözüm yolu yazılır (araştırma isteği, alternatif sahne, Founder GUIDED ACTION); Founder'ın dış araçta yapacağı işler (GUIDED ACTION: araç · neden · tam prompt · dosya adı · klasör · sonraki adım).
- Final creative PASS bu planı yazan oturumdan gelmez → `creative-qa`.

## 5. Founder'a (sade Türkçe)
Plan hazır mı · en güçlü 2–3 sahne fikri · eksik/riskli asset · Founder'ın yapması gereken dış iş (varsa, hazır prompt ile). Araç/kamera/renk sorusu sorulmaz.
