# CAL-S5 — Founder creative review of preview v1 (calibration observation)

> date: 2026-10-15 · source: Founder (chat, after watching `D:/CompanyOS-Production/CAL-S5/07_review/`) · recorded by: COO main session · decision context: D-048
> **Statü:** kalibrasyon kanıtıdır — **doctrine değildir, HARD kural değildir, canon'u değiştirmez** (governance §1, §3). Gözlemler yalnız `case:CAL-S5` revizyonuna uygulanır; kanal kuralına yükselmesi ayrı Founder kararı ister.
> **Sonuç: CAL-S5 v1 = REVISE. GOLDEN LOCK YOK.**

## Tercihler (GOLDEN değil)
| Konu | Founder tercihi | Statü |
|---|---|---|
| CASE INTRO sesi | **S-1** (mekanik/kâğıt) tercih edilen aday; S-2 şimdilik tercih edilmiyor | preferred calibration candidate — GOLDEN değil |
| Müzik yatağı | **M-01 — Ether Oar (The Whole Other)** tercih edilen aday | preferred calibration candidate — GOLDEN değil; M-02/M-03/M-04 kayıtları değişmez |

## Gözlemler
| # | Alan | Founder gözlemi | Teşhis (COO, sistem tarafı) |
|---|---|---|---|
| O-1 | Müzik sürekliliği | M-01'in karakteri iyi, ama yatak kesiliyor / yeniden başlıyor / tekrar ediyor / takılıyor gibi — kabul edilemez | **Teknik kök neden:** v1 Remotion kodu (`production/remotion/src/calibration/Reels.tsx`) yatağı her sahne için ayrı bir `<Audio>` elemanı olarak kuruyor; her sahne sınırında MP3 yeniden konumlanıyor ve her sahnenin ses zarfı ayrı hesaplanıyor (`bedShape` segment-yerel). Reel A ≈54 s, M-01 ≈159.6 s: loop/tekrar gerekmez |
| O-2 | Genel | Teknik olarak temiz, doğru yön; milyonluk premium belgesel için yeterince güçlü değil; "premium-looking PowerPoint" riski sürüyor | Akış yer yer photo → map → document → highlight → title card dizisi gibi okunuyor |
| O-3 | Reel A | DOCUMENT → UNDERSTANDING (belgedeki iddianın belgeden çıkıp görselleşmeye dönüşmesi) v1'in en güçlü yanı — **korunacak** | Sahneler bağımsız kartlar gibi; geçişler fikir taşımalı |
| O-4 | Engineering (G3) | En zayıf Golden adayı: temiz, anlaşılır ama corporate explainer / infographic / koyu mavi panel; öğeler sırayla açılan ikonlar | Uzamsal ilişki yok; kaynak malzemesi yok; koyu panel baskın |
| O-5 | CASE INTRO | Case Line fikri korunacak; v1 uygulaması title-card'a yakın (obje + çizgi + büyük başlık); çizgi gerçek iş yapmalı (inspect → isolate → register → classify → connect); investigation'a dönüşü daha belirgin olmalı; Savannah maske kenarı iyileşmeli; J40 `CASE 00X` kalır | v1 maskesi ölçülmüş piksel koordinatlarından kod ile çizilmiş (delivery report SP-01/SP-03) |
| O-6 | Renk/malzeme | Koyu navy/blue engineering dünyası fazla baskın; arşiv rengi, Archival Paper, sıcak amber/pirinç, fiziksel kaynak dokusu nefes almalı; dört dünya ayrışmalı; her şey CASE LAYER olmamalı | v1'de belge geri çekilirken "ink panel" kullanıldı (SP-04 MICRO) ve haritalar koyu zeminde |
| O-7 | Anti-reference | Mevcutlar korunabilir; yeni anti-reference: **PREMIUM-LOOKING BUT EMPTY** | — |
| O-8 | CTA / NEXT CASE | CTA'nın sakin ve küçük olması doğru; NEXT CASE finali template/end-card gibi; bitmekte olan case'in son görsel fikri gerçekten NEXT CASE hero object'e dönüşmeli; köşe/bracket öğeleri "placeholder" hissi veriyor | — |
| O-9 | Ses | S-1 v2 intro'da; jingle olmamalı; görüntünün önüne geçmemeli; mix önceliği narration → anlamlı S-1 olayı → müzik yatağı | — |

## Ek gözlem (COO, delivery report'tan)
v1'de Strong PC bütün sahneleri After Effects/Photoshop/Illustrator yerine Remotion kodu olarak üretti (Tool changes: "cost-complexity · intent: preserved"). Founder'ın O-4/O-5/O-6 bulguları bu sonucun yaratıcı amacı tam taşımadığını gösteriyor. v2'de araç yine sahneden sonra seçilir; ama revize sahnelerin **kabul ölçütleri araçtan bağımsız bağlayıcıdır** ve hero object maskesi Photoshop'ta elle rafine edilir (`05-scene-plan-v5.md`).
