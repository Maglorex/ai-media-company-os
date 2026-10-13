# P3 (VID-001) — Production Handoff (prototype) v2 — Opening v2, Ship-first

> Tarih: 2026-10-13 · Hazırlayan: COO · Uygulayan: render bilgisayarındaki Claude (DESKTOP-KVLH9B2, `production-engineer` rolü) · Karar: **D-030**
> **Durum: UYGULANDI (2026-10-13)** — prototype teslim edildi, rapor: `P3-prototype-v2-report.md`. Founder prototype kapısı bekleniyor.
> Yerine geçtiği: `P3-production-handoff-prototype-v1.md` (v1.1, donuk; silinmez). Bağlayıcı: `intelligence/creative/doctrine/documentary-production-doctrine-v1.md` · olay planı ve kanıt eşlemesi: `P3-doctrine-test-opening-v1.md` §4–§11 (bu dosya onu opening v2 metnine uyarlar) · `P3-evidence-ledger.md` · `.claude/rules/audio-production.md`.

## 0. Kapsam ve onaylar (D-030)
| Konu | Durum |
|---|---|
| Kapsam | **Yalnız açılış prototype'ı (~60–90 sn)**, son cümle: tek gemi / birkaç gemi sorusu. Tam video, gövde VO'su, Premiere final **YOK**. Prototype bitince dur. |
| VO | Bill L. Oxley · `eleven_multilingual_v2` · D-021 ayarları · **tavan 700 kredi**, yalnız §2 metni. Tek üretim; ölçülen QA hatası yoksa yeniden üretme; hata varsa yalnız sorunlu segment, tavanı aşmadan. Üretimden önce karakter + tahmini kredi yazdır. |
| Müzik / SFX | **Müzik track'i boş kalır.** Placeholder beat yok. SFX yok. Sessizlik anları (§3 V12, V16) kurguda boşluk olarak korunur. |
| AI görsel | **Yok** (v1'deki AI-1/AI-2 iptal). |
| Footage | Yok. 1964 filmi (V-30) kullanılmaz/indirilmez. Hakkı belirsiz hiçbir materyal yok. |
| Yeni paket / ücretli asset | Yok. Mevcut Remotion şablonları (`DocumentHighlight`, `LinesToBar`, `LoadShare`, harita bileşenleri) türetilerek kullanılır. |

## 1. Görsel dil (doctrine §4–§7)
- Tek palet: lacivert-siyah zemin, kırık beyaz, tek vurgu rengi kehribar; tek font ailesi. Arşiv katmanı doğal dokusu + `SourceLabel`. İllüstrasyon: "Illustration" etiketi.
- **Tam ekran bilgi kartı yok.** Metin yalnız belgenin içinde, grafiğin etiketi olarak veya tek kısa tipografi anı olarak.
- **Hareket bilgi taşır:** dekoratif yavaş zoom, sürekli Ken Burns, sebepsiz parallax yok. Her kamera/nesne hareketi bir sonraki bilgiyi açar.
- **Semantic state kuralı:** yeni bilgi gelmeden ekran 6 sn'den uzun aynı anlamda kalmaz (bilinçli sessizlik anları hariç). Sabit kesme hızı hedefi yok.

## 2. Narration — P3 opening v2 (BİREBİR; Founder'dan gelecek)
```
The NS Savannah was the first nuclear-powered merchant ship. And she worked.

In her first three commercial years, she made nineteen voyages on regular cargo routes. Her operators called her the most reliable ship they had.

Then, in 1970, federal auditors found something strange.

The Savannah needed about two million dollars more in government support every year than comparable conventional freighters on the same route.

Where was that money going?

The auditors traced most of it to three lines: training a nuclear crew, keeping a nuclear staff ashore — and a third line bigger than the other two combined.

A nuclear servicing facility in Galveston, Texas.

A pier. Heavy cranes. A pool for spent fuel. A servicing barge called the Atomic Servant. Even a spare reactor core.

About one point one six million dollars a year.

And then, for two years, the Savannah didn't come back.

For her 1967 and 1968 inspections, the facility's staff went to her — in New York.

The auditors wrote that the facility and its shore staff could serve several nuclear ships.

There was only one.

So why was one working ship carrying a support system that could serve several?
```
Kaynak: Founder'ın getirdiği ChatGPT sıkılaştırılmış sürüm (2026-10-13). **Tek değişiklik (Founder onaylı, 2026-10-13):** son cümlede "built to serve several" → "that could serve several" (GAO C-33/C-12 "could serve"; amaç iddiası kanıtta yok). Başka değişiklik yok.
COO kontrolü (2026-10-13): 1.167 karakter / 195 kelime → ≈470 kredi `[TAHMİN]` (~0,4/karakter), tavan 700 · süre ≈75–85 sn · "loss/failure" yok. Ledger: worked C-14/C-30 · 19 sefer C-14 · operatörler Q-06 (NPS — ekranda atıf) · 1970 denetim E-2/V-03 · ≈2M $ C-04/Q-01 · üç satır C-06, C-08..C-10 · "bigger than the other two combined" 1,162 > 0,300 + 0,409 (C-08..C-10; ekranda toplam yazılmaz) · tesis bileşenleri C-31/E-11 (iki adet 75 ton vinç → "heavy cranes" doğru) · ≈1,16M $ C-10 · iki yıl C-32 · New York C-32 · several C-33/C-12 · only one C-11/C-22. "found something strange" anlatı çerçevesi; ekranda GAO ifadesi gibi sunulmaz.
Metin değişmez; §3 beat'leri metne uyar (V2 bölge yayları sayaçsız: metin bölge söylemiyor → yaylar ve "19 voyages" yalnız; V8 figürleri sayı yazmadan; V9 "A nuclear servicing facility in Galveston").
Üretim: `production/tools/elevenlabs/vo-segments.ps1`, tek segment `P3_VO_OPEN_v2_eleven_multilingual_v2.*` (+ `with-timestamps` JSON). Telaffuz: Savannah, Galveston, Atomic Servant. Ölçüm: LUFS/TP, sessizlik, kelime zaman damgaları. Kredi → `voice-ledger.md` ve `finance/ledgers/usage.csv` (VID-001).

## 3. Beat / event planı (görüntü VO kelime zaman damgalarına senkron)
Süreklilik omurgası: **gemi** (foto → siluet → harita token'ı → dosya → yükü taşıyan tek token) ve **≈2M $ satırı** (belge cümlesi → karşılaştırma parantezi → üç segment → segmentler token'a iner).
| # | Anlatı anı | Görsel durum (ne değişir) | Geçiş | İşlev | Kaynak / tür |
|---|---|---|---|---|---|
| V1 | Gemi tanımı (ilk cümle) | V-05 (1962) 3 katman; gemi öne ayrılır, arka plan söner; `NS SAVANNAH · 1962` | siyahtan | ESTABLISH | V-05 NARA 542141, atıf "AEC / National Archives" — kanıt |
| V2 | "worked" + 19 sefer | Gemi silueti küçülüp koyu haritada ABD Atlantik kıyısına token olarak iner; 3 bölge yayı sırayla, sayaç 10/7/2 → 19; etiket "regions, not routes" | continuity (siluet → token) | PROVE | C-14, C-44; Natural Earth V-28/29 — kanıt verisi + bizim grafik |
| V3 | Operatörlerin sözü (metinde varsa) | Harita üstünde token'ın yanında kısa alıntı satırı + "— as quoted by the National Park Service" | aynı kare | PROVE (insan) | Q-06 |
| V4 | 1970, denetçiler, Kongre | Harita söner; token V-03 kapağının kenarına "dosyalanır"; kamera damgaya (June 26, 1970) | continuity | CONTRADICT | V-03 GAO PD |
| V5 | ≈2M $ fazla destek | Sayfa çevrilir → V-02; Q-01 cümlesi bulanık → net, "about $2 million more a year" kehribar | continuity (aynı belge) | PROVE | Q-01, C-04 |
| V6 | (karşılaştırma) | Vurgulu ifade sayfadan kalkar → iki çubuk: "Savannah" / "comparable conventional ships — average subsidy" (rakamsız) + parantez "≈ $2M more / yr" | morph | COMPARE | C-02, C-04 (sağ çubuğa rakam yazılmaz) |
| V7 | "Para nereye?" → üç satır | Arkada V-01 (Özet s.2); üç satır sırayla yanar, her satırdan şerit parantezi doldurur (300 / 409 / 1.162 orantılı) | continuity | REVEAL (thumbnail vaadi) | V-01, C-06, C-08..C-10 |
| V8 | Eğitim / kara ekibi | Segment 1 → gemi konturu içinde mürettebat figür sırası (bir kısmı yanar, sayı yazılmaz); segment 2 → harita geri gelir, ABD'de küçük figür kümesi, liman bölgelerine ince çizgiler | continuity | SCALE / EXPLAIN (insan) | C-29, C-30 — bizim grafik |
| V9 | "üçüncü satır, diğer ikisinden büyük" → Galveston | Segment 3 haritaya düşer; Körfez → Galveston punch-in; token orada değil | continuity | LOCATE + REVEAL | C-10, C-06; V-28/29 |
| V10 | Bileşenler + ≈1,16M $/yıl | Galveston noktası açılır → 2D izometrik çizgi: iskele, vinç, kullanılmış yakıt havuzu, Atomic Servant (C-42 oranları), yedek çekirdek (V-08'den sade sembol); **rıhtım yeri boş, kesik çizgili**; etiket "Illustration — components: GAO 1970 · layout not to scale"; `≈ $1.16M / yr` | zoom-through | EXPLAIN + SCALE | C-31, E-11, C-42; V-08 — **İLLÜSTRASYON** |
| V11 | "iki yıl gelmedi" | Aynı çizim; takvim şeridi 1966 → 1968; bileşenler renk kaybeder; cümle sonunda her şey durur | continuity | ESCALATE | C-32 |
| V12 | (sessizlik) | Durgun kare ~1–1,5 sn | — | — | — |
| V13 | 1967–68 denetimleri, personel New York'a | Kamera geri çekilir → harita; Galveston → New York yayında küçük ekip figürleri; New York'ta gemi token'ı | continuity | CONTRADICT (insan eylemi) | C-32 (figür sayısı temsilî, sayı yazılmaz) |
| V14 | "several nuclear ships" | V-01 ile aynı sayfa (Özet s.2) geri gelir; C-33 cümlesi vurgulanır | continuity (V7 sayfası) | PROVE | C-33, C-12 — "10" kullanılmaz |
| V15 | "only one" | Üç segment sayfadan kalkıp tek gemi token'ının üstüne yığılır; token hafif iner; sayı içeren hayalet gemi yok | morph | PAYOFF (mini) | C-11, C-22 |
| V16 | Son soru | V15 son karesi, çok yavaş geri çekilme → siyah | dissolve | RESET | — |
Metinde olmayan beat (ör. V3 alıntı, V8 figürleri metin kısaltıldıysa) **atlanır**; metne olmayan bilgi eklenmez.

## 4. Kanıt kısıtları
"loss", "failure", "commercial failure", "wasted" ekranda yok (D-REJ-3). Ekranda yalnız GAO rakamları; bizim toplamlarımız (C-07) yazılmaz. "10 gemi" (C-13) ve "20+" (C-41) yok. "Neden" iddiası yok (D-REJ-1). Tesis yerleşimi GAO'da yok → çizim etiketli.

## 5. Teslim (render PC)
1. `D:\CompanyOS-Production\P3-ns-savannah\06_renders\P3_OPENING_PROTOTYPE_v2.mp4` (1080p) — müzik track'i boş.
2. Kısa rapor `production/pilots/2026-10-n2-pilot-test/P3-prototype-v2-report.md`: ölçülen kredi, LUFS/TP, süre, en uzun değişmeyen görsel durum (shotscan: `intelligence/creative/research/tools/shotscan.js` veya kare farkı ölçümü), §3'ten sapmalar.
3. Doctrine §12 COO ön kontrolü — biri HAYIR ise teslim etme, raporla.
4. **Dur.** Tam videoya, gövde VO'suna, müzik seçimine geçme.
5. Yerel commit (medya hariç); push Founder'da (GitHub Desktop).
