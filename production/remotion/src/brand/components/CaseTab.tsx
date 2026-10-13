import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ramp} from '../anim';
import {color, layout, line, type} from '../tokens';
import {ts} from './CaseLabel';

// Case Tab (video-ui-spec-v1.md §4): `03 · GALVESTON FACILITY` — üst sol, numaralı modül + font.display 40 px; ≤2 sn; hikâye durmaz.

export const CaseTab: React.FC<{n: number; title: string; from?: number; hold?: number; freezeAt?: number}> = ({n, title, from = 0, hold = 36, freezeAt}) => {
  const frame = useCurrentFrame();
  const f = (freezeAt ?? frame) - from;
  if (f < 0) return null;
  const inK = ramp(f, 0, 10);
  const out = 1 - ramp(f, 10 + hold, 18 + hold);
  if (out <= 0) return null;
  const m = layout.evidenceModule + 8;
  return (
    <div style={{position: 'absolute', left: layout.caseLabelLeft, top: 80, display: 'flex', alignItems: 'center', gap: 18, opacity: out}}>
      <div
        style={{
          width: m,
          height: m,
          boxShadow: `inset 0 0 0 ${line.hairline}px ${color.iron}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...ts(type.evidence),
          fontSize: 20,
          letterSpacing: '0.04em',
          color: color.paper,
          opacity: inK,
        }}
      >
        {String(n).padStart(2, '0')}
      </div>
      <div style={{...ts(type.caseTab), color: color.paper, clipPath: `inset(0 ${(1 - inK) * 100}% 0 0)`, whiteSpace: 'nowrap'}}>{title}</div>
    </div>
  );
};
