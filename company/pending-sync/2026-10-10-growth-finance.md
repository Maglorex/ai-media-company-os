# Bekleyen Merkezi Kayıtlar — Growth ve Finance sistemleri (2026-10-10)

> Neden ayrı dosya: Bu iş operasyon bilgisayarında, production bilgisayarı P3 üzerinde paralel çalışırken yapıldı. Çakışmayı önlemek için ortak dosyalar (`company/decision-log.md`, `company/backlog.md`, `dashboards/company.md`) bu oturumda düzenlenmedi.
> Uygulama: İki makinenin değişiklikleri GitHub'da birleştikten sonraki ilk oturumda aşağıdaki kayıtlar işlenir ve bu dosyanın durumu "İşlendi" yapılır (silinmez).
> Durum: **Bekliyor**

## decision-log.md — sıradaki D numarası
```
### D-0XX — Growth / Content Intelligence ve Finance / CFO sistemleri kuruldu
- Tarih: 2026-10-10
- Karar veren: Founder (talimat) · Hazırlayan: COO
- Karar: (1) `intelligence/growth/` — fikir portföyü, yatırım puanı, yayın öncesi kilitli tahmin ile yayın sonrası sonuç ayrımı, kanıt hiyerarşisi (kendi kanal verisi > deneyler > niş karşılaştırmaları > genel kurallar), kalibrasyon; skill'ler `growth-idea-scoring`, `growth-performance-review`. (2) `finance/` — tahmin/gerçek ayrı CSV ledger'lar, ölçülen kullanım, video başına doğrudan + dağıtılmış maliyet, P&L, nakit akışı, break-even, geri dönüş; Tax Watch (resmî kaynakla doğrulama, muhasebeci soru listesi); agent `finance-controller`, skill'ler `cfo-review`, `tax-watch`. Tetikler `founder-brief`'e bağlandı.
- Gerekçe: Kaynakların büyüme ihtimali yüksek fikirlere ayrılması ve gerçek video ekonomisinin bilinmesi; vergi takibinin Founder'ın hafızasına bırakılmaması.
- Geri dönüş koşulu: İlk 5 yayından sonra puan ağırlıkları ve maliyet dağıtım kuralı kendi verimizle gözden geçirilir.
- Durum: Aktif.
```

## backlog.md
- [x] 2026-10-10 — Growth / Content Intelligence v1.0 ve Finance / CFO v1.0 + Tax Watch kuruldu (D-0XX).
- [ ] İlk aylık kapanış (Ekim 2026): Claude, ChatGPT, ElevenLabs, Adobe son fatura tutarları Founder'dan tek liste ile; birim kredi değeri.
- [ ] P3 (VID-001) yayından önce: geriye dönük yatırım puanı + kilitli tahmin (FC-001) + maliyet tahmini; production'ın ölçtüğü ses kredisi ve süreler finans ledger'ına aktarılacak.
- [ ] Tax Watch: TW-R1 (2026 eşiği) ve TW-R2 (stopaj oranı) resmî metinden doğrulanacak (sonraki kontrol 2026-11-01).
- [ ] Muhasebeci görüşmesi (Q-01…Q-05) — monetizasyondan önce.

## dashboards/company.md — Finans bölümüne
- Finans sistemi kuruldu; ilk aylık kapanış Kasım'ın ilk haftası. Vergi: henüz gelir yok, eşik takibi aktif (2026 eşiği resmî doğrulama bekliyor).
