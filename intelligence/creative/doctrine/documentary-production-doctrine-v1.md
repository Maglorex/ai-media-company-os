# The Industrial Casebook — Documentary Production Doctrine v1

> Karar: D-028 (araştırma) → bu dosya (2026-10-13). Statü: **v1 — araştırmaya dayalı, kendi kanal verimizle henüz doğrulanmadı.** İlk prototype + ilk yayın retention verisi v1.1'i tetikler.
> Kanıt: `intelligence/creative/research/` (katalog 502 video; 16 video shot-level tarama; kanal notları). Etiketler: **DV** = DIRECTLY VERIFIED (videoda görüldü/ölçüldü) · **SV** = SOURCE-VERIFIED · **INF** = INFERRED (kural değil, hipotez) · **UNV** = UNVERIFIED.
> Kapsam kararı (Founder 2026-10-13): kanal başına 2 video yeter; merkez soru **"bu kanallar neden izleniyor ve izleme keyfi bizimkinden neden iyi?"**
> İlişki: `.claude/rules/documentary-creative-standards.md` (akış + prototype kapısı) bu doctrine'e uyar; `documentary-style-benchmarks.md` reference matrix'tir; skill'ler (`documentary-creative-treatment`, `-visual-storytelling`, `-production-handoff`) bu dosyayı okur.

---

> **Marka ve görsel sistem (D-031):** `intelligence/creative/brand/brand-system-v1.md` (dört dünya, tipografi, renk, case identity, imza geçişler) · sahne kararı `.claude/skills/source-to-visual/SKILL.md` · render sonrası `.claude/skills/muted-preview-gate/SKILL.md`. Doctrine anlatı/görsel gramerini, Brand System görünüm ve kimliği tanımlar; çelişkide kanıt kuralı > doctrine > brand.

## 0. Tek cümle
**İzleyici bilgi için değil, ilerleme hissi için kalır:** her 10–30 saniyede bir soru cevaplanır ve daha büyük biri açılır; ekrandaki görüntü bu ilerlemenin kendisidir, anlatıcının cümlesinin resmi değil.

## 1. Reference Matrix (neden izleniyorlar)
| Kanal | Rol | İncelenen (kova) | Ort. görsel olay | İzleme keyfinin kaynağı (DV) | Bizden fark | Kopyalanmaz |
|---|---|---|---|---|---|---|
| **Mustard** | nesne embodiment | 6 tam (2 HIGH, 2 TYP, 2 LOW) — SATURATION | ~4–5 sn | Nesne bir karakter: aynı nesne footage ↔ çizim ↔ model ↔ kesit; vaat ↔ gerçek; hook 30–50 sn'de nesne+anormallik+bahis+soru | Bizde nesne bir rapor; gemi sadece foto | 3D CG, masa estetiği, el yazısı kimlik |
| **Paper Skies** | arşiv anlatısı | 2 tam (BREAKOUT, TYP) | ~2,7 sn | Soruşturma: hipotez hipotez eleme; insan ölçeği (portre ızgarası, "16 amiral"); açılışta 2 soru; gecikmeli bağlam ödülü | Bizde soru yok, sonuç listesi var; insan yok | Dram film/haber footage'ı |
| **Modern MBA** | grafik = argüman | 2 (BREAKOUT tam, TYP %55) | 2,8–3,5 sn | İlk dakikada endüstri paradoksu; yol haritası; grafik başlığı = tek kelimelik tez; soyut konu + somut görüntü | Bizim kartlar cümleyi tekrar ediyor, 15–37 sn ekranda | Marka TV reklamları |
| **fern** | art direction | 2 (HIGH tam, TYP %84) | ~4,4 sn | Mekanizma bir insan senaryosunun içinde; tek palet/tek dünya; 3 soru açılışı; tipoloji merdiveni; tempo içeriğe göre (hook 1–2 sn, mekanizma 10–60 sn) | Bizde mekanizma senaryosuz, palet "kart şablonu" | 3D ekip hattı, saha çekimi (**maliyet benchmark'ı değil**) |
| **Persimmon Archive** | paket/premise | 1 açılış tam + 1 örnek kare | ~2,8 sn (açılış) | Bütün yükseliş–düşüş yayı ilk 60 sn'de; tek kişi + tek an ("sarı not defteri"); nasıl/neden merakı | Bizim hook bir oran (≈2M $) | Clickbait büyük harf, reklam klipleri |
| **Ruined America** | endüstriyel paradoks (premise) | 1 açılış + 1 örnek kare | bkz. kanal notu | Premise: "Detroit'in kontrol edemediği motor" — talep sinyali; görsel benchmark **değil** (negatif) | — | Görsel dil (anti-pattern) |
İkincil (Wendover/Real Engineering/neo): bu turda izlenmedi (Founder kapsamı 2026-10-13); harita/mekanizma için ilk ihtiyaçta 1'er video.

**Ortak bulgu (DV, 6/6 kanal):** üretim dili kanal içinde sabit; HIGH/LOW farkı görsel yürütmeden çok **premise/konudan** geliyor (INF, nedensellik iddiası yok). Yani: görsel dil izlenebilirliğin *tabanı*, premise *tavanı*.

## 2. P3_REVIEW_v1 negatif benchmark — ölçülmüş farklar
Kaynak: `production/pilots/2026-10-n2-pilot-test/P3-edit-timeline.md` (kendi dosyamız) vs shot log'lar.
| Ölçü | P3_REVIEW_v1 | Benchmark aralığı | Etiket |
|---|---|---|---|
| Görsel beat sayısı / süre | 39 beat / 498 sn → **~12,8 sn/beat** (grafik içi ~32 animasyon cue'su dahil bile ~7 sn/değişim) | **2,6–4,4 sn/olay** | DV (iki taraf ölçüldü; yöntem farkı: biz beat, onlar görsel olay) |
| En uzun tek görsel | 36,8 sn (PortFlow kartı), 30 sn ×2 kart | Uzun durumlar yalnız mekanizmada ve **içi hareketli** (fern 3D, Mustard kesit) | DV |
| Hareketli görüntü (footage/3D/canlandırma) | **0** (foto + kart + belge) | Çoğunluk (Paper Skies, Modern MBA ~tamamı; Mustard/fern karışık) | DV |
| İnsan/sahne | Yok (denetçi = soyut "auditors") | Her kanalda: amiraller, Michael, Barney Adams, mürettebat | DV |
| Hook | 0:48'de "Why would a ship…" sorusu; çatışma bir oran (≈2M $) | 30–60 sn'de somut nesne + anormallik + bahis + açık soru(lar) | DV |
| Yapı | Rapor sırası (S1…S8), yol haritası/soru merdiveni yok | Soru merdiveni (PS), tipoloji (fern), yol haritası (MMBA), yükseliş-düşüş (Persimmon) | DV |
| Kart dili | Kart = anlatıcının cümlesi | Kart = tez (EXTINCTION), tek sayı, kısa | DV |

## 3. Narrative Grammar
1. **Hook (ilk 30–60 sn):** somut nesne/an + anormallik + bahis + **1–3 açık soru**. Sonu veya paradoksu baştan söylemek serbest (Persimmon, Mustard); merak "ne" değil "nasıl/neden" olur. (DV, 6/6)
2. **Sorular videonun haritasıdır:** açılıştaki sorular bölümlere karşılık gelir; her bölüm birini cevaplar, sonrakini açar (soru merdiveni). (DV: PS, fern, MMBA)
3. **Yol haritası cümlesi** uzun videoda 2–4. dk'da ("üç satır, üç hikâye"). (DV: MMBA; fern sorular)
4. **Tırmanma iskeleti** seçilir: tipoloji merdiveni (küçükten büyüğe) · yükseliş→"ama"→düşüş · hipotez eleme · vaat↔gerçek. Rapor/kronoloji sırası iskelet değildir. (DV)
5. **Mekanizma bir insan senaryosu içinde anlatılır** ("bir kadet / bir liman / bir gemi bekleniyor") — kuru açıklama değil. (DV: fern 2/2, PS)
6. **İnsan ölçeği:** her büyük sayı bir insana veya somut nesneye bağlanır. (DV: PS, fern, Persimmon)
7. **Bağlam seçici ve ödüllü:** bağlam ancak sonra bir şeyi açıklayacaksa girer; girdiğinde izleyiciye neden anlatıldığı sezdirilir. (DV: PS, Mustard)
8. **En sert iddia kanıtın ağzından:** tanık yoksa birincil belge cümlesi ekranda "konuşur"; anlatıcı tarafsız kalır. (DV: fern; bizde belge versiyonu INF)
9. Kapanış: soyuttan insana veya açık son (yeni nesil, gemi bugün nerede). (DV: fern 2/2)

## 4. Visual Grammar
1. **Görüntü yaşar:** ekrandaki her durum ya hareket ediyor (footage, kamera, katman, harita state'i) ya da yeni bilgi ekliyor. Duran kart/fotoğraf ancak kısa vurgu. **Sabit "her X sn kesme" kuralı yok** (tempo içeriğe göre: fern hook 1–2 sn, mekanizma 10–60 sn — DV); ama P3'teki 30+ sn statik kart negatif benchmark'tır.
2. **Hero object çok modlu:** gemi = foto ↔ harita token'ı ↔ siluet/diyagram ↔ belge içindeki çizim ↔ (etiketli illüstratif rekonstrüksiyon). (DV: Mustard 6/6)
3. **Belge = sahne:** belge açılır, katmanlanır, vurgulanır, kamera içine girer; düz tam ekran tarama değil. (DV: Mustard 6/6, fern sansürlü plan)
4. **Tek art direction:** video başlamadan palet, tipografi, ışık, doku kararı; tüm grafik/harita/illüstrasyon aynı dünyadan. (DV: fern; SV: jenerikte ayrı art director)
5. **Soyut konu + somut görüntü:** maliyet anlatılırken ekranda gemi, liman, insan. (DV: MMBA)
6. **Bölüm kartı / dev etiket** yön verir (DV: Persimmon, fern).

## 5. Motion & Transition
- Motion bilgi taşır: rota uzar, satır belirir, oda açılır, kamera belgedeki kelimeye iner. Dekoratif sürekli zoom = Ken Burns varsayılanı yasak. (DV: Mustard harita 5/6, fern)
- Geçiş = bakış açısı değişimi (geniş→detay, dış→iç, harita→yer). fern: uydu→şehir→bina→oda→kablo. (DV)
- Tempo eğrisi: hook hızlı, mekanizma yavaş-akıcı, payoff durgun. Ortalama tempo bir hedef değildir. (DV ölçüm)
- Ses ile senkron geçişler: **UNV — HUMAN EAR REQUIRED.**

## 6. Evidence-to-Visual
- Her kanıt satırı (ledger) için görsel karşılık sorusu: "Bu kanıt ekranda nasıl **olur**?" (belge sahnesi / harita state'i / tez grafiği / insan senaryosu). Kanıtı sadece kartta yazmak son çaredir.
- Belge alıntısı: kaynak sayfa görünür, vurgulanan kelime büyür, alıntı kısa. (DV: Mustard, Persimmon dilekçe)
- **Bizim farkımız korunur:** kaynak ekranda; temsili görüntü kanıt gibi sunulmaz (Paper Skies'ın dram filmi kullanımı alınmaz).

## 7. Map / Diagram / Chart
- Harita durum değiştirir (rota, yayılma, ok) — statik harita yok. (DV: Mustard 5/6, fern)
- Grafik başlığı = tek kelimelik tez (TRIPLED / STRANDED / NEVER CAME). (DV: MMBA 2/2)
- Tek sayı = tek kart, büyük, kısa, arkasında yaşayan görüntü. (DV: MMBA)
- Diyagram/kesit bölüm bölüm vurgulanır; içinde hareket var. (DV: Mustard 6/6, fern)

## 8. Archive & Rights
- Arşivde bulunmak ≠ telif güvenliği (D-026). Her footage rights ledger'dan geçer; belirsiz = kullanılmaz (prototype dahil).
- **Gerçek kısıt (DV, P3 tarama):** Savannah için hakkı temiz hareketli footage pratikte yok (1964 film "Undetermined"; haber filmleri lisanslı). Benchmark kanallarının canlılığının büyük kısmı footage'tan geliyor → **bizde canlılık motion design, harita state'i, belge sahnesi ve etiketli illüstratif rekonstrüksiyondan gelmek zorunda.** Bu, doctrine'in en büyük üretim riski (§14).
- AI görsel asla arşiv kanıtı gibi gösterilmez; foto-gerçekçi olay rekonstrüksiyonu etiketlenir.

## 9. Sound
**UNVERIFIED — HUMAN EAR REQUIRED.** Hiçbir kanalda müzik/SFX/sessizlik/ducking ölçülmedi; yalnız altyazıdaki `[music]` işaretleri görüldü. Ses kuralı yoktur; `.claude/rules/audio-production.md` ve Founder'ın prototype kulak kontrolü geçerlidir. Founder'dan istenecek tek iş (isteğe bağlı): 2 benchmark videonun ilk 2 dk'sını sesli dinleyip "müzik nerede değişiyor, nerede susuyor" notu.

## 10. Hook & Packaging
- Premise formülü (DV: Persimmon, Mustard HIGH, MMBA BREAKOUT): **somut nesne/karar + büyük bahis + beklenmedik son veya paradoks**, ilk 60 sn'de tamamı.
- HIGH videolarda ortak (INF): tuhaf/az bilinen fiziksel nesne + "What happened to…?" gizemi + insan çilesi; kurumsal/soyut konu daha düşük. Nedensellik iddiası yok; growth-idea-scoring'e girdi.
- Thumbnail/başlık vaadi ilk 30 sn'de görünür (creative-standards §3).

## 11. Anti-Patterns (negatif benchmark: P3_REVIEW_v1, Ruined America)
1. Foto + yavaş zoom + tam ekran kart döngüsü.
2. 15 sn'den uzun statik kart; kartın anlatıcıyı tekrarlaması.
3. Hook'ta soyut oran; insan/sahne olmadan açılış.
4. Kaynak belgenin bölüm sırasını video yapısı yapmak.
5. Aynı görsele dönmek / küçük görsel havuzu (Ruined America).
6. Bağlamı hook'un hemen arkasına yığmak.
7. Hareketsiz uzun mekanizma anlatımı.

## 12. Prototype Rubric (60–90 sn; Founder sorusu değişmez: "Bunu izlemeye devam eder miydin?")
COO ön kontrolü (Founder'a gitmeden, hepsi EVET olmalı):
1. İlk 30 sn'de somut nesne + anormallik görünüyor mu?
2. 60 sn içinde en az bir açık soru söylendi mi?
3. Bir insan veya somut sahne var mı?
4. 15 sn'yi aşan statik görsel var mı? (HAYIR olmalı)
5. Her kart tez/sayı mı (anlatıcı cümlesinin kopyası değil)?
6. Hareket bilgi taşıyor mu (dekoratif zoom yok)?
7. Tek palet/tek dünya hissi var mı?
8. Kanıt ekranda ve temsili görüntü etiketli mi?
9. Ses: **Founder kulak kontrolü** (UNV).
Ölçülebilir olanlar (4, ortalama değişim süresi) shotscan ile kendi renderımızda ölçülür.

## 13. Handoff Standard
Production handoff her sahne için: işlev (ESTABLISH/REVEAL/…) · görsel mod · hareketin taşıdığı bilgi · süre üst sınırı · kaynak/hak satırı · palet referansı · insan/senaryo bağlantısı. Şablon: `documentary-production-handoff/TEMPLATE.md` (bu doctrine'e göre güncellenir). Handoff, §12 COO ön kontrolünü geçmeden production PC'ye gitmez.

## 14. Learning Loop + açık riskler
- Kendi render'ımızı benchmark'larla aynı araçla ölç (`research/tools/shotscan.js`): ortalama/dağılım, en uzun statik durum.
- Founder geri bildirimi → CF kaydı (VİDEO/SİSTEM/GÖZLEM).
- Yayın sonrası retention düşüş noktaları → hangi doctrine maddesi ihlal edildi? (growth-performance-review).
- **Açık riskler:** (R1) hak-temiz hareketli görüntü yokluğu — canlılığı motion/illüstrasyonla sağlayabileceğimiz prototype'ta kanıtlanmadı; (R2) ses tamamen UNV; (R3) kendi kanal verimiz sıfır; (R4) ikincil referanslar izlenmedi.

## Değişiklik geçmişi
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-10-13 | v1 yazıldı | D-028 araştırması; Founder kapsam kararı 2026-10-13 |
