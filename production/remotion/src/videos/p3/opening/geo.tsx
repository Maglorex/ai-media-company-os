import React, {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';
import {theme} from '../../../theme';

// Tek harita dünyası (V2, V3, V9, V13): Natural Earth (kamu malı) kara + ABD eyaletleri.
// Projeksiyon sabit eşdikdörtgen (kx = cos 35°); kamera yalnız merkez + yaklaşma. Aynı harita dört durumda kullanılır.
const KX = Math.cos((35 * Math.PI) / 180);
const KREF = 10;
export type MapCam = {lon: number; lat: number; z: number}; // z = ekran pikseli / enlem derecesi

type Ring = number[][];
type Geometry = {type: 'Polygon'; coordinates: Ring[]} | {type: 'MultiPolygon'; coordinates: Ring[][]};
type Feature = {properties: Record<string, unknown>; geometry: Geometry | null};

const W = 1920;
const H = 1080;

/** Coğrafi nokta → ekran (verilen kamera). */
export const project = (cam: MapCam, lon: number, lat: number) => ({
  x: W / 2 + (lon - cam.lon) * KX * cam.z,
  y: H / 2 - (lat - cam.lat) * cam.z,
});

const toPath = (g: Geometry) => {
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  return polys
    .map((rings) => rings.map((ring) => ring.map(([lon, lat], i) => `${i ? 'L' : 'M'}${(lon * KX * KREF).toFixed(1)} ${(-lat * KREF).toFixed(1)}`).join('') + 'Z').join(''))
    .join('');
};

let cache: {land: string[]; states: string[]} | null = null;

export const useMapData = () => {
  const [data, setData] = useState(cache);
  const [handle] = useState(() => (cache ? null : delayRender('Harita verisi')));
  useEffect(() => {
    if (cache) return;
    const load = (f: string) => fetch(staticFile(f)).then((r) => r.json() as Promise<{features: Feature[]}>);
    Promise.all([load('maps/ne_50m_land.geojson'), load('maps/ne_50m_admin_1_states_provinces.geojson')])
      .then(([land, adm]) => {
        cache = {
          land: land.features.filter((f) => f.geometry).map((f) => toPath(f.geometry as Geometry)),
          states: adm.features.filter((f) => f.geometry && f.properties.iso_a2 === 'US').map((f) => toPath(f.geometry as Geometry)),
        };
        setData(cache);
        if (handle !== null) continueRender(handle);
      })
      .catch((e) => {
        console.error(e);
        if (handle !== null) continueRender(handle);
      });
  }, [handle]);
  return data;
};

/** Harita katmanı + kamera; çocuklar ekran koordinatında (project ile) çizilir. */
export const WorldMap: React.FC<{cam: MapCam; opacity: number; stateBorders?: number; children?: React.ReactNode}> = ({cam, opacity, stateBorders = 0, children}) => {
  const data = useMapData();
  if (opacity <= 0) return null;
  const s = cam.z / KREF;
  const tx = W / 2 - cam.lon * KX * cam.z;
  const ty = H / 2 + cam.lat * cam.z;
  return (
    <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0, opacity}}>
      <rect width={W} height={H} fill={theme.background} />
      <g transform={`translate(${tx} ${ty}) scale(${s})`}>
        {(data?.land ?? []).map((d, i) => (
          <path key={i} d={d} fill={theme.mapLand} stroke={theme.mapBorder} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        ))}
        {stateBorders > 0
          ? (data?.states ?? []).map((d, i) => (
              <path key={`s${i}`} d={d} fill="none" stroke={theme.mapBorder} strokeWidth={1} opacity={stateBorders} vectorEffect="non-scaling-stroke" />
            ))
          : null}
      </g>
      {children}
    </svg>
  );
};
