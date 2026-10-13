# The Industrial Casebook — Video UI Spec v1 (logo gerektirmeyen marka parçaları)

> Tarih: 2026-10-13 · COO · Bağlı: Brand Direction v1 (D-032), Founder-approved visual direction (D-033), `brand-system-v1.md`, `reference/founder-approved-visual-direction.md`.
> **Logo kullanılmaz, geçici logo/monogram üretilmez.** Bu parçalar logodan bağımsız çalışacak şekilde tasarlandı.
> Ölçüler 1920×1080 kare için; 4K'da ×2. Font ve renk **token** adıyla verilir; PROVISIONAL değerler (Barlow Condensed, #C7542B) onaylanırsa yalnız token değişir, spec değişmez.

## 0. Token'lar (bu spec'in kullandığı)
| Token | Şu anki değer | PROVISIONAL aday (D-033) |
|---|---|---|
| `font.display` (ağır, dar) | IBM Plex Sans Condensed Bold | Barlow Condensed ExtraBold |
| `font.meta` | IBM Plex Mono Medium | — |
| `font.editorial` | Source Serif 4 | — |
| `ink` | #14181C | #0B0F12 |
| `steel` | #334854 | #3E4954 |
| `iron` (ikincil çizgi/metin) | — (yeni; geçici #7A8288) | #7A8288 |
| `paper` | #E7DFCF | #E6DCC6 |
| `accent.brand` (oksitlenme vurgusu) | #C58B3B | #C7542B |
| `accent.case` | video başına (P3 Atomic Teal #4E8A88) | — |
Kural: bir karede tek vurgu odağı (`accent.brand` **veya** `accent.case`, ikisi aynı nesnede değil).

## 1. CASE label — `CASE 001 · NS SAVANNAH`
**Rol:** Case Layer; videonun içinde bir kez (cold open'da hero object görünürken), isteğe bağlı bölüm geçişlerinde küçük tekrar yok.
**Yerleşim:** sol alt; sol kenardan 96 px, alttan 120 px (YouTube oynatıcı kontrollerinin üstünde, altyazı alanının solunda).
**Yapı (iki seviye — referansın ağır başlık + aralıklı ikinci satır mantığı):**
```
┌─ 2 px accent.brand dikey çizgi (yükseklik = iki satır)
│  CASE 001                      ← font.meta, 22 px, harf aralığı +0.18 em, iron
│  NS SAVANNAH                   ← font.display, 64 px, büyük harf, harf aralığı +0.04 em, paper
│  ─────────────── 1 px iron çizgi, sonunda küçük ölçek çentikleri (3 tick, 8 px aralık)
│  1962 · NUCLEAR MERCHANT SHIP  ← font.meta, 18 px, +0.18 em, iron (kanıtla desteklenen tek satır, C-30/C-39)
```
- Arka plan kutusu **yok**. Okunabilirlik için yalnız metnin arkasında yumuşak koyu gradient (ink %0 → %55, sol-alt köşeden, ≤ 640×260 px). Tam ekran şerit/bant yok.
- **Hareket (≈2,2 sn görünür):** accent çizgisi alttan yukarı çizilir (8 kare) → `CASE 001` soldan 12 px kayarak gelir (6 kare) → `NS SAVANNAH` maskeyle soldan açılır (10 kare) → ölçek çizgisi soldan uzar (8 kare) → bekle → tümü 8 karede söner (çizgi en son). Bounce/elastic yok.
- **Malzeme hissi:** yalnız çok hafif — `NS SAVANNAH` harflerinde %4–6 opaklıkta ince metal/oksit dokusu (büyük boyutta görünür, küçükte kaybolur; okunabilirliği bozmaz). Grunge/yırtık yok.
- **Yasak:** damga kutusu, kırmızı çerçeve, "CASE NO.", "ICB-001", kâğıt etiket, tam ekran case kartı, logo.

## 2. Evidence / source label — `EVIDENCE 02 · GAO · 1970`
**Rol:** Evidence World'deki belgenin kimliği; numara = ledger satırı (handoff'ta eşleme tablosu zorunlu).
**Yerleşim:** belge sayfasının sol üst köşesine **bağlı** (ekrana değil); sayfa hareket ederse etiket sayfayla gider. Sayfa kenarından 24 px dışarıda, üst kenarla hizalı.
**Yapı (tek satır, numaralı modül):**
```
[ 02 ]  EVIDENCE  ·  GAO · 1970  ·  p.1
```
- `[ 02 ]`: 1 px iron çerçeveli kare modül (34×34 px), içinde font.meta 18 px, paper. Referansın numaralı panel (01, 02…) mantığı.
- `EVIDENCE`: font.meta 18 px, +0.2 em, iron. `GAO · 1970 · p.1`: font.meta 18 px, paper.
- Altında 1 px iron çizgi, sayfanın üst kenarına paralel, sayfa genişliğinin %40'ı.
- **Source Mark varyantı** (numarasız kaynak, ör. NPS alıntısı, grafik köşesi): yalnız `NPS` / `GAO · 1970 · pp.15–16`, font.meta 16 px, iron, çerçevesiz.
- **Vurgu davranışı:** belgede o an vurgulanan satır `accent.brand` ile 2 px alt çizgi veya ince köşeli parantez (bracket) alır; etiket rengi değişmez. Fosforlu kalem dolgusu yalnız tek kelime/rakam için ve %35 opaklıkta.
- **Hareket:** belge kadraja girdikten sonra 6 karede modül çizilir, metin 8 karede yazılmadan (typewriter yok) belirir. Belge çıkınca birlikte gider.
- **Yasak:** "VERIFIED", "CONFIDENTIAL", damga, ipli/bagaj etiketi, yırtık kâğıt, uydurma belge metni, ledger'da karşılığı olmayan numara.

## 3. Üç dünyanın frame treatment'ı
| | ARCHIVE | EVIDENCE | ENGINEERING |
|---|---|---|---|
| **Zemin** | Kaynağın kendisi (tam kadraj veya 2.5D katman); kenarlarda gerekirse ink'e çok yumuşak vignette | Belge sayfası `paper` gerçek taramasıyla; sayfa dışı alan koyu ink ama **düz değil**: çok hafif endüstriyel yüzey (fırçalanmış metal / beton dokusu %3–5) | `ink` → `steel` hafif gradient; üstünde ince teknik grid (iron %8, 80 px aralık) |
| **Renk** | Kaynağın doğal rengi / gerçek s-b. Ortak grade yalnız kontrast ve siyah seviyesi. **Marka tinti yok** | Belgenin gerçek mürekkebi; renk değiştirilmez | Token paleti; `accent.case` hero object'te, `accent.brand` anahtar sayıda |
| **Çizgi** | Yok (yalnız Object Carry anında hero object'in konturu `accent.case` ile 2 px çizilir) | Annotation: 2 px alt çizgi / bracket; kâğıt üstünde | Blueprint dili: 1 px iron çizgiler, kesit işaretleri (`A–A`), ölçek cetveli, koordinat tikleri — **yalnız gerçek ölçü/konum varsa** (ör. harita ölçeği, C-42 mavna oranı) |
| **Tipografi** | Neredeyse yok; yalnız Source Mark (font.meta) ve gerekirse CASE label | EVIDENCE modülü; alıntı yeniden dizilirse font.editorial | Etiketler font.meta; tek büyük sayı veya tez kelimesi font.display |
| **Malzeme hissi** | Kaynağın kendi dokusu (eklenmez) | Kâğıdın gerçek dokusu + sayfanın fiziksel derinliği (gölge, hafif eğim) | Çizgi + çok hafif metal/oksit yüzeyi zemin dokusunda (%3–5); grafiklerin kendisi temiz |
| **Kamera** | 2.5D parallax, subject isolation, detail reveal — anlam taşıyorsa | Sayfaya iniş, satıra gitme, Evidence Pull | Harita/diyagram state değişimi, zoom-through, Object Carry |
| **Ayırt edici test** | "Bu gerçek bir görüntü" | "Bu gerçek bir belge" | "Bu bir açıklama çizimi" |
**Ortak bağ (Case Layer):** aynı font.meta etiket dili, aynı 1 px iron çizgi ağırlığı, aynı numaralı modül, aynı 2 px accent çizgi davranışı — üç dünyada da.
**Tam ekran düz lacivert/koyu kart: yok.** Tek büyük sayı gerekirse Engineering World içinde, hero object veya grafikle aynı karede.

## 4. Case Tab
`03 · GALVESTON FACILITY` — üst solda, numaralı modül + font.display 40 px; ≤2 sn; hikâye durmaz; videoda seyrek (bölüm başına en fazla 1).
