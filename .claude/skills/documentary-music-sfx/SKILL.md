---
name: documentary-music-sfx
description: Industrial & Technology Autopsies belgeselleri için müzik ve SFX seçimi, lisans doğrulaması ve kaydı. Kaynak önceliği (YouTube Audio Library → doğrulanmış Adobe Stock lisansı → tek tek doğrulanmış PD/CC0/CC), müzik yönü, sahne bazlı müzik/sessizlik/SFX planı, audio ledger ve yayın için otomatik attribution. Final mix öncesinde ve her yeni videoda kullan. Ücretli asset almaz, lisansı belirsiz dosya indirmez, final mix yapmaz.
---

# Documentary Music & SFX

> Bağlayıcı: `.claude/rules/audio-production.md` (Claude dinleyemez — müzik seçimi ve mix dengesi kulak kontrolüdür), `founder-approval.md` (para/lisans satın alma), D-019 (Production Autonomy Mode), D-024 (bu sistem). Kayıt: `production/audio-library/`.

## 1. Kaynak önceliği
1. **YouTube Audio Library** (YouTube Studio → Audio Library). Resmî doküman: Audio Library müzik ve SFX'i "copyright-safe"; YPP'de monetize edilebilir; Content ID ile talep edilmez (support.google.com/youtube/answer/3376882). Önce **"Attribution not required"** filtresi. Creative Commons (attribution required) parça yalnız yaratıcı olarak açıkça daha iyiyse; Audio Library'nin verdiği kredi metni **birebir** ledger'a, oradan yayın açıklamasına.
   - Şart (YouTube ToS / kütüphane şartları): müzik yalnız kendi videolarımızda; dosyalar videodan ayrı dağıtılmaz. Video içinde kesme/kısaltma/fade kurgu kullanımıdır; dosyanın tek başına değiştirilip yeniden dağıtılması yapılmaz.
2. **Adobe Stock audio** (ikincil). Creative Cloud aboneliğinin bir parçayı otomatik lisansladığı **varsayılmaz**. Kullanılacaksa: hesapta gerçek lisans durumu, **lisans kodu** (Adobe Stock → License History / audio license modal), lisans türü ve kapsamı (monetize YouTube kullanımı dahil mi) ledger'a. Content ID talebinde YouTube Studio → Dispute → License alanına yalnız o parçanın kodu girilir. Ek ücretli lisans → Founder onayı; alınmaz.
3. **Diğer (PD / CC0 / CC)**: her asset ayrı doğrulanır — kaynak, lisans türü, ticari kullanım, attribution, değiştirme izni, indirme tarihi, mümkünse lisans kanıtı (sayfa/ekran kaydı). **Belirsizse kullanılmaz.**
- **Kullanılmaz:** "copyright free music" YouTube kanalları, reupload siteleri, lisansı açık olmayan ücretsiz müzik siteleri, Audio Library adını taşıyan üçüncü taraf kanallar.

## 2. Müzik yönü (kanal varsayılanı)
Sakin, modern belgesel; düşük/orta yoğunluk; merak ve araştırma hissi; anlatıcıyla yarışmayan (vokalsiz, dar frekans/az melodi tercih). **Değil:** epik fragman, aşırı dramatik, kurumsal reklam, neşeli/pazarlama. Her videoda aynı parça şart değil; zamanla tutarlı ses kimliği hedeflenir (aynı tür/tempo/enstrümantasyon ailesi). Sürekli müzik zorunlu değil; **sessizlik anlatıya hizmet ediyorsa kullanılır** (ör. ana kanıtın ilk açılışı).

**Marka (D-031):** kanal ses kimliği (stinger, jingle, logo sesi) yok; case ident (`CASE 001 · …`) müzik altında veya sessiz, kendi SFX'i yok.

## 3. SFX
Az ve anlamlı: belge/satır vurgusunda çok hafif accent, harita/zaman şeridinde ince geçiş, önemli rakam reveal'ı, bölüm geçişi. **Yapılmaz:** her grafik için whoosh, sürekli click/pop, TikTok tarzı efekt, gerçek olmayan makine/ortam sesini tarihî kanıt gibi kullanmak (arşiv fotoğrafına "o anın sesi" izlenimi veren gemi düdüğü, makine dairesi vb.). SFX ritim ve anlam aracıdır.

## 4. Ses önceliği
Anlatıcı her zaman ana katman. Ducking / seviye ayarı kullanılabilir; **tek evrensel dB/LUFS hedefi körü körüne uygulanmaz**. Teknik ölçüm (VO konuşurken müzik seviyesi, toplam loudness, true peak; `audio-production.md` araçları) + Founder kulak QA'sı (müzik–VO dengesi) birlikte.

## 5. Adımlar (her video)
1. **İhtiyaç:** edit timeline'ından (`<video>-edit-timeline.md`) bölüm rollerini çıkar: açılış merakı, reveal'lar, ana kanıt, payoff, kapanış; nerede müzik, nerede sessizlik, nerede SFX.
2. **Yön + filtre:** kaynak 1'de tek filtre seti (tür, ruh hali, attribution, minimum süre) ve en fazla **3 müzik adayı** + küçük SFX seti hedefi. Claude kütüphaneye erişemiyorsa **parça adı uydurmaz**; Founder'a tek işlem verir: filtreyi uygula, dinle, en fazla 3 parça indir (kulak kararı Founder'da).
3. **Doğrula + kaydet:** indirilen her dosya → `production/audio-library/audio-ledger.csv` (lisans, attribution metni, kanıt/lisans kodu, tarih, dosya, SHA-256). Lisans bilgisi eksikse dosya kullanılmaz.
4. **Plan:** `<video>-music-sfx-plan.md` — sahne → parça/sessizlik/SFX; zamanlar edit timeline'ından.
5. **Mix:** Premiere'de (ayrı adım). Ölçüm + Founder kulak QA'sı.
6. **Yayın:** `production/tools/audio/attribution.ps1 -Video <VID>` → açıklama için kredi bloğu + Content ID için lisans kodu listesi (yayın kaydına).

## 6. Founder'a gelenler
Yalnız: müzik adaylarını dinleyip seçme (en fazla 3), mix'te müzik–VO dengesi (checkpoint), ücretli lisans gerekiyorsa onay. Founder'dan yüzlerce parçayı gezmesi istenmez.
