---
name: session-close
description: Çalışma oturumunu kapatır; şirket hafızasını, tek güncel durumu (current-state), aktif kararları, artifact kaydını ve backlog'u günceller, testleri çalıştırır, yerel commit'i hazırlar. Oturum sonunda veya Founder kapanış istediğinde kullan.
---

# Session Close

## Adımlar
1. **Backlog:** `company/backlog.md` — tamamlananları işaretle, yeni işleri ekle, önceliği güncelle. Backlog durum kaynağı değildir.
2. **Current State (tek güncel durum):** `company/state/current-state.md` — son güncelleme tarihi, OS sürümü/dal, faz, aktif case durumu, **"Bugün sıradaki iş"**, bekleyen Founder kararları (modlarıyla), makine durumu, riskler. `dashboards/company.md` güncellenmez (SUPERSEDED, D-042).
2a. **Active Decisions:** bu oturumda alınan/daraltılan her D- kararı `company/state/active-decisions.md`'de (tür, kapsam, sınıf, katman, durum, sınır). Geçersiz kalan karar "Aktif olmayan" bölümüne.
2b. **Artifact registry:** yeni/yeni sürüm case veya kanal dosyası `company/state/artifact-registry.csv`'de mi; eski sürüm `SUPERSEDED` + `superseded_by` mi?
3. **Hedefler:** `company/goals.md` — durum değişikliği varsa.
4. **Kararlar:** Bu oturumda alınan önemli kararlar `company/decision-log.md`'de mi? Değilse ekle.
5. **Öğrenimler:** Kalıcı öğrenim varsa `company/lessons.md`.
6. **Deneyler:** Açık deney dosyaları güncel mi?
6a. **Launch (D-035):** yayına yaklaşan videonun Launch Package / `pre-publish-qa` durumu ve `intelligence/growth/launch-os/capabilities.md` güncel mi?
6b. **Para ve süre:** Bu oturumda ölçülen servis kullanımı (ör. ses kredisi), yeni fatura/harcama, gelir veya ölçülen Founder/AI süresi oluştuysa `finance/ledgers/` dosyalarına işlendi mi? (`cfo-review` §A; tahmin ve gerçek ayrı). Yeni video fikri veya yayın sonrası veri varsa `intelligence/growth/` güncel mi?
6c. **Kullanım verimliliği:** `finance/efficiency/efficiency-log.md`'ye oturum satırı ekle (iş, subagent kullanımı, ana modelin yaptığı mekanik iş). Founder'ın `/usage` ölçümünü hatırlamasını bekleme: yalnız ölçüme değer bir oturumdan sonra (normal iş oturumu, son ölçümden beri en az 2 oturum geçmiş) kapanış notunda tek işlem olarak iste: "Claude Code'da /usage aç ve Session ile Weekly yüzdelerini bana söyle." Her oturumda isteme. 5–10 ölçümlü oturum birikince `finance/efficiency/README.md` §5 değerlendirmesini yap.
7. **Git:**
   - Founder bu oturum için "read-only / commit alma" dediyse commit **yok**; yalnız önerilen mesaj verilir (governance §5).
   - Deterministik testleri çalıştır: `node --test os/tests/` — FAIL varsa commit'ten önce düzelt veya kapanış notunda açıkça yaz.
   - Secret/credential kontrolü yap (`.claude/rules/git-and-secrets.md`).
   - Shell erişimi varsa anlamlı mesajla **yerel commit** oluştur. Push yapma.
   - Shell erişimi yoksa Founder'a commit için önerilen mesajı ver.
8. **Kapanış notu (≤5 satır):** Ne yapıldı · ne kaydedildi · sıradaki önerilen iş · Founder'dan gereken (push dahil).
