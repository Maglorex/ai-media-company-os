# CAL-S5 — Strong PC measurement round v1 (salt-okunur ölçüm talebi)

> date: 2026-10-15 · author: COO main session · decision: D-048 · status: DRAFT (Strong PC'de yürütülecek)
> Amaç: Main PC'nin ölçemediği teknik metadata'yı ve müzik haklarını **ölçmek / doğrulamak**. Bu tur production değildir: render yok, VO üretimi yok, dosya düzenleme/yeniden adlandırma yok, P3 dosyalarına dokunma yok. Tek yazma işlemleri: (a) V-90'ın manifest'teki URL'den indirilmesi, (b) ölçüm raporu dosyası.
> `handoff/07-production-handoff-v1.md` BLOCKED kalır (manifest bu commit'te değiştiği için v1'in manifest sabitlemesi de artık eskidir; bu beklenen durumdur). Ölçüm sonucu Main PC'de işlenir → scene plan v3 (müzik hazırlığı + yatak ataması) → bağımsız QA → handoff v2. **Ölçüm bitmeden ISSUED yok.**
> Kural: değer uydurulmaz. Ölçülemeyen değer rapora `NOT MEASURED — <neden>` olarak yazılır.

## Ölçülecek dosyalar (production_root = `D:/CompanyOS-Production`)
| # | Asset | Yol | Ölç / doğrula | Main PC'deki referans (yalnız karşılaştırma) |
|---|---|---|---|---|
| 1 | V-05 | `P3-ns-savannah/01_archive/photos/V-05_nara-542141_golden-gate_1962.jpg` | tam SHA-256 · boyut | önek `a66ce07bb9a1a3fe` · 1920×1588 |
| 2 | V-19 | `P3-ns-savannah/01_archive/photos/V-19_rotterdam_1964-09-30_cc0.jpg` | tam SHA-256 · boyut | önek `7bc038e74d1432ed` · 1920×1907 |
| 3 | V-07 | `P3-ns-savannah/01_archive/photos/V-07_launch_marad.jpg` | tam SHA-256 · boyut | önek `a54effc4b6276052` · 330×428 |
| 4 | V-24 | `P3-ns-savannah/01_archive/photos/V-24_fuel-element_marad-1961.jpg` | tam SHA-256 · boyut | önek `14dc8d1f72168d2b` · 960×309 |
| 5 | V-28 | `P3-ns-savannah/01_archive/maps/ne_50m_admin_1_states_provinces.geojson` | tam SHA-256 | önek `69a0e06e…c426b9` |
| 6 | V-29 | `P3-ns-savannah/01_archive/maps/ne_50m_land.geojson` | tam SHA-256 | önek `e874b27a…f9826b` |
| 7 | V-01/V-02/V-03/V-13 | `P3-ns-savannah/01_archive/b-136209.pdf` | tam SHA-256 · sayfa sayısı (≥ 19) | önek `1070eb40…936b0` |
| 8 | AI-01 | `P3-ns-savannah/03_vo/prototype-v2/P3_VO_OPEN_v2_eleven_multilingual_v2.mp3` | tam SHA-256 · süre (sn) | — |
| 9 | AI-02 | `P3-ns-savannah/03_vo/prototype-v2/P3_VO_OPEN_v2_eleven_multilingual_v2.json` | tam SHA-256 | — |
| 10 | AI-01 yedek | `C:/CompanyOS-Backup/` altındaki aynı adlı kopya (varsa) | SHA-256 eşitliği (manifest "BACKED_UP" iddiası) | — |
| 11 | V-90 | `CAL-S5/01_archive/grc-1951-c-28738.jpg` — önce `https://www.nasa.gov/wp-content/uploads/2025/05/grc-1951-c-28738.jpg` adresinden indir | tam SHA-256 **eşit olmalı** · boyut | `90122879a66e71af94266ffcec191bb79b45c5b3c455bfcf7978af3ac9f5e0ff` · 2009×2539 |
| 12 | M-01 | `CAL-S5/04_music/Ether Oar - The Whole Other.mp3` | tam SHA-256 · süre | — |
| 13 | M-02 | `CAL-S5/04_music/The Stalker - Hainbach.mp3` | tam SHA-256 · süre | — |
| 14 | M-03 | `CAL-S5/04_music/The Empty Moons of Jupiter - DivKid.mp3` | tam SHA-256 · süre | — |
| 15 | M-04 | `CAL-S5/04_music/Contact - The Tower of Light.mp3` | tam SHA-256 · süre | — |
| 16 | M-01…M-04 master | `_audio-library/` altındaki aynı adlı dört dosya | SHA-256 eşitliği (04_music ile) | — |

## Hak / atıf doğrulaması (müzik)
| # | Asset | Doğrulanacak | Nasıl |
|---|---|---|---|
| R1–R4 | M-01…M-04 | YouTube Studio → Audio Library'de parçanın **başlık / sanatçı** eşleşmesi · lisans türü (**Attribution not required** veya Creative Commons) · CC ise Studio'nun verdiği **birebir attribution metni** | Studio Audio Library listesinde parçayı ara; lisans sütununu/ikonunu oku; ekran görüntüsünü `D:/CompanyOS-Production/CAL-S5/00_rights-proof/` altına kaydet. Studio'ya giriş gerekir — Claude giriş yapmaz; oturum açık değilse bu satırlar Founder'a tek GUIDED ACTION olarak raporlanır |
Doğrulanmadan hiçbir müzik satırı `CLEAR` olmaz; kullanılamaz. Hiçbir parça bu turda GOLDEN veya "seçilen" değildir.

## Ölçüm yöntemi (paketsiz; mevcut araçlar)
- SHA-256 + resim boyutu (JPEG/PNG) + WAV/MP4 süresi: repo kökünde
  `node --input-type=module -e "import {fileInfo} from './os/lib/factory.mjs'; console.log(JSON.stringify(fileInfo(process.argv[1])))" "<tam yol>"`
- MP3 süresi: Remotion'un getirdiği FFprobe — `production/remotion` klasöründe `npx remotion ffprobe -v error -show_entries format=duration -of csv=p=0 "<tam yol>"` (yeni paket kurulmaz; çalışmazsa `NOT MEASURED`).
- PDF sayfa sayısı: `production/tools/pdf/pdf-to-png.ps1`'in kullandığı araçla salt-okunur sorgu veya `NOT MEASURED`.

## Rapor
Strong PC Claude sonucu `channels/the-industrial-casebook/cases/CAL-S5/handoff/measurement-report-v1.md` olarak yazar: her satır için yol · tam SHA-256 · boyut/süre · referansla eşleşme (EVET/HAYIR) · not; hak tablosu R1–R4. Yalnız bu dosya commit'lenir; push Founder'ın GUIDED ACTION'ıdır.
