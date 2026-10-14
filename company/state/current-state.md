# Current State — tek canonical güncel durum

> **Tek doğruluk kaynağı** (governance §7). `dashboards/company.md` ve `company/backlog.md` durum kaynağı değildir.
> Güncelleyen: `session-close` (her oturum), Founder kararı alındığı tur. Yürürlükteki kararlar: `active-decisions.md`. Artifact statüleri: `artifact-registry.csv`.

| Alan | Değer |
|---|---|
| Son güncelleme | 2026-10-14 |
| OS sürümü | `os/VERSION` → 2.0.0-stage3 (Stage 1–2 LOCK; Stage 3 tamamlandı, Founder kabulü bekliyor) |
| Çalışma dalı | `os-v2-migration` (yerel; push yok). `main` = `origin/main` = `4659823` (= `pre-v2-checkpoint`) |
| Şirket fazı | Faz 2 — Pilot üretim testi (EXP-001) · **OS v2 migration süresince durdurulmuş** |
| Kanallar | 1 — The Industrial Casebook (`channels/the-industrial-casebook/`; oluşturuldu D-037; yayın yok) |
| Aktif case | VID-001 / P3 NS Savannah (CASE 001) — **DURUYOR** (aşağıda) |

## 1. Şu an ne oluyor
Company OS v2 kernel migration'ı kontrollü aşamalarla ilerliyor (Founder onayı her aşamada ayrı):
| Aşama | Kapsam | Durum |
|---|---|---|
| 0 | Safety snapshot, pre-v2 checkpoint, restore drill, makine dışı yedek | **PASS** (2026-10-14) |
| 1 | Governance kernel: company charter, sınıflar + öncelik, current state, active decisions, artifact lifecycle, git-secrets, testler | **PASS — Founder LOCK** (2026-10-14) |
| 2 | Channel canon (The Industrial Casebook) | **PASS — Founder LOCK** (2026-10-14; D-045) |
| 3 | Creative pipeline (story viability → packaging → beat sheet → script → scene plan → bağımsız creative QA) | **Tamamlandı — Founder kabulü bekliyor** (D-046; P3 kağıt üstü dry-run, bağımsız QA v1/v2) |
| 4 | Factory interface (versiyonlu handoff + Strong PC handshake, asset manifest, rights hard-fail, CCR, production yedek/restore) | Planlı |
| 5 | Calibration (Golden/Anti-reference, CASE INTRO Golden Master) | Planlı |
| 6 | Legacy konsolidasyonu + v2 kabulü | Planlı |
Stage 0 yedeği: `C:\CompanyOS-Backup\pre-v2-2026-10-14\` (Main PC) + Founder'ın Google Drive'ı (`pre-v2-2026-10-14` klasörü; hash doğrulandı). Non-canonical draft: branch `draft/os-v2-phase1-plan` (`7354fb5`).

## 2. Bugün sıradaki iş
**Founder: Stage 3 sonucunu değerlendir ve kabul et (FOUNDER DECISION).** Kabul → Stage 4 (factory interface) için ayrı onay. Bu arada başka iş yok; Strong PC iş almaz.

## 3. Founder kararı / işlemi bekleyenler
| # | Konu | Mod | Not |
|---|---|---|---|
| 1 | Stage 3 kabulü | FOUNDER DECISION | Pipeline + P3 dry-run; isteğe bağlı temiz oturum testi |
| 2 | Stage 2 başlatma onayı | FOUNDER DECISION | Stage 1 kabulünden sonra |
| 3 | Ekim aylık kapanışı (Claude, ChatGPT, ElevenLabs, Adobe fatura tutarları) | GUIDED ACTION | Kasım'ın ilk haftası (`cfo-review` §B) |
| 4 | Kanal Studio doğrulaması C-02…C-12 + kanal adı/handle kaydı | GUIDED ACTION | Yayından önce; acil değil (`intelligence/growth/launch-os/capabilities.md`) |
| 5 | SL-002 kalan 3 uyarlama | FOUNDER DECISION | Ertelendi; v2 pipeline aşamasında yeniden değerlendirilecek |

## 4. Aktif case: VID-001 / P3 NS Savannah
- **Durum: DURUYOR.** OS v2 migration süresince P3 production, render, VO, AI görsel, müzik ve Strong PC işi yok (Founder talimatları 2026-10-14; D-042). P3 dosyaları yeniden yazılmaz.
- Son geçerli case kararları: D-012, D-013 (LIMITED), D-014, D-018, D-030, D-040/D-041 (LIMITED) — `active-decisions.md`.
- Artifact'lar: veri kayıtları (evidence/source/rights ledger, asset manifest, VO kayıtları) `ACTIVE`; yaratıcı plan/handoff'lar `FROZEN`; eski sürümler `SUPERSEDED/HISTORICAL/REJECTED` — `artifact-registry.csv`. **Handoff v3 FROZEN:** v1 formatında; Strong PC'ye ancak v2 handoff olarak yeniden çıkarılınca gider.
- Bekleyen case kararı (OS v2 sonrası): motion prototype (D-041). P3'ün v2 pipeline'a hangi adımdan gireceği o zaman Founder'a önerilecek.
- Hak durumu: V-20 `UNKNOWN_RIGHTS`, V-21 `REJECTED`, 1964 filmi kullanılmaz (D-026) — `VID-001-rights-ledger.csv`.

## 5. Makineler
| Makine | Rol (charter §8) | Durum |
|---|---|---|
| Main PC (WIN-028TMNOG5MJ) | Brain | `os-v2-migration` dalında |
| Strong PC (DESKTOP-KVLH9B2) | Factory | **Beklemede; iş almaz.** Son bilinen: canonical `main`'e eşit (D-039/D-040). Marka fontları kurulu. |
Ayrıntı: `company/machines.md`.

## 6. Bilinen riskler / açıklar
- Production medyası için makine dışı yedek yok (D: + C: aynı makinede) — Stage 4.
- EXP-002 (ElevenLabs v4 kampanyası) 2026-10-12'de süresi doldu; dosyası kapanış notu bekliyor (backlog).
- ElevenLabs mevcut kredilerin onaysız kullanım politikası belirsiz → ses üretimi Founder onaylı (`founder-approval.md`).
- Vergi takibi: TW-R1 sonraki kontrol 2026-11-01 (`finance/tax-watch/thresholds.csv`).

## 7. Finans özeti
Reklam bütçesi 0 · Sabit: Claude Pro, ChatGPT Plus, ElevenLabs Starter (D-015) · Gelir yok · Ayrıntı: `finance/` (ledger'lar tek doğruluk kaynağı).
