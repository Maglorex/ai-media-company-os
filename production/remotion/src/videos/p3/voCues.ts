// OTOMATİK ÜRETİLDİ — elle düzenleme. Kaynak: production/tools/elevenlabs/vo-cues.ps1
// VO: P3_VO_full_v2.timing.json · toplam 498.522 sn · 30 fps · üretim 2026-10-10 21:17
export const VO_FPS = 30;
export const VO_TOTAL_S = 498.522;
export const beats = {
  b01: {start: 0, end: 7.546, frames: 227}, // S1 p1 · photo:V-19
  b02: {start: 7.546, end: 22.511, frames: 449}, // S1 p2 · P3-S1-VoyageMap
  b02q: {start: 22.511, end: 29.385, frames: 207}, // S1 p2 (alıntı) · P3-S1-QuoteReliable
  b03: {start: 29.385, end: 35.213, frames: 175}, // S1 p3 · P3-V03-Cover
  b04: {start: 35.213, end: 48.042, frames: 385}, // S1 p4–p5 · P3-V02-DigestP1
  b05: {start: 48.042, end: 58.845, frames: 325}, // S1 p6–p7 · P3-S1-V01Teaser
  b06: {start: 58.845, end: 72.928, frames: 423}, // S2 p1 · photo:V-07
  b06b: {start: 72.928, end: 86.071, frames: 395}, // S2 p2 · P3-V18-Prototype
  b07: {start: 86.071, end: 99.248, frames: 396}, // S2 p3 · P3-S2-PassengerCargo
  b07b: {start: 99.248, end: 105.238, frames: 180}, // S2 p3 (belge, V-18 s.5) · P3-V18b-Unused
  b08: {start: 105.238, end: 114.758, frames: 286}, // S2 p4 (foto) · photo:V-21
  b08b: {start: 114.758, end: 124.716, frames: 299}, // S2 p4 (şema) · P3-S2-Contracts
  b09: {start: 124.716, end: 135.873, frames: 335}, // S3 p1 · P3-S3-FuelElements
  b10: {start: 135.873, end: 150.699, frames: 445}, // S3 p2–p3 · P3-S3-WorkedMeans
  b10b: {start: 150.699, end: 155.116, frames: 133}, // S3 p3 (rapor) · P3-V03-CoverPage
  b11: {start: 155.116, end: 170.209, frames: 453}, // S4 p1–p2 · P3-S4-NetCost
  b12: {start: 170.209, end: 185.162, frames: 449}, // S4 p3–p4 · P3-S4-NotIncluded
  b13: {start: 185.162, end: 191.292, frames: 184}, // S4 p5 · P3-S4-NetCostBar
  b14: {start: 191.292, end: 207.221, frames: 478}, // S4 p6 · P3-S4-Subsidy
  b15: {start: 207.221, end: 237.29, frames: 903}, // S4 p7–p10 · P3-S4-TwoMillionMore
  b16: {start: 237.29, end: 248.366, frames: 333}, // S5 p1 · P3-V01-ThreeLines
  b17: {start: 248.366, end: 277.949, frames: 888}, // S5 p2–p3 · P3-TrainingFlow
  b18: {start: 277.949, end: 314.764, frames: 1105}, // S5 p4–p5 · P3-PortFlow
  b19: {start: 314.764, end: 325.317, frames: 317}, // S5 p6 (harita) · P3-GalvestonMap
  b19b: {start: 325.317, end: 346.796, frames: 645}, // S5 p6–p7 (tesis) · P3-Facility
  b20: {start: 346.796, end: 366.368, frames: 588}, // S5 p8–p9 · P3-FacilityTimeline
  b21: {start: 366.368, end: 371.616, frames: 158}, // S6 p1 · P3-V12-OneShipSystem
  b22: {start: 371.616, end: 394.801, frames: 696}, // S6 p2–p3 · P3-LoneShip
  b23: {start: 394.801, end: 404.867, frames: 302}, // S6 p4 · P3-Q02-FullCost
  b24: {start: 404.867, end: 417.789, frames: 388}, // S6 p5 · P3-LoneShip@return
  b25: {start: 417.789, end: 427.704, frames: 298}, // S7 p1 (belge, V-17 s.4) · P3-V17-NotReviewed
  b25b: {start: 427.704, end: 433.532, frames: 175}, // S7 p2 (kısa kart) · P3-NotInReport
  b26: {start: 433.532, end: 454.976, frames: 644}, // S7 p3 · P3-CrewBar
  b26b: {start: 454.976, end: 458.819, frames: 116}, // S7 p4 · P3-V01-ThreeLines@end
  b27: {start: 458.819, end: 465.704, frames: 207}, // S8 p1 · P3-V14-LayUp
  b27b: {start: 465.704, end: 483.861, frames: 545}, // S8 p2 · P3-S8-Strip
  b28: {start: 483.861, end: 489.318, frames: 164}, // S8 p3 · photo:V-05
  b29: {start: 489.318, end: 498.522, frames: 277}, // S8 p4 · P3-S8-FinalFrame
} as const;
export const cues = {
  voy_med: 13.491,
  voy_neu: 14.768,
  voy_far: 16.23,
  voy_miles: 18.576,
  notloss: 44.814,
  pass_staterooms: 89.101,
  pass_unused: 96.705,
  nr_plainly: 421.76,
  fuel_free: 121.829,
  fuel_four: 129.697,
  worked_separate: 143.942,
  net_minus: 167.55,
  excl_fuel: 177.732,
  subsidy_paid: 203.773,
  two_quote: 214.652,
  two_notloss: 221.269,
  lines_19: 243.722,
  tr_67: 253.416,
  tr_class: 259.873,
  tr_ship: 265.283,
  tr_exam: 268.371,
  tr_88: 272.783,
  port_ten: 285.043,
  port_visit: 297.14,
  port_foreign: 304.536,
  fac_inside: 331.436,
  fac_invest: 340.712,
  tl_inspections: 356.049,
  tl_paid: 361.703,
  lone_several: 384.108,
  crew_insurance: 446.976,
  strip_deact: 476.86,
} as const;
export type BeatId = keyof typeof beats;
export type CueId = keyof typeof cues;
/** Beat süresi (kare). */
export const beatFrames = (b: BeatId) => beats[b].frames;
/** Cue anının beat başlangıcına göre karesi (beat içinde animasyon tetikleme). */
export const at = (c: CueId, b: BeatId) => Math.max(0, Math.round((cues[c] - beats[b].start) * VO_FPS));
