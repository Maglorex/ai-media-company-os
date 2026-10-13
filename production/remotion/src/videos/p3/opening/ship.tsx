import React from 'react';
import {theme} from '../../../theme';

// Gemi konturu: V-05 (NARA 542141, 1962) fotoğrafındaki gövde + üst yapı, fotoğraf pikseli koordinatında elle izlendi.
// Aynı kontur bütün açılışta "hero object" olarak taşınır: foto maskesi → siluet → harita token'ı → boş rıhtım → yükü taşıyan gemi.
export const PHOTO = {src: 'photos/V-05_nara-542141_golden-gate_1962.jpg', width: 1920, height: 1588};
/** Konturun referans noktası (fotoğraf pikseli): gövde ortası. */
export const SHIP_ANCHOR = {x: 930, y: 900};
/** Gövde boyu (fotoğraf pikseli) — ölçek hesapları için. */
export const SHIP_LEN = 1330;

const HULL: [number, number][] = [
  [268, 768], [330, 756], [560, 752], [570, 735], [700, 728], [760, 742], [820, 745], [830, 800],
  [900, 815], [1000, 830], [1240, 860], [1300, 880], [1480, 895], [1580, 912], [1592, 930],
  [1560, 965], [1525, 1015], [1505, 1058], [1400, 1050], [1140, 1025], [840, 975], [540, 915],
  [330, 840], [280, 800],
];
const MASTS: [number, number, number, number][] = [
  [455, 752, 440, 650], [715, 730, 703, 676], [998, 828, 985, 700], [1268, 866, 1258, 736],
];

const rel = (x: number, y: number) => `${(x - SHIP_ANCHOR.x).toFixed(1)} ${(y - SHIP_ANCHOR.y).toFixed(1)}`;
/** Gövde yolu (anchor'a göre). */
export const HULL_PATH = 'M' + HULL.map(([x, y]) => rel(x, y)).join(' L') + ' Z';
export const MAST_PATH = MASTS.map(([a, b, c2, d]) => `M${rel(a, b)} L${rel(c2, d)}`).join(' ');
/** Fotoğraf maskesi için mutlak koordinatlı yol. */
export const HULL_PATH_ABS = 'M' + HULL.map(([x, y]) => `${x} ${y}`).join(' L') + ' Z';
export const MASTS_ABS = MASTS;

export type ShipStyle = 'solid' | 'dashed' | 'outline';

/**
 * Konturu verilen ekran noktasına çizer. `s` = ekran pikseli / fotoğraf pikseli.
 * `matrix` verilirse (izometrik sahne) kontur o düzleme yatırılır.
 */
export const ShipShape: React.FC<{
  x: number;
  y: number;
  s: number;
  style?: ShipStyle;
  opacity?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  draw?: number;
}> = ({x, y, s, style = 'solid', opacity = 1, fill, stroke, strokeWidth = 2, draw = 1}) => {
  if (opacity <= 0) return null;
  const sw = strokeWidth / s;
  const dash = style === 'dashed' ? `${10 / s} ${8 / s}` : undefined;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <path
        d={HULL_PATH}
        fill={style === 'solid' ? fill ?? theme.background : 'none'}
        stroke={stroke ?? theme.accent}
        strokeWidth={sw}
        strokeLinejoin="round"
        strokeDasharray={dash}
        pathLength={style === 'dashed' ? undefined : 1}
        {...(style !== 'dashed' && draw < 1 ? {strokeDasharray: '1 1', strokeDashoffset: 1 - draw} : {})}
      />
      <path d={MAST_PATH} stroke={stroke ?? theme.accent} strokeWidth={sw * 0.8} opacity={draw} strokeDasharray={dash} />
    </g>
  );
};
