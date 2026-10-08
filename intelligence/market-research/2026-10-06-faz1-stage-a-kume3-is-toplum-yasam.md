# Faz 1 / Stage A — Küme 3: Para, İş, Toplum ve Yaşam

> Tarih: 2026-10-06 · Hazırlayan: research-analyst · Çerçeve: `niche-evaluation-framework.md` v1.0 (eleme kapısı + 12 kriter, ağırlıklı /100)
> Araştırma sorusu: Para/iş/toplum/yaşam kümesinde, İngilizce faceless long-form YouTube için eleme kapısını geçen ve hızlı puanlanabilen aday nişler hangileridir?
> Kapsam dışı: diğer kümeler, derin doğrulama (Stage B), 50 fikir listesi, üretim hattı tasarımı.
> Tüm erişim tarihleri: 2026-10-06. Tüm puanlar **geçici** (Stage A hızlı puanlama).

## 1. Özet
- 6 aday puanlandı: **D Ekonomik/finansal tarih hikâyeleri (77,6)**, **A Marka/şirket yükseliş-çöküş hikâyeleri (72,6)**, **B Ülke-ekonomi anlatıları (69,4)**, **F Endüstri/tedarik zinciri açıklayıcıları (67,8)**, **C Jeopolitik stratejik açıklayıcılar (64,0)**, **E Animasyonlu pop-psikoloji (60,8; kritik koruma kuralına takılır)**.
- Kümedeki en büyük açık veri sorunu: RPM kaynakları birbiriyle çelişiyor (bir kaynakta Business & Finance medyan RPM ≈ $2, başka kaynaklarda $10–25 "CPM/RPM" iddiası). RPM düşük ağırlıklı olduğu için sıralamayı etkilemedi, ama gelir kriteri (9) kesinlikle geçici.
- Kümenin en güçlü yapısal bulgusu: iş/ekonomi anlatılarında büyük kanallar 650K–1.1M ortalama izlenme alıyor (talep gerçek), ancak A, B, C, F doygun; fark yaratma (kriter 6) bu aday kümesinin ortak zayıf noktası. D en az doygun görünüyor, ancak bu doğrudan veriyle doğrulanmadı.
- Politika: resmi kaynaklara göre şablonlu/birbirinin yerine geçen AI içerik monetizasyon dışı kalma riski taşıyor; AI senaryo/ses yardımı açıklama gerektirmiyor, gerçekçi sahte görsel/olay gerektiriyor. Bu, E'yi (şablon pop-psikoloji) en riskli, araştırma-ağırlıklı anlatıları görece güvenli yapıyor.
- ChatGPT ikinci görüşü gereken noktalar bölüm 5'te.

## 2. Resmi politika bulguları (eleme kapısı için)
| Konu | Bulgu | Etiket | Kaynak (erişim 2026-10-06) |
|---|---|---|---|
| Inauthentic content | "Repetitious" → "inauthentic content" olarak yeniden adlandırıldı (Temmuz 2025). Şablonla üretilmiş, videodan videoya birbirinin yerine geçen, "generic or unoriginal templates" ile AI üretimi toplu içerik monetize edilemez. Başkasının içeriğini minimal değişiklikle kullanmak yasak. Monetize içerik "your original creation" olmalı. | [VERİ] | https://support.google.com/youtube/answer/1311392 |
| AI/sentetik içerik açıklaması | Gerçek kişiyi söylemediği şeyi söylerken gösteren, gerçek olayı/yeri değiştiren, gerçekçi ama olmamış sahne üreten içerik açıklanmalı. Senaryo/başlık/thumbnail/infografik için üretken AI yardımı açıklama gerektirmez. Gerçekçi olmayan (fantastik/animasyon) içerik gerekmez. | [VERİ] | https://support.google.com/youtube/answer/14328491 |
| Reklam verenlere uygunluk | Belgesel/eğitsel bağlam tüm kategorilerde monetizasyon lehine; "sensitive events" üzerinden trafik/kazanç sağlamak monetize edilemez; tıbbi yanlış bilgi reklamsız. Savaş/çatışma/tartışmalı konular için tam ücret/sınırlı reklam dağılımı videoya bağlı. | [VERİ] | https://support.google.com/youtube/answer/6162278 |
| Yanlış bilgi (misinformation) | Teknik olarak manipüle edilmiş veya yanlış atfedilmiş içerik (ör. eski çatışma görüntüsünü güncel diye sunmak) yasak. | [VERİ] | https://support.google.com/youtube/answer/10834785 |
| Finans tavsiyesi | **Resmi bir "finansal tavsiye" politika sayfası bulunamadı/doğrulanamadı.** Yalnızca üçüncü taraf haber (Hindistan odaklı finfluencer düzenlemesi) görüldü. | [VARSAYIM] | https://cafemutual.com/news/industry/30707-youtube-to-put-a-check-on-unauthorized-financial-advice (arama sonucu özeti, tek kaynak, ikincil) |

Not: Bir WebFetch denemesi (answer/12359768) 404 döndü; finans/sağlık tavsiyesi için resmi doğrulama eksik kaldı.

## 3. Eleme kapısını geçemeyenler (puanlanmadı)
| Aday | Neden elendi |
|---|---|
| Kişisel yatırım / hisse / kripto sinyali ve "nasıl zengin olurum" tavsiyesi | Kişisel finansal tavsiye riski, resmi politika belirsizliği + hukuki risk; yalnızca RPM yüzünden öne çıkarılmaz. (Tarihsel/anlatı biçimi D adayında ayrıca korunmuştur: tavsiye yok.) |
| Oyun / pop kültür lore (oyun içi görüntü ağırlıklı) | Anlatı yayıncıların telifli görsel/ses/müziğine bağımlı; görsel materyalin lisanslanması/orijinalliği zayıf; reused-content riski yüksek. Veri de zayıf (kanal ölçekleri bulundu, ancak gerçek video performansı doğrulanamadı). Geçici eleme; "gerçek orijinal görsel" yolu bulunursa yeniden açılabilir. |
| Kitap/self-help özeti ve "ders/verimlilik" özet kanalları | Başkasının eserini yeniden paketleme (özet); Practical Psychology gibi örnekler kitap incelemesi karışımı. Düşük değerli yeniden paketleme sınırı. |
| Haber/güncel olay tekrar anlatımı, tepki ve "breaking" finans haberi | Zamana aşırı duyarlı; kaynak içeriği yeniden paketleme riski; sensitive-event monetizasyon riski. |
| Ünlü servet/dedikodu, "zenginlerin sırları" tarzı listeler | Düşük değer/şablon; inauthentic content riski; doğrulanabilir kaynak zayıf. |
| Çöküş/komplo tonlu "doom" anlatıları | Yanlış bilgi/manipülasyon riski ve doğrulanamayan iddia; markaya zarar. |

## 4. Aday nişler

Genel veri notları: Kanal ölçekleri ve ortalama izlenmeler üçüncü taraf araç tahminleridir (OutlierKit, CreatorDB, vb.); resmi YouTube verisi değil. Gelir tahminleri ücretli/sponsorluk dahil ve doğrulanamaz. Tüm sayılar 2026 Temmuz–Eylül tarihli sayfalardan; 12 aydan eski veri kullanılmadı.

### A. Marka ve şirket yükseliş-çöküş hikâyeleri (consumer brand/business case stories)
- **Tanım:** Tanınmış markaların/şirketlerin karar, çatışma ve sonuçlarını belgelerle (başvuru dosyaları, mahkeme kayıtları, basın arşivi) anlatan 9–15 dk faceless belgesel.
- **Hedef izleyici:** 18–44, nostalji ve iş merakı olan, ABD/İngilizce ağırlıklı geniş kitle.
- **Örnek 5 fikir:** (1) "Why Blockbuster actually rejected Netflix (the documents)"; (2) "The Rise and Collapse of Toys R Us: the debt story"; (3) "How Crocs nearly died and came back"; (4) "What actually happened to Pan Am"; (5) "Why Boeing's culture changed after the merger".
- **Rakipler:** Company Man — 1.8M abone, ort. ~647K izlenme, en iyi 6.4M, ~1,2 video/hafta (https://outlierkit.com/channel/companyman114); Business Casual — 1.1M abone, ort. ~1.1M; MagnatesMedia — 1.9M abone, ort. ~757K; Wall Street Millennial — 366K abone, ort. ~96K (hepsi https://outlierkit.com/resources/faceless-business-documentary-channels/, 2026-07-27, tek kaynak).
- **Puan tablosu (ağırlık → puan):**

| # | Puan | Gerekçe | Etiket |
|---|---|---|---|
| 1 (12) | 4 | Büyük kanallarda 650K–1.1M ort.; talep kanıtlı ama büyük kanallar baskın | [VERİ] (tek kaynak, üçüncü taraf) |
| 2 (10) | 4 | Çatışma-karar-sonuç yapısı; kanallar 9–17 dk | [VARSAYIM] |
| 3 (10) | 4 | Eski videolar milyonlarca izleniyor ("Decline of…" formatı); kalıcılık beyanı üçüncü taraf | [VARSAYIM] |
| 4 (10) | 5 | Binlerce marka; 50 fikir kolay görünüyor (Stage B'de listelenecek) | [VARSAYIM] geçici |
| 5 (8) | 4 | "What happened?" kalıbı kanıtlı | [VERİ] başlık kalıbı / [VARSAYIM] dürüst merak |
| 6 (8) | 2 | Çok doygun; yeni kanalın açısı net değil | [VERİ] rakip sayısı |
| 7 (8) | 3 | Araştırma yoğun; AI olgusal hata riski; insan doğrulaması şart | [VARSAYIM] |
| 8 (8) | 3 | Logo/ürün görseli/arşiv kullanımı gri alan; orijinal anlatı güvenli | [VARSAYIM] |
| 9 (8) | 3 | Reklam: çelişkili RPM verisi; alternatif: B2B sponsorluk, e-posta bülteni, lisanslama | [VARSAYIM] / çelişkili [VERİ] |
| 10 (7) | 4 | SEC/mahkeme/basın kaynakları bol; görsel zayıf nokta | [VARSAYIM] |
| 11 (7) | 3 | Tek kişi için 16–28 saat/video tahmini (üçüncü taraf) | [VERİ] tek kaynak |
| 12 (4) | 4 | Çoğu evergreen; haber bağlantılı örnekler azalır | [VARSAYIM] |

  **Toplam: 72,6/100 (geçici).**
- **Gelir (kriter 9) somut:** AdSense; sponsorluk (iş/yazılım/finans araçları — ancak "satış/outreach yok" kuralı gereği gelen inbound teklifler); haber bülteni/web sitesi (organik, reklamla değil); ürün/şablon (dijital) ileride; affiliate (kitaplar vb., düşük). 
- **En büyük belirsizlik:** Doygun nişte yeni kanalın ilk 1–3 ayda ne tür izlenme alacağı (kanal büyüklüğü dağılımı/outlier verisi küçük kanallar için bulunamadı).

### B. Ülke-ekonomi anlatıları (country economies & macro video essays)
- **Tanım:** Bir ülkenin/bölgenin ekonomik hikâyesini veri ve haritalarla anlatan faceless video denemeleri.
- **Hedef izleyici:** 20–45, ekonomi/politika meraklısı, ABD/UK/Avustralya/Hindistan ağırlıklı.
- **Örnek 5 fikir:** (1) "How Argentina fell from top-10 economy"; (2) "Why Switzerland is rich: it isn't banks"; (3) "Japan's lost decades, explained with 5 charts"; (4) "Why Nigeria's economy can't take off"; (5) "The housing trap in Canada".
- **Rakipler:** Economics Explained — 2.9M abone, ort. ~840K, en iyi 14M, ~17 dk, ~1,2 video/hafta (https://outlierkit.com/channel/economicsexplained); Money & Macro — ~660K abone (dealroom listesi, https://app.dealroom.co/companies/money_macro; tek kaynak); PolyMatter / Wendover (rakamlar doğrulanamadı).
- **Puan:**

| # | Puan | Gerekçe | Etiket |
|---|---|---|---|
| 1 | 4 | Econ Explained ort. 840K; outlier'lar 3,6M–14M | [VERİ] (tek kaynak) |
| 2 | 4 | 17 dk ortalama uzunluk, kanal tutuyor | [VERİ] / [VARSAYIM] retention |
| 3 | 3 | OutlierKit: %65 evergreen/%35 güncel; veri eskir | [VERİ] tek kaynak |
| 4 | 4 | Ülke × açı çok; güncel olay bağımlılığı | [VARSAYIM] geçici |
| 5 | 4 | Çelişkili/karşıt başlıklar ("Why everyone is leaving…") | [VERİ] |
| 6 | 2 | Doygun | [VERİ] |
| 7 | 3 | Grafik/harita üretimi, rakam doğruluğu şart | [VARSAYIM] |
| 8 | 4 | Açık veri (World Bank/IMF vb.) ve kendi grafikleri | [VARSAYIM] |
| 9 | 3 | Politik temalarda "controversial issues" sınırlı reklam riski; RPM çelişkili | [VARSAYIM] |
| 10 | 4 | Resmi istatistikler bol; fotoğraf/footage sınırlı | [VARSAYIM] |
| 11 | 3 | Veri toplama + grafik; süre yüksek | [TAHMİN] |
| 12 | 3 | Güncel veri bağımlılığı | [VARSAYIM] |

  **Toplam: 69,4/100 (geçici).**
- **Gelir:** AdSense; sponsorluk (eğitim/yazılım); ücretsiz bülten/web sitesi; veri görselleri/lisanslama (düşük olasılık).
- **En büyük belirsizlik:** Politik/ekonomik tartışmalı konularda reklam kısıtı ve doğruluk yükü; ülke anlatılarında "yanlış bilgi" itibar riski.

### C. Jeopolitik stratejik açıklayıcılar (geopolitics & strategy explainers)
- **Tanım:** Güç dengeleri, coğrafi sınırlar ve stratejik rekabeti haritalarla açıklayan faceless belgesel-analiz.
- **Hedef izleyici:** 20–50, dünya işleri meraklısı, ağırlıklı erkek, ABD/UK/Hindistan.
- **Örnek 5 fikir:** (1) "Why the Strait of Malacca decides China's future"; (2) "How Turkey became a swing state"; (3) "Why Poland is rearming"; (4) "What the Arctic route changes"; (5) "Why India can't be bought by either side".
- **Rakipler:** RealLifeLore ~7,9M abone; Johnny Harris ~7,9M (CreatorDB özet, https://creatordb.app/creatorstats/reallifelore/ , erişim 2026-10-06); CaspianReport ~1,9M abone, son videolar 271K–573K, yılda +%0,5 büyüme (https://creatordb.app/creatorstats/caspianreport/).
- **Puan:**

| # | Puan | Gerekçe | Etiket |
|---|---|---|---|
| 1 | 4 | Dev kanallar + Caspian'da hâlâ 270–570K | [VERİ] |
| 2 | 4 | Haritalı anlatım | [VARSAYIM] |
| 3 | 3 | Yapısal coğrafya evergreen, savaş videoları değil | [VARSAYIM] |
| 4 | 4 | Dünya olayları sınırsız, ama güncel bağlı | [VARSAYIM] |
| 5 | 4 | "Why X keeps…" kalıbı | [VERİ] |
| 6 | 2 | Doygun, otorite/güven önemli | [VARSAYIM] |
| 7 | 3 | Siyasi hassasiyet, doğruluk riski | [VARSAYIM] |
| 8 | 3 | Haritalar açık; haber/savaş görüntüsü riskli, "misattributed" yasağı | [VERİ] politika |
| 9 | 2 | Çatışma/tartışmalı konu → sınırlı reklam riski; alternatif gelir zayıf | [VARSAYIM] |
| 10 | 3 | Haritalar kolay, footage sınırlı | [VARSAYIM] |
| 11 | 3 | Harita animasyonu emek ister | [TAHMİN] |
| 12 | 2 | Büyük kısmı güncel olaya bağlı | [VARSAYIM] |

  **Toplam: 64,0/100 (geçici).**
- **Gelir:** AdSense; bülten/web sitesi; Patreon benzeri üyelik (YouTube Üyelik, kanal büyüdüğünde); sponsorluk (VPN vb. inbound).
- **En büyük belirsizlik:** Zamana duyarlılık ve savaş/çatışma içeriğinin reklam durumu; CaspianReport'un düz büyümesi (+%0,5/yıl) türün doyduğuna işaret edebilir [VERİ tek kaynak].

### D. Ekonomik ve finansal tarih hikâyeleri (bubbles, crashes, scandals, currencies)
- **Tanım:** Piyasa balonları, bankacılık krizleri, para çöküşleri ve ticaret tarihini kişisel tavsiye vermeden anlatan belgesel biçimli anlatılar.
- **Hedef izleyici:** 22–50, tarih ve ekonomi meraklıları; yatırım meraklısı ama tavsiye aramayan.
- **Örnek 5 fikir:** (1) "Tulip mania: what the records actually say"; (2) "How Weimar hyperinflation really happened"; (3) "The South Sea Bubble"; (4) "Barings Bank: how one trader broke a 233-year-old bank"; (5) "Iceland's banking collapse".
- **Rakipler (doğrudan nişte net 2–3 rakip doğrulanamadı):** Economics Explained'in tarihî ekonomi videoları (https://outlierkit.com/channel/economicsexplained: "How the World's Richest Country Lost 90% of its GDP", 5,2M); Business Casual; Wall Street Millennial (366K abone, ~96K ort.). Saf "finansal tarih" kanalları için ek araştırma gerek.
- **Puan:**

| # | Puan | Gerekçe | Etiket |
|---|---|---|---|
| 1 | 3 | Dolaylı kanıt: komşu videolar milyonlar alıyor; saf tarih kanalı verisi yok | [VARSAYIM] geçici |
| 2 | 4 | Doğal hikâye yapısı | [VARSAYIM] |
| 3 | 5 | Tarih konuları zamana bağlı değil | [VARSAYIM] |
| 4 | 5 | Çok sayıda kriz/skandal | [VARSAYIM] geçici |
| 5 | 4 | "How one trader broke a bank" kalıbı | [VARSAYIM] |
| 6 | 3 | Görece daha az doygun görünüyor; doğrulanmadı | [VARSAYIM] |
| 7 | 3 | Araştırma yoğun; AI olgusal hata riski | [VARSAYIM] |
| 8 | 4 | Kamu malı eski görseller; orijinal anlatı | [VARSAYIM] |
| 9 | 3 | RPM çelişkili; finans bağlamı reklam verenler için çekici; alternatif: bülten, kitap affiliate | [VARSAYIM] |
| 10 | 5 | Kamu malı arşivler, eski basın, akademik kaynaklar | [VARSAYIM] |
| 11 | 3 | 16–28 saat tahmini (genel iş/finans belgeseli) | [VERİ] tek kaynak (genelleme) |
| 12 | 5 | Zamana duyarsız | [VARSAYIM] |

  **Toplam: 77,6/100 (geçici).** Kriter 1 (talep) geçici; doğrulanırsa puan değişir.
- **Gelir:** AdSense; kitap/eğitim affiliate; bülten/web sitesi; sponsorluk (inbound).
- **En büyük belirsizlik:** Talep ve rekabet — saf "finansal tarih" için doğrulanmış kanal/video verisi yok; Stage B'de doğrudan test şart. Ayrıca "tarih anlatısı ile yatırım tavsiyesi" sınırı resmi finans politikasıyla doğrulanmalı.

### E. Animasyonlu pop-psikoloji (animated psychology & relationships)
- **Tanım:** Duygu/ilişki/kişilik konularını animasyon ve anlatımla işleyen faceless videolar.
- **Hedef izleyici:** 18–24 ağırlıklı (%45), hafif kadın ağırlıklı, ABD/Hindistan/UK.
- **Örnek 5 fikir:** (1) "Why you feel tired after socializing"; (2) "How childhood shapes attachment"; (3) "Signs of burnout vs laziness"; (4) "Why you can't stop overthinking"; (5) "The psychology of quiet people".
- **Rakipler:** Psych2Go — 13,2M abone, ort. ~532K, ~3,5 video/hafta, ad geliri tahmini yalnız $3–4K/ay (https://outlierkit.com/channel/psych2go); PsychToons — 131K abone, ort. ~109K, medyan taban ~3K izlenme, "düşük retention ve marka sadakati" (https://outlierkit.com/channel/psychtoonshq); Practical Psychology — 2,32M abone (https://home.beacons.ai/blog/american-mental-health-youtubers).
- **Puan:**

| # | Puan | Gerekçe | Etiket |
|---|---|---|---|
| 1 | 3 | Dev talep ama kazanan hepsini alıyor; küçük kanal medyanı ~3K | [VERİ] tek kaynak |
| 2 | 2 | PsychToons "düşük retention/sadakat" notu | [VERİ] tek kaynak, araç yorumu |
| 3 | 4 | %95 evergreen (araç sınıflaması) | [VERİ] tek kaynak |
| 4 | 5 | Sınırsız liste konusu | [VARSAYIM] |
| 5 | 4 | Tıklanabilir, ancak şişirme riski | [VARSAYIM] |
| 6 | 1 | Aşırı doygun, şablon kanallar | [VARSAYIM] |
| 7 | 3 | Kolay tekrarlanır ama jenerik kalma riski | [VARSAYIM] |
| 8 | 2 | Şablon/toplu üretim → inauthentic content riski; sağlık iddiası | [VERİ] politika |
| 9 | 2 | Psych2Go ad geliri düşük görünüyor (tahmin: ~$0,4–0,5 RPM, çıkarım); alternatif zayıf | [TAHMİN] |
| 10 | 3 | Akademik kaynak var; görsel/animasyon üretilmeli | [VARSAYIM] |
| 11 | 3 | Animasyon emeği | [TAHMİN] |
| 12 | 5 | Zamana duyarsız | [VARSAYIM] |

  **Toplam: 60,8/100 (geçici).** Kriter 2 = 2 → **kritik koruma kuralı: birincil öneriye giremez.**
- **Gelir:** AdSense (düşük); kitap affiliate; sponsor (terapi uygulamaları — politika/etik risk).
- **En büyük belirsizlik:** Şablon pop-psikolojinin inauthentic content kapsamına girip girmediği ve küçük kanalların retention'ı.

### F. Endüstri ve tedarik zinciri açıklayıcıları (how industries & infrastructure work)
- **Tanım:** Havacılık, denizcilik, enerji, gıda gibi endüstrilerin ekonomisini ve işleyişini anlatan faceless videolar.
- **Hedef izleyici:** 20–45, "sistemler nasıl çalışır" merakı olan geniş kitle.
- **Örnek 5 fikir:** (1) "Why airline tickets cost what they do"; (2) "How container shipping really works"; (3) "Why chip factories cost $20 billion"; (4) "How supermarkets set prices"; (5) "The economics of cruise ships".
- **Rakipler:** Wendover Productions — 4,7M abone, ~727M toplam izlenme (arama özeti, https://www.overseeros.com/blog/top-faceless-business-case-study-youtube-channels, tek kaynak); ColdFusion — 5,2M abone, ort. ~983K (https://outlierkit.com/resources/faceless-business-documentary-channels/); Modern MBA — 801K abone, ort. ~794K.
- **Puan (veri zayıf, tümü geçici):**

| # | Puan | Gerekçe | Etiket |
|---|---|---|---|
| 1 | 4 | Rakip ort. 800K–1M | [VERİ] tek kaynak |
| 2 | 4 | Sistem hikâyesi | [VARSAYIM] |
| 3 | 4 | Mekanikler zamana bağlı değil | [VARSAYIM] |
| 4 | 4 | Çok endüstri | [VARSAYIM] geçici |
| 5 | 4 | "Why does X cost…" merak boşluğu | [VARSAYIM] |
| 6 | 2 | Wendover vb. baskın | [VARSAYIM] |
| 7 | 3 | Görsel/footage ihtiyacı | [VARSAYIM] |
| 8 | 3 | Footage/stok lisans riski | [VARSAYIM] |
| 9 | 3 | RPM çelişkili; alternatif sınırlı | [VARSAYIM] |
| 10 | 3 | Endüstri footage'ı lisanslı kaynak gerektirir | [VARSAYIM] |
| 11 | 2 | Görsel ağırlık yüksek, üretim süresi uzun | [TAHMİN] |
| 12 | 4 | Çoğu evergreen | [VARSAYIM] |

  **Toplam: 67,8/100 (geçici, düşük güven).**
- **Gelir:** AdSense; sponsor; bülten.
- **En büyük belirsizlik:** Görsel materyalin (footage) lisanslı/orijinal sağlanması maliyeti ve süresi.

## 5. Karşılaştırma ve sıralama
| Sıra | Aday | Toplam (geçici) | En güçlü kriter | En zayıf kriter | Not |
|---|---|---|---|---|---|
| 1 | D Ekonomik/finansal tarih | 77,6 | Evergreen, kaynak/görsel bulunabilirliği, zamana duyarsızlık | Talep verisi (geçici) | Doğrulanmamış talep |
| 2 | A Marka/şirket hikâyeleri | 72,6 | Konu havuzu | Farklılaşma | En kanıtlı talep |
| 3 | B Ülke-ekonomi | 69,4 | Talep, thumbnail/başlık | Farklılaşma | |
| 4 | F Endüstri açıklayıcıları | 67,8 | Evergreen | Üretim süresi, farklılaşma | Veri zayıf |
| 5 | C Jeopolitik | 64,0 | Talep | Zamana duyarlılık, gelir | |
| 6 | E Pop-psikoloji | 60,8 | Konu havuzu, zamana duyarsızlık | Farklılaşma, retention | Kritik koruma kuralı |

Ortak model: D, A, B, F ve C arasındaki farklar küçük; tek kişilik ekipte 16–28 saat/video tahmini (kriter 11) ve doygunluk bu kümenin asıl sınırıdır. Puanlar hızlı tarama içindir; ±5 puan belirsizlik varsayılmalı [TAHMİN].

## 6. Belirsizlikler
- RPM: kaynaklar çelişkili (AIR Media-Tech: Business & Finance medyan ≈ $2,01 RPM; üçüncü taraf blogları: finans $10–25 CPM/RPM). OutlierKit RPM sayfası bile "dış araç RPM ölçemez" diyor (https://outlierkit.com/resources/youtube-rpm-benchmarks/). AIR sayfası kesilmiş geldi; yöntem doğrulanamadı. Gelir puanları bu yüzden geçici.
- Kanal ölçeği/ortalama izlenme ve gelir tahminleri tek kaynaklı üçüncü taraf araçlardır; YouTube'un kendi verisi değildir.
- Küçük (<100K) kanalların büyüme dağılımı ve outlier oranı bulunamadı (yalnız genel faceless blogları, doğrulanmamış).
- Arama talebi (Google Trends / YouTube arama hacmi) bu turda ölçülmedi; kriter 1 gerçek video performansına dayanıyor, arama hacmine değil.
- Finans/sağlık tavsiyesi için resmi YouTube politikası doğrulanamadı.
- Reklam verenlere uygunluk: resmi sayfa belgesel bağlamının korunmasını söylüyor ama her video için kesin sonuç kanalın kendi deneyiminde görülür.
- 50 fikir şartı (kriter 4) bu aşamada yalnız 5'er örnekle karşılandı; Stage B gerektirir.
- Google Trends, KeywordTool benzeri doğrudan veri; Founder'ın YouTube Studio erişimi olmadığından gerçek RPM yok.

## 7. Şirket için anlamı
- Bu küme, 40 saat/hafta tek Founder için fiilen "araştırma-yoğun anlatı" kümesi; darboğaz para değil araştırma kalitesi ve doğruluk (OutlierKit: "araştırma farklılaştırıcıdır"). Bu, AI destekli üretimde senaryo doğrulama adımını zorunlu kılar.
- Faceless anlatı resmi politika açısından uygun; kritik olan "şablon/birbirinin yerine geçen" üretimden kaçınmak, her videoda özgün araştırma ve kendi anlatı yapısı sunmak (https://support.google.com/youtube/answer/1311392).
- ElevenLabs hazır sesleri için engel yok (AI ses açıklama gerektirmiyor; açıklama gerçekçi sahte olay/kişi için).
- Doygun alt nişlerde fark yaratma, nişin alt segmentini seçmeye bağlı (ör. D'deki dar bir tarihsel alt dönem veya A'daki dar bir sektör). Bu, Stage B'nin ana sorusu.

## 8. Birincil öneri (COO'ya)
Stage B'ye **D (Ekonomik/finansal tarih)** ve **A (marka/şirket hikâyeleri)** birlikte taşınsın; **B** üçüncü aday olarak izlensin. Gerekçe: D en yüksek geçici puan (77,6), evergreen ve kaynak/görsel bulunabilirliği güçlü, ancak talebi doğrulanmadı; A talebi en kanıtlı ama doygun. Stage B'de D ve A için: (1) saf alt niş rakip taraması, (2) <100K kanalların outlier videoları, (3) 50 fikir listesi, (4) kalıp-bazlı ham RPM doğrulaması. E (kritik koruma), C ve F geriye alınsın.
Geri dönüş koşulu: D için doğrudan talep verisi (benzer kanallarda 100K+ izlenme/video) bulunamazsa A öne çıkar.

### ChatGPT ikinci görüşü gerektirebilecek noktalar
1. Finans/yatırım tavsiyesi ve "tarihsel anlatı" ayrımı için güncel resmi YouTube kuralları + ad uygunluğu.
2. Küçük kanallarda (<50K abone) D ve A formatlarının gerçek video performansı ve büyüme hızı; güncel web verisi.
3. Business & Finance gerçek RPM aralığı (özellikle ABD dışı izleyici payı ile); kaynak çelişkisi.
4. "Finansal tarih" anlatı kanallarının listesi ve doygunluk seviyesi.
5. Pop-psikolojide şablon kanalların inauthentic content kapsamında monetizasyon kaybı örnekleri.

## Kaynaklar (erişim 2026-10-06)
- YouTube inauthentic content / yeniden kullanılmış içerik: https://support.google.com/youtube/answer/1311392
- YouTube sentetik içerik açıklaması: https://support.google.com/youtube/answer/14328491
- YouTube advertiser-friendly: https://support.google.com/youtube/answer/6162278
- YouTube misinformation politikaları: https://support.google.com/youtube/answer/10834785
- İş belgeseli kanalı verileri (2026-07-27, tek kaynak): https://outlierkit.com/resources/faceless-business-documentary-channels/
- Company Man: https://outlierkit.com/channel/companyman114 · Economics Explained: https://outlierkit.com/channel/economicsexplained · Psych2Go: https://outlierkit.com/channel/psych2go · PsychToons: https://outlierkit.com/channel/psychtoonshq
- CaspianReport: https://creatordb.app/creatorstats/caspianreport/ · RealLifeLore: https://creatordb.app/creatorstats/reallifelore/
- Finans doc. kanalları ve CPM iddiası (tek kaynak): https://faceless.my/youtube/faceless-finance-documentary-channels/
- RPM: https://outlierkit.com/resources/youtube-rpm-benchmarks/ ; https://air.io/en/air-data-findings/how-much-does-youtube-really-pay-in-2026-real-rpm-data-from-300-channels (içerik kesik, doğrulanamadı)
- Finfluencer politika haberi (ikincil): https://cafemutual.com/news/industry/30707-youtube-to-put-a-check-on-unauthorized-financial-advice
