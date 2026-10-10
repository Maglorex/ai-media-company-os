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
- Durum: Aktif (P3 tam senaryosu için onay bekleniyor)
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
- Durum: Aktif (adaptasyon onayı bekleniyor)
- Detay: `intelligence/skill-lab/evaluations/2026-10-08-youtuber-skills.md`, `intelligence/skill-lab/registry.md`

### D-011 — Video fikri kapıları, Founder arayüzü ve dil kuralı
- Tarih: 2026-10-08
- Karar veren: Founder
- Bağlam: SL-002 değerlendirmesi (D-010) sonrası ilk iki uyarlama ve Founder'ın teknik detay bilmeden çalışabilmesi ihtiyacı.
- Karar: (1) `documentary-virality-gate` ve `documentary-packaging` skill'leri Company OS'a özgü yazıldı (metin kopyalanmadı; SL-002 kaynağı atıflı); danışma niteliğinde, karar Founder'da. (2) P3 NS Savannah premise'i GAO'nun gösterdiği seviyeye indirildi (v2: nükleere özgü kalemler konvansiyonel gemilere göre yaklaşık yıllık ~2M $ ek yük/fazla sübvansiyon; kaynaksız vitrin nedenselliği çıkarıldı); gate sonucu READY FOR PILOT; packaging önerisi Concept 1, yedek Concept 5 (koşullu). (3) `founder-interface` skill'i: Founder-facing iletişim sade Türkçe, teknik detay arkada, günlük komut "Agam bugün napcaz?", "Detayları göster" teknik raporu açar. (4) Dil kuralı: yönetim iletişimi Türkçe; gerçek yayın materyalleri (başlık, thumbnail yazısı, script, voice-over, description, branding) hedef dilinde (İngilizce) kalır, altına Türkçe anlamı yazılır. (5) Aynı mesajda tek karar istenir.
- Gerekçe: Founder'ın zihinsel yükünü azaltmak; yayın materyalinin çeviriyle bozulmaması.
- Geri dönüş koşulu: Founder kararı; packaging/gate sonuçları şirketin kendi Studio verisiyle çelişirse veri önceliklidir.
- Durum: Aktif. Onay bekleyen: P3 packaging yönü, ardından P3 tam senaryosu.
- Detay: `.claude/skills/{documentary-virality-gate,documentary-packaging,founder-interface}/`, `production/pilots/2026-10-n2-pilot-test/`

### D-012 — P3 NS Savannah packaging onaylandı
- Tarih: 2026-10-08
- Karar veren: Founder
- Karar: Final başlık: "America's Nuclear Cargo Ship Worked. Then Auditors Counted the Extra Cost." Kapak: GAO denetim sayfasından gerçek kesit, nükleere özgü 3 maliyet satırı vurgulu, geminin gerçek fotoğrafı destek görseli, yazısız veya çok sade. Ana vaat: teknik olarak çalışan gemi ile nükleere özgü ekonomik yük arasındaki gerilim.
- Sınırlar: "loss/failure/waste" ve kaynaksız nedensellik yok; kapakta uydurma rakam veya toplam etiketi yok.
- Geri dönüş koşulu: Kaynak doğrulamasında GAO satırları farklı çıkarsa veya fotoğraf lisansı uygun değilse kapak/başlık yeniden değerlendirilir; yayın sonrası şirketin kendi CTR/Test & Compare verisi önceliklidir.
- Durum: Aktif. Sıradaki: kaynak doğrulaması, ardından tam senaryo onayı.
- Detay: `production/pilots/2026-10-n2-pilot-test/P3-packaging-eval.md`

### D-013 — P3 senaryo v2 onaylandı ve kilitlendi
- Tarih: 2026-10-08
- Karar veren: Founder
- Karar: `production/pilots/2026-10-n2-pilot-test/P3-script-v2.md` pilotun onaylı senaryosudur. Yeni kanıt veya ciddi production problemi çıkmadıkça metin kendiliğinden yeniden yazılmaz. ElevenLabs kullanılmaz ve kredi harcanmaz (ayrı onay gerekir).
- Gerekçe: Dört revizyon noktası (açılış, "worked" tanımı, arka plan, ana sonuç) uygulandı; kanıt kontrolü temiz.
- Geri dönüş koşulu: Ledger'ı değiştiren yeni kanıt veya üretimde çözülemeyen görsel/hak sorunu → değişiklik Founder'a tek karar olarak gelir.
- Durum: Aktif. Sıradaki: görsel plan (`documentary-visual-plan`).

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
- Durum: Aktif (test bekleniyor).

### D-017 — Production hattı planı onaylandı; ikinci bilgisayar ana production/render makinesi
- Tarih: 2026-10-08
- Karar veren: Founder
- Karar: `production/tools/production-pipeline-plan.md` onaylandı (Premiere Pro son montaj + Media Encoder render; Remotion tekrar eden grafik/şema şablonları; ayrı FFmpeg kurulmaz; büyük medya GitHub dışında). İkinci bilgisayar ana production/render makinesi. Sıra: `machine-onboarding` ile bağlama ve durum doğrulama → ancak sonra Node.js + Remotion. Premiere'e hazır timeline (XML) yalnız P3'te küçük test; güvenilir çıkarsa standart olur.
- Durum: Aktif. Onboarding tamamlandı 2026-10-10 (render bilgisayarı DESKTOP-KVLH9B2; Node.js 24.21.0 LTS + Remotion 4.0.529 Founder onayıyla kuruldu; ayrıntı `company/machines.md`).
