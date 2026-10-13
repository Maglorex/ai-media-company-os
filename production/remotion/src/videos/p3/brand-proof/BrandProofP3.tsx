import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {alpha, lerp, ramp} from '../../../brand/anim';
import {EngineeringGround} from '../../../brand/components/Blueprint';
import {BrandMap, MapCam, project} from '../../../brand/components/BrandMap';
import {CaseLabel, ts} from '../../../brand/components/CaseLabel';
import {CaseTab} from '../../../brand/components/CaseTab';
import {EvidenceLabel, SourceMark} from '../../../brand/components/EvidenceLabel';
import {useBrandFonts} from '../../../brand/fonts';
import {color, line, type} from '../../../brand/tokens';
import {worlds} from '../../../brand/worlds';
import {CASE, EVIDENCE, HULL_PATH, MAPS, PHOTO, PLACES, VOYAGES} from './data';

// P3 Brand Proof #3–#5 (D-040). Sessiz; ses, VO, müzik yok. Kanıt metni değiştirilmez.

export type ProofVariant = 'ident' | 'evidence-cover' | 'evidence-page' | 'evidence-sourcemark' | 'world-archive' | 'world-evidence' | 'world-engineering' | 'world-caselayer';

/** Fotoğraf kadrajı: 1920 genişlik, gemi + kıyı kadrajda (V-05 y 300–1380). */
const PHOTO_Y = -300;

// ───────────────────────────── #3 CASE 001 ident: Object Outline → Label → Object Carry (≈4 sn)
const Ident: React.FC<{freezeAt?: number}> = ({freezeAt}) => {
  const frame = useCurrentFrame();
  const f = freezeAt ?? frame;
  const draw = ramp(f, 10, 30);
  const isolate = ramp(f, 34, 56);
  const deepen = ramp(f, 84, 94); // arka plan taşınmadan önce iyice kararır (çift gemi görünmesin)
  const ground = ramp(f, 88, 102);
  const carry = ramp(f, 94, 118);
  // Object Carry: gemi küçülür ve V2 haritasındaki token konumuna iner (#5c ile aynı konum ve ölçek).
  const target = project(ATLANTIC, PLACES.usAtlantic.lon, PLACES.usAtlantic.lat);
  const s = lerp(1, TOKEN_S, carry);
  const tx = lerp(0, target.x - TOKEN_DX - 930, carry);
  const ty = lerp(0, target.y - 600, carry);
  const shipT = `translate(${tx}px, ${ty}px) scale(${s})`;
  return (
    <AbsoluteFill style={{background: color.ink}}>
      <AbsoluteFill style={{opacity: ground}}>
        <EngineeringGround />
        <BrandMap cam={ATLANTIC} land={MAPS.land} />
      </AbsoluteFill>
      {/* ARCHIVE: doğal renk, marka tinti yok; yalnız izolasyon için arka plan kararır */}
      <AbsoluteFill style={{opacity: 1 - ground}}>
        <Img src={staticFile(PHOTO.src)} style={{position: 'absolute', left: 0, top: PHOTO_Y, width: PHOTO.width, height: PHOTO.height}} />
        <AbsoluteFill style={{background: alpha(color.ink, 0.55 * isolate + 0.35 * deepen)}} />
      </AbsoluteFill>
      {/* İzole gemi (gerçek fotoğraf pikselleri, gövde maskesi) + Teal kontur */}
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <defs>
          <clipPath id="hull">
            <path d={HULL_PATH} transform={`translate(0 ${PHOTO_Y})`} />
          </clipPath>
        </defs>
        <g style={{transform: shipT, transformOrigin: '930px 600px'}}>
          <g clipPath="url(#hull)" opacity={isolate * (1 - ramp(f, 106, 118))}>
            <image href={staticFile(PHOTO.src)} x={0} y={PHOTO_Y} width={PHOTO.width} height={PHOTO.height} />
          </g>
          <path
            d={HULL_PATH}
            transform={`translate(0 ${PHOTO_Y})`}
            fill={carry > 0.85 ? alpha(color.ink, 0.6) : 'none'}
            stroke={CASE.accent}
            strokeWidth={(line.accent * lerp(1, 1.25, carry)) / s}
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - draw}
          />
        </g>
      </svg>
      <CaseLabel caseNumber={CASE.number} title={CASE.title} subtitle={CASE.subtitle} wordmark={CASE.wordmark} accent={CASE.accent} from={26} hold={34} freezeAt={freezeAt} />
      <SourceMark text={PHOTO.credit} x={96} y={1080 - 96} align="right" opacity={1 - ground} />
    </AbsoluteFill>
  );
};

const TOKEN_S = 0.11;
const TOKEN_DX = 30;

// ───────────────────────────── EVIDENCE world: gerçek sayfa, sayfa dışı endüstriyel yüzey
const EvidenceGround: React.FC = () => (
  <AbsoluteFill style={{background: color.ink}}>
    <AbsoluteFill style={{opacity: worlds.evidence.surfaceTexture.max, backgroundImage: `repeating-linear-gradient(97deg, ${color.paper} 0 1px, transparent 1px 5px), repeating-linear-gradient(7deg, ${color.paper} 0 1px, transparent 1px 9px)`}} />
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, transparent 40%, ${alpha('#000000', 0.45)} 100%)`}} />
  </AbsoluteFill>
);

type Rect = {x: number; y: number; w: number; h: number};
/** Sayfanın bir bölgesini ekrandaki dikdörtgene yerleştirir; görüntü değiştirilmez (vurgu ayrı katman). */
const PagePanel: React.FC<{n: 1 | 2 | 3; region: Rect; at: Rect; marks?: {r: Rect; kind: 'underline' | 'marker'}[]; labelFrom?: number}> = ({n, region, at, marks = [], labelFrom = 0}) => {
  const e = EVIDENCE[n];
  const s = at.w / region.w;
  return (
    <>
      <div style={{position: 'absolute', left: at.x, top: at.y, width: at.w, height: at.h, overflow: 'hidden', boxShadow: `0 18px 50px ${alpha('#000000', 0.6)}, 0 2px 6px ${alpha('#000000', 0.5)}`}}>
        <Img src={staticFile(e.page.src)} style={{position: 'absolute', left: -region.x * s, top: -region.y * s, width: e.page.w * s, height: e.page.h * s}} />
        {marks.map((m, i) =>
          m.kind === 'underline' ? (
            <div key={i} style={{position: 'absolute', left: (m.r.x - region.x) * s, top: (m.r.y + m.r.h - region.y) * s + 3, width: m.r.w * s, height: line.accent, background: color.accentBrand}} />
          ) : (
            <div key={i} style={{position: 'absolute', left: (m.r.x - region.x) * s, top: (m.r.y - region.y) * s, width: m.r.w * s, height: m.r.h * s, background: alpha(color.accentBrand, worlds.evidence.markerFill.maxOpacity), mixBlendMode: 'multiply'}} />
          ),
        )}
      </div>
      <EvidenceLabel n={n} source={e.source} pageX={at.x} pageY={at.y} pageWidth={at.w} from={labelFrom} freezeAt={60} />
    </>
  );
};

const EvidenceCover: React.FC = () => {
  const p = EVIDENCE[1].page;
  const h = 880;
  const w = Math.round((h * p.w) / p.h);
  return (
    <AbsoluteFill>
      <EvidenceGround />
      <PagePanel n={1} region={{x: 0, y: 0, w: p.w, h: p.h}} at={{x: (1920 - w) / 2, y: 140, w, h}} />
    </AbsoluteFill>
  );
};

/** V-02 (Özet s.1): Q-01 cümlesi; tek sayı "$2 million" %35 kalem, satır altında 2 px accent.brand. */
const EvidencePage: React.FC = () => (
  <AbsoluteFill>
    <EvidenceGround />
    <PagePanel
      n={2}
      region={{x: 470, y: 2290, w: 1830, h: 440}}
      at={{x: 150, y: 330, w: 1620, h: 390}}
      marks={[
        {r: {x: 1270, y: 2357, w: 955, h: 49}, kind: 'underline'},
        {r: {x: 1566, y: 2358, w: 268, h: 46}, kind: 'marker'},
      ]}
    />
    <SourceMark text="REPORT TO THE CONGRESS · B-136209 · JUNE 26, 1970" x={150} y={760} />
  </AbsoluteFill>
);

// ───────────────────────────── ENGINEERING haritaları
const ATLANTIC: MapCam = {lon: 18, lat: 36, z: 9.4};
const GULF: MapCam = {lon: -88.5, lat: 32.2, z: 58};

const Token: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <g transform={`translate(${x} ${y}) scale(${s}) translate(-930 -900)`}>
    <path d={HULL_PATH} fill={alpha(color.ink, 0.75)} stroke={CASE.accent} strokeWidth={(line.accent * 1.25) / s} strokeLinejoin="round" />
  </g>
);

const Voyages: React.FC = () => {
  const o = project(ATLANTIC, PLACES.usAtlantic.lon, PLACES.usAtlantic.lat);
  return (
    <AbsoluteFill>
      <EngineeringGround />
      <BrandMap cam={ATLANTIC} land={MAPS.land}>
        {VOYAGES.map((v) => {
          const p = project(ATLANTIC, v.lon, v.lat);
          const mx = (o.x + p.x) / 2;
          const my = Math.min(o.y, p.y) - Math.abs(p.x - o.x) * 0.16;
          return (
            <g key={v.name}>
              <path d={`M${o.x} ${o.y} Q${mx} ${my} ${p.x} ${p.y}`} fill="none" stroke={color.paper} strokeWidth={line.hairline} opacity={0.75} />
              <circle cx={p.x} cy={p.y} r={4} fill={color.paper} />
              <text x={p.x + (v.lon > 100 ? -12 : 12)} y={p.y - 12} textAnchor={v.lon > 100 ? 'end' : 'start'} style={{...ts(type.sourceMark), fontSize: 24}} fill={color.paper}>
                {v.name} · {v.n}
              </text>
            </g>
          );
        })}
        <Token x={o.x - TOKEN_DX} y={o.y} s={TOKEN_S} />
      </BrandMap>
      <div style={{position: 'absolute', left: 96, top: 92}}>
        <div style={{...ts(type.caseTitle), fontSize: 120, color: color.paper, lineHeight: 1}}>19</div>
        <div style={{...ts(type.caseSub), color: color.iron, marginTop: 10}}>VOYAGES · FIRST 3 COMMERCIAL YEARS</div>
      </div>
      <SourceMark text="DESTINATIONS BY REGION · NOT ROUTES" x={96} y={1080 - 150} />
      <SourceMark text="GAO · 1970 · p.6  ·  MAP · NATURAL EARTH" x={96} y={1080 - 122} />
    </AbsoluteFill>
  );
};

const GulfMap: React.FC<{tab?: boolean; marks?: boolean}> = ({tab, marks}) => {
  const g = project(GULF, PLACES.galveston.lon, PLACES.galveston.lat);
  const lat = project(GULF, -100, PLACES.galveston.lat).y;
  const lon = project(GULF, PLACES.galveston.lon, 40).x;
  return (
    <AbsoluteFill>
      <EngineeringGround />
      <BrandMap cam={GULF} land={MAPS.land} states={MAPS.states}>
        {/* gerçek konum tikleri: 29.3° N · 94.8° W (şehir düzeyi) */}
        <line x1={0} y1={lat} x2={1920} y2={lat} stroke={alpha(color.iron, 0.45)} strokeWidth={line.hairline} strokeDasharray="2 10" />
        <line x1={lon} y1={0} x2={lon} y2={1080} stroke={alpha(color.iron, 0.45)} strokeWidth={line.hairline} strokeDasharray="2 10" />
        <text x={14} y={lat - 10} style={{...ts(type.sourceMark), fontSize: 18}} fill={color.iron}>29.3° N</text>
        <text x={lon + 10} y={1080 - 18} style={{...ts(type.sourceMark), fontSize: 18}} fill={color.iron}>94.8° W</text>
        <circle cx={g.x} cy={g.y} r={9} fill={color.accentBrand} />
        <circle cx={g.x} cy={g.y} r={20} fill="none" stroke={color.accentBrand} strokeWidth={line.hairline} />
        <text x={g.x + 30} y={g.y - 6} style={{...ts(type.caseSub), fontSize: 28}} fill={color.paper}>GALVESTON, TEXAS</text>
        <text x={g.x + 30} y={g.y + 26} style={{...ts(type.sourceMark), fontSize: 20}} fill={color.iron}>NUCLEAR SERVICING FACILITY</text>
      </BrandMap>
      {tab ? <CaseTab n={3} title="GALVESTON FACILITY" freezeAt={20} /> : null}
      {marks ? (
        <>
          <SourceMark text="GAO · 1970 · pp.15–16" x={96} y={1080 - 150} align="right" />
          <SourceMark text="MAP · NATURAL EARTH · CITY LEVEL" x={96} y={1080 - 122} align="right" />
        </>
      ) : (
        <SourceMark text="GAO · 1970 · p.15  ·  MAP · NATURAL EARTH" x={96} y={1080 - 122} align="right" />
      )}
    </AbsoluteFill>
  );
};

/** #4c — Source Mark varyantı (numarasız kaynak): V3 kullanımı. Q-06 NPS alıntısı birebir, atıflı; harita üstünde tek satır font.editorial. */
const QUOTE_CAM: MapCam = {lon: -52, lat: 37, z: 17};
const QuoteMap: React.FC = () => {
  const o = project(QUOTE_CAM, PLACES.usAtlantic.lon, PLACES.usAtlantic.lat);
  return (
    <AbsoluteFill>
      <EngineeringGround />
      <BrandMap cam={QUOTE_CAM} land={MAPS.land}>
        <Token x={o.x - TOKEN_DX * 1.6} y={o.y} s={TOKEN_S * 1.6} />
      </BrandMap>
      <div style={{position: 'absolute', left: o.x + 90, top: o.y - 120, width: 1000}}>
        <div style={{...ts(type.editorial), fontSize: 54, fontStyle: 'italic', color: color.paper, lineHeight: 1.2}}>“the most reliable ship we have operating”</div>
        <div style={{...ts(type.sourceMark), fontSize: 20, color: color.iron, marginTop: 18}}>NPS · HER OPERATORS, AS QUOTED IN A NATIONAL PARK SERVICE HISTORY</div>
      </div>
      <SourceMark text="NPS · NATIONAL HISTORIC LANDMARK NOMINATION, N.S. SAVANNAH" x={96} y={1080 - 150} />
      <SourceMark text="MAP · NATURAL EARTH" x={96} y={1080 - 122} />
    </AbsoluteFill>
  );
};
// ───────────────────────────── #5 dünyalar
const WorldArchive: React.FC = () => (
  <AbsoluteFill style={{background: color.ink}}>
    <Img src={staticFile(PHOTO.src)} style={{position: 'absolute', left: 0, top: PHOTO_Y, width: PHOTO.width, height: PHOTO.height}} />
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 50%, transparent 62%, ${alpha(color.ink, worlds.archive.vignette.maxOpacity)} 100%)`}} />
    <SourceMark text={PHOTO.credit} x={96} y={1080 - 96} align="right" />
  </AbsoluteFill>
);

/** V-01 (Özet s.2): üç maliyet satırı; tek odak = üçüncü satırın altında accent.brand çizgi. */
const WorldEvidence: React.FC = () => (
  <AbsoluteFill>
    <EvidenceGround />
    <PagePanel
      n={3}
      region={{x: 170, y: 150, w: 1960, h: 440}}
      at={{x: 150, y: 330, w: 1620, h: 364}}
      marks={[{r: {x: 260, y: 456, w: 1656, h: 58}, kind: 'underline'}]}
    />
  </AbsoluteFill>
);

export const BrandProofP3: React.FC<{variant: ProofVariant}> = ({variant}) => {
  useBrandFonts();
  switch (variant) {
    case 'ident':
      return <Ident />;
    case 'evidence-cover':
      return <EvidenceCover />;
    case 'evidence-page':
      return <EvidencePage />;
    case 'evidence-sourcemark':
      return <QuoteMap />;
    case 'world-archive':
      return <WorldArchive />;
    case 'world-evidence':
      return <WorldEvidence />;
    case 'world-engineering':
      return <Voyages />;
    case 'world-caselayer':
      return <GulfMap tab />;
  }
};
