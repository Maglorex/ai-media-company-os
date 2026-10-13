# Thumbnail Production Spec v1 (tool-agnostic)

> Karar: D-036. Kaynak: P-05, P-19; Brand System v1 §J, Founder-approved visual direction (D-033). Render PC'de yalnız **araç** seçilecek; strateji bu dosyadadır.

## 1. Tuval
- 16:9; master **3840×2160** (P-19 önerisi); teslim **JPG veya PNG**, ≤50 MB (masaüstü yükleme); 1280×720 yedek export.
- Renk: sRGB. Master katmanlı kaynak dosya repo dışında (render PC).

## 2. Güvenli alan
- Sağ alt ~%18×%14 bölge: süre etiketi örter → kritik öğe/metin yok.
- Kenarlardan %5 iç boşluk; ana odak merkezde veya sol-üçte birde.
- Ana sayfa/arama/önerilen boyutlarında kırpılma olmaz (16:9 korunur).

## 3. Mobil okunurluk
- Test boyutları: **168×94** ve **320×180** (arama/önerilen ölçeği) + koyu ve açık YouTube arayüz zeminleri.
- 168×94'te ana nesne ve (varsa) metin tanınmalı; değilse FAIL.

## 4. Metin yoğunluğu
- Varsayılan: **metinsiz** (D-012 P3 kapak yönü gibi) veya **≤3 kelime**.
- Metin title'ı tekrar etmez; title ile birlikte tek vaat.
- Tipografi: brand display (ağır, dar); metin yüksekliği ≥ tuval yüksekliğinin %12'si.

## 5. Ölçek (nesne/yüz)
- Faceless kanal: hero object kadrajın **≥%40**'ı; tek baskın nesne + en fazla 1 yardımcı öğe (kanıt/sonuç).
- İnsan yüzü kullanılacaksa yalnız hakkı temiz arşiv + kişilik hakkı kontrolü.

## 6. Kontrast / okunabilirlik QC
- Gri ton testi: ana nesne ile zemin ayrışıyor mu?
- Odak noktası 1 sn'de bulunuyor mu (bulanıklaştırma testi)?
- Kalabalık: ≤3 görsel öğe.

## 7. Marka tutarlılığı
- Founder-approved yön: ağır endüstriyel karakter, mühendislik çizgisi, malzeme hissi — ama **thumbnail şablonu yok**; her video farklı kompozisyon.
- Case accent tek vurgu; Case Layer etiketleri (CASE 001) thumbnail'da **kullanılmaz** (alan kaybı) — istisna gerekçeli.
- Yasak: true-crime damga, kırmızı ok/daire klişesi, sahte belge metni, koyu-mavi şablon.

## 8. Üç test konsepti
Packaging v2'nin birincil + 2 A/B varyantı **gerçekten farklı** olmalı: farklı ana öğe (nesne vs kanıt vs sonuç) veya farklı açı (paradoks vs maliyet vs gizem). Yalnız renk/kırpma farkı = aynı konsept sayılır (FAIL).

## 9. İsimlendirme / versiyon
`<VID>-thumb-<A|B|C>-v<N>.<jpg|png>` (A = birincil). Master: `<VID>-thumb-<A|B|C>-v<N>-master.<ext>` (repo dışı). Paketteki dosya adı = yüklenen dosya.

## 10. Haklar
Thumbnail'daki her harici asset rights ledger'da `usage_locations: thumbnail`; AI hero asset `ai-image` satırı + asset ledger. Thumbnail'daki her iddia/sayı evidence ledger'da. `UNKNOWN/UNRESOLVED` → kullanılmaz.

## 11. Final QC (Release Gate G-04, G-14)
□ 3840×2160 master + JPG/PNG export, ≤50 MB · □ güvenli alan · □ 168×94 ve 320×180 testi · □ metin ≤3 kelime / title tekrarı yok · □ gri ton + odak · □ kanıt doğruluğu · □ rights ledger · □ 3 konsept gerçekten farklı · □ rakip benzerliği (outlier/rakip thumbnail'larıyla yan yana) · □ dosya adı = paket.
