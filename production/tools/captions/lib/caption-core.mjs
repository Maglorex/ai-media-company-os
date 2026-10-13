// Company OS — caption core (DF-4, CAPTION-PROTOCOL.md). Pure functions; no file I/O.
// Canonical text = locked final VO transcript. Timing = final-timeline word timestamps.
// Alignment is exact (no fuzzy matching). Any structural or timing problem fails; nothing is silently repaired.

import {createHash} from 'node:crypto';

export const TOOL_VERSION = '1.0.0';
export const INPUT_SCHEMA = 'companyos.caption-input/v1';
export const QC_SCHEMA = 'companyos.caption-qc/v1';

/** code 1 = QC failure (valid input, rules not met) · code 2 = malformed input / usage. */
export class CaptionError extends Error {
  constructor(code, message, detail = null) {
    super(message);
    this.code = code;
    this.detail = detail;
  }
}

export const sha256 = (data) => createHash('sha256').update(data).digest('hex');

const MAP_KINDS = new Set(['number', 'currency', 'date', 'measure']);
const TERM_KINDS = new Set(['name', 'place', 'number', 'date', 'unit', 'term', 'organization']);
const NUMBER_WORDS = new Set(
  ('zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen ' +
    'twenty thirty forty fifty sixty seventy eighty ninety hundred thousand million billion trillion point half quarter percent ' +
    'first second third fourth fifth sixth seventh eighth ninth tenth dozen').split(' '),
);
const SENTENCE_END = /[.?!]["'”’)\]]*$/;
const CLAUSE_END = /([,;:]|[–—-])["'”’)\]]*$/;

/** Comparison form of a token: NFC, lower case, unified quotes/dashes, leading/trailing non-alphanumerics removed. */
export const normalizeToken = (t) =>
  t
    .normalize('NFC')
    .toLowerCase()
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');

export const tokenize = (text) => text.normalize('NFC').trim().split(/\s+/u).filter((x) => x.length > 0);

const toMs = (v, field) => {
  if (typeof v !== 'number' || !Number.isFinite(v)) throw new CaptionError(2, `${field} is not a finite number`, {field, value: String(v)});
  if (v < 0) throw new CaptionError(2, `${field} is negative`, {field, value: v});
  return Math.round(v * 1000 + 1e-9);
};
const sec = (ms) => ms / 1000;

export const formatSrtTime = (ms) => {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const r = ms % 1000;
  const p = (n, w) => String(n).padStart(w, '0');
  return `${p(h, 2)}:${p(m, 2)}:${p(s, 2)},${p(r, 3)}`;
};

const ruleValues = (config) => {
  const r = config.rules;
  const d = config.internal_defaults;
  return {
    maxLine: r.max_line_chars.value,
    maxLines: r.max_lines.value,
    minCue: r.min_cue_ms.value,
    maxCue: r.max_cue_ms.value,
    maxCps: r.max_cps.value,
    gapFrames: r.min_gap_frames.value,
    fps: d.fps_default.value,
    silenceSplit: d.silence_split_ms.value,
    hold: d.hold_ms.value,
    longGapWarn: d.long_gap_warn_ms.value,
    durTol: d.video_duration_tolerance_ms.value,
    capsMax: d.auto_protect_caps_max_tokens.value,
    maxSound: d.max_sound_cues.value,
    pClause: d.penalty_break_clause.value,
    pWord: d.penalty_break_word.value,
    pInner: d.penalty_inner_sentence_end.value,
    pSingle: d.penalty_single_word_cue.value,
    pLineWord: d.penalty_line_break_word.value,
  };
};

// ---------------------------------------------------------------- input validation (structure → code 2)

const isObj = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);

export const validateInputStructure = (input) => {
  if (!isObj(input)) throw new CaptionError(2, 'input is not a JSON object');
  if (input.schema !== INPUT_SCHEMA) throw new CaptionError(2, `schema must be "${INPUT_SCHEMA}"`, {schema: input.schema ?? null});
  if (typeof input.video_id !== 'string' || !/^[A-Za-z0-9_-]+$/.test(input.video_id)) throw new CaptionError(2, 'video_id must match [A-Za-z0-9_-]+');
  if (input.language !== 'en') throw new CaptionError(2, 'language must be "en" (CAPTION-PROTOCOL.md §5)');
  if (!Array.isArray(input.words) || input.words.length === 0) throw new CaptionError(2, 'words must be a non-empty array');
  input.words.forEach((w, i) => {
    if (!isObj(w) || typeof w.w !== 'string' || w.w.length === 0) throw new CaptionError(2, `words[${i}].w must be a non-empty string`);
    toMs(w.start, `words[${i}].start`);
    toMs(w.end, `words[${i}].end`);
  });
  if (input.video_duration_s !== undefined) toMs(input.video_duration_s, 'video_duration_s');
  if (input.fps !== undefined && (typeof input.fps !== 'number' || !(input.fps > 0))) throw new CaptionError(2, 'fps must be a positive number');
  for (const k of ['timeline_edits', 'terms', 'display_map', 'sound_cues']) {
    if (input[k] !== undefined && !Array.isArray(input[k])) throw new CaptionError(2, `${k} must be an array`);
  }
  (input.timeline_edits ?? []).forEach((e, i) => {
    if (!isObj(e)) throw new CaptionError(2, `timeline_edits[${i}] must be an object`);
    toMs(e.at_s, `timeline_edits[${i}].at_s`);
    const ins = e.insert_s !== undefined;
    const rem = e.remove_s !== undefined;
    if (ins === rem) throw new CaptionError(2, `timeline_edits[${i}] needs exactly one of insert_s / remove_s`);
    const v = toMs(ins ? e.insert_s : e.remove_s, `timeline_edits[${i}].${ins ? 'insert_s' : 'remove_s'}`);
    if (v <= 0) throw new CaptionError(2, `timeline_edits[${i}] amount must be > 0`);
  });
  (input.terms ?? []).forEach((t, i) => {
    if (!isObj(t) || typeof t.text !== 'string' || tokenize(t.text).length === 0) throw new CaptionError(2, `terms[${i}].text must be a non-empty string`);
    if (!TERM_KINDS.has(t.kind)) throw new CaptionError(2, `terms[${i}].kind must be one of ${[...TERM_KINDS].join(', ')}`);
  });
  (input.display_map ?? []).forEach((m, i) => {
    if (!isObj(m) || typeof m.spoken !== 'string' || typeof m.display !== 'string' || !m.spoken.trim() || !m.display.trim()) {
      throw new CaptionError(2, `display_map[${i}] needs non-empty "spoken" and "display" strings`);
    }
  });
  (input.sound_cues ?? []).forEach((s, i) => {
    if (!isObj(s) || typeof s.text !== 'string') throw new CaptionError(2, `sound_cues[${i}] must be {text, start_s, end_s}`);
    toMs(s.start_s, `sound_cues[${i}].start_s`);
    toMs(s.end_s, `sound_cues[${i}].end_s`);
  });
};

// ---------------------------------------------------------------- display_map authorisation (QC → code 1)

/** Only number / currency / date / measure; display must contain a digit; every word in display must be spoken; spoken must carry a number. */
export const checkDisplayMapEntry = (m, i) => {
  const why = [];
  if (!MAP_KINDS.has(m.kind)) why.push(`kind "${m.kind}" not allowed (allowed: ${[...MAP_KINDS].join(', ')})`);
  if (!/\p{N}/u.test(m.display)) why.push('display contains no digit');
  const spokenNorm = tokenize(m.spoken).map(normalizeToken).filter(Boolean);
  if (!spokenNorm.some((t) => NUMBER_WORDS.has(t) || /\p{N}/u.test(t) || t.split('-').some((p) => NUMBER_WORDS.has(p)))) {
    why.push('spoken text contains no number');
  }
  const spokenSet = new Set(spokenNorm.flatMap((t) => [t, ...t.split('-')]));
  const extra = tokenize(m.display)
    .map(normalizeToken)
    .filter((t) => t && /^\p{L}+$/u.test(t) && !spokenSet.has(t));
  if (extra.length) why.push(`display adds words not in spoken text: ${extra.join(', ')}`);
  if (why.length) throw new CaptionError(1, `display_map[${i}] is not an authorised number/currency/date/measure mapping: ${why.join('; ')}`, {entry: i, spoken: m.spoken, display: m.display});
};

// ---------------------------------------------------------------- main build

/**
 * @param input caption-input object (transcript already resolved into input.transcript text)
 * @param config caption-config object
 * @param opts {measuredDurationMs?: number, inputSha256?, transcriptSha256?, configSha256?}
 * @returns {srt: string|null, qc: object, exitCode: number}
 */
export const buildCaptions = (input, config, opts = {}) => {
  const R = ruleValues(config);
  const qc = newQc(input, config, opts);
  try {
    validateInputStructure(input);
    if (typeof input.transcript !== 'string' || tokenize(input.transcript).length === 0) throw new CaptionError(2, 'transcript text is empty or missing');
    const fps = input.fps ?? R.fps;
    const gap = Math.ceil((R.gapFrames * 1000) / fps);
    qc.config_effective = {fps, min_gap_ms: gap, max_line_chars: R.maxLine, max_lines: R.maxLines, min_cue_ms: R.minCue, max_cue_ms: R.maxCue, max_cps: R.maxCps};

    // Video duration contract: supplied and/or measured; at least one; both must agree within tolerance.
    const supplied = input.video_duration_s !== undefined ? toMs(input.video_duration_s, 'video_duration_s') : null;
    const measured = Number.isInteger(opts.measuredDurationMs) ? opts.measuredDurationMs : null;
    if (supplied === null && measured === null) throw new CaptionError(2, 'video duration missing: give video_duration_s in the input or --video <final render>');
    qc.video_duration = {supplied_ms: supplied, measured_ms: measured, tolerance_ms: R.durTol, used_ms: measured ?? supplied};
    if (supplied !== null && measured !== null && Math.abs(supplied - measured) > R.durTol) {
      throw new CaptionError(1, `video_duration_s (${sec(supplied)} s) differs from measured final video (${sec(measured)} s) by more than ${R.durTol} ms`);
    }
    const videoMs = measured ?? supplied;

    // Words → ms; timing safety on source timeline.
    let words = input.words.map((w, i) => ({i, raw: w.w, norm: normalizeToken(w.w), start: toMs(w.start, `words[${i}].start`), end: toMs(w.end, `words[${i}].end`)}));
    checkTiming(words);
    words = applyEdits(words, input.timeline_edits ?? []);
    const timed = words.filter((w) => w.norm);
    const lastEnd = Math.max(...words.map((w) => w.end));
    if (lastEnd > videoMs) throw new CaptionError(1, `word timing ends at ${sec(lastEnd)} s, after the end of the video (${sec(videoMs)} s)`);

    // Alignment against the canonical spoken transcript (exact, ordered).
    const tTokens = tokenize(input.transcript);
    const tTimed = tTokens.map((raw, k) => ({k, raw, norm: normalizeToken(raw)})).filter((t) => t.norm);
    qc.alignment = alignmentReport(tTimed, timed);
    if (qc.alignment.status !== 'MATCH') {
      throw new CaptionError(1, `transcript/timing mismatch at aligned position ${qc.alignment.first_mismatch.position}`, qc.alignment.first_mismatch);
    }
    const punctDiffs = tTimed.filter((t, j) => t.raw !== timed[j].raw).length;
    if (punctDiffs) qc.warnings.push({code: 'PUNCTUATION_DIFFERS', message: `${punctDiffs} timing word(s) differ from the transcript only in punctuation/case; transcript text is used`});

    // Units: one per spoken token (with times); punctuation-only tokens are glued to a neighbour.
    let units = [];
    let pending = '';
    let pendingTokens = [];
    tTokens.forEach((raw, k) => {
      const norm = normalizeToken(raw);
      if (!norm) {
        if (units.length) {
          const u = units[units.length - 1];
          u.text += ' ' + raw;
          u.tokens.push(k);
        } else {
          pending += raw + ' ';
          pendingTokens.push(k);
        }
        return;
      }
      const w = timed[units.length];
      units.push({text: pending + raw, tokens: [...pendingTokens, k], start: w.start, end: w.end, protected: false, mapped: null});
      pending = '';
      pendingTokens = [];
    });
    if (pending) throw new CaptionError(1, 'transcript contains only punctuation');

    // display_map (explicit, authorised entries only; longest spoken first; left to right).
    const entries = (input.display_map ?? []).map((m, i) => {
      checkDisplayMapEntry(m, i);
      return {i, kind: m.kind, spoken: m.spoken, display: m.display, toks: tokenize(m.spoken).map(normalizeToken).filter(Boolean), used: 0, evidence_ref: m.evidence_ref ?? null};
    });
    entries.sort((a, b) => b.toks.length - a.toks.length || a.i - b.i);
    const applied = [];
    if (entries.length) {
      const out = [];
      for (let p = 0; p < units.length; ) {
        let hit = null;
        for (const e of entries) {
          const m = e.toks.length;
          if (p + m > units.length) continue;
          let ok = true;
          for (let q = 0; q < m && ok; q++) {
            const u = units[p + q];
            if (u.mapped || normalizeToken(u.text) !== e.toks[q]) ok = false;
            if (q < m - 1 && /[^\p{L}\p{N}]$/u.test(u.text)) ok = false; // no punctuation inside the spoken span
            if (q > 0 && /^[^\p{L}\p{N}]/u.test(u.text)) ok = false;
          }
          if (ok) {
            hit = e;
            break;
          }
        }
        if (!hit) {
          out.push(units[p]);
          p++;
          continue;
        }
        const span = units.slice(p, p + hit.toks.length);
        const first = span[0].text;
        const last = span[span.length - 1].text;
        const lead = first.match(/^[^\p{L}\p{N}$€£¥]*/u)[0];
        const trail = last.match(/[^\p{L}\p{N}%]*$/u)[0];
        const sourceText = span.map((u) => u.text).join(' ');
        const text = lead + hit.display + trail;
        hit.used++;
        applied.push({entry: hit.i, kind: hit.kind, source_text: sourceText, display_text: text, start_s: sec(span[0].start), evidence_ref: hit.evidence_ref, token_range: [span[0].tokens[0], span[span.length - 1].tokens[span[span.length - 1].tokens.length - 1]]});
        out.push({text, tokens: span.flatMap((u) => u.tokens), start: span[0].start, end: span[span.length - 1].end, protected: true, mapped: hit.i});
        p += hit.toks.length;
      }
      units = out;
    }
    for (const e of entries) if (!e.used) qc.warnings.push({code: 'DISPLAY_MAP_UNUSED', message: `display_map[${e.i}] "${e.spoken}" never matched the transcript; nothing was changed`});
    qc.display_map_applied = applied.sort((a, b) => a.token_range[0] - b.token_range[0]);

    // Term checks (spelling/case against the evidence-derived list) + no_break protection.
    const terms = (input.terms ?? []).map((t, i) => ({i, text: t.text, kind: t.kind, toks: tokenize(t.text), norm: tokenize(t.text).map(normalizeToken), noBreak: t.no_break !== false, ref: t.evidence_ref ?? null}));
    qc.term_checks = terms.map((t) => termCheck(t, tTokens));
    const bad = qc.term_checks.filter((c) => c.status === 'MISMATCH');
    if (bad.length) throw new CaptionError(1, `term spelling/case differs from the evidence-derived term list: ${bad.map((b) => `"${b.found[0]}" ≠ "${b.term}"`).join('; ')}`, bad);
    units = protectTerms(units, terms);
    units = protectCapitalChains(units, R, qc);

    qc.unresolved_terms = unresolvedTerms(tTokens, terms, applied);
    if (qc.unresolved_terms.length) qc.warnings.push({code: 'UNRESOLVED_TERMS', message: `${qc.unresolved_terms.length} capitalised word(s)/number(s) not in the term list — COO review required before Release Gate G-03`});

    // Flags per unit.
    units.forEach((u, idx) => {
      u.sentenceEnd = SENTENCE_END.test(u.text);
      u.clause = !u.sentenceEnd && CLAUSE_END.test(u.text);
      u.sentenceStart = idx === 0 || units[idx - 1].sentenceEnd;
      if (u.text.length > R.maxLine) throw new CaptionError(1, `protected text longer than ${R.maxLine} characters cannot be placed without splitting: "${u.text}"`);
    });

    // Sound cues ("[music]" only, at most N, outside speech).
    const sounds = validateSounds(input.sound_cues ?? [], units, R, gap, videoMs);

    // Segmentation.
    const cues = segment(units, sounds, R, gap, videoMs);
    for (const s of sounds) cues.push({start: s.start, end: s.end, lines: [s.text], sound: true});
    cues.sort((a, b) => a.start - b.start);

    const srt = cues.map((c, n) => `${n + 1}\r\n${formatSrtTime(c.start)} --> ${formatSrtTime(c.end)}\r\n${c.lines.join('\r\n')}\r\n`).join('\r\n');

    // Independent final validation of the produced SRT.
    const expected = expectedDisplay(tTokens, applied);
    const v = validateSrt(srt, {expected, R, gap, videoMs});
    fillStats(qc, v, videoMs, R);
    if (v.errors.length) throw new CaptionError(1, `generated SRT failed validation: ${v.errors[0]}`, v.errors);
    qc.srt_sha256 = sha256(Buffer.from(srt, 'utf8'));
    qc.result = 'PASS';
    return {srt, qc: finalize(qc), exitCode: 0};
  } catch (e) {
    if (!(e instanceof CaptionError)) throw e;
    qc.errors.push({code: e.code === 2 ? 'MALFORMED_INPUT' : 'QC_FAIL', message: e.message, detail: e.detail});
    qc.result = 'FAIL';
    return {srt: null, qc: finalize(qc), exitCode: e.code};
  }
};

// ---------------------------------------------------------------- helpers

const newQc = (input, config, opts) => ({
  schema: QC_SCHEMA,
  tool_version: TOOL_VERSION,
  result: 'FAIL',
  video_id: isObj(input) && typeof input.video_id === 'string' ? input.video_id : null,
  language: isObj(input) ? input.language ?? null : null,
  inputs: {input_sha256: opts.inputSha256 ?? null, transcript_sha256: opts.transcriptSha256 ?? null, config_sha256: opts.configSha256 ?? null, config_schema: config.schema},
  config_effective: null,
  video_duration: null,
  alignment: null,
  caption_count: 0,
  total_duration_ms: null,
  longest_caption: null,
  shortest_caption: null,
  max_cps: null,
  longest_gap: null,
  overlaps: [],
  display_map_applied: [],
  term_checks: [],
  unresolved_terms: [],
  warnings: [],
  errors: [],
  srt_sha256: null,
});

const finalize = (qc) => qc;

const checkTiming = (words) => {
  let prev = null;
  for (const w of words) {
    if (w.norm) {
      if (w.end <= w.start) throw new CaptionError(1, `word ${w.i} "${w.raw}": end (${sec(w.end)}) <= start (${sec(w.start)})`, {word: w.i});
    } else if (w.end < w.start) {
      throw new CaptionError(1, `token ${w.i} "${w.raw}": end < start`, {word: w.i});
    }
    if (prev) {
      if (w.start < prev.start) throw new CaptionError(1, `word ${w.i} "${w.raw}" starts before the previous word (timestamps out of order)`, {word: w.i});
      if (w.norm && w.norm === prev.norm && w.start === prev.start && w.end === prev.end) throw new CaptionError(1, `word ${w.i} "${w.raw}" is a duplicate of the previous timing entry`, {word: w.i});
      if (w.norm && prev.norm && w.start < prev.end) throw new CaptionError(1, `word ${w.i} "${w.raw}" overlaps the previous word "${prev.raw}" (${sec(w.start)} < ${sec(prev.end)})`, {word: w.i});
    }
    if (w.norm) prev = w;
  }
};

const applyEdits = (words, edits) => {
  if (!edits.length) return words;
  const es = edits
    .map((e, i) => ({i, at: toMs(e.at_s, 'at_s'), amt: e.insert_s !== undefined ? toMs(e.insert_s, 'insert_s') : -toMs(e.remove_s, 'remove_s')}))
    .sort((a, b) => a.at - b.at || a.i - b.i);
  for (const w of words) {
    for (const e of es) {
      if (e.amt > 0 && w.start < e.at && e.at < w.end) throw new CaptionError(1, `timeline_edits[${e.i}] inserts time inside word ${w.i} "${w.raw}"`);
      if (e.amt < 0 && w.start < e.at - e.amt && w.end > e.at) throw new CaptionError(1, `timeline_edits[${e.i}] removes time that contains speech (word ${w.i} "${w.raw}")`);
    }
  }
  return words.map((w) => {
    const off = es.filter((e) => e.at <= w.start).reduce((s, e) => s + e.amt, 0);
    if (w.start + off < 0) throw new CaptionError(1, `timeline_edits move word ${w.i} before 0`);
    return {...w, start: w.start + off, end: w.end + off};
  });
};

const alignmentReport = (tTimed, timed) => {
  const n = Math.min(tTimed.length, timed.length);
  for (let j = 0; j < n; j++) {
    if (tTimed[j].norm !== timed[j].norm) return mismatch(j, tTimed, timed);
  }
  if (tTimed.length !== timed.length) return mismatch(n, tTimed, timed);
  return {status: 'MATCH', transcript_tokens: tTimed.length, timing_words: timed.length, first_mismatch: null};
};

const mismatch = (j, tTimed, timed) => ({
  status: 'MISMATCH',
  transcript_tokens: tTimed.length,
  timing_words: timed.length,
  first_mismatch: {
    position: j,
    transcript_token: tTimed[j]?.raw ?? null,
    timing_word: timed[j]?.raw ?? null,
    transcript_context: tTimed.slice(Math.max(0, j - 3), j + 4).map((t) => t.raw).join(' '),
    timing_context: timed.slice(Math.max(0, j - 3), j + 4).map((t) => t.raw).join(' '),
    kind: j >= timed.length ? 'MISSING_TIMING' : j >= tTimed.length ? 'EXTRA_TIMING' : 'DIFFERENT_WORD',
  },
});

const termCheck = (t, tTokens) => {
  const norm = tTokens.map(normalizeToken);
  const found = [];
  let occurrences = 0;
  for (let p = 0; p + t.norm.length <= tTokens.length; p++) {
    let ok = true;
    for (let q = 0; q < t.norm.length && ok; q++) if (norm[p + q] !== t.norm[q]) ok = false;
    if (!ok) continue;
    occurrences++;
    const raw = tTokens
      .slice(p, p + t.norm.length)
      .map((x) => x.replace(/^[^\p{L}\p{N}$€£¥]+|[^\p{L}\p{N}%]+$/gu, ''))
      .join(' ');
    const want = t.toks.map((x) => x.replace(/^[^\p{L}\p{N}$€£¥]+|[^\p{L}\p{N}%]+$/gu, '')).join(' ');
    if (raw !== want && !found.includes(raw)) found.push(raw);
  }
  return {term: t.text, kind: t.kind, evidence_ref: t.ref, occurrences, status: found.length ? 'MISMATCH' : occurrences ? 'OK' : 'NOT_FOUND', found};
};

const mergeUnits = (span) => ({
  text: span.map((u) => u.text).join(' '),
  tokens: span.flatMap((u) => u.tokens),
  start: span[0].start,
  end: span[span.length - 1].end,
  protected: true,
  mapped: span.find((u) => u.mapped !== null)?.mapped ?? null,
});

const protectTerms = (units, terms) => {
  const multi = terms.filter((t) => t.noBreak && t.norm.length > 1).sort((a, b) => b.norm.length - a.norm.length || a.i - b.i);
  if (!multi.length) return units;
  const out = [];
  for (let p = 0; p < units.length; ) {
    let len = 0;
    for (const t of multi) {
      const m = t.norm.length;
      if (p + m > units.length) continue;
      let ok = true;
      for (let q = 0; q < m && ok; q++) {
        if (units[p + q].mapped !== null || normalizeToken(units[p + q].text) !== t.norm[q]) ok = false;
      }
      if (ok) {
        len = m;
        break;
      }
    }
    if (len) {
      out.push(mergeUnits(units.slice(p, p + len)));
      p += len;
    } else {
      out.push(units[p]);
      p++;
    }
  }
  return out;
};

const protectCapitalChains = (units, R, qc) => {
  const out = [];
  for (let p = 0; p < units.length; ) {
    let q = p;
    while (
      q < units.length &&
      !units[q].protected &&
      /^\p{Lu}/u.test(units[q].text) &&
      (q === p || !/[^\p{L}\p{N}]$/u.test(units[q - 1].text))
    ) {
      q++;
    }
    const len = q - p;
    if (len >= 2 && len <= R.capsMax) {
      const merged = mergeUnits(units.slice(p, q));
      if (merged.text.length <= R.maxLine) {
        out.push(merged);
        p = q;
        continue;
      }
    }
    if (len > R.capsMax) qc.warnings.push({code: 'CAPS_CHAIN_NOT_PROTECTED', message: `capitalised sequence of ${len} words not kept together: "${units.slice(p, q).map((u) => u.text).join(' ')}"`});
    const take = Math.max(1, len > R.capsMax ? len : 1);
    for (let k = p; k < p + take; k++) out.push(units[k]);
    p += take;
  }
  return out;
};

const unresolvedTerms = (tTokens, terms, applied) => {
  const known = new Set(terms.flatMap((t) => t.norm));
  const mappedTokens = new Set(applied.flatMap((a) => {
    const r = [];
    for (let k = a.token_range[0]; k <= a.token_range[1]; k++) r.push(k);
    return r;
  }));
  const seen = new Set();
  const out = [];
  tTokens.forEach((raw, k) => {
    const norm = normalizeToken(raw);
    if (!norm || known.has(norm) || mappedTokens.has(k)) return;
    const prev = k > 0 ? tTokens[k - 1] : null;
    const sentenceStart = k === 0 || SENTENCE_END.test(prev);
    const core = raw.replace(/^[^\p{L}\p{N}$€£¥]+|[^\p{L}\p{N}%]+$/gu, '');
    const hasDigit = /\p{N}/u.test(core);
    const capital = /^\p{Lu}/u.test(core) && !sentenceStart && core !== 'I';
    if ((hasDigit || capital) && !seen.has(core)) {
      seen.add(core);
      out.push({text: core, first_token: k, kind: hasDigit ? 'number' : 'capitalised'});
    }
  });
  return out;
};

const validateSounds = (list, units, R, gap, videoMs) => {
  if (list.length > R.maxSound) throw new CaptionError(1, `at most ${R.maxSound} sound cue allowed (CAPTION-PROTOCOL.md §3)`);
  return list.map((s, i) => {
    if (s.text !== '[music]') throw new CaptionError(1, `sound_cues[${i}] text must be "[music]" (CAPTION-PROTOCOL.md §3)`);
    const start = toMs(s.start_s, 'start_s');
    const end = toMs(s.end_s, 'end_s');
    if (end - start < R.minCue || end - start > R.maxCue) throw new CaptionError(1, `sound_cues[${i}] duration must be ${R.minCue}–${R.maxCue} ms`);
    if (end > videoMs) throw new CaptionError(1, `sound_cues[${i}] ends after the video`);
    for (const u of units) {
      if (u.start < end + gap && u.end > start - gap) throw new CaptionError(1, `sound_cues[${i}] overlaps speech ("${u.text}" at ${sec(u.start)} s)`);
    }
    return {start, end, text: s.text};
  });
};

/** Optimal deterministic segmentation over blocks (blocks split by silences ≥ silence_split_ms). */
const segment = (units, sounds, R, gap, videoMs) => {
  const obstacleAfter = (b) => {
    const nextSpeech = b + 1 < units.length ? units[b + 1].start : Infinity;
    const nextSound = sounds.filter((s) => s.start >= units[b].end).reduce((m, s) => Math.min(m, s.start), Infinity);
    const o = Math.min(nextSpeech, nextSound);
    return o === Infinity ? videoMs + gap : o;
  };
  const blocks = [];
  let s = 0;
  for (let k = 1; k <= units.length; k++) {
    if (k === units.length || units[k].start - units[k - 1].end >= R.silenceSplit || sounds.some((x) => x.start >= units[k - 1].end && x.end <= units[k].start)) {
      blocks.push([s, k - 1]);
      s = k;
    }
  }
  const cues = [];
  for (const [a0, b0] of blocks) {
    const n = b0 - a0 + 1;
    const best = new Array(n + 1).fill(null);
    best[0] = {cost: 0, prev: -1, cue: null};
    const reasons = new Map();
    for (let j = 1; j <= n; j++) {
      for (let i = j - 1; i >= 0; i--) {
        const a = a0 + i;
        const b = a0 + j - 1;
        const text = units.slice(a, b + 1).map((u) => u.text).join(' ');
        if (text.length > R.maxLine * R.maxLines + (R.maxLines - 1)) break;
        if (!best[i]) continue;
        const lay = layout(units.slice(a, b + 1), R);
        if (!lay) {
          reasons.set(`${a}-${b}`, 'line length');
          continue;
        }
        const tm = cueTiming(units, a, b, text.length, obstacleAfter(b), R, gap);
        if (tm.reason) {
          reasons.set(`${a}-${b}`, tm.reason);
          continue;
        }
        let cost = best[i].cost + lay.cost;
        const u = units[b];
        if (b !== b0) cost += u.sentenceEnd ? 0 : u.clause ? R.pClause : R.pWord;
        for (let k = a; k < b; k++) if (units[k].sentenceEnd) cost += R.pInner;
        if (a === b && !(units[a].sentenceStart && units[a].sentenceEnd)) cost += R.pSingle;
        if (!best[j] || cost < best[j].cost) best[j] = {cost, prev: i, cue: {start: tm.start, end: tm.end, lines: lay.lines}};
      }
    }
    if (!best[n]) {
      const why = [...new Set(reasons.values())].join(', ') || 'no candidate';
      const span = units.slice(a0, b0 + 1).map((u) => u.text).join(' ');
      throw new CaptionError(1, `no segmentation satisfies the hard caption rules for speech at ${sec(units[a0].start)}–${sec(units[b0].end)} s (${why}): "${span.slice(0, 120)}"`);
    }
    const out = [];
    for (let j = n; j > 0; j = best[j].prev) out.push(best[j].cue);
    cues.push(...out.reverse());
  }
  return cues;
};

/** ≤ max_lines lines of ≤ max_line_chars; split only between units; prefer punctuation, then balance; ties → earliest. */
const layout = (span, R) => {
  const texts = span.map((u) => u.text);
  const full = texts.join(' ');
  if (full.length <= R.maxLine) return {lines: [full], cost: 0};
  if (R.maxLines < 2) return null;
  let best = null;
  for (let k = 1; k < texts.length; k++) {
    const l1 = texts.slice(0, k).join(' ');
    const l2 = texts.slice(k).join(' ');
    if (l1.length > R.maxLine || l2.length > R.maxLine) continue;
    const brk = span[k - 1];
    const cost = (SENTENCE_END.test(brk.text) || CLAUSE_END.test(brk.text) ? 0 : R.pLineWord) + Math.abs(l1.length - l2.length);
    if (!best || cost < best.cost) best = {lines: [l1, l2], cost};
  }
  return best;
};

/** Cue start = first word; end = last word + hold, extended into silence only as far as needed for min duration / reading speed. */
const cueTiming = (units, a, b, chars, obstacle, R, gap) => {
  const start = units[a].start;
  const lastEnd = units[b].end;
  const limit = obstacle - gap;
  if (limit <= start) return {reason: 'gap to next cue'};
  if (Math.min(lastEnd, limit) - start > R.maxCue) return {reason: 'max duration'};
  let end = Math.min(lastEnd + R.hold, limit);
  const needCps = start + Math.ceil((chars * 1000) / R.maxCps);
  end = Math.max(end, start + R.minCue, needCps);
  end = Math.min(end, start + R.maxCue);
  if (end > limit) return {reason: end - start <= R.minCue ? 'min duration' : 'reading speed'};
  if (end - start < R.minCue) return {reason: 'min duration'};
  if ((chars * 1000) / (end - start) > R.maxCps) return {reason: 'reading speed'};
  return {start, end};
};

const expectedDisplay = (tTokens, applied) => {
  const out = [];
  const byStart = new Map(applied.map((a) => [a.token_range[0], a]));
  for (let k = 0; k < tTokens.length; ) {
    const a = byStart.get(k);
    if (a) {
      out.push(a.display_text);
      k = a.token_range[1] + 1;
    } else {
      out.push(tTokens[k]);
      k++;
    }
  }
  return out.join(' ');
};

/** Parses the SRT text independently and checks every hard rule + text equality. */
export const validateSrt = (srt, {expected, R, gap, videoMs}) => {
  const errors = [];
  const cues = [];
  if (srt.charCodeAt(0) === 0xfeff) errors.push('BOM present');
  if (!srt.endsWith('\r\n') || srt.endsWith('\r\n\r\n')) errors.push('file must end with exactly one CRLF');
  const blocks = srt.replace(/\r\n$/, '').split('\r\n\r\n');
  blocks.forEach((blk, idx) => {
    const lines = blk.split('\r\n');
    if (lines[0] !== String(idx + 1)) errors.push(`cue ${idx + 1}: bad sequence number "${lines[0]}"`);
    const m = /^(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})$/.exec(lines[1] ?? '');
    if (!m) {
      errors.push(`cue ${idx + 1}: bad timestamp line`);
      return;
    }
    const t = (h, mi, s, ms) => ((+h * 60 + +mi) * 60 + +s) * 1000 + +ms;
    const start = t(m[1], m[2], m[3], m[4]);
    const end = t(m[5], m[6], m[7], m[8]);
    const text = lines.slice(2);
    cues.push({index: idx + 1, start, end, lines: text, sound: text.length === 1 && text[0] === '[music]'});
  });
  cues.forEach((c, k) => {
    const d = c.end - c.start;
    if (d <= 0) errors.push(`cue ${c.index}: end <= start`);
    if (d < R.minCue) errors.push(`cue ${c.index}: duration ${d} ms < ${R.minCue}`);
    if (d > R.maxCue) errors.push(`cue ${c.index}: duration ${d} ms > ${R.maxCue}`);
    if (c.lines.length === 0 || c.lines.length > R.maxLines) errors.push(`cue ${c.index}: ${c.lines.length} lines`);
    c.lines.forEach((l) => {
      if (l.length > R.maxLine) errors.push(`cue ${c.index}: line longer than ${R.maxLine}`);
      if (!l.trim()) errors.push(`cue ${c.index}: empty line`);
    });
    const chars = c.lines.join(' ').length;
    c.cps = (chars * 1000) / d;
    if (!c.sound && c.cps > R.maxCps + 1e-9) errors.push(`cue ${c.index}: reading speed ${c.cps.toFixed(2)} > ${R.maxCps}`);
    if (c.end > videoMs) errors.push(`cue ${c.index}: ends after the video`);
    if (k > 0) {
      const p = cues[k - 1];
      if (c.start < p.end) errors.push(`cue ${c.index}: overlaps cue ${p.index}`);
      else if (c.start - p.end < gap) errors.push(`cue ${c.index}: gap ${c.start - p.end} ms < ${gap} ms`);
      if (c.start < p.start) errors.push(`cue ${c.index}: out of order`);
    }
  });
  const got = cues.filter((c) => !c.sound).map((c) => c.lines.join(' ')).join(' ');
  if (got !== expected) {
    let i = 0;
    while (i < got.length && got[i] === expected[i]) i++;
    errors.push(`caption text differs from expected display text at character ${i}: "${got.slice(i, i + 30)}" vs "${expected.slice(i, i + 30)}"`);
  }
  const overlaps = cues.filter((c, k) => k > 0 && c.start < cues[k - 1].end).map((c) => ({cue: c.index, previous: c.index - 1}));
  return {errors, cues, overlaps};
};

const fillStats = (qc, v, videoMs, R) => {
  const cues = v.cues;
  qc.caption_count = cues.length;
  qc.overlaps = v.overlaps;
  if (!cues.length) return;
  qc.total_duration_ms = cues[cues.length - 1].end - cues[0].start;
  const desc = (c) => ({index: c.index, start_s: sec(c.start), end_s: sec(c.end), duration_ms: c.end - c.start, chars: c.lines.join(' ').length, text: c.lines.join(' / ')});
  let longest = cues[0];
  let shortest = cues[0];
  let fastest = cues[0];
  for (const c of cues) {
    if (c.end - c.start > longest.end - longest.start) longest = c;
    if (c.end - c.start < shortest.end - shortest.start) shortest = c;
    if (c.cps > fastest.cps) fastest = c;
  }
  qc.longest_caption = desc(longest);
  qc.shortest_caption = desc(shortest);
  qc.max_cps = {index: fastest.index, cps: Math.round(fastest.cps * 100) / 100, limit: R.maxCps};
  let gapMax = null;
  for (let k = 1; k < cues.length; k++) {
    const g = cues[k].start - cues[k - 1].end;
    if (!gapMax || g > gapMax.gap_ms) gapMax = {after_cue: cues[k - 1].index, gap_ms: g};
  }
  qc.longest_gap = gapMax;
  if (gapMax && gapMax.gap_ms > R.longGapWarn) qc.warnings.push({code: 'LONG_GAP', message: `${gapMax.gap_ms} ms without captions after cue ${gapMax.after_cue}`});
  if (cues[cues.length - 1].end > videoMs) qc.warnings.push({code: 'PAST_END', message: 'last cue ends after video'});
};

/** Short human summary required by CAPTION-PROTOCOL.md §4 (`<VID>-caption-qc.md`), derived from the JSON. */
export const qcMarkdown = (qc, srtName) => {
  const L = [];
  L.push(`# ${qc.video_id ?? 'unknown'} — caption QC`);
  L.push('');
  L.push(`- Result: **${qc.result}** (tool ${qc.tool_version}; machine-readable report: \`${qc.video_id ?? 'caption'}-caption-qc.json\`)`);
  L.push(`- SRT: ${qc.result === 'PASS' ? `\`${srtName}\` (sha256 ${qc.srt_sha256})` : 'not produced'}`);
  if (qc.alignment) L.push(`- Transcript/timing alignment: ${qc.alignment.status} (${qc.alignment.transcript_tokens} transcript words / ${qc.alignment.timing_words} timed words)`);
  if (qc.video_duration) L.push(`- Video duration used: ${qc.video_duration.used_ms} ms (supplied ${qc.video_duration.supplied_ms ?? '—'}, measured ${qc.video_duration.measured_ms ?? '—'})`);
  L.push(`- Captions: ${qc.caption_count}; longest ${qc.longest_caption?.duration_ms ?? '—'} ms; shortest ${qc.shortest_caption?.duration_ms ?? '—'} ms; max reading speed ${qc.max_cps?.cps ?? '—'} cps; overlaps ${qc.overlaps.length}`);
  L.push(`- display_map applied: ${qc.display_map_applied.length}${qc.display_map_applied.map((a) => `\n  - "${a.source_text}" → "${a.display_text}" (${a.kind})`).join('')}`);
  L.push(`- Unresolved terms (COO review): ${qc.unresolved_terms.length ? qc.unresolved_terms.map((t) => t.text).join(', ') : 'none'}`);
  L.push(`- Errors: ${qc.errors.length ? qc.errors.map((e) => e.message).join(' | ') : 'none'}`);
  L.push(`- Warnings: ${qc.warnings.length ? qc.warnings.map((w) => `${w.code}: ${w.message}`).join(' | ') : 'none'}`);
  L.push('- Not covered here: YouTube Studio human sync check (CAPTION-PROTOCOL.md §6, Release Gate G-18/G-19) stays a separate final check.');
  return L.join('\n') + '\n';
};
