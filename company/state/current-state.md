# Current State — tek canonical güncel durum

> **Tek doğruluk kaynağı** (governance §7). `dashboards/company.md` ve `company/backlog.md` durum kaynağı değildir.
> Güncelleyen: `session-close` (her oturum), Founder kararı alındığı tur. Yürürlükteki kararlar: `active-decisions.md`. Artifact statüleri: `artifact-registry.csv`.

| Alan | Değer |
|---|---|
| Son güncelleme | 2026-10-15 |
| OS sürümü | `os/VERSION` → 2.0.0-stage5 (Stage 1–4 LOCK; Stage 5 kalibrasyon tasarımı hazır, production başlamadı) |
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
| 3 | Creative pipeline (story viability → packaging → beat sheet → script → scene plan → bağımsız creative QA) | **PASS — Founder LOCK** (2026-10-15; D-046; clean-room kabul testi PASS) |
| 4 | Factory interface (versiyonlu handoff + Strong PC handshake, asset manifest, rights hard-fail, CCR, production yedek/restore) | **PASS — Founder LOCK** (2026-10-15; D-047; Strong PC factory kabulü + portability düzeltmesi) |
| 5 | Calibration (Golden/Anti-reference, CASE INTRO Golden Master) | **Production önkoşulları** (D-048 onaylı: render + ≤150 kredi). Case `channels/the-industrial-casebook/cases/CAL-S5/`; render başlamadı; GOLDEN yok |
| 6 | Legacy konsolidasyonu + v2 kabulü | Planlı |
Stage 0 yedeği: `C:\CompanyOS-Backup\pre-v2-2026-10-14\` (Main PC) + Founder'ın Google Drive'ı (`pre-v2-2026-10-14` klasörü; hash doğrulandı). Non-canonical draft: branch `draft/os-v2-phase1-plan` (`7354fb5`).

## 2. Bugün sıradaki iş
**Founder: CAL-S5 müzik yatağı için tek GUIDED ACTION — YouTube Audio Library'den en fazla 3 parça indir, Strong PC'de `D:/CompanyOS-Production/CAL-S5/04_music/` klasörüne kaydet.** Ardından push + Strong PC gözlem turu (salt-okunur) → Main PC hash'leri işler → Handoff v2 ISSUED.

## 3. Founder kararı / işlemi bekleyenler
| # | Konu | Mod | Not |
|---|---|---|---|
| 1 | CAL-S5 müzik yatağı (Audio Library ≤3 parça → Strong PC `04_music`) | GUIDED ACTION | Render + ≤150 kredi onaylandı (D-048) |
| 2 | Stage 5 Golden Lock | FOUNDER DECISION | Preview paketi izlendikten sonra; onaysız GOLDEN yok |
| 3 | Ekim aylık kapanışı (Claude, ChatGPT, ElevenLabs, Adobe fatura tutarları) | GUIDED ACTION | Kasım'ın ilk haftası (`cfo-review` §B) |
| 4 | Kanal Studio doğrulaması C-02…C-12 + kanal adı/handle kaydı | GUIDED ACTION | Yayından önce; acil değil (`intelligence/growth/launch-os/capabilities.md`) |
| 5 | SL-002 kalan 3 uyarlama | FOUNDER DECISION | Ertelendi; v2 pipeline aşamasında yeniden değerlendirilecek |

## 4. Aktif case: VID-001 / P3 NS Savannah
- **Durum: DURUYOR.** OS v2 migration süresince P3 production, render, VO, AI görsel, müzik ve Strong PC işi yok (Founder talimatları 2026-10-14; D-042). P3 dosyaları yeniden yazılmaz.
- Son geçerli case kararları: D-012, D-013 (LIMITED), D-014, D-018, D-030, D-040/D-041 (LIMITED) — `active-decisions.md`.
- Artifact'lar: veri kayıtları (evidence/source/rights ledger, asset manifest, VO kayıtları) `ACTIVE`; yaratıcı plan/handoff'lar `FROZEN`; eski sürümler `SUPERSEDED/HISTORICAL/REJECTED` — `artifact-registry.csv`. **Handoff v3 FROZEN:** v1 formatında; Strong PC'ye ancak v2 handoff olarak yeniden çıkarılınca gider.
- Bekleyen case kararı (OS v2 sonrası): motion prototype (D-041). P3'ün v2 pipeline'a hangi adımdan gireceği o zaman Founder'a önerilecek.
- Hak durumu: V-20 `UNKNOWN_RIGHTS`, V-21 `REJECTED`, 1964 filmi kullanılmaz (D-026) — `VID-001-rights-ledger.csv`. V-21 legacy `production/remotion/src/videos/p3/` kompozisyonlarında hâlâ referanslı; handoff v2 bu yolu yasaklar ve tarama her raporda listeler.
- **Handoff v2 dry-run (D-047): BLOCKED** — `channels/the-industrial-casebook/cases/VID-001/handoff/07-production-handoff-v1.md`: scene plan v2 DRAFT, bağımsız QA v2 REVISE, 13 harici asset için rights ledger satırı yok (DF-6), tam SHA-256'lar kayıtlı değil. Tek production manifest: `handoff/asset-manifest.csv`.

## 5. Makineler
| Makine | Rol (charter §8) | Durum |
|---|---|---|
| Main PC (WIN-028TMNOG5MJ) | Brain | `os-v2-migration` dalında |
| Strong PC (DESKTOP-KVLH9B2) | Factory | **Beklemede; production işi almaz.** Stage 4 için yalnız boot contract self-test'i (render yok). Son bilinen: canonical `main`'e eşit (D-039/D-040). Marka fontları kurulu. |
Ayrıntı: `company/machines.md`.

## 6. Bilinen riskler / açıklar
- Production medyası için makine dışı yedek yok (D: + C: aynı makinede). Stage 4 ile yalnız bu PC'de olan dosyalar tespit edilebiliyor (`factory.mjs backup`); makine dışı yedek kararı hâlâ açık.
- EXP-002 (ElevenLabs v4 kampanyası) 2026-10-12'de süresi doldu; dosyası kapanış notu bekliyor (backlog).
- ElevenLabs mevcut kredilerin onaysız kullanım politikası belirsiz → ses üretimi Founder onaylı (`founder-approval.md`).
- Vergi takibi: TW-R1 sonraki kontrol 2026-11-01 (`finance/tax-watch/thresholds.csv`).

## 7. Finans özeti
Reklam bütçesi 0 · Sabit: Claude Pro, ChatGPT Plus, ElevenLabs Starter (D-015) · Gelir yok · Ayrıntı: `finance/` (ledger'lar tek doğruluk kaynağı).
