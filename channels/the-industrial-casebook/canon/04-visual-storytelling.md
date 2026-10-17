# 04 — Visual Storytelling (TIC-13, TIC-15 … TIC-19, TIC-22 … TIC-24, TIC-32)

## 1. Anti-PowerPoint (TIC-13 — HEURISTIC, güçlü kanal ilkesi)
The Industrial Casebook bir slideshow değildir. Şu akış tek başına yeterli görsel anlatım değildir:
photo → slow zoom → text → document → highlight → map → next photo.
- Fotoğraf, belge, harita ve arşiv **ham malzemedir**; final ürün **SAHNE** olmalıdır.
- Bir sahne yalnız anlatıcının söylediğini resmetmez; **görüntünün kendisi yeni anlayış üretir** (ilişki, ölçek, mekân, mekanizma, karşıtlık, sonuç).
- Bir sequence birkaç PowerPoint transition'ıyla yaklaşık aynı biçimde üretilebiliyorsa **bespoke visual concept aranır**.
- Bu bir HARD truth/rights kuralı değildir; HEURISTIC'tir: sapma gerekçeli olmalıdır (ör. bir belgenin sade, uzun okunması bilinçli bir sahne kararıdır).

## 2. Evidence Anchor ≠ Presentation Visual (TIC-15)
**SOURCE ESTABLISHES TRUTH. VISUALIZATION ESTABLISHES UNDERSTANDING. MOTION CREATES PROGRESSION.**
Her önemli beat iki **ayrı** kararla düşünülür:
| Karar | Soru | Örnek |
|---|---|---|
| **EVIDENCE ANCHOR** | Bu claim'in doğru olduğunu ne kanıtlıyor? | GAO raporu s.12, ledger satırı E-14 |
| **PRESENTATION VISUAL** | Bu fikri izleyiciye en iyi ne anlatıyor / hissettiriyor? | Tek gemiye yüklenen kara tesisinin mekânsal animasyonu |
- Gerçek source bulunması **creative work'ün bittiği anlamına gelmez**. Source ile presentation visual aynı olmak zorunda değildir: belge kanıtı taşıyabilir, sahneyi taşıyan başka bir görsel olabilir; ikisi birlikte de kullanılabilir.
- Faydalı kalıp (HEURISTIC): SOURCE (gerçek belge) → EXTRACT (ilgili satır/sayı birebir) → EXPLAIN (diyagram/harita/model) → CONSEQUENCE (hikâyedeki sonuç görünür).
- Kanıt dürüstlüğü HARD'dır (TIC-16): kanıt etiketi gerçek ledger satırına bağlıdır; belgeye sahte metin/damga eklenmez; çekilen değer belgedekiyle birebir aynıdır (`.claude/rules/evidence-and-research.md`).

## 3. Görsel üretim felsefesi — önce sahne, sonra araç (TIC-19)
- Tek yöntem yoktur. İhtiyaca göre: archive footage · photographs · documents · 2.5D treatment · After Effects bespoke motion · Remotion graphics/data · maps · engineering animation · Blender 3D · cutaways · AI illustration · AI video · compositing.
- **Önce sahnenin ne anlatması gerektiği belirlenir, sonra araç seçilir.** Araç veya sağlayıcı creative doctrine değildir.
- Remotion **template-first documentary sistemi değildir**; reusable primitives kullanılabilir, **bespoke scene design birinci sınıf** production yöntemidir.

## 4. AI'ın rolü (TIC-17 HARD, TIC-18)
- **AI historical evidence değildir** (TIC-17, şirket HARD): AI görsel/video asla kanıt gibi sunulmaz; gerçekte bilinmeyen ayrıntılar kesin tarihî gerçek gibi gösterilemez; illüstratif/rekonstrüksiyon olduğu ayırt edilebilir ve gerektiğinde etiketlidir; foto-gerçekçi rekonstrüksiyon yayın öncesi disclosure kontrolünden geçer (`pre-publish-qa`). Hak/kayıt: rights ledger (`ai-generated-own`).
- AI visualization, reconstruction, explanation, invisible process, spatial explanation, visual reset ve gerektiğinde cinematic illustrative shot için kullanılabilir.
- **"Gerçek source bulunduysa AI kullanma" diye bir kural yoktur** (TIC-18). AI kullanılıp kullanılmayacağı şu beş ölçütle değerlendirilir: **scene need · accuracy need · rights · disclosure · production value**.
- AI prompt'u Founder'a hazır verilir (Founder prompt mühendisi değildir); bilinen unsurlar ledger'dan, "uydurma" listesi prompt'ta açıkça yazılır (`source-to-visual` §6 şablonu).

## 5. Ses (TIC-22 — HEURISTIC; sound calibration sonra)
- Narration, music, ambience, silence ve SFX **birlikte** düşünülür; anlatıcıyla yarışan ses yoktur.
- Sürekli trailer/dramatik ses kullanılmaz. **Silence aktif storytelling aracıdır** (bir rakamın oturması, bir kaybın hissedilmesi).
- Ses kanal kimliği oluşturabilir; Golden sound calibration sonraki aşamadadır. Claude sesi dinleyemez: ölçülebilir kontroller + Founder kulak kontrolü (`.claude/rules/audio-production.md`, HARD).
- Kaynak/lisans: `documentary-music-sfx` (D-024); hakkı belirsiz ses kullanılmaz (TIC-32, HARD).

## 6. UI ve marka (TIC-23, TIC-24)
- **Subject hero'dur.** Marka subject'in üstüne çıkmaz.
- UI yalnız şunlar için kullanılır: **guide · compare · label · highlight · source/evidence clarity**. **UI olmadan sahne daha güçlüyse UI kullanılmaz.** Dekoratif grid, gereksiz metadata, sürekli dashboard hissi yoktur.
- **Brand System v1 korunur** (TIC-24; D-031/D-032): fontlar (IBM Plex Sans Condensed, IBM Plex Mono, Source Serif 4), renk token'ları, dört dünya (**Archive** — kaynağın doğal rengi, marka tinti yok · **Evidence** — paper + gerçek mürekkep · **Engineering** — ink/steel, harita/diyagram/mekanizma · **Case UI** — ince bağlayıcı katman), anti-klişe yön (true crime, dedektif estetiği, kırmızı ip, steampunk, nostaljik fabrika logosu, jenerik kurumsal/faceless-AI görünümü, bütün videoyu kaplayan koyu-mavi şablon, sahte eski kâğıt, büyük VERIFIED damgası yok). Ayrıntı: `intelligence/creative/brand/brand-system-v1.md`.
- **Static brand board film dili değildir.** Hareket, kamera, geçiş ve ritim `05-editorial-motion-and-cinematography.md`'dedir.

## 7. Haklar (TIC-32 — HARD)
Arşivde bulunmak telif güvenliği değildir. Hakkı açıkça doğrulanmamış materyal **prototype dahil** kullanılmaz; kanonik kayıt rights ledger'dır (`production/rights/README.md`, D-036).
