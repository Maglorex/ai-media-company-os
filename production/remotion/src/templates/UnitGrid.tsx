import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

export type UnitGridProps = {
  title: string;
  subtitle?: string;
  total: number;
  highlighted: number;
  columns: number;
  /** Izgaranın altındaki açıklama (kaynağın ifadesiyle). */
  caption: string;
  /** Vurgulu birimlerin konumu kaynakta yoksa bunu söyleyen not (ör. "Illustration: positions not shown"). */
  tag?: string;
  /** Birimlerin belirmeye ve vurgunun başladığı kareler. */
  from?: number;
  highlightFrom?: number;
  label?: SourceLabelProps;
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/**
 * Birim ızgarası: "N içinden M" oranını sayılabilir kareyle gösterir.
 * Vurgulu kareler sona yerleşir; kaynak konum vermiyorsa konum ima edilmez (tag ile belirtilir).
 */
export const UnitGrid: React.FC<UnitGridProps> = ({title, subtitle, total, highlighted, columns, caption, tag, from = 15, highlightFrom = 70, label}) => {
  const frame = useCurrentFrame();
  const appear = (f: number) => interpolate(frame, [f, f + 15], [0, 1], clamp);
  const cell = 92;
  const gap = 16;
  const rows = Math.ceil(total / columns);
  const gridW = columns * cell + (columns - 1) * gap;
  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text}}>
      <div style={{position: 'absolute', left: 160, top: 110, opacity: appear(0)}}>
        <div style={{fontSize: 54, fontWeight: 700}}>{title}</div>
        {subtitle ? <div style={{fontSize: 30, color: theme.muted, marginTop: 8}}>{subtitle}</div> : null}
      </div>
      {tag ? (
        <div style={{position: 'absolute', right: 160, top: 110, fontSize: 24, color: theme.muted, border: `2px dashed ${theme.muted}`, padding: '8px 14px', opacity: appear(0)}}>
          {tag}
        </div>
      ) : null}
      <div style={{position: 'absolute', left: (1920 - gridW) / 2, top: 320, width: gridW, height: rows * cell + (rows - 1) * gap}}>
        {Array.from({length: total}, (_, k) => {
          const lit = k >= total - highlighted;
          const o = appear(from + k * 1.2);
          const h = lit ? appear(highlightFrom + (k - (total - highlighted)) * 6) : 0;
          return (
            <div
              key={k}
              style={{
                position: 'absolute',
                left: (k % columns) * (cell + gap),
                top: Math.floor(k / columns) * (cell + gap),
                width: cell,
                height: cell,
                boxSizing: 'border-box',
                border: `3px solid ${h > 0 ? theme.accent : theme.series[2]}`,
                backgroundColor: h > 0 ? `rgba(224, 162, 58, ${0.85 * h})` : 'transparent',
                opacity: o,
              }}
            />
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 160, right: 160, top: 320 + rows * (cell + gap) + 40, textAlign: 'center', fontSize: 34, opacity: appear(highlightFrom + highlighted * 6)}}>
        {caption}
      </div>
      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};
