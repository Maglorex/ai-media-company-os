import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

export type ScopeSection = {
  heading: string;
  /** neutral: bağlam (ne incelendi) · accent: sınır (ne incelenmedi). */
  tone: 'neutral' | 'accent';
  /** Kaynak ifadesine sadık maddeler. */
  items: string[];
  /** Opsiyonel birebir alıntı (tırnak içinde gösterilir). */
  quote?: string;
  from: number;
};

export type ScopeCardProps = {
  title: string;
  subtitle?: string;
  sections: ScopeSection[];
  label?: SourceLabelProps;
  /** Giriş hareketi: fade (varsayılan) veya rise. */
  motion?: 'fade' | 'rise';
};

const FADE = 15;
const LEFT = 160;
const COL_W = 760;
const COL_GAP = 80;
const TOP = 330;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/**
 * Kapsam kartı: bir kaynağın neyi incelediğini ve neyi açıkça incelemediğini yan yana gösterir.
 * Dürüstlük sahnesi; yalnız kaynağın kendi kapsam ifadelerini taşır, yorum eklemez.
 */
export const ScopeCard: React.FC<ScopeCardProps> = ({title, subtitle, sections, label, motion = 'fade'}) => {
  const frame = useCurrentFrame();
  const titleIn = interpolate(frame, [0, FADE], [0, 1], clamp);
  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text}}>
      <div style={{position: 'absolute', left: LEFT, top: 110, opacity: titleIn}}>
        <div style={{fontSize: 56, fontWeight: 700}}>{title}</div>
        {subtitle ? <div style={{fontSize: 30, color: theme.muted, marginTop: 10}}>{subtitle}</div> : null}
      </div>

      {sections.map((s, i) => {
        const o = interpolate(frame, [s.from, s.from + FADE], [0, 1], clamp);
        const color = s.tone === 'accent' ? theme.accent : theme.series[2];
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: LEFT + i * (COL_W + COL_GAP),
              top: TOP,
              width: COL_W,
              opacity: o,
              transform: motion === 'rise' ? `translateY(${(1 - o) * 28}px)` : undefined,
              borderTop: `6px solid ${color}`,
              paddingTop: 22,
            }}
          >
            <div style={{fontSize: 36, fontWeight: 700, color: s.tone === 'accent' ? theme.accent : theme.text}}>{s.heading}</div>
            {s.items.map((item, j) => {
              const io = interpolate(frame, [s.from + 10 + j * 12, s.from + 22 + j * 12], [0, 1], clamp);
              return (
                <div key={j} style={{display: 'flex', fontSize: 31, lineHeight: 1.3, marginTop: 20, opacity: io}}>
                  <span style={{color, marginRight: 14}}>—</span>
                  <span>{item}</span>
                </div>
              );
            })}
            {s.quote ? (
              <div
                style={{
                  marginTop: 34,
                  fontSize: 30,
                  lineHeight: 1.35,
                  fontStyle: 'italic',
                  color: theme.text,
                  borderLeft: `4px solid ${color}`,
                  paddingLeft: 20,
                  opacity: interpolate(frame, [s.from + 20 + s.items.length * 12, s.from + 35 + s.items.length * 12], [0, 1], clamp),
                }}
              >
                “{s.quote}”
              </div>
            ) : null}
          </div>
        );
      })}

      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};
