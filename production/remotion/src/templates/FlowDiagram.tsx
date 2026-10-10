import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {SourceLabel, SourceLabelProps} from './SourceLabel';

export type FlowNode = {title: string; detail?: string; from: number; emphasis?: boolean};

export type FlowFact = {value: string; text: string; from: number};

export type FlowDiagramProps = {
  title: string;
  subtitle?: string;
  nodes: FlowNode[];
  /**
   * arrow: kaynak bir sıra veriyorsa (ör. "followed by") · none: kaynak yalnız listeliyorsa.
   * Kaynak sıra vermediğinde ok çizilmez; sıra uydurulmaz.
   */
  connector: 'arrow' | 'none';
  /** Düğümlerin üstünde ortak başlık (connector: 'none' için). */
  groupLabel?: string;
  /** Ortak başlığın kapsadığı ilk N düğüm (kaynak cümlesi yalnız bunları kapsıyorsa). Varsayılan: hepsi. */
  groupSpan?: number;
  facts?: FlowFact[];
  /** Opsiyonel oran noktaları (ör. 67 kişiden 27'si). */
  ratio?: {total: number; highlighted: number; label: string; from: number};
  label?: SourceLabelProps;
};

const LEFT = 160;
const RIGHT = 1760;
const NODE_TOP = 330;
const NODE_H = 230;
const GAP = 70;
const FADE = 15;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Sade akış/bileşen şeması: düğümler, opsiyonel oklar, altta olgu satırları ve oran noktaları. */
export const FlowDiagram: React.FC<FlowDiagramProps> = ({title, subtitle, nodes, connector, groupLabel, groupSpan, facts = [], ratio, label}) => {
  const frame = useCurrentFrame();
  const appear = (from: number) => interpolate(frame, [from, from + FADE], [0, 1], clamp);
  const nodeW = (RIGHT - LEFT - GAP * (nodes.length - 1)) / nodes.length;
  const nodeX = (i: number) => LEFT + i * (nodeW + GAP);

  return (
    <AbsoluteFill style={{backgroundColor: theme.background, fontFamily: theme.fontFamily, color: theme.text}}>
      <div style={{position: 'absolute', left: LEFT, top: 110, opacity: appear(0)}}>
        <div style={{fontSize: 54, fontWeight: 700}}>{title}</div>
        {subtitle ? <div style={{fontSize: 30, color: theme.muted, marginTop: 8}}>{subtitle}</div> : null}
      </div>

      {groupLabel ? (
        <div style={{opacity: appear(nodes[0]?.from ?? 0)}}>
          <div style={{position: 'absolute', left: LEFT, top: NODE_TOP - 52, fontSize: 30, fontWeight: 600}}>{groupLabel}</div>
          <div style={{position: 'absolute', left: LEFT, top: NODE_TOP - 12, width: groupSpan ? nodeX(groupSpan - 1) + nodeW - LEFT : RIGHT - LEFT, height: 2, backgroundColor: theme.series[2]}} />
        </div>
      ) : null}

      {nodes.map((n, i) => {
        const o = appear(n.from);
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                left: nodeX(i),
                top: NODE_TOP,
                width: nodeW,
                height: NODE_H,
                boxSizing: 'border-box',
                border: `2px solid ${n.emphasis ? theme.accent : theme.series[2]}`,
                borderTop: `6px solid ${n.emphasis ? theme.accent : theme.series[0]}`,
                padding: '18px 20px',
                opacity: o,
              }}
            >
              <div style={{fontSize: 30, fontWeight: 700, lineHeight: 1.2}}>{n.title}</div>
              {n.detail ? <div style={{fontSize: 24, color: theme.muted, marginTop: 10, lineHeight: 1.3}}>{n.detail}</div> : null}
            </div>
            {connector === 'arrow' && i < nodes.length - 1 ? <Arrow x={nodeX(i) + nodeW} from={nodes[i + 1].from} /> : null}
          </div>
        );
      })}

      {ratio ? <Ratio ratio={ratio} /> : null}

      <div style={{position: 'absolute', left: ratio ? 1180 : LEFT, top: NODE_TOP + NODE_H + 70, width: ratio ? RIGHT - 1180 : RIGHT - LEFT}}>
        {facts.map((f, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'baseline', marginBottom: 18, opacity: appear(f.from)}}>
            <div style={{fontSize: 44, fontWeight: 700, color: theme.accent, marginRight: 18, whiteSpace: 'nowrap'}}>{f.value}</div>
            <div style={{fontSize: 27, color: theme.text, lineHeight: 1.3}}>{f.text}</div>
          </div>
        ))}
      </div>

      {label ? <SourceLabel {...label} /> : null}
    </AbsoluteFill>
  );
};

const Arrow: React.FC<{x: number; from: number}> = ({x, from}) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [from - 8, from + 4], [0, 1], clamp);
  const y = NODE_TOP + NODE_H / 2;
  const len = (GAP - 20) * grow;
  return (
    <svg width={GAP} height={30} style={{position: 'absolute', left: x, top: y - 15}}>
      <line x1={10} y1={15} x2={10 + len} y2={15} stroke={theme.muted} strokeWidth={3} />
      {grow >= 1 ? <path d={`M${GAP - 18} 7 L${GAP - 8} 15 L${GAP - 18} 23`} fill="none" stroke={theme.muted} strokeWidth={3} /> : null}
    </svg>
  );
};

const Ratio: React.FC<{ratio: NonNullable<FlowDiagramProps['ratio']>}> = ({ratio}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [ratio.from, ratio.from + FADE], [0, 1], clamp);
  const lit = interpolate(frame, [ratio.from + 15, ratio.from + 45], [0, ratio.highlighted], clamp);
  const perRow = 23;
  const dot = 26;
  const step = 38;
  return (
    <div style={{position: 'absolute', left: LEFT, top: NODE_TOP + NODE_H + 70, opacity: o}}>
      <div style={{position: 'relative', width: perRow * step, height: Math.ceil(ratio.total / perRow) * step}}>
        {Array.from({length: ratio.total}, (_, k) => (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: (k % perRow) * step,
              top: Math.floor(k / perRow) * step,
              width: dot,
              height: dot,
              borderRadius: dot / 2,
              backgroundColor: k < Math.floor(lit) ? theme.accent : 'transparent',
              border: `2px solid ${k < Math.floor(lit) ? theme.accent : theme.series[2]}`,
              boxSizing: 'border-box',
            }}
          />
        ))}
      </div>
      <div style={{fontSize: 27, marginTop: 10}}>{ratio.label}</div>
    </div>
  );
};
