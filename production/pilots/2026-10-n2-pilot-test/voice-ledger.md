# P3 — Voice Ledger (ElevenLabs gerçek kullanım kaydı)

> Her üretim: tarih · amaç · ses · model · karakter · **ölçülen kredi** (API yanıtındaki `character-cost` başlığı) · request_id · dosya. Plan: Starter (aktif, 2026-10-08). Onay: D-016 testi, tavan 2.600 kredi.
> Ses dosyaları git dışında (`voice-tests/`, .gitignore).

| # | Tarih | Amaç | Ses | Model | Karakter | Ölçülen kredi | request_id | Dosya | Süre (≈, 128 kbps'ten) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 2026-10-08 | Kanal sesi testi (test metni §4) | Bill L. Oxley `iiidtqDt9FBdT1vfBluA` | eleven_multilingual_v2 | 1.169 | **468** | onF93QhrAWBWQBxiq40L | voice-tests/bill-oxley_multilingual-v2_test.mp3 | ~76 sn |
| 2 | 2026-10-08 | Aynı metin, model karşılaştırması | Bill L. Oxley | eleven_v4 | 1.169 | **129** | ZaLJUKZU29VaMzTvvN5v | voice-tests/bill-oxley_v4_test.mp3 | ~78 sn |
| 3 | 2026-10-10 | Telaffuz/kalite QA, güncel script v2.5 metni (render PC, Founder onayı 2026-10-10) — model kararını yeniden açmaz (D-021) | Bill L. Oxley | eleven_v4 | 568 | **62** | GCpDLMZHpf6kmD5poKvE | `D:\CompanyOS-Production\P3-ns-savannah\03_vo\tests\2026-10-10_bill-oxley_eleven_v4.mp3` | ~39 sn |
| 4 | 2026-10-10 | Aynı metin, QA — **birincil model** (D-021) | Bill L. Oxley | eleven_multilingual_v2 | 568 | **227** | nWn2ztTVHIxkgyWD7EPO | `…\03_vo\tests\2026-10-10_bill-oxley_eleven_multilingual_v2.mp3` | ~41 sn |
| 5 | 2026-10-10 | **Final VO S01** (script v2.5; bağlam previous/next_text — seslendirilmez) | Bill L. Oxley | eleven_multilingual_v2 | 858 | **343** | iUoQebgy4wn4p3CwnXhi | `03_vo\final\P3_VO_S01_v1_eleven_multilingual_v2.mp3` (+ .txt, .json, .alignment.json) | 58,4 sn |
| 6 | 2026-10-10 | **Final VO S02** (script v2.5; bağlam previous/next_text — seslendirilmez) | Bill L. Oxley | eleven_multilingual_v2 | 989 | **396** | 5cAcWCFS1wVZu0jldF56 | `03_vo\final\P3_VO_S02_v1_eleven_multilingual_v2.mp3` (+ .txt, .json, .alignment.json) | 65,6 sn |
| 7 | 2026-10-10 | **Final VO S03** (script v2.5; bağlam previous/next_text — seslendirilmez) | Bill L. Oxley | eleven_multilingual_v2 | 452 | **181** | emMXslRaTfB5gmtZNl5q | `03_vo\final\P3_VO_S03_v1_eleven_multilingual_v2.mp3` (+ .txt, .json, .alignment.json) | 30,1 sn |
| 8 | 2026-10-10 | **Final VO S04** (script v2.5; bağlam previous/next_text — seslendirilmez) | Bill L. Oxley | eleven_multilingual_v2 | 1.337 | **535** | jX3UYNmg4NJ4TmTdKYGU | `03_vo\final\P3_VO_S04_v1_eleven_multilingual_v2.mp3` (+ .txt, .json, .alignment.json) | 81,9 sn |
| 9 | 2026-10-10 | **Final VO S05** (script v2.5; bağlam previous/next_text — seslendirilmez) | Bill L. Oxley | eleven_multilingual_v2 | 1.949 | **780** | ygoF2TMnz2omQ4D5jwvr | `03_vo\final\P3_VO_S05_v1_eleven_multilingual_v2.mp3` (+ .txt, .json, .alignment.json) | 129,8 sn |
| 10 | 2026-10-10 | **Final VO S06** (script v2.5; bağlam previous/next_text — seslendirilmez) | Bill L. Oxley | eleven_multilingual_v2 | 817 | **327** | bSACYUk83nOjd0eJmcJo | `03_vo\final\P3_VO_S06_v1_eleven_multilingual_v2.mp3` (+ .txt, .json, .alignment.json) | 50,9 sn |
| 11 | 2026-10-10 | **Final VO S07** (script v2.5; bağlam previous/next_text — seslendirilmez) | Bill L. Oxley | eleven_multilingual_v2 | 698 | **279** | NXOmaAwsSbIy4vy9tsTm | `03_vo\final\P3_VO_S07_v1_eleven_multilingual_v2.mp3` (+ .txt, .json, .alignment.json) | 40,4 sn |
| 12 | 2026-10-10 | **Final VO S08** (script v2.5; bağlam previous/next_text — seslendirilmez) | Bill L. Oxley | eleven_multilingual_v2 | 610 | **244** | eBoPqK6HM7XgzKcHBYHD | `03_vo\final\P3_VO_S08_v1_eleven_multilingual_v2.mp3` (+ .txt, .json, .alignment.json) | 40,0 sn |
| | | **Toplam (tüm kayıtlar)** | | | 11.184 | **3971** | | | |

Notlar:
- Abonelik sayacı (`/v1/user/subscription` → character_count) 1. üretimden sonra 468 gösterdi; 2. üretim sayaca birkaç saniye içinde yansımadı. Kayıt API yanıt başlığına dayanır; sayaç sonraki kontrolde teyit edilecek.
- Gözlenen oranlar: Multilingual v2 ≈ 0,40 kredi/karakter; Eleven v4 ≈ 0,11 kredi/karakter (fiyat sayfasındaki v4 indirimi 12 Ekim'e kadar — kalıcı oran sayılmaz). Sabit video maliyeti tahmini yapılmaz; final üretimde yeniden ölçülür.
- Ses, kütüphaneden hesaba eklenmeden doğrudan voice_id ile kullanılabildi (anahtar yetkisi genişletilmedi).
- COO dosyaları dinleyemez; telaffuz ve doğallık kontrolü Founder kulağıyla yapılır (bkz. voice brief §3 listesi).
- 2026-10-10 (render PC): yeni makineye özel kısıtlı anahtar (`render-pc`: TTS Access, Voices Read, User Read; kredi limiti 10.000; repo dışı DPAPI). Test metni güncel script v2.5'ten birebir (S1, S2, S6 cümleleri; `03_vo\tests\2026-10-10_test-text.txt`); telaffuz odakları: NS Savannah, Isbrandtsen, Galveston, rakamlar, "one ship system". Oranlar tekrar gözlendi: v4 ≈ 0,11; Multilingual v2 ≈ 0,40 kredi/karakter. Abonelik sayacı üretimden hemen sonra değişmedi (597) — kayıt API yanıt başlığına dayanır.
- Finance aktarımı bekliyor: kullanım satırları `finance/ledgers/usage.csv`'ye (ortak dosya) laptop senkronundan sonra işlenecek (`P3-pending-decisions.md`).
- 2026-10-10 QA (#4, Multilingual v2, otomatik ölçüm, bundled ffmpeg): süre 41,4 sn (~138 kelime/dk), kesilme yok; 7 duraklama (>0,35 sn, −45 dB) hepsi cümle sınırlarında (en uzun 1,28 sn: ilk cümle sonrası; 1,25 sn: konu geçişi); true peak −6,4 dBTP (clipping yok); −23,2 LUFS, LRA 3,1. Teknik sorun yok. Kulak kontrolü (telaffuz: NS, Isbrandtsen, Galveston, rakamlar, "one ship system") Founder'da.
- 2026-10-10 Founder kulak kontrolü (#4, Multilingual v2): **telaffuz tamam** (NS Savannah, Isbrandtsen, Galveston, 'one ship system'). D-021 korunur; final VO üretimine engel yok (üretim ayrı Founder onayı).

## Final VO v1 (2026-10-10) — Founder onayı, tavan 4.000 kredi
- Ölçülen toplam: **3085 kredi** (7.710 karakter; ≈ 0,40 kredi/karakter). Yeniden üretim: **yok**.
- Üretim kopyası farkı: S04 "$2 million" → "two million dollars" (voice brief §3). Script dosyası değişmedi. Segment metinleri: `03_vo\final\*.txt`; yapılandırma: `segments.json`.
- QA (otomatik; `vo-segments.ps1`): 8/8 geçti. S01/S03/S05/S07'de ilk kural yanlış alarm verdi (hizalamanın son noktalaması dosya sonuna uzanıyor) → kural düzeltildi, gerçek ses sonu `silencedetect` ile; kesilme yok. S03/S05/S07 sonunda 0,19–0,30 sn düşük seviyeli kısa ses (−28/−35 dB altı; muhtemel nefes, kulakla doğrulanmadı) → birleştirmede kırpıldı. Tempo 150–172 kelime/dk (ort. ≈ 157).
- Birleştirme (`vo-assemble.ps1`): konuşma sonu + 0,30 sn kesim, 30 ms fade, bölüm arası 1,20 sn (son kelime → ilk kelime). Toplam **499,0 sn (8:19)**. Ana kopya `P3_VO_full_v1.wav` (−23,6 LUFS, TP −4,9 dBTP); Founder dinleme kopyası `P3_VO_full_v1_LISTEN.mp3` (−16,3 LUFS, TP −1,7 dBTP). Zamanlama haritası (bölüm ofsetleri + cümle zamanları): `P3_VO_full_v1.timing.json`.
- Kulak kontrolüne bırakılan tek ölçüm bulgusu: 4:19 civarı (S05, "…nuclear training." → "Reactor operators…") cümle arası 1,42 sn duraklama — teknik hata değil, uzunluğu Founder kulağına.
- Not: Senaryo tahmini ~10 dk idi; gerçek anlatım 8:19 (tempo tahminden hızlı). Edit plan zaman kodları timing.json'a göre yeniden ölçeklenecek.
## Opening prototype v2 (2026-10-13) — D-030, tavan 700 kredi — TARİHSEL KAYIT
> Gerçek kullanım kaydıdır; aktif üretim durumu değildir. Üretim D-030 yürürlükteyken render PC'de yapıldı; P3 sonra D-031 ile yeniden donduruldu. Prototype kodu ve raporu canonical main'de yok — `archive/render-pc-p3-2026-10-13` branch'inde (D-039).
- Metin: `P3-production-handoff-prototype-v2.md` §2, birebir (1.167 karakter / 195 kelime). Tek segment `OPEN`; dosyalar repo dışında `03_vo\prototype-v2\P3_VO_OPEN_v2_eleven_multilingual_v2.{mp3,txt,json,alignment.json}` + `segments.json`.
- Üretim öncesi yazdırılan: 1.167 karakter · tahmini ≈467 kredi (0,40/karakter). **Ölçülen: 467 kredi** (`character-cost` başlığı; request_id `XLvAO2MveSctEmpQdBvu`). Yeniden üretim: **yok**. Finance: `finance/ledgers/usage.csv` U-006.
- QA (`vo-segments.ps1`): 77,0 sn · 152 kelime/dk · −23,9 LUFS · TP −6,6 dBTP · uzun iç sessizlik yok. "Son kelimeden sonra sessizlik yok" bayrağı yanlış alarmdı (dosya sonu sessizliği `silencedetect`'te kapanmıyor; RMS ölçümü: konuşma 76,55 sn'de bitip −74 dBFS'e sönüyor). Kesilme yok.
- Founder kulak kontrolü **yapılmadı**; P3 donuk olduğu için beklemede değil. P3 yeniden açılırsa bu VO'nun kullanılıp kullanılmayacağı v3 handoff'unda ayrıca karara bağlanır.
