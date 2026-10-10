import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

export type LoadBlock = {
  label: string;
  /** Blok yüksekliği bu değerlerle orantılı (ör. yıllık maliyet). Ekranda sayı yazılmaz. */
  value: number;
  /** Kaynak bu kalemin birden fazla birime yayılabileceğini söylüyorsa true. */
  shareable: boolean;
  color: string;
};

export type Caption = {
  from: number;
  title: string;
  detail?: string;
  /** Başlıkta vurgu rengiyle yazılacak kelime (ör. kaynaktaki "several"). */
  emphasis?: string;
};

export type LoadShareProps = {
  unitLabel: string;
  /** Kesik çizgili varsayımsal birimlerin etiketi. */
  ghostLabel: string;
  /** Alttan üste sıralı. */
  blocks: LoadBlock[];
  /** Paylaşılabilir blokların yayılmaya başladığı kare. */
  spreadFrom: number;
  /** Tek birime geri döndüğü kare (opsiyonel). */
  returnFrom?: number;
  captions: Caption[];
  label?: SourceLabelProps;
};

const MOVE = 50;
const SHIP_X = 240;
const SHIP_W = 440;
const WATER_Y = 830;
const STACK_BOTTOM = 712;
const STACK_HEIGHT = 340;
// Yayılınca blok incelir: aynı gider daha geniş tabana dağılır ("birim başı daha düşük").
// Oran yalnız görsel; kaynak bir oran vermez.
const SPREAD_THIN = 0.6;
const GHOST_GAP = 480;
const GHOSTS = 4;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = Easing.inOut(Easing.cubic);

/**
 * Tek birimin üstüne binen destek yapısı → aynı yapının birden fazla birime yayılabileceği.
 * Varsayımsal birimler kesik çizgili ve sağa doğru solar: sayılamaz, kesin sayı ima edilmez.
 */
export const LoadShare: React.FC<LoadShareProps> = ({
  unitLabel,
  ghostLabel,
  blocks,
  spreadFrom,
  returnFrom,
  captions,
  label,
}) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [spreadFrom, spreadFrom + MOVE], [0, 1], {...clamp, easing: ease});
  const back = returnFrom === undefined ? 0 : interpolate(frame, [returnFrom, returnFrom + MOVE], [0, 1], {...clamp, easing: ease});
  const spread = out * (1 - back);

  const total = blocks.reduce((s, b) => s + b.value, 0);
  const spreadWidth = 1920 - SHIP_X + 200; // sağ kenarın ötesine uzanır
  let y = STACK_BOTTOM;
  const laid = blocks.map((b) => {
    const h0 = (b.value / total) * STACK_HEIGHT;
    const h = b.shareable ? h0 * (1 - (1 - SPREAD_THIN) * spread) : h0;
    const w = b.shareable ? SHIP_W + (spreadWidth - SHIP_W) * spread : SHIP_W;
    y -= h;
    return {...b, top: y, h, w};
  });

  const ghostsIn = interpolate(frame, [spreadFrom, spreadFrom + MOVE * 0.6], [0, 1], clamp) * (1 - back);

  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text}}>
      {/* Su çizgisi */}
      <div style={{position: 'absolute', left: 0, top: WATER_Y, width: 1920, height: 2, backgroundColor: theme.muted, opacity: 0.3}} />

      {/* Varsayımsal birimler */}
      {ghostsIn > 0
        ? Array.from({length: GHOSTS}, (_, k) => k + 1).map((n) => (
            <div key={n} style={{position: 'absolute', left: SHIP_X + n * GHOST_GAP, top: WATER_Y - 120, opacity: ghostsIn}}>
              <Ship ghost />
            </div>
          ))
        : null}
      {ghostsIn > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: SHIP_X + GHOST_GAP,
            top: WATER_Y + 24,
            fontSize: 28,
            color: theme.muted,
            opacity: ghostsIn,
            fontStyle: 'italic',
          }}
        >
          {ghostLabel}
        </div>
      ) : null}

      {/* Destek blokları */}
      {laid.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: SHIP_X,
            top: b.top,
            width: b.w,
            height: Math.max(0, b.h - 4),
            backgroundColor: b.color,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 18,
            boxSizing: 'border-box',
            fontSize: 26,
            fontWeight: 600,
            color: theme.background,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {b.h >= 30 ? b.label : null}
        </div>
      ))}

      {/* Solma: ilk varsayımsal gemiden sonrası giderek kaybolur; yapının ve gemilerin sonu görünmez, sayı ima edilmez. */}
      <div
        style={{
          position: 'absolute',
          left: SHIP_X + GHOST_GAP + SHIP_W * 0.6,
          top: 0,
          width: 1920,
          height: 1080,
          background: `linear-gradient(to right, transparent, ${theme.background} 45%)`,
        }}
      />

      {/* Asıl birim */}
      <div style={{position: 'absolute', left: SHIP_X, top: WATER_Y - 120}}>
        <Ship />
      </div>
      <div style={{position: 'absolute', left: SHIP_X, top: WATER_Y + 24, fontSize: 32, fontWeight: 600}}>{unitLabel}</div>

      <Captions captions={captions} />
      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};

const Captions: React.FC<{captions: Caption[]}> = ({captions}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {captions.map((c, i) => {
        const next = captions[i + 1];
        const fadeIn = interpolate(frame, [c.from, c.from + 15], [0, 1], clamp);
        const fadeOut = next ? interpolate(frame, [next.from - 10, next.from + 5], [1, 0], clamp) : 1;
        const opacity = Math.min(fadeIn, fadeOut);
        if (opacity <= 0) return null;
        const parts = c.emphasis ? c.title.split(c.emphasis) : [c.title];
        return (
          <div key={i} style={{position: 'absolute', left: SHIP_X, top: 110, opacity, maxWidth: 1440}}>
            <div style={{fontSize: 52, fontWeight: 700}}>
              {parts.map((p, j) => (
                <span key={j}>
                  {p}
                  {j < parts.length - 1 ? <span style={{color: theme.accent}}>{c.emphasis}</span> : null}
                </span>
              ))}
            </div>
            {c.detail ? <div style={{fontSize: 30, color: theme.muted, marginTop: 10}}>{c.detail}</div> : null}
          </div>
        );
      })}
    </>
  );
};

/** Sade, genel kargo gemisi silueti (açıklayıcı çizim; belirli bir geminin teknik çizimi değil). */
const Ship: React.FC<{ghost?: boolean}> = ({ghost}) => {
  const stroke = ghost ? theme.muted : 'none';
  const fill = ghost ? 'none' : theme.muted;
  const common = {stroke, strokeWidth: 3, strokeDasharray: ghost ? '10 8' : undefined, fill};
  return (
    <svg width={SHIP_W} height={124} viewBox="0 0 440 124">
      {/* Gövde */}
      <path d="M0 64 L440 64 L410 120 L30 120 Z" {...common} />
      {/* Üst yapı (orta-kıç) */}
      <rect x={250} y={28} width={90} height={36} {...common} />
      <rect x={272} y={6} width={46} height={22} {...common} />
      {/* Direk */}
      <rect x={110} y={20} width={6} height={44} {...common} />
    </svg>
  );
};
