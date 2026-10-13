import {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';
import {font, weight} from './tokens';

// Marka fontlarının yerel bağlanması. Font dosyası repoda yok, npm paketi yok:
// yüzler render bilgisayarına kurulu fonttan `local()` ile yüklenir ve sabit takma ailelere kaydedilir.
// Adlar font dosyalarının name tablosundan (full name / PostScript) doğrulandı (2026-10-13).
// Bir yüz bulunamazsa render DURUR (cancelRender) — sessiz yedek font yok.

export type BrandFace = {family: string; weight: number; style: 'normal' | 'italic'; local: string[]; label: string};

export const BRAND_FACES: BrandFace[] = [
  {family: font.display, weight: weight.regular, style: 'normal', local: ['IBM Plex Sans Cond', 'IBMPlexSansCond'], label: 'IBM Plex Sans Condensed Regular'},
  {family: font.display, weight: weight.medium, style: 'normal', local: ['IBM Plex Sans Cond Medm', 'IBMPlexSansCond-Medm'], label: 'IBM Plex Sans Condensed Medium'},
  {family: font.display, weight: weight.semibold, style: 'normal', local: ['IBM Plex Sans Cond SmBld', 'IBMPlexSansCond-SmBld'], label: 'IBM Plex Sans Condensed SemiBold'},
  {family: font.display, weight: weight.bold, style: 'normal', local: ['IBM Plex Sans Cond Bold', 'IBMPlexSansCond-Bold'], label: 'IBM Plex Sans Condensed Bold'},
  {family: font.meta, weight: weight.regular, style: 'normal', local: ['IBM Plex Mono', 'IBMPlexMono'], label: 'IBM Plex Mono Regular'},
  {family: font.meta, weight: weight.medium, style: 'normal', local: ['IBM Plex Mono Medm', 'IBMPlexMono-Medm'], label: 'IBM Plex Mono Medium'},
  {family: font.meta, weight: weight.bold, style: 'normal', local: ['IBM Plex Mono Bold', 'IBMPlexMono-Bold'], label: 'IBM Plex Mono Bold'},
  {family: font.editorial, weight: weight.regular, style: 'normal', local: ['Source Serif 4', 'SourceSerif4-Regular'], label: 'Source Serif 4 Regular'},
  {family: font.editorial, weight: weight.regular, style: 'italic', local: ['Source Serif 4 Italic', 'SourceSerif4-It'], label: 'Source Serif 4 Italic'},
  {family: font.editorial, weight: weight.semibold, style: 'normal', local: ['Source Serif 4 Semibold', 'SourceSerif4-Semibold'], label: 'Source Serif 4 Semibold'},
  {family: font.editorial, weight: weight.bold, style: 'normal', local: ['Source Serif 4 Bold', 'SourceSerif4-Bold'], label: 'Source Serif 4 Bold'},
];

/** Yüzleri yükler ve kaydeder; biri bulunamazsa hangi yüz olduğunu söyleyerek hata fırlatır. */
export const loadFaces = async (faces: BrandFace[]) => {
  for (const f of faces) {
    let ok = false;
    for (const name of f.local) {
      try {
        const face = new FontFace(f.family, `local("${name}")`, {weight: String(f.weight), style: f.style});
        await face.load();
        document.fonts.add(face);
        ok = true;
        break;
      } catch {
        // sıradaki adı dene
      }
    }
    if (!ok) {
      throw new Error(`Brand font missing on this machine: ${f.label} (tried local(): ${f.local.join(', ')}). Install the brand fonts (production/tools/README.md); no fallback is allowed.`);
    }
  }
};

let pending: Promise<void> | null = null;
/** Marka yüzlerini bir kez yükler (sekme başına). */
export const ensureBrandFonts = () => {
  if (!pending) pending = loadFaces(BRAND_FACES);
  return pending;
};

/** Kompozisyon başında çağrılır: fontlar yüklenene kadar render bekler; eksikse render durur. */
export const useBrandFonts = () => {
  const [handle] = useState(() => delayRender('Brand fonts (local)'));
  useEffect(() => {
    ensureBrandFonts()
      .then(() => continueRender(handle))
      .catch((err) => cancelRender(err));
  }, [handle]);
};
