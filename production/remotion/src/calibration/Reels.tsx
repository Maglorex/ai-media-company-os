import React from 'react';
import {AbsoluteFill, Audio, Sequence, Series, staticFile} from 'remotion';
import {useBrandFonts} from '../brand/fonts';
import {CreditCard, Slate} from './common';
import {Bed, bedFile, bedTitle, file, FPS, sec, SHEET} from './data';
import {G1, G1_DUR} from './scenes/G1';
import {G2a, G2A_DUR} from './scenes/G2a';
import {IntroA, IntroB, INTRO_A_DUR, INTRO_B_DUR} from './scenes/Intro';
import {G2b, G2B_DUR} from './scenes/G2b';
import {G3, G3_DUR, G4, G4_DUR} from './scenes/Facility';
import {C1, C1_DUR, E1, E1_DUR} from './scenes/CtaEnd';
import {AR1, AR1_DUR, AR2, AR2_DUR, AR3, AR3_DUR, AR4, AR4_DUR, AR5, AR5_DUR} from './scenes/Anti';

// Founder preview package (calibration/05 §6 + scene plan v4 music plan). Sound grammar: narration leads,
// restrained bed, two reserved silences (after SP-02's question, after SP-06's "in New York."), textures only with meaning.
// Music is compared, not chosen: within a golden/anti pair both sides use the same bed from the same offset.

type Tex = 'S1' | 'S2' | null;
/** Bed level relative to narration (bed files are level-matched to −23 LUFS; VO ≈ −24 LUFS). */
const BED = 0.2;
const BED_OFFSET = 8; // seconds into every track (same rule for all four candidates)
/** Texture gains: S-1 and S-2 matched to ≈ −32 LUFS each (measured: −20.7 / −23.4 LUFS). */
const TEX_GAIN = {S1: 0.27, S2: 0.37};
const texFile = (x: 'S1' | 'S2') => (x === 'S1' ? file.og08 : file.og09);

type Sfx = {at: number; src: string; from?: number; to?: number; vol: number};
type Seg = {
  key: string;
  C: React.FC;
  dur: number;
  skip?: number; // seconds trimmed from the scene start
  bed?: Bed | null;
  bedContinue?: boolean; // continue the previous segment's bed position (reels)
  bedShape?: (t: number, d: number) => number; // multiplier on BED
  sfx?: Sfx[];
  sources?: string[];
};

const SRC = {
  v05: 'Photo: AEC / National Archives (NARA 542141, 1962)',
  gao: 'GAO B-136209 (1970)',
  ne: 'Natural Earth (public domain)',
  v90: 'Photo: NASA (GRC-1951-C-28738)',
  marad: 'Photos: MARAD (launch; fuel element)',
  v19: 'Photo: Nationaal Archief (CC0, 1964)',
  ai: 'Narration: AI voice (ElevenLabs)',
};

const fadeInOut = (t: number, d: number, a = 0.8, b = 0.6) => Math.min(1, t / a, Math.max(0, (d - t) / b));
const flat = (t: number, d: number) => fadeInOut(t, d);
const shapes = {
  G2a: (t: number, d: number) => fadeInOut(t, d, 0.8, 0.01) * (t < 12.3 ? 1 : Math.max(0, 1 - (t - 12.3) / 0.8)),
  intro: (t: number) => Math.min(t / 0.8, 1) * (t < 6.4 ? 1.7 : 1.7 - 0.7 * Math.min(1, (t - 6.4) / 0.6)),
  AR2: (t: number, d: number) => fadeInOut(t, d) * (t < 12.3 ? 1 : t < 15.0 ? Math.max(0, 1 - (t - 12.3) / 0.8) : Math.min(1, (t - 15.0) / 0.8)),
  G4: (t: number) => (t < 3 ? 1 : t < 10.6 ? 0.6 : Math.max(0, 0.6 - (t - 10.6) / 0.6 * 0.6)),
  standaloneIntro: (t: number, d: number) => 1.7 * fadeInOut(t, d, 0.4, 0.6),
  E1: (t: number, d: number) => fadeInOut(t, d, 0.8, 1.5) * (t > 15 ? 1.3 : 1),
};

const sceneSfx = {
  G1: [{at: 2.0, src: file.og10, from: SHEET.reveal[0], to: SHEET.reveal[1], vol: 0.6}],
  G2a: [{at: 7.45, src: file.og10, from: SHEET.reveal[0], to: SHEET.reveal[1], vol: 0.5}],
  G2b: [3.6, 5.0, 7.3].map((at) => ({at, src: file.og10, from: SHEET.tick[0], to: SHEET.tick[1], vol: 0.3})),
  G3: [{at: 4.45, src: file.og10, from: SHEET.plate[0], to: SHEET.plate[1], vol: 0.7}],
  G4: [{at: 10.8, src: file.og10, from: SHEET.room[0], to: SHEET.room[1], vol: 1.0}],
};
const tex = (x: Tex, at: number): Sfx[] => (x ? [{at, src: texFile(x), vol: TEX_GAIN[x]}] : []);

// ---------------------------------------------------------------- segment factories
const S = {
  G1: (bed: Bed, cont = false): Seg => ({key: 'G1', C: G1, dur: G1_DUR, bed, bedContinue: cont, bedShape: flat, sfx: sceneSfx.G1, sources: [SRC.v05, SRC.gao, SRC.ne, SRC.ai]}),
  G2a: (bed: Bed, cont = true): Seg => ({key: 'G2a', C: G2a, dur: G2A_DUR, bed, bedContinue: cont, bedShape: shapes.G2a, sfx: sceneSfx.G2a, sources: [SRC.gao, SRC.ai]}),
  IA: (bed: Bed, x: Tex, cont = true, standalone = false): Seg => ({key: `IA${x}`, C: IntroA, dur: INTRO_A_DUR, bed, bedContinue: cont, bedShape: standalone ? shapes.standaloneIntro : shapes.intro, sfx: tex(x, x === 'S1' ? 3.15 : 2.35), sources: [SRC.v05, SRC.gao]}),
  IB: (bed: Bed, x: Tex): Seg => ({key: `IB${x}`, C: IntroB, dur: INTRO_B_DUR, bed, bedShape: shapes.standaloneIntro, sfx: tex(x, x === 'S1' ? 4.55 : 2.45), sources: [SRC.v90]}),
  G2b: (bed: Bed, cont = true): Seg => ({key: 'G2b', C: G2b, dur: G2B_DUR, bed, bedContinue: cont, bedShape: flat, sfx: sceneSfx.G2b, sources: [SRC.gao, SRC.ai]}),
  G3: (bed: Bed, cont = true): Seg => ({key: 'G3', C: G3, dur: G3_DUR, bed, bedContinue: cont, bedShape: flat, sfx: sceneSfx.G3, sources: [SRC.gao, SRC.ne, SRC.ai]}),
  G4: (bed: Bed, cont = true): Seg => ({key: 'G4', C: G4, dur: G4_DUR, bed, bedContinue: cont, bedShape: shapes.G4, sfx: sceneSfx.G4, sources: [SRC.gao, SRC.ne, SRC.ai]}),
  slate: (title: string, sub?: string): Seg => ({key: `slate-${title}`, C: () => <Slate title={title} sub={sub} />, dur: sec(2.2), bed: null}),
};

const Credit = (segs: Seg[], allBeds?: Bed[]): Seg => {
  const src = [...new Set(segs.flatMap((s) => s.sources ?? []))];
  const beds = (allBeds ?? [...new Set(segs.map((s) => s.bed).filter(Boolean) as Bed[])]).map((b) => `${bedTitle[b]} (YouTube Audio Library)`);
  const text = [...src, ...(beds.length ? [`Music: ${beds.join(' · ')}`] : []), 'Sound textures: own · Calibration review copy — internal, not for publication'].join(' · ');
  return {key: 'credit', C: () => <CreditCard text={text} />, dur: sec(3), bed: null};
};

// ---------------------------------------------------------------- reel renderer
const Reel: React.FC<{segs: Seg[]; bedOverride?: Bed}> = ({segs, bedOverride}) => {
  useBrandFonts();
  let at = 0;
  let bedPos = 0;
  const audio: React.ReactNode[] = [];
  segs.forEach((s, i) => {
    const bed = s.bed ? (bedOverride ?? s.bed) : null;
    if (!s.bedContinue) bedPos = 0;
    if (bed) {
      const shape = s.bedShape ?? flat;
      const startFrom = sec(BED_OFFSET) + bedPos;
      audio.push(
        <Sequence key={`bed${i}`} from={at} durationInFrames={s.dur}>
          <Audio src={staticFile(bedFile(bed))} startFrom={startFrom} volume={(f) => BED * Math.max(0, shape(f / FPS, s.dur / FPS))} />
        </Sequence>,
      );
    }
    bedPos += s.dur;
    (s.sfx ?? []).forEach((x, j) => {
      const fx = at + sec(x.at) - sec(s.skip ?? 0);
      if (fx < at) return;
      audio.push(
        <Sequence key={`sfx${i}-${j}`} from={fx}>
          <Audio src={staticFile(x.src)} startFrom={x.from !== undefined ? sec(x.from) : undefined} endAt={x.to !== undefined ? sec(x.to) : undefined} volume={x.vol} />
        </Sequence>,
      );
    });
    at += s.dur;
  });
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Series>
        {segs.map((s, i) => (
          <Series.Sequence key={i} durationInFrames={s.dur}>
            <Sequence from={-sec(s.skip ?? 0)}>
              <s.C />
            </Sequence>
          </Series.Sequence>
        ))}
      </Series>
      {audio}
    </AbsoluteFill>
  );
};

const total = (segs: Seg[]) => segs.reduce((a, s) => a + s.dur, 0);

// ---------------------------------------------------------------- the preview files
const reelA = (bed: Bed): Seg[] => {
  const s = [S.G1(bed), S.G2a(bed), S.IA(bed, null), S.G2b(bed)];
  return [...s, Credit(s)];
};
const reelB = (): Seg[] => {
  const s = [S.G2b('M02', false), S.G3('M02'), S.G4('M02')];
  return [...s, Credit(s)];
};
const introRecognition = (): Seg[] => {
  const s = [S.slate('CASE INTRO · TEXTURE S-1'), S.IA('M03', 'S1', false, true), S.IB('M03', 'S1'), S.slate('CASE INTRO · TEXTURE S-2'), S.IA('M03', 'S2', false, true), S.IB('M03', 'S2')];
  return [...s, Credit(s)];
};
const introTextures = (): Seg[] => {
  const s = [S.slate('S-1', 'mechanical / paper'), S.IA('M03', 'S1', false, true), S.slate('S-2', 'tonal / air'), S.IA('M03', 'S2', false, true)];
  return [...s, Credit(s)];
};
const anti = (key: string, C: React.FC, dur: number, bed: Bed | null, sources: string[], sfx?: Sfx[]): Seg => ({key, C, dur, bed, bedShape: flat, sources, sfx});
const pairs = (): Seg[] => {
  const s = [
    S.slate('AR1 · ANTI-REFERENCE', 'pair with G1 · same narration'),
    anti('AR1', AR1, AR1_DUR, 'M03', [SRC.v05, SRC.marad, SRC.ai]),
    S.slate('G1 · GOLDEN CANDIDATE'),
    S.G1('M03'),
    S.slate('AR2 · ANTI-REFERENCE', 'pair with G2 + G2b · same narration'),
    {...anti('AR2', AR2, AR2_DUR, 'M04', [SRC.gao, SRC.ai]), bedShape: shapes.AR2},
    S.slate('G2 + G2b · GOLDEN CANDIDATE'),
    S.G2a('M04', false),
    S.G2b('M04', true),
    S.slate('AR3 · ANTI-REFERENCE', 'pair with G3 · same narration'),
    anti('AR3', AR3, AR3_DUR, 'M01', [SRC.gao, SRC.marad, SRC.ai]),
    S.slate('G3 · GOLDEN CANDIDATE'),
    S.G3('M01', false),
    S.slate('AR4 · ANTI-REFERENCE', 'pair with G4 · same narration'),
    {...anti('AR4', AR4, AR4_DUR, 'M02', [SRC.v05, SRC.v19, SRC.marad, SRC.ai], sceneSfx.G4), bedShape: shapes.G4},
    S.slate('G4 · GOLDEN CANDIDATE'),
    S.G4('M02', false),
  ];
  return [...s, Credit(s)];
};
const antiIntro = (): Seg[] => {
  const s = [anti('AR5', AR5, AR5_DUR, null, [])];
  return [...s, Credit(s)];
};
const ctaFinal = (): Seg[] => {
  const s: Seg[] = [
    {...S.G3('M04', false), key: 'G3tail', dur: sec(5), skip: 13},
    {key: 'C1', C: C1, dur: C1_DUR, bed: 'M04', bedContinue: true, bedShape: () => 1, sources: [SRC.gao, SRC.ai]},
    {...S.G4('M04'), key: 'G4head', dur: sec(5), bedShape: () => 1},
    S.slate('E1 · NEXT CASE · TEXTURE S-1', 'demo payload'),
    {key: 'E1S1', C: E1, dur: E1_DUR, bed: 'M04', bedShape: shapes.E1, sfx: tex('S1', 17.9), sources: [SRC.gao, SRC.v90, SRC.ai]},
    S.slate('E1 · NEXT CASE · TEXTURE S-2', 'demo payload'),
    {key: 'E1S2', C: E1, dur: E1_DUR, bed: 'M04', bedShape: shapes.E1, sfx: tex('S2', 15.85), sources: [SRC.gao, SRC.v90, SRC.ai]},
  ];
  return [...s, Credit(s)];
};

export const REVIEWS: {id: string; segs: Seg[]; bedOverride?: Bed}[] = [
  {id: 'REVIEW-01-ReelA', segs: reelA('M01')},
  {id: 'REVIEW-02-ReelB', segs: reelB()},
  {id: 'REVIEW-03-IntroRecognition', segs: introRecognition()},
  {id: 'REVIEW-04-IntroTextures', segs: introTextures()},
  {id: 'REVIEW-05-Pairs', segs: pairs()},
  {id: 'REVIEW-06-AntiIntroCta', segs: antiIntro()},
  {id: 'REVIEW-07-CtaFinal', segs: ctaFinal()},
  // 09: Reel A picture rendered once (credit lists all four candidates); four audio mixes identical except the bed
  {id: 'REVIEW-09-ReelA-picture', segs: [...reelA('M01').slice(0, -1), Credit(reelA('M01').slice(0, -1), ['M01', 'M02', 'M03', 'M04'])]},
  ...(['M01', 'M02', 'M03', 'M04'] as Bed[]).map((b) => ({id: `REVIEW-09-ReelA-audio-${b}`, segs: reelA(b), bedOverride: b})),
];

export const reviewComponent = (segs: Seg[], bedOverride?: Bed) => {
  const C: React.FC = () => <Reel segs={segs} bedOverride={bedOverride} />;
  return C;
};
export const reviewDuration = total;
