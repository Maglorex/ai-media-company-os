import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ramp} from '../anim';
import {color, layout, line, type} from '../tokens';
import {ts} from './CaseLabel';

// EVIDENCE modülü (video-ui-spec-v1.md §2): belge sayfasının sol üst köşesine bağlı (ekrana değil), 24 px dışarıda.
// Numara = evidence ledger satırı (handoff eşleme tablosu zorunlu). Damga/VERIFIED yok.
// Source Mark: numarasız kaynak (ör. NPS, grafik köşesi), font.meta 16 px, iron, çerçevesiz.

export type EvidenceLabelProps = {
  n: number; // ledger eşleme tablosundaki ekran numarası
  source: string; // "GAO · 1970 · p.1"
  /** Bağlı olduğu sayfanın ekran koordinatı (sol üst) ve genişliği. */
  pageX: number;
  pageY: number;
  pageWidth: number;
  from?: number;
  freezeAt?: number;
};

export const EvidenceLabel: React.FC<EvidenceLabelProps> = ({n, source, pageX, pageY, pageWidth, from = 0, freezeAt}) => {
  const frame = useCurrentFrame();
  const f = (freezeAt ?? frame) - from;
  if (f < 0) return null;
  const mod = ramp(f, 0, 6);
  const txt = ramp(f, 4, 12);
  const m = layout.evidenceModule;
  const top = pageY - layout.evidenceOffset - m;
  return (
    <>
      <div style={{position: 'absolute', left: pageX, top, display: 'flex', alignItems: 'center', gap: 14, whiteSpace: 'nowrap'}}>
        <div
          style={{
            width: m,
            height: m,
            boxShadow: `inset 0 0 0 ${line.hairline}px ${color.iron}`,
            clipPath: `inset(0 ${(1 - mod) * 100}% 0 0)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...ts(type.evidence),
            letterSpacing: '0.04em',
            color: color.paper,
          }}
        >
          {String(n).padStart(2, '0')}
        </div>
        <div style={{...ts(type.evidence), color: color.iron, opacity: txt}}>EVIDENCE</div>
        <div style={{...ts(type.evidence), letterSpacing: '0.1em', color: color.paper, opacity: txt}}>· {source}</div>
      </div>
      <div style={{position: 'absolute', left: pageX, top: pageY - layout.evidenceOffset / 2, width: pageWidth * 0.4 * mod, height: line.hairline, background: color.iron}} />
    </>
  );
};

export const SourceMark: React.FC<{text: string; x: number; y: number; align?: 'left' | 'right'; opacity?: number}> = ({text, x, y, align = 'left', opacity = 1}) => (
  <div style={{position: 'absolute', ...(align === 'left' ? {left: x} : {right: x}), top: y, ...ts(type.sourceMark), color: color.iron, opacity, whiteSpace: 'nowrap'}}>{text}</div>
);
