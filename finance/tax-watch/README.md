# Tax Watch — Türkiye Vergi Takibi

> **Bu alan mali müşavirlik değildir.** Mevzuat sabit Company OS bilgisi sayılmaz; her kural resmî kaynakla (GİB, Resmî Gazete, mevzuat.gov.tr) doğrulanana kadar `[VARSAYIM]`dır. Kesin vergi kararı muhasebeci veya GİB teyidiyle verilir.
> Sahip: COO + `finance-controller`. Prosedür: `tax-watch` skill'i. Founder'ın "vergiye bakmayı" hatırlaması beklenmez: tetikleyiciler `founder-brief` tarafından kontrol edilir.
> Kurulum: 2026-10-10.

## 1. Ne izleniyor
| Alan | Nereden | Not |
|---|---|---|
| Gelir türleri | `ledgers/revenue.csv` → `source` | AdSense, sponsor, affiliate, üyelik, diğer — her türün hangi rejime girdiği ayrı teyit konusudur |
| Yıllık toplam hasılat | `revenue.csv` → `received_date` yılı, `gross_try` | Resmî metin eşiği "istisna kapsamındaki **kazançlar** toplamı" olarak tanımlar; tevkifat ise **hasılat** üzerindendir. Takip muhafazakâr olarak brüt tahsilatla yapılır; kazancın nasıl hesaplanacağı muhasebeci sorusu (Q-02) |
| Rejim eşikleri | `thresholds.csv` | Yıl, tutar, durum (`verified`/`to_verify`), kaynak, kontrol tarihi |
| Banka/hesap şartı | `revenue.csv` → `dedicated_account` | Özel hesap dışı tahsilat istisnayı riske atabilir [VARSAYIM] |
| Stopaj | `revenue.csv` → `bank_withholding_try`, `us_withholding` | Banka stopajı (TR) ve YouTube/Google ABD stopajı (AdSense vergi bilgileri) ayrı |
| Eşiğe yaklaşma | `finance_report.py --tax YYYY` | Uyarı seviyeleri: %50 · %75 · %90 · %100 |

## 2. Kural kaydı (doğrulama durumu)
| # | Kural (özet) | Durum | Kaynak | Son kontrol |
|---|---|---|---|---|
| TW-R1 | GVK mükerrer 20/B: istisna için Türkiye'de kurulu bir bankada hesap açılması ve faaliyete ilişkin **tüm hasılatın bu hesap aracılığıyla** tahsili gerekir. İstisna kapsamındaki **kazançlar toplamı** GVK 103'teki 4. dilim tutarını aşarsa yıllık beyanname verilir. **2026 tutarı: 5.300.000 TL** (2025: 4.300.000 TL) | **verified** | [GİB Ticari Kazanç Vergi Rehberi 2026, §3.7, s.22–23](https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Ffileadmin%2Fbeyannamerehberi%2F2026%2FTicari_Kazanc_2026.pdf) — sayfa görüntüsünden okundu | 2026-10-10 |
| TW-R2 | Bankalar bu hesaplara aktarılan **hasılat** üzerinden, aktarım tarihi itibarıyla **%15** gelir vergisi tevkifatı yapar ve muhtasar ile beyan eder; bu tutar üzerinden 94. madde kapsamında ayrıca tevkifat yapılmaz. Diğer faaliyetlerden gelir olması istisnaya engel değildir | **verified** | [GİB Ticari Kazanç Vergi Rehberi 2026, §3.7, s.22–23](https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Ffileadmin%2Fbeyannamerehberi%2F2026%2FTicari_Kazanc_2026.pdf) — sayfa görüntüsünden okundu | 2026-10-10 |
| TW-R3 | Eşik aşılırsa söz konusu kazançlar için yıllık beyanname verilir; tevkif edilen vergiler beyanname üzerinden hesaplanan vergiden mahsup edilebilir. Şartlar taşınmazsa eksik vergi, vergi ziyaı cezası ve gecikme faiziyle tahsil edilir | **verified** | [GİB Ticari Kazanç Vergi Rehberi 2026, §3.7, s.22–23](https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Ffileadmin%2Fbeyannamerehberi%2F2026%2FTicari_Kazanc_2026.pdf) — sayfa görüntüsünden okundu. Ayrıntı: 318 Seri No.lu GVGT | 2026-10-10 |
| TW-R4 | İstisna yalnız gerçek kişilere; şirket (Ltd/AŞ) yararlanamaz | to_verify | İkincil kaynaklar | 2026-10-10 |
| TW-R5 | Kapsam: reklam, sponsorluk, bağış, abonelik gelirleri sayılıyor; affiliate'in durumu belirsiz | to_verify (kısmen) | Resmî rehber kapsamı 'metin, görüntü, ses, video gibi içerik paylaşan sosyal içerik üreticilerinin kazançları' ve 'ürün tanıtımı gibi hizmetler' olarak tanımlıyor ({G}); sponsor/affiliate'in bu tanıma girip girmediği muhasebeci sorusu (Q-03) | 2026-10-10 |
| TW-R6 | KDV: 20/B kapsamındaki hizmetler KDV'den istisna (KDVK 17/4-a) | to_verify | İkincil: alomaliye.com (2026-10-02) | 2026-10-10 |
| TW-R7 | ABD stopajı: AdSense/YouTube ABD izleyici geliri için vergi formu (W-8BEN) ve TR–ABD anlaşma oranı | to_verify | Kaynak taranmadı; kanal açılınca AdSense vergi bilgileri ekranından okunacak | — |

**Doğrulama 2026-10-10:** TW-R1, TW-R2, TW-R3 GİB'in resmî 2026 rehberinden doğrulandı; `thresholds.csv`'ye `verified` satırı eklendi (önceki `to_verify` satırı geçmiş olarak duruyor). İkincil kaynak linkleri yalnız tarihçe içindir.

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
