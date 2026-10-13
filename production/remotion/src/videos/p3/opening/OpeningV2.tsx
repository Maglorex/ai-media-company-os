import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {SourceLabel, SourceLabelProps} from '../../../templates/SourceLabel';
import {theme} from '../../../theme';
import {Facility} from './Facility';
import {MapCam, project, WorldMap} from './geo';
import {HULL_PATH_ABS, MASTS_ABS, PHOTO, SHIP_ANCHOR, ShipShape} from './ship';
import {AUDIO_PARTS, c, ce, FPS, kf, lerp, ramp, TOTAL_S, win} from './timing';

// P3 (VID-001) opening prototype v2 — handoff: production/pilots/2026-10-n2-pilot-test/P3-production-handoff-prototype-v2.md (D-030).
// Görüntü VO kelime zamanlarına senkron (voWordsV2.ts). c(i) = i. kelimenin video saniyesi. Müzik/SFX yok (track boş).
// Kanıt: GAO B-136209 (V-01 s.2, V-02 s.1, V-03 kapak), NARA 542141 (V-05), Natural Earth; tesis çizimi İLLÜSTRASYON (etiketli).

type Rect = {x: number; y: number; w: number; h: number};
type Cam = {s: number; tx: number; ty: number};
const FULL: Rect = {x: 0, y: 0, w: 1920, h: 1080};
const BAND: Rect = {x: 160, y: 40, w: 1600, h: 380};
const GAO = 'U.S. General Accounting Office';

const fit = (r: Rect, v: Rect, pad = 0.05): Cam => {
  const s = Math.min((v.w * (1 - 2 * pad)) / r.w, (v.h * (1 - 2 * pad)) / r.h);
  return {s, tx: v.x + v.w / 2 - (r.x + r.w / 2) * s, ty: v.y + v.h / 2 - (r.y + r.h / 2) * s};
};
const lerpRect = (a: Rect, b: Rect, k: number): Rect => {
  const cx = lerp(a.x + a.w / 2, b.x + b.w / 2, k);
  const cy = lerp(a.y + a.h / 2, b.y + b.h / 2, k);
  const w = Math.exp(lerp(Math.log(a.w), Math.log(b.w), k));
  const h = Math.exp(lerp(Math.log(a.h), Math.log(b.h), k));
  return {x: cx - w / 2, y: cy - h / 2, w, h};
};
/** Bölge anahtar kareleri arasında kamera (zoom log uzayında). */
const regionAt = (t: number, keys: [number, number, Rect][]): Rect => {
  let r = keys[0][2];
  for (const [a, b, target] of keys) {
    if (t < a) break;
    r = b > a ? lerpRect(r, target, ramp(t, a, b)) : target;
  }
  return r;
};
const toScreen = (cam: Cam, r: Rect): Rect => ({x: cam.tx + r.x * cam.s, y: cam.ty + r.y * cam.s, w: r.w * cam.s, h: r.h * cam.s});

// ── Belge sayfaları (GAO B-136209; görüntü değiştirilmez, vurgu ayrı multiply katmanı)
const P01 = {src: 'pages/page-01.png', w: 2400, h: 3061};
const P05 = {src: 'pages/page-05.png', w: 2400, h: 3085};
const P06 = {src: 'pages/page-06.png', w: 2400, h: 3084};
const Q01: Rect = {x: 540, y: 2328, w: 1712, h: 355};
const Q01_PHRASE: Rect = {x: 1358, y: 2357, w: 742, h: 49}; // "about $2 million more a year"
const V01_LINES: Rect = {x: 231, y: 170, w: 1712, h: 401};
const V01_L: Rect[] = [
  {x: 260, y: 204, w: 1345, h: 60},
  {x: 260, y: 304, w: 1592, h: 60},
  {x: 260, y: 456, w: 1656, h: 58},
];
const C33: Rect = {x: 190, y: 835, w: 1700, h: 140};
const C33_L: Rect[] = [
  {x: 218, y: 858, w: 1628, h: 48},
  {x: 218, y: 906, w: 794, h: 48},
];

type HL = {r: Rect; p: number; o?: number};
const Page: React.FC<{page: typeof P01; cam: Cam; hl?: HL[]; dim?: number; blur?: number; focus?: Rect; opacity?: number; clip?: Rect; children?: React.ReactNode}> = ({page, cam, hl = [], dim = 0, blur = 0, focus, opacity = 1, clip = FULL, children}) => {
  if (opacity <= 0) return null;
  const id = page.src.replace(/[^a-z0-9]/gi, '');
  const active = hl.filter((h) => h.p > 0 && (h.o ?? 1) > 0);
  const dimK = dim * Math.max(0, ...active.map((h) => Math.min(1, h.p * 2) * (h.o ?? 1)));
  return (
    <div style={{position: 'absolute', left: clip.x, top: clip.y, width: clip.w, height: clip.h, overflow: 'hidden', opacity}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: page.w, height: page.h, transformOrigin: '0 0', transform: `translate(${cam.tx - clip.x}px, ${cam.ty - clip.y}px) scale(${cam.s})`, filter: blur > 0.05 ? `blur(${blur}px)` : undefined, boxShadow: '0 0 60px rgba(0,0,0,0.55)'}}>
      <Img src={staticFile(page.src)} style={{width: page.w, height: page.h, display: 'block'}} />
      {active.map((h, i) => (
        <div key={i} style={{position: 'absolute', left: h.r.x, top: h.r.y, width: h.r.w * h.p, height: h.r.h, backgroundColor: theme.highlight, mixBlendMode: 'multiply', opacity: h.o ?? 1}} />
      ))}
      {dimK > 0 || focus ? (
        <svg width={page.w} height={page.h} style={{position: 'absolute', left: 0, top: 0}}>
          <defs>
            <mask id={`m-${id}`}>
              <rect width={page.w} height={page.h} fill="white" />
              {focus ? <rect x={focus.x} y={focus.y} width={focus.w} height={focus.h} fill="black" /> : active.map((h, i) => <rect key={i} x={h.r.x} y={h.r.y} width={h.r.w * h.p} height={h.r.h} fill="black" />)}
            </mask>
          </defs>
          <rect width={page.w} height={page.h} fill={theme.background} opacity={focus ? 0.9 : dimK} mask={`url(#m-${id})`} />
          {focus && dimK > 0 ? (
            <g>
              <defs>
                <mask id={`m2-${id}`}>
                  <rect x={focus.x} y={focus.y} width={focus.w} height={focus.h} fill="white" />
                  {active.map((h, i) => <rect key={i} x={h.r.x} y={h.r.y} width={h.r.w * h.p} height={h.r.h} fill="black" />)}
                </mask>
              </defs>
              <rect width={page.w} height={page.h} fill={theme.background} opacity={dimK} mask={`url(#m2-${id})`} />
            </g>
          ) : null}
        </svg>
      ) : null}
      {children}
    </div>
    </div>
  );
};

// ── Harita kamerası (tek harita dünyası, dört durum)
const NY = {lon: -74.0, lat: 40.7};
const GALV = {lon: -94.8, lat: 29.3};
const DEST = [
  {lon: 15, lat: 38, name: 'Mediterranean', n: 10},
  {lon: 6, lat: 54, name: 'Northern Europe', n: 7},
  {lon: 128, lat: 33, name: 'Far East', n: 2},
];
const WORLD: MapCam = {lon: 25, lat: 32.5, z: 9};
const lerpCam = (a: MapCam, b: MapCam, k: number): MapCam => ({lon: lerp(a.lon, b.lon, k), lat: lerp(a.lat, b.lat, k), z: Math.exp(lerp(Math.log(a.z), Math.log(b.z), k))});
const mapCam = (t: number): MapCam => {
  if (t < c(36)) return lerpCam(WORLD, {lon: -48, lat: 38, z: 15}, ramp(t, c(26) - 0.2, c(27) + 0.5));
  if (t < c(146) - 0.4) {
    const a: MapCam = {lon: -82, lat: 33.5, z: 26};
    const b: MapCam = {lon: GALV.lon, lat: GALV.lat, z: 105};
    const cIn = lerpCam(a, b, ramp(t, c(102) - 0.1, c(104) + 0.3));
    return lerpCam(cIn, {lon: GALV.lon, lat: GALV.lat, z: 1400}, ramp(t, ce(105) - 0.1, ce(105) + 0.7));
  }
  return lerpCam({lon: GALV.lon, lat: GALV.lat, z: 1400}, {lon: -84.5, lat: 35, z: 40}, ramp(t, c(146) - 0.3, c(147) + 0.4));
};

// ── Veri sahnesi geometrisi (V6–V7): yatay çubuklar, 500 px / 1 M$. Ekranda yalnız GAO ifadeleri; rakam toplanıp yazılmaz.
const BX = 260;
const PXM = 500;
const SAV_Y = 590;
const CONV_Y = 730;
const BAR_H = 60;
const SAV_W = 2.9 * PXM; // C-02 net maliyet ≈2,9 M$ (çizim ölçeği; ekranda yazılmaz)
const CONV_W = (2.9 - 2.0) * PXM; // C-04: ≈2 M$ fazla → karşılaştırma tabanı (çizim oranı, rakamsız; ledger C-03 notu)
const BR_X0 = BX + CONV_W;
const SEG = [
  {v: 0.3, color: theme.series[0], name: 'Nuclear crew training'},
  {v: 0.409, color: theme.series[1], name: 'Nuclear shore staff'},
  {v: 1.162, color: theme.accent, name: 'Nuclear servicing facility'},
];
const segX = (i: number) => BR_X0 + SEG.slice(0, i).reduce((s, g) => s + g.v * PXM, 0);

const Lbl: React.FC<{a: number; b: number} & SourceLabelProps> = ({a, b, ...p}) => {
  const from = Math.round(a * FPS);
  return (
    <Sequence from={from} durationInFrames={Math.max(1, Math.round((b - a) * FPS) + 14)}>
      <SourceLabel {...p} from={0} until={Math.round((b - a) * FPS)} />
    </Sequence>
  );
};

const Figure: React.FC<{x: number; y: number; h: number; color: string; o?: number}> = ({x, y, h, color, o = 1}) => (
  <g opacity={o}>
    <circle cx={x} cy={y - h * 0.78} r={h * 0.17} fill={color} />
    <path d={`M${x - h * 0.2} ${y} L${x - h * 0.16} ${y - h * 0.52} Q${x} ${y - h * 0.62} ${x + h * 0.16} ${y - h * 0.52} L${x + h * 0.2} ${y} Z`} fill={color} />
  </g>
);

const quad = (p: {x: number; y: number}, q: {x: number; y: number}, lift: number) => {
  const m = {x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 - lift};
  return {d: `M${p.x} ${p.y} Q${m.x} ${m.y} ${q.x} ${q.y}`, at: (u: number) => ({x: (1 - u) ** 2 * p.x + 2 * (1 - u) * u * m.x + u * u * q.x, y: (1 - u) ** 2 * p.y + 2 * (1 - u) * u * m.y + u * u * q.y})};
};

export const P3OpeningV2: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  // ── Sahne pencereleri
  const photoO = ramp(t, 0, 0.6) * (1 - ramp(t, c(11) + 0.45, c(12) + 0.3));
  const map1O = ramp(t, c(11) + 0.4, c(12) + 0.4) * (1 - ramp(t, c(36) + 0.15, c(37) + 0.3));
  const coverO = ramp(t, c(36), c(37) + 0.2);
  const turn = ramp(t, ce(43) + 0.05, c(44) - 0.15);
  const v02O = ramp(t, ce(43), ce(43) + 0.4) * (1 - ramp(t, c(70) - 0.3, c(70) + 0.3));
  const toBand = ramp(t, ce(64) - 0.35, c(65) + 0.1);
  const barsO = ramp(t, ce(64) - 0.2, c(65)) * (1 - ramp(t, c(99) - 0.1, c(99) + 0.5));
  const v01BandO = ramp(t, c(70) - 0.3, c(70) + 0.3) * (1 - ramp(t, c(99) - 0.1, c(99) + 0.5));
  const map2O = ramp(t, c(99) - 0.1, c(99) + 0.5) * (1 - ramp(t, ce(105) + 0.2, ce(105) + 0.7));
  const facO = ramp(t, ce(105) + 0.25, ce(105) + 0.8) * (1 - ramp(t, c(146) - 0.3, c(146) + 0.2));
  const map3O = ramp(t, c(146) - 0.2, c(146) + 0.4) * (1 - ramp(t, c(162) - 0.35, c(162) + 0.15));
  const c33O = ramp(t, c(162) - 0.3, c(162) + 0.2) * (1 - ramp(t, c(177) - 0.25, c(177) + 0.25));
  const payO = ramp(t, c(177) - 0.2, c(177) + 0.35);
  const black = ramp(t, TOTAL_S - 1.5, TOTAL_S - 0.25);

  // ── V1–V2: foto → izole gemi → siluet → harita token'ı
  const P = 1.2;
  const PO = {x: 130, y: 370};
  const photoAnchor = {x: (SHIP_ANCHOR.x - PO.x) * P, y: (SHIP_ANCHOR.y - PO.y) * P};
  const isolate = ramp(t, c(5), c(8));
  const toSil = ramp(t, c(11) + 0.3, c(11) + 0.9);
  const cam = mapCam(t);
  const tokenS = 0.075 * Math.sqrt(cam.z / 9);
  const nyPt = project(cam, NY.lon, NY.lat);
  const fly = ramp(t, c(11) + 0.6, c(12) + 0.6);

  // ── V4: kapak kamerası; token kapağa "dosyalanır"
  const coverRegion = regionAt(t, [
    [0, 0, {x: 0, y: 0, w: P01.w, h: P01.h}],
    [c(38) + 0.05, c(38) + 1.0, {x: 1450, y: 2560, w: 760, h: 260}],
    [c(40) + 0.1, c(41) + 0.5, {x: 250, y: 220, w: 2050, h: 1180}],
  ]);
  const coverCam = fit(coverRegion, FULL, 0.06);
  const COVER_TOKEN = {x: 1300, y: 770, s: 0.57};
  const tokenOnCover = {x: coverCam.tx + COVER_TOKEN.x * coverCam.s, y: coverCam.ty + COVER_TOKEN.y * coverCam.s, s: COVER_TOKEN.s * coverCam.s};
  const file = ramp(t, c(36) + 0.1, c(37) + 0.5);

  // ── V5–V7: Q-01 → bant; V-01 bant
  const view = lerpRect(FULL, BAND, toBand);
  const v02Cam = fit(Q01, view, 0.05);
  const v01Cam = fit(V01_LINES, BAND, 0.03);

  // global token (foto/harita/kapak geçişi)
  let token: {x: number; y: number; s: number; o: number; solid: number} | null = null;
  if (t < c(37) + 0.5) {
    const a = photoAnchor;
    const m = nyPt;
    const pre = {x: lerp(a.x, m.x, fly), y: lerp(a.y, m.y, fly), s: Math.exp(lerp(Math.log(P), Math.log(tokenS), fly))};
    const k = file;
    token = {
      x: lerp(pre.x, tokenOnCover.x, k),
      y: lerp(pre.y, tokenOnCover.y, k),
      s: Math.exp(lerp(Math.log(pre.s), Math.log(tokenOnCover.s), k)),
      o: toSil,
      solid: 1,
    };
  }

  // Sefer yayları (V2)
  const arcs = DEST.map((d, i) => {
    const q = project(cam, d.lon, d.lat);
    const dist = Math.hypot(q.x - nyPt.x, q.y - nyPt.y);
    const a0 = [c(12) + 0.7, c(19) + 0.1, c(20) + 0.15][i];
    const a1 = [c(19) - 0.05, c(20) + 0.1, c(21) + 0.1][i];
    return {d, q, path: quad(nyPt, q, dist * (i === 2 ? 0.28 : 0.22)), draw: ramp(t, a0, a1), done: a1};
  });
  const counted = arcs.reduce((s, a, i) => s + (t >= a.done ? DEST[i].n : 0), 0);
  const quoteK = ramp(t, c(26) - 0.1, c(26) + 0.4);
  const regular = win(t, c(22) - 0.1, c(26) - 0.2, 0.3);

  // ── V7–V8 zamanları
  const lineAt = [c(79), c(83), c(91)];
  const segFill = lineAt.map((a) => ramp(t, a + 0.1, a + 0.75));
  const v1 = win(t, c(79) + 0.15, c(91) - 0.1, 0.35);
  const v2 = win(t, c(83) + 0.15, c(91) - 0.1, 0.35);
  const compare = win(t, c(93) - 0.05, c(99) - 0.2, 0.3);
  const slotsO = ramp(t, c(77), c(77) + 0.4);
  const bracket = ramp(t, c(65) - 0.4, c(65) + 0.2);
  const barsGrow = ramp(t, ce(64) - 0.2, c(65) + 0.1);
  const chipK = ramp(t, ce(64) - 0.3, c(65) + 0.05);
  const phraseScr = toScreen(fit(Q01, FULL, 0.05), Q01_PHRASE);

  // ── V9: üçüncü satır haritaya düşer
  const drop = ramp(t, c(99) - 0.05, c(100) + 0.5);
  const galvPt = project(cam, GALV.lon, GALV.lat);

  // ── V11: takvim
  const yearX = (y: number) => 520 + (y - 1966) * 360;
  const calO = ramp(t, c(136) - 0.1, c(136) + 0.4) * facO;
  const cursorY = kf(t, [[c(138), 1966.5], [ce(145), 1968.6]]);
  const desat = ramp(t, c(138), ce(145));

  // ── V13
  const arc3 = quad(galvPt, nyPt, 120);
  const arc3Draw = ramp(t, c(152) - 0.2, c(154) + 0.2);
  const walk = ramp(t, c(153), c(157) + 0.6);

  // ── V14
  const c33Region = regionAt(t, [
    [0, 0, {x: 120, y: 700, w: 2100, h: 420}],
    [c(162) - 0.2, c(163) + 0.4, C33],
  ]);
  const c33Cam = fit(c33Region, FULL, 0.05);

  // ── V15–V16
  const pull = kf(t, [[c(181), 1], [TOTAL_S, 0.86]]);
  const payAnchor = {x: 960, y: 700};
  const payS = 0.42 * pull;
  const sink = 14 * (ramp(t, c(178) + 0.2, c(178) + 0.5) * 0.55 + ramp(t, c(179) + 0.2, c(179) + 0.5) * 0.2 + ramp(t, c(180) + 0.2, c(180) + 0.5) * 0.25);
  const blocks = [2, 1, 0].map((i, n) => ({...SEG[i], i, h: SEG[i].v * 128, land: ramp(t, [c(178), c(179), c(180)][n] - 0.15, [c(178), c(179), c(180)][n] + 0.3, (x) => 1 - (1 - x) ** 3)}));

  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text, overflow: 'hidden'}}>
      {AUDIO_PARTS.map(([a, b, at], i) => (
        <Sequence key={i} from={Math.round(at * FPS)}>
          <Audio src={staticFile('vo/P3_VO_OPEN_v2.mp3')} trimBefore={Math.round(a * FPS)} {...(b !== null ? {trimAfter: Math.round(b * FPS)} : {})} />
        </Sequence>
      ))}

      {/* V1 — V-05 foto: arka plan söner, gemi öne ayrılır */}
      {photoO > 0 ? (
        <AbsoluteFill style={{opacity: photoO}}>
          <svg width={1920} height={1080}>
            <defs>
              <clipPath id="hull">
                <path d={HULL_PATH_ABS} />
                {MASTS_ABS.map(([a, b, x2, y2], i) => (
                  <polygon key={i} points={`${a - 8},${b} ${a + 8},${b} ${x2 + 6},${y2} ${x2 - 6},${y2}`} />
                ))}
              </clipPath>
              <filter id="desat"><feColorMatrix type="saturate" values={String(1 - 0.8 * isolate)} /></filter>
            </defs>
            <g transform={`scale(${P}) translate(${-PO.x} ${-PO.y})`}>
              <image href={staticFile(PHOTO.src)} width={PHOTO.width} height={PHOTO.height} filter="url(#desat)" />
              <rect width={PHOTO.width} height={PHOTO.height} fill={theme.background} opacity={0.72 * isolate + 0.28 * toSil} />
              <image href={staticFile(PHOTO.src)} width={PHOTO.width} height={PHOTO.height} clipPath="url(#hull)" opacity={1 - toSil} />
            </g>
          </svg>
          <div style={{position: 'absolute', left: 120, top: 120, opacity: ramp(t, c(7), c(7) + 0.5) * (1 - toSil)}}>
            <div style={{fontSize: 64, fontWeight: 700, letterSpacing: 6}}>NS SAVANNAH</div>
            <div style={{fontSize: 30, color: theme.muted, marginTop: 6, letterSpacing: 3}}>1962 · FIRST NUCLEAR-POWERED MERCHANT SHIP</div>
          </div>
        </AbsoluteFill>
      ) : null}

      {/* V2–V3 — harita: token, sefer yayları, sayaç; operatörlerin sözü */}
      {map1O > 0 ? (
        <AbsoluteFill style={{opacity: map1O}}>
          <WorldMap cam={cam} opacity={1}>
            {arcs.map((a, i) =>
              a.draw > 0 ? (
                <g key={i} opacity={1 - 0.65 * quoteK}>
                  <path d={a.path.d} fill="none" stroke={theme.accent} strokeWidth={3} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - a.draw} />
                  {regular > 0 ? [0, 0.5].map((o) => {
                    const u = ((t - c(22)) * 0.55 + o + i * 0.17) % 1;
                    const p = a.path.at(u < 0 ? u + 1 : u);
                    return <circle key={o} cx={p.x} cy={p.y} r={5} fill={theme.text} opacity={regular} />;
                  }) : null}
                  <circle cx={a.q.x} cy={a.q.y} r={9} fill={theme.accent} opacity={ramp(t, a.done - 0.1, a.done + 0.1)} />
                  <text x={a.q.x + (i === 2 ? -16 : 16)} y={a.q.y - 14} textAnchor={i === 2 ? 'end' : 'start'} fontSize={32} fontWeight={700} fill={theme.text} opacity={ramp(t, a.done - 0.1, a.done + 0.2)}>
                    {a.d.name} · {a.d.n}
                  </text>
                </g>
              ) : null,
            )}
          </WorldMap>
          <div style={{position: 'absolute', left: 120, top: 90, opacity: ramp(t, arcs[0].done - 0.1, arcs[0].done + 0.15) * (1 - quoteK)}}>
            <div style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
              <div style={{fontSize: 120, fontWeight: 700, color: theme.accent, fontVariantNumeric: 'tabular-nums', minWidth: 140}}>{counted}</div>
              <div style={{fontSize: 48, fontWeight: 700}}>voyages</div>
            </div>
            <div style={{fontSize: 30, color: theme.muted}}>First 3 commercial years · regular cargo routes</div>
          </div>
          <div style={{position: 'absolute', right: 120, top: 100, fontSize: 24, color: theme.muted, border: `2px dashed ${theme.muted}`, padding: '8px 14px', opacity: ramp(t, c(13), c(14)) * (1 - quoteK)}}>
            Destinations by region · not actual routes
          </div>
          {quoteK > 0 ? (
            <div style={{position: 'absolute', left: nyPt.x + 70, top: nyPt.y - 190, width: 980, opacity: quoteK, transform: `translateY(${(1 - quoteK) * 16}px)`}}>
              <div style={{fontSize: 58, fontWeight: 600, lineHeight: 1.2}}>“the most reliable ship we have operating”</div>
              <div style={{fontSize: 30, color: theme.muted, marginTop: 14}}>— her operators, as quoted by the National Park Service</div>
            </div>
          ) : null}
        </AbsoluteFill>
      ) : null}

      {/* V5 — V-02 Q-01 (kapağın altında hazır bekler), sonra üst banda çekilir */}
      {v02O > 0 ? (
        <Page
          page={P05}
          cam={v02Cam}
          clip={view}
          opacity={v02O}
          blur={10 * (1 - ramp(t, c(44) - 0.5, c(45)))}
          dim={0.3}
          hl={[
            {r: {x: 1252, y: 2357, w: 975, h: 49}, p: ramp(t, c(47) - 0.05, c(51) + 0.3)},
            {r: {x: 572, y: 2406, w: 1565, h: 49}, p: ramp(t, c(57), c(60) + 0.3)},
            {r: {x: 572, y: 2455, w: 912, h: 50}, p: ramp(t, c(61), ce(64))},
          ]}
        />
      ) : null}

      {/* V4 — V-03 kapak; token dosyalanır; sayfa çevrilir */}
      {coverO > 0 && turn < 1 ? (
        <AbsoluteFill style={{opacity: coverO * (1 - ramp(t, c(44) - 0.45, c(44) - 0.15)), transformOrigin: '0px 540px', transform: `perspective(2600px) rotateY(${-100 * turn}deg)`}}>
          <AbsoluteFill style={{backgroundColor: theme.background, opacity: 1 - turn}} />
          <Page
            page={P01}
            cam={coverCam}
            hl={[]}
          >
            <svg width={P01.w} height={P01.h} style={{position: 'absolute', left: 0, top: 0}}>
              <rect x={1610} y={2665} width={490} height={80} fill="none" stroke={theme.accent} strokeWidth={8} opacity={ramp(t, c(38) + 0.7, c(38) + 1.0)} />
              {file >= 1 ? (
                <g>
                  <ShipShape x={COVER_TOKEN.x} y={COVER_TOKEN.y} s={COVER_TOKEN.s} stroke={theme.accent} strokeWidth={6} fill="rgba(15,27,45,0.9)" />
                </g>
              ) : null}
            </svg>
          </Page>
        </AbsoluteFill>
      ) : null}

      {/* V6–V8 — veri durumu: iki çubuk, parantez, üç satır */}
      {v01BandO > 0 ? (
        <Page
          page={P06}
          cam={v01Cam}
          clip={BAND}
          opacity={v01BandO}
          dim={0.3}
          hl={V01_L.map((r, i) => ({r, p: ramp(t, lineAt[i] - 0.05, lineAt[i] + 0.5)}))}
        />
      ) : null}
      {barsO > 0 ? (
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: barsO}}>
          <text x={BX} y={SAV_Y - 18} fontSize={32} fontWeight={700} fill={theme.text}>Savannah</text>
          <rect x={BX} y={SAV_Y} width={SAV_W * barsGrow} height={BAR_H} fill={theme.series[2]} />
          <text x={BX} y={CONV_Y - 18} fontSize={28} fill={theme.muted}>Comparable conventional freighters, same route · average operating subsidy</text>
          <rect x={BX} y={CONV_Y} width={CONV_W * barsGrow} height={BAR_H} fill={theme.mapBorder} />
          {/* parantez: fark */}
          <g opacity={bracket}>
            <line x1={BR_X0} y1={SAV_Y - 4} x2={BR_X0} y2={CONV_Y + BAR_H} stroke={theme.muted} strokeWidth={2} strokeDasharray="6 6" />
            <path d={`M${BR_X0} ${SAV_Y - 30} L${BR_X0} ${SAV_Y - 46} L${BX + SAV_W} ${SAV_Y - 46} L${BX + SAV_W} ${SAV_Y - 30}`} fill="none" stroke={theme.accent} strokeWidth={4} />
          </g>
          {/* üç satır yuvası (kesikli) */}
          {SEG.map((g, i) => (
            <rect key={i} x={segX(i)} y={SAV_Y} width={g.v * PXM} height={BAR_H} fill="none" stroke={theme.text} strokeWidth={1.5} strokeDasharray="5 5" opacity={slotsO * (1 - segFill[i])} />
          ))}
          {SEG.map((g, i) => {
            const k = segFill[i];
            if (k <= 0 || (i === 2 && drop > 0.02)) return null;
            const src = toScreen(v01Cam, V01_L[i]);
            const r = lerpRect(src, {x: segX(i), y: SAV_Y, w: g.v * PXM, h: BAR_H}, k);
            return <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={g.color} opacity={0.5 + 0.5 * k} />;
          })}
          {/* "diğer ikisinin toplamından büyük": ilk iki parça üçüncünün altına hizalanır */}
          {compare > 0 ? (
            <g opacity={compare}>
              <rect x={segX(2)} y={SAV_Y + BAR_H + 10} width={SEG[0].v * PXM} height={18} fill={SEG[0].color} />
              <rect x={segX(2) + SEG[0].v * PXM} y={SAV_Y + BAR_H + 10} width={SEG[1].v * PXM} height={18} fill={SEG[1].color} />
              <line x1={segX(2) + (SEG[0].v + SEG[1].v) * PXM} y1={SAV_Y + BAR_H + 4} x2={segX(2) + (SEG[0].v + SEG[1].v) * PXM} y2={SAV_Y + BAR_H + 34} stroke={theme.text} strokeWidth={2} />
              <line x1={segX(3)} y1={SAV_Y - 4} x2={segX(3)} y2={SAV_Y + BAR_H + 34} stroke={theme.accent} strokeWidth={2} />
            </g>
          ) : null}
          {/* segment etiketleri */}
          {SEG.map((g, i) => (
            <text key={i} x={segX(i) + (g.v * PXM) / 2} y={SAV_Y + BAR_H / 2 + 9} textAnchor="middle" fontSize={i === 2 ? 26 : 20} fontWeight={600} fill={theme.background} opacity={ramp(t, lineAt[i] + 0.6, lineAt[i] + 0.9) * (i === 2 ? 1 - drop : 1)}>
              {['training', 'shore staff', 'servicing facility'][i]}
            </text>
          ))}
          {/* V8 vinyet 1: gemi konturu içinde mürettebat sırası; bir kısmı yanar (sayı yazılmaz) */}
          {v1 > 0 ? (
            <g opacity={v1}>
              <ShipShape x={560} y={860} s={0.4} style="outline" stroke={theme.series[0]} strokeWidth={2} />
              {Array.from({length: 67}).map((_, i) => {
                const row = i < 34 ? 0 : 1;
                const col = row ? i - 34 : i;
                const lit = i < 27 && t > c(80) + (i / 27) * 0.9;
                return <Figure key={i} x={352 + col * 12.6 + row * 6} y={872 + row * 26} h={20} color={lit ? theme.series[0] : '#3a4b66'} />;
              })}
              <text x={560} y={968} textAnchor="middle" fontSize={24} fill={theme.muted}>nuclear crew training</text>
            </g>
          ) : null}
          {/* V8 vinyet 2: karadaki ekip → limanlara ince çizgiler */}
          {v2 > 0 ? (
            <g opacity={v2}>
              <line x1={950} y1={900} x2={1090} y2={900} stroke={theme.mapBorder} strokeWidth={3} />
              {Array.from({length: 10}).map((_, i) => (
                <Figure key={i} x={968 + (i % 5) * 24} y={866 + Math.floor(i / 5) * 30} h={24} color={theme.series[1]} />
              ))}
              {[790, 830, 870, 910].map((y, i) => {
                const k = ramp(t, c(85) + i * 0.18, c(86) + 0.3 + i * 0.18);
                return (
                  <g key={i}>
                    <line x1={1100} y1={858} x2={lerp(1100, 1330, k)} y2={lerp(858, y, k)} stroke={theme.series[1]} strokeWidth={1.5} />
                    <circle cx={1330} cy={y} r={6} fill={theme.series[1]} opacity={ramp(t, c(86) + i * 0.18, c(86) + 0.3 + i * 0.18)} />
                  </g>
                );
              })}
              <text x={1140} y={968} textAnchor="middle" fontSize={24} fill={theme.muted}>nuclear shore staff</text>
            </g>
          ) : null}
        </svg>
      ) : null}
      {/* Q-01 ifadesi sayfadan kalkar → parantezin etiketi */}
      {chipK > 0 && barsO > 0 ? (
        (() => {
          const target = {x: BR_X0 + (SAV_W - CONV_W) / 2, y: SAV_Y - 84};
          const sx = lerp(phraseScr.x + phraseScr.w / 2, target.x, chipK);
          const sy = lerp(phraseScr.y + phraseScr.h / 2, target.y, chipK);
          return (
            <div style={{position: 'absolute', left: sx, top: sy, transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap', fontSize: lerp(30, 40, chipK), fontWeight: 700, color: theme.background, backgroundColor: theme.accent, padding: '4px 14px', borderRadius: 4, opacity: barsO * Math.min(1, chipK * 4)}}>
              about $2 million more a year
            </div>
          );
        })()
      ) : null}

      {/* V9 — harita: üçüncü satır Galveston'a düşer, punch-in */}
      {map2O > 0 ? (
        <AbsoluteFill style={{opacity: map2O}}>
          <WorldMap cam={cam} opacity={1} stateBorders={0.7}>
            <ShipShape x={nyPt.x} y={nyPt.y} s={tokenS} stroke={theme.accent} strokeWidth={2} />
            {drop < 1
              ? (() => {
                  const from = {x: segX(2) + (SEG[2].v * PXM) / 2, y: SAV_Y + BAR_H / 2};
                  const k = drop;
                  const w = lerp(SEG[2].v * PXM, 22, k);
                  const h = lerp(BAR_H, 22, k);
                  return <rect x={lerp(from.x, galvPt.x, k) - w / 2} y={lerp(from.y, galvPt.y, k) - h / 2} width={w} height={h} rx={lerp(0, 11, k)} fill={theme.accent} />;
                })()
              : null}
            <circle cx={galvPt.x} cy={galvPt.y} r={11} fill={theme.accent} stroke={theme.background} strokeWidth={3} opacity={ramp(t, c(100) + 0.4, c(100) + 0.6)} />
            <g opacity={ramp(t, c(104) - 0.1, c(104) + 0.3) * (1 - ramp(t, ce(105) + 0.1, ce(105) + 0.4))}>
              <text x={galvPt.x + 28} y={galvPt.y - 8} fontSize={44} fontWeight={700} fill={theme.text}>Galveston, Texas</text>
              <text x={galvPt.x + 28} y={galvPt.y + 32} fontSize={28} fill={theme.muted}>Nuclear servicing facility</text>
            </g>
          </WorldMap>
        </AbsoluteFill>
      ) : null}

      {/* V10–V12 — tesis illüstrasyonu (etiketli), takvim, durgun kare */}
      {facO > 0 ? (
        <AbsoluteFill style={{opacity: facO, transformOrigin: `${galvPt.x}px ${galvPt.y}px`, transform: `scale(${lerp(0.15, 1, ramp(t, ce(105) + 0.2, ce(105) + 0.9))})`}}>
          <Facility t={t} desat={desat} berthPulse={ramp(t, c(143), ce(145))} />
          <div style={{position: 'absolute', right: 56, bottom: 56, fontSize: 24, color: theme.muted, border: `2px dashed ${theme.muted}`, padding: '8px 14px', backgroundColor: theme.labelBackground}}>
            Illustration — components: GAO 1970 · layout not to scale
          </div>
          <div style={{position: 'absolute', left: 70, bottom: 170, padding: '10px 18px', backgroundColor: theme.labelBackground, opacity: ramp(t, c(127) - 0.1, c(127) + 0.4) * (1 - calO)}}>
            <div style={{fontSize: 84, fontWeight: 700, color: theme.accent}}>$1,162,000 a year</div>
            <div style={{fontSize: 28, color: theme.muted}}>average annual cost of the servicing facility · GAO</div>
          </div>
          {calO > 0 ? (
            <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: calO}}>
              <line x1={yearX(1966)} y1={110} x2={yearX(1969)} y2={110} stroke={theme.mapBorder} strokeWidth={4} />
              <line x1={yearX(1966.5)} y1={110} x2={yearX(cursorY)} y2={110} stroke={theme.muted} strokeWidth={10} />
              <circle cx={yearX(cursorY)} cy={110} r={11} fill={theme.text} />
              {[1966, 1967, 1968].map((y) => (
                <g key={y}>
                  <line x1={yearX(y)} y1={96} x2={yearX(y)} y2={124} stroke={theme.muted} strokeWidth={2} />
                  <text x={yearX(y) + 10} y={82} fontSize={34} fontWeight={700} fill={theme.text}>{y}</text>
                </g>
              ))}
            </svg>
          ) : null}
        </AbsoluteFill>
      ) : null}

      {/* V13 — tesis personeli gemiye gider: Galveston → New York */}
      {map3O > 0 ? (
        <AbsoluteFill style={{opacity: map3O}}>
          <WorldMap cam={cam} opacity={1} stateBorders={0.7}>
            <circle cx={galvPt.x} cy={galvPt.y} r={11} fill={theme.accent} stroke={theme.background} strokeWidth={3} />
            <text x={galvPt.x - 24} y={galvPt.y + 50} textAnchor="middle" fontSize={30} fontWeight={600} fill={theme.muted}>Galveston facility</text>
            <ShipShape x={nyPt.x} y={nyPt.y} s={0.11} stroke={theme.accent} strokeWidth={2} />
            <path d={arc3.d} fill="none" stroke={theme.series[1]} strokeWidth={2.5} strokeDasharray="10 8" opacity={arc3Draw} />
            {walk > 0 && walk < 1.01
              ? [0, 1, 2, 3].map((i) => {
                  const u = Math.max(0, Math.min(1, walk * 1.25 - i * 0.08));
                  const p = arc3.at(u);
                  return <Figure key={i} x={p.x} y={p.y + 4} h={30} color={theme.series[1]} o={ramp(t, c(153) + i * 0.08, c(153) + 0.25 + i * 0.08)} />;
                })
              : null}
            {[
              {y: '1967', at: c(148)},
              {y: '1968', at: c(150)},
            ].map((e, i) => (
              <g key={e.y} opacity={ramp(t, e.at - 0.1, e.at + 0.3)}>
                <rect x={nyPt.x + 90} y={nyPt.y + 30 + i * 62} width={330} height={50} rx={4} fill={theme.labelBackground} stroke={theme.muted} strokeWidth={1.5} />
                <text x={nyPt.x + 106} y={nyPt.y + 66 + i * 62} fontSize={28} fill={theme.text}>{e.y} · annual inspection</text>
              </g>
            ))}
            <text x={nyPt.x + 90} y={nyPt.y - 40} fontSize={46} fontWeight={700} fill={theme.text} opacity={ramp(t, c(160) - 0.1, c(160) + 0.3)}>New York</text>
          </WorldMap>
        </AbsoluteFill>
      ) : null}

      {/* V14 — V-01 sayfası (Özet s.2): C-33 cümlesi; "10 gemi" satırı odak dışında */}
      {c33O > 0 ? (
        <Page
          page={P06}
          cam={c33Cam}
          opacity={c33O}
          dim={0.3}
          focus={{x: 190, y: 845, w: 1700, h: 116}}
          hl={[
            {r: C33_L[0], p: ramp(t, c(166) - 0.05, c(174) + 0.35, (x) => x)},
            {r: C33_L[1], p: ramp(t, c(175) - 0.05, ce(176))},
          ]}
        />
      ) : null}

      {/* V15–V16 — üç satır tek geminin üstüne iner; yavaş geri çekilme → siyah */}
      {payO > 0 ? (
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: payO}}>
          <g transform={`translate(${960} ${560}) scale(${pull}) translate(${-960} ${-560})`}>
            <line x1={260} y1={payAnchor.y + 82} x2={1660} y2={payAnchor.y + 82} stroke={theme.mapBorder} strokeWidth={2} />
            <ShipShape x={payAnchor.x} y={payAnchor.y + sink} s={0.42} stroke={theme.accent} strokeWidth={3} fill={theme.mapLand} />
            {(() => {
              let base = payAnchor.y + sink - 40;
              return blocks.map((b) => {
                const top = base - b.h;
                const y = lerp(top - 520, top, b.land);
                base = top - 4;
                return (
                  <g key={b.i} opacity={ramp(b.land, 0, 0.15)}>
                    <rect x={960 - 230} y={y} width={460} height={b.h} fill={b.color} />
                    <text x={960} y={y + b.h / 2 + 9} textAnchor="middle" fontSize={b.h > 60 ? 28 : 20} fontWeight={600} fill={theme.background}>
                      {['crew training', 'shore staff', 'servicing facility'][b.i]}
                    </text>
                  </g>
                );
              });
            })()}
          </g>
        </svg>
      ) : null}

      {/* Global token: foto → siluet → harita → kapak (süreklilik) */}
      {token && token.o > 0 && file < 1 ? (
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
          <ShipShape x={token.x} y={token.y} s={token.s} stroke={theme.accent} strokeWidth={lerp(3, 2, fly)} fill="rgba(15,27,45,0.92)" opacity={token.o} />
        </svg>
      ) : null}

      {/* Kaynak etiketleri */}
      <Lbl a={0.8} b={c(11) + 0.4} text="Photo: AEC / National Archives" detail="N.S. Savannah, 1962 · NAID 542141" />
      <Lbl a={c(12) + 0.6} b={c(26) - 0.2} text="Map: Natural Earth (public domain)" detail="Voyages: GAO report B-136209 (1970), p. 6" />
      <Lbl a={c(26)} b={c(36)} text="National Park Service" detail="National Historic Landmark nomination, N.S. Savannah" />
      <Lbl a={c(37)} b={c(44) - 0.5} text="GAO report B-136209, cover" detail={`${GAO} · report to the Congress`} />
      <Lbl a={c(45)} b={c(70) - 0.2} text="GAO report B-136209 (1970), p. 1" detail={GAO} position="bottom-right" />
      <Lbl a={c(70)} b={c(99) - 0.2} text="GAO report B-136209 (1970), pp. 1–2" detail="Bar lengths drawn to GAO figures" position="bottom-right" />
      <Lbl a={c(100)} b={ce(105)} text="Map: Natural Earth (public domain)" detail="Location: GAO report B-136209 (1970), p. 15" />
      <Lbl a={c(107)} b={c(146) - 0.3} text="GAO report B-136209 (1970), pp. 15–16" detail="Barge proportions: National Park Service" />
      <Lbl a={c(147)} b={c(162) - 0.3} text="GAO report B-136209 (1970), pp. 15–16" detail="Map: Natural Earth · staff figures illustrative" />
      <Lbl a={c(163)} b={c(177) - 0.2} text="GAO report B-136209 (1970), p. 2" detail={GAO} />
      <Lbl a={c(178)} b={TOTAL_S - 1.6} text="Illustration · GAO report B-136209 (1970), p. 2" detail="Block sizes proportional to the three GAO lines" />

      <AbsoluteFill style={{backgroundColor: '#000', opacity: Math.max(black, 1 - ramp(t, 0, 0.5))}} />
    </AbsoluteFill>
  );
};
