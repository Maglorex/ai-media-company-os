# 07 — Rule Register (makine-okunur)

> Kapsam sütunu her satırda `channel:the-industrial-casebook`. Sınıf: `—` = bağlayıcı canon kuralı (L2) · `HARD` = şirket HARD kuralının hatırlatması (kaynağı şirket dosyası; canon HARD üretmez) · `HEURISTIC` / `EXPERIMENT` / `DIAGNOSTIC` = L5. Katman `.claude/rules/governance.md` §2 türetmesiyle aynıdır (test).
> Bağlayıcı (`—`) ve HARD satırlarda sabit yüzde/saniye/oran yoktur (TIC-29); sayı yalnız DIAGNOSTIC/HEURISTIC/EXPERIMENT satırında olabilir.

## Kurallar
| ID | Kural | Kapsam | Sınıf | Katman | Kaynak | Canon |
|---|---|---|---|---|---|---|
| TIC-01 | İzleyici merak eder, kanıta güvenir, sistemi görsel olarak anlar, görüntü/motion için izlemeye devam eder, finalde parçaların birleştiğini hisseder | channel:the-industrial-casebook | — | L2 | Founder Charter 2026-10-14; D-045 | `01` |
| TIC-02 | Ciddi üretimden önce sekiz alan yazılı değerlendirilir; Founder sorusu: geniş kitlenin umursaması için güçlü sebep var mı | channel:the-industrial-casebook | — | L2 | D-045 | `02` §2 |
| TIC-03 | Fikir kararı pseudo-score değildir; sonuç PURSUE / REVISE / KILL + gerekçe; araç puanları yalnız girdi | channel:the-industrial-casebook | — | L2 | D-045 | `02` §2 |
| TIC-04 | Production zayıf fikri kurtarmaz; zayıf fikir üretime girmeden öldürülebilir ve kaydı kalır | channel:the-industrial-casebook | — | L2 | D-045 | `02` §3 |
| TIC-05 | Packaging hypothesis fikirle birlikte gelişir, içerikle aynı promise'i verir, değişikliği kontrollü ve kayıtlıdır | channel:the-industrial-casebook | — | L2 | D-045; D-035 | `02` §4 |
| TIC-06 | Production'dan önce "What exact question is the viewer waiting to have answered?" yazılır | channel:the-industrial-casebook | — | L2 | D-045 | `03` §1 |
| TIC-07 | Bilgi boşluğu hikâyenin izin verdiği en erken anda açılır; bağlam meraktan önce yığılmaz | channel:the-industrial-casebook | — | L2 | D-045 | `03` §1 |
| TIC-08 | Varsayılan açılış: PARADOX / QUESTION → CASE ENTRY → CASE INTRO → EVIDENCE TEASE → INVESTIGATION | channel:the-industrial-casebook | HEURISTIC | L5 | D-045 | `03` §2 |
| TIC-09 | Vakadan bağımsız generic rhetorical question kullanılmaz | channel:the-industrial-casebook | — | L2 | D-045 | `03` §2 |
| TIC-10 | Açılış kelime ya da süre şablonu değildir; her video aynı formülle açılmaz | channel:the-industrial-casebook | — | L2 | D-045 | `03` §2 |
| TIC-11 | CASE INTRO = tekrar tanınabilir motion signature: stable skeleton + değişken payload; uzun standalone logo intro değildir; Golden Master kalibrasyonda | channel:the-industrial-casebook | — | L2 | D-044; D-045 | `03` §3 |
| TIC-12 | CASE LABEL küçük metadata/UI öğesidir; intro değildir ve intro gibi büyütülmez | channel:the-industrial-casebook | — | L2 | D-044; D-045 | `03` §3 |
| TIC-13 | Anti-PowerPoint: ham malzeme sahneye dönüşür; PowerPoint ile yaklaşık üretilebilen sequence için bespoke concept aranır | channel:the-industrial-casebook | HEURISTIC | L5 | Founder Charter 2026-10-14; D-045 | `04` §1 |
| TIC-14 | Narrative Curiosity + Visual Curiosity + Audiovisual Momentum birlikte optimize edilir | channel:the-industrial-casebook | — | L2 | D-045 | `01` |
| TIC-15 | Her önemli beat'te Evidence Anchor ve Presentation Visual ayrı kararlardır; source bulunması görsel düşünmeyi bitirmez | channel:the-industrial-casebook | — | L2 | D-045 | `04` §2 |
| TIC-16 | Source establishes truth; kanıt etiketi ledger'a bağlı, belgeye sahte öğe eklenmez, çekilen değer birebir | channel:the-industrial-casebook | HARD | L0 | `.claude/rules/evidence-and-research.md`; `company/charter.md` §3 | `04` §2 |
| TIC-17 | AI tarihî kanıt değildir; bilinmeyen ayrıntı gerçek gibi sunulmaz; gerektiğinde etiket/disclosure | channel:the-industrial-casebook | HARD | L0 | `company/charter.md` §3; `.claude/rules/evidence-and-research.md` | `04` §4 |
| TIC-18 | "Source varsa AI yok" kuralı yoktur; AI kararı scene need, accuracy need, rights, disclosure, production value ile verilir | channel:the-industrial-casebook | — | L2 | D-045 | `04` §4 |
| TIC-19 | Önce sahne, sonra araç; araç/sağlayıcı doctrine değildir; Remotion template-first değildir, bespoke birinci sınıftır | channel:the-industrial-casebook | — | L2 | D-045 | `04` §3 |
| TIC-20 | Her hareket "Bu neden hareket ediyor?" sorusuna cevap verir (reveal, mekân, ölçek, mekanizma, dönüşüm, ilerleme); dekoratif motion reddedilir | channel:the-industrial-casebook | — | L2 | D-045 | `05` §1 |
| TIC-21 | Mümkün olduğunda bir fikrin görsel sonucu sonrakinin başlangıcına dönüşür | channel:the-industrial-casebook | HEURISTIC | L5 | D-045 | `05` §5 |
| TIC-22 | Narration, müzik, ambiyans, sessizlik ve SFX birlikte; sürekli trailer sesi yok; sessizlik aktif araç | channel:the-industrial-casebook | HEURISTIC | L5 | D-045; D-024 | `04` §5 |
| TIC-23 | Subject hero'dur; UI yalnız guide/compare/label/highlight/source clarity için; UI'sız sahne daha güçlüyse UI yok | channel:the-industrial-casebook | — | L2 | D-045; D-041 | `04` §6 |
| TIC-24 | Brand System v1 kimliği korunur (font, token, dört dünya, anti-klişe); static brand board film dili değildir | channel:the-industrial-casebook | — | L2 | D-031; D-032; D-033; D-045 | `04` §6 |
| TIC-25 | Kamera ve hareket kararları hedefiyle yazılır; film dili Editorial Motion & Cinematography System'den gelir | channel:the-industrial-casebook | — | L2 | D-045 | `05` |
| TIC-26 | Rutin videoda zorunlu prototype yok; prototype yalnız calibration, CASE-SPECIFIC need veya risky/new format | channel:the-industrial-casebook | — | L2 | D-043 | `06` §1 |
| TIC-27 | Benchmark/competitor bilgisi HEURISTIC/EXPERIMENT'tir; canon kuralı yalnız first-party/deney kanıtı + Founder kararıyla; tek video global law olmaz | channel:the-industrial-casebook | — | L2 | D-045 | `02` §5 |
| TIC-28 | Retention, CTR, dips/spikes vb. DIAGNOSTIC sinyaldir; neden-sonuç hipotezi için kullanılır, kör eşik için değil | channel:the-industrial-casebook | DIAGNOSTIC | L5 | D-045 | `02` §5 |
| TIC-29 | Sabit yüzde, sabit saniye, sabit kaynak oranı veya evrensel shot uzunluğu kanal kuralı olamaz | channel:the-industrial-casebook | — | L2 | D-045; governance §1 | `02` §5, `05` §6 |
| TIC-30 | Benchmark ölçümü (doctrine v1 §2: başarılı kanallarda görsel olay aralığı ~2,6–4,4 sn; P3 review kurgusunda ~12,8 sn/beat) yalnız teşhis içindir | channel:the-industrial-casebook | DIAGNOSTIC | L5 | D-029 (araştırma) | `05` §6 |
| TIC-31 | Canon yalnız bu kanal içindir; başka kanal otomatik devralmaz | channel:the-industrial-casebook | — | L2 | `.claude/rules/governance.md` §3; D-045 | `README` |
| TIC-32 | Hakkı doğrulanmamış materyal prototype dahil kullanılmaz; kanonik kayıt rights ledger | channel:the-industrial-casebook | HARD | L0 | `production/rights/README.md`; D-036 | `04` §7 |
| TIC-33 | Güzel görüntü zayıf story'yi telafi etmez; story ve görsel anlatım ayrı ayrı güçlü olmalı | channel:the-industrial-casebook | — | L2 | D-045 | `01` |
