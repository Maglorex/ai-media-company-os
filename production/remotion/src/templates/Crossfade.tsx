import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';

export type CrossfadeProps = {
  /** İlk sahne ve süresi (kare). */
  a: React.ReactNode;
  aDuration: number;
  b: React.ReactNode;
  /** Geçiş süresi (kare); b, a bitmeden bu kadar önce başlar. */
  overlap?: number;
};

/**
 * İki sahne arasında sade çapraz geçiş. Montajda Premiere'de de aynı geçiş yapılabilir;
 * bu bileşen sahnelerin birlikte nasıl okunduğunu Remotion içinde kontrol etmek için.
 */
export const Crossfade: React.FC<CrossfadeProps> = ({a, aDuration, b, overlap = 15}) => {
  const frame = useCurrentFrame();
  const bStart = aDuration - overlap;
  const bOpacity = interpolate(frame, [bStart, aDuration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={aDuration}>{a}</Sequence>
      <Sequence from={bStart}>
        <AbsoluteFill style={{opacity: bOpacity}}>{b}</AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
