# P3 — Voice Ledger (ElevenLabs gerçek kullanım kaydı)

> Her üretim: tarih · amaç · ses · model · karakter · **ölçülen kredi** (API yanıtındaki `character-cost` başlığı) · request_id · dosya. Plan: Starter (aktif, 2026-10-08). Onay: D-016 testi, tavan 2.600 kredi.
> Ses dosyaları git dışında (`voice-tests/`, .gitignore).

| # | Tarih | Amaç | Ses | Model | Karakter | Ölçülen kredi | request_id | Dosya | Süre (≈, 128 kbps'ten) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 2026-10-08 | Kanal sesi testi (test metni §4) | Bill L. Oxley `iiidtqDt9FBdT1vfBluA` | eleven_multilingual_v2 | 1.169 | **468** | onF93QhrAWBWQBxiq40L | voice-tests/bill-oxley_multilingual-v2_test.mp3 | ~76 sn |
| 2 | 2026-10-08 | Aynı metin, model karşılaştırması | Bill L. Oxley | eleven_v4 | 1.169 | **129** | ZaLJUKZU29VaMzTvvN5v | voice-tests/bill-oxley_v4_test.mp3 | ~78 sn |
| | | **Toplam** | | | 2.338 | **597** (tavanın %23'ü) | | | |

Notlar:
- Abonelik sayacı (`/v1/user/subscription` → character_count) 1. üretimden sonra 468 gösterdi; 2. üretim sayaca birkaç saniye içinde yansımadı. Kayıt API yanıt başlığına dayanır; sayaç sonraki kontrolde teyit edilecek.
- Gözlenen oranlar: Multilingual v2 ≈ 0,40 kredi/karakter; Eleven v4 ≈ 0,11 kredi/karakter (fiyat sayfasındaki v4 indirimi 12 Ekim'e kadar — kalıcı oran sayılmaz). Sabit video maliyeti tahmini yapılmaz; final üretimde yeniden ölçülür.
- Ses, kütüphaneden hesaba eklenmeden doğrudan voice_id ile kullanılabildi (anahtar yetkisi genişletilmedi).
- COO dosyaları dinleyemez; telaffuz ve doğallık kontrolü Founder kulağıyla yapılır (bkz. voice brief §3 listesi).
