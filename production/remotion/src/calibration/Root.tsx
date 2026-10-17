import React from 'react';
import {AbsoluteFill, Composition} from 'remotion';
import {FrameOverride} from './common';
import {REVIEWS, reviewComponent, reviewDuration} from './Reels';
import {useBrandFonts} from '../brand/fonts';
import {FPS, H, W} from './data';
import {G1, G1_DUR} from './scenes/G1';
import {G2a, G2A_DUR} from './scenes/G2a';
import {IntroA, IntroB, INTRO_A_DUR, INTRO_B_DUR} from './scenes/Intro';
import {G2b, G2B_DUR} from './scenes/G2b';
import {G3, G3_DUR, G4, G4_DUR} from './scenes/Facility';
import {C1, C1_DUR, E1, E1_DUR} from './scenes/CtaEnd';
import {AR1, AR1_DUR, AR2, AR2_DUR, AR3, AR3_DUR, AR4, AR4_DUR, AR5, AR5_DUR} from './scenes/Anti';

const withFonts = (C: React.FC) => {
  const Wrapped: React.FC = () => {
    useBrandFonts();
    return <C />;
  };
  return Wrapped;
};

const scenes: [string, React.FC, number][] = ([
  ['CAL-SP01-G1', G1, G1_DUR],
  ['CAL-SP02-G2a', G2a, G2A_DUR],
  ['CAL-SP03-IntroA', IntroA, INTRO_A_DUR],
  ['CAL-SP07-IntroB', IntroB, INTRO_B_DUR],
  ['CAL-SP04-G2b', G2b, G2B_DUR],
  ['CAL-SP05-G3', G3, G3_DUR],
  ['CAL-SP06-G4', G4, G4_DUR],
  ['CAL-SP08-C1', C1, C1_DUR],
  ['CAL-SP09-E1', E1, E1_DUR],
  ['CAL-SP10-AR1', AR1, AR1_DUR],
  ['CAL-SP11-AR2', AR2, AR2_DUR],
  ['CAL-SP12-AR3', AR3, AR3_DUR],
  ['CAL-SP13-AR4', AR4, AR4_DUR],
  ['CAL-SP14-AR5', AR5, AR5_DUR],
] as [string, React.FC, number][]).map(([id, C, d]) => [id, withFonts(C), d]);

/** Technical check sheet: frozen frames of any scenes in a 4×4 grid (stills only; not a review file). */
const CheckSheet: React.FC<{items: {id: string; f: number}[]}> = ({items}) => {
  useBrandFonts();
  return (
    <AbsoluteFill style={{background: '#000', flexDirection: 'row', flexWrap: 'wrap'}}>
      {items.map(({id, f}, i) => {
        const C = scenes.find((s) => s[0] === id)?.[1];
        return (
          <div key={i} style={{width: 480, height: 270, position: 'relative', overflow: 'hidden'}}>
            <div style={{width: 1920, height: 1080, transform: 'scale(0.25)', transformOrigin: '0 0', position: 'absolute'}}>
              <FrameOverride.Provider value={f}>{C ? <C /> : null}</FrameOverride.Provider>
            </div>
            <div style={{position: 'absolute', left: 4, top: 2, color: '#ff0', fontSize: 14, fontFamily: 'monospace'}}>{`${id} f${f}`}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const reviews = REVIEWS.map((r) => ({id: r.id, C: reviewComponent(r.segs, r.bedOverride), d: reviewDuration(r.segs)}));

export const CalibrationRoot: React.FC = () => (
  <>
    {scenes.map(([id, C, d]) => (
      <Composition key={id} id={id} component={C} durationInFrames={d} fps={FPS} width={W} height={H} />
    ))}
    {reviews.map(({id, C, d}) => (
      <Composition key={id} id={id} component={C} durationInFrames={d} fps={FPS} width={W} height={H} />
    ))}
    <Composition id="CAL-CHECK" component={CheckSheet} durationInFrames={1} fps={FPS} width={1920} height={1080} defaultProps={{items: [] as {id: string; f: number}[]}} />
  </>
);
