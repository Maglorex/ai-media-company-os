# 09 — v1 Source Map (davranış kaybı yok)

> Stage 2'de eski dağınık kanal kaynakları bu canon altında toplandı. Eski dosyalar **silinmedi, taşınmadı**; statüleri `company/state/artifact-registry.csv` ve `company/state/rule-registry.md`'dedir. İki kural dosyası canon yükleyicisine çevrildi; v1 metinleri `git show pre-v2-checkpoint:<yol>` ile okunur.

## 1. Kaynak → canon karşılığı
| v1 kaynağı | v1 maddesi | Canon'daki karşılığı | Durum |
|---|---|---|---|
| `.claude/rules/documentary-creative-standards.md` (v1) | §1 akış (gate → packaging → ledger → treatment → … → yayın) | `02` §6 + §2 aşağıda (prosedür sırası) | Taşındı |
| 〃 | §2 prototype kapısı "değişmez" | TIC-26 (D-043): zorunlu değil | Daraltıldı |
| 〃 | §3 her sahnenin bir işi; foto+pan+kart varsayılan değil; görsel yenilenme = yeni bilgi | TIC-13, TIC-20, `05` §2 | Taşındı |
| 〃 | §3 vaat erken görünür; bağlam başa yığılmaz | TIC-05, TIC-07 | Taşındı |
| 〃 | §3 AI kanıt gibi gösterilmez; arşiv ≠ telif güvenliği | TIC-17, TIC-32 (HARD) | Taşındı |
| 〃 | §3 closed captions her videoda; hardcoded altyazı varsayılan değil | `video-launch-os` caption protokolü (prosedür, ACTIVE) | Prosedürde kaldı |
| 〃 | §4 öğrenme döngüsü: video mu sistem mi; tek örnek zevk kural olmaz | TIC-27, `02` §5; CF kaydı | Taşındı |
| `.claude/rules/brand-and-visual-system.md` (v1) | §1 Founder mikro karar vermez | `README` "Founder'a sorulmayanlar" | Taşındı |
| 〃 | §2 dört dünya, ortak gramer, yasak estetikler | TIC-24, `04` §6 | Taşındı |
| 〃 | §3 kanıt dürüstlüğü, EVIDENCE NN = ledger satırı, AI etiketi | TIC-16, TIC-17 | Taşındı |
| 〃 | §4 "güzel fotoğraf yok" → lacivert kart değil | TIC-13, TIC-15 | Taşındı |
| 〃 | §5 handoff öncesi source-to-visual; muted gate bağlayıcı | Source-to-visual = prosedür (canon önce gelir); muted gate = DIAGNOSTIC girdi, creative PASS bağımsız QA'da (`company/charter.md` §9) | Daraltıldı |
| 〃 | §5 brand proof #3–#5 | Tamamlandı (D-041), tarihsel | Tarih |
| Doctrine v1 (`intelligence/creative/doctrine/…-v1.md`) | §1–§2 benchmark matrisi ve ölçümler | TIC-30 (DIAGNOSTIC), HEURISTIC kaynak | HISTORICAL kaynak |
| 〃 | §3 anlatı grameri (hook, soru merdiveni, insan ölçeği, bağlam ödülü) | TIC-06–TIC-09 + HEURISTIC okuma | Taşındı / HEURISTIC |
| 〃 | §4–§7 görsel, motion, harita/diyagram grameri | `05` (HEURISTIC kalıplar) | Taşındı |
| 〃 | §11 anti-pattern'ler | `08`, `06` §2 BAD kategorileri | Taşındı |
| 〃 | §12 prototype rubric (15 sn statik vb.) | Yalnız prototype kullanılırsa HEURISTIC kontrol; sayılar DIAGNOSTIC | Daraltıldı |
| `channels/the-industrial-casebook/v1-procedures.md` | Skill sırası ve işaretçiler | §2 aşağıda; prototype satırı TIC-26 | SUPERSEDED |
| `intelligence/creative/brand/dynamic-case-ident-system.md` (D-034) | Her videoya özel ident; tekrar yasağı | TIC-11/TIC-12 (D-044); davranış kütüphanesi = payload için HEURISTIC kaynak | SUPERSEDED |
| `intelligence/creative/brand/brand-system-v1.md` §C | "Bağımsız intro yok", ident özeti | TIC-11 | §C SUPERSEDED; dosyanın geri kalanı ACTIVE kimlik |
| `source-to-visual` skill §2 | 7 adımlı "ilk evet kazanır" görsel sırası | TIC-15, TIC-18: sıra yalnız aday üretme listesi (HEURISTIC); kanıt ile sunum ayrı karar | Daraltıldı |
| `source-to-visual` §3, §6 | SOURCE→EXTRACT→EXPLAIN→CONSEQUENCE; hazır AI prompt şablonu | `04` §2 (HEURISTIC kalıp), `04` §4 | Kaldı |
| `documentary-visual-storytelling` skill | Sahne işi, teşhis testleri, footage hak kuralı | TIC-13, TIC-20, TIC-32; teşhis testleri DIAGNOSTIC | Prosedürde kaldı |
| `muted-preview-gate` skill | Sessiz önizleme grid'i; "≤ ~6 sn" anlam | DIAGNOSTIC girdi (TIC-29/30); creative PASS bağımsız QA | Daraltıldı |
| `documentary-style-benchmarks.md` | PROVISIONAL benchmark | TIC-27 (HEURISTIC) | HISTORICAL |

## 2. Prosedür sırası — SUPERSEDED (D-046): güncel akış `../pipeline/README.md`; aşağıdaki liste tarihseldir
1. Fikir: yazılı değerlendirme (`02` §2; araçlar `growth-idea-scoring`, `documentary-virality-gate` — girdi) → PURSUE/REVISE/KILL.
2. Packaging hypothesis: `documentary-packaging` (fikirle birlikte).
3. Kanıt: `documentary-evidence-ledger`; haklar: rights ledger.
4. Yaratıcı yön: `documentary-creative-treatment` (merkezi soru TIC-06 zorunlu bölüm) + `source-to-visual` + `documentary-visual-storytelling` — hepsi bu canon'a tabi.
5. Senaryo: `documentary-script` → görsel/edit plan: `documentary-visual-plan`, `documentary-edit-plan` → ses: `documentary-voice-director`, `documentary-music-sfx`.
6. Handoff: `documentary-production-handoff` (prototype yalnız TIC-26 koşullarında).
7. QA: teknik QA üretim tarafında; creative QA bağımsız; `muted-preview-gate` DIAGNOSTIC.
8. Founder final yaratıcı kapısı → `video-launch-os` → `pre-publish-qa` → launch onayı → `growth-performance-review`.
