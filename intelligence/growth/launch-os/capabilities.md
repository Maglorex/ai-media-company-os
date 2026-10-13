# Sistem ve kanal durumu (Launch OS)

> Karar: D-036. İki ayrı durum:
> - **SYSTEM READY** — Company OS'un kuralları, şablonları, kapıları tanımlı ve çelişkisiz. Kanal olmadan da olabilir.
> - **CHANNEL CAPABILITY VERIFIED** — kanal açıldıktan sonra aşağıdaki **bir kerelik** checklist çalıştırıldı ve sonuçlar kaydedildi.
> Kanal yokken kanal maddeleri **hata değildir**: durum `BLOCKED_BY_FUTURE_SETUP`. `system-health-check` bunları FAIL saymaz, ayrı listeler. Release Gate, CHANNEL CAPABILITY VERIFIED olmadan public'e izin vermez.
> Founder-brief bu dosyayı okur: bir madde açıldığında Founder'a **bir kez** tek cümle hatırlatır.

## Durum (2026-10-13)
| Durum | Değer |
|---|---|
| SYSTEM READY | ana bilgisayar denetimi: `intelligence/growth/launch-os/main-pc-readiness-audit.md` |
| CHANNEL CAPABILITY VERIFIED | **NO** — kanal açılmadı → tüm kanal maddeleri `BLOCKED_BY_FUTURE_SETUP` |

## Bir kerelik kanal checklist'i (kanal açılınca; Founder Studio'da uygular, COO kayda geçirir)
| # | Madde | Durum | Not / kaynak |
|---|---|---|---|
| C-01 | Kanal oluşturuldu (Brand Account tercihi, kanal adı, handle) | BLOCKED_BY_FUTURE_SETUP | Hesap açma = Founder onaylı işlem |
| C-02 | Güvenlik: 2 adımlı doğrulama, kurtarma bilgileri, kanal izinleri (Studio → Settings → Permissions; Claude'a hesap erişimi verilmez) | BLOCKED_BY_FUTURE_SETUP | Credential repoya girmez |
| C-03 | Telefon doğrulaması → **Intermediate Features** (custom thumbnails dahil) | BLOCKED_BY_FUTURE_SETUP | P-12, P-19 |
| C-04 | **Advanced Features** (telefon doğrulaması + kanal geçmişi veya ID/video doğrulama) → native title/thumbnail A/B testi | BLOCKED_BY_FUTURE_SETUP | P-12, P-18; açılınca native A/B → `ELIGIBLE` |
| C-05 | Custom thumbnail yükleme — **Intermediate Features; telefon doğrulamasıyla açılır** (C-03 sonrası Studio'da görünür olduğu kontrol edilir) | BLOCKED_BY_FUTURE_SETUP | P-19 |
| C-06 | Chapters (manuel) ve automatic chapters ayarı görünüyor | BLOCKED_BY_FUTURE_SETUP | P-08, P-14 |
| C-07 | Title & Thumbnail A/B aracı görünüyor (masaüstü Studio) | BLOCKED_BY_FUTURE_SETUP | P-11, P-18 |
| C-08 | Upload defaults (Settings → Upload defaults): category, license Standard, language English, comments moderasyonu, caption certification, title/description boş | BLOCKED_BY_FUTURE_SETUP | `UPLOAD-SETTINGS-MATRIX.md` |
| C-09 | Default description (yalnız alt kanal bölümü; video özel kısım her videoda paketten) | BLOCKED_BY_FUTURE_SETUP | P-06 |
| C-10 | Kanal ülkesi/bölgesi + kanal dili (English) | BLOCKED_BY_FUTURE_SETUP | Vergi/ödeme ile ilişkisi `tax-watch` |
| C-11 | Audience varsayılanı (kanal düzeyi: Not made for kids) | BLOCKED_BY_FUTURE_SETUP | P-15 |
| C-12 | Studio ayar etiketleri matrisle karşılaştırıldı (adı değişen alan varsa matris güncellenir) | BLOCKED_BY_FUTURE_SETUP | P-14 |
| C-13 | Logo/banner (marka; final asset gelince) | BLOCKED_BY_FUTURE_SETUP | Brand §K–§L |
| C-14 | "When your viewers are on YouTube" raporu yeterli veriyle | BLOCKED_BY_FUTURE_SETUP (veri gerekir) | Yayın zamanı deneyi |
| C-15 | Series playlist (gerektiğinde): doğrulanmış hesap · bir video yalnız bir resmî series playlist'te · yalnız kendi yüklediğimiz ve haklarına sahip olduğumuz videolar | BLOCKED_BY_FUTURE_SETUP (≥2 aynı kova video gerekir) | P-22 |
Tüm C-01…C-12 tamam → **CHANNEL CAPABILITY VERIFIED = YES** (tarih). C-13, C-14, C-15 bunu bloklamaz.
