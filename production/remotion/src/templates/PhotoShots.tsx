import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

/** Fotoğrafın kendi piksel koordinatlarında 16:9 kadraj. */
export type Frame = {x: number; y: number; w: number};

export type Shot = {
  /** Çekimin başladığı kare; bir sonraki çekim başlayınca sert kesme (detail cut). */
  from: number;
  /** Kadraj başlangıç → bitiş (yavaş pan / yaklaşma). Aynıysa sabit. */
  start: Frame;
  end: Frame;
};

export type PhotoShotsProps = {
  src: string;
  size: {width: number; height: number};
  shots: Shot[];
  /** Koyulaştırma (0 = yok). */
  dim?: number;
  /** Küçük/düşük çözünürlüklü görsel: kadraj yerine çerçeve içinde gösterilir (yükseklik px). */
  framed?: {height: number};
  label?: SourceLabelProps;
};

const ease = Easing.inOut(Easing.sin);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/**
 * Arşiv fotoğrafı için kadraj hareketi: çekim içinde yavaş pan/yaklaşma, çekimler arası detay kesmesi.
 * Fotoğrafın içeriği değiştirilmez; yalnız kadraj (ve isteğe bağlı koyulaştırma).
 */
export const PhotoShots: React.FC<PhotoShotsProps> = ({src, size, shots, dim = 0, framed, label}) => {
  const frame = useCurrentFrame();
  const {width: vw, height: vh, durationInFrames} = useVideoConfig();

  if (framed) {
    const z = interpolate(frame, [0, durationInFrames], [1, 1.04], clamp);
    const h = framed.height;
    const w = (size.width / size.height) * h;
    return (
      <AbsoluteFill style={{backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center'}}>
        <Img src={staticFile(src)} style={{width: w, height: h, transform: `scale(${z})`, boxShadow: '0 0 40px rgba(0,0,0,0.5)', filter: dim ? `brightness(${1 - dim})` : undefined}} />
        {label ? <SourceLabel {...label} /> : null}
      </AbsoluteFill>
    );
  }

  const idx = Math.max(0, shots.findIndex((s, i) => frame >= s.from && (i === shots.length - 1 || frame < shots[i + 1].from)));
  const shot = shots[idx];
  const shotEnd = idx < shots.length - 1 ? shots[idx + 1].from : durationInFrames;
  const t = interpolate(frame, [shot.from, shotEnd], [0, 1], {...clamp, easing: ease});
  const fx = shot.start.x + (shot.end.x - shot.start.x) * t;
  const fy = shot.start.y + (shot.end.y - shot.start.y) * t;
  const fw = shot.start.w + (shot.end.w - shot.start.w) * t;
  const scale = vw / fw;

  return (
    <AbsoluteFill style={{backgroundColor: theme.background, overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: size.width,
          height: size.height,
          transformOrigin: '0 0',
          transform: `translate(${-fx * scale}px, ${-fy * scale}px) scale(${scale})`,
          filter: dim ? `brightness(${1 - dim})` : undefined,
        }}
      />
      {label ? <SourceLabel {...label} /> : null}
      {/* Kadraj yüksekliği vh'yi aşmasın diye güvenlik: fw*9/16 kadraj fotoğraf dışına taşarsa arka plan görünür. */}
      <div style={{display: 'none'}}>{vh}</div>
    </AbsoluteFill>
  );
};
