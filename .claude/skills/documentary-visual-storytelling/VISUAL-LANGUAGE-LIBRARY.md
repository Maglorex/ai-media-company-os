> **SUPERSEDED — 2026-10-14 (D-046).** Güncel araç kütüphanesi: `.claude/skills/production-scene-plan/TOOL-LIBRARY.md`. Aşağıdaki metin tarihseldir.

# Visual Language Library

> `documentary-visual-storytelling` §5'in ayrıntısı. Araçlar: Remotion 4.0.529 (render PC), Premiere/After Effects/Photoshop/Illustrator 2026 (render PC, mevcut abonelik), ChatGPT Image Generation (mevcut abonelik). Yeni paket/plugin Founder onayı ister.
> "En iyi işi" sütunu sahne işi kuralına (SKILL §1) bağlıdır. Hak notu her zaman ledger'a gider.

| Araç | En iyi işi | Ne zaman kullan | Tuzak | Üretim (bizde) | Hak / kanıt notu |
|---|---|---|---|---|---|
| **Archive footage** | yer/zaman, atmosfer, ölçek, "gerçekten oldu" hissi | Olayın/dönemin hareketli kaydı varsa; açılışta ve bölüm girişlerinde en güçlü gerçeklik aracı | Konu dışı "dönem havası" footage'ı olay kaydı gibi sunmak | Premiere (kırpma, hız, renk eşleme) | Sahibin hak ifadesi; newsreel ayrı hak; `unclear` kullanılmaz |
| **Archive photography** | kanıt, yer/zaman, karakter | Tek ve güçlü an varsa; tek başına değil, 2.5D/izolasyon/detay ile | Foto + yavaş pan zinciri (varsayılan değil) | Photoshop + Premiere/AE | Dönem/yer altyazısı doğru; denetlenen dönemden değilse yılı verilir |
| **Primary documents** | kanıt, merak (bulanık → net), payoff | Merkez iddia belgede yazıyorsa; kanalın kimliği | Tam ekran düz sayfa; okunamayan uzun metin | Remotion `DocumentHighlight` + fiziksel sayfa hissi (gölge, derinlik, kamera satıra gider) | Metin/sayı değiştirilmez; alıntı sayfa görüntüsünden (L-005) |
| **Motion graphics** | nedensellik, karşılaştırma, süreç | Soyut ilişkiyi (para akışı, yük paylaşımı) görünür kılmak | Dekoratif hareket; slayt gibi tam ekran kart | Remotion şablonları | Bizim grafiğimiz belge gibi görünmez |
| **Maps** | yer, ölçek, hareket, yalnızlık/mesafe | Coğrafya hikâyeye bir şey katıyorsa (rota, uzaklık, nerede bekledi) | Yalnız "burası" demek için harita | Remotion `LocatorMap` (Natural Earth, PD); kamera uçuşu/punch-in | Kaynaklı nokta/rota; kesin olmayan konum şehir düzeyinde |
| **Diagrams** | nedensellik, süreç, sistem | Bir sistemin parçaları ve ilişkisi | Okunmayacak kadar yoğun | Remotion `FlowDiagram`, `ComponentSchematic` | Yalnız doğrulanmış bileşenler |
| **Charts** | karşılaştırma, ölçek, payoff | Rakam karşılaştırması anlamın merkezindeyse | Tek bar (karşılaştırmasız rakam) | Remotion `BarChart` | Kaynağın rakamı; bizim hesap `CALCULATION` olarak etiketli |
| **Technical cutaways** | nasıl çalışır, ölçek, merak | Makinenin içi/işleyişi anlatının parçasıysa | Doğrulanmamış iç detay | Arşiv teknik çizim (ör. MARAD) + AE/Remotion katman animasyonu; gerekirse AI blueprint | Arşiv çizimi kanıt; bizim/AI cutaway illüstrasyon |
| **2.5D photo/parallax** | derinlik, atmosfer, sahneye giriş | Güçlü tek fotoğrafı "yaşayan" plana çevirmek | Abartılı, sallanan parallax; her fotoğrafa uygulamak | Photoshop (katman ayırma, content-aware fill) + AE/Premiere | Orijinal fotoğraf değiştirilmiş gibi sunulmaz (katman ayırma ≠ içerik değiştirme) |
| **Object isolation** | odak, karşılaştırma, ölçek | Nesneyi bağlamından çıkarıp başka bir zemine/grafiğe taşımak (ör. gemi silueti haritada) | Kesim izleri; gerçek fotoğraf sanılan kompozit | Photoshop select subject + Remotion/AE | Kompozit illüstrasyon olarak okunmalı |
| **Timeline animation** | zaman, sebep-sonuç sırası, bekleme | Süre/boşluk hikâyenin parçasıysa (ör. 2 yıl gelmedi) | Tarih listesi okutmak | Remotion `Timeline` + sayaç/takvim | Tarihler ledger'dan |
| **Selective kinetic typography** | kritik sayı, kısa alıntı, dönüm noktası, yer/tarih, isim, payoff | Yalnız bu anlar (SKILL §7) | Sürekli altyazı; cümle cümle yazı | Remotion; tek font ailesi | Alıntı birebir, atıflı |
| **AI-generated illustration** | atmosfer, açıklama, kayıp görselin yerine açıkça illüstratif sahne | SKILL §9 koşulları | Foto-gerçekçi "tarihî kayıt" | ChatGPT (Founder'a hazır prompt) | `AI-GENERATED / ILLUSTRATIVE`; asla kanıt; disclosure riski QA'ya |
| **Stylized reconstruction** | olayın/yerin kavranması | Kayıt yok, ama doğrulanmış bileşenlerle sade bir yeniden kurgu anlamı güçlendiriyor | Bilinmeyen ayrıntıyı uydurmak | Remotion/AE izometrik vektör, AI blueprint | Ekranda "reconstruction/illustration"; yalnız ledger'daki bileşenler |
| **Atmospheric establishing visuals** | atmosfer, yer/zaman, bölüm nefesi | Bölüm girişleri, ton değişimi | Uzun, alakasız stock | Sahne ihtiyacına göre arşiv footage/foto veya açıkça illüstratif AI (TIC-18; sıra yok) | Kısa ve gerekçeli |

## Görsel katman ayrımı (ekranda)
1. **Arşiv (gerçek):** doğal doku, küçük kaynak etiketi (`SourceLabel`).
2. **Açıklama (bizim):** tek marka paleti ve font; belge taklidi yok.
3. **İllüstrasyon (AI/rekonstrüksiyon):** stilize; gerekirse "Illustration" etiketi.

## AI prompt formatı (Founder'a hazır, tek kod bloğu, İngilizce)
> Güncel ve geniş şablon: `.claude/skills/source-to-visual/SKILL.md` §6 (D-031; narrative purpose, known evidence, must-not-invent, motion/text boşluğu, yasak tarihî ayrıntılar). Bu kısa format yalnız geriye dönük referanstır.
```
Create an original illustration for a documentary video. It is ILLUSTRATIVE, not a historical record.
Purpose in the video: [sahnenin işi — tek cümle]
Subject: [ne gösterilecek — yalnız doğrulanmış unsurlar]
Period / setting: [dönem ve yer; belirsizse "generic, unspecified"]
Style: [ör. technical blueprint line art / muted gouache illustration / isometric vector]; clearly stylized, NOT photorealistic.
Composition: [kadraj, odak, boş alan (yazı/grafik için)], aspect ratio 16:9, high resolution.
Palette: [Brand System v1 — charcoal #14181C, steel #334854, paper #E7DFCF, tek kontrollü accent (case accent veya amber #C58B3B); tek lacivert filtre yok]
Must NOT include: readable text, logos, real people, [uydurma riski taşıyan ayrıntılar], photographic film grain imitating archival photos.
Output: one image.
```
Prompt, sahne ve gelen dosya adı video asset kaydına yazılır.
