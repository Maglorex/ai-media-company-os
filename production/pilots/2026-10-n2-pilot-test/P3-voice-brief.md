# P3 NS Savannah — Voice Brief + Test Planı

> Tarih: 2026-10-08 · Skill: `documentary-voice-director` (ilk kullanım) · Script: `P3-script-v2.md` v2.1 (kilitli)
> Durum: **plan.** ElevenLabs'te ses üretilmedi, kredi harcanmadı. Founder'ın hesabındaki sesler bu oturumda **görülemedi** (bağlı hesap/araç yok); aday isimleri uydurulmadı.
> Bu P3 brief'i aynı zamanda kanalın kalıcı ana anlatıcısını seçme sürecinin başlangıcıdır.

## 1. Anlatı ihtiyacı
| Boyut | P3 değerlendirmesi | Ses için anlamı |
|---|---|---|
| Ton | Kanıta dayalı, ölçülü; "zarar değil, ek destek" gibi düzeltici cümleler | Sakin güven; abartısız vurgu |
| Tempo | ~1.280 kelime, ~10 dk; kısa vurucu cümleler ("Every year." "Not a loss. Extra support.") + orta uzunlukta açıklayıcı paragraflar | Kısa cümlelerde doğal duraklama; açıklamalarda akıcılık |
| Teknik yoğunluk | Orta-yüksek: kurum adları, "net cost", "operating subsidy", "spent fuel", "reactor core", çok sayıda rakam | Rakam ve terimlerde net artikülasyon |
| Dramatik seviye | Düşük-orta; gerilim olgulardan geliyor | Teatral olmayan, merakı koruyan tonlama |
| Güven/otorite | Yüksek: izleyici rakamlara ve belgeye güvenmeli | Olgun, net, "açıklayan" ses; vaaz/spiker değil |

**Hedef anlatıcı tarifi (aday ararken kullanılır):** *Calm, credible modern documentary narrator; natural conversational English; clear on numbers and technical terms; warm but restrained; no trailer voice, no news-anchor cadence, no high-energy social-media delivery.* Aksan: kanal "İngilizce / uluslararası" (H-001) — genel Amerikan veya nötr İngiliz İngilizcesi; konu ABD tarihi olduğu için Amerikan İngilizcesi hafif öncelikli `[VARSAYIM]`, test sonucu belirler. Cinsiyet ön koşulu yok.

## 2. Aday havuzu ve kriterler
- Kaynak 1: Founder'ın ElevenLabs hesabındaki sesler (görülemedi → Founder'dan tek işlem).
- Kaynak 2 (gerekirse): ElevenLabs Voice Library — yalnız ses açıklaması ve hazır önizlemeyle ön eleme.
- Ön eleme (ücretsiz): ≤3 aday. Puanlama tablosu (1–5): doğal İngilizce · belgesel uygunluğu · teknik anlaşılırlık · uzun dinleme · güvenilirlik · robotiklik (ters) · teatrallik (ters) · tempo.

## 3. Telaffuz listesi
| Kelime / ifade | Beklenen | Not / yedek yöntem |
|---|---|---|
| NS Savannah | "en-ess suh-VAN-uh" /ˌɛnˈɛs səˈvænə/ | "NS" harf harf okunmalı; okunmazsa üretim kopyasında "N.S. Savannah" |
| Galveston | /ˈɡælvəstən/ "GAL-vuh-stun" | — |
| Maritime Administration | /ˈmærɪtaɪm ədˌmɪnɪˈstreɪʃən/ | — |
| Atomic Energy Commission | /əˈtɑːmɪk ˈɛnərdʒi kəˈmɪʃən/ | — |
| nuclear | /ˈnuːkliər/ ("NOO-klee-er") | "nucular" kabul edilmez |
| commercial | /kəˈmɜːrʃəl/ | — |
| Isbrandtsen (S2) | doğrulanacak (şirket adı; güvenilir telaffuz kaynağı bulunmadı) | Founder'a tek soru değil: test dışı; tam üretimden önce kontrol edilir |
| Atomic Servant | /əˈtɑːmɪk ˈsɜːrvənt/ | — |
| "$2 million" (S4 alıntısı) | "two million dollars" | Üretim kopyasında yazıyla |
| 1965, 1968, 1970, 1971 | "nineteen sixty-five" vb. | Gerekirse üretim kopyasında yazıyla |
| subsidy, depreciation | /ˈsʌbsɪdi/, /dɪˌpriːʃiˈeɪʃən/ | — |

Yöntem: test dinlenirken her satır ✓/✗. Hata varsa önce modelin telaffuz kontrolü (Eleven v4: metin içinde `/IPA/`; resmî "Best practices" sayfası, erişim 2026-10-08), sonra pronunciation dictionary/alias, en son üretim kopyasında kontrollü yazım. Script dosyası değişmez.

## 4. Test metni (v2.1'den, değiştirilmeden; ~1.150 karakter)
> **A — normal anlatım + "commercial":**
> The NS Savannah was the first nuclear-powered merchant ship. And at sea, she did her job. In her first three years of commercial service, she made nineteen voyages on regular cargo routes — to the Mediterranean, to northern Europe, and to the Far East.
>
> **B — sayı + gerilim:**
> But in June 1970, federal auditors sent Congress a report with a different kind of number. Compared with the support the government paid to keep similar conventional freighters on the same route, the Savannah needed about two million dollars more. Every year. Not a loss. Extra support.
>
> **C — kurum adları:**
> Every port visit took planning that an ordinary freighter didn't need — surveys, entry and departure arrangements, and in foreign ports, agreements with other governments, worked out together with the Maritime Administration, the Atomic Energy Commission and the State Department.
>
> **D — teknik + rakam + Galveston:**
> Line three — the biggest: about one point one six million dollars a year for a nuclear ship-servicing facility. It was in Galveston, Texas. A pier and work area, plus about twenty-five acres of land kept clear as a safety zone. Inside: a heavy crane, a pool for spent fuel, a servicing barge called the Atomic Servant — and a spare reactor core.

## 5. Model ve ayar yaklaşımı
- Güncel modeller (resmî "Models" sayfası, erişim 2026-10-08): **Eleven v4** (en yüksek kalite/duygusal aralık, IPA desteği, 10.000 karakter sınırı) ve **Eleven Multilingual v2** ("most stable on long-form", önceki nesil). Belgesel için ikisi aday; seçim test ile.
- Ayarlar (stability, similarity, style, speed): sabit değer yok. Önce varsayılan ayarlarla adaylar karşılaştırılır; ayar ve model denemesi yalnız kazanan sesle, kısa parçada yapılır. Hız ayarıyla süre tutturulmaz.

## 6. Test planı ve kredi tavanı
| Adım | İçerik | Tahmini kredi |
|---|---|---|
| 0 | Hesaptaki sesler + açıklamalar + hazır önizlemeler → ≤3 aday | 0 (ses üretimi yok) |
| 1 | 3 aday × test metni A–D (~1.150 karakter), varsayılan ayarlar, tek model | ~3.450 |
| 2 | Kazanan ses: diğer modelde D parçası (~350) | ~350 |
| 3 | Kazanan ses: bir ayar varyantı, B parçası (~290) | ~290 |
| Pay | Telaffuz düzeltme tekrarı (tek cümleler) | ~300 |
| **Tavan** | | **≤ 4.500 kredi** (TTS ≈ 1 kredi/karakter — elevenlabs.io/pricing SSS, erişim 2026-10-08; içerik/ayar değişmeden sınırlı ücretsiz yeniden üretim olabilir) |
| Karşılaştırma | Tam v2.1 VO tek üretim | ~7.800 kredi |

## 7. Founder'dan gerekenler (sırayla, tek tek)
1. **Şimdi (bilgi):** ElevenLabs hesabındaki sesleri görebilmek için tek işlem: Voices sayfasının ekran görüntüsü.
2. **Sonra (onay):** Adım 1–3 için ≤4.500 kredilik test onayı (`founder-approval.md` formatında, tek talep).
3. **En son (karar):** ≤3 aday arasından ana ses seçimi → `channels/<kanal>/voice.md` + decision-log.

## 8. Voice Library taraması (2026-10-08, API, kredi harcanmadı)
- Sorgu: `GET /v1/shared-voices` — language=en, accent=american, category=professional, include_custom_rates=false, sort=usage_character_count_1y, use_cases ∈ {narrative_story, informative_educational}; 400 kayıt çekildi (filtre toplamı 4.270). Tanım filtresi: calm/confident/professional/deep/crisp/serious/mature/formal/pleasant/relaxed/gentle/modulated; ASMR, fragman, reklam, sosyal medya, karakter, haber spikeri, gizem/gerilim, dini metin vb. elendi → 257 aday.
- **Sınır:** COO ses dosyalarını **dinleyemez**; seçim metaveri (açıklama, kategori, 1 yıllık kullanım hacmi = uzun metin kararlılığı için dolaylı gösterge, kaldırılma bildirim süresi, ek ücret yok) ile yapıldı. Kulak kontrolü Founder'ın ücretsiz önizleme dinlemesiyle yapılır.

| Finalist | voice_id | Neden | Risk |
|---|---|---|---|
| **Annie K – Grounded Narrator** (kadın, orta yaş) — **öneri** | XW70ikSsadUbinwLMZ5w | Açıklaması brief'le birebir: "steady, clear, highly professional… technical, educational, and long-form narration"; ~951M karakter/yıl kullanım; 730 gün bildirim süresi; ek ücret yok | Önizlemenin belgesel tonuna uygunluğu kulakla doğrulanmalı |
| **Bill L. Oxley** (erkek, orta yaş) | iiidtqDt9FBdT1vfBluA | "Factual, clear, conversational baritone" — sakin, abartısız, modern; ~1,7 milyar karakter/yıl; 730 gün | Sahibinin birden çok benzer sesi var (Bill Oxley varyantları) |
| **Max – Elearning and Documentary** (erkek, orta yaş) | Gfpl8Yo74Is0W6cPUWWT | Açıkça "documentaries, explainers"; ~1 milyar karakter/yıl; 730 gün | "Friendly eLearning" tonu fazla eğitim videosu gibi gelebilir |

- **Bilinçli olarak elenen:** "Peter" (ZthjuvLPty3kTMaNKVKb) — tanım uygun ama kütüphanenin en çok kullanılan seslerinden (yılda ~6 milyar karakter, 1,4 milyon ekleme); kanalın ayırt ediciliği ve "şablon yapay zekâ kanalı" algısı riski. "David Castlemore – Newsreader" (spiker tarzı), "Adam – Radio Announcer", gizem/gerilim ve karakter sesleri brief dışı.
- Önizlemeler (ücretsiz): Annie K https://storage.googleapis.com/eleven-public-prod/database/workspace/d919f501def841d688c8fe932a668ff6/voices/XW70ikSsadUbinwLMZ5w/qiHz4qkrY2iq3OYxmLnX.mp3 · Bill L. Oxley https://storage.googleapis.com/eleven-public-prod/database/workspace/64971298bfc24086b69026970a21f1f9/voices/iiidtqDt9FBdT1vfBluA/T36MtmAvwCajW33mBOpD.mp3 · Max: ElevenLabs Voice Library'de "Max - Elearning and Documentary" (önizleme bağlantısı süreli/imzalı).
- Sonraki: Founder önizleme dinlemesi → gerekirse finalistlerde kısa API testi (test metni §4, ≤4.500 kredi, ayrı onay; Starter aktifken).

- 2026-10-08: Starter aktif (API teyidi). Founder önizleme sonrası **Bill L. Oxley**'i seçti (D-016). Sonraki: yalnız bu seste test metni §4 ile Eleven v4 ve Multilingual v2 karşılaştırması (~2 × 1.150 karakter) + telaffuz düzeltme payı; tavan 2.600 kredi; gerçek tüketim ölçülerek kaydedilecek.
