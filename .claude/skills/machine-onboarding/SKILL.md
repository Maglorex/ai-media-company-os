---
name: machine-onboarding
description: Yeni bir bilgisayarı Company OS'a bağlar. Founder'a yalnızca gerekli adımları sırayla söyler ve makinenin rolünü company/machines.md'ye kaydeder. Yeni/ek bilgisayar kullanılacağında veya makine rolü değiştiğinde kullan.
---

# Machine Onboarding

Uygulayıcı: `systems-operator`. Amaç: yeni makinede Founder'ın mümkün olan en az adımla çalışır duruma gelmesi.

## Adımlar
1. **Oku:** `company/machines.md`, `production/tools/README.md`, `company/constraints.md`. Makinenin rolü, özellikleri veya ihtiyaç duyduğu araçlar bu dosyalarda varsa Founder'a sorma. Yalnızca dosyalarda olmayan bilgiyi sor: makinenin adı ve ne için kullanılacağı.
2. **Rolü belirle:** Makine hangi iş için? (Operasyon/COO oturumu, render/kurgu, yedek.) Tek makine tek ana rol.
3. **Founder'a adımları ver (yalnızca gerekenler, numaralı, kısa):**
   - GitHub Desktop kur ve giriş yap → repoyu `Maglorex/ai-media-company-os` klonla.
   - Claude Code/Claude uygulamasında klonlanan klasörü aç.
   - Role göre ek kurulum: render makinesi için FFmpeg (ücretsiz); Node.js yalnızca Remotion'a geçilirse. Ücretli yazılım gerekiyorsa `FOUNDER-MANUAL.md` "yeni yazılım" sürecine yönlendir.
   - Secret/API key'ler repoda gelmez: gerekiyorsa makinede yerel `.env` oluşturulur (içeriği Founder girer; Claude görmez, repoya yazmaz).
4. **Doğrula:** Yeni makinede `system-health-check` çalıştır; sonucu `company/machines.md`'ye işle.
5. **Kaydet:** `company/machines.md` tablosuna makineyi ekle/güncelle (ad, özellik, rol, durum, son doğrulama tarihi). Önemli rol değişikliği `decision-log.md`'ye.
6. **Senkron düzenini hatırlat (1 satır):** Çalışmaya başlamadan önce GitHub Desktop'ta **Fetch/Pull**, bitirince **commit + Push**; aynı anda iki makinede çalışma.

## Kurallar
- Founder'a teknik ayrıntı yığma; yalnızca insanın yapması gereken adımları söyle.
- Giriş yapma, yazılım indirip kurma, hesap/ödeme işlemlerini Claude yapmaz; Founder yapar.
- Para harcanacak her şey Founder onayı gerektirir.
