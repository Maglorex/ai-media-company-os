# Remotion şablonları

Plan: `production/tools/production-pipeline-plan.md` §1–3 · Karar: D-017 · Yalnız render bilgisayarında çalışır.

- Sürümler sabit (`package.json` + `package-lock.json`); yükseltme = yeni sürüm şartlarını yeniden okuma + Founder onayı. Yeni npm paketi = Skill Lab + Founder onayı.
- Kurulum: `npm.cmd ci --ignore-scripts` (bu klasörde).
- Renk/font yalnız `src/theme.ts`'ten.
- Çıktılar repoya girmez: `D:\CompanyOS-Production\<video-id>\02_graphics\` altına render edilir.
  - Premiere'e bindirme (alfa): `npx.cmd remotion render src/index.ts <Comp> <çıktı>.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le`
  - Tam kare: `--codec=h264`
- `licenseKey` ayarlanmaz (Free License; ayarlanırsa telemetri açılır).

## Şablonlar (`src/templates/`)
| Şablon | Ne yapar | Veri |
|---|---|---|
| `DocumentHighlight` | Gerçek belge sayfası + yavaş kamera (zoom/pan) + soldan sağa kalem vurgusu + hafif kararma + opsiyonel kaynak etiketi; `blur` (rack focus), `focus` (odak penceresi: kadrajdaki ama anlatıda öne çıkmaması gereken komşu satırları gizler) | `src`, `pageSize`, `camera[]`, `highlights[]` (sayfa pikseli koordinatları), `dimOthers` (0.25–0.3), `label` |
| `SourceLabel` | Sade kaynak etiketi; tek başına şeffaf (ProRes 4444) veya başka şablon içinde | `text`, `detail`, `position`, `from`, `until` |
| `BarChart` | Sıfırdan başlayan yatay bar. `stacked`: parçalar tek barda + lejant + kaynaktan aynen alınan toplam parantezi · `grouped`: ayrı satırlar; aralık (ör. "about 46 to 55") düz + çizgili kısımla gösterilir | `mode`, `items[]` (`value` veya `range`, ekrandaki `valueLabel` metni — hesaplanmaz), `total`, `max`, `title`, `label` |
| `Crossfade` | İki sahne arası sade çapraz geçiş (ör. belge → bar) | `a`, `aDuration`, `b`, `overlap` |
| `LoadShare` | Tek birimin üstüne binen destek yapısı → paylaşılabilir blokların varsayımsal birimlere yayılması → geri dönüş. Varsayımsal birimler kesik çizgili ve solarak kaybolur (sayı ima edilmez) | `unitLabel`, `ghostLabel`, `blocks[]` (`value`, `shareable`, `color`), `spreadFrom`, `returnFrom`, `captions[]` (`emphasis` kelimesi) |
| `ComponentSchematic` | Kaynakta sayılan bileşenleri kartlarla gösterir (vaziyet planı değil); opsiyonel alan karşılaştırması (yalnız değerlere orantılı); karıştırılmaması gereken ikinci rakam ayrı kutuda | `headline`, `section`, `groups[]` (`items`, `areas`), `separateFigure`, `tag` |
| `LocatorMap` | Kamu malı GeoJSON'dan sade konum haritası; admin-1 verisi her ülkeyi içermediği için `baseGeojson` (kara katmanı) zorunlu tutulmalı — (enlem düzeltmeli eşdikdörtgen), vurgulu bölge, şehir düzeyi nokta, hafif yaklaşma | `geojson`, `bounds`, `highlightNames`, `points[]`, `zoomTo` |
| `Timeline` | Yer şeritli zaman çizelgesi: olaylar, süre parantezleri, eksen kilometre taşları, bitişi solabilen maliyet şeridi (kaynak kesin bitiş vermiyorsa). `ym(yıl, ay)` ay ortası | `range`, `lanes`, `events[]`, `spans[]`, `band`, `milestones` |
| `ScopeCard` | Kapsam/dürüstlük kartı: kaynağın neyi incelediği ve neyi açıkça incelemediği, yan yana; opsiyonel birebir alıntı | `title`, `sections[]` (`tone`, `items`, `quote`) |
| `FlowDiagram` | Düğümlü şema: `arrow` yalnız kaynak sıra veriyorsa, aksi halde `none`; `groupLabel`/`groupSpan` ortak başlığı yalnız kaynak cümlesinin kapsadığı düğümlere çeker; opsiyonel oran noktaları ve olgu satırları | `nodes[]`, `connector`, `groupLabel`, `groupSpan`, `ratio`, `facts[]` |
| `EquationCard` | Kaynağın tanımladığı ilişki (A − B = C), eşit kutular, ölçek yok; tutar kaynakta yoksa yazılmaz | `terms[]`, `operators`, `note`, `footnote` |
| `QuoteCard` | Birebir alıntı + atıf (ikincil aktarım atıfta açık) | `quote`, `attribution` |
| `UnitGrid` | "N içinden M" birim ızgarası; konum bilinmiyorsa `tag` ile belirtilir | `total`, `highlighted`, `columns`, `caption`, `tag` |

Bar kuralı: ölçek gerçek değerlerden, eksen kırpılmaz; ekranda yazan rakam ve toplam metni ledger/kaynak ifadesidir, kodda toplanıp yuvarlanmaz.

Kurallar: belge görüntüsü değiştirilmez (vurgu ayrı, yarı saydam katman, `multiply`); atıflar ("See p. 12") vurgulanmaz; etiket metni evidence ledger'daki atıf koşulundan alınır.

## Video verisi (`src/videos/<video>/`)
Her video yalnız veri dosyası ekler (ör. `videos/p3/shots.ts`) ve `Root.tsx`'e kompozisyon kaydeder; şablon kodu değişmez.

## Belge sayfası hazırlama
`production/tools/pdf/pdf-to-png.ps1 -Pdf <pdf> -Pages 5,6 -OutDir <video>\01_archive\pages -Width 2400` (Windows yerleşik PDF API'si, ek araç yok). Koordinatlar bu görüntüden ölçülür ve still render ile doğrulanır:
`npx.cmd remotion still src/index.ts <Comp> <çıktı>.png --frame=<n> --public-dir=<video>\01_archive`

## VO senkronu
Kurgu sürümleri `src/videos/<video>/synced.ts` içinde: her klip bir VO beat'ine bağlı (süre = beat), grafik içi `from` değerleri `at(cue, beat)` ile VO kelime zamanından gelir. `voCues.ts` elle düzenlenmez; `production/tools/elevenlabs/vo-cues.ps1` üretir (girdi: `<video>-vo-cues.json` + 03_vo segment JSON'ları + timing.json). Kontrol için `<VIDEO>-ANIMATIC` (VO + tüm klipler, yarım çözünürlük).
