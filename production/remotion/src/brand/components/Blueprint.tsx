import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha} from '../anim';
import {color, line, type} from '../tokens';
import {worlds} from '../worlds';
import {ts} from './CaseLabel';

// Engineering World zemini ve çizgi dili (video-ui-spec-v1.md §3): ink → steel gradyan, iron grid %8 / 80 px,
// çok hafif yüzey dokusu; ölçek cetveli yalnız gerçek ölçü/konum varsa.

export const EngineeringGround: React.FC<{grid?: boolean}> = ({grid = true}) => {
  const g = worlds.engineering.grid;
  return (
    <AbsoluteFill style={{background: `linear-gradient(160deg, ${color.ink} 0%, ${color.steel} 135%)`}}>
      <AbsoluteFill style={{opacity: worlds.engineering.surfaceTexture.min, backgroundImage: `repeating-linear-gradient(100deg, ${color.paper} 0 1px, transparent 1px 6px)`}} />
      {grid ? (
        <AbsoluteFill
          style={{
            backgroundImage: `linear-gradient(${alpha(color.iron, g.opacity)} ${g.width}px, transparent ${g.width}px), linear-gradient(90deg, ${alpha(color.iron, g.opacity)} ${g.width}px, transparent ${g.width}px)`,
            backgroundSize: `${g.spacing}px ${g.spacing}px`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

/** Ölçek cetveli: 1 px iron çizgi + eşit tikler + etiket (yalnız gerçek ölçü). */
export const ScaleRule: React.FC<{x: number; y: number; width: number; ticks: number; label: string}> = ({x, y, width, ticks, label}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <svg width={width + 2} height={14} style={{display: 'block'}}>
      <line x1={0.5} y1={7} x2={width + 0.5} y2={7} stroke={color.iron} strokeWidth={line.hairline} />
      {Array.from({length: ticks + 1}).map((_, k) => {
        const tx = 0.5 + (k * width) / ticks;
        return <line key={k} x1={tx} y1={1} x2={tx} y2={13} stroke={color.iron} strokeWidth={line.hairline} />;
      })}
    </svg>
    <div style={{...ts(type.sourceMark), fontSize: 14, color: color.iron, marginTop: 6}}>{label}</div>
  </div>
);
