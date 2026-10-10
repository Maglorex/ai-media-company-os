import {useEffect, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

type Ring = number[][];
type Geometry = {type: 'Polygon'; coordinates: Ring[]} | {type: 'MultiPolygon'; coordinates: Ring[][]};
type Feature = {properties: Record<string, unknown>; geometry: Geometry | null};

export type MapPoint = {lon: number; lat: number; label: string; detail?: string; from: number; /** Yazı noktanın solunda mı (sağ kenara yakın noktalar). */ align?: 'left' | 'right'};

export type LocatorMapProps = {
  /** Public klasöre göre GeoJSON yolu (ör. Natural Earth admin-1). */
  geojson: string;
  /**
   * Altta çizilen kara katmanı (ör. Natural Earth land). Admin-1 verisi tüm ülkeleri içermez;
   * bu katman olmadan eksik ülkeler deniz gibi görünür.
   */
  baseGeojson?: string;
  /** Görünen alan: [batı, güney, doğu, kuzey] derece. */
  bounds: [number, number, number, number];
  /** Bu `name` değerine sahip bölgeler biraz daha açık tonla gösterilir (ör. "Texas"). */
  highlightNames?: string[];
  /** Vurgulu bölgenin adı haritada yazılır mı. */
  regionLabel?: {text: string; lon: number; lat: number};
  points: MapPoint[];
  /** Hafif yaklaşma (1 = yok). Dramatik değil; 1.0–1.15 önerilir. */
  zoomTo?: number;
  tag?: string;
  title?: string;
  subtitle?: string;
  label?: SourceLabelProps;
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/**
 * Sade konum haritası: kamu malı sınır verisinden basit eşdikdörtgen projeksiyon (enlem düzeltmeli).
 * Bölge düzeyindedir; nokta bir şehri gösterir, tesisin şehir içindeki yerini göstermez.
 */
export const LocatorMap: React.FC<LocatorMapProps> = ({
  geojson,
  baseGeojson,
  bounds,
  highlightNames = [],
  regionLabel,
  points,
  zoomTo = 1.08,
  tag,
  title,
  subtitle,
  label,
}) => {
  const frame = useCurrentFrame();
  const {width: vw, height: vh, durationInFrames} = useVideoConfig();
  const [features, setFeatures] = useState<Feature[] | null>(null);
  const [base, setBase] = useState<Feature[]>([]);
  const [handle] = useState(() => delayRender('GeoJSON yükleniyor'));

  useEffect(() => {
    const load = (file: string) =>
      fetch(staticFile(file))
        .then((r) => r.json())
        .then((data: {features: Feature[]}) => data.features.filter((f) => f.geometry && intersects(f.geometry, bounds)));
    Promise.all([load(geojson), baseGeojson ? load(baseGeojson) : Promise.resolve([])])
      .then(([main, land]) => {
        setFeatures(main);
        setBase(land);
        continueRender(handle);
      })
      .catch((err) => {
        console.error(err);
        continueRender(handle);
      });
  }, [geojson, baseGeojson, bounds, handle]);

  const [west, south, east, north] = bounds;
  const midLat = ((south + north) / 2) * (Math.PI / 180);
  const kx = Math.cos(midLat);
  const scale = Math.min(vw / ((east - west) * kx), vh / (north - south));
  const offX = (vw - (east - west) * kx * scale) / 2;
  const offY = (vh - (north - south) * scale) / 2;
  const project = (lon: number, lat: number) => [offX + (lon - west) * kx * scale, offY + (north - lat) * scale];

  const toPath = (g: Geometry) => {
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    return polys
      .map((rings) =>
        rings.map((ring) => ring.map(([lon, lat], i) => `${i ? 'L' : 'M'}${project(lon, lat).map((n) => n.toFixed(1)).join(' ')}`).join('') + 'Z').join(''),
      )
      .join('');
  };

  const z = interpolate(frame, [0, durationInFrames], [1, zoomTo], clamp);
  const focus = points[0] ? project(points[0].lon, points[0].lat) : [vw / 2, vh / 2];

  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text, overflow: 'hidden'}}>
      <AbsoluteFill style={{transformOrigin: `${focus[0]}px ${focus[1]}px`, transform: `scale(${z})`}}>
        <svg width={vw} height={vh}>
          {base.map((f, i) => (
            <path key={`base-${i}`} d={toPath(f.geometry as Geometry)} fill={theme.mapLand} stroke="none" />
          ))}
          {(features ?? []).map((f, i) => {
            const name = String(f.properties.name ?? '');
            const hi = highlightNames.includes(name);
            return (
              <path
                key={i}
                d={toPath(f.geometry as Geometry)}
                fill={hi ? theme.mapHighlight : theme.mapLand}
                stroke={theme.mapBorder}
                strokeWidth={1.2}
              />
            );
          })}
        </svg>
        {regionLabel ? (
          <div
            style={{
              position: 'absolute',
              left: project(regionLabel.lon, regionLabel.lat)[0],
              top: project(regionLabel.lon, regionLabel.lat)[1],
              transform: 'translate(-50%, -50%)',
              fontSize: 40,
              letterSpacing: 6,
              color: theme.muted,
              textTransform: 'uppercase',
            }}
          >
            {regionLabel.text}
          </div>
        ) : null}
        {points.map((p, i) => (
          <Point key={i} point={p} xy={project(p.lon, p.lat)} zoom={z} />
        ))}
      </AbsoluteFill>

      {title ? (
        <div style={{position: 'absolute', left: 160, top: 100, textShadow: `0 0 18px ${theme.background}`}}>
          <div style={{fontSize: 52, fontWeight: 700}}>{title}</div>
          {subtitle ? <div style={{fontSize: 30, color: theme.muted, marginTop: 8}}>{subtitle}</div> : null}
        </div>
      ) : null}
      {tag ? (
        <div style={{position: 'absolute', right: 160, top: 100, fontSize: 24, color: theme.muted, border: `2px dashed ${theme.muted}`, padding: '8px 14px'}}>
          {tag}
        </div>
      ) : null}
      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};

const Point: React.FC<{point: MapPoint; xy: number[]; zoom: number}> = ({point, xy, zoom}) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [point.from, point.from + 15], [0, 1], clamp);
  if (appear <= 0) return null;
  // Yazı, haritanın yaklaşmasından etkilenmesin diye ters ölçeklenir.
  return (
    <div style={{position: 'absolute', left: xy[0], top: xy[1], opacity: appear, transform: `scale(${1 / zoom})`, transformOrigin: '0 0'}}>
      <div style={{position: 'absolute', left: -11, top: -11, width: 22, height: 22, borderRadius: 11, backgroundColor: theme.accent, border: `3px solid ${theme.background}`}} />
      <div style={{position: 'absolute', ...(point.align === 'left' ? {right: 24, textAlign: 'right' as const} : {left: 24}), top: -30, whiteSpace: 'nowrap'}}>
        <div style={{fontSize: 40, fontWeight: 700}}>{point.label}</div>
        {point.detail ? <div style={{fontSize: 26, color: theme.muted}}>{point.detail}</div> : null}
      </div>
    </div>
  );
};

function intersects(g: Geometry, [west, south, east, north]: [number, number, number, number]) {
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  return polys.some((rings) => rings[0].some(([lon, lat]) => lon >= west - 5 && lon <= east + 5 && lat >= south - 5 && lat <= north + 5));
}
