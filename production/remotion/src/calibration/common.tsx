import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {alpha, ease, lerp, ramp} from '../brand/anim';
import {color, font, weight} from '../brand/tokens';
import {FPS, H, Pt, W} from './data';

// Shared calibration primitives. Archive pixels are never repainted: images are only placed, cropped, masked and moved.

/** Frame override for technical check sheets (frozen frames); null in normal renders. */
export const FrameOverride = React.createContext<number | null>(null);
export const useT = () => {
  const f = useCurrentFrame();
  const o = React.useContext(FrameOverride);
  return (o ?? f) / FPS;
};
/** 0→1 between seconds a and b. */
export const k = (t: number, a: number, b: number, e = ease) => ramp(t * FPS, a * FPS, b * FPS, e);
export const mix = lerp;

export type Cam = {cx: number; cy: number; z: number; rot?: number};
export const mixCam = (a: Cam, b: Cam, u: number): Cam => ({cx: lerp(a.cx, b.cx, u), cy: lerp(a.cy, b.cy, u), z: a.z * Math.pow(b.z / a.z, u), rot: lerp(a.rot ?? 0, b.rot ?? 0, u)});
export const camTransform = (c: Cam) => `translate(${W / 2}px, ${H / 2}px) rotate(${c.rot ?? 0}deg) scale(${c.z}) translate(${-c.cx}px, ${-c.cy}px)`;
export const toScreen = (c: Cam, [x, y]: Pt): Pt => {
  const r = ((c.rot ?? 0) * Math.PI) / 180;
  const dx = (x - c.cx) * c.z;
  const dy = (y - c.cy) * c.z;
  return [W / 2 + dx * Math.cos(r) - dy * Math.sin(r), H / 2 + dx * Math.sin(r) + dy * Math.cos(r)];
};
export const polyCss = (pts: Pt[]) => `polygon(${pts.map(([x, y]) => `${x}px ${y}px`).join(', ')})`;
export const polyPath = (pts: Pt[]) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L') + ' Z';
export const bbox = (pts: Pt[]) => {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  return {x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys)};
};
export const pathLength = (pts: Pt[]) => pts.reduce((s, p, i) => s + Math.hypot(p[0] - pts[(i + 1) % pts.length][0], p[1] - pts[(i + 1) % pts.length][1]), 0);

/** An image placed in camera space at its natural pixel size; optional clip polygon in image pixels. */
export const Plate: React.FC<{src: string; w: number; h: number; cam: Cam; clip?: Pt[]; style?: React.CSSProperties; imgStyle?: React.CSSProperties; children?: React.ReactNode}> = ({src, w, h, cam, clip, style, imgStyle, children}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: w, height: h, transformOrigin: '0 0', transform: camTransform(cam), ...style}}>
    <Img src={staticFile(src)} style={{position: 'absolute', left: 0, top: 0, width: w, height: h, clipPath: clip ? polyCss(clip) : undefined, ...imgStyle}} />
    {children}
  </div>
);

/** ENGINEERING world surface: ink → steel with a faint grid (worlds.ts). */
export const EngineeringBg: React.FC<{opacity?: number; grid?: number}> = ({opacity = 1, grid = 0.06}) => (
  <AbsoluteFill style={{opacity, background: `radial-gradient(ellipse at 50% 45%, ${color.steel} 0%, ${color.ink} 78%)`}}>
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(${alpha(color.iron, grid)} 1px, transparent 1px), linear-gradient(90deg, ${alpha(color.iron, grid)} 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }}
    />
  </AbsoluteFill>
);
/** Off-page industrial surface for the EVIDENCE world. */
export const DeskBg: React.FC = () => <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 40%, #1E2429 0%, ${color.ink} 80%)`}} />;

export const Mono: React.FC<{children: React.ReactNode; size?: number; c?: string; style?: React.CSSProperties; track?: string; w?: number}> = ({children, size = 22, c = color.paper, style, track = '0.16em', w = weight.medium}) => (
  <div style={{fontFamily: font.meta, fontSize: size, fontWeight: w, letterSpacing: track, textTransform: 'uppercase', color: c, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
export const Display: React.FC<{children: React.ReactNode; size?: number; c?: string; style?: React.CSSProperties}> = ({children, size = 96, c = color.paper, style}) => (
  <div style={{fontFamily: font.display, fontSize: size, fontWeight: weight.bold, letterSpacing: '0.04em', textTransform: 'uppercase', color: c, whiteSpace: 'nowrap', lineHeight: 1, ...style}}>{children}</div>
);

/** Small source mark (lower-left by default). */
export const SourceMark: React.FC<{text: string; opacity?: number; x?: number; y?: number}> = ({text, opacity = 1, x = 96, y = 1080 - 96}) => (
  <div style={{position: 'absolute', left: x, top: y - 28, opacity, display: 'flex', alignItems: 'center', gap: 14}}>
    <div style={{width: 28, height: 1, background: color.iron}} />
    <Mono size={22} c={alpha(color.paper, 0.85)} track="0.12em" w={weight.regular}>
      {text}
    </Mono>
  </div>
);

/** Every anti-reference carries this tag for its whole duration (scene plan v4). */
export const AntiTag: React.FC = () => (
  <div style={{position: 'absolute', right: 40, top: 34, padding: '8px 14px', background: 'rgba(160,20,20,0.85)'}}>
    <Mono size={22} c="#FFFFFF" track="0.14em">
      ANTI-REFERENCE · INTERNAL
    </Mono>
  </div>
);

/** Review navigation slate (internal review copy only). */
export const Slate: React.FC<{title: string; sub?: string}> = ({title, sub}) => {
  const t = useT();
  const o = k(t, 0, 0.3) * (1 - k(t, 1.9, 2.2));
  return (
    <AbsoluteFill style={{background: color.ink, justifyContent: 'center', alignItems: 'center', opacity: o}}>
      <Mono size={34} c={color.paper}>
        {title}
      </Mono>
      {sub ? (
        <Mono size={24} c={color.iron} style={{marginTop: 18}}>
          {sub}
        </Mono>
      ) : null}
    </AbsoluteFill>
  );
};

/** One-line credit card at the end of every review file (attribution delivery, scene plan v4). */
export const CreditCard: React.FC<{text: string}> = ({text}) => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: color.ink, justifyContent: 'center', alignItems: 'center', opacity: k(t, 0, 0.4)}}>
      <div style={{fontFamily: font.meta, fontSize: 23, letterSpacing: '0.06em', color: alpha(color.paper, 0.9), maxWidth: 1700, textAlign: 'center', lineHeight: 1.6}}>{text}</div>
    </AbsoluteFill>
  );
};

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export {alpha, color, font, weight};
