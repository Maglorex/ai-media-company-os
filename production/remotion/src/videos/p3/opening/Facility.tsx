import React from 'react';
import {theme} from '../../../theme';
import {HULL_PATH, MAST_PATH, SHIP_LEN} from './ship';
import {c, ce, kf, lerp, ramp} from './timing';

// V10–V12: Galveston nükleer servis tesisi — İLLÜSTRASYON (etiketli). Bileşenler GAO s.15 (C-31, E-11), barge oranı C-42
// (Atomic Servant 129×36 ft; gemi ~595 ft). GAO yerleşim vermez → yerleşim uydurma değil, "layout not to scale" etiketi.
// Rıhtım boş ve kesik çizgili: gemi konturunun kendisi (hero object) → V11 "didn't come back".

const C30 = Math.cos(Math.PI / 6);
const S30 = 0.5;
const K = 1.25;
const O = {x: 980, y: 330};
const iso = (x: number, y: number, z = 0) => ({x: O.x + (x - y) * C30 * K, y: O.y + (x + y) * S30 * K - z * K});
const pts = (arr: [number, number, number][]) => arr.map(([x, y, z]) => {
  const p = iso(x, y, z);
  return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
}).join(' ');

/** Kutunun görünen üç yüzü (üst, ön-sol, ön-sağ). */
const Box: React.FC<{x0: number; x1: number; y0: number; y1: number; z0?: number; z1: number; draw: number; stroke: string; fill?: string; roof?: boolean}> = ({x0, x1, y0, y1, z0 = 0, z1, draw, stroke, fill = theme.background, roof = true}) => {
  if (draw <= 0) return null;
  const zt = lerp(z0, z1, draw);
  return (
    <g opacity={Math.min(1, draw * 2)}>
      <polygon points={pts([[x0, y1, z0], [x1, y1, z0], [x1, y1, zt], [x0, y1, zt]])} fill={fill} stroke={stroke} strokeWidth={2} />
      <polygon points={pts([[x1, y0, z0], [x1, y1, z0], [x1, y1, zt], [x1, y0, zt]])} fill={fill} stroke={stroke} strokeWidth={2} />
      <polygon points={pts([[x0, y0, zt], [x1, y0, zt], [x1, y1, zt], [x0, y1, zt]])} fill={roof ? fill : 'none'} stroke={stroke} strokeWidth={2} />
    </g>
  );
};

const Line: React.FC<{a: [number, number, number]; b: [number, number, number]; stroke: string; w?: number; draw?: number}> = ({a, b, stroke, w = 3, draw = 1}) => {
  if (draw <= 0) return null;
  const p = iso(...a);
  const q = iso(b[0], b[1], b[2]);
  return <line x1={p.x} y1={p.y} x2={lerp(p.x, q.x, draw)} y2={lerp(p.y, q.y, draw)} stroke={stroke} strokeWidth={w} strokeLinecap="round" />;
};

const Label: React.FC<{at: [number, number, number]; dx: number; dy: number; text: string; detail?: string; o: number; scale: number}> = ({at, dx, dy, text, detail, o, scale}) => {
  if (o <= 0) return null;
  const p = iso(...at);
  const lx = p.x + dx / scale;
  const ly = p.y + dy / scale;
  return (
    <g opacity={o}>
      <line x1={p.x} y1={p.y} x2={lx} y2={ly} stroke={theme.muted} strokeWidth={1.5 / scale} />
      <circle cx={p.x} cy={p.y} r={4 / scale} fill={theme.text} />
      <text x={lx + (dx >= 0 ? 8 : -8) / scale} y={ly + 10 / scale} fontSize={30 / scale} fill={theme.text} fontWeight={600} textAnchor={dx >= 0 ? 'start' : 'end'} fontFamily={theme.fontFamily}>
        {text}
      </text>
      {detail ? (
        <text x={lx + (dx >= 0 ? 8 : -8) / scale} y={ly + 42 / scale} fontSize={23 / scale} fill={theme.muted} textAnchor={dx >= 0 ? 'start' : 'end'} fontFamily={theme.fontFamily}>
          {detail}
        </text>
      ) : null}
    </g>
  );
};

// Kelime indeksleri (voWordsV2.ts): pier 107 · heavy cranes 108 · pool 111 · barge 117 · Atomic Servant 120 · spare core 124 ·
// "About one point one six million" 127 · "for two years" 138 · "back." 145
export const facilityCam = (t: number) => {
  // Kamera: bileşenden bileşene kısa kaymalar (her biri söylendiği an), sonra rakam için geri çekilme.
  // Her hedefe söylenmeden ~0,45 sn önce varılır, sonra kamera durur (sürekli kayma yok).
  const T: [number, number, number, number, number][] = [
    [c(106) - 0.6, 420, -20, 10, 1.3],
    [c(107), 300, -20, 10, 1.3],
    [c(108), 580, -20, 90, 1.3],
    [c(111), 300, 170, 30, 1.3],
    [c(115), 820, -70, 10, 1.3],
    [c(123), 520, 170, 30, 1.3],
    [c(127), 470, 90, 40, 1.0],
  ];
  const keys = (j: number) => {
    const out: [number, number][] = [[T[0][0], T[0][j]]];
    for (let i = 1; i < T.length; i++) {
      out.push([T[i][0] - 0.45, T[i - 1][j]]);
      out.push([T[i][0] + 0.05, T[i][j]]);
    }
    return out;
  };
  return {focus: iso(kf(t, keys(1)), kf(t, keys(2)), kf(t, keys(3))), zoom: kf(t, keys(4))};
};

export const Facility: React.FC<{t: number; desat: number; berthPulse: number}> = ({t, desat, berthPulse}) => {
  const {focus, zoom} = facilityCam(t);
  const st = theme.text;
  // Renk kaybı (V11): vurgu rengi grimsi tona kayar.
  const accent = desat > 0 ? mix(theme.accent, '#6f7a8c', desat) : theme.accent;
  const live = (i: number) => ramp(t, c(i) - 0.1, c(i) + 0.5);
  const pier = live(107);
  const cranes = live(108);
  const pool = live(111);
  const barge = live(115);
  const core = live(124);
  const ship = ramp(t, c(106) - 0.6, c(106) + 0.2);
  const labelO = (i: number) => ramp(t, c(i), c(i) + 0.35) * (1 - 0.5 * desat);

  // Gemi konturu rıhtımda (iso düzlemine yatırılmış; ~595 ft = 600 birim).
  const su = 600 / SHIP_LEN;
  const shipOrigin = iso(380, -95, 26);
  const M = `matrix(${(su * C30 * K).toFixed(4)} ${(su * S30 * K).toFixed(4)} 0 ${(su * K).toFixed(4)} ${shipOrigin.x.toFixed(1)} ${shipOrigin.y.toFixed(1)}) rotate(-8)`;

  return (
    <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
      <g transform={`translate(${960 - focus.x * zoom} ${560 - focus.y * zoom}) scale(${zoom})`}>
        {/* Kıyı çizgisi ve kara */}
        <polygon points={pts([[-200, 0, 0], [1100, 0, 0], [1100, 420, 0], [-200, 420, 0]])} fill={theme.mapLand} stroke="none" opacity={ship} />
        <Line a={[-200, 0, 0]} b={[1100, 0, 0]} stroke={theme.mapBorder} w={2} draw={ship} />
        {/* Boş rıhtım: gemi konturu, kesik çizgi */}
        <g transform={M} opacity={ship * (0.75 + 0.25 * berthPulse)}>
          <path d={HULL_PATH} fill="none" stroke={theme.accent} strokeWidth={3 / (su * K)} strokeDasharray={`${14 / (su * K)} ${10 / (su * K)}`} />
          <path d={MAST_PATH} fill="none" stroke={theme.accent} strokeWidth={2 / (su * K)} strokeDasharray={`${8 / (su * K)} ${8 / (su * K)}`} opacity={0.6} />
        </g>
        {/* İskele */}
        <Box x0={60} x1={760} y0={-40} y1={0} z1={10} draw={pier} stroke={st} />
        {/* Ağır vinçler: iskelede portal vinç + bakım binasında köprü vinç */}
        {cranes > 0 ? (
          <g opacity={cranes}>
            {([[540, -40], [620, -40], [540, 0], [620, 0]] as [number, number][]).map(([x, y], i) => (
              <Line key={i} a={[x, y, 10]} b={[x, y, 150]} stroke={accent} draw={cranes} />
            ))}
            <Line a={[530, -40, 150]} b={[630, -40, 150]} stroke={accent} w={5} draw={cranes} />
            <Line a={[530, 0, 150]} b={[630, 0, 150]} stroke={accent} w={5} draw={cranes} />
            <Line a={[580, 30, 150]} b={[580, -150, 150]} stroke={accent} w={5} draw={cranes} />
          </g>
        ) : null}
        {/* Bakım binası (kesit: çatı açık) + kullanılmış yakıt havuzu */}
        <Box x0={140} x1={420} y0={90} y1={250} z1={95} draw={Math.max(cranes, pool)} stroke={st} roof={false} fill="rgba(15,27,45,0.92)" />
        {pool > 0 ? (
          <g opacity={pool}>
            <polygon points={pts([[280, 130, 0], [390, 130, 0], [390, 220, 0], [280, 220, 0]])} fill="rgba(143,163,191,0.55)" stroke={theme.series[0]} strokeWidth={2} />
          </g>
        ) : null}
        {Math.max(cranes, pool) > 0 ? <Line a={[150, 170, 92]} b={[410, 170, 92]} stroke={accent} w={5} draw={cranes} /> : null}
        {/* Atomic Servant: 129 × 36 ft */}
        <Box x0={800} x1={929} y0={-90} y1={-54} z1={16} draw={barge} stroke={accent} />
        {/* Yedek reaktör çekirdeği (sade sembol) */}
        {core > 0 ? <Core at={iso(560, 170, 0)} o={core} stroke={accent} /> : null}

        <Label at={[200, -20, 10]} dx={-120} dy={-140} text="Pier" o={labelO(107)} scale={zoom} />
        <Label at={[580, -150, 150]} dx={60} dy={-50} text="Heavy cranes" detail="75-ton gantry · 75-ton bridge crane" o={labelO(108)} scale={zoom} />
        <Label at={[335, 175, 0]} dx={-260} dy={120} text="Pool for spent fuel" detail="inside the maintenance building" o={labelO(111)} scale={zoom} />
        <Label at={[865, -72, 16]} dx={90} dy={-110} text="Atomic Servant" detail="servicing barge" o={labelO(115)} scale={zoom} />
        <Label at={[560, 170, 50]} dx={160} dy={80} text="Spare reactor core" o={labelO(124)} scale={zoom} />
        <Label at={[620, -95, 40]} dx={260} dy={110} text="Berth" detail="the ship's place" o={ramp(t, c(106) + 0.6, c(107) + 0.4) * (1 - ramp(t, c(108), c(108) + 0.3)) + ramp(t, ce(145) - 0.4, ce(145)) } scale={zoom} />
      </g>
    </svg>
  );
};

const Core: React.FC<{at: {x: number; y: number}; o: number; stroke: string}> = ({at, o, stroke}) => {
  const r = 30 * K;
  const h = 60 * K * o;
  return (
    <g opacity={o}>
      <path d={`M${at.x - r} ${at.y} L${at.x - r} ${at.y - h} A${r} ${r / 2} 0 0 1 ${at.x + r} ${at.y - h} L${at.x + r} ${at.y} A${r} ${r / 2} 0 0 1 ${at.x - r} ${at.y} Z`} fill={theme.background} stroke={stroke} strokeWidth={2.5} />
      <ellipse cx={at.x} cy={at.y - h} rx={r} ry={r / 2} fill={theme.background} stroke={stroke} strokeWidth={2.5} />
      {[-0.5, 0, 0.5].map((k) => (
        <line key={k} x1={at.x + k * r} y1={at.y - h + r / 2 - 4} x2={at.x + k * r} y2={at.y + r / 2 - 6} stroke={stroke} strokeWidth={1.5} opacity={0.7} />
      ))}
    </g>
  );
};

function mix(a: string, b: string, k: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(lerp(v, pb[i], k))).join(',')})`;
}
