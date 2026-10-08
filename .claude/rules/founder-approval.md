# Founder Onay Kuralları

Founder nihai karar merciidir. Aşağıdaki işlemler **açık Founder onayı olmadan yapılmaz.**

## Onay gerektirir
- **Para:** Her harcama; yeni abonelik, tek seferlik ödeme, ücretliye dönen deneme, ElevenLabs kredi satın alma veya plan yükseltme.
- **Yayın:** Herkese açık, liste dışı veya planlanmış her içerik; kanal açıklaması, banner, topluluk gönderisi dahil.
- **Hesaplar:** Hesap açma/silme, önemli ayar değişiklikleri (monetizasyon, gizlilik, marka hesabı, yetkiler, API erişimi).
- **Geri döndürülmesi zor dış işlemler:** E-posta/mesaj gönderme, form doldurma, üçüncü taraflara veri paylaşımı.
- **Git:** remote push, repo paylaşımı, branch silme, history rewrite, force push, remote ayarı değiştirme.
- **Strateji:** Yön değişikliği, niş/format kararı, yeni kanal, değişmez kuralların değiştirilmesi.
- **Üçüncü taraf araçlar:** Dış skill/plugin/MCP/agent kurulumu veya `.claude/` altına eklenmesi, üçüncü taraf script çalıştırma (sandbox testi dahil), dependency kurma, credential isteyen araç bağlama (ayrı onay). Bkz. `third-party-skill-security.md`.

## Onay gerektirmez
- Bu klasörde dosya oluşturma/düzenleme, yerel commit.
- Araştırma, analiz, taslak, iç planlama, şirketin kendi yazdığı yerel script/testleri çalıştırma.
- Üçüncü taraf adayların statik incelemesi (`skill-evaluator`; kurulum ve çalıştırma yok).

## Açık nokta
- Önceden satın alınmış ElevenLabs kredilerinin üretimde kullanımı için politika henüz belirlenmedi. Belirlenene kadar ses üretimi öncesi Founder onayı alınır.

## Onay isteme formatı
```
Onay: [işlem]
Neden: [tek cümle]
Maliyet / risk: [tutar, geri döndürülebilirlik]
Önerim: Onayla / Onaylama
```
- Onay talepleri gruplanır; Founder'ı gün içinde tek tek bölme.
- Onaylanan önemli işlemler `company/decision-log.md`'ye kaydedilir.
