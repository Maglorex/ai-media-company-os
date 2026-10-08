# Faz 1 / Stage A — Küme 1: Tarih, Kültür ve Hikâye Anlatımı

> Tarih: 2026-10-06 · Hazırlayan: research-analyst · Çerçeve: `niche-evaluation-framework.md` v1.0 (D-006)
> Araştırma sorusu: Tarih/kültür/hikâye kümesinde, eleme kapısını geçen ve 12 kriterle geçici puanlanmış en güçlü aday nişler hangileridir?
> Kapsam dışı: diğer kümeler, Stage B derin doğrulama (50 fikir listesi, ayrıntılı RPM), karar verme.

## Özet (≤5 madde)
1. Eleme kapısını geçen 6 aday puanlandı (geçici, /100): **C. "Neden oldu?" nedensellik tarih anlatıları 81,0** · A. Felaket/mühendislik başarısızlığı belgeselleri 74,2 · E. İş/imparatorluk/dolandırıcılık tarihi 74,8 · B. Medeniyet çöküşü ve imparatorluk uzun anlatıları 74,4 · D. Mitoloji/folklor 74,4 · F. Arkeoloji/antik gizemler 66,8. A–E arası fark ≤ ~7 puan; geçici puanlarda bu fark gürültü içindedir (C hariç net öne çıkan yok).
2. Talep gerçek ve büyük: tarih/felaket kanallarında 250K–5M abone, video başı ortalama 180K–880K izlenme `[VERİ]` (üçüncü taraf agregatör, Eki 2026). Zayıf sinyal: mitoloji ve "gizem" kanallarında abone/izlenme oranı çok düşük (ör. 2,4M abone / 8,9K ort.) `[VERİ]` → bu alanlar AI-slop ile dolu.
3. Politika: Faceless + AI ses **yasak değil**; riskli olan şablonlu/seri üretim, yeniden kullanım ve gerçekçi sentetik görüntüyü açıklamamak `[VERİ]` (resmi YouTube kaynakları). Ocak 2026'dan beri "AI slop" temizliği aktif `[VERİ]`.
4. Veri sınırı: kanal-düzeyi sayılar tek tip üçüncü taraf kaynaktan (SponsorRadar/OutlierKit); YouTube Studio, retention, arama hacmi (Google Trends) ve gerçek RPM bu turda **elde edilemedi** → ilgili puanlar "geçici".
5. Önerilen Stage B listesi: **C, A, E** (+ B'yi C'nin alt-serisi olarak test etmek). D ve F geri planda.

## Politika ve kısıt kapısı (resmi kaynaklar)
| Konu | Bulgu | Etiket | Kaynak (erişim 2026-10-06) |
|---|---|---|---|
| Inauthentic content | 15 Tem 2025'te "repetitious content" adı "inauthentic content" oldu; "şablonla üretilmiş görünen" ve tekrarlı/seri üretilen içerik YPP'de gelir getirmez | [VERİ] | https://support.google.com/youtube/answer/1311392 |
| Reused content | Başkasının içeriğini minimum değişiklikle alıp "kendi işi" yapmak ihlal; anlamlı özgün yorum/dönüşüm/eğitsel değer gerekli | [VERİ] | https://support.google.com/youtube/answer/1311392 |
| AI persona | Hassas konularda (sağlık, hukuk, finans, siyaset) insan uzman gibi sunulan AI persona monetize edilemez | [VERİ] | https://support.google.com/youtube/answer/1311392 |
| AI açıklama | Gerçek kişiyi yapmadığı şeyi yaparken gösteren, gerçek olay/yeri değiştiren veya gerçekçi, yaşanmamış sahne üreten içerik açıklanmalı; gerçekçi olmayan/animasyon, AI ile senaryo/başlık/thumbnail/fikir üretimi muaf. Tutarlı ihlal: içerik kaldırma/YPP askıya alma | [VERİ] | https://support.google.com/youtube/answer/14328491 |
| AI slop | CEO mektubu (21 Oca 2026): "düşük kaliteli AI içeriğin yayılmasını azaltma" öncelik; mevcut spam/clickbait sistemleri üzerine inşa | [VERİ] | https://blog.youtube/inside-youtube/the-future-of-youtube-2026/ |
| Slop kanal kaldırmaları | Kapwing raporuna göre ≥16–18 AI kanalı kaldırıldı/gizlendi (35M abone); haber aktarımı ikincil | [VARSAYIM] (ikincil) | https://tubefilter.com/2026/01/29/youtube-ai-slop-channel-crackdown-bans/ |
| AI ses yasak mı | Resmi sayfa yasaklamıyor; ikincil kaynaklar "TTS yasak değil, seri/düşük emek hedef" diyor; YouTube güncellemeyi "küçük güncelleme" olarak nitelemiş | [VARSAYIM] (resmi sayfa ses/TTS'e açıkça değinmiyor) | https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660 |
| Reklam verenlere uygun içerik | Kanlı/ceset/kaza fotoğrafı odaklı, bağlamsız içerik gelir getirmez; belgesel/eğitsel bağlamda trajedi anlatısı gelir alabilir (sömürücü olmamak şartı) | [VERİ] | https://support.google.com/youtube/answer/6162278 |
| Görsel lisans | Wikimedia Commons: CC BY/BY-SA/CC0 ve public domain; ABD federal hükümet eserleri çoğunlukla PD | [VERİ] | https://commons.wikimedia.org/wiki/Commons:Licensing |

## Elendi (eleme kapısı) — puanlanmadı
| Model | Neden elendi | Etiket |
|---|---|---|
| Ancient-aliens / sahte-arkeoloji / "gizli bilgi" anlatıları | Yanlış bilgi + bağlamsız clickbait; slop temizliğinin birincil hedefi; orijinal ve güvenli anlatı kurulamaz. (Arkeolojinin kanıta dayalı hali aday F olarak kaldı.) Not: misinformation politikası bu turda resmi sayfadan okunmadı | [VARSAYIM] |
| Grafik gerçek suç (cesedi/kaza fotoğrafını öne çıkaran) | Reklam verenlere uygun içerik: "bağlamsız ceset/kaza fotoğrafı" gelir getirmez | [VERİ] (6162278) |
| Yaşayan kişilere yönelik skandal/suç ifşaları | İftira ve hukuki risk; politika riski değil ama "politika/hukuk riskini artıran model" | [VARSAYIM] |
| Wikipedia/Reddit/haber özeti seslendirmesi, "top 10" derlemeleri | Reused/inauthentic content riski | [VERİ] (1311392) |
| "Gerçek arşiv görüntüsü" gibi sunulan AI videolar/yeniden canlandırmalar | Gerçekçi sentetik sahne → açıklama zorunlu, güven/etik riski; stilize/gerçekçi olmayan görsel kullanımı elenmedi | [VERİ] (14328491) |
| Günlük/haftalık yüksek hacimli şablon kanal | Inauthentic content; ayrıca şirket ilkesi "kalite > miktar" | [VERİ] |

## Veri notları (okumadan önce)
- Kanal ölçekleri ve video izlenmeleri **SponsorRadar** (https://sponsorradar.com/channels/…) ve **OutlierKit** sayfalarından, 2026-10-06 erişimiyle alındı; son yayın tarihleri Eylül–Ekim 2026. Tek agregatör → [VERİ] ama tek kaynaklı; ortalama izlenme = son video örneklemi, medyan değil.
- Şüpheli/çelişkili veriler: Fall of Civilizations sayfasında her bölüm iki kez listelenmiş (video + olası podcast/yeniden yükleme) → ortalama şişmiş olabilir; Biographics 2,4M abone / 11,9K ort. izlenme ve "[re: Upload]" etiketi (yeniden yükleme) → yorumlanmadı; OSP ortalaması (102K) yeniden yükleme/podcast içerir.
- **Kullanılmadı:** autonolab.com "faceless history" tablosu (ör. 1,8K aboneli kanalda 538K ort. izlenme; kendisi "legacy, re-review pending" diyor) → güvenilmez.
- Google Trends / YouTube arama hacmi ve gerçek RPM erişilemedi (aracımız yok); RPM yalnızca genel/dolaylı sinyal.
- 12 aydan eski veri kullanılmadı; kanal verileri güncel (Eki 2026).

---

## Aday C — "Neden oldu?" nedensellik odaklı tarih anlatıları (1500–1990, 10–25 dk)
**Tanım:** Önemli tarihsel olayların nedenini, tek bir soru etrafında (harita, arşiv görseli, kısa diyagram) açıklayan orijinal, soru-başlıklı long-form anlatılar.
**Hedef izleyici:** 16–45 yaş, tarih meraklıları + AP/A-level/üniversite öğrencileri, İngilizce küresel kitle.
**5 video fikri:** (1) Why Did the Ottoman Empire Enter WW1 on Germany's Side? (2) Why Did the Dutch Golden Age End So Fast? (3) Why Did the Soviet Union Not Collapse in 1953? (4) Why Did Japan Choose Isolation for 200 Years? (5) Why Did the Library of Alexandria Really Disappear?
**Rakipler:** History Matters (1,9M abone, ~618K ort., ~1,3 video/ay; Eylül 2026 videoları 0,9–1,2M) · The Armchair Historian (2,5M, ~349K) · Real Time History (757K, ~258K) · Simple History (5,1M, ~220K). Kaynak: https://sponsorradar.com/channels/historymatters , /thearmchairhistorian , /realtimehistory , /simplehistory (erişim 2026-10-06; tek kaynak).
| # | Kriter (ağırlık) | Puan | Gerekçe | Etiket |
|---|---|---|---|---|
| 1 | Talep (12) | 5 | 4 rakipte 220K–618K ort. izlenme; İngilizce küresel; abone/izlenme oranı sağlıklı. Arama hacmi ölçülmedi | [VERİ] (geçici: arama hacmi yok) |
| 2 | Retention (10) | 4 | Soru-cevap anlatı 10–25 dk'da tutulabilir; retention verisi görülemedi | [VARSAYIM] geçici |
| 3 | Evergreen (10) | 5 | Konular zamansız; History Matters öğrenci arama talebine hitap ediyor | [VERİ]+[VARSAYIM] |
| 4 | Konu havuzu (10) | 5 | Binlerce olay/dönem; 50 fikir Stage B'de listelenecek (şimdilik 5 örnek) | [VARSAYIM] geçici |
| 5 | Title/thumbnail (8) | 4 | "Why didn't the Dutch also scramble Africa?" tipi soru başlıkları 0,5–1,2M görüyor | [VERİ] |
| 6 | Farklılaşma (8) | 2 | Çok kalabalık, güçlü rakipler; açık boşluk (ör. Avrupa dışı nedensellik, "yanlış bilinenler") henüz kanıtlanmadı | [TAHMİN] geçici |
| 7 | AI üretimde kalite (8) | 4 | Açıklayıcı ton ElevenLabs'e uygun; haritalar/diyagram ile akış; olgusal doğruluk kontrolü şart | [TAHMİN] |
| 8 | Telif/reused riski (8) | 4 | PD arşiv/sanat (Commons, NARA); risk: Wikipedia'dan türetme → özgün sentez zorunlu | [VERİ] (lisans) + [TAHMİN] |
| 9 | Gelir (8) | 3 | RPM ölçülemedi (genel aralık $2–10 [VARSAYIM]); sponsor örnekleri var (Nebula vb.); AdSense dışı seçenekler net değil | [VARSAYIM] geçici |
| 10 | Kaynak/görsel (7) | 4 | Bol akademik kaynak ve PD görsel; 20. yy sonrası görsel kısıtlı | [VARSAYIM] |
| 11 | Üretim süresi/maliyet (7) | 3 | Harita/animasyon emeği; tahmini 15–25 saat/video | [TAHMİN] |
| 12 | Zamana duyarsızlık (4) | 5 | Zamansız | [VARSAYIM] |
**Toplam: 81,0 / 100 (geçici).** Hesap: 12+8+10+10+6,4+3,2+6,4+6,4+4,8+5,6+4,2+4 = 81,0.
**En büyük belirsizlik:** Farklılaşma — yeni, ilk kanalın bu doymuş alanda nasıl öne çıkacağı; ayrıca yeni kanal outlier/ilk-1000-abone verisi bulunamadı.

## Aday A — Felaket ve mühendislik başarısızlığı belgeselleri
**Tanım:** Köprü çöküşleri, sanayi kazaları, gemi/uçak/baraj felaketlerini resmi soruşturma raporlarına dayanarak "neden başarısız oldu" anlatısıyla (diyagram + arşiv) anlatan 10–20 dk belgeseller.
**Hedef izleyici:** 20–55, mühendislik/güvenlik meraklıları ve belgesel izleyicileri.
**5 video fikri:** (1) The Real Reason the Tacoma Narrows Bridge Fell (rapor + rüzgâr tüneli) (2) Texas City 1947: The Ammonium Nitrate Disaster (3) What Went Wrong at the Vajont Dam (4) The Hyatt Regency Walkway Collapse and One Design Change (5) The St. Francis Dam: Engineer's Last Mistake
**Rakipler:** Plainly Difficult (1,1M, ~184K ort., ~4,7 video/ay; son video 60K–474K) · Fascinating Horror (1,5M, ~388K, ~4/ay; Eylül 2026'da 0,24–2,2M) · Brick Immortar (401K, ~885K ort., 0,3 video/ay; 2024 videosu 2,5M) · Disaster Breakdown (263K, ~200K, havacılık). Kaynak: https://sponsorradar.com/channels/plainlydifficult , /fascinatinghorror , /brickimmortar , /disasterbreakdown (erişim 2026-10-06; tek kaynak).
| # | Kriter | Puan | Gerekçe | Etiket |
|---|---|---|---|---|
| 1 | Talep (12) | 4 | 4 kanalda 184K–885K ort.; küçük kanal (Brick 401K) bile 0,5–2,5M video alıyor | [VERİ] (tek agregatör) |
| 2 | Retention (10) | 4 | Kronolojik gerilim doğal; retention verisi yok | [VARSAYIM] geçici |
| 3 | Evergreen (10) | 4 | 2024–2025 videoları hâlâ 1,2–2,5M; ancak güncel olay (Baltimore köprüsü) ilgisi hızlı düşer | [VERİ] |
| 4 | Konu havuzu (10) | 5 | NTSB/CSB/MAIB raporları ve tarihi felaketler çok; 50 fikir Stage B | [VARSAYIM] geçici |
| 5 | Title/thumbnail (8) | 4 | "Every Corner Cut Led to 27 Lives Lost" 474K; dürüst merak boşluğu kurulabilir | [VERİ] |
| 6 | Farklılaşma (8) | 3 | Büyükler var ama niş hâlâ büyük; boşluk: neden-sonuç mühendislik açıklaması + animasyon. Kanıt yok | [TAHMİN] geçici |
| 7 | AI üretimde kalite (8) | 3 | Teknik doğruluk/halüsinasyon riski; saygılı ton; diyagram üretimi emek | [TAHMİN] |
| 8 | Telif/reused (8) | 3 | Devlet raporları çoğunlukla PD; ancak haber/kaza fotoğrafları telifli; grafik görsel gelir kısıtı | [VERİ] (6162278, Commons) |
| 9 | Gelir (8) | 3 | FH için tahmini $9,3–23K/ay (3. taraf, sadece reklam); sponsor çok az (FH 0, DB'de Ground News/Brilliant) | [VERİ] (3. taraf tahmin) + [VARSAYIM] |
| 10 | Kaynak/görsel (7) | 4 | Resmi raporlar bol; özgün diyagram/3D ile görsel yaratılabilir | [VARSAYIM] |
| 11 | Üretim süresi/maliyet (7) | 3 | Rapor okuma + diyagram; ~20 saat/video | [TAHMİN] |
| 12 | Zamana duyarsızlık (4) | 4 | Çoğu evergreen | [VARSAYIM] |
**Toplam: 74,2 / 100 (geçici).**
**En büyük belirsizlik:** Reklam verenlere uygunluk ("limited ads") ve görsel malzeme telif/graflık dengesi; ayrıca küçük bir kanalın 0'dan nasıl çıkacağı.

## Aday E — İş, imparatorluk ve dolandırıcılık tarihi (korporasyon kökenleri, tarihî mali skandallar)
**Tanım:** Tarihî iş imparatorluklarının yükseliş-çöküş ve mali skandal hikâyelerini, belgelenmiş ve çoğunlukla ölmüş/tarihî figürler üzerinden narratif anlatma.
**Hedef izleyici:** 22–50, iş/finans meraklısı genel izleyici.
**5 video fikri:** (1) The South Sea Bubble: First Great Financial Mania (2) How the East India Company Became a State (3) Standard Oil's Breakup: What Really Happened (4) The Tulip Mania Myth (5) Samuel Insull: The Utilities Tycoon Who Fell in 1932
**Rakipler:** Business Casual (1,1M abone, ~1,1M ort.; en iyi videolar 5,1–5,6M; **3 yıldır video yok**, OutlierKit) · ColdFusion (5,3M, ~709K, ~2,3/ay; teknoloji/iş güncel) · (Wendover Productions doğrulanamadı). Kaynak: https://outlierkit.com/channel/businesscasual , https://sponsorradar.com/channels/coldfusion (erişim 2026-10-06; tek kaynak).
| # | Kriter | Puan | Gerekçe | Etiket |
|---|---|---|---|---|
| 1 | Talep (12) | 4 | Business Casual 1,1M ort., üç outlier 5M+; ColdFusion 709K. Aktif rakip az görünüyor ama kapsam dar örneklemle | [VERİ] (tek kaynak) |
| 2 | Retention (10) | 4 | Karakter odaklı anlatı; veri yok | [VARSAYIM] geçici |
| 3 | Evergreen (10) | 5 | BC 3 yıl yüklemesiz hâlâ büyük izlenme alıyor (evergreen kanıtı) | [VERİ] (tek kaynak) |
| 4 | Konu havuzu (10) | 5 | Şirketler, tycoon'lar, kriz/çöküşler bol | [VARSAYIM] geçici |
| 5 | Title/thumbnail (8) | 4 | "How Rockefeller Built His Trillion Dollar Oil Empire" tipi güçlü | [VERİ] |
| 6 | Farklılaşma (8) | 2 | Belirgin bir boşluk kanıtlanmadı; tarihî iş anlatısı BC dışında dolu mu bilinmiyor | [TAHMİN] geçici |
| 7 | AI üretimde kalite (8) | 3 | Finansal/hukuki olgu doğruluğu; "AI uzman persona" kuralı için kanal dili dikkatli olmalı | [TAHMİN] |
| 8 | Telif/reused (8) | 3 | Eski dönem PD; modern şirket logoları/videoları telifli; yaşayan CEO'lar iftira riski → yalnızca tarihî dönem | [VARSAYIM] |
| 9 | Gelir (8) | 4 | Finans yanlısı kitle için yüksek RPM beklentisi (ölçülmedi); sponsor (Brilliant vb.); e-posta/kitap gibi alternatifler olası | [VARSAYIM] geçici |
| 10 | Kaynak/görsel (7) | 3 | Tarihî fotoğraf/gazete PD, modern kısıtlı | [VARSAYIM] |
| 11 | Üretim süresi/maliyet (7) | 3 | Araştırma yoğun; ~20 saat/video | [TAHMİN] |
| 12 | Zamana duyarsızlık (4) | 4 | Tarihî konular zamansız; güncel skandallar değil | [VARSAYIM] |
**Toplam: 74,8 / 100 (geçici).**
**En büyük belirsizlik:** Business Casual'ın uzun süredir pasif olması: talep boşluğu mu, yoksa tek kaynaklı/yanıltıcı bir veri mi? Ayrıca RPM/sponsor gerçeği ölçülmedi.

## Aday B — Medeniyet çöküşü ve imparatorluk uzun anlatıları (antik/ortaçağ, 30–120 dk)
**Tanım:** Bir medeniyetin yükseliş ve çöküşünü, derinlemesine araştırılmış uzun belgesel anlatı olarak aktaran yapımlar.
**Hedef izleyici:** 25–55, derinlik arayan tarih izleyicisi.
**5 video fikri:** (1) The Collapse of the Hittite Empire (2) Great Zimbabwe: A City Without a Written Record (3) Cahokia: Rise and Silent End (4) The Byzantine Empire Under Heraclius (5) Angkor: Water, Empire and Decline
**Rakipler:** Fall of Civilizations (1,5M abone, ~852K ort. — veri şüpheli; son bölüm 425K–570K, 0,7 video/ay) · Historia Civilis (1,1M, ~877K ort.; 0,1 video/ay; Nis 2026'da 696K) · Kings and Generals (4,2M, ~310K ort., 12 video/ay). Kaynak: https://sponsorradar.com/channels/fallofcivilizations , /historiacivilis , /kingsandgenerals ; https://creatordb.app/creatorstats/kingsandgenerals/ (erişim 2026-10-06).
| # | Kriter | Puan | Gerekçe | Etiket |
|---|---|---|---|---|
| 1 | Talep (12) | 4 | 300K–880K ort.; ama bu sayılar nadir üretilen yüksek prodüksiyonlu işlerden | [VERİ] |
| 2 | Retention (10) | 5 | Saatlik videolar 1M–2M alıyor (FoC "Mongols" 1,1–2M) → uzun anlatı tutuyor; resmi retention yok | [VERİ] dolaylı |
| 3 | Evergreen (10) | 5 | Kanıt: yıllar sonra da görüntülenen bölümler | [VERİ]/[VARSAYIM] |
| 4 | Konu havuzu (10) | 5 | Sonsuz | [VARSAYIM] geçici |
| 5 | Title/thumbnail (8) | 3 | "Collapse of X" kalıbı merak boşluğu kurar ama keskinliği sınırlı | [TAHMİN] |
| 6 | Farklılaşma (8) | 2 | Elit rakipler onlarca yıllık uzmanlık ve insan sesi/edebî stile dayanıyor | [TAHMİN] geçici |
| 7 | AI üretimde kalite (8) | 2 | Saatlik anlatıda edebî yazım ve insan ses performansı belirleyici; ElevenLabs hazır sesleriyle uzun formda yorgunluk riski | [TAHMİN] |
| 8 | Telif/reused (8) | 4 | Antik sanat/müze açık erişimi PD; kendi haritalar; kitap parafrazı riski | [VARSAYIM] |
| 9 | Gelir (8) | 3 | RPM ölçülmedi; kitap (Paul Cooper örneği), Nebula/sponsor; fakat başlangıçta düşük frekans | [VARSAYIM] |
| 10 | Kaynak/görsel (7) | 4 | PD sanat ve haritalar bol | [VARSAYIM] |
| 11 | Üretim süresi/maliyet (7) | 2 | 40–80 saat/video ve düşük frekans; 40 saat/hafta Founder'a ağır | [TAHMİN] |
| 12 | Zamana duyarsızlık (4) | 5 | Zamansız | [VARSAYIM] |
**Toplam: 74,4 / 100 (geçici).**
**En büyük belirsizlik:** AI sesle + tek kişiyle kısa sürede kalite eşiğini tutturmak; yeni kanal için 30–120 dk video riskli ilk adım.

## Aday D — Mitoloji ve folklor anlatıları
**Tanım:** Dünya mitolojilerini ve folklorunu (Yunan, Norse, Mezopotamya, Hint, Afrika vb.) hikâye merkezli, birincil metinlere dayalı anlatma.
**Hedef izleyici:** 16–40, fantezi/oyun/edebiyat meraklıları.
**5 video fikri:** (1) The Epic of Gilgamesh in 20 Minutes (2) Why Norse Myths Survived Only Through Christian Writers (3) The Original Orpheus Myth (4) Yoruba Orisha Creation Story (5) The Mabinogion: Wales's Lost Epic
**Rakipler:** Overly Sarcastic Productions (2,6M abone, ~102K ort., ~7/ay; son videolar 48K–661K; yeniden yükleme içerir) · Mythology & Fiction Explained (1,54M abone, ort. izlenme bulunamadı; vidIQ, erişilemedi) · See U in History/Mythology (2,4M abone, ~8,9K ort., ~21 video/ay) · Mythology Explained (220K, ~12,7K ort.). Kaynak: https://sponsorradar.com/channels/overlysarcasticproductions , /seeuinhistory , /mythologyexplained (erişim 2026-10-06; tek kaynak).
| # | Kriter | Puan | Gerekçe | Etiket |
|---|---|---|---|---|
| 1 | Talep (12) | 3 | İlgi var (2026 Odyssey filmi tartışmaları 7K–661K); fakat çok abonelili kanallarda 9K–13K ort. izlenme zayıf talep/kalite karışımı | [VERİ] (tek kaynak) geçici |
| 2 | Retention (10) | 4 | Hikâye doğası güçlü; veri yok | [VARSAYIM] geçici |
| 3 | Evergreen (10) | 5 | Zamansız | [VARSAYIM] |
| 4 | Konu havuzu (10) | 5 | Sonsuz | [VARSAYIM] |
| 5 | Title/thumbnail (8) | 4 | Güçlü anlatı başlıkları mümkün | [TAHMİN] |
| 6 | Farklılaşma (8) | 2 | Çok sayıda seri AI/slop kanalı; yeni içerik kaybolur. Boşluk: kültürel olarak az bilinen tradisyonlar | [TAHMİN] geçici |
| 7 | AI üretimde kalite (8) | 3 | Hikâye ses/ton için uygun; ama jenerik AI görseller slop görünümü verir | [TAHMİN] |
| 8 | Telif/reused (8) | 4 | Antik metin ve sanat PD; modern çeviriler telifli → PD çeviri veya kendi çevirimiz | [VERİ] (Commons) + [TAHMİN] |
| 9 | Gelir (8) | 2 | Mythology Explained için tahmini reklam geliri $228–$570/ay (3. taraf); sponsor yok; AdSense dışı seçenek belirsiz | [VERİ] (3. taraf) geçici |
| 10 | Kaynak/görsel (7) | 4 | PD metin/sanat bol | [VARSAYIM] |
| 11 | Üretim süresi/maliyet (7) | 4 | Araştırma yükü düşük–orta | [TAHMİN] |
| 12 | Zamana duyarsızlık (4) | 5 | Zamansız | [VARSAYIM] |
**Toplam: 74,4 / 100 (geçici).** Not: Talep kriteri 3 puan; 2'ye düşerse toplam 72,0 ve koruma kuralı devreye girer (≤2).
**En büyük belirsizlik:** Talep gerçekten mi düşük, yoksa slop kanalların (21 video/ay) aşırı arzı mı izlenmeyi düşürüyor? Yüksek kaliteli bir kanalın bu ortamda nasıl performans göstereceği bilinmiyor.

## Aday F — Arkeoloji ve antik gizemler (yalnızca kanıta dayalı)
**Tanım:** Güncel arkeolojik bulguları ve tartışmalı antik sorunları, hakemli kaynaklara dayanarak ve spekülasyondan açıkça ayırarak anlatma.
**Hedef izleyici:** 20–55, genel merak ve antik tarih izleyicisi.
**5 video fikri:** (1) What We Actually Know About Göbekli Tepe (2) The Bronze Age Collapse: Competing Theories (3) Who Built Stonehenge? (4) Ötzi the Iceman: What the Evidence Shows (5) 10 Ancient "Facts" That Scholars Dropped
**Rakipler:** Origins Explained (3,9M abone, ~55,7K ort., ~28/ay) · World of Antiquity (358K, ~60K ort.; "10 Famous Ancient Events That Never Happened" 445K) · Zohar Ancient History (529K abone; sponsor Gaia). Kaynak: https://sponsorradar.com/channels/originsexplained , /worldofantiquity , /zoharancienthistory (erişim 2026-10-06; tek kaynak).
| # | Kriter | Puan | Gerekçe | Etiket |
|---|---|---|---|---|
| 1 | Talep (12) | 3 | 3,9M abone kanalda 55,7K ort.; küçük kanalda 60K | [VERİ] |
| 2 | Retention (10) | 3 | Liste/gizem formatı tutar ama gerilim sınırlı; veri yok | [VARSAYIM] geçici |
| 3 | Evergreen (10) | 4 | Güncel keşif temalı videolar eskir; temel konular kalır | [VARSAYIM] |
| 4 | Konu havuzu (10) | 5 | Bol | [VARSAYIM] geçici |
| 5 | Title/thumbnail (8) | 4 | Güçlü merak boşluğu; "dürüst" tutmak zor, clickbait'e kayma riski | [TAHMİN] |
| 6 | Farklılaşma (8) | 2 | Seri/slop formatlar dolu; kanıta dayalı tutum farklılık olabilir ama izlenme etkisi belirsiz | [TAHMİN] geçici |
| 7 | AI üretimde kalite (8) | 3 | Güncel bilimsel makale yorumunda doğruluk riski | [TAHMİN] |
| 8 | Telif/reused (8) | 3 | Basın fotoğrafları telifli; PD görsel sınırlı | [VARSAYIM] |
| 9 | Gelir (8) | 3 | Gaia gibi sponsorlar var; RPM bilinmiyor | [VERİ] (sponsor) + [VARSAYIM] |
| 10 | Kaynak/görsel (7) | 3 | Makaleler erişilebilir; görsel sınırlı | [VARSAYIM] |
| 11 | Üretim süresi/maliyet (7) | 3 | Makale okuma yoğun | [TAHMİN] |
| 12 | Zamana duyarsızlık (4) | 3 | "Yeni keşif" videoları hızlı eskir | [TAHMİN] |
**Toplam: 66,8 / 100 (geçici).**
**En büyük belirsizlik:** Politika/itibar riski (sahte-arkeoloji ile aynı arama alanında rekabet) ve dürüst başlıkla yeterli tıklanma sağlanıp sağlanamayacağı.

---

## Karşılaştırma (geçici)
| Aday | Toplam | En güçlü | En zayıf | Koruma kuralı (1–3 ≤2) |
|---|---|---|---|---|
| C. Nedensellik tarih | 81,0 | Talep, evergreen, havuz | Farklılaşma (2) | Geçer |
| E. İş/imparatorluk tarihi | 74,8 | Evergreen, havuz | Farklılaşma (2) | Geçer |
| B. Medeniyet çöküşü | 74,4 | Retention, evergreen | AI kalitesi (2), üretim süresi (2) | Geçer |
| D. Mitoloji | 74,4 | Evergreen, havuz | Gelir (2), farklılaşma (2) | Sınırda (talep 3) |
| A. Felaket/mühendislik | 74,2 | Talep, havuz | Farklılaşma, kalite, telif (3) | Geçer |
| F. Arkeoloji/gizem | 66,8 | Havuz | Farklılaşma (2), zamana duyarlılık | Geçer |

Biyografi (ayrı aday yapılmadı): Biographics 2,4M abone / 11,9K ort. izlenme (tek kaynak, şüpheli, yeniden yükleme) zayıf sinyal; bireysel biyografi içeriği C ve E içinde alt-seri olarak denenebilir.

## Belirsizlikler
1. **Yeni kanal gerçekçiliği:** Bulunan tüm veri kurulmuş kanallara ait; sıfırdan kanalların ilk 6–12 ay performansı ve outlier oranı (özellikle küçük kanal video başına izlenme) bulunamadı. Tek kaynak: OutlierKit'e göre 100K altı kanallarda medyan "5x outlier" 81K izlenme (genel, tarihe özgü değil; https://www.overseeros.com/blog/small-youtube-channels-million-view-study — dolaylı arama sonucu, doğrulanmadı) `[VARSAYIM]`.
2. **Retention ve arama hacmi:** Yok. Retention puanları [VARSAYIM]; talep puanı izlenme verisine dayanır.
3. **RPM:** Gerçek niş RPM'leri doğrulanmadı; üçüncü taraf tahminlerinin güvenilirliği düşük. Genel "çoğu kanal $2–10 RPM" ifadesi niş kanıtı değildir.
4. **H-001 (İngilizce/uluslararası):** Doğrudan test edilmedi; tüm incelenen kanallar İngilizce ve küresel izlenme topluyor. İzleyici coğrafyası/RPM bölgesel farkı bilinmiyor `[VARSAYIM]`.
5. **AI sesin 10–30 dk anlatıda kabulü:** Resmi kaynakta yasak değil, ama izleyici memnuniyeti kanıtı yok.
6. **Veri tek agregatöre bağlı** (SponsorRadar); hata/örnekleme sapması olabilir.

## Şirket için anlamı
- Üretim kısıtı (tek Founder, 40 saat/hafta) en çok **orta uzunlukta (10–25 dk), araştırma-yoğun ama animasyon-yoğun olmayan** formatlarla uyuşuyor: C ve A. B ağır, D düşük talep sinyalli, F politika/itibar riskli.
- Farklılaşma tüm adayların ortak zayıf noktası; niş seçimi kadar **açı** (alt-niş) seçimi belirleyici olacak (ör. A ile C'nin kesişimi: "neden başarısız oldu" nedensellik anlatısı; ya da Avrupa dışı tarih).
- Slop temizliği döneminde "özgün araştırma + insan editoryal kontrol + açıklanmış kaynaklar" hem politika hem rekabet hem de kalite avantajı olabilir.

## Birincil öneri
**Stage B'ye C, A ve E aday olarak taşınsın** (B, C'nin uzun-form alt-serisi olarak kontrol edilsin; D ve F elensin veya yedek kalsın). Stage B'de öncelik: (1) 50 fikir listesi, (2) küçük/yeni kanal outlier ve ilk 12 ay verisi, (3) ChatGPT ile gerçek arama hacmi ve niş RPM, (4) AI ses + diyagram ile 1 pilot video taslağı kalite testi (Founder onayı gerekmeyen yerel taslak).
Geri dönüş koşulu: Stage B'de küçük kanallarda 100K-altı outlier kanıtı bulunamazsa veya RPM < ~$2 çıkarsa C'nin önceliği yeniden değerlendirilir.

## ChatGPT ikinci görüşü gerekebilecek noktalar (research-request ile hazır prompt Stage B'de)
1. Aday başına Google Trends / YouTube arama hacmi (İngilizce, küresel, 5 yıl) ve talep/arz oranı.
2. Tarih/felaket/iş tarihi nişleri için doğrulanmış RPM ve AdSense dışı gelir örnekleri (kaynaklı).
3. 2025–2026'da sıfırdan başlayıp 12 ayda 50K+ abone yapan faceless tarih/felaket kanalları (kanal adı, ilk 10 video izlenmesi).
4. İngilizce AI ses (ElevenLabs hazır sesleri) ile 10–25 dk anlatıda izleyici kabulü ve YPP deneyimleri.
5. Business Casual inaktivitesi ve kategori boşluğu; Fall of Civilizations / Biographics veri çelişkilerinin doğrulanması.

## Kaynaklar (erişim 2026-10-06)
- https://support.google.com/youtube/answer/1311392 · https://support.google.com/youtube/answer/14328491 · https://support.google.com/youtube/answer/6162278 · https://blog.youtube/inside-youtube/the-future-of-youtube-2026/ (yayın 2026-01-21) · https://commons.wikimedia.org/wiki/Commons:Licensing
- https://tubefilter.com/2026/01/29/youtube-ai-slop-channel-crackdown-bans/ (ikincil) · https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660 (ikincil)
- SponsorRadar kanal sayfaları (tek agregatör): historymatters, thearmchairhistorian, realtimehistory, simplehistory, plainlydifficult, fascinatinghorror, brickimmortar, disasterbreakdown, fallofcivilizations, historiacivilis, kingsandgenerals, markfeltonproductions, overlysarcasticproductions, seeuinhistory, mythologyexplained, originsexplained, worldofantiquity, coldfusion, biographics — https://sponsorradar.com/channels/<ad>
- https://outlierkit.com/channel/businesscasual · https://outlierkit.com/channel/practicalengineeringchannel · https://creatordb.app/creatorstats/kingsandgenerals/
