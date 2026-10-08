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
