---
name: documentary-edit-plan
description: Founder onaylı script + evidence ledger + visual plan hazır olduğunda videoyu kurgulanabilir bir timeline planına (zaman kodlu beat listesi) çevirir; her beat'i VO'ya, asset'e, ekrandaki metne, harekete, geçişe, ses tasarımına ve hak durumuna bağlar. Kurgu, render, asset üretimi veya ses üretimi başlatmaz.
---

# Documentary Edit Plan

Kapsam: N2 (Industrial & Technology Autopsies) faceless belgeseller. Ön koşullar: kilitli script, güncel ledger, görsel plan. Çıktı: `production/.../<video>-edit-plan-vN.md`. Founder'a tablo varsayılan olarak gösterilmez (`founder-interface`).

## Zamanlama
- Süreler sabit kelime/dk varsayımıyla değil, **seçilen anlatıcının ölçülen hızıyla** hesaplanır (voice ledger'daki test üretimi: karakter ÷ saniye). Final VO üretildiğinde zaman kodları gerçek ses dosyasına göre güncellenir.
- Beat süresi = VO süresi + bilinçli bekleme (belge okuma, rakam oturması, bölüm geçişi). Bekleme gerekçesi yazılır.
- Videonun doğal toplam süresi raporlanır; süre uzatmak için dolgu eklenmez.

## Beat kaydı (her satır)
Zaman kodu (giriş–çıkış) · VO bölümü (sahne/paragraf + ilk kelimeler) · sahnenin amacı · ana asset (ledger V-ID) · destek asset · tür (belge / fotoğraf / grafik / harita / motion / tipografi) · ekrandaki metin veya sayı · zoom/pan/highlight/motion · geçiş mantığı · müzik/SFX amacı (varsa) · asset hazır mı · lisans durumu · zorluk (K/O/Z).

## Edit prensipleri
1. Video sürekli hareket etmek zorunda değil; kesimler retention heuristic'i yüzünden rastgele hızlandırılmaz. Sabit "her X saniyede kesme" kuralı yok.
2. **Belge ekrandayken okunabilir süre** verilir (vurgulanan satır VO'da geçiyorsa VO süresi + kısa bekleme).
3. **Önemli rakam söylenirken o rakam veya grafiği ekranda** olur; senaryodaki rakam ile ekrandaki rakam aynı anlamdadır (ledger).
4. VO başka şey anlatırken alakasız stock footage yok.
5. Motion graphics bilgiyi açıklar; dekoratif karmaşa yok. Bizim grafiklerimiz arşiv/belge gibi görünmez (görsel plan kural 4).
6. Uzun kalan asset'te crop, detay, vurgu veya anlamlı hareketle amaç korunur.
7. **Müzik anlatıcıyla yarışmaz** (VO altında belirgin biçimde geride; bölüm geçişlerinde kısa nefes). **SFX** yalnız anlama veya geçişe gerçekten yardım ettiğinde. Müzik/SFX kaynağı ve lisansı ledger'a bağlanmadan final sayılmaz.
8. Altyazı ve kaynak etiketleri okunabilir; belge kaynak notu ekranda kısa süre görünür.
9. Kanalın kendi retention verisi oluştuğunda gerçek sonuçlar genel internet tavsiyelerinden önce gelir; plan şablonu buna göre güncellenir.
10. Script metni değişmez; edit sorunu "production problemi" olarak işaretlenir.

## Dosya sonunda
Toplam süre (VO + bekleme) · bölüm süreleri · asset durumu özeti (hazır / üretilecek / aranacak) · üretilecek grafik listesi (şablon adayları) · müzik/SFX ihtiyacı · en zor bölümler ve riskler · final VO sonrası güncellenecek noktalar.

## Founder'a özet (sade Türkçe)
Plan hazır mı · toplam süre · en zor bölüm · eksik asset/sistem · sıradaki adım.
