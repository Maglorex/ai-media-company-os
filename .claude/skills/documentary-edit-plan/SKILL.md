---
name: documentary-edit-plan
description: "SUPERSEDED (D-046) — talimat olarak kullanma; yerine production-scene-plan (sahne/edit fikri) ve Stage 4 production handoff (zaman kodu/VO senkronu). Eski açıklama: Founder onaylı script + evidence ledger + visual plan hazır olduğunda videoyu kurgulanabilir bir timeline planına (zaman kodlu beat listesi) çevirir; her beat'i VO'ya, asset'e, ekrandaki metne, harekete, geçişe, ses tasarımına ve hak durumuna bağlar. Kurgu, render, asset üretimi veya ses üretimi başlatmaz."
---

# Documentary Edit Plan

> **SUPERSEDED — 2026-10-14 (D-046, Stage 3).** Bu skill talimat olarak kullanılmaz; yerine: **production-scene-plan (sahne/edit fikri) ve Stage 4 production handoff (zaman kodu/VO senkronu)** (`channels/the-industrial-casebook/pipeline/README.md`). Davranışlarının yeni yeri: `channels/the-industrial-casebook/pipeline/consolidation-map.md`. Aşağıdaki metin tarihseldir.
> Ses üretimi/kurgusu için bağlayıcı kural: `.claude/rules/audio-production.md` (Claude dinleyemez; segment + zaman damgası + ölçüm; kulak kontrolleri yalnız checkpoint'te Founder'da). Kanal sesi ve birincil model: D-021.


Kapsam: The Industrial Casebook (N2 nişi) faceless belgeseller. Ön koşullar: kilitli script, güncel ledger, görsel plan. Çıktı: `production/.../<video>-edit-plan-vN.md`. Founder'a tablo varsayılan olarak gösterilmez (`founder-interface`).

## Zamanlama
- Süreler sabit kelime/dk varsayımıyla değil, **seçilen anlatıcının ölçülen hızıyla** hesaplanır (voice ledger'daki test üretimi: karakter ÷ saniye). Final VO üretildiğinde zaman kodları gerçek ses dosyasına göre güncellenir.
- Beat süresi = VO süresi + bilinçli bekleme (belge okuma, rakam oturması, bölüm geçişi). Bekleme gerekçesi yazılır.
- Videonun doğal toplam süresi raporlanır; süre uzatmak için dolgu eklenmez.

## Beat kaydı (her satır)
Zaman kodu (giriş–çıkış) · VO bölümü (sahne/paragraf + ilk kelimeler) · sahnenin işi · yeni bilgi/yeni bakış · ana asset (ledger V-ID) · destek asset · tür (belge / fotoğraf / grafik / harita / motion / tipografi) · ekrandaki metin veya sayı · zoom/pan/highlight/motion · geçiş mantığı · müzik/SFX amacı (varsa) · asset hazır mı · lisans durumu · zorluk (K/O/Z).

## Edit prensipleri
0. **Prototype kullanılıyorsa (D-043; zorunlu değil):** İlk edit plan yalnız prototype kesitini (ilk ~60–90 sn) kapsar ve `documentary-production-handoff` ile production PC'ye gider; tüm videonun edit planı Founder prototype kapısından sonra yazılır. Prototype kullanılmıyorsa edit plan tüm video için senaryo kilidinden sonra yazılır.
1. Sabit "her X saniyede kesme" kuralı yok; kesimler rastgele hızlandırılmaz. Ama **görsel yenilenme = yeni bilgi veya yeni bakış**: bilgi bütçesi bitmiş görsel durum yeni bir şey katmadan ekranda kalmaz (`documentary-visual-storytelling` §3). Fotoğraf + pan ve tam ekran kart zinciri kurulmaz.
2. **Belge ekrandayken okunabilir süre** verilir (vurgulanan satır VO'da geçiyorsa VO süresi + kısa bekleme).
3. **Önemli rakam söylenirken o rakam veya grafiği ekranda** olur; senaryodaki rakam ile ekrandaki rakam aynı anlamdadır (ledger).
4. VO başka şey anlatırken alakasız stock footage yok.
5. Motion graphics bilgiyi açıklar; dekoratif karmaşa yok. Bizim grafiklerimiz arşiv/belge gibi görünmez (görsel plan kural 4).
6. Uzun kalan asset'te crop, detay, vurgu veya anlamlı hareketle amaç korunur.
7. **Müzik anlatıcıyla yarışmaz** (VO altında belirgin biçimde geride; bölüm geçişlerinde kısa nefes). **SFX** yalnız anlama veya geçişe gerçekten yardım ettiğinde. Müzik/SFX kaynağı ve lisansı ledger'a bağlanmadan final sayılmaz.
8. YouTube closed captions (SRT) her videoda; hardcoded sürekli altyazı varsayılan değil, ekran tipografisi yalnız seçici anlarda. Kaynak etiketleri okunabilir; belge kaynak notu ekranda kısa süre görünür.
9. Kanalın kendi retention verisi oluştuğunda gerçek sonuçlar genel internet tavsiyelerinden önce gelir; plan şablonu buna göre güncellenir.
10. Script metni değişmez; edit sorunu "production problemi" olarak işaretlenir.

## Dosya sonunda
Toplam süre (VO + bekleme) · bölüm süreleri · asset durumu özeti (hazır / üretilecek / aranacak) · üretilecek grafik listesi (şablon adayları) · müzik/SFX ihtiyacı · en zor bölümler ve riskler · final VO sonrası güncellenecek noktalar.

## Founder'a özet (sade Türkçe)
Plan hazır mı · toplam süre · en zor bölüm · eksik asset/sistem · sıradaki adım.
