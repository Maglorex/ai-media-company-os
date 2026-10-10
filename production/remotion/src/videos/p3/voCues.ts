// OTOMATİK ÜRETİLDİ — elle düzenleme. Kaynak: production/tools/elevenlabs/vo-cues.ps1
// VO: P3_VO_full_v1.timing.json · toplam 499.008 sn · 30 fps · üretim 2026-10-10 20:51
export const VO_FPS = 30;
export const VO_TOTAL_S = 499.008;
export const beats = {
  b01: {start: 0, end: 7.546, frames: 227}, // S1 p1 · photo:V-19
  b02: {start: 7.546, end: 22.511, frames: 449}, // S1 p2 · P3-S1-VoyageMap
  b02q: {start: 22.511, end: 29.385, frames: 207}, // S1 p2 (alıntı) · P3-S1-QuoteReliable
  b03: {start: 29.385, end: 35.213, frames: 175}, // S1 p3 · P3-V03-Cover
  b04: {start: 35.213, end: 48.042, frames: 385}, // S1 p4–p5 · P3-V02-DigestP1
  b05: {start: 48.042, end: 58.845, frames: 325}, // S1 p6–p7 · P3-S1-V01Teaser
  b06: {start: 58.845, end: 72.928, frames: 423}, // S2 p1 · photo:V-07
  b06b: {start: 72.928, end: 86.071, frames: 395}, // S2 p2 · P3-V18-Prototype
  b07: {start: 86.071, end: 105.238, frames: 576}, // S2 p3 · P3-S2-PassengerCargo
  b08: {start: 105.238, end: 114.758, frames: 286}, // S2 p4 (foto) · photo:V-21
  b08b: {start: 114.758, end: 124.716, frames: 299}, // S2 p4 (şema) · P3-S2-Contracts
  b09: {start: 124.716, end: 135.873, frames: 335}, // S3 p1 · P3-S3-FuelElements
  b10: {start: 135.873, end: 155.116, frames: 578}, // S3 p2–p3 · P3-S3-WorkedMeans
  b11: {start: 155.116, end: 170.209, frames: 453}, // S4 p1–p2 · P3-S4-NetCost
  b12: {start: 170.209, end: 185.162, frames: 449}, // S4 p3–p4 · P3-S4-NotIncluded
  b13: {start: 185.162, end: 191.292, frames: 184}, // S4 p5 · P3-S4-NetCostBar
  b14: {start: 191.292, end: 207.221, frames: 478}, // S4 p6 · P3-S4-Subsidy
  b15: {start: 207.221, end: 237.29, frames: 903}, // S4 p7–p10 · P3-S4-TwoMillionMore
  b16: {start: 237.29, end: 248.366, frames: 333}, // S5 p1 · P3-V01-ThreeLines
  b17: {start: 248.366, end: 278.435, frames: 903}, // S5 p2–p3 · P3-TrainingFlow
  b18: {start: 278.435, end: 315.25, frames: 1105}, // S5 p4–p5 · P3-PortFlow
  b19: {start: 315.25, end: 325.803, frames: 317}, // S5 p6 (harita) · P3-GalvestonMap
  b19b: {start: 325.803, end: 347.282, frames: 645}, // S5 p6–p7 (tesis) · P3-Facility
  b20: {start: 347.282, end: 366.854, frames: 588}, // S5 p8–p9 · P3-FacilityTimeline
  b21: {start: 366.854, end: 372.102, frames: 158}, // S6 p1 · P3-V12-OneShipSystem
  b22: {start: 372.102, end: 395.287, frames: 696}, // S6 p2–p3 · P3-LoneShip
  b23: {start: 395.287, end: 405.353, frames: 302}, // S6 p4 · P3-Q02-FullCost
  b24: {start: 405.353, end: 418.275, frames: 388}, // S6 p5 · P3-LoneShip@return
  b25: {start: 418.275, end: 434.018, frames: 473}, // S7 p1–p2 · P3-NotInReport
  b26: {start: 434.018, end: 455.462, frames: 644}, // S7 p3 · P3-CrewBar
  b26b: {start: 455.462, end: 459.305, frames: 116}, // S7 p4 · P3-V01-ThreeLines@end
  b27: {start: 459.305, end: 466.19, frames: 207}, // S8 p1 · P3-V14-LayUp
  b27b: {start: 466.19, end: 484.347, frames: 545}, // S8 p2 · P3-S8-Strip
  b28: {start: 484.347, end: 489.804, frames: 164}, // S8 p3 · photo:V-05
  b29: {start: 489.804, end: 499.008, frames: 277}, // S8 p4 · P3-S8-FinalFrame
} as const;
export const cues = {
  voy_med: 13.491,
  voy_neu: 14.768,
  voy_far: 16.23,
  voy_miles: 18.576,
  notloss: 44.814,
  pass_staterooms: 89.101,
  pass_unused: 96.705,
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
  tr_class: 260.359,
  tr_ship: 265.769,
  tr_exam: 268.857,
  tr_88: 273.269,
  port_ten: 285.529,
  port_visit: 297.626,
  port_foreign: 305.022,
  fac_inside: 331.922,
  fac_invest: 341.198,
  tl_inspections: 356.535,
  tl_paid: 362.189,
  lone_several: 384.594,
  crew_insurance: 447.462,
  strip_deact: 477.346,
} as const;
export type BeatId = keyof typeof beats;
export type CueId = keyof typeof cues;
/** Beat süresi (kare). */
export const beatFrames = (b: BeatId) => beats[b].frames;
/** Cue anının beat başlangıcına göre karesi (beat içinde animasyon tetikleme). */
export const at = (c: CueId, b: BeatId) => Math.max(0, Math.round((cues[c] - beats[b].start) * VO_FPS));
