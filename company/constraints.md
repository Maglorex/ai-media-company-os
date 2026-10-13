# Kısıtlar ve Başlangıç Koşulları

> Durum: **Founder tarafından doğrulandı (2026-10-06, D-002).** Değiştirmek Founder kararıdır ve `decision-log.md`'ye işlenir.

## İş modeli
- İlk aşamada **doğrudan müşteri satışı yok.**
- **Cold outreach yok.**
- **Ücretli reklam yok.**
- İlk gelir modeli: **organik dağıtım kullanan dijital medya varlıkları.**
- İlk ana platform: **YouTube.**
- İlk ana format: **orijinal, faceless, long-form** içerik.
- **Shorts ana ürün değildir;** gerektiğinde long-form içerikten türetilir. Uygulama: her long-form için uygun materyal varsa 2–4 özgün Short (sayı doldurmak için zayıf Short yok) — `video-launch-os` §25 (D-038).
- Başkasının içeriğini düşük değerli biçimde yeniden paketleyen veya platform politikalarını riske atan modeller **kullanılmaz.**
- Yeni kanal açmak **otomatik değildir.** İlk kanalın verisi ve üretim kapasitesi expansion kriterlerini karşılamadan yeni kanal önerilmez.

## Finansal politika
- Reklam bütçesi: **0.**
- Ek yazılım masrafları **minimumda** tutulur.
- Mevcut araçlarla çözülebilecek bir sorun için yeni SaaS önerilmeden önce mevcut araçlar değerlendirilir.
- **Her yeni ücretli araç Founder onayı gerektirir.**

## Mevcut araçlar
| Araç | Erişim | Ana kullanım |
|---|---|---|
| Claude Pro / Claude Code | Ücretli | Operasyon (COO), araştırma, yazım, analiz, otomasyon |
| ChatGPT | Ücretli abonelik | Dış araştırma, ikinci görüş, fact checking, güncel web araştırması, uzman analiz |
| ElevenLabs | Ücretli erişim | Seslendirme |
| Ücretsiz / açık kaynak araçlar | — | Mümkün olduğunda tercih edilir |
| Remotion, FFmpeg | Değerlendirilecek | İleride production pipeline |

Ayrıntılı envanter: `production/tools/README.md`.

## Founder rolü
- Founder nihai karar merciidir.
- Founder'ın günlük operasyonları mümkün olduğunca düşünmek zorunda kalmaması hedeflenir.
- COO, işi hazır ve uygulanabilir halde sunar; gereksiz seçenek listesi yerine veriye dayalı birincil öneri verir.

## Git politikası
- Yerel dosya oluşturma/değiştirme ve **yerel commit** onay gerektirmez.
- **Founder onayı gerekir:** remote push, repo paylaşımı, branch silme, history rewrite, force push, remote ayarı değiştirme.
- Push işlemleri şimdilik Founder tarafından **GitHub Desktop** üzerinden manuel yapılır.
- Secret, API key, password veya credential **asla** commit edilmez (bkz. `.gitignore`).

## Founder Intake sonuçları (2026-10-06, D-003)
| Konu | Durum |
|---|---|
| Dil / pazar | İngilizce, uluslararası kitle — **stratejik varsayım** (H-001), niş araştırmasıyla doğrulanacak |
| Founder zamanı | Haftada ~40 saat; her tür işi yapabilir (kurgu, yükleme, onay dahil) |
| Sabit abonelik | Claude Pro dışında yeni sabit abonelik yok. İstisna: zorunlu ve açık ROI gösteren ihtiyaç → ayrıca Founder değerlendirmesi |
| ChatGPT | Plus |
| ElevenLabs | Pay-as-you-go; ihtiyaca göre kredi/plan yükseltmesi mümkün (Founder onaylı) |
| Ses | ElevenLabs hazır sesleri (ses klonu yok) |
| YouTube kanalı | Yok; henüz oluşturulmadı |
| Render bilgisayarı | Ayrı makine: Ryzen 5 5600, 16 GB RAM, RX 580 8 GB. Bu oturumun bağlı olduğu bilgisayar **değil** |
| Konu tercihi / yasaklı konu | Yok — niş tamamen araştırmaya göre seçilecek (CLAUDE.md değişmez kuralları geçerli) |
| Zaman ufku | Sabit süre yok. Founder görünür ilerleme ister → kısa, ölçülebilir kilometre taşları |
| Rapor sıklığı | Günlük Founder Brief |

## Bu koşulların operasyonel sonuçları
- Haftada 40 saat Founder zamanı ana kaynaktır; darboğaz para değil, **doğru iş seçimi**.
- ElevenLabs kullanım başı ödemeli olduğundan seslendirme maliyeti video başına izlenir.
- Render donanımı orta seviye `[VARSAYIM]`: 1080p long-form üretim için yeterli olması beklenir; pipeline aşamasında test edilecek.
