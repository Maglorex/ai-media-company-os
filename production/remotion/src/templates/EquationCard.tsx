import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

export type EquationTerm = {
  /** Kutudaki ana metin (ör. "about $2.9 million a year"). Tutar kaynakta yoksa yazılmaz. */
  value?: string;
  /** Terimin ne olduğu, kaynağın ifadesiyle. */
  text: string;
  from: number;
  emphasis?: boolean;
};

export type EquationCardProps = {
  title: string;
  subtitle?: string;
  /** Terimler ve aralarındaki işaretler: operators.length === terms.length - 1 (ör. ['−', '=']). */
  terms: EquationTerm[];
  operators: string[];
  /** Altta kalıcı not (ör. "A comparison, not a loss"). */
  note?: {text: string; from: number};
  /** Altta küçük açıklama satırları (ör. sübvansiyon kalemleri). */
  footnote?: {text: string; from: number};
  label?: SourceLabelProps;
};

const LEFT = 160;
const RIGHT = 1760;
const TOP = 360;
const BOX_H = 260;
const OP_W = 90;
const FADE = 15;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/**
 * Sade "denklem" kartı: kaynağın tanımladığı ilişkiyi (A − B = C) terim terim kurar.
 * Ölçek yoktur; kutular eşit boydadır, büyüklük ima etmez.
 */
export const EquationCard: React.FC<EquationCardProps> = ({title, subtitle, terms, operators, note, footnote, label}) => {
  const frame = useCurrentFrame();
  const appear = (from: number) => interpolate(frame, [from, from + FADE], [0, 1], clamp);
  const boxW = (RIGHT - LEFT - OP_W * operators.length) / terms.length;
  const x = (i: number) => LEFT + i * (boxW + OP_W);

  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text}}>
      <div style={{position: 'absolute', left: LEFT, top: 110, opacity: appear(0)}}>
        <div style={{fontSize: 54, fontWeight: 700}}>{title}</div>
        {subtitle ? <div style={{fontSize: 30, color: theme.muted, marginTop: 8}}>{subtitle}</div> : null}
      </div>

      {terms.map((t, i) => (
        <div key={i}>
          <div
            style={{
              position: 'absolute',
              left: x(i),
              top: TOP,
              width: boxW,
              height: BOX_H,
              boxSizing: 'border-box',
              border: `2px solid ${t.emphasis ? theme.accent : theme.series[2]}`,
              borderTop: `6px solid ${t.emphasis ? theme.accent : theme.series[0]}`,
              padding: '22px 24px',
              opacity: appear(t.from),
            }}
          >
            {t.value ? (
              <div style={{fontSize: 40, fontWeight: 700, color: t.emphasis ? theme.accent : theme.text, lineHeight: 1.15}}>{t.value}</div>
            ) : null}
            <div style={{fontSize: t.value ? 26 : 32, fontWeight: t.value ? 400 : 700, color: t.value ? theme.muted : theme.text, marginTop: t.value ? 12 : 0, lineHeight: 1.3}}>
              {t.text}
            </div>
          </div>
          {i < operators.length ? (
            <div
              style={{
                position: 'absolute',
                left: x(i) + boxW,
                top: TOP,
                width: OP_W,
                height: BOX_H,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 64,
                color: theme.muted,
                opacity: appear(terms[i + 1].from),
              }}
            >
              {operators[i]}
            </div>
          ) : null}
        </div>
      ))}

      {note ? (
        <div style={{position: 'absolute', left: LEFT, top: TOP + BOX_H + 50, fontSize: 40, fontWeight: 700, color: theme.accent, opacity: appear(note.from)}}>
          {note.text}
        </div>
      ) : null}
      {footnote ? (
        <div style={{position: 'absolute', left: LEFT, top: TOP + BOX_H + (note ? 120 : 50), width: RIGHT - LEFT, fontSize: 26, color: theme.muted, lineHeight: 1.35, opacity: appear(footnote.from)}}>
          {footnote.text}
        </div>
      ) : null}

      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};
