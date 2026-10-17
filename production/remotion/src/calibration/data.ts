// CAL-S5 calibration — measured data only (Stage 5; handoff CAL-S5-HO@v2, scene plan v4).
// Every coordinate here was measured on the actual files on the Strong PC (grid crops / still checks);
// every VO time comes from AI-02 / the AI-03 alignment (never typed by ear).
// Asset IDs referenced: V-05, V-07, V-19, V-24, V-28, V-29, V-01, V-02, V-03, V-13, V-90, AI-01, AI-03, M-01…M-04, OG-01…OG-11.

export const FPS = 30;
export const W = 1920;
export const H = 1080;
export const sec = (s: number) => Math.round(s * FPS);

/** Case accent (case-register, P3): Atomic Teal. Demo payload accent (J40, not registered): a cool steel blue. */
export const TEAL = '#4E8A88';
export const DEMO = '#8FB0C8';

export type Pt = [number, number];

/** Files in the render public dir (`CAL-S5/05_projects/public`, verbatim copies hash-checked by stage.ps1). */
export const file = {
  v05: 'img/v05.jpg', // V-05 NARA 542141, 1920×1588
  v07: 'img/v07.jpg', // V-07 launch (anti-reference only)
  v19: 'img/v19.jpg', // V-19 Rotterdam 1964 (anti-reference only)
  v24: 'img/v24.jpg', // V-24 fuel element (anti-reference only)
  v90: 'img/v90.jpg', // V-90 NASA GRC-1951-C-28738, 2009×2539
  p01: 'pages/page-01.png', // V-03 cover (PDF p.1)
  p05: 'pages/page-05.png', // V-02 summary p.1 (PDF p.5)
  p06: 'pages/page-06.png', // V-01 summary p.2 (PDF p.6)
  p19: 'pages/page-19.png', // V-13 p.15 (PDF p.19)
  land: 'geo/land.geojson', // V-29
  admin1: 'geo/admin1.geojson', // V-28
  ai01: 'vo/ai01.mp3', // AI-01
  ai03: 'vo/ai03.mp3', // AI-03
  og08: 'sfx/OG-08.wav',
  og09: 'sfx/OG-09.wav',
  og10: 'sfx/OG-10.wav',
} as const;

export type Bed = 'M01' | 'M02' | 'M03' | 'M04';
export const bedFile = (b: Bed) => `music/${b}.wav`; // level-matched to −23 LUFS (stage.ps1)
export const bedTitle: Record<Bed, string> = {
  M01: 'Ether Oar — The Whole Other',
  M02: 'Hainbach — The Stalker',
  M03: 'DivKid — The Empty Moons of Jupiter',
  M04: 'The Tower of Light — Contact',
};

/** AI-01 cut list (scene plan v4): [start, end] seconds, cut inside measured pauses. */
export const VO = {
  A: [0.0, 14.3],
  B: [14.3, 29.0],
  C: [29.0, 38.55],
  D: [38.55, 54.75],
  E: [54.75, 65.25],
} as const;
/** AI-03 cut list: L1 identity CTA · L2 payoff · L3 optional subscribe (alignment + silencedetect −50 dB). */
export const LINE = {L1: [0.0, 8.9], L2: [9.6, 14.34], L3: [14.34, 16.67]} as const;

/** OG-10 texture sheet offsets (synth.mjs). */
export const SHEET = {reveal: [0, 2], plate: [2, 4], tick: [4, 4.6], room: [5, 15], whoosh: [15, 16], boom: [16, 18], glitch: [18, 18.6]} as const;

// ---------------------------------------------------------------- V-05 (1920×1588)
export const V05 = {w: 1920, h: 1588};
/** Visible content (scan border excluded). */
export const V05_CONTENT = {x0: 16, y0: 16, x1: 1904, y1: 1572};
/** Ship silhouette (hull + superstructure; masts, flags excluded) — visible pixels only. */
export const HULL: Pt[] = [
  [266, 792], [300, 772], [350, 762], [490, 758], [580, 742], [770, 738], [810, 752], [830, 790], [832, 835],
  [1050, 868], [1250, 905], [1450, 918], [1510, 918], [1592, 928], [1550, 958], [1515, 1015], [1508, 1060],
  [1250, 1032], [950, 994], [650, 936], [400, 880], [300, 850],
];
/** Bridge steel (foreground) in the bottom-right corner. */
export const BRIDGE: Pt[] = [[1726, 1574], [1906, 1402], [1906, 1574]];
/** Hull long axis (stern → bow, mid-hull): used to level the hull on the Case Line. */
export const HULL_AXIS = {from: [270, 815] as Pt, to: [1590, 985] as Pt};

// ---------------------------------------------------------------- V-90 (2009×2539)
export const V90 = {w: 2009, h: 2539};
/** Engine only (researcher at x ≥ 1290 is outside). */
export const ENGINE: Pt[] = [
  [960, 40], [1090, 40], [1120, 150], [1150, 240], [1190, 320], [1210, 420], [1225, 520], [1215, 620], [1225, 720],
  [1235, 840], [1245, 960], [1225, 1090], [1200, 1200], [1185, 1350], [1170, 1500], [1160, 1650], [1150, 1780],
  [1160, 1950], [1160, 2120], [1140, 2240], [1100, 2330], [1000, 2390], [860, 2395], [730, 2375], [640, 2320],
  [590, 2230], [575, 2100], [580, 1950], [605, 1800], [650, 1680], [675, 1560], [695, 1400], [715, 1250],
  [740, 1120], [760, 1000], [785, 880], [805, 760], [835, 640], [845, 520], [865, 410], [900, 320], [945, 230], [965, 140],
];
export const ENGINE_AXIS = {from: [1025, 40] as Pt, to: [870, 2390] as Pt};
/** Band around the engine used as its softened world (researcher and caption excluded). */
export const ENGINE_WORLD: Pt[] = [[0, 0], [1270, 0], [1270, 2430], [0, 2430]];
/** Upright opening frame: the test-section plate's top edge, left of the engine (x 0–790). */
export const PLATE_EDGE = {y: 806, x0: 0, x1: 790};

// ---------------------------------------------------------------- GAO pages (2400 px wide renders)
export const PAGE = {w: 2400, h: 3085};
export const COVER = {w: 2400, h: 3061, title: [1500, 1268] as Pt};
/** V-02 summary p.1 — Q-01 sentence (three lines) and the phrase "about $2 million more a year". */
export const P05 = {
  sentence: {x0: 560, y0: 2356, x1: 2240, y1: 2512},
  lines: [
    {x0: 1336, y0: 2358, x1: 2230, y1: 2412},
    {x0: 566, y0: 2410, x1: 2230, y1: 2462},
    {x0: 566, y0: 2460, x1: 1886, y1: 2512},
  ],
  phrase: {x0: 1424, y0: 2358, x1: 2100, y1: 2412},
};
/** V-01 summary p.2 — the three cost lines. */
export const P06 = {
  lines: [
    {x0: 262, y0: 206, x1: 1566, y1: 262},
    {x0: 262, y0: 308, x1: 1854, y1: 410},
    {x0: 262, y0: 458, x1: 1920, y1: 512},
  ],
};

// ---------------------------------------------------------------- map (V-28 / V-29) — degrees
export const PLACES = {
  usAtlantic: [-76.3, 37.0] as Pt, // "U.S. Atlantic ports" (C-44: no port named) — region-level marker
  galveston: [-94.8, 29.3] as Pt,
  newYork: [-74.0, 40.7] as Pt,
};
/** C-44 regions (region level only; no routes, no ports): sea areas sketched as soft zones. */
export const REGIONS = [
  {id: 'MEDITERRANEAN', n: 10, label: [18, 30.5] as Pt, poly: [[-6, 35.5], [-2, 37.5], [3, 42.5], [9, 44.5], [15, 41.5], [19, 40], [24, 40.5], [29, 37], [35, 36], [34, 31.5], [25, 32], [20, 31], [12, 33], [9, 37], [0, 35.5]] as Pt[]},
  {id: 'NORTHERN EUROPE', n: 7, label: [2, 61.5] as Pt, poly: [[-8, 48], [-6, 51.5], [-3, 56], [1, 58.5], [6, 59], [10, 57.5], [9, 54.5], [5, 52.5], [2, 51], [-1, 49.5], [-5, 47.5]] as Pt[]},
  {id: 'FAR EAST', n: 2, label: [135, 47.5] as Pt, poly: [[119, 22], [121, 30], [124, 37], [129, 41], [138, 43.5], [145, 44], [146, 38], [141, 33], [133, 29], [126, 24], [121, 20]] as Pt[]},
];

/** C-31 / E-11 facility components, in GAO's own terms (order = narration). */
export const COMPONENTS = ['PIER', '75-TON GANTRY CRANE', 'MAINTENANCE BUILDING', 'ATOMIC SERVANT', 'SPARE REACTOR CORE'] as const;

/** C-08 / C-09 / C-10 (thousand $ a year) — block scale only; no total is written on screen. */
export const COSTS = [
  {label: 'NUCLEAR CREW TRAINING', k: 300},
  {label: 'NUCLEAR SHORE STAFF', k: 409},
  {label: 'SERVICING FACILITY', k: 1162},
];
/** px per thousand $ (same scale in SP-04 and SP-09). C-04 gap = about $2 million → 900 px. */
export const PX_PER_K = 0.45;
