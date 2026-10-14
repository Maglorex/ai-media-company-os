# Öğrenimler

> Kurumsal hafıza. Her öğrenim kanıta bağlanır. Tekrar doğrulanan öğrenimler `strategy.md`'ye taşınmaya adaydır.

## Format
```
### L-XXX — Kısa başlık
- Tarih:
- Kaynak: (deney no / araştırma dosyası / kanal verisi)
- Öğrenim:
- Güven: Düşük / Orta / Yüksek
- Uygulama: (bundan sonra neyi farklı yapıyoruz)
```

---

### L-001 — Niş araştırmasında veri sınırı: tek kaynaklı kanal verisi, çelişkili RPM
- Tarih: 2026-10-06
- Kaynak: Faz 1 Stage A ve B raporları (`intelligence/market-research/2026-10-06-faz1-stage-*`)
- Öğrenim: Üçüncü taraf araçların (OutlierKit, Social Blade vb.) kanal verisi tek kaynaklı ve anlık görüntüdür; hayatta kalma yanlılığı vardır. Niş bazlı RPM kaynakları 5–10× çelişebilir (aynı niş için $2 ile $7–28). Arama hacmi, retention ve doğrudan YouTube kanal sayfaları araçlarımızla okunamadı. Bu yüzden puanlar adaylar arasında gürültü bandında (~±7) kaldı ve seçim "puan"dan çok "farklılaşma açısı + pilot testi"ne dayanmak zorunda.
- Güven: Orta (tek araştırma turu, 4 aday)
- Uygulama: Niş/talep kararlarında puan farkı <8 ise puanı karar ölçütü yapma; kanıtı artıran adım (pilot, ChatGPT ikinci görüşü, doğrudan veri) iste. Alt ajan raporundaki platform politikası gibi kritik iddiaları kullanmadan önce COO bağımsız doğrular (örn. 2027 YPP eşiği).

### L-002 — Niş seçiminde RPM gerekçe değildir
- Tarih: 2026-10-07
- Kaynak: Stage B B2 raporu (RPM çelişkisi), AIR Media-Tech 2026 (B&F medyanı $2,01, <10 kanal), ChatGPT ikinci görüşü (`intelligence/market-research/2026-10-07-chatgpt-stage-b-ikinci-gorus.md`)
- Öğrenim: Do not select N2 because of assumed high RPM. Select N2 because recent small-channel evidence shows strong browse demand, evergreen topic depth, documentary retention potential and a repeatable faceless production model. Treat RPM as unknown until our own Studio data exists.
  (TR: N2'yi varsayılan yüksek RPM nedeniyle seçme. Gerekçe; güncel küçük kanal kanıtındaki güçlü browse talebi, evergreen konu derinliği, belgesel retention potansiyeli ve tekrarlanabilir faceless üretim modelidir. Kendi Studio verimiz oluşana kadar RPM bilinmiyor kabul edilir.)
- Güven: Yüksek (Founder kararı + çoklu kaynaktaki 5–10 katlık RPM çelişkisi)
- Uygulama: Gelir planlarında RPM aralığı yalnızca senaryo olarak kullanılır, karar gerekçesi olmaz. Gelir kriteri (çerçeve kriter 9) RPM'i en fazla 4 puanla sınırlamaya devam eder.

### L-003 — İkincil özetler bağlamı siler; kanal kanıtını kaynağında oku
- Tarih: 2026-10-07
- Kaynak: ChatGPT ikinci görüşünün COO tarafından doğrulanması (OutlierKit kanal sayfaları)
- Öğrenim: ChatGPT özeti Persimmon Archive'ı genel "iş/teknoloji tarihi" breakout'u olarak sundu. Kaynağında kanal **golf endüstrisi** dikeyi, 2–3 aylık ve "yüksek derecede şablonlu". Doğrulanan breakout'ların hepsi dar dikey + şablonlu formül + yaşlı ABD erkek kitle. Bu bağlam konumlandırma kararını değiştirdi: geniş değil, az işlenmiş dikeylerle başlanacak.
- Güven: Orta (3–4 örnek, tek kaynak)
- Uygulama: Karar etkileyen kanal örnekleri, kullanılmadan önce kaynağından niş, kanal yaşı, format ve kitle bilgisiyle okunur.

### L-004 — Üretim süresi tahmini formatın görsel yüküne göre yapılmalı
- Tarih: 2026-10-07
- Kaynak: EXP-001 Aşama 1, production-engineer değerlendirmesi
- Öğrenim: Stage B'deki 25–35 s/video tahmini, üçüncü taraf solo yapımcı verisine (16–28 s) dayanıyordu ve özgün diyagram/harita/belge animasyonu yükünü içermiyordu. Format bazlı tahmin ilk video için 77–125 s (+50–70 s şablon), olgun üretimde 41–62 s `[TAHMİN]`. Ölçümle doğrulanmadı.
- Güven: Düşük-orta (tahmin; ölçüm bekleniyor)
- Uygulama: Süreye bağlı karar koşulları (D-007 >40 s) tahmine göre değil, ölçülen süreye göre işletilir. Süre aşımında ilk seçenek format sadeleştirmedir.

### L-005 — Taranmış belgeden alıntı, metin çıkarımına değil sayfa görüntüsüne göre doğrulanır
- Tarih: 2026-10-10
- Kaynak: P3 evidence ledger E-14, E-11 (`production/pilots/2026-10-n2-pilot-test/P3-evidence-ledger.md`); render bilgisayarı P3 checkpoint'i
- Öğrenim: GAO B-136209 s.12'deki 'one ship system' ifadesi metin çıkarımında açılış tırnağı "l" okunarak "lone ship system" oldu ve senaryo, ledger ve animasyona yayıldı. C-31'deki ekipman özeti de kaynağı kısaltmıştı. Metin çıkarımı (OCR/PDF text) alıntı için güvenilir kanıt değildir.
- Güven: Orta (tek video, iki somut hata)
- Uygulama: Ekranda veya VO'da tırnak içinde kullanılacak her ifade kaynağın sayfa görüntüsünden (`production/tools/pdf/pdf-to-png.ps1`) okunarak ledger'a yazılır. Aynı yöntem vergi/mevzuat PDF doğrulamasında da kullanılır (2026-10-10, GİB rehberi).

### L-006 — Founder kararı nerede verilirse verilsin aynı gün kanonik karar kaydına işlenir
- Tarih: 2026-10-10
- Kaynak: D-016/D-021 (ses modeli kararı backlog ve EXP-002'de vardı, decision-log'da yoktu); D-008, D-010–D-013 durum satırları eskimişti.
- Öğrenim: Kararın yalnız backlog/deney/üretim kaydında kalması, sonraki oturumun aynı kararı Founder'a yeniden sormasına yol açtı (2026-10-10, v2/v4 sorusu). Durum satırları sonraki kararlarla güncellenmezse karar kaydı gerçek durumu yansıtmaz.
- Güven: Yüksek (iki somut örnek)
- Uygulama: Founder kararı alındığında aynı turda `company/decision-log.md`'ye D- olarak işlenir; önceki kararın "bekleniyor/sıradaki" durumu karşılandığında o satıra tarihli güncelleme eklenir. Soru sormadan önce `founder-interface` §6b-2 kontrolü yapılır.

### L-007 — Kanıt doğruluğu izlenebilirlik değildir; yaratıcı yön üretimden önce, kısa kesitle test edilir
- Tarih: 2026-10-11
- Kaynak: CF-001 (P3 tam review kurgusu reddedildi), D-025
- Öğrenim: P3'te kanıt, ses ve grafik hattı doğru çalıştı ama video "slayt sunumu" gibi oldu. Kök neden sistemdeydi: yaratıcı yön katmanı yoktu; senaryo hook ve görsel dil düşünülmeden kilitlendi; görsel plan "söyleneni göster" mantığıyla literal eşleme yaptı; foto + pan + kart fiilî varsayılan oldu, hareketli arşiv hiç aranmadı; en görsel paradoks (Galveston tesisi) videonun ortasına gömüldü, bağlam başa yığıldı; ve yön, kısa bir kesitle denenmeden 8:19 tam üretim yapıldı.
- Güven: Orta (tek video, ama kök nedenler süreçte açıkça görülüyor)
- Uygulama: Her videoda creative treatment senaryo kilidinden önce; her sahnenin işi yazılır; arşiv footage taranır; ilk 60–90 sn prototype Founder kapısından geçmeden full production yok (`documentary-creative-standards`).

### L-008 — İzlenebilirlik görsel değişim hızından ve sorulardan gelir; premise tavanı belirler
- Tarih: 2026-10-13
- Kaynak: D-029, doctrine v1 §1–§2 (16 video shot-level)
- Öğrenim: Başarılı kanallarda ekran ortalama 2,6–4,4 sn'de yeni bir şey gösteriyor, açılışta somut nesne + anormallik + açık soru var ve mekanizma bir insan senaryosunda anlatılıyor; P3'te ~12,8 sn/beat, hareketli görüntü yok, insan yok, yapı rapor sırasıydı. Kanal içinde üretim dili sabitken izlenme 3–30× değişiyor → görsel dil tabanı, premise tavanı belirliyor (çıkarım).
- Güven: Orta-yüksek (ölçüm DV; premise nedenselliği INF)
- Uygulama: doctrine v1 §12 rubric her prototype öncesi; kendi render'ımız aynı araçla (shotscan) ölçülür.

### L-009 — Açık "read-only / implementation yok" talimatı her genel yetkinin önündedir
- Tarih: 2026-10-14
- Kaynak: Company OS v2 Phase 1 — COO, "read-only audit + rapor" talimatına rağmen genel "yerel commit onay gerektirmez" iznine dayanarak iki plan dosyası oluşturup commit etti (`7354fb5`). Founder bunu process failure olarak işaretledi; commit non-canonical DRAFT olarak `draft/os-v2-phase1-plan` dalına ayrıldı, `main` `4659823`'e geri alındı (Stage 0).
- Öğrenim: Genel izinler (yerel commit serbest, güvenli işi doğrudan yap, Production Autonomy) Founder'ın o oturum için koyduğu açık kısıtı geçersiz kılmaz. "Yararlı dokümantasyon" bir istisna değildir.
- Güven: Yüksek (doğrudan Founder düzeltmesi)
- Uygulama: Founder "read-only", "implementation yok", "dosya değiştirme", "commit alma" veya "yalnız Stage N" dediyse kapsam dışı hiçbir dosya oluşturulmaz/değiştirilmez, commit alınmaz; bulgu ve öneri yalnız raporda verilir. Kural: `.claude/rules/governance.md` §5; `founder-approval.md`, `self-repair-and-escalation.md`, `git-and-secrets.md` bu istisnayı taşır.

### L-010 — Düzeltme/statü kaydı: L-007 ve L-008 güncel talimat değildir
- Tarih: 2026-10-14
- Kaynak: Company OS v2 Stage 2 (D-043, D-045; kanal canon TIC-26, TIC-28–TIC-30); clean-room kabul testi bulgusu.
- Öğrenim: L-007 ve L-008 tarihî kayıt olarak aynen kalır, ancak içlerindeki iki uygulama artık geçerli değildir: (1) L-007'deki "her videoda ilk 60–90 sn prototype Founder kapısından geçmeden full production yok" yaklaşımı **D-043 / TIC-26 tarafından SUPERSEDED**'dır — rutin videoda zorunlu prototype yoktur; prototype yalnız kalibrasyon, CASE-SPECIFIC ihtiyaç veya riskli/yeni formatta kullanılır. (2) L-008'deki saniye değerleri (ör. görsel olay aralıkları, sn/beat) **DIAGNOSTIC gözlemdir**; creative threshold, hedef veya PASS/FAIL kuralı değildir (TIC-28–TIC-30; sabit saniye/oran kuralı yok, TIC-29).
- Güven: Yüksek (Founder kararı D-043, D-045)
- Uygulama: Hiçbir skill/oturum L-007 veya L-008'i güncel talimat olarak uygulamaz; kanal kuralları için yetkili kaynak kanal canon'udur (`channels/the-industrial-casebook/canon/README.md`). L-007'nin kalıcı kısmı (creative treatment senaryodan önce; her sahnenin bir işi) canon'da TIC-13/TIC-20 ile yaşar.
