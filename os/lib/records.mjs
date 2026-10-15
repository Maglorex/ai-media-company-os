// Company OS v2 — kayıt dosyalarını okuyan yardımcılar (markdown tablo, CSV, git).
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findGit } from './gitbin.mjs';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const read = (rel) => readFileSync(join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
export const exists = (rel) => existsSync(join(ROOT, rel));
export const git = (...args) =>
  execFileSync(findGit(), args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).replace(/\r\n/g, '\n');

// `## <heading>` altındaki ilk markdown tablosunu nesne dizisine çevirir.
export function parseTable(md, heading) {
  const lines = md.split('\n');
  let i = lines.findIndex((l) => l.trim() === heading);
  if (i < 0) throw new Error(`heading not found: ${heading}`);
  while (i < lines.length && !lines[i].trim().startsWith('|')) i++;
  const split = (l) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  const header = split(lines[i]);
  const rows = [];
  for (let j = i + 2; j < lines.length && lines[j].trim().startsWith('|'); j++) {
    const cells = split(lines[j]);
    rows.push(Object.fromEntries(header.map((h, k) => [h, cells[k] ?? ''])));
  }
  return rows;
}

// Basit CSV (alanlar tırnaklı olabilir, tırnak içinde virgül olabilir).
export function parseCsv(text) {
  const rows = [];
  let field = '', row = [], q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  const [header, ...data] = rows.filter((r) => r.length > 1 || r[0] !== '');
  return data.map((r) => Object.fromEntries(header.map((h, k) => [h.replace(/^﻿/, ''), r[k] ?? ''])));
}

// decision-log.md'deki başlık ID'leri (sırayla).
export function decisionLogIds() {
  return [...read('company/decision-log.md').matchAll(/^### (D-\d{3}) /gm)].map((m) => m[1]);
}

// "D-012, D-013" gibi hücreden ID listesi
export const idsIn = (cell) => [...(cell || '').matchAll(/D-\d{3}/g)].map((m) => m[0]);
