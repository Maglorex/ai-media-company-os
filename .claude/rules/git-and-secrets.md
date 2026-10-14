# Git ve Secret Kuralları

> Katman: **L0 — HARD (security)** · Kapsam: company · Sınıflandırma: `.claude/rules/governance.md`.
> Bu dosya 2026-10-14'e kadar `.gitignore`'daki `*secret*` kalıbı yüzünden hiç Git'e girmemişti (Strong PC almadı). Artık `.gitignore`'da tek ve açık istisna ile takip edilir; `os/tests/integrity.test.mjs` takip edildiğini doğrular (D-042).

## Git
- **Serbest:** Yerel dosya oluşturma/değiştirme, yerel commit — **ancak** Founder'ın o oturumdaki açık kısıtı ("read-only", "implementation yok", "commit alma") her genel yetkinin önündedir (governance §5, L-009).
- **Founder onayı gerekir:** remote push, repo paylaşımı, branch silme, history rewrite, force push, remote repository ayarı değiştirme.
- Push şimdilik Founder tarafından **GitHub Desktop** ile manuel yapılır.
- Commit mesajı: kısa, ne değiştiğini anlatan, Türkçe veya İngilizce (ör. `company: Founder Intake sonuçları işlendi`).
- Birbiriyle ilgisiz değişiklikler mümkünse ayrı commit'lenir.

## Secret'lar
- Secret, API key, password, token veya credential **asla** repository'ye yazılmaz veya commit edilmez.
- Credential'lar `.env` gibi `.gitignore`'daki dosyalarda tutulur; örnek dosya gerekiyorsa `.env.example` (gerçek değer olmadan).
- Commit öncesi kontrol: değişen dosyalarda `key`, `token`, `secret`, `password`, `Bearer`, `sk-` gibi kalıpları tara. Deterministik tarama: `node --test os/tests/` (gerçek anahtar biçimlerini arar; kural metnindeki kelimeler secret sayılmaz).
- Yanlışlıkla commit edilen secret fark edilirse: hemen Founder'a bildir; anahtarın iptal/yenilenmesi önerilir. History rewrite yalnızca Founder onayıyla.
- `.gitignore`'a yeni istisna (`!…`) yalnız tek dosya adıyla ve gerekçe yorumu ile eklenir; geniş istisna (`!.claude/**` gibi) eklenmez.

## Büyük dosyalar
- Render çıktıları, ham ses/video ve `node_modules` commit'lenmez (`.gitignore`).
