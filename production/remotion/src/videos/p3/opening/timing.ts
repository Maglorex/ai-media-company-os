import {Easing, interpolate} from 'remotion';
import {VO_DURATION, VO_WORDS} from './voWordsV2';

// P3 opening prototype v2 (D-030, P3-production-handoff-prototype-v2.md).
// Zaman ekseni: video saniyesi. VO tek segment; iki bilinçli sessizlik kurguda boşluk olarak eklenir (handoff §0/§3 V12, V16).
export const FPS = 30;
/** Siyahtan açılış: VO bu kadar sonra başlar. */
export const LEAD = 0.6;
/** "...didn't come back." ile "For her 1967..." arası (VO 58,143 → 58,491 sessiz) — V12 durgun kare. */
export const GAP1_AT = 58.3;
export const GAP1 = 1.2;
/** "There was only one." ile "So why..." arası (VO 72,098 → 72,655 sessiz) — mini payoff nefesi. */
export const GAP2_AT = 72.4;
export const GAP2 = 0.5;
/** Son kelimeden sonra tutma + siyaha geçiş. */
export const TAIL = 2.4;

/** VO saniyesi → video saniyesi. */
export const vt = (v: number) => v + LEAD + (v >= GAP1_AT ? GAP1 : 0) + (v >= GAP2_AT ? GAP2 : 0);
/** i. kelimenin başladığı video saniyesi. */
export const c = (i: number) => vt(VO_WORDS[i][1]);
/** i. kelimenin bittiği video saniyesi. */
export const ce = (i: number) => vt(VO_WORDS[i][2]);

export const TOTAL_S = vt(VO_DURATION) + TAIL;
export const TOTAL_FRAMES = Math.ceil(TOTAL_S * FPS);

/** Ses parçaları: [kaynak başlangıç sn, kaynak bitiş sn, video başlangıç sn]. Kesimler yalnız ölçülmüş sessizliklerde. */
export const AUDIO_PARTS: [number, number | null, number][] = [
  [0, GAP1_AT, LEAD],
  [GAP1_AT, GAP2_AT, vt(GAP1_AT)],
  [GAP2_AT, null, vt(GAP2_AT)],
];

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = Easing.inOut(Easing.cubic);

/** 0→1 geçişi [a, b] aralığında (yumuşak). */
export const ramp = (t: number, a: number, b: number, e = ease) => (b > a ? interpolate(t, [a, b], [0, 1], {...clamp, easing: e}) : t >= a ? 1 : 0);
/** Görünürlük penceresi: a'da belirir, b'de kaybolur. */
export const win = (t: number, a: number, b: number, fade = 0.35) => Math.min(ramp(t, a, a + fade), 1 - ramp(t, b, b + fade));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** Parçalı anahtar kareler (her parça yumuşatılmış). */
export const kf = (t: number, pts: [number, number][]) => {
  if (t <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (t <= pts[i][0]) return lerp(pts[i - 1][1], pts[i][1], ramp(t, pts[i - 1][0], pts[i][0]));
  }
  return pts[pts.length - 1][1];
};
