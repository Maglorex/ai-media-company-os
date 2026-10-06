# Araçlar

Araç envanteri, script'ler ve iş akışları.

## Envanter
| Araç | Durum | Maliyet | Kullanım |
|---|---|---|---|
| Claude Pro / Claude Code | Aktif | Mevcut abonelik | Operasyon, araştırma, yazım, analiz, otomasyon |
| ChatGPT Plus | Aktif | Mevcut abonelik | Dış araştırma, ikinci görüş, fact checking, web araştırması |
| ElevenLabs | Aktif | Pay-as-you-go (kredi) | Seslendirme — hazır sesler |
| Remotion | Değerlendirilecek | Lisans koşulları kontrol edilecek | Programatik video |
| FFmpeg | Değerlendirilecek | Ücretsiz, açık kaynak | Video/ses işleme |

## Donanım
| Makine | Özellik | Rol |
|---|---|---|
| Render bilgisayarı | Ryzen 5 5600, 16 GB RAM, RX 580 8 GB | Video render / kurgu (bu oturuma bağlı makine değil) |

`[VARSAYIM]` RX 580'de NVIDIA NVENC yok; FFmpeg'de AMD AMF donanım kodlaması veya CPU kodlaması kullanılacak. Pipeline aşamasında test edilecek.

## Yeni araç ekleme kuralı
1. Sorun tanımlanır.
2. Mevcut araçlarla ve ücretsiz/açık kaynak seçeneklerle çözüm değerlendirilir.
3. Claude Pro dışında yeni **sabit abonelik** yalnızca zorunlu ve açık ROI gösteren durumda önerilir. Ücretli araç gerekiyorsa: maliyet, alternatifler ve beklenen kazanç ile birincil öneri Founder'a sunulur.
4. Founder onayı → `company/decision-log.md` kaydı → bu envanter güncellenir.

## Güvenlik
API key ve credential'lar repository dışında tutulur (`.env` vb. `.gitignore`'da).
