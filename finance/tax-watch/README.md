# Tax Watch — Türkiye Vergi Takibi

> **Bu alan mali müşavirlik değildir.** Mevzuat sabit Company OS bilgisi sayılmaz; her kural resmî kaynakla (GİB, Resmî Gazete, mevzuat.gov.tr) doğrulanana kadar `[VARSAYIM]`dır. Kesin vergi kararı muhasebeci veya GİB teyidiyle verilir.
> Sahip: COO + `finance-controller`. Prosedür: `tax-watch` skill'i. Founder'ın "vergiye bakmayı" hatırlaması beklenmez: tetikleyiciler `founder-brief` tarafından kontrol edilir.
> Kurulum: 2026-10-10.

## 1. Ne izleniyor
| Alan | Nereden | Not |
|---|---|---|
| Gelir türleri | `ledgers/revenue.csv` → `source` | AdSense, sponsor, affiliate, üyelik, diğer — her türün hangi rejime girdiği ayrı teyit konusudur |
| Yıllık toplam hasılat | `revenue.csv` → `received_date` yılı, `gross_try` | Muhafazakâr taban: brüt tahsilat. Eşik hesabının "hasılat" mı "kazanç" mı olduğu muhasebeci sorusu (Q-02) |
| Rejim eşikleri | `thresholds.csv` | Yıl, tutar, durum (`verified`/`to_verify`), kaynak, kontrol tarihi |
| Banka/hesap şartı | `revenue.csv` → `dedicated_account` | Özel hesap dışı tahsilat istisnayı riske atabilir [VARSAYIM] |
| Stopaj | `revenue.csv` → `bank_withholding_try`, `us_withholding` | Banka stopajı (TR) ve YouTube/Google ABD stopajı (AdSense vergi bilgileri) ayrı |
| Eşiğe yaklaşma | `finance_report.py --tax YYYY` | Uyarı seviyeleri: %50 · %75 · %90 · %100 |

## 2. Kural kaydı (doğrulama durumu)
| # | Kural (özet) | Durum | Kaynak | Son kontrol |
|---|---|---|---|---|
| TW-R1 | GVK mükerrer 20/B: sosyal içerik üreticiliği kazancı, tahsilat bu faaliyete özel banka hesabından yapılırsa ve yıllık tutar GVK 103'teki 4. dilim tutarını aşmazsa gelir vergisinden istisna; banka stopajı nihai vergi. 2026 tutarı ikincil kaynaklarda **5.300.000 TL** | **to_verify** — tutar ikincil kaynaklı; resmî tebliğ metni okunmadı | İkincil: [fatiharas.com](https://www.fatiharas.com/sosyal-icerik-ureticileri-ve-mobil-uygulama-gelistiricileri-vergi-istisnasi-2024/), [alomaliye.com](https://www.alomaliye.com/2026/10/02/sosyal-icerik-ureticiliginde-kdv-uygulamasi/) (2026-10-10 erişim); dayanak gösterilen: 332 Seri No.lu GVGT (RG 2025-12-31) | 2026-10-10 |
| TW-R2 | Banka kesintisi (stopaj) oranı %15 | to_verify | GİB sosyal içerik broşürü (arşiv): [gib.gov.tr PDF](https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fonceki-dokumanlar%2F2024_sosyal_icerik.pdf) — 2024 tarihli; güncelliği teyit edilecek | 2026-10-10 |
| TW-R3 | Eşik aşılırsa o yılın kazancının tamamı yıllık beyanname ile beyan edilir | to_verify | GİB özelgesi (Şubat 2026, arama özeti): [gib.gov.tr/…/ozelge/38897](https://www.gib.gov.tr/mevzuat/kanun/433/ozelge/38897) — tam metin okunmadı | 2026-10-10 |
| TW-R4 | İstisna yalnız gerçek kişilere; şirket (Ltd/AŞ) yararlanamaz | to_verify | İkincil kaynaklar | 2026-10-10 |
| TW-R5 | Kapsam: reklam, sponsorluk, bağış, abonelik gelirleri sayılıyor; affiliate'in durumu belirsiz | to_verify | İkincil kaynaklar; affiliate için kaynak yok | 2026-10-10 |
| TW-R6 | KDV: 20/B kapsamındaki hizmetler KDV'den istisna (KDVK 17/4-a) | to_verify | İkincil: alomaliye.com (2026-10-02) | 2026-10-10 |
| TW-R7 | ABD stopajı: AdSense/YouTube ABD izleyici geliri için vergi formu (W-8BEN) ve TR–ABD anlaşma oranı | to_verify | Kaynak taranmadı; kanal açılınca AdSense vergi bilgileri ekranından okunacak | — |

Resmî kaynağı okununca durum `verified` olur, kaynak satırı resmî linkle değişir, `thresholds.csv` güncellenir. Eski değer silinmez; tabloya yeni satır eklenir.

## 3. Tetikleyiciler (Founder hatırlamak zorunda değil)
`founder-brief` her oturumda kontrol eder; tetik varsa brief'e **tek cümle** girer:
1. **Takvim:** `thresholds.csv` → `next_check` tarihi geçti. Varsayılan: her ay 1'i; ayrıca her yıl **Aralık sonu – Ocak başı** (yeni yıl tutarları Resmî Gazete'de yayımlanır) zorunlu kontrol.
2. **İlk gelir:** `revenue.csv`'ye ilk gerçek gelir satırı girdi → muhasebeci görüşmesi önerisi (§5) ve özel hesap şartı kontrolü.
3. **Eşik:** yıllık brüt tahsilat eşiğin %50 / %75 / %90'ına ulaştı.
4. **Hesap:** özel hesap dışına gelir girdi (`dedicated_account` ≠ yes).
5. **Yeni gelir türü:** daha önce görülmemiş `source` (ör. ilk sponsor/affiliate).
6. **YPP başvurusu / monetizasyon açılışı:** gelir başlamadan önce kurulum soruları (§5).

## 4. Founder'a bildirim biçimi
```
Vergi notu: [ne oldu, tek cümle].
Neden önemli: [tek cümle, sade].
Önerim: [tek adım — ör. "Bu soruyu muhasebeciye sor" + hazır soru metni].
Bu kesin vergi tavsiyesi değil; [muhasebeci / GİB] teyidi gerekiyor.
```

## 5. Muhasebeci / GİB soru listesi
`accountant-questions.md` — açık sorular burada birikir; Founder görüşmeye tek liste ile gider.
