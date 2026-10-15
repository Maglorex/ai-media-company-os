import React from 'react';
import {AbsoluteFill, Audio, Easing, Img, interpolate, Sequence, staticFile} from 'remotion';
import {AntiTag, k, SourceMark, useT} from '../common';
import {file, sec, SHEET, VO} from '../data';

// SP-10…SP-14 — intentional anti-references (internal; never published). Same VO / claim / source material
// as the paired golden samples; only the visual thinking differs. Built from default-style presets and plain shapes;
// no third-party stock, no YouTube logo. Every number equals the document.

const clampE = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const SANS = 'Arial, Helvetica, sans-serif';

/** Full-frame photo with an aimless slow zoom (the failure). */
const ZoomPhoto: React.FC<{src: string; t: number; t0: number; t1: number; fit?: 'cover' | 'contain'; o?: number; caption?: string}> = ({src, t, t0, t1, fit = 'cover', o = 1, caption}) => (
  <AbsoluteFill style={{opacity: o, background: '#000'}}>
    <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: fit, transform: `scale(${interpolate(t, [t0, t1], [1, 1.12], clampE)})`}} />
    {caption ? <div style={{position: 'absolute', left: 60, bottom: 60, fontFamily: SANS, fontSize: 30, color: '#fff', textShadow: '0 2px 6px #000'}}>{caption}</div> : null}
  </AbsoluteFill>
);
const Card: React.FC<{text: string; o?: number; bg?: string; size?: number}> = ({text, o = 1, bg = '#0B2A5B', size = 120}) => (
  <AbsoluteFill style={{opacity: o, background: bg, justifyContent: 'center', alignItems: 'center'}}>
    <div style={{fontFamily: SANS, fontWeight: 700, fontSize: size, color: '#fff', textAlign: 'center', padding: 80, lineHeight: 1.1}}>{text}</div>
  </AbsoluteFill>
);
const xf = (t: number, a: number) => k(t, a, a + 0.6, Easing.linear); // default crossfade

// ---------------------------------------------------------------- AR1 (pairs SP-01, VO-A)
export const AR1_DUR = sec(16);
export const AR1: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <ZoomPhoto src={file.v05} t={t} t0={0} t1={8.3} />
      <Card text="19 VOYAGES" o={xf(t, 7.7)} />
      <AbsoluteFill style={{opacity: xf(t, 10.2)}}>
        <ZoomPhoto src={file.v07} t={t} t0={10.2} t1={12.6} fit="cover" />
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: xf(t, 12.4)}}>
        <Card text="MOST RELIABLE SHIP" />
        <SourceMark text="NPS" />
      </AbsoluteFill>
      <AntiTag />
      <Sequence from={sec(0.5)}>
        <Audio src={staticFile(file.ai01)} startFrom={sec(VO.A[0])} endAt={sec(VO.A[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- AR2 (pairs SP-02 + SP-04, VO-B then VO-C)
export const AR2_DUR = sec(26);
const C_AT = 15.0;
export const AR2: React.FC = () => {
  const t = useT();
  const swipe = k(t, 7.0, 7.7, Easing.linear);
  const cut = t >= 9.3;
  const bullets = [
    ['NUCLEAR CREW TRAINING', '$300,000', C_AT + 32.21 - VO.C[0]],
    ['NUCLEAR SHORE STAFF', '$409,000', C_AT + 33.59 - VO.C[0]],
    ['SERVICING FACILITY', '$1,162,000', C_AT + 35.9 - VO.C[0]],
  ] as const;
  // page-05 shown flat: fit to frame height (scale 1080 / 3085)
  const s = 1080 / 3085;
  return (
    <AbsoluteFill style={{background: '#2B2B2B'}}>
      {!cut ? (
        <AbsoluteFill style={{alignItems: 'center'}}>
          <div style={{position: 'relative', width: 2400 * s, height: 1080}}>
            <Img src={staticFile(file.p05)} style={{width: 2400 * s, height: 1080}} />
            <div style={{position: 'absolute', left: 560 * s, top: 2356 * s, width: (2240 - 560) * s * swipe, height: 156 * s, background: 'rgba(255,240,0,0.55)', mixBlendMode: 'multiply'}} />
          </div>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{background: '#101418'}}>
          <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(0,200,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.12) 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
          <div style={{position: 'absolute', left: 80, top: 70, fontFamily: 'monospace', fontSize: 30, color: '#3CF', letterSpacing: 4}}>EVIDENCE 01 // CASE 001 // ##:##:##</div>
          <div style={{position: 'absolute', right: 80, top: 120, fontFamily: 'monospace', fontSize: 26, color: '#3CF'}}>--°--' N · --°--' W</div>
          <div style={{position: 'absolute', left: 80, bottom: 70, fontFamily: 'monospace', fontSize: 24, color: '#3CF'}}>FILE ##-#### · REF ##:## · STATUS ----</div>
          <div style={{position: 'absolute', left: 160, top: 260, width: 1600, fontFamily: SANS, fontWeight: 700, fontSize: 64, color: '#fff', lineHeight: 1.2, opacity: t < C_AT ? 1 : 0}}>
            ABOUT $2 MILLION A YEAR MORE THAN COMPARABLE CONVENTIONAL SHIPS ON THE SAME ROUTE
          </div>
          {t >= C_AT
            ? bullets.map(([l, v, at], i) => {
                const x = interpolate(t, [at, at + 0.4], [1920, 0], {...clampE, easing: Easing.out(Easing.back(1.6))});
                return (
                  <div key={l} style={{position: 'absolute', left: 160 + x, top: 300 + i * 170, width: 1600, padding: '28px 40px', background: '#1F3B70', borderLeft: '12px solid #3CF', fontFamily: SANS, fontSize: 52, color: '#fff', fontWeight: 700}}>
                    • {l} — {v}
                  </div>
                );
              })
            : null}
        </AbsoluteFill>
      )}
      <AntiTag />
      <Sequence from={sec(0.3)}>
        <Audio src={staticFile(file.ai01)} startFrom={sec(VO.B[0])} endAt={sec(VO.B[1])} />
      </Sequence>
      <Sequence from={sec(C_AT)}>
        <Audio src={staticFile(file.ai01)} startFrom={sec(VO.C[0])} endAt={sec(VO.C[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- AR3 (pairs SP-05, VO-D)
export const AR3_DUR = sec(18);
const D = (s: number) => s - VO.D[0] + 0.6;
const Gear: React.FC<{rot: number}> = ({rot}) => {
  const teeth = Array.from({length: 12}, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return <rect key={i} x={-9} y={-78} width={18} height={24} fill="#9AA" transform={`rotate(${(a * 180) / Math.PI})`} />;
  });
  return (
    <svg width={200} height={200} style={{position: 'absolute', right: 40, bottom: 40}}>
      <g transform={`translate(100 100) rotate(${rot})`}>
        {teeth}
        <circle r={60} fill="#9AA" />
        <circle r={22} fill="#222" />
      </g>
    </svg>
  );
};
const Icon: React.FC<{shape: number; x: number; t: number; at: number; label: string}> = ({shape, x, t, at, label}) => {
  const y = interpolate(t, [at, at + 0.8], [-300, 0], {...clampE, easing: Easing.bounce});
  if (t < at) return null;
  const sh = [<circle key="c" cx={70} cy={70} r={60} fill="#F5A623" />, <rect key="r" x={10} y={10} width={120} height={120} rx={20} fill="#4A90E2" />, <polygon key="p" points="70,5 135,130 5,130" fill="#7ED321" />, <polygon key="h" points="70,5 130,40 130,100 70,135 10,100 10,40" fill="#D0021B" />, <polygon key="s" points="70,5 88,52 138,52 98,82 112,132 70,102 28,132 42,82 2,52 52,52" fill="#BD10E0" />][shape];
  return (
    <div style={{position: 'absolute', left: x, top: 380 + y, textAlign: 'center', width: 140}}>
      <svg width={140} height={140}>{sh}</svg>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 30, color: '#fff', textShadow: '0 2px 4px #000'}}>{label}</div>
    </div>
  );
};
const Wipe: React.FC<{t: number; at: number; children: React.ReactNode}> = ({t, at, children}) => {
  const w = k(t, at, at + 0.5, Easing.linear);
  return <AbsoluteFill style={{clipPath: `inset(0 ${(1 - w) * 100}% 0 0)`}}>{children}</AbsoluteFill>;
};
export const AR3: React.FC = () => {
  const t = useT();
  const s = 1080 / 3085;
  return (
    <AbsoluteFill style={{background: '#333'}}>
      <AbsoluteFill style={{alignItems: 'center', opacity: 0.6, transform: `translate(${Math.sin(t * 0.9) * 60}px, ${Math.cos(t * 0.7) * 30}px) rotate(${Math.sin(t * 0.5) * 3}deg) scale(1.2)`}}>
        <Img src={staticFile(file.p19)} style={{width: 2400 * s, height: 1080}} />
      </AbsoluteFill>
      {(['PIER', 'CRANES', 'POOL', 'BARGE', 'CORE'] as const).map((l, i) => (
        <Icon key={l} shape={i} x={180 + i * 330} t={t} at={[D(42.75), D(43.67), D(44.95), D(46.8), D(49.45)][i]} label={l} />
      ))}
      <Wipe t={t} at={D(47.2)}>
        <AbsoluteFill style={{background: '#000'}}>
          <Img src={staticFile(file.v07)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </AbsoluteFill>
      </Wipe>
      <Wipe t={t} at={D(49.3)}>
        <AbsoluteFill style={{background: '#FFFFFF', padding: 120}}>
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 80, color: '#0B2A5B'}}>FACILITY INCLUDES:</div>
          {['Pier', 'Heavy cranes', 'Pool for spent fuel', 'Atomic Servant barge', 'Spare reactor core'].map((b) => (
            <div key={b} style={{fontFamily: SANS, fontSize: 52, color: '#222', marginTop: 24}}>
              • {b}
            </div>
          ))}
        </AbsoluteFill>
      </Wipe>
      <Wipe t={t} at={D(51.3)}>
        <AbsoluteFill style={{background: '#000'}}>
          <Img src={staticFile(file.v24)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(t, [D(51.3), 18], [1, 1.15], clampE)})`}} />
        </AbsoluteFill>
      </Wipe>
      <Gear rot={t * 90} />
      <AntiTag />
      <Sequence from={sec(0.6)}>
        <Audio src={staticFile(file.ai01)} startFrom={sec(VO.D[0])} endAt={sec(VO.D[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- AR4 (pairs SP-06, VO-E)
export const AR4_DUR = sec(15.5);
const DipSeq: React.FC<{t: number; items: {src?: string; card?: string; caption?: string; t0: number; t1: number}[]}> = ({t, items}) => {
  const cur = items.find((i) => t >= i.t0 && t < i.t1) ?? items[items.length - 1];
  const white = Math.max(...items.map((i) => Math.max(0, 1 - Math.abs(t - i.t0) / 0.3)));
  return (
    <AbsoluteFill>
      {cur.src ? <ZoomPhoto src={cur.src} t={t} t0={cur.t0} t1={cur.t1} caption={cur.caption} /> : <Card text={cur.card ?? ''} size={200} />}
      <AbsoluteFill style={{background: '#fff', opacity: white}} />
    </AbsoluteFill>
  );
};
export const AR4: React.FC = () => {
  const t = useT();
  const E = (s: number) => s - VO.E[0] + 0.3;
  const lt = k(t, E(58.8), E(59.2)) * (1 - k(t, E(61.6), E(62.0)));
  const worker = t >= E(61.9) && t < E(64.3);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <DipSeq
        t={t}
        items={[
          {src: file.v05, t0: 0, t1: 3.2},
          {src: file.v19, caption: 'ROTTERDAM · 1964', t0: 3.2, t1: 6.4},
          {src: file.v07, t0: 6.4, t1: 9.6},
          {card: 'NEW YORK', t0: 9.6, t1: 12.6},
          {src: file.v24, t0: 12.6, t1: 15.6},
        ]}
      />
      <div style={{position: 'absolute', left: 0, bottom: 120, height: 110, width: 900 * lt, background: '#0B2A5B', borderLeft: '16px solid #F5A623', overflow: 'hidden'}}>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 64, color: '#fff', padding: '18px 40px', whiteSpace: 'nowrap'}}>1967 – 1968</div>
      </div>
      {worker ? (
        <svg width={260} height={320} style={{position: 'absolute', left: 1560, top: 360}}>
          <path d="M70 70 Q130 10 190 70 Z" fill="#F5D000" />
          <circle cx={130} cy={110} r={40} fill="#F1C27D" />
          <rect x={70} y={160} width={120} height={130} rx={20} fill="#1E5AA8" />
        </svg>
      ) : null}
      <AntiTag />
      <Sequence from={sec(0.3)}>
        <Audio src={staticFile(file.ai01)} startFrom={sec(VO.E[0])} endAt={sec(VO.E[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- AR5 (pairs SP-03 + SP-08): ad-break logo intro + generic CTA
export const AR5_DUR = sec(9.5);
export const AR5: React.FC = () => {
  const t = useT();
  const spin = interpolate(t, [0.2, 2.2], [720, 0], {...clampE, easing: Easing.out(Easing.cubic)});
  const scale = interpolate(t, [0.2, 1.2], [0.2, 1], {...clampE, easing: Easing.out(Easing.back(2))});
  const glitch = t > 2.4 && t < 3.0 ? Math.sin(t * 90) * 18 : 0;
  const stamp = interpolate(t, [3.1, 3.35], [3, 1], {...clampE, easing: Easing.in(Easing.cubic)});
  const cta = interpolate(t, [4.6, 5.0], [0, 1], {...clampE, easing: Easing.out(Easing.back(2))});
  const click = t > 6.4 && t < 6.7;
  const bell = Math.sin(t * 40) * (t > 6.6 && t < 7.6 ? 18 : 0);
  return (
    <AbsoluteFill style={{background: '#000', perspective: 900}}>
      {t < 4.4 ? (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <div style={{transform: `rotateY(${spin}deg) scale(${scale}) translateX(${glitch}px)`, fontFamily: SANS, fontWeight: 900, fontSize: 110, color: '#E8E8E8', textShadow: '0 0 30px #3CF, 4px 4px 0 #555, 8px 8px 0 #333, 12px 12px 0 #222' + (glitch ? `, ${glitch}px 0 0 #F0F, ${-glitch}px 0 0 #0FF` : '')}}>
            THE INDUSTRIAL CASEBOOK
          </div>
          {t > 3.1 ? (
            <div style={{position: 'absolute', transform: `rotate(-10deg) scale(${stamp})`, border: '12px solid #D0021B', padding: '10px 50px', fontFamily: SANS, fontWeight: 900, fontSize: 150, color: '#D0021B', opacity: 0.9, top: 520}}>CASE 001</div>
          ) : null}
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{background: 'linear-gradient(#1a1a1a, #333)', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{transform: `scale(${cta * (click ? 0.94 : 1)})`, display: 'flex', alignItems: 'center', gap: 40}}>
            <div style={{background: click || t > 6.7 ? '#888' : '#E00', color: '#fff', fontFamily: SANS, fontWeight: 800, fontSize: 90, padding: '40px 90px', borderRadius: 20}}>{t > 6.7 ? 'SUBSCRIBED' : 'SUBSCRIBE'}</div>
            <svg width={160} height={180} style={{transform: `rotate(${bell}deg)`}}>
              <path d="M80 20 C40 20 30 60 30 100 L15 140 L145 140 L130 100 C130 60 120 20 80 20 Z" fill="#FFF" />
              <circle cx={80} cy={158} r={16} fill="#FFF" />
            </svg>
          </div>
          <div style={{position: 'absolute', top: 760, fontFamily: SANS, fontWeight: 700, fontSize: 60, color: '#fff'}}>Don&apos;t forget to like and subscribe</div>
          <svg width={120} height={150} style={{position: 'absolute', left: interpolate(t, [5.2, 6.3], [1500, 1000], clampE), top: interpolate(t, [5.2, 6.3], [900, 600], clampE)}}>
            <path d="M40 10 L40 90 L25 75 Q10 70 15 90 L45 135 L95 135 L105 80 Q105 65 90 65 L60 62 L60 10 Q50 0 40 10 Z" fill="#FFF" stroke="#000" strokeWidth={4} />
          </svg>
        </AbsoluteFill>
      )}
      <AntiTag />
      <Sequence from={sec(0.2)}>
        <Audio src={staticFile(file.og10)} startFrom={sec(SHEET.whoosh[0])} endAt={sec(SHEET.whoosh[1])} />
      </Sequence>
      <Sequence from={sec(1.15)}>
        <Audio src={staticFile(file.og10)} startFrom={sec(SHEET.boom[0])} endAt={sec(SHEET.boom[1])} />
      </Sequence>
      <Sequence from={sec(2.4)}>
        <Audio src={staticFile(file.og10)} startFrom={sec(SHEET.glitch[0])} endAt={sec(SHEET.glitch[1])} />
      </Sequence>
      <Sequence from={sec(3.1)}>
        <Audio src={staticFile(file.og10)} startFrom={sec(SHEET.boom[0])} endAt={sec(SHEET.boom[1])} volume={0.8} />
      </Sequence>
      <Sequence from={sec(4.6)}>
        <Audio src={staticFile(file.og10)} startFrom={sec(SHEET.whoosh[0])} endAt={sec(SHEET.whoosh[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};
