import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {BrandMap, MapCam, project} from '../../brand/components/BrandMap';
import {alpha, color, EngineeringBg, k, mix, Mono, SourceMark, useT} from '../common';
import {COMPONENTS, file, PLACES, Pt, sec, VO} from '../data';
import {BASE_LINE_Y, Block, blockW, SLOTS} from './G2b';

// SP-05 — G3 "The system on the shore" (VO-D) and SP-06 — G4 "The ship that didn't come back" (VO-E).
// Component sheet in GAO's own terms (E-11); neutral row facing one empty berth; DIAGRAM · NOT TO SCALE · NOT A SITE PLAN.
// No relative positions, no layout, no geometry are implied (Blender deliberately not used: the ledger gives none).

export const G3_DUR = sec(18);
export const G4_DUR = sec(15.5);

export const PLATE = {x0: 120, y0: 230, x1: 1800, y1: 900};
const CELL_W = 304;
const CELL_GAP = 20;
const CELL_Y = 300;
const CELL_H = 290;
const cellX = (i: number) => PLATE.x0 + (PLATE.x1 - PLATE.x0 - (5 * CELL_W + 4 * CELL_GAP)) / 2 + i * (CELL_W + CELL_GAP);
export const BERTH = {cx: 960, cy: 760, w: 560, h: 92};
const berthPath = () => {
  const {cx, cy, w, h} = BERTH;
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  return `M${x0} ${cy - h / 2} L${x1 - 70} ${cy - h / 2} Q${x1} ${cy} ${x1 - 70} ${cy + h / 2} L${x0} ${cy + h / 2} Z`;
};

const S = color.paper;
const draw = (d: number) => ({pathLength: 1, strokeDasharray: '1', strokeDashoffset: 1 - d, opacity: d > 0 ? 1 : 0});

/** Line drawings, 300×200 local box each. */
const Drawing: React.FC<{i: number; d: number; sub: number[]}> = ({i, d, sub}) => {
  const p = {fill: 'none', stroke: S, strokeWidth: 2, strokeLinejoin: 'round' as const, ...draw(d)};
  const ps = (x: number) => ({fill: 'none', stroke: S, strokeWidth: 2, ...draw(x)});
  if (i === 0)
    return (
      <g>
        <path {...p} d="M40 112 L260 112 L260 128 L40 128 Z" />
        <path {...p} d="M60 128 L60 178 M100 128 L100 178 M140 128 L140 178 M180 128 L180 178 M220 128 L220 178 M250 128 L250 178" />
        <path {...p} d="M30 160 L270 160" strokeDasharray="6 8" style={{opacity: d}} pathLength={undefined} strokeDashoffset={0} />
      </g>
    );
  if (i === 1)
    return (
      <g>
        <path {...p} d="M60 54 L240 54 L240 66 L60 66 Z M84 66 L66 180 M112 66 L128 180 M216 66 L234 180 M188 66 L172 180 M40 180 L260 180" />
        <path {...p} d="M140 66 L160 66 L160 78 L140 78 Z M150 78 L150 122 M150 122 Q142 132 150 138 Q158 132 154 126" />
      </g>
    );
  if (i === 2)
    return (
      <g>
        <path {...p} d="M30 70 L150 40 L270 70 L270 182 L30 182 Z" />
        <path {...ps(sub[0])} d="M42 86 L258 86 M42 92 L258 92 M120 92 L120 100 L136 100 L136 92 M128 100 L128 124" />
        <path {...ps(sub[1])} d="M170 150 L250 150 L250 182 L170 182 Z M176 162 Q186 156 196 162 T216 162 T236 162 T246 160" />
      </g>
    );
  if (i === 3)
    return (
      <g>
        <path {...p} d="M30 128 L270 128 L246 168 L54 168 Z M180 128 L180 98 L236 98 L236 128 M196 98 L196 84 L220 84 L220 98" />
        <path {...p} d="M20 152 L280 152" strokeDasharray="6 8" style={{opacity: d}} pathLength={undefined} strokeDashoffset={0} />
      </g>
    );
  return (
    <g>
      <path {...p} d="M110 62 L110 170 M190 62 L190 170 M110 62 A40 12 0 0 1 190 62 A40 12 0 0 1 110 62 M110 170 A40 12 0 0 0 190 170" />
      <path {...p} d="M126 70 L126 176 M142 72 L142 180 M158 72 L158 180 M174 70 L174 176" />
    </g>
  );
};

const SUBLABELS = ['75-TON BRIDGE CRANE', 'SPENT-FUEL PIT'];

/** The whole sheet; `comp[i]` 0→1 draws component i; `sub` = maintenance-building inner items. */
export const FacilitySheet: React.FC<{plate: number; comp: number[]; sub: number[]; leaders: number; berth: number; berthDash?: number; notice: number; cost: number}> = ({plate, comp, sub, leaders, berth, berthDash = 0, notice, cost}) => (
  <AbsoluteFill>
    <div style={{position: 'absolute', left: PLATE.x0, top: PLATE.y0, width: PLATE.x1 - PLATE.x0, height: PLATE.y1 - PLATE.y0, background: alpha(color.steel, 0.35), border: `1px solid ${alpha(color.iron, 0.9)}`, opacity: plate, boxSizing: 'border-box'}} />
    <div style={{position: 'absolute', left: PLATE.x0 + 24, top: PLATE.y0 + 18, opacity: notice}}>
      <Mono size={21} c={alpha(color.paper, 0.75)} track="0.12em">
        DIAGRAM · NOT TO SCALE · NOT A SITE PLAN
      </Mono>
    </div>
    <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
      {COMPONENTS.map((_, i) => {
        const x = cellX(i);
        const bx = BERTH.cx + (i - 2) * 110;
        return (
          <g key={i}>
            <rect x={x} y={CELL_Y} width={CELL_W} height={CELL_H} fill="none" stroke={alpha(color.iron, 0.6)} strokeWidth={1} opacity={comp[i]} />
            <g transform={`translate(${x + 2} ${CELL_Y + 6})`}>
              <Drawing i={i} d={comp[i]} sub={sub} />
            </g>
            <line x1={x + CELL_W / 2} y1={CELL_Y + CELL_H} x2={mix(x + CELL_W / 2, bx, leaders)} y2={mix(CELL_Y + CELL_H, BERTH.cy - BERTH.h / 2 - 8, leaders)} stroke={alpha(color.iron, 0.8)} strokeWidth={1} opacity={comp[i] * (leaders > 0 ? 1 : 0)} />
          </g>
        );
      })}
      <path d={berthPath()} fill="none" stroke={berthDash > 0 ? color.paper : alpha(color.iron, 0.95)} strokeWidth={mix(1.5, 2.5, berthDash)} strokeDasharray={berthDash > 0 ? '14 10' : '6 8'} opacity={berth} />
    </svg>
    {COMPONENTS.map((c, i) => (
      <div key={c} style={{position: 'absolute', left: cellX(i), top: CELL_Y + 212, width: CELL_W, textAlign: 'center', opacity: comp[i]}}>
        <Mono size={21} track="0.06em" style={{whiteSpace: 'normal', lineHeight: 1.25}}>
          {c}
        </Mono>
        {i === 2 ? (
          <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 4}}>
            {SUBLABELS.map((s, j) => (
              <Mono key={s} size={17} c={alpha(color.paper, 0.75)} track="0.02em" style={{opacity: sub[j]}}>
                {s}
              </Mono>
            ))}
          </div>
        ) : null}
      </div>
    ))}
    <div style={{position: 'absolute', right: 1920 - PLATE.x1 + 26, top: PLATE.y1 - 74, opacity: cost, textAlign: 'right'}}>
      <Mono size={28} c={color.paper} track="0.06em">
        about $1.16 million a year
      </Mono>
      <Mono size={20} c={alpha(color.paper, 0.7)} track="0.12em" style={{marginTop: 6}}>
        GAO · p.15
      </Mono>
    </div>
  </AbsoluteFill>
);

// ---------------------------------------------------------------- SP-05 G3
const D_AT = 0.6;
const atD = (s: number) => s - VO.D[0] + D_AT;
const MAP0: MapCam = {lon: -93.6, lat: 30.6, z: 70};
const MAP1: MapCam = {lon: -94.8, lat: 29.3, z: 420};

export const G3State = (t: number) => ({
  plate: k(t, 4.1, 4.7),
  comp: [k(t, atD(42.75), atD(43.6)), k(t, atD(43.67), atD(44.6)), k(t, atD(43.8), atD(44.9)), k(t, atD(46.8), atD(47.9)), k(t, atD(49.45), atD(50.5))],
  sub: [k(t, atD(44.0), atD(44.9)), k(t, atD(44.95), atD(46.0))],
  leaders: k(t, atD(50.7), atD(51.4)),
  berth: k(t, 4.6, 5.2),
  notice: k(t, 4.7, 5.3),
  cost: k(t, atD(51.36), atD(52.0)),
});

export const G3: React.FC = () => {
  const t = useT();
  const desc = k(t, 1.0, 3.6);
  const cam: MapCam = {lon: mix(MAP0.lon, MAP1.lon, desc), lat: mix(MAP0.lat, MAP1.lat, desc), z: MAP0.z * Math.pow(MAP1.z / MAP0.z, desc)};
  const mapO = k(t, 0.2, 1.0) * (1 - k(t, 3.7, 4.3));
  const gal = project(cam, PLACES.galveston[0], PLACES.galveston[1]);
  const lineO = 1 - k(t, 0.1, 1.0);
  // the third cost block returns from SP-04 and lands as the ground plate
  const land = k(t, 3.9, 4.5);
  const st = G3State(t);
  return (
    <AbsoluteFill style={{background: color.ink}}>
      <EngineeringBg />
      <AbsoluteFill style={{opacity: mapO}}>
        <BrandMap cam={cam} land={file.land} states={file.admin1} />
        <div style={{position: 'absolute', left: gal.x - 7, top: gal.y - 7, width: 14, height: 14, borderRadius: 7, background: color.paper, opacity: k(t, 2.4, 2.9)}} />
        <div style={{position: 'absolute', left: gal.x + 22, top: gal.y - 14, opacity: k(t, 2.6, 3.1)}}>
          <Mono size={26}>GALVESTON</Mono>
        </div>
      </AbsoluteFill>
      {/* base line from SP-04 */}
      <div style={{position: 'absolute', left: SLOTS[2].x, top: BASE_LINE_Y - 1, width: 1920 - SLOTS[2].x, height: 2, background: color.paper, opacity: lineO}} />
      <Block x={SLOTS[2].x} y={SLOTS[2].y} w={blockW(2)} o={lineO} />
      {land > 0 && land < 1 ? <Block x={mix(700, PLATE.x0, land)} y={mix(-60, PLATE.y0, land)} w={mix(blockW(2), PLATE.x1 - PLATE.x0, land)} h={mix(44, PLATE.y1 - PLATE.y0, land)} /> : null}
      <FacilitySheet {...st} />
      <SourceMark text="GAO B-136209 · p.15" opacity={k(t, 5.0, 5.6)} />
      <Sequence from={sec(D_AT)}>
        <Audio src={staticFile(file.ai01)} startFrom={sec(VO.D[0])} endAt={sec(VO.D[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};
export const G3_END = G3State(18);

// ---------------------------------------------------------------- SP-06 G4
const E_AT = 0.3;
const atE = (s: number) => s - VO.E[0] + E_AT;
export const MAP_G4: MapCam = {lon: -84.5, lat: 34.5, z: 52};

/** Sheet at full size ↔ small inset at Galveston on the coastline map. */
export const insetTransform = (u: number) => {
  const g = project(MAP_G4, PLACES.galveston[0], PLACES.galveston[1]);
  const s = mix(1, 0.24, u);
  return `translate(${mix(0, g.x - 960 * s, u)}px, ${mix(0, g.y - 565 * s, u)}px) scale(${s})`;
};

export const G4: React.FC = () => {
  const t = useT();
  const out = k(t, atE(58.3), atE(59.9));
  const back = k(t, atE(65.1), atE(66.7));
  const u = out * (1 - back);
  const costO = 1 - k(t, 0, 0.6);
  const berthDash = k(t, 0.6, 1.6);
  const cal = k(t, atE(55.4), atE(60.6));
  const route = k(t, atE(62.0), atE(64.3));
  const g = project(MAP_G4, PLACES.galveston[0], PLACES.galveston[1]);
  const n = project(MAP_G4, PLACES.newYork[0], PLACES.newYork[1]);
  const c: Pt = [mix(g.x, n.x, 0.5) - 120, mix(g.y, n.y, 0.5) - 60];
  const bez = (s: number): Pt => [(1 - s) * (1 - s) * g.x + 2 * (1 - s) * s * c[0] + s * s * n.x, (1 - s) * (1 - s) * g.y + 2 * (1 - s) * s * c[1] + s * s * n.y];
  const staff = bez(k(t, atE(62.4), atE(64.5)));
  const pts = Array.from({length: 41}, (_, i) => bez((i / 40) * route));
  return (
    <AbsoluteFill style={{background: color.ink}}>
      <EngineeringBg />
      <AbsoluteFill style={{opacity: u}}>
        <BrandMap cam={MAP_G4} land={file.land} states={file.admin1} />
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
          <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={color.paper} strokeWidth={2.5} strokeDasharray="2 9" strokeLinecap="round" opacity={route > 0 ? 1 : 0} />
          <circle cx={n.x} cy={n.y} r={7} fill={color.paper} opacity={k(t, atE(63.6), atE(64.2))} />
          <path d={`M${staff[0]} ${staff[1] - 9} L${staff[0] + 9} ${staff[1]} L${staff[0]} ${staff[1] + 9} L${staff[0] - 9} ${staff[1]} Z`} fill={color.paper} opacity={k(t, atE(62.3), atE(62.6)) * (1 - k(t, atE(64.6), atE(65.0)))} />
        </svg>
        <div style={{position: 'absolute', left: n.x + 20, top: n.y - 14, opacity: k(t, atE(64.2), atE(64.7))}}>
          <Mono size={26}>NEW YORK</Mono>
        </div>
        <div style={{position: 'absolute', left: g.x - 80, top: g.y + 70, opacity: k(t, atE(60.0), atE(60.8))}}>
          <Mono size={26}>GALVESTON</Mono>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{transform: insetTransform(u), transformOrigin: '0 0'}}>
        <FacilitySheet {...G3_END} cost={costO} berthDash={berthDash} />
      </AbsoluteFill>
      {/* calendar strip at the edge: 1967 → 1968 */}
      <AbsoluteFill style={{opacity: k(t, atE(55.2), atE(55.8)) * (1 - k(t, atE(61.2), atE(61.8)))}}>
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
          {Array.from({length: 25}, (_, i) => (
            <line key={i} x1={360 + i * 50} x2={360 + i * 50} y1={i % 12 === 0 ? 952 : 960} y2={972} stroke={i / 24 <= cal ? color.paper : alpha(color.iron, 0.6)} strokeWidth={i % 12 === 0 ? 2 : 1} />
          ))}
          <line x1={360} x2={360 + 1200 * cal} y1={972} y2={972} stroke={color.paper} strokeWidth={2} />
        </svg>
        <div style={{position: 'absolute', left: 372, top: 984}}>
          <Mono size={24}>1967</Mono>
        </div>
        <div style={{position: 'absolute', left: 972, top: 984, opacity: k(t, atE(59.9), atE(60.3))}}>
          <Mono size={24}>1968</Mono>
        </div>
      </AbsoluteFill>
      <Sequence from={sec(E_AT)}>
        <Audio src={staticFile(file.ai01)} startFrom={sec(VO.E[0])} endAt={sec(VO.E[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};
