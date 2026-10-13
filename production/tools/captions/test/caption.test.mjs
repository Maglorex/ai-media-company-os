// DF-4 caption tool tests — synthetic fixtures only (no project/P3 data). Run: node --test production/tools/captions/test/
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {existsSync, mkdtempSync, readFileSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildCaptions} from '../lib/caption-core.mjs';
import {makeInput, makeWords} from './helpers.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOOL = join(HERE, '..', 'caption-build.mjs');
const FIX = join(HERE, 'fixtures');
const config = JSON.parse(readFileSync(join(HERE, '..', 'caption-config.v1.json'), 'utf8'));
const R = {maxLine: 42, maxLines: 2, minCue: 1000, maxCue: 7000, maxCps: 20};

const cli = (...args) => spawnSync(process.execPath, [TOOL, ...args], {encoding: 'utf8'});
const tmp = () => mkdtempSync(join(tmpdir(), 'captest-'));
const parse = (srt) =>
  srt
    .replace(/\r\n$/, '')
    .split('\r\n\r\n')
    .map((b) => {
      const l = b.split('\r\n');
      const [s, e] = l[1].split(' --> ').map((x) => {
        const [h, m, rest] = x.split(':');
        const [sec, ms] = rest.split(',');
        return ((+h * 60 + +m) * 60 + +sec) * 1000 + +ms;
      });
      return {start: s, end: e, lines: l.slice(2)};
    });
const assertRules = (srt) => {
  const cues = parse(srt);
  cues.forEach((c, k) => {
    assert.ok(c.lines.length >= 1 && c.lines.length <= R.maxLines, 'line count');
    c.lines.forEach((l) => assert.ok(l.length <= R.maxLine, `line too long: ${l}`));
    const d = c.end - c.start;
    assert.ok(d >= R.minCue && d <= R.maxCue, `duration ${d}`);
    assert.ok((c.lines.join(' ').length * 1000) / d <= R.maxCps + 1e-9, 'cps');
    if (k) assert.ok(c.start - cues[k - 1].end >= 67, 'gap ≥ 2 frames');
  });
  return cues;
};
const text = (srt) => parse(srt).map((c) => c.lines.join(' ')).join(' ');

test('01 normal narration: PASS, rules hold, byte-identical to golden SRT', () => {
  const out = tmp();
  const r = cli('build', '--input', join(FIX, 'normal.input.json'), '--out-dir', out);
  assert.equal(r.status, 0, r.stderr);
  const srt = readFileSync(join(out, 'TEST-001-captions-en-v1.srt'));
  assert.deepEqual(srt, readFileSync(join(FIX, 'normal.expected.srt')));
  assertRules(srt.toString('utf8'));
  const qc = JSON.parse(readFileSync(join(out, 'TEST-001-caption-qc.json'), 'utf8'));
  assert.equal(qc.result, 'PASS');
  assert.equal(qc.alignment.status, 'MATCH');
  assert.equal(text(srt.toString('utf8')), readFileSync(join(FIX, 'normal.transcript.txt'), 'utf8').trim());
});

test('02 punctuation: timing words without punctuation; punctuation comes from the transcript', () => {
  const t = 'First, the crew tested the valve; then, at noon, they opened it. Was it safe? Nobody knew!';
  const r = buildCaptions(makeInput(t, {}, {stripPunct: true}), config);
  assert.equal(r.exitCode, 0, JSON.stringify(r.qc.errors));
  assert.equal(text(r.srt), t);
  assert.ok(r.qc.warnings.some((w) => w.code === 'PUNCTUATION_DIFFERS'));
  assertRules(r.srt);
});

test('03 long sentence: split into several cues at meaning boundaries, all hard rules hold', () => {
  const t =
    'Over the following decade the harbour board, which had borrowed heavily against future tolls, rebuilt the eastern quay, dredged the channel twice, and finally sold the old crane yard to a private operator in the north.';
  const r = buildCaptions(makeInput(t), config);
  assert.equal(r.exitCode, 0, JSON.stringify(r.qc.errors));
  const cues = assertRules(r.srt);
  assert.ok(cues.length >= 2);
  assert.equal(text(r.srt), t);
  // prefer clause boundaries: every cue except the last ends with punctuation
  cues.slice(0, -1).forEach((c) => assert.match(c.lines[c.lines.length - 1], /[,;.]$/));
});

test('04 short sentence: own cue, ≥1 s on screen, no single-word fragment', () => {
  const t = 'The tower was finished in spring after a long winter of delays. There was only one. Everyone else had left the valley by then.';
  const r = buildCaptions(makeInput(t), config);
  assert.equal(r.exitCode, 0, JSON.stringify(r.qc.errors));
  const cues = assertRules(r.srt);
  const c = cues.find((x) => x.lines.join(' ') === 'There was only one.');
  assert.ok(c, 'short sentence has its own cue');
  assert.ok(c.end - c.start >= 1000);
  assert.ok(cues.every((x) => x.lines.join(' ').split(' ').length > 1));
});

test('05 numbers and dates are never split', () => {
  const t = 'In 1967 and 1968, the annual fee for the old pier rose to $1,162,000 under a 2-1/2-year agreement with the city.';
  const r = buildCaptions(makeInput(t), config);
  assert.equal(r.exitCode, 0, JSON.stringify(r.qc.errors));
  const lines = parse(r.srt).flatMap((c) => c.lines);
  for (const n of ['1967', '1968,', '$1,162,000', '2-1/2-year']) assert.ok(lines.some((l) => l.split(' ').includes(n)), n);
  assertRules(r.srt);
});

test('06 proper names in the term list stay on one line', () => {
  const t = 'The inspectors from the Western Harbour Survey Commission arrived before dawn and walked the entire length of the breakwater.';
  const terms = [{text: 'Western Harbour Survey Commission', kind: 'organization', no_break: true}];
  const r = buildCaptions(makeInput(t, {terms}), config);
  assert.equal(r.exitCode, 0, JSON.stringify(r.qc.errors));
  assert.ok(parse(r.srt).some((c) => c.lines.some((l) => l.includes('Western Harbour Survey Commission'))));
  assert.equal(r.qc.term_checks[0].status, 'OK');
});

test('06b term spelling/case differs from the evidence term list → FAIL, no SRT', () => {
  const t = 'The RiverMark Bridge opened in spring.';
  const r = buildCaptions(makeInput(t, {terms: [{text: 'Rivermark Bridge', kind: 'name'}]}), config);
  assert.equal(r.exitCode, 1);
  assert.equal(r.srt, null);
  assert.equal(r.qc.term_checks[0].status, 'MISMATCH');
});

test('07 silence gaps force new cues; very long gaps are warned', () => {
  const t = 'The engines stopped. Nobody spoke for a while. Then the radio came back.';
  const toks = t.split(' ');
  const r = buildCaptions(makeInput(t, {}, {pauses: {[toks.indexOf('while.')]: 12000}}), config);
  assert.equal(r.exitCode, 0, JSON.stringify(r.qc.errors));
  const cues = assertRules(r.srt);
  assert.ok(cues.some((c) => c.lines.join(' ') === 'Then the radio came back.'));
  assert.ok(r.qc.warnings.some((w) => w.code === 'LONG_GAP'));
});

test('08 overlapping word timestamps → FAIL, no SRT, no repair', () => {
  const t = 'The cable snapped at noon.';
  const words = makeWords(t);
  words[2].start = words[1].end - 0.05;
  const r = buildCaptions(makeInput(t, {words}), config);
  assert.equal(r.exitCode, 1);
  assert.equal(r.srt, null);
  assert.match(r.qc.errors[0].message, /overlaps/);
});

test('09 malformed timestamps → exit 2 (CLI writes QC JSON, no SRT); NaN/negative/end<start rejected', () => {
  const out = tmp();
  const r = cli('build', '--input', join(FIX, 'malformed.input.json'), '--out-dir', out);
  assert.equal(r.status, 2);
  assert.ok(!existsSync(join(out, 'TEST-001-captions-en-v1.srt')));
  const qc = JSON.parse(readFileSync(join(out, 'TEST-001-caption-qc.json'), 'utf8'));
  assert.equal(qc.result, 'FAIL');
  const t = 'Two words.';
  const base = () => makeWords(t);
  const w1 = base();
  w1[0].start = Number.NaN;
  assert.equal(buildCaptions(makeInput(t, {words: w1}), config).exitCode, 2);
  const w2 = base();
  w2[1].end = -1;
  assert.equal(buildCaptions(makeInput(t, {words: w2}), config).exitCode, 2);
  const w3 = base();
  w3[1].end = w3[1].start;
  assert.equal(buildCaptions(makeInput(t, {words: w3}), config).exitCode, 1);
  const w4 = base();
  [w4[0], w4[1]] = [w4[1], w4[0]];
  assert.equal(buildCaptions(makeInput(t, {words: w4}), config).exitCode, 1);
});

test('10 transcript/timing mismatch (different, missing, extra, duplicate word) → FAIL with first mismatch', () => {
  const t = 'The dam held for forty years.';
  const diff = makeWords('The dam stood for forty years.');
  let r = buildCaptions(makeInput(t, {words: diff}), config);
  assert.equal(r.exitCode, 1);
  assert.equal(r.qc.alignment.first_mismatch.kind, 'DIFFERENT_WORD');
  assert.equal(r.qc.alignment.first_mismatch.position, 2);
  r = buildCaptions(makeInput(t, {words: makeWords(t).slice(0, -1)}), config);
  assert.equal(r.qc.alignment.first_mismatch.kind, 'MISSING_TIMING');
  r = buildCaptions(makeInput(t, {words: makeWords(t + ' Again.')}), config);
  assert.equal(r.qc.alignment.first_mismatch.kind, 'EXTRA_TIMING');
  const dup = makeWords(t);
  dup.splice(2, 0, {...dup[1]});
  r = buildCaptions(makeInput(t, {words: dup}), config);
  assert.equal(r.exitCode, 1);
  assert.equal(r.srt, null);
});

test('11 determinism: same input + config → byte-identical SRT and QC JSON (3 runs)', () => {
  const outs = [tmp(), tmp(), tmp()];
  for (const o of outs) assert.equal(cli('build', '--input', join(FIX, 'normal.input.json'), '--out-dir', o).status, 0);
  const files = ['TEST-001-captions-en-v1.srt', 'TEST-001-caption-qc.json', 'TEST-001-caption-qc.md'];
  for (const f of files) {
    const a = readFileSync(join(outs[0], f));
    for (const o of outs.slice(1)) assert.deepEqual(readFileSync(join(o, f)), a, f);
  }
});

test('12 timeline_edits shift timing; an insert inside a word fails', () => {
  const t = 'The first ship arrived. The second ship never came.';
  const words = makeWords(t);
  const at = (words[3].end + words[4].start) / 2;
  const r = buildCaptions(makeInput(t, {words, video_duration_s: 20, timeline_edits: [{at_s: at, insert_s: 2}]}), config);
  assert.equal(r.exitCode, 0, JSON.stringify(r.qc.errors));
  const cues = parse(r.srt);
  const second = cues.find((c) => c.lines.join(' ').startsWith('The second'));
  assert.equal(second.start, Math.round(words[4].start * 1000) + 2000);
  const bad = buildCaptions(makeInput(t, {words, video_duration_s: 20, timeline_edits: [{at_s: (words[1].start + words[1].end) / 2, insert_s: 1}]}), config);
  assert.equal(bad.exitCode, 1);
});

test('13 from-vo: vo-assemble style timing map → caption input → PASS', () => {
  const dir = tmp();
  const t = 'The pumps started at dawn. By noon the basin was dry.';
  writeFileSync(join(dir, 'vo.txt'), t + '\n');
  const all = makeWords(t, {startMs: 0});
  const map = {
    name: 'SYN_VO_full_v1',
    segments: [
      {id: 'S01', offset_s: 1.0, words_local: all.slice(0, 5)},
      {id: 'S02', offset_s: 2.5, words_local: all.slice(5)},
    ],
  };
  writeFileSync(join(dir, 'map.timing.json'), JSON.stringify(map));
  const r1 = cli('from-vo', '--timing-map', join(dir, 'map.timing.json'), '--transcript', join(dir, 'vo.txt'), '--video-id', 'SYN-001', '--out', join(dir, 'in.json'), '--video-duration-s', '12');
  assert.equal(r1.status, 0, r1.stderr);
  const inp = JSON.parse(readFileSync(join(dir, 'in.json'), 'utf8'));
  assert.equal(inp.words[0].start, 1.0);
  assert.equal(inp.words[5].start, Math.round((2.5 + all[5].start) * 1000) / 1000);
  const r2 = cli('build', '--input', join(dir, 'in.json'), '--out-dir', join(dir, 'out'));
  assert.equal(r2.status, 0, r2.stdout + r2.stderr);
});

test('14 timestamps beyond the video duration → FAIL', () => {
  const t = 'The light went out.';
  const r = buildCaptions(makeInput(t, {video_duration_s: 1}), config);
  assert.equal(r.exitCode, 1);
  assert.match(r.qc.errors[0].message, /after the end of the video/);
});

test('15 display_map approved number mapping: SRT shows display form, alignment stays against spoken transcript', () => {
  const t = 'Running the yard cost about one point one six million dollars a year.';
  const display_map = [{spoken: 'one point one six million dollars', display: '$1.16 million', kind: 'currency', evidence_ref: 'TEST-C-01'}];
  const r = buildCaptions(makeInput(t, {display_map}), config);
  assert.equal(r.exitCode, 0, JSON.stringify(r.qc.errors));
  assert.equal(r.qc.alignment.status, 'MATCH');
  assert.equal(r.qc.alignment.transcript_tokens, 13);
  assert.equal(text(r.srt), 'Running the yard cost about $1.16 million a year.');
  assert.deepEqual(
    r.qc.display_map_applied.map((a) => [a.source_text, a.display_text, a.kind]),
    [['one point one six million dollars', '$1.16 million', 'currency']],
  );
  // mapping cannot hide a timing mismatch: same map, wrong timing word inside the mapped span
  const bad = buildCaptions(makeInput(t, {display_map, words: makeWords('Running the yard cost about one point two six million dollars a year.')}), config);
  assert.equal(bad.exitCode, 1);
  assert.equal(bad.qc.alignment.status, 'MISMATCH');
});

test('16 unauthorised display transformations FAIL; nothing outside the map is ever changed', () => {
  const t = 'Running the yard cost about one point one six million dollars a year.';
  for (const m of [
    {spoken: 'about one point one six million dollars', display: 'roughly $1.16 million', kind: 'currency'}, // adds a word
    {spoken: 'cost about', display: 'cost ~', kind: 'phrase'}, // not a number/currency/date/measure
    {spoken: 'the yard', display: 'the yard 2', kind: 'number'}, // spoken has no number
  ]) {
    const r = buildCaptions(makeInput(t, {display_map: [m]}), config);
    assert.equal(r.exitCode, 1, JSON.stringify(m));
    assert.equal(r.srt, null);
  }
  const plain = buildCaptions(makeInput(t), config);
  assert.equal(plain.exitCode, 0);
  assert.equal(text(plain.srt), t);
  assert.equal(plain.qc.display_map_applied.length, 0);
});

test('17 supplied video_duration_s vs --video measurement outside tolerance → FAIL; missing both → exit 2', () => {
  const t = 'The bell rang.';
  assert.equal(buildCaptions(makeInput(t, {video_duration_s: 5}), config, {measuredDurationMs: 4900}).exitCode, 1);
  assert.equal(buildCaptions(makeInput(t, {video_duration_s: 5}), config, {measuredDurationMs: 5040}).exitCode, 0);
  const noDur = makeInput(t);
  delete noDur.video_duration_s;
  assert.equal(buildCaptions(noDur, config).exitCode, 2);
  // real ffprobe on a generated 3.000 s WAV (no media fixture stored in the repo)
  const ffprobe = join(HERE, '..', '..', '..', 'remotion', 'node_modules', '@remotion', 'compositor-win32-x64-msvc', 'ffprobe.exe');
  if (!existsSync(ffprobe)) return;
  const dir = tmp();
  const rate = 8000;
  const n = rate * 3;
  const b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0);
  b.writeUInt32LE(36 + n * 2, 4);
  b.write('WAVEfmt ', 8);
  b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22);
  b.writeUInt32LE(rate, 24);
  b.writeUInt32LE(rate * 2, 28);
  b.writeUInt16LE(2, 32);
  b.writeUInt16LE(16, 34);
  b.write('data', 36);
  b.writeUInt32LE(n * 2, 40);
  writeFileSync(join(dir, 'final.wav'), b);
  writeFileSync(join(dir, 'in.json'), JSON.stringify(makeInput(t, {video_duration_s: 6}, {startMs: 300})));
  const r = cli('build', '--input', join(dir, 'in.json'), '--out-dir', join(dir, 'o1'), '--video', join(dir, 'final.wav'));
  assert.equal(r.status, 1, r.stdout + r.stderr);
  writeFileSync(join(dir, 'in2.json'), JSON.stringify(makeInput(t, {video_duration_s: 3}, {startMs: 300})));
  const ok = cli('build', '--input', join(dir, 'in2.json'), '--out-dir', join(dir, 'o2'), '--video', join(dir, 'final.wav'));
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
});
