# The Industrial Casebook — Creative Production Pipeline v2

> Karar: D-046 (Founder, 2026-10-14; Stage 3). Kapsam: `channel:the-industrial-casebook`. Bu belge **prosedürdür**: kanal canon'unu (`../canon/README.md`, L2) gerçek videoya çevirir; canon ve şirket HARD kuralları her zaman bu belgenin üstündedir.
> Bu pipeline Independent Creative QA'da biter. Production Handoff ve Strong PC arayüzü Stage 4'tür (D-047, `os/factory/README.md`): Strong PC işi yalnız `ISSUED` Handoff v2 ve preflight `READY_FOR_PRODUCTION` ile başlar; render ayrıca Founder onayı ister.

## 1. Akış
| # | Aşama | Skill | Çıktı (case klasöründe) | Çıkış ölçütü | Founder |
|---|---|---|---|---|---|
| 1 | Story Viability | `story-viability` | `01-story-viability.md` | Yedi soru repo kanıtıyla cevaplandı; sonuç **PURSUE / REVISE / KILL** + tek öneri ve gerekçe; toplam puan yok; repo'da kanıt yoksa **REVISE — research/evidence required** (genel bilgiyle PURSUE yok) | **FOUNDER DECISION** yalnız PURSUE önerisinde (yatırım). REVISE/KILL'de COO düzeltir veya öldürür, Founder'a bilgi verir |
| 2 | Packaging Hypothesis | `documentary-packaging` | `02-packaging-hypothesis.md` | Title hypothesis · thumbnail hypothesis · viewer promise · central curiosity gap; hepsi kanıtla karşılanabilir | Yalnız stratejik seçim gerekiyorsa en fazla 3 finalist |
| — | Evidence Ledger | `documentary-evidence-ledger` | `<case>-evidence-ledger.md` | Önemli her claim ledger satırında; haklar rights ledger'da | Yok |
| 3 | Creative Treatment / Beat Sheet | `documentary-creative-treatment` | `03-beat-sheet.md` | Her beat: Story Function · Viewer Question / Curiosity State · Claim · Evidence Anchor · Payoff / Next Question · screen time'ı neden hak ettiği | Yok (büyük yaratıcı yön değişikliği hariç) |
| 4 | Script | `documentary-script` | `04-script-vN.md` + değişiklik kaydı | Evidence-locked; merkezi soru erken; final soruyu kapatır | Yok |
| 5 | Production Scene Plan | `production-scene-plan` | `05-scene-plan-vN.md` | Her önemli beat'te on alan + Anti-PowerPoint scene test + scene'den sonra araç | Yok |
| 6 | Independent Creative QA | `creative-qa` (ayrı oturum/agent `creative-qa-evaluator`) | `06-creative-qa-vN.md` | PASS / REVISE (gerçek nedenlerle) / BLOCKED; değerlendirici, işi üreten oturum değildir | Yok — Founder'ın yaratıcı sorusu final videoda (charter §9) |
| → | Stage 4 | Production Handoff v2 (`documentary-production-handoff`) → Strong PC boot contract (`strong-pc-preflight`) | `handoff/07-production-handoff-vN.md` + `handoff/asset-manifest.csv` | Gate: ACTIVE scene plan + bağımsız QA PASS + temiz haklar + hazır asset; yoksa BLOCKED (protokol `os/factory/README.md`, D-047) | Yalnız para/render onayı ve push (GUIDED ACTION) |
CASE INTRO Golden Master kalibrasyonu (Stage 5) tamamlanana kadar videolarda CASE INTRO slotu **boş kalır**; yerine geçici intro üretilmez, yalnız CASE LABEL (TIC-11, TIC-12) kullanılır.
Ses (`documentary-voice-director`) ve müzik/SFX (`documentary-music-sfx`) script ve scene plan'den beslenir; ses üretimi/kredi Founder onaylıdır.
Case klasörü: `channels/the-industrial-casebook/cases/<VID>/`. Her yeni/yeni sürüm dosya `company/state/artifact-registry.csv`'ye aynı turda girer (DRAFT → kapı geçince ACTIVE; eski sürüm SUPERSEDED).

## 2. Truth lock ≠ editorial lock (Script)
- **Truth lock:** doğrulanmış iddialar, sayılar, alıntılar ve bunların anlamı ledger'a bağlıdır; yeni kanıt olmadan değişmez.
- **Editorial flexibility:** yapı, sıra, anlatım biçimi, hook, cümle, ritim — pahalı production (ses kredisi, render) başlamadan **kontrollü** değişebilir. Hikâye problemi bulunursa script "kilitli" diye korunmaz.
- Değişiklik kaydı (Change Request'e hazır biçim): `CR-NN · neyi değiştiriyor · neden (hangi beat/QA bulgusu) · truth etkisi (yok / ledger satırı) · maliyet etkisi (VO yeniden üretimi vb.) · onay modu`. Truth etkisi olan değişiklik ledger'dan geçer; maliyet doğuran değişiklik Founder onayına tabidir. Tam Creative Change Request (production sonrası, Strong PC'den gelen) Stage 4'tür.
- "Script asla değişmez" diye global kural yoktur. (Case kararı olarak kilitlenmiş eski metinler — ör. D-013 — kendi case'inde geçerlidir; yeni pipeline'da yeniden açılmaları bir change kaydı ile olur.)

## 2b. Asset hazırlığı ve hak — planlama serbest, production'da HARD STOP
- Scene plan yaratıcı planlamadır: asset henüz bulunmadı veya hakkı çözülmedi diye güçlü bir sahne fikri reddedilmez. Her asset açık bir durum taşır: `READY` · `TO_PRODUCE` · `NEEDS_SOURCE` · `NEEDS_RIGHTS` · `MISSING`.
- Lint reddeder: durumu belirsiz asset, hak durumu saklanan asset, hakkı çözülmemiş kaynağın `READY` gibi sunulması, `REJECTED` asset kullanımı.
- **HARD STOP Stage 4 handoff'tadır:** çözülmemiş hak veya eksik gerekli asset (`NEEDS_SOURCE` / `NEEDS_RIGHTS` / `MISSING`) varsa iş Strong PC'ye gidemez; rights ledger satırı olmayan harici asset de gidemez.

## 3. Anti-PowerPoint scene test (her önemli scene)
Soru: **"Bu gerçekten scene mi, yoksa hareket verilmiş slide mı?"** Cevap scene plan'de cümleyle yazılır: görüntü bu beat'te izleyiciye **ne yeni anlayış** veriyor ve bir PowerPoint geçişiyle neden yaklaşık üretilemez? Fotoğraf, belge ve harita kullanılabilir; sorun bunların görsel fikir olmadan sıraya dizilmesidir. Oran veya sayı kuralı yoktur (TIC-13, TIC-29).

## 4. Araç seçimi — scene'den sonra
Scene tasarlanır, sonra araç önerilir: archive · 2.5D · After Effects · Remotion · Blender · AI illustration · AI video · map · compositing. Seçim gerekçesi: sahnenin ihtiyacı, doğruluk, haklar, maliyet/karmaşıklık ve production value (TIC-18, TIC-19). Daha pahalı veya daha karmaşık araç kendiliğinden daha iyi değildir. Araç kararı sistemindir; Founder'a "AE mi Blender mı?" sorulmaz.

## 5. Founder rehberliği (governance §4)
| Mod | Bu pipeline'da |
|---|---|
| AUTONOMOUS | Viability analizi, packaging hipotezleri, beat sheet, script, scene plan, araç seçimi, QA düzeltmeleri |
| GUIDED ACTION | Dış araçta Founder'ın yapması gereken iş (ör. ChatGPT görsel üretimi): araç · neden · tam prompt · dosya adı · kaydedileceği klasör · sonraki adım |
| FOUNDER DECISION | PURSUE önerilen fikre yatırım · gerekirse ≤3 packaging finalisti · para (VO kredisi, ücretli asset) · yayın · strateji |
| BLOCKED_BY_CANONICAL_GAP | Canon/pipeline'da cevabı olmayan karar → dur, boşluk + öneri |
Founder'a **taşınmaz:** araç seçimi, kamera/geçiş/renk/font, beat sırası, scene fikirleri, QA'nın düzeltebileceği şeyler, repoda cevabı olan sistem soruları. Founder prompt yazmaz; dış AI gerekiyorsa prompt hazır verilir.

## 6. Independent Creative QA
Script veya scene plan'i üreten oturum kendi işine **final creative PASS veremez**. Değerlendiriciye yalnız **kanonik girdi paketi** verilir: değerlendirilen artifact dosyaları + kanal canon'u + pipeline + evidence/rights ledger yolları. Üreticinin sohbet içi gerekçesi, notları veya özetleri taşınmaz; rapor `inputs:` alanında aldığı dosyaları listeler. Alanlar nitel değerlendirilir (`PASS` / `CONCERN` / `BLOCKER` + gerekçe); toplam/ağırlıklı puan veya sabit PASS eşiği yoktur. QA ayrı bir oturumda veya `creative-qa-evaluator` agent'ında yapılır; rapor üreticiyi (`author`) ve değerlendiriciyi (`evaluator`) ayrı yazar. QA "PASS/FAIL" ile yetinmez: her alan için durum ve gerekçe, REVISE'da somut düzeltme listesi verir (`creative-qa`).

## 7. Reddedilen kararlar
| Kötü karar | Sonuç | Neden | Dayanak |
|---|---|---|---|
| "Belgeyi bulduk, ekranda gösterelim yeter." | REJECT | Belge Evidence Anchor'dır; anlamayı ayrı bir Presentation Visual kurar; scene test yazılmadan scene olmaz | TIC-15, TIC-13; §3 |
| "Visual plan'a asset dosya adlarını yazmak yeterli." | REJECT | Scene plan asset listesi değildir; Presentation Visual ve Visual Idea gerçek görsel fikri tarif eder (lint dosya adını reddeder) | `production-scene-plan` §2 |
| "Script lock olduysa hikâye problemi bile değiştirilemez." | REJECT | Truth lock ≠ editorial lock; hikâye problemi change kaydıyla düzeltilir | §2 |
| "Her beat'e motion ekleyelim." | REJECT | Hareket bir şey taşımalıdır; "none + gerekçe" geçerli bir karardır | TIC-20 |
| "En pahalı 3D çözüm her zaman daha iyidir." | REJECT | Önce scene, sonra araç; maliyet/karmaşıklık seçimin parçasıdır | TIC-19; §4 |
| "AI en son çaredir." | REJECT | AI kararı scene need, accuracy need, rights, disclosure, production value ile verilir | TIC-18 |
| "Production agent kendi işine creative PASS verebilir." | REJECT | Üreten taraf final creative PASS veremez; bağımsız QA | charter §9; §6 |

## 8. Kabul soruları → nerede
| Soru | Yer |
|---|---|
| Yeni fikir için Story Viability kararı | `story-viability` |
| Packaging ile story promise neden aynı | `documentary-packaging` §1; canon `02` §4 |
| Beat neden screen time kazanır | `documentary-creative-treatment` §2 |
| Evidence Anchor / Presentation Visual ayrı yazımı | `production-scene-plan` §2; canon `04` §2 |
| Asset listesi yerine scene fikri | `production-scene-plan` §2–§3 |
| Fotoğraf/belgeyi yasaklamadan Anti-PowerPoint | §3 |
| Scene'e göre araç seçimi | §4; `production-scene-plan` `TOOL-LIBRARY.md` |
| Truth lock vs editorial flexibility | §2 |
| Üreten oturum kendi QA'sına PASS veremez | §6; `creative-qa` |
| Founder'a neyin taşınmayacağı | §5 |
Eski skill'lerin bu pipeline'daki karşılığı: `consolidation-map.md`. Örnek kullanım (P3 kağıt üstü dry-run): `../cases/VID-001/dry-run-v2/`.
