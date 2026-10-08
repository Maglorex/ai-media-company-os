# Niş Değerlendirme Çerçevesi (v1.0)

> Kayıt: D-006 · Tarih: 2026-10-06 · Kullanım: Faz 1 / G-2. Sürüm değişikliği yeni kayıtla işaretlenir (silinmez).

## Amaç
Şirketin ilk kanal nişini, tek bir metriğe (özellikle RPM'e) bağlı kalmadan; izleyici talebi, retention, tekrarlanabilir üretim ve risk dengesiyle seçmek.

## Aşama 0 — Eleme kapısı (geçemeyen aday elenir, puanlanmaz)
| Kapı | Soru |
|---|---|
| Şirket kısıtları | Reklam, satış/outreach, düşük değerli yeniden paketleme gerektiriyor mu? (`CLAUDE.md`) |
| Politika | YouTube'un reused/inauthentic content ve AI açıklama kuralları açısından bu format orijinal ve güvenli mi? (yalnızca resmi kaynak `[VERİ]`) |
| Faceless uygunluk | Yüz/sunucu olmadan anlatılabiliyor mu? |
| Orijinallik | Başkasının içeriğine dayanmadan orijinal anlatı kurulabiliyor mu? |

## Puanlama (her kriter 1–5; ağırlıklı toplam = 100 üzerinden)
Puan = (kriter puanı / 5) × ağırlık. Yüksek puan her zaman "adayın lehine" demektir (risk kriterlerinde yüksek puan = düşük risk).

| # | Kriter | Ağırlık | Ne ölçülür |
|---|---|---|---|
| 1 | İngilizce/uluslararası gerçek talep | 12 | Arama ve izlenme hacmi; gerçek video performansları; kanal büyüklüğü dağılımı (H-001) |
| 2 | Long-form retention / storytelling potansiyeli | 10 | Anlatıyla 8–20+ dk tutulabilir mi; mevcut videoların izlenme süresi sinyalleri |
| 3 | Evergreen / uzun vadeli potansiyel | 10 | İçerik aylar-yıllar sonra izlenmeye devam eder mi (arama + önerilen) |
| 4 | Sürdürülebilir konu havuzu | 10 | **En az 50 güçlü video fikri** çıkarılabiliyor mu (örnek liste zorunlu) |
| 5 | Title/thumbnail ve curiosity-gap potansiyeli | 8 | Tıklanabilir, dürüst merak boşluğu kurulabiliyor mu |
| 6 | Farklılaşma imkânı | 8 | Büyük kanallar karşısında net bir açı / boşluk var mı |
| 7 | AI destekli üretimde kalite koruma kolaylığı | 8 | Senaryo, ses, görsel akışı kaliteyi düşürmeden tekrarlanabilir mi |
| 8 | Telif ve reused-content riski (yüksek = düşük risk) | 8 | Görsel/ses/kaynak lisansı, reused content riski |
| 9 | Gelir potansiyeli | 8 | RPM (**en fazla 4 puan etkili**, aşağıya bakın) + AdSense dışı seçenekler (4) |
| 10 | Kaynak ve görsel materyal bulunabilirliği | 7 | Güvenilir kaynak, lisanslı/kamu malı/özgün görsel erişimi |
| 11 | Video başına üretim süresi ve maliyeti (yüksek = ucuz/hızlı) | 7 | Saat ve ElevenLabs/araç maliyeti; tek Founder'la ölçeklenebilirlik |
| 12 | Zamana duyarlılık (yüksek = zamana duyarsız) | 4 | İçerik birkaç hafta içinde değer kaybediyor mu |
| | **Toplam** | **100** | |

### Gelir kriteri (9) iç ağırlığı
- RPM / AdSense gelir potansiyeli: en fazla **4** puan.
- AdSense dışı ve YouTube dışı gelecek seçenekleri (affiliate, ürün, sponsorluk, e-posta/web, lisanslama vb.): **4** puan.
- Tek başına yüksek RPM, 100 üzerinden en fazla ~%4 katkı yapabilir. Yüksek RPM + düşük izlenme potansiyeli, geniş izleyici + güçlü retention sunan adayı geçemez.

### Kritik koruma kuralları
- Talep (1), retention (2) ve evergreen (3) toplamı 32 puandır; bu üçünden herhangi birinde **2 veya altı** alan aday, toplam puanı yüksek olsa da birincil öneriye giremez (gerekçeli istisna COO'ya aittir).
- Kriter 4'te 50 fikir listelenemeyen aday birincil öneriye giremez.
- Kanıtsız puan verilemez: her puan `[VERİ]` / `[VARSAYIM]` / `[TAHMİN]` etiketiyle ve gerekçeyle yazılır; veri yoksa puan "geçici" işaretlenir.

## Aşama A — Discovery
- Geniş tarama; **10–15 ciddi aday niş**. Eleme kapısını geçenler 12 kriterle **hızlı (geçici) puanlanır**.
- Her aday için: tek cümle tanım, hedef izleyici, örnek 5 video fikri, öne çıkan 2–3 rakip kanal, geçici puan + en büyük belirsizlik.
- Çıktı: `intelligence/market-research/2026-10-06-faz1-stage-a-discovery.md`. En yüksek 3–5 aday Stage B'ye geçer.

## Aşama B — Validation
- En iyi 3–5 aday derin araştırılır: rakip kanallar, gerçek video performansları (izlenme/abone oranı, outlier videolar), konu havuzu (50 fikir), üretim gereksinimleri (süre/maliyet/araç), politika ve telif riski, gelir potansiyeli (RPM sinyali + alternatif gelir).
- Kritik noktalarda `research-request` ile ChatGPT ikinci görüşü; Founder'a kopyala-yapıştır prompt verilir.
- Çıktı: aday başına rapor + karşılaştırma tablosu, `intelligence/market-research/`.

## Karar
- Son karardan önce `decision-review` çalıştırılır; birincil niş önerisi Founder'a sunulur (Founder onayı gerekir).
- H-001 (İngilizce/uluslararası pazar) sonucu açıkça raporlanır.

## Çıktı kalitesi
- Her önemli iddia: kaynak linki + erişim tarihi (`.claude/rules/evidence-and-research.md`).
- Rapor yapısı: Özet (≤5) · Bulgular · Belirsizlikler · Şirket için anlamı · Birincil öneri.
