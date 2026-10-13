# P3 (VID-001) — Opening prototype v2 raporu

> Tarih: 2026-10-13 · Uygulayan: render bilgisayarı (DESKTOP-KVLH9B2), `production-engineer` rolü · Karar: **D-030** · Handoff: `P3-production-handoff-prototype-v2.md`
> **Durum: TESLİM — Founder prototype kapısını bekliyor.** Tam video, gövde VO'su, müzik seçimi, Premiere final **yapılmadı** (handoff §5.4).

## 1. Teslim
| Dosya | Not |
|---|---|
| `D:\CompanyOS-Production\P3-ns-savannah\06_renders\P3_OPENING_PROTOTYPE_v2.mp4` | **İzleme dosyası.** 1920×1080, 30 fps, H.264 + AAC, 81,75 sn. Müzik track'i boş, SFX yok. |
| `…\06_renders\P3_OPENING_PROTOTYPE_v2_rawvo.mp4` | Aynı görüntü, ses ham VO seviyesinde (−23,9 LUFS) — karşılaştırma/arsiv. |
| `…\03_vo\prototype-v2\` | VO (mp3, txt, json, alignment), `segments.json`. Remotion için kopya: `01_archive\vo\P3_VO_OPEN_v2.mp3`. |
| `production/remotion/src/videos/p3/opening/` | Kompozisyon `P3-OPENING-v2` (`OpeningV2.tsx`, `Facility.tsx`, `geo.tsx`, `ship.tsx`, `timing.ts`, `voWordsV2.ts` — otomatik). Yeni paket yok. |

Yeniden render: `npx.cmd remotion render src/index.ts P3-OPENING-v2 <çıktı>.mp4 --codec=h264 --crf=16 --public-dir=D:\CompanyOS-Production\P3-ns-savannah\01_archive` (production/remotion içinde), ardından aynı loudnorm doğrusal kazanç adımı (§2).

## 2. Ölçümler
| Ölçü | Değer |
|---|---|
| VO kredisi (ölçülen) | **467** / tavan 700 (tahmin 467; 1.167 karakter). Yeniden üretim yok. Kayıt: `voice-ledger.md`, `finance/ledgers/usage.csv` U-006 |
| VO QA | 77,0 sn · 152 kelime/dk · uzun iç sessizlik yok · "kesilme şüphesi" bayrağı yanlış alarm (ses 76,55 sn'de bitip −74 dBFS'e sönüyor; ayrıntı voice-ledger) |
| Süre | 81,75 sn (0,6 sn siyahtan açılış + 77,0 sn VO + 1,2 sn V12 sessizliği + 0,5 sn "only one" nefesi + 2,4 sn kapanış/siyah) |
| Loudness (izleme dosyası) | **−16,0 LUFS integrated · −1,7 dBTP** · LRA 3,7 (doğrusal kazanç +7,9 dB; sıkıştırma yok) |
| Sessizlikler (−45 dB, ≥0,8 sn) | 19,3–20,3 (sayfa çevrilir) · 29,2–30,0 · 42,2–43,4 (Galveston → tesis) · **58,6–60,4 (V12, bilinçli)** · 73,7–75,0 (payoff) · 78,9–81,7 (kapanış) |
| Görsel olay (shotscan eşikleri, 64×36 kare farkı, 4 fps) | 15 kesme/kayma olayı → ort. 5,5 sn. Not: bizde geçişlerin çoğu sürekli dönüşüm (kesme değil), bu eşik onları saymaz |
| Görsel durum değişimi (referansa göre ort. fark >3) | 75 değişim → ort. **1,1 sn** |
| En uzun değişmeyen görsel durum (ölçülen) | **8,25 sn @ 52,3 sn** — tesis tam görünüm + takvim + V12 sessizliği. Kaba ölçüm küçük değişimleri kaçırıyor: bu aralıkta $1,162,000 rakamı (52,0), takvim (55,4), takvim imleci (55,9→58,3) var; bilinçli durgun kare 58,3–60,1. Anlamsal olarak en uzun değişmeyen durum (kod cue'larına göre) ≈3,5 sn, bilinçli sessizlikler ve kapanış (V16, ~5 sn yavaş geri çekilme) hariç. **15 sn'yi aşan statik durum yok.** |

## 3. §3'ten sapmalar
1. **V2:** sayaç ilk yay tamamlanınca görünür, 10 → 17 → 19 birikir; her bölge "Mediterranean · 10" gibi etiketlenir. Etiket metni "Destinations by region · not actual routes". "On regular cargo routes" sırasında yaylarda hareket eden noktalar (düzenli sefer).
2. **V3:** ekrandaki alıntı NPS'teki birebir ifade ("the most reliable ship we have operating"); VO'daki "they had" anlatıcının aktarımı.
3. **V4:** kamera önce damgaya (JUNE 26, 1970), sonra "REPORT TO THE CONGRESS" + başlığa; gemi token'ı başlığın üstüne "dosyalanır" (klips grafiği kaldırıldı — yapay duruyordu).
4. **V6:** Savannah çubuğu ≈2,9 M$ (C-02), karşılaştırma çubuğu 0,9 M$ çizim oranı; **iki çubukta da rakam yok**. "about $2 million more a year" ifadesi Q-01 satırından kalkıp parantez etiketi olur.
5. **V7–V8:** üç satır parantezi 1,871/2,0 oranında doldurur (kalan küçük boşluk etiketsiz: "most of it"). V8 vinyetleri ayrı sahne değil, çubuk sahnesinin altında: (1) gemi konturunda 67 figür, 27'si yanar (sayı yazılmaz); (2) karadaki 10 figürden 4 liman noktasına ince çizgiler — **harita yerine soyut** (VO'da bu satıra yalnız ~1,4 sn var; harita geçişi çok hızlı olurdu). "Bigger than the other two combined": ilk iki parça üçüncünün altına hizalanan şerit (toplam yazılmaz).
6. **V10:** rakam "≈ $1.16M / yr" yerine GAO'nun birebir ifadesi **"$1,162,000 a year"** (alt satır: "average annual cost of the servicing facility · GAO"). "Heavy cranes" alt etiketi GAO s.15: 75-ton gantry · 75-ton bridge crane. Boş rıhtım = gemi konturunun kendisi (kesik çizgi). Barge oranı 129×36 ft / gemi ≈600 birim (C-42). Etiket: "Illustration — components: GAO 1970 · layout not to scale".
7. **V11:** takvim imleci 1966 ortası → Ağustos 1968 (C-32); bileşenler renk kaybeder; "back." ile durur.
8. **V13:** New York yanında "1967 · annual inspection", "1968 · annual inspection" etiketleri; 4 personel figürü Galveston → New York yayında yürür (kaynak etiketi: "staff figures illustrative").
9. **V14:** odak penceresi "10 nuclear vessels" satırlarını karartır (D-018); vurgu VO ile kelime kelime ilerler.
10. **V15:** üç parça değerle orantılı bloklar olarak tek gemiye iner, gemi her blokta biraz çöker; "only one" yazısı yok (VO söylüyor). Hayalet gemi yok.
11. **Ses:** V12'ye ek olarak "There was only one." sonrası +0,5 sn boşluk (payoff nefesi). İzleme dosyası doğrusal kazançla −16 LUFS (ham sürüm ayrı).

## 4. Kanıt kısıtları (handoff §4) — kontrol
"loss / failure / wasted" ekranda yok · ekranda yalnız GAO rakamları ($1,162,000; Q-01 ifadesi; belge sayfalarının kendisi) · C-07 toplamı, "10 gemi", "20+" yok · "neden" iddiası yok · tesis yerleşimi "Illustration … layout not to scale" etiketli · AI görsel yok · footage yok · hakkı belirsiz materyal yok (V-05 NARA atıflı, GAO PD, Natural Earth PD).

## 5. Doctrine §12 COO ön kontrolü
| # | Soru | Sonuç |
|---|---|---|
| 1 | İlk 30 sn'de somut nesne + anormallik | **EVET** — gemi fotoğrafı (0–5 sn) + "found something strange" / ≈2 M$ fazla destek (15–27 sn) |
| 2 | 60 sn içinde açık soru | **EVET** — "Where was that money going?" (27,9 sn) |
| 3 | İnsan veya somut sahne | **EVET** — operatörlerin sözü (NPS), mürettebat ve kara ekibi figürleri, New York'a giden tesis personeli; gerçek gemi fotoğrafı. (İnsan temsili figür düzeyinde — gerçek portre yok) |
| 4 | 15 sn'yi aşan statik görsel | **HAYIR** — ölçülen en uzun 8,25 sn (bilinçli sessizlik dahil) |
| 5 | Her kart tez/sayı | **EVET** — tam ekran bilgi kartı yok; metin yalnız "19 voyages", "$1,162,000 a year", belge ifadesi ve grafik etiketleri |
| 6 | Hareket bilgi taşıyor | **EVET** — dekoratif zoom yok; tek yavaş hareket V16 kapanış geri çekilmesi (handoff'ta tanımlı) |
| 7 | Tek palet/tek dünya | **EVET** — lacivert/kırık beyaz/kehribar, tek font; gemi konturu baştan sona aynı nesne |
| 8 | Kanıt ekranda, temsili görüntü etiketli | **EVET** |
| 9 | Ses | **Founder kulak kontrolü** (UNV) |
Sonuç: hiçbir madde HAYIR değil → teslim edildi.

## 6. Founder'a giden (tek soru)
İzleme dosyası: `06_renders\P3_OPENING_PROTOTYPE_v2.mp4` (1:22). **"Bunu izlemeye devam eder miydin?"** (Evet / Hayır / Emin değilim + istersen tek cümle neden). İzlerken kulakla bakılacak 3 şey: Savannah / Galveston / Atomic Servant telaffuzu · iki sessizlik anının (0:59 ve 1:14) uzunluğu · müziksiz akışın kuru gelip gelmediği.

## 7. Bilinen sınırlar (prototype)
- Müzik yok (handoff gereği) — doctrine §9 ses tamamen UNV.
- Tesis illüstrasyonu sade 2D çizgi; gemi konturu elle izlendi (fotoğraf perspektifi nedeniyle izometrik sahnede hafif eğik).
- Kare farkı ölçümü 64×36 çözünürlükte; küçük öğe değişimlerini kaçırır (§2).
