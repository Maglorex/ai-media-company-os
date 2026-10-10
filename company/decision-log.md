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
