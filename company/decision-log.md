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
