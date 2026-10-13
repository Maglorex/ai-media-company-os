import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';
import {alpha} from '../anim';
import {color, line} from '../tokens';

// Engineering World haritası: kamu malı Natural Earth verisi (dosya repo dışı, render'da --public-dir).
// Sabit eşdikdörtgen projeksiyon (kx = cos 35°); kamera = merkez + ölçek. Kara steel, kıyı iron.
// Veri yüklenemezse render durur (boş harita üretilmez).

const KX = Math.cos((35 * Math.PI) / 180);
const KREF = 10;
export type MapCam = {lon: number; lat: number; z: number; width?: number; height?: number};
type Ring = number[][];
type Geometry = {type: 'Polygon'; coordinates: Ring[]} | {type: 'MultiPolygon'; coordinates: Ring[][]};

export const project = (cam: MapCam, lon: number, lat: number) => ({
  x: (cam.width ?? 1920) / 2 + (lon - cam.lon) * KX * cam.z,
  y: (cam.height ?? 1080) / 2 - (lat - cam.lat) * cam.z,
});

const toPath = (g: Geometry) =>
  (g.type === 'Polygon' ? [g.coordinates] : g.coordinates)
    .map((rings) => rings.map((r) => r.map(([lon, lat], i) => `${i ? 'L' : 'M'}${(lon * KX * KREF).toFixed(1)} ${(-lat * KREF).toFixed(1)}`).join('') + 'Z').join(''))
    .join('');

const cache = new Map<string, string[]>();

export const useGeo = (file: string, filter?: (p: Record<string, unknown>) => boolean) => {
  const key = file + (filter ? '#f' : '');
  const [paths, setPaths] = useState<string[] | null>(cache.get(key) ?? null);
  const [handle] = useState(() => (cache.has(key) ? null : delayRender(`map ${file}`)));
  useEffect(() => {
    if (cache.has(key)) return;
    fetch(staticFile(file))
      .then((r) => r.json())
      .then((d: {features: {properties: Record<string, unknown>; geometry: Geometry | null}[]}) => {
        const p = d.features.filter((f) => f.geometry && (!filter || filter(f.properties))).map((f) => toPath(f.geometry as Geometry));
        if (!p.length) throw new Error(`map data empty: ${file}`);
        cache.set(key, p);
        setPaths(p);
        if (handle !== null) continueRender(handle);
      })
      .catch((e) => cancelRender(e));
  }, [file, key, filter, handle]);
  return paths;
};

export const BrandMap: React.FC<{cam: MapCam; land: string; states?: string; children?: React.ReactNode}> = ({cam, land, states, children}) => {
  const landPaths = useGeo(land);
  const statePaths = useGeo(states ?? land, states ? usOnly : undefined);
  const w = cam.width ?? 1920;
  const h = cam.height ?? 1080;
  const s = cam.z / KREF;
  const tx = w / 2 - cam.lon * KX * cam.z;
  const ty = h / 2 + cam.lat * cam.z;
  return (
    <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0}}>
      <g transform={`translate(${tx} ${ty}) scale(${s})`}>
        {(landPaths ?? []).map((d, i) => (
          <path key={i} d={d} fill={alpha(color.steel, 0.55)} stroke={alpha(color.iron, 0.85)} strokeWidth={line.hairline} vectorEffect="non-scaling-stroke" />
        ))}
        {states
          ? (statePaths ?? []).map((d, i) => <path key={`s${i}`} d={d} fill="none" stroke={alpha(color.iron, 0.35)} strokeWidth={line.hairline} vectorEffect="non-scaling-stroke" />)
          : null}
      </g>
      {children}
    </svg>
  );
};

const usOnly = (p: Record<string, unknown>) => p.iso_a2 === 'US';
