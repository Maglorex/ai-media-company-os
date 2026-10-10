# Audio library (müzik / SFX kayıtları)

Prosedür: `.claude/skills/documentary-music-sfx/SKILL.md` · Karar: D-024 · Dosyalar repo dışında: `D:\CompanyOS-Production\_audio-library\` (kanal geneli; video klasörüne kopya `04_music\`).

## `audio-ledger.csv` — her final müzik/SFX asset'i için bir satır
| Sütun | Açıklama |
|---|---|
| `asset_id` | `A-001`… sıralı, tekrarsız |
| `type` | `music` / `sfx` |
| `title` | Kaynaktaki tam ad (uydurulmaz) |
| `creator` | Sanatçı / yayıncı |
| `source` | `youtube-audio-library` / `adobe-stock` / `other:<site>` |
| `source_url` | Kaynak sayfası (varsa) |
| `license` | ör. `YouTube Audio Library (no attribution)`, `CC BY 4.0`, `Adobe Stock Standard` |
| `commercial_use` | `yes` / `no` / `unclear` (unclear → kullanılmaz) |
| `modification_allowed` | `yes` / `in-video-edit-only` / `no` / `unclear` |
| `attribution_required` | `yes` / `no` |
| `attribution_text` | Kaynağın verdiği kredi metni, **birebir** (Audio Library: License type → Copy) |
| `license_proof` | Kanıt dosyası yolu veya Adobe Stock **lisans kodu** |
| `download_date` | YYYY-MM-DD |
| `local_file` | `_audio-library\` içindeki dosya adı |
| `sha256` | Dosya parmak izi |
| `used_in` | `VID-001:b01-b05;VID-001:b29` (video:beat aralıkları, `;` ile) |
| `status` | `candidate` / `approved` / `used` / `rejected` (silinmez) |
| `notes` | |

## Doğrulanmış kaynak bilgisi
- **YouTube Audio Library** — support.google.com/youtube/answer/3376882 (erişim 2026-10-10): erişim YouTube Studio → Audio Library; filtreler: başlık, tür, ruh hali, sanatçı, attribution, süre (sn); SFX: kategori, süre, arama. "Music and sound effects from the YouTube Audio Library are copyright-safe"; YPP'de monetize edilebilir; Content ID ile talep edilmez. Creative Commons parçalar açıklamada kredi ister (License type → Copy). İndirme MP3. Kullanım YouTube ToS'a tabi; müzik kendi videolarımız içindir, dosyalar ayrı dağıtılmaz `[VERİ]`. Video dışı kullanım ve dosyanın tek başına değiştirilmesi dokümanda açık değil → yapılmaz `[VARSAYIM]`.
- **Adobe Stock audio** — resmî Adobe sayfaları bu bilgisayardan otomatik okunamadı (403). Arama sonuçlarına göre: lisans kodu Adobe Stock → License History / audio license modal'da; YouTube'da Dispute → License alanına girilir; her parça için ayrı kod `[VARSAYIM — resmî metin okunmadı]`. Standart lisansın monetize kullanımı kapsadığı **doğrulanmadı**. Kullanım öncesi Founder hesabında gerçek lisans ve kapsam doğrulanır; o zamana kadar Adobe Stock kullanılmaz.
- Kaynaklar: [YouTube Help — Audio Library](https://support.google.com/youtube/answer/3376882), [Adobe — Audio copyright claims](https://stock.adobe.com/audio-copyright-claims), [Adobe blog — Stock audio and Content ID](https://blog.adobe.com/en/publish/2020/06/16/adobe-stock-audio-and-youtubes-content-id).

## Yayın
`production/tools/audio/attribution.ps1 -Video VID-001` → açıklamaya yapıştırılacak kredi bloğu + Content ID için lisans kodu listesi.
