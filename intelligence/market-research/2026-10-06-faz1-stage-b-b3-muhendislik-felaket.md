# Faz 1 / Stage B — B3: Mühendislik, Altyapı ve Felaket / Mühendislik Başarısızlığı Hikâyeleri

> Tarih: 2026-10-06 · Hazırlayan: research-analyst · Çerçeve: `niche-evaluation-framework.md` v1.0 (D-006)
> Araştırma sorusu: B3 adayı (faceless, AI destekli senaryo + ElevenLabs hazır sesi, 10–25 dk, İngilizce/uluslararası kitle) çerçevenin 12 kriterine göre, Stage A'dan daha güçlü kanıtla birincil öneriye girebilir mi?
> Kapsam dışı: B1/B2/B4, kanal adı/marka, karar verme, dış işlem. Grafik/şiddet odaklı içerik ve yaşayan kişiyi suçlayan içerik adaydan çıkarılmıştır.
> Stage A referansları: `2026-10-06-faz1-stage-a-sentez.md`, `…kume2-bilim-teknoloji.md` (Aday A), `…kume1-tarih-hikaye.md` (Aday A). Tekrarlanmayan yeni iş: 0–20K araması, 60 fikir, üretim/politika/RPM derinleştirme.
> Erişim tarihi (tüm kaynaklar): 2026-10-06.

## Özet (≤5 madde)
1. **Güncel geçici puan: 75,0/100** (makul aralık ~68–83; bkz. §8). Stage A'daki 78,6 (Küme 2-A) ve 74,2 (Küme 1-A) arasında; kritik koruma kuralları geçiyor (talep 4, retention 4, evergreen 4 — hiçbiri ≤2 değil). 50 fikir koşulu karşılandı (60 fikir, §3).
2. **Talep kanıtlı ve güçlü:** niş kanallarda video başı ort. 184K–885K (büyükler 1,1–2,3M); küçük-orta kanal Brick Immortar (~401K abone) ort. ~885K, 2.5M'lik outlier `[VERİ, tek kaynak: SponsorRadar]`. Tek-kaynak/hayatta kalma yanlılığı geçerli.
3. **0–20K yeni kanal kanıtı: YETERSİZ / bulunamadı.** Doğrulanabilir tek bir "0–20K abone + güçlü izlenme" örneği bulunamadı. En yakın: Blackout Docs (Mart 2025'te açılmış, 33,4K abone, 220 video — video başı izlenme doğrulanamadı) ve Mr. Paint Stories (Eyl 2025, ~54,9K abone — veri tutarsız ve içerik kapsam dışına yakın). Karşı-örnekler de var (Human Error | Tech Disasters: ort. ~103 izlenme). Stage A geri dönüş koşulu (hiçbir aday için 0–20K kanıtı yoksa "farklılaşma açısı + pilot video testi" kriterine geçilir) bu aday için de işliyor.
4. **Önerilen farklılaşma açısı:** "Bir Kuralın Kökeni" (Origin of a Rule) — her video, bugün her yerde olan tek bir mühendislik kuralını/standardını/alışkanlığını (çıkış kapısı, köprü denetimi, iron ring, hızlı kapanan tanklar vb.) onu doğuran tek karar/varsayım ve başarısızlıkla bağlar. Talep kanıtı var: Fascinating Horror'ın "Bu, Sterile Cockpit Kuralına yol açtı" başlıklı videosu ~2,2M `[VERİ, tek kaynak]`; Mentour's Black Box "Bu küçük değişiklik 114 kişiyi öldürdü" benzeri başlıklar kullanıyor. **Yeni bir boşluk değil, kanıtlı bir kalıbın sistematik/çok-alanlı (havacılık dışı) uygulaması** — farklılaşma puanı bu yüzden artırılmadı (3).
5. **En büyük risk:** AI ile kalite kontrolü + görsel üretim (puan 3, geçici) ve ölüm içerikli videolarda reklam uygunluğu (limited ads). Resmi kural: ölü beden/ciddi yaralanma görüntüleri, "ağırlıklı kaza görüntüsü" içerikleri limited/no ads; eğitsel/belgesel, sömürücü olmayan, tragedyayı anlatan içerik tam reklam alabilir `[VERİ]`. Çözüm tasarımda: kaza görüntüsü yok, diyagram/arşiv/harita; ölü sayısı başlıkta ana kanca olmayacak.

---

## 1. Rakip kanal haritası

> Veri: SponsorRadar (kanal sayfaları, Eylül–Ekim 2026 verisi), OutlierKit, vling/vidanalyze/speakrj. **Hepsi üçüncü taraf, çoğu tek kaynak.** "Ort." = son video örnekleminin ortalaması; **medyan hiçbir kanal için doğrulanamadı** (yalnızca Practical Engineering için OutlierKit'in medyanı ~1,9M "çıkarım" olarak veriliyor). Gelir rakamları araç modelidir, kanalın gerçek geliri değildir.

| # | Kanal | Boyut | Abone | Ort. izlenme/video | Sıklık | Format / ton | Başlık kalıbı (örnek) | Not / boşluk |
|---|---|---|---|---|---|---|---|---|
| 1 | Practical Engineering | Büyük | ~4,8M | ~2,3M (en iyi 14M) | ~0,6/hafta, ~18 dk | Host + fiziksel maket/demo; "nasıl çalışır" | "The Hidden Engineering of Landfills", "The Los Angeles Aqueduct is Wild" | Faceless değil; demo etkisi taklit edilemez. Anlatı değil açıklama ağırlıklı |
| 2 | Real Engineering | Büyük | ~5,1M | ~679K (SponsorRadar) / 1,3M (Autonolab, legacy) — çelişki | ~1,7/ay | CAD animasyon, tarih+teknik | "Why Sagrada Familia Took 144 Years to Complete" | Yüksek prodüksiyon; sponsor ağırlıklı gelir (Nebula, Onshape) |
| 3 | The B1M | Büyük | ~4,1M | ~1,1M | ~5,7/ay | İnşaat haber/belgesel, ekip prodüksiyonu | "America Actually Built Something On Time and On Budget" | Güncel/proje haberi ağırlıklı; felaket anlatısı değil |
| 4 | Brick Immortar | Orta | ~393–401K | ~885K (61 video, 55,3M toplam izlenme ≈ 0,9M/video) | ~0,3/ay (yılda 3–4) | Uzun, ağır araştırmalı deniz/yapı felaketi anlatısı | "Offshore Nightmare: The Collapse Of Texas Tower 4" (2,5M, Ara 2024); "Inflection Point: The Tragedy Of SS Marine Electric" (1,2M, Tem 2025) | **Düşük frekans + yüksek kalite modeli çalışıyor.** Ölü-sayı kancası yerine evokatif ifade+olay adı |
| 5 | Fascinating Horror | Orta-büyük | ~1,5M | ~388K (Eyl 2026: 242K–2,2M) | ~4/ay | Saygılı belgesel; kaza/felaket (havacılık, yangın, kayıp vakaları) | "This Led To The Sterile Cockpit Rule: Eastern Airlines 212" (2,2M); "32 Killed By A Single Cigarette…" | **"Kural/sonuç" kancası kanıtlı.** 2019'da açılmış; sponsor yok görünüyor |
| 6 | Plainly Difficult | Orta-büyük | ~1,1M | ~184K (169K–278K) | ~4,7/ay | Anlatılı felaket; "kamera yakaladı" derlemeleri de var | "2500 Killed In Moments \| The North Sea Flood"; "Moment Of Disaster Caught On Camera" | Yüksek frekans, daha düşük ort.; derleme formatı reklam riski taşır |
| 7 | Dark Records | Orta | ~653K | ~250K (18K–606K) | ~2/ay | Tarihsel felaket belgeseli | "The INFAMOUS Pennsylvania Chocolate Explosion" (606K) | Aynı başlık iki kez kullanılmış derleme: 297K vs 18,3K (yeni) — varyans yüksek. Kanal yaşı doğrulanamadı |
| 8 | Mentour's Black Box | Orta (küçük-orta) | ~137–140K | ~402K (321K–782K) | ~1/ay | Derin soruşturma; sponsor 6 marka | "This Tiny Change Killed 114 People", "The Nuclear Nightmare Of Fukushima" | **Abone/izlenme oranı çok yüksek, ancak Mentour Pilot (~2,46M) marka transferi** → yeni kanal kanıtı sayılmaz |
| 9 | Disaster Breakdown | Orta | ~263K | ~200K (66K–151K son 4 video) | ~0,7/ay | Havacılık kazası analizi | "Make it Look Like an Accident - Continental Airlines Flight 11" | Havacılık odaklı; sponsor Ground News/Brilliant |
| 10 | CollapseZone | Küçük-orta | ~57,7K | doğrulanamadı | doğrulanamadı | **Gerçek kamera görüntüsü + simülasyon** derlemesi | "bridge collapses, crane falls" | Reused/limited-ads riski yüksek format; bizim modelimizin tersi |
| 11 | Blackout Docs | Küçük | ~33,4K (vling) | **doğrulanamadı** | 220 video / ~19 ay ≈ 2,7/hafta (hesaplanmış) | "Yıkımın anatomisi": yapısal çöküş + teknik arıza, "premium görsel anlatı" | doğrulanamadı | **En yakın yeni-kanal örneği**; yüksek frekans şablon/inauthentic riski sinyali olabilir `[VARSAYIM]` |
| 12 | Mr. Paint Stories | Küçük | ~54,9K (Eyl 2025'te açıldı) | 8,3M toplam/109 video ≈ 76K; ama "en çok izlenen izlenen video ~5,6K" ifadesi tutarsız | ~8/ay (hesaplanmış) | MS Paint tarzı çubuk figür; kaza/ölüm hikâyeleri | "The Worst Human Deaths Ever" | **Doğrulanamayan/çelişkili veri; ölüm-odaklı içerik kapsam dışı** — yalnızca stil kanıtı olarak not |
| 13 | Human Error \| Tech Disasters | Çok küçük | gizli | ~103 (ortanca ~5–70; en iyi 467) | ~9/ay | Siber/teknoloji felaketi anlatısı, ~6:25 | "How 1 Stolen Token Cost Rockstar $2 Billion" | **Karşı-örnek:** 10 yıllık hesapta bile düşük; ürün-pazar uyumu/dağıtım kanıtı yok |

Kaynaklar: https://sponsorradar.com/channels/brickimmortar , /plainlydifficult , /fascinatinghorror , /disasterbreakdown , /darkrecordsdocs , /mentourblackbox , /collapsezoneyt , /theb1m , /realengineering · https://outlierkit.com/channel/practicalengineeringchannel · https://outlierkit.com/channel/humanerrortech · https://www.speakrj.com/audit/report/UCjw9YUv4UoA3d0V_Pc6zLTQ/youtube (Brick Immortar 393K / 61 video / 55,3M, Haz 2026) · https://vling.net/en/channel/UCAJurFpws8jtYVV3aX21Tgg/channel-info (Blackout Docs; sayfa doğrudan açılmadı, arama özetinden) · https://vidanalyze.com/channel/mrpaintstoriesofficial/statistics · https://www.tvtropes.org/pmwiki/pmwiki.php/WebVideo/FascinatingHorror (FH 2019 başlangıç; ikincil).

**Başlık/thumbnail kalıpları `[VERİ, başlıklar kanal sayfalarından]`:**
- Evokatif iki parçalı yapı: *"[Duygusal ifade]: [Olay/yapı adı]"* (Brick Immortar: "Frozen, Dark & Overwhelmed: The Loss Of FV Destination").
- *"Bu [kural/sonuç]'a yol açtı: [olay]"* (Fascinating Horror) ve *"Bu küçük değişiklik …"* (Mentour's Black Box) → neden-sonuç kancası.
- Ölü-sayı kancası (PD, FH, Mentour) yaygın; reklam riski ve "sömürücü" algısı açısından kaçınılacak.
- Açıklayıcı/merak: "Bizarre", "Hidden", "…is Wild" (Practical Engineering).
- **Thumbnail görsel kalıpları doğrulanamadı** (görsel inceleme aracı yok). Bu boşluk bir sonraki adımda manuel kontrolle kapatılmalı.

**Kanalların açtığı boşluklar `[VARSAYIM — rakip taramasından çıkarım]`:**
1. Büyük anlatı kanalları (FH, PD, DR, Mentour BB) ağırlıkla **havacılık, deniz, yangın, endüstriyel kaza**; yapı/altyapı **neden-sonuç tasarım kararı** anlatısı Practical Engineering'e (demo-merkezli) ve Brick Immortar'a (aylarca bir video) bırakılmış görünüyor.
2. **Ölüm olmayan** başarısızlıklar (köprü sallanması, çatı çökmesi, yazılım/birim hatası) anlatı kanallarında az görünüyor — doğrulanmadı.
3. **Kural/standart kökeni** serisi biçiminde sistematik içerik yok görünüyor (FH ve Mentour BB bunu tek tek kullanıyor; seri omurgası yapan kanal doğrulanmadı).

---

## 2. Gerçek video performansı, outlier'lar ve 0–20K kanıtı

### 2a. Outlier/performans `[VERİ, SponsorRadar/OutlierKit — tek kaynak]`
| Video | Kanal | İzlenme | Tarih | Not |
|---|---|---|---|---|
| Offshore Nightmare: The Collapse Of Texas Tower 4 | Brick Immortar | 2,5M | Ara 2024 | 401K abonelik kanalda; kanal ort. 885K |
| Inflection Point: The Tragedy Of SS Marine Electric | Brick Immortar | 1,2M | Tem 2025 | |
| This Led To The Sterile Cockpit Rule: Eastern Airlines 212 | Fascinating Horror | 2,2M | Eyl 2026 | Kanal ort. 388K → ~5,7× ; "kural" kancası |
| The Tower Of Power Accident | Fascinating Horror | 712K | Eyl 2026 | |
| The Nuclear Nightmare Of Fukushima | Mentour's Black Box | 782K | Tem 2026 | Kanal ort. 402K |
| India's Deadliest Train Crash In Decades | Mentour's Black Box | 764K | Eyl 2026 | |
| The INFAMOUS Pennsylvania Chocolate Explosion | Dark Records | 606K | Eyl 2026 | |
| Moment Of Disaster Caught On Camera | Plainly Difficult | 278K | Eyl 2026 | Derleme/ kamera formatı |
| The Taum Sauk Dam Failure | Practical Engineering | ~3,9M | tarih doğrulanmadı | Açıklayıcı + demo |

Yorum `[TAHMİN]`: En yüksek performanslı videolar tek olay + net neden-sonuç + dürüst merak boşluğu taşıyor; frekans arttıkça (PD 4,7/ay) ortalama düşüyor, düşük frekanslı Brick Immortar ortalaması en yüksek. Bu, "kalite > miktar" ilkesiyle uyumlu, ancak nedensellik kanıtlanmadı.

### 2b. 0–20K abone aralığında büyüme kanıtı — SONUÇ: bulunamadı
| Aday kanıt | Durum | Neden yeterli değil |
|---|---|---|
| Blackout Docs (Mart 2025, 33,4K abone, 220 video) | 0–20K dışında (>20K); ancak yeni ve küçük | Video başı izlenme doğrulanamadı; 220 video/~19 ay = çok yüksek frekans, bu bizim "kalite > miktar" ilkemize ve inauthentic content riskine ters; tek kaynak (vling özeti) |
| Mr. Paint Stories (Eyl 2025'te açılmış, ~54,9K) | 0–20K dışında | Veri çelişkili; içerik ölüm odaklı (kapsam dışı); stil yalnızca MS Paint |
| Mentour's Black Box (~140K) | Yeni değil | Büyük bir kanalın marka transferi |
| Autonolab "disasters" tablosu: Mr. Paint Stories 6,1K abone/61,5K ort. (10,1×), Broken Earth 10,8K/35,8K, Discovery Unveiled 2,4K/2,8K | **Kullanılmadı** | Kaynak kendini "legacy, yeniden gözden geçirilecek" ilan ediyor ve Stage A'da güvenilmez bulunmuştu; yalnızca "dağılım" göstergesi olarak not (aynı sayfada 2,4K abone/2,8K ort. ile 6,1K/61,5K birlikte duruyor → yüksek varyans) |
| Karşı-örnekler: Human Error \| Tech Disasters (ort. ~103), MegaScale Explained (146 abone, 32 video), Natural Hazards (8 abone, 4 video) | `[VERİ, tek kaynak]` | Başarısızlıklar da var; hayatta kalma yanlılığı iki yönlü |

Sonuç `[VERİ-SINIRI]`: Bu araştırma turunda, **2024–2026'da sıfırdan başlayıp 0–20K aralığında doğrulanabilir güçlü izlenme alan bir mühendislik/felaket kanalı bulunamadı.** Bu "yok" demek değildir; erişilebilir araçlarla (YouTube'a doğrudan erişim ve Studio verisi yok) doğrulanamadı. ChatGPT ikinci görüşü önerilir (bkz. §Belirsizlikler).

---

## 3. Konu havuzu — 60 fikir (≥50 koşulu karşılandı)

> Seçim kuralları: tarihsel/belgelenmiş olay; birincil kaynak raporu veya akademik/kamu kaydı var; **yaşayan kişi suçlanmıyor**; **grafik ölüm görüntüsü gerektirmiyor**; son 5 yıl içindeki olaylar (Key Bridge 2024, Champlain Towers 2021, Grenfell 2017 vb.) kasten dışarıda bırakıldı (zamana duyarlılık, hukuki süreç, sömürücü olma riski).
> "Kural" sütunu = önerilen "Kuralın Kökeni" bağı (hepsinde doğrulanmalı `[VARSAYIM]` — fikir aşamasında, yazım öncesi birincil kaynakla teyit edilir). "Ölümsüz" = ölüm olmayan/az olan olay (limited-ads riski düşük).

### A. Bir kuralın/uygulamanın kökeni (seri omurgası)
| # | Çalışma başlığı | Curiosity-gap açısı |
|---|---|---|
| 1 | Why Exit Doors Open Outward: The 1903 Iroquois Theatre Fire | Her kapı dışa açılıyorsa, o gün kapılar neden içeri/gizli kilitliydi? |
| 2 | The Bridge That Made Engineers Wear a Ring (Quebec Bridge, 1907) | Mühendislerin takılan "iron ring" geleneği ile bir çöküş nasıl bağlantılı? Efsane ile doğrulanan ayrımı |
| 3 | Why Every Bridge in America Is Inspected on a Schedule (Silver Bridge, 1967) | Tek bir göz çubuğundaki çatlak neden yıllarca görülmedi? |
| 4 | Why Airplane Windows Are Round (de Havilland Comet) | Köşeler neden öldürdü; yuvarlak pencere hangi veriyle kuruldu? |
| 5 | Why Engineers Must Now Stamp Their Drawings (Boston Molasses Flood, 1919) | Bir şeker şurubu tankı mühendislik mevzuatını nasıl değiştirdi? |
| 6 | The Dam Law Written After St. Francis Dam (1928) | Yıllarca güvenli sanılan bir barajın "tek bir yeri" kimin kontrolündeydi? |
| 7 | Why Skyscrapers Are Wind-Tunnel Tested (Tacoma Narrows → Tay Bridge çizgisi) | Rüzgâr yükü neden 1879'da hesaba katılmıyordu? |
| 8 | The Revolving Door Rule (Cocoanut Grove, 1942) | Güvenlik için tasarlanan kapı neden tuzağa dönüştü? |
| 9 | Why Ships Now Need Stability Tests (SS Eastland, 1915) | Güvenlik kuralının (cankurtaran botları) gemiyi devirmesi — ironi |
| 10 | Why Oil Platforms Need a "Permit to Work" (Piper Alpha, 1988) | Bir vardiya devrindeki not defteri neden felaketi tetikledi? |
| 11 | Why Chemical Plants Publish Their Hazards (Bhopal / Seveso) | Bir mahallenin bilmediği tehlike nasıl bir yasaya dönüştü? |
| 12 | Why Sprinklers Became Mandatory (Triangle Shirtwaist ve sonrası) | Yangın merdiveni vardı, kullanılamadı: ne eksikti? |
| 13 | Why Building Codes Require Redundant Load Paths (Ronan Point, 1968) | Bir gaz patlaması neden bir köşe daireden tüm kuleyi taşıdı? |
| 14 | Why Pipes Get a Second Inspector (Flixborough, 1974) | Geçici bir "dirsek" bir fabrikayı nasıl yok etti? |
| 15 | Why Offshore Rigs Get Fatigue Checks (Alexander Kielland, 1980) | Küçük bir sensör kaynağı neden bir platformu devirdi? |
| 16 | Why Every Crew Has a "Stop Work" Authority (Texas City ve sonrası) | Kimse neden durdurmadı? |
| 17 | The Cargo Hold Rule: Liberty Ships That Cracked in Half | Soğuk su çeliği neden kırılgan yaptı? Üretim hızı vs. malzeme bilgisi |
| 18 | Why Reservoirs Must Be Filled Slowly (Teton Dam, 1976) | İlk doldurmada baraj neden başarısız oldu; "ilk doldurma" kuralı |
| 19 | Why Disasters Now Get Independent Review Boards (Challenger telekonferansı) | Mühendis uyarısı neden yönetimde "sönümlendi"? (kurumsal süreç, kişi suçlamadan) |
| 20 | Why Gas Storage Tanks Are Built with Dikes (East Ohio Gas LNG, 1944) | Düşük nikelli çelik ve bir tank yangını tasarım kuralını nasıl değiştirdi? |

### B. Ölümsüz/az ölümlü başarısızlıklar (limited-ads riski düşük, tasarım dersi güçlü)
| # | Çalışma başlığı | Curiosity-gap açısı |
|---|---|---|
| 21 | The Bridge That Wobbled (London Millennium Bridge, 2000) | Yürüyüşçüler köprüyü nasıl hep birlikte salladı? Hesapta yoktu |
| 22 | The Roof That Fell the Night After the Game (Hartford Civic Center, 1978) | Bilgisayar modelinin gözden kaçırdığı şey; kimse yaralanmadı — şans mı? |
| 23 | The Oil Platform That Sank Under Its Own Weight (Sleipner A, 1991) | Bir sonlu eleman modeli yanlışlığı dev bir beton platformu nasıl batırdı? |
| 24 | The Day a Lake Disappeared (Lake Peigneur, 1980) | Bir sondaj hatası bir gölü neden boşalttı? |
| 25 | The Mirror Ground Perfectly Wrong (Hubble) | Kusursuz cilalanmış ayna neden yanlış şekildeydi? |
| 26 | One Unit, One Planet (Mars Climate Orbiter) | Yazılımın doğru çalıştığı bir uzay aracı neden kayboldu? |
| 27 | The Glider That Was a Jet (Gimli Glider) | Kilogram/pound hatası ve bir uçağın boş yakıtla kayması |
| 28 | The Rocket That Failed in 37 Seconds (Ariane 5, 1996) | Eski yazılımın tek bir dönüşümü |
| 29 | The Steel Frames That Cracked and Nobody Noticed (Northridge, 1994) | Bina yıkılmadı ama kaynaklar kırıldı — bu neden daha korkutucuydu? |
| 30 | The Sinking of the Vasa: The Warship That Fell Over in the Harbor (1628) | Kral emriyle büyütülen bir gemi ve istikrar hesabı yokluğu |
| 31 | The Tunnel Ceiling That Peeled Away (Big Dig, 2006) | Epoksinin "sünmesi" ve test edilmeyen malzeme (tek ölüm, kurumsal süreç odaklı) |
| 32 | The Blackout That Started with One Relay Setting (Kuzeydoğu ABD, 1965) | Tek bir röle ayarı yüz binleri karanlığa nasıl itti? |
| 33 | The 2003 Blackout: The Alarm That Never Rang | Bir yazılım hatası alarmı susturunca operatörler neden bilmedi? |
| 34 | The Light on the Panel That Lied (Three Mile Island, 1979) | Gösterge ne gösteriyordu, ne göstermiyordu? |
| 35 | The Machine That Gave Too Much (Therac-25) | Yazılım yarış durumu; mühendis uyarıları (tıbbi cihaz; kurum odaklı) |
| 36 | The Millennium-Era Stadium Roof That Never Worked (Montreal Olympic Stadium) | Bir çatının on yıllarca tamamlanamaması |
| 37 | The Bridge That Moved Sideways (Oakland Bay Bridge 1989 / Cypress Viaduct) | Deprem yükü ve bir üst geçidin "alt kat" hatası |
| 38 | The Great Stink: How a City Fixed Its Pipes (Londra 1858) | Kanalizasyon sistemi nasıl bir kriz yüzünden kuruldu? |
| 39 | Why the Caisson Workers Got Sick (Brooklyn Bridge) | Mühendis ve işçiler bilmedikleri bir hastalığı nasıl öğrendi? |
| 40 | The Lamp That Rescued the Wrong Ship? (kısa vaka: ışık/seyir hatası) | **Yer tutucu — kaynak doğrulanmadan yazılmaz** (fikir havuzu dışı say) |

> Not: #40 doğrulanmamış yer tutucu; fikir sayısına dâhil edilirse bile 59 geçerli fikir vardır (≥50 koşulu korunur).

### C. Altyapı vaka anlatıları (olay merkezli)
| # | Çalışma başlığı | Curiosity-gap açısı |
|---|---|---|
| 41 | The Dam That Held While the Mountain Fell (Vajont, 1963) | Baraj ayakta kaldı; neden yine de felaket oldu? |
| 42 | The Arch Dam That Cracked on First Fill (Malpasset, 1959) | Kusursuz sanılan bir kemer baraj zemini neden taşıyamadı? |
| 43 | The Flood of 1889 and a Club's Dam (Johnstown) | Bir kulübün baraj değişikliği ve uyarıların kaybolması |
| 44 | The Dam That Failed in a Typhoon (Banqiao, 1975) | "Bin yılda bir" yağış tasarım varsayımı nasıl yanlış çıktı? (ölü sayısı kanca değil) |
| 45 | The Ship That Exploded the City (Halifax, 1917) | İki geminin çarpışması ve iletişim zinciri |
| 46 | The Walkway Dilemma (Hyatt Regency, 1981) | Tek bir değiştirilmiş bağlantı detayı — **farklı açı: değişiklik talebi kim, nasıl onaylandı** |
| 47 | The Chain of Bolts Under a Skyscraper (Citicorp Center, 1978) | Bir mühendisin kendi hatasını gizli onarması — **kişi vefat etmiş, olumlu dürüstlük hikâyesi** |
| 48 | The Bridge That Ran Out of Metal Pins (Mianus River, 1983) | Pin-and-hanger tasarımı ve denetim boşluğu |
| 49 | The Gusset Plates That Were Too Thin (I-35W, 2007) | Tasarımda yıllarca görünmeyen 1 cm'lik fark |
| 50 | The Bridge a Ship Hit (Sunshine Skyway, 1980) | Gemi çarpması riskinin tasarıma girmemesi |
| 51 | The Walkway That Fell on a Tea Dance (alt: Kansas City varyantları) | **Yer tutucu — Hyatt ile tekrar; kullanılmaz** |
| 52 | The Pipeline That Took a Town (San Bruno 2010) | **Yaşayan kuruluş/dava riski → güncellik kontrolü gerekir; aday** |
| 53 | The Wall That Fell at the Ice Rink (Kemper/Hartford benzeri alt-seri) | **Yer tutucu — kaynak bulunamadı** |
| 54 | Why Tall Chimneys Have Spiral Strakes (Ferrybridge cooling towers, 1965) | Soğutma kulelerinin rüzgârda çökmesi — mühendislik dersi |
| 55 | The Church That Sank Itself (Pisa'dan Mexico City Metropolitan Cathedral) | Zemin oturması ve düzeltme mühendisliği |
| 56 | The Elevator That Had to Be Invented (Otis, 1854) | "Güvenlik freni" gösterisi ve ticari ikilem |
| 57 | The Canal That Reversed a River (Chicago kanalizasyon kanalı) | Altyapı kararlarının zincirleme sonuçları |
| 58 | The Tunnel That Burned for Weeks (Mont Blanc, 1999) | Havalandırma tasarımı ve operatör kararları (ölü sayısı kanca değil) |
| 59 | The Station Escalator (King's Cross, 1987) | Ahşap yürüyen merdiven, "fire trench effect" ve bir fizik ilkesi |
| 60 | The Bridge Built Twice (Quebec Bridge 1916 ikinci çöküş) | İlk çöküşten sonra aynı hata neden tekrarlandı? |

**Fikir havuzu durumu:** 60 satır; #40, #51, #53 yer tutucu/tekrar (fikir değil sayılır); #52 güncellik/hukuki kontrol gerekir. **Doğrulanmış kullanılabilir fikir: 56** → ≥50 koşulu karşılandı `[TAHMİN: havuz yazım öncesi her bir fikirde birincil kaynakla doğrulanmalı]`. Fikirlerin olgusal ayrıntıları araştırma analistinin genel bilgisinden türetilmiştir; **hiçbiri bu turda birincil kaynakla tek tek doğrulanmadı** — "ölüm sayısı", "ilk kural" gibi iddialar yazım aşamasında kontrol edilecek.
**Sürdürülebilirlik:** 56 fikir, haftada 1 videoyla ~1 yıl; kural-kökeni omurgası alt-seriye ayrıştırılabilir (bina, köprü, baraj, enerji, yazılım).

---

## 4. Üretim gereksinimleri

### 4a. Pilot video için görsel plan (öneri: Pilot 1 = Quebec Bridge 1907, "Demir Yüzük")
| Görsel türü | Kullanım | Lisans/kaynak notu | Etiket |
|---|---|---|---|
| Kamu malı fotoğraf/arşiv | 1907 çöküş sonrası fotoğraflar, inşaat aşamaları | 1907 tarihli eserler PD (ABD/Kanada); Wikimedia Commons lisans sayfası: https://commons.wikimedia.org/wiki/Commons:Licensing | `[VARSAYIM]` — tek tek eser kontrolü gerekli |
| ABD federal arşivleri | HAER/NARA/USGS görüntü ve çizimleri | LoC HAER: "ABD Hükümeti tarafından yapılan görüntülerde bilinen kısıt yok; başka kaynaktan kopyalanan görüntüler kısıtlı olabilir"; kaynak satırı olan görseller ayrı izin gerektirir. Kaynak: https://loc.gov/pictures/item/ca3152/ (arama özeti) | `[VERİ]` |
| Resmî raporlar | NTSB/NIST/Cullen/Royal Commission metni, tablo ve şekiller | ABD federal çalışmaları genellikle PD ama üçüncü taraf görsel içerebilir; UK OGL atıf ister, kişisel veri/üçüncü taraf hakları hariç: https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/open-government-licence/ | `[VERİ]` (OGL) / `[VARSAYIM]` (NTSB/NIST – bu turda doğrudan teyit edilmedi) |
| **Uyarı: CSB videoları** | ABD hükümet kuruluşu olsa da sayfada "© U.S. Chemical Safety Board. All Rights Reserved." yazıyor; kullanım izni doğrulanamadı | https://www.csb.gov/videos/ | Videolar **kullanılmaz**; yalnızca rapor bilgisi kendi diyagramlarımızla anlatılır |
| Harita | OpenStreetMap + tarihî haritalar (LoC) | Atıf gerekir (ODbL); tarihî harita PD | `[VARSAYIM]` |
| Özgün 2D diyagram/animasyon | Yük akışı, kolon burkulması, "kural" zaman çizelgesi | Kendi üretimimiz (Remotion/Inkscape/Blender/Manim — hepsi ücretsiz/açık kaynak; Remotion lisans koşulu bu turda doğrulanmadı) | `[VARSAYIM]` |
| Birincil belge ekran görüntüsü | Rapor sayfası, vurgulu cümle | Eser kamu malıysa serbest; "bu videoyu savunan kanıt" olarak şeffaflık | `[VARSAYIM]` |
| AI üretimi görsel | **Yalnızca stilize/illüstratif (fotogerçekçi olmayan)** diyagram arka planı | Fotogerçekçi AI "olay sahnesi" **kullanılmaz** (açıklama zorunlu, etik/güven riski — bkz. §5) | `[VERİ]` (politika) |

**Fiziksel demo etkisi faceless animasyonla yakalanabilir mi?** `[TAHMİN]` **Kısmen.** Practical Engineering'in 2,3M ort. izlenmesi, host + fiziksel maket + kanal sadakatine dayanıyor (OutlierKit: "host credibility and custom-built demonstrations are critical differentiators"). Anlatı-merkezli kanallar (Brick Immortar, Fascinating Horror) demo olmadan çalışıyor; yani B3'te **olay anlatısı + diyagram** formatı demo gerektirmiyor. Aha etkisi için alternatifler: (a) basit fizik simülasyonu (Blender/Manim; örn. kolon burkulma, rezonans), (b) birincil kaynaktan "o gün bu karar nasıl görünüyordu" zaman çizelgesi, (c) rapordan gerçek sayısal tablo. Bu **pilotla ölçülmeli**; farkın izleyiciye algılandığı henüz kanıtlı değil.

### 4b. Doğruluk / uzman doğrulama yükü `[TAHMİN]`
- En kritik ve **bu niş için en yüksek** yük: mühendislik detaylarında yanlışlık anlatıyı ve kanalı bitirir (itibar). Tek Founder'ın mühendislik uzmanlığı bilinmiyor `[VARSAYIM — kısıt dosyasında yok]`.
- Önerilen kontrol zinciri: (1) tüm iddialar için kaynak tablosu (rapor sayfa no.), (2) senaryo yalnızca Claude'a **verilen birincil belge metninden** yazılır (serbest bellekten değil), (3) ChatGPT'ye ikinci görüş/fact-check promptu, (4) Founder son okuma; bilinmeyen/tartışmalı noktada "raporlar çelişiyor" şeklinde açıkça belirtme, (5) düzeltme politikası (açıklamada hata sürümü).
- Hukuki: ölmüş/tarihî kişiler için düşük risk; yaşayan kurum/şirketlerin dava sürecindeki olayları dışlandı.

### 4c. Video başına süre ve maliyet `[TAHMİN]`
| Aşama | İlk 3 video | Oturmuş hat (8+ video) |
|---|---|---|
| Birincil kaynak toplama + okuma + kaynak tablosu | 7–9 saat | 5–7 saat |
| Senaryo (Claude + insan düzenleme) | 3–4 saat | 2–3 saat |
| Fact-check (ChatGPT ikinci görüş + Founder) | 3 saat | 2 saat |
| Ses (ElevenLabs, dinleme/düzeltme) | 1–2 saat | 1 saat |
| Görsel hazırlık (arşiv, diyagram, harita) | 8–12 saat | 5–8 saat (şablon) |
| Kurgu/render/QC | 3–5 saat | 2–4 saat |
| Başlık/thumbnail/açıklama | 1–2 saat | 1 saat |
| **Toplam** | **~26–37 saat** | **~18–26 saat** |

→ Haftada ~40 saatle **ilk haftalarda 10 günde 1 video**, hat oturunca **haftada ~1 video** mümkün görünüyor `[TAHMİN — ölçülmedi]`. Render makinesi (Ryzen 5 5600/16 GB/RX 580) 1080p 2D animasyon için yeterli beklenir; Blender 3B sahneleri yavaş olabilir `[VARSAYIM]`.

**ElevenLabs maliyeti:** 15 dk ≈ 2.200 kelime ≈ ~13K karakter; Multilingual V2'de 1 karakter = 1 kredi, Flash modellerinde 0,5–1 kredi (https://elevenlabs.io/pricing, 2026-10-06; Starter $6/30K kredi, Creator $22/121K, Pro $99/600K; sayfada indirim notu tutarsız okundu). **~13K kredi ≈ yaklaşık $1–3** (plan kredi fiyatından hesaplanmış), düzeltme/yeniden üretim payıyla **~$3–6/video** `[TAHMİN]`. Pay-as-you-go oranı bu sayfada görülmedi (Founder'ın PAYG planı farklı olabilir). Ses üretimi öncesi Founder onayı kuralı geçerli (founder-approval.md "Açık nokta"). **Diğer araç maliyeti: 0** (ücretsiz/açık kaynak; yeni ücretli araç önerilmiyor).

**Pilot video önerisi (karar değil):** Pilot 1 — "Quebec Bridge 1907 / Iron Ring" (PD görsel zengin, olgusal efsane-doğrulama katmanı). Pilot 2 — Millennium Bridge (ölümsüz, kendi simülasyonumuzu test eder). Pilot 3 — Boston Molasses Flood (hikâye + mevzuat bağı).

---

## 5. Politika ve telif riski (resmî kaynaklar)

| Konu | Bulgu | Etiket | Kaynak (erişim 2026-10-06) |
|---|---|---|---|
| Inauthentic content | 15 Tem 2025'ten itibaren "mass-produced, generic, repetitive" içerik; **"AI-generated content made with generic or unoriginal templates"**, "image slideshows, templated storylines, or scrolling text with minimal or no narrative" ihlal örnekleri | `[VERİ]` | https://support.google.com/youtube/answer/1311392?hl=en |
| Reused content | Önemli özgün yorum/katkı olmadan başkasının içeriği; "content that exclusively features readings of other materials you did not originally create"; telif izni olsa bile uygulanır | `[VERİ]` | aynı sayfa |
| Format riski → B3'e uygulama | Rapor + arşiv fotoğraf + kendi diyagram + özgün analiz = dönüştürücü katkı; **"kaza görüntüsü derlemesi" (CollapseZone, PD/DR "caught on camera") reused + no-ads riski** | `[VARSAYIM]` (resmî sayfa nişi adlandırmıyor) | — |
| AI açıklaması gereken | "Gerçek bir olay/yeri değiştiren" veya "gerçekçi, gerçekleşmemiş sahne üreten" içerik açıklanmalı; **animasyon/gerçekçi olmayan içerik ve senaryo/başlık/thumbnail için AI yardımı muaf**; sürekli açıklamama: etiket, kaldırma veya YPP askıya alma | `[VERİ]` | https://support.google.com/youtube/answer/14328491?hl=en |
| Otomatik etiket | 27 Mayıs 2026: açıklama yapılmasa bile **önemli fotogerçekçi AI kullanımı tespit edilirse etiket uygulanır**; etiket uzun videoda oynatıcının altında görünür; "A disclosure label alone does not change how a video is recommended or whether it's eligible to earn money" | `[VERİ]` | https://blog.youtube/news-and-events/improving-ai-labels-viewers-creators/ |
| AI ses | Resmî sayfalarda TTS/AI ses yasağı yok; yaptırım hedefi şablonlu/seri içerik. **Resmî sayfa AI sese açıkça değinmiyor** | `[VARSAYIM]` (Stage A ile tutarlı) | 1311392 |
| Reklam uygunluğu — ölüm/felaket | **Tam reklam:** "Discussions involving loss of life or tragedy that are not exploitative"; "dead bodies fully obscured/blurred/historical events". **Limited:** "dead bodies with obvious injury or damage in educational or documentary settings", "serious injury" depiction. **No ads:** "content that mainly shows accidents…", "graphic dead bodies in non-educational video", sensitive event'i **kâr amacıyla sömürme/ anahtar kelime ile trafik çekme** | `[VERİ]` | https://support.google.com/youtube/answer/6162278?hl=en (sayfa son güncelleme notu: 23 Mar 2022 — **12 aydan eski**, güncel olup olmadığı ayrıca teyit edilmeli) |
| Gerçekçi AI görsel | Fotogerçekçi "çöküş sahnesi" AI görseli → açıklama zorunlu + otomatik etiket; stilize/illüstratif/diyagram → zorunlu değil | `[VERİ]` | 14328491 + AI etiket blogu |
| Telif | ABD federal eserleri genellikle PD ama üçüncü taraf içerik içerebilir (HAER: kaynak satırı olan görsel ayrı izin); CSB sayfası "All Rights Reserved" diyor; UK OGL atıf ister, üçüncü taraf hakları dışında | `[VERİ]` / `[VARSAYIM]` | LoC HAER örnek sayfası; CSB; Ulusal Arşiv OGL sayfası |

**B3'e özel politika sonucu:** Eleme kapısı geçildi (faceless uygun, orijinal anlatı kurulabilir). Riskler **tasarımla** azaltılabilir: (1) kaza/ceset görüntüsü yok, (2) ölü sayısı başlık kancası değil, (3) yakın tarihli olay istismarı yok, (4) her video yapısal olarak farklı (aynı intro/outro serbest, aynı hikâye şablonu değil), (5) fotogerçekçi AI görsel yok, (6) AI ses kullanımı kanal açıklamasında şeffaf (zorunlu değil, güven artırıcı) `[VARSAYIM]`. Kalan belirsizlik: hassas olay içerikli videoların **gerçek** reklam durumu (YPP açıldığında Studio'dan izlenir).

---

## 6. Gelir

### 6a. RPM — çoklu kaynak ve çelişkiler
| Kaynak | Değer | Yöntem/güvenilirlik | Etiket |
|---|---|---|---|
| AIR Media-Tech (Tem 2026) | Eğitim & Bilim **medyan RPM $10,22**; tüm niş medyanı ~$2,30; Eğitim içinde iki kanal $2,31–$19,50 arası; monetized playback %77 | 300 kanalın gerçek YouTube Analytics verisi, May 2025–May 2026; **tam metin açılamadı, arama özetinden** | `[VERİ]` (orta güven; tam metin teyit edilmeli) |
| Autonolab (Eyl 2026, tahmin) | Mühendislik $12,5 · Felaketler $6,3 · Tarih $9,9 · Belgesel $12,6 | "Kamuya açık açıklamalardan üçgenleme; denetlenmemiş" | `[VARSAYIM]` |
| SponsorRadar modeli (örtük) | FH: $2,3–5,8K/video @388K ort. ⇒ ~$6–15/1000; PD ve DB benzer ($6–15) | Araç modeli; bağımsız kaynak sayılmaz | `[VARSAYIM]` |
| Flippa satış ilanı | Belgesel (1,1M abone, ABD %45+): $7,44 RPM; başka iki "tarih/belgesel" ilanı ~$12 ve ~$20 | **Satıcı beyanı**, doğrulanmamış | `[VARSAYIM]` |
| OutlierKit (Ağu 2026) | "Hiçbir dış araç başka kanalın RPM'ini ölçemez"; tabloların çoğu CPM varsayımı × %55 | Meta-uyarı | `[VERİ]` |
| Genel blog sentezleri | Uzun format çoğu kanal $1–10; finans $10–30 | İkincil | `[VARSAYIM]` |

**Çelişki:** AIR'in gerçek-veri medyanı ($10,22) ile genel "çoğu kanal $1–10" ifadesi, ve Autonolab'ın felaket ($6,3) / mühendislik ($12,5) ayrımı örtüşmüyor. Nedenler: kapsam (kanal seçimi), RPM tanımı (tüm izlenme vs. monetize), ABD kitle payı, hassas konu reklam kısıtı.
**Planlama aralığı (kâğıt üzerinde) `[TAHMİN]`:** ~$4–10/1000 izlenme; felaket/ölüm içerikli videolarda limited ads durumunda aşağı yönlü risk (<$4). Gelir puanının RPM bileşeni bu yüzden orta (2,5/4). Örnek (gerçek veri değil, hesap): 150K ort. izlenme × $6 = ~$900/video.

### 6b. AdSense dışı seçenekler
- **Sponsorluk (gelen teklif):** Mentour's Black Box 6 marka, Disaster Breakdown/Plainly Difficult Ground News + Brilliant/PIA, Dark Records War Thunder/Ground News/Cookunity; Brick Immortar ve Fascinating Horror'da sponsor tespit edilmedi (`[VERİ, SponsorRadar]`). **Constraints:** cold outreach ve satış yok; yalnızca gelen sponsor teklifleri değerlendirilebilir (Founder kararı gerekir).
- **Kitap:** Practical Engineering'in Grady Hillhouse'u "Disasters by Design" kitabı çıkardı (https://www.ibs.it/disasters-by-design-ebook-inglese-grady-hillhouse/e/9798217046836, arama sonucu) — niş kitap potansiyeline dair sinyal; yeni kanal için ölçek yok `[VARSAYIM]`.
- **Üyelik/Patreon/Nebula:** erken aşamada ölçek bulunmuyor.
- **E-posta/web, ders/standartlar rehberi:** potansiyel var ama tamamen `[VARSAYIM]`; "doğrudan müşteri satışı yok" kısıtı içinde kalınacak.
Puan: **3/5 (4,8/8)**: RPM yarısı 2,5/4 + dışı 2/4 yaklaşık ≈ 4,5/8 → yuvarlandı.

---

## 7. Farklılaşma — test edilebilir açı

**Açı: "The Origin of a Rule" (Bir Kuralın Kökeni).** Her video tek bir bugünün kuralını/alışkanlığını (çıkış kapısı yönü, köprü denetim aralığı, iron ring, pencere şekli, çift imza, "stop work" yetkisi) bir başarısızlıkla bağlar ve **o gün kararı neden makul göründüğünü** gösterir. 5 sabit blok: (1) Bugünkü kural → (2) o gün vardığı varsayım → (3) karar/hata zinciri (birincil belgeden) → (4) kural nasıl yazıldı (kim/ne zaman) → (5) kuralın bugünkü sınırı ("bu kural yeterli mi?").

Neden uygun:
- Talep izi: FH "Sterile Cockpit Rule" videosu ~2,2M (kanal ortalamasının ~5,7×) `[VERİ, tek kaynak]`; Mentour BB benzer kalıp.
- Zamana duyarsız, evergreen; arama sorgusu olarak "why do X have Y" formu doğal `[VARSAYIM]`.
- Ölü sayısı kancası yerine "kural" kancası → reklam uygunluğu için daha güvenli ve "sömürücü" algısını azaltır.
- Orijinallik: rapor→kural bağını kuran özgün sentez (inauthentic/reused riskini düşürür).
- Üretim: PD arşiv + kendi diyagramı; fiziksel demo yok.

**Test tasarımı (Stage C / pilot, Founder onayı gerektirmeyen yerel iş):**
1. İlk 3 pilot video yerelde üretilir (yayın yok).
2. Yayın kararı Founder'dadır. Yayın sonrası 8 videoda **A/B-like**: 4 video "kural kancası" başlık, 4 video "olay+duygu" başlık (aynı kalite).
3. Eşikler `[VARSAYIM — analytics-analyst teyidi gerekir]`: 28. günde CTR ≥ %4, ort. izlenme süresi ≥ %38–40 (15 dk video), impression başına yeni abone > %0,3. Aşağıda kalırsa açı gözden geçirilir.
4. Küçük örneklemde gürültü yüksek; sonuç "ön sinyal" sayılır.
**Geri dönüş koşulu:** 8 videoda medyan izlenme < 1.000 ve CTR < %3 ise niş/açı sinyali zayıf kabul edilir; B1/B2/B4'e dönülür.

**Rakip örtüşme uyarısı:** Kalıp FH ve Mentour BB tarafından kullanılıyor; bu bir "yeni boşluk" değil, "seri omurgası olarak sistematik ve havacılık dışı" uygulama. Bu yüzden farklılaşma 3'te kaldı (kanıt: [VARSAYIM]).

---

## 8. Çerçeve v1.0 — güncellenmiş 12 kriter puan tablosu

| # | Kriter (ağırlık) | Puan (1–5) | Ağırlıklı | Gerekçe | Etiket |
|---|---|---|---|---|---|
| 1 | Talep (12) | 4 | 9,6 | Niş kanallarda ort. 184K–885K; 1,1–2,3M büyükler; küçük-orta Brick Immortar ~885K. Arama hacmi ölçülmedi; tek agregatör | `[VERİ]` tek kaynak + geçici (arama hacmi yok) |
| 2 | Retention (10) | 4 | 8,0 | 15–20 dk anlatılar çalışıyor (FH 2,2M, BI 2,5M); retention/AVD verisi hiç yok | `[VARSAYIM]` geçici |
| 3 | Evergreen (10) | 4 | 8,0 | BI 2024–2025 videoları hâlâ 1,2–2,5M; ancak "yıllar sonraki izlenme" kanıtı yok (yalnızca yeni videolar) | `[VERİ]` kısmi + `[VARSAYIM]` geçici |
| 4 | Konu havuzu (10) | 5 | 10,0 | 60 satır liste (56 kullanılabilir; ≥50 koşulu) | `[TAHMİN]` (olgular yazım öncesi doğrulanacak) |
| 5 | Thumbnail/merak (8) | 4 | 6,4 | "Kural/sonuç" ve evokatif kalıplar kanıtlı; thumbnail görselleri doğrulanamadı | `[VERİ]` başlıklar / `[VARSAYIM]` thumbnail |
| 6 | Farklılaşma (8) | 3 | 4,8 | "Kuralın Kökeni" açığı kısmen açık ama FH/Mentour BB kullanıyor; kanıtlanmış boşluk yok | `[VARSAYIM]` |
| 7 | **AI ile kalite koruma (8)** | **3** *(Stage A: 2)* | 4,8 | **Düşük/sınırda — açık uyarı.** Kaynak-destekli (verilen belge → senaryo) akış halüsinasyon riskini azaltır; ancak teknik doğruluk, diyagram üretimi ve fiziksel demo yokluğu kalite riskidir. Üretim hattı henüz denenmedi. Pilotla sonuç 2'ye düşebilir | `[TAHMİN]` geçici |
| 8 | Telif/reused (8) | 3 | 4,8 | PD arşiv ve raporlar güçlü; ancak kaza haber/video görüntüsü telifli, CSB "All Rights Reserved", üçüncü taraf görsel istisnaları; derleme formatı reused riski | `[VERİ]` (HAER/CSB/OGL) + `[VARSAYIM]` |
| 9 | Gelir (8) | 3 | 4,8 | RPM $4–10 planı (AIR gerçek-veri medyan $10,22 vs. araç tahmini $6,3); limited-ads riski; AdSense dışı seçenekler gelen sponsorluk/kitap, erken aşamada zayıf | `[VERİ]` kısmi + `[VARSAYIM]` geçici |
| 10 | Kaynak/görsel (7) | 4 | 5,6 | Resmî raporlar bol (NTSB/NIST/Cullen/Royal Commission); ≤1930 olaylar için PD görsel bol; modern olaylarda görsel kısıtlı | `[VARSAYIM]` / `[VERİ]` kısmi |
| 11 | Üretim süresi/maliyeti (7) | 3 | 4,2 | 18–26 saat (oturmuş), 26–37 saat (ilk); ElevenLabs ~$3–6/video | `[TAHMİN]` |
| 12 | Zamana duyarsızlık (4) | 5 | 4,0 | Tarihî olaylar; güncel olaylar dışlandı | `[VARSAYIM]` |
| | **Toplam (geçici)** | | **75,0** | | |

**Duyarlılık aralığı `[TAHMİN]`:** Muhafazakâr (AI 2, evergreen 3, retention 3, farklılaşma 2) ≈ **67,8**; iyimser (talep 5, evergreen 5, farklılaşma 4, AI 4) ≈ **82,6**. Aralık geniş; ±8 puan fark gürültü (Stage A ile tutarlı).

**Kritik koruma kuralları:**
| Kural | Sonuç |
|---|---|
| Talep/retention/evergreen herhangi biri ≤2 mi? | **Hayır** (4/4/4) — ancak retention ve evergreen **geçici** |
| Kriter 4: 50 fikir listelenebildi mi? | **Evet** (60 satır, 56 kullanılabilir) |
| Kanıtsız puan var mı? | Tüm puanlar etiketli; **retention, evergreen, AI kalitesi, RPM geçici** |
| AI ile kalite puanı düşük mü? | **Evet, 3 (Stage A'da 2). Açıkça belirtilir: bu adayın en zayıf operasyonel noktasıdır; pilot sonucu belirleyicidir.** |

**0–20K kanıtı:** Stage A sentezinin geri dönüş koşulu gereği, bulunamadığı için seçim kriteri "farklılaşma açısı + pilot video testi" olur (bkz. §7).

**H-001 (İngilizce/uluslararası):** Niş kanalların hepsi İngilizce ve küresel (FH/PD İngiltere merkezli, çoğunluğu ABD/UK izleyici); Practical Engineering kitlesi %67 ABD `[VERİ, tek kaynak, Stage A]`; Flippa belgesel ilanı ABD %45+ `[VARSAYIM: satıcı beyanı]`. Çelişen kanıt çıkmadı; **H-001 doğrulanmış sayılmaz**.

---

## Belirsizlikler
1. **0–20K yeni kanal kanıtı yok** (§2b). Veri tek agregatör; Blackout Docs video başı izlenmesi görülemedi; Mr. Paint verisi çelişkili.
2. **Arama hacmi/Trends yok**; talep yalnızca kanal izlenmelerine dayalı vekil ölçü.
3. **Retention/AVD, thumbnail CTR verisi yok.** Thumbnail görselleri incelenemedi.
4. **RPM:** gerçek niş RPM'i ölçülemez; AIR verisi tam metinden değil özetten okundu; kaynaklar çelişiyor (§6a).
5. **Politika:** Reklam uygunluğu sayfası 2022 tarihli (12 aydan eski görünüyor); hassas olay içerikli videolarda **fiilî** reklam durumu yalnızca YPP açıldıktan sonra Studio'dan görülür. Resmî kaynaklar AI sese açıkça değinmiyor.
6. **Fikir havuzu olguları** bu turda birincil kaynakla tek tek doğrulanmadı; Pilot 1 için ayrıca teyit gerekir (Iron Ring efsanesi/ritüel ayrımı dahil).
7. **Tek Founder'ın mühendislik doğrulama kapasitesi** bilinmiyor `[VARSAYIM]`.
8. **Üretim süresi tahminleri** ölçülmedi (Pilot 1 ile ölçülecek).
9. **Rakip veri çelişkisi:** Real Engineering ort. izlenme 679K (SponsorRadar) vs 1,3M (Autonolab-legacy); Fascinating Horror/Dark Records ortalamalarında yüksek varyans.

### ChatGPT ikinci görüşü (kalan boşluklar için — mevcut genel paket `2026-10-06-chatgpt-stage-b-prompt.md` ile örtüşmemesi için B3'e özel ek)
**Rol:** YouTube pazar analisti ve fact-checker.
**Bağlam:** İngilizce, faceless, long-form (10–25 dk) mühendislik ve altyapı başarısızlığı anlatıları için yeni bir YouTube kanalı değerlendiriliyor. Ücretli reklam ve satış yok; kaynaklı, "kuralın kökeni" açısı düşünülüyor. Gizli bilgi yok.
**Görev:** Aşağıdakileri doğrula, bulamazsan "bulunamadı/doğrulanamadı" yaz.
1. 2024–2026'da sıfırdan başlayıp 0–20K abone aralığında dikkate değer izlenme alan (≥100K'lık en az bir videosu olan) mühendislik/yapı/altyapı felaketi anlatılı kanallar: ad/link, abone, kanal açılış tarihi, en iyi 3 videosunun izlenmesi, video başına medyan izlenme.
2. Blackout Docs (@BlackoutDocs), CollapseZone ve Mentour's Black Box için son 12 videonun izlenme dağılımı ve kanal açılış tarihi; Mentour's Black Box'ın ilk 6 ayı.
3. Felaket/ölüm içerikli (grafik olmayan, belgesel) videolar için creator tarafından bildirilen "limited ads / yellow icon" deneyimleri (2025–2026) ve gerçek RPM aralıkları, en az iki bağımsız kaynakla.
**Çıktı:** Özet (≤5) · Bulgular (iddia · kaynak · tarih · güven) · Belirsizlikler/çelişkiler · Göreve özel: kanal tablosu.

---

## Şirket için anlamı
- B3, talep ve konu havuzu açısından güçlü; **farklılaşma ve AI ile kalite/görsel yükü zayıf halka**. Stage A'daki "AI ile kalite 2" bu raporda 3'e çıkarıldı (anlatı-merkezli format + kaynak-destekli yazım varsayımıyla); bu iyileşme **ölçülmedi**, pilotla doğrulanmalı.
- 0–20K kanıtı bulunamadığı için B3 "kanıtlanmış yeni kanal nişi" değil; **"yüksek talepli, pilotla test edilebilir açı"** olarak değerlendirilmeli.
- Ölüm içerikli konularda gelir riski (limited ads) tasarımla yönetilebilir; ancak tamamen elenmez.
- Haftada 40 saat ile üretim kapasitesi yeterli görünüyor (oturmuş ~18–26 saat/video); asıl darboğaz **doğrulama ve görsel şablon hattı**.

## Birincil öneri
**B3 birincil niş adayı olarak Stage B karşılaştırmasında kalsın; "Kuralın Kökeni" açısı ve Pilot 1 (Quebec Bridge 1907) ile test edilsin.** Bu turda aday koruma kurallarını geçiyor (koşullu: retention/evergreen/AI kalitesi geçici). Karar COO/Founder'a ait; B1/B2/B4 sonuçlarıyla birlikte karşılaştırılmalı.
**Geri dönüş koşulları:** (a) ChatGPT ikinci görüşü ve ek araştırma 0–20K kanıtı getirmezse ve (b) pilotta (yerel, yayınsız) kaynak-destekli senaryo + diyagram hattı Founder kalite eşiğini tutturamazsa (AI kalite puanı 2'ye düşer), B3 birincil öneriden çıkarılır ve B2/B4'e dönülür. Yeni ücretli araç ve para gerektirmez; ses üretimi öncesi Founder onayı (ElevenLabs "açık nokta") gerekir.

## Kaynaklar (erişim 2026-10-06)
- Resmî: https://support.google.com/youtube/answer/1311392?hl=en · https://support.google.com/youtube/answer/14328491?hl=en · https://support.google.com/youtube/answer/6162278?hl=en · https://blog.youtube/news-and-events/improving-ai-labels-viewers-creators/ (27 May 2026)
- Lisans/arşiv: https://commons.wikimedia.org/wiki/Commons:Licensing · https://loc.gov/pictures/item/ca3152/ (HAER hak notu, arama özeti) · https://www.csb.gov/videos/ · https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/open-government-licence/
- Fiyat: https://elevenlabs.io/pricing
- Kanal verileri (üçüncü taraf): https://sponsorradar.com/channels/{brickimmortar, plainlydifficult, fascinatinghorror, disasterbreakdown, darkrecordsdocs, mentourblackbox, collapsezoneyt, theb1m, realengineering} · https://outlierkit.com/channel/{practicalengineeringchannel, humanerrortech, thefactoran} · https://www.speakrj.com/audit/report/UCjw9YUv4UoA3d0V_Pc6zLTQ/youtube · https://vling.net/en/channel/UCAJurFpws8jtYVV3aX21Tgg/channel-info · https://vidanalyze.com/channel/mrpaintstoriesofficial/statistics
- Legacy/tahmin (kullanım sınırlı): https://blog.autonolab.com/niches/2025-12-16-faceless-youtube-disasters/ · https://blog.autonolab.com/niches/2026-02-10-faceless-youtube-engineering/ · https://blog.autonolab.com/blog/2026-09-07-youtube-rpm-by-niche-98-faceless-niches-data/
- RPM: https://air.io/en/air-data-findings/how-much-does-youtube-really-pay-in-2026-real-rpm-data-from-300-channels (özet) · https://outlierkit.com/resources/youtube-rpm-benchmarks/ · https://flippa.com/13029035-fast-growing-youtube-documentary-brand-1m-subs-416k-revenue-12-months-audience-usa-45-and-a-7-44-rpm (satıcı beyanı)
