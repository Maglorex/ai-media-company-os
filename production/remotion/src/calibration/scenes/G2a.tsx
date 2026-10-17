import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, staticFile} from 'remotion';
import {alpha, Cam, camTransform, color, DeskBg, k, mix, mixCam, Mono, Plate, polyPath, SourceMark, toScreen, useT} from '../common';
import {COVER, file, P05, PAGE, Pt, sec, TEAL, VO} from '../data';
import {hullMarker} from './G1';
import {PLACES} from '../data';

// SP-02 — G2a "The audit's gap". VO-B (AI-01 14.30–29.00) starts at 0.3 s.
export const G2A_DUR = sec(16.5);
const VO_AT = 0.3;
const at = (s: number) => s - VO.B[0] + VO_AT;

const PAGE_CAM0: Cam = {cx: 1200, cy: 1540, z: 0.31};
export const PAGE_CAM1: Cam = {cx: 1398, cy: 2436, z: 1.0};

/** Final gap geometry (shared with the CASE INTRO carry-in). */
export const GAP = {x0: 560, x1: 1360, y: 560, tick: 30};
export const PHRASE_SCALE = 1.3;
const ph = P05.phrase;
const phW = (ph.x1 - ph.x0) * PHRASE_SCALE;
const phH = (ph.y1 - ph.y0) * PHRASE_SCALE;
export const PHRASE_TARGET = {x: 960 - phW / 2, y: GAP.y - 40 - phH, w: phW, h: phH};

/** The receded document behind the gap (end state of G2a). */
export const PageBackdrop: React.FC<{blur: number; dim: number}> = ({blur, dim}) => (
  <Plate src={file.p05} w={PAGE.w} h={PAGE.h} cam={PAGE_CAM1} imgStyle={{filter: `blur(${blur}px) brightness(${1 - dim})`}} />
);

/** Exact page pixels of the phrase, placed by its top-left corner and scale. */
export const PhrasePixels: React.FC<{x: number; y: number; s: number; shadow?: number; opacity?: number}> = ({x, y, s, shadow = 0, opacity = 1}) => (
  <div style={{position: 'absolute', left: x, top: y, width: (ph.x1 - ph.x0) * s, height: (ph.y1 - ph.y0) * s, overflow: 'hidden', opacity, boxShadow: shadow ? `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.55)` : undefined}}>
    <Img src={staticFile(file.p05)} style={{position: 'absolute', left: -ph.x0 * s, top: -ph.y0 * s, width: PAGE.w * s, height: PAGE.h * s}} />
  </div>
);

/** Open, unscaled gap between two plain labels (no bars: GAO gives no subsidy figure to scale). */
export const GapBracket: React.FC<{draw: number; labels: number; flatten?: number; x0?: number; x1?: number; y?: number}> = ({draw, labels, flatten = 0, x0 = GAP.x0, x1 = GAP.x1, y = GAP.y}) => {
  const tick = GAP.tick * (1 - flatten);
  const cx = (x0 + x1) / 2;
  const half = ((x1 - x0) / 2) * draw;
  return (
    <>
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={`M${cx - half} ${y + tick} L${cx - half} ${y} L${cx + half} ${y} L${cx + half} ${y + tick}`} fill="none" stroke={color.paper} strokeWidth={2} />
      </svg>
      <div style={{position: 'absolute', left: x0 - 300, width: 600, top: y + 50, textAlign: 'center', opacity: labels}}>
        <Mono size={26} style={{display: 'inline-block'}}>Savannah</Mono>
      </div>
      <div style={{position: 'absolute', left: x1 - 300, width: 600, top: y + 50, textAlign: 'center', opacity: labels}}>
        <Mono size={22} c={alpha(color.paper, 0.85)} style={{display: 'inline-block', lineHeight: 1.5}}>
          Comparable conventional ships
          <br />
          same route
        </Mono>
      </div>
    </>
  );
};

export const G2a: React.FC = () => {
  const t = useT();
  const push = k(t, 3.0, 6.4);
  const cam = mixCam(PAGE_CAM0, PAGE_CAM1, push);
  const focus = k(t, 5.6, 6.8);
  const recede = k(t, 8.2, 9.8);

  // marker from SP-01 lands on the cover title, then the cover opens like a real file
  const land = k(t, 0, 1.1);
  const coverCam: Cam = cam;
  const target = toScreen(coverCam, COVER.title);
  const from = hullMarker(PLACES.usAtlantic).map(([x, y]) => [x - 1300, y] as Pt);
  const fb = from.reduce((a, p) => [a[0] + p[0] / from.length, a[1] + p[1] / from.length], [0, 0]);
  const marker = from.map(([x, y]) => [mix(x, target[0] + (x - fb[0]) * 0.8, land), mix(y, target[1] + (y - fb[1]) * 0.8, land)] as Pt);
  const markerO = 1 - k(t, 1.1, 1.6);
  const open = k(t, 1.5, 3.3);

  // Evidence Pull: the phrase leaves the page pixels and settles over the gap
  const pull = k(t, at(21.0), at(22.6));
  const pr = {x: toScreen(cam, [ph.x0, ph.y0])[0], y: toScreen(cam, [ph.x0, ph.y0])[1], s: cam.z};
  const px = mix(pr.x, PHRASE_TARGET.x, pull);
  const py = mix(pr.y, PHRASE_TARGET.y, pull) - Math.sin(Math.PI * pull) * 40;
  const ps = mix(pr.s, PHRASE_SCALE, pull);
  const amber = k(t, at(20.75), at(21.2)) * (1 - k(t, 8.4, 9.2));
  const ul = toScreen(cam, [ph.x0, ph.y1 + 6]);
  const ur = toScreen(cam, [ph.x1, ph.y1 + 6]);

  return (
    <AbsoluteFill style={{background: color.ink}}>
      <DeskBg />
      <AbsoluteFill style={{perspective: 2600}}>
        {/* summary page (V-02) under the cover */}
        <Plate src={file.p05} w={PAGE.w} h={PAGE.h} cam={cam} imgStyle={{filter: `blur(${focus * 2.5 + recede * 4}px) brightness(${1 - focus * 0.45 - recede * 0.4})`, boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}} />
        <Plate
          src={file.p05}
          w={PAGE.w}
          h={PAGE.h}
          cam={cam}
          clip={[[P05.sentence.x0, P05.sentence.y0], [P05.sentence.x1, P05.sentence.y0], [P05.sentence.x1, P05.sentence.y1], [P05.sentence.x0, P05.sentence.y1]]}
          style={{opacity: focus * (1 - recede)}}
        />
        {/* cover (V-03), hinged on its left edge */}
        <div style={{position: 'absolute', left: 0, top: 0, width: COVER.w, height: COVER.h, transformOrigin: '0 0', transform: camTransform(coverCam), opacity: 1 - k(t, 3.0, 3.4)}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: COVER.w, height: COVER.h, transformOrigin: '0 50%', transform: `perspective(7000px) rotateY(${-172 * open}deg)`, backfaceVisibility: 'hidden', boxShadow: `0 ${20 + 60 * open}px ${60 + 80 * open}px rgba(0,0,0,${0.5 + 0.2 * open})`}}>
            <Img src={staticFile(file.p01)} style={{width: COVER.w, height: COVER.h}} />
          </div>
        </div>
      </AbsoluteFill>

      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={polyPath(marker)} fill={alpha(TEAL, 0.25)} stroke={TEAL} strokeWidth={2} opacity={markerO} />
        <line x1={ul[0]} y1={ul[1]} x2={mix(ul[0], ur[0], k(t, at(20.75), at(21.6)))} y2={ur[1]} stroke={color.accentBrand} strokeWidth={2.5} opacity={amber} />
      </svg>

      {pull > 0 ? <PhrasePixels x={px} y={py} s={ps} shadow={18 * Math.sin(Math.PI * pull) + 4 * pull} /> : null}
      <GapBracket draw={k(t, at(22.4), at(23.6))} labels={k(t, at(23.4), at(24.4))} />
      <SourceMark text="Evidence 01 · GAO B-136209 · 1970" opacity={k(t, 5.4, 6.0)} />

      <Sequence from={sec(VO_AT)}>
        <Audio src={staticFile(file.ai01)} startFrom={sec(VO.B[0])} endAt={sec(VO.B[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};
