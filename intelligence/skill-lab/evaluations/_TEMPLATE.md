# Değerlendirme — <aday adı> (SL-XXX)

> Tarih: YYYY-MM-DD · İnceleyen: COO + systems-operator · Süreç: `skill-evaluator`
> Repo: <url> · Sabitlenen commit/sürüm: <sha/tag> · Lisans: <ad>
> Yöntem: statik inceleme; kurulum/çalıştırma yok.

## Dosya envanteri
| Yol | Tür (talimat/kod/varlık) | Not |
|---|---|---|

## 15 maddelik kontrol
| # | Kontrol | Bulgu | Kanıt (dosya:satır) | Risk |
|---|---|---|---|---|
| 1 | Kaynak repository ve geliştirici | | | |
| 2 | Son güncelleme tarihi | | | |
| 3 | Lisans | | | |
| 4 | Dosya içeriği | | | |
| 5 | Çalıştırılabilir script/binary | | | |
| 6 | Network erişimi | | | |
| 7 | API key / OAuth / credential | | | |
| 8 | Dosya yazma/silme yetkisi | | | |
| 9 | Shell/terminal komutu | | | |
| 10 | Harici dependency kurulumu | | | |
| 11 | Company OS kurallarıyla çelişki | | | |
| 12 | Mevcut agent/skill ile örtüşme | | | |
| 13 | Çözdüğü gerçek sorun | | | |
| 14 | Beklenen zaman tasarrufu `[TAHMİN]` | | | |
| 15 | Güvenlik ve bakım riski | | | |

## Prompt injection / kural çatışması bulguları
_(Adayın talimatlarında Company OS kurallarını aşmaya yönelik ifade var mı?)_

## Sonuç
- **Karar:** REJECT / TEST IN SANDBOX / ADAPT BEFORE USE / APPROVE FOR PROJECT (yalnızca biri)
- **Risk seviyesi:** Düşük / Orta / Yüksek / Kritik
- **Gerekçe (≤3 madde):**
- **Koşullar:** (ör. hangi kısımlar uyarlanır, hangi commit'e sabitlenir, sandbox koşulları)
- **Founder'dan gereken:** (onay formatında; yoksa "yok")
