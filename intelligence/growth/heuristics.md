# Growth Heuristics ve Yatırım Puanı

> Kanıt hiyerarşisi: K1 kendi kanal verisi > K2 kendi deneyleri > K3 niş karşılaştırmaları > K4 genel heuristics (`README.md` §1). Bu dosyadaki K4 kuralları **varsayılandır**; kendi verimiz çelişince geçersiz kılınır ve aşağıya yazılır. Silinmez.
> Sürüm: v1.0 (2026-10-10). Ağırlıklar ≥10 video 28g verisinden sonra `calibration.md`'ye göre yeniden ayarlanır.

## 1. Yatırım puanı kriterleri (her biri 1–5, gerekçe + kanıt seviyesi zorunlu)
| # | Kriter | Soru | Kanıt kaynağı | Ağırlık v1 |
|---|---|---|---|---|
| C1 | Talep | Bu konu/açı için izleyici ilgisi var mı? (arama, öneri akışı, niş outlier'ları) | K3 outliers, research-analyst, ileride K1 | 20 |
| C2 | Rekabet boşluğu | Aynı açıyı iyi işleyen video var mı? Varsa biz neyi farklı/daha iyi veriyoruz? | K3 | 10 |
| C3 | Packaging gücü | Dürüst ama merak uyandıran title+thumbnail vaadi kurulabiliyor mu? | `documentary-packaging` notu, ileride PT/CTR | 20 |
| C4 | Retention potansiyeli | Açık bir gerilim/soru, ilerleyen ödül yapısı, görsel anlatılabilirlik | `documentary-virality-gate`, ileride retention eğrileri | 20 |
| C5 | Kanıt/özgünlük | Birincil kaynak gücü, başkasının içeriğini yeniden paketleme riski yok | evidence ledger | 10 |
| C6 | Maliyet verimi | Tahmini Founder saati + doğrudan maliyet (düşük maliyet = yüksek puan) | `finance/`, time-log | 10 |
| C7 | Stratejik/öğrenme değeri | Alt konu haritasını, formatı veya abone dönüşümünü öğretiyor mu? Seri potansiyeli? | COO | 10 |

**Yatırım puanı** = Σ(puan × ağırlık) / 5 → 0–100.
**Eleme kuralı (puandan bağımsız):** C5 = 1 (kanıt zayıf veya yeniden paketleme riski) veya platform politikası riski → fikir puanlanmaz, `DO NOT PRIORITIZE`.
**Güven etiketi:** Her puanın kanıt seviyesi (K1–K4) yazılır; K4 ağırlıklı puan "Düşük güven" sayılır.

## 2. Genel heuristics (K4 — varsayılan, doğrulanmamış)
> Kaynak: genel YouTube sektör bilgisi ve Faz 1 araştırması; şirket verisi değildir. `[VARSAYIM]`
- H-G1: Long-form'da ilk 30 saniye retention'ı paket vaadinin karşılanıp karşılanmadığının en erken sinyalidir.
- H-G2: CTR tek başına başarı değildir; CTR × APV (ve izlenme süresi) birlikte okunur. Yüksek CTR + düşük APV = vaat/teslim uyumsuzluğu şüphesi.
- H-G3: Yeni kanalda ilk videoların trafiği çoğunlukla öneri/gezinti ve aramadan küçük hacimlerle gelir; ilk 28 günde mutlak izlenme değil, oranlar (CTR, APV, abone/1k izlenme) karşılaştırılır.
- H-G4: Niş içinde bir videonun kanal medyanının ≥3 katı izlenmesi (outlier) konu/açı talebinin sinyalidir; tek outlier kanıt değildir, ≥2 bağımsız kanalda tekrar sinyaldir.
- H-G5: 2027-02-01 sonrası YPP yeni başvuru eşiği izlenme saati ağırlıklıdır (strategy.md) → izlenme saati üreten uzun ve tutunan videolar, kısa vadede kısa videolardan daha değerlidir.
- H-G6: Seri/tekrarlanabilir formül, üretim maliyetini düşürür ve geri dönen izleyici oranını artırabilir.

## 3. Tahmin kuralları
- Tahmin aralıkla verilir ve kanal **baz çizgisine göre** ifade edilir ("baz çizgisinin altında / civarında / üstünde"). Kanal verisi yokken baz çizgisi = niş karşılaştırma bandı (K3), güven = Düşük.
- Mutlak sayı tahmini yalnız K1 baz çizgisi varken (≥5 video) yapılır.
- Her tahmin "Bu tahmini ne yanlışlar?" sorusuna bir cümle cevap içerir.

## 4. Kendi verimizle geçersiz kılınanlar
| Tarih | Heuristic | Kendi verimiz (VID / EXP) | Yeni kural |
|---|---|---|---|
| — | — | Henüz kanal verisi yok | — |

## 5. Değişiklik geçmişi
| Tarih | Değişiklik | Gerekçe |
|---|---|---|
| 2026-10-10 | v1.0 ilk sürüm | Growth sistemi kurulumu |
