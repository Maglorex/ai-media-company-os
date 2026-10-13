#!/usr/bin/env node
// Company OS — Caption/SRT tool (DF-4; .claude/skills/video-launch-os/CAPTION-PROTOCOL.md; Release Gate G-03).
// Company-owned script, Node built-ins only (no npm packages).
//
// build   : caption-input JSON → <VID>-captions-en-v<N>.srt (PASS only) + <VID>-caption-qc.json + <VID>-caption-qc.md (always)
//   node production/tools/captions/caption-build.mjs build --input <caption-input.json> --out-dir <dir> [--version 1] [--video <final render>] [--config <cfg.json>] [--ffprobe <path>]
// from-vo : vo-assemble timing map (or one vo-segments JSON) + locked transcript → caption-input JSON
//   node production/tools/captions/caption-build.mjs from-vo (--timing-map <X.timing.json> | --segment <seg.json>) --transcript <vo.txt> --video-id <VID> --out <caption-input.json> [--video-duration-s <s>]
//
// Exit codes: 0 PASS (warnings possible) · 1 QC FAIL · 2 malformed input / usage. No SRT is written unless PASS.

import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, renameSync, writeFileSync} from 'node:fs';
import {basename, dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildCaptions, CaptionError, INPUT_SCHEMA, qcMarkdown, sha256, TOOL_VERSION} from './lib/caption-core.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULT_CONFIG = join(HERE, 'caption-config.v1.json');
const DEFAULT_FFPROBE = resolve(HERE, '..', '..', 'remotion', 'node_modules', '@remotion', 'compositor-win32-x64-msvc', 'ffprobe.exe');

const args = (argv) => {
  const o = {_: []};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      o[k] = v;
    } else o._.push(argv[i]);
  }
  return o;
};

const fail = (code, msg) => {
  process.stderr.write(`caption-build: ${msg}\n`);
  process.exit(code);
};

export const probeDurationMs = (videoPath, ffprobe = DEFAULT_FFPROBE) => {
  if (!existsSync(videoPath)) throw new CaptionError(2, `--video not found: ${videoPath}`);
  if (!existsSync(ffprobe)) throw new CaptionError(2, `ffprobe not found: ${ffprobe}`);
  const out = execFileSync(ffprobe, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', videoPath], {encoding: 'utf8'}).trim();
  const s = Number(out);
  if (!Number.isFinite(s) || s <= 0) throw new CaptionError(2, `could not measure duration of ${videoPath} (ffprobe: "${out}")`);
  return Math.round(s * 1000);
};

const writeJson = (path, obj) => writeFileSync(path, JSON.stringify(obj, null, 2) + '\n', 'utf8');

const cmdBuild = (a) => {
  if (!a.input || !a['out-dir']) fail(2, 'build needs --input and --out-dir');
  const outDir = resolve(a['out-dir']);
  mkdirSync(outDir, {recursive: true});
  const version = a.version === undefined ? 1 : Number(a.version);
  if (!Number.isInteger(version) || version < 1) fail(2, '--version must be a positive integer');
  const configPath = a.config ? resolve(a.config) : DEFAULT_CONFIG;
  const configBuf = readFileSync(configPath);
  const config = JSON.parse(configBuf.toString('utf8'));

  let input = null;
  let inputBuf = null;
  let transcriptBuf = null;
  let measured;
  let result;
  try {
    inputBuf = readFileSync(resolve(a.input));
    try {
      input = JSON.parse(inputBuf.toString('utf8').replace(/^﻿/, ''));
    } catch (e) {
      throw new CaptionError(2, `input is not valid JSON: ${e.message}`);
    }
    if (input && typeof input === 'object') {
      const hasInline = typeof input.transcript === 'string';
      const hasFile = typeof input.transcript_file === 'string';
      if (hasInline === hasFile) throw new CaptionError(2, 'give exactly one of "transcript" (text) or "transcript_file" (path relative to the input file)');
      if (hasFile) {
        const p = resolve(dirname(resolve(a.input)), input.transcript_file);
        if (!existsSync(p)) throw new CaptionError(2, `transcript_file not found: ${input.transcript_file}`);
        transcriptBuf = readFileSync(p);
        input = {...input, transcript: transcriptBuf.toString('utf8').replace(/^﻿/, '')};
      } else {
        transcriptBuf = Buffer.from(input.transcript, 'utf8');
      }
    }
    if (a.video) measured = probeDurationMs(resolve(a.video), a.ffprobe ? resolve(a.ffprobe) : DEFAULT_FFPROBE);
    result = buildCaptions(input, config, {
      measuredDurationMs: measured,
      inputSha256: sha256(inputBuf),
      transcriptSha256: transcriptBuf ? sha256(transcriptBuf) : null,
      configSha256: sha256(configBuf),
    });
  } catch (e) {
    if (!(e instanceof CaptionError)) throw e;
    // Malformed before the core could run: still write a FAIL report.
    result = buildCaptions({schema: '__unreadable__'}, config, {inputSha256: inputBuf ? sha256(inputBuf) : null, configSha256: sha256(configBuf)});
    result.qc.errors = [{code: 'MALFORMED_INPUT', message: e.message, detail: e.detail ?? null}];
    result.qc.video_id = input && typeof input.video_id === 'string' ? input.video_id : null;
    result.exitCode = e.code;
  }

  const vid = result.qc.video_id && /^[A-Za-z0-9_-]+$/.test(result.qc.video_id) ? result.qc.video_id : 'unknown';
  const srtName = `${vid}-captions-en-v${version}.srt`;
  if (result.exitCode === 0 && result.srt) {
    const tmp = join(outDir, `.${srtName}.tmp`);
    writeFileSync(tmp, result.srt, 'utf8');
    renameSync(tmp, join(outDir, srtName));
    result.qc.srt_file = srtName;
  } else {
    result.qc.srt_file = null;
  }
  writeJson(join(outDir, `${vid}-caption-qc.json`), result.qc);
  writeFileSync(join(outDir, `${vid}-caption-qc.md`), qcMarkdown(result.qc, srtName), 'utf8');
  process.stdout.write(`${result.qc.result}: ${vid} · captions ${result.qc.caption_count} · errors ${result.qc.errors.length} · warnings ${result.qc.warnings.length}${result.exitCode === 0 ? ` · ${srtName}` : ' · no SRT written'}\n`);
  process.exit(result.exitCode);
};

const cmdFromVo = (a) => {
  if (!a.transcript || !a['video-id'] || !a.out || (!a['timing-map'] === !a.segment)) fail(2, 'from-vo needs --transcript, --video-id, --out and exactly one of --timing-map / --segment');
  let words = [];
  let provenance;
  if (a['timing-map']) {
    const map = JSON.parse(readFileSync(resolve(a['timing-map']), 'utf8').replace(/^﻿/, ''));
    if (!Array.isArray(map.segments)) fail(2, 'timing map has no "segments" array (expected vo-assemble output)');
    for (const s of map.segments) {
      if (typeof s.offset_s !== 'number' || !Array.isArray(s.words_local)) fail(2, `segment ${s.id ?? '?'} lacks offset_s / words_local`);
      for (const w of s.words_local) words.push({w: w.w, start: Math.round((s.offset_s + w.start) * 1000) / 1000, end: Math.round((s.offset_s + w.end) * 1000) / 1000, seg: s.id});
    }
    provenance = {timing_map: basename(a['timing-map']), segments: map.segments.map((s) => s.id)};
  } else {
    const seg = JSON.parse(readFileSync(resolve(a.segment), 'utf8').replace(/^﻿/, ''));
    if (!Array.isArray(seg.words)) fail(2, 'segment JSON has no "words" array (expected vo-segments output)');
    words = seg.words.map((w) => ({w: w.w, start: w.start, end: w.end, seg: seg.id}));
    provenance = {segment: basename(a.segment), request_id: seg.request_id ?? null};
  }
  const out = {
    schema: INPUT_SCHEMA,
    video_id: String(a['video-id']),
    language: 'en',
    transcript_file: relativeFrom(resolve(a.out), resolve(a.transcript)),
    ...(a['video-duration-s'] !== undefined ? {video_duration_s: Number(a['video-duration-s'])} : {}),
    words,
    provenance: {...provenance, tool_version: TOOL_VERSION},
  };
  writeJson(resolve(a.out), out);
  process.stdout.write(`caption-input written: ${a.out} (${words.length} timed words)\n`);
};

const relativeFrom = (fromFile, target) => {
  const from = dirname(fromFile).split(/[\\/]/);
  const to = target.split(/[\\/]/);
  let i = 0;
  while (i < from.length && i < to.length && from[i].toLowerCase() === to[i].toLowerCase()) i++;
  return [...from.slice(i).map(() => '..'), ...to.slice(i)].join('/');
};

const main = () => {
  const a = args(process.argv.slice(2));
  const cmd = a._[0];
  if (cmd === 'build') return cmdBuild(a);
  if (cmd === 'from-vo') return cmdFromVo(a);
  fail(2, 'usage: caption-build.mjs build|from-vo … (see header)');
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
