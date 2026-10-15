# CTA / Subscribe ve End-screen / Next Case continuation (Stage 5)

> status: DRAFT (Founder Golden Lock bekliyor) · author: COO main session · canon `01` (viewer promise), `03` §2, `04` §6 (UI yalnız guide/compare/label/highlight/source), `05` §5 · launch: `video-launch-os` §16 (end screen)
> Generic YouTube dili varsayılan değildir ("Don't forget to like and subscribe" yok). CTA sıklığı, yeri veya oranı için global kural yazılmaz; aşağıdaki örnek cümleler **mantık örneğidir, kilitli metin değildir**. Like/subscribe kotası yok.

## 1. Üç CTA davranışı
| Davranış | Ne zaman | Nasıl | Ne zaman kullanılmaz |
|---|---|---|---|
| **A. Value-earned** (opsiyonel) | İlk anlamlı payoff'tan **sonra** — izleyici gerçek bir cevap aldıktan sonra | Tek cümle, sakin, anlatımın tonunda; ekranda en fazla küçük bir Case UI satırı | Momentum yüksekken, soru açıkken, payoff henüz verilmemişken; videonun ritmini bozuyorsa hiç |
| **B. Identity** | Kanalın vaadini hatırlatmanın doğal olduğu an (genellikle ilk payoff'tan sonra veya finalde) | Subscribe isteğini **izleyici vaadine** bağlar: bu kanal neyi, nasıl açıyor | "Subscribe" tek başına, gerekçesiz |
| **C. Continuation** | Final | PAYOFF → CHANNEL PROMISE / CONTINUATION BRIDGE → NEXT CASE → OPTIONAL SUBSCRIBE (E1) | Hikâye bittikten sonra yapıştırılmış reklam gibi |
**Test edilen prensip:** izleyici önce değer alır → CTA **kanalın genel vaadini** hatırlatır (canon `01`: gerçek vaka, kanıt, sistemin görsel olarak anlaşılması) → hikâyeye hemen döner. Kalıcı subscribe sloganı yoktur; kesin metin Golden Lock öncesinde zorunlu değildir ve Golden Lock da metni değil davranışı kilitler.
**Kalibrasyon kopyası** (kısa, yeni ElevenLabs satırı; kanal geneline uyarlanabilir, case'e özgü değil):
- Identity (C1): *"Every case on this channel starts with the evidence — and ends with how the whole system really worked. If you want the next one, subscribe."*
- Optional subscribe (E1 sonu): *"Subscribe for the next case."*
- Köprü (E1; case'e özgü payload, C-11 / Q-02): *"The ship worked. But one ship was carrying the whole system around her."*
Case'e özgü ifadeler (ör. *"…cases where the machine worked but the system around it didn't…"*) yalnız o case'in payload'ında, örnek olarak kullanılabilir; kanal sloganı olmaz. Like: yalnız spesifik değere bağlı ve opsiyonel (ör. *"If this changed how you see the Savannah…"* mantığı); kalibrasyonda render edilmez.

## 2. C1 — CTA / Subscribe motion reference
- **Yer:** G3'te maliyet değeri (≈1,16M $) yerine oturduktan hemen sonra — paranın nereye gittiği sorusunun ilk gerçek cevabı; açık soru varken CTA yok (CAL-S5 scene plan v2, QA v1 bulgusu). Kalibrasyonda ayrı bir klip olarak render edilir (Reel'i bölmez).
- **Hareket:** CASE INTRO'nun **Case Line**'ı kadrajın alt kenarında, subject'ten uzak güvenli alanda kısa bir çizgi olarak belirir; çizgiden tek satır Plex Mono metin kayar (örnek metin, kilitli değil: `NEXT CASE · SUBSCRIBE`); yalnız cümle söylenirken durur; metin çizgiye geri çekilir ve çizgi kaybolur; hikâye hemen kaldığı yerden sürer. Arka plandaki sahne (bloklar) durmaz, karartılmaz.
- **Yok:** dev subscribe popup, zil animasyonu, el imleci, kırmızı düğme, stok YouTuber lower-third'ü, ekranı kaplayan kart, sosyal medya şablonu, ses efekti.
- **Ses:** yalnız anlatım; müzik yatağı alçalmaz/yükselmez (reklam arası hissi yok).
- **Neden bu çözüm:** CTA kanalın kendi grameriyle (Case Line + Case UI) konuşur; subject'in önüne geçmez ve hikâyeye anında döner. Gerçek "Subscribe" düğmesi YouTube'un kendi arayüzüdür; videoda taklidi çizilmez.

## 3. E1 — End-screen / Next Case continuation reference (modüler)
- **NEXT CASE payload'ı (değişken):** next-case **hero object** · **title** · **case number** · **motif** · **case accent** · (varsa) next-case'in açılış sorusunu ima eden tek görüntü. Payoff tarafı da değişkendir: **outgoing motif** = bitmekte olan case'in son görsel sonucu (P3 kalibrasyonunda: boş yuvalı tesis + kapanan maliyet boşluğu).
- **Sabit davranış (skeleton):** payoff'un son görsel sonucu → Case Line o sonuçtan çıkar → sonraki case'in hero object'i CASE INTRO skeleton'ının kısa haliyle kaydedilir (carry-in → registration → index) → kompozisyon end-screen öğelerine alan bırakan sakin düzene oturur. İki case'in şekli benziyorsa (ör. "merkezde tek nesne, çevresinde sistem") görsel eşleşme kullanılabilir; benzemiyorsa köprü yalnız Case Line'ın taşınmasıdır — eşleşme zorlanmaz.
- **Publish sırasında:** gerçek önerilecek video/case (yayınlanmış olmalı) payload olarak takılır; yoksa NEXT CASE kaydı atlanır ve end-screen "best for viewer" / playlist / subscribe öğesiyle kapanır. Bu sistem hangi case'in sıradaki olacağına karar vermez.
- **Kalibrasyon demosu:** payload = **J40 (demo payload B)** — yalnız sistemin farklı bir nesneye uyarlanabildiğini göstermek için; numara `CASE 00X` (yer tutucu). "CASE 002 = J40" veya "sıradaki yayın J40" kararı üretmez; J40 hakkında olgu cümlesi yoktur.
- **Akış (demo):**
  1. **PAYOFF (görsel):** G4'ün boş yuvalı tesis çizimi + G2'nin boşluğu bu kez üç blokla **büyük ölçüde** dolar (≈1,9M $ / ≈2M $, C-06; kalan pay etiketsiz bırakılır).
  2. **CHANNEL PROMISE / BRIDGE:** köprü cümlesi (C-11 / Q-02).
  3. **NEXT CASE:** Case Line tesis çiziminden çıkar, Savannah işareti yuvadan kalkar; aynı çizgi demo payload'ın hero object'ini (J40 motoru) kaydeder ve `CASE 00X · WESTINGHOUSE J40` indeksini yazar.
  4. **END-SCREEN DÜZENİ:** kayıt canlı ama sakin kalır; YouTube öğelerinin geleceği bölge(ler) Case Line ile çerçevelenmiş boş "sonraki dosya" alanıdır; altına sahte düğme/kart çizilmez (öğeleri YouTube çizer). Anlatı kapanışı bu alanla çakışmaz.
  5. **OPTIONAL SUBSCRIBE:** en fazla tek kısa cümle veya hiç.
- **Kanıt (HARD):** gerçek yayında next-case hakkında söylenen her olgu o case'in doğrulanmış ledger satırına dayanır; demo'da olgu cümlesi yoktur.
- **Platform:** end screen öğeleri videonun son bölümüne eklenir (yaygın bilinen aralık 5–20 sn — `[VARSAYIM]`, production öncesi YouTube resmî Yardım sayfasından ve Studio'dan doğrulanır).
- **Neden:** Final izleyiciyi kanaldan çıkarmak yerine bir sonraki nesneye merak bağlar; CTA hikâyenin son görsel sonucundan doğduğu için reklam gibi yapışmaz.

## 4. Founder değerlendirmesi
- CTA reklam arası gibi mi geliyor? Kanalın doğal bir parçası mı? (C1)
- Final beni bir sonraki case'e götürmek istiyor mu? (E1)
- Sonraki case kaydı, CASE 001'in intro'sunu hatırlatıyor mu? (E1 + demo payload I-B)
