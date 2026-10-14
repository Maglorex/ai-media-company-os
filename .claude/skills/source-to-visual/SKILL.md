---
name: source-to-visual
description: Belgesel videoda her önemli anlatı/hikâye beat'i için kaynağın kesin olarak ne söylediğinden izleyicinin ne görmesi gerektiğine giden görsel kararı hazırlar — Evidence Anchor (claim'i ne kanıtlıyor) ile Presentation Visual (izleyiciye en iyi ne anlatıyor) ayrı kararlar; gerçek source bulunması sunum kararını bitirmez, AI otomatik son çare değildir, araç sahne ihtiyacından sonra seçilir (kanal canon D-045, TIC-15/18/19); aday görsel türleri kontrol listesi, SOURCE→EXTRACT→EXPLAIN→CONSEQUENCE görselleştirme, fotoğraf dönüştürme, Brand System dünya ataması ve gerekiyorsa Founder için hazır ChatGPT görsel prompt'u. Creative treatment, görsel plan, production handoff ve mevcut asset denetimi (KEEP AS REAL SOURCE / TRANSFORM / REPLACE WITH DIAGRAM / REPLACE WITH AI ILLUSTRATION / REMOVE) sırasında kullan. Görsel üretmez, indirmez.
---

# Source-to-Visual Pipeline v1

> **Kanal canon'u önce gelir (D-045):** The Industrial Casebook için yaratıcı/growth kurallarının tek yetkili kaynağı `channels/the-industrial-casebook/canon/README.md`. Bu skill prosedürdür; çelişkide canon kazanır. §2 bir sıralama değil, aday kontrol listesidir; her beat'te Evidence Anchor ve Presentation Visual ayrı kararlardır (TIC-15) ve gerçek source bulunması AI/visualization'ı dışlamaz (TIC-18).

Karar: D-031. Bağlayıcı: `.claude/rules/brand-and-visual-system.md` · `intelligence/creative/brand/brand-system-v1.md` · (HEURISTIC kaynak, binding değil: doctrine v1 `intelligence/creative/doctrine/documentary-production-doctrine-v1.md`, D-029 LIMITED) · evidence ledger (kanıt + haklar §C) · `documentary-visual-storytelling`. Uygulayıcı: `documentary-creative-director` / COO. Çıktı: treatment veya handoff içindeki Source-to-Visual tablosu.

**Canonical kural (D-032):** *Source establishes truth. Visualization establishes understanding.*

## 1. Her beat için iki soru (sırayla)
1. **Kaynak bize kesin olarak ne söylüyor?** (ledger satırı, durum etiketi; söylemediği de yazılır)
2. **İzleyici bunu anlamak için neyi görmeli?** (ilişki, ölçek, yer, mekanizma, zaman, sonuç)
Kaynak asset ile final görsel aynı şey olmak zorunda değildir.

## 2. Evidence Anchor + Presentation Visual (iki ayrı karar) ve aday görsel türleri
1. **Evidence Anchor:** claim'i ne kanıtlıyor? (ledger satırı; kanıt dürüstlüğü HARD).
2. **Presentation Visual:** önce sahnenin izleyiciye ne anlatması gerektiği yazılır (ilişki, ölçek, yer, mekanizma, dönüşüm, sonuç); **sonra** araç seçilir (TIC-19). Gerçek source bulunması bu kararı bitirmez; source ekranda kanıt olarak görünebilir ve sahneyi başka bir görsel taşıyabilir.
3. AI **otomatik son çare değildir**: kullanılıp kullanılmayacağı scene need · accuracy need · rights · disclosure · production value ile değerlendirilir (TIC-18).
Aşağıdaki liste bir **sıralama değil**, Presentation Visual için aday türlerin **kontrol listesidir** (HEURISTIC); birden fazlası birlikte kullanılabilir, seçimin gerekçesi yazılır:
1. Hakkı temiz (ledger §C "Evet") gerçek arşiv footage var mı?
2. Hakkı temiz gerçek fotoğraf var mı? → varsa §4 dönüştürme sorusu.
3. Birincil belge **kanıt olarak** ekranda görünmeli mi? (önemli iddia, rakam, alıntı → genelde evet; Evidence World)
4. Mekanizma motion graphic / diagram ile daha iyi mi anlaşılır? (Engineering World)
5. Harita mekânsal sebep-sonucu gösterir mi? (rota, mesafe, yer, akış)
6. Teknik cutaway gerekir mi? (iç yapı, bileşen, ölçek)
7. ChatGPT illüstrasyonu bir **bilgi veya atmosfer problemini** gerçekten çözüyor mu? (§5)
"Kaynakta güzel fotoğraf yok" → lacivert bilgi kartı **varsayılan değildir**. Tam ekran kart yalnız tek sayı/tek tez anında, kısa ve gerekçeli.

## 3. SOURCE → EXTRACT → EXPLAIN → CONSEQUENCE
Önemli iddia mümkün olduğunda bu akışla görselleşir:
- **SOURCE:** gerçek belge sayfası görünür (Evidence World, Source Mark).
- **EXTRACT:** ilgili satır/sayı izole edilir (Evidence Pull; değer birebir).
- **EXPLAIN:** değer bir grafik/diyagram/harita durumuna dönüşür (Engineering World).
- **CONSEQUENCE:** hikâyedeki sonucu görünür olur (ör. boş rıhtım, tek gemi üstündeki yük).
Hedef his: "kaynağı gerçek" + "ne anlama geldiğini anladım".

## 4. Fotoğraf dönüştürme
Uzun yavaş zoom varsayılan değildir. Önce: **bu fotoğraftan hangi hikâye bilgisi çıkar?** İşlemler: subject isolation · foreground/background ayrımı · parallax · detail reveal · spatial crop · before/after · map continuity · document continuity · Object Carry. Generic Ken Burns yalnız anlamlıysa. Arşiv fotoğrafı Archive World'de kalır (marka tinti yok).

## 5. AI görsel politikası
ChatGPT image generation Company OS'un **aktif** yaratıcı üretim aracıdır (D-031, D-032); creative director gerektiğinde Founder'a doğrudan hazır prompt getirir. Kullanım kararı TIC-18'in beş ölçütüyle verilir: scene need · accuracy need · rights · disclosure · production value. Gerçek görselin varlığı AI'ı kendiliğinden dışlamaz; tipik kullanımlar: teknik illüstrasyon · mekânsal ortam · cutaway · blueprint/editoryal sahne · görünmeyen süreç · atmosfer · visual reset · thumbnail hero asset. Production value, sahne ihtiyacıyla birlikte geçerli bir ölçüttür.
- Tercih: stylized technical illustration · editorial industrial illustration · blueprint/cutaway · schematic environment · non-photorealistic reconstruction · açıkça illüstratif sinematik establishing.
- Gerçek tarihî fotoğraf gibi görünmesi istenmez. Asset kaydı: `AI-GENERATED / ILLUSTRATIVE` + prompt + sahne + dosya. Kanıt değildir. Gerekirse "Illustration" etiketi. Foto-gerçekçi rekonstrüksiyon → yayın öncesi disclosure kontrolü.
- Bilinen bileşenler ledger'dan; ledger'da olmayan yerleşim/ayrıntı uydurulmaz (prompt "Must NOT invent" alanına yazılır).

## 6. Founder'a hazır ChatGPT prompt'u (tek kod bloğu, İngilizce)
Founder "ChatGPT'ye ne yazayım?" diye düşünmez. Mesaj: "Bu sahne için ChatGPT'ye şunu olduğu gibi gönder:" + aşağıdaki blok; çıkan dosyanın adı ve konacağı klasör tek satırla.
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
Dosya adı: `<VIDEO>-AI-<NN>-<kısa-ad>.png` → `D:\CompanyOS-Production\<video>\02_graphics\ai\`.

## 7. Dünya ataması ve Brand System bağı
Her beat'e dünya atanır: ARCHIVE / EVIDENCE / ENGINEERING (+ CASE UI katmanı). Case Accent yalnız vurgu; amber yalnız kanıt/anahtar sayı. `EVIDENCE NN` = ledger satırı eşlemesi tabloya yazılır.

## 8. Çıktı tablosu (treatment / handoff içinde)
| Beat | Kaynak ne diyor (ledger) | İzleyici ne görmeli | Karar adımı (1–7) | Görsel | Dünya | Brand davranışı (Evidence Pull / Object Carry / Case Tab / Source Mark) | Hak | AI? (gerekçe) |
Mevcut asset denetiminde ek sütun: **KEEP AS REAL SOURCE / TRANSFORM / REPLACE WITH DIAGRAM / REPLACE WITH AI ILLUSTRATION / REMOVE** + gerekçe (anlama · atmosfer · mekânsal açıklama · mekanizma · süreklilik — biri olmalı).
