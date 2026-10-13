// Synthetic fixture helpers (no real project data). Deterministic word timings from text.
import {tokenize, normalizeToken, INPUT_SCHEMA} from '../lib/caption-core.mjs';

/**
 * Word timing like a TTS alignment: word = 120 ms + 45 ms/char, 60 ms between words,
 * 450 ms after a sentence end; `pauses` = {tokenIndex: extraMsAfter}. Punctuation-only tokens get zero duration.
 */
export const makeWords = (text, {startMs = 500, pauses = {}, stripPunct = false} = {}) => {
  let t = startMs;
  const out = [];
  tokenize(text).forEach((raw, k) => {
    if (!normalizeToken(raw)) {
      out.push({w: raw, start: t / 1000, end: t / 1000});
      return;
    }
    const d = 120 + 45 * raw.length;
    out.push({w: stripPunct ? raw.replace(/[^\p{L}\p{N}'$%.,-]+$/u, '').replace(/[.,;:?!]+$/u, '') : raw, start: t / 1000, end: (t + d) / 1000});
    t += d + 60 + (/[.?!]$/.test(raw) ? 390 : 0) + (pauses[k] ?? 0);
  });
  return out;
};

export const makeInput = (text, extra = {}, wordOpts = {}) => {
  const words = extra.words ?? makeWords(text, wordOpts);
  const last = Math.max(...words.map((w) => w.end));
  return {
    schema: INPUT_SCHEMA,
    video_id: 'TEST-001',
    language: 'en',
    transcript: text,
    video_duration_s: Math.ceil(last) + 2,
    ...extra,
    words,
  };
};
