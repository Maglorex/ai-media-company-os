import React from 'react';
import {useCurrentFrame} from 'remotion';
import {alpha, ramp} from '../anim';
import {color, layout, line, type} from '../tokens';
import {worlds} from '../worlds';

// CASE label (video-ui-spec-v1.md §1): sol alt, kutusuz; iki seviye hiyerarşi; ≈2,2 sn görünür.
// Hareket: accent çizgi alttan yukarı (8 kare) → case numarası 12 px kayarak (6) → başlık maskeyle soldan (10)
// → ölçek çizgisi (8) → bekle → hepsi 8 karede söner (çizgi en son). Bounce yok.

export type CaseLabelProps = {
  caseNumber: string; // "CASE 001"
  title: string; // "NS SAVANNAH"
  subtitle?: string; // kanıtla desteklenen tek satır
  wordmark?: string; // dizilmiş yazı, logo değil
  accent: string; // case accent (dikey çizgi)
  from?: number;
  hold?: number; // tam görünür kalma (kare)
  /** Statik proof karesi için animasyonu bu kareye sabitler. */
  freezeAt?: number;
};

export const CaseLabel: React.FC<CaseLabelProps> = ({caseNumber, title, subtitle, wordmark, accent, from = 0, hold = 30, freezeAt}) => {
  const frame = useCurrentFrame();
  const f = (freezeAt ?? frame) - from;
  if (f < 0) return null;
  const end = 32 + hold;
  const out = 1 - ramp(f, end, end + 8);
  const lineOut = 1 - ramp(f, end + 2, end + 10);
  if (lineOut <= 0) return null;
  const lineK = ramp(f, 0, 8);
  const numK = ramp(f, 8, 14);
  const titleK = ramp(f, 14, 24);
  const ruleK = ramp(f, 24, 32);
  const g = worlds.caseLayer.legibilityGradient;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: g.maxWidth,
          height: g.maxHeight,
          background: `radial-gradient(ellipse at 0% 100%, ${alpha(color.ink, g.to)} 0%, ${alpha(color.ink, g.from)} 72%)`,
          opacity: Math.min(lineK, out),
        }}
      />
      <div style={{position: 'absolute', left: layout.caseLabelLeft, bottom: layout.caseLabelBottom, display: 'flex', gap: 18}}>
        <div style={{width: line.accent, background: accent, transformOrigin: 'bottom', transform: `scaleY(${lineK})`, opacity: lineOut}} />
        <div style={{opacity: out}}>
          {wordmark ? (
            <div style={{...ts(type.sourceMark), color: color.iron, opacity: numK, marginBottom: 6}}>{wordmark}</div>
          ) : null}
          <div style={{...ts(type.caseNumber), color: color.iron, opacity: numK, transform: `translateX(${(1 - numK) * -12}px)`}}>{caseNumber}</div>
          <div style={{...ts(type.caseTitle), color: color.paper, clipPath: `inset(0 ${(1 - titleK) * 100}% 0 0)`, whiteSpace: 'nowrap'}}>{title}</div>
          <div style={{display: 'flex', alignItems: 'flex-end', marginTop: 8, marginBottom: 10, width: 440, transformOrigin: 'left', transform: `scaleX(${ruleK})`}}>
            <div style={{flex: 1, height: line.hairline, background: color.iron}} />
            {[0, 1, 2].map((k) => (
              <div key={k} style={{width: line.hairline, height: 7, background: color.iron, marginLeft: 8}} />
            ))}
          </div>
          {subtitle ? <div style={{...ts(type.caseSub), color: color.iron, opacity: ruleK}}>{subtitle}</div> : null}
        </div>
      </div>
    </>
  );
};

type T = (typeof type)[keyof typeof type];
export const ts = (t: T): React.CSSProperties => ({
  fontFamily: t.family,
  fontSize: t.size,
  fontWeight: t.weight,
  letterSpacing: t.tracking,
  textTransform: t.upper ? 'uppercase' : 'none',
  lineHeight: 1.12,
});
