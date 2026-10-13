---
name: documentary-creative-treatment
description: Packaging ve evidence ledger hazır olduğunda, senaryo kilitlenmeden önce bir belgesel videonun yaratıcı yönünü (creative treatment) hazırlar — core promise, hook, anlatı yapısı, gerilim/merak haritası, sahne amaçları, görsel dil, arşiv/motion/tipografi/müzik stratejisi, vaadin erken karşılanması ve prototype sınırı. Mevcut asset'ler varsa KEEP/REBUILD/REMOVE değerlendirmesi yapar. Ses, görsel, render üretmez; karar Founder'da.
---

# Documentary Creative Treatment

Uygulayıcı: `documentary-creative-director` (ana model). Bağlayıcı: `.claude/rules/documentary-creative-standards.md`, `documentary-visual-storytelling`. Girdi: onaylı packaging, evidence ledger, growth kaydı, **Doctrine v1** (`intelligence/creative/doctrine/documentary-production-doctrine-v1.md`, bağlayıcı yaratıcı taban) + benchmark (`intelligence/creative/documentary-style-benchmarks.md`), CF geri bildirim kaydı. Çıktı: `production/.../<video>-creative-treatment-vN.md`.

## 1. Hook-first story system
**Varsayılan düşünme modeli:** çatışma/paradoks → soru → seçici bağlam → kanıt → tırmanma → payoff.
Zorunlu şablon değildir. Konuya göre başka yapı seçilebilir; seçilen yapı ve nedeni yazılır. Örnek yapılar:
| Yapı | Ne zaman |
|---|---|
| Paradoks → çözülme | "Çalıştı ama…", "kazandı ama…" gerilimi olan konular |
| Soruşturma / dosya açma | Merkezde bir belge/denetim/rapor varsa; izleyici kanıtı dedektif gibi açar |
| Geri sayım / zaman baskısı | Bir karar tarihine, son teslim veya krize doğru ilerleyen olay |
| Karşılaştırma (A vs B) | İki teknoloji/şirket/karar arasındaki fark anlamın merkeziyse |
| Tersine kronoloji | Sonuç biliniyorsa; "buraya nasıl gelindi?" |
| Tek nesne üzerinden | Bir makine/parça/bina hikâyenin taşıyıcısı olabiliyorsa |

**En önemli kural:** Title/thumbnail'ın sattığı ana çatışma veya merak videonun erken bölümünde görünür olur (sözle **ve** görselle). Bağlam otomatik olarak başa konmaz; yalnız bir sonraki kanıtı anlamak için gerektiği anda verilir.

## 2. Hook tasarımı
- Hook'un hammaddesi ledger'daki **en somut, en görsel, en paradoksal** doğrulanmış unsurdur (soyut bir oran değil; bir yer, nesne, süre, sayı, belge satırı).
- 2–3 hook adayı yazılır; her biri için: açılış cümlesi (İngilizce), ilk görsel, izleyicide oluşan soru, vaatle bağı, kanıt satırları (ledger ID), en büyük risk. Birincil seçilir ve gerekçelendirilir.
- Hook payoff'u harcamaz: cevabın yönünü ima eder, en güçlü reveal'ı sona bırakır.
- Sahte dram, kaynaksız nedensellik, "shocking/disaster" dili yok (`documentary-script` kural 8).

## 3. Treatment içeriği (dosya bölümleri)
1. **Teşhis** (mevcut materyal varsa): sistem neden o sonucu üretti; video sorunu mu sistem sorunu mu (CF kaydına bağla).
2. **Core promise** (1 cümle) + title/thumbnail vaadinin karşılandığı anlar (zaman aralığı + nasıl).
3. **Hook adayları ve birincil hook.**
4. **Yapı:** seçilen yapı, bölümler (her biri: amaç, soru, kanıt, reveal, çıkış sorusu), yaklaşık süre.
5. **Gerilim/merak haritası:** her bölümde açık tutulan soru ve kapanan soru; payoff nerede.
6. **Görsel dil:** imza araç + 2–5 destek aracı (library), bölüm başına baskın araç, katman ayrımı, renk/tipografi tonu.
7. **Sahne amaçları:** ana sahneler için iş (SKILL §1) ve görsel yenilenme gerekçesi.
8. **Arşiv stratejisi:** footage taraması gereksinimi, bulunan/eksik, hak durumu.
9. **AI görsel ihtiyacı:** var/yok; varsa hazır prompt(lar).
10. **Tipografi anları** (yalnız seçici liste).
11. **Müzik/SFX yönü:** bölüm başına işlev ve yoğunluk; sessizlik anları.
12. **Prototype sınırı:** ilk 60–90 sn'nin içeriği ve neden bu kesitin videoyu temsil ettiği.
13. **KEEP / REBUILD / REMOVE** (mevcut asset varsa): her asset için karar + neden + yeni iş.
14. **Riskler:** kanıt, hak, üretim süresi, kredi.
15. **Founder'a gidecek tek karar** (varsa).

## 4. Benchmark kullanımı
Her videoda internet sıfırdan taranmaz; `documentary-style-benchmarks.md` okunur ve hangi prensibin neden kullanıldığı yazılır. Yeniden araştırma yalnız: format değiştiyse · yeni güçlü rakip çıktıysa · kendi kanal verimiz benchmark'ı geçersiz kılıyorsa.

## 5. Kontroller (Founder'a gitmeden)
`documentary-visual-storytelling` §10 teşhis testleri · packaging sınırları korunuyor mu · her hook/tırmanma iddiası ledger'a bağlı mı · bağlam başa yığılmış mı · prototype kesiti videonun gerçek görsel dilini gösteriyor mu.

## 6. Founder'a özet (sade Türkçe, `founder-interface`)
Yeni hook (İngilizce cümle + Türkçe anlamı) · videonun akışı 2–3 cümle · prototype'ta ne göreceği · tek karar (varsa). Tablo ve dosya yolu yok.
