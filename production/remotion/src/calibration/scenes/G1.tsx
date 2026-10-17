import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, staticFile} from 'remotion';
import {BrandMap, project} from '../../brand/components/BrandMap';
import {alpha, bbox, Cam, color, EngineeringBg, k, mix, mixCam, Mono, Plate, polyCss, polyPath, SourceMark, toScreen, useT, pathLength} from '../common';
import {BRIDGE, file, HULL, PLACES, Pt, REGIONS, sec, TEAL, V05, VO} from '../data';

// SP-01 — G1 "The ship that worked". VO-A (AI-01 0.00–14.30) starts at 0.5 s.
export const G1_DUR = sec(16);
const VO_AT = 0.5;
const at = (voSec: number) => voSec + VO_AT; // AI-01 time → scene time

const CAM_START: Cam = {cx: 1504, cy: 1347, z: 2.4}; // bridge steel + water (no ship in frame)
const CAM_END: Cam = {cx: 960, cy: 860, z: 1.15}; // the ship in service
export const MAP_CAM = {lon: 25, lat: 33, z: 8.6};

const hb = bbox(HULL);
/** Hull contour as a map marker (96 px long) centred on a lon/lat. */
export const hullMarker = (lonlat: Pt, len = 140): Pt[] => {
  const s = len / (hb.x1 - hb.x0);
  const [mx, my] = (() => {
    const p = project(MAP_CAM, lonlat[0], lonlat[1]);
    return [p.x, p.y];
  })();
  return HULL.map(([x, y]) => [mx + (x - (hb.x0 + hb.x1) / 2) * s, my + (y - (hb.y0 + hb.y1) / 2) * s]);
};

export const G1: React.FC = () => {
  const t = useT();
  const u = k(t, 0.6, 4.4);
  const cam = mixCam(CAM_START, CAM_END, u);
  // Bridge steel is the near plane: it moves 1.35× faster than the photograph and leaves the frame first.
  const camF: Cam = {cx: CAM_START.cx + (cam.cx - CAM_START.cx) * 1.35, cy: CAM_START.cy + (cam.cy - CAM_START.cy) * 1.35, z: cam.z};
  const photoO = 1 - 0.65 * k(t, 6.6, 7.1) - 0.35 * k(t, 7.4, 8.0);

  // contour: traced on the photograph, then lifted and carried onto the map
  const onPhoto = HULL.map((p) => toScreen(cam, p));
  const marker = hullMarker(PLACES.usAtlantic);
  const carry = k(t, 7.0, 8.3);
  const lift = Math.sin(Math.PI * carry) * 26;
  const exit = k(t, 14.9, 16.0);
  const contour: Pt[] = onPhoto.map((p, i) => [mix(p[0], marker[i][0], carry) + exit * 1300, mix(p[1], marker[i][1], carry) - lift]);
  const len = pathLength(onPhoto);
  const trace = k(t, 5.3, 6.6);
  const mapO = k(t, 7.2, 8.0) * (1 - 0.6 * k(t, 15.0, 16.0));

  // regions fill on "nineteen voyages" (C-44): 10 → 7 → 2
  const regionK = REGIONS.map((_, i) => k(t, at(7.74) + i * 0.75, at(7.74) + i * 0.75 + 0.7));
  const count = Math.round(10 * regionK[0] + 7 * regionK[1] + 2 * regionK[2]);
  const usa = project(MAP_CAM, PLACES.usAtlantic[0], PLACES.usAtlantic[1]);

  return (
    <AbsoluteFill style={{background: color.ink}}>
      <AbsoluteFill style={{opacity: photoO}}>
        <Plate src={file.v05} w={V05.w} h={V05.h} cam={cam}>
          {/* where the near-plane steel was: neutral water texture from 300 px to the left (no invented detail) */}
          <Img src={staticFile(file.v05)} style={{position: 'absolute', left: 300, top: 0, width: V05.w, height: V05.h, clipPath: polyCss([[1416, 1586], [1616, 1390], [1616, 1586]])}} />
        </Plate>
        <Plate src={file.v05} w={V05.w} h={V05.h} cam={camF} clip={BRIDGE} imgStyle={{filter: 'blur(1.2px)'}} />
        <SourceMark text="Photo · AEC / National Archives · 1962" opacity={k(t, 1.0, 1.6) * (1 - k(t, 6.6, 7.0))} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: mapO}}>
        <EngineeringBg />
        <BrandMap cam={MAP_CAM} land={file.land}>
          {REGIONS.map((r, i) => {
            const pts = r.poly.map(([lo, la]) => {
              const p = project(MAP_CAM, lo, la);
              return [p.x, p.y] as Pt;
            });
            const lp = project(MAP_CAM, r.label[0], r.label[1]);
            return (
              <g key={r.id} opacity={regionK[i]}>
                <path d={polyPath(pts)} fill={alpha(TEAL, 0.38)} stroke={TEAL} strokeWidth={1.5} />
                <text x={lp.x} y={lp.y} textAnchor="middle" fontFamily="CasebookMeta" fontSize={22} letterSpacing="0.14em" fill={alpha(color.paper, 0.9)}>
                  {r.id}
                </text>
                <text x={lp.x} y={lp.y + 44} textAnchor="middle" fontFamily="CasebookMeta" fontWeight={500} fontSize={36} fill={color.paper}>
                  {r.n}
                </text>
              </g>
            );
          })}
        </BrandMap>
        <div style={{position: 'absolute', left: usa.x - 150, top: usa.y + 44, opacity: k(t, at(7.6), at(8.1))}}>
          <Mono size={22} c={alpha(color.paper, 0.85)}>U.S. Atlantic ports</Mono>
        </div>
        <div style={{position: 'absolute', left: usa.x - 150, top: usa.y - 132, opacity: k(t, at(7.6), at(8.1)) * (1 - k(t, 14.9, 15.6))}}>
          <Mono size={64} w={500} c={color.paper} track="0.04em">
            {String(count).padStart(2, '0')}
          </Mono>
          <Mono size={22} c={alpha(color.paper, 0.8)}>voyages · first three commercial years</Mono>
        </div>
        <SourceMark text="GAO · 1970" opacity={k(t, at(8.0), at(8.5)) * (1 - k(t, at(10.7), at(11.0)))} />
        <SourceMark text="Operators' description · NPS" opacity={k(t, at(11.0), at(11.4)) * (1 - k(t, 14.9, 15.4))} />
      </AbsoluteFill>

      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <path
          d={polyPath(contour)}
          fill={alpha(TEAL, 0.25 * carry)}
          stroke={TEAL}
          strokeWidth={2}
          strokeDasharray={len * (1 - carry) + 400 * carry}
          strokeDashoffset={(1 - trace) * (len * (1 - carry) + 400 * carry)}
          opacity={trace > 0 ? 1 : 0}
          style={{filter: lift > 1 ? `drop-shadow(0 ${lift * 0.4}px ${lift * 0.5}px rgba(0,0,0,0.5))` : undefined}}
        />
      </svg>

      <Sequence from={sec(VO_AT)}>
        <Audio src={staticFile(file.ai01)} startFrom={sec(VO.A[0])} endAt={sec(VO.A[1])} />
      </Sequence>
    </AbsoluteFill>
  );
};
