// The Industrial Casebook — Brand System v1 token'ları (D-031, D-032).
// Kaynak: intelligence/creative/brand/brand-system-v1.md §D–§E ve video-ui-spec-v1.md §0–§4.
// Bu dosya yalnız Brand System v1'in geçerli değerlerini içerir; değer değişikliği yalnız burada yapılır.
// Yeni işler bu modülü kullanır. `src/theme.ts` eski pilot temasıdır (legacy); ona dokunulmaz.

/** Renk token'ları (video-ui-spec-v1.md §0, "Şu anki değer" sütunu). */
export const color = {
  ink: '#14181C',
  paper: '#E7DFCF',
  steel: '#334854',
  /** İkincil çizgi/metin. video-ui-spec-v1.md §0'da geçici olarak işaretli; değeri yalnız bu satırda güncellenir. */
  iron: '#7A8288',
  /** Oksitlenme vurgusu: önemli kanıt, annotation, anahtar sayı. Bir karede tek vurgu odağı. */
  accentBrand: '#C58B3B',
} as const;

/**
 * Video başına case accent'i (`accent.case`) burada sabitlenmez; videonun kendi verisi verir.
 * Kural (video-ui-spec-v1.md §0): bir karede tek vurgu odağı — `accentBrand` veya case accent, ikisi aynı nesnede değil.
 */
export type CaseAccent = string;

/** Font rolleri: kayıtlı takma aileler (bkz. `fonts.ts`). Şablonlar yalnız bu adları kullanır; yedek font yığını yok. */
export const font = {
  display: 'CasebookDisplay', // IBM Plex Sans Condensed
  meta: 'CasebookMeta', // IBM Plex Mono
  editorial: 'CasebookEditorial', // Source Serif 4
} as const;

/** Ağırlıklar (brand-system-v1.md §E: display SemiBold/Bold, meta Regular/Medium, editorial Regular/Italic). */
export const weight = {regular: 400, medium: 500, semibold: 600, bold: 700} as const;

/** Tip ölçeği, 1920×1080 için (4K'da ×2). video-ui-spec-v1.md §1, §2, §4. */
export const type = {
  caseTitle: {family: font.display, size: 64, weight: weight.bold, tracking: '0.04em', upper: true},
  caseTab: {family: font.display, size: 40, weight: weight.bold, tracking: '0.02em', upper: true},
  caseNumber: {family: font.meta, size: 22, weight: weight.medium, tracking: '0.18em', upper: true},
  caseSub: {family: font.meta, size: 18, weight: weight.medium, tracking: '0.18em', upper: true},
  evidence: {family: font.meta, size: 18, weight: weight.medium, tracking: '0.2em', upper: true},
  sourceMark: {family: font.meta, size: 16, weight: weight.regular, tracking: '0.12em', upper: true},
  editorial: {family: font.editorial, size: 34, weight: weight.regular, tracking: '0', upper: false},
} as const;

/** Telefon okunabilirliği alt sınırı, 1080p (brand-system-v1.md §E). */
export const readable = {primaryMin: 30, secondaryMin: 23} as const;

/** Çizgi dili: üç dünyada ortak (video-ui-spec-v1.md §3 "Ortak bağ"). */
export const line = {hairline: 1, accent: 2} as const;

/** Case Layer yerleşimi (video-ui-spec-v1.md §1): sol alt, YouTube kontrollerinin üstünde. */
export const layout = {caseLabelLeft: 96, caseLabelBottom: 120, evidenceOffset: 24, evidenceModule: 34} as const;
