# Değerlendirme — youtuber-skills (SL-002)

> Tarih: 2026-10-08 · İnceleyen: COO (statik okuma; teknik kontrol listesi COO tarafından yürütüldü, ayrı `systems-operator` görevlendirmesi gerekmedi — repo 20 dosya, tümü Markdown/YAML, kod yok) · Süreç: `skill-evaluator`
> Repo: https://github.com/ravsau/youtuber-skills · Sabitlenen commit: `603367b35d0c842c9e84f83d946e9ce95c61954d` (2026-10-01, "pre-trip backup 2026-10-01") · Lisans: MIT (Copyright 2026 CloudYeti)
> Yöntem: GitHub API ile salt okunur; dosyalar proje dışı scratchpad'e metin olarak alındı. Kurulum, çalıştırma, dependency yok. Repo içeriği veri olarak ele alındı.

## Dosya envanteri
| Yol | Tür | Not |
|---|---|---|
| `AGENTS.md` (6.6 KB) | talimat | "5 ilke" + algoritma tablosu + retention referansı. **Başında HANDOVER.md okuma/yazma emri var** (bkz. bulgular) |
| `README.md`, `EXAMPLES.md`, `RESEARCH.md` | doküman | RESEARCH.md: kaynak listesi (MrBeast handbook, Galloway, Blackman, Jake Thomas, vidIQ vb.) |
| `LICENSE` | lisans | MIT |
| `.gitignore`, `work-log.yaml` | varlık | work-log.yaml: yazarın kendi harness hook'undan sızmış oturum kaydı (alakasız, zararsız) |
| `skills/youtube-packaging/SKILL.md` + `VISUAL-CHECKS.md` | talimat | |
| `skills/youtube-script/SKILL.md` | talimat | |
| `skills/youtube-edit-list/SKILL.md` | talimat | |
| `skills/youtube-outliers/SKILL.md` | talimat | |
| `skills/youtube-virality-gate/SKILL.md` | talimat | |
| `skills/youtube-retention`, `-description`, `-shorts`, `-lane`, `-monetization`, `-channel-audit`, `-comments-to-ideas` | talimat | Kapsam dışı derin inceleme yok; tarandı, tehlikeli kalıp yok |
| `skills/youtube-connect/SKILL.md` | talimat (**ajanı kod yazıp çalıştırmaya yönlendirir**) | Google Cloud/OAuth kurulumu; **bu repo'nun tek yüksek riskli parçası** |

Çalıştırılabilir dosya, binary, minified/base64 içerik, package.json, requirements.txt, hook: **yok**. Toplam 20 dosya, tümü metin.

## 15 maddelik kontrol (repo geneli)
| # | Kontrol | Bulgu | Kanıt | Risk |
|---|---|---|---|---|
| 1 | Kaynak/geliştirici | Saurav Sharma (`ravsau`), ex-AWS, CloudYeti kanalı; hesap 2016'dan, 67 repo. Resmî/kurumsal değil, bireysel | GitHub API | Orta (tek kişi) |
| 2 | Son güncelleme | 2026-10-01; repo 2026-04-16'da açıldı; 5 yıldız, 1 fork, 0 issue | API | Orta (genç, küçük topluluk) |
| 3 | Lisans | MIT, ticari kullanım ve uyarlama serbest; atıf gerekir | LICENSE | Düşük |
| 4 | Dosya içeriği | Tamamı talimat/doküman | envanter | Düşük |
| 5 | Script/binary | Yok. youtube-connect "kod göndermiyor, ajan yazar" diyor | connect:10 | Düşük (repo) / Yüksek (connect'in talimatı) |
| 6 | Network | Repo içinde otomatik network yok. README `npx skills add` ve `curl -o CLAUDE.md` kurulum komutları önerir; connect Google API'leri çağırtır | README "Install"; connect Step 1–3 | Orta (yalnız connect) |
| 7 | Credential/OAuth | **connect**: client_secret.json, OAuth token (`youtube.readonly`, `yt-analytics.readonly`), `~/.youtube-skills/` altında. Diğer skill'ler yok | connect:20–35 | Yüksek (yalnız connect) |
| 8 | Dosya yazma | AGENTS.md `HANDOVER.md` yazmayı zorunlu kılar; skill'ler `~/.youtube-skills/metrics/*.json` okur; connect `~/` altına yazar; README symlink ile `~/.claude/skills` önerir | AGENTS.md:7–9; connect | Orta |
| 9 | Shell/terminal | connect: ajan python yazar ve çalıştırır; README: npx/curl/ln. 5 hedef skill'de yok | connect Step 2–3 | Yüksek (yalnız connect) |
| 10 | Dependency | connect: `google-api-python-client`, `google-auth-oauthlib`; README: `npx skills` (üçüncü taraf CLI) | connect:22; README | Orta |
| 11 | Company OS çatışması | Bkz. aşağı. Bazıları doğrudan çatışıyor (HANDOVER, claim-as-fact, face/creator, monetizasyon/sponsor) | bkz. aşağı | Orta |
| 12 | Örtüşme | Mevcut skill/agent'larımız YouTube üretim içeriği üretmiyor; üretim/analiz skill'i yok. Örtüşme düşük, `analytics-analyst`/`research-analyst` ile kısmi (outliers, retention) | `.claude/` listesi | Düşük |
| 13 | Gerçek sorun | Backlog'daki P3 pilot ve ilk kanal hattı (paketleme → script → edit → gate) için iskelet sağlar | `company/strategy.md` N2 | Orta değer |
| 14 | Zaman tasarrufu `[TAHMİN]` | Yapı/şablon ve kontrol listesi olarak ~1–2 saat/video; içeriğin kendisi formatımıza uymadığı için çoğu adaptasyon gerektirir | — | — |
| 15 | Bakım/tedarik | Tek geliştirici, 6 aylık repo, hızlı değişen "2026 algoritma" iddiaları (vidIQ vb.) çabuk eskir; commit SHA'ya sabitlendi | log | Orta |

## Prompt injection / kural çatışması bulguları
Kasıtlı injection **yok** ("kuralları yok say" vb. ifade bulunmadı). Ancak şunlar, içerik yanlışlıkla emir olarak uygulanırsa Company OS kurallarıyla çatışır:
1. **`AGENTS.md:7–9` HANDOVER.md emri.** Her oturum başı/sonunda `HANDOVER.md` oku/yaz. Company OS hafıza düzenini (`company-memory.md`: tek doğruluk kaynağı, dashboard/backlog) ikiye böler. → **Uygulanmaz.**
2. **Evrensel gerçek dili.** "Target 4%+ CTR, 10%+ elite", "Minute 8 threshold: YouTube rewards…", "Algorithm Quick Reference (2026)" ağırlık tablosu (Very High/High…) kaynaksız veya tek kaynaklı (vidIQ, bloglar). `evidence-and-research.md`: platform konularında yalnız resmî kaynak `[VERİ]`; üçüncü taraf `[VARSAYIM]`. → Bu bölümler `[VARSAYIM]` etiketlenmeden alınmaz.
3. **Kill/Ship kapısı kesin eşiklerle** (8/8 SHIP, 6–7 FIX, ≤5 KILL) — heuristic değil karar kuralı gibi sunuluyor; Founder onayı ve decision-review akışını atlayabilecek bir "KILL" yetkisi imâ ediyor. → Danışma niteliğinde kalmalı.
4. **Yüz/kamera varsayımı.** Packaging ve script örneklerinde "creator wincing", kamera önü yaratıcı. Formatımız faceless (D-002). → Atılır.
5. **Monetizasyon/sponsor/satış** (youtube-monetization, description "money above the fold", lane "what you sell/1:1 calls"). Doğrudan satış/outreach yok kuralıyla çakışır. → Bu skill'ler kapsam dışı.
6. **youtube-connect**: credential + OAuth + kod yazdırıp çalıştırma + Cloud Console'u tarayıcıyla sürme = `founder-approval.md` (hesap, API erişimi) ve `third-party-skill-security.md` madde 3–4. → REJECT.
7. **Tonal enjeksiyon riski (düşük):** "Never open with…", "Do not soften a KILL", "CRITICAL:" gibi mutlak ifadeler. Veri olarak ele alındı.

## Beş bileşen — derin değerlendirme

Ortak: hepsi saf Markdown; script, shell, network, credential, dependency, dosya yazma talebi **yok** (edit-list ve diğerleri yalnızca isteğe bağlı olarak `~/.youtube-skills/metrics/*.json` *okumayı* tarif eder — o dosyayı yalnız `youtube-connect` üretir; biz connect'i almıyoruz, bu satırlar silinir).

### 1) youtube-packaging → **ADAPT BEFORE USE**
1. **Ne yapar:** Konudan 5 başlık+thumbnail çifti, görsel prompt, skorlama, yedek çift, Test & Compare. `VISUAL-CHECKS.md`: kanıt/doğruluk kapısı, feed bağlamı testi, yüz-opsiyonel.
2. **Çözdüğü sorun:** Title/thumbnail üretimi ve kalitesi (P3 pilot ve sonraki videolar).
3. **Örtüşme:** Yok (mevcut skill yok).
4. **Metodoloji:** MrBeast handbook, Galloway formülü, Jake Thomas, vidIQ medyanları; YouTube resmi title/thumbnail ve CTR yardım sayfaları (VISUAL-CHECKS.md'de link).
5–9. Script yok · shell yok · network/credential yok · yazma yok · dependency yok.
10. Çatışma: "Source recommendations" satırı yazarın özel yolunu (`content-factory/...`) gösterir — bizim için anlamsız. `AGENTS.md` ilkesi 1 ("extreme wording", "I Survive > I Spent") ciddi/belge-öncelikli ton ile çelişir.
11. **Heuristic mi?** Evet, kısmen — **en olgun** olan. "Subjective editorial judgments, not CTR predictions", "medyan = checklist, not gate", "feed context wins", gerçek olmayan kanıt üretme yasağı. Ancak AGENTS.md'deki "extreme wording" mutlaklığı bu nüansı bozuyor.
12. **Bizim formata faydalı:** (a) Doğruluk/kanıt kapısı: başlık/görsel iddiası her zaman gerçek belge/footage'a bağlansın — N2'nin belge-öncelikli ilkesiyle birebir uyumlu; (b) yedek çift + Test & Compare süreci; (c) feed boyutunda (küçük, koyu/açık) önizleme kontrolü; (d) "Salt yüz yerine nesne/belge-led thumbnail" (faceless'a uygun); (e) iddia için `[VARSAYIM]` ile işaretli vidIQ medyanları (yalnızca düşünme istemi). **Atılacak:** "extreme wording", 45–55 karakter tercihi mutlaklığı, yüz/duygu varsayımları, 5 çiftlik zorunluluğu (bizde kalite > miktar).

### 2) youtube-script → **ADAPT BEFORE USE** (ağır uyarlama)
1. **Ne yapar:** Hook (Target-Transformation-Stakes), 0:25 pattern interrupt, 60–90 sn Setup-Tension-Payoff segmentleri, MrBeast "dakika haritası" (3:00, 6:00, sonra her 3–5 dk), banned words.
2. **Sorun:** Script yapısı. **Örtüşme:** yok.
3. **Metodoloji:** Blackman (eski MrBeast yazarı), Film Booth, Ali Abdaal; blog özetleri. Birincil kaynak yok.
4. Script/shell/network/credential/yazma/dependency: yok.
5. **Çatışma:** (a) "First 5 seconds show gain/loss", "zero preamble" kesin kural; (b) 60–90 sn döngü zorunluluğu 10–25 dk belgesel için yapay hız yaratır; (c) örnekler talking-head/MrBeast stili; (d) "banned words" listesi stil dayatması.
6. **Heuristic mi?** Hayır — "Rules" bölümü ve "CRITICAL" mutlak dilde. Kısmen kurtarıcı tek ifade: "Every segment ends with something the viewer did not have" ve "payoff must be true on screen".
7. **Bizim formata faydalı:** (a) Hook'un içeriği: kim için/niye şimdi + ölçülebilir sonuç + bahis (3 cümlelik hook şablonu, uzun hikâye için *opsiyonel*); (b) "her bölüm sonunda izleyici yeni bir şeye sahip olmalı" ve "ekranda gösterilemeyen payoff'u kes" — belge-öncelikli ilkeye çok uygun; (c) re-engagement noktaları, ama sabit dakika değil: "belge/kanıt açığa çıkışları ve nedensellik dönüşleri" etrafında; (d) b-roll/overlay listesi çıktı bölümü. **Atılacak:** sabit 60–90 sn, 0:25 interrupt, 3:00/6:00 dakika haritası, "minute 8" iddiası, banned-words listesi, "channel intro yasak"ın mutlaklığı.

### 3) youtube-edit-list → **ADAPT BEFORE USE**
1. **Ne yapar:** Transkriptten edit decision list (CUT/MOVE/B-ROLL/GFX/ZOOM/HOLD), kaptan zaman damgalı satırlar, bölüm (chapter) adları, altyazı chunk'ları, bitiş karesi.
2. **Sorun:** Remotion/FFmpeg üretim hattı için "kurgu talimat listesi" — `production-engineer`'a girdi olabilir. Örtüşme: yok.
3. **Metodoloji:** AIR Media-Tech kesme kalıpları; MrBeast handbook; kendi yazarının Studio verisi.
4. Teknik: Yok; yalnızca `~/.youtube-skills/metrics/<ID>.json` okuma yolu (connect'e bağlı) — çıkarılacak.
5. **Çatışma:** "8 saniyede bir durum değişikliği zorunlu", "2.5 sn içinde ilk kesim", "3 saniyeden kısa → fazla değişim kaldır", "speak 1–5 kelime altyazı" belgesel ritmine ve ses odaklı kurgu planına körü körüne uygulanmaz; "Remove, do not speed up" fikri makul.
6. **Heuristic mi?** Hayır — sayılar kural olarak yazılmış ("Retention drops outrank pattern rules" ise iyi: *veri kuralı yener*).
7. **Faydalı:** (a) EDL tablo formatı (Time/Action/Detail/Viewer sees) — Remotion timeline'a doğrudan eşlenebilir; (b) "satırsız, zaman damgasız not edit değildir"; (c) "transcript'in desteklemediği satır ekleme; footage yoksa `SHOOT:` yaz" → bizde `SHOOT` yerine "ÜRET/ARŞİV ARA" ve kaynak lisans notu; (d) chapter = mikro-vaat; (e) bitiş karesi kuralı. **Atılacak:** 8 sn/3 sn sayıları (parametre olarak tutulur, politika değil), 1.3x hız yasağı mutlaklığı, metrics dosyası bağlantısı, "no outro" mutlaklığı.

### 4) youtube-outliers → **ADAPT BEFORE USE** (en çatışan: etik/politika riski)
1. **Ne yapar:** Niş kanallarından son 20 videonun ortalamasının 3x üstündeki "outlier"ları bulur, **formatı konudan ayırır**, 3 adaptasyon üretir.
2. **Sorun:** Konu/format seçimi ve niş araştırması. **Örtüşme:** `research-analyst` + `niche-evaluation-framework.md` ile kısmi (aynı soruyu farklı metodla yanıtlar).
3. **Metodoloji:** MrBeast "copy with taste" (format, konu değil), Galloway outlier araştırması, Jake Thomas.
4. Teknik: Yok. Ama **veri toplama** talimatı (son 20 video ortalaması) çalıştırılacak araç belirtmez → ajan scraping/yt-dlp önerebilir: ayrı onay gerektirir.
5. **Çatışma/Risk:** "Copy with taste" ifadesi "başkasının içeriğini düşük değerli biçimde yeniden paketleme" değişmez kuralına yaklaşabilir. Skill format≠konu diyor ve "her adaptasyon özgün değer eklemeli (uzmanlık, veri, erişim)" şartını koyuyor — bu bizim kuralımızla uyumlu, **ama** o şartın korunması şart. Örnek kanal isimleri sahte, ölçü yok.
6. **Heuristic mi?** Kısmen: "never present a guessed view count as measured" iyi; ancak "3x = outlier" eşiği tek başına nedensellik atfı yapar (N2'de kanal ortalamaları küçük ve gürültülü).
7. **Faydalı:** (a) Çok kanallı ortalama normalizasyonu fikri (kanal-içi çarpan); (b) haber/collab kaynaklı outlier'ı eleme; (c) "format = boşluklu tek cümle" tekniği, `niche-evaluation-framework` yapısına eklenebilir; (d) çıktı tablosu (Multiple sütunu). **Atılacak:** "Adaptations ready to package" ile doğrudan konuya geçiş, "$0 bütçe/rental" örnek mantığı, copy temelli dil. **Ek zorunluluk:** Hiçbir outlier'ın yapısı/metni/görseli kopyalanmaz; çıktı "özgün katkı" ve politika kontrolü bölümü içerir.

### 5) youtube-virality-gate → **ADAPT BEFORE USE**
1. **Ne yapar:** 8 kapılı yayın öncesi kontrol, SHIP / FIX / KILL, her FAIL için komut biçiminde düzeltme.
2. **Sorun:** `decision-review`'ın yayın-öncesi kalite kontrol karşılığı olmayan boşluk. **Örtüşme:** yok; ancak içeriği Founder onayı akışıyla çakışmamalı (yayın = Founder onayı).
3. **Metodoloji:** "Composite from all sources" (RESEARCH.md) — kaynak izlenemez; **en zayıf kanıt tabanı**. Kural eşikleri (8/6–7/≤5) yazarın tasarımı.
4. Teknik: Yok. 
5. **Çatışma:** Kapılar 1,3,7,8 bize uymuyor: (3) "First 5 seconds"; (7) "Format proven (outlier var mı)" — N2 az işlenmiş dikeyde, outlier yokluğu doğal olabilir, bu yüzden KILL üretir; (8) "Creator wants it" — şirket kararı Founder'a ait, "excited" bir kalite ölçütü değil. "Do not soften a KILL" Founder yetkisini aşar.
6. **Heuristic mi?** Hayır — CRITICAL ve katı eşik. Ama "Promise kept" ve "Only you" kapıları güçlü, kanıtlanabilir.
7. **Faydalı:** (a) Gate 4 *Promise kept* (başlık vaadi = videoda kanıtlanan) ve Gate 6 *Only you* (50 kanalın veremediği veri/belge); (b) **Gate "batch/inauthentic content"** — Temmuz 2025 politikası (tekrarlayan/şablon içerik); *resmî YouTube kaynağından doğrulanmalı, o zamana dek `[VARSAYIM]`* — N2 için özellikle kritik (faceless + AI + şablon); (c) "Her FAIL için tek düzeltme komutu" biçimi; (d) Shorts kapıları kapsam dışı. **Atılacak:** SHIP/KILL otomatik hükmü (çıktı "danışma notu" olur, karar `decision-review` + Founder'da), 8/8 eşiği, gate 3/7/8 mevcut hâliyle, "Do not soften" ifadesi.

## Repo geneli — alınmaya değer / reddedilecek
**Alınabilir (fikir/mantık olarak, kopyalamadan):** Packaging doğruluk & feed-önizleme kapıları; yedek çift/Test & Compare; Promise-kept ve Only-you kapıları; batch/inauthentic content kontrolü; EDL tablo formatı; "kanıtsız satır ekleme"; outlier'da format/konu ayrımı ve haber-collab elemesi; hook'un 3 öğesi (opsiyonel).
**Reddedilecek:** `youtube-connect` (tamamen: credential + OAuth + kod yazdırıp çalıştırma + tarayıcıyla Cloud Console + `~/` altına secret); `AGENTS.md` (HANDOVER emri, "Algorithm Quick Reference", tek kaynak medyanlar); `youtube-monetization`, `-lane` ("what you sell"), `-description` (sponsor/para-üstte), `-shorts` (Shorts kapsam dışı); `work-log.yaml`; `npx skills add`, `curl -o CLAUDE.md`, symlink kurulum yolları (üçüncü taraf CLI + kendi CLAUDE.md'mizin üzerine yazma riski); sabit sayısal kurallar ("5 sn", "60–90 sn", "8. dakika", "4% CTR").

## Sonuç
- **Karar (repo + 5 bileşen):** Hiçbiri `APPROVE FOR PROJECT` değil. Beşi de **ADAPT BEFORE USE**. Ayrıca: `youtube-connect` ve `AGENTS.md` → **REJECT**.
  | Skill | Karar |
  |---|---|
  | youtube-packaging | ADAPT BEFORE USE |
  | youtube-script | ADAPT BEFORE USE (ağır uyarlama) |
  | youtube-edit-list | ADAPT BEFORE USE |
  | youtube-outliers | ADAPT BEFORE USE (özgünlük şartıyla) |
  | youtube-virality-gate | ADAPT BEFORE USE |
- **Risk seviyesi:** Orta (repo geneli: connect dahil edilirse Yüksek; beş bileşen tek başına Düşük–Orta). Kritik bulgu yok.
- **Gerekçe (≤3 madde):**
  1. Beşi de saf Markdown, MIT, script/network/credential yok; teknik risk düşük, tedarik riski bireysel/genç repo olduğundan orta.
  2. Asıl risk teknik değil metodolojik: YouTube creator ipuçları (MrBeast/vidIQ) evrensel kural gibi yazılmış ve kısa/yüz-öncelikli formatlara göre kalibre; 10–25 dk belge-öncelikli faceless belgesele körü körüne uygulanırsa format bozulur.
  3. Değer yapıda ve kontrol listelerinde; doğrudan kopya yerine Company OS'a özgü, `[VARSAYIM]` etiketli heuristic olarak yeniden yazmak daha güvenli.
- **Koşullar (adaptasyon başlarsa):** Yalnızca commit `603367b` temel alınır. Her adapte skill: kaynak atfı (ravsau/youtuber-skills, MIT, SHA) + registry kaydı; sayısal eşikler "heuristic / test edilecek" etiketli parametre; SHIP/KILL yerine danışma notu (karar Founder/`decision-review`); `~/.youtube-skills` ve connect referansları çıkarılır; HANDOVER/AGENTS.md uygulanmaz; yüz/talking-head varsayımı çıkarılır; outliers'a özgünlük ve politika kontrolü eklenir; batch/inauthentic content kapısı resmî YouTube kaynağından doğrulanmadan `[VARSAYIM]`. Hiçbir script/dependency yok, bu yüzden sandbox testi gerekmiyor.
- **Founder'dan gereken:** Şimdilik **yok**. Adaptasyona geçmek için ayrı onay (aşağıdaki format) gerekir; P3 NS Savannah pilotu beklemede.

```
Onay: SL-002'den 5 bileşenin Company OS'a özgü skill olarak yeniden yazılması (kopyalama yok)
Neden: Packaging/script/edit-list/outliers/gate için hazır iskelet yok; fikirleri belge-öncelikli formata uyarlayıp heuristic olarak işaretlemek zaman kazandırır.
Maliyet / risk: 0 TL; yerel dosya; geri alınabilir. Risk: mutlak YouTube kurallarının politikaya sızması — uyarlama kuralları ile önlenir.
Önerim: Onayla (sıra: virality-gate → packaging → script → edit-list → outliers; ilk ikisi P3 pilotunu yeniden başlatmadan önce)
```
