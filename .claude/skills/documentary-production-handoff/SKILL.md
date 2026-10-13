---
name: documentary-production-handoff
description: Ana Company OS'tan production/render bilgisayarındaki Claude'a giden üretim brief'ini hazırlar (prototype handoff: ilk 60–90 sn; full handoff: prototype kapısından sonra tüm video). Core promise, hook, yapı, sahne amaçları, asset planı, görsel dil, footage listesi, AI görsel istekleri, tipografi anları, müzik yönü, prototype sınırı ve kanıt kısıtlarını içerir. Founder production promptu yazmaz. Render veya ses üretimi başlatmaz.
---

# Documentary Production Handoff

Hazırlayan: COO (yaratıcı bölümler `documentary-creative-director`). Uygulayan: production PC'deki Claude (`production-engineer` rolü). Şablon: `TEMPLATE.md` (bu klasör). Handoff, doctrine `intelligence/creative/doctrine/documentary-production-doctrine-v1.md` §12 COO ön kontrolünü (prototype rubric) ve §13 handoff standardını geçmeden production PC'ye gitmez. Çıktı: `production/.../<video>-production-handoff-<prototype|full>-vN.md`.

## Ne zaman
- **Prototype handoff:** creative treatment + taslak anlatı hazır olduğunda, otomatik. Kapsam yalnız ilk ~60–90 sn.
- **Full handoff:** Founder prototype kapısında "Evet" dedikten, senaryo kilitlendikten ve görsel/edit plan güncellendikten sonra.

## Kurallar
1. **Kendi kendine yeterli.** Production PC'deki Claude sohbeti görmez; handoff + referans verdiği repo dosyaları yeterli olmalı. Founder'dan ek açıklama beklenmez.
2. **Zorunlu bölümler** (`TEMPLATE.md`): core promise · hook · narrative structure · scene purposes (beat tablosu) · asset plan · visual language · footage list · AI visual requests · typography moments · music direction · prototype boundary · evidence restrictions · onay/harcama durumu · teslim ve geri bildirim.
3. **Yetki sınırı.** Production Claude handoff içinde mikro kararları kendisi verir (kadraj, süre ±, geçiş, renk eşleme, şablon düzeltme; D-019 mantığı) ve kayda geçirir. Hook'u, yapıyı, VO metnini, iddiaları, packaging'i değiştiremez; bir beat uygulanamıyorsa en yakın eşdeğerle yapar ve "production problemi" olarak raporlar.
4. **Kanıt kısıtları açık yazılır:** kullanılmayacak iddia/sayı/ifade, alıntıların birebir metni, ekranda verilmeyecek rakamlar, hak durumu `unclear` olan asset'ler.
5. **Onay/harcama:** ses kredisi, yeni araç/paket, ücretli asset handoff'ta "Founder onayı: alındı / bekleniyor (tavan)" olarak yazılır. Onay yoksa ilgili adım başlamaz.
6. **Teslim:** prototype için 1080p review kopyası + kısa üretim raporu (yapılanlar, sapmalar, production problemleri, süre/kredi ölçümü, teşhis testleri sonucu). Büyük medya repo dışında kalır; rapor repoya.
7. **QA:** teslimden önce production Claude `documentary-visual-storytelling` §10 testlerini ve ölçülebilir ses kontrollerini (`audio-production.md`) çalıştırır.
8. **Founder'a soru:** prototype gösterildiğinde yalnız "Bunu izlemeye devam eder miydin?" Mikro edit sorusu sorulmaz.
9. **Senkron:** handoff repoya yazılır; production PC'ye ulaşması için yerel commit + Founder'ın GitHub Desktop push'u gerekir (`git-and-secrets.md`). Bu adım Founder'a tek cümleyle söylenir.
