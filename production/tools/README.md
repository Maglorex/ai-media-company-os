# Araçlar

Araç envanteri, script'ler ve iş akışları.

## Envanter
| Araç | Durum | Maliyet | Kullanım |
|---|---|---|---|
| Claude Pro / Claude Code | Aktif | Mevcut abonelik | Operasyon, araştırma, yazım, analiz, otomasyon |
| ChatGPT Plus | Aktif | Mevcut abonelik | Dış araştırma, ikinci görüş, fact checking, web araştırması |
| ElevenLabs | Aktif — **API ile doğrulandı 2026-10-08: tier `starter` aktif (ticari lisans var), karakter limiti 63.174** (önceki durum: `payg`). API bağlantısı çalışıyor (`production/tools/elevenlabs/el-common.ps1`, anahtar repo dışında DPAPI). ( Starter API v3 kotası ≈60.000 karakter — Founder kaydı, kesin değil; gerçek tüketim ölçülerek kaydedilir) | Pay-as-you-go (kredi); **ticari lisans yalnız ücretli abonelikte** (resmî Help Center, 2026-10-08) | Seslendirme — entegrasyon önerisi: doğrudan API + şirket betiği (SL-005…008 değerlendirmesi) |
| Node.js | **Kurulu — render bilgisayarı, 24.21.0 LTS** (Founder onayı 2026-10-10) | Ücretsiz, MIT | Remotion çalışma ortamı |
| Remotion | **Kurulu — render bilgisayarı, `production/remotion/`**, sürüm sabit **4.0.529** (+ React 19.3.0; lockfile repoda; `--ignore-scripts` ile kuruldu) — Founder onayı 2026-10-10. Test 2026-10-10: H.264 1080p30 10 sn → 10 sn (CPU); ProRes 4444 alfa → 17 sn. Remotion donanım hızlandırması Windows'ta çalışmadı (EPIPE) → CPU kodlama; final export Media Encoder'da. | **Ücretsiz (Free License)** — şirket ≤3 kişi olduğu sürece; ticari kullanım dahil. `licenseKey` ayarlanmadı → sunucu tarafı render'da telemetri gönderilmez (remotion.dev/docs/license/telemetry, erişim 2026-10-10) | Programatik video (grafik, belge animasyonu) |
| FFmpeg | Ayrı kurulum gerekmiyor (Remotion v4 kendi FFmpeg'ini getiriyor — remotion.dev/docs/ffmpeg) | Ücretsiz | Video/ses işleme |
| Adobe Creative Cloud Pro | Render bilgisayarında kurulu — doğrulandı 2026-10-10 (Premiere Pro 2026, Media Encoder 2026, Photoshop 2026, After Effects 2026, Illustrator 2026) | Mevcut abonelik | Son montaj (Premiere), render (Media Encoder), fotoğraf temizliği (Photoshop) |
| ChatGPT Image Generation | Aktif (ChatGPT Plus içinde) | Mevcut abonelik | Açıklayıcı illüstrasyon, konsept, atmosfer, thumbnail öğesi — **kanıt değil**; kurallar aşağıda |

## Donanım
| Makine | Özellik | Rol |
|---|---|---|
| Render bilgisayarı (DESKTOP-KVLH9B2) | Ryzen 5 5600, 16 GB RAM, RX 580 8 GB, 224 GB SSD + 1 TB HDD — komutla doğrulandı 2026-10-10 | Ana production/render makinesi (D-017). Ayrıntı: `company/machines.md` |

`[VARSAYIM]` RX 580'de NVIDIA NVENC yok; FFmpeg'de AMD AMF donanım kodlaması veya CPU kodlaması kullanılacak. Pipeline aşamasında test edilecek.

## Yeni araç ekleme kuralı
1. Sorun tanımlanır.
2. Mevcut araçlarla ve ücretsiz/açık kaynak seçeneklerle çözüm değerlendirilir.
3. Claude Pro dışında yeni **sabit abonelik** yalnızca zorunlu ve açık ROI gösteren durumda önerilir. Ücretli araç gerekiyorsa: maliyet, alternatifler ve beklenen kazanç ile birincil öneri Founder'a sunulur.
4. Founder onayı → `company/decision-log.md` kaydı → bu envanter güncellenir.

## Güvenlik
API key ve credential'lar repository dışında tutulur (`.env` vb. `.gitignore`'da).

## Remotion lisansı (doğrulandı 2026-10-08)
Kaynak: resmî LICENSE.md (github.com/remotion-dev/remotion), remotion.dev/docs/license/pricing ve /docs/license/faq.
- **Free License:** bireyler, **3 kişiye kadar** kâr amaçlı organizasyonlar, kâr amacı gütmeyenler, değerlendirme. "Unlimited commercial use"; FAQ: "Can I make money under the Free License? Yes." Free ve Company lisans arasında işlev farkı yok. Kayıt/hesap gerekmez.
- **Company License** (4+ kişi veya birlikte çalışılan dış ekip/freelancer'larla toplam 4+ kişi): "Remotion for Creators" 25 $/ay/koltuk; otomasyon (renderMedia, `npx remotion render` vb. kod sahibi olmak) için "Remotion for Automators" 0,01 $/render, en az 100 $/ay. Free License sahipleri otomasyon da çalıştırabilir.
- **Yasak:** Remotion'ı kendisi ürün olarak satmak/yeniden lisanslamak; başkalarının kendi Remotion projelerini bizim sunucumuzda render etmesine izin vermek.
- **Üretilen videolar:** Lisans iptalinden sonra da üretilen videoları kullanma hakkı kalır (FAQ).
- **Bizim durumumuz:** Şirket şu an tek kişi (Founder) → **Free License kapsamında, ek maliyet yok.** Ekip veya dış yapımcı/freelancer Remotion projesine katılır ve toplam 4+ kişi olursa Company License gerekir → Founder onayı.
- **Ayrıca kontrol edilecekler:** (1) Remotion lisansı codec patentlerini (H.264/AAC vb.) kapsamaz (FAQ); YouTube'a yükleme amaçlı standart kullanımda pratik risk düşük `[VARSAYIM]`. (2) Remotion FFmpeg'i dağıtır; FFmpeg kendi lisansına tabidir. (3) Projeye eklenecek her npm paketi (font, grafik kütüphanesi vb.) kendi lisansıyla ayrıca kontrol edilir; **dependency kurulumu Founder onayı gerektirir** (`founder-approval.md`). (4) Remotion 5.0 ile lisans/şartlarda değişiklik duyuruldu (telemetri, Automators) — kurulum sırasında güncel sürüm şartları tekrar okunur.

## ChatGPT Image Generation kuralları
- **Öncelik gerçek kanıttadır:** belge, kamu malı fotoğraf, teknik çizim, güvenli arşiv. Gerçek tarihî fotoğraf varsa sırf daha güzel diye yerine AI görsel üretilmez.
- **Uygun kullanım:** açıklayıcı teknik illüstrasyon, konsept görsel, arka plan/atmosfer, özgün thumbnail öğesi, nesne/makinenin sadeleştirilmiş anlatımı, factual claim taşımayan geçiş görseli, şema veya görsel metafor için özgün asset.
- **Yasak:** tarihî kanıt uydurmak; AI görseli gerçek arşiv fotoğrafı, gerçek belge veya gerçek olayın fotoğrafik kaydı gibi sunmak (ör. "1960'larda Galveston tesisi böyle görünüyordu" diye foto-gerçekçi görsel).
- **Kayıt:** her AI asset görsel planda `AI-GENERATED / ILLUSTRATIVE` türüyle, sahnesiyle ve kullanılan prompt ile kaydedilir; kanıt kaydında "kanıt" olarak yer almaz.
- **Ekranda ayrım:** AI illüstrasyonlar arşiv katmanından görsel dil olarak ayrılır (stilize, foto-gerçekçi değil); gerekirse "illustration" etiketi.
- **Platform açıklaması:** YouTube, gerçekçi görünen ve "gerçek bir olay veya yerin görüntüsünü değiştiren" ya da "gerçekte olmamış gerçekçi bir sahne üreten" içerik için açıklama ister; açıkça gerçek dışı/animasyon içerik ve thumbnail, infografik gibi üretim yardımları için istemez (https://support.google.com/youtube/answer/14328491, erişim 2026-10-08). Her yayından önce bu sayfa yeniden kontrol edilir.
- **Hak:** OpenAI Kullanım Şartları: kullanıcı "Output"un sahibidir ve OpenAI haklarını kullanıcıya devreder; çıktı benzersiz olmayabilir (https://openai.com/policies/row-terms-of-use/, erişim 2026-10-08).
- **Founder akışı:** Bir sahnede AI görsel gerçekten fayda sağlıyorsa Founder'a "Bu sahne için özgün bir açıklayıcı görsel üretmek faydalı. ChatGPT'ye şunu olduğu gibi gönder:" denir ve hazır prompt verilir (`founder-interface` §6c). Gelen görsel ilgili sahnenin asset kaydına bağlanır.
