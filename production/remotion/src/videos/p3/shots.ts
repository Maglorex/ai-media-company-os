import {theme} from '../../theme';
import {BarChartProps} from '../../templates/BarChart';
import {DocumentHighlightProps} from '../../templates/DocumentHighlight';
import {EquationCardProps} from '../../templates/EquationCard';
import {FlowDiagramProps} from '../../templates/FlowDiagram';
import {ComponentSchematicProps} from '../../templates/ComponentSchematic';
import {LoadShareProps} from '../../templates/LoadShare';
import {LocatorMapProps} from '../../templates/LocatorMap';
import {QuoteCardProps} from '../../templates/QuoteCard';
import {ScopeCardProps} from '../../templates/ScopeCard';
import {TimelineProps, ym} from '../../templates/Timeline';
import {UnitGridProps} from '../../templates/UnitGrid';
import {SourceLabelProps} from '../../templates/SourceLabel';

// P3 — NS Savannah. Kaynak: GAO B-136209 (S1, evidence ledger). Kamu malı.
// Görüntüler: D:\CompanyOS-Production\P3-ns-savannah\01_archive\ → render'da --public-dir.
// Sayfa görüntüsü: production/tools/pdf/pdf-to-png.ps1 -Pages 5,6 -Width 2400 (metin/sayı değiştirilmez).
// Koordinatlar 2400 px genişlikteki sayfa görüntüsüne göre.

const GAO = 'U.S. General Accounting Office';
const PAGE = {width: 2400, height: 3085};

/** V-02 — Digest s.1 (PDF 5): Q-01 "$2 million" cümlesi, ardından "$1.9 million" girişi (C-02, C-04, C-06). */
export const p3V02: DocumentHighlightProps = {
  src: 'pages/page-05.png',
  pageSize: PAGE,
  camera: [{from: 20, duration: 75, region: {x: 540, y: 2328, w: 1712, h: 355}}],
  highlights: [
    // Q-01: "This is about $2 million more a year than / the average operating subsidy ... / ships operated on the same trade route."
    // Atıf "(See p. 12.)" vurgulanmaz; yalnız cümle.
    {region: {x: 1252, y: 2357, w: 975, h: 49}, from: 110, duration: 20},
    {region: {x: 572, y: 2406, w: 1565, h: 49}, from: 130, duration: 30},
    {region: {x: 572, y: 2455, w: 912, h: 50}, from: 160, duration: 20},
    // C-06: "About $1.9 million of the SAVANNAH's additional annual costs is attributable to:"
    {region: {x: 572, y: 2563, w: 1650, h: 50}, from: 230, duration: 30},
    {region: {x: 572, y: 2613, w: 240, h: 50}, from: 260, duration: 10},
  ],
  dimOthers: 0.28,
  label: {text: 'GAO report B-136209 (1970), p. 1', detail: GAO, from: 30},
};

/** V-01 — Digest s.2 (PDF 6): üç nükleer maliyet satırı, sırayla (C-06, C-08, C-09, C-10). Kapak ana öğesi (D-012). */
export const p3V01: DocumentHighlightProps = {
  src: 'pages/page-06.png',
  pageSize: {width: 2400, height: 3084},
  camera: [{from: 15, duration: 75, region: {x: 231, y: 170, w: 1712, h: 401}}],
  // Edit plan S5 p1: S1'deki bulanık kesit burada netleşir (rack focus).
  blur: {from: 12, to: 0, start: 10, end: 80},
  highlights: [
    // "--$300,000 average annual cost for nuclear crew training,"
    {region: {x: 260, y: 204, w: 1345, h: 60}, from: 100, duration: 26},
    // "--$409,000 average annual cost for a specially trained nuclear shore / staff, and"
    {region: {x: 260, y: 304, w: 1592, h: 60}, from: 170, duration: 30},
    {region: {x: 306, y: 364, w: 250, h: 46}, from: 200, duration: 10},
    // "--$1,162,000 average annual cost for a nuclear ship-servicing facility."
    {region: {x: 260, y: 456, w: 1656, h: 58}, from: 250, duration: 32},
  ],
  dimOthers: 0.25,
  label: {text: 'GAO report B-136209 (1970), p. 2', detail: GAO, from: 25},
};

/**
 * S5 — üç kalem yığılmış bar. Değerler ve metinler GAO Digest s.2 (PDF 6) satırlarıyla birebir (C-08, C-09, C-10).
 * Ölçek bu üç değerden çizilir (toplamları 1.871.000 $ = C-07, ekranda yazılmaz).
 * Toplam etiketi GAO'nun kendi cümlesidir (C-06, Digest s.1): "About $1.9 million of the SAVANNAH's additional annual costs".
 * Satır sırası ve renkleri V-01 belge vurgusuyla aynı sırada gelir; en büyük kalem (servis tesisi) vurgulu.
 * `from` değerleri burada test için sık; montajda VO zamanlamasına göre (edit plan 4:30 / 5:01 / 5:39) ayarlanır.
 */
export const p3ThreeItemsBar: BarChartProps = {
  mode: 'stacked',
  title: 'Average annual cost',
  subtitle: 'The three items listed in the GAO summary',
  items: [
    {label: 'Nuclear crew training', value: 300_000, valueLabel: '$300,000', from: 20},
    {label: 'Specially trained nuclear shore staff', value: 409_000, valueLabel: '$409,000', from: 70},
    {label: 'Nuclear ship-servicing facility', value: 1_162_000, valueLabel: '$1,162,000', from: 120, emphasis: true},
  ],
  total: {label: 'About $1.9 million', detail: "of the Savannah's additional annual costs (GAO)", from: 175},
  label: {text: 'GAO report B-136209 (1970), p. 1–2', detail: GAO, from: 10},
};

/** S7 — mürettebat karşılaştırması (C-17, GAO s.8 / PDF 12): "67 compared with about 46 to 55 for comparable conventionally powered vessels". */
export const p3CrewBar: BarChartProps = {
  mode: 'grouped',
  title: 'Crew size',
  items: [
    {label: 'N.S. Savannah', value: 67, valueLabel: '67', from: 20, emphasis: true},
    {label: 'Comparable conventionally powered vessels', range: {min: 46, max: 55}, valueLabel: 'about 46 to 55', from: 50},
  ],
  max: 80,
  label: {text: 'GAO report B-136209 (1970), p. 8', detail: GAO, from: 10},
};

/**
 * S6 — "one ship system" (GAO s.12; ledger E-14) (C-11, C-12, C-33, Q-02, C-06). Founder kararı D-018: kesin sayı yok; yalnız GAO'nun "several" ifadesi.
 * - Yayılan bloklar yalnız kara personeli + servis tesisi: GAO "The shore staff and the maintenance facility could handle
 *   several nuclear ships at a lower cost per ship" (Digest s.2). Eğitim için GAO bunu söylemez (yalnız gelecek gemiler için
 *   eğitimli personel yedeği, C-08) → eğitim bloğu yayılmaz.
 * - Varsayımsal gemiler kesik çizgili ve sağa doğru solar: sayılamaz.
 * - "10 gemi" (C-13, yetkili görüşü) bu animasyonda yok; yalnız ledger'da ikinci seviye bağlam.
 * Blok yükseklikleri ve renkleri P3-ThreeItemsBar ile aynı (300K / 409K / 1.162M); sayı yazılmaz.
 */
export const p3LoneShip: LoadShareProps = {
  unitLabel: 'N.S. Savannah',
  ghostLabel: 'Other nuclear ships (hypothetical)',
  blocks: [
    {label: 'Nuclear ship-servicing facility', value: 1_162_000, shareable: true, color: theme.accent},
    {label: 'Nuclear shore staff', value: 409_000, shareable: true, color: theme.series[1]},
    {label: 'Nuclear crew training', value: 300_000, shareable: false, color: theme.series[0]},
  ],
  spreadFrom: 150,
  returnFrom: 300,
  captions: [
    {from: 0, title: 'A “one ship system”', detail: "The auditors' description of the Savannah (GAO)"},
    {
      from: 150,
      title: 'Could handle several nuclear ships',
      emphasis: 'several',
      detail: 'The shore staff and the maintenance facility, “at a lower cost per ship” (GAO)',
    },
    // Edit plan S6 p5 payoff. GAO sabit ifadesi C-06; "built around one ship" = C-11 (tek gemi tüm maliyeti taşıdı).
    // Q-02 alıntısı ("as long as one vessel must absorb the full cost") S6 p4'te belge vurgusu olarak ayrıca var.
    {
      from: 300,
      title: 'About $1.9 million a year',
      detail: "of the Savannah's additional annual costs, from support built around one ship",
    },
  ],
  label: {text: 'Illustration · GAO report B-136209 (1970)', detail: 'pp. 2, 12, 16 · U.S. General Accounting Office', from: 10},
};

/**
 * S5 p6–p7 — Line three: servis tesisi (C-10, C-31, C-42; GAO s.15 / PDF 19, kaynak doğrudan okundu 2026-10-10).
 * - Başlık rakamı = işletme maliyeti: "Operation of this facility has cost Maritime an average of about $1,162,000 annually
 *   during the first 3 years of commercial operation."
 * - $3.3M ayrı rakam: "The Government's investment at the facility as of December 1969 totaled about $3.3 million." → ayrı kutu.
 * - Maddeler GAO s.15 ifadeleri (ledger C-31 kısaltmasında "portal vinç/yakıt havuzu" deniyordu; şema kaynağın kendi
 *   ayrımını izler: 75-ton gantry crane ayrı varlık; bridge crane + spent-fuel pit bakım binasının içinde).
 * - GAO yerleşim vermez → vaziyet planı çizilmez; alan kareleri yalnız 1½ ve 25 akre değerleriyle orantılı.
 */
export const p3Facility: ComponentSchematicProps = {
  headline: 'About $1,162,000 a year',
  headlineDetail: 'Average cost to Maritime of operating the nuclear servicing facility, first 3 commercial years',
  section: 'Nuclear servicing facility · Galveston, Texas · built and operated by Todd',
  tag: 'Schematic · components listed by GAO · layout not shown',
  groups: [
    {
      title: 'Site',
      items: ['Pier and platform area to berth the vessel', 'Office space for the technical staff'],
      areas: [
        {label: 'About 1½ acres of land', value: 1.5},
        {label: 'About 25 acres adjacent: exclusion zone', value: 25},
      ],
      from: 40,
    },
    {
      title: 'Equipment',
      items: [
        '75-ton gantry crane',
        'Servicing barge: the Atomic Servant',
        'Maintenance building: 75-ton bridge crane, water-filled spent-fuel pit',
        'Also: decontamination room, workshop, refueling gear',
      ],
      from: 110,
    },
    {
      title: 'Provided by Maritime',
      items: ['A spare reactor core', 'Supplies and spare parts'],
      from: 180,
    },
  ],
  separateFigure: {
    title: 'Separate figure: about $3.3 million',
    detail: "The Government's investment at the facility, as of December 1969",
    from: 240,
  },
  label: {text: 'GAO report B-136209 (1970), p. 15', detail: GAO, from: 10},
};

/**
 * S5 p6 — Galveston konum haritası. Tesis konumu: GAO s.15 "The nuclear servicing facility at Galveston, Texas".
 * Nokta şehir düzeyidir (Galveston ≈ 29.30° K, 94.80° B, genel coğrafi konum); tesisin şehir içindeki yeri gösterilmez.
 * Veri: Natural Earth admin-1 (kamu malı) → <video>\01_archive\maps\ (repo dışı; Founder onayıyla indirilir).
 */
export const p3GalvestonMap: LocatorMapProps = {
  geojson: 'maps/ne_50m_admin_1_states_provinces.geojson',
  // Admin-1 dosyası Meksika'yı içermez → kara katmanı olmadan Meksika deniz gibi görünür.
  baseGeojson: 'maps/ne_50m_land.geojson',
  bounds: [-108, 24, -86, 38],
  highlightNames: ['Texas'],
  regionLabel: {text: 'Texas', lon: -99.5, lat: 31.3},
  points: [{lon: -94.8, lat: 29.3, label: 'Galveston, Texas', detail: 'Nuclear servicing facility', from: 20}],
  tag: 'Location map · city level',
  label: {text: 'Map: Natural Earth (public domain)', detail: 'Location: GAO report B-136209 (1970), p. 15', from: 10},
};

/**
 * S5 p8–p9 — tesisin kullanımı, 1965–1968 (C-32; GAO s.15–16 / PDF 19–20, doğrudan okundu 2026-10-10):
 * - "began commercial operations ... in August 1965" (Digest s.1) — 20 Ağustos 1965 (s.1, C-01).
 * - 1. yıllık Coast Guard denetimi tesiste, 2 Haziran–1 Temmuz 1966.
 * - 2. ve 3. denetim Todd'un New York tersanelerinde, Nisan 1967 ve Mart 1968; tesisten eğitimli personel gidip destek verdi.
 * - "The vessel did not return to the servicing facility until August 1968, after an absence of 2 years."
 * - İlk yakıt yenileme Ağustos'ta başladı, Ekim 1968'de bitti; tesiste yapıldı.
 * Maliyet şeridi: $1,162,000 ilk 3 ticari yılın ORTALAMASI → takvim yılı başına damga yerine tek şerit;
 * GAO 3. yılın bitiş tarihini burada vermediği için şeridin sonu solarak çizilir (edit plan'daki "×3 damga" bu yüzden kullanılmadı).
 * Gün bilinmeyen tarihler ay ortasına çizilir.
 */
export const p3FacilityTimeline: TimelineProps = {
  title: 'Where the ship was inspected, 1966–1968',
  subtitle: "Annual inspections and the ship's return, as reported by GAO",
  range: [1965.4, 1969.0],
  lanes: ['At the Galveston facility', "In New York (Todd's shipyards)"],
  milestones: [{at: 1965 + 7 / 12 + 19 / 365, label: 'Commercial service begins, Aug 1965', from: 10}],
  band: {
    start: 1965 + 7 / 12 + 19 / 365,
    end: 1968.9,
    fadeEnd: 1968.15,
    label: 'Facility operating cost: average about $1,162,000 a year, first 3 commercial years',
    from: 30,
  },
  events: [
    {at: 1966 + 5 / 12 + 1 / 365, end: 1966.5, lane: 0, title: 'June 2 – July 1, 1966', detail: 'Annual inspection at the facility', from: 60},
    {at: ym(1967, 4), lane: 1, title: 'April 1967', detail: 'Annual inspection; facility staff traveled to assist', from: 110, align: 'right'},
    {at: ym(1968, 3), lane: 1, title: 'March 1968', detail: 'Annual inspection; facility staff traveled to assist', width: 380, from: 140},
    {at: ym(1968, 8), end: ym(1968, 10), lane: 0, title: 'August 1968', detail: 'Returns; first refueling, Aug–Oct 1968', from: 220, align: 'right'},
  ],
  spans: [{start: 1966.5, end: ym(1968, 8), lane: 0, label: 'Did not return for 2 years', from: 180}],
  label: {text: 'GAO report B-136209 (1970), pp. 15–16', detail: GAO, from: 10},
};

/**
 * S7 p1–p2 — "Not in this report" kapsam kartı. Yalnız GAO s.4 (PDF 8, doğrudan okundu 2026-10-10; Q-05, V-17):
 *   "Our review was directed primarily toward Maritime's contract administration practices for the SAVANNAH's commercial
 *    operation from August 1965 through August 1968. We also reviewed certain costs related to the nuclear characteristics
 *    of the vessel, such as those for shore staff and technical facilities. We did not review the effectiveness of the
 *    experimental commercial operation of the SAVANNAH."
 * s.4'te açıkça incelenmedi denen TEK konu "effectiveness". Edit plan'daki "fuel cost · fleet cost" maddeleri s.4'te yok
 * (yakıt: Özet s.1'de maliyet rakamlarından HARİÇ tutulur, C-16 — "incelenmedi" değil; filo maliyeti: GAO ifadesi değil)
 * → kartta kullanılmadı.
 */
export const p3NotInReport: ScopeCardProps = {
  title: 'What this report reviewed — and what it did not',
  subtitle: 'The scope, in the auditors’ own words',
  sections: [
    {
      heading: 'Reviewed',
      tone: 'neutral',
      items: [
        "Primarily: Maritime's contract administration for the commercial operation, August 1965 – August 1968",
        'Also: certain costs related to the ship’s nuclear characteristics, such as shore staff and technical facilities',
      ],
      from: 20,
    },
    {
      heading: 'Not reviewed',
      tone: 'accent',
      items: ['The effectiveness of the experimental commercial operation'],
      quote: 'We did not review the effectiveness of the experimental commercial operation of the SAVANNAH.',
      from: 110,
    },
  ],
  label: {text: 'GAO report B-136209 (1970), p. 4', detail: GAO, from: 10},
};

/**
 * S5 p2–p3 — Line one: eğitim (C-08, C-29; GAO s.13–14 / PDF 17–18, doğrudan okundu 2026-10-10; ledger E-13).
 * Reactor operator yolu GAO'da sıralı ("followed by") → oklu akış. Lisans: "had taken the AEC-administered reactor
 * operators' examination, and had received licenses from the AEC". 27/67: "Of the 67-man crew, 27 are required to have
 * at least some of this training." Diğer eğitim kolları (instrumentation, water chemistry, health physics) bu sahnede yok.
 */
export const p3TrainingFlow: FlowDiagramProps = {
  title: 'Line one: about $300,000 a year',
  subtitle: 'Nuclear crew training: the reactor operator path',
  connector: 'arrow',
  nodes: [
    {title: 'U.S. Merchant Marine Academy', detail: '4 to 5 months of academic training', from: 20},
    {title: 'Aboard ship', detail: '4 to 5 months of shipboard training', from: 55},
    {title: 'AEC examination', detail: "AEC-administered reactor operators' examination", from: 90},
    {title: 'AEC license', detail: 'Licensed reactor operator', from: 120, emphasis: true},
  ],
  ratio: {total: 67, highlighted: 27, label: '27 of the 67-man crew required at least some nuclear training', from: 160},
  facts: [{value: '88', text: 'officers and engineers licensed under the program by June 30, 1969', from: 220}],
  label: {text: 'GAO report B-136209 (1970), pp. 13–14', detail: GAO, from: 10},
};

/**
 * S5 p4–p5 — Line two: kara personeli (C-09, C-30; GAO s.14 / PDF 18; ledger E-13).
 * GAO işleri yalnız listeler, sıra vermez → ok yok (connector: 'none').
 */
export const p3PortFlow: FlowDiagramProps = {
  title: 'Line two: about $409,000 a year',
  subtitle: 'A specially trained nuclear shore staff of about 10',
  connector: 'none',
  // GAO'nun "more work and planning" cümlesi yalnız ilk üç işi kapsar; 4. iş ayrı cümle (counsel) → groupSpan: 3.
  groupLabel: 'More work and planning than for a conventional ship',
  groupSpan: 3,
  nodes: [
    {title: 'Port surveys', from: 30},
    {title: 'Entry and departure arrangements', detail: 'In foreign and domestic ports', from: 55},
    {title: 'Annual inspections', from: 80},
    {
      title: 'Legal counsel',
      detail: 'Foreign port entry arrangements, with Maritime, the AEC and the State Department',
      from: 105,
      emphasis: true,
    },
  ],
  facts: [
    {value: '~10', text: 'shore staff members: ship operation, safety, technical matters and port planning', from: 150},
    {value: 'Why', text: '“the first nuclear-powered merchant vessel … required close surveillance” to protect the crew and port communities', from: 190},
  ],
  label: {text: 'GAO report B-136209 (1970), p. 14', detail: GAO, from: 10},
};

/** S1 p6–p7 — teaser (edit plan): V-01 kesiti bulanık/kısmi, netleşmeden kesilir; "three specific lines" sorusu. Vurgu yok. */
export const p3V01Teaser: DocumentHighlightProps = {
  src: 'pages/page-06.png',
  pageSize: {width: 2400, height: 3084},
  camera: [{from: 0, duration: 120, region: {x: 231, y: 170, w: 1712, h: 401}}],
  // Teaser: rakamlar okunur hale gelmez (S5'te ilk kez net açılır).
  blur: {from: 16, to: 10, start: 0, end: 120},
  padding: 0.12,
};

// ── S4 — How the auditors counted (C-01, C-02, C-04, C-05, C-16; GAO Özet s.1 / PDF 5 ve s.12 / PDF 16, doğrudan okundu 2026-10-10)

/** S4 p1–p2: "The cost over revenues (net cost)…" — Özet s.1: "net cost of operating, servicing, and refueling". */
export const p3NetCost: EquationCardProps = {
  title: 'How the auditors counted',
  subtitle: 'Net cost: the cost over revenues',
  terms: [
    {text: 'Cost of operating, servicing and refueling the ship', from: 20},
    {text: 'Revenues', from: 60},
    {text: 'Net cost', from: 100, emphasis: true},
  ],
  operators: ['−', '='],
  label: {text: 'GAO report B-136209 (1970), p. 1', detail: GAO, from: 10},
};

/** S4 p3–p4: hariç tutulanlar (C-16). s.12: "excluding Maritime administrative expenses, depreciation of the SAVANNAH, and nuclear fuel costs". VO sırası; yakıt en son ve vurgulu (edit plan). */
export const p3NotIncluded: ScopeCardProps = {
  title: 'Not included in these cost figures',
  subtitle: 'As stated by the auditors',
  sections: [
    {
      heading: 'Excluded',
      tone: 'accent',
      items: ['Depreciation of the ship', "Maritime's administrative expenses", 'Nuclear fuel costs'],
      quote: 'excluding Maritime administrative expenses, depreciation of the SAVANNAH, and nuclear fuel costs',
      from: 20,
    },
  ],
  label: {text: 'GAO report B-136209 (1970), pp. 1, 12', detail: GAO, from: 10},
};

/** S4 p5: C-02 — "For the first 3 years of its commercial operation … an average of about $2.9 million a year" (s.12). */
export const p3NetCostBar: BarChartProps = {
  mode: 'grouped',
  title: 'Average net cost per year',
  subtitle: 'First 3 commercial years',
  items: [{label: 'N.S. Savannah: net cost (cost over revenues)', value: 2.9, valueLabel: 'about $2.9 million', from: 20, emphasis: true}],
  max: 3.6,
  label: {text: 'GAO report B-136209 (1970), pp. 1, 12', detail: GAO, from: 10},
};

/** S4 p6: C-05 — s.12 dipnot 1. Sübvansiyon tutarı yazılmaz (kaynakta yok). */
export const p3Subsidy: EquationCardProps = {
  title: 'What an operating subsidy is',
  subtitle: 'Paid by Maritime because American-flag ships cost more to operate',
  terms: [
    {text: 'American-flag cost', from: 20},
    {text: 'Foreign-flag cost', from: 50},
    {text: 'Operating subsidy', from: 80, emphasis: true},
  ],
  operators: ['−', '='],
  footnote: {
    text: 'For (1) wages, (2) subsistence, (3) maintenance and repairs, (4) hull and machinery insurance and (5) protection and indemnity insurance, to operators agreeing to a stipulated number of sailings on specified trade routes.',
    from: 120,
  },
  label: {text: 'GAO report B-136209 (1970), p. 12, footnote 1', detail: GAO, from: 10},
};

/**
 * S4 p7–p10: C-04 / Q-01 — "about $2 million more a year than the average operating subsidy paid for comparable
 * conventional-fuel ships operated on the same trade route." Sübvansiyon tutarı yazılmaz (edit plan; kaynakta yok).
 * "A comparison, not a loss" = VO ifadesi; D-REJ-3 ile uyumlu.
 */
export const p3TwoMillionMore: EquationCardProps = {
  title: 'The comparison',
  subtitle: 'Comparable conventional-fuel ships on the same trade route',
  terms: [
    {value: 'about $2.9 million a year', text: "The Savannah's net cost, first 3 commercial years", from: 20},
    {text: 'Average operating subsidy for comparable conventional-fuel ships on the same trade route', from: 60},
    {value: 'about $2 million more a year', text: "The Savannah's additional cost", from: 110, emphasis: true},
  ],
  operators: ['−', '='],
  note: {text: 'A comparison, not a loss', from: 170},
  label: {text: 'GAO report B-136209 (1970), pp. 1, 12', detail: GAO, from: 10},
};

// ── S6 belge vurguları

/** S6 p1 — V-12, s.12 (PDF 16): "The entire cost of these special programs and facilities must be borne by the SAVANNAH as a 'one ship system.'" (E-14) */
export const p3V12OneShip: DocumentHighlightProps = {
  src: 'pages/page-16.png',
  pageSize: {width: 2400, height: 3080},
  camera: [{from: 15, duration: 70, region: {x: 200, y: 1180, w: 1750, h: 330}}],
  highlights: [
    {region: {x: 1000, y: 1255, w: 890, h: 57}, from: 95, duration: 18},
    {region: {x: 240, y: 1312, w: 1630, h: 58}, from: 113, duration: 28},
    {region: {x: 240, y: 1371, w: 690, h: 58}, from: 141, duration: 16},
  ],
  dimOthers: 0.25,
  label: {text: 'GAO report B-136209 (1970), p. 12', detail: GAO, from: 25},
};

/** S6 p4 — Q-02, Özet s.2 (PDF 6): "…as long as one vessel must absorb the full cost." "(See p. 16.)" vurgulanmaz. */
export const p3Q02FullCost: DocumentHighlightProps = {
  src: 'pages/page-06.png',
  pageSize: {width: 2400, height: 3084},
  camera: [{from: 15, duration: 70, region: {x: 180, y: 1100, w: 1760, h: 250}}],
  highlights: [
    {region: {x: 212, y: 1150, w: 1665, h: 50}, from: 95, duration: 26},
    {region: {x: 212, y: 1200, w: 1685, h: 50}, from: 121, duration: 26},
    {region: {x: 212, y: 1250, w: 970, h: 50}, from: 147, duration: 18},
  ],
  // Kadrajda üstteki "could easily service 10 nuclear vessels" satırı da görünüyor (gerçek sayfa, vurgulanmaz).
  // D-018: 10 sayısı görsel anlatımda öne çıkmaz → odak penceresi yalnız Q-02 cümlesini açık bırakır.
  dimOthers: 0.25,
  focus: {region: {x: 180, y: 1128, w: 1760, h: 196}, strength: 1, from: 20},
  label: {text: 'GAO report B-136209 (1970), p. 2', detail: GAO, from: 25},
};

// ── S1 / S2 / S3 / S8 (GAO kapak, s.3, s.4, s.5, s.6 — sayfa görüntülerinden doğrudan okundu 2026-10-10; NPS atıflı satırlar ledger S4)

/** S1 p2 — C-14, C-44: "made 19 voyages, sailing about 240,000 miles … from U.S. Atlantic ports, included 10 trips to the
 * Mediterranean, seven to northern Europe, and two to the Far East" (s.6). Bölge düzeyi; rota çizilmez (kaynakta yok). */
export const p3VoyageMap: LocatorMapProps = {
  geojson: 'maps/ne_50m_land.geojson',
  bounds: [-100, -5, 150, 70],
  points: [
    {lon: -75, lat: 39, label: 'U.S. Atlantic ports', detail: 'Where the trade routes began', from: 20},
    {lon: 15, lat: 38, label: 'Mediterranean', detail: '10 trips', from: 50},
    {lon: 6, lat: 54, label: 'Northern Europe', detail: '7 trips', from: 80},
    {lon: 128, lat: 33, label: 'Far East', detail: '2 trips', from: 110, align: 'left'},
  ],
  zoomTo: 1,
  title: '19 voyages, about 240,000 miles',
  subtitle: 'First 3 commercial years',
  tag: 'Destinations by region · routes not shown',
  label: {text: 'Map: Natural Earth (public domain)', detail: 'Voyages: GAO report B-136209 (1970), p. 6', from: 10},
};

/** S1 p2 — Q-06 / C-36: operatörlerin ifadesi, NPS aktarımı (birincil belgesi okunmadı → atıf şart). */
export const p3QuoteReliable: QuoteCardProps = {
  quote: 'the most reliable ship we have operating',
  attribution: "Her operators, as quoted in a National Park Service history",
  label: {text: 'National Park Service, National Historic Landmark nomination', detail: 'N.S. Savannah', from: 10},
};

/** S1 p3 — V-03: kapak, "JUNE 26, 1970" damgası (E-2: rapor tarihi kapak damgasıdır). */
export const p3V03Cover: DocumentHighlightProps = {
  src: 'pages/page-01.png',
  pageSize: {width: 2400, height: 3061},
  camera: [{from: 40, duration: 80, region: {x: 1450, y: 2560, w: 760, h: 260}}],
  highlights: [{region: {x: 1610, y: 2665, w: 490, h: 80}, from: 125, duration: 20, style: 'outline'}],
  label: {text: 'GAO report B-136209, cover', detail: GAO, from: 20},
};

/** S2 p1–p2 — V-18 / C-18, C-39: s.4 "Completed in 1962 … prototype vessel …" cümlesi. */
export const p3V18Prototype: DocumentHighlightProps = {
  src: 'pages/page-08.png',
  pageSize: {width: 2400, height: 3082},
  camera: [{from: 15, duration: 75, region: {x: 250, y: 2120, w: 1800, h: 500}}],
  highlights: [
    {region: {x: 430, y: 2190, w: 1330, h: 55}, from: 95, duration: 18},
    {region: {x: 290, y: 2246, w: 1645, h: 55}, from: 113, duration: 20},
    {region: {x: 290, y: 2301, w: 1645, h: 55}, from: 133, duration: 20},
    {region: {x: 290, y: 2357, w: 1645, h: 55}, from: 153, duration: 20},
    {region: {x: 290, y: 2412, w: 1645, h: 55}, from: 173, duration: 20},
    {region: {x: 290, y: 2468, w: 1530, h: 55}, from: 193, duration: 18},
  ],
  dimOthers: 0.25,
  label: {text: 'GAO report B-136209 (1970), p. 4', detail: GAO, from: 25},
};

/** S2 p3 — C-19 (s.5). Yerleşim/profil çizilmez (kaynakta yok); kullanılan/kullanılmayan alanlar kaynağın ifadesiyle. */
export const p3PassengerCargo: ScopeCardProps = {
  title: 'A combination passenger-cargo ship',
  subtitle: 'What was used in commercial service, and what was not',
  sections: [
    {heading: 'Used: cargo', tone: 'neutral', items: ['Seven cargo holds', 'Room for 8,498 tons of freight'], from: 20},
    {
      heading: 'Not used: passenger facilities',
      tone: 'accent',
      items: ['30 staterooms for 60 passengers', 'Dining room, lounge and lobby, veranda, swimming pool'],
      quote: 'because the cost of operating the facilities would be greater than the revenue received from passenger service',
      from: 80,
    },
  ],
  label: {text: 'GAO report B-136209 (1970), p. 5', detail: GAO, from: 10},
};

/** S2 p4 — C-20, C-38: s.5–6 (bareboat charter, $1/yıl, Todd sözleşmesi); yakıt ücretsiz = NPS (atıflı). Ok yok (ilişki, sıra değil). */
export const p3Contracts: FlowDiagramProps = {
  title: 'From August 1965: a commercial operator',
  subtitle: 'How the government-owned ship was run',
  connector: 'none',
  nodes: [
    {title: 'Maritime Administration', detail: 'Administers the contracts for the government-owned ship', from: 20},
    {title: 'First Atomic Ship Transport (FAST)', detail: 'Subsidiary of American Export Isbrandtsen Lines; "bareboat" charter', from: 50, emphasis: true},
    {title: 'Todd Shipyards', detail: 'Long-term cost-plus-fixed-fee contract for servicing the vessel', from: 80},
  ],
  facts: [
    {value: '$1', text: 'charter hire per year, paid by FAST (GAO)', from: 120},
    {value: 'Fuel', text: 'provided free of charge, according to the National Park Service', from: 160},
  ],
  label: {text: 'GAO report B-136209 (1970), pp. 5–6 · NPS history', detail: GAO, from: 10},
};

/** S3 p1 — C-34 (NPS, atıflı), terim "fuel elements" (E-8, C-43). Hangi 4 elemanın değiştiği bilinmiyor → konum ima edilmez. */
export const p3FuelElements: UnitGridProps = {
  title: '1968 refueling',
  subtitle: 'The reactor core: 32 fuel elements',
  total: 32,
  highlighted: 4,
  columns: 8,
  caption: 'Only 4 of the 32 original fuel elements needed replacing, according to the National Park Service',
  tag: 'Illustration · positions not shown',
  label: {text: 'National Park Service, National Historic Landmark nomination', detail: 'N.S. Savannah', from: 10},
};

/** S3 p2–p3 — "worked" tanımı (script v2 "Worked" tanımı; C-14, C-36). Finansal soru ayrı (Q-05 ile tutarlı). */
export const p3WorkedMeans: ScopeCardProps = {
  title: 'What “worked” means here',
  sections: [
    {
      heading: 'She worked',
      tone: 'neutral',
      items: ['Sailed regular commercial cargo routes', 'The people running her found her reliable'],
      from: 20,
    },
    {
      heading: 'A separate question',
      tone: 'accent',
      items: ['Did running her make financial sense?', 'The report shows, line by line, what she cost'],
      from: 90,
    },
  ],
  label: {text: 'GAO report B-136209 (1970) · NPS history', detail: GAO, from: 10},
};

/** S8 p1 — V-14 / C-23: Özet s.3 "lay up the vessel as proposed in the President's fiscal year 1971 budget". */
export const p3V14LayUp: DocumentHighlightProps = {
  src: 'pages/page-07.png',
  pageSize: {width: 2400, height: 3085},
  camera: [{from: 15, duration: 75, region: {x: 300, y: 2220, w: 1850, h: 360}}],
  highlights: [
    {region: {x: 466, y: 2335, w: 1632, h: 48}, from: 95, duration: 24},
    {region: {x: 466, y: 2383, w: 1650, h: 50}, from: 119, duration: 24},
    {region: {x: 466, y: 2433, w: 1280, h: 50}, from: 143, duration: 18},
  ],
  dimOthers: 0.25,
  label: {text: 'GAO report B-136209 (1970), p. 3', detail: GAO, from: 25},
};

/** S8 p1–p2 — 1962–1971 zaman şeridi: C-39, C-14 (s.4–5), C-20, rapor tarihi (kapak, E-2), C-23 (s.3), C-24 (NPS, atıflı). */
export const p3Strip: TimelineProps = {
  title: 'N.S. Savannah, 1962–1971',
  range: [1961.8, 1972.3],
  lanes: ['The ship', 'The report'],
  events: [
    {at: ym(1962, 3), lane: 0, title: 'March 1962', detail: 'Demonstration phase begins', from: 20},
    {at: ym(1965, 8), lane: 0, title: 'August 1965', detail: 'Chartered to FAST; commercial service', from: 60, width: 330},
    {at: 1971.85, lane: 0, title: 'Late 1971', detail: 'Deactivated (National Park Service)', from: 160, align: 'right'},
    {at: 1970 + 5 / 12 + 25 / 365, lane: 1, title: 'June 26, 1970', detail: 'GAO report to Congress; FY1971 budget proposed laying the ship up', from: 110, align: 'right', width: 460},
  ],
  spans: [{start: ym(1962, 3), end: ym(1965, 8), lane: 0, label: 'Demonstration phase', from: 40}],
  label: {text: 'GAO report B-136209 (1970) · NPS history', detail: GAO, from: 10},
};

// ── Kart ritmi için belge araları (ChatGPT önizleme notu 6, 2026-10-10; Production Autonomy Mode)

/** S2 p3 — V-18 s.5 (PDF 9): "The passenger facilities have not been utilized … greater than the revenue received from passenger service." */
export const p3V18bUnused: DocumentHighlightProps = {
  src: 'pages/page-09.png',
  pageSize: {width: 2400, height: 3091},
  camera: [{from: 0, duration: 45, region: {x: 420, y: 700, w: 1720, h: 290}}],
  highlights: [
    {region: {x: 459, y: 736, w: 1623, h: 57}, from: 20, duration: 18},
    {region: {x: 459, y: 793, w: 1646, h: 57}, from: 38, duration: 18},
    {region: {x: 459, y: 850, w: 1646, h: 57}, from: 56, duration: 18},
    {region: {x: 459, y: 907, w: 1341, h: 57}, from: 74, duration: 14},
  ],
  dimOthers: 0.25,
  label: {text: 'GAO report B-136209 (1970), p. 5', detail: GAO, from: 10},
};

/** S3 p3 — rapor kapağı, tam sayfa, yavaş yaklaşma ("line by line, what she cost" köprüsü). Vurgu yok. */
export const p3V03CoverPage: DocumentHighlightProps = {
  src: 'pages/page-01.png',
  pageSize: {width: 2400, height: 3061},
  camera: [{from: 0, duration: 130, region: {x: 300, y: 500, w: 1800, h: 1400}}],
  label: {text: 'GAO report B-136209, cover', detail: GAO, from: 5},
};

/** S7 p1 — V-17 s.4 (PDF 8): "We did not review the effectiveness of the experimental commercial operation of the SAVANNAH." (Q-05) */
export const p3V17NotReviewed: DocumentHighlightProps = {
  src: 'pages/page-08.png',
  pageSize: {width: 2400, height: 3082},
  camera: [{from: 0, duration: 50, region: {x: 250, y: 900, w: 1800, h: 330}}],
  highlights: [
    {region: {x: 1030, y: 1017, w: 888, h: 55}, from: 25, duration: 16},
    {region: {x: 293, y: 1072, w: 1594, h: 55}, from: 41, duration: 22},
    {region: {x: 293, y: 1128, w: 262, h: 55}, from: 63, duration: 8},
  ],
  dimOthers: 0.25,
  label: {text: 'GAO report B-136209 (1970), p. 4', detail: GAO, from: 10},
};

/** S7 p2 — kapsam kartının kısa sürümü (momentum): belge alıntısı bir önceki sahnede (V-17) gösterildiği için kartta tekrar yok. */
export const p3NotInReportShort: ScopeCardProps = {
  title: 'What this report reviewed — and what it did not',
  sections: [
    {
      heading: 'Reviewed',
      tone: 'neutral',
      items: ["Maritime's contract administration, Aug 1965 – Aug 1968", 'Certain nuclear-related costs (shore staff, technical facilities)'],
      from: 5,
    },
    {heading: 'Not reviewed', tone: 'accent', items: ['The effectiveness of the experimental commercial operation'], from: 25},
  ],
  label: {text: 'GAO report B-136209 (1970), p. 4', detail: GAO, from: 5},
};

/**
 * Bağımsız kaynak etiketi (şeffaf; Premiere'de fotoğraf üstüne): V-05.
 * Ledger: daha kısıtlayıcı koşul uygulanır → atıf "Photo: AEC / National Archives"; fotoğraf 1962 (gösterim dönemi).
 */
export const p3LabelV05: SourceLabelProps = {
  text: 'Photo: AEC / National Archives',
  detail: 'N.S. Savannah, 1962 · NAID 542141',
  from: 8,
};
