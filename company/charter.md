# AI MEDIA COMPANY — Company Charter

> Kaynak: Founder Charter, 2026-10-14 (Company OS v2). Bu dosya yalnız **şirket seviyesindeki** ilkeleri taşır. Değişiklik yalnız Founder.
> Katman: Charter, L0–L1'in üstündeki çerçevedir; kural sınıfları ve öncelik: `.claude/rules/governance.md` + `os/precedence.json`.
> **Kanala özgü** Founder Charter maddeleri (The Industrial Casebook viewer promise, opening grammar, CASE INTRO, Anti-PowerPoint, visual curiosity, production yöntemleri, transitions, sound) burada **yoktur**; Stage 2'de `channels/the-industrial-casebook/` altında channel canon olarak kurulur. Kaynak metin şu an non-canonical draft'ta korunuyor: `git show draft/os-v2-phase1-plan:company/os-v2/FOUNDER-CHARTER.md` (§2–§10) ve Stage 0 yedeği.

## 1. Amaç
AI MEDIA COMPANY tek bir YouTube kanalı değildir; zamanla birden fazla güçlü YouTube markası çalıştırabilen bir medya şirketidir.
- Her kanal milyonlarca izlenme potansiyeli hedefleyen fikirler üretmeye çalışır; hiçbir sistem milyon izlenmeyi garanti edilmiş sonuç kabul etmez. Şirketin görevi başarı ihtimalini **sistematik olarak artırmaktır**.
- Her kanal kendi yaratıcı kimliğine sahiptir. Kanallar yaratıcı kimliklerini paylaşmak zorunda değildir.
- Bir kanalda öğrenilen sonuç başka kanala **otomatik kural olarak taşınmaz**.
- Ortak altyapı: research · evidence · rights · finance · security · analytics · tooling · asset management · learning systems.
- İş modeli, değişmez kurallar ve kısıtlar: `company/constraints.md`, `company/strategy.md` (D-002, D-007).

## 2. Katmanlar: COMPANY → CHANNEL → CASE / VIDEO
| Katman | Ne yaşar | Nerede |
|---|---|---|
| **Company** | Bu charter, HARD sınırlar, şirket kararları, ortak altyapı | `company/`, `.claude/rules/`, `finance/`, `intelligence/` (ortak), `os/` |
| **Channel** | Kanalın yaratıcı kimliği (channel canon), kanal kararları | `channels/<kanal>/` (canon Stage 2'de kurulur) |
| **Case / Video** | Tek videonun durumu ve kararları, artifact'ları | `production/<case>/`, `company/state/artifact-registry.csv` |
- Alt katman üst katmanı daraltabilir, gevşetemez. Bir kanal kuralı başka kanala uygulanmaz.
- **Yukarı doğru otomatik kural yok:** case gözlemi kanal kuralı, kanal kuralı şirket kuralı ancak hedef katmanda açık Founder kararıyla olur (governance §3).

## 3. Kanıt ve AI (şirket geneli HARD çekirdek)
- **Source establishes truth.** Doğruyu kaynak kurar; görselleştirme anlamayı, motion ilerlemeyi sağlar — ama hiçbir görsel/sunum kararı kaynağın söylemediğini doğru gibi sunamaz.
- **AI tarihî kanıt değildir.** Gerçekte bilinmeyen tarihî ayrıntı kesin gerçekmiş gibi uydurulamaz. AI ürünü asla kanıt gibi gösterilmez.
- Evidence (bu claim neden doğru?) ve Presentation (izleyici bunu en iyi nasıl anlar?) **ayrı kararlardır**. AI'ın ve görselleştirmenin kanal içinde nasıl kullanılacağı channel canon'udur.

## 4. Kural sınıfları
HARD · HEURISTIC · EXPERIMENT · DIAGNOSTIC · CASE-SPECIFIC — tanımlar ve öncelik: `.claude/rules/governance.md` §1–§2.
- HARD yalnız: truth, evidence integrity, rights, safety, security, disclosure ve Founder'ın costly/external/irreversible action yetkisi.
- Bir Founder gözlemi otomatik HARD veya global kural olmaz. Bir video sonucu otomatik doctrine oluşturmaz.

## 5. Fikir ve büyüme
Production iyi fikir seçiminin yerine geçemez. Ciddi production kaynağından önce değerlendirilir: viewer demand / curiosity opportunity · central question · broad human relevance · competitive differentiation · evidence availability · visual opportunity · packaging potential · production feasibility.
- Pseudo-precision yok; "milyon izlenme garantisi" skoru yok. Sorulan: **"Bu fikri çok geniş bir kitlenin umursaması için güçlü bir sebep var mı?"**
- Zayıf fikrin production'a girmeden öldürülmesi normaldir.
- **Packaging** (title + thumbnail) sonda yapılan pazarlama değildir; story premise ile birlikte geliştirilir; production öncesi hipotez olarak bulunur, evidence/story geliştikçe kontrollü değişebilir.

## 6. Varsayılan üretim hattı (şirket iskeleti; kanal özelleştirebilir)
Story Viability → Packaging Hypothesis → Evidence-linked Creative Treatment / Beat Sheet → Script → Production Scene Plan → Versioned Production Handoff → Production → Independent Creative QA → Founder Gate → Publish → Learn.
Birbirini tekrar eden translation katmanları mümkün olduğunca tek Production Scene Plan altında konsolide edilir (Stage 3). Kanalın yaratıcı içeriği (ne iyi açılış, ne iyi sahne) channel canon'dadır.

## 7. Founder Guidance Contract
Founder teknik sistem yöneticisi değildir. Claude her adımda bir mod seçer (ayrıntı: governance §4):
**AUTONOMOUS** · **GUIDED ACTION** · **FOUNDER DECISION** · **BLOCKED_BY_CANONICAL_GAP**.
Repository'de cevabı bulunan sistem sorusunu Founder'a tekrar sormak başarısızlıktır. Founder prompt engineer değildir: dış AI aracı gerekiyorsa araç, neden, tam prompt, ne/nereye kaydedileceği ve sonraki adım hazır verilir.

## 8. Main PC / Strong PC
- **MAIN PC = BRAIN:** strategy, research, creative direction, story, evidence, current state, canonical decisions, scene planning, creative QA, company learning.
- **STRONG PC = FACTORY:** After Effects, Blender, Remotion, Premiere, FFmpeg, asset processing, rendering, technical implementation, technical QA.
- Strong PC kendi başına company veya channel doctrine tasarlamaz; creative gap bulursa `BLOCKED_BY_CANONICAL_GAP` veya `CREATIVE_CHANGE_REQUEST` üretir (protokol Stage 4).
- Makine kaydı: `company/machines.md` (Operasyon bilgisayarı = Main PC; Render bilgisayarı = Strong PC).

## 9. QA sahipliği
İşi yapan production agent kendi creative work'üne **final creative PASS veremez**. Strong PC teknik QA yapar; creative QA ayrı evaluator/session tarafından yapılır. Founder'ın final creative sorusu sadedir: **"Ben bunu gerçekten izlemeye devam eder miydim?"** Founder problemin sistem teşhisini yapmak zorunda değildir.

## 10. Öğrenme
Başlangıçta competitor/benchmark araştırması HEURISTIC veya EXPERIMENT olarak kullanılır. Kanal yayın yaptıkça first-party data önem kazanır. Retention, CTR, view duration, spikes/dips, returning viewers, packaging testleri kör threshold üretmek için değil, neden-sonuç hipotezleri için kullanılır. Öğrenim kendi katmanında kalır (case → channel → company yükselmesi Founder kararıyla).

## 11. Mimari değişiklik kontrolü
v2 kabul edildikten sonra her yeni gözlem kernel değişikliği yaratmaz. Yeni bulgu önce şu sınıflardan birine konur: **BLOCKER · EXPERIMENT · CASE-SPECIFIC · BACKLOG**. Production'ı güvenilmez hale getirmeyen iyileştirmeler v2.1+ backlog'a gider. Sürekli başa dönüş yok.

## 12. Korunacak kalıcı iş
research · evidence provenance · rights ledgers · finance · caption tooling · audio discipline · channel assets · brand fonts/tokens · machine inventory · decision/lesson history · verified P3 sources · clean P3 assets · voice/cost records · useful production components. Bunlar yeniden icat edilmez.

## Değişiklik geçmişi
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-10-14 | v2 company charter (yalnız şirket katmanı; kanal maddeleri Stage 2'ye ayrıldı) | Founder Charter 2026-10-14 · D-042 |
