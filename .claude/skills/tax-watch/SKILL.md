---
name: tax-watch
description: Türkiye vergi tarafını izler — gelir türleri, yıllık hasılat, sosyal içerik üreticiliği istisnası gibi rejim eşikleri, özel banka hesabı şartı, stopajlar ve eşiğe yaklaşma; kuralları güncel resmî GİB/Resmî Gazete kaynaklarından doğrular ve muhasebeci teyidi gereken noktayı Founder'a sade dille bildirir. Aylık kapanışta, founder-brief tetik bulduğunda, ilk gelirde, yeni gelir türünde veya yıl başında kullan. Mali müşavirlik yapmaz.
---

# Tax Watch

Sistem: `finance/tax-watch/README.md` · Eşikler: `finance/tax-watch/thresholds.csv` · Sorular: `finance/tax-watch/accountant-questions.md`.

## Adımlar
1. **Tetik kontrolü** (README §3): takvim (`next_check`), ilk gelir, eşik %50/75/90/100, özel hesap dışı tahsilat, yeni gelir türü, monetizasyon açılışı.
2. **Hesap:** `python finance/tools/finance_report.py --tax YYYY` → yıllık brüt tahsilat, kaynak dağılımı, eşik oranı, hesap uyarıları.
3. **Kural doğrulama** (takvim tetiğinde veya kural `to_verify` iken önemli bir karar yaklaşıyorsa):
   - Yalnız resmî kaynak `verified` sayılır: gib.gov.tr (tebliğ, özelge, rehber), resmigazete.gov.tr, mevzuat.gov.tr. İkincil site/forum/ChatGPT `[VARSAYIM]`.
   - Gerekirse `research-request` ile `research-analyst`'e görev ver (kaynak linki + erişim tarihi zorunlu).
   - Değişen değer: README kural kaydına yeni satır/sürüm, `thresholds.csv` yeni satır; eski değer silinmez.
   - Yıl başı: yeni yılın dilim tutarı Resmî Gazete'de yayımlanınca yeni yıl satırı eklenir.
4. **Soru listesi:** cevapsız ve zamanı gelmiş muhasebeci sorularını belirle (`accountant-questions.md` → "Ne zaman gerekli").
5. **Bildirim:** tetik varsa README §4 biçimiyle tek bildirim; yoksa sessiz geç (brief'e "vergi: sorun yok" bile yazılmaz, yalnız aylık özette tek satır).
6. `thresholds.csv` → `checked_on` ve `next_check` güncelle (varsayılan: bir sonraki ayın 1'i; Aralık'ta 1 Ocak'tan sonraki ilk çalışma günü).

## Kurallar
- Kesin hüküm yok: "kesin vergiden muafsın" / "beyanname vermene gerek yok" denmez. Doğru dil: "Resmî kaynağa göre kural şu; senin durumuna uygulanması muhasebeci teyidi istiyor."
- Kişisel vergi numarası, T.C. kimlik, IBAN, banka hesap bilgisi repoya ve sohbete yazılmaz.
- e-Devlet/GİB işlemi, banka hesabı açma, belge başvurusu Founder'ın kendi işlemidir; COO adımları sade yazar, işlemi yapmaz.
- Şirketleşme veya rejim değişikliği önerisi stratejik karardır → `decision-review` + Founder onayı.
