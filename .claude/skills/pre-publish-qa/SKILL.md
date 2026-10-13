---
name: pre-publish-qa
description: The Industrial Casebook videoları için tek ve bağlayıcı RELEASE GATE — render, ses, caption, title-thumbnail vaadi, description, chapters, end screen, cards, rights ledger, copyright kanıtı, AI disclosure, audience, dil, thumbnail export, A/B uygunluğu, publish package eksiksizliği, YouTube processing/Checks ve mobil/masaüstü kontrolü için PASS / FAIL / MANUAL-DECISION verir. FAIL varsa public yasaktır. Final edit sonrası, Private upload sonrası ve public öncesi kullan. Yayın yapmaz, upload etmez, ayar değiştirmez.
---

# Release Gate v1 (pre-publish-qa)

Karar: D-035 → D-036 (hard gate). Önceki dağınık "yayın öncesi QA" maddelerinin **tek** yeri (creative-standards, brand rule §5, visual-storytelling buraya yönlendirir).
Girdi: publish package JSON (`video-launch-os/PUBLISH-PACKAGE-SCHEMA.json`) + `UPLOAD-SETTINGS-MATRIX.md` + `CAPTION-PROTOCOL.md` + `THUMBNAIL-PRODUCTION-SPEC.md` + rights ledger (`production/rights/README.md`) + audio ledger + evidence ledger + `muted-preview-gate` raporu + resmî ilkeler (`intelligence/growth/launch-os/youtube-official-principles.md`).
Ön koşul: kanal durumu `CHANNEL CAPABILITY VERIFIED` (`intelligence/growth/launch-os/capabilities.md`); değilse gate yalnız **A bölümünü** çalıştırır, sonuç en fazla `PASS (pre-channel)` olur ve public mümkün değildir.

## Sonuç sözlüğü
- **PASS** — kanıtıyla tamam.
- **FAIL** — public yasak; düzeltme listesi production/COO'ya; Founder'a gitmez.
- **MANUAL-DECISION** — yalnız `UPLOAD-SETTINGS-MATRIX` istisnaları (age restriction, paid promotion, belirsiz altered content, made-for-kids şüphesi, CC lisans) veya hak/hukuk belirsizliği; Founder'a tek karar sorusu (öneriyle). Çözülene kadar public yasak.
**Gate PASS = tüm satırlar PASS** (MANUAL-DECISION çözülmüş = PASS).

## A. Dosya düzeyi (upload öncesi)
| # | Kontrol | PASS ölçütü | Kanıt |
|---|---|---|---|
| G-01 | Render integrity | Final export oynuyor; süre = timeline; çözünürlük ≥1080p (hedef master); siyah kare/donma/kırpılma yok (ffprobe + baş/orta/son kare kontrolü) | ffprobe çıktısı + kare listesi |
| G-02 | Audio QC | `audio-production.md` ölçümleri (LUFS/TP, clipping yok, sessizlik haritası); **Founder kulak checkpoint'i** final bütünlük için tamamlandı | ölçüm raporu + Founder notu |
| G-03 | Caption QC | `CAPTION-PROTOCOL` §4 PASS; dil = video dili | caption-qc.json (+ .md) |
| G-04 | Title–thumbnail promise match | Vaat ilk bölümde ödeniyor; title/thumbnail tekrar etmiyor; her iddia ledger'da; Thumbnail Spec §11 | QC raporu |
| G-05 | Description | Benzersiz; ilk 2–3 satır; stuffing yok; Sources ledger ile birebir; Credits rights/audio ledger'dan birebir; ≤5.000 karakter | package.description |
| G-06 | Chapters | Kullanılıyorsa 00:00 · ≥3 · artan · ≥10 sn · spoiler yok; kullanılmıyorsa gerekçe; automatic ayarı tutarlı | package.chapters |
| G-07 | End-screen safe area | Son 5–20 sn edit'te ayrılmış; kritik görsel/metin o alanda değil; video ≥25 sn | edit TC + kare |
| G-08 | Cards | Yok veya her biri değer gerekçeli, TC retention'ı bozmuyor | package.settings.cards |
| G-09 | Rights ledger | `production/rights/README.md` Copyright Gate 1–4; `UNKNOWN_RIGHTS`/`UNRESOLVED_RIGHTS`/manual review = 0 | rights + audio ledger |
| G-10 | Copyright evidence | Her harici asset için `proof_location` var; audio `license_proof` var | dosya yolları |
| G-11 | AI / altered-content decision | P-13 sayfası **bu yayın için yeniden okundu** (tarih); karar + gerekçe; AI asset'ler `AI-GENERATED / ILLUSTRATIVE` + ekranda gerekli etiket | package.settings.altered_content |
| G-12 | Audience | made_for_kids = No (gerekçe) · age_restriction kararı · paid_promotion kararı (finance ile tutarlı) | package.settings.audience / branded_content |
| G-13 | Language | video = English · caption = en · title/description English · caption certification seçili | package.settings.language |
| G-14 | Thumbnail export | Spec §1, §9, §11: master + JPG/PNG ≤50 MB, 16:9, ≥640 px genişlik (hedef 3840×2160); 3 dosya (A/B/C) mevcut | dosyalar |
| G-15 | A/B eligibility | `video-launch-os` §7 karar ağacı uygulandı; `ab_plan.eligibility` doğru; test dondurma kuralı ekipte biliniyor | package.ab_plan |
| G-16 | Publish package completeness | JSON şemadaki tüm zorunlu alanlar dolu; md aynası güncel; FC kilitli | JSON + md |
| G-17a | Muted preview + brand | `muted-preview-gate` PASS; EVIDENCE etiketleri ledger'la eşleşiyor | gate raporu |

## B. Upload sonrası (Private) — Founder Studio'da uygular, COO paketle karşılaştırır
| # | Kontrol | PASS ölçütü |
|---|---|---|
| G-17 | YouTube processing / Checks | HD (1080p+) işlendi; Checks: copyright + ad suitability sonucu kayıtlı — **sorun yoksa bile G-09/G-10 yerine geçmez** (P-10); claim varsa → FAIL + analiz |
| G-18 | Mobile/desktop spot check | Masaüstü + mobil uygulamada: thumbnail, title kesimi, description ilk satırlar, chapters, caption senkronu (3 nokta), end screen ve cards görünümü |
| G-19 | Studio = package | Tüm `settings.*`, visibility/schedule, playlist, caption parçası, altered-content toggle paketle birebir |

## C. Çıktı ve Founder
- Rapor: `<VID>-release-gate.md` (tablo + sonuç). Publish package `release_gate.result` güncellenir.
- **PASS** → Founder'a tek soru: "Önerilen paket bu (title + thumbnail + yayın zamanı); launch onaylıyor musun?" Founder onayı → Public/planlı (Founder Studio işlemi).
- **FAIL** → public yasak; Founder'a gitmez (yalnız durum bilgisi).
- **MANUAL-DECISION** → `founder-approval.md` formatında tek karar + önerim.
- Tekrarlayan FAIL nedeni → `growth-performance-review` §D (PUBLISHING/RIGHTS) → sistem güncellemesi.
