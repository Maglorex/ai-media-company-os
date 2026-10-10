import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

/** Ondalık yıl: ay ortası (ör. ym(1967, 4) = Nisan 1967). Gün bilinmiyorsa ay ortası kullanılır. */
export const ym = (year: number, month: number) => year + (month - 1) / 12 + 1 / 24;

export type TimelineEvent = {
  at: number;
  /** Süreli olay (ör. 2 Haziran–1 Temmuz 1966). */
  end?: number;
  lane: number;
  title: string;
  detail?: string;
  from: number;
  /** Metin hizası; sağ kenara yakın olaylar için 'right'. */
  align?: 'left' | 'right';
  /** Metin kutusu genişliği (px). */
  width?: number;
};

export type TimelineSpan = {start: number; end: number; lane: number; label: string; from: number};

export type TimelineBand = {
  start: number;
  end: number;
  label: string;
  from: number;
  /** Kaynak bitişi kesin vermiyorsa bitiş solarak çizilir (kesin tarih ima edilmez). */
  fadeEnd?: number;
};

export type TimelineProps = {
  title: string;
  subtitle?: string;
  range: [number, number];
  lanes: string[];
  milestones?: {at: number; label: string; from: number}[];
  events: TimelineEvent[];
  spans?: TimelineSpan[];
  band?: TimelineBand;
  label?: SourceLabelProps;
};

const LANE_LABEL_X = 160;
const X0 = 470;
const X1 = 1760;
const LANE_Y = [410, 610];
const AXIS_Y = 800;
const FADE = 15;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/**
 * Sade zaman çizelgesi: yer şeritleri (ör. "tesiste" / "New York'ta"), olaylar, süre parantezleri
 * ve isteğe bağlı maliyet şeridi. Tarihler kaynaktaki hassasiyetle çizilir; bilinmeyen gün ay ortasıdır.
 */
export const Timeline: React.FC<TimelineProps> = ({title, subtitle, range, lanes, milestones = [], events, spans = [], band, label}) => {
  const frame = useCurrentFrame();
  const x = (t: number) => X0 + ((t - range[0]) / (range[1] - range[0])) * (X1 - X0);
  const appear = (from: number) => interpolate(frame, [from, from + FADE], [0, 1], clamp);

  const years: number[] = [];
  for (let y = Math.ceil(range[0]); y <= Math.floor(range[1]); y++) years.push(y);

  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text}}>
      <div style={{position: 'absolute', left: LANE_LABEL_X, top: 100, opacity: appear(0)}}>
        <div style={{fontSize: 52, fontWeight: 700}}>{title}</div>
        {subtitle ? <div style={{fontSize: 30, color: theme.muted, marginTop: 8}}>{subtitle}</div> : null}
      </div>

      {/* Şeritler */}
      {lanes.map((name, i) => (
        <div key={i} style={{opacity: appear(0)}}>
          <div style={{position: 'absolute', left: LANE_LABEL_X, top: LANE_Y[i] - 20, width: X0 - LANE_LABEL_X - 30, fontSize: 28, color: theme.muted, lineHeight: 1.2}}>
            {name}
          </div>
          <div style={{position: 'absolute', left: X0, top: LANE_Y[i], width: X1 - X0, height: 2, backgroundColor: theme.series[2]}} />
        </div>
      ))}

      {/* Eksen */}
      <div style={{position: 'absolute', left: X0, top: AXIS_Y, width: X1 - X0, height: 2, backgroundColor: theme.muted, opacity: appear(0)}} />
      {years.map((y) => (
        <div key={y} style={{opacity: appear(0)}}>
          <div style={{position: 'absolute', left: x(y), top: AXIS_Y - 10, width: 2, height: 22, backgroundColor: theme.muted}} />
          <div style={{position: 'absolute', left: x(y) + 8, top: AXIS_Y - 44, fontSize: 28, color: theme.muted}}>{y}</div>
        </div>
      ))}

      {milestones.map((m, i) => (
        <div key={i} style={{position: 'absolute', left: x(m.at), top: AXIS_Y, opacity: appear(m.from)}}>
          <div style={{position: 'absolute', left: -9, top: -8, width: 18, height: 18, borderRadius: 9, backgroundColor: theme.text}} />
          <div style={{position: 'absolute', left: -9, top: 22, fontSize: 24, color: theme.text, whiteSpace: 'nowrap'}}>{m.label}</div>
        </div>
      ))}

      {band ? <Band band={band} x={x} /> : null}

      {spans.map((s, i) => {
        const o = appear(s.from);
        const grow = interpolate(frame, [s.from, s.from + 40], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
        const y = LANE_Y[s.lane] + 44;
        return (
          <div key={i} style={{opacity: o}}>
            <div
              style={{
                position: 'absolute',
                left: x(s.start),
                top: y,
                width: (x(s.end) - x(s.start)) * grow,
                height: 18,
                borderBottom: `3px dashed ${theme.accent}`,
                borderLeft: `3px solid ${theme.accent}`,
                borderRight: grow >= 1 ? `3px solid ${theme.accent}` : 'none',
                boxSizing: 'border-box',
              }}
            />
            <div style={{position: 'absolute', left: (x(s.start) + x(s.end)) / 2, top: y + 26, transform: 'translateX(-50%)', fontSize: 30, fontWeight: 700, color: theme.accent, whiteSpace: 'nowrap', opacity: grow}}>
              {s.label}
            </div>
          </div>
        );
      })}

      {events.map((e, i) => {
        const o = appear(e.from);
        const y = LANE_Y[e.lane];
        const below = e.lane > 0;
        const right = e.align === 'right';
        const w = e.end ? Math.max(x(e.end) - x(e.at), 14) : 14;
        return (
          <div key={i} style={{opacity: o}}>
            <div style={{position: 'absolute', left: x(e.at) - (e.end ? 0 : 7), top: y - 7, width: w, height: 16, borderRadius: 8, backgroundColor: theme.accent}} />
            <div
              style={{
                position: 'absolute',
                top: below ? y + 26 : y - 100,
                ...(right ? {right: 1920 - (x(e.end ?? e.at) + 7)} : {left: x(e.at) - 7}),
                textAlign: right ? 'right' : 'left',
                width: e.width ?? 420,
              }}
            >
              <div style={{fontSize: 27, fontWeight: 700, lineHeight: 1.2}}>{e.title}</div>
              {e.detail ? <div style={{fontSize: 23, color: theme.muted, marginTop: 4, lineHeight: 1.25}}>{e.detail}</div> : null}
            </div>
          </div>
        );
      })}

      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};

const Band: React.FC<{band: TimelineBand; x: (t: number) => number}> = ({band, x}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [band.from, band.from + FADE], [0, 1], clamp);
  const left = x(band.start);
  const width = x(band.end) - left;
  const fadeStart = band.fadeEnd !== undefined ? ((x(band.fadeEnd) - left) / width) * 100 : 100;
  return (
    <div style={{position: 'absolute', left, top: AXIS_Y + 64, width, height: 44, opacity: o}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to right, ${theme.accent}66 ${fadeStart}%, transparent 100%)`,
          borderLeft: `3px solid ${theme.accent}`,
        }}
      />
      <div style={{position: 'absolute', left: 16, top: 6, fontSize: 24, fontWeight: 600, whiteSpace: 'nowrap'}}>{band.label}</div>
    </div>
  );
};
