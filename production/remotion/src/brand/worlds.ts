import {color, line} from './tokens';

// Dört görsel dünya (brand-system-v1.md; video-ui-spec-v1.md §3). Ayrı yaşarlar; Case Layer hepsinin üstünde ortak bağdır.
// Burada yalnız kurallar ve ayarlar var; şablon/kompozisyon yok.

export type WorldId = 'archive' | 'evidence' | 'engineering' | 'caseLayer';

export const worlds = {
  /** "Bu gerçek bir görüntü": kaynağın doğal rengi; marka tinti yok. */
  archive: {
    id: 'archive',
    label: 'ARCHIVE',
    background: 'source', // kaynağın kendisi
    brandTint: false, // kural: arşiv marka rengiyle boyanmaz
    vignette: {color: color.ink, maxOpacity: 0.35}, // yalnız gerekirse, kenarlarda
    lines: 'none', // yalnız Object Carry anında hero object konturu case accent ile 2 px
    typography: ['sourceMark', 'caseLayer'],
  },
  /** "Bu gerçek bir belge": gerçek tarama; mürekkep rengi değişmez. */
  evidence: {
    id: 'evidence',
    label: 'EVIDENCE',
    background: 'page', // gerçek sayfa taraması
    offPage: color.ink,
    surfaceTexture: {min: 0.03, max: 0.05}, // sayfa dışı endüstriyel yüzey, düz değil
    annotation: {color: color.accentBrand, width: line.accent, styles: ['underline', 'bracket']},
    markerFill: {color: color.accentBrand, maxOpacity: 0.35, scope: 'single word or number'},
    pageShadow: true,
    typography: ['evidence', 'editorial'],
  },
  /** "Bu bir açıklama çizimi": token paleti, blueprint çizgi dili. */
  engineering: {
    id: 'engineering',
    label: 'ENGINEERING',
    background: {from: color.ink, to: color.steel},
    grid: {color: color.iron, opacity: 0.08, spacing: 80, width: line.hairline},
    lines: {color: color.iron, width: line.hairline},
    heroAccent: 'case', // hero object: case accent
    keyNumberAccent: color.accentBrand, // anahtar sayı: accent.brand
    surfaceTexture: {min: 0.03, max: 0.05},
    typography: ['sourceMark', 'caseTitle'],
  },
  /** İnce metadata katmanı; tam ekran değil, kutu yok. */
  caseLayer: {
    id: 'caseLayer',
    label: 'CASE LAYER',
    box: false,
    legibilityGradient: {color: color.ink, from: 0, to: 0.55, maxWidth: 640, maxHeight: 260},
    lines: {color: color.iron, width: line.hairline},
    accentRule: {color: color.accentBrand, width: line.accent},
    typography: ['caseNumber', 'caseTitle', 'caseSub', 'evidence', 'caseTab'],
  },
} as const;
