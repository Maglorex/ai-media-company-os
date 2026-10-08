# Production / Montaj Hattı — Kurulum Planı v1

> Tarih: 2026-10-08 · Hazırlayan: COO · Durum: **PLAN — hiçbir şey kurulmadı/indirilmedi.** Test vakası: P3 NS Savannah (`production/pilots/2026-10-n2-pilot-test/P3-edit-plan-v1.md`).
> Bilinmeyenler uydurulmadı: render bilgisayarının güncel donanımı ve yüklü yazılımları onboarding'de doğrulanacak (`company/machines.md`'deki "Ryzen 5 5600, 16 GB RAM, RX 580 8 GB" kaydı Founder Intake'ten; teyit edilmedi). Adobe Creative Cloud Pro'nun render bilgisayarında olduğu Founder beyanıdır.

## 1. İlke: her iş için en basit güvenilir araç
| İş | Araç | Neden bu araç | Alternatif (gerekirse) |
|---|---|---|---|
| Son montaj, VO yerleşimi, müzik miksi (otomatik kısma), renk/ton, export | **Premiere Pro** (+ Media Encoder ile render) | Ses miksi, son kontrol ve export'ta en güvenilir ve Founder'ın görsel kontrol edebileceği ortam | Tam Remotion montajı (P3'te ölçülerek değerlendirilir) |
| Tekrarlanan veri/belge grafikleri (belge vurgusu, rakam kartı, karşılaştırma, zaman şeridi, kaynak etiketi, alıntı kartı) | **Remotion** | Claude bu şablonları kodla yazıp her videoda yalnız veriyi değiştirerek üretebilir; Founder'ın After Effects'te elle çalışması gerekmez | After Effects (tek seferlik özel efekt) |
| Videoya özel şemalar ve animasyonlar (Galveston tesis şeması, "lone ship" animasyonu) | **Remotion (SVG)** | Doğrulanmış bileşenlerden SVG çizimi Claude tarafından yapılabilir; değişiklik metin düzeyinde, izlenebilir | Illustrator/After Effects (Founder isterse cilalama) |
| Basit haritalar | **Remotion (SVG)** + kamu malı harita verisi (Natural Earth, naturalearthdata.com — kamu malı; kullanılmadan önce ledger'a eklenir) | Bölge düzeyi oklar için yeterli; ücretsiz | — |
| Arşiv fotoğraf işlemi (temizlik, kırpma, yavaş zoom/pan) | Temizlik: **Photoshop** (yalnız gerekiyorsa); hareket: **Premiere** | En basit yol; içerik değiştirilmez | Remotion |
| GAO 1-bit tarama temizliği | Mevcut yerel betik (sayfa görüntüsü çıkarma) + gerekirse Photoshop | Metin/sayı değiştirilmez | — |
| Altyazı | **ElevenLabs "with timestamps"** çıktısından Claude'un ürettiği SRT → Premiere'de stil | Final VO ile aynı üretimde gelir, ek maliyet yok, metin script'le birebir | Premiere Speech to Text |
| Seslendirme | **ElevenLabs API** (mevcut entegrasyon) | Kurulu | — |
| Açıklayıcı illüstrasyon (yalnız gerekirse) | **ChatGPT Image Generation** (Founder üretir) | `AI-GENERATED / ILLUSTRATIVE` kuralları | — |
| Müzik/SFX | **Kaynak kuralı henüz yok** (ayrı sistem; ilk aday: YouTube Studio Audio Library — resmî, ücretsiz; lisans koşulları parça bazında ledger'a) | — | — |
| FFmpeg | **Ayrı kurulum gerekmez** — Remotion v4'ten beri FFmpeg'i kendi içinde getiriyor (remotion.dev/docs/ffmpeg) | — | — |
| After Effects | **Zorunlu değil**; yalnız Remotion'la yapılamayan özel bir efekt gerekirse | — | — |

**Zamanlama çizgisi:** Claude, edit plan'dan Premiere'in içe aktarabildiği bir zaman çizelgesi (Final Cut Pro XML) üretmeyi P3'te dener; başarılı olursa Founder'ın montaj işi "içe aktar → kontrol et → export" seviyesine iner. Başarısız olursa montaj edit plan'a göre elle yapılır. `[VARSAYIM]` P3'te ölçülecek.

## 2. P3 test vakası eşleşmesi
| P3 öğesi | Araç | Not |
|---|---|---|
| Belge vurguları, 3 maliyet satırı | Remotion "document highlight" şablonu | Sayfa görüntüsü + koordinatlı vurgu + kaynak etiketi; ProRes 4444 (alfa) veya tam kare çıktı → Premiere |
| Galveston şeması | Remotion SVG | Yalnız ledger'daki bileşenler (C-31, C-42); "illustration" etiketi |
| "Lone ship system" animasyonu | Remotion SVG | Veri: üç kalem (GAO), "several" (sayı yok) |
| Harita | Remotion SVG + Natural Earth | Bölge düzeyi, liman adı yok |
| Arşiv fotoğrafları | Premiere (Ken Burns) | V-05, V-19, V-21, V-26 |
| Rakam/karşılaştırma kartları | Remotion şablonları | Rakamlar ledger'dan |
| Son montaj, müzik, altyazı, export | Premiere + Media Encoder | — |

## 3. Şablon önceliği (ilk 3 video: P3, P2, P1 — hepsi devlet raporu/duruşma tutanağı ağırlıklı)
**Şimdi (P3 ile birlikte):** (1) document highlight, (2) source label, (3) number/stat card, (4) comparison/bar, (5) timeline, (6) quote card.
**Sonra (ihtiyaç olunca):** chapter/title transition (marka kimliğine bağlı), map (genelleştirilmiş), technical diagram kit (SVG temel parçaları), caption stili (marka kimliğine bağlı).
Tüm şablonlar renk/font/logo için tek bir **tema dosyasından** beslenir: P3 geçici pilot dili (koyu lacivert zemin, kırık beyaz, tek kehribar vurgu) → kalıcı marka gelince yalnız tema dosyası değişir.

## 4. Marka bağımlılıkları
Kalıcı kanal kimliği (ad, logo/profil, banner, renk paleti, tipografi, marka dili) **Founder + ChatGPT** ile oluşturulacak; COO finalleştirmez.
- **Marka olmadan yapılabilir:** P3 pilot üretimi (geçici dil), şablonların teknik altyapısı, ölçüm.
- **Marka olmadan yapılamaz / final sayılmaz:** yayın, açılış/kapanış kartı ve bölüm geçişleri, altyazı stili, filigran, kalıcı thumbnail şablonu, kanal sayfası. → Marka çalışması yayından önce; zamanı gelince `founder-interface` §6c ile ChatGPT promptu hazırlanır.

## 5. İki bilgisayar ve depolama
| Ne | Nerede | Senkron |
|---|---|---|
| Company OS, script, ledger, planlar, Remotion kodu ve şablonlar, asset manifestleri (kaynak URL, lisans, dosya özeti), SRT, timeline XML | Git repo | GitHub (Founder push) |
| Arşiv görselleri, VO dosyaları, müzik/SFX, Remotion render çıktıları, Premiere projesi ve önbellek, final render | **Render bilgisayarında yerel üretim klasörü** (ör. `<sürücü>:\CompanyOS-Production\<video-id>\` altında 01_archive · 02_graphics · 03_vo · 04_music · 05_premiere · 06_renders · 99_cache) | GitHub'a girmez (.gitignore); Adobe önbelleği bu klasöre yönlendirilir |
| Yedek | Final render + VO + Premiere projesi için ikinci kopya (harici disk veya mevcut bulut) — **karar onboarding'de**, ek maliyet varsayılmadı | Kamu malı asset'ler manifestten yeniden indirilebilir; VO yeniden üretmek kredi ister → mutlaka yedeklenir |

## 6. Kurulacaklar (yalnız render bilgisayarı) — Founder onayıyla
| Yazılım | Neden | Resmî kaynak | Ücret / lisans | Zorunlu mu |
|---|---|---|---|---|
| Adobe Creative Cloud Pro (Premiere, Media Encoder, Photoshop; After Effects opsiyonel) | Son montaj/render | adobe.com | **Mevcut** (Founder beyanı) | Evet (zaten var) |
| GitHub Desktop | Repo senkronu | desktop.github.com | Ücretsiz, MIT | Evet |
| Claude uygulaması (Claude Code) | Claude'un render makinesinde Remotion çalıştırması | claude.com | Mevcut abonelik | Evet (otomasyon için) |
| Node.js LTS | Remotion çalışma ortamı | nodejs.org | Ücretsiz, MIT | Remotion kullanılacaksa evet |
| Remotion (resmî npm paketleri, sürüm sabitlenir, lockfile repoda) | Grafik/animasyon şablonları | remotion.dev | Free License (≤3 kişi, ticari kullanım dahil) | Evet (şablon yaklaşımı için) |
| FFmpeg (ayrı) | — | — | — | **Hayır** (Remotion içinde) |
| Ek npm paketleri | Yalnız gerçekten gerekirse; her biri Skill Lab statik incelemesi + Founder onayı | — | — | Varsayılan: hayır |
| ElevenLabs anahtarı | Render makinesinde VO üretimi gerekirse | — | — | Opsiyonel: **o makineye özel ayrı kısıtlı anahtar** (DPAPI dosyası makineler arası kopyalanamaz) |

**Tahmini ek maliyet:** 0 $ (Adobe mevcut; diğerleri ücretsiz). Harici yedek disk gerekirse ayrı karar.

## 7. machine-onboarding için gerekenler (render bilgisayarı, adım adım)
1. Donanım ve Windows sürümünü doğrula (komutla; Founder'a soru yok) → `company/machines.md`.
2. GitHub Desktop + repo klonu → Fetch/Pull.
3. Claude uygulamasında repo klasörünü aç → `system-health-check`.
4. Adobe CC Pro uygulamalarının kurulu olduğunu doğrula (Premiere, Media Encoder, Photoshop).
5. Üretim klasörünü ve yedek yerini belirle; Adobe önbelleğini oraya yönlendir.
6. (Onaylıysa) Node.js LTS → Remotion projesi (`production/remotion/`), sürüm sabit; Remotion lisans/telemetri koşullarını kurulum anında yeniden oku.
7. (Gerekirse) ElevenLabs için makineye özel kısıtlı anahtar → DPAPI komutu (Founder kendi terminalinde).
8. Donanım kodlama testi (AMD AMF / CPU) — kısa test render'ı.
9. Kayıt: `company/machines.md`, `production/tools/README.md`, decision-log (rol).
