import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

export type SourceLabelProps = {
  /** Ana satır, ör. "GAO report B-136209, p. 2 (1970)". */
  text: string;
  /** Opsiyonel ikinci satır, ör. "U.S. General Accounting Office". */
  detail?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** Görünmeye başladığı kare. */
  from?: number;
  /** Kaybolmaya başladığı kare; verilmezse sahne sonuna kadar kalır. */
  until?: number;
};

// Ekranın %5'i: YouTube arayüzü ve TV kenar kırpmasından güvenli alan.
const SAFE_MARGIN = 56;
const FADE = 12;

/**
 * Sade kaynak etiketi. Arşiv görüntüsünün nereden geldiğini söyler; dekoratif değildir.
 * Tek başına (şeffaf arka planlı ProRes 4444) veya başka bir şablonun içinde kullanılır.
 */
export const SourceLabel: React.FC<SourceLabelProps> = ({
  text,
  detail,
  position = 'bottom-left',
  from = 0,
  until,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [from, from + FADE], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut =
    until === undefined
      ? 1
      : interpolate(frame, [until, until + FADE], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const opacity = Math.min(fadeIn, fadeOut);
  if (opacity <= 0) return null;

  const [vertical, horizontal] = position.split('-') as ['top' | 'bottom', 'left' | 'right'];

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          [vertical]: SAFE_MARGIN,
          [horizontal]: SAFE_MARGIN,
          opacity,
          maxWidth: 900,
          backgroundColor: theme.labelBackground,
          borderLeft: `4px solid ${theme.accent}`,
          borderRadius: 4,
          padding: '12px 20px',
          fontFamily: theme.fontFamily,
          color: theme.text,
          textAlign: 'left',
        }}
      >
        <div style={{fontSize: 30, fontWeight: 600, lineHeight: 1.25}}>{text}</div>
        {detail ? (
          <div style={{fontSize: 24, color: theme.muted, marginTop: 4, lineHeight: 1.25}}>{detail}</div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
