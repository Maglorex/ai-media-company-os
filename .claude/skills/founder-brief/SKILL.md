---
name: founder-brief
description: Günlük Founder Brief'i hazırlar. Her yeni oturumun başında veya Founder durum/brief istediğinde kullan.
---

# Founder Brief

## Adımlar
1. Sırayla oku: `dashboards/company.md`, `company/goals.md`, `company/backlog.md`, `company/decision-log.md` (son 3 kayıt), `company/lessons.md` (son kayıtlar), aktif `intelligence/experiments/` dosyaları.
2. Son brief'ten bu yana değişenleri belirle (dosya değişiklikleri, tamamlanan işler, yeni veri).
3. Backlog'dan en yüksek değerli sonraki işi seç: etki × öğrenme değeri ÷ efor, kısıtlar içinde.
4. Aşağıdaki formatta yaz.

## Format (≤10 satır, sade Türkçe; iç adlar yok)
```
**Founder Brief — YYYY-MM-DD**
İlerleme: [aktif kilometre taşı] — [durum, ör. 2/4 adım]
Dün/son oturumdan beri: [1–2 madde]
Blokaj: [varsa, yoksa "yok"]
Bugünkü öneri: [tek iş] — çünkü [tek cümle gerekçe]
Senden gereken: [onay/karar; yoksa "yok"]
```

## Kurallar
- **İletişim biçimi `founder-interface` skill'ine bağlıdır (yayın materyalleri hedef dilinde kalır, altına Türkçe anlamı yazılır; aynı mesajda tek karar istenir):** Founder'a giden brief sade Türkçe olur; dosya yolu, commit, agent/skill adı, kod göstermez. Günlük açılışta ("Agam bugün napcaz?") brief yerine `founder-interface` §3 formatı kullanılır; bu formatın içeriği bu brief'in adımlarından çıkar.
- Tek birincil öneri; seçenek listesi verme.
- `[VERİ]/[VARSAYIM]/[TAHMİN]` etiketlerini brief'te kullanma; yalnızca bir belirsizlik kararı gerçekten etkiliyorsa tek cümleyle belirt.
- Dosyalardan çıkarılabilecek bilgiyi Founder'a sorma.
- Onay gerektirmeyen önerilen işe, Founder aksini söylemezse başla.
