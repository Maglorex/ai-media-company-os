# Makineler

> Tek doğruluk kaynağı: hangi bilgisayar hangi iş için. Donanım ayrıntısı/araç envanteri: `production/tools/README.md`. Güncelleme: `machine-onboarding` skill'i.

## Kayıt
| Makine | Özellik | Rol | Durum | Son doğrulama |
|---|---|---|---|---|
| Operasyon bilgisayarı (hostname: WIN-028TMNOG5MJ) | Windows 10 Pro; donanım kaydedilmedi | Claude Code oturumları (COO), araştırma, yazım, analiz, şirket dosyaları | Aktif | 2026-10-06 |
| Render bilgisayarı | Kayıtlı (doğrulanmadı): Ryzen 5 5600, 16 GB RAM, RX 580 8 GB; Adobe CC Pro (Founder beyanı) | **Ana production/render makinesi** (D-017): Premiere/Media Encoder/Photoshop, Remotion, büyük medya yerel üretim klasörü | Onboarding başladı (2026-10-08) | — |

## Çalışma düzeni
- Kaynak: GitHub reposu `Maglorex/ai-media-company-os` (`main`). Senkron GitHub Desktop ile Founder tarafından yapılır.
- Bir makinede çalışmaya başlamadan önce **Fetch/Pull**; bitirince **commit + Push**. Aynı anda iki makinede çalışılmaz.
- Büyük medya ve render çıktıları repoya girmez (`.gitignore`); makineler arası taşıma gerekirse yerel/harici depolama kullanılır.
- Secret'lar her makinede yerel `.env` ile tutulur; repoda yoktur.

## Notlar
- Render makinesi için NVENC yok; AMD AMF veya CPU kodlaması test edilecek (bkz. `production/tools/README.md`).
- Makine rolü değişirse bu tablo güncellenir; önemli değişiklik `decision-log.md`'ye işlenir.
