# Factory Interface — Main PC → Strong PC (Stage 4, D-047)

> Katman: **L1** şirket prosedürü (makineler şirket katmanıdır, charter §8). Kanal yaratıcı içeriği burada yoktur: sahne, görsel fikir ve araç Production Scene Plan'dedir (L2 kanal pipeline'ı, D-046); kanal kuralları canon'dadır (D-045).
> HARD dayanaklar: Founder'ın costly/external/irreversible yetkisi (`.claude/rules/founder-approval.md`), haklar (`production/rights/README.md`), kanıt dürüstlüğü (`.claude/rules/evidence-and-research.md`), üreten taraf kendi işine final creative PASS veremez (charter §9).
> Kod: `os/lib/factory.mjs` · CLI: `os/factory/factory.mjs` · Fixture/simülasyon: `os/factory/fixtures.mjs` · Testler: `os/tests/factory.test.mjs`.

Amaç: onaylanmış Production Scene Plan'i Strong PC'ye **yanlış sürüm, eksik asset, çözümsüz hak, eski handoff, stale canon veya gizli yaratıcı değişiklik olmadan** teslim etmek. Uyuşmazlıkta production başlamaz; Strong PC fallback uydurmaz.

## 1. Akış
| # | Nerede | Ne | Komut | Sonuç |
|---|---|---|---|---|
| 1 | Main PC | Asset manifest + rights ledger + ACTIVE scene plan + bağımsız QA PASS hazır, commit'li | — | — |
| 2 | Main PC | Handoff **üretilir** (elle yazılmaz) | `node os/factory/factory.mjs issue …` | `ISSUED` (registry `ACTIVE`) veya `BLOCKED` (registry `DRAFT`; Strong PC'ye gitmez) |
| 3 | Main PC → GitHub | Commit; push **Founder** (GitHub Desktop; GUIDED ACTION) | — | — |
| 4 | Strong PC | Pull, sonra **boot contract** | `node os/factory/factory.mjs preflight --handoff <yol> --expect <ID>@v<N>` | Yalnız `READY_FOR_PRODUCTION` üretime izin verir |
| 5 | Strong PC | Kapsam içinde üretim; yaratıcı sorun → **CCR** (§5) | — | — |
| 6 | Strong PC | Teslim raporu = **technical QA** (§6); `lint delivery` | `node os/factory/factory.mjs lint delivery <rapor> --manifest <manifest>` | Technical PASS/FAIL; Creative QA `PENDING_INDEPENDENT` |
| 7 | Main PC | Bağımsız Creative QA (render üzerinde) | `creative-qa` / `creative-qa-evaluator` | PASS / REVISE / BLOCKED |

## 2. Handoff v2 — ince, sürümlü, sabitlenmiş
Dosya: `channels/<kanal>/cases/<VID>/handoff/07-production-handoff-vN.md`; içinde tek bir ```` ```json handoff-contract ```` bloğu (anahtarlar `os/lib/factory.mjs` `CONTRACT_KEYS`):
- `os_version` + `current_state` (yol + blob) · `canon` (kanal canon dosyaları, her biri yol + blob) · `case`, `channel`, `scope`
- `repo`: `origin`, `root_commit`, `branch`, `required_commit`
- `scene_plan` (artifact ID, sürüm, yol + blob) · `creative_qa` · `asset_manifest` · `rights_ledger` · `evidence_ledger` (hepsi yol + blob)
- `production_root` (Strong PC'deki medya klasörü; `company/machines.md`) · `required_assets`
- `allowed_code_paths` / `forbidden_code_paths` (legacy kompozisyonlar yasak yolda)
- `allowed_actions` / `forbidden_actions` (sabit sözlük; temel yasaklar her handoff'ta) · `approvals` (render, VO kredisi, ücretli asset, AI üretimi: `APPROVED` / `NOT_APPROVED` / `NOT_NEEDED`)
- `founder_actions` (yalnız GUIDED_ACTION: adım · hazır komut/prompt · tam yol · beklenen sonuç; veya FOUNDER_DECISION: para/yayın/dış/geri dönüşsüz/strateji/taste)
- `blockers`, `status` (`ISSUED` / `BLOCKED`), `next_gate`
Kurallar (lint `lintHandoff`): bilinmeyen içerik alanı yok (doctrine, görsel dil, kural metni **kopyalanmaz** — canon'dan 12 kelimelik örtüşme reddedilir); `ISSUED` yalnız açık engel yokken; render yalnız `approvals.render = APPROVED` ile; Founder'a araç/branch/klasör sorusu yok. Eski handoff'lar (v1 formatı, ör. P3 v3) **inherit edilmez**: `not_inherited` alanında listelenir ve preflight onları `BLOCKED_BY_VERSION_MISMATCH` ile reddeder.

## 3. Strong PC boot contract (`preflight`)
Production başlamadan otomatik doğrulanır; atlama/zorlama seçeneği yoktur:
| Kontrol | Uyuşmazlıkta |
|---|---|
| v2 sözleşmesi mi, beklenen ID/sürüm mü (`--expect`) | `BLOCKED_BY_VERSION_MISMATCH` |
| Doğru repo (origin + root commit) · doğru branch | `BLOCKED_BY_VERSION_MISMATCH` |
| Doğru commit: `required_commit` HEAD'in atası; sonrasında yalnız handoff dosyası, registry, current-state, `ccr/` değişmiş | `BLOCKED_BY_VERSION_MISMATCH` ("re-issue") |
| Çalışma ağacı temiz · `os/VERSION` aynı | `BLOCKED_BY_VERSION_MISMATCH` |
| Handoff registry'de `ACTIVE` ve aynı sürüm (eski/superseded handoff yok) | `BLOCKED_BY_VERSION_MISMATCH` |
| Sabitlenmiş canon/scene plan/QA/manifest/ledger HEAD'de aynı blob | eksik → `BLOCKED_BY_CANONICAL_GAP`; değişmiş → `BLOCKED_BY_VERSION_MISMATCH` |
| Gate yeniden hesaplanır (handoff'taki `ISSUED` yazısına güvenilmez): ACTIVE scene plan, bağımsız QA PASS, readiness, manifest, haklar, kod taraması | `BLOCKED_BY_CANONICAL_GAP` / `BLOCKED_BY_RIGHTS` / `BLOCKED_BY_ASSET` |
| Gerekli asset diskte · SHA-256 · boyut/süre | `BLOCKED_BY_ASSET` |
| Bu handoff için açık CCR | `CCR_REQUIRED`; onaylı CCR → yeni handoff sürümü gerekir (`BLOCKED_BY_VERSION_MISMATCH`) |
Birden çok engel varsa birincil durum sırası: VERSION → CANONICAL_GAP → RIGHTS → ASSET → CCR; hepsi listelenir. Preflight dosya değiştirmez; gözlenen hash/boyutları raporlar (Main PC manifest'e işler). Git PATH'te yoksa GitHub Desktop'un gömülü git'i bulunur.

## 4. Asset manifest ve rights hard-fail
Dosya: `channels/<kanal>/cases/<VID>/handoff/asset-manifest.csv` — production asset'leri için **tek** manifest (sütunlar `MANIFEST_COLUMNS`):
`asset_id` (V-/AI-/OG-) · `use` (`REQUIRED` / `OPTIONAL` / `QUARANTINED`) · `scenes` · `role` (`EVIDENCE_ANCHOR` / `PRESENTATION_VISUAL` / `BOTH`) · `origin` (`external` / `own` / `ai`) · `readiness` (Stage 3 sözlüğü) · `expected_path` (production_root'a göre) · `sha256` (tam 64 hex; önek hash kontrolü değildir) · `width`/`height` · `duration_s` · `rights_ref` (rights ledger satırı; bizim grafik için `own`) · `provenance` · `disclosure` (AI için zorunlu) · `recoverability` · `backup_ref` · `notes`.
- **Stage 3 mantığı korunur:** yaratıcı planlamada `NEEDS_SOURCE` / `NEEDS_RIGHTS` serbesttir; handoff'ta `REQUIRED` asset `NEEDS_SOURCE` / `NEEDS_RIGHTS` / `MISSING` ise HARD STOP.
- **Strong PC'ye geçemez:** `REJECTED` hak · çözülmemiş (`UNKNOWN_RIGHTS` / `UNRESOLVED_RIGHTS`, `manual_review_needed: yes`, kanıtsız, ticari kullanım doğrulanmamış) gerekli hak · rights ledger'da olmayan harici/AI asset · eksik gerekli asset. **Kredi/atıf hak değildir.**
- **Legacy kompozisyon taraması:** izinli kod yollarında manifest dışı veya hakkı temiz olmayan asset ID'si → `BLOCKED_BY_RIGHTS`; yasak (legacy) yoldan import → `BLOCKED_BY_VERSION_MISMATCH`; yasak yollardaki kirlilik (ör. `production/remotion/src/videos/p3/Animatic.tsx` → V-21 `REJECTED`) her raporda listelenir.
- `QUARANTINED` satır kayıttır, kullanım değildir; ledger'da temiz görünüyorsa kayıt hatası sayılır.

## 5. Creative Change Request (CCR)
Strong PC uygulama sırasında yaratıcı sorun görürse (sahne teknik olarak uygulanamıyor · sahne çalışmıyor · gerekli görsel mümkün değil · timing/story sorunu) **sessizce değiştirmez**; o sahnede durur ve `channels/<kanal>/cases/<VID>/ccr/CCR-NNN.md` yazar (şablon: `.claude/skills/strong-pc-preflight/CCR-TEMPLATE.md`; lint `lintCCR`):
`CCR · Handoff (ID@vN) · Scene (SP-NN) · Category (TECHNICAL_INFEASIBLE / SCENE_NOT_WORKING / VISUAL_UNAVAILABLE / TIMING_STORY) · Problem · Why the current plan fails · Proposed change · Truth / evidence impact (none veya ledger satırları) · Cost / time impact · Raised by · Status (OPEN) · Decision by (pending)`.
- Karar **Main PC creative authority**'dedir (COO; büyük yaratıcı yön → `documentary-creative-director`); Strong PC karar vermez, doctrine yazmaz. Truth etkisi evidence ledger'dan geçer; para doğuran değişiklik Founder kararıdır.
- Açık CCR → preflight `CCR_REQUIRED`. Onaylanan CCR scene plan'e işlenir ve handoff yeni sürümle yeniden üretilir.
- Mikro teknik ayar (kadraj, crop, timing ±, easing, renk eşleme, şablon düzeltmesi, katman sırası, export ayarı) CCR gerektirmez; teslim raporunda `MICRO — …` olarak yazılır. Hikâye, iddia, yapı, asset değişikliği mikro değildir.

## 6. Technical QA sahipliği (teslim raporu)
Strong PC kontrol eder: **Version · Assets · Rights · Render validity · Missing files/frames · Captions · Measurable audio · Resolution · Technical delivery · Backup** (her biri PASS / FAIL / N/A + kanıt) ve `Technical verdict`. Rapor ayrıca her sahneyi (`AS_PLANNED` / `MICRO — …` / `CCR-NNN APPROVED`), kullanılan asset'leri (yalnız manifest'te `REQUIRED` olanlar) ve araç değişikliklerini (gerekçe + `intent: preserved | reduced`) listeler. **Final creative PASS veremez:** `Creative QA: PENDING_INDEPENDENT` zorunludur; creative karar Stage 3 bağımsız değerlendiricisindedir (`creative-qa`). Şablon: `.claude/skills/strong-pc-preflight/DELIVERY-TEMPLATE.md`.

## 7. Üretim karmaşıklığı
Araç scene plan'de sahneden sonra seçilmiştir (pipeline §4). Strong PC: sahnenin yaratıcı amacını kolaylık için düşüremez (`intent: reduced` → onaylı CCR şart) ve gereksiz karmaşıklık yaratmaz (3D/AI'a yükseltme yalnız `reason: scene need` veya `accuracy` ile). Daha pahalı yöntem kendiliğinden daha iyi değildir.

## 8. Yedek / kurtarılabilirlik
`recoverability`: `IN_GIT` · `REDOWNLOADABLE` (kaynak URL/PDF + tam hash) · `BACKED_UP` · `LOCAL_ONLY` (yalnız bu PC'de; kaybolursa geri gelmez) · `NOT_YET_PRODUCED`.
`node os/factory/factory.mjs backup --production-root <dir> --backup-root <dir> [--manifest <yol>] [--require-protected]` production klasöründeki **her** dosyayı sınıflar: PROTECTED (yedekte aynı hash) · REDOWNLOADABLE · IN_GIT · **UNPROTECTED** (yalnız bu PC'de). Eski/yanlış yedek kopyası (farklı hash) koruma sayılmaz. Mevcut kopyalama betiği `production/tools/backup/backup-production.ps1` (D: → C:, aynı makine) yerinde kalır; makine dışı yedek kararı açıktır (`company/state/current-state.md` §6). Teslim raporunun `Backup` alanı üretilen `LOCAL_ONLY` dosyaların doğrulanmış kopyasını ister.

## 9. Founder rehberliği (governance §4)
Founder'a sorulmaz: hangi branch · hangi araç · hangi klasör · AE mi Blender mı · hangi commit · asset dosya adı. Bunlar handoff'ta ve scene plan'de çözülür.
- **GUIDED ACTION** (fiziksel işlem): tek adım · hazır komut/prompt · tam yol · beklenen sonuç (ör. GitHub Desktop'ta push; Strong PC'de Claude Code'u açıp hazır prompt'u yapıştırmak).
- **FOUNDER DECISION:** para (VO kredisi, ücretli asset), yayın, dış servis, geri dönüşsüz işlem, render onayı.

## 10. Kabul — reddedilen davranışlar
| Kötü davranış | Sonuç | Nerede yakalanır |
|---|---|---|
| Commit biraz farklı ama devam edelim. | REJECT | preflight `commit` / `commit-drift` → `BLOCKED_BY_VERSION_MISMATCH`; CLI'da atlama seçeneği yok |
| Rights sonra çözülür. | REJECT | gate + preflight yeniden hesap → `BLOCKED_BY_RIGHTS` (elle `ISSUED` yazılmış handoff dahil) |
| Asset yok, ben başka bir fotoğraf seçtim. | REJECT | preflight `asset-missing` → `BLOCKED_BY_ASSET`; teslim raporunda manifest dışı asset lint hatası |
| Eski P3 handoff v3 hazır görünüyor, onu kullanalım. | REJECT | v2 sözleşmesi yok → `BLOCKED_BY_VERSION_MISMATCH`; registry `FROZEN` |
| Scene teknik olarak zor, ben hikâyeyi değiştirdim. | REJECT | CCR önce gelir (`lintCCR`); teslim raporunda onaylı CCR'sız sapma lint hatası |
| Strong PC kendi videosuna creative PASS verdi. | REJECT | teslim raporu `Creative QA: PENDING_INDEPENDENT` zorunlu; creative verdict iddiası lint hatası |
| Handoff içine bütün doctrine'i kopyalayalım. | REJECT | `lintHandoff`: canon metni örtüşmesi ve bilinmeyen içerik alanı reddedilir; canon yol + blob ile referanslanır |
| Founder hangi tool'u kullanacağımıza karar versin. | REJECT | `lintHandoff`: Founder'a sistem sorusu reddedilir; araç scene plan'dedir (pipeline §4) |

## 11. Doğrulama
Main PC: `node --test "os/tests/*.test.mjs"` (fixture'lar gerçek git + gerçek dosya kullanır). Strong PC: `node os/factory/factory.mjs selftest` (aynı senaryolar o makinenin git/dosya sistemiyle; render yok) + gerçek handoff için `preflight`.
