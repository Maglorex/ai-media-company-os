---
name: system-health-check
description: Company OS sağlık kontrolü. Dosya yapısı, agent/skill/rule bütünlüğü, git durumu ve secret riskini denetler; güvenli sorunları düzeltir. Oturum başında şüphe varsa, makine değişiminden sonra veya Founder "sistem bozuk mu?" dediğinde kullan.
---

# System Health Check

Uygulayıcı: `systems-operator` (veya COO doğrudan). Kural: `.claude/rules/self-repair-and-escalation.md`. Yalnızca salt-okunur kontrol + güvenli yerel düzeltme; remote işlem yok.
Mekanik taramalar (1–3, 5, 7, 8: var/yok, frontmatter envanteri, referans kontrolü, secret-kalıp, numara sırası) tek görevde `company-file-scanner`'a verilebilir; çelişki değerlendirmesi (4), düzeltme ve durum kararı COO/`systems-operator`'da kalır. Secret eşleşmesinin gerçek secret olup olmadığına scanner değil COO karar verir.

## 0. Deterministik testler (önce bunlar — D-042)
`node --test "os/tests/*.test.mjs"` (Node yerleşik test koşucusu; paket yok; Main PC ve Strong PC'de aynı). Kapsam: kernel dosyaları, `.claude/**`'un Git'te takip edilmesi (ör. `git-and-secrets.md`), frontmatter, referanslar, ID sırası, secret biçim taraması, current-state tekliği, active-decisions ↔ decision-log tutarlılığı, katman türetmesi, artifact registry (statü, yol, `superseded_by`), öncelik çözücüsü ve yukarı-yükselme yasağı, migration allowlist. Git PATH'te olmasa da GitHub Desktop'un gömülü git'i otomatik bulunur (`os/lib/gitbin.mjs`). Main PC'de ayrıca tarihsel yerel ref kontrolü: `node --test "os/tests/main-pc/*.test.mjs"` (Strong PC/yeni clone'da çalıştırılmaz). FAIL = durum **Bozuk** veya **Dikkat**; aşağıdaki manuel kontroller testlerin kapsamadığı yorum gerektiren kısımlar içindir.
Ölçüler (context boyutu, dosya/skill sayısı) yalnız **DIAGNOSTIC** olarak raporlanabilir; hedef veya FAIL nedeni değildir.

## Kontroller
1. **Çekirdek dosyalar var mı:** `CLAUDE.md`, `company/charter.md`, `company/state/{current-state.md,active-decisions.md,rule-registry.md,artifact-registry.csv}`, `.claude/rules/governance.md`, `company/{mission,strategy,constraints,goals,backlog,decision-log,lessons,machines}.md`, `intelligence/`, `channels/`, `production/tools/README.md`, `FOUNDER-MANUAL.md`. (`dashboards/company.md` SUPERSEDED; durum kaynağı değil.)
2. **Agent'lar** (`.claude/agents/*.md`): frontmatter'da `name` (dosya adıyla aynı), `description`, `tools` var mı; referans verdiği dosyalar mevcut mu.
3. **Skill'ler** (`.claude/skills/*/SKILL.md`): klasör adı = `name`; `description` dolu; referans verdiği dosyalar mevcut mu.
4. **Rule'lar** (`.claude/rules/*.md`): okunabilir, boş değil; birbiriyle ve `CLAUDE.md` ile çelişmiyor (özellikle onay, git, secret).
5. **`CLAUDE.md` tutarlılığı:** listelenen agent/skill/rule gerçek dosyalarla eşleşiyor mu.
6. **Git:** `git status -sb` (commit edilmemiş değişiklik, ahead/behind), `git remote -v`, `git log -3`. Kontrol için `git fetch` yapma; remote ile farkı yalnızca yerel bilgiyle raporla, gerekirse Founder'a GitHub Desktop'ta Fetch öner.
7. **Secret:** değişen/takip edilen dosyalarda `key`, `token`, `secret`, `password`, `Bearer`, `sk-` taraması; `.gitignore` kapsamı (`.env`, `*.key`, `*.pem`, `*secret*`…). Eşleşmeleri bağlamıyla değerlendir (kural metni ≠ secret). Değer asla gösterilmez.
8. **Hafıza düzeni:** `D-`, `L-`, `EXP-`, `H-`, `G-` numaralandırması sıralı ve tekrarsız mı; `company/state/current-state.md` "Son güncelleme" tarihi güncel mi (testler: tek durum kaynağı, active-decisions ↔ decision-log).
8b. **Launch OS durumu (D-036):** `intelligence/growth/launch-os/capabilities.md` — kanal maddeleri `NEEDS_VERIFICATION` / `BLOCKED_BY_DATA` (veya kanal yokken `BLOCKED_BY_FUTURE_SETUP`) ise **hata sayılmaz**; raporda ayrı satır ("Kanal doğrulaması bekleyen: N madde"). SYSTEM READY yalnız sistem dosyalarına (kurallar, şablonlar, kapılar, çapraz referanslar) bakar.
9. **Makine kayıtları:** `company/machines.md` mevcut ve `production/tools/README.md` donanım tablosuyla tutarlı mı.

## Düzeltme
- Güvenli ve geri alınabilir yerel sorunları (eksik referans, tutarsız metin, `.gitignore` boşluğu) düzelt; raporda belirt.
- Düzeltemediğini veya onay gerektireni eskalasyon kuralına göre tek çözüm önerisiyle raporla.
- Sistem kontrolü sırasında commit/push yapma; commit `session-close` ile veya Founder isteğiyle.

## Çıktı (≤10 satır)
```
**System Health — YYYY-MM-DD**
Durum: Sağlıklı / Dikkat / Bozuk
Kontrol: [N/9 geçti]
Düzeltilenler: [yoksa "yok"]
Açık sorunlar: [sorun → önerilen tek çözüm; yoksa "yok"]
Kanal doğrulaması bekleyen (NEEDS_VERIFICATION / BLOCKED_BY_DATA): [N madde; hata değil]
Founder'dan gereken: [yoksa "yok"]
```
