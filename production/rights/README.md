# Rights Ledger Standard v1 + Copyright Gate

> Karar: D-036. **Kullanım hakkı ≠ description kredisi.** Kredi metni hak kaydından türetilir; kredi vermek hak sağlamaz.
> Kapsam: videoda ve thumbnail'da kullanılan **her harici (bizim üretmediğimiz) görsel/footage/belge/harita verisi/font/AI asset**. Müzik ve SFX: `production/audio-library/audio-ledger.csv` (aynı statü sözlüğü; çoğaltılmaz). Bizim çizdiğimiz grafikler kayda girmez; içinde harici veri/asset varsa o veri girer.
> Dosya: video başına `production/<video-klasörü>/<VID>-rights-ledger.csv` (UTF-8, virgül ayrık). Şablon: `rights-ledger-template.csv`.
> Evidence ledger §C kanıt kimliğini (V-ID) ve kanıt değerini tutar; **hak durumu için kanonik kaynak bu dosyadır** (D-036'dan sonraki videolarda). P3'ün mevcut §C hak bilgisi bu formata taşınacak (deferred).

## Sütunlar
| Sütun | Değer | Not |
|---|---|---|
| `asset_id` | V-ID (ledger) veya `AI-NN`, `F-NN` (font), `M-NN` (harita verisi) | Benzersiz |
| `asset_type` | `photo` / `footage` / `document` / `technical-drawing` / `map-data` / `font` / `ai-image` / `other` | |
| `source` | Kurum/arşiv/site (ör. `NARA`, `Wikimedia Commons`, `ChatGPT image generation`) | |
| `creator_owner` | Yaratıcı / hak sahibi (bilinmiyorsa `unknown`) | |
| `source_url_or_provenance` | Kalıcı URL / katalog no / AI için prompt dosyası | |
| `license_basis` | `public-domain-usgov` / `public-domain-other` / `CC0` / `CC-BY-x.x` / `CC-BY-SA-x.x` / `OFL-1.1` / `permission-written` / `paid-license` / `ai-generated-own` / `unknown` | |
| `attribution_required` | `yes` / `no` | |
| `attribution_text` | Birebir kredi metni (description'a buradan gider) | |
| `retrieval_date` | YYYY-MM-DD | |
| `proof_location` | Ekran kaydı/sayfa arşivi/lisans dosyası yolu (repo dışıysa yol) | Kanıtsız = `manual_review_needed: yes` |
| `allowed_transformations` | `any` / `crop-resize-grade` / `no-derivatives` / `unclear` | CC-BY-SA → ShareAlike riski (ledger §G) |
| `commercial_use` | `yes` / `no` / `unclear` | Monetize YouTube = ticari |
| `restrictions_expiry` | Süre, bölge, kişilik hakkı, marka vb. veya `none` | |
| `usage_locations` | `VID-001:00:00-00:05;thumbnail` | Final edit sonrası doldurulur |
| `rights_status` | `CLEAR` / `CLEAR_WITH_ATTRIBUTION` / `UNKNOWN_RIGHTS` / `UNRESOLVED_RIGHTS` / `REJECTED` | |
| `rights_confidence` | `high` / `medium` / `low` | |
| `manual_review_needed` | `yes` / `no` | |
| `notes` | | |

## Statü kuralları
- `CLEAR`: lisans temeli doğrulandı, ticari kullanım `yes`, dönüşüm uygun, kanıt yerinde.
- `CLEAR_WITH_ATTRIBUTION`: aynı + atıf zorunlu ve metin hazır.
- `UNKNOWN_RIGHTS`: lisans temeli `unknown` veya `commercial_use: unclear` veya kanıt yok.
- `UNRESOLVED_RIGHTS`: kaynaklar çelişiyor (ör. NARA "Undetermined" vs IA "PD Mark") veya kişilik/marka hakkı açık.
- `REJECTED`: kullanılmaz (satır silinmez).
- AI asset: `license_basis: ai-generated-own`, `rights_status: CLEAR` yalnız prompt + üretim tarihi + "gerçek kişi/marka/telifli karakter yok" kontrolüyle; kanıt değildir (asset ledger `AI-GENERATED / ILLUSTRATIVE`).
- Font: `OFL-1.1` = CLEAR (video içinde kullanım); dosya repoya girmez.

## Copyright Gate (Release Gate G-09, G-10)
1. Videoda/thumbnail'da kullanılan her harici asset rights ledger'da (veya audio ledger'da) var mı? (usage_locations dolu)
2. Hiçbir satır `UNKNOWN_RIGHTS` / `UNRESOLVED_RIGHTS` değil; `manual_review_needed: yes` kalmamış.
3. `CLEAR_WITH_ATTRIBUTION` satırlarının metinleri description Credits'te birebir.
4. Audio ledger: `commercial_use: yes`, status `used`, attribution metni description'da.
5. YouTube Checks sonucu kayıtlı — **ama tek başına "haklar temiz" sayılmaz** (P-10); 1–4 geçmeden Checks PASS anlamsızdır.
Herhangi biri FAIL → **public yasak**.
