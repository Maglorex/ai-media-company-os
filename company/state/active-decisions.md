# Active Decisions — yürürlükteki kararların çalışma görünümü

> Tarih kaydı değil, **çalışma görünümü**dür. Kararların tam metni ve geçmişi: `company/decision-log.md` (append-only; silinmez, yeniden yazılmaz).
> Katman/sınıf/kapsam: `.claude/rules/governance.md` §1–§3, `os/precedence.json`. "Katman" sütunu türetmeyle aynı olmak zorundadır (test). Sınıf boşsa (`—`) kayıt, katmanında bağlayıcı bir Founder/şirket kararıdır.
> Durum: `ACTIVE` (aynen geçerli) · `LIMITED` (geçerli; "Sınır" sütunundaki kısım uygulanmaz veya sonraki kayıtla daraltıldı).
> Güncelleme: yeni D- kararı alındığı turda burası da güncellenir (`company-memory.md`). Son güncelleme: 2026-10-14 (D-042).

## Aktif kararlar
| ID | Başlık | Tür | Kapsam | Sınıf | Katman | Durum | Sınır / not |
|---|---|---|---|---|---|---|---|
| D-001 | Şirket OS kurulumu ve başlangıç kısıtları | DECISION | company | — | L1 | ACTIVE | Kısıtlar: `company/constraints.md` |
| D-002 | Doğrulanmış başlangıç koşulları (iş modeli, finans, araç, git) | DECISION | company | — | L1 | ACTIVE | Değişmez kurallar CLAUDE.md'de |
| D-003 | Founder Intake sonuçları | DECISION | company | — | L1 | ACTIVE | H-001 hâlâ varsayım |
| D-004 | Company OS v0.2 iskeleti | DECISION | company | — | L1 | LIMITED | Kernel v2'ye geçiyor (D-042); v0.2 dosyaları çalışır, çelişkide v2 kernel kazanır |
| D-005 | Company OS v0.3 self-management | DECISION | company | — | L1 | LIMITED | Aynı; self-repair kuralı v2 modlarıyla genişletildi (D-042) |
| D-007 | İlk kanal nişi N2 — Industrial & Technology Autopsies | DECISION | channel:the-industrial-casebook | — | L2 | ACTIVE | Kanal adı: The Industrial Casebook (D-037) |
| D-008 | Pilot taslak testi (EXP-001); P3 ilk tam pilot | DECISION | company | EXPERIMENT | L5 | ACTIVE | EXP-001 açık; Faz 2 OS v2 migration süresince durdurulmuş (current-state) |
| D-009 | Skill Lab v0.1 | DECISION | company | — | L1 | ACTIVE | Güvenlik kuralı HARD: `third-party-skill-security.md` |
| D-010 | SL-002 değerlendirmesi | DECISION | company | — | L1 | ACTIVE | Kalan 3 uyarlama ayrı Founder onayı bekliyor |
| D-011 | Fikir kapıları, Founder arayüzü, dil kuralı | DECISION | company | — | L1 | LIMITED | Dil kuralı ve Founder arayüzü aktif; fikir kapısı skill'leri v2 pipeline aşamasında yeniden yazılacak (story-viability) |
| D-012 | P3 packaging onayı | DECISION | case:VID-001 | CASE-SPECIFIC | L4 | ACTIVE | P3 işi OS v2 migration'da duruyor (current-state) |
| D-013 | P3 senaryo v2 kilidi | DECISION | case:VID-001 | CASE-SPECIFIC | L4 | LIMITED | Açılış anlatımı D-030 ile değişti; script v3 prototype kapısından sonra |
| D-014 | P3 senaryo v2.1 "fuel elements" | DECISION | case:VID-001 | CASE-SPECIFIC | L4 | ACTIVE | |
| D-015 | ElevenLabs doğrudan API + Starter | DECISION | company | — | L1 | ACTIVE | Ses üretimi/kredi Founder onaylı (`founder-approval.md` açık nokta) |
| D-017 | Production hattı planı; ikinci bilgisayar = Strong PC | DECISION | company | — | L1 | LIMITED | Premiere XML hattı reddedildi (D-039); Remotion "şablon" yaklaşımı v2 factory aşamasında yeniden yazılacak; makine rolleri charter §8 |
| D-018 | P3 kapasite anlatımı: yalnız GAO "several" | DECISION | case:VID-001 | CASE-SPECIFIC | L4 | ACTIVE | |
| D-019 | P3 Production Autonomy Mode | DECISION | case:VID-001 | CASE-SPECIFIC | L4 | LIMITED | OS v2 migration süresince P3 production yok (D-042); açık Founder kısıtı her zaman önde (governance §5) |
| D-020 | Growth / Content Intelligence + Finance / CFO | DECISION | company | — | L1 | ACTIVE | |
| D-021 | Kanal anlatıcısı Bill L. Oxley + Multilingual v2 | DECISION | channel:the-industrial-casebook | — | L2 | ACTIVE | |
| D-022 | Ses üretimi ve ses kurgusu kuralı | DECISION | company | — | L1 | ACTIVE | "Claude dinleyemez / dinlemiş gibi davranmaz" = HARD (truth) — `audio-production.md` |
| D-023 | Efficiency Audit v1: model yönlendirme | DECISION | company | — | L1 | ACTIVE | |
| D-024 | Müzik/SFX sistemi | DECISION | channel:the-industrial-casebook | — | L2 | ACTIVE | Lisans/hak kuralları HARD (rights) |
| D-025 | Creative mimari + prototype kapısı | DECISION | channel:the-industrial-casebook | — | L2 | LIMITED | Prototype kapısı + Founder tek sorusu aktif; production Claude'un kendi creative QA/teslim kararı charter §9 ile geçersiz (bağımsız creative QA) |
| D-026 | P3 prototype kalibrasyonu | DECISION | case:VID-001 | CASE-SPECIFIC | L4 | LIMITED | 1964 film kullanılmaz (aktif, hak); ≤700 kredi VO onayı D-028 ile askıya alındı, opening VO D-030'da üretildi |
| D-029 | Documentary Production Doctrine v1 | DECISION | channel:the-industrial-casebook | — | L2 | LIMITED | Sayısal eşikler DIAGNOSTIC (governance §1); maddeler Stage 2'de sınıflanarak channel canon'a taşınacak |
| D-030 | P3 opening v2 anlatımı | DECISION | case:VID-001 | CASE-SPECIFIC | L4 | ACTIVE | Narration metni geçerli; prototype v2 render'ı tarihsel (D-039) |
| D-031 | Brand System v1 + Source-to-Visual + Muted Preview Gate | DECISION | channel:the-industrial-casebook | — | L2 | LIMITED | Token/font/dünyalar aktif. Uygulanmaz: "ilk evet kazanır" sırasının kanıt=sunum gibi kullanımı (charter §3); muted gate creative PASS veremez (charter §9; DIAGNOSTIC girdi); intro/ident yaklaşımı Stage 2 channel canon'da yeniden kurulacak |
| D-032 | Brand Direction v1 canonical | DECISION | channel:the-industrial-casebook | — | L2 | LIMITED | D-031 ile aynı intro sınırı |
| D-033 | Founder-approved visual reference | DECISION | channel:the-industrial-casebook | — | L2 | ACTIVE | |
| D-034 | Dynamic Case Ident System v1 | DECISION | channel:the-industrial-casebook | — | L2 | LIMITED | "Her videoda yeni ident / tekrar yasağı" Founder Charter kanal maddesiyle (aynı skeleton + değişken payload) çelişiyor → uygulanmaz; CASE INTRO Stage 2 canon + kalibrasyon aşaması |
| D-035 | Video Launch OS v1 | DECISION | channel:the-industrial-casebook | — | L2 | ACTIVE | |
| D-036 | Launch OS tamamlama: rights ledger, Copyright/Release Gate | DECISION | company | — | L1 | ACTIVE | Rights ve Copyright Gate HARD |
| D-037 | YouTube kanalı oluşturuldu | DECISION | channel:the-industrial-casebook | — | L2 | ACTIVE | Studio yetenekleri NEEDS_VERIFICATION |
| D-038 | Long-form'dan Shorts türevleri | DECISION | channel:the-industrial-casebook | — | L2 | ACTIVE | |
| D-039 | Render PC P3 commit'leri arşivlendi; main canonical | DECISION | company | — | L1 | ACTIVE | Arşiv branch'i main'e dönmez |
| D-040 | P3 kapsamlı unfreeze | DECISION | case:VID-001 | CASE-SPECIFIC | L4 | LIMITED | Yasak listesi aktif; izin verilen işler OS v2 migration'da duruyor (D-042) |
| D-041 | P3 proof'lar PROVISIONAL PASS; Handoff v3 | DECISION | case:VID-001 | CASE-SPECIFIC | L4 | LIMITED | Yoğunluk oranları DIAGNOSTIC; handoff v3 FROZEN (v1 formatı; Strong PC'ye v2 handoff ile gider); motion prototype kararı OS v2 sonrası |
| D-042 | Company OS v2 governance kernel (Stage 1) | DECISION | company | — | L1 | ACTIVE | `os-v2-migration` dalında; `main`'e merge Founder kabulüyle. Kernel kararı HARD değildir (charter §4 HARD tanımı); içindeki HARD maddeler (secret, Founder yetkisi, kanıt) kendi L0 kural dosyalarındadır |

## Aktif olmayan kararlar (yalnız tarih)
| ID | Başlık | Neden aktif değil | Yerine |
|---|---|---|---|
| D-006 | Faz 1 başlatıldı; niş değerlendirme çerçevesi | Faz 1 tamamlandı (D-007); çerçeve referans dosya olarak durur | D-007 |
| D-016 | Kanal ana anlatıcı adayı Bill L. Oxley | Kesin karar ayrı kayda taşındı | D-021 |
| D-027 | P3 son creative kalibrasyonu (Ship-first, AI-1/AI-2) | Açılış D-030 ile yeniden yazıldı; AI adımları D-028 ile askıya alındı; benchmark statüsü D-029 | D-030, D-041 |
| D-028 | P3 donması + doctrine araştırması | Donma D-030/D-040 ile kalktı; araştırma D-029 ile sonuçlandı | D-029, D-040 |
