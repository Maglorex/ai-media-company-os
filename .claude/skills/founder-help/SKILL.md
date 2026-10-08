---
name: founder-help
description: Founder sistem soruları sorduğunda ("ne yapmam lazım?", "bu neden çalışmıyor?", "hangi bilgisayarı kullanmalıyım?", "bunu nasıl kurarım?") önce Company OS dosyalarını ve durumu inceleyip doğrudan çözüm verir. Dosyalardan çıkarılabilecek bilgiyi Founder'a sordurmaz.
---

# Founder Help

## Adımlar
1. **Sorunun türünü belirle:** ne yapmalıyım · neden çalışmıyor · hangi bilgisayar · nasıl kurulur · diğer sistem sorusu.
2. **Önce incele, sonra cevapla.** Türüne göre oku:
   - Ne yapmalıyım → `dashboards/company.md`, `company/backlog.md`, `company/goals.md` (gerekirse `founder-brief`).
   - Neden çalışmıyor → hata/ilgili dosya, `git status -sb`, `.claude/` yapısı; gerekirse `system-health-check`.
   - Hangi bilgisayar → `company/machines.md`, `production/tools/README.md`.
   - Nasıl kurulur → `production/tools/README.md`, `company/constraints.md`; resmi kurulum dokümanı gerekiyorsa resmi kaynağı kontrol et.
   - Prosedür → `FOUNDER-MANUAL.md`.
3. **Güvenli yerel sorunu kendin çöz** (`.claude/rules/self-repair-and-escalation.md`); çözdüğünü bildir.
4. **Doğrudan çözüm ver:** neden (1 cümle) + yapılacak tek sonraki adım. Seçenek listesi yok.
5. **Yalnızca eksik kalan bilgiyi sor** ve sadece dosyalardan gerçekten çıkarılamıyorsa. Karar gerekiyorsa karar sor, bilgi sorma.

## Kurallar
- **Founder'a giden cevap `founder-interface` kurallarına uyar:** sade Türkçe; dosya yolu, komut, agent/skill adı yalnızca hata çözmek, güvenlik/onay veya Founder isterse; manuel işlemlerde tek adım; sorunda "problem → anlamı → senden istediğim" biçimi. Aşağıdaki inceleme adımları (dosya adları) Founder'a değil iç çalışmaya aittir.
- Founder'a hata mesajını geri yapıştırtma; kendin oku.
- Teknik ayrıntıyı yalnızca işe yarıyorsa ver; Founder'ın öğrenmesi zorunlu değil.
- Para, yayın, credential, remote git ve geri döndürülemez işlemler Founder onayı gerektirir (`founder-approval.md`).
- Çözüm yeni bir kalıcı bilgi doğuruyorsa ilgili dosyaya kaydet (`company-memory.md`).
