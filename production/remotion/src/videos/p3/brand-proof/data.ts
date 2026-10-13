// P3 / CASE 001 — Brand Proof #3–#5 verisi (D-040). Yalnız SAFE asset'ler (evidence ledger §C, rights ledger):
// V-05 NARA 542141 ("Use: Unrestricted"; atıf "AEC / National Archives"), V-01/V-02/V-03 GAO B-136209 (PD),
// V-28/V-29 Natural Earth (PD). V-20, V-21, 1964 filmi ve AI asset yok.
// Dosyalar repo dışında: render'da --public-dir=D:\CompanyOS-Production\P3-ns-savannah\01_archive

export const CASE = {
  number: 'CASE 001',
  title: 'NS SAVANNAH',
  subtitle: '1962 · NUCLEAR MERCHANT SHIP', // C-30/C-39
  wordmark: 'THE INDUSTRIAL CASEBOOK',
  accent: '#4E8A88', // case accent: Atomic Teal (brand-system-v1.md §D, P3)
};

export const PHOTO = {src: 'photos/V-05_nara-542141_golden-gate_1962.jpg', width: 1920, height: 1588, credit: 'AEC / NATIONAL ARCHIVES · NAID 542141 · 1962'};

/** Gemi gövdesi + üst yapı konturu, V-05 piksel koordinatı (bu proof için yeniden izlendi). */
export const HULL: [number, number][] = [
  [266, 770], [332, 755], [558, 751], [571, 734], [702, 727], [762, 741], [822, 744], [832, 801],
  [902, 816], [1002, 831], [1238, 861], [1302, 880], [1482, 896], [1581, 913], [1592, 931],
  [1561, 966], [1526, 1016], [1506, 1058], [1398, 1051], [1138, 1026], [838, 976], [538, 916],
  [328, 841], [279, 801],
];
export const HULL_PATH = 'M' + HULL.map(([x, y]) => `${x} ${y}`).join(' L') + ' Z';

/** Ekrandaki EVIDENCE numarası = ledger satırı (P3-brand-source-to-visual-audit-v1.md "EVIDENCE eşlemesi"). */
export const EVIDENCE = {
  1: {ledger: 'V-03', source: 'GAO · 1970', page: {src: 'pages/page-01.png', w: 2400, h: 3061}},
  2: {ledger: 'V-02', source: 'GAO · 1970 · p.1', page: {src: 'pages/page-05.png', w: 2400, h: 3085}},
  3: {ledger: 'V-01', source: 'GAO · 1970 · p.2', page: {src: 'pages/page-06.png', w: 2400, h: 3084}},
} as const;

export const MAPS = {land: 'maps/ne_50m_land.geojson', states: 'maps/ne_50m_admin_1_states_provinces.geojson'};
export const PLACES = {
  usAtlantic: {lon: -74.5, lat: 39.5},
  galveston: {lon: -94.8, lat: 29.3}, // GAO s.15 (şehir düzeyi)
};
/** C-14 / C-44 (GAO s.6): bölge düzeyi, rota değil. */
export const VOYAGES = [
  {name: 'MEDITERRANEAN', n: 10, lon: 15, lat: 38},
  {name: 'NORTHERN EUROPE', n: 7, lon: 6, lat: 54},
  {name: 'FAR EAST', n: 2, lon: 128, lat: 33},
];
