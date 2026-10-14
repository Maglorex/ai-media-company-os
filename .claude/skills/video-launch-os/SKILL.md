---
name: video-launch-os
description: The Industrial Casebook videolarının fikirden yayın sonrası öğrenime kadar keşif, dağıtım stratejisi (Browse-first / Search-assisted Browse / Search-first / Existing-audience-first), talep araştırması, Search Intent Brief, Packaging v2 finalistleri, title/thumbnail kuralları, description, kaynaklar, chapters, captions, dil, disclosure, end screen, cards, playlist, yayın zamanı, native A/B testi, long-form'dan türetilen Shorts adaylarını ve Launch Package'ı Founder müdahalesi olmadan yönetir. Fikir shortliste girdiğinde, packaging aşamasında, production handoff yazılırken (end screen ve thumbnail asset planı), final edit sonrası ve yayın öncesi kullan. Yayınlamaz, upload etmez, hesap ayarı değiştirmez.
---

# Video Launch OS v1

Karar: D-035. Katmanı olduğu sistem: Growth Intelligence (`intelligence/growth/README.md`; I-, FC-, VID-, PT-). Resmî ilkeler: `intelligence/growth/launch-os/youtube-official-principles.md` (SOURCE-VERIFIED, P-01…P-13). Yetenek takibi: `intelligence/growth/launch-os/capabilities.md`. Kapı: `pre-publish-qa` (**Release Gate**). Paket: `PUBLISH-PACKAGE-SCHEMA.json` (makine, kanonik) + `LAUNCH-PACKAGE-TEMPLATE.md` (insan aynası). Ayarlar: `UPLOAD-SETTINGS-MATRIX.md`. Altyazı: `CAPTION-PROTOCOL.md`. Thumbnail: `THUMBNAIL-PRODUCTION-SPEC.md`. Haklar: `production/rights/README.md`. Kanal durumu: `intelligence/growth/launch-os/capabilities.md` (SYSTEM READY ↔ CHANNEL CAPABILITY VERIFIED).
Uygulayıcı: COO; talep araştırması `research-analyst`; packaging yaratıcı yönü `documentary-creative-director`; metrik `analytics-analyst`.
**Founder'a sorulmaz:** keyword, tag, description, chapter timestamp, caption formatı, card zamanı, playlist yeri, boilerplate, yayın saati detayı (olağandışı risk yoksa). **Founder'a gelir:** prototype kapısı ("Bunu izlemeye devam eder miydin?"), gerçekten stratejik packaging seçimi (en fazla 2–3 finalist), yayın öncesi tek onay ("Önerilen paket bu; launch onaylıyor musun?"), gerekli olduğu kesinse disclosure toggle'ı.

## 0. Akış ve kapılar (fikirden öğrenime)
| # | Aşama | Gate / çıktı | Mevcut sistem |
|---|---|---|---|
| G1 | Fikir shortlist | Talep araştırması (§2) + **dağıtım stratejisi tipi** (§1) | `growth-idea-scoring`, `research-analyst` |
| G2 | Üretilebilirlik | READY/REVISE | `documentary-virality-gate` |
| G3 | Packaging v2 | ≥3 farklı açılı finalist (§4), birincil + 2 A/B varyantı | `documentary-packaging` |
| G4 | Kanıt | Ledger temiz | `documentary-evidence-ledger` |
| G5 | Search Intent Brief | §3 (packaging ile aynı turda; script'i değiştirmez) | bu skill |
| G6 | Yaratıcı yön (+ prototype yalnız kullanılırsa, D-043) | Treatment, source-to-visual, ident (D-044), [prototype + muted gate], bağımsız creative QA + Founder kapısı | creative-standards, brand rule |
| G7 | Full handoff | **End-screen aware son 5–20 sn** + **thumbnail hero asset planı** (§6, §16) | `documentary-production-handoff` |
| G8 | Final edit sonrası | Chapters kararı, captions dosyası, description, credits, end screen/cards planı | bu skill §8–§12 |
| G8b | Shorts türevleri | Final kilitten sonra **0–4 aday** (hedef 2–4, kalite eşiği yoksa daha az) seçilir ve 9:16 yeniden kurgu planı yazılır (§25) | bu skill §25 |
| G9 | Launch Package | Tek kanonik paket (şablon; `shorts_plan` dahil) | bu skill §20 |
| G10 | **Release Gate** A (G-01…G-17a) | PASS / FAIL / MANUAL-DECISION; FAIL → public yasak | `pre-publish-qa` |
| G11 | Founder onayı | Paket + yayın (tek onay) | `founder-interface` |
| G12 | Upload (Private) → Release Gate B (G-17…G-19) → Public | `pre-publish-qa` | Founder (Studio işlemi; paketten birebir) |
| G13 | Yayın sonrası | Pencereler + teşhis + sistem güncellemesi (§22–§24) | `growth-performance-review` |

## 1. Keşif modeli ve dağıtım stratejisi
- **SEARCH:** relevance + engagement + quality (P-01, P-02). Relevance için title, description, video içeriği uyumu; tag minimal (P-03).
- **HOME / SUGGESTED:** appeal + engagement + satisfaction (P-04).
Her video için bir tip seçilir ve gerekçesi yazılır (FC dosyasına da):
| Tip | Ne zaman | Packaging'e etkisi |
|---|---|---|
| **Browse-first** | Konu az aranıyor ama merak/paradoks güçlü | Title merak + doğruluk; arama kelimesi zorlanmaz |
| **Search-assisted Browse** | Tanınır bir isim/nesne var (ör. NS Savannah), ama asıl çekim paradoks | İsim title'ın başında, merak ikinci yarıda |
| **Search-first** | Yüksek, kanıtlanmış sorgu talebi + az iyi cevap | Primary query title başında; açıklayıcı title |
| **Existing-audience-first** | Kanal izleyicisi oluştuktan sonra seri/devam | Seri dili, önceki case bağlantısı |
Yeni kanal: **varsayılan Search-first değildir.** Belgeselde geniş erişim çoğu zaman packaging + öneriden gelir; SEO packaging'i bozmaz.

## 2. Talep araştırması (topic shortliste girince)
Birlikte okunur: YouTube Trends · güncel YouTube arama önerileri (autocomplete) · rakip/outlier kanıtı (`outliers.md`) · erişilebilen keyword metrikleri · kendi kanal verisi (varsa — üçüncü taraf tahminlerinden güçlüdür, K1).
**Kesin hacim yoksa uydurulmaz** ("bilinmiyor" yazılır). Doğrudan metrik erişimi yoksa Founder'a "araştır" denmez; tek kod bloğunda hazır ChatGPT isteği verilir, Founder sonucu yapıştırır, sonuç `[VARSAYIM]` olarak işlenir (kaynakları kontrol edilene kadar):
```
Research YouTube search demand for a documentary video. Language: English. Audience: international, US-heavy.
Seed topic: [konu]
Candidate phrases: [3–8 aday ifade]
For each phrase, report with sources and dates: (1) relative search demand on YouTube (state the tool/source; if no exact volume, say "unknown" — do not estimate silently), (2) competition: top-ranking videos (title, channel, views, age), (3) breakout/outlier videos in the last 24 months on this topic, (4) recent momentum (YouTube Trends / Google Trends YouTube Search, last 12 months), (5) related queries and common misspellings / alternate names / acronyms.
Then: which phrase best matches a documentary about [tek cümle vaat], and is this topic more Search-driven or Browse/Suggested-driven? Cite every source with a link.
```
Kayıt: `outliers.md` (OL-) + idea-registry satırı + Search Intent Brief.

## 3. Search Intent Brief (yayın öncesi, video başına)
- **1 primary query/theme** · **2–4 supporting concept** · yararlıysa isim varyantı/yanlış yazım/kısaltma.
- Primary query hikâyenin doğal konusudur. **Script keyword için değiştirilmez.** Araştırma yapılmadan aday ifadeler metrik sayılmaz (`[VARSAYIM]`).
- Kullanım: title (dağıtım tipine göre), description ilk 2–3 satır, captions (doğal olarak zaten içerir), gerekiyorsa tag.

## 4. Packaging System v2 (production'dan önce)
Production'a tek title/thumbnail ile girilmez. `documentary-packaging` içeride ≥5 concept üretir; creative director + growth değerlendirmesi eler; **≥3 gerçekten farklı açılı finalist** kayda geçer. Açılar: paradoks · spesifik maliyet/sonuç · karar/hata · gizem/soru · tanınır nesne + beklenmedik sonuç. Kanıt aşılmaz.
Her finalist: title · thumbnail görsel fikri · core promise · hedef izleyici · Browse vs Search rolü · kanıt desteği (ledger satırı) · doygunluk riski · rakip benzerliği.
Çıktı: **birincil paket + 2 A/B varyantı** (birbirine çok benzemeyen). Founder'a yalnız stratejik seçim gerektiğinde ≤3 finalist; 20 seçenek dökülmez.

## 5. Title kuralları
Doğru · kısa · en önemli bilgi başta · merak yaratır ama yanıltmaz · case/bölüm numarası değerli alanı işgal etmez · gereksiz ALL CAPS/emoji yok (P-05). Search ve curiosity arasında kör tercih yok: §1 tipine göre. Title ve thumbnail aynı şeyi tekrar etmez; birlikte tek vaat.

## 6. Thumbnail
Custom thumbnail zorunlu (Intermediate Features — telefon doğrulaması; `capabilities.md` C-05). Tek baskın fikir · az rakip öğe · hero object / kanıt / sonuç · Brand grameri + case accent (`brand-system-v1.md` §J). Amaç vaadi bir bakışta anlatmak. **Thumbnail hero asset'i (kaynak foto veya AI) full handoff'ta planlanır** — final sonrası "asset yok" durumu yaşanmaz. AI hero asset → asset ledger `AI-GENERATED / ILLUSTRATIVE`. Üretim kuralları: `THUMBNAIL-PRODUCTION-SPEC.md`. QA: Release Gate G-04, G-14.

## 7. Native A/B testi — eligibility mantığı (P-11, P-18)
Birincil + 2 varyant sistemi korunur, ama test **kör varsayılmaz**. Karar ağacı (`ab_plan.eligibility`):
1. Kanal **Advanced Features** açık mı (`capabilities.md` C-04)? (Custom thumbnail ise Intermediate Features/telefon doğrulaması — C-03/C-05.) Hayır → `BLOCKED_ADVANCED_FEATURES` (varyantlar saklanır; açılınca sonraki videolarda).
2. Video long-form mu (Shorts / Scheduled Live / bitmemiş Premiere değil)? Değil → `BLOCKED_VIDEO_TYPE`.
3. Made for kids / mature / private / age-restricted mi? Evet → `BLOCKED_AGE_RESTRICTED` (veya ilgili engel). Not: private video test edilemez → test public yayınla birlikte (`AT_PUBLISH`) veya yayından sonra başlar.
4. Varyantlar gerçekten farklı mı (THUMBNAIL-PRODUCTION-SPEC §8)? Değil → test yok, varyantlar düzeltilir.
5. Hepsi geçti → `ELIGIBLE`; masaüstü Studio'da başlatılır (Founder işlemi; launch onayının parçası).
**Test sırasında:** title/thumbnail **elle değiştirilmez** (değişiklik testi otomatik durdurur; elle yeniden başlatmak gerekir).
**Süre ve düşük gösterim:** test birkaç gün–2 hafta; 14 günde sonuç yoksa veya gösterim çok düşükse test durdurulur, A kalır, `INCONCLUSIVE_LOW_IMPRESSIONS` olarak kaydedilir — **başarısızlık değildir**.
**Sonuçlar:** **Winner** → kazanan kalır (YouTube uygular), PT- kaydı, aynı yön 2+ videoda tekrar ederse packaging heuristiğine öneri · **Performed Same** → A kalır (kanıt diğerini desteklemiyorsa), kayıt · **Inconclusive** → ilk yüklenen (A) kalır, kayıt. Her durumda sonraki videoda farklı eksen test edilir.
Hipotez testten önce `packaging-tests.md`'ye (PT-). CTR-only üçüncü taraf mantığı native testin önüne konmaz.

## 8. Description Package
Her videoya **benzersiz** (P-06). İlk 2–3 satır: ne hakkında · ana çatışma · primary topic doğal ifadeyle. Keyword stuffing yok. Sonra gerektikçe: kısa bağlam · **Sources / Further Reading** (§9) · arşiv/foto kredileri · müzik attribution (`documentary-music-sfx` audio ledger'dan otomatik) · AI kullanım bağlamı (yararlıysa) · kanal konumlama · ilgili playlist/video linkleri. Kanal boilerplate'i yalnız alt bölümde (`intelligence/growth/launch-os/` altında tek kaynak; oluşturulunca).

## 9. Sources / Evidence (description)
Büyük birincil kaynaklar, kritik resmî raporlar, özel arşiv asset'leri; ledger ile birebir tutarlı (aynı başlık, kurum, yıl, sayfa). Atıf gerektiren asset'ler (ör. V-05 "AEC / National Archives") ledger §C'den otomatik aktarılır. Her kaynağı listelemek zorunlu değil.

## 10. Chapters
Final edit sonrası "manuel chapter yararlı mı?" kararı. Kullanılırsa: 00:00 başlangıç, ≥3, kronolojik, her biri ≥10 sn (P-08). Başlıklar faydalı, açıklayıcı, kısa; SEO spam değil; **anlatı gizemini bozan spoiler yok**. Zorunlu değil; kullanılmazsa nedeni pakette yazılır (otomatik chapters açık/kapalı kararı dahil).

## 11. Captions
Tam protokol: `CAPTION-PROTOCOL.md` (final VO + kelime zaman damgası → SRT, QC, Studio doğrulaması). Auto-caption yalnız yedek, kontrolsüz final kabul edilmez. Çeviri yalnız coğrafya verisiyle.

## 12. Dil
Konuşma dili English; video language doğru ayarlanır; title/description English. Metadata Türkçeye çevrilmez. Lokalizasyon ileride analytics gerekçesiyle.

## 13. Altered / synthetic disclosure
`pre-publish-qa` zorunlu soru (P-13). Stilize diyagram/illüstrasyon otomatik "gerçek olay" sayılmaz. Foto-gerçekçi rekonstrüksiyon veya gerçekçi sentetik olay/kişi varsa güncel politika sayfasına göre değerlendirilir; Founder'a yalnız gerçekten gerekli toggle kararı gelir.

## 14. Haklar
Kullanım hakkı ≠ kredi. Kanonik hak kaydı: `production/rights/README.md` (rights ledger + Copyright Gate) + audio ledger. `UNKNOWN_RIGHTS`/`UNRESOLVED_RIGHTS` varsa public yok. YouTube Checks yararlıdır ama kesin değildir (P-10); rights ledger'ın yerine geçmez.

## 15. Upload durumu
Varsayılan: **Private** upload (gerekirse Unlisted) → Release Gate B → Founder onayı → public/planlı. Doğrudan public upload yok. Tüm alanların varsayılanı/istisnası: `UPLOAD-SETTINGS-MATRIX.md`.

## 16. End screen
Full handoff videonun **son 5–20 sn**'sini end-screen aware tasarlar (P-09): öğeler için boş alan, anlatı kapanışı bu alanla çakışmaz. Öğeler (uygun olduğunda): sonraki ilgili video · best for viewer · playlist · subscribe. İlk videoda ilgili video az olabilir → subscribe + (varsa) playlist. Performans analytics'te izlenir.

## 17. Cards
Yalnız izleyiciye gerçek değer katarsa (ilgili case, açıklayıcı eski video, playlist). Zorunlu değil; retention'ı bozacak card spam yok.

## 18. Playlist / case mimarisi
1–2 video varken boş playlist ağı kurulmaz. Kanal büyüdükçe içerik kovaları (aday: Industrial Autopsies · Machines That Changed Industries · Failed Programs · Infrastructure & Systems). Series playlist değerlendirilir (P-22): doğrulanmış hesap gerekir; bir video aynı anda yalnız **bir** resmî series playlist'te olabilir → bilinçli seçim; yalnız kendi yüklediğimiz ve haklarına sahip olduğumuz videolar.

## 19. Yayın zamanı
"Sihirli saat" yok. İlk videolarda zaman: production hazırlığı + izleyici coğrafyası hipotezi (ABD ağırlıklı) + tutarlılık; **ilk yayın zamanı bir deney olarak kaydedilir** (EXP/FC notu). Veri gelince "When your viewers are on YouTube".

## 20. Launch Package
Yayın öncesi tek kanonik paket: `<VID>-publish-package.json` (`PUBLISH-PACKAGE-SCHEMA.json`) + insan aynası `<VID>-launch-package.md` (`LAUNCH-PACKAGE-TEMPLATE.md`). Founder upload ekranında karar vermez; Studio'daki her alan paketten birebir girilir (Release Gate G-19).

## 21. Thumbnail / preview QA
Muted preview gate korunur (`muted-preview-gate`, Release Gate G-17a); thumbnail QA Release Gate G-04/G-14.

## 22–24. Yayın sonrası döngü
`growth-performance-review` yürütür (pencereler; YouTube resmî kavramları ile bizim proxy metriklerimiz **ayrı** sınıflanır; kayıt formatı observation/confidence/possible cause/evidence/action/rule update; sabit eşik yok; problem sınıfları → sistem güncellemesi). Search Terms ve Suggested kaynakları bir sonraki talep araştırmasına (§2) girer.

## 25. Shorts türevleri (long-form'dan; D-002 / strategy "Shorts türev", D-038)
Ayrı bir Shorts sistemi değildir; long-form akışının post-production + launch adımıdır. Shorts ana ürün değildir (`company/constraints.md`).
**Kaynak kuralı:** yalnız kendi long-form videomuzun araştırması, anlatımı ve özgün materyali (bizim grafiklerimiz, VO'muz, rights ledger'da Shorts kullanımına uygun asset'ler). Başka içeriklerin yeniden kullanımı yok.
**Ne zaman:** long-form **final edit kilitlendikten sonra** aday seçimi (G8b); üretim long-form release paketinden sonra (render PC; aynı handoff'un ekinde). **Yayın long-form public olduktan sonra** (Shorts'taki "related video" bağlantısı long-form'a verilebilsin; P-14) — ilk Short'un zamanı ve aralık bir deney olarak FC'ye yazılır, sabit kural yok.
**Sayı:** hedef **2–4**; ama aşağıdaki eşiği geçmeyen aday üretilmez (0 veya 1 kabul edilebilir). Sayı doldurmak için zayıf Short yok.
**Aday seçimi (her aday için tablo; COO + creative director):**
| Kriter | Soru |
|---|---|
| Tek başına anlam | Long-form'u izlememiş biri için 15–60 sn'de kendi başına bir merak → cevap (veya güçlü soru) yayı var mı? |
| İlk saniye | İlk 1–2 sn'de nesne + anormallik görünüyor mu (bağlamsız giriş yok)? |
| Merak / payoff | Long-form'un en güçlü reveal, paradoks veya rakam anlarından biri mi (ör. "two years", "only one")? |
| Long-form'a köprü | İzleyiciye tam vakayı izlemek için gerçek bir sebep bırakıyor mu (spoiler değil, açık soru)? |
| Kanıt | Short'taki her iddia ledger'da ve **bağlamından koparılınca anlamı değişmiyor mu** (D-REJ kuralları geçerli)? |
| Haklar | İçindeki her asset'in rights ledger'da Shorts kullanımı uygun mu (dönüşüm/crop izni, müzik lisansı)? |
| Dikey uygunluk | Görsel materyal 9:16'ya yeniden kurulabiliyor mu (yalnız ortadan kırpma değil)? |
Eşik: hepsi EVET → aday. Biri HAYIR → üretilmez.
**9:16 yeniden kurgu kuralları (yalnız kırpılmış yatay video değil):**
- Tuval 1080×1920; ana nesne ve metin dikey güvenli alanda (alt ~%20 ve sağ kenar YouTube arayüzü için boş).
- Reframe: her sahne ayrı kadrajlanır (nesne takibi, dikey yeniden kompozisyon); geniş görseller **dikey layout** ile (üst: kanıt/belge, alt: nesne/harita; ya da tek nesne büyük). Remotion kompozisyonları dikey varyantla yeniden render edilir; düz center-crop yalnız kadraj zaten uygunsa.
- Altyazı: **burned-in** büyük altyazı (Shorts'ta sessiz izleme; caption metni final VO'dan, CAPTION-PROTOCOL QC'si geçerli), brand tipografisi.
- Ritim: kısa-form tempo — giriş bağlamı atılır, ilk cümle sorunun kendisi; VO gerekirse aynı final VO'dan kesilir (yeni ses üretimi = ayrı kredi onayı).
- Brand: Case Layer küçük (CASE 001), Founder-approved yön; long-form ident tekrar edilmez.
- Son: long-form'a sözlü/görsel köprü (soru), "related video" alanında long-form.
**Upload ayarları:** UPLOAD-SETTINGS-MATRIX geçerli + Shorts farkları: related video = long-form; Shorts A/B testi yok (P-18); thumbnail yalnız masaüstü Studio'da (P-19); title ≤100, açıklamada long-form linki ve kredi (rights/audio ledger'dan).
**Release Gate:** her Short için kısaltılmış kontrol: G-01, G-03, G-04 (vaat), G-05, G-09/G-10 (haklar), G-11, G-12, G-13, G-17 + muted preview (tek örnek yeterli). FAIL → yayın yok.
**Ölçüm:** Shorts metrikleri long-form'dan ayrı (`growth-performance-review`); asıl soru Short'tan long-form'a geçiş (Studio'da görünen "related video" tıklamaları / long-form trafik kaynağında Shorts) — iç proxy, tek videodan genelleme yok.

