# Karar Kaydı

> Önemli her karar buraya eklenir. Kayıtlar silinmez; geri alınan karar yeni bir kayıtla işaretlenir.

## Format
```
### D-XXX — Başlık
- Tarih:
- Karar veren: Founder / COO (Founder onaylı)
- Bağlam:
- Seçenekler:
- Karar:
- Gerekçe / kanıt: ([VERİ] / [VARSAYIM] etiketli)
- Geri dönüş koşulu: (hangi veri bu kararı değiştirir)
- Durum: Aktif / Geri alındı (D-YYY)
```

---

### D-001 — Şirket işletim sistemi kurulumu ve başlangıç kısıtları
- Tarih: 2026-10-06
- Karar veren: Founder
- Bağlam: Şirketin kuruluşu.
- Karar: Klasör yapısı ve CLAUDE.md anayasası oluşturuldu. Başlangıç kısıtları: ücretli reklam yok, doğrudan satış / cold outreach yok, gereksiz SaaS yok, mevcut araçlar Claude + ChatGPT + ElevenLabs, yeni masraflar Founder onaylı. İlk odak YouTube.
- Gerekçe: Founder talimatı.
- Geri dönüş koşulu: Founder kararı.
- Durum: Aktif

### D-002 — Doğrulanmış başlangıç koşulları
- Tarih: 2026-10-06
- Karar veren: Founder
- Bağlam: Founder Setup Report onaylandı; Founder Intake başlangıcı.
- Karar: İş modeli (organik dijital medya varlıkları, YouTube, orijinal faceless long-form, Shorts türev), finansal politika (reklam 0, yeni ücretli araç Founder onaylı, yazılım masrafı minimum), araçlar (Claude Pro/Code, ChatGPT, ElevenLabs; Remotion/FFmpeg değerlendirilecek), Founder rolü, ChatGPT iş birliği ve git politikası doğrulandı.
- Gerekçe: Founder talimatı.
- Geri dönüş koşulu: Founder kararı.
- Durum: Aktif
- Detay: `company/constraints.md`, `company/strategy.md`, `CLAUDE.md`

### D-003 — Founder Intake tamamlandı
- Tarih: 2026-10-06
- Karar veren: Founder
- Bağlam: Açık başlangıç koşullarının netleştirilmesi.
- Karar: Dil/pazar İngilizce-uluslararası (stratejik varsayım H-001, araştırmayla doğrulanacak); Founder zamanı ~40 saat/hafta; Claude Pro dışında yeni sabit abonelik yok (zorunlu + açık ROI istisnası Founder değerlendirmesiyle); ChatGPT Plus; ElevenLabs pay-as-you-go, hazır sesler; kanal yok; render makinesi Ryzen 5 5600 / 16 GB / RX 580; konu tercihi yok; sabit zaman ufku yok, görünür ilerleme beklentisi; günlük brief.
- Gerekçe: Founder yanıtları.
- Geri dönüş koşulu: H-001 için niş araştırması sonucu; diğerleri Founder kararı.
- Durum: Aktif
- Detay: `company/constraints.md`

### D-004 — Company OS v0.2
- Tarih: 2026-10-06
- Karar veren: Founder
- Bağlam: Ölçeklenebilir çalışma düzeni; CLAUDE.md'nin kısa tutulması.
- Karar: 3 uzman agent (research-analyst, analytics-analyst, production-engineer), 4 skill (founder-brief, research-request, decision-review, session-close), 4 kural grubu (founder-approval, evidence-and-research, git-and-secrets, company-memory). Ana oturum COO olarak kalır. Kanıt etiketleri yalnızca araştırma raporları, önemli stratejik kararlar ve kritik belirsizliklerde kullanılır.
- Gerekçe: Founder talimatı.
- Geri dönüş koşulu: Founder kararı.
- Durum: Aktif

### D-005 — Company OS v0.3: self-management katmanı
- Tarih: 2026-10-06
- Karar veren: Founder
- Bağlam: Niş araştırmasından önce sistemin kendi sağlığını ve iki bilgisayar düzenini yönetebilmesi; Founder'ın teknik yükünün azaltılması.
- Karar: `systems-operator` agent'ı; `system-health-check`, `machine-onboarding`, `founder-help` skill'leri; `self-repair-and-escalation.md` kuralı (önce teşhis ve güvenli yerel onarım, Founder'a tek çözümle eskalasyon; para, yayın, credential, remote git ve geri döndürülemez işlemler onaylı kalır); `FOUNDER-MANUAL.md`; makine kaydı `company/machines.md`. CLAUDE.md'ye yalnızca kısa referans eklendi. İlk health check: 9/9 geçti.
- Gerekçe: Founder talimatı.
- Geri dönüş koşulu: Founder kararı.
- Durum: Aktif
- Detay: `.claude/`, `FOUNDER-MANUAL.md`, `company/machines.md`

### D-006 — Faz 1 başlatıldı; niş değerlendirme çerçevesi ve iki aşamalı yürütme
- Tarih: 2026-10-06
- Karar veren: Founder
- Bağlam: Founder Brief'teki niş araştırması önerisi kabul edildi; Founder çerçevenin güçlendirilmesini istedi.
- Karar: Faz 1 (G-2) onaylandı. Çerçeve v1.0 (`intelligence/market-research/niche-evaluation-framework.md`): eleme kapısı + 12 ağırlıklı kriter; RPM tek başına öncelikli değil (gelir kriteri 8/100, RPM en fazla 4); talep/retention/evergreen alt sınırı; birincil öneri için ≥50 video fikri şartı. Yürütme: Stage A Discovery (10–15 aday) → Stage B Validation (en iyi 3–5) → `decision-review` → Founder'a birincil niş önerisi. Ara kararlarla Founder bölünmez; yalnızca onay gerektiren durum veya ChatGPT'ye aktarılacak araştırma için dönülür.
- Gerekçe: Founder talimatı. Niş seçimi tüm sonraki kararların ön koşulu; RPM odaklı seçim düşük hacim/retention riski taşır `[VARSAYIM]`.
- Geri dönüş koşulu: Stage A/B bulguları çerçevenin yanlış ağırlıklandırıldığını gösterirse çerçeve yeni sürümle güncellenir (Founder bilgilendirilir).
- Durum: Aktif
- Detay: `intelligence/market-research/niche-evaluation-framework.md`, `company/goals.md` (G-2)

### D-007 — Faz 1 birincil niş: N2 — Industrial & Technology Autopsies (ONAYLANDI)
- Tarih: 2026-10-07
- Karar veren: Founder (COO önerisi; onay 2026-10-07)
- Bağlam: Stage A (18 aday) → Stage B (4 aday, puanlar 75,0–77,9 gürültü bandında) → ChatGPT ikinci görüşü (sıra: N2 > N4 > N3 > N1) → `decision-review`.
- Seçenekler: N1 nedensellik tarihi, N2 iş/teknoloji/endüstri tarihi, N3 mühendislik/felaket, N4 doğa/derin zaman.
- Karar: İlk kanal nişi N2. Konumlandırma: belge-öncelikli iş, teknoloji ve endüstri otopsileri. Seçim gerekçesinde yüksek RPM varsayımı kullanılmaz; RPM kendi YouTube Studio verimiz oluşana kadar bilinmiyor kabul edilir (L-002). Önceki öneri metni: Konumlandırma "Industrial & Technology Autopsies", belge-öncelikli açı; ilk testler az işlenmiş endüstriyel/teknik dikeylerde. Yedek: N4.
- Gerekçe / kanıt: En temiz güncel küçük kanal breakout kanıtı `[VERİ, tek kaynak]` (Persimmon Archive, Ruined America, The Money Files, Lost Industries); evergreen ve 62 fikirlik havuz `[VERİ]`; documentary retention potansiyeli `[VARSAYIM]`; AI/tek-Founder üretimine uygun görsel modeli (kamu belgesi/arşiv/özgün grafik) `[VERİ]` lisans. RPM gerekçe değil (L-002).
- Geri dönüş koşulu: Pilot >40 s/video veya düşük doğrulanabilirlik → N4; ilk 9 videoda iki dikeyde de CTR <%4 ve ortalama izlenme yüzdesi <%35 → yeniden değerlendirme; politika veya pazar sinyali. Ayrıntı karar dosyasında.
- Durum: Aktif
- Not: Pilot süre tahmini (ilk video 77–125 s) >40 s koşulunu aşıyor. Koşul, ölçülen pilot süresiyle yeniden değerlendirilip Founder onayına getirilecek (`production/pilots/2026-10-n2-pilot-test/pilot-selection-report.md`).
- Detay: `intelligence/market-research/2026-10-07-faz1-decision-review.md`, `intelligence/market-research/2026-10-07-chatgpt-stage-b-ikinci-gorus.md`

### D-008 — Pilot taslak testi başlatıldı; ilk tam pilot önerisi P3
- Tarih: 2026-10-07
- Karar veren: Founder (pilot testi başlatma) · COO (konu seçimi; ilk pilot önerisi Founder onayı bekliyor)
- Bağlam: D-007 sonrası üretim modelinin gerçek iş üzerinde testi (EXP-001).
- Karar: 3 pilot taslağı hazırlandı: P1 Brewster Aeronautical, P2 Westinghouse J40, P3 NS Savannah. Baldwin YouTube kapsaması yüksek olduğu için elendi. Kanal, yayın, ElevenLabs, ücretli araç ve render yok.
- Öneri (onay bekliyor): İlk tam pilot P3 NS Savannah (karşılaştırma 33/40; en iyi kaynak, en düşük risk ve süre). Sonraki P2.
- Geri dönüş koşulu: P3 senaryosunda merkezdeki nedensellik ("vitrin tasarımı → maliyet") kaynakla desteklenemezse açı daraltılır veya P2'ye geçilir.
- Durum: Aktif (P3 tam senaryosu için onay bekleniyor) → **Güncelleme 2026-10-10:** P3 senaryosu onaylandı ve kilitlendi (D-013; v2.1 D-014). P3 üretimde.
- Detay: `production/pilots/2026-10-n2-pilot-test/`, `intelligence/experiments/EXP-001-n2-pilot-taslak-testi.md`

### D-009 — Skill Lab v0.1: üçüncü taraf araç değerlendirme sistemi
- Tarih: 2026-10-08
- Karar veren: Founder
- Bağlam: Dış GitHub skill/plugin/MCP'lerin Company OS'a güvenli şekilde alınması ihtiyacı; P3 pilotundan önce.
- Karar: `skill-evaluator` skill'i (15 kontrol, risk seviyesi, 4 karar), `third-party-skill-security.md` kuralı, `systems-operator` Skill Lab teknik denetleyicisi, `intelligence/skill-lab/` (README, registry, evaluations). `founder-approval.md`'ye üçüncü taraf kurulum/çalıştırma/credential onay maddeleri eklendi (genel "klasör içi dosya oluşturma" izniyle çelişkiyi gidermek için). Registry'ye 4 aday `PENDING REVIEW` olarak eklendi; hiçbiri kurulmadı. Adobe Premiere/After Effects MCP'leri kapsam dışı.
- Gerekçe: Founder talimatı. Tedarik zinciri ve prompt injection riski; üçüncü taraf talimatların anayasayı aşma riski.
- Geri dönüş koşulu: Founder kararı.
- Durum: Aktif (2026-10-08: Founder `.claude/` kopyalamasını tamamladı, `_install-skill-lab-v0.1` silindi)
- Detay: `intelligence/skill-lab/`

### D-010 — SL-002 (youtuber-skills) değerlendirmesi kabul edildi; adaptasyon henüz başlamadı
- Tarih: 2026-10-08
- Karar veren: Founder (değerlendirmeyi kabul) · COO (değerlendirme)
- Bağlam: Skill Lab v0.1 sonrası ilk aday; YouTube üretim iskeleti ihtiyacı (P3 pilot, ilk kanal hattı).
- Karar: `ravsau/youtuber-skills` commit `603367b` statik incelendi (MIT, yalnız Markdown, script/credential yok; risk Orta). `youtube-packaging`, `youtube-script`, `youtube-edit-list`, `youtube-outliers`, `youtube-virality-gate`: **ADAPT BEFORE USE**. `youtube-connect` ve `AGENTS.md`: **REJECT**. Hiçbir bileşen kurulmadı veya adapte edilmedi; adaptasyon ayrı Founder onayı bekliyor. P3 pilotu beklemede.
- Gerekçe / kanıt: Teknik risk düşük `[VERİ]` (dosya incelemesi); asıl risk creator kaynaklı kuralların 10–25 dk belge-öncelikli faceless formata körü körüne uygulanması `[VARSAYIM]` — kurallar heuristic olarak etiketlenip uyarlanacak.
- Geri dönüş koşulu: Repo yeni commit'e geçerse yeniden inceleme; adaptasyon sonrası pilotta fayda görülmezse skill'ler kullanımdan çıkarılır (kayıt silinmez).
- Durum: Aktif (adaptasyon onayı bekleniyor) → **Güncelleme 2026-10-10:** 5 bileşenin 2'si uyarlandı (`documentary-virality-gate`, `documentary-packaging` — D-011); kalan 3 (script, edit-list, outliers) ayrı Founder onayı bekliyor (backlog).
- Detay: `intelligence/skill-lab/evaluations/2026-10-08-youtuber-skills.md`, `intelligence/skill-lab/registry.md`

### D-011 — Video fikri kapıları, Founder arayüzü ve dil kuralı
- Tarih: 2026-10-08
- Karar veren: Founder
- Bağlam: SL-002 değerlendirmesi (D-010) sonrası ilk iki uyarlama ve Founder'ın teknik detay bilmeden çalışabilmesi ihtiyacı.
- Karar: (1) `documentary-virality-gate` ve `documentary-packaging` skill'leri Company OS'a özgü yazıldı (metin kopyalanmadı; SL-002 kaynağı atıflı); danışma niteliğinde, karar Founder'da. (2) P3 NS Savannah premise'i GAO'nun gösterdiği seviyeye indirildi (v2: nükleere özgü kalemler konvansiyonel gemilere göre yaklaşık yıllık ~2M $ ek yük/fazla sübvansiyon; kaynaksız vitrin nedenselliği çıkarıldı); gate sonucu READY FOR PILOT; packaging önerisi Concept 1, yedek Concept 5 (koşullu). (3) `founder-interface` skill'i: Founder-facing iletişim sade Türkçe, teknik detay arkada, günlük komut "Agam bugün napcaz?", "Detayları göster" teknik raporu açar. (4) Dil kuralı: yönetim iletişimi Türkçe; gerçek yayın materyalleri (başlık, thumbnail yazısı, script, voice-over, description, branding) hedef dilinde (İngilizce) kalır, altına Türkçe anlamı yazılır. (5) Aynı mesajda tek karar istenir.
- Gerekçe: Founder'ın zihinsel yükünü azaltmak; yayın materyalinin çeviriyle bozulmaması.
- Geri dönüş koşulu: Founder kararı; packaging/gate sonuçları şirketin kendi Studio verisiyle çelişirse veri önceliklidir.
- Durum: Aktif. Onay bekleyen: P3 packaging yönü, ardından P3 tam senaryosu. → **Güncelleme 2026-10-10:** packaging onaylandı (D-012), senaryo onaylandı (D-013).
- Detay: `.claude/skills/{documentary-virality-gate,documentary-packaging,founder-interface}/`, `production/pilots/2026-10-n2-pilot-test/`

### D-012 — P3 NS Savannah packaging onaylandı
- Tarih: 2026-10-08
- Karar veren: Founder
- Karar: Final başlık: "America's Nuclear Cargo Ship Worked. Then Auditors Counted the Extra Cost." Kapak: GAO denetim sayfasından gerçek kesit, nükleere özgü 3 maliyet satırı vurgulu, geminin gerçek fotoğrafı destek görseli, yazısız veya çok sade. Ana vaat: teknik olarak çalışan gemi ile nükleere özgü ekonomik yük arasındaki gerilim.
- Sınırlar: "loss/failure/waste" ve kaynaksız nedensellik yok; kapakta uydurma rakam veya toplam etiketi yok.
- Geri dönüş koşulu: Kaynak doğrulamasında GAO satırları farklı çıkarsa veya fotoğraf lisansı uygun değilse kapak/başlık yeniden değerlendirilir; yayın sonrası şirketin kendi CTR/Test & Compare verisi önceliklidir.
- Durum: Aktif. Sıradaki: kaynak doğrulaması, ardından tam senaryo onayı. → **Güncelleme 2026-10-10:** evidence ledger tamamlandı; senaryo onaylandı (D-013).
- Detay: `production/pilots/2026-10-n2-pilot-test/P3-packaging-eval.md`

### D-013 — P3 senaryo v2 onaylandı ve kilitlendi
- Tarih: 2026-10-08
- Karar veren: Founder
- Karar: `production/pilots/2026-10-n2-pilot-test/P3-script-v2.md` pilotun onaylı senaryosudur. Yeni kanıt veya ciddi production problemi çıkmadıkça metin kendiliğinden yeniden yazılmaz. ElevenLabs kullanılmaz ve kredi harcanmaz (ayrı onay gerekir).
- Gerekçe: Dört revizyon noktası (açılış, "worked" tanımı, arka plan, ana sonuç) uygulandı; kanıt kontrolü temiz.
- Geri dönüş koşulu: Ledger'ı değiştiren yeni kanıt veya üretimde çözülemeyen görsel/hak sorunu → değişiklik Founder'a tek karar olarak gelir.
- Durum: Aktif. Sıradaki: görsel plan (`documentary-visual-plan`). → **Güncelleme 2026-10-10:** görsel plan v1.1 ve edit plan v1 hazırlandı; senaryo kanıt düzeltmeleriyle v2.5 (D-018, D-019 kapsamı).

### D-014 — P3 senaryo v2.1 teknik düzeltme
- Tarih: 2026-10-08
- Karar veren: Founder
- Karar: Kilitli senaryoda yalnız "fuel bundles" → "fuel elements" (NPS teknik bölümü ve MARAD 1961 açıklamasına göre çekirdek 32 yakıt elemanından oluşur; ledger E-8, C-43). Başka değişiklik yok; senaryo kilitli kalır (D-013).
- Durum: Aktif.

### D-015 — ElevenLabs: doğrudan API entegrasyonu ve Starter aboneliği
- Tarih: 2026-10-08
- Karar veren: Founder
- Karar: (1) ElevenLabs için üçüncü taraf plugin/MCP yerine doğrudan REST API + şirketin kendi PowerShell betikleri (Skill Lab SL-005…SL-008). Kısıtlı anahtar (Text to Speech Access, Voices Read, User Read; kredi limiti 10.000), repo dışında DPAPI şifreli dosyada. (2) Hesap `payg` tier'ında (abonelik yok) → ToS'a göre ticari kullanım yalnız ücretli abonelikte → **Starter aylık abonelik onaylandı** (6 $/ay; ilk ay 1 $ promosyon). Ödemeyi Founder yapar.
- Kurallar: Maliyet sabit tahminle değil, API'den ölçülen gerçek kredi tüketimiyle kaydedilir. Starter API kotası (~60.000 karakter, Founder kaydı) kesin veri sayılmaz.
- Geri dönüş koşulu: Video üretim hacmi kotayı aşarsa plan yeniden değerlendirilir; kullanılmazsa abonelik iptal edilir.
- Durum: Aktif — 2026-10-08 API ile doğrulandı: tier `starter`, status active, aylık kota (karakter limiti) 63.174.

### D-016 — Kanal ana anlatıcı adayı: Bill L. Oxley
- Tarih: 2026-10-08
- Karar veren: Founder (ücretsiz önizleme dinlemesiyle)
- Karar: 3 finalist (Annie K, Bill L. Oxley, Max) arasından Founder **Bill L. Oxley**'i (voice_id `iiidtqDt9FBdT1vfBluA`, professional, American, 730 gün kaldırılma bildirimi, ek ücret yok) tercih etti. COO önerisi Annie K idi; Founder tercihi geçerli.
- Koşul: Kalıcı kanal sesi kararı, senaryo test metniyle kısa API testinden (telaffuz + model seçimi) sonra kesinleşir.
- Durum: Aktif (test bekleniyor) → **Güncelleme 2026-10-10:** test 2026-10-08'de yapıldı (voice-ledger #1–#2); Founder Bill L. Oxley + **Multilingual v2**'yi seçti (backlog, EXP-002). Bu karar o gün buraya işlenmemişti; kalıcı kayıt **D-021**. Ana anlatıcı kararı kesinleşti.

### D-017 — Production hattı planı onaylandı; ikinci bilgisayar ana production/render makinesi
- Tarih: 2026-10-08
- Karar veren: Founder
- Karar: `production/tools/production-pipeline-plan.md` onaylandı (Premiere Pro son montaj + Media Encoder render; Remotion tekrar eden grafik/şema şablonları; ayrı FFmpeg kurulmaz; büyük medya GitHub dışında). İkinci bilgisayar ana production/render makinesi. Sıra: `machine-onboarding` ile bağlama ve durum doğrulama → ancak sonra Node.js + Remotion. Premiere'e hazır timeline (XML) yalnız P3'te küçük test; güvenilir çıkarsa standart olur.
- Durum: Aktif. Onboarding tamamlandı 2026-10-10 (render bilgisayarı DESKTOP-KVLH9B2; Node.js 24.21.0 LTS + Remotion 4.0.529 Founder onayıyla kuruldu; ayrıntı `company/machines.md`).

### D-018 — P3 "lone ship" anlatımında kapasite: yalnız GAO'nun "several" ifadesi
- Tarih: 2026-10-10
- Karar veren: Founder (COO önerisi)
- Karar: Lone ship animasyonunda ve ana görsel anlatımda kesin gemi sayısı verilmez; kapasite yalnız GAO'nun "several" ifadesiyle gösterilir. "Facility could easily service 10" (Maritime/Todd yetkililerinin görüşü, C-13) yalnız evidence ledger'da ikinci seviye bağlam olarak kalır; final videoda kesin gerçek gibi öne çıkarılmaz.
- Gerekçe: 10 sayısı GAO'nun bağımsız tespiti değil, yalnız servis tesisi için ve yetkili görüşü (C-12, C-13, D-REJ-5).
- Uygulama: `production/remotion/src/videos/p3/shots.ts` (`p3LoneShip`); edit plan S6 p2–p3 ve visual plan notları kaldırıldı. Animasyonda yalnız kara personeli + servis tesisi ölçeklenebilir gösterilir; eğitim bloğu paylaşılmaz.
- Ek (2026-10-10, Founder onayı): Kanıt disiplini düzeltmesi olarak S6 VO'dan "Maritime and contractor officials told the auditors the Galveston facility could easily service ten." cümlesi çıkarıldı → script v2.2; ledger E-10. Senaryonun başka bölümü değişmedi.
- Durum: Aktif.
- Aktarım: 2026-10-10, `production/pilots/2026-10-n2-pilot-test/P3-pending-decisions.md`'den (render bilgisayarı).

### D-019 — P3 Production Autonomy Mode
- Tarih: 2026-10-10
- Karar veren: Founder
- Karar: P3 üretiminde güvenli, ücretsiz, geri alınabilir ve onaylı yaratıcı/kanıt yönünü değiştirmeyen kararlar COO tarafından onay beklemeden alınır, kayda geçirilir ve iş sürer. Kapsam: kanıtı daha doğru ifade eden küçük script düzeltmeleri, evidence ledger uyum düzeltmeleri, grafik/timeline yerleşimi, teknik bug fix, kamu malı küçük production asset'leri, onaylı araçlarla şablon üretimi, görsel doğruluk düzeltmeleri. Yalnız kanıt disiplinini artıran ve ana yaratıcı vaadi değiştirmeyen düzeltme Founder kararı sayılmaz.
- Founder'a durulacak haller: para/kredi harcama; yeni yazılım/paket kurulumu; credential/yetki; önemli title/thumbnail değişikliği; ana premise veya sonucu değiştirmek; önemli lisans/telif belirsizliği; final voice seçimi; final render/yayın kararı; yıkıcı veya zor geri alınabilir işlem. Güçlü ikinci görüş gerekirse `founder-interface` kuralıyla hazır ChatGPT promptu.
- Raporlama: her küçük adım değil; anlamlı checkpoint'te kısa Founder özeti.
- Sınır: `founder-approval.md` ve `CLAUDE.md` değişmez kuralları geçerliliğini korur (commit yerel serbest; push/remote, harcama, yayın yine onaylı).
- Ek (2026-10-10, Founder) — asset indirme kapsamı: ücretsiz, kamu malı veya açık lisanslı, mevcut production işi için gerekli küçük/orta boy asset'ler (public domain fotoğraf, kamu malı belge, Natural Earth gibi açık coğrafi veri, açık lisanslı teknik çizim, küçük arşiv asset'i) güvenli kaynaktan Founder onayı beklenmeden indirilir; kaynak/lisans kaydı tutulur. Durulacak haller: ücretli asset, lisans belirsizliği, tartışmalı kullanım hakkı, çok büyük indirme/depolama, yeni yazılım/paket, credential/yetki, geri dönüşü zor işlem. İlk uygulama: `production/pilots/2026-10-n2-pilot-test/P3-asset-manifest.md`. (Aktarım: `P3-pending-decisions.md`.)
- Durum: Aktif (P3 kapsamı).
- Uyum kontrolü (2026-10-10, laptop): `founder-approval.md` (harcama, kurulum/dependency, credential, yayın, remote git onaylı kalır), `founder-interface` (sade dil, tek karar, checkpoint özeti) ve `third-party-skill-security.md` ile çelişki yok; mod onay listesini daraltmaz, yalnız onay gerektirmeyen iç production kararlarını tanımlar.
- Aktarım: 2026-10-10, `P3-pending-decisions.md`'den.

### D-020 — Growth / Content Intelligence ve Finance / CFO sistemleri kuruldu
- Tarih: 2026-10-10
- Karar veren: Founder (talimat) · Hazırlayan: COO
- Karar: (1) `intelligence/growth/` — fikir portföyü, yatırım puanı, yayın öncesi kilitli tahmin ile yayın sonrası sonuç ayrımı, kanıt hiyerarşisi (kendi kanal verisi > deneyler > niş karşılaştırmaları > genel kurallar), kalibrasyon; skill'ler `growth-idea-scoring`, `growth-performance-review`. (2) `finance/` — tahmin/gerçek ayrı CSV ledger'lar, ölçülen kullanım, video başına doğrudan + dağıtılmış maliyet, P&L, nakit akışı, break-even, geri dönüş; Tax Watch (resmî kaynakla doğrulama, muhasebeci soru listesi); agent `finance-controller`, skill'ler `cfo-review`, `tax-watch`. Tetikler `founder-brief`'e bağlandı.
- Gerekçe: Kaynakların büyüme ihtimali yüksek fikirlere ayrılması ve gerçek video ekonomisinin bilinmesi; vergi takibinin Founder'ın hafızasına bırakılmaması.
- Geri dönüş koşulu: Kendi yayın verimiz biriktikçe puan ağırlıkları ve maliyet dağıtım kuralı gözden geçirilir (sabit video eşiği yok; örneklem ve tutarlılığa göre — `intelligence/growth/README.md` §1).
- Durum: Aktif.

### D-021 — Kanal ana anlatıcısı ve birincil anlatım modeli
- Tarih: 2026-10-08 (karar) · Kayıt: 2026-10-10 (kanonik kayda geç işlendi — bkz. L-006)
- Karar veren: Founder
- Karar: **Kanal ana anlatıcısı: Bill L. Oxley** (voice_id `iiidtqDt9FBdT1vfBluA`). **Birincil anlatım modeli: Eleven Multilingual v2** (`eleven_multilingual_v2`). Eleven v4 yalnız yedek model / deneysel alternatif / geçici kampanya-fiyat avantajı olan seçenek olarak kalır.
- Gerekçe: Founder değerlendirmesi (2026-10-08, aynı ses, aynı metin, varsayılan ayarlar — voice-ledger #1–#2, EXP-002): Multilingual v2, v4 testinden daha doğal ve kanalın sakin/güvenilir belgesel tonuna daha uygun. **Geçici fiyat indirimi (v4) tek başına birincil model kararını değiştirmez.**
- Uygulama: Final VO Multilingual v2 ile üretilir (üretim öncesi Founder onayı — `founder-approval.md` açık nokta). 2026-10-10 testleri (voice-ledger #3–#4, güncel script v2.5) model seçimini yeniden açmak için değil, telaffuz/kalite QA'sı içindir.
- Geri dönüş koşulu: Yalnız maddi yeni bilgi: Multilingual v2'de giderilemeyen ciddi telaffuz/artefact/kalite sorunu, sesin veya modelin kullanımdan kalkması, lisans/ToS değişikliği ya da kalıcı ve büyük maliyet farkının Founder tarafından önceliklendirilmesi. Yeni test yapılması tek başına kararı geçersiz kılmaz.
- Durum: Aktif. Kanal klasörü açıldığında `channels/<kanal>/voice.md` bu kayda referans verir.

### D-022 — Ses üretimi ve ses kurgusu kuralı
- Tarih: 2026-10-10
- Karar veren: Founder
- Karar: Claude sesi dinleyemediği için bunu gizlemez; final VO ve ses kurgusu script segmentleri, cümle/kelime zaman damgaları, süre, dalga formu, sessizlik tespiti ve clipping/loudness ölçümleriyle yapılır. Final narration bölüm segmentleri halinde üretilir ve edit timeline'ında birleştirilir (akışı bozarsa daha uzun bloklar). Dosya adı/metadata ile cümle–dosya eşlemesi tutulur. Kulak kontrolleri (doğallık, telaffuz, müzik–VO dengesi, geçiş/kesme, final bütünlük) yalnız anlamlı checkpoint'lerde Founder'a gelir; Founder'dan edit sürecini elle yönetmesi istenmez.
- Uygulama: `.claude/rules/audio-production.md`; `documentary-voice-director`, `documentary-edit-plan` referans verir.
- Durum: Aktif.

### D-023 — Efficiency Audit v1: model yönlendirme ve context düzeni
- Tarih: 2026-10-10
- Karar veren: Founder (talimat) / COO (uygulama)
- Bağlam: Claude Pro / Claude Code kullanım limitini kaliteyi düşürmeden verimli kullanmak.
- Seçenekler: (a) değişiklik yok; (b) native Claude Code özellikleriyle model yönlendirme + dar context düzeni; (c) üçüncü taraf token-saver / Agent Teams (Founder talimatıyla dışarıda).
- Karar: (b). Beş uzman agent `model: sonnet`; yeni salt-okunur `company-file-scanner` (Haiku, effort low, maxTurns 12, omitClaudeMd). Strateji, yaratıcı karar, kaynak çelişkisi, mimari ve nihai öneri ana modelde. `audio-production.md` yalnız `production/**` ve ilgili iki skill'de otomatik yüklenir (CLAUDE.md'de "işe başlamadan oku" referansı duruyor). Onay/güvenlik/Founder Interface kuralları değişmedi.
- Gerekçe / kanıt: [VERİ] Claude Code 2.1.295 binary'sinde `model`, `effort`, `maxTurns`, `omitClaudeMd`, rules `paths` alanları doğrulandı. [VERİ] Proje sabit context yükü ~27.6 KB → ~26.0 KB (küçük). [VARSAYIM] Asıl kazanç mekanik iş ve uzman işlerin daha ucuz modele gitmesinden gelir; ölçülmedi.
- Geri dönüş koşulu: Bir Sonnet uzmanında 2 kalite hatası → o agent `inherit`; scanner dosya değiştirir veya secret değeri gösterirse kapatılır; ses kuralı production dışı ses işinde atlanırsa global yapılır. Ölçüm `finance/efficiency/efficiency-log.md`; 5–10 oturumdan önce tasarruf iddiası yok.
- Durum: Aktif.

### D-024 — Müzik/SFX sistemi (documentary-music-sfx)
- Tarih: 2026-10-10
- Karar veren: Founder (talimat) · Hazırlayan: COO
- Karar: Kaynak önceliği (1) YouTube Audio Library — önce 'Attribution not required'; CC/attribution parça yalnız yaratıcı olarak açıkça daha iyiyse, kredi metni birebir ledger → yayın açıklaması; (2) Adobe Stock yalnız hesapta gerçek lisans + lisans kodu + kapsam doğrulanırsa (CC aboneliği lisans sayılmaz; ek ücretli lisans Founder onayı); (3) PD/CC0/CC her asset ayrı doğrulanır, belirsizse kullanılmaz. 'Copyright free' kanallar, reupload ve lisansı açık olmayan siteler kullanılmaz. Müzik yönü: sakin modern belgesel, anlatıcıyla yarışmayan, epik/kurumsal değil; sessizlik araç. SFX az ve anlamlı; gerçek olmayan makine/ortam sesi kanıt gibi kullanılmaz. Anlatıcı ana katman; sabit evrensel dB/LUFS dayatılmaz, ölçüm + Founder kulak QA'sı.
- Gerekçe: Monetizasyon uyumu, Content ID riski, kaynak izlenebilirliği; YouTube Help 3376882 (erişim 2026-10-10) [VERİ]; Adobe Stock resmî sayfaları okunamadı [VARSAYIM].
- Uygulama: `.claude/skills/documentary-music-sfx/`, `production/audio-library/` (ledger + README), `production/tools/audio/attribution.ps1`; ilk uygulama `P3-music-sfx-plan.md`.
- Geri dönüş koşulu: YouTube Audio Library şartları değişirse veya Content ID sorunu yaşanırsa kaynak politikası yeniden değerlendirilir.
- Durum: Aktif.
### D-025 — Kalıcı documentary creative mimarisi ve prototype kapısı; P3 tam kurgusu reddedildi
- Tarih: 2026-10-11
- Karar veren: Founder (talimat) · Uygulama: COO
- Bağlam: P3 araştırma, kanıt ve teknik üretimde güçlü; ancak tam review kurgusu "voice-over + arşiv fotoğrafı + bilgi kartı + basit pan" sunumu gibi bulundu ve **final yön olarak reddedildi** (CF-001). Sorun P3'e özel değil, üretim sisteminin yapısından geliyor (L-007).
- Karar: (1) research → script → visuals arasına kalıcı **Creative Direction / Documentary Storytelling** katmanı: agent `documentary-creative-director` (ana model, ucuz modele verilmez), skill'ler `documentary-creative-treatment` (hook-first yapı; zorunlu şablon değil), `documentary-visual-storytelling` (her sahnenin bir işi var; foto+pan+kart varsayılan değil; visual language library; footage kuralı; seçici tipografi + her videoda closed captions; görsel yenilenme = yeni bilgi/bakış; ChatGPT görsel akışı), `documentary-production-handoff` (production PC brief'i). (2) Kural `.claude/rules/documentary-creative-standards.md`: akış, **ilk 60–90 sn prototype kapısı** (Founder'a tek soru: "Bunu izlemeye devam eder miydin?"; onaysız full production yok), öğrenme döngüsü (video mu sistem mi; tek örnek zevk hemen kural olmaz). (3) `intelligence/creative/`: yaşayan stil benchmark'ı (Mustard, Paper Skies, fern, Modern MBA, Persimmon Archive, Ruined America — v0.1, görsel boyutlar doğrulanacak) ve Founder yaratıcı geri bildirim kaydı (CF-). (4) ChatGPT Image Generation kalıcı production aracı; AI görsel asla arşiv kanıtı gibi sunulmaz; foto-gerçekçi tarihî yeniden üretim yayın öncesi QA'ya AI açıklama riski olarak taşınır. (5) Mevcut script, visual plan, edit plan, packaging, evidence ledger, founder-interface, founder-brief, production-engineer, research-analyst bu akışa bağlandı. (6) P3 ilk retrofit: creative treatment v3, yeni hook ("The base that waited" — Galveston), KEEP/REBUILD/REMOVE, prototype handoff v1. Script v2.5 kilidi yalnız açılış için açıldı; packaging (D-012) ve premise değişmedi; tam script v3 prototype kapısından sonra.
- Gerekçe / kanıt: [VERİ] Founder değerlendirmesi (CF-001). [VARSAYIM] Benchmark görsel prensipleri izlenmeden doğrulanamadı; prototype kararları ve kendi kanal verimiz doğrulayacak.
- Geri dönüş koşulu: Prototype kapısı üretim süresini orantısız uzatırsa veya iki videoda prototype kararı full video kararıyla çelişirse kapı kapsamı yeniden değerlendirilir. Benchmark prensipleri kendi retention verimizle çelişirse veri kazanır.
- Onay bekleyen: ~~P3 VO + film indirme~~ → **Güncelleme 2026-10-11:** VO onaylandı (≤700 kredi), film kullanılmayacak (D-026).
- Durum: Aktif.
- Detay: `.claude/rules/documentary-creative-standards.md`, `intelligence/creative/`, `production/pilots/2026-10-n2-pilot-test/P3-creative-treatment-v3.md`, `P3-production-handoff-prototype-v1.md`

### D-026 — P3 prototype kalibrasyonu: benchmark kare incelemesi, 1964 film kullanılmaz, açılış seslendirmesi onaylı
- Tarih: 2026-10-11
- Karar veren: Founder · Uygulama: COO
- Bağlam: D-025 mimarisi onaylandı; commit öncesi iki kalibrasyon istendi (benchmark'ın gerçekten görsel doğrulanması, 1964 filmin hak durumu) ve VO harcaması onaylandı.
- Karar: (1) **Benchmark** yalnız doğrudan incelenen videolardan prensip çıkarır; görülmeyen boyut "doğrulandı" sayılmaz. v0.2: 6 kanaldan 8 video, ~86 kare + altyazı satırı incelendi; ses dinlenemediği için müzik/SFX ve kesme sıklığı doğrulanmadı; 5 prensip (P-1…P-5) kayda girdi. (2) **1964 "The Nuclear Ship Savannah" (NARA 88199)**: NARA "Use: Undetermined", yapımcı özel yüklenici (Orleans Film Productions), hak devri bilinmiyor → ticari YouTube kullanımı açıkça güvenli değil; **prototype dahil kullanılmaz, indirilmez**; yalnız referans. Genel kural: hakkı açıkça doğrulanmamış footage prototype'ta da production asset'i olmaz (`documentary-visual-storytelling` §6, `documentary-evidence-ledger` kural 13, `documentary-creative-standards` §3). (3) **VO onayı:** P3 yeni açılış (S01 v3, 1.236 karakter) Bill L. Oxley + Multilingual v2, **tavan 700 ElevenLabs kredisi**; sorunsuz segment yeniden üretilmez. (4) P3 hook yönü korunur, wording evidence'a göre v3.1'de kilitlendi; açılış "bu sistem neden tek gemi için bu kadar pahalıydı?" sorusuyla biter. Treatment v3.1 ve prototype handoff FINAL.
- Gerekçe / kanıt: [VERİ] NARA kaydı ve film jeneriği doğrudan görüldü (2026-10-11). [VERİ] Benchmark gözlemleri kare + altyazı ile. [VARSAYIM] Az kare örneklemesi kesme sıklığını ölçmez; prensipler prototype kapısında test edilecek.
- Geri dönüş koşulu: Film için açılış jeneriği + telif kaydı + NARA cevabı açıkça kamu malı/ticari kullanıma uygun gösterirse V-30 yeniden açılır. Benchmark prensibi iki prototype'ta işe yaramazsa yeniden değerlendirilir.
- Durum: Aktif. Sıradaki: Founder müzik adaylarını indirir + commit/push → production PC handoff'u uygular → Founder prototype kapısı.

### D-027 — P3 son creative kalibrasyonu: Ship-first açılış, Mustard farkı, prototype kalite tanımı; benchmark PROVISIONAL v0.1
- Tarih: 2026-10-11
- Karar veren: Founder (yön ve tercih) · COO (karşılaştırma ve öneri)
- Bağlam: Sistem mimarisi (D-025, D-026) onaylı; commit/push öncesi P3 prototype'ın güçlü bir test olması için son kalibrasyon. Sistem değişikliği değil.
- Karar: (1) Benchmark statüsü **PROVISIONAL BENCHMARK v0.1** (D-026'daki dahili "v0.2" adı geri alındı); müzik/SFX temposu, kesme ritmi, tam video temposu ve retention mekaniklerinden evrensel kural çıkarılmaz. (2) P3 açılışı **Ship-first paradox** (ship → worked → cost paradox → Galveston → question); Galveston-first ile ilk 30 sn storyboard'u yan yana karşılaştırıldı (treatment v3.2 §3): A konu/vaat/bahis/reveal kriterlerinde önde, evidence'ta eşit (iki sıkıştırma kontrol edildi), Mustard ayrışmasında önlem gerekiyor. (3) Handoff'ta zorunlu Mustard farkı bölümü (açı, açılış, thumbnail, kelimeler; kopyalanmayacak öğeler) ve "denetim defteri şeridi" imza cihazı. (4) Prototype kabul kriterleri (cold open, ≥3 görsel mod, belge kanıtı, harita/diyagram, görsel reveal, seçici tipografi, gerçek anlatıcı, gerçek müzik yönü, sessizlik anı, sahte tarihî görüntü yok). (5) İki AI görseli (boş rıhtım atmosferi, Atomic Servant cutaway) — Galveston reveal'ının hakkı temiz görseli olmadığı için; stilize, "Illustration" etiketli, kanıt değil. (6) Prototype sonrası Founder'a önce izleme dosyası + yalnız 3 kısa bilgi (seçilen açılış, neden, kanıt/illüstrasyon ayrımı).
- Gerekçe: Soğuk izleyici Galveston'ın önemini bilmeden başlamamalı; başlığın iki yarısı ilk 20 sn'de karşılanmalı; aynı gemiyi işleyen 4,7M'lik Mustard videosundan ayrışma ilk 30 sn'de görünmeli.
- Geri dönüş koşulu: Founder prototype'ta "Hayır/Emin değilim" derse açılış sırası ilk teşhis konusudur; B (Galveston-first) yedek olarak treatment'ta korunur.
- Durum: Aktif. Treatment v3.2 ve handoff v1.1 FINAL.

### D-028 — P3 production ve production kredi harcaması donduruldu; Documentary Production Doctrine v1 araştırması
- Tarih: 2026-10-11
- Karar veren: Founder
- Karar: (1) P3 production ve bütün production kredi harcaması geçici olarak dondu: ElevenLabs final/prototype üretimi yok (D-026'daki ≤700 kredi onayı **askıda**), ChatGPT görsel isteği yok (D-027'deki AI-1/AI-2 istenmez), müzik/SFX seçimi/indirmesi yok, prototype render yok, Premiere final çalışması yok, documentary-system değişiklikleri commit/push edilmez. (2) Amaç P3'ü düzeltmek değil: The Industrial Casebook için kalıcı, araştırılmış, doğrulanmış, tekrar kullanılabilir **Documentary Production Doctrine v1**. Kapsam: 6 core kanalın tüm public long-form katalog envanteri; kanal rollerine göre (Mustard nesne/obje sinematiği, Paper Skies arşiv anlatısı, Modern MBA analitik grafik, fern art direction — maliyet benchmark'ı değil, Persimmon Archive paket/premise, Ruined America endüstriyel paradoks) + hedefli ikincil referanslar (Wendover, Real Engineering, neo); high/typical/lower videolarda distinct visual event bazında shot-level inceleme; pattern saturation; high-vs-low karşılaştırması (korelasyon ≠ nedensellik); epistemik etiketler DIRECTLY VERIFIED / SOURCE-VERIFIED / INFERRED / UNVERIFIED (INFERRED zorunlu kural olmaz); ses dinlenemiyorsa "UNVERIFIED — HUMAN EAR REQUIRED". (3) Founder'ın başlangıç hipotezleri (watchability = cognitive progress; CLICK/STAY/BELIEVE kapıları; hook doctrine; visual/motion/transition/sound/packaging grammar; production ekonomisi; zero-credit storyboard gate; 60–90 sn prototype gate; kendi kanal verisi önceliği) doğrulanana kadar hipotezdir. (4) Mevcut P3_REVIEW_v1 silinmez, negatif benchmark. (5) Araştırma birden çok oturuma yayılabilir; ilerleme `intelligence/creative/research/doctrine-research-progress.md`'de, Founder'dan yeni prompt beklenmez.
- Geri dönüş koşulu: Research completion gate (Founder talimatı §V) karşılanınca doctrine Founder'a sade özetle sunulur; P3 yeniden tasarımı ancak ondan sonra.
- Durum: Aktif. D-026 VO onayı ve D-027 AI/müzik adımları askıda.

### D-029 — Documentary Production Doctrine v1 bağlayıcı yaratıcı taban olarak kabul edildi
- Tarih: 2026-10-13
- Karar veren: COO (Founder kapsam kararı 2026-10-13: "her kanaldan 2 video yeter"); P3'ün yeniden açılması Founder'da
- Bağlam: D-028 araştırması. Founder kapsamı daralttı; merkez soru "bu kanallar neden izleniyor, izleme keyfi neden bizden iyi?"
- Seçenekler: (a) tam saturation'a kadar her kanalda 4+ video; (b) kanal başına 2 video + doctrine yaz. → (b), Founder kararı.
- Karar: `intelligence/creative/doctrine/documentary-production-doctrine-v1.md` creative treatment, visual storytelling ve production handoff için bağlayıcı taban; `documentary-style-benchmarks.md` (v0.1) tarihsel kayıt. Handoff, doctrine §12 COO ön kontrolünü geçmeden production PC'ye gitmez. P3 donması (D-028) Founder kaldırana kadar sürer.
- Gerekçe / kanıt: [VERİ] 16 video shot-level tarama (Mustard 6, Paper Skies 2, Modern MBA 2, fern 2, Persimmon 1 açılış); benchmark 2,6–4,4 sn/görsel olay vs P3_REVIEW_v1 ~12,8 sn/beat, 0 hareketli görüntü, 30–37 sn statik kartlar, insan/sahne yok. [VARSAYIM] HIGH/LOW farkı premise kaynaklı (6/6 kanalda üretim dili sabit). Ses tamamen doğrulanmadı.
- Geri dönüş koşulu: İlk doctrine-uyumlu prototype Founder kapısını iki kez geçemezse veya ilk yayın retention verisi bir maddeyi çürütürse v1.1. Hak-temiz hareketli görüntü yokluğunda motion/illüstrasyonla canlılık prototype'ta sağlanamazsa §8 yeniden yazılır.
- Durum: Aktif.

### D-030 — P3 donması yalnız açılış prototype'ı için kaldırıldı; opening v2 (Ship-first)
- Tarih: 2026-10-13
- Karar veren: Founder
- Bağlam: Doctrine v1 uygulama testi PASS (`P3-doctrine-test-opening-v1.md`); final açılış anlatım yönü onaylandı.
- Seçenekler: donmayı sürdür / yalnız prototype için kaldır / tam üretim → yalnız prototype.
- Karar: (1) D-028 donması **yalnız ilk 60–90 sn prototype** için kalktı; tam video, gövde VO'su, Premiere final yok. (2) Anlatım: Founder'ın getirdiği ChatGPT sıkılaştırılmış sürüm = **P3 opening v2** (birebir). (3) VO: Bill L. Oxley, Multilingual v2, **≤700 kredi**, yalnız opening. (4) Müzik yoksa track boş; placeholder yok. AI görsel yok, hakkı belirsiz footage yok. (5) Uygulama: `P3-production-handoff-prototype-v2.md` + doctrine v1. (6) Prototype sonrası önce Founder'a izleme dosyası + tek soru.
- Gerekçe / kanıt: [VERİ] doctrine testi 13/13 PASS. [VARSAYIM] hak-temiz footage olmadan motion/illüstrasyonla canlılık sağlanabilir — prototype bunu test eder.
- Geri dönüş koşulu: Founder "izlemeye devam etmezdim" derse creative director teşhisi + revize prototype; iki kez geçemezse fikir yeniden değerlendirilir (creative-standards §2).
- Durum: Aktif — narration Founder'dan geldi (2026-10-13); tek değişiklik Founder onaylı: son cümle "built to serve several" → "that could serve several" (C-33). Handoff v2 HAZIR. → Uygulandı (render PC, 2026-10-13 14:38), ardından D-031 ile bekletildi; tarihsel kayıt D-039.

### D-031 — The Industrial Casebook Brand System v1 + Source-to-Visual Pipeline v1 + Muted Preview Gate; P3 yeniden donduruldu
- Tarih: 2026-10-13
- Karar veren: Founder
- Bağlam: P3 opening v2 storytelling PASS adayı (D-030); Founder her videoda renk/font/intro/geçiş/kanıt görünümü/AI ihtiyacı/preview kalitesi hakkında yeniden karar vermek istemiyor.
- Karar: (1) Brand System v1 (`intelligence/creative/brand/brand-system-v1.md`): marka özü, case identity (CASE NNN video içinde; başlıkta zorunlu değil), bağımsız intro yok (cold open + kısa case ident), tipografi IBM Plex Sans Condensed / IBM Plex Mono / Source Serif 4, renk token'ları ink #14181C · paper #E7DFCF · steel #334854 · amber #C58B3B + video başına case accent (P3: Atomic Teal #4E8A88), dört dünya (Archive · Evidence · Engineering · Case UI), dört imza geçiş (Evidence Pull · Object Carry · Case Tab · Source Mark), logo/banner yönü. (2) Source-to-Visual Pipeline v1 (`source-to-visual` skill): 7 adımlı karar sırası, SOURCE→EXTRACT→EXPLAIN→CONSEQUENCE, foto dönüştürme, AI görsel politikası (ChatGPT image generation onaylı araç; yalnız problem çözerse; ILLUSTRATIVE, kanıt değil), Founder'a hazır prompt. (3) Muted Preview Gate (`muted-preview-gate` skill): render sonrası, Founder'dan önce. (4) Kural: `.claude/rules/brand-and-visual-system.md`; Founder renk/font/görsel mikro kararı vermez. (5) P3 donduruldu; handoff v2 bekletiliyor, retrofit sonrası v3. Narration/evidence değişmedi.
- Gerekçe / kanıt: [VERİ] CF-001 (tek görsel dile çöküş), doctrine v1 §2 (P3: tam ekran lacivert kart ritmi). [VARSAYIM] dört dünya + ortak gramer, tek filtreden daha izlenebilir ve kanal tanınırlığı sağlar — kendi CTR/retention ve muted gate sonuçlarıyla test edilecek.
- Geri dönüş koşulu: iki ardışık videoda muted gate aynı nedenle REVISE verirse veya kanal verisi bağımsız intro/farklı paletin daha iyi olduğunu gösterirse v1.1.
- Durum: Aktif. Açık: final logo/banner Founder + ChatGPT. (Font kurulumu render PC'de 2026-10-13 tamamlandı ve doğrulandı — `company/machines.md`, backlog.)

### D-032 — Brand Direction v1 canonical (Founder + ChatGPT)
- Tarih: 2026-10-13
- Karar veren: Founder (ChatGPT ile)
- Bağlam: D-031 Brand System v1 kuruldu; Founder + ChatGPT yaratıcı marka yönünü kilitledi.
- Karar: (1) `intelligence/creative/brand/brand-system-v1.md` = canonical brand direction. Konsept: premium industrial documentary + engineering dossier; ton: intelligent, technical, investigative, industrial, evidence-led, cinematic, modern. (2) Kaymayacağı yönler: true crime, dedektif estetiği, kırmızı ip, suç mahalli, steampunk, nostaljik fabrika-logosu, jenerik kurumsal danışmanlık, jenerik faceless-AI belgesel, bütün videoyu kaplayan koyu-mavi PowerPoint şablonu. (3) Canonical kural: "Source establishes truth. Visualization establishes understanding." (4) Logo yönü: industrial, modern, strong, avatar için minimal; jenerik kurumsal IC logosu / dişli-fabrika / dedektif-dosya ikonu değil (D-031'deki "IC monogram + case-file geometry" zorunluluğu kalktı). (5) Muted Preview Gate bağlayıcı; FAIL → Founder'a gelmeden revize. (6) Brand proof: logo yönü, banner yönü, CASE 001 UI mockup, evidence label mockup, P3 branded frame örnekleri gelmeden P3 brand retrofit'i yok. (7) P3 donması sürüyor. Dört dünya, case numbering, intro yok, dört imza geçiş, per-case accent (P3 Atomic Teal), thumbnail grameri D-031 ile aynı.
- Gerekçe / kanıt: [VERİ] Founder + ChatGPT kararı. [VARSAYIM] ortak gramer + değişken görünüm kanal tanınırlığı ve izlenebilirliği artırır — muted gate ve kanal verisiyle test.
- Geri dönüş koşulu: brand proof mockup'ları token/fontların çalışmadığını gösterirse §D–§E güncellenir; kanal verisi aksi yönde ise v1.1.
- Durum: Aktif. Eski koyu-lacivert tema (`production/remotion/src/theme.ts`) retrofit'te dünyalara göre token'lara ayrılacak.

### D-033 — Founder-approved visual direction reference
- Tarih: 2026-10-13
- Karar veren: Founder
- Bağlam: Founder + ChatGPT brand board denemeleri; Founder bir board'u ana görsel yön olarak seçti.
- Karar: (1) `intelligence/creative/brand/reference/founder-approved-visual-direction-2026-10-13.webp` = Founder-approved visual direction reference; analiz `reference/founder-approved-visual-direction.md`. (2) Final logo veya template değildir; birebir kopyalanmaz. (3) Diğer logo/brand board denemeleri canonical referans değildir. (4) Brand Direction v1 (D-032) ile birlikte kullanılır; yasaklar (damga, grunge, true-crime, sahte belge) önceliklidir. (5) **Canonical olan yaratıcı yöndür:** ağır ve dar industrial typography · engineering drawing / technical line character · physical metal / oxidation / industrial material feeling · güçlü ana konu silueti · küçük ve disiplinli technical metadata · sade ama karakterli premium composition. (6) **PROVISIONAL (Founder ek talimatı 2026-10-13):** Barlow Condensed font seçimi ve #C7542B rust-orange accent — tasarım örneklerinde (brand proof) test edilip Founder onaylamadan canonical token olmaz; o zamana kadar D-031 token'ları geçerli.
- Gerekçe / kanıt: [VERİ] Founder tercihi. [VARSAYIM] daha ağır endüstriyel karakter kanal kimliğini güçlendirir — muted preview gate + kanal verisiyle test.
- Geri dönüş koşulu: Founder başka bir referansı açıkça onaylarsa veya brand proof mockup'ları yönün video içinde çalışmadığını gösterirse.
- Durum: Aktif.

### D-034 — Dynamic Case Ident System v1
- Tarih: 2026-10-13
- Karar veren: Founder
- Bağlam: Bağımsız logo intro'su yok (D-031); her videoda hikâyeyi kesmeyen, videoya özel marka anı isteniyor.
- Karar: `intelligence/creative/brand/dynamic-case-ident-system.md` kalıcı. ~1,5–3 sn; story önce başlar veya ident story'den doğar; siyah ekran + logo yok; aynı ident render'ı tekrar kullanılmaz. Sabit: CASE formatı, tipografi hiyerarşisi, teknik çizgi dili, kanıt/kaynak hareket grameri, wordmark (final logo gelene kadar yalnız dizilmiş yazı). Değişken (creative director otomatik): CASE no, başlık, accent, hero object, motif, açılış görseline bağlantı, kaynak/yıl etiketi. Hareket case'in kendi görselinden doğar (6 davranışlık kütüphane; Founder düzeltmesi: mekanik tekrardan kaçınılır ama en güçlü çözümse aynı motion grammar gerekçeyle tekrar kullanılabilir; çeşitlilik uğruna zayıf çözüm seçilmez; birebir aynı timing/kompozisyon/sekans tekrar edilmez). Handoff TEMPLATE §7c alanları zorunlu. P3: Object Outline → Label → Object Carry (plan; narration/sıra değişmedi).
- Gerekçe / kanıt: [VERİ] doctrine v1 (hook ilk 30–60 sn; benchmark kanallarında bağımsız intro yok, başlık kartı hook'tan sonra — Mustard 6/6). [VARSAYIM] case'e özel ident retention'ı kesmeden tanınırlık sağlar — ilk 30 sn retention ile test.
- Geri dönüş koşulu: ident anında retention düşüşü görülürse davranış EXP olarak değişir; kanal verisi bağımsız intro'yu desteklerse yeniden test.
- Durum: Aktif. P3 donuk.

### D-035 — Video Launch OS v1
- Tarih: 2026-10-13
- Karar veren: Founder
- Bağlam: Her video için keşif, SEO, packaging, metadata, yayın ve öğrenim Founder müdahalesi olmadan yönetilmeli.
- Karar: (1) `video-launch-os` skill'i (dağıtım tipi, talep araştırması, Search Intent Brief, Packaging v2, title/thumbnail/description/kaynak/chapters/captions/dil/disclosure/haklar/upload/end screen/cards/playlist/zaman, native A/B, Launch Package) + `LAUNCH-PACKAGE-TEMPLATE.md`. (2) `pre-publish-qa` = tek yayın öncesi kapı (önceki dağınık "yayın öncesi QA" maddeleri buraya yönlendirildi). (3) Resmî ilkeler SOURCE-VERIFIED: `intelligence/growth/launch-os/youtube-official-principles.md` (P-01…P-13, erişim 2026-10-13). (4) Kanal yetenekleri takibi `capabilities.md` (advanced features açılınca Founder'a bir kez hatırlatma). (5) Packaging v2: ≥3 farklı açılı finalist, birincil + 2 A/B varyantı (önceki "1 yedek" yerine). (6) Yayın sonrası: Appeal/Engagement/Satisfaction/Discovery, sabit evrensel eşik yok, sorun sınıfları → sistem güncellemesi. (7) Varsayılan upload Private/Unlisted → QA → public; native A/B launch onayının parçası. (8) Founder'a yalnız: prototype kapısı, gerekirse ≤3 packaging finalisti, tek launch onayı, gerekirse disclosure toggle'ı. (9) P3: yalnız denetim (`P3-launch-os-audit-v1.md`); P3 donuk.
- Gerekçe / kanıt: [VERİ] resmî YouTube Help sayfaları (P-01…P-13). [VARSAYIM] belgeselde geniş erişim çoğunlukla packaging + öneriden gelir — kendi kanal verisiyle test (dağıtım tipi FC'de).
- Geri dönüş koşulu: kendi kanal verimiz bir varsayımı çürütürse (ör. Search trafiği baskın çıkarsa) dağıtım tipi seçimi ve packaging kuralları güncellenir; YouTube politika değişikliği → principles dosyası.
- Durum: Aktif.

### D-036 — Video Launch OS v1 tamamlama: upload matrisi, rights ledger, caption protokolü, A/B uygunluğu, publish package, Release Gate, öğrenme sözleşmesi, kanal durumu, thumbnail spec
- Tarih: 2026-10-13
- Karar veren: Founder
- Bağlam: D-035 sonrası, güçlü PC'ye geçmeden ana bilgisayardaki sistemin kapanması.
- Karar: (1) `UPLOAD-SETTINGS-MATRIX.md` (her upload alanı: DEFAULT / WHEN TO OVERRIDE / WHO DECIDES / EVIDENCE / PRE-PUBLISH CHECK). (2) Rights Ledger Standard + Copyright Gate (`production/rights/`): kullanım hakkı ≠ kredi; UNKNOWN/UNRESOLVED varsa public yok; YouTube Checks tek başına yeterli değil; hak durumunun kanonik kaydı rights ledger (evidence ledger §C referans). (3) `CAPTION-PROTOCOL.md` (final VO + zaman damgası → SRT, QC, dil bağı, Studio doğrulaması; auto-caption yalnız yedek). (4) A/B eligibility karar ağacı + test sırasında değişiklik yasağı + Winner/Performed Same/Inconclusive/düşük gösterim kuralları. (5) `PUBLISH-PACKAGE-SCHEMA.json` (kanonik makine paketi) + md aynası. (6) Release Gate (`pre-publish-qa`): G-01…G-19, PASS/FAIL/MANUAL-DECISION, FAIL → public yasak. (7) Öğrenme sözleşmesi: YouTube resmî kavramları ≠ iç proxy'ler; kayıt formatı observation/confidence/possible cause/evidence/action/rule update; tek videodan genelleme yok. (8) SYSTEM READY ↔ CHANNEL CAPABILITY VERIFIED; kanal maddeleri BLOCKED_BY_FUTURE_SETUP (hata değil). (9) `THUMBNAIL-PRODUCTION-SPEC.md` (araçtan bağımsız). (10) Normal videoda Founder kararı = 2 (yaratıcı onay + publish onayı). Readiness: `intelligence/growth/launch-os/main-pc-readiness-audit.md`.
- Gerekçe / kanıt: [VERİ] resmî YouTube Help P-14…P-21 (erişim 2026-10-13).
- Geri dönüş koşulu: Studio ayar adları/kuralları değişirse matris ve principles güncellenir (kanal checklist C-12); kendi verimiz bir varsayılanı çürütürse (ör. Shorts remixing, featured places) matris değişir.
- Durum: Aktif. P3 donuk.

### D-037 — YouTube kanalı oluşturuldu; temel marka kurulumu başladı
- Tarih: 2026-10-13
- Karar veren: Founder (bildirim)
- Bağlam: Önceki kayıtlar kanalın olmadığını varsayıyordu (D-035, D-036 capability durumu BLOCKED_BY_FUTURE_SETUP).
- Karar: CHANNEL CREATED = YES · BASIC BRANDING STARTED = YES · LOGO / PROFILE IMAGE = SET. Studio'da fiziksel olarak doğrulanmamış yetenekler (güvenlik/izinler, telefon doğrulaması, Intermediate/Advanced Features, custom thumbnail, A/B aracı, upload defaults, default description, ülke/dil, audience varsayılanı, series playlist uygunluğu, ayar etiketleri) **NEEDS_VERIFICATION** olarak kalır; varsayılmaz. CHANNEL CAPABILITY VERIFIED = NO. Kanal adı/handle ve logonun hangi konsept olduğu henüz kayda geçmedi.
- Gerekçe / kanıt: [VERİ] Founder bildirimi. Studio doğrulaması yok.
- Geri dönüş koşulu: —
- Durum: Aktif. MAIN-PC SYSTEM READY değişmedi (YES). P3 donuk.

### D-038 — Long-form'dan Shorts türevleri iş akışına bağlandı
- Tarih: 2026-10-13
- Karar veren: Founder
- Bağlam: D-002 ve strategy "Shorts türev" ilkesini koyuyordu; ancak kontrol (2026-10-13) aday seçimi, 9:16 yeniden kurgu ve zamanlama için **hiçbir iş akışı bulunmadığını** gösterdi ("Shorts converter" sistemde yoktu).
- Karar: Ayrı sistem kurulmadan `video-launch-os` §25 + G8b adımı: long-form final kilitten sonra hedef 2–4 (eşik geçmezse 0–1) özgün Short; yalnız kendi long-form araştırma/anlatım/materyalimizden; tek başına anlam, ilk saniye, merak/payoff, long-form köprüsü, kanıt bağlamı, haklar, dikey uygunluk kriterleri; 9:16 yeniden kurgu (reframe, dikey layout, burned-in caption, kısa-form ritmi); yayın long-form public olduktan sonra, zamanlama deney; Shorts için kısaltılmış Release Gate; publish package `shorts_plan`; handoff eki.
- Gerekçe / kanıt: [VERİ] D-002, constraints, strategy. [VARSAYIM] Shorts long-form'a ilgi/geçiş yaratır — kendi verimizle ölçülecek.
- Geri dönüş koşulu: Shorts long-form'a anlamlı geçiş üretmezse veya üretim maliyeti değerini aşarsa sayı/hedef düşürülür.
- Durum: Aktif. P3 donuk.


### D-039 — Render PC'deki P3 yerel commit'leri arşivlendi; main canonical ile eşitlendi; gerçek maliyet ve hak kayıtları main'e taşındı
- Tarih: 2026-10-13
- Karar veren: Founder
- Bağlam: Güçlü PC (DESKTOP-KVLH9B2) audit'i: local main, origin/main `2fb709b`'nin 6 commit önündeydi (`c1fe2ef`, `b2764be`, `f483b8c`, `470a4d3`, `8d4deec`, `ee9bb80`) — reddedilmiş P3 Premiere XML hattı (D-025), PhotoShots/P3-REVIEW kurgu işleri, iki otomatik pull merge'i ve **Opening Prototype v2 üretimi** (D-030 yürürlükteyken, 2026-10-13 14:38). P3 aynı gün 17:26'da D-031 ile yeniden donduruldu; bu commit'lerin push'u canonical main'e eski/deneysel P3 durumu ve çelişen handoff durumu eklerdi.
- Seçenekler: hepsini push et / arşiv branch'i + main'i eşitle + gerçek kayıtları ayrı taşı → ikincisi.
- Karar: (1) 6 commit `archive/render-pc-p3-2026-10-13` (`ee9bb80`) branch'inde korunur; branch remote'a push edildi. (2) Local main `origin/main`'e eşitlendi. (3) Arşivden yalnız gerçek şirket kayıtları main'e taşındı (cherry-pick yok): `usage.csv` U-006 (467 kredi), voice-ledger "Opening prototype v2 — TARİHSEL KAYIT", `VID-001-rights-ledger.csv` (V-21 REJECTED — DO NOT USE / EXCLUDED FOR RIGHTS; V-20 UNKNOWN_RIGHTS — kanıt doğrulanacak), evidence ledger §C V-20/V-21 satırlarında rights ledger işaretçisi. (4) Prototype kodu (`remotion/src/videos/p3/opening/`), raporu, Premiere XML hattı, PhotoShots ve P3 Root kompozisyonları main'e **dönmez**.
- Gerekçe / kanıt: [VERİ] git audit (merge-base `2fb709b`; `origin/main..ee9bb80` 23 dosya, yalnız P3 + U-006; canonical sistem dosyası farkı yok). Finance ve hak kayıtları tek doğruluk kaynağında olmalı (company-memory).
- Tarihsel not: Opening Prototype v2 render PC'de üretildi; repo dışındaki `D:\CompanyOS-Production\P3-ns-savannah\06_renders\P3_OPENING_PROTOTYPE_v2.mp4` ve `03_vo\prototype-v2\` dosyaları durabilir ama **aktif production durumu değildir**; Founder prototype kapısına gitmedi. P3 **FROZEN** (D-031).
- Geri dönüş koşulu: P3 yeniden açılırsa arşivdeki kod/rapor yalnız referans olarak okunur; v3 handoff (Brand System retrofit) yeni iş olarak yazılır.
- Durum: Aktif. Açık: V-20 lisans kanıtı (proof) yakalanacak; P3 §C'nin geri kalanının rights ledger'a taşınması (DF-6) sürüyor.
