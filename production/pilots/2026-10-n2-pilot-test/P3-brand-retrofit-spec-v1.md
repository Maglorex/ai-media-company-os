# P3 / CASE 001 — Brand retrofit specification (ilk ~90 sn) + Muted Preview örnek frame planı

> Tarih: 2026-10-13 · COO · **P3 donuk; render, kredi, AI, handoff yok.** Logo kullanılmaz.
> Bağlı: `intelligence/creative/brand/video-ui-spec-v1.md` (label + dünya treatment'ları) · `P3-production-handoff-prototype-v2.md` (narration + beat V1–V16; değişmez) · `P3-brand-source-to-visual-audit-v1.md` (dünya ataması, EVIDENCE eşlemesi, AI-01) · D-031..D-033.
> Bu dosya handoff v3'ün marka bölümüdür; v3 donma kalkınca yazılır.

## 1. Beat bazında marka değişiklikleri (eski render → yeni)
| Beat | Anlatı | Eski P3 (REVIEW_v1 / v2 plan) | Yeni (marka) | Dünya |
|---|---|---|---|---|
| V1 | Gemi tanımı | V-19/V-05 lacivert tonlu, yavaş zoom | V-05 **doğal renk**, 2.5D katman; gemi ön plana ayrılır | ARCHIVE |
| V2 | "worked", 19 sefer | Statik lacivert bölge haritası | Gemi konturu `accent.case` (Atomic Teal) ile çizilir → **CASE 001 · NS SAVANNAH** label (≈2,2 sn) → siluet Engineering haritasına token olarak iner (Object Carry); grid + kıyı çizgisi iron; yaylar ince çizgi, sayaç font.display | ARCHIVE → ENGINEERING |
| V3 | Operatörlerin sözü | Tam ekran lacivert alıntı kartı | Harita üstünde tek satır font.editorial + Source Mark `NPS` | ENGINEERING |
| V4 | 1970 raporu | Düz sayfa, lacivert zemin | Token rapor kapağına "dosyalanır"; kapak fiziksel sayfa, sayfa dışı endüstriyel yüzey; **[ 01 ] EVIDENCE · GAO · 1970** | EVIDENCE |
| V5 | ≈2M $ | Sayfa vurgusu, lacivert | Sayfa çevrilir → **[ 02 ] EVIDENCE · GAO · 1970 · p.1**; Q-01 satırı `accent.brand` alt çizgi | EVIDENCE |
| V6 | Karşılaştırma | (yok / kart) | Evidence Pull: "$2 million more" sayfadan kalkar → Engineering zeminde iki çubuk + ölçek cetvelli parantez | EVIDENCE → ENGINEERING |
| V7 | Üç satır | Bulanık teaser kart | **[ 03 ] EVIDENCE · GAO · 1970 · p.2** sayfa arkada, üç satır yanar → segmentler parantezi doldurur | EVIDENCE + ENGINEERING |
| V8 | Eğitim / kara ekibi | Kartlar (TrainingFlow, PortFlow) | Gemi konturu içinde figür sırası (iron, yanan figürler paper); harita kümesi + ince çizgiler | ENGINEERING |
| V9 | Galveston | Statik harita | **Case Tab `03 · GALVESTON FACILITY`**; Körfez → Galveston zoom-through, koordinat tikleri; $1.162M segmenti haritaya düşer (Evidence Pull devamı) | ENGINEERING |
| V10–V11 | Tesis + iki yıl | Kutu şema + takvim kartı | AI-01 illüstrasyon plakası (izometrik, Engineering paleti) + font.meta etiketler + kesit işareti; boş rıhtım `accent.case` kesik kontur; takvim şeridi ölçek cetveli diliyle; "Illustration — components: GAO 1970 · layout not to scale" Source Mark | ENGINEERING (illüstrasyon) |
| V13 | New York | Kart | Harita yayı + figürler; Source Mark `GAO · 1970 · pp.15–16` | ENGINEERING |
| V14 | "several" | Belge kartı | **[ 03 ]** sayfasına dönüş, C-33 cümlesi alt çizgi | EVIDENCE |
| V15–V16 | Tek gemi | LoneShip lacivert diyagram | Segmentler token'a iner; tek vurgu `accent.case`; son kare sade, metin yok | ENGINEERING |
**Kalkanlar:** tüm kompozisyonların ortak lacivert zemini (`theme.ts` tek tema), tam ekran alıntı/kapsam kartları, düz lacivert harita, eski "defter şeridi" (Case Layer etiketleri bu işi devraldı).
**Değişmeyenler:** narration, beat sırası, kanıt, hak durumu.

## 2. Teknik uygulama notu (render PC, donma kalkınca)
- Token ve dünyalar: canonical `production/remotion/src/brand/` modülü (`tokens.ts`, `worlds.ts`, `fonts.ts`; `17adef1`). `src/theme.ts` legacy (lacivert pilot teması) kalır, P3'te kullanılmaz; gereken şablonlar (`DocumentHighlight`, `LinesToBar`, `LoadShare`, harita) v3'te `brand/` token'larına taşınır.
- Yeni bileşenler: `CaseLabel`, `EvidenceLabel` (+ SourceMark varyantı), `CaseTab`, `BlueprintGrid`, `ScaleRule`. Logo bileşeni yok.
- Fontlar render PC'de kurulu ve doğrulandı (2026-10-13; IBM Plex Sans Condensed, IBM Plex Mono, Source Serif 4; OFL-1.1); Remotion'da `brand/fonts.ts` yerel bağlama — eksik font render'ı durdurur. Display = IBM Plex Sans Condensed Bold.

## 3. Muted Preview Gate — örnek frame planı (bu 90 sn için)
Prototype tamamı kapsamda; 9 örnek × ~3 sn, her biri farklı beat (TC'ler VO zaman damgalarına göre kayar):
| # | ≈TC | Beat | Beklenen sessiz sinyal | Dünya |
|---|---|---|---|---|
| S1 | 0:02–0:05 | V1 | Gerçek gemi, doğal renk — "bu gerçek" | ARCHIVE |
| S2 | 0:07–0:10 | V2 | CASE 001 label + gemi konturu → kanal kimliği | ARCHIVE → ENGINEERING |
| S3 | 0:12–0:15 | V2 | Harita, token, yaylar, sayaç — hareket + ölçek | ENGINEERING |
| S4 | 0:22–0:25 | V5 | Gerçek belge, EVIDENCE 02, vurgulu satır | EVIDENCE |
| S5 | 0:30–0:33 | V6 | Sayıdan doğan karşılaştırma — merak | EVIDENCE → ENGINEERING |
| S6 | 0:40–0:43 | V7–V8 | Üç segment / insan figürleri | ENGINEERING |
| S7 | 0:50–0:53 | V9 | Case Tab + Galveston zoom | ENGINEERING |
| S8 | 0:58–1:01 | V10 | Tesis illüstrasyonu, boş rıhtım | ENGINEERING (illüstrasyon) |
| S9 | 1:12–1:15 | V13 | New York yayı, ters yolculuk | ENGINEERING |
**Gate kontrolleri (skill §2–§3 + bu video):** S1–S9'un hiçbiri "koyu zemin + küçük metin" değil · üç dünya görünür (ARCHIVE 2, EVIDENCE 2, ENGINEERING 5+) · Engineering örneklerinde büyük tanınır nesne (gemi token'ı, kıyı, tesis, figür) kadrajın ≥ üçte biri · lacivert şablon hissi yok · endüstriyel ağırlık (ağır dar display + ince mühendislik çizgisi) en az S2, S3, S7'de görünür.
**Risk:** ENGINEERING ağırlığı (arşivde hakkı temiz hareketli görüntü yok). FAIL olursa ilk müdahale: V2/V3 arasında V-05'in detay kırpımıyla ikinci ARCHIVE anı; V14'te belgeyi daha büyük/yakın kadraj.

## 4. Dynamic Case Ident — CASE 001 · NS SAVANNAH (D-034; yalnız plan)
Narration ve görsel sıra **değişmez**; ident V1→V2 geçişinin içinde doğar.
| Alan | P3 |
|---|---|
| Case number / title | CASE 001 · NS SAVANNAH |
| Ident concept | **Object Outline → Label → Object Carry** |
| Hero object | NS Savannah — V-05 (1962) fotoğrafından izole siluet |
| Case accent | Atomic Teal #4E8A88 (yalnız kontur ve label çizgisi) |
| Visual motif | gemi silueti → rota çizgisi (V2 haritası) · denetim satırı (V4–V5'e köprü) |
| Start TC | "The NS Savannah was the first nuclear-powered merchant ship." cümlesinin **"NS Savannah"** kelimesi (≈0:01) |
| End TC | "…merchant ship." sonu + ~0,6 sn (≈0:04–0:05); toplam ≈2,2–2,8 sn |
| Transition into story | Label söner; Teal kontur gemiyle birlikte küçülür, haritaya **token** olarak iner ("And she worked." ile V2 haritası açılır) |
| Wordmark | Label üst satırında `THE INDUSTRIAL CASEBOOK` font.meta 16 px, iron — logo değil, dizilmiş yazı |
| Asset / hak | V-05 NARA 542141 "Use: Unrestricted" + atıf "AEC / National Archives"; kontur, label, harita bizim grafik |
**Akış:** 0:00 gerçek fotoğraf doğal renkte, 2.5D katman (story başladı, anlatıcı konuşuyor) → "NS Savannah" kelimesinde geminin konturu Teal ile çizilmeye başlar (8–10 kare) → kontur pruvadan sol alta doğru uzayarak label'ın dikey accent çizgisine dönüşür → `THE INDUSTRIAL CASEBOOK` / `CASE 001` / **NS SAVANNAH** / ölçek çizgisi + `1962 · NUCLEAR MERCHANT SHIP` açılır → arka plan katmanları kararır, gemi izole kalır → label söner, konturlu gemi küçülüp haritaya iner (Object Carry). Siyah ekran yok, VO hiç durmaz, müzik altı (stinger yok).
**Neden bu davranış:** P3'ün hero object'i güçlü siluetli tek gerçek fotoğraf; ident ile Object Carry aynı çizgiyi kullanıyor → marka anı hikâyenin ilk geçişiyle tek hareket.
**Sonraki case için not:** CASE 002 (J40) için ident kendi materyalinden seçilir; doğal adaylar Cutaway → Section Label veya Data Trace → Number. Object Outline en güçlü çözümse gerekçeyle kullanılabilir, ama P3'ün timing/kompozisyon/sekansı kopyalanmaz.

