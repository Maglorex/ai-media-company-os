import React from 'react';
import {BarChart} from '../../templates/BarChart';
import {ComponentSchematic} from '../../templates/ComponentSchematic';
import {DocumentHighlight, DocumentHighlightProps} from '../../templates/DocumentHighlight';
import {EquationCard} from '../../templates/EquationCard';
import {FlowDiagram} from '../../templates/FlowDiagram';
import {LoadShare} from '../../templates/LoadShare';
import {LocatorMap} from '../../templates/LocatorMap';
import {QuoteCard} from '../../templates/QuoteCard';
import {ScopeCard} from '../../templates/ScopeCard';
import {Timeline} from '../../templates/Timeline';
import {UnitGrid} from '../../templates/UnitGrid';
import {P3FinalFrame} from './FinalFrame';
import * as s from './shots';
import {at, beatFrames, BeatId} from './voCues';

// P3 kurgu sürümleri: süre = VO beat'i (sonraki beat başlangıcına kadar), grafik içi anlar = VO kelime zamanları.
// Zamanlar voCues.ts'ten gelir (otomatik; vo-cues.ps1). Segment yeniden üretilirse yalnız voCues yeniden üretilir.
// Kompozisyon adı: SYNC-<beat>-<görsel>; Premiere'de beat başlangıcına yerleştirilir (P3-edit-timeline.md).

type Synced = {id: string; beat: BeatId; component: React.FC<any>; durationInFrames: number; props?: object};
const clip = (beat: BeatId, name: string, component: React.FC<any>, props?: object, durationInFrames = beatFrames(beat)): Synced => ({
  id: `SYNC-${beat}-${name}`,
  beat,
  component,
  durationInFrames,
  props,
});

/** Kısa gecikme: ifade söylenmeye başlarken öğe zaten belirmiş olsun diye ~0,2 sn önce. */
const lead = (f: number) => Math.max(0, f - 6);

const v01End: DocumentHighlightProps = {
  ...s.p3V01,
  camera: [{from: 0, duration: 1, region: {x: 231, y: 170, w: 1712, h: 401}}],
  blur: undefined,
  highlights: (s.p3V01.highlights ?? []).map((h) => ({...h, from: 0, duration: 1})),
  label: {...s.p3V01.label!, from: 0},
};

// S6: tek gemi klibi b22 başından b24 sonuna kadar sürer; b23'te (Q-02 belgesi) üst izde belge görünür,
// b24 başında animasyon tek gemiye döner.
const loneTotal = beatFrames('b22') + beatFrames('b23') + beatFrames('b24');
const loneReturn = beatFrames('b22') + beatFrames('b23');

// Şablon hissini kırmak (ChatGPT önizleme notu 5): kart tipi kliplerde giriş hareketi sırayla fade / rise.
const RISE = new Set(['b07', 'b10', 'b12', 'b17', 'b25b', 'b14']);
const withMotion = (c: Synced): Synced => (RISE.has(c.beat) && c.props ? {...c, props: {...c.props, motion: 'rise'}} : c);

const clips: Synced[] = [
  // S1
  clip('b02', 'VoyageMap', LocatorMap, {
    ...s.p3VoyageMap,
    points: [
      {...s.p3VoyageMap.points[0], from: 15},
      {...s.p3VoyageMap.points[1], from: lead(at('voy_med', 'b02'))},
      {...s.p3VoyageMap.points[2], from: lead(at('voy_neu', 'b02'))},
      {...s.p3VoyageMap.points[3], from: lead(at('voy_far', 'b02'))},
    ],
  }),
  clip('b02q', 'QuoteReliable', QuoteCard, s.p3QuoteReliable),
  clip('b03', 'Cover', DocumentHighlight, s.p3V03Cover),
  clip('b04', 'DigestP1', DocumentHighlight, s.p3V02),
  clip('b05', 'V01Teaser', DocumentHighlight, {...s.p3V01Teaser, camera: [{from: 0, duration: beatFrames('b05'), region: {x: 231, y: 170, w: 1712, h: 401}}], blur: {from: 16, to: 10, start: 0, end: beatFrames('b05')}}),
  // S2
  clip('b06b', 'Prototype', DocumentHighlight, s.p3V18Prototype),
  clip('b07', 'PassengerCargo', ScopeCard, {
    ...s.p3PassengerCargo,
    // Alıntı kartta yok: hemen ardından (b07b) belgenin kendisi gösterilir.
    sections: [s.p3PassengerCargo.sections[0], {...s.p3PassengerCargo.sections[1], quote: undefined, from: lead(at('pass_staterooms', 'b07'))}],
  }),
  clip('b07b', 'Unused', DocumentHighlight, s.p3V18bUnused),
  clip('b08b', 'Contracts', FlowDiagram, {
    ...s.p3Contracts,
    nodes: s.p3Contracts.nodes.map((n, i) => ({...n, from: 10 + i * 15})),
    facts: [{...s.p3Contracts.facts![0], from: 20}, {...s.p3Contracts.facts![1], from: lead(at('fuel_free', 'b08b'))}],
  }),
  // S3
  clip('b09', 'FuelElements', UnitGrid, {...s.p3FuelElements, highlightFrom: lead(at('fuel_four', 'b09'))}),
  clip('b10', 'WorkedMeans', ScopeCard, {
    ...s.p3WorkedMeans,
    sections: [s.p3WorkedMeans.sections[0], {...s.p3WorkedMeans.sections[1], from: lead(at('worked_separate', 'b10'))}],
  }),
  clip('b10b', 'CoverPage', DocumentHighlight, s.p3V03CoverPage),
  // S4
  clip('b11', 'NetCost', EquationCard, {
    ...s.p3NetCost,
    terms: [
      {...s.p3NetCost.terms[0], from: 20},
      {...s.p3NetCost.terms[1], from: lead(at('net_minus', 'b11'))},
      {...s.p3NetCost.terms[2], from: at('net_minus', 'b11') + 45},
    ],
  }),
  clip('b12', 'NotIncluded', ScopeCard, s.p3NotIncluded),
  clip('b13', 'NetCostBar', BarChart, s.p3NetCostBar),
  clip('b14', 'Subsidy', EquationCard, (() => {
    const c = at('subsidy_paid', 'b14');
    return {
      ...s.p3Subsidy,
      terms: [
        {...s.p3Subsidy.terms[0], from: Math.max(15, c - 60)},
        {...s.p3Subsidy.terms[1], from: Math.max(30, c - 30)},
        {...s.p3Subsidy.terms[2], from: lead(c)},
      ],
      footnote: {...s.p3Subsidy.footnote!, from: c + 45},
    };
  })()),
  clip('b15', 'TwoMillionMore', EquationCard, {
    ...s.p3TwoMillionMore,
    terms: [
      {...s.p3TwoMillionMore.terms[0], from: 20},
      {...s.p3TwoMillionMore.terms[1], from: 50},
      {...s.p3TwoMillionMore.terms[2], from: lead(at('two_quote', 'b15'))},
    ],
    note: {...s.p3TwoMillionMore.note!, from: lead(at('two_notloss', 'b15'))},
  }),
  // S5
  clip('b16', 'ThreeLines', DocumentHighlight, (() => {
    const c = at('lines_19', 'b16');
    const hs = s.p3V01.highlights ?? [];
    return {...s.p3V01, highlights: hs.map((h, i) => ({...h, from: c + [0, 30, 55, 80][i]}))};
  })()),
  clip('b17', 'TrainingFlow', FlowDiagram, {
    ...s.p3TrainingFlow,
    ratio: {...s.p3TrainingFlow.ratio!, from: lead(at('tr_67', 'b17'))},
    nodes: [
      {...s.p3TrainingFlow.nodes[0], from: lead(at('tr_class', 'b17'))},
      {...s.p3TrainingFlow.nodes[1], from: lead(at('tr_ship', 'b17'))},
      {...s.p3TrainingFlow.nodes[2], from: lead(at('tr_exam', 'b17'))},
      {...s.p3TrainingFlow.nodes[3], from: at('tr_exam', 'b17') + 45},
    ],
    facts: [{...s.p3TrainingFlow.facts![0], from: lead(at('tr_88', 'b17'))}],
  }),
  clip('b18', 'PortFlow', FlowDiagram, (() => {
    const v = at('port_visit', 'b18');
    return {
      ...s.p3PortFlow,
      facts: [{...s.p3PortFlow.facts![0], from: lead(at('port_ten', 'b18'))}, {...s.p3PortFlow.facts![1], from: at('port_ten', 'b18') + 90}],
      nodes: [
        {...s.p3PortFlow.nodes[0], from: lead(v)},
        {...s.p3PortFlow.nodes[1], from: v + 25},
        {...s.p3PortFlow.nodes[2], from: v + 50},
        {...s.p3PortFlow.nodes[3], from: lead(at('port_foreign', 'b18'))},
      ],
    };
  })()),
  clip('b19', 'GalvestonMap', LocatorMap, s.p3GalvestonMap),
  clip('b19b', 'Facility', ComponentSchematic, (() => {
    const inside = at('fac_inside', 'b19b');
    return {
      ...s.p3Facility,
      groups: [
        {...s.p3Facility.groups[0], from: 20},
        {...s.p3Facility.groups[1], from: lead(inside)},
        {...s.p3Facility.groups[2], from: inside + 150},
      ],
      separateFigure: {...s.p3Facility.separateFigure!, from: lead(at('fac_invest', 'b19b'))},
    };
  })()),
  clip('b20', 'FacilityTimeline', Timeline, (() => {
    const ny = at('tl_inspections', 'b20');
    const ev = s.p3FacilityTimeline.events;
    return {
      ...s.p3FacilityTimeline,
      events: [{...ev[0], from: 40}, {...ev[1], from: lead(ny)}, {...ev[2], from: ny + 30}, {...ev[3], from: ny + 120}],
      spans: [{...s.p3FacilityTimeline.spans![0], from: ny + 70}],
      band: {...s.p3FacilityTimeline.band!, from: lead(at('tl_paid', 'b20'))},
    };
  })()),
  // S6
  clip('b21', 'OneShipSystem', DocumentHighlight, s.p3V12OneShip),
  clip('b22', 'LoneShip', LoadShare, {
    ...s.p3LoneShip,
    spreadFrom: lead(at('lone_several', 'b22')),
    returnFrom: loneReturn,
    captions: [
      s.p3LoneShip.captions[0],
      {...s.p3LoneShip.captions[1], from: lead(at('lone_several', 'b22'))},
      {...s.p3LoneShip.captions[2], from: loneReturn},
    ],
  }, loneTotal),
  clip('b23', 'Q02FullCost', DocumentHighlight, s.p3Q02FullCost),
  // S7
  // Kapsam: önce belge (V-17), sonra kısa kart (momentum; ChatGPT önizleme notu 6).
  clip('b25', 'NotReviewed', DocumentHighlight, {...s.p3V17NotReviewed, highlights: (s.p3V17NotReviewed.highlights ?? []).map((h, i) => ({...h, from: lead(at('nr_plainly', 'b25')) + [0, 16, 38][i]}))}),
  clip('b25b', 'NotInReportShort', ScopeCard, s.p3NotInReportShort),
  clip('b26', 'CrewBar', BarChart, s.p3CrewBar),
  clip('b26b', 'V01End', DocumentHighlight, v01End),
  // S8
  clip('b27', 'LayUp', DocumentHighlight, s.p3V14LayUp),
  clip('b27b', 'Strip', Timeline, {
    ...s.p3Strip,
    events: s.p3Strip.events.map((e, i) => (i === 2 ? {...e, from: lead(at('strip_deact', 'b27b'))} : e)),
  }),
  clip('b29', 'FinalFrame', P3FinalFrame),
];
export const syncedClips: Synced[] = clips.map(withMotion);

/** Açılış teaser'ı (VO öncesi): gemi + bulanık üç maliyet satırı; thumbnail vaadiyle aynı kare (ChatGPT önizleme notu 4). */
export const PREROLL_S = 2.5;
export const prerollClip = {id: 'SYNC-b00-Teaser', component: P3FinalFrame, durationInFrames: Math.round(PREROLL_S * 30), props: {teaser: true}};
