# P3 / CASE 001 — Brand Proof #3–#5 raporu (v1)

> Tarih: 2026-10-13 · Üreten: render PC (DESKTOP-KVLH9B2) · Karar: **D-040** (kapsamlı unfreeze) · Durum: **Founder PASS/REVISE bekliyor**.
> Kapsam dışı (D-040): full production, final render/VO, kredi, müzik, V-20/V-21, 1964 filmi, AI asset, eski prototype kodu, Premiere XML, legacy `theme.ts`, narration/beat/evidence değişikliği. Proof PASS olsa da full production otomatik başlamaz.

## 1. Teslim
| Proof | Founder dosyası (repo dışı) | Repo önizlemesi |
|---|---|---|
| #3 CASE 001 UI / case identity | `D:\CompanyOS-Production\P3-ns-savannah\02_graphics\brand-proof\P3_BRAND_PROOF_3_case_identity.png` + sessiz klip `P3_BP3_ident_clip_silent.mp4` (4,0 sn, ses izi yok) | `intelligence/creative/brand/proof/P3_BRAND_PROOF_3_case_identity.jpg` |
| #4 Evidence / source label | `…\P3_BRAND_PROOF_4_evidence_labels.png` | `…/proof/P3_BRAND_PROOF_4_evidence_labels.jpg` |
| #5 P3 branded frames / dört dünya | `…\P3_BRAND_PROOF_5_four_worlds.png` | `…/proof/P3_BRAND_PROOF_5_four_worlds.jpg` |
| Muted preview grid (10 örnek) | `…\P3-brandproof-muted-preview-grid.png` | `…/proof/P3-brandproof-muted-preview-grid.jpg` |
Tek tek 1920×1080 kareler: aynı klasörde `P3_BP3_*`, `P3_BP4_*`, `P3_BP5_*`.
Kod: genel bileşenler `production/remotion/src/brand/` (`anim.ts`, `components/CaseLabel.tsx`, `EvidenceLabel.tsx` + `SourceMark`, `CaseTab.tsx`, `Blueprint.tsx` (`EngineeringGround`, `ScaleRule`), `BrandMap.tsx`); P3 proof kompozisyonları `src/videos/p3/brand-proof/` (`P3-BrandProof-3-Ident`, `P3-BrandProof-4-*`, `P3-BrandProof-5-*`). Eski prototype kodu kullanılmadı; gemi konturu V-05'ten yeniden izlendi. `theme.ts` kullanılmadı.

## 2. İçerik
- **#3** Object Outline → Label → Object Carry (`P3-brand-retrofit-spec-v1.md` §4): V-05 doğal renk; "Atomic Teal" kontur (case accent, yalnız kontur + label çizgisi); label `THE INDUSTRIAL CASEBOOK` (dizilmiş yazı, logo değil) / `CASE 001` / **NS SAVANNAH** / ölçek çizgisi / `1962 · NUCLEAR MERCHANT SHIP` (C-30/C-39); arka plan kararır, gemi izole; label söner, gemi küçülüp V2 harita dünyasındaki token konumuna iner (#5c ile aynı konum ve ölçek).
- **#4** `[ 01 ] EVIDENCE · GAO · 1970` V-03 kapağına bağlı · `[ 02 ] EVIDENCE · GAO · 1970 · p.1` V-02 üzerinde: Q-01 satırının altında 2 px `accent.brand`, tek sayı "$2 million" %35 kalem · Source Mark varyantı: harita üstünde Q-06 NPS alıntısı birebir (`font.editorial`) + `NPS` kaynak satırı.
- **#5** ARCHIVE (V-05 doğal renk, marka tinti yok, atıf) · EVIDENCE (`[ 03 ]` V-01 s.2, üçüncü satır altında tek accent) · ENGINEERING (V2 sefer haritası: token, bölge yayları, "19", GAO s.6 sayıları 10/7/2, "not routes") · CASE LAYER (Case Tab `03 · GALVESTON FACILITY`, Galveston şehir düzeyi nokta + gerçek koordinat tikleri 29.3° N / 94.8° W).

## 3. EVIDENCE eşlemesi (ekran numarası = ledger satırı)
| Ekran | Ledger | Kaynak |
|---|---|---|
| EVIDENCE 01 | V-03 (rapor kapağı, E-2 tarih) | GAO · 1970 |
| EVIDENCE 02 | V-02 (Özet s.1 — Q-01 / C-04) | GAO · 1970 · p.1 |
| EVIDENCE 03 | V-01 (Özet s.2 — C-06, C-08..C-10) | GAO · 1970 · p.2 |
Source Mark (numarasız): NPS (Q-06), GAO · 1970 · p.6 (C-14/C-44), GAO · 1970 · p.15 (Galveston), Natural Earth.

## 4. Haklar
Kullanılan: V-05 (NARA 542141, "Use: Unrestricted", atıf "AEC / National Archives" ekranda), V-01/V-02/V-03 (GAO, kamu malı), V-28/V-29 (Natural Earth, kamu malı), Q-06 (NPS alıntısı, atıflı). **Kullanılmayan:** V-20 (UNKNOWN_RIGHTS), V-21 (REJECTED), 1964 filmi, AI görsel. Ses yok.

## 5. Muted Preview Gate (proof seti; `muted-preview-gate` §2–§3)
Örnekler (10): #3 klip 0,3 / 2,0 / 3,9 sn · #4a · #4b · #4c · #5a · #5b · #5c · #5d → `P3-brandproof-muted-preview-grid.png`.
| Soru | Sonuç |
|---|---|
| 1 Sessizken ilgi | EVET — gerçek gemi, gerçek belge, veri taşıyan harita her örnekte |
| 1b Premium / koyu-mavi şablon yok | EVET (not: Engineering haritaları spec gereği ink→steel; kara yarı saydam, grid ve kıyı çizgisi görünür — düz lacivert kart yok) |
| 1c Endüstriyel ağırlık | KISMEN — ağır dar display + ince çizgi dili var; metal/oksit yüzey dokusu spec gereği çok hafif (%3–5), küçük boyutta seçilmiyor |
| 2 Aynı kanala ait | EVET — aynı meta tipografi, 1 px iron çizgi, numaralı modül |
| 3 Template tekrarı | HAYIR (ilk turda #4c ve #5d aynı Körfez haritasıydı → #4c NPS alıntı karesine çevrildi) |
| 4 Yalnız koyu kart + metin | HAYIR |
| 5 Dünyalar dengeli | EVET — ARCHIVE 3 · EVIDENCE 3 · ENGINEERING/CASE LAYER 4 |
| 6 Konu/merak sinyali | EVET |
Brand diversity QA: arşiv doğal (tint yok; izolasyon kararması yalnız ident anında) · Atomic Teal yalnız kontur/label çizgisi · amber her karede tek odak · EVIDENCE numaraları ledger'la eşleşiyor · AI görsel yok · ilk turda bulunan sorun (#3c'de arka planda ikinci gemi) düzeltildi.
**Sonuç: PASS** (Founder'a gider).

## 6. COO notları (Founder kararı gerektirmez)
- **Okunabilirlik çelişkisi (spec seviyesi):** `video-ui-spec-v1.md` meta etiketleri 16–22 px tanımlıyor; `brand-system-v1.md` §E ikincil metin için ≥ 23 px istiyor. Proof spec ölçülerini izledi (harita yer etiketleri 24–28 px'e çıkarıldı). Çözüm v3 handoff'unda tek değere bağlanacak (öneri: Case Layer meta 22 → 24 px, Source Mark 16 → 20 px); renk/font mikro kararı değil, sistem düzeltmesi.
- Engineering dünyası ink→steel paleti nedeniyle sessiz önizlemede "koyu" okunabilir; v3'te büyük tanınır nesne (token, tesis, figür) kadrajın ≥ üçte biri kuralı (retrofit spec §3) uygulanacak.

## 7. Founder kararı
Her proof için yalnız **PASS / REVISE** (+ istersen tek cümle). Üçü PASS → Handoff v3 yazılır (narration/beat değişmez) ve ayrı Founder kararı beklenir; full production otomatik başlamaz.
