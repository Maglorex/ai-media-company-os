import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

export type QuoteCardProps = {
  /** Birebir alıntı (tırnaksız verilir). */
  quote: string;
  /** Kim söyledi / kim aktardı, kaynaktaki atıfla (ör. "Her operators, as quoted by the National Park Service"). */
  attribution: string;
  from?: number;
  label?: SourceLabelProps;
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Sade alıntı kartı: alıntı + atıf; süsleme yok. İkincil kaynak aktarımları atıfta açıkça yazılır. */
export const QuoteCard: React.FC<QuoteCardProps> = ({quote, attribution, from = 10, label}) => {
  const frame = useCurrentFrame();
  const q = interpolate(frame, [from, from + 20], [0, 1], clamp);
  const a = interpolate(frame, [from + 25, from + 40], [0, 1], clamp);
  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text, justifyContent: 'center'}}>
      <div style={{marginLeft: 240, marginRight: 240, borderLeft: `6px solid ${theme.accent}`, paddingLeft: 44}}>
        <div style={{fontSize: 68, fontWeight: 700, lineHeight: 1.2, opacity: q}}>“{quote}”</div>
        <div style={{fontSize: 32, color: theme.muted, marginTop: 30, opacity: a}}>{attribution}</div>
      </div>
      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};
