# P3 / CASE 001 — Brand + Source-to-Visual audit (ilk ~90 sn, yalnız plan)

> Tarih: 2026-10-13 · COO · D-031 · Girdi: `P3-production-handoff-prototype-v2.md` (opening v2 narration + beat planı), `P3-doctrine-test-opening-v1.md`, `P3-evidence-ledger.md`, `P3-edit-timeline.md` (eski review), Brand System v1, `source-to-visual`.
> **P3 donuk (Founder 2026-10-13).** Render, VO, AI üretimi, müzik yok. Narration ve evidence **değiştirilmedi**.
> **D-032:** canonical Brand Direction v1 ile uyumlu (değişiklik gerekmedi); handoff v3 brand proof asset'lerini (brand-system §N) bekler.
> Sonuç: opening v2 storytelling PASS adayı; bu audit'in düzeltmeleri handoff v3'e girmeden ve muted preview gate geçmeden full production yok.

## 1. Case identity
- `CASE 001 · NS SAVANNAH` — V2'de (gemi izole olurken, "…first nuclear-powered merchant ship."), alt-sol, ≈2 sn, Plex Mono + Plex Sans Condensed; hikâye durmaz. Bağımsız intro yok.
- Case Accent **Atomic Teal #4E8A88**: yalnız gemi token'ı/konturu (Object Carry'nin rengi), harita yaylarının ucu ve son karedeki tek gemi. Zemin veya filtre değil.
- Amber: yalnız Evidence Pull edilen değerler ($2M, üç satır, $1.162M, "several") ve belge annotation'ı.
- Case Tab: `GALVESTON FACILITY` (V9–V10 girişinde, ≤2 sn). Açılışta başka Case Tab yok.
- Motif (1960'lar atom çağı teknik çizim): yalnız harita/tesis çizgilerinde ince detay; logo/atom sembolü yok.

### EVIDENCE eşlemesi (ekranda görünen numara = ledger satırı)
| Ekran | Ledger | Source Mark |
|---|---|---|
| EVIDENCE 01 | V-03 rapor kapağı (E-2 tarih) | `GAO · 1970` |
| EVIDENCE 02 | V-02 Özet s.1 — Q-01 / C-04 | `GAO · 1970 · p.1` |
| EVIDENCE 03 | V-01 Özet s.2 — üç satır C-06, C-08..C-10; aynı sayfada C-33 "several" | `GAO · 1970 · p.2` |
| (numarasız) | Q-06 operatör sözü | `NPS` (aktarım) |
| (numarasız) | C-32 iki yıl / New York — anlatı + grafik; sayfa ekranda yok | `GAO · 1970 · pp.15–16` (grafik köşesinde) |
Tesis çizimi (AI-01 + etiketler) EVIDENCE numarası **almaz**; "Illustration" etiketi.

## 2. Dünya ataması (ilk ~90 sn)
| Beat (handoff v2 §3) | Dünya | Brand davranışı |
|---|---|---|
| V1 gemi fotoğrafı | **ARCHIVE** — V-05 doğal renk; önceki plandaki "soğuk renk düzeltmesi" **kaldırıldı** | — |
| V2 izole gemi → harita token'ı, 19 sefer | ARCHIVE → **ENGINEERING** | **Object Carry** + CASE 001 ident |
| V3 operatör sözü | ENGINEERING üstünde Source Serif 4 tek satır | Source Mark `NPS` |
| V4 rapor kapağı | **EVIDENCE** (paper zemin, gerçek mürekkep) | Object Carry (token kapağa dosyalanır) · EVIDENCE 01 |
| V5 Q-01 cümlesi | EVIDENCE | EVIDENCE 02 · amber annotation |
| V6 karşılaştırma | EVIDENCE → ENGINEERING | **Evidence Pull** ($2M → parantez) |
| V7 üç satır | EVIDENCE + ENGINEERING aynı karede | Evidence Pull (üç segment) · EVIDENCE 03 |
| V8 mürettebat / kara ekibi | ENGINEERING | Object Carry (gemi konturu) |
| V9 Galveston haritası | ENGINEERING | Case Tab `GALVESTON FACILITY` · Evidence Pull ($1.162M segmenti haritaya düşer) |
| V10–V11 tesis + iki yıl | ENGINEERING (illüstrasyon katmanı) | — · "Illustration" etiketi |
| V13 New York yayı | ENGINEERING | Object Carry (token New York'ta) |
| V14 "several" cümlesi | EVIDENCE (V7 sayfasına dönüş) | EVIDENCE 03 · amber |
| V15–V16 tek gemi + yük | ENGINEERING | Evidence Pull (segmentler token'a) · Case Accent son kare |
Denge: ARCHIVE 1 (V1–V2) · EVIDENCE 4 (V4, V5, V7, V14) · ENGINEERING 9. Archive az çünkü hakkı temiz hareketli footage yok ve tek güçlü renkli fotoğraf V-05 (doctrine §8 riski). Muted preview açısından risk: ilk 90 sn'nin ~%60'ı koyu zemin → **zorunlu karşı önlem:** Engineering sahneleri "koyu zemin + küçük metin" olmamalı — her birinde büyük, tanınır nesne (gemi token'ı, harita kıyı çizgisi, tesis illüstrasyonu, figürler) kadrajın ≥ üçte birini kaplar; Evidence sahneleri paper zeminle görsel kontrast sağlar. Muted gate'te kontrol edilir.

## 3. Source-to-Visual — beat kararları
| Beat | Kaynak ne diyor | İzleyici ne görmeli | Karar adımı | Görsel | Hak | AI? |
|---|---|---|---|---|---|---|
| V1–V2 | İlk nükleer ticari gemi (C-30) | Gerçek gemi, sonra takip edilecek nesne | 2 (safe foto) → §4 isolation | V-05 2.5D katman + subject isolation | NARA "Use: Unrestricted", atıf | Hayır |
| V2 | 19 sefer, 3 yıl (C-14, C-44) | Çalıştığının ölçeği | 5 (harita) | Natural Earth harita, token, yaylar (bölge, rota değil) | PD | Hayır |
| V3 | Operatörlerin sözü (Q-06, NPS) | İnsan güveni | — (metin) | Tek satır Source Serif 4 | — | Hayır |
| V4–V5 | 1970 raporu, ≈2M $ (V-03, Q-01) | Kaynağın gerçekliği | 3 (birincil belge) | Fiziksel sayfa, kamera satıra | PD | Hayır |
| V6–V7 | Karşılaştırma + üç satır (C-04, C-06) | Fark ve dağılımı | 3 → 4 | SOURCE→EXTRACT→EXPLAIN: sayfa → Evidence Pull → parantez/segment | PD + bizim grafik | Hayır |
| V8 | Eğitim, kara ekibi (C-29, C-30) | Satırların arkasındaki insanlar | 4 | Figür sırası (sayı yazılmaz), harita kümesi | Bizim grafik | Hayır |
| V9 | Galveston, ≈1,16M $ (C-10) | Para karada, gemide değil | 5 | Körfez → Galveston punch-in | PD | Hayır |
| V10 | Tesis bileşenleri (C-31, E-11, C-42); **yerleşim GAO'da yok**; fotoğraf yok | Tesisin ne olduğu ve gemiyi beklediği | 6–7 | **AI-01** stilize şematik ortam + Remotion etiketleri (SOURCE→…→CONSEQUENCE'ın EXPLAIN/CONSEQUENCE adımı) | AI-GENERATED / ILLUSTRATIVE | **Evet** — mekânsal açıklama + atmosfer; tek güçlü reveal; vektörle sıfırdan çizmek pahalı ve daha zayıf |
| V11 | İki yıl gelmedi (C-32) | Boşluk | 4 | AI-01 aynı plaka + takvim katmanı (Remotion) | aynı | Aynı asset (yeni AI yok) |
| V13 | Personel New York'a (C-32) | Ters ilişki: insanlar gemiye gidiyor | 5 | Harita yayı + figürler | Bizim grafik | Hayır |
| V14 | "several" (C-33) | Kaynağın kendi cümlesi | 3 | V-01 sayfasına dönüş, vurgu | PD | Hayır |
| V15–V16 | Tek gemi (C-11, C-22) | Yükün tek nesnede birleşmesi | 4 | Segmentler token'a | Bizim grafik | Hayır |
**AI gereken sahne: 1** (Galveston tesisi; V10–V11'de aynı plaka). Atomic Servant ayrı cutaway'i (eski AI-2) **gerekmiyor**: ≈1,5 sn'lik bir isim; AI-01 kompozisyonunda mavna olarak yer alır. Thumbnail hero asset bu audit'in kapsamı dışında (packaging turunda değerlendirilir).

## 4. Mevcut asset sınıflandırması (eski P3_REVIEW_v1 ilk 90 sn + mevcut kaynaklar)
| Asset | Sınıf | Gerekçe |
|---|---|---|
| V-05 Golden Gate 1962 (NARA) | **KEEP AS REAL SOURCE** + TRANSFORM (2.5D, isolation, Object Carry) | Tek güçlü renkli gerçek gemi; Archive World doğal renk |
| V-19 Rotterdam 1964 (CC0) — eski b01 | **KEEP AS REAL SOURCE** (gövdeye; açılışta yok) | Açılışta tek fotoğraf yeterli; gövdede "worked" kanıtı |
| V-07 denize indirme (düşük çöz.) — eski b06 | **REMOVE** | Çözünürlük + açılışta işlevi yok |
| `P3-S1-VoyageMap` — eski b02 | **REPLACE WITH DIAGRAM** (yeniden: token + yay + sayaç, Engineering World) | Statik bölge haritası; gemi yok, süreklilik yok |
| `P3-S1-QuoteReliable` kartı — eski b02q | **REMOVE** (kart) → tek satır Source Serif 4 alıntı | Tam ekran kart yasak |
| `P3-V03-Cover` — eski b03 | **KEEP AS REAL SOURCE** + TRANSFORM (Evidence World fiziksel sayfa, EVIDENCE 01) | Birincil kanıt |
| `P3-V02-DigestP1` — eski b04 | **KEEP AS REAL SOURCE** + TRANSFORM (Evidence Pull başlangıcı) | Q-01 kaynağı |
| `P3-S1-V01Teaser` — eski b05 | **TRANSFORM** (bulanık teaser → V7 net satırlar + Evidence Pull) | Thumbnail vaadi şimdi ödenir |
| `P3-V18-Prototype` — eski b06b | **KEEP AS REAL SOURCE** (gövde Bölüm 3; açılışta yok) | Bağlam açılıştan çıktı |
| `P3-S2-PassengerCargo` — eski b07 | **REMOVE** | Treatment v3 kararıyla aynı |
| `P3-GalvestonMap` | **REPLACE WITH DIAGRAM** (punch-in + Case Tab) | Statik → mekânsal reveal |
| `P3-Facility` (ComponentSchematic) | **REPLACE WITH AI ILLUSTRATION** (AI-01 plaka) + Remotion etiket katmanı | Mekânsal ortam + atmosfer; kutu şeması anlam vermiyor |
| `P3-FacilityTimeline` | **TRANSFORM** (AI-01 üstünde takvim katmanı) | Boşluk aynı plakada görünür |
| `P3-V01-ThreeLines`, `P3-LinesToBar` | **TRANSFORM** (Evidence Pull segmentleri) | Thumbnail motifi korunur |
| `P3-LoneShip` (LoadShare) | **TRANSFORM** (segmentler token'a; "several" sayı göstermez) | Payoff durumu |
| V-08 MARAD reaktör kesiti | **KEEP AS REAL SOURCE** (AI-01'de çekirdeğin doğru sembolü için referans; gövdede kesit) | PD teknik çizim |
| Natural Earth V-28/29 | **KEEP AS REAL SOURCE** (veri) | PD |
| Eski lacivert/kırık beyaz kart stili, tüm kompozisyonların ortak lacivert zemini | **REMOVE** | Brand System: tek filtre yok; Evidence paper, Engineering ink/steel |
| Eski AI-1 (boş rıhtım atmosferi) + AI-2 (Atomic Servant cutaway) prompt'ları | **REMOVE** → AI-01 tek asset | İki ayrı görsel gereksiz |

## 5. AI-01 — talep (HENÜZ GÖNDERİLMEZ; P3 donuk)
Founder'a gidecek metin (donma kalkınca): "Bu sahne için ChatGPT'ye şunu olduğu gibi gönder:"
```
Create an original ILLUSTRATION for a documentary video. It is illustrative, not a historical record or photograph.
Narrative purpose: show a 1960s nuclear ship servicing facility on a Texas waterfront that is ready and waiting — but its berth is empty.
Known facts to depict (verified): a pier and platform area beside water; a large gantry crane (75-ton class) near the pier; a maintenance building (inside it a spent-fuel pool — show it only as a cutaway glimpse or omit); a non-self-propelled servicing barge moored at the pier, long and flat (about 129 ft long by 36 ft wide, roughly 3.5:1), with a small crane on deck; a secured perimeter around the site. The berth for the ship itself is EMPTY.
Must NOT invent: any ship in the berth, readable signs, names, logos, flags, people, specific building architecture details, exact site layout claims, nearby city skyline.
Style: isometric schematic environment / editorial technical illustration, clean lines, flat muted shading; clearly stylized, NOT photorealistic, no fake film grain, no aged-photo look; subtle 1960s technical-brochure line style.
Palette: charcoal #14181C, steel #334854, paper #E7DFCF for highlights, one restrained teal accent #4E8A88 on the empty berth outline only.
Composition: three-quarter isometric view from above the water; empty berth in the lower-left foreground; crane, barge and building spread to the right with space between them for labels; leave clear negative space at the top for a calendar strip; aspect ratio 16:9, high resolution (at least 2560 px wide).
Forbidden false historical details: modern containers, modern cranes, cars, wind turbines, modern safety signage, nuclear trefoil symbols, glowing radiation effects.
No readable text, no logos, no real people. Output: one image.
```
Dosya: `P3-AI-01-galveston-facility.png` → `D:\CompanyOS-Production\P3-ns-savannah\02_graphics\ai\`. Kayıt: asset ledger `AI-GENERATED / ILLUSTRATIVE`, kanıt değil; ekranda "Illustration — components: GAO 1970 · layout not to scale". Foto-gerçekçi değil → disclosure riski düşük; yayın öncesi QA yine kontrol eder. Gelmezse fallback: Remotion 2D izometrik çizgi (doctrine test planı).

## 6. Handoff v3'e girecek değişiklikler (yazılmadı; donma kalkınca)
Brand tokens + fontlar (render PC'de kurulum doğrulaması) · V-05 doğal renk · CASE 001 ident · EVIDENCE eşleme tablosu · Case Tab · dört imza geçiş ataması (§2) · AI-01 · muted preview gate teslim şartı · eski "lacivert zemin" stil satırları kaldırılır. Narration ve beat sırası aynı.

## 7. Audit sonucu
| Kontrol | Sonuç |
|---|---|
| Dört dünya ayrışıyor mu | PASS (plan) |
| Arşiv marka tintiyle öldürülüyor mu | PASS — tint kaldırıldı |
| Case Accent yalnız accent | PASS |
| EVIDENCE etiketleri ledger'a bağlı | PASS |
| Tam ekran bilgi kartı | PASS — sıfır |
| Muted preview riski (koyu zemin yoğunluğu) | **İZLENECEK** — §2 karşı önlem; gerçek kontrol render'dan sonra gate'te |
| AI gerekçesi | PASS — 1 sahne, mekânsal açıklama + atmosfer |
