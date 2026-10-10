import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {SourceLabel} from '../../templates/SourceLabel';
import {theme} from '../../theme';

// S8 p4 — son kare (edit plan): V-01 üç satır + V-05 gemi yan yana, sabit; yazı yok.
// V-01: GAO Özet s.2 (PDF 6) üst üç satır, metin değiştirilmez (yalnız kırpma). V-05 atfı ledger'a göre.
// teaser: açılış (VO öncesi) — aynı kompozisyon, belge satırları bulanık (rakamlar S5'te ilk kez net açılır; thumbnail vaadiyle aynı kare).
const PAGE = {w: 2400, h: 3084};
const CROP = {x: 231, y: 170, w: 1712, h: 401}; // p3V01 kamera bölgesiyle aynı

export const P3FinalFrame: React.FC<{teaser?: boolean}> = ({teaser}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, teaser ? 12 : 30], [0, 1], {extrapolateRight: 'clamp'});
  const boxW = 900;
  const s = boxW / CROP.w;
  return (
    <AbsoluteFill style={{backgroundColor: theme.background, opacity: o}}>
      <div style={{position: 'absolute', left: 60, top: (1080 - CROP.h * s) / 2, width: boxW, height: CROP.h * s, overflow: 'hidden', boxShadow: '0 0 30px rgba(0,0,0,0.45)'}}>
        <Img
          src={staticFile('pages/page-06.png')}
          style={{position: 'absolute', left: -CROP.x * s, top: -CROP.y * s, width: PAGE.w * s, height: PAGE.h * s, filter: teaser ? 'blur(5px)' : undefined}}
        />
      </div>
      <div style={{position: 'absolute', right: 60, top: 140, width: 900, height: 744, overflow: 'hidden'}}>
        <Img src={staticFile('photos/V-05_nara-542141_golden-gate_1962.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      <SourceLabel
        text="Photo: AEC / National Archives"
        detail={teaser ? 'N.S. Savannah, 1962 · Document: GAO report B-136209 (1970)' : 'N.S. Savannah, 1962 · Document: GAO report B-136209 (1970), p. 2'}
        position="bottom-right"
        from={teaser ? 0 : 10}
      />
    </AbsoluteFill>
  );
};
