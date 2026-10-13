# Caption Protocol v1

> Karar: D-036. Kaynak: P-07, P-20. Her long-form final için **İngilizce caption zorunlu**; otomatik altyazı yalnız yedek ve **kontrol edilmeden final kabul edilmez**.

## 1. Kaynak
- **Metin:** final, kilitli VO metni (script'in VO-only kopyası) — anlatıcının söylediği birebir.
- **Zaman:** final VO'nun kelime zaman damgaları (ElevenLabs `with-timestamps` JSON; `audio-production.md`). Kurgu VO'yu kaydırdıysa (pause trim, ek boşluk) final timeline offset'leri uygulanır (`vo-cues` çıktısı).
- Final VO yoksa caption üretilmez (taslak caption final sayılmaz).

## 2. Üretim (şirketin kendi script'iyle; yeni paket kurulmaz)
- Format: **SRT, UTF-8** (YouTube önerisi; P-20). VTT yalnız konumlandırma gerekiyorsa.
- Dosya: `<VID>-captions-en-v<N>.srt` (production klasörü; repoya küçük metin olarak girebilir).
- Bölme kuralları: satır ≤42 karakter, cue başına ≤2 satır, cue süresi 1–7 sn, okuma hızı ≤~20 karakter/sn; cümle/anlam sınırında böl; sayı ve ismin ortasından bölme yok.
- Cue sınırları kelime zaman damgasından; cue'lar arası ≥2 kare boşluk.

## 3. Ses/konuşmacı politikası
- Tek anlatıcı → konuşmacı etiketi yok.
- Arşiv konuşması/tanık sesi varsa: `[ARCHIVE AUDIO]` veya konuşmacı adı (ledger'daki biçim) + söylenen birebir; anlaşılmıyorsa `[inaudible]`.
- Anlamlı ses ipuçları yalnız gerektiğinde: `[music]` sahne başında bir kez, `[silence]` kullanılmaz; dekoratif SFX yazılmaz.
- Ekrandaki okunması gereken metin (ör. belge alıntısı VO'da yoksa) caption'a değil, görsele aittir.

## 4. QC (otomatik + COO)
1. Metin = final VO metni (diff 0; kelime atlama/ekleme yok).
2. **Özel isim/terim/sayı/kurum/yer listesi** evidence ledger'dan çıkarılır (ör. NS Savannah, Galveston, Atomic Servant, General Accounting Office, 1967, $1.16 million) → caption'da yazım birebir; sayılar VO'da nasıl söylendiyse okunabilir biçimde (ör. "about $1.16 million a year").
3. Zaman: ilk/son cue, en uzun boşluk, örtüşme yok, süre ≤ video süresi.
4. Format doğrulama: UTF-8, SRT sözdizimi.
Sonuç `<VID>-caption-qc.md` (kısa) → Release Gate G-03.

## 5. Dil bağı
`settings.language.video = English` ↔ caption dili `en` ↔ title/description dili English. Uyuşmazlık = FAIL.

## 6. YouTube Studio doğrulaması (upload sonrası, Release Gate B)
SRT yüklendi (Subtitles → English, "with timing") · otomatik altyazı yanında **bizim parçamız** yayınlı · player'da 3 rastgele noktada senkron kontrolü (başlangıç, orta, son) · caption certification seçili (Upload Settings Matrix).

## 7. Çeviri altyazı
Yalnız kanal coğrafya verisi gerekçe verince (Founder'a sorulmaz; analytics kararı); ilk günden çok dil yok.
