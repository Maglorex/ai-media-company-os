import {AbsoluteFill, Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {SourceLabel} from '../../templates/SourceLabel';
import {theme} from '../../theme';
import {syncedClips} from './synced';
import {beats, BeatId, VO_FPS, VO_TOTAL_S} from './voCues';

// P3 animatic: tüm SYNC klipleri beat başlangıçlarında + VO. Yalnız senkron kontrolü içindir (final render değil).
// Fotoğraf beat'leri burada geçici yavaş yaklaşmayla gösterilir; final hareket Premiere'de (plan §1).

export const ANIMATIC_FRAMES = Math.ceil(VO_TOTAL_S * VO_FPS);

const photos: {beat: BeatId; src: string; label: string}[] = [
  {beat: 'b01', src: 'photos/V-19_rotterdam_1964-09-30_cc0.jpg', label: 'Rotterdam, 1964 · Nationaal Archief / Anefo (CC0)'},
  {beat: 'b06', src: 'photos/V-07_launch_marad.jpg', label: 'Launch · Maritime Administration (public domain)'},
  {beat: 'b08', src: 'photos/V-21_panama-canal_1962_cc0.jpg', label: 'Panama Canal, 1962 · MAS Antwerpen (CC0)'},
  {beat: 'b28', src: 'photos/V-05_nara-542141_golden-gate_1962.jpg', label: 'Photo: AEC / National Archives · 1962'},
];

const f = (b: BeatId) => Math.round(beats[b].start * VO_FPS);
const len = (b: BeatId) => Math.round((beats[b].end - beats[b].start) * VO_FPS);

const Photo: React.FC<{src: string; label: string; dark?: boolean}> = ({src, label, dark}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const z = interpolate(frame, [0, durationInFrames], [1, 1.08]);
  return (
    <AbsoluteFill style={{backgroundColor: theme.background}}>
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${z})`, filter: dark ? 'brightness(0.6)' : undefined}} />
      <SourceLabel text={label} position="bottom-left" from={5} />
    </AbsoluteFill>
  );
};

const Stamp: React.FC = () => {
  const frame = useCurrentFrame();
  const s = frame / VO_FPS;
  const id = (Object.keys(beats) as BeatId[]).filter((b) => beats[b].start <= s).pop();
  return (
    <div style={{position: 'absolute', right: 24, top: 18, fontFamily: 'monospace', fontSize: 26, color: '#ffffffcc', background: '#000a', padding: '4px 10px'}}>
      ANIMATIC · {Math.floor(s / 60)}:{String(Math.floor(s % 60)).padStart(2, '0')} · {id}
    </div>
  );
};

export const P3Animatic: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: theme.background}}>
    {photos.map((p) => (
      <Sequence key={p.beat} from={f(p.beat)} durationInFrames={len(p.beat)}>
        <Photo src={p.src} label={p.label} dark={p.beat === 'b28'} />
      </Sequence>
    ))}
    {syncedClips.map((c) => (
      <Sequence key={c.id} from={f(c.beat)} durationInFrames={c.durationInFrames}>
        <c.component {...(c.props ?? {})} />
      </Sequence>
    ))}
    {/* b23 Q-02 belgesi tek gemi klibinin üstünde (üst iz) */}
    {syncedClips.filter((c) => c.beat === 'b23').map((c) => (
      <Sequence key={`${c.id}-top`} from={f('b23')} durationInFrames={len('b23')}>
        <c.component {...(c.props ?? {})} />
      </Sequence>
    ))}
    <Audio src={staticFile('vo/P3_VO_full_v1_LISTEN.mp3')} />
    <Stamp />
  </AbsoluteFill>
);
