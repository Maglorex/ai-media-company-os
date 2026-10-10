import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

export type SchematicArea = {label: string; value: number};

export type SchematicGroup = {
  title: string;
  /** Kaynaktaki ifadeye sadık kısa maddeler. */
  items: string[];
  from: number;
  /**
   * Opsiyonel alan karşılaştırması: kareler yalnız verilen değerlerle orantılıdır (alan = değer).
   * Yerleşim/konum göstermez; altına bunu söyleyen not yazılır.
   */
  areas?: SchematicArea[];
};

export type ComponentSchematicProps = {
  /** Başlık: genelde rakam (ör. "About $1,162,000 a year"). */
  headline: string;
  headlineDetail?: string;
  /** Kartların üstündeki satır, ör. "Nuclear servicing facility · Galveston, Texas". */
  section: string;
  groups: SchematicGroup[];
  /** Karıştırılmaması gereken ikinci rakam; ayrı, sakin bir kutuda. */
  separateFigure?: {title: string; detail: string; from: number};
  /** Sağ üstte şema etiketi, ör. "Schematic · layout not shown". */
  tag: string;
  label?: SourceLabelProps;
};

const LEFT = 160;
const CARD_W = 500;
const CARD_GAP = 50;
const CARD_TOP = 330;
const CARD_H = 480;
const FADE = 15;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/**
 * Bileşen şeması: bir yapının kaynakta sayılan parçalarını kartlarla gösterir.
 * Bilinçli olarak vaziyet planı değildir; kaynak yerleşim vermediğinde konum çizilmez.
 */
export const ComponentSchematic: React.FC<ComponentSchematicProps> = ({
  headline,
  headlineDetail,
  section,
  groups,
  separateFigure,
  tag,
  label,
}) => {
  const frame = useCurrentFrame();
  const headIn = interpolate(frame, [0, FADE], [0, 1], clamp);
  const sectionIn = interpolate(frame, [groups[0]?.from ?? 0, (groups[0]?.from ?? 0) + FADE], [0, 1], clamp);
  const sepIn = separateFigure ? interpolate(frame, [separateFigure.from, separateFigure.from + FADE], [0, 1], clamp) : 0;

  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text}}>
      <div style={{position: 'absolute', left: LEFT, top: 90, opacity: headIn, maxWidth: 1250}}>
        <div style={{fontSize: 56, fontWeight: 700, color: theme.accent}}>{headline}</div>
        {headlineDetail ? <div style={{fontSize: 30, color: theme.muted, marginTop: 8}}>{headlineDetail}</div> : null}
      </div>

      <div
        style={{
          position: 'absolute',
          right: 160,
          top: 100,
          fontSize: 26,
          color: theme.muted,
          border: `2px dashed ${theme.muted}`,
          padding: '8px 14px',
          opacity: headIn,
        }}
      >
        {tag}
      </div>

      <div style={{position: 'absolute', left: LEFT, top: CARD_TOP - 64, fontSize: 34, fontWeight: 600, opacity: sectionIn}}>
        {section}
      </div>

      {groups.map((g, i) => (
        <Card key={i} group={g} left={LEFT + i * (CARD_W + CARD_GAP)} />
      ))}

      {separateFigure ? (
        <div
          style={{
            position: 'absolute',
            right: 160,
            top: CARD_TOP + CARD_H + 22,
            width: 900,
            opacity: sepIn,
            borderLeft: `4px solid ${theme.muted}`,
            paddingLeft: 20,
          }}
        >
          <div style={{fontSize: 34, fontWeight: 700}}>{separateFigure.title}</div>
          <div style={{fontSize: 28, color: theme.muted, marginTop: 4}}>{separateFigure.detail}</div>
        </div>
      ) : null}

      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};

const Card: React.FC<{group: SchematicGroup; left: number}> = ({group, left}) => {
  const frame = useCurrentFrame();
  const cardIn = interpolate(frame, [group.from, group.from + FADE], [0, 1], clamp);
  if (cardIn <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: CARD_TOP,
        width: CARD_W,
        height: CARD_H,
        boxSizing: 'border-box',
        border: `2px solid ${theme.series[2]}`,
        borderTop: `6px solid ${theme.accent}`,
        padding: '22px 26px',
        opacity: cardIn,
      }}
    >
      <div style={{fontSize: 32, fontWeight: 700, marginBottom: 14}}>{group.title}</div>
      {group.items.map((item, j) => {
        // Maddeler kartla birlikte, kısa aralıklarla sırayla belirir.
        const itemIn = interpolate(frame, [group.from + 8 + j * 10, group.from + 20 + j * 10], [0, 1], clamp);
        return (
          <div key={j} style={{display: 'flex', fontSize: 27, lineHeight: 1.26, marginTop: 8, opacity: itemIn}}>
            <span style={{color: theme.accent, marginRight: 12}}>—</span>
            <span>{item}</span>
          </div>
        );
      })}
      {group.areas ? <Areas areas={group.areas} from={group.from + 20 + group.items.length * 10} /> : null}
    </div>
  );
};

const AREA_BOX = 120;

const Areas: React.FC<{areas: SchematicArea[]; from: number}> = ({areas, from}) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [from, from + FADE], [0, 1], clamp);
  const maxValue = Math.max(...areas.map((a) => a.value));
  return (
    <div style={{marginTop: 18, opacity: appear}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 28}}>
        {areas.map((a, i) => {
          // Alan değere orantılı → kenar = karekök oranı.
          const side = AREA_BOX * Math.sqrt(a.value / maxValue);
          return (
            <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <div
                style={{
                  width: side,
                  height: side,
                  border: `2px solid ${i === 0 ? theme.accent : theme.muted}`,
                  backgroundColor: i === 0 ? `${theme.accent}55` : 'transparent',
                }}
              />
              <div style={{fontSize: 24, color: theme.muted, marginTop: 6, maxWidth: 200}}>{a.label}</div>
            </div>
          );
        })}
      </div>
      <div style={{fontSize: 23, color: theme.muted, marginTop: 8, fontStyle: 'italic'}}>Area comparison only, not a site plan</div>
    </div>
  );
};
