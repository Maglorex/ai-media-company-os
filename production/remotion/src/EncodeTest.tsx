import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from './theme';

// Onboarding kodlama testi (plan §7 adım 8): hareketli metin + vurgu çubuğu, 10 sn.
export const EncodeTest: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const opacity = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp'});
  const barWidth = interpolate(frame, [30, 120], [0, 900], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const seconds = (frame / 30).toFixed(1);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        fontFamily: theme.fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{opacity, fontSize: 96, fontWeight: 700}}>Company OS</div>
      <div style={{height: 12, width: barWidth, backgroundColor: theme.accent, marginTop: 24}} />
      <div style={{fontSize: 40, color: theme.muted, marginTop: 32}}>
        Render test · {seconds}s / {durationInFrames / 30}s
      </div>
    </AbsoluteFill>
  );
};
