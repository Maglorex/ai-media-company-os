# Faz 1 / Stage B — ChatGPT İkinci Görüşü (research-request çıktısı)

> Tarih: 2026-10-07 · Talep: `2026-10-06-chatgpt-stage-b-prompt.md` · Yürütücü: ChatGPT (Founder üzerinden) · İşleyen: COO
> Kural: ChatGPT çıktısı, kaynağı kontrol edilene kadar `[VARSAYIM]`dır (`.claude/rules/evidence-and-research.md`). Founder ChatGPT'nin özetini iletti; ham yanıt ve kaynak linkleri bu dosyaya gelmedi. COO kritik iddiaları 2026-10-07'de bağımsız kontrol etti.

## Özet
- ChatGPT bağımsız sıralaması: **N2 > N4 > N3 > N1.** Bizim Stage B taslağımızla (B2 birincil, B4 yedek) aynı yönde.
- En güçlü yeni kanıt, N2 ailesindeki küçük kanal breakout'ları. COO kontrolü bunu **doğruladı, ama önemli bir bağlamla:** örneklerin hepsi **dar sektör dikeyleri** (golf markaları, uçak/motor üreticileri, İngiliz sanayisi). Hepsinde şablonlu "Rise and Fall / What happened to X?" formülü kullanılıyor.
- 2027 YPP eşiği ve AI açıklama kuralları resmî kaynaktan **doğrulandı**.
- RPM: AIR verisi doğrulandı. Business & Finance medyanı küçük örnekleme dayanıyor; N2 seçiminin gerekçesi RPM olamaz.
- Arama hacmi hâlâ doğrulanamadı. Talep için vekil ölçü olarak, küçük kanalların abone tabanının çok üzerinde izlenme alması kullanılıyor.

## Bulgular — doğrulama durumu

### A. Bağımsız olarak doğrulananlar
| # | ChatGPT iddiası | COO kontrolü | Etiket |
|---|---|---|---|
| 1 | **Persimmon Archive**: ~3,1K abone; 315K / 210K / 146K izlenmeli videolar | Doğru. OutlierKit (analiz 2026-09-27): 3,1K abone, 38 video, 1,3M toplam, ort. 33,2K; en iyi videolar Adams Golf 315K, Cobra Golf 210K, Nike Golf 146K. **Bağlam:** niş = golf endüstrisi iş belgeselleri; kanal ~2–3 aylık; "yüksek derecede şablonlu Rise and Fall formülü"; 20–30 dk; izleyici %92 erkek, %45'i 55+ yaşında, %68 ABD | `[VERİ]` tek kaynak, anlık görüntü |
| 2 | **Ruined America**: ~2,9K abone; 60K / 34K / 32K | Doğru. OutlierKit: 2,9K abone, 20 video, 308K toplam; Lycoming 60K, ardından Continental ve Pratt & Whitney (medyanın 2,7–2,8 katı). 19/20 başlık "What Happened to [marka]?"; ort. ~38 dk; sadece seslendirme + arşiv görüntüsü; OutlierKit'e göre "klonlanması ve ölçeklenmesi son derece kolay"; izleyici %96 erkek, %45'i 55+ yaşında, ABD kırsal/banliyö | `[VERİ]` tek kaynak (Stage B B2 raporuyla tutarlı) |
| 6 | AIR Media-Tech 2026: genel medyan ~$2,30; Business & Finance ~$2,01, örneklem küçük; Education & Science ~$10,22, geniş dağılım | Doğru. 300 kanal, 3.595 kanal-ay, Mayıs 2025–Mayıs 2026, Studio verisi. B&F örneklemi AIR'e göre "<10 kanal, yön gösterici". ChatGPT'nin "3 kanal" sayısı doğrulanamadı | `[VERİ]` (sayı farkı not edildi) |
| 8 | Fotogerçekçi ve gerçekleşmemiş sahneler açıklanmalı; stilize, animasyon ve infografik muaf; açıklama erişimi/monetizasyonu düşürmez | Doğru. Resmî Help Center: "realistic scene that didn't actually occur" açıklama gerektirir; senaryo, thumbnail, başlık ve infografik yardımı muaf; "Disclosing AI content won't limit a video's audience or impact its eligibility to earn money". Sürekli açıklamamak etiket, kaldırma veya YPP askısı riski taşır | `[VERİ]` resmî |
| 9 | 2027 YPP: 1.000 abone + 8.000 saat veya 20M Shorts; mevcut ortaklar etkilenmez; fan funding değişmez | Doğru. Resmî YouTube blogu (2026-08-10). **Ek bulgu:** aynı tarihten itibaren Shorts reklam geliri için 90 günde 10M Shorts izlenmesi gerekiyor. Shorts'u türev olarak kullanacağımız için Shorts geliri planlanmamalı | `[VERİ]` resmî |

### B. Kısmen doğrulananlar
| # | İddia | Durum | Etiket |
|---|---|---|---|
| 2b | **The Snoozy Scientist** ses sentezini açıkça kullanıyor; ~46,5K abone / 5M izlenme | Kanal var (YouTube @TheSnoozy-Scientist, Spotify'da da yayında; deep sea, derin zaman, "1 milyar yıl önce" konuları). Abone/izlenme sayısı ve ses sentezi beyanı bu turda doğrulanamadı. **Format notu:** "uyku belgeseli" formatı. Retention ve CTR dinamiği klasik belgeselden farklıdır; N4 kanıtını doğrudan bizim formatımıza taşımaz | `[VARSAYIM]` sayılar / `[VERİ]` kanalın varlığı |
| 7 | AI ses YPP için otomatik engel değil; asıl risk seri üretim, tekrar ve düşük değer | Politika metni Stage B'de resmî kaynaktan doğrulanmıştı (inauthentic content, 2025-07-15). Kabul/ret vaka örnekleri doğrulanmadı | `[VERİ]` politika / `[VARSAYIM]` vakalar |
| 3 | N3: Mentour's Black Box, mevcut büyük bir markanın ekibince kuruldu; kaza görüntüsü olmayan, non-graphic belgesel anlatım otomatik olarak sınırlı reklam sayılmaz | Marka transferi B3 raporunda zaten tespit edilmişti (Mentour Pilot ~2,46M). Reklam rehberi yorumu bu turda yeniden okunmadı | `[VERİ]` marka / `[VARSAYIM]` reklam yorumu |

### C. Doğrulanmayanlar (karar ağırlığı verilmez)
| # | İddia | Not |
|---|---|---|
| 4 | N1: 2024–2026'da sıfırdan büyüyen genel nedensellik tarihi kanalı az; dar alt nişlerde breakout var | B1 raporuyla tutarlı (Context History, 52K outlier). Örnek kanal verilmedi |
| 5 | Arama hacmi güvenilir biçimde doğrulanamadı | Doğrulanamadığının teyidi. Exact keyword hacmi varsayılmayacak |
| 10 | Business Casual'ın 2026 trafiği lifetime ortalamasının altında | Kaynak verilmedi. Sonuç ne olursa olsun Business Casual benchmark olarak kullanılmayacak (güvenli taraf) |

## Belirsizlikler ve çelişkiler
- **Breakout kanıtının niteliği:** N2'deki temiz örneklerin tamamı dar dikey + şablonlu formül + yaşlı/ABD/erkek kitle. ChatGPT'nin önerdiği konumlandırma (Kodak, Nokia, BlackBerry, Blockbuster…) ise **geniş ve büyük kanallarca çok işlenmiş** konular içeriyor. Kanıt geniş konumlandırmayı değil, **az işlenmiş dikeyleri** destekliyor.
- **Politika gerilimi:** Örnek kanalların başarılı formülü OutlierKit'e göre "kolay klonlanır" türden. Bu, inauthentic content riski ve klon rekabeti demek. Bizim farklılaşmamız (belge-öncelikli anlatım, özgün grafik, her videoda farklı anlatı iskeleti) bu formülden ayrışmak zorunda.
- **Hayatta kalma yanlılığı:** Kanıtlar tek kaynaklı (OutlierKit) ve anlık görüntü. Başarısız benzerler de var (The Deception Bureau: 2,6K abone, ort. 432 izlenme).
- **Kanal yaşı:** Persimmon Archive ve Ruined America 2–3 aylık. Sürdürülebilirlikleri bilinmiyor.

## Şirket için anlamı
1. N2'nin önceliği güçlendi. Sebep RPM değil; yeni küçük kanalların browse/önerilen dağıtımı alabildiğine dair güncel kanıt.
2. Konumlandırma ChatGPT'nin "Industrial Autopsies" şemsiyesine yakın olmalı. Ancak kanıt, ilk videoların **az işlenmiş endüstriyel/teknik dikeylerde** toplanmasını destekliyor; Kodak, Nokia gibi doymuş konular ana menü olmamalı.
3. RPM bilinmiyor kabul edilir (L-002). Gelir planı kendi Studio verimizle kurulur.
4. 8.000 saatlik YPP eşiği, monetizasyona ulaşma süresini uzatıyor. Bu yüzden retention ve izlenme süresi birincil metrik.

## Birincil öneri
Sonuç `decision-review`e girdi olarak verildi: `2026-10-07-faz1-decision-review.md`.

## Kaynaklar (erişim 2026-10-07)
- OutlierKit — Persimmon Archive: https://outlierkit.com/channel/persimmonarchive
- OutlierKit — Ruined America: https://outlierkit.com/channel/ruinedamerica
- AIR Media-Tech, YouTube Monetization Statistics 2026: https://air.io/en/air-data-findings/youtube-monetization-statistics-2026
- YouTube Blog, YPP updates 2027 (2026-08-10): https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/
- YouTube Help, altered or synthetic content disclosure: https://support.google.com/youtube/answer/14328491
- The Snoozy Scientist (YouTube): https://www.youtube.com/@TheSnoozy-Scientist · Spotify: https://open.spotify.com/show/03itvMaIzxB4ozhG5Lo4uN
