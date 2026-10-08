# Süre Kaydı — EXP-001 N2 Pilot Taslak Testi

> Kural: **Ölçülen** ve **tahmini** süreler ayrı tutulur. Ölçülen = gerçek saat damgası. Tahmin = `[TAHMİN]`.

## Aşama 1 — Konu seçimi + 3 karşılaştırılabilir pilot taslağı (2026-10-07)

### Ölçülen (duvar saati, çalışma ortamının saat damgaları, UTC+3)
| Başlangıç | Bitiş | Süre | İş | Yapan |
|---|---|---|---|---|
| 20:02:28 | 20:04:03 | 1,6 dk | İlk konu taraması (web) | COO (AI) |
| 20:04:03 | 20:06:39 | 2,6 dk | Kaynak kalitesi (research-analyst, 126 sn) ve teknik üretilebilirlik (production-engineer, 52 sn), paralel | Alt ajanlar (AI) |
| 20:06:39 | 20:08:33 | 1,9 dk | Baldwin'in elenmesi, Brewster taraması ve ikinci kaynak kontrolü | COO + research-analyst |
| 20:08:33 | 20:10:52 | 2,3 dk | 3 pilot dosyası (J40 NACA ve GAO raporlarının doğrulanması dahil) | COO (AI) |
| 20:10:52 | 20:12:18 | 1,4 dk | Karşılaştırma, rapor, Company OS kayıtları | COO (AI) |
| **Toplam** | | **~9,8 dk** | Aşama 1 | AI |
| Founder | | **0 s** | | Founder |

**Yorum:** Bu ölçüm, AI'ın masa araştırması ve planlama süresidir. İnsan üretim süresiyle **karşılaştırılamaz**: tam senaryo, görsel kaynak indirme/temizleme, grafik, kurgu ve QA henüz yapılmadı. Bir sonraki ölçüm (P3 tam pilot) insan ve AI sürelerini ayrı kaydedecek.

### Tahmini (insan, tam video) `[TAHMİN]` — production-engineer + COO
| Pilot | İlk video | Not |
|---|---|---|
| P1 Brewster | 82–119 s | Doğrulama ağır |
| P2 J40 | 88–125 s | Diyagram ağır |
| P3 NS Savannah | 77–109 s | Kaynak hazır; PWR diyagramı ağır |
| Tek seferlik şablon kurulumu | 50–70 s | Tüm pilotlar için ortak |
| Olgun üretim (şablon sonrası) | 41–62 s/video | |

## Aşama 2 — Tam pilot (P3), onay bekliyor
Ölçüm alanları: araştırma/doğrulama · senaryo · görsel kaynak + hak kaydı · grafik/animasyon · kurgu (render yok) · QA. Her biri için ayrı ayrı: AI süresi ve Founder süresi.

### 2026-10-08 — P3 kaynak doğrulaması (senaryo öncesi)
| Adım | AI (masa) | Founder | Not |
|---|---|---|---|
| GAO raporunun tamamını okuma, merkez rakam + karşılaştırma tabanı + 3 kalem sayfa no | ~1 oturum içi (duvar saati ölçülmedi) | 0 s | `P3-source-ledger.md` |
| Kapak varlıkları: rapor kesiti + gemi fotoğrafı lisansı | aynı oturum | 0 s | PDF işleme aracı yoktu; yerel geçici betikle sayfa görüntüsü çıkarıldı |
Not: Bu adımda duvar saati kaydı tutulmadı; tam pilotta adım başına başlangıç/bitiş saati yazılacak.
