# Kanıt ve Araştırma Kuralları

> Katman: **L0 — HARD** (truth, evidence integrity) · Kapsam: company · `.claude/rules/governance.md`. Bölüm etiketleri: "Temel ilke" ve "Kaynak standartları" ile "ChatGPT çıktıları"nın doğrulama maddeleri **[HARD]**; etiketlerin nerede kullanılacağı ve rapor yapısı **[HEURISTIC]** (biçim).
> Şirket geneli HARD çekirdek (`company/charter.md` §3): **Source establishes truth** · AI tarihî kanıt değildir · bilinmeyen tarihî ayrıntı kesin gibi uydurulmaz · Evidence ve Presentation ayrı kararlardır.

## Kanıt etiketleri [HEURISTIC — biçim]
`[VERİ]` (kaynaklı, doğrulanmış) · `[VARSAYIM]` (doğrulanmamış kabul) · `[TAHMİN]` (projeksiyon / kestirim)

**Kullanılır:**
- Araştırma raporlarında (`intelligence/` altındaki tüm raporlar).
- Önemli stratejik kararlarda (`decision-review`, `decision-log.md`, `strategy.md`).
- Belirsizliğin kararı önemli ölçüde etkilediği yerlerde.

**Kullanılmaz:**
- Günlük Founder Brief'te ve normal iletişimde. Orada sade dil kullanılır; bir belirsizlik önemliyse tek cümleyle açıkça söylenir.

## Temel ilke [HARD]
- Varsayımı veri gibi sunma. Doğrulanmamış bilgiyle verilen kararın geri dönüş koşulu yazılır.
- Ekranda veya VO'da tırnak içinde kullanılacak ifade kaynağın sayfa görüntüsünden doğrulanır; metin çıkarımı (OCR/PDF text) alıntı kanıtı değildir (L-005).

## Kaynak standartları [HARD]
- Her önemli iddia: kaynak linki + yayın/erişim tarihi.
- Birincil kaynak tercih edilir (resmi YouTube blog/yardım, resmi dokümanlar, doğrudan veri).
- Platform politikası konularında yalnızca resmi kaynak `[VERİ]` sayılır; üçüncü taraf yorumları `[VARSAYIM]`dır.
- Eski veri (12 aydan eski) ve tek kaynaklı iddialar belirtilir.

## ChatGPT ve dış AI çıktıları [HARD: doğrulama maddeleri]
- ChatGPT; dış araştırma, ikinci görüş, fact checking, güncel web araştırması ve uzman analiz kaynağıdır.
- Founder'a yalnızca "ChatGPT'ye sor" denmez; `research-request` skill'i ile hazır prompt verilir.
- ChatGPT çıktısı, kaynakları kontrol edilene kadar `[VARSAYIM]` kabul edilir.
- Claude ve ChatGPT bulguları çelişirse çelişki raporda açıkça yazılır.

## Rapor yapısı [HEURISTIC]
Özet (≤5 madde) · Bulgular (etiketli, kaynaklı) · Belirsizlikler · Şirket için anlamı · Birincil öneri
