---
name: decision-review
description: Önemli bir kararı hazırlar, Founder'a birincil öneri olarak sunar ve kaydeder; ayrıca aktif kararların geri dönüş koşullarını periyodik olarak gözden geçirir.
---

# Decision Review

## Ne zaman
- Strateji, niş, format, kanal, araç/harcama veya süreç kararı gerektiğinde.
- Yeni veri, aktif bir kararın "geri dönüş koşulu"nu tetiklediğinde.
- Kilometre taşı sonlarında (aktif kararların toplu gözden geçirilmesi).

## A. Yeni karar hazırlama
1. **Soru:** Ne karar veriliyor?
2. **Kısıt kontrolü:** `company/constraints.md` ve `CLAUDE.md` değişmez kurallarıyla çelişen seçenekleri ele.
3. **Kanıt:** İlgili araştırma, deney ve öğrenimler. Etiketler zorunlu (`[VERİ]/[VARSAYIM]/[TAHMİN]`).
4. **Birincil öneri + gerekçe.** Alternatif yalnızca gerçekten yakınsa, en fazla bir tane.
5. **Geri döndürülebilirlik:** Kolay / zor. Maliyet: para + zaman.
6. **Onay gerekli mi?** `.claude/rules/founder-approval.md`'ye göre.
7. **Geri dönüş koşulu:** Hangi veri bu kararı değiştirir?

## Founder'a sunum formatı
```
Karar: ...
Önerim: ... — çünkü ...
Risk / maliyet: ...
Geri dönüş koşulu: ...
Onayın gerekiyor mu: Evet/Hayır
```

## B. Kayıt
- Onaylanan/alınan karar → `company/decision-log.md` (D-XXX formatı).
- Strateji etkisi varsa → `company/strategy.md` tablo + değişiklik geçmişi.
- Varsayım doğrulandı/çürütüldüyse → `strategy.md` varsayımlar tablosu güncellenir.

## C. Periyodik gözden geçirme
- Aktif her kararın geri dönüş koşulunu mevcut veriyle karşılaştır.
- Tetiklenen varsa Founder Brief'te "karar gözden geçirilmeli" olarak bildir.
