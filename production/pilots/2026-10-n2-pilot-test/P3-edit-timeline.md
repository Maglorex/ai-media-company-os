# P3 — Kurgu zaman çizelgesi (VO senkron)

> OTOMATİK ÜRETİLDİ (2026-10-10 21:17) — `production/tools/elevenlabs/vo-cues.ps1`. Kaynak VO: `03_vo\final\P3_VO_full_v2.timing.json` (toplam 8:18.5). Tanım: `P3-vo-cues.json`. Zamanlar edit plan v1'deki tahminlerin yerini alır (plan: ~9–10 dk; gerçek VO: 8:18.5).
> Kurgu: her görsel beat başlangıcında başlar, sonraki beat başlangıcında biter. ``photo:`` = Premiere'de fotoğraf hareketi; ``@return``/``@end`` = kompozisyonun son bölümünden kullanım.

| Beat | Başlangıç | Bitiş | Süre (sn) | Plan | Görsel | VO başlangıcı |
|---|---|---|---|---|---|---|
| b01 | 0:00.0 | 0:07.5 | 7.5 | S1 p1 | `photo:V-19` | "The NS Savannah was the first…" |
| b02 | 0:07.5 | 0:22.5 | 15.0 | S1 p2 | `P3-S1-VoyageMap` | "In her first three years of commercial service…" |
| b02q | 0:22.5 | 0:29.4 | 6.9 | S1 p2 (alıntı) | `P3-S1-QuoteReliable` | "A National Park Service history quotes…" |
| b03 | 0:29.4 | 1:35.2 | 5.8 | S1 p3 | `P3-V03-Cover` | "But in June 1970…" |
| b04 | 1:35.2 | 1:48.0 | 12.8 | S1 p4–p5 | `P3-V02-DigestP1` | "Compared with the support…" |
| b05 | 1:48.0 | 1:58.8 | 10.8 | S1 p6–p7 | `P3-S1-V01Teaser` | "Why would a ship…" |
| b06 | 1:58.8 | 1:12.9 | 14.1 | S2 p1 | `photo:V-07` | "To see why…" |
| b06b | 1:12.9 | 1:26.1 | 13.1 | S2 p2 | `P3-V18-Prototype` | "In the auditors' words…" |
| b07 | 1:26.1 | 2:39.2 | 13.2 | S2 p3 | `P3-S2-PassengerCargo` | "So she carried real freight…" |
| b07b | 2:39.2 | 2:45.2 | 6.0 | S2 p3 (belge, V-18 s.5) | `P3-V18b-Unused` | "The auditors noted…" |
| b08 | 2:45.2 | 2:54.8 | 9.5 | S2 p4 (foto) | `photo:V-21` | "After about three years as a demonstration ship…" |
| b08b | 2:54.8 | 2:04.7 | 10.0 | S2 p4 (şema) | `P3-S2-Contracts` | "for one dollar a year…" |
| b09 | 2:04.7 | 2:15.9 | 11.2 | S3 p1 | `P3-S3-FuelElements` | "In operation, she held up…" |
| b10 | 2:15.9 | 3:30.7 | 14.8 | S3 p2–p3 | `P3-S3-WorkedMeans` | "So the Savannah worked in a specific sense…" |
| b10b | 3:30.7 | 3:35.1 | 4.4 | S3 p3 (rapor) | `P3-V03-CoverPage` | "But it does show…" |
| b11 | 3:35.1 | 3:50.2 | 15.1 | S4 p1–p2 | `P3-S4-NetCost` | "The General Accounting Office looked at…" |
| b12 | 3:50.2 | 3:05.2 | 15.0 | S4 p3–p4 | `P3-S4-NotIncluded` | "And they were careful…" |
| b13 | 3:05.2 | 3:11.3 | 6.1 | S4 p5 | `P3-S4-NetCostBar` | "Over her first three commercial years…" |
| b14 | 3:11.3 | 3:27.2 | 15.9 | S4 p6 | `P3-S4-Subsidy` | "On its own…" |
| b15 | 3:27.2 | 4:57.3 | 30.1 | S4 p7–p10 | `P3-S4-TwoMillionMore` | "So the auditors compared…" |
| b16 | 4:57.3 | 4:08.4 | 11.1 | S5 p1 | `P3-V01-ThreeLines` | "The auditors answered that…" |
| b17 | 4:08.4 | 5:37.9 | 29.6 | S5 p2–p3 | `P3-TrainingFlow` | "Line one…" |
| b18 | 5:37.9 | 5:14.8 | 36.8 | S5 p4–p5 | `P3-PortFlow` | "Line two…" |
| b19 | 5:14.8 | 5:25.3 | 10.6 | S5 p6 (harita) | `P3-GalvestonMap` | "Line three…" |
| b19b | 5:25.3 | 6:46.8 | 21.5 | S5 p6–p7 (tesis) | `P3-Facility` | "A pier and work area…" |
| b20 | 6:46.8 | 6:06.4 | 19.6 | S5 p8–p9 | `P3-FacilityTimeline` | "And here is the detail…" |
| b21 | 6:06.4 | 6:11.6 | 5.2 | S6 p1 | `P3-V12-OneShipSystem` | "The auditors had a name…" |
| b22 | 6:11.6 | 7:34.8 | 23.2 | S6 p2–p3 | `P3-LoneShip` | "The training program, the shore staff…" |
| b23 | 7:34.8 | 7:44.9 | 10.1 | S6 p4 | `P3-Q02-FullCost` | "The auditors' conclusion was simple…" |
| b24 | 7:44.9 | 7:57.8 | 12.9 | S6 p5 | `P3-LoneShip@return` | "So this is what the auditors' count shows…" |
| b25 | 7:57.8 | 7:07.7 | 9.9 | S7 p1 (belge, V-17 s.4) | `P3-V17-NotReviewed` | "It's worth being clear…" |
| b25b | 7:07.7 | 7:13.5 | 5.8 | S7 p2 (kısa kart) | `P3-NotInReport` | "They didn't include the fuel…" |
| b26 | 7:13.5 | 8:34.10 | 21.4 | S7 p3 | `P3-CrewBar` | "They also pointed to other expenses…" |
| b26b | 8:34.10 | 8:38.8 | 3.8 | S7 p4 | `P3-V01-ThreeLines@end` | "But the three lines are where…" |
| b27 | 8:38.8 | 8:45.7 | 6.9 | S8 p1 | `P3-V14-LayUp` | "The report went to Congress…" |
| b27b | 8:45.7 | 8:03.9 | 18.2 | S8 p2 | `P3-S8-Strip` | "According to the National Park Service…" |
| b28 | 8:03.9 | 8:09.3 | 5.5 | S8 p3 | `photo:V-05` | "When the auditors wrote their report…" |
| b29 | 8:09.3 | 8:18.5 | 9.2 | S8 p4 | `P3-S8-FinalFrame` | "The Savannah worked. What the auditors counted…" |

## Animasyon cue'ları (grafik içi tetikleme)
| Cue | Zaman |
|---|---|
| voy_med | 0:13.5 |
| voy_neu | 0:14.8 |
| voy_far | 0:16.2 |
| voy_miles | 0:18.6 |
| notloss | 1:44.8 |
| pass_staterooms | 1:29.1 |
| pass_unused | 2:36.7 |
| nr_plainly | 7:01.8 |
| fuel_free | 2:01.8 |
| fuel_four | 2:09.7 |
| worked_separate | 2:23.9 |
| net_minus | 3:47.6 |
| excl_fuel | 3:57.7 |
| subsidy_paid | 3:23.8 |
| two_quote | 4:34.7 |
| two_notloss | 4:41.3 |
| lines_19 | 4:03.7 |
| tr_67 | 4:13.4 |
| tr_class | 4:19.9 |
| tr_ship | 4:25.3 |
| tr_exam | 4:28.4 |
| tr_88 | 5:32.8 |
| port_ten | 5:45.0 |
| port_visit | 5:57.1 |
| port_foreign | 5:04.5 |
| fac_inside | 6:31.4 |
| fac_invest | 6:40.7 |
| tl_inspections | 6:56.0 |
| tl_paid | 6:01.7 |
| lone_several | 6:24.1 |
| crew_insurance | 7:26.10 |
| strip_deact | 8:56.9 |
