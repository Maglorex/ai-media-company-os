---
name: strong-pc-preflight
description: Strong PC (factory) tarafında production'dan önce boot contract — `node os/factory/factory.mjs preflight` ile doğru repo/branch/commit/handoff sürümü/case, temiz çalışma ağacı, gerekli asset'lerin varlığı ve hash/boyut/süresi, haklar ve kanonik dosyaları doğrular; READY_FOR_PRODUCTION değilse üretim başlamaz ve fallback uydurulmaz. Uygulamada yaratıcı sorun çıkarsa CREATIVE_CHANGE_REQUEST yazar; teslimde technical QA raporu verir ve final creative PASS veremez. Yedek durumunu (yalnız bu PC'de olan dosya) raporlar.
---

# Strong PC Preflight, CCR ve Teslim

> Protokol (tek kaynak): `os/factory/README.md` (D-047). Makine rolü: Strong PC = factory; doctrine yazmaz, yaratıcı karar vermez (charter §8–§9, `company/machines.md`). Bu skill Strong PC'deki Claude (`production-engineer`) içindir.

## 1. Boot contract — her production oturumunun ilk işi
1. GitHub Desktop ile Fetch/Pull yapılmış olmalı (Founder GUIDED ACTION). Claude `git` bulamazsa CLI GitHub Desktop'un gömülü git'ini kendisi bulur.
2. Çalıştır: `node os/factory/factory.mjs preflight --handoff <handoff yolu> --expect <HANDOFF-ID>@v<N>`
3. Sonuç:
   - `READY_FOR_PRODUCTION` → yalnız handoff `scope` ve `allowed_actions` içinde çalış.
   - `BLOCKED_BY_VERSION_MISMATCH` · `BLOCKED_BY_ASSET` · `BLOCKED_BY_RIGHTS` · `BLOCKED_BY_CANONICAL_GAP` · `CCR_REQUIRED` → **dur.** Dosya düzeltme, başka asset seçme, eski handoff'a dönme, commit değiştirme yok. Çıktıyı (gözlenen hash/boyutlar dahil) Main PC'ye (COO) raporla. Founder'a teknik soru sorulmaz.
4. Preflight'ı atlatan veya zorlayan bir seçenek yoktur ve eklenmez.

## 2. Üretim sırasında
- Araç, sahne fikri ve sıra scene plan'dedir; Strong PC yaratıcı amacı kolaylık için düşürmez, gereksiz 3D/AI/render karmaşıklığı eklemez (`os/factory/README.md` §7).
- Mikro teknik ayar (kadraj, crop, timing ±, easing, renk eşleme, şablon düzeltmesi, katman sırası, export ayarı) serbesttir; teslim raporunda `MICRO — …` olarak yazılır.
- Sahne teknik olarak uygulanamıyor, çalışmıyor, gerekli görsel mümkün değil veya timing/story sorunu çıktıysa: o sahnede dur, `channels/<kanal>/cases/<VID>/ccr/CCR-NNN.md` yaz (`CCR-TEMPLATE.md`), `node os/factory/factory.mjs lint ccr <yol>` temiz olsun. **Önce CCR, sonra değişiklik** — ve değişikliği Main PC creative authority onaylar; onaylanan CCR yeni handoff sürümüyle gelir.
- Kapsam dışı asset, manifest dışı dosya, `QUARANTINED` asset ve `forbidden_code_paths` altındaki legacy kompozisyonlar kullanılmaz.
- Para, yayın, push, dış servis: yapılmaz (Founder kararı).

## 3. Teslim = technical QA raporu
Şablon `DELIVERY-TEMPLATE.md`; `node os/factory/factory.mjs lint delivery <rapor> --manifest <manifest yolu>` temiz olmalı. Strong PC'nin kontrol ettiği: Version · Assets · Rights · Render validity · Missing files/frames · Captions · Measurable audio (`audio-production.md`) · Resolution · Technical delivery · Backup. `muted-preview-gate` DIAGNOSTIC girdi olarak eklenebilir.
**Strong PC final creative PASS veremez.** Rapor `Creative QA: PENDING_INDEPENDENT` yazar; creative karar Stage 3 bağımsız değerlendiricisindedir (`creative-qa`, `creative-qa-evaluator`).

## 4. Yedek
Teslimden önce: `node os/factory/factory.mjs backup --production-root <üretim klasörü> --backup-root C:/CompanyOS-Backup/<video> --manifest <manifest yolu>`. `UNPROTECTED` listesi (yalnız bu PC'de, kaybolursa geri gelmeyecek dosyalar) raporun `Backup` alanına yazılır; üretilen `LOCAL_ONLY` dosyalar doğrulanmış kopya olmadan teslim edilmez. Makine dışı yedek kararı açıktır (current-state §6).

## 5. Self-test (kurulum veya şüphe anında)
`node os/factory/factory.mjs selftest` — doğru handoff, yanlış commit, kirli ağaç, eksik/yanlış asset, reddedilmiş hak, eski handoff, legacy handoff ve açık CCR senaryolarını bu makinenin git'i ve dosya sistemiyle çalıştırır (geçici klasörde; render yok). Ardından `node --test "os/tests/*.test.mjs"`.
