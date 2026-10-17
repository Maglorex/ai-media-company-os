# Rule Registry — kural dosyalarının katman ve sınıfı

> `.claude/rules/` altındaki her dosya burada bir kez listelenir (test). Katman türetmesi: `.claude/rules/governance.md` §2.
> Bir dosya birden çok sınıf içeriyorsa "Sınıf" dosyanın bağlayıcı çekirdeğidir; bölüm içi etiketler (`[HARD]`, `[HEURISTIC]`…) o bölüm için geçerlidir.
> "Durum" yalnız artifact yaşam döngüsü statülerinden biridir (governance §6); "Sınıf" yalnız beş sınıftan biri veya `—` (katmanında bağlayıcı kural). Kanal kuralları (The Industrial Casebook) artık kanal canon'undadır (`channels/the-industrial-casebook/canon/`, D-045); buradaki iki kanal dosyası yalnız yükleyicidir. Canon içi kurallar `canon/07-rule-register.md`'de sınıflıdır.

## Kurallar
| Dosya | Kapsam | Sınıf | Katman | Durum | Not |
|---|---|---|---|---|---|
| `.claude/rules/governance.md` | company | — | L1 | ACTIVE | Sınıflar, öncelik, modlar, lifecycle (D-042). HARD değildir (charter §4); L0 HARD kurallarını gevşetemez, kanal/case katmanlarının üstündedir |
| `.claude/rules/founder-approval.md` | company | HARD | L0 | ACTIVE | Founder'ın costly/external/irreversible yetkisi |
| `.claude/rules/evidence-and-research.md` | company | HARD | L0 | ACTIVE | Truth/evidence çekirdeği HARD; etiket kullanım biçimi HEURISTIC (bölüm etiketli) |
| `.claude/rules/git-and-secrets.md` | company | HARD | L0 | ACTIVE | Security; 2026-10-14'ten beri Git'te |
| `.claude/rules/third-party-skill-security.md` | company | HARD | L0 | ACTIVE | Security (D-009) |
| `.claude/rules/self-repair-and-escalation.md` | company | — | L1 | ACTIVE | Prosedür (D-005, D-042); "kendin yapma" listesi `founder-approval.md`'ye bağlı HARD |
| `.claude/rules/company-memory.md` | company | — | L1 | ACTIVE | Prosedür (D-004, D-042); silme yasağı HARD (evidence integrity) |
| `.claude/rules/audio-production.md` | company | — | L1 | ACTIVE | D-022; "Claude dinleyemez" HARD (truth); yalnız `production/**` ve ses skill'lerinde otomatik yüklenir |
| `.claude/rules/documentary-creative-standards.md` | channel:the-industrial-casebook | — | L2 | ACTIVE | Canon yükleyicisi (D-045): yaratıcı iş öncesi `channels/the-industrial-casebook/canon/README.md`; v1 metni git geçmişinde |
| `.claude/rules/brand-and-visual-system.md` | channel:the-industrial-casebook | — | L2 | ACTIVE | Canon yükleyicisi (D-045): görsel anlatım canon `04`, film dili `05`, kimlik `brand-system-v1.md`; v1 metni git geçmişinde |
