# Sistem ve kanal durumu (Launch OS)

> Karar: D-036. İki ayrı durum:
> - **SYSTEM READY** — Company OS'un kuralları, şablonları, kapıları tanımlı ve çelişkisiz. Kanal olmadan da olabilir.
> - **CHANNEL CAPABILITY VERIFIED** — kanal açıldıktan sonra aşağıdaki **bir kerelik** checklist çalıştırıldı ve sonuçlar kaydedildi.
> Statüler: `DONE` (Founder bildirdi/Studio'da doğrulandı, tarihli) · `NEEDS_VERIFICATION` (kanal var ama Studio'da fiziksel olarak doğrulanmadı — **varsayılmaz**) · `BLOCKED_BY_DATA` (izleyici verisi gerekir) · `BLOCKED_BY_FUTURE_SETUP` (yalnız kanal yokken kullanılırdı; 2026-10-13'ten beri kullanılmıyor). `NEEDS_VERIFICATION` maddeler `system-health-check`'te hata değildir, ayrı listelenir. Release Gate, CHANNEL CAPABILITY VERIFIED olmadan public'e izin vermez.
> Founder-brief bu dosyayı okur: bir madde açıldığında Founder'a **bir kez** tek cümle hatırlatır.

## Durum (2026-10-13)
| Durum | Değer |
|---|---|
| SYSTEM READY | ana bilgisayar denetimi: `intelligence/growth/launch-os/main-pc-readiness-audit.md` |
| CHANNEL CREATED | **YES** — Founder bildirimi 2026-10-13 (D-037) |
| BASIC BRANDING STARTED | **YES** — logo/profil görseli ayarlandı (Founder bildirimi 2026-10-13) |
| CHANNEL CAPABILITY VERIFIED | **NO** — Studio kontrolleri (C-02…C-12) henüz fiziksel olarak doğrulanmadı |

## Bir kerelik kanal checklist'i (Founder Studio'da uygular, COO kayda geçirir — kanal 2026-10-13'te oluşturuldu)
| # | Madde | Durum | Not / kaynak |
|---|---|---|---|
| C-01 | Kanal oluşturuldu (Brand Account tercihi, kanal adı, handle) | **DONE** (Founder 2026-10-13) — kanal adı/handle ve Brand Account olup olmadığı henüz kayda geçmedi → NEEDS_VERIFICATION (kayıt) | D-037 |
| C-02 | Güvenlik: 2 adımlı doğrulama, kurtarma bilgileri, kanal izinleri (Studio → Settings → Permissions; Claude'a hesap erişimi verilmez) | NEEDS_VERIFICATION | Credential repoya girmez |
| C-03 | Telefon doğrulaması → **Intermediate Features** (custom thumbnails dahil) | NEEDS_VERIFICATION | P-12, P-19 |
| C-04 | **Advanced Features** (telefon doğrulaması + kanal geçmişi veya ID/video doğrulama) → native title/thumbnail A/B testi | NEEDS_VERIFICATION | P-12, P-18; açılınca native A/B → `ELIGIBLE` |
| C-05 | Custom thumbnail yükleme — **Intermediate Features; telefon doğrulamasıyla açılır** (C-03 sonrası Studio'da görünür olduğu kontrol edilir) | NEEDS_VERIFICATION | P-19 |
| C-06 | Chapters (manuel) ve automatic chapters ayarı görünüyor | NEEDS_VERIFICATION | P-08, P-14 |
| C-07 | Title & Thumbnail A/B aracı görünüyor (masaüstü Studio) | NEEDS_VERIFICATION | P-11, P-18 |
| C-08 | Upload defaults (Settings → Upload defaults): category, license Standard, language English, comments moderasyonu, caption certification, title/description boş | NEEDS_VERIFICATION | `UPLOAD-SETTINGS-MATRIX.md` |
| C-09 | Default description (yalnız alt kanal bölümü; video özel kısım her videoda paketten) | NEEDS_VERIFICATION | P-06 |
| C-10 | Kanal ülkesi/bölgesi + kanal dili (English) | NEEDS_VERIFICATION | Vergi/ödeme ile ilişkisi `tax-watch` |
| C-11 | Audience varsayılanı (kanal düzeyi: Not made for kids) | NEEDS_VERIFICATION | P-15 |
| C-12 | Studio ayar etiketleri matrisle karşılaştırıldı (adı değişen alan varsa matris güncellenir) | NEEDS_VERIFICATION | P-14 |
| C-13 | Logo/profil görseli · banner | Profil görseli: **SET** (Founder 2026-10-13; hangi konsept olduğu kayıtlı değil) · Banner: **DONE** (Founder 2026-10-13, D-040) | Brand §K–§L |
| C-14 | "When your viewers are on YouTube" raporu yeterli veriyle | BLOCKED_BY_DATA | Yayın zamanı deneyi |
| C-15 | Series playlist (gerektiğinde): doğrulanmış hesap · bir video yalnız bir resmî series playlist'te · yalnız kendi yüklediğimiz ve haklarına sahip olduğumuz videolar | NEEDS_VERIFICATION (uygunluk) · kullanım ≥2 aynı kova video sonrası | P-22 |
Tüm C-01…C-12 tamam → **CHANNEL CAPABILITY VERIFIED = YES** (tarih). C-13, C-14, C-15 bunu bloklamaz.
