import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

/** Belge görüntüsünün kendi piksel koordinatlarında dikdörtgen. */
export type Region = {x: number; y: number; w: number; h: number};

export type CameraStep = {
  /** Harekete başladığı kare. */
  from: number;
  /** Hareketin süresi (kare). */
  duration: number;
  /** Hedef alan; verilmezse tam sayfa. */
  region?: Region;
};

export type Highlight = {
  /** Ardışık satırlarda alanlar üst üste binmemeli; binerse kesişim koyu şerit olarak görünür. */
  region: Region;
  /** Vurgunun çizilmeye başladığı kare. */
  from: number;
  /** Soldan sağa çizim süresi (kare). Varsayılan 20. */
  duration?: number;
  /** Kaybolmaya başladığı kare; verilmezse kalır. */
  until?: number;
  /** marker: yarı saydam fosforlu kalem · outline: çerçeve (tablo/şekil için). */
  style?: 'marker' | 'outline';
};

export type DocumentHighlightProps = {
  /** Public klasöre göre görüntü yolu (render'da --public-dir ile verilir). */
  src: string;
  /** Görüntünün piksel boyutu; koordinatlar bu boyuta göredir. */
  pageSize: {width: number; height: number};
  /** Kamera adımları; ilk adımdan önce tam sayfa görünür. */
  camera?: CameraStep[];
  highlights?: Highlight[];
  /** Vurgulu satırlar dışındaki alanın kararma oranı (0 = yok; 0.25–0.3 önerilir, dramatik değil açıklayıcı). */
  dimOthers?: number;
  /** Kadraj kenar payı (ekranın oranı). */
  padding?: number;
  label?: SourceLabelProps;
  /**
   * Opsiyonel bulanıklık (rack focus): sayfa [start, end] karelerinde `from` → `to` piksel bulanıklığa geçer.
   * Ör. S1 teaser'da sabit bulanık (from = to), S5'te bulanıktan nete. Metin değiştirilmez, yalnız odak.
   */
  blur?: {from: number; to: number; start: number; end: number};
};

const FADE = 10;
const ease = Easing.inOut(Easing.cubic);

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/**
 * Gerçek belge sayfasını gösterir; yalnız kamera (zoom/pan), vurgu ve kaynak etiketi ekler.
 * Belge görüntüsünün kendisi hiçbir koşulda değiştirilmez: vurgular ayrı, yarı saydam bir katmandır
 * ve "multiply" karışımıyla çizildiği için siyah metin olduğu gibi okunur.
 */
export const DocumentHighlight: React.FC<DocumentHighlightProps> = ({
  src,
  pageSize,
  camera = [],
  highlights = [],
  dimOthers = 0,
  padding = 0.08,
  label,
  blur,
}) => {
  const frame = useCurrentFrame();
  const {width: vw, height: vh} = useVideoConfig();

  const full: Region = {x: 0, y: 0, w: pageSize.width, h: pageSize.height};
  const fit = (r: Region) => {
    const scale = Math.min((vw * (1 - 2 * padding)) / r.w, (vh * (1 - 2 * padding)) / r.h);
    return {scale, cx: r.x + r.w / 2, cy: r.y + r.h / 2};
  };

  // Kamera: her adım, bir önceki kadrajdan yeni kadraja yumuşak geçer.
  // Ölçek logaritmik uzayda enterpole edilir; zoom hızı sabit hissedilir.
  let view = fit(full);
  for (const step of camera) {
    if (frame < step.from) break;
    const target = fit(step.region ?? full);
    const t = interpolate(frame, [step.from, step.from + step.duration], [0, 1], {...clamp, easing: ease});
    view = {
      scale: Math.exp(Math.log(view.scale) + (Math.log(target.scale) - Math.log(view.scale)) * t),
      cx: view.cx + (target.cx - view.cx) * t,
      cy: view.cy + (target.cy - view.cy) * t,
    };
  }
  const tx = vw / 2 - view.cx * view.scale;
  const ty = vh / 2 - view.cy * view.scale;

  const active = highlights
    .map((h) => {
      const draw = interpolate(frame, [h.from, h.from + (h.duration ?? 20)], [0, 1], {
        ...clamp,
        easing: Easing.out(Easing.quad),
      });
      const fade = h.until === undefined ? 1 : interpolate(frame, [h.until, h.until + FADE], [1, 0], clamp);
      return {...h, draw, fade};
    })
    .filter((h) => h.draw > 0 && h.fade > 0);

  // Kararma, ilk vurguyla birlikte yavaşça gelir; vurgu yokken sayfa tam parlaklıktadır.
  const dimStrength = dimOthers * Math.max(0, ...active.map((h) => Math.min(h.draw * 2, 1) * h.fade));

  return (
    <AbsoluteFill style={{backgroundColor: theme.background, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: pageSize.width,
          height: pageSize.height,
          transformOrigin: '0 0',
          transform: `translate(${tx}px, ${ty}px) scale(${view.scale})`,
          filter: blur ? `blur(${interpolate(frame, [blur.start, blur.end], [blur.from, blur.to], {...clamp, easing: ease})}px)` : undefined,
          boxShadow: '0 0 40px rgba(0,0,0,0.45)',
        }}
      >
        <Img src={staticFile(src)} style={{width: pageSize.width, height: pageSize.height, display: 'block'}} />

        {active.map((h, i) =>
          (h.style ?? 'marker') === 'marker' ? (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: h.region.x,
                top: h.region.y,
                width: h.region.w * h.draw,
                height: h.region.h,
                backgroundColor: theme.highlight,
                mixBlendMode: 'multiply',
                opacity: h.fade,
              }}
            />
          ) : (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: h.region.x,
                top: h.region.y,
                width: h.region.w,
                height: h.region.h,
                border: `${4 / view.scale}px solid ${theme.accent}`,
                opacity: h.draw * h.fade,
              }}
            />
          ),
        )}

        {dimStrength > 0 ? (
          <svg
            width={pageSize.width}
            height={pageSize.height}
            style={{position: 'absolute', left: 0, top: 0}}
          >
            <defs>
              <mask id="dh-dim">
                <rect width={pageSize.width} height={pageSize.height} fill="white" />
                {/* Açıklık vurguyla birlikte ilerler; satır, kalem geçtikçe aydınlanır. */}
                {active.map((h, i) => (
                  <rect
                    key={i}
                    x={h.region.x}
                    y={h.region.y}
                    width={(h.style ?? 'marker') === 'marker' ? h.region.w * h.draw : h.region.w}
                    height={h.region.h}
                    fill="black"
                  />
                ))}
              </mask>
            </defs>
            <rect
              width={pageSize.width}
              height={pageSize.height}
              fill={theme.background}
              opacity={dimStrength}
              mask="url(#dh-dim)"
            />
          </svg>
        ) : null}
      </div>

      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};
