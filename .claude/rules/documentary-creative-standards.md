---
paths:
  - "production/**"
  - "intelligence/creative/**"
  - ".claude/skills/documentary-*/**"
  - ".claude/agents/documentary-creative-director.md"
---

# Documentary Creative Standartları

Kaynak: Founder talimatı 2026-10-11 (D-025). P3 tam review kurgusu "voice-over + arşiv fotoğrafı + bilgi kartı + basit pan" hissi verdiği için reddedildi; bu kural bütün belgesel videolar için kalıcıdır. Onay, kanıt ve güvenlik kurallarını zayıflatmaz.

Bağlayıcı yaratıcı taban: `intelligence/creative/doctrine/documentary-production-doctrine-v1.md` (D-029) + marka/görsel sistem `.claude/rules/brand-and-visual-system.md` (D-031). Bu kural akışı ve kapıyı, doctrine içeriği (anlatı/görsel/motion grameri, anti-pattern, prototype rubric) tanımlar.

## 1. Akış (her video)
virality gate → growth puanı → packaging → evidence ledger → **creative treatment** (`documentary-creative-treatment`, `documentary-creative-director`; case accent + `source-to-visual` tablosu) → taslak anlatı → **prototype handoff** (`documentary-production-handoff`) → production PC'de ilk 60–90 sn → **`muted-preview-gate`** → **Founder prototype kapısı** → senaryo kilidi + tam görsel/edit plan + tam VO → full handoff → full production → yayın öncesi QA.
Creative treatment olmadan senaryo kilitlenmez; prototype kapısı geçilmeden full production'a geçilmez.

## 2. Prototype kapısı (değişmez)
- Ön koşul: araştırma yeterli · evidence ledger temiz · packaging yönü hazır · taslak anlatı (en az ilk 90 sn VO metni + tüm videonun yapısı) hazır.
- Production PC yalnız ilk ~60–90 sn'yi **neredeyse final kalitede** üretir: gerçek anlatıcı, gerçek görsel dil, arşiv/grafik, yaklaşık müzik yönü, gerçek kurgu temposu. Taslak kart, placeholder ses veya "sonra güzelleşecek" sahne prototype sayılmaz.
- Founder'a tek soru: **"Bunu izlemeye devam eder miydin?"** (Evet / Hayır / Emin değilim + istersen tek cümle neden). Mikro edit kararı sorulmaz.
- Evet → full production. Hayır/Emin değilim → creative director teşhis eder (§4), revize prototype. İki prototype üst üste geçemezse sorun fikirde olabilir: fikir growth/virality açısından yeniden değerlendirilir, devam/bırak kararı Founder'a tek öneriyle gelir.
- Prototype için ses kredisi ve diğer harcamalar `founder-approval.md`'ye tabidir (tek, tavanlı onay).

## 3. Görsel anlatım tabanı
- Her sahnenin bir işi vardır (yeni bilgi, merak, gerilim, karşılaştırma, nedensellik, ölçek, yer/zaman, kanıt, atmosfer, payoff). Yalnız anlatıcının söylediği nesneyi göstermek iş değildir.
- "Fotoğraf + yavaş zoom/pan + tam ekran bilgi kartı" varsayılan çözüm değildir. Ayrıntı: `documentary-visual-storytelling`.
- Görsel değişim = yeni bilgi veya yeni bakış açısı. Sabit "her X saniyede kesme" kuralı yok; ama bilgisini vermiş görsel durum yeni bir şey katmadan ekranda kalmaz.
- Title/thumbnail'ın sattığı çatışma veya merak videonun erken bölümünde görünür olur; bağlam otomatik olarak başa konmaz.
- AI görsel hiçbir zaman arşiv kanıtı gibi gösterilmez; gerçek olayın foto-gerçekçi yeniden üretimi yayın öncesi QA'da AI açıklama riski olarak işaretlenir.
- Arşivde bulunmak telif güvenliği demek değildir; her footage evidence/rights ledger'dan geçer. Hakkı açıkça doğrulanmamış materyal prototype'ta da kullanılmaz (D-026).
- YouTube closed captions her videoda hazırlanır; sürekli hardcoded altyazı varsayılan değildir.

## 4. Öğrenme döngüsü
Founder prototype veya final videoda bir sorun işaretlediğinde önce sorulur: **Bu yalnız bu videonun sorunu mu, yoksa production sisteminin sorunu mu?**
- Kayıt: `intelligence/creative/creative-feedback-log.md` (CF-XXX).
- Sistem sorunuysa video tek başına düzeltilmez; ilgili skill/rule/benchmark aynı turda güncellenir ve CF kaydına nereye işlendiği yazılır.
- Tek örnekten gelen zevk yorumu hemen evrensel kural olmaz: önce "gözlem" olarak kaydedilir; tekrar ederse, benchmark ilkesiyle örtüşürse veya kendi kanal verimiz desteklerse kurala taşınır. Founder açıkça "bu kural olsun" derse doğrudan kural olur.
