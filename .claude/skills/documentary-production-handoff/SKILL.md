---
name: documentary-production-handoff
description: The Industrial Casebook için Production Handoff v2 (Stage 4, D-047) — onaylanmış (ACTIVE) Production Scene Plan + bağımsız Creative QA PASS + asset manifest + rights ledger'dan, Strong PC'ye giden ince ve sürümlü sözleşmeyi `os/factory/factory.mjs issue` ile üretir; canon, scene plan ve ledger'lar yol + blob ile sabitlenir, doctrine kopyalanmaz. Gate geçmezse handoff BLOCKED yazılır ve Strong PC'ye gitmez. Eski Visual Plan / Edit Plan / Source-to-Visual girdisi ve v1 handoff'lar kullanılmaz. Render, ses üretimi veya push yapmaz.
---

# Production Handoff v2

> Protokol (tek kaynak): `os/factory/README.md` (L1, D-047). Kanal pipeline'ı: `channels/the-industrial-casebook/pipeline/README.md` (aşama 6'dan sonra). Kanal canon'u önce gelir (D-045); şirket HARD kuralları her zaman üsttedir.
> v1 metni (prototype/full brief, 14 bölüm) git geçmişindedir: `git show 5d52fa5:.claude/skills/documentary-production-handoff/SKILL.md`. v1 formatındaki handoff'lar (P3 v1–v3) talimat değildir ve inherit edilmez.

## 1. Girdi (yalnız kanonik)
| Girdi | Koşul |
|---|---|
| Production Scene Plan (`05-scene-plan-vN.md`) | registry'de **ACTIVE**; `production-scene-plan` lint'i temiz — **tek yaratıcı girdi** |
| Bağımsız Creative QA (`06-creative-qa-vN.md`) | bu scene plan sürümünü adıyla kapsar; **PASS**; author ≠ evaluator |
| Asset manifest (`handoff/asset-manifest.csv`) | scene plan'deki her V-/AI- asset'i ve üretilecek OG- grafikleri; `REQUIRED` olanlar `READY` veya `TO_PRODUCE` |
| Rights ledger (`production/<video>/<VID>-rights-ledger.csv`) | her harici/AI `REQUIRED` asset için temiz satır (`CLEAR` / `CLEAR_WITH_ATTRIBUTION`) |
| Evidence ledger | sabitlenir; handoff iddia içermez |
Eski `documentary-visual-plan`, `documentary-edit-plan`, `source-to-visual` ve `documentary-visual-storytelling` (SUPERSEDED, D-046) girdi değildir. Zaman kodu ve VO senkronu Strong PC'de final VO cue dosyasından (manifest'te asset) üretilir; handoff yazmaz.

## 2. Üretim (elle yazılmaz)
1. Girdiler commit'li ve çalışma ağacı temiz olsun.
2. Çalıştır (örnek, VID-001):
```bash
node os/factory/factory.mjs issue --id VID-001-HO --version 1 --case VID-001 --channel the-industrial-casebook --scene-plan channels/the-industrial-casebook/cases/VID-001/<scene plan> --qa channels/the-industrial-casebook/cases/VID-001/<qa> --manifest channels/the-industrial-casebook/cases/VID-001/handoff/asset-manifest.csv --rights production/pilots/2026-10-n2-pilot-test/VID-001-rights-ledger.csv --evidence production/pilots/2026-10-n2-pilot-test/P3-evidence-ledger.md --production-root D:/CompanyOS-Production/P3-ns-savannah --allowed-code production/remotion/src/brand/,production/remotion/src/templates/ --forbidden-code production/remotion/src/videos/p3/ --out channels/the-industrial-casebook/cases/VID-001/handoff/07-production-handoff-v1.md
```
3. Sonuç `ISSUED` → registry'ye `ACTIVE` (önceki handoff `SUPERSEDED`); `BLOCKED` → registry'ye `DRAFT`, Strong PC'ye **gitmez**; engeller Main PC'de çözülür ve yeni sürüm üretilir. Engeli kapatmak için handoff elle `ISSUED` yapılmaz (Strong PC gate'i yeniden hesaplar).
4. `node os/factory/factory.mjs lint handoff <yol>` temiz olmalı. Commit; push Founder'ın GUIDED ACTION'ıdır (GitHub Desktop).
5. Render, VO kredisi, ücretli asset, AI üretimi `approvals` alanında `APPROVED` değilse Strong PC o işi yapmaz. Onay Founder kararıdır (`founder-approval.md`); onay alınmadan `--approve render=APPROVED` yazılmaz.

## 3. İnce kalma kuralı
Handoff yalnız sözleşmedir: kim, hangi commit, hangi sabitlenmiş dosyalar, hangi asset'ler, ne serbest/ne yasak, hangi engeller, sonraki kapı. Sahne fikri, görsel dil, kamera, araç, canon/doctrine metni **kopyalanmaz** — yol + blob ile referanslanır (lint 12 kelimelik canon örtüşmesini ve bilinmeyen içerik alanını reddeder).

## 4. v1 bölümlerinin v2'deki yeri
| v1 handoff bölümü | v2'de |
|---|---|
| Core promise, hook, yapı, sahne amaçları, görsel dil, tipografi anları, müzik yönü | Sabitlenmiş Production Scene Plan + beat sheet/script + canon (kopyalanmaz) |
| Asset plan, footage list, AI görsel istekleri | `handoff/asset-manifest.csv` (+ rights ledger); AI prompt'u Founder'a GUIDED ACTION olarak verilir |
| Evidence restrictions | Sabitlenmiş evidence ledger (§D reddedilenler) + scene plan Evidence Anchor |
| Onay/harcama durumu | `approvals` |
| Prototype sınırı | `scope` (prototype yalnız D-043 koşullarında) |
| CASE INTRO / CASE LABEL | Canon `03` + scene plan; CASE INTRO Golden Master (Stage 5) öncesi tasarlanmaz |
| Launch hazırlığı (end screen alanı, thumbnail hero asset, captions) | Son sahne scene plan'de; thumbnail hero asset manifest satırı; captions teslim raporu alanı |
| Teslim, teknik QA, muted preview | `strong-pc-preflight` teslim raporu (technical QA); creative karar `creative-qa` |

## 5. Founder'a (sade Türkçe)
"Handoff hazır / hazır değil; neden (tek cümle); senden: [push / onay / yok]." Branch, araç, klasör, dosya adı sorulmaz. Fiziksel işlem gerekiyorsa tek GUIDED ACTION: adım · hazır komut/prompt · tam yol · ne göreceği.
