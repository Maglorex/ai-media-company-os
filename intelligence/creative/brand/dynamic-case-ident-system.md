> **SUPERSEDED — 2026-10-14 (D-044, D-045).** Talimat olarak kullanılmaz. CASE INTRO = tekrar eden skeleton + değişken payload: canon `channels/the-industrial-casebook/canon/03-opening-and-case-intro.md` §3. Aşağıdaki davranış kütüphanesi yalnız payload fikirleri için HEURISTIC kaynak olarak okunabilir.

# Dynamic Case Ident System v1

> Karar: D-034 (Founder 2026-10-13). Bağlı: `brand-system-v1.md` §C, `video-ui-spec-v1.md` §1 (CASE label), Founder-approved visual direction (D-033). Uygulayıcı: `documentary-creative-director` (concept) → `documentary-production-handoff` (alanlar) → render PC (`production-engineer`).
> Founder "intro nasıl olsun?" diye düşünmez; ident her videoda creative treatment'ta otomatik belirlenir.

## 1. Tanım
Her videonun açılışında **~1,5–3 sn**, hikâyeyi kesmeyen, **videoya özel** Industrial Casebook kimliği. Bağımsız logo intro'su değildir; **story önce başlar veya ident story'nin içinden doğar.** Her video için yeniden tasarlanır ve render edilir; ident video dosyası videolar arasında tekrar kullanılmaz.

## 2. Sabit (marka) ↔ değişken (case)
| Sabit — her identte, yalnız gerektiği kadar | Değişken — her video için creative director seçer |
|---|---|
| CASE numarası formatı (`CASE 001`) | CASE numarası (`case-register.md`) |
| Video/case başlığı yerleşimi | Case başlığı (`NS SAVANNAH`) |
| Wordmark: `THE INDUSTRIAL CASEBOOK` — **final logo kilitlenene kadar yalnız font.meta ile dizilmiş küçük yazı; logo/monogram/geçici işaret yok** | Case accent (P3 Atomic Teal) |
| Canonical tipografi hiyerarşisi (font.meta küçük üst satır + font.display ağır dar başlık) | Hero object (gemi, motor, fabrika…) |
| Teknik çizgi dili (1 px iron çizgi, ölçek tikleri, kesit işareti) | Teknik motif (rota çizgisi, kesit, basınç çizgisi, denetim satırı…) |
| Kaynak/kanıt hareket grameri (Object Carry, Evidence Pull, çizginin çizilmesi) | Açılış görseline bağlantı (ident hangi görselden doğuyor) |
| Süre aralığı, yerleşim güvenli alanı, yasaklar (§5) | Gerekirse kısa kaynak/yıl etiketi (`1962`, `GAO · 1970`) |

## 3. Hareket kuralı
Ident'in hareketi **case'in kendi görselinden çıkar.** Davranış kütüphanesi (creative director case'e en güçlü olanı veya bir kombinasyonu seçer):
**Tekrar prensibi (Founder düzeltmesi 2026-10-13):** aynı ident davranışını art arda mekanik olarak tekrar etmekten kaçın; ama story, hero object veya kanıt yapısı için aynı motion grammar gerçekten en güçlü çözümse tekrar kullanılabilir. Çeşitlilik uğruna daha zayıf yaratıcı çözüm seçilmez. Birebir aynı timing, kompozisyon ve animasyon sekansı tekrar edilmez; her ident kendi case materyalinden doğar.

| Davranış | Ne olur | Uygun case türü |
|---|---|---|
| Object Outline → Label | Hero object'in konturu çizilir, çizgi CASE label'ın accent çizgisine dönüşür | Belirgin silueti olan nesne (gemi, uçak, araç) |
| Archive Edge → Line → Number | Arşiv fotoğrafının bir kenarı/çizgisi teknik çizgiye dönüşür, çizginin ucunda case numarası | Güçlü arşiv fotoğrafıyla açılan case |
| Document Line → Title | Belgedeki gerçek bir satır vurgulanır, satırın çizgisi case başlığına uzar | Belgeyle açılan case |
| Route → Mark | Harita rotası/akış çizgisi ilerler, ucunda wordmark + case | Mekânsal/rota hikâyesi |
| Cutaway → Section Label | Kesit/teknik çizim katman açar, kesit etiketi (`A–A`) case label'a döner | Motor, makine, mekanizma case'i |
| Data Trace → Number | Gerçek bir veri çizgisi (test verisi, maliyet satırı) çizilir, son değerin yanında case numarası | Veri/denetim odaklı case |
Kural: hareketteki her öğe gerçek bir case öğesinden (kaynak, nesne, motif) gelir; jenerik parçacık, ışık patlaması, glitch, logo dönmesi yok.

## 4. Süre ve yerleşim
- Varsayılan **1,5–3 sn**; daha uzunu yalnız güçlü anlatı gerekçesiyle (treatment'ta yazılır).
- Zamanlama: genelde ilk 3–12 sn içinde, anlatıcı nesneyi tanıttığı anda. 0:00'da başlamaz (önce story).
- Anlatı ve görüntü **durmaz**: VO ident boyunca devam eder; arka plandaki sahne akmaya devam eder.
- Yerleşim: CASE label güvenli alanı (`video-ui-spec-v1.md` §1); wordmark kullanılıyorsa label'ın üst satırında, font.meta 16–18 px, iron. Tam ekran yok.

## 5. Yasaklar
Siyah ekran + logo · bağımsız intro bloğu · her videoda aynı ident render'ı · story'yi durduran bekleme · jenerik template intro hissi (aynı animasyonun aynı yerde tekrarı) · sesli stinger/jingle (müzik altı veya sessiz; `documentary-music-sfx`) · geçici logo/monogram · damga/true-crime/steampunk öğeleri.

## 6. Handoff alanları (zorunlu — `documentary-production-handoff` TEMPLATE §7c)
| Alan | Örnek (P3) |
|---|---|
| Case number | CASE 001 |
| Case title | NS SAVANNAH |
| Ident concept (davranış) | Object Outline → Label (+ Object Carry'ye bağlanır) |
| Hero object | NS Savannah (V-05 izole siluet) |
| Case accent | Atomic Teal #4E8A88 |
| Visual motif | gemi silueti · rota çizgisi · denetim satırı |
| Start / end timestamp | VO kelime zaman damgasına bağlı (ör. "…merchant ship" sonu → +2,2 sn) |
| Transition into story | Label söner, kontur token'a dönüşüp haritaya iner |
| Asset source / right status | V-05 NARA 542141 "Use: Unrestricted", atıf; diğer her şey bizim grafik |

## 7. Template hissini önleyen kontroller
- **Mekanik tekrar kontrolü:** davranış, accent, motif, timing ve kompozisyon `case-register.md`'ye yazılır. Önceki case ile aynı davranış seçilirse treatment'ta neden en güçlü çözüm olduğu tek cümleyle yazılır ve timing/kompozisyon/sekansın farklı olduğu, case materyalinden doğduğu kontrol edilir.
- **Bağ testi:** ident'teki her öğe o videonun hero object/kanıt/motifinden mi? Değilse REVISE.
- **Muted preview gate:** ident karesi sessiz örneklerden birine düşerse "jenerik intro mu, case'e özel mi?" sorusu.
- **Süre testi:** >3 sn ise gerekçe yoksa kısaltılır.
- **Kanal verisi:** ilk 30 sn retention'da ident anında düşüş görülürse (`growth-performance-review`) ident davranışı EXP olarak değiştirilir.
