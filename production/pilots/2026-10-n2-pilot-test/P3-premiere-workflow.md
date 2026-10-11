# P3 — Premiere aktarımı (XML) ve iş akışı

> 2026-10-10 · D-017 (Premiere son montaj) · Araç: `production/tools/premiere/build-xml.ps1` (FCP 7 XML / xmeml v4 — Premiere'in "Import" ile açtığı biçim; ek paket yok) · Tanım: `P3-premiere.json` · Zamanlar: `voCues.ts` (VO v2) + 2,5 sn açılış teaser'ı.

## Dosyalar (repo dışı)
| Ne | Yer |
|---|---|
| Test XML (4 klip, ilk 38 sn) | `05_premiere\P3_XML_TEST.xml` |
| Başlangıç timeline XML (tam) | `05_premiere\P3_NS_Savannah_START_v1.xml` |
| Grafik klipleri (Remotion SYNC, ProRes 422, 1080p30) | `02_graphics\sync\SYNC-*.mov` (34 dosya) |
| VO | `03_vo\final\P3_VO_full_v2.wav` |
| Fotoğraflar | `01_archive\photos\` |

## Track düzeni
- **V1:** grafik klipleri + ana fotoğraflar (beat sırasıyla, boşluksuz).
- **V2:** üst iz — b23 Q-02 belgesi, tek gemi klibinin üstünde.
- **V3:** opsiyonel fotoğraf eklemeleri (V-24, V-08, V-26) — **devre dışı** gelir; editör karar verir.
- **A1:** VO v2 (0:02,5'ten başlar). **A2/A3:** boş — müzik ve SFX için ayrıldı.
- **Sequence marker'ları:** `[MUSIC]`, `[SFX]`, `[SILENCE]` (müzik/SFX planı §2 zamanlarında). **Klip marker'ları:** fotoğraflarda `PREMIERE MOTION` notu (pan / detay kesmesi; tek sürekli zoom değil), opsiyonel eklemelerde `OPTIONAL INSERT`.
- Debug zaman/sahne damgası yok (yalnız `P3-ANIMATIC`'te). Branding, logo, intro/outro yok.

## Doğrulananlar (Claude, otomatik)
- XML ayrıştırma, V1'de boşluk/çakışma kontrolü, tüm dosya yollarının varlığı.
- Grafik dosyalarının kare sayısı = XML süresi (ProRes 422, 1920×1080, 30 fps).
- Doğrulanamayan: Premiere'in dosyayı açması → Founder testi (aşağıda).

## Founder testi (tek işlem)
Premiere Pro → **File → Import…** → `P3_XML_TEST.xml` → açılan `P3_XML_TEST` sekansına çift tıkla. Kontrol: (1) "media offline" kırmızı kare yok, (2) ses 0:02,5'te başlıyor, (3) harita 0:10 civarında, rapor kapağı 0:32 civarında.

## XML güvenilir çalışmazsa (yedek yol)
1. Remotion'da tüm kurguyu **tek bir referans video** olarak render et (grafik + fotoğraf yerleşimi + VO; animatic'in damgasız, tam çözünürlük sürümü).
2. Premiere'de bu dosyayı V1'e, VO WAV'ı A1'e koy; fotoğraf beat'lerinde fotoğrafı V2'ye yerleştir (zamanlar `P3-edit-timeline.md`), hareketleri orada ver.
3. Müzik/SFX A2/A3'e. Bu yol daha az esnek ama her durumda açılır.

## Test sonucu (2026-10-10, Founder)
- Premiere Pro 2026: yeni proje `05_premiere\P3_NS_Savannah.prproj` → `P3_XML_TEST.xml` içe aktarıldı (menü kilitliyken dosyayı Project paneline sürükleyerek). **Media Offline yok**, VO 0:02,5'te başlıyor, harita ve rapor kapağı beklenen zamanlarda. Siyah aralar beklenen (test yalnız 4 klip). Süreler Premiere'de birebir: teaser 2:15, harita 14:29, kapak 5:25, sekans 8:21:01. → **XML yolu güvenilir; tam timeline XML ile üretilir.**
- Not: Premiere açılışta "Import" menüsü proje açılmadan kapalıdır; açık bir proje varken menü kilitliyse arkada kalmış diyalog olabilir — sürükle-bırak her durumda çalışır.
- Render notu: Remotion render'ı yarıda kesilirse ProRes dosyası bozuk kalır (2 dosya: invalid frame header). Toplu render artık geçici dosyaya yazıp başarıda yeniden adlandırıyor; kare sayısı ffprobe ile doğrulanır.

## Tam başlangıç timeline'ı (2026-10-10)
- `05_premiere\P3_NS_Savannah_START_v1.xml`: V1 37 klip (34 Remotion SYNC klibi — biri V2'de — + 4 ana fotoğraf), boşluk/çakışma yok; V2 1 (b23 Q-02); V3 3 opsiyonel fotoğraf (devre dışı); A1 VO v2 498,5 sn; 12 marker; sekans 8:21. 42 benzersiz dosya, kayıp yol 0. Tüm ProRes kliplerin kare sayısı doğrulandı (34/34, 2,33 GB).
- Düzeltme: yuvarlamadan doğan 1 karelik klip çakışmaları (15 yer) — her V1 klibi bir sonrakinin başlangıcına kırpılır.
- Premiere'de doğrulama: Founder (aynı projeye ikinci import).

## v2 (2026-10-11) — Founder: "tüm yapacaklarını yap, sonra karar veririm"
- Fotoğraf hareketleri Premiere yerine Remotion'da: `PhotoShots` şablonu (çekim içi yavaş pan/yaklaşma + çekimler arası detay kesmesi). b01 V-19 (pruva → rıhtım kalabalığı), b06 V-07 çerçeve + iki kurum adı ("run jointly by…"), b08 **V-20** (ziyaretçi kuyruğu → "U.S. ATOMIC ENERGY COMMISSION" yazısı), b28 V-05 koyulaştırılmış geri çekilme. Premiere'de değiştirilebilir ama zorunlu değil.
- V-21 lisans belirsizliği nedeniyle kullanım dışı (ledger E-15).
- `05_premiere\P3_NS_Savannah_START_v2.xml`: V1 37 klip (hepsi render edilmiş klip), kayıp yol 0. v1 korunur.
- Founder inceleme kopyası: `06_renders\P3_REVIEW_v1.mp4` (1080p, damgasız, müzik/SFX yok — final export değil).
