# The Industrial Casebook — Brand System v1

> Karar: D-031 → **D-032 (Founder + ChatGPT, 2026-10-13): Brand Direction v1 = CANONICAL.** Bu dosya Company OS'un tek marka yönü kaynağıdır; çelişen eski talimat/şablon geçersizdir. Kendi kanal verimiz (CTR, retention, muted preview sonuçları) geldikçe güncellenir.
> **Founder-approved visual direction reference (D-033):** onaylanan = 6 yaratıcı yön (ağır dar industrial typography · engineering line character · metal/oxidation material feeling · güçlü konu silueti · disiplinli technical metadata · sade-karakterli premium kompozisyon); **Barlow Condensed ve #C7542B PROVISIONAL**. `reference/founder-approved-visual-direction.md` + görseli. Endüstriyel ağırlık, mühendislik çizgi dili ve atmosfer için ana referans; final logo/template değil. Diğer board denemeleri canonical değil.
> **Canonical kural:** *Source establishes truth. Visualization establishes understanding.*
> Renk token'ları ve fontlar (§D–§E) **başlangıç değerleridir**; Founder + ChatGPT brand proof asset'leri (§N) geldiğinde doğrulanır/güncellenir.
> Bağlayıcı kural: `.claude/rules/brand-and-visual-system.md` · Sahne kararı: `.claude/skills/source-to-visual/SKILL.md` · QA: `.claude/skills/muted-preview-gate/SKILL.md` · Anlatı/görsel grameri: `intelligence/creative/doctrine/documentary-production-doctrine-v1.md` · Logo/banner brief: `logo-banner-brief.md`.
> **Temel ilke:** Consistency = aynı gramer. Consistency ≠ aynı arka plan / aynı renk filtresi.

## A. Marka özü
- **Kanal:** The Industrial Casebook.
- **Konsept (canonical):** premium industrial documentary + engineering dossier. (Yapı taşları: industrial dossier + archival evidence + engineering explanation.)
- **İzleyicinin hissi:** "Bir endüstriyel vakayı açıyoruz. Gerçek belgeleri inceliyoruz. Sistemin nasıl çalıştığını çözüyoruz."
- **Ton:** intelligent · technical · investigative · industrial · evidence-led · cinematic · modern (restrained, contemporary documentary).
- **Kaymayacağı yönler:** true crime · dedektif estetiği · kırmızı ip panosu · suç mahalli imgesi / crime scene tape · steampunk · nostaljik fabrika-logosu klişesi · jenerik kurumsal danışmanlık görünümü · jenerik faceless-AI belgesel görünümü · **bütün videoyu kaplayan koyu mavi PowerPoint şablonu**.
- **Ayrıca yok:** polis dosyası, aşırı damga/grunge, sahte eski kâğıt tiyatrosu, "TOP SECRET"/"CLASSIFIED" süsü, büyük "VERIFIED" damgası.

## B. Case identity
- Her video içeride bir case numarası taşır: `CASE 001 · NS SAVANNAH`, `CASE 002 · WESTINGHOUSE J40`. Numara yayın sırasıyla verilir, ilk yayınlanan = 001; kayıt `case-register.md`.
- **Title'da zorunlu değil** (SEO/CTR alanını işgal etmez). Video içinde mikro marka unsuru.
- Metadata etiketleri (Case UI World): `CASE 001` · `EVIDENCE 01` · `GAO · 1970` · `LOCATION` · `ROUTE` · `SYSTEM` · `COST`.
- **Dekor değil:** `EVIDENCE NN` her zaman evidence ledger'daki bir satıra bağlıdır (handoff'ta `EVIDENCE 01 = V-03` gibi eşleme tablosu zorunlu). Kaynak etiketi gerçek provenance'ı gösterir (kurum · yıl · gerekiyorsa sayfa). Ledger'da karşılığı olmayan EVIDENCE etiketi kullanılamaz.

## C. Intro / ident
> **D-034:** kalıcı sistem → `intelligence/creative/brand/dynamic-case-ident-system.md` (sabit/değişken öğeler, hareket kütüphanesi, handoff alanları). Aşağıdaki maddeler onun özetidir.
- **Varsayılan: bağımsız 4–7 sn logo introsu YOK.**
- Format: **cold open hemen başlar** → hero object ekranda → kısa `CASE 001 · NS SAVANNAH` reveal (≈1,5–2,5 sn, alt-sol, Plex Mono + Condensed; hikâye durmaz) → story devam eder.
- Yeniden test koşulu: kendi kanal verimiz (retention ilk 30 sn) bağımsız ident'in işe yaradığını gösterirse EXP olarak test edilir.

## D. Typography
| Rol | Font | Kullanım |
|---|---|---|
| Display | **IBM Plex Sans Condensed** (SemiBold/Bold) — D-033: yön canonical = **ağır ve dar industrial typography**; aday **Barlow Condensed** = **PROVISIONAL** (brand proof'ta test edilmeden token olmaz) | Case title, Case Tab, bölüm başlığı, büyük kısa ifade, tek sayı |
| Metadata | **IBM Plex Mono** (Regular/Medium, büyük harf, geniş harf aralığı) | CASE, EVIDENCE, tarih, kaynak, harita/diyagram teknik etiketleri |
| Editorial | **Source Serif 4** (Regular/Italic) | Gerçek belge alıntısının yeniden dizilmiş hali, editoryal alıntı, arşiv/editoryal kontrast |
- **Hiyerarşi:** bir karede en fazla iki aile; üçü birlikte yalnız gerekçeli tek anlarda. Display bir kerede tek ifade.
- Telefon okunabilirliği (1080p'de): birincil ≥ 30 px, ikincil ≥ 23 px (P3 polish kuralı korunur).
- **Lisans:** üçü de SIL Open Font License 1.1 (IBM Plex: github.com/IBM/plex; Source Serif 4: github.com/adobe-fonts/source-serif). Font dosyaları **repoya eklenmez**; render bilgisayarına yerel kurulur. **Kuruldu ve doğrulandı (render PC, 2026-10-13, Founder onayı):** IBM Plex Sans Condensed 2.0.0, IBM Plex Mono 2.5.0, Source Serif 4.005R (statik TTF, kullanıcı düzeyi) — Windows, Remotion Chromium (11 temel stil; sentetik/yedek font yok), Photoshop, Illustrator, After Effects, Premiere Pro. Remotion'a bağlanması (token + font binding) ayrı adım.

## E. Renk sistemi
| Token | Hex | Rol |
|---|---|---|
| `ink` | #14181C | Ana koyu nötr; Case UI zemini, Engineering World zemini |
| `paper` | #E7DFCF | Evidence World alanı, editoryal alan, açık metin |
| `steel` | #334854 | Engineering World: diyagram, harita kara/deniz tonu, sistem çizgisi |
| `amber` | #C58B3B | Önemli kanıt, annotation, anahtar sayı vurgusu — **kontrollü** (bir karede tek odak) |
| `case-accent` | video başına | Case kimliği: thumbnail, hero object vurgusu, birkaç motion anı. Marka paletinin yerini almaz |
- **D-033:** yön canonical = **physical metal / oxidation / industrial material feeling**. Referans görselden okunan birleşik palet (charcoal #0B0F12 · steel #3E4954 · iron #7A8288 · parchment #E6DCC6 · oxidised teal #2F6B6B) ve vurgu adayı **rust-orange #C7542B** = **PROVISIONAL**; brand proof'ta test edilip Founder onaylamadan token olmaz. O zamana kadar yukarıdaki token'lar geçerli.
- P3 / CASE 001 case accent: **Atomic Teal #4E8A88**.
- **Yasak:** her videoyu tek lacivert (veya herhangi tek) filtreyle boyamak; arşiv fotoğrafını marka rengiyle tintlemek; amber'i dekor olarak yaymak; case accent'i zemin rengi yapmak.

## F. Dört görsel dünya
| Dünya | İçerik | Görünüm | Yapılmaz |
|---|---|---|---|
| **1. ARCHIVE** | Gerçek footage, fotoğraf, tarihî nesne | Kaynağın doğal rengi / gerçek siyah-beyazı; en fazla hafif ortak grade (kontrast/siyah seviyesi) | Marka tinti, sahte grain, renklendirme, kaynağı "yaşlandırma" |
| **2. EVIDENCE** | Denetim raporu, memo, resmî belge, teknik rapor, gazete, dönem diyagramı | Sıcak `paper` alan + belgenin gerçek mürekkebi; ölçülü annotation (amber alt çizgi/çerçeve, ince bracket) | Belgeye sahte metin, sahte damga, yırtık/yanık kâğıt efekti |
| **3. ENGINEERING** | Harita, diyagram, cutaway, mekanizma, sistem akışı, grafik | `ink`/`steel` zemin, blueprint'ten esinli ince çizgi, Plex Mono etiket | Bütün videoyu blueprint'e çevirmek |
| **4. CASE UI** | CASE / EVIDENCE / kaynak / LOCATION etiketleri, Case Tab | İnce, küçük, kenarda; Plex Mono; `paper` veya `ink` üzerinde | Tam ekran template, kendi başına sahne |
Case UI diğer üç dünyayı birbirine bağlar. Bir videoda fotoğraf, belge, harita ve illüstrasyon farklı renk dünyalarında yaşar; aynı kanala aitliği gramer sağlar.

## G. Markayı bağlayanlar (gramer)
case numbering · evidence labels · typography hierarchy · metadata style · source notation · case tabs · motion continuity · document treatment · annotation behavior · transition grammar.

## H. İmza geçiş grameri (yalnız dört davranış; preset spam yok)
| Davranış | Ne yapar | Örnek | Kural |
|---|---|---|---|
| **Evidence Pull** | Belgedeki gerçek sayı/kelime izole olur, sonraki chart/diagram state'ine dönüşür | GAO "$1,162,000" → maliyet segmenti → Galveston sistem çizimi | Çekilen değer belgedekiyle birebir; dönüştüğü grafik aynı değeri taşır |
| **Object Carry** | Hero object sahneler arasında taşınır | Savannah fotoğrafı → izole gemi → rota haritası token'ı → sistem diyagramı | Nesne her durumda tanınır kalır (siluet/kontur sabit) |
| **Case Tab** | Önemli alt bölüm girişinde kısa dosya sekmesi | `GALVESTON FACILITY` | ≤2 sn, kenarda; title card değil, hikâye durmaz; videoda seyrek |
| **Source Mark** | Kanıt/alıntı üzerinde kısa, sakin provenance | `GAO · 1970` · `NPS` | Plex Mono, küçük; damga değil |
Diğer geçişler (cut, dissolve, zoom-through) serbest ama gerekçeli (doctrine §5).

## I. Per-case visual personality
Her yeni videoda creative director treatment'ta seçer: **Case Accent** (+ gerekirse **Case Texture/Motif**: ör. P3 için 1960'lar atom çağı teknik çizim motifi — ince orbit çizgisi, dönem teknik broşür çizgi dili). Motif marka sistemini override etmez; yalnız Engineering/Case UI ayrıntılarında ve thumbnail'da yaşar. Amaç: thumbnail'lar birbirine benzemeden aynı kanala ait hissettirmek. Kayıt: `case-register.md`.

## J. Thumbnail → preview → video sürekliliği
Thumbnail grameri: hero object + consequence/evidence + case-specific accent. Her thumbnail aynı şablon olmak zorunda değildir; industrial / evidence-led kimlik hissedilir. Videonun ilk bölümünde aynı vaadin görsel DNA'sı (object · evidence · conflict) görünür; thumbnail'ın birebir animasyonu gerekmez. Kontrol: `documentary-packaging` + muted preview gate.

## K. Profil logosu yönü (final logo kilitli değil; Company OS logo üretmez)
Yön (D-032): industrial · modern · strong · YouTube avatarında okunacak kadar minimal. **Değil:** jenerik kurumsal "IC" logosu · dişli/fabrika klişesi · dedektif/dosya-klasörü ikonu klişesi. (v1'deki "IC monogram + case-file geometry" önerisi zorunlu konsept olmaktan çıktı; yalnız keşfedilebilecek seçeneklerden biri.) Founder + ChatGPT üretir (`logo-banner-brief.md`); asset gelene kadar placeholder üretilmez.

## L. Banner yönü
2560 × 1440; metin/logo merkezdeki güvenli alanda (2560 genişlikte ≈1546 × 423 — `[VARSAYIM]`, yaygın kullanılan değer; YouTube'un güncel değeri banner üretiminden önce resmî Yardım sayfasından doğrulanır). İçerik: "THE INDUSTRIAL CASEBOOK" + kısa konumlama (aday: "Machines. Industries. Decisions. Evidence." — final Founder + ChatGPT). Zemin: archive + engineering + case system'ın sade birleşimi. Thumbnail kolajı yok.

## M. Sesle ilişki
Marka ses kimliği (stinger, jingle) **yok**; case ident sessiz/müzik altı. Müzik yönü `documentary-music-sfx`. Ses kararları UNVERIFIED — HUMAN EAR REQUIRED.

## N. Brand proof (production'a dönmeden önce beklenen asset'ler — D-032)
Founder + ChatGPT üretir; Company OS bunları üretmez. **Güncelleme (Founder 2026-10-13):** final logo beklenmez, geçici logo/monogram üretilmez; P3 retrofit'i logo gerektirmeyen parçalarla (#3–#5) ilerler — spec: `video-ui-spec-v1.md`, `production/pilots/2026-10-n2-pilot-test/P3-brand-retrofit-spec-v1.md`. #1–#2 (logo, banner) kanal sayfası için ayrı iş.
| # | Asset | Kabul ölçütü (COO kontrol eder, Founder'a tek öneri) |
|---|---|---|
| 1 | Seçilmiş logo yönü | §K; 48–98 px okunur; klişe yok |
| 2 | Banner yönü | §L; güvenli alanda metin; kolaj yok |
| 3 | CASE 001 UI mockup | Case Layer: küçük, kenarda, full-screen değil; Plex Mono/Condensed hiyerarşisi |
| 4 | Evidence label mockup | `EVIDENCE 02 · GAO · 1970` dili; damga değil; ledger'a bağlanabilir |
| 5 | P3 branded frame examples | Dört dünyanın her birinden en az bir kare; arşiv doğal renk; Atomic Teal yalnız accent; koyu-mavi şablon yok |
Gelince: `intelligence/creative/brand/proof/` (küçük önizleme; büyük dosya repo dışı) + bu dosyada token/font doğrulaması + `production/remotion/src/theme.ts` dünyalara göre token'lara ayrılır (şu an tek koyu lacivert tema — eski pilot dili; retrofit'te değişir).

## Değişiklik geçmişi
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-10-13 | v1 kuruldu | Founder talimatı; D-031 |
| 2026-10-13 | Founder-approved visual direction reference eklendi (ağır display, mühendislik çizgi dili, pas turuncusu vurgu adayı) | D-033 |
| 2026-10-13 | Brand Direction v1 canonical: konsept, ton, kaymayacağı yönler, canonical kural, logo yönü (IC monogram zorunluluğu kalktı), thumbnail grameri, brand proof listesi | Founder + ChatGPT; D-032 |
