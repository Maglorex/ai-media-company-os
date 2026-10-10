import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

export type BarItem = {
  /** Kaynaktaki ifadeye sadık kısa ad, ör. "Nuclear crew training". */
  label: string;
  /** Tek değer. Ölçek yalnız bu sayılardan çizilir; ekrandaki metin `valueLabel`'dır. */
  value?: number;
  /** Kaynak bir aralık veriyorsa (ör. "about 46 to 55"): düz kısım min'e kadar, açık kısım max'a kadar. */
  range?: {min: number; max: number};
  /** Ekranda yazan değer, ledger'daki biçimle birebir (ör. "$300,000", "about 46 to 55"). Hesaplanmaz. */
  valueLabel: string;
  /** Belirmeye başladığı kare. */
  from: number;
  /** Vurgu rengi (en fazla bir öğe önerilir). */
  emphasis?: boolean;
};

export type BarChartProps = {
  /** stacked: parçalar tek barda yan yana toplanır · grouped: her öğe ayrı satır. */
  mode: 'stacked' | 'grouped';
  items: BarItem[];
  title?: string;
  subtitle?: string;
  /** Ölçeğin üst sınırı; verilmezse en büyük değer/toplam. Ölçek her zaman sıfırdan başlar. */
  max?: number;
  /**
   * Yalnız stacked: barın üstünde, toplamı kapsayan parantez. Metin kaynaktan aynen verilir
   * (ör. GAO "about $1.9 million"); parçaların toplamından türetilmez.
   */
  total?: {label: string; detail?: string; from: number};
  label?: SourceLabelProps;
};

const GROW = 24;
const FADE = 12;
const LEFT = 160;
const WIDTH = 1600;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const useAppear = (from: number, duration = FADE) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, from + duration], [0, 1], clamp);
};

const useGrow = (from: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, from + GROW], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
};

const colorFor = (item: BarItem, index: number) =>
  item.emphasis ? theme.accent : theme.series[index % theme.series.length];

const itemMax = (i: BarItem) => i.range?.max ?? i.value ?? 0;

/**
 * Sade, sıfırdan başlayan yatay bar grafiği. Rakamı açıklar: eksen kırpılmaz, oran abartılmaz,
 * hareket yalnız barın büyümesi ve metnin belirmesidir.
 */
export const BarChart: React.FC<BarChartProps> = ({mode, items, title, subtitle, max, total, label}) => {
  const titleIn = useAppear(0);
  const scaleMax =
    max ?? (mode === 'stacked' ? items.reduce((s, i) => s + (i.value ?? 0), 0) : Math.max(...items.map(itemMax)));
  const px = (v: number) => (v / scaleMax) * WIDTH;

  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text}}>
      {title ? (
        <div style={{position: 'absolute', left: LEFT, top: 120, opacity: titleIn}}>
          <div style={{fontSize: 52, fontWeight: 700}}>{title}</div>
          {subtitle ? <div style={{fontSize: 30, color: theme.muted, marginTop: 8}}>{subtitle}</div> : null}
        </div>
      ) : null}

      {mode === 'stacked' ? (
        <Stacked items={items} px={px} total={total} />
      ) : (
        <Grouped items={items} px={px} />
      )}

      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};

const STACK_TOP = 470;
const STACK_HEIGHT = 110;

const Stacked: React.FC<{items: BarItem[]; px: (v: number) => number; total?: BarChartProps['total']}> = ({
  items,
  px,
  total,
}) => {
  let offset = 0;
  const segments = items.map((item, i) => {
    const start = offset;
    offset += px(item.value ?? 0);
    return {item, i, start, width: px(item.value ?? 0)};
  });
  const fullWidth = offset;
  const totalIn = useAppear(total?.from ?? 0, 18);

  return (
    <>
      {total ? (
        <div style={{position: 'absolute', left: LEFT, top: STACK_TOP - 150, width: fullWidth, opacity: totalIn}}>
          <div style={{fontSize: 44, fontWeight: 700}}>{total.label}</div>
          {total.detail ? <div style={{fontSize: 28, color: theme.muted, marginTop: 4}}>{total.detail}</div> : null}
          {/* Parantez: toplamın hangi parçaları kapsadığını gösterir. */}
          <div
            style={{
              position: 'absolute',
              top: 122,
              left: 0,
              width: fullWidth,
              height: 16,
              borderTop: `3px solid ${theme.text}`,
              borderLeft: `3px solid ${theme.text}`,
              borderRight: `3px solid ${theme.text}`,
            }}
          />
        </div>
      ) : null}

      {segments.map((s) => (
        <Segment key={s.i} {...s} />
      ))}

      {/* Lejant: her parçanın değeri ve adı, parça ile aynı anda belirir. */}
      <div style={{position: 'absolute', left: LEFT, top: STACK_TOP + STACK_HEIGHT + 60}}>
        {segments.map((s) => (
          <LegendRow key={s.i} item={s.item} color={colorFor(s.item, s.i)} />
        ))}
      </div>
    </>
  );
};

const Segment: React.FC<{item: BarItem; i: number; start: number; width: number}> = ({item, i, start, width}) => {
  const grow = useGrow(item.from);
  if (grow <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: LEFT + start,
        top: STACK_TOP,
        // Parçalar arasında ince boşluk: sınırlar okunur kalır.
        width: Math.max(0, width * grow - 4),
        height: STACK_HEIGHT,
        backgroundColor: colorFor(item, i),
      }}
    />
  );
};

const LegendRow: React.FC<{item: BarItem; color: string}> = ({item, color}) => {
  const appear = useAppear(item.from + 6);
  return (
    <div style={{display: 'flex', alignItems: 'center', height: 64, opacity: appear}}>
      <div style={{width: 28, height: 28, backgroundColor: color, marginRight: 24}} />
      <div style={{fontSize: 40, fontWeight: 700, width: 260}}>{item.valueLabel}</div>
      <div style={{fontSize: 36, color: theme.muted}}>{item.label}</div>
    </div>
  );
};

const ROW_TOP = 380;
const ROW_GAP = 190;
const ROW_HEIGHT = 72;

const Grouped: React.FC<{items: BarItem[]; px: (v: number) => number}> = ({items, px}) => (
  <>
    {items.map((item, i) => (
      <GroupedRow key={i} item={item} i={i} px={px} />
    ))}
  </>
);

const GroupedRow: React.FC<{item: BarItem; i: number; px: (v: number) => number}> = ({item, i, px}) => {
  const grow = useGrow(item.from);
  const textIn = useAppear(item.from);
  const valueIn = useAppear(item.from + GROW - 4);
  const color = colorFor(item, i);
  const top = ROW_TOP + i * ROW_GAP;
  const solid = px(item.range?.min ?? item.value ?? 0);
  const extra = item.range ? px(item.range.max) - solid : 0;
  const end = (solid + extra) * grow;

  return (
    <>
      <div style={{position: 'absolute', left: LEFT, top: top - 56, fontSize: 36, color: theme.muted, opacity: textIn}}>
        {item.label}
      </div>
      <div style={{position: 'absolute', left: LEFT, top, width: solid * grow, height: ROW_HEIGHT, backgroundColor: color}} />
      {extra > 0 ? (
        // Aralığın belirsiz kısmı: aynı renk, açık ve çizgili — kesin değer gibi görünmez.
        <div
          style={{
            position: 'absolute',
            left: LEFT + solid * grow,
            top,
            width: Math.max(0, extra * grow),
            height: ROW_HEIGHT,
            boxSizing: 'border-box',
            border: `3px solid ${color}`,
            background: `repeating-linear-gradient(135deg, ${color}66 0 10px, transparent 10px 20px)`,
          }}
        />
      ) : null}
      <div
        style={{
          position: 'absolute',
          left: LEFT + end + 28,
          top,
          height: ROW_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          fontSize: 44,
          fontWeight: 700,
          opacity: valueIn,
          whiteSpace: 'nowrap',
        }}
      >
        {item.valueLabel}
      </div>
    </>
  );
};
