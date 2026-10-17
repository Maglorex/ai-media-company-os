# Tool Library — scene'den sonra araç

> Kaynak: eski `documentary-visual-storytelling/VISUAL-LANGUAGE-LIBRARY.md` + `source-to-visual` §4–§7 (SUPERSEDED, D-046), v2 kanal canon'una göre düzeltildi. **Araç sahne tasarlandıktan sonra seçilir** (TIC-19); bu tablo bir öncelik sırası değildir. Kurulu araçlar: Strong PC'de Premiere / After Effects / Photoshop / Illustrator, Remotion; ChatGPT Image Generation (Founder hesabı). Yeni paket/plugin/ücretli servis Founder onayı ister. Blender ve bir AI video servisi araç envanterinde (`production/tools/README.md`, `company/machines.md`) kayıtlı değildir — gerekiyorsa önce ücretsiz seçenek değerlendirilir; kurulum/abonelik Founder onayı ister (tek öneri).

| Araç | En iyi taşıdığı | Ne zaman | Tuzak | Hak / kanıt notu |
|---|---|---|---|---|
| **Archive footage** | yer/zaman, "gerçekten oldu" hissi, atmosfer | Olayın/dönemin hareketli kaydı varsa | Konu dışı dönem footage'ını olay kaydı gibi sunmak | Sahibin hak ifadesi; newsreel ayrı hak; `unclear` kullanılmaz |
| **Archive photography** | kanıt, yer/zaman, karakter, hero object | Tek güçlü an; 2.5D, izolasyon, detay ile sahneye dönüşür | Foto + yavaş pan zinciri | Dönem/yer altyazısı doğru |
| **Primary documents** | kanıt, bulanık → net merak, payoff | Merkez iddia belgede yazıyorsa | Tam ekran düz sayfa; okunamayan uzun metin | Metin/sayı değiştirilmez; alıntı sayfa görüntüsünden (L-005) |
| **2.5D / parallax** | derinlik, sahneye giriş | Güçlü tek fotoğrafı mekâna çevirmek | Abartılı, sallanan parallax; her fotoğrafa uygulamak | Katman ayırma ≠ içerik değiştirme |
| **Object isolation / carry** | odak, süreklilik, ölçek | Nesneyi bir sahneden diğerine (fotoğraf → harita → diyagram) taşımak | Gerçek fotoğraf sanılan kompozit | Kompozit illüstrasyon olarak okunmalı |
| **After Effects (bespoke motion)** | dönüşüm, mekanizma, karmaşık sahne geçişi | Sahneye özel, tekrar kullanılmayacak hareketli fikir | Şablon hissi; amaçsız efekt | Bizim grafiğimiz belge gibi görünmez |
| **Remotion (graphics/data primitives)** | veri, sayı, tekrarlanan yapı, VO'ya bağlı zamanlama | Veriye/zamana bağlı tutarlı grafik; yeniden kullanılır primitive | Template-first düşünmek (TIC-19) | Kaynağın rakamı; `CALCULATION` etiketli |
| **Maps** | yer, mesafe, rota, yalnızlık | Coğrafya hikâyeye bir şey katıyorsa; harita durum değiştirir | Yalnız "burası" demek için harita | Natural Earth (PD); konum kesin değilse şehir düzeyi |
| **Diagrams / cutaways** | sistem, nedensellik, iç yapı | Parçalar ve ilişkileri anlatının parçasıysa | Okunmayacak yoğunluk; doğrulanmamış iç detay | Yalnız doğrulanmış bileşenler; arşiv çizimi kanıt, bizimki illüstrasyon |
| **Timeline animation** | zaman, bekleme, sıra | Süre/boşluk hikâyenin parçasıysa | Tarih listesi okutmak | Tarihler ledger'dan |
| **Selective kinetic typography** | kritik sayı, kısa alıntı, dönüm noktası | Yalnız bu anlar | Sürekli altyazı | Alıntı birebir, atıflı |
| **Blender 3D** | gerçekçi hacim, mekanik hareket, mekânda kamera | 2D/2.5D ile anlaşılamayan mekân/mekanizma ve maliyeti gerekçeli | "3D daha iyidir" varsayımı | Rekonstrüksiyon etiketlenir; yalnız ledger bileşenleri |
| **AI illustration** | açıklama, mekân, görünmeyen süreç, atmosfer, visual reset | TIC-18 beş ölçütü sahneyi destekliyorsa — kaynak varken de | Foto-gerçekçi "tarihî kayıt" | `AI-GENERATED / ILLUSTRATIVE`; kanıt değil; disclosure QA |
| **AI video** | kısa illüstratif hareket, atmosfer | Sahne ihtiyacı net, doğruluk riski düşük, hak/disclosure çözülü | Tarihî olay "kaydı" gibi görünmesi | Aynı + yayın öncesi disclosure kontrolü |
| **Compositing** | katmanların tek sahnede buluşması | Kanıt + açıklama aynı karede | Kanıt ile illüstrasyonun karışması | Katman ayrımı ekranda okunur |

## Ekranda katman ayrımı
1. **Arşiv (gerçek):** doğal doku, küçük kaynak etiketi. 2. **Açıklama (bizim):** marka dili; belge taklidi yok. 3. **İllüstrasyon (AI/rekonstrüksiyon):** stilize; gerekirse "Illustration".

## Founder'a hazır ChatGPT görsel prompt'u (GUIDED ACTION; tek kod bloğu, İngilizce)
Mesaj: "Bu sahne için ChatGPT'ye şunu olduğu gibi gönder:" + blok; dosya adı ve klasör tek satırla; sonra ne olacağı tek satırla.
```
Create an original ILLUSTRATION for a documentary video. It is illustrative, not a historical record or photograph.
Narrative purpose: [sahnenin işi — tek cümle]
Known facts to depict (verified): [yalnız ledger'daki unsurlar, ölçü/oran varsa]
Must NOT invent: [yerleşim, isim, yazı, logo, insan yüzü, dönem dışı ayrıntı, belirsiz teknik detay]
Style: [stylized technical illustration / editorial industrial illustration / blueprint cutaway / isometric schematic]; clearly stylized, NOT photorealistic, no fake film grain or aged-photo look.
Palette: charcoal #14181C, steel #334854, paper #E7DFCF, one restrained accent [case accent hex]; no dominant navy filter.
Composition: [kadraj, odak]; leave clear negative space [sol/sağ/üst] for motion graphics and labels; aspect ratio [16:9 / 1:1]; high resolution.
Forbidden false historical details: [ör. wrong-era vehicles, uniforms, readable signage, invented markings]
No readable text, no logos, no real people. Output: one image.
```
Dosya adı: `<VID>-AI-<NN>-<kısa-ad>.png` → `D:\CompanyOS-Production\<video>\02_graphics\ai\` (Strong PC). Kayıt: rights ledger (`ai-generated-own` + prompt + sahne).
