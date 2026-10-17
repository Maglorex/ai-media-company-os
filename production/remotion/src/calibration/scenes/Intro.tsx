import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, Cam, color, DeskBg, Display, k, mix, mixCam, Mono, Plate, toScreen, useT} from '../common';
import {DEMO, ENGINE, ENGINE_AXIS, ENGINE_WORLD, file, HULL, HULL_AXIS, P06, PAGE, PLATE_EDGE, Pt, sec, TEAL, V05, V90} from '../data';
import {GapBracket, PageBackdrop, PHRASE_TARGET, PhrasePixels, GAP} from './G2a';

// CASE INTRO — one stable skeleton (carry-in · registration · index · motif · release), two payloads.
// SP-03 I-A: CASE 001 · NS SAVANNAH (from SP-02's open gap, exits as SP-04's first underline).
// SP-07 I-B: CASE 00X · WESTINGHOUSE J40 (demo payload; from the test-section plate edge; holds on the title).
// No narration; typography paper on dark; amber never used here (amber is evidence emphasis).

export const INTRO_A_DUR = sec(7);
export const INTRO_B_DUR = sec(7.5);

const LINE_Y = 560;
const BASE_Y = 760;

/** Mechanical counter: each glyph rolls once through its wheel and settles. */
const Counter: React.FC<{text: string; settle: number; size: number}> = ({text, settle, size}) => {
  const wheel = '0123456789X';
  return (
    <div style={{display: 'flex', fontFamily: 'CasebookMeta', fontWeight: 500, fontSize: size, letterSpacing: '0.18em', color: color.paper, lineHeight: `${size * 1.2}px`}}>
      {text.split('').map((ch, i) => {
        const idx = wheel.indexOf(ch);
        if (idx < 0) return <span key={i} style={{whiteSpace: 'pre'}}>{ch}</span>;
        const local = Math.max(0, Math.min(1, settle * 1.6 - i * 0.08));
        const e = 1 - Math.pow(1 - local, 3);
        const pos = idx + (1 - e) * wheel.length;
        return (
          <span key={i} style={{display: 'inline-block', height: size * 1.2, overflow: 'hidden', position: 'relative'}}>
            <span style={{display: 'block', transform: `translateY(${-(pos % wheel.length) * size * 1.2}px)`}}>
              {(wheel + wheel).split('').map((c, j) => (
                <span key={j} style={{display: 'block', height: size * 1.2}}>
                  {c}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Number + title hanging from the Case Line; the line is their mask (rise from below, retract into it). */
export const CaseIndex: React.FC<{x: number; y: number; number: string; title: string; appear: number; settle: number; retract: number}> = ({x, y, number, title, appear, settle, retract}) => (
  <div style={{position: 'absolute', left: x, top: y + 3, width: 1400, height: 170, overflow: 'hidden'}}>
    <div style={{transform: `translateY(${(1 - appear) * 150 - retract * 175}px)`, paddingTop: 14}}>
      <Counter text={number} settle={settle} size={26} />
      <Display size={92} style={{marginTop: 10}}>
        {title}
      </Display>
    </div>
  </div>
);

const CaseLine: React.FC<{x0: number; x1: number; y: number; o?: number; c?: string}> = ({x0, x1, y, o = 1, c = color.paper}) => (
  <div style={{position: 'absolute', left: Math.min(x0, x1), top: y - 1, width: Math.abs(x1 - x0), height: 2, background: c, opacity: o}} />
);

// ---------------------------------------------------------------- I-A
const hullRot = (-Math.atan2(HULL_AXIS.to[1] - HULL_AXIS.from[1], HULL_AXIS.to[0] - HULL_AXIS.from[0]) * 180) / Math.PI;
const hullC: Pt = [(HULL_AXIS.from[0] + HULL_AXIS.to[0]) / 2, (HULL_AXIS.from[1] + HULL_AXIS.to[1]) / 2];
/** SP-04 opening camera on V-01 (summary p.2); the Case Line lands under the first cost line. */
export const G2B_CAM: Cam = {cx: 1240, cy: 560, z: 0.62};
export const firstUnderline = () => {
  const l = P06.lines[0];
  const a = toScreen(G2B_CAM, [l.x0, l.y1 + 8]);
  const b = toScreen(G2B_CAM, [l.x1, l.y1 + 8]);
  return {x0: a[0], x1: b[0], y: a[1]};
};

export const IntroA: React.FC = () => {
  const t = useT();
  const carry = k(t, 0, 0.9);
  const scan = k(t, 0.9, 2.3);
  const open = k(t, 2.3, 3.1);
  const base = k(t, 3.0, 3.6);
  const appear = k(t, 3.3, 4.1);
  const motif = k(t, 3.9, 4.8);
  const motifOut = k(t, 4.8, 5.3);
  const retract = k(t, 5.0, 5.6);
  const release = k(t, 5.2, 6.3);

  const L0 = 300;
  const L1 = 1620;
  const y = mix(GAP.y, LINE_Y, carry);
  const lineY = mix(y, BASE_Y, base);
  const ul = firstUnderline();
  const lx0 = mix(mix(GAP.x0, L0, carry), ul.x0, release);
  const lx1 = mix(mix(GAP.x1, L1, carry), ul.x1, release);
  const ly = mix(lineY, ul.y, release);

  const hullScale = mix(1.0, 0.86, release);
  const tip = mix(L0, L1, scan);
  const band = 9 + open * 260;
  const hullY = LINE_Y; // the hull stays where it was registered; the line descends to become its base
  const slit = `polygon(${L0 - 40}px ${hullY - band}px, ${tip}px ${hullY - band}px, ${tip}px ${hullY + band}px, ${L0 - 40}px ${hullY + band}px)`;
  const slitOpen = `polygon(0px ${hullY - band}px, 1920px ${hullY - band}px, 1920px ${hullY + band}px, 0px ${hullY + band}px)`;

  return (
    <AbsoluteFill style={{background: color.ink}}>
      <DeskBg />
      {/* the document world softens in depth behind the registration */}
      <AbsoluteFill style={{opacity: 1 - release}}>
        <PageBackdrop blur={mix(6.5, 14, carry)} dim={mix(0.85, 0.9, carry)} />
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: release}}>
        <Plate src={file.p06} w={PAGE.w} h={PAGE.h} cam={G2B_CAM} imgStyle={{boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}} />
      </AbsoluteFill>

      {/* carry-in: the question's phrase and labels give way to the line */}
      <PhrasePixels x={PHRASE_TARGET.x} y={PHRASE_TARGET.y} s={1.3} opacity={1 - k(t, 0, 0.6)} />
      <AbsoluteFill style={{opacity: 1 - carry}}>
        <GapBracket draw={1} labels={1 - k(t, 0, 0.5)} flatten={carry} />
      </AbsoluteFill>

      {/* registration: the hull, levelled on the line, natural colour, only visible V-05 pixels */}
      {scan > 0 ? (
        <AbsoluteFill style={{clipPath: open > 0 ? slitOpen : slit, opacity: 1 - k(t, 5.4, 6.2), filter: `blur(${release * 5}px)`, transform: `scale(${hullScale})`}}>
          <div style={{position: 'absolute', left: 0, top: hullY - 540, width: 1920, height: 1080}}>
            <Plate src={file.v05} w={V05.w} h={V05.h} cam={{cx: hullC[0], cy: hullC[1], z: 1.0, rot: hullRot}} clip={HULL} imgStyle={{filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.55))'}} />
          </div>
        </AbsoluteFill>
      ) : null}

      {/* motif: one thin orbit arc, Atomic Teal, passes once */}
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: 1 - motifOut}}>
        <ellipse cx={960} cy={hullY} rx={760} ry={190} fill="none" stroke={TEAL} strokeWidth={2} transform={`rotate(-6 960 ${hullY})`} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - motif} opacity={motif > 0 ? 1 : 0} />
      </svg>

      {/* on the white page the line takes the ink colour (it becomes the underline of the evidence) */}
      <CaseLine x0={lx0} x1={lx1} y={ly} o={1 - k(t, 5.8, 6.3)} />
      <CaseLine x0={lx0} x1={lx1} y={ly} o={k(t, 5.8, 6.3)} c={color.ink} />
      {scan > 0 && scan < 1 ? <div style={{position: 'absolute', left: tip - 1, top: hullY - 12, width: 2, height: 24, background: color.paper}} /> : null}
      <CaseIndex x={L0} y={lineY} number="CASE 001" title="NS SAVANNAH" appear={appear} settle={k(t, 3.2, 4.0)} retract={retract} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- I-B (and the SP-09 registration)
const engRot = (-Math.atan2(ENGINE_AXIS.to[1] - ENGINE_AXIS.from[1], ENGINE_AXIS.to[0] - ENGINE_AXIS.from[0]) * 180) / Math.PI;
const engC: Pt = [(ENGINE_AXIS.from[0] + ENGINE_AXIS.to[0]) / 2, (ENGINE_AXIS.from[1] + ENGINE_AXIS.to[1]) / 2];
export const ENG_CAM: Cam = {cx: engC[0], cy: engC[1], z: 0.68, rot: engRot};
const UPRIGHT: Cam = {cx: 625, cy: 700, z: 1.536, rot: 0};
const STAGES = 7;

/** Registration of the J40 along its own axis, stage by stage; `entry` = plate edge (I-B) or an incoming line (E1). */
export const EngineRegistration: React.FC<{t: number; entry: 'plate' | 'line'; lineFrom?: [number, number]}> = ({t: tIn, entry, lineFrom = [960, 1920]}) => {
  // 'line' entry (SP-09): the incoming Case Line re-spans along the engine axis, then the same registration follows 1.6 s earlier
  const t = entry === 'line' ? tIn + 1.6 : tIn;
  const roll = entry === 'plate' ? k(t, 1.0, 2.4) : 1;
  const cam = mixCam(UPRIGHT, ENG_CAM, roll);
  const edgeA = toScreen(UPRIGHT, [PLATE_EDGE.x0, PLATE_EDGE.y]);
  const edgeB = toScreen(UPRIGHT, [PLATE_EDGE.x1, PLATE_EDGE.y]);
  const form = entry === 'plate' ? k(t, 0.2, 1.0) : k(tIn, 0, 0.8);
  const L0 = 150;
  const L1 = 1770;
  const lineY = entry === 'plate' ? mix(edgeA[1], 540, roll) : 540;
  const lx0 = entry === 'plate' ? mix(edgeA[0], L0, roll) : mix(lineFrom[0], L0, form);
  const lx1 = entry === 'plate' ? mix(mix(edgeA[0], edgeB[0], form), L1, roll) : mix(lineFrom[1], L1, form);
  const reveal = k(t, 2.4, 4.5);
  const stage = Math.min(STAGES, Math.floor(reveal * STAGES + 1e-6));
  const within = reveal * STAGES - stage;
  const tipK = (stage + (stage < STAGES ? Math.min(1, within * 3) : 0)) / STAGES;
  const tip = mix(L0, L1, tipK);
  const base = k(t, 4.4, 5.0);
  const ly = mix(lineY, BASE_Y + 20, base);
  const worldO = entry === 'plate' ? mix(0.6, 0.22, k(t, 1.2, 2.8)) : 0.0;
  return (
    <>
      <AbsoluteFill style={{opacity: worldO, filter: `blur(${mix(0, 5, roll)}px)`}}>
        <Plate src={file.v90} w={V90.w} h={V90.h} cam={cam} clip={roll > 0 ? ENGINE_WORLD : undefined} />
      </AbsoluteFill>
      {reveal > 0 ? (
        <AbsoluteFill style={{clipPath: `polygon(0px 0px, ${tip}px 0px, ${tip}px 1080px, 0px 1080px)`}}>
          <Plate src={file.v90} w={V90.w} h={V90.h} cam={ENG_CAM} clip={ENGINE} imgStyle={{filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.6))'}} />
        </AbsoluteFill>
      ) : null}
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: 1 - k(t, 5.0, 5.6)}}>
        {Array.from({length: STAGES + 1}, (_, i) => {
          const x = mix(L0, L1, i / STAGES);
          const on = tipK >= i / STAGES - 1e-6 && reveal > 0;
          return <line key={i} x1={x} x2={x} y1={540 - 16} y2={540 + 16} stroke={DEMO} strokeWidth={2} opacity={on ? 1 : 0} />;
        })}
      </svg>
      <CaseLine x0={lx0} x1={lx1} y={ly} o={entry === 'plate' ? form : 1} />
      <CaseIndex x={L0} y={ly} number="CASE 00X" title="WESTINGHOUSE J40" appear={k(t, 4.7, 5.5)} settle={k(t, 4.6, 5.4)} retract={0} />
    </>
  );
};

export const IntroB: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: color.ink}}>
      <DeskBg />
      <EngineRegistration t={t} entry="plate" />
    </AbsoluteFill>
  );
};
