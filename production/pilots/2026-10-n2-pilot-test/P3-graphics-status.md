# P3 — Grafik üretim durumu

> Güncelleme: 2026-10-10 · Uygulayıcı: COO (D-017, D-019 Production Autonomy Mode) · Kod: `production/remotion/` (veri: `src/videos/p3/shots.ts`) · Asset ve test çıktıları repo dışında: `D:\CompanyOS-Production\P3-ns-savannah\` (`01_archive`), `D:\CompanyOS-Production\_tests\p3\` (yarım çözünürlük önizleme; final render YOK).
> Render: `npx.cmd remotion render src/index.ts <Comp> <çıktı> --public-dir=D:\CompanyOS-Production\P3-ns-savannah\01_archive`

| Edit plan beat | Kompozisyon | Şablon | Kanıt | Durum |
|---|---|---|---|---|
| S1/S4 özet s.1 cümle vurgusu (V-02) | `P3-V02-DigestP1` | DocumentHighlight | Q-01, C-06 | Test edildi |
| S5 p1 üç satır (V-01) | `P3-V01-ThreeLines` | DocumentHighlight | C-06, C-08..C-10 | Test edildi |
| S5 üç satır → bar | `P3-LinesToBar`, `P3-ThreeItemsBar` | Crossfade + BarChart | C-06..C-10 | Test edildi |
| S5 p2–p3 eğitim | `P3-TrainingFlow` | FlowDiagram (arrow) | C-08, C-29, E-13 | Test edildi |
| S5 p4–p5 kara personeli | `P3-PortFlow` | FlowDiagram (none, groupSpan 3) | C-09, C-30, E-13 | Test edildi |
| S5 p6 Galveston haritası | `P3-GalvestonMap` | LocatorMap | GAO s.15; V-28, V-29 | Test edildi |
| S5 p6–p7 servis tesisi | `P3-Facility` | ComponentSchematic | C-10, C-31, E-11 | Test edildi |
| S5 p8–p9 1966–68 kullanım | `P3-FacilityTimeline` | Timeline | C-32 | Test edildi |
| S6 p2–p5 lone ship | `P3-LoneShip` | LoadShare | C-11, C-12, C-33, D-018 | Test edildi |
| S4 p1–p2 net cost | `P3-S4-NetCost` | EquationCard | C-01 | Test edildi |
| S4 p3–p4 hariç tutulanlar | `P3-S4-NotIncluded` | ScopeCard | C-16 | Test edildi |
| S4 p5 ≈ $2.9M | `P3-S4-NetCostBar` | BarChart | C-02 | Test edildi |
| S4 p6 sübvansiyon | `P3-S4-Subsidy` | EquationCard | C-05 | Test edildi |
| S4 p7–p10 ≈ $2M more | `P3-S4-TwoMillionMore` | EquationCard | C-04, Q-01 | Test edildi |
| S6 p1 "one ship system" | `P3-V12-OneShipSystem` | DocumentHighlight | Q-03, E-14 | Test edildi |
| S6 p4 Q-02 | `P3-Q02-FullCost` | DocumentHighlight | Q-02 | Test edildi |
| S7 p1–p2 kapsam | `P3-NotInReport` | ScopeCard | Q-05, E-12 | Test edildi |
| S7 p3 mürettebat | `P3-CrewBar` | BarChart (grouped) | C-17 | Test edildi |
| S1 p2 sefer haritası | `P3-S1-VoyageMap` | LocatorMap (dünya, bölge) | C-14, C-44 | Test edildi |
| S1 p2 NPS alıntısı | `P3-S1-QuoteReliable` | QuoteCard | Q-06 (NPS atıflı) | Test edildi |
| S1 p3 kapak damgası (V-03) | `P3-V03-Cover` | DocumentHighlight (outline) | E-2 | Test edildi |
| S2 p1–p2 prototip cümlesi (V-18) | `P3-V18-Prototype` | DocumentHighlight | C-18, C-39 | Test edildi |
| S2 p3 yolcu/kargo | `P3-S2-PassengerCargo` | ScopeCard | C-19 | Test edildi |
| S2 p4 sözleşmeler | `P3-S2-Contracts` | FlowDiagram (none) | C-20, C-38 | Test edildi |
| S3 p1 32 yakıt elemanı | `P3-S3-FuelElements` | UnitGrid | C-34, C-43 (NPS) | Test edildi |
| S3 p2–p3 'worked' | `P3-S3-WorkedMeans` | ScopeCard | C-14, C-36 | Test edildi |
| S8 p1 lay-up (V-14) | `P3-V14-LayUp` | DocumentHighlight | C-23 | Test edildi |
| S8 p1–p2 1962–1971 şeridi | `P3-S8-Strip` | Timeline | C-39, C-14, C-20, C-23, C-24 | Test edildi |
| V-05 fotoğraf etiketi | `P3-Label-V05` | SourceLabel (ProRes 4444 alfa) | V-05 | Test edildi |

## Kalan grafik işleri (edit plan §52 listesinden)
Remotion tarafı tamam. Kalan görsel işler fotoğraf tabanlı ve Premiere'de yapılır: S1 V-19/V-05 açılış, S2 V-07/V-21, S3 V-24, S8 V-26/V-09 ve son kare (V-01 + V-05). Fotoğraf asset'leri henüz indirilmedi (her indirme ayrı Founder onayı). S2 için gemi profil şeması bilinçli olarak çizilmedi: GAO yerleşim vermez → yolcu/kargo kapsam kartı kullanıldı.

## Bu turda yapılan kanıt düzeltmeleri
Script v2.2 (S6 "ten" cümlesi çıkarıldı, D-018) · v2.3 (S7 fleet cümlesi, E-12) · v2.4 (S5 port planlama ifadeleri, E-13) · v2.5 ("lone ship system" → GAO'nun gerçek ifadesi "one ship system", E-14) · ledger E-10..E-13, V-28, V-29 · edit/visual plan notları (10 gemi, ×3 damga, kapsam kartı).
