# P3 — Kurgu cila notları (edit polish)

> Kaynak: Founder'ın aktardığı ChatGPT önizleme incelemesi (animatic v1), 2026-10-10. Genel yön onaylı (belge → grafik dönüşümleri, görsel dil). Notlar yaratıcı yön değişikliği değil; D-019 (Production Autonomy Mode) kapsamında uygulandı. ChatGPT çıktısı danışma niteliğindedir (evidence-and-research).

| # | Not | Durum | Uygulama |
|---|---|---|---|
| 1 | 4:19 civarı ~1,46 sn sessizlik → 0,9–1,1 sn | **Uygulandı** | Ölçüm: S05 21,585–23,041 sn (1,456 sn; "…nuclear training." → "Reactor operators…"). Görsel reveal gerektirmiyor (eğitim akışı ilk kutusu "Reactor operators" ile açılır). `vo-assemble.ps1 -PauseEdits 'S05:21.585:23.041:0.97'` → sessizliğin ortasından 0,486 sn çıkarıldı; ölçülen yeni duraklama 0,94 sn. Konuşmaya dokunulmadı, yeni kredi yok. **VO v2** (`P3_VO_full_v2*`, 8:18,5); tüm cue/beat zamanları otomatik yeniden üretildi. |
| 2 | Telefon / küçük önizleme okunabilirliği | **Uygulandı (QA + düzeltme)** | Tüm 34 SYNC klibi 1/4 ölçekte (480 px) kontrol sayfasında incelendi. Düzeltilen: ikincil metinler 20–24 → 23–29 px; düğüm başlıkları 33 px; Legal counsel kutusu taşması; 1962–1971 şeridinde etiket çakışması ve iki satırlı açıklamanın çizgiye binmesi. Kural: birincil bilgi (başlık, rakam, ana etiket) ≥ 30 px, ikincil ≥ 23 px; ayrıntı VO'da taşınır. Kalan risk: `Facility` şeması yoğun (küçük ekranda maddeler ikincil okuma) — VO aynı bilgiyi verir. |
| 3 | Fotoğraf sahnelerinde tek sürekli zoom değil; hafif pan, crop/detail cut | **Premiere notu** | Final Premiere: her fotoğraf beat'inde (b01 V-19, b06 V-07, b08 V-21, b28 V-05 + Ken Burns sahneleri) en az bir yön değişimi: hafif pan **veya** detay kesmesi (ör. V-19'da pruva → rıhtım kalabalığı; V-05'te gemi → Golden Gate kıyısı). Animatic'teki yavaş zoom yalnız geçici. Fotoğraf içeriği değiştirilmez; yalnız kadraj. |
| 4 | İlk 20–30 sn'de gemi + denetim/ek maliyet çatışmasının görsel teaser'ı | **Uygulandı** | VO öncesi 2,5 sn açılış teaser'ı (`SYNC-b00-Teaser`): gemi (V-05) + bulanık üç maliyet satırı (V-01) — thumbnail vaadiyle aynı kare; rakamlar S5'e kadar okunmaz. Ardından 0:32'de rapor kapağı, 0:38'de "≈ $2M more" belge vurgusu. Ek değişiklik gerekmedi. |
| 5 | Tasarım tutarlı, animasyon ritmi aynılaşmasın | **Uygulandı** | Kart şablonlarına (ScopeCard, EquationCard, FlowDiagram) `motion: 'fade' \| 'rise'`; kart klipleri sırayla farklı girişle. Kart arası belge araları (not 6) ritmi ayrıca kırar; belge vurguları zaten farklı kamera/hız kullanıyor. |
| 6 | "Not in this report" ve benzeri kapsam kartları kısa | **Uygulandı** | S7: önce belgenin kendisi (V-17, "We did not review…" vurgusu, 9,9 sn), ardından kısa kart (alıntısız, 5,8 sn) — önceki tek kart 15,8 sn idi. S2 yolcu/kargo kartından alıntı çıkarıldı; hemen ardından belge (V-18 s.5) gösterilir. S3 sonu: rapor kapağına kısa köprü. |
| 7 | Sağ üst debug zaman/sahne kodu yalnız önizlemede | **Doğrulandı** | Damga yalnız `P3-ANIMATIC` kompozisyonunda (metinde "debug — final export'ta yok"); `SYNC-*` klipleri ve final export'ta yok. |

## Çıktılar
- `03_vo\final\P3_VO_full_v2.wav` / `_LISTEN.mp3` / `.timing.json` (v1 korunur)
- `06_renders\P3_ANIMATIC_v2_halfres.mp4` (senkron kontrolü; final değil)
- Telefon QA kontrol sayfaları: `D:\CompanyOS-Production\_tests\p3\phone\sheet1-3.png`