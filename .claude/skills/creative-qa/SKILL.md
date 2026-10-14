---
name: creative-qa
description: The Industrial Casebook için bağımsız Creative QA — script veya Production Scene Plan'i (sonra render'ı) üreten oturumdan AYRI bir oturum/agent tarafından yapılır; central question, narrative curiosity, visual curiosity, audiovisual momentum planı, story progression, evidence clarity, Anti-PowerPoint, CASE identity ve payoff alanlarını gerekçeyle değerlendirir; PASS / REVISE / BLOCKED verir, REVISE'da somut düzeltme listesi. Üreten oturum kendi işine final creative PASS veremez. Pipeline aşama 6 (D-046). Dosya üretmez (rapor hariç), düzeltme yapmaz.
---

# Independent Creative QA

> Kanal canon'u önce gelir (D-045). Pipeline: `channels/the-industrial-casebook/pipeline/README.md` §6. Şirket kuralı: işi yapan kendi creative work'üne final creative PASS veremez (`company/charter.md` §9).

## 1. Bağımsızlık
- QA, değerlendirilen artifact'ı (beat sheet, script, scene plan; Stage 4 sonrası render) **üretmemiş** bir oturumda veya `creative-qa-evaluator` agent'ında yapılır.
- Rapor başlığında `author:` (değerlendirilen artifact'ı üreten oturum/rol, artifact başlığından aynen) ve `evaluator:` (bu QA'yı yapan oturum/rol) ayrı yazılır; aynıysa rapor geçersizdir (lint).
- Değerlendirici artifact'ı düzeltmez; bulguyu yazar. Düzeltmeyi üretici yapar, sonra yeni QA turu.
- `muted-preview-gate` ve teşhis ölçümleri (render sonrası) DIAGNOSTIC girdidir; karar burada verilir.

## 2. Alanlar (her biri: STRONG / OK / WEAK / MISSING + gerekçe)
| Alan | Sorulan |
|---|---|
| **Central question strength** | Spesifik, cevaplanabilir, erken kuruluyor mu (TIC-06/07)? |
| **Narrative curiosity** | Her beat bir soruyu kapatıp yenisini açıyor mu; bağlam meraktan önce yığılmış mı? |
| **Visual curiosity** | İzleyici "bunu bana nasıl gösterecekler?" diyecek mi; sahne fikirleri literal mi? |
| **Audiovisual momentum plan** | Görüntü, hareket, anlatım, müzik ve sessizlik birlikte ilerliyor mu (TIC-14, TIC-22)? |
| **Story progression** | Yapı ilerliyor mu; tekrar, bilgi dökümü, sarkma var mı? |
| **Evidence clarity** | Claim'ler ledger'a bağlı mı; kanıt ekranda dürüst ve anlaşılır mı; illüstrasyon kanıttan ayırt ediliyor mu? |
| **Anti-PowerPoint** | Önemli sahneler scene mi, hareket verilmiş slide mı (TIC-13)? Fotoğraf/belge kullanımı yasak değil; görsel fikir var mı? |
| **CASE identity** | Brand System kimliği ve CASE LABEL/INTRO kurallarına uyuyor mu (TIC-11, TIC-12, TIC-24); CASE INTRO kalibrasyon öncesi tasarlanmamış mı? |
| **Payoff** | Final merkezi soruyu anlamlı biçimde kapatıyor mu; packaging promise'i karşılanıyor mu? |

## 2b. Kısmi kapsam
Değerlendirilen artifact'lar eksikse (ör. dry-run'da script yok, scene plan kısmi) rapor başında kapsamı yazar; kapsam dışı kısım için PASS verilmez, eksiklik "Required changes" veya kapsam notunda belirtilir. Rapor adı sürümlüdür: `06-creative-qa-vN.md`.

## 3. Sonuç
- **PASS:** hiçbir alan WEAK/MISSING değil (OK olanların notu yazılır).
- **REVISE:** en az bir alan WEAK/MISSING; her biri için **gerçek neden** (hangi beat/sahne, ne eksik) ve **somut düzeltme**; öncelik sırası.
- **BLOCKED:** karar canon/pipeline'da yoksa veya HARD sorun (kanıt, hak, disclosure) varsa — neden ve kime gittiği.
- Yalnız "PASS/FAIL" yazmak geçersizdir; lint her alanın gerekçesini ister.

## 4. Çıktı
`channels/the-industrial-casebook/cases/<VID>/06-creative-qa-vN.md` (`TEMPLATE.md`); registry'ye DRAFT girer. Lint: `os/lib/pipeline.mjs` (`lintCreativeQA`).
