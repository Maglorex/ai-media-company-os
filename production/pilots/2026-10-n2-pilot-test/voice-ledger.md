# P3 — Voice Ledger (ElevenLabs gerçek kullanım kaydı)

> Her üretim: tarih · amaç · ses · model · karakter · **ölçülen kredi** (API yanıtındaki `character-cost` başlığı) · request_id · dosya. Plan: Starter (aktif, 2026-10-08). Onay: D-016 testi, tavan 2.600 kredi.
> Ses dosyaları git dışında (`voice-tests/`, .gitignore).

| # | Tarih | Amaç | Ses | Model | Karakter | Ölçülen kredi | request_id | Dosya | Süre (≈, 128 kbps'ten) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 2026-10-08 | Kanal sesi testi (test metni §4) | Bill L. Oxley `iiidtqDt9FBdT1vfBluA` | eleven_multilingual_v2 | 1.169 | **468** | onF93QhrAWBWQBxiq40L | voice-tests/bill-oxley_multilingual-v2_test.mp3 | ~76 sn |
| 2 | 2026-10-08 | Aynı metin, model karşılaştırması | Bill L. Oxley | eleven_v4 | 1.169 | **129** | ZaLJUKZU29VaMzTvvN5v | voice-tests/bill-oxley_v4_test.mp3 | ~78 sn |
| 3 | 2026-10-10 | D-016 testi, güncel script v2.5 metni (render PC, Founder onayı 2026-10-10) | Bill L. Oxley | eleven_v4 | 568 | **62** | GCpDLMZHpf6kmD5poKvE | `D:\CompanyOS-Production\P3-ns-savannah\03_vo\tests\2026-10-10_bill-oxley_eleven_v4.mp3` | ~39 sn |
| 4 | 2026-10-10 | Aynı metin, model karşılaştırması | Bill L. Oxley | eleven_multilingual_v2 | 568 | **227** | nWn2ztTVHIxkgyWD7EPO | `…\03_vo\tests\2026-10-10_bill-oxley_eleven_multilingual_v2.mp3` | ~41 sn |
| | | **Toplam** | | | 3.474 | **886** | | | |

Notlar:
- Abonelik sayacı (`/v1/user/subscription` → character_count) 1. üretimden sonra 468 gösterdi; 2. üretim sayaca birkaç saniye içinde yansımadı. Kayıt API yanıt başlığına dayanır; sayaç sonraki kontrolde teyit edilecek.
- Gözlenen oranlar: Multilingual v2 ≈ 0,40 kredi/karakter; Eleven v4 ≈ 0,11 kredi/karakter (fiyat sayfasındaki v4 indirimi 12 Ekim'e kadar — kalıcı oran sayılmaz). Sabit video maliyeti tahmini yapılmaz; final üretimde yeniden ölçülür.
- Ses, kütüphaneden hesaba eklenmeden doğrudan voice_id ile kullanılabildi (anahtar yetkisi genişletilmedi).
- COO dosyaları dinleyemez; telaffuz ve doğallık kontrolü Founder kulağıyla yapılır (bkz. voice brief §3 listesi).
- 2026-10-10 (render PC): yeni makineye özel kısıtlı anahtar (`render-pc`: TTS Access, Voices Read, User Read; kredi limiti 10.000; repo dışı DPAPI). Test metni güncel script v2.5'ten birebir (S1, S2, S6 cümleleri; `03_vo\tests\2026-10-10_test-text.txt`); telaffuz odakları: NS Savannah, Isbrandtsen, Galveston, rakamlar, "one ship system". Oranlar tekrar gözlendi: v4 ≈ 0,11; Multilingual v2 ≈ 0,40 kredi/karakter. Abonelik sayacı üretimden hemen sonra değişmedi (597) — kayıt API yanıt başlığına dayanır.
- Finance aktarımı bekliyor: kullanım satırları `finance/ledgers/usage.csv`'ye (ortak dosya) laptop senkronundan sonra işlenecek (`P3-pending-decisions.md`).
