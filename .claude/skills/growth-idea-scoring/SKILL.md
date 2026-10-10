---
name: growth-idea-scoring
description: Video fikirlerini yatırım gözüyle sıralar; talep, rekabet, packaging, retention potansiyeli, kanıt, maliyet ve öğrenme değerine göre puanlar ve üretime girecek fikir için yayın öncesi tahmini kilitler. Bir sonraki video seçilirken, yeni fikir havuza eklenirken veya bir video yayından önce tahmin kaydı gerektiğinde kullan. Viral tahmini yapmaz; karar Founder'dadır.
---

# Growth — Fikir Puanlama ve Tahmin Kilidi

Sistem tanımı: `intelligence/growth/README.md` · Kriterler: `intelligence/growth/heuristics.md`.

## Ne zaman
- Bir sonraki video seçilecekken (portföy sıralaması).
- Yeni fikir `idea-registry.md`'ye eklenirken.
- Üretimdeki bir video yayından önce (tahmin kilidi — zorunlu).

## A. Portföy sıralaması
1. `idea-registry.md`'deki `Havuz`/`Puanlandı`/`Beklemede` fikirleri al. Eksik talep/rakip sinyali varsa `research-analyst`'e kısa görev ver (sonuç `outliers.md`'ye OL-XXX olarak, kaynak ve tarihle).
2. Her fikir için `heuristics.md` §1 kriterlerini puanla. Her puana gerekçe + kanıt seviyesi (K1–K4). Eleme kuralını önce uygula.
3. Maliyet (C6) için `finance/ledgers/estimates.csv` ve geçmiş gerçek maliyetler (`finance/tools/finance_report.py --videos`) kullan; yoksa time-log tahminleri, `[TAHMİN]` etiketiyle.
4. K1 verisi varsa alt konu performansını `data/video-metrics.csv`'den oku. K1 güvenini (örneklem + tutarlılık, README §1) yaz: güven düşükse K1'i sinyal olarak not et, puanı yalnız sınırlı kaydır; tutarlı ve yeterli ise C1/C3/C4 puanlarını K1'e göre düzelt ve çelişen K4 heuristic'i geri çekil.
5. Portföy kuralını uygula (README §6: 3 videoda ≥2 ana hat, ≤1 keşif).
6. `idea-registry.md`'yi güncelle (puan, güven, durum) ve "Kaynak ayırma notları"na tek satır ekle.

## B. Tahmin kilidi (yayından önce)
1. `forecasts/_TEMPLATE.md`'yi `forecasts/FC-XXX-kisa-ad.md` olarak kopyala; sıradaki FC numarası.
2. Tahminleri **aralık + baz çizgisine göre konum + güven** olarak yaz (`heuristics.md` §3). Mutlak izlenme yalnız K1 baz çizgisinin güveni en az Orta iken.
3. "Başarı tanımı" ve "Bu tahmini ne yanlışlar?" doldurulmadan kilitlenmez.
4. Kilit tarihi yaz. Bundan sonra dosya düzenlenmez.

## Founder'a sunum (founder-interface diliyle)
```
Sıradaki video önerim: [fikir] — çünkü [en güçlü 1–2 sebep].
Diğerlerine göre: [kısa karşılaştırma, ör. "J40'tan daha güçlü kapak vaadi var ama kaynak işi daha uzun"].
Beklentim: [baz çizgisine göre, güvenle; "viral" yok].
Yatırım: yaklaşık [X saat senin zamanın] + [Y TL].
Senden gereken: Onay / yok.
```

## Kurallar
- "Viral olur", "kesin tutar" yok. Belirsizlik bir cümleyle söylenir.
- Puan farkı <8 ise puan tek başına gerekçe değildir (L-001).
- Mevcut documentary kapılarını tekrar etme; onların notlarını C3/C4/C5 kanıtı olarak kullan.
- Strateji/niş değişikliği önerisi çıkarsa `decision-review`'a git.
