import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BRAND_FACES, useBrandFonts} from './fonts';
import {color, font, layout, line, type, weight} from './tokens';
import {worlds} from './worlds';

// Brand-Tokens-Proof: genel sistem proof'u (video/dava içeriği yok). Token'lar, fontlar ve dört görsel dünya tek karede.
// Örnek metinler yer tutucudur (CASE 000 · SAMPLE); gerçek kanıt/belge metni kullanılmaz.

type T = (typeof type)[keyof typeof type];
const ts = (t: T): React.CSSProperties => ({
  fontFamily: t.family,
  fontSize: t.size,
  fontWeight: t.weight,
  letterSpacing: t.tracking,
  textTransform: t.upper ? 'uppercase' : 'none',
  lineHeight: 1.15,
});

const Specimen: React.FC = () => {
  const rows: {role: string; family: string; w: number; italic?: boolean; size: number; text: string}[] = [
    {role: 'font.display · Bold 700', family: font.display, w: weight.bold, size: 54, text: 'CASE TITLE · 1962'},
    {role: 'font.display · SemiBold 600', family: font.display, w: weight.semibold, size: 40, text: 'Section heading 03'},
    {role: 'font.display · Medium 500', family: font.display, w: weight.medium, size: 32, text: 'Medium weight $1,234,567'},
    {role: 'font.display · Regular 400', family: font.display, w: weight.regular, size: 32, text: 'Regular weight 0123456789'},
    {role: 'font.meta · Medium 500', family: font.meta, w: weight.medium, size: 24, text: 'EVIDENCE · SOURCE · YEAR'},
    {role: 'font.meta · Regular 400', family: font.meta, w: weight.regular, size: 24, text: 'SOURCE MARK p.00'},
    {role: 'font.meta · Bold 700', family: font.meta, w: weight.bold, size: 24, text: 'BOLD META 00:00'},
    {role: 'font.editorial · Regular 400', family: font.editorial, w: weight.regular, size: 32, text: 'Editorial quotation, re-set'},
    {role: 'font.editorial · Italic 400', family: font.editorial, w: weight.regular, italic: true, size: 32, text: 'Editorial italic for emphasis'},
    {role: 'font.editorial · Semibold 600 / Bold 700', family: font.editorial, w: weight.semibold, size: 32, text: 'Semibold serif'},
  ];
  return (
    <div style={{position: 'absolute', left: 60, top: 92, width: 1060}}>
      {rows.map((r) => (
        <div key={r.role} style={{display: 'flex', alignItems: 'baseline', height: 41}}>
          <div style={{width: 330, ...ts(type.sourceMark), fontSize: 15, color: color.iron}}>{r.role}</div>
          <div style={{fontFamily: r.family, fontWeight: r.w, fontStyle: r.italic ? 'italic' : 'normal', fontSize: r.size * 0.72, color: color.paper, whiteSpace: 'nowrap'}}>
            {r.text}
            {r.family === font.editorial && r.w === weight.semibold ? <span style={{fontWeight: weight.bold}}> · Bold serif</span> : null}
          </div>
        </div>
      ))}
    </div>
  );
};

const Swatches: React.FC = () => {
  const items: [string, string][] = [
    ['ink', color.ink],
    ['paper', color.paper],
    ['steel', color.steel],
    ['iron', color.iron],
    ['accent.brand', color.accentBrand],
  ];
  return (
    <div style={{position: 'absolute', left: 1180, top: 100, width: 680}}>
      <div style={{display: 'flex', gap: 14}}>
        {items.map(([n, c]) => (
          <div key={n} style={{width: 122}}>
            <div style={{height: 110, background: c, border: `${line.hairline}px solid ${color.iron}`}} />
            <div style={{...ts(type.sourceMark), fontSize: 14, color: color.paper, marginTop: 8}}>{n}</div>
            <div style={{...ts(type.sourceMark), fontSize: 14, color: color.iron}}>{c}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop: 22, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 122, height: 40, border: `${line.hairline}px dashed ${color.iron}`}} />
        <div style={{...ts(type.sourceMark), fontSize: 14, color: color.iron}}>accent.case · set per video (not in this proof)</div>
      </div>
      <div style={{marginTop: 18, ...ts(type.sourceMark), fontSize: 14, color: color.iron, lineHeight: 1.5}}>
        RULE · ONE ACCENT FOCUS PER FRAME (ACCENT.BRAND OR ACCENT.CASE)
      </div>
    </div>
  );
};

const FontCheck: React.FC = () => {
  // Fontlar useBrandFonts ile yüklendi; burada her yüzün belge font kümesinde gerçekten bulunduğu yazdırılır.
  const ok = BRAND_FACES.map((f) => document.fonts.check(`${f.style} ${f.weight} 20px "${f.family}"`));
  return (
    <div style={{position: 'absolute', left: 1180, top: 372, width: 680, ...ts(type.sourceMark), fontSize: 13, color: color.iron, lineHeight: 1.33}}>
      <div style={{color: color.paper}}>FONT CHECK · LOCAL BINDING · NO FALLBACK</div>
      {BRAND_FACES.map((f, i) => (
        <div key={f.label}>
          {ok[i] ? 'PASS' : 'FAIL'} · {f.label}
        </div>
      ))}
    </div>
  );
};

const TILE = {w: 435, h: 455, top: 600};
const Tile: React.FC<{i: number; title: string; children: React.ReactNode}> = ({i, title, children}) => (
  <div style={{position: 'absolute', left: 60 + i * (TILE.w + 20), top: TILE.top, width: TILE.w, height: TILE.h}}>
    <div style={{...ts(type.sourceMark), fontSize: 15, color: color.paper, marginBottom: 10}}>
      {String(i + 1).padStart(2, '0')} · {title}
    </div>
    <div style={{position: 'relative', width: TILE.w, height: TILE.h - 30, overflow: 'hidden', border: `${line.hairline}px solid ${color.steel}`}}>{children}</div>
  </div>
);

/** ARCHIVE: kaynak görüntü yerine nötr, tintsiz yer tutucu (proof'ta gerçek arşiv kullanılmaz). */
const ArchiveTile: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(160deg, #8d8a84 0%, #5f5d59 45%, #2f2e2c 100%)'}}>
    <AbsoluteFill style={{background: `radial-gradient(ellipse at center, transparent 55%, ${color.ink} 140%)`, opacity: worlds.archive.vignette.maxOpacity}} />
    <div style={{position: 'absolute', left: 24, top: 150, right: 24, textAlign: 'center', ...ts(type.sourceMark), fontSize: 14, color: '#f2f2f2', opacity: 0.85}}>
      SOURCE IMAGE · NATURAL COLOUR · NO BRAND TINT
    </div>
    <div style={{position: 'absolute', right: 18, bottom: 16, ...ts(type.sourceMark), color: color.paper}}>SOURCE · YEAR</div>
  </AbsoluteFill>
);

/** EVIDENCE: gerçek sayfa yerine soyut satırlar (sahte belge metni yazılmaz); modül sayfaya bağlı; 2 px vurgu. */
const EvidenceTile: React.FC = () => {
  const page = {x: 48, y: 74, w: 300, h: 320};
  const bars = [0.92, 0.86, 0.95, 0.7, 0.9, 0.82, 0.6, 0.88, 0.93, 0.75];
  return (
    <AbsoluteFill style={{background: color.ink}}>
      {/* sayfa dışı endüstriyel yüzey: çok hafif doku */}
      <AbsoluteFill style={{opacity: worlds.evidence.surfaceTexture.max, backgroundImage: `repeating-linear-gradient(95deg, ${color.paper} 0 1px, transparent 1px 5px)`}} />
      <div style={{position: 'absolute', left: page.x, top: page.y, width: page.w, height: page.h, background: color.paper, boxShadow: '0 10px 30px rgba(0,0,0,0.55)', transform: 'rotate(-1.2deg)'}}>
        {bars.map((b, i) => (
          <div key={i} style={{position: 'absolute', left: 26, top: 40 + i * 27, width: (page.w - 52) * b, height: 8, background: '#3b3a36', opacity: 0.75}} />
        ))}
        <div style={{position: 'absolute', left: 26, top: 40 + 4 * 27 + 13, width: (page.w - 52) * 0.9, height: line.accent, background: color.accentBrand}} />
        {/* EVIDENCE modülü: sayfanın sol üstüne bağlı, 24 px dışarıda */}
        <div style={{position: 'absolute', left: 0, top: -layout.evidenceModule - 10, display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap'}}>
          <div style={{width: layout.evidenceModule, height: layout.evidenceModule, border: `${line.hairline}px solid ${color.iron}`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...ts(type.evidence), fontSize: 15, color: color.paper}}>00</div>
          <div style={{...ts(type.evidence), fontSize: 14, color: color.iron}}>EVIDENCE</div>
          <div style={{...ts(type.evidence), fontSize: 14, color: color.paper, letterSpacing: '0.08em'}}>· SOURCE · YEAR · P.0</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** ENGINEERING: ink→steel, iron grid %8 / 80 px, 1 px çizgiler; anahtar sayı accent.brand. */
const EngineeringTile: React.FC = () => {
  const g = worlds.engineering.grid;
  return (
    <AbsoluteFill style={{background: `linear-gradient(160deg, ${color.ink} 0%, ${color.steel} 100%)`}}>
      <AbsoluteFill
        style={{
          opacity: g.opacity,
          backgroundImage: `linear-gradient(${color.iron} ${g.width}px, transparent ${g.width}px), linear-gradient(90deg, ${color.iron} ${g.width}px, transparent ${g.width}px)`,
          backgroundSize: `${g.spacing}px ${g.spacing}px`,
        }}
      />
      <svg width={TILE.w} height={TILE.h - 30} style={{position: 'absolute', left: 0, top: 0}}>
        <rect x={60} y={170} width={300} height={90} fill="none" stroke={color.iron} strokeWidth={line.hairline} />
        <line x1={60} y1={290} x2={360} y2={290} stroke={color.iron} strokeWidth={line.hairline} />
        {[60, 135, 210, 285, 360].map((x) => (
          <line key={x} x1={x} y1={284} x2={x} y2={296} stroke={color.iron} strokeWidth={line.hairline} />
        ))}
        <text x={60} y={160} fill={color.iron} style={{fontFamily: font.meta, fontSize: 14, letterSpacing: '0.12em'}}>A–A · SCALE 0–4 UNITS</text>
      </svg>
      <div style={{position: 'absolute', left: 60, top: 316, ...ts(type.caseTitle), fontSize: 58, color: color.accentBrand}}>0.00</div>
      <div style={{position: 'absolute', left: 60, top: 386, ...ts(type.sourceMark), fontSize: 14, color: color.iron}}>KEY NUMBER · ACCENT.BRAND</div>
    </AbsoluteFill>
  );
};

/** CASE LAYER: video-ui-spec §1 yapısı, gerçek ölçüde; kutu yok, yalnız sol-alt okunabilirlik gradyanı. */
const CaseLayerTile: React.FC = () => {
  const gr = worlds.caseLayer.legibilityGradient;
  return (
    <AbsoluteFill style={{background: '#55595b'}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 0% 100%, rgba(20,24,28,${gr.to}) 0%, rgba(20,24,28,${gr.from}) 70%)`}} />
      <div style={{position: 'absolute', left: 30, bottom: 40, display: 'flex', gap: 16}}>
        <div style={{width: line.accent, background: color.accentBrand}} />
        <div>
          <div style={{...ts(type.caseNumber), color: color.iron}}>CASE 000</div>
          <div style={{...ts(type.caseTitle), color: color.paper}}>SAMPLE</div>
          <div style={{display: 'flex', alignItems: 'flex-end', marginTop: 6, marginBottom: 8}}>
            <div style={{width: 300, height: line.hairline, background: color.iron}} />
            {[0, 1, 2].map((k) => (
              <div key={k} style={{width: line.hairline, height: 6, background: color.iron, marginLeft: 7}} />
            ))}
          </div>
          <div style={{...ts(type.caseSub), color: color.iron}}>0000 · SUBJECT LINE</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 30, top: 26, display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{width: layout.evidenceModule, height: layout.evidenceModule, border: `${line.hairline}px solid ${color.iron}`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...ts(type.evidence), fontSize: 16, color: color.paper}}>00</div>
        <div style={{...ts(type.caseTab), fontSize: 30, color: color.paper}}>CASE TAB</div>
      </div>
    </AbsoluteFill>
  );
};

export const BrandProof: React.FC = () => {
  useBrandFonts();
  return (
    <AbsoluteFill style={{background: color.ink, color: color.paper}}>
      <div style={{position: 'absolute', left: 60, top: 40, ...ts(type.sourceMark), color: color.iron}}>
        THE INDUSTRIAL CASEBOOK · BRAND SYSTEM V1 · TOKEN PROOF (GENERAL, NO CASE CONTENT)
      </div>
      <Specimen />
      <Swatches />
      <FontCheck />
      <Tile i={0} title={worlds.archive.label}>
        <ArchiveTile />
      </Tile>
      <Tile i={1} title={worlds.evidence.label}>
        <EvidenceTile />
      </Tile>
      <Tile i={2} title={worlds.engineering.label}>
        <EngineeringTile />
      </Tile>
      <Tile i={3} title={worlds.caseLayer.label}>
        <CaseLayerTile />
      </Tile>
    </AbsoluteFill>
  );
};
