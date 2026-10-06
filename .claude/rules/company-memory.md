# Şirket Hafızası Kuralları

Şirket bilgisi sohbette değil, dosyalarda yaşar. Bir sonraki oturum yalnızca dosyaları okuyarak devam edebilmelidir.

## Nereye ne yazılır
| Bilgi | Dosya |
|---|---|
| Önemli karar | `company/decision-log.md` (D-XXX) |
| Kalıcı öğrenim | `company/lessons.md` (L-XXX) |
| Geçerli strateji, stratejik varsayımlar | `company/strategy.md` |
| Kısıtlar ve başlangıç koşulları | `company/constraints.md` |
| Hedefler / kilometre taşları | `company/goals.md` |
| Yapılacak işler | `company/backlog.md` |
| Güncel durum | `dashboards/company.md` |
| Araştırma | `intelligence/market-research/`, `intelligence/platform-updates/` |
| Deneyler | `intelligence/experiments/EXP-XXX-ad.md` |
| Kanal özel bilgi | `channels/<kanal>/` |

## Kurallar
- **Silme yok:** Karar, öğrenim ve deney kayıtları silinmez. Geçersiz kalan kayıt yeni kayıtla işaretlenir ("Geri alındı → D-YYY").
- **Başarısız deneyler** kalır; neden başarısız olduğu yazılır.
- **Strateji değişikliği** yalnızca kanıtla ve Founder onayıyla; `strategy.md` değişiklik geçmişine işlenir.
- **Öğrenim → strateji:** Birden fazla kanıtla tekrar doğrulanan öğrenim, `strategy.md`'ye taşınmak üzere Founder'a önerilir.
- **Numaralandırma:** D-, L-, EXP-, H-, G- numaraları sıralı ve tekrarsızdır.
- **Tarih formatı:** YYYY-MM-DD.
- **Tek doğruluk kaynağı:** Aynı bilgi birden fazla dosyada çoğaltılmaz; diğer dosyalar referans verir.

## Formatlar
Karar ve öğrenim formatları ilgili dosyaların başında tanımlıdır; deney formatı `intelligence/experiments/README.md`'dedir.
