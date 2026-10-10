# P3 — Bekleyen kararlar ve öğrenimler (ortak dosyalara aktarılacak)

> Oluşturma: 2026-10-10, render bilgisayarı (DESKTOP-KVLH9B2). **Neden burada:** Laptop'ta paralel Growth/CFO değişiklikleri var ve bu makineden `git fetch` yapılamadı (GitHub kimlik bilgisi yalnız GitHub Desktop'ta). Founder talimatı: ortak Company OS dosyalarında çakışma yaratacak değişiklik yapılmaz. Bu yüzden aşağıdaki kayıtlar `company/decision-log.md` ve `company/lessons.md` yerine geçici olarak burada.
> **Aktarım:** Laptop değişiklikleri bu makineye çekildikten sonra (GitHub Desktop → Fetch/Pull) kayıtlar sıradaki boş D-/L- numaralarıyla ortak dosyalara aktarılır; P3 dosyalarındaki "D-018"/"D-019" atıfları gerekirse yeni numaralarla güncellenir. Bu dosya o zaman "Aktarıldı → D-XXX" notuyla kapatılır (silinmez).
> Numaralar **geçicidir**.
> **Durum: Aktarıldı (2026-10-10, laptop, birleşme sonrası)** → D-018, D-019 (numaralar korundu; çakışma yoktu), öğrenim → L-005, backlog ve dashboard satırları işlendi. Growth/Finance kararı D-020 oldu.

## Kararlar
### D-018 — P3 "lone ship" anlatımında kapasite: yalnız GAO'nun "several" ifadesi
- Tarih: 2026-10-10
- Karar veren: Founder (COO önerisi)
- Karar: Lone ship animasyonunda ve ana görsel anlatımda kesin gemi sayısı verilmez; kapasite yalnız GAO'nun "several" ifadesiyle gösterilir. "Facility could easily service 10" (Maritime/Todd yetkililerinin görüşü, C-13) yalnız evidence ledger'da ikinci seviye bağlam olarak kalır; final videoda kesin gerçek gibi öne çıkarılmaz.
- Gerekçe: 10 sayısı GAO'nun bağımsız tespiti değil, yalnız servis tesisi için ve yetkili görüşü (C-12, C-13, D-REJ-5).
- Uygulama: `production/remotion/src/videos/p3/shots.ts` (`p3LoneShip`); edit plan S6 p2–p3 ve visual plan notları kaldırıldı. Animasyonda yalnız kara personeli + servis tesisi ölçeklenebilir gösterilir; eğitim bloğu paylaşılmaz.
- Ek (2026-10-10, Founder onayı): Kanıt disiplini düzeltmesi olarak S6 VO'dan "Maritime and contractor officials told the auditors the Galveston facility could easily service ten." cümlesi çıkarıldı → script v2.2; ledger E-10. Senaryonun başka bölümü değişmedi.
- Durum: Aktif.

### D-019 — P3 Production Autonomy Mode
- Tarih: 2026-10-10
- Karar veren: Founder
- Karar: P3 üretiminde güvenli, ücretsiz, geri alınabilir ve onaylı yaratıcı/kanıt yönünü değiştirmeyen kararlar COO tarafından onay beklemeden alınır, kayda geçirilir ve iş sürer. Kapsam: kanıtı daha doğru ifade eden küçük script düzeltmeleri, evidence ledger uyum düzeltmeleri, grafik/timeline yerleşimi, teknik bug fix, kamu malı küçük production asset'leri, onaylı araçlarla şablon üretimi, görsel doğruluk düzeltmeleri. Yalnız kanıt disiplinini artıran ve ana yaratıcı vaadi değiştirmeyen düzeltme Founder kararı sayılmaz.
- Founder'a durulacak haller: para/kredi harcama; yeni yazılım/paket kurulumu; credential/yetki; önemli title/thumbnail değişikliği; ana premise veya sonucu değiştirmek; önemli lisans/telif belirsizliği; final voice seçimi; final render/yayın kararı; yıkıcı veya zor geri alınabilir işlem. Güçlü ikinci görüş gerekirse `founder-interface` kuralıyla hazır ChatGPT promptu.
- Raporlama: her küçük adım değil; anlamlı checkpoint'te kısa Founder özeti.
- Sınır: `founder-approval.md` ve `CLAUDE.md` değişmez kuralları geçerliliğini korur (commit yerel serbest; push/remote, harcama, yayın yine onaylı).
- Durum: Aktif (P3 kapsamı).

## Önerilen öğrenim (lessons.md'ye aktarılacak)
- **Taranmış belgeden alıntı, metin çıkarımına değil sayfa görüntüsüne göre doğrulanır.** GAO B-136209 s.12'deki ''one ship system'' ifadesi daha önceki metin çıkarımında açılış tırnağı "l" okunarak "lone ship system" olmuştu; senaryo, ledger ve animasyona yayıldı (ledger E-14). Ayrıca C-31'deki ekipman özeti kaynağı kısaltmıştı (E-11). Uygulama: ekranda veya VO'da tırnak içinde kullanılacak her ifade, kaynağın sayfa görüntüsünden (`production/tools/pdf/pdf-to-png.ps1`) okunarak ledger'a yazılır.

## Atlanan session-close adımları (2026-10-10)
`company/backlog.md`, `dashboards/company.md`, `company/goals.md` güncellenmedi (ortak dosya; laptop çakışma riski). P3 güncel durumu: `P3-graphics-status.md`. Aktarım sırasında dashboard'a tek satır: "P3 grafik üretimi: S4–S7 + S5 tamam (19 kompozisyon, final render yok)".