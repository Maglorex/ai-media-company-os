# EXP-002 — ElevenLabs Eleven v4 kampanyası: Voice Opportunity Sprint (geçici)

> Açılış: 2026-10-08 · Sahip: COO · Tür: geçici fırsat takibi (kalıcı skill değil) · Bağlı: D-015, D-016, `production/pilots/2026-10-n2-pilot-test/voice-ledger.md`
> Durum: **Açık — 2026-10-12'de kapanır.**

## Doğrulanan kampanya bilgisi (resmî kaynak, erişim 2026-10-08)
| Konu | Bulgu | Kaynak | Kanıt |
|---|---|---|---|
| 1. API indirimi | Eleven v4: "72% off until Oct 12" — 1K karakter **$0.08 → $0.022**; v4 Turbo $0.04 → $0.011. Fiyat tablosu tüm planlarda (Free/PAYG, Starter … Business) aynı indirimi gösteriyor | elevenlabs.io/pricing/api | `[VERİ]` |
| 1'in bizdeki ölçümü | Aynı metin (1.169 karakter), aynı ses: v2 **468 kredi**, v4 **129 kredi** → v4 ≈ v2'nin %27,6'sı (= %72 indirimle tutarlı) | voice-ledger #1–2; abonelik sayacı 597 ile teyit | `[VERİ]` |
| 2. Web/mobil kredi kampanyası | "Try v4 with 2x credits for two weeks — On **Creator plans and above**, up to 2x your monthly TTS credits used on v4 won't count against your balance. **Available in the web and mobile apps only.**" | elevenlabs.io/pricing (UI sekmesi) | `[VERİ]` |
| 2'deki çelişki | Site üst bandı: "**3x** credits included on Creator+ until October 12"; fiyat sayfası notu: "**2x** … for two weeks". Hangisinin geçerli olduğu resmî metinde netleşmiyor | elevenlabs.io (bant), /pricing | çelişki kayıtlı |
| Bitiş tarihi | **12 Ekim (2026)**; saat/zaman dilimi belirtilmemiş → pratikte 11 Ekim sonuna kadar kullanılmalı | /pricing/api, site bandı | `[VERİ]` (saat `[VARSAYIM]`) |
| Uygun planlar | API indirimi: tüm planlar (Starter dahil). Web/mobil kredi kampanyası: **yalnız Creator ve üstü** — Starter kapsamda değil | /pricing/api, /pricing | `[VERİ]` |
| Kapsanan modeller | Eleven v4 ve v4 Turbo (API indirimi); web/mobil kampanya: v4 | aynı | `[VERİ]` |
| Web/API farkı | Evet: API'de fiyat indirimi; web/mobil'de kredi sayılmama kampanyası (Creator+) | aynı | `[VERİ]` |
| Model durumu | v4 Eylül 28, 2026'da yayımlandı (blog, son güncelleme 5 Eki); TTS "Create speech" ile `eleven_v4` kullanılabilir; beta/alpha ibaresi görülmedi | elevenlabs.io/blog/eleven-v4; Help Center "What is Eleven v4?" | `[VERİ]` |
| Hesabımız | Plan **Starter, aktif**; karakter limiti 63.174; kullanılan 597 (2026-10-08, API) | `/v1/user/subscription` | `[VERİ]` |
| Ticari kullanım | Starter ücretli abonelik → ToS (non-EEA) "Paid User… may use the Services for commercial purposes" → **var** (abonelik süresince üretilenler için) | elevenlabs.io/terms-of-use | `[VERİ]` |

## Kalite kuralı
- Founder değerlendirmesi (2026-10-08): **A / Multilingual v2 > v4 örneği** (aynı ses Bill L. Oxley, aynı metin, varsayılan ayarlar). v2 = kalite referansı ve birincil model.
- v4 stok üretim için yalnız şu üçü birlikte sağlanırsa: (1) aynı anlatıcıyla Founder'ın kabul edeceği kalite, (2) kalite kaybı Founder onaylı, (3) anlamlı tasarruf.

## Apples-to-apples planı
- Yapılan karşılaştırma zaten eşdeğer: aynı ses, aynı 1.169 karakter, varsayılan ayarlar, aynı çıktı formatı (mp3 44.1 kHz 128 kbps).
- Ek test yapılacaksa (henüz **yapılmadı**, kredi harcanmadı): yalnız v4 tarafında ayar denemesi (daha yüksek stability / daha düşük style) — test metninin B paragrafı (~290 karakter) × 2 varyant ≈ 2 × 290 × 0,11 ≈ **~65 kredi**. Ücretsiz preview bu soruyu cevaplayamaz (preview'lar kendi metinleri ve modelleriyle).

## Tasarruf hesabı (ölçülen oranlarla)
- P3 tam VO ≈ 7.794 karakter → v2 ≈ 3.120 kredi, v4 (kampanya) ≈ 860 kredi → fark ≈ 2.260 kredi = aylık Starter kotasının ~%3,6'sı. Para karşılığı Starter fiyatı oranında küçük `[TAHMİN]`.
- **Sonuç:** Tek hazır video için tasarruf anlamsız düzeyde; Founder v2'yi tercih ediyor → kampanyadan yararlanmak için ek test veya stok üretim **önerilmez**.

## Stok seslendirme uygunluk listesi (kampanya bitene kadar Founder Brief'te kontrol edilir)
Uygunluk şartları: araştırma tamam · evidence ledger temiz · packaging kararı verilmiş · script final ve kilitli · ciddi factual risk yok.
| Video | Durum | Uygun mu? |
|---|---|---|
| P3 NS Savannah | Script v2.1 kilitli (D-013/014), ledger temiz, packaging D-012 | **Evet (1)** — ama model kararı v2 olduğundan kampanya avantajı uygulanmaz |
| P2 J40 | Pilot taslak; HathiTrust duruşma metni kapı koşulu açık | Hayır |
| P1 Brewster | Pilot taslak; doğrulanmamış iddialar | Hayır |

Her stok/final seslendirmede kaydedilecekler: script sürümü · voice_id · model · ayarlar · ölçülen kredi · tarih · video → `voice-ledger.md`.

## Kapanış
- 2026-10-12 sonrası: sonuç yazılır (beklenen: "Kullanılmadı — kalite önceliği ve düşük tasarruf"). Öğrenim adayı: "Kampanya fiyatı model seçimini belirlemez; ölçülen kalite + ölçülen kredi belirler."

## Güncelleme 2026-10-10
- Birincil model kararı kanonik kayda işlendi: **D-021** (Bill L. Oxley + Multilingual v2). v4 = yedek / deneysel / geçici fiyat avantajı. Geçici indirim tek başına kararı değiştirmez.
- Güncel script ile QA testi (voice-ledger #3–#4; v4 62 kredi, v2 227 kredi) model seçimini yeniden açmak için değildir.
