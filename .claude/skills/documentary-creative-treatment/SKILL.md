---
name: documentary-creative-treatment
description: The Industrial Casebook için Evidence-linked Creative Treatment / Beat Sheet — bilgileri sıraya dizmek değil, izleyicinin merak yolculuğunu tasarlamak. Merkezi soru, hook, yapı ve her beat için Story Function · Viewer Question / Curiosity State · Claim · Evidence Anchor · Payoff / Next Question · screen time gerekçesi. Story Viability (PURSUE) ve packaging hypothesis sonrası, script'ten önce kullan. Pipeline aşama 3 (D-046). Ses, görsel, render üretmez.
---

# Creative Treatment / Beat Sheet

> Kanal canon'u önce gelir (D-045): `channels/the-industrial-casebook/canon/README.md` (özellikle `01`, `03`, `04`). Pipeline: `channels/the-industrial-casebook/pipeline/README.md`. Uygulayıcı: `documentary-creative-director` / COO. Girdi: `01-story-viability.md` (PURSUE), `02-packaging-hypothesis.md`, evidence ledger, CF kayıtları; benchmark/doctrine yalnız HEURISTIC kaynak.

## 1. Görev
Treatment'ın görevi bilgiyi sıraya dizmek değil, **izleyicinin merak yolculuğunu** tasarlamaktır: hangi anda hangi soru açık, hangisi kapanıyor, hangi kanıt güven veriyor, payoff nerede.
Zorunlu içerik:
1. **Merkezi soru** (TIC-06): "What exact question is the viewer waiting to have answered?" — İngilizce + Türkçe anlamı.
2. **Core promise** (packaging hypothesis ile aynı promise; TIC-05) ve videonun bu promise'i nerede, nasıl karşıladığı.
3. **Hook / açılış:** varsayılan PARADOX / QUESTION → CASE ENTRY → CASE INTRO → EVIDENCE TEASE → INVESTIGATION (HEURISTIC, TIC-08); generic rhetorical question yok (TIC-09); bağlam meraktan önce yığılmaz (TIC-07). 2–3 hook adayı: açılış cümlesi, ilk görsel fikir, açılan soru, ledger satırları, risk; birincil seçilir ve gerekçelendirilir. Hook payoff'u harcamaz.
4. **Yapı:** seçilen iskelet ve nedeni (aşağıdaki tablo örnektir, şablon değildir).
5. **Beat Sheet** (§2).
6. **CASE INTRO yeri ve payload'ı** (case no, başlık, hero object, motif, accent) — Golden Master kalibrasyonuna kadar tasarlanmaz/üretilmez (TIC-11).
7. **Riskler** (kanıt, hak, üretim) ve **Founder'a gidecek tek karar** (varsa; çoğu zaman yok).
| Yapı | Ne zaman |
|---|---|
| Paradoks → çözülme | "Çalıştı ama…" gerilimi |
| Soruşturma / dosya açma | Merkezde bir belge/denetim varsa |
| Geri sayım | Bir karar tarihine doğru ilerleyen olay |
| Karşılaştırma (A vs B) | İki teknoloji/karar arasındaki fark anlamın merkeziyse |
| Tersine kronoloji | Sonuç biliniyorsa: "buraya nasıl gelindi?" |
| Tek nesne üzerinden | Bir makine/parça/bina hikâyeyi taşıyabiliyorsa |

## 2. Beat Sheet — her beat screen time'ı hak etmeli
Her beat şu işlerden **en az birine** hizmet eder (Story Function, bu kelimelerle):
`NEW CURIOSITY` · `BREAK ASSUMPTION` · `NEW INFORMATION` · `EXPLAIN SYSTEM` · `SHOW SCALE` · `BRING EVIDENCE` · `HUMAN DIMENSION` · `CONNECT IDEAS` · `SET UP PAYOFF` · `PAYOFF`
"Bu bilgi doğru" tek başına beat için yeterli değildir: doğru ama merak yolculuğuna bir şey katmayan bilgi kesilir veya başka beat'e eritilir.
Her beat bloğu (`### B-NN — kısa ad`) şu alanları taşır:
- **Story Function:** yukarıdaki listeden bir veya birkaçı
- **Viewer Question / Curiosity State:** izleyici bu anda neyi merak ediyor / neyi bildiğini sanıyor
- **Claim:** beat'in söylediği (yoksa "none — framing beat")
- **Evidence Anchor:** ledger satırları (C-/Q-/V-/E-) veya "none — framing beat"
- **Payoff / Next Question:** beat neyi kapatıyor ve hangi yeni soruyu açıyor
- **Earns screen time because:** tek cümle — bu beat çıkarılsa izleyici ne kaybeder
Lint: `os/lib/pipeline.mjs` (`lintBeatSheet`) bu alanları ve Story Function sözlüğünü kontrol eder.

## 3. Kontroller (Founder'a gitmeden)
Merkezi soru erken mi kuruluyor · her beat bir sonraki beat'i istiyor mu · final merkezi soruyu anlamlı biçimde kapatıyor mu · her claim ledger'a bağlı mı · packaging promise'i karşılanıyor mu · bağlam başa yığılmış mı.

## 4. Çıktı ve Founder
`channels/the-industrial-casebook/cases/<VID>/03-beat-sheet.md` (registry: DRAFT). Founder'a (sade Türkçe): yeni hook (İngilizce + Türkçe anlamı), akış 2–3 cümle, tek karar (varsa). Tablo ve dosya yolu yok.
