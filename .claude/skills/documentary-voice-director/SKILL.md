---
name: documentary-voice-director
description: İngilizce faceless belgesel videoları için kanalın anlatıcı sesini, konuşma tarzını, telaffuz kontrolünü ve ElevenLabs ayarlarını sistematik ve kredi-tasarruflu biçimde seçer; voice brief ve test planı hazırlar, Founder'a en fazla 3 aday + 1 öneri getirir. Founder onayı olmadan ses üretmez, kredi harcamaz.
---

# Documentary Voice Director
> Ses üretimi/kurgusu için bağlayıcı kural: `.claude/rules/audio-production.md` (Claude dinleyemez; segment + zaman damgası + ölçüm; kulak kontrolleri yalnız checkpoint'te Founder'da). Kanal sesi ve birincil model: D-021.


Kapsam: The Industrial Casebook (N2 nişi) İngilizce faceless belgeseller. Ön koşul: Founder onaylı script. Çıktı: `production/.../<video>-voice-brief.md` (brief + test planı + sonuçlar) ve kanal düzeyinde `channels/<kanal>/voice.md` (kalıcı ses kararı, oluşunca).
Founder'a ses listesi veya teknik ayar dökülmez (`founder-interface`).

## Kurallar
1. **Önce anlatı ihtiyacı.** Ses seçmeden önce videonun tonu, temposu, teknik yoğunluğu, dramatik seviyesi ve hedeflenen güven/otorite hissi yazılır.
2. **Kanal sesi tutarlılığı.** Her videoda yeni ses seçilmez. İlk pilotlarla kanalın kalıcı ana anlatıcısı belirlenir ve `channels/<kanal>/voice.md`'ye kaydedilir; yalnız şirketin kendi verisi (retention, yorumlar, Founder değerlendirmesi) gerekçesiyle değiştirilir (`decision-log`).
3. **Seçim kriterleri (her aday, 1–5):** doğal İngilizce · belgesel anlatıcılığına uygunluk · teknik kelimelerin anlaşılırlığı · uzun dinlemede yormama · güvenilirlik · yapay/robotik his (ters puan) · aşırı teatrallik (ters puan) · sakin ama monoton olmayan tempo.
4. **Kanal tonu:** güvenilir, merak uyandıran, sakin, modern belgesel anlatımı. Fragman sesi değil; haber spikeri değil; Shorts/TikTok enerjisi değil.
5. **Cinsiyet varsayımı yok.** Kalite ve kanal uyumu belirler.
6. **ElevenLabs kredi tüketir.** Founder onayı olmadan test veya uzun voice-over üretilmez (`founder-approval.md` açık nokta: ElevenLabs kredisi). Onay talebi tek ve toplam kredi tavanıyla yapılır.
7. **Test metni:** onaylı scriptten kısa ama temsil gücü yüksek bölüm (≈1.000–1.300 karakter): teknik terim, sayı, normal anlatım, merak/gerilim. Script metni değiştirilmez; tam metin test için üretilmez.
8. **Telaffuz kontrolü:** kritik kelime listesi (özel adlar, kurumlar, teknik terimler) beklenen telaffuzla (IPA veya sade tarif) yazılır; test dinlenirken kelime kelime işaretlenir. Hata varsa sırayla: (a) modelin desteklediği telaffuz kontrolü (ör. Eleven v4'te metin içinde `/IPA/`; destekleyen modellerde pronunciation dictionary / alias), (b) yalnız **üretim kopyasında** kontrollü yazım. Script dosyası ve anlamı değişmez; üretim kopyası ayrı tutulur ve farkları kaydedilir.
9. **Ayarlar evrensel değildir.** Model, stability, similarity, style, speed vb. her ses+model için küçük testlerle belirlenir; sonuçlar `voice.md`'ye yazılır. Şirketin kendi sonuçları genel internet tavsiyelerinden önce gelir. Güncel model/ayar adları her kullanımda resmî ElevenLabs dokümantasyonundan kontrol edilir.
10. **Tempo:** Süreyi tutturmak için ses yapay hızlandırılmaz. Doğal anlatım temposu korunur; cümle araları, kısa sessizlikler ve önemli rakamlarda vurgu kurgu planının parçasıdır (noktalama ve paragraf bölme ile; gerekirse modelin desteklediği duraklama kontrolüyle).
11. **Kredi disiplini:** Ücretsiz adımlar önce (ses açıklamaları, hazır önizlemeler). Ücretli testte: en fazla 3 aday × tek test metni; model/ayar karşılaştırması yalnız en iyi adayda ve kısa parçayla. Her test için tahmini karakter = kredi hesabı yazılır (TTS ≈ 1 kredi/karakter — resmî fiyat sayfası; her kullanımda kontrol).
12. **Founder deneyimi:** Founder'a en fazla 3 güçlü aday + 1 önerilen ana ses + neden + kısa Türkçe açıklama. Hesaptaki sesler görülemiyorsa **isim uydurulmaz**; Founder'dan tek ve basit bir işlem istenir.
13. **ChatGPT:** Yalnız gerçekten faydalıysa (ör. iki aday çok yakınsa) `founder-interface` §6c ile hazır prompt; ChatGPT sesi duyamaz, bu yüzden yalnız brief/kriter tartışması için.

## Entegrasyon (Founder onayından sonra geçerli)
- Doğrudan ElevenLabs REST API + şirketin kendi betikleri (`production/tools/elevenlabs/`); üçüncü taraf plugin/MCP yok (Skill Lab SL-005…SL-008).
- Aday arama: `GET /v1/shared-voices` (language=en, accent=american, use_cases narration/documentary ilgili, category professional/high_quality, `include_custom_rates=false`, sort usage); ücretsiz `preview_url` ile ön eleme.
- Kimlik: kısıtlı + kredi kotalı API anahtarı, repo dışında DPAPI şifreli dosyada; Claude anahtarı görmez/yazdırmaz.
- Her üretim öncesi karakter ve tahmini kredi gösterilir; her üretim voice ledger'a yazılır. **Maliyet sabit tahminle hesaplanmaz:** gerçek karakter/kredi tüketimi API sonucundan (yanıt başlıkları ve/veya üretim öncesi-sonrası abonelik bakiyesi farkı) ölçülür ve gerçek kullanım olarak kaydedilir; dolar karşılığı yalnız ölçülen krediden ve o anki plan fiyatından hesaplanır. Final voice-over ücretli plan aktifken üretilir (ticari lisans).

## Süreç
1. Anlatı ihtiyacı analizi → voice brief.
2. Aday havuzu: Founder'ın hesabındaki sesler + (gerekirse) ElevenLabs Voice Library; yalnız açıklama ve önizlemeye göre ≤3 aday (ücretsiz).
3. Telaffuz listesi + test metni + kredi tavanı → Founder onayı (tek talep).
4. Onaydan sonra test: 3 aday × test metni → puanlama → en iyi adayda model/ayar mini testi.
5. Founder'a: ≤3 aday, 1 öneri, kısa gerekçe (+ dinleme dosyaları).
6. Founder seçimi → `channels/<kanal>/voice.md` (ses kimliği, model, ayarlar, telaffuz sözlüğü, tarih) + `decision-log`.
