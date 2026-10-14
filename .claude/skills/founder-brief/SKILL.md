---
name: founder-brief
description: Günlük Founder Brief'i hazırlar. Her yeni oturumun başında veya Founder durum/brief istediğinde kullan.
---

# Founder Brief

## Adımlar
1. Sırayla oku: `company/state/current-state.md` (tek güncel durum; "Bugün sıradaki iş" ve bekleyen Founder kararları), `company/state/active-decisions.md` (yürürlükteki kararlar), `company/goals.md`, `company/backlog.md` (iş listesi), `company/decision-log.md` (son 3 kayıt), `company/lessons.md` (son kayıtlar), aktif `intelligence/experiments/` dosyaları. `dashboards/company.md` SUPERSEDED'dir, okunmaz. Durum dosyaları çelişirse `current-state.md` kazanır; çelişkiyi aynı turda düzelt (`session-close` §2).
1a. **Öncelik ve artifact kuralı:** öneri seçerken `.claude/rules/governance.md` önceliği uygulanır; yalnız `artifact-registry.csv`'de `ACTIVE` olan artifact talimat olarak kullanılır. Durdurulmuş case (current-state "DURUYOR") için iş önerilmez.
2. **Süreli fırsatlar:** açık `intelligence/experiments/` fırsat kayıtlarını (ör. EXP-002 ElevenLabs kampanyası) bitiş tarihine göre kontrol et; şartları karşılayan iş varsa Founder'a sade dille tek öneri olarak getir ("Agam, kampanya bitmeden seslendirmeye hazır X kilitli senaryomuz var; şimdi üretirsek yaklaşık şu avantaj var."). Founder'dan tarih takibi bekleme.
2a. **Bekleyen merkezi kayıtlar:** `company/pending-sync/` altında durumu "Bekliyor" olan dosya varsa ve diğer makinenin değişiklikleri birleşmişse, kayıtları ilgili dosyalara işle ve durumu "İşlendi" yap.
2b. **Para, vergi ve büyüme takvimi (Founder'dan hatırlamasını bekleme):**
   - Vergi: `finance/tax-watch/thresholds.csv` → `next_check` geçtiyse veya `finance/tax-watch/README.md` §3'teki bir tetik oluştuysa `tax-watch` skill'ini çalıştır; bildirim varsa brief'e tek cümle.
   - Aylık kapanış: ayın ilk haftasıysa ve `finance/pnl/` altında geçen ayın dosyası yoksa `cfo-review` §B'yi bugünkü arka plan işine ekle.
   - Yayın sonrası: yayınlı videolardan 48 saat / 7 gün / 28 gün / 90 gün noktasına gelen varsa (`intelligence/growth/results/`) `growth-performance-review`; Founder'dan Studio verisi gerekiyorsa "Senden gereken"e tek adım olarak yaz.
   - Yayın öncesi: yayına hazırlanan video için kilitli tahmin (`intelligence/growth/forecasts/`) yoksa önce o hazırlanır; Launch Package + `pre-publish-qa` durumu (D-035).
   - Kanal yetenekleri: `intelligence/growth/launch-os/capabilities.md`'de PENDING bir yetenek açıldıysa (ör. advanced features → native A/B) Founder'a **bir kez** tek cümle hatırlat.
2c. **Video üretim aşaması (D-025):** üretimdeki video için sıradaki kapıyı belirle: packaging → kanıt kaydı → creative treatment → taslak anlatı → [prototype yalnız kullanılacaksa (D-043): prototype handoff → prototype (production PC) → Founder prototype kapısı] → senaryo kilidi + tam plan → full handoff → bağımsız creative QA → Founder final yaratıcı kapısı → Launch Package → `pre-publish-qa` → launch onayı. Eksik kapı varsa bugünkü iş odur; prototype kullanılan videoda kapı geçilmeden full production önerilmez. Kanal işi önce kanal canon'unu okur (`channels/the-industrial-casebook/canon/README.md`).
3. Son brief'ten bu yana değişenleri belirle (dosya değişiklikleri, tamamlanan işler, yeni veri).
4. Sonraki işi seç: önce `current-state.md` "Bugün sıradaki iş"; o boşsa backlog'dan en yüksek değerli iş (etki × öğrenme değeri ÷ efor, kısıtlar ve aktif kararlar içinde). Seçilen işin modu yazılır (AUTONOMOUS / GUIDED ACTION / FOUNDER DECISION / BLOCKED_BY_CANONICAL_GAP).
5. Aşağıdaki formatta yaz.

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
