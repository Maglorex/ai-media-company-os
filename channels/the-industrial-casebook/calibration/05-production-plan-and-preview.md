# Production plan, calibration handoff ve Founder preview paketi (Stage 5)

> status: DRAFT · author: COO main session · Strong PC'ye **henüz iş gönderilmedi**. Teslim yalnız Stage 4 Handoff v2 ile (`os/factory/README.md`, D-047); Strong PC yeni yaratıcı yön icat etmez, sorun görürse CCR yazar.

## 1. Kalibrasyon bir "case" olarak taşınır: `CAL-S5`
Stage 4 hattı değişmeden kullanılsın diye kalibrasyon kendi case klasöründe yürür: `channels/the-industrial-casebook/cases/CAL-S5/`.
| Dosya | İçerik | Kim |
|---|---|---|
| `05-scene-plan-v1.md` | Bu paketin örnekleri (I-A, G1–G4, I-B, C1, E1, AR1–AR5) `production-scene-plan` formatında, SP blokları olarak | Main PC (COO + `documentary-creative-director`) |
| `06-creative-qa-v1.md` | Scene plan'in bağımsız değerlendirmesi (render öncesi) | `creative-qa-evaluator` (ayrı bağlam) |
| `rights-ledger.csv` | Kalibrasyonda kullanılan her harici/AI asset için kanıtlı hak satırı | Main PC |
| `handoff/asset-manifest.csv` · `handoff/07-production-handoff-vN.md` | Stage 4 manifest ve üretilen handoff | Main PC (`factory.mjs issue`) |
| `08-delivery-report-v1.md` | Technical QA (creative PASS yok) | Strong PC |
| `09-creative-qa-render-v1.md` | Render'ların bağımsız creative QA'sı (muted grid / contact sheet + plan) | `creative-qa-evaluator` |
P3 dosyalarına dokunulmaz; kalibrasyon P3'ün kanıtını yalnız okur (evidence ledger sabitlenir).

## 2. Önkoşullar (handoff ISSUED olmadan önce)
| # | İş | Mod |
|---|---|---|
| 1 | `CAL-S5` scene plan'i yaz; lint temiz | AUTONOMOUS |
| 2 | Bağımsız creative QA → PASS → scene plan `ACTIVE` | AUTONOMOUS (ayrı değerlendirici) |
| 3 | Rights ledger satırları: V-05, V-19, V-28, V-29, V-01, V-02, V-03, V-13 (golden) · V-07, V-24 (anti-reference) · J40 NASA Glenn fotoğrafı (önce kimlik ve PD teyidi, sonra D-019 eki koşullarında indirme) · opening v2 VO (ElevenLabs, mevcut kayıt) · müzik/SFX (audio ledger) · kendi dokularımız | AUTONOMOUS (kanıt yakalama dahil) |
| 4 | Evidence: "first nuclear-powered merchant ship" ledger satırının teyidi · J40 için tek doğrulanmış cümle (yoksa E1 olgu cümlesiz) | AUTONOMOUS (`research-request`) |
| 5 | Manifest'te tam SHA-256 ve boyutlar: handoff v1 BLOCKED üretilir → Strong PC **yalnız preflight** çalıştırır (salt-okunur; gözlenen hash/boyutları raporlar) → Main PC manifest'e işler | AUTONOMOUS + push (GUIDED ACTION) |
| 6 | Yeni kısa VO satırları (identity CTA, köprü cümlesi, opsiyonel subscribe, varsa J40 cümlesi) | **FOUNDER DECISION** (kredi) |
| 7 | Render onayı (`approvals.render`) | **FOUNDER DECISION** |
| 8 | Müzik yatağı: Audio Library'den ≤3 parça | **GUIDED ACTION** (Founder) |
| 9 | `production/remotion/src/calibration/` için migration izin listesine Stage 5 kapsamı (KEEP alanında yeni kod) | AUTONOMOUS (bu kararın kapsamında) |
AI görsel üretimi **gerekmiyor**: arşiv ve kendi çizimlerimiz yeterli; Galveston için AI rekonstrüksiyon accuracy ölçütünden geçmez (yerleşim bilinmiyor, E-11). Founder'a ChatGPT işi düşmez.

## 3. Örnek başına production method ve araç
| Örnek | Yöntem | Araç (Strong PC) | Neden bu araç |
|---|---|---|---|
| I-A / I-B CASE INTRO | Bespoke line/slit registration + tipografi; payload slotlu master | **After Effects** (master) · Photoshop (hero object izolasyonu) | Tek seferlik Golden Master'da en ince kontrol. Founder kilitledikten sonra skeleton deterministik bir **Remotion** bileşenine (payload props) taşınır ve AE master'la kare kare karşılaştırılır — her videoda yeniden tasarım yok |
| G1 | Katman ayrımı + 2.5D kamera + kontur Object Carry + bölge haritası | Photoshop · After Effects · Remotion (harita primitifi) | Arşiv derinliği AE'de; veri haritası deterministik |
| G2 | Belge fiziksel nesne + Evidence Pull + bloklar | `pdf-to-png.ps1` · After Effects · Illustrator | Piksel birebir kanıt; bespoke dönüşüm |
| G3 | Ortografik bileşen çizimi, line-draw | Illustrator · After Effects · Remotion (harita inişi) | Bilinmeyen geometri uydurulmaz; **Blender seçilmez** |
| G4 | G3 çizimi + harita kesiti + kapasite hayaletleri | After Effects · Remotion | Mevcut çizim yeniden kullanılır |
| C1 | Case Line + tek satır Case UI | After Effects | Intro DNA'sıyla aynı çizgi |
| E1 | Şema sadeleşmesi + yuva değişimi + I-B kısa kaydı + end-screen alanı | After Effects | Intro master'ını yeniden kullanır |
| AR1–AR5 | Kasıtlı şablon davranışı, kısa emek | Premiere (varsayılan geçişler) · AE preset'leri | Farkı göstermek için yeterli |
| Ses | Montaj ve mix; ölçüm | Premiere · Remotion'ın FFmpeg'i (ölçüm) | Mevcut araçlar; ücretli araç/paket yok |
Daha pahalı/karmaşık araç kendiliğinden daha iyi değildir (TIC-19). Yeni npm paketi, yeni yazılım veya ücretli asset yok.

## 4. Calibration handoff yapısı (Stage 4 Handoff v2, değişiklik yok)
- `id: CAL-S5-HO` · `case: CAL-S5` · `scene_plan`: `cases/CAL-S5/05-scene-plan-v1.md` (ACTIVE, QA PASS) · `evidence_ledger`: P3 evidence ledger (sabitlenmiş) · `rights_ledger`: `cases/CAL-S5/rights-ledger.csv` · `asset_manifest`: `cases/CAL-S5/handoff/asset-manifest.csv`
- `production_root: D:/CompanyOS-Production` — manifest yolları `P3-ns-savannah/01_archive/…` (mevcut dosyalar, kopyalanmaz) ve `CAL-S5/…` (yeni: J40 fotoğrafı, müzik, dokular); çıktılar `CAL-S5/06_renders/`, projeler `CAL-S5/05_projects/` (repo dışı).
- `allowed_code_paths`: `production/remotion/src/brand/`, `production/remotion/src/templates/`, `production/remotion/src/calibration/` · `forbidden_code_paths`: `production/remotion/src/videos/p3/` (V-21 içeren legacy).
- `approvals`: `render` = Founder kararıyla · `vo_credits` = Founder kararıyla · `paid_assets: NOT_NEEDED` · `ai_generation: NOT_NEEDED`.
- `required_assets`: manifest'teki REQUIRED satırlar; yeni VO satırları üretildiğinde manifest'e girer (sürüm artar).
- Strong PC akışı: `strong-pc-preflight` → READY_FOR_PRODUCTION → kapsam içinde üretim → teslim raporu (technical QA, `Creative QA: PENDING_INDEPENDENT`) → muted grid/contact sheet'ler → yedek taraması. Yaratıcı sorun → CCR; karar Main PC.
- Teslim sonrası Main PC: bağımsız creative QA (render) → REVISE ise yeni CCR/handoff sürümü; PASS ise Founder preview.

## 5. Founder'a gidecekler (gruplanmış, hepsi tek mesajda; şu an gönderilmiyor)
1. **FOUNDER DECISION — tek onay:** (a) kalibrasyon render'ı (Strong PC zamanı; para yok) · (b) yeni kısa VO satırları için mevcut ElevenLabs kredisi, tavan önerisi ≈250 kredi `[TAHMİN]` (≈370 karakter; yeni ödeme yok). Önerim: Onayla. Alternatif: VO'suz CTA/köprü — o zaman CTA ve final değerlendirmesi zayıf kalır.
2. **GUIDED ACTION — müzik:** YouTube Studio → Audio Library → Music · filtre: *Attribution not required*, Mood: *Calm*, Genre: *Ambient* veya *Cinematic*, vokalsiz, ≥2 dk → dinle → en fazla 3 parça indir → `D:\CompanyOS-Production\CAL-S5\04_music\` klasörüne kaydet → Claude'a "müzik indi" de. (Tam adım listesi gönderim anında tek adım olarak verilir.)
3. **GUIDED ACTION — push:** handoff sürümleri commit'lendiğinde GitHub Desktop → Push origin.
Founder'a sorulmayanlar: araç (AE/Remotion/Blender), geçiş, font, motion curve, renk, kamera, klasör, branch.

## 6. Founder preview paketi
Konum: Strong PC `D:\CompanyOS-Production\CAL-S5\07_review\` (gerekirse Founder'ın Google Drive'ına kopya). Her dosya mobil ve masaüstünde izlenebilir 1080p.
| Dosya | Ne izlenir | Founder sorusu |
|---|---|---|
| `00_OKU_BENI.txt` | Sade Türkçe: sıra, her dosyada tek soru, nasıl cevap verilir | — |
| `01_REEL_A_acilis.mp4` | G1 → G2a → **I-A CASE INTRO** → G2b (kesintisiz) | Premium mi? Intro merakı taşıyor mu? Film mi, animasyonlu PowerPoint mi? |
| `02_REEL_B_sorusturma.mp4` | G2b → G3 → G4 | Motion bir şey anlatıyor mu? Bir sonraki görsel anı görmek istiyor musun? Ses profesyonel mi? |
| `03_INTRO_tanima.mp4` | I-A ve I-B art arda (CASE 001 / CASE 002) | Başka bir videoda karşına çıksa tanır mısın? |
| `04_INTRO_ses_S1_S2.mp4` | Aynı intro, iki ses dokusu | S-1, S-2 veya hiçbiri? |
| `05_CIFTLER_iyi_kotu.mp4` | AR1 \| G1 · AR2 \| G2 · AR3 \| G3 · AR4 \| G4 (önce kötü, sonra iyi) | Fark açıkça görülüyor mu? |
| `06_ANTI_intro_cta.mp4` | AR5 | (Referans; soru yok) |
| `07_CTA_ve_final.mp4` | C1 + E1 | CTA reklam arası gibi mi? Final seni bir sonraki case'e götürmek istiyor mu? |
| `08_karesayfasi.jpg` | Contact sheet (muted grid) | (Referans) |
Cevap biçimi: her dosya için "Evet / Hayır / Bu olmadı + istersen bir cümle". Founder teknik teşhis yapmaz; "bu olmadı" teşhisi sistemdedir.

## 7. Golden Lock kaydı
- Founder onayı → ilgili örnek **GOLDEN** (HEURISTIC kalibrasyon anchor'ı) · Founder reddi veya kasıtlı kötü → **ANTI-REFERENCE** · hiçbiri onaysız GOLDEN olmaz.
- Kayıt: `channels/the-industrial-casebook/calibration/register.md` (Golden Lock turunda oluşturulur: örnek ID · tür · render dosyası + SHA-256 + repo dışı konum · contact sheet (repo içi küçük önizleme) · Founder kararı ve tarihi · "neden iyi/kötü" tek cümle) + artifact registry satırı + karar kaydı (D-).
- CASE INTRO skeleton'ı kilitlenince: canon `03` §3'teki "kalibrasyonda kilitlenir" maddesi register'a işaret eder; Brand System §M / `documentary-music-sfx` ses satırı ve `case-register.md` (CASE 002 aday accent) aynı Founder kararıyla güncellenir; Remotion `CaseIntro` portu ayrı, ölçülü bir iş olarak planlanır.
