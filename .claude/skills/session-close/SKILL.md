---
name: session-close
description: Çalışma oturumunu kapatır; şirket hafızasını, backlog'u ve dashboard'u günceller, yerel commit'i hazırlar. Oturum sonunda veya Founder kapanış istediğinde kullan.
---

# Session Close

## Adımlar
1. **Backlog:** `company/backlog.md` — tamamlananları işaretle, yeni işleri ekle, önceliği güncelle.
2. **Dashboard:** `dashboards/company.md` — faz, ilerleme tablosu, metrikler, finans, onay bekleyenler, riskler, "Son güncelleme" tarihi.
3. **Hedefler:** `company/goals.md` — durum değişikliği varsa.
4. **Kararlar:** Bu oturumda alınan önemli kararlar `company/decision-log.md`'de mi? Değilse ekle.
5. **Öğrenimler:** Kalıcı öğrenim varsa `company/lessons.md`.
6. **Deneyler:** Açık deney dosyaları güncel mi?
6b. **Para ve süre:** Bu oturumda ölçülen servis kullanımı (ör. ses kredisi), yeni fatura/harcama, gelir veya ölçülen Founder/AI süresi oluştuysa `finance/ledgers/` dosyalarına işlendi mi? (`cfo-review` §A; tahmin ve gerçek ayrı). Yeni video fikri veya yayın sonrası veri varsa `intelligence/growth/` güncel mi?
6c. **Kullanım verimliliği:** `finance/efficiency/efficiency-log.md`'ye oturum satırı ekle (iş, subagent kullanımı, ana modelin yaptığı mekanik iş). Founder'ın `/usage` ölçümünü hatırlamasını bekleme: yalnız ölçüme değer bir oturumdan sonra (normal iş oturumu, son ölçümden beri en az 2 oturum geçmiş) kapanış notunda tek işlem olarak iste: "Claude Code'da /usage aç ve Session ile Weekly yüzdelerini bana söyle." Her oturumda isteme. 5–10 ölçümlü oturum birikince `finance/efficiency/README.md` §5 değerlendirmesini yap.
7. **Git:**
   - Secret/credential kontrolü yap (`.claude/rules/git-and-secrets.md`).
   - Shell erişimi varsa anlamlı mesajla **yerel commit** oluştur. Push yapma.
   - Shell erişimi yoksa Founder'a commit için önerilen mesajı ver.
8. **Kapanış notu (≤5 satır):** Ne yapıldı · ne kaydedildi · sıradaki önerilen iş · Founder'dan gereken (push dahil).
