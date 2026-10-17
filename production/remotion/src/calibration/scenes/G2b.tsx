import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {alpha, color, DeskBg, k, mix, Mono, Plate, SourceMark, toScreen, useT} from '../common';
import {COSTS, file, P06, PAGE, PX_PER_K, sec, VO} from '../data';
import {firstUnderline, G2B_CAM} from './Intro';
import {GapBracket} from './G2a';

// SP-04 — G2b "Three lines on a page". VO-C (AI-01 29.00–38.55) starts at 0.4 s.
export const G2B_DUR = sec(11.5);
const VO_AT = 0.4;
const at = (s: number) => s - VO.C[0] + VO_AT;

/** Block slots (shared with SP-05 / SP-09): same px-per-$ scale; third block visibly larger than 1 + 2. */
export const BLOCK_H = 44;
export const blockW = (i: number) => COSTS[i].k * PX_PER_K;
export const SLOTS = [
  {x: 1060, y: 660},
  {x: 1060 + COSTS[0].k * PX_PER_K, y: 660},
  {x: 1060, y: 800},
];
export const BASE_LINE_Y = SLOTS[2].y + BLOCK_H;
export const SMALL_GAP = {x0: 180, x1: 700, y: 690};

export const Block: React.FC<{x: number; y: number; w: number; h?: number; o?: number; label?: string; labelPos?: 'above' | 'below'; labelO?: number}> = ({x, y, w, h = BLOCK_H, o = 1, label, labelPos = 'above', labelO = 1}) => (
  <>
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, background: alpha(color.steel, 0.95), border: `1px solid ${color.iron}`, opacity: o, boxSizing: 'border-box'}} />
    {label ? (
      <div style={{position: 'absolute', left: x, top: labelPos === 'above' ? y - 34 : y + h + 10, opacity: o * labelO}}>
        <Mono size={21} c={alpha(color.paper, 0.9)} track="0.08em">
          {label}
        </Mono>
      </div>
    ) : null}
  </>
);

export const G2b: React.FC = () => {
  const t = useT();
  const ul = firstUnderline();
  const starts = [at(32.21), at(33.59), at(35.9)];
  const active = starts.reduce((a, s, i) => (t >= s ? i : a), -1);
  const restDim = k(t, 1.0, 2.2) * 0.95;
  const extend = k(t, 9.7, 11.0);
  const outro = k(t, 9.9, 11.0);

  const line = (i: number) => {
    const l = P06.lines[i];
    const a = toScreen(G2B_CAM, [l.x0, l.y0]);
    const b = toScreen(G2B_CAM, [l.x1, l.y1]);
    return {x0: a[0], y0: a[1], x1: b[0], y1: b[1]};
  };

  return (
    <AbsoluteFill style={{background: color.ink}}>
      <DeskBg />
      <AbsoluteFill style={{opacity: 1 - outro * 0.75}}>
        <Plate src={file.p06} w={PAGE.w} h={PAGE.h} cam={G2B_CAM} imgStyle={{boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}} />
        {/* the rest of the page recedes; the three cost lines stay */}
        <div style={{position: 'absolute', left: 0, top: toScreen(G2B_CAM, [0, 575])[1], width: 1920, height: 1080, background: color.ink, opacity: restDim}} />
      </AbsoluteFill>

      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: 1 - outro}}>
        {[0, 1, 2].map((i) => {
          const r = line(i);
          const d = k(t, starts[i], starts[i] + 0.5);
          const x = r.x0 - 14;
          return <path key={i} d={`M${x + 10} ${r.y0 - 4} L${x} ${r.y0 - 4} L${x} ${r.y1 + 4} L${x + 10} ${r.y1 + 4}`} fill="none" stroke={color.steel} strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - d} />;
        })}
        {[0, 1, 2].map((i) => {
          const r = line(i);
          const on = active === i ? k(t, starts[i], starts[i] + 0.35) : 0;
          return <line key={`u${i}`} x1={r.x0} x2={mix(r.x0, r.x1, on)} y1={r.y1 + 5} y2={r.y1 + 5} stroke={color.accentBrand} strokeWidth={2.5} opacity={on} />;
        })}
      </svg>
      {/* the Case Line from the intro: the first underline, until the evidence takes over */}
      <div style={{position: 'absolute', left: ul.x0, top: ul.y - 1, width: ul.x1 - ul.x0, height: 2, background: color.ink, opacity: 1 - k(t, starts[0], starts[0] + 0.4)}} />

      {/* the still-open gap from SP-02, unscaled */}
      <AbsoluteFill style={{opacity: k(t, at(31.05), at(31.8)) * (1 - outro)}}>
        <GapBracket draw={1} labels={0.8} x0={SMALL_GAP.x0} x1={SMALL_GAP.x1} y={SMALL_GAP.y} />
      </AbsoluteFill>

      {COSTS.map((c, i) => {
        const r = line(i);
        const g = k(t, starts[i] + 0.2, starts[i] + 1.1);
        const grow = i === 2 ? mix(0.25, 1, k(t, at(36.6), at(37.6))) : 1;
        const w = blockW(i) * grow;
        const x = mix(r.x1 + 10, SLOTS[i].x, g);
        const y = mix(r.y1 - BLOCK_H / 2, SLOTS[i].y, g);
        return t >= starts[i] ? <Block key={i} x={x} y={y} w={w} h={mix(4, BLOCK_H, g)} o={1 - (i < 2 ? outro : 0)} label={c.label} labelPos={i === 1 ? 'below' : 'above'} labelO={k(t, starts[i] + 0.8, starts[i] + 1.2) * (1 - outro)} /> : null;
      })}
      {/* its underline runs to the right edge: the base line of SP-05 */}
      <div style={{position: 'absolute', left: SLOTS[2].x, top: BASE_LINE_Y - 1, width: mix(blockW(2), 1920 - SLOTS[2].x, extend), height: 2, background: color.paper, opacity: extend > 0 ? 1 : 0}} />

      <SourceMark text="GAO · Summary p.2" opacity={k(t, 1.0, 1.6) * (1 - outro)} />
      <Sequence from={sec(VO_AT)}>
        <Audio src={staticFile(file.ai01)} startFrom={sec(VO.C[0])} endAt={sec(VO.C[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};
