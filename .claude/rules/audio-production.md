# Ses Üretimi ve Ses Kurgusu Kuralları

Kaynak: Founder talimatı 2026-10-10 (D-022). Amaç: Claude teknik ses kurgusunu ve senkronizasyonu büyük ölçüde kendisi yapar; Founder yalnız kısa ses QA'sı ve final video kontrolü yapar.

## Temel sınır: Claude dinleyemez
- Claude sesi insan kulağıyla değerlendiremez. Bunu gizlemez, dinlemiş gibi davranmaz, "kulağa doğal geliyor" gibi ifade kullanmaz.
- Dinleme gerektiren yaratıcı ses kararlarında **tahmin yapılmaz**; ölçülebilen her şey ölçülür, kalan kulak kontrolü checkpoint'te Founder'a gider.

## Ölçülebilir kontrollerle çalış
Final voice-over ve ses kurgusu mümkün olduğunca şu verilere dayanır:
- **Script segmentleri** (sahne/bölüm sınırları) ve **cümle/kelime zaman damgaları** (ElevenLabs `with-timestamps` hizalama çıktısı; JSON olarak saklanır).
- **Süre**, **dalga formu**, **sessizlik tespiti** (`silencedetect`), **clipping / loudness** (`loudnorm` ölçümü: integrated LUFS, true peak, LRA).
- Araçlar: mevcut onaylı araçlar (Remotion'ın içindeki ffmpeg, şirket betikleri). Yeni paket/yazılım ayrı Founder onayı.

## İzlenebilirlik
- Hangi ses dosyasında hangi cümlenin olduğu **dosya adı ve metadata** ile açıkça takip edilir: ör. `P3_VO_S05_v1_eleven_multilingual_v2.mp3` + aynı adla `.json` (metin, karakter, ölçülen kredi, request_id, zaman damgaları, ölçümler).
- Ses kayıtları `voice-ledger` dosyasına işlenir; dosyalar repo dışında (`<video>\03_vo\`), yedek betiği üretimden sonra çalıştırılır.

## Segmentleme
- Final narration mantıklı bölüm segmentleri halinde (genelde sahne = S1…Sn) üretilir ve edit timeline'ında birleştirilir.
- Segment geçişlerinde doğal akış için model destekliyorsa önceki/sonraki metin bağlamı (`previous_text` / `next_text`) verilir.
- Segmentleme narration'ın doğal akışını bozuyorsa daha uzun bloklar kullanılır. Bir segmentin yeniden üretimi yalnız o segmenti etkiler; kredi kaydı segment bazında tutulur.

## Founder'a gelen kulak kontrolleri (yalnız anlamlı checkpoint'lerde)
1. Anlatıcı doğallığı
2. Telaffuz
3. Müzik ile voice-over dengesi
4. Rahatsız edici geçiş/kesme
5. Final bütünlük

Founder'dan bütün edit sürecini elle yönetmesi istenmez. Her checkpoint'te Founder'a kısa liste verilir: dinlenecek dosya, süre, kontrol edilecek 3–5 madde; Claude'un ölçtüğü teknik sonuç tek satırda.

## Onay ve maliyet
Ses üretimi `founder-approval.md`'ye tabidir (kredi kullanımı Founder onaylı). Kanal sesi ve birincil model: D-021; yeniden açma koşulları orada.
