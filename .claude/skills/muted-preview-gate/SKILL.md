---
name: muted-preview-gate
description: Prototype veya full video render'ından sonra, Founder'a göstermeden önce kalıcı görsel QA kapısı — ilk yarıdan 8–10 ayrı ~3 sn'lik sessiz örnek seçer, contact sheet/grid üretir ve "sessizken ilgi çekiyor mu, aynı kanala ait mi, template tekrarı mı, Archive/Evidence/Engineering dünyaları dengeli mi" sorularıyla PASS/REVISE verir; ayrıca brand diversity QA (aynı arka plan modu, aynı foto işlemi, aynı geçiş tekrarı, marka tintiyle öldürülmüş kaynak, case accent kullanımı, semantic progression). Render dosyası gerektirir; render yapmaz.
---

# Muted Preview Gate v1

Karar: D-031. Neden: YouTube ana sayfa/arama önizlemeleri videonun herhangi bir bölümünden sessiz oynayabilir; yalnız intronun markalı olması yeterli değildir. Bağlayıcı: `.claude/rules/brand-and-visual-system.md` §5. Uygulayıcı: render'ın bulunduğu makinedeki Claude (`production-engineer`) üretir; değerlendirme COO / creative director.

## 1. Örnekleme
- Kapsam: prototype'ta tamamı; full videoda **ilk yarı**.
- 8–10 ayrı ~3 sn'lik örnek; eşit aralık + her biri farklı beat'e düşecek şekilde kaydırılır (aynı sahneden iki örnek yok). Seçim zamanları rapora yazılır.
- Her örnekten başlangıç / orta / son kare → grid (satır = örnek, 3 sütun), sessiz. Araç: mevcut ffmpeg (Remotion içindeki) ile kare çıkarma + tek görüntüde birleştirme; yeni paket kurulmaz. Alternatif ölçüm: `intelligence/creative/research/tools/shotscan.js` mantığı (olay dağılımı, en uzun değişmeyen durum).
- Çıktı: `<video>-muted-preview-grid.png` (render klasörü) + rapor bölümü.

## 2. Muted sorular (her örnek + bütün grid)
1. Sessizken ilgi çekiyor mu? (hareket/nesne/kanıt/çatışma sinyali var mı)
1b. Premium görünüyor mu? (jenerik faceless-AI / kurumsal şablon / koyu-mavi PowerPoint hissi yok)
1c. Founder-approved yönün endüstriyel ağırlığı ve mühendislik hissi var mı? (`intelligence/creative/brand/reference/founder-approved-visual-direction.md`, D-033)
2. Örnekler aynı kanala ait hissettiriyor mu? (Case UI, tipografi, annotation dili)
3. Aynı template'in tekrarı gibi mi?
4. Örneklerin her biri yalnız koyu kart + metin mi?
5. Archive / Evidence / Engineering dünyaları dengeli mi? (anlatı gerektirmiyorsa birinin hiç görünmemesi sorun değil; tek dünyaya çökme sorun)
6. Rastgele bir örnekten konu veya merak sinyali geliyor mu?
**FAIL (= REVISE):** ilk yarının önemli bölümü yalnız "koyu zemin + küçük metin" görünüyorsa, ya da 3–4 örnek ayırt edilemeyecek kadar aynıysa. Keyfi yüzde eşiği yok; gerekçe örnek numarasıyla yazılır.

## 3. Brand diversity QA (otomatik kontrol listesi)
- Aynı tam ekran arka plan modu gereksiz tekrar ediyor mu?
- Aynı fotoğraf işlemi arka arkaya mı?
- Aynı geçiş gereksiz tekrar ediyor mu?
- Kaynak görseller marka tintiyle öldürülmüş mü? (Archive World doğal mı)
- Archive / Evidence / Engineering gerçekten ayrışıyor mu?
- Case Accent yalnız accent mi (zemin/filtre değil)? Amber tek odak mı?
- Görseller semantic progression sağlıyor mu? (doctrine §4; değişmeyen anlam ≤ ~6 sn, bilinçli sessizlik hariç)
- EVIDENCE etiketleri ledger'la eşleşiyor mu; AI görseller etiketli mi?

## 4. Sonuç
- **PASS** → Founder'a izleme dosyası + tek soru (creative-standards §2). Grid Founder'a zorunlu değildir; istenirse gösterilir.
- **FAIL / REVISE** (bağlayıcı, D-032) → Founder'a gitmez; düzeltme listesi (örnek no · sorun · çözüm) production'a; tekrar gate.
- Rapor: `<video>-prototype/final-report.md` içinde "Muted Preview Gate" bölümü. Tekrarlayan REVISE nedeni → `creative-feedback-log` (SİSTEM) + ilgili skill/rule.
- Ses bu kapının dışında (UNVERIFIED — HUMAN EAR REQUIRED).
