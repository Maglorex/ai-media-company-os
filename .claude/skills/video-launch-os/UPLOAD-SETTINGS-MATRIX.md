# Upload Settings Matrix v1 (long-form)

> Karar: D-036. Kaynak: `intelligence/growth/launch-os/youtube-official-principles.md` (P-01…P-21, erişim 2026-10-13). Studio etiketleri değişebilir → kanal açılışında `capabilities.md` checklist'i ve her yayında `pre-publish-qa` (Release Gate) doğrular.
> **WHO DECIDES:** `SYSTEM` = Company OS paketi doldurur, Founder sormaz · `FOUNDER` = yalnız tabloda yazan istisnada · `FOUNDER (gate)` = yalnız Release Gate MANUAL-DECISION verirse.
> Değerler publish package JSON'undaki alan adlarıyla (`settings.*`) eşleşir.

| Alan (`settings.`) | DEFAULT | WHEN TO OVERRIDE | WHO DECIDES | EVIDENCE REQUIRED | PRE-PUBLISH CHECK |
|---|---|---|---|---|---|
| `title` | Packaging v2 birincil title (≤100 krt; önemli bilgi başta; case no yok) | A/B Winner sonrası; yanlış/kanıtı aşan ifade bulunursa | SYSTEM (packaging onaylı) | Packaging kararı + ledger satırları | Kanıt eşleşmesi; uzunluk; thumbnail ile tekrar yok |
| `thumbnail` | Final thumbnail (THUMBNAIL-PRODUCTION-SPEC) | A/B Winner | SYSTEM | Rights ledger satırları (asset'ler) | Spec QC + rights PASS |
| `description` | Paket description (benzersiz; ilk 2–3 satır konu+çatışma) | — | SYSTEM | Ledger (kaynaklar), rights/audio ledger (kredi) | Release Gate G-05 |
| `playlist` | Yok (ilk videolar) | ≥2 aynı kovada video varsa; series playlist yalnız doğrulanmış hesapla, video başına tek series, yalnız kendi + haklı videolar (P-22) | SYSTEM | Kova tanımı | Doğru playlist / series kuralı |
| `audience.made_for_kids` | **No** (genel/yetişkin belgesel izleyicisi) | İçerik çocuklara yönelikse (bu kanalda beklenmez) | SYSTEM; şüphe → FOUNDER (gate) | Hedef izleyici (packaging), içerik | Paket = Studio |
| `audience.age_restriction` | **No** | Şiddet/rahatsız edici görüntü/tehlikeli eylem gösterimi (ör. kaza, ölüm arşivi) | SYSTEM öneri → FOUNDER (gate) (A/B ve erişimi etkiler) | Sahne listesi + P-16 kriterleri | MANUAL-DECISION gerekiyorsa çözülmüş |
| `branded_content.paid_promotion` | **No** | Sponsor, ürün yerleştirme, ücretli onay, karşılıksız ürün varsa | FOUNDER (anlaşma onun işlemi) → SYSTEM işaretler | Sponsorluk kaydı (finance) | finance ile tutarlı |
| `altered_content` | **No** (stilize illüstrasyon/diyagram gerçekçi değil) | Foto-gerçekçi gerçek olay/yer/kişi değişimi veya gerçekçi olmamış sahne | SYSTEM; belirsiz → FOUNDER (gate) | Asset ledger AI kayıtları + P-13 sayfası yeniden okuma tarihi | Release Gate G-11 |
| `chapters.automatic` | **Off** manuel chapter varsa; manuel yoksa **On** | — | SYSTEM | Chapter kararı | Tutarlı |
| `chapters.manual` | Final sonrası karar; kullanılırsa 00:00, ≥3, artan, ≥10 sn, spoiler yok | Video kısa/tek akışsa kullanılmaz (gerekçe yazılır) | SYSTEM | Final edit TC'leri | Release Gate G-06 |
| `featured_places` | **On** (otomatik; zararsız, yerleri öne çıkarır) | Yanlış yer önerisi riski (isim karışıklığı) görülürse Off | SYSTEM | — | Studio önizlemesi |
| `tags` | **Boş** | Yalnız: yaygın yanlış yazım · alternatif ad · kısaltma · isim belirsizliği (gerekçe pakette) | SYSTEM | Search Intent Brief | Stuffing yok |
| `language.video` | **English** | — | SYSTEM | — | Studio = paket |
| `language.title_description` | **English** | Lokalizasyon (analytics gerekçeli, ileride) | SYSTEM | Coğrafya verisi | — |
| `caption_certification` | "Bu içerik ABD TV'de hiç yayınlanmadı" muafiyet seçeneği (tam metin Studio'da doğrulanır) | İçerik TV'de yayınlanmışsa | SYSTEM | Yayın geçmişi | Seçili |
| `recording_date_location` | **Boş** (arşiv belgeseli; çekim yok) | Kendi saha çekimi yapılırsa (tarih/yer) | SYSTEM | Çekim kaydı | Yanlış tarih yok (arşiv tarihi buraya girmez) |
| `license` | **Standard YouTube License** | Asla CC BY (üçüncü taraf/müzik/AI asset'leri var) — tamamen kendi içeriğimizse ve Founder isterse | SYSTEM; CC → FOUNDER | Rights ledger | Standard seçili |
| `distribution.embedding` | **Allow** | Hak sahibi şartı gerektirirse | SYSTEM | Rights ledger kısıtı | — |
| `distribution.notify_subscribers` | **On** (yayın anında) | Sessiz yeniden yükleme/düzeltme | SYSTEM | — | — |
| `shorts_remixing` | **Off** (üçüncü taraf ses/müzik lisansı remix'e uygun olmayabilir) | Tüm ses kendi + lisans izin veriyorsa On | SYSTEM | Audio ledger lisans koşulları | Uygun |
| `category` | **Education** (alternatif: Science & Technology) — kanal genelinde tek seçim, kanal açılışında kilitlenir | Konu tamamen başka kategoriye aitse | SYSTEM | — | Kanal varsayılanıyla aynı |
| `comments` | **On**, "Hold potentially inappropriate comments for review" (Studio seçeneği adı kanal açılışında doğrulanır) | Hassas konu/taciz riski | SYSTEM | — | — |
| `ratings.show_like_count` | **On** | — | SYSTEM | — | — |
| `cards` | Yok | İzleyiciye gerçek değer (ilgili case, açıklayıcı video, playlist) | SYSTEM | Hedef video | Retention'ı bozmayan TC |
| `end_screen` | Video ≥25 sn; son 5–20 sn; ilk video: Subscribe + (varsa) best for viewer/playlist | Kanalda ilgili video oluştukça | SYSTEM | Edit'te ayrılan alan TC | Release Gate G-07 |
| `captions` | İngilizce SRT (final VO'dan; CAPTION-PROTOCOL) | — | SYSTEM | Caption QC raporu | Release Gate G-03 |
| `visibility` | **Private** upload → QA → **Public** (veya planlı) | Unlisted ön izleme gerekirse | SYSTEM; public'e geçiş FOUNDER onayıyla | Release Gate PASS | Public yalnız PASS + onay |
| `scheduling` | Paketteki zaman (ilk videolarda deney; saat dilimi yazılı) | Production gecikmesi | SYSTEM | FC deney hipotezi | Zaman + dilim |
| `ab_test` | ELIGIBILITY mantığına göre (SKILL §7) | — | SYSTEM (launch onayının parçası) | `capabilities.md` | Release Gate G-15 |
**Founder'a normal videoda bu tablodan soru gitmez.** İstisnalar yalnız: age restriction gerekliyse · paid promotion varsa · altered content belirsizse · made for kids şüphesi varsa · CC lisans isteği.
