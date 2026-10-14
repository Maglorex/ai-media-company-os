# Şirket Hafızası Kuralları

> Katman: **L1** (şirket prosedürü; D-004, D-042) · "Silme yok" ve kayıt bütünlüğü **HARD** (evidence integrity) · `.claude/rules/governance.md` §6–§7.

Şirket bilgisi sohbette değil, dosyalarda yaşar. Bir sonraki oturum yalnızca dosyaları okuyarak devam edebilmelidir.

## Nereye ne yazılır
| Bilgi | Dosya |
|---|---|
| Önemli karar (tarih; append-only) | `company/decision-log.md` (D-XXX) |
| Yürürlükteki kararlar (çalışma görünümü) | `company/state/active-decisions.md` |
| Kural dosyalarının katman/sınıfı | `company/state/rule-registry.md` |
| Artifact statüsü (ACTIVE/DRAFT/FROZEN/SUPERSEDED/HISTORICAL/REJECTED) | `company/state/artifact-registry.csv` |
| Kalıcı öğrenim | `company/lessons.md` (L-XXX) |
| Geçerli strateji, stratejik varsayımlar | `company/strategy.md` |
| Kısıtlar ve başlangıç koşulları | `company/constraints.md` |
| Hedefler / kilometre taşları | `company/goals.md` |
| Yapılacak işler | `company/backlog.md` |
| Güncel durum (**tek kaynak**) | `company/state/current-state.md` (`dashboards/company.md` 2026-10-14'ten beri SUPERSEDED, tarihsel) |
| Araştırma | `intelligence/market-research/`, `intelligence/platform-updates/` |
| Deneyler | `intelligence/experiments/EXP-XXX-ad.md` |
| Kanal özel bilgi | `channels/<kanal>/` |
| Fikir portföyü, yayın öncesi tahmin, yayın sonrası sonuç | `intelligence/growth/` (I-, FC-, VID-, OL-, PT-) |
| Yaratıcı yön: stil benchmark'ı, Founder yaratıcı geri bildirimi | `intelligence/creative/` (CF-) |
| Gider, gelir, kullanım, süre, P&L, vergi takibi | `finance/` (ledger CSV'leri tek doğruluk kaynağı) |

## Kurallar
- **Silme yok:** Karar, öğrenim ve deney kayıtları silinmez. Geçersiz kalan kayıt yeni kayıtla işaretlenir ("Geri alındı → D-YYY").
- **Başarısız deneyler** kalır; neden başarısız olduğu yazılır.
- **Strateji değişikliği** yalnızca kanıtla ve Founder onayıyla; `strategy.md` değişiklik geçmişine işlenir.
- **Öğrenim → strateji:** Birden fazla kanıtla tekrar doğrulanan öğrenim, `strategy.md`'ye taşınmak üzere Founder'a önerilir.
- **Numaralandırma:** D-, L-, EXP-, H-, G-, I-, FC-, VID-, OL-, PT-, CF- numaraları sıralı ve tekrarsızdır.
- **Tarih formatı:** YYYY-MM-DD.
- **Tek doğruluk kaynağı:** Aynı bilgi birden fazla dosyada çoğaltılmaz; diğer dosyalar referans verir.
- **Karar iki yere, iki rolle:** yeni D- kararı `decision-log.md`'ye eklenir (tarih) **ve** aynı turda `active-decisions.md` güncellenir (yürürlük: tür, kapsam, sınıf, katman, durum, sınır). Önceki kararın daraltılması `LIMITED` + sınır notuyla; tamamen geçersizliği "Aktif olmayan" bölümüne taşıma ile gösterilir. `decision-log.md`'deki eski metinler yeniden yazılmaz.
- **Artifact yaşam döngüsü:** case/kanal yaratıcı dosyası oluşturulduğunda veya yeni sürümü yazıldığında `artifact-registry.csv` aynı turda güncellenir (eskisi `SUPERSEDED` + `superseded_by`). Yalnız `ACTIVE` artifact talimat olarak kullanılır (governance §6).
- **Katman korunur:** case gözlemi/öğrenimi kendi katmanında kaydedilir; kanal veya şirket kuralına yükselmesi hedef katmanda açık Founder kararı ister (governance §3).

## Formatlar
Karar ve öğrenim formatları ilgili dosyaların başında tanımlıdır; deney formatı `intelligence/experiments/README.md`'dedir.
