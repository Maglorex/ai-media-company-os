import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {PhotoShots, PhotoShotsProps} from '../../templates/PhotoShots';
import {SourceLabel} from '../../templates/SourceLabel';
import {theme} from '../../theme';

// P3 fotoğraf beat'leri (ChatGPT önizleme notu 3: tek sürekli zoom değil — pan + detay kesmesi).
// Görseller: P3-asset-manifest.md. V-21 (UPI telephoto, lisans belirsiz) kullanılmıyor → V-20 (CC0, Malmö Museer).
// Kadrajlar fotoğraf pikseli koordinatında, 16:9 (h = w × 9/16).

/** b01 — V-19 Rotterdam, 30 Eyl 1964 (CC0). Pruvaya yavaş yaklaşma → rıhtımdaki kalabalığa detay kesmesi. */
export const p3PhotoB01 = (dur: number): PhotoShotsProps => ({
  src: 'photos/V-19_rotterdam_1964-09-30_cc0.jpg',
  size: {width: 1920, height: 1907},
  shots: [
    {from: 0, start: {x: 0, y: 560, w: 1920}, end: {x: 200, y: 760, w: 1560}},
    {from: Math.round(dur * 0.58), start: {x: 0, y: 1260, w: 980}, end: {x: 40, y: 1290, w: 900}},
  ],
  label: {text: 'Rotterdam, September 30, 1964', detail: 'Nationaal Archief / Anefo, Eric Koch (CC0)', from: 8},
});

/** b08 — V-20 Malmö, Eylül 1964 (CC0): gösterim döneminde ziyaretçi kuyruğu → iskele; detay: "U.S. ATOMIC ENERGY COMMISSION" yazısı. */
export const p3PhotoB08 = (dur: number): PhotoShotsProps => ({
  src: 'photos/V-20_malmo_1964-09_cc0.jpg',
  size: {width: 1920, height: 1893},
  shots: [
    {from: 0, start: {x: 0, y: 1120, w: 1280}, end: {x: 600, y: 1080, w: 1280}},
    {from: Math.round(dur * 0.6), start: {x: 880, y: 620, w: 1040}, end: {x: 900, y: 640, w: 960}},
  ],
  label: {text: 'Malmö, September 1964', detail: 'Malmö Museer / Arno Melms (CC0)', from: 8},
});

/** b28 — V-05 (NARA 542141, 1962), koyulaştırılmış, gemiden geri çekilme (edit plan S8 p3). Atıf ledger V-05. */
export const p3PhotoB28 = (): PhotoShotsProps => ({
  src: 'photos/V-05_nara-542141_golden-gate_1962.jpg',
  size: {width: 1920, height: 1588},
  shots: [{from: 0, start: {x: 420, y: 680, w: 1100}, end: {x: 0, y: 260, w: 1920}}],
  dim: 0.4,
  label: {text: 'Photo: AEC / National Archives', detail: 'N.S. Savannah, 1962', from: 8},
});

/**
 * b06 — S2 p1: V-07 denize indirme (MARAD, PD; düşük çözünürlük → çerçeve içinde, büyütme yok)
 * → "run jointly by…" ile iki kurum adı (edit plan: "İki ajans adı tipografik"; C-35 NPS, C-39 GAO s.4).
 */
export const P3B06: React.FC<{agenciesAt: number}> = ({agenciesAt}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [agenciesAt, agenciesAt + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: theme.background}}>
      <Sequence durationInFrames={agenciesAt}>
        <PhotoShots
          src="photos/V-07_launch_marad.jpg"
          size={{width: 330, height: 428}}
          shots={[]}
          framed={{height: 720}}
          label={{text: 'Launch of the N.S. Savannah', detail: 'Maritime Administration (public domain)', from: 8}}
        />
      </Sequence>
      <Sequence from={agenciesAt}>
        <AbsoluteFill style={{justifyContent: 'center', fontFamily: theme.fontFamily, color: theme.text, paddingLeft: 240}}>
          <div style={{fontSize: 34, color: theme.muted, opacity: o}}>A government project, run jointly by</div>
          <div style={{fontSize: 72, fontWeight: 700, marginTop: 26, opacity: o}}>Maritime Administration</div>
          <div style={{fontSize: 72, fontWeight: 700, marginTop: 10, color: theme.accent, opacity: interpolate(frame, [agenciesAt + 25, agenciesAt + 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
            Atomic Energy Commission
          </div>
          <div style={{fontSize: 34, color: theme.muted, marginTop: 30, opacity: interpolate(frame, [agenciesAt + 50, agenciesAt + 65], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
            Completed in 1962
          </div>
          <SourceLabel text="GAO report B-136209 (1970), p. 4 · NPS history" detail="U.S. General Accounting Office" from={agenciesAt + 10} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
