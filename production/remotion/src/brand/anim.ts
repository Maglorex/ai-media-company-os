import {Easing, interpolate} from 'remotion';

// Brand motion helpers: frame-based, no bounce/elastic (video-ui-spec-v1.md §1).
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = Easing.inOut(Easing.cubic);
export const easeOut = Easing.out(Easing.cubic);

/** 0→1 between frames a and b. */
export const ramp = (f: number, a: number, b: number, e = ease) => (b > a ? interpolate(f, [a, b], [0, 1], {...clamp, easing: e}) : f >= a ? 1 : 0);
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** rgba() from a #RRGGBB token. */
export const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};
