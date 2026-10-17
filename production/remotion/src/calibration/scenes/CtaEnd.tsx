import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {alpha, color, EngineeringBg, k, mix, Mono, polyPath, SourceMark, useT} from '../common';
import {COMPONENTS, COSTS, file, HULL, LINE, PX_PER_K, Pt, sec, TEAL} from '../data';
import {BERTH, FacilitySheet, G3_END} from './Facility';
import {EngineRegistration} from './Intro';
import {BLOCK_H, blockW} from './G2b';
import {bbox} from '../common';

// SP-08 — C1 CTA (L1, calibration copy) over SP-05's held sheet; SP-09 — E1 payoff → NEXT CASE (L2, optional L3).

export const C1_DUR = sec(10);
export const C1: React.FC = () => {
  const t = useT();
  const line = k(t, 0.3, 0.8) * (1 - k(t, 9.3, 9.7));
  const tag = k(t, 0.8, 1.2) * (1 - k(t, 8.9, 9.3));
  return (
    <AbsoluteFill style={{background: color.ink}}>
      <EngineeringBg />
      <FacilitySheet {...G3_END} />
      {/* one small tag on a short Case Line in the lower safe area; no button, bell, cursor or popup */}
      <div style={{position: 'absolute', left: 96, top: 978, width: 380 * line, height: 2, background: color.paper}} />
      <div style={{position: 'absolute', left: 96, top: 940, width: 600, height: 36, overflow: 'hidden'}}>
        <div style={{transform: `translateY(${(1 - tag) * 40}px)`}}>
          <Mono size={24}>NEXT CASE · SUBSCRIBE</Mono>
        </div>
      </div>
      <Sequence from={sec(0.6)}>
        <Audio src={staticFile(file.ai03)} startFrom={sec(LINE.L1[0])} endAt={sec(LINE.L1[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- E1
export const E1_DUR = sec(23);
const L2_AT = 8.5;
const L3_AT = 20.2;
const hb = bbox(HULL);
const marker = (cx: number, cy: number, len: number): Pt[] => {
  const s = len / (hb.x1 - hb.x0);
  return HULL.map(([x, y]) => [cx + (x - (hb.x0 + hb.x1) / 2) * s, cy + (y - (hb.y0 + hb.y1) / 2) * s]);
};
const GAP_W = 2000 * PX_PER_K; // C-04: about $2 million a year, same scale as the blocks
const GAP_X0 = 960 - GAP_W / 2;
const GAP_Y = 900;

export const E1: React.FC = () => {
  const t = useT();
  const sheetUp = k(t, 3.2, 4.2);
  const schema = k(t, L2_AT + 1.2, L2_AT + 3.4);
  const exit = k(t, 13.6, 15.0);
  const lift = k(t, 13.9, 15.0);
  const sheetO = 1 - schema;
  const sheetT = `translateY(${-120 * sheetUp}px) scale(${mix(1, 0.86, sheetUp)})`;
  // the Savannah returns to the berth (C-32: August 1968, refuelling Aug–Oct 1968)
  const into = k(t, 1.4, 3.0);
  const berthY = mix(BERTH.cy, 540 + (BERTH.cy - 540) * 0.86 - 120, sheetUp);
  const mk = marker(mix(2100, BERTH.cx, into), mix(berthY, berthY, into), 420 * mix(1, 0.86, sheetUp));
  // schema: one object with the system around it
  const ring = COMPONENTS.map((_, i) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return [960 + Math.cos(a) * 330, 470 + Math.sin(a) * 250] as Pt;
  });
  const mkSchema = marker(960, 470, mix(420 * 0.86, 300, schema));
  const mkPts: Pt[] = mk.map((p, i) => [mix(p[0], mkSchema[i][0], schema), mix(p[1], mkSchema[i][1], schema) - lift * 260]);
  const gapO = k(t, 3.8, 4.4) * (1 - schema);
  let acc = 0;
  const lineX = mix(960, 1920, exit);
  const reg = t - 15.0;
  const settle = k(t, 19.6, 21.0);
  return (
    <AbsoluteFill style={{background: color.ink}}>
      <EngineeringBg />
      <AbsoluteFill style={{opacity: sheetO * (1 - exit), transform: sheetT}}>
        <FacilitySheet {...G3_END} cost={0} berthDash={1} />
        <div style={{position: 'absolute', left: BERTH.cx + BERTH.w / 2 + 30, top: 742, opacity: k(t, 1.0, 1.5)}}>
          <Mono size={26}>AUG 1968</Mono>
        </div>
      </AbsoluteFill>

      {/* SP-02's gap returns at its real width (about $2 million a year); the three blocks fill about $1.9 million */}
      <AbsoluteFill style={{opacity: gapO}}>
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
          <path d={`M${GAP_X0} ${GAP_Y + 30} L${GAP_X0} ${GAP_Y - 30} M${GAP_X0} ${GAP_Y} L${GAP_X0 + GAP_W} ${GAP_Y} M${GAP_X0 + GAP_W} ${GAP_Y + 30} L${GAP_X0 + GAP_W} ${GAP_Y - 30}`} stroke={color.paper} strokeWidth={2} fill="none" />
        </svg>
        <div style={{position: 'absolute', left: GAP_X0, top: GAP_Y - 70}}>
          <Mono size={22} c={alpha(color.paper, 0.85)}>about $2 million a year · GAO</Mono>
        </div>
        {COSTS.map((c, i) => {
          const x = GAP_X0 + acc;
          acc += blockW(i);
          const f = k(t, 4.4 + i * 0.6, 5.2 + i * 0.6);
          return <div key={c.label} style={{position: 'absolute', left: mix(x - 700, x, f), top: GAP_Y + 6, width: blockW(i), height: BLOCK_H, background: alpha(color.steel, 0.95), border: `1px solid ${color.iron}`, boxSizing: 'border-box', opacity: f}} />;
        })}
        <div style={{position: 'absolute', left: GAP_X0, top: GAP_Y + 60, opacity: k(t, 6.4, 7.0)}}>
          <Mono size={22} c={alpha(color.paper, 0.85)}>about $1.9 million · GAO</Mono>
        </div>
      </AbsoluteFill>

      {/* schema: spokes from the one ship to its system */}
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: schema * (1 - exit)}}>
        {ring.map((p, i) => (
          <g key={i}>
            <line x1={960} y1={470} x2={p[0]} y2={p[1]} stroke={alpha(color.iron, 0.9)} strokeWidth={1.5} />
            <circle cx={p[0]} cy={p[1]} r={9} fill="none" stroke={color.paper} strokeWidth={2} />
          </g>
        ))}
      </svg>
      {ring.map((p, i) => (
        <div key={i} style={{position: 'absolute', left: p[0] - 200, width: 400, top: p[1] + (i === 0 ? -48 : 18), textAlign: 'center', opacity: schema * (1 - exit)}}>
          <Mono size={19} track="0.06em" c={alpha(color.paper, 0.85)} style={{display: 'inline-block'}}>
            {COMPONENTS[i]}
          </Mono>
        </div>
      ))}
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={polyPath(mkPts)} fill={alpha(TEAL, 0.3)} stroke={TEAL} strokeWidth={2} opacity={k(t, 1.3, 1.6) * (1 - lift)} />
      </svg>
      {/* the Case Line leaves the schema and registers the next case (demo payload) */}
      {exit > 0 && reg < 0 ? <div style={{position: 'absolute', left: 960, top: 539, width: lineX - 960, height: 2, background: color.paper}} /> : null}
      {reg >= 0 ? (
        <AbsoluteFill style={{transform: `translate(${-330 * settle}px, ${-200 * settle}px) scale(${mix(1, 0.62, settle)})`, transformOrigin: '50% 50%'}}>
          <EngineRegistration t={reg} entry="line" lineFrom={[960, 1920]} />
        </AbsoluteFill>
      ) : null}
      {/* end-screen-aware layout: empty areas framed by Case-Line corners; no fake buttons */}
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: k(t, 20.4, 21.2)}}>
        {[
          [1180, 150, 620, 349],
          [1180, 590, 620, 349],
        ].map(([x, y, w, h], i) => (
          <path key={i} d={`M${x} ${y + 40} L${x} ${y} L${x + 40} ${y} M${x + w - 40} ${y} L${x + w} ${y} L${x + w} ${y + 40} M${x + w} ${y + h - 40} L${x + w} ${y + h} L${x + w - 40} ${y + h} M${x + 40} ${y + h} L${x} ${y + h} L${x} ${y + h - 40}`} stroke={color.paper} strokeWidth={2} fill="none" />
        ))}
      </svg>
      <SourceMark text="GAO B-136209 · 1970" opacity={gapO} />
      <Sequence from={sec(L2_AT)}>
        <Audio src={staticFile(file.ai03)} startFrom={sec(LINE.L2[0])} endAt={sec(LINE.L2[1])} />
      </Sequence>
      <Sequence from={sec(L3_AT)}>
        <Audio src={staticFile(file.ai03)} startFrom={sec(LINE.L3[0])} endAt={sec(LINE.L3[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};
