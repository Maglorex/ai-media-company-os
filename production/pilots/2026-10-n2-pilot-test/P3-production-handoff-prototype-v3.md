# P3 (VID-001) / CASE 001 — Production Handoff (motion prototype) v3

> Tarih: 2026-10-13 · Hazırlayan: COO · Uygulayan: render PC Claude (DESKTOP-KVLH9B2, `production-engineer` rolü)
> Kararlar: D-030 (opening v2 narration) · D-031/D-032 (Brand System v1) · D-040 (kapsamlı unfreeze) · **D-041** (proof'lar PROVISIONAL PASS / APPROVED FOR MOTION TEST; minimum görsel yoğunluk)
> **Durum: HAZIR — Founder kararı bekliyor (§0).** Founder "üret" demeden render yapılmaz.
> Yerine geçtiği: `P3-production-handoff-prototype-v2.md` (bekletilmiş; silinmez). Bağlayıcı: doctrine v1 · `brand-system-v1.md` · `video-ui-spec-v1.md` · `P3-brand-source-to-visual-audit-v1.md` · `P3-brand-retrofit-spec-v1.md` · `P3-evidence-ledger.md` · `production/pilots/2026-10-n2-pilot-test/VID-001-rights-ledger.csv` · `.claude/rules/audio-production.md`.
> Kapsam: **yalnız açılış motion prototype'ı (≈82 sn)**. Bu kapsam dışında üretim yapma.

## 0. Durum ve onaylar
| Konu | Durum |
|---|---|
| Render (motion prototype) | **Founder onayı bekleniyor** (D-041: v3 sonrası ayrı karar) |
| VO | **Founder kararı bekleniyor — önerilen: mevcut opening v2 VO'yu yeniden kullan (0 yeni kredi).** Dosya: `D:\CompanyOS-Production\P3-ns-savannah\03_vo\prototype-v2\P3_VO_OPEN_v2_eleven_multilingual_v2.mp3` (+ `.json` kelime zamanları; 467 kredi D-030'da harcandı, `usage.csv` U-006; QA temiz, Founder kulak kontrolü yapılmadı). Narration metni değişmediği için yeni üretim gerekmez. |
| Yeni ElevenLabs kredisi | **Yok** (D-040 yasağı sürüyor) |
| Müzik / SFX | **Yok** — müzik izi boş, SFX yok (D-040; motion testi görsel kararı izole eder). Sessizlik anları korunur. |
| AI görsel (AI-01) | **Founder üretir (ChatGPT, §9 prompt)**; gelmezse fallback (§9). Render PC AI üretmez. |
| Yeni araç / npm paketi / ücretli asset | Yok |
| Eski kod | **Kullanılmaz:** arşivdeki opening prototype kodu, Premiere XML hattı, legacy `theme.ts`. Yeni kod yalnız `src/brand/` bileşenleri + yeni `src/videos/p3/v3/` kompozisyonu. |

## 1. Core promise
NS Savannah çalışan bir gemiydi; ama devlet desteğinin büyük kısmı gemiye değil, karada onu bekleyen bir sisteme gidiyordu — birkaç gemiye hizmet edebilecek, tek gemiye yüklenmiş bir sistem. Açılış bu çelişkiyi gerçek gemi, gerçek belge ve boş bekleyen tesisle kurar ve "neden?" sorusuyla biter.
Title/thumbnail packaging bu turun kapsamı dışında (Launch OS sonrası).

## 2. Hook
- İlk görüntü: **gerçek gemi** (V-05, 1962, doğal renk), kadrajın büyük kısmı.
- İlk cümleler (birebir, §4): "The NS Savannah was the first nuclear-powered merchant ship. And she worked."
- İzleyicide açılan soru: çalışan bir gemiyse sorun ne? → 1970 denetimi → "Where was that money going?"

## 3. Narrative structure (açılış)
Gerçek gemi ve "çalıştı" (0–15 sn) → denetçiler ve fark (15–29) → üç satır (29–39) → Galveston tesisi ve bileşenler (39–55) → iki yıl gelmedi + sessizlik (55–60) → personel New York'a (60–66) → "several" vs "only one" (67–74) → son soru (75–82). Değişmedi (v2 §3 ile aynı sıra).

## 4. VO metni (birebir; D-030 — değişmez)
`P3-production-handoff-prototype-v2.md` §2'deki metin, kelimesi kelimesine. Ses dosyası yeniden kullanılırsa (öneri) zamanlama aynı: VO başı 0,6 sn; ek boşluklar 58,30 sn (+1,2 sn, "…didn't come back." sonrası) ve 72,40 sn (+0,5 sn, "There was only one." sonrası); kesimler ölçülmüş sessizliklerde. Kelime zamanları `.json`'dan okunur (zamanlar elle girilmez).

## 5. Scene purposes — beat tablosu (TC ≈ video saniyesi; kelime zamanından)
| # | TC | VO (ilk kelimeler) | Sahnenin işi | Dünya / görsel | Primary asset | Hareket (nereye götürüyor) | Tipografi / UI | Hak | Durum |
|---|---|---|---|---|---|---|---|---|---|
| A1 | 0–5 | "The NS Savannah…" | ESTABLISH: gerçek nesne | **ARCHIVE** — V-05 tam kadraj, doğal renk | V-05 | Çok hafif 2.5D (gemi katmanı ön planda); "merchant ship"te kontur çizilir (Atomic Teal), arka plan hafifçe kararır | **CASE 001 ident** (§7c) ≈2 sn: yalnız `CASE 001` + **NS SAVANNAH** (+ küçük wordmark). Alt satır/metadata **yok** | NARA "Use: Unrestricted"; atıf `AEC / NATIONAL ARCHIVES` (Source Mark, zorunlu) | yeni |
| A2 | 4–11 | "And she worked. In her first three commercial years…" | PROVE: gerçekten çalıştı | **ARCHIVE** — V-19 (Rotterdam, 30 Eyl 1964) büyük kadraj → kısa ENGINEERING haritası | V-19 → harita | V-19 üzerinde detay kayması (liman/rıhtım; dekoratif zoom değil); "nineteen voyages"ta gemi konturu haritaya **iner** (Object Carry) ve 3 bölge yayı çizilir | Büyük **19** + bölge sayıları 10/7/2 (GAO s.6). Grid **yok**. Tarih Source Mark'ı: `ROTTERDAM · 1964` | V-19 CC0 (Nationaal Archief/Anefo); Natural Earth PD | yeni |
| A3 | 11–15 | "Her operators called her…" | PROVE (insan) | Harita kadrajı sabit; tek satır alıntı | — | Alıntı tek satır belirir; harita kararmaz | NPS alıntısı **birebir** "the most reliable ship we have operating" (`font.editorial`) + Source Mark `NPS` | Q-06 (atıf zorunlu) | yeni |
| A4 | 15–20 | "Then, in 1970, federal auditors…" | CONTRADICT: kaynak geliyor | **EVIDENCE** — V-03 kapak, sayfa kadrajın ≥ %60'ı (paper parlak) | V-03 | Gemi konturu kapağa "dosyalanır" (Object Carry); kamera tarih damgasına iner | `[01] EVIDENCE · GAO · 1970` (tek kez, ≈2 sn) | GAO PD | yeni |
| A5 | 20–29 | "The Savannah needed about two million…" | PROVE: fark | **EVIDENCE** — V-02 s.1, Q-01 cümlesi büyük | V-02 | Sayfa çevrilir; kamera Q-01 satırına; "$2 million" tek sayı amber | `[02] EVIDENCE · GAO · 1970 · p.1`; satır altı 2 px `accent.brand` | GAO PD | yeni |
| A6 | 27–39 | "Where was that money going? … three lines…" | REVEAL (thumbnail vaadi) | **EVIDENCE** — V-01 s.2, üç satır sırayla yanar | V-01 | Her satır söylendiği an yanar; "a third line bigger than the other two combined"de üçüncü satır büyür (Evidence Pull: satır sayfadan hafifçe öne alınır). **Ayrı figür vinyetleri yok** (v2 V8 kaldırıldı) | `[03] EVIDENCE · GAO · 1970 · p.2` | GAO PD | yeni |
| A7 | 39–43 | "A nuclear servicing facility in Galveston, Texas." | LOCATE | ENGINEERING — Körfez → Galveston punch-in (kısa) | Natural Earth | Üçüncü satırın değeri haritaya düşer → Galveston noktası | **Case Tab `03 · GALVESTON FACILITY`** (≤2 sn) | PD | yeni |
| A8 | 43–55 | "A pier. Heavy cranes. A pool… Atomic Servant. Even a spare reactor core. About one point one six million…" | EXPLAIN + SCALE | **ILLUSTRATION** (AI-01, büyük, açık tonlu) + kısa **ARCHIVE** cutaway | AI-01; V-08 | Her bileşen söylendiğinde kamera o bölgeye kısa kayar; **"spare reactor core"da V-08 MARAD reaktör kesitine kesme (gerçek teknik çizim, büyük)**, sonra plakaya dönüş; boş rıhtım Teal kesik kontur | Yalnız bileşen adları (küçük, söylendiği an); "Illustration — components: GAO 1970 · layout not to scale" (zorunlu); **tek büyük sayı** "$1,162,000 a year" (GAO ifadesi) | AI-01 ILLUSTRATIVE; V-08 PD | yeni (AI-01 gelirse) |
| A9 | 55–60 | "And then, for two years, the Savannah didn't come back." + sessizlik | ESCALATE | AI-01 plaka | AI-01 | İnce takvim çizgisi 1966→1968 (metin yok, yalnız yıllar); bileşenler renk kaybeder; "back."te her şey durur; 1,2 sn sessizlik | 1966 · 1967 · 1968 | — | yeni |
| A10 | 60–66 | "For her 1967 and 1968 inspections…" | CONTRADICT (insanlar gemiye gidiyor) | ENGINEERING — Galveston → New York yayı | Natural Earth | Yay çizilir; birkaç küçük figür ilerler; New York'ta gemi konturu büyük bekler | `NEW YORK` (yer adı) | PD; figürler temsilî | yeni |
| A11 | 67–74 | "The auditors wrote… several… There was only one." | PROVE + PAYOFF | **EVIDENCE** V-01 (C-33 cümlesi) → **ARCHIVE** V-05 izole gemi | V-01 → V-05 | C-33 cümlesi altı çizilir ("10 vessels" satırı odak dışında, D-018); "only one"da **gerçek gemi** (V-05 izole, büyük) belirir, üç satır onun üstüne iner (ağırlık) | Label tekrar **yok** (03 zaten gösterildi) | GAO PD; V-05 | yeni |
| A12 | 75–82 | "So why was one working ship…" | RESET (soru) | ARCHIVE gemi + yük, sonra siyah | V-05 | Çok yavaş geri çekilme → siyah | yok | — | yeni |

## 6. Asset plan
**KEEP (gerçek kaynak):** V-05 (`01_archive\photos\V-05_nara-542141_golden-gate_1962.jpg`), V-19 (`01_archive\photos\V-19_rotterdam_1964-09-30_cc0.jpg`), V-08 (`01_archive\photos\V-08_reactor-drawing_marad-1960.jpg`), GAO sayfaları `pages\page-01.png` (V-03), `page-05.png` (V-02), `page-06.png` (V-01), Natural Earth `maps\`.
**NEW:** `src/videos/p3/v3/` kompozisyonu (`P3-OPENING-v3`), yalnız `src/brand/` bileşenleriyle (`CaseLabel`, `EvidenceLabel`, `SourceMark`, `CaseTab`, `BrandMap`, `useBrandFonts`); AI-01 plakası (Founder, §9).
**REMOVE (v3'te yok):** v2 V8 figür vinyetleri, sürekli harita/grid zeminleri, ident alt satırı ve ölçek tikleri, harita kredileri ekranda (açıklamaya gider), tam ekran kart, legacy `theme.ts`, arşivdeki opening prototype kodu.

## 7. Visual language
- **Kahraman gerçek kaynak:** gemi fotoğrafları ve gerçek belgeler ekranın büyük kısmını kaplar; UI onları işaretler, örtmez.
- Tek palet Brand System v1; marka tinti arşive uygulanmaz.
- Hareket bilgi taşır (iniş, satır, kontur, taşıma); dekoratif zoom/Ken Burns zinciri yok.
- Geçişler: Object Carry (gemi konturu fotoğraf → harita → kapak → New York → final gemi), Evidence Pull (sayı/satır belgeden öne). Case Tab bir kez.
- Yapılmayacaklar: foto+pan+kart döngüsü, tam ekran bilgi kartı, dashboard görünümü (çok etiket, grid, metadata satırları), düz lacivert zemin.

## 7b. Brand + Source-to-Visual
- Case: **CASE 001 · NS SAVANNAH** · case accent **Atomic Teal #4E8A88** (yalnız gemi konturu + ident çizgisi + boş rıhtım konturu) · amber yalnız kanıt değeri ($2M, üçüncü satır, $1,162,000).
- Dünya ataması §5 sütunu; imza geçişler: Object Carry (A1→A2→A4→A10→A11), Evidence Pull (A5–A7, A11), Case Tab (A7), Source Mark (A1, A2, A3).
- EVIDENCE eşleme: 01 = V-03 · 02 = V-02 (Q-01/C-04) · 03 = V-01 (C-06, C-08..C-10; C-33). Numaralar yalnız bu üç belgede.
- Font/renk: `src/brand/tokens.ts` + yerel font bağlama (`fonts.ts`; eksik font render'ı durdurur). Fontlar render PC'de doğrulandı (2026-10-13).
- Source-to-visual: `P3-brand-source-to-visual-audit-v1.md` §3, şu değişikliklerle: A2'ye V-19 gerçek fotoğraf (arşiv ağırlığı), A8'de "spare reactor core" için V-08 gerçek çizim, A11–A12 finali gerçek gemi (V-05) — token değil.

## 7c. Dynamic Case Ident (D-034)
| Case number | Case title | Ident concept | Hero object | Case accent | Visual motif | Start TC | End TC | Transition into story | Asset / hak |
|---|---|---|---|---|---|---|---|---|---|
| CASE 001 | NS SAVANNAH | Object Outline → Label → Object Carry | V-05 gemi | #4E8A88 | gemi konturu | "NS Savannah" kelimesi (≈0,9 sn) | ≈3,0 sn (≤3 sn) | Label söner; kontur A2'de haritaya iner | V-05 NARA "Use: Unrestricted", atıf |
Siyah ekran + logo yok; VO durmaz. Proof #3'ten fark: alt satır (`1962 · NUCLEAR MERCHANT SHIP`) ve ölçek tikleri **kaldırıldı** (D-041 yoğunluk).

## 7d. Görsel yoğunluk bütçesi (D-041 — bağlayıcı)
| Ölçü | Hedef |
|---|---|
| Gerçek kaynak (ARCHIVE + EVIDENCE) ekran süresi | ≥ ~%55 |
| Koyu Engineering zemin (harita) ekran süresi | ≤ ~%25; her harita karesinde büyük tanınır nesne (gemi konturu / kıyı / nokta) |
| Grid | **yok** |
| EVIDENCE label | yalnız 01, 02, 03 — her biri ilk görünüşünde ≈2 sn; tekrar yok |
| CASE LAYER | ident (bir kez) + Case Tab (bir kez) |
| Ekranda aynı anda metin öğesi | ≤ 2 (Source Mark dahil) |
| Source Mark | yalnız zorunlu atıf (V-05, V-19, NPS, illüstrasyon etiketi) |
| Tam ekran kart | 0 |
Production Claude bu bütçeyi ölçer (her beat'in dünyası ve süresi) ve rapora yazar; aşılırsa teslimden önce düzeltir.

## 8. Footage list
| ID | Kaynak | Ne gösteriyor | Hak | Kullanım | Durum |
|---|---|---|---|---|---|
| V-05 | NARA 542141 | Golden Gate, 1962, renkli | "Use: Unrestricted"; atıf AEC / National Archives | A1, A11–A12 | indirilmiş |
| V-19 | Nationaal Archief / Anefo (Eric Koch) | Rotterdam, 30 Eyl 1964 | CC0 | A2 (tarih görünür) | indirilmiş |
| V-08 | MARAD broşürü 1960 (Commons) | Reaktör kesiti | PD (MARAD) | A8 | indirilmiş |
**Hareketli footage: yok** — hakkı temiz Savannah footage'ı bulunmadı (V-30 1964 filmi: yapımcı Orleans Film Productions, hak durumu belirsiz → kullanılmaz; D-026). "Archive footage ana kahraman" yönü bu prototype'ta **gerçek fotoğraf + belge** ile karşılanır.
**Opsiyonel dış araştırma (bloklamaz; Founder isterse ChatGPT'ye):**
```
Research task (no downloads): Find moving-image footage of the nuclear merchant ship NS Savannah (1959–1971) whose usage rights are verifiably unrestricted for commercial YouTube use. Priority sources: U.S. National Archives catalog (records from the Atomic Energy Commission, Maritime Administration, U.S. Coast Guard, U.S. Information Agency), Library of Congress, Prelinger Archives. For each item give: title, year, NARA identifier (NAID) or catalog URL, producer/creator, the exact "Use"/rights statement as written on the catalog page, duration, and what the footage shows (ship at sea, in port, servicing facility at Galveston, crew). Exclude anything produced by a private company or marked "Undetermined", "Restricted", or "Possibly restricted". Flag uncertainty explicitly; do not assume public domain from government sponsorship alone. Output a table plus the catalog links.
```
Dönen sonuç `[VARSAYIM]`; COO her kalemi resmî katalog sayfasından doğrular, rights ledger'a yazar; ancak ondan sonra kullanılabilir.

## 9. AI visual requests
**AI-01 — Galveston tesisi (A8–A9).** Founder'a: "Bu sahne için ChatGPT'ye şunu olduğu gibi gönder:"
```
Create an original ILLUSTRATION for a documentary video. It is illustrative, not a historical record or photograph.
Narrative purpose: show a 1960s nuclear ship servicing facility on a Texas waterfront that is ready and waiting — but its berth is empty.
Known facts to depict (verified): a pier and platform area beside water; a large gantry crane (75-ton class) near the pier; a maintenance building (show its interior only as a small cutaway glimpse with a water-filled pool, or omit); a non-self-propelled servicing barge moored at the pier, long and flat (about 129 ft long by 36 ft wide, roughly 3.5:1), with a small crane on deck; a secured perimeter around the site. The berth for the ship itself is EMPTY.
Must NOT invent: any ship in the berth, readable signs, names, logos, flags, people, specific building architecture details, exact site layout claims, nearby city skyline.
Style: isometric editorial technical illustration, clean confident lines, flat shading; clearly stylized, NOT photorealistic, no fake film grain, no aged-photo look; subtle 1960s technical-brochure line style.
Tone and palette: overall MID-TONE and fairly light, not a dark night scene. Water and ground in warm grey and muted steel blue (#334854 as the darkest tone), paper-white highlights (#E7DFCF), line work in charcoal (#14181C); one restrained teal accent (#4E8A88) used ONLY on the empty berth outline.
Composition: three-quarter isometric view from above the water; empty berth in the lower-left foreground, large and clearly readable; crane, barge and building spread to the right with breathing space between them; keep the top 15% calm (sky or water) for a thin timeline line; aspect ratio 16:9, high resolution (at least 2560 px wide).
Forbidden false historical details: modern containers, modern cranes, cars, wind turbines, modern safety signage, nuclear trefoil symbols, glowing radiation effects.
No readable text, no logos, no real people. Output: one image.
```
- Dosya: `P3-AI-01-galveston-facility.png` → `D:\CompanyOS-Production\P3-ns-savannah\02_graphics\ai\`. Kayıt: asset ledger `AI-GENERATED / ILLUSTRATIVE` + rights ledger satırı (`ai-generated-own`; prompt + tarih), kanıt değil; ekranda "Illustration — components: GAO 1970 · layout not to scale".
- Foto-gerçekçi değil → disclosure riski düşük; Release Gate G-11 yine kontrol eder.
- **Gelmezse fallback:** Remotion'da açık tonlu 2D izometrik çizgi plakası (aynı bileşenler, boş rıhtım Teal kesik kontur); rapor "AI-01 yok → fallback" yazar.

## 10. Typography moments
| TC | Metin (birebir) | Tür | Kaynak |
|---|---|---|---|
| ≈1 | CASE 001 / NS SAVANNAH | isim (ident) | — |
| ≈7 | 19 · Mediterranean 10 · Northern Europe 7 · Far East 2 | sayı | GAO s.6 (C-14/C-44) |
| ≈12 | "the most reliable ship we have operating" | alıntı | NPS (Q-06), atıflı |
| ≈16 / 21 / 31 | [01] / [02] / [03] EVIDENCE · GAO · 1970 (· p.1 / p.2) | kaynak | V-03 / V-02 / V-01 |
| ≈40 | 03 · GALVESTON FACILITY | yer | GAO s.15 |
| ≈53 | $1,162,000 a year | sayı | GAO (C-10) |
| ≈56 | 1966 · 1967 · 1968 | tarih | C-32 |
| ≈64 | NEW YORK | yer | C-32 |
Closed captions: SRT, `production/tools/captions/` (final VO timing'den; yakılmaz) — prototype için zorunlu değil.

## 11. Music & SFX direction
Bu motion testinde **müzik ve SFX yok** (D-040; Founder'ın görsel kararı izole). Sessizlik: A9 sonu 1,2 sn, A11 sonu 0,5 sn, final siyah. Full production'da müzik yönü ayrı (`documentary-music-sfx`).

## 12. Prototype boundary
Başlangıç: siyahtan V-05 (0 sn). Bitiş: "…that could serve several?" + ≈2,5 sn tutma → siyah. Review kopyası: 1080p30 H.264, VO −16 LUFS (doğrusal kazanç; ham VO kopyası ayrıca), müzik izi boş.

## 13. Evidence restrictions
"loss / failure / wasted" ekranda yok (D-REJ-3) · ekranda yalnız GAO rakamları; C-07 toplamı, "10 gemi" (C-13), "20+" (C-41) yok · "neden" iddiası yok (D-REJ-1) · tesis yerleşimi GAO'da yok → illüstrasyon etiketli · NPS alıntısı birebir + atıf · V-19 tarihi ekranda (1964, gösterim dönemi; ticari dönemle karıştırılmaz) · **V-20, V-21, 1964 filmi, UNKNOWN/UNRESOLVED hakkı olan hiçbir asset kullanılmaz.**

## 14. Teslim ve geri bildirim (Founder "üret" dedikten sonra)
1. `D:\CompanyOS-Production\P3-ns-savannah\06_renders\P3_OPENING_MOTION_PROTOTYPE_v3.mp4` (1080p, müziksiz).
2. **`muted-preview-gate`** grid + PASS/REVISE (REVISE ise teslim yok) + §7d yoğunluk bütçesi ölçümü (dünya süreleri, metin öğesi sayısı) + doctrine §12 COO ön kontrolü + kare farkı ölçümü (en uzun değişmeyen durum).
3. Rapor: `production/pilots/2026-10-n2-pilot-test/P3-prototype-v3-report.md` (sapmalar, production problemleri, AI-01 durumu, ölçümler).
4. Yerel commit; push Founder'da (GitHub Desktop).
5. **Founder'a tek soru (D-041):** "Bunu gerçekten The Industrial Casebook videosu olarak izlemeye devam eder miydim?" — **EVET olmadan full production yok.**

## 15. Doctrine §12 COO ön kontrolü (plan düzeyi; render sonrası yeniden ölçülür)
| # | Soru | Plan |
|---|---|---|
| 1 | İlk 30 sn'de somut nesne + anormallik | EVET — gerçek gemi (A1–A2) + 1970 denetimi ve ≈2M $ fark (A4–A5) |
| 2 | 60 sn içinde açık soru | EVET — "Where was that money going?" (≈28 sn) |
| 3 | İnsan veya somut sahne | EVET — operatörlerin sözü (A3), New York'a giden personel (A10); gerçek fotoğraflar |
| 4 | 15 sn'yi aşan statik görsel | HAYIR (planlanan en uzun durum A8 içinde, bileşen başına ≈2 sn) |
| 5 | Kart = tez/sayı | EVET — tam ekran kart yok; yalnız 19, $1,162,000 ve kaynak etiketleri |
| 6 | Hareket bilgi taşıyor | EVET — kontur, iniş, satır, taşıma; dekoratif zoom yok |
| 7 | Tek palet/tek dünya | EVET — Brand System v1; arşiv doğal renk |
| 8 | Kanıt ekranda, temsili görüntü etiketli | EVET — GAO sayfaları; AI-01 "Illustration" |
| 9 | Ses | Founder kulak kontrolü (VO yeniden kullanılırsa ilk kez) |
Handoff production PC'ye gitmeye hazır; render Founder kararıyla başlar.