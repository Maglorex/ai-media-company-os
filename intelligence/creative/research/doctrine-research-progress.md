# Documentary Production Doctrine v1 — Araştırma ilerlemesi

> Karar: D-028 (2026-10-11). **Bu dosya bir sonraki oturumun başlangıç noktasıdır.** Founder'dan yeni prompt beklenmez; yarım kalan adımdan devam edilir.
> Kısıt: araştırma bitene kadar P3 production, ElevenLabs/AI görsel/müzik, render ve commit/push YOK.

## Kapsam güncellemesi (Founder, 2026-10-13)
"Her kanaldan 2 video izlemen yeterli." Asıl soru: **bu kanallar neden izleniyor ve izleme keyfi bizimkinden neden daha iyi?** (içerik türü benzer). Pattern saturation hedefi bu kapsamla değiştirildi: kanal başına 2 tam tarama (Mustard'da 6 tamamlanmıştı, korunur). Persimmon/Ruined America için önceki örnek kare incelemesi + 1 tam tarama.

## Completion gate (Founder §V) — durum
| Koşul | Durum |
|---|---|
| 6 core kanalın public long-form katalog envanteri | ✅ 2026-10-11: 502 video (Mustard 54, Paper Skies 41, Modern MBA 83, fern 143, Persimmon 45, Ruined America 136) → `catalog/*.csv`, özet `catalog/catalog-summary.md` |
| Her kanalın rolü net | ✅ Founder §B (doctrine/00-index'e işlenecek) |
| Ana production benchmark'larında (Mustard, Paper Skies, Modern MBA, fern) high/typical/lower deep-watch | ✅ (Founder kapsamı: kanal başına 2; Mustard 6) |
| Shot log'lar | ✅ 12 tam/kısmi shot log + Persimmon açılış (kanal notunda) |
| Kanal içi high-vs-low karşılaştırması | ✅ kanal notları (INF: fark premise kaynaklı) |
| Cross-channel ortak prensipler / kanal-özel stil ayrımı | ✅ doctrine §1, §3–§7 |
| Pattern saturation değerlendirmesi | ✅ Mustard SATURATION; diğerleri Founder kapsamıyla 2 video (saturation iddiası yok) |
| Audio açıkça UNVERIFIED | ✅ yöntem gereği (ses dinlenmiyor) |
| P3 negatif benchmark ile karşılaştırma | ✅ doctrine §2 (P3-edit-timeline ölçümü) |
| Doctrine Company OS'a entegre edilebilir | ✅ D-029: creative-standards kuralı, treatment / visual-storytelling / handoff skill'leri bağlandı |

## Yöntem (tekrarlanabilir)
1. **Katalog:** kanalın `/videos` sayfası tarayıcıda sonuna kadar kaydırılır; her video için id, başlık, süre, görüntülenme, göreli yaş DOM'dan alınır; kesin tarih gerektiğinde video sayfasındaki yapılandırılmış açıklamadan. Thumbnail = `https://i.ytimg.com/vi/<id>/hqdefault.jpg`. Performans kovası kanal içi bağlamla (yaş + kanal medyanı) atanır. Çıktı: `research/catalog/<kanal>.csv`.
2. **Shot-level tarama (tarayıcı içi otomatik):** video sessiz, 4× hızda oynatılır; her 0,5 sn medya zamanında 64×36 gri kare imzası + 256×144 küçük kare + o anki altyazı satırı kaydedilir. **Olay sınırı:** ardışık kare farkı >14 (kesme/ani değişim) veya olay başlangıcından sapma >32 (kamera hareketi, yeni katman, kompozisyon değişimi). Olaylar 16'lık kontak sayfalarında ekranda gösterilir ve COO tarafından gözle incelenir; her olaya görsel mod, varlık türü, yeni bilgi ve anlatı işlevi (ESTABLISH/LOCATE/REVEAL/PROVE/EXPLAIN MECHANISM/COMPARE/SHOW SCALE/ESCALATE/CONTRADICT/PAYOFF/RESET/ATMOSPHERE/NONE) atanır.
   - Sınırlar: 0,5 sn örnekleme ≈ sürekli izleme değildir; 0,5 sn'den kısa kesmeler kaçabilir. Eşikler sabit; sapma görülürse not edilir. Altyazı = anlatım metni (otomatik altyazı olabilir).
   - **Ses dinlenmez → müzik, SFX, ducking, sessizlik, ses geçişleri: UNVERIFIED — HUMAN EAR REQUIRED.**
3. **Saturation:** her deep-watch sonunda "yeni ve transfer edilebilir hangi production prensibi?" cevabı yazılır; 3 ardışık temsilî videoda yeni prensip yoksa kanal PATTERN SATURATION REACHED.
4. **Etiketler:** DIRECTLY VERIFIED (videoda görüldü) · SOURCE-VERIFIED (creator/resmî kaynak) · INFERRED · UNVERIFIED. INFERRED zorunlu kural olmaz.

## Çıktı yerleri
- Katalog: `intelligence/creative/research/catalog/`
- Shot log'lar: `intelligence/creative/research/shotlogs/<kanal>-<video_id>.md`
- Kanal sentezleri + saturation: `intelligence/creative/research/channel-notes/<kanal>.md`
- Doctrine: `intelligence/creative/doctrine/` (index, narrative, visual, motion & transition, evidence-to-visual, map/diagram/chart, archive & rights, sound, hook & packaging, anti-patterns, prototype rubric, handoff standard, learning loop)
- Reference matrix: `intelligence/creative/documentary-style-benchmarks.md` (PROVISIONAL v0.1 → doctrine tamamlanınca güncellenir)

## Deep-watch planı (kanal içi kova → video)
| Kanal | HIGH/BREAKOUT | TYPICAL | LOWER | Format çeşitliliği | Durum |
|---|---|---|---|---|---|
| Mustard (medyan 6,4M) | Nautilus ✅ · Snow Cruiser ✅ | Savannah ✅ · Navy Airships ✅ | This Jet ✅ · Inflatoplane ✅ | — | ✅ **SATURATION (6)** — `channel-notes/mustard.md` |
| Paper Skies (831K) | Tu-104 Pushkin ✅ | B-29 ✅ | (IS-1 — kapsam dışı, 2026-10-13) | — | ✅ 2/2 |
| Modern MBA (622K) | Steakhouses Bb3Ndqf3qHk (3,4M) · Airlines rslcr774JXM (2M) | Buffets PU1zr8ka-0s (803K) | GoPro vJi0SzEws9s (119K) | — | 0/4 |
| fern (3,9M) | Kids Who Hacked CIA PmtFtWVrxFE (20M) · Narco Submarines lZmmGg51TfU (8,2M) | $1B Coca-Cola Machine -a29Ygyzc2c (4,2M) | German Cities 49UkBsiFVcY (1M) | — | 0/4 |
| Persimmon (9,2K) — paket/premise | Adams Golf KAsTwyE8elI (320K) | — | Wound Golf Ball JJ9j8w3ES8s (3,2K) | — | 0/2 (kısmi) |
| Ruined America (7,4K) — premise | Tucker O-335 fv1XaAclwhg (207K) | Panhard JF72Tdakg7o (örnek kare ✅) | Renault Diesel Jeep xcIV8c7_f8g (1,8K) | — | 0/2 (kısmi) |
| İkincil | Wendover (harita) · Real Engineering (mekanizma) · neo (harita) — her biri 1 video, ilgili bölüm | | | | 0/3 |
Tarama aracı: 8× hız, 0,5 sn örnek; anlatım = oynatıcının timedtext isteğinden json3 (tam zaman damgalı).

## Oturum günlüğü
| Tarih | Yapılan | Sıradaki adım |
|---|---|---|
| 2026-10-11 | P3 donduruldu (D-028); yöntem kuruldu; tarayıcı içi tarama aracı test edildi (Mustard "Why Was This Ship Banned From Ports?") | Katalog envanteri + Mustard deep-watch serisi |
| 2026-10-12 | Katalog 502 video ✅; Mustard 6 video tam tarama + shot log, saturation ✅. Yöntem: 4× (8× kare atlatıyor), sayfa içi `loadVideoById` ile video değiştirme, kontak sayfası %64 küçültme | Paper Skies → Modern MBA → fern → Persimmon/Ruined America → ikincil → doctrine yazımı |
| 2026-10-13 | Paper Skies 2 ✅, Modern MBA 2 ✅ (Buffets %55), fern 2 ✅ (Embassy %84), Persimmon Adams Golf açılış ✅, Ruined America: Tucker taraması tarayıcı çöktüğü için yapılamadı → katalog premise analizi + Panhard örnek kareleri. İkincil referanslar Founder kapsamıyla atlandı. **Doctrine v1 yazıldı** (`intelligence/creative/doctrine/documentary-production-doctrine-v1.md`), D-029, L-008 | **ARAŞTIRMA TAMAM.** Sıradaki: Founder P3 donmasını kaldırırsa doctrine ile P3 yeniden tasarımı (zero-credit storyboard → treatment v4 → prototype handoff) |
