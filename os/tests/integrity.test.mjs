// Company OS v2 — deterministik sistem bütünlüğü testleri (D-042). Paket yok: `node --test "os/tests/*.test.mjs"`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT, read, exists, git, parseTable, parseCsv, decisionLogIds } from '../lib/records.mjs';
import { deriveLayer, scopeKind, config } from '../lib/precedence.mjs';

const walk = (dir) => readdirSync(join(ROOT, dir)).flatMap((n) => {
  const rel = `${dir}/${n}`;
  return statSync(join(ROOT, rel)).isDirectory() ? walk(rel) : [rel];
});
const tracked = new Set(git('ls-files').split('\n').filter(Boolean));
const frontmatter = (text) => {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  return m ? Object.fromEntries(m[1].split('\n').filter((l) => /^[a-zA-Z_-]+:/.test(l)).map((l) => [l.split(':')[0], l.slice(l.indexOf(':') + 1).trim()])) : null;
};

test('kernel dosyaları mevcut', () => {
  for (const f of ['CLAUDE.md', 'company/charter.md', '.claude/rules/governance.md', 'os/precedence.json', 'os/VERSION',
    'company/state/current-state.md', 'company/state/active-decisions.md', 'company/state/rule-registry.md', 'company/state/artifact-registry.csv',
    '.claude/rules/founder-approval.md', '.claude/rules/evidence-and-research.md', '.claude/rules/self-repair-and-escalation.md',
    '.claude/rules/company-memory.md', '.claude/rules/git-and-secrets.md', '.claude/rules/third-party-skill-security.md',
    'company/decision-log.md', 'company/lessons.md', 'company/machines.md', 'company/constraints.md', 'company/strategy.md']) {
    assert.ok(exists(f), `missing: ${f}`);
  }
});

test('.claude altındaki her dosya Git tarafından takip ediliyor (gitignore hiçbir kernel dosyasını yutmuyor)', () => {
  const missing = walk('.claude').filter((f) => !tracked.has(f));
  assert.deepEqual(missing, [], `untracked/ignored .claude files: ${missing.join(', ')}`);
  assert.ok(tracked.has('.claude/rules/git-and-secrets.md'), 'git-and-secrets.md must be tracked');
});

test('.gitignore: yalnız tek dosya adlı açık istisna; secret kalıpları korunuyor', () => {
  const gi = read('.gitignore').split('\n').map((l) => l.trim());
  for (const p of ['.env', '*secret*', '*credential*', '*.key', '*.pem']) assert.ok(gi.includes(p), `pattern missing: ${p}`);
  const negations = gi.filter((l) => l.startsWith('!'));
  for (const n of negations) assert.ok(!/[*?]/.test(n.slice(1)) || n === '!.env.example', `broad negation not allowed: ${n}`);
});

test('agent ve skill frontmatter: name = dosya/klasör adı, description dolu', () => {
  for (const f of readdirSync(join(ROOT, '.claude/agents'))) {
    const fm = frontmatter(read(`.claude/agents/${f}`));
    assert.ok(fm, `no frontmatter: ${f}`);
    assert.equal(fm.name, f.replace(/\.md$/, ''));
    assert.ok(fm.description && fm.tools, `agent fields: ${f}`);
  }
  for (const d of readdirSync(join(ROOT, '.claude/skills'))) {
    const fm = frontmatter(read(`.claude/skills/${d}/SKILL.md`));
    assert.ok(fm, `no frontmatter: ${d}`);
    assert.equal(fm.name, d);
    assert.ok(fm.description, `skill description: ${d}`);
  }
});

test('CLAUDE.md\'de adı geçen skill/agent\'lar mevcut', () => {
  const skills = new Set(readdirSync(join(ROOT, '.claude/skills')));
  const agents = new Set(readdirSync(join(ROOT, '.claude/agents')).map((f) => f.replace(/\.md$/, '')));
  const md = read('CLAUDE.md');
  const names = [...md.matchAll(/`([a-z]+(?:-[a-z]+)+)`/g)].map((m) => m[1]);
  const unknown = names.filter((n) => !skills.has(n) && !agents.has(n));
  assert.deepEqual([...new Set(unknown)], []);
});

test('rule registry: her kural dosyası tam bir kez, geçerli kapsam/sınıf/katman', () => {
  const rows = parseTable(read('company/state/rule-registry.md'), '## Kurallar');
  const files = readdirSync(join(ROOT, '.claude/rules')).map((f) => `.claude/rules/${f}`).sort();
  const listed = rows.map((x) => x.Dosya.replace(/`/g, ''));
  assert.deepEqual([...listed].sort(), files);
  assert.equal(new Set(listed).size, listed.length, 'duplicate rule rows');
  for (const row of rows) {
    const cls = row['Sınıf'];
    scopeKind(row.Kapsam);
    if (cls === 'MIXED') assert.equal(row.Durum, 'PENDING-STAGE-2', `MIXED only allowed while pending: ${row.Dosya}`);
    const rec = { type: 'RULE', scope: row.Kapsam, class: cls === '—' || cls === 'MIXED' ? undefined : cls };
    assert.equal(row.Katman, deriveLayer(rec), `layer mismatch: ${row.Dosya}`);
  }
});

test('decision-log: D- numaraları sıralı ve tekrarsız', () => {
  const ids = decisionLogIds();
  ids.forEach((id, i) => assert.equal(id, `D-${String(i + 1).padStart(3, '0')}`, `sequence break at ${id}`));
});

test('active-decisions ↔ decision-log: her karar tam bir kez, katman türetmesi tutarlı', () => {
  const md = read('company/state/active-decisions.md');
  const active = parseTable(md, '## Aktif kararlar');
  const inactive = parseTable(md, '## Aktif olmayan kararlar (yalnız tarih)');
  const all = [...active.map((x) => x.ID), ...inactive.map((x) => x.ID)];
  assert.equal(new Set(all).size, all.length, 'decision listed twice');
  assert.deepEqual([...all].sort(), [...decisionLogIds()].sort(), 'active-decisions must cover every decision-log ID');
  for (const row of active) {
    assert.ok(config.types.includes(row['Tür']), `type: ${row.ID}`);
    assert.ok(config.decision_statuses.includes(row.Durum), `status: ${row.ID}`);
    const cls = row['Sınıf'] === '—' ? undefined : row['Sınıf'];
    assert.equal(row.Katman, deriveLayer({ type: row['Tür'], scope: row.Kapsam, class: cls }), `layer mismatch: ${row.ID}`);
    if (row.Durum === 'LIMITED') assert.ok(row['Sınır / not'].length > 10, `LIMITED needs a limit note: ${row.ID}`);
  }
  for (const row of inactive) for (const ref of row.Yerine.match(/D-\d{3}/g) || []) assert.ok(all.includes(ref), `unknown replacement ${ref}`);
});

test('lessons (L-) ve creative feedback (CF-) numaraları sıralı ve tekrarsız', () => {
  const seq = (text, prefix) => [...text.matchAll(new RegExp(`^### (${prefix}-\\d{3}) `, 'gm'))].map((m) => m[1]);
  for (const [file, p] of [['company/lessons.md', 'L'], ['intelligence/creative/creative-feedback-log.md', 'CF']]) {
    seq(read(file), p).forEach((id, i) => assert.equal(id, `${p}-${String(i + 1).padStart(3, '0')}`, `${file}: ${id}`));
  }
});

test('artifact registry: statü, yol, superseded_by, tek ACTIVE', () => {
  const rows = parseCsv(read('company/state/artifact-registry.csv'));
  const ids = rows.map((x) => x.artifact_id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate artifact_id');
  const activeKey = new Map();
  for (const a of rows) {
    assert.ok(config.artifact_statuses.includes(a.status), `${a.artifact_id}: status ${a.status}`);
    scopeKind(a.scope);
    if (a.path.startsWith('git:')) {
      const [, ref, ...p] = a.path.split(':');
      git('cat-file', '-e', `${ref}:${p.join(':')}`);
    } else assert.ok(exists(a.path), `${a.artifact_id}: path missing ${a.path}`);
    if (a.status === 'SUPERSEDED') assert.ok(ids.includes(a.superseded_by), `${a.artifact_id}: superseded_by must reference a registered artifact`);
    if (a.superseded_by) assert.ok(ids.includes(a.superseded_by), `${a.artifact_id}: unknown superseded_by`);
    if (a.status === 'ACTIVE') {
      const key = `${a.scope}|${a.type}`;
      assert.ok(!activeKey.has(key), `two ACTIVE artifacts for ${key}: ${activeKey.get(key)}, ${a.artifact_id}`);
      activeKey.set(key, a.artifact_id);
    }
  }
});

test('case/kanal yaratıcı dosyaları registry\'de (kayıtsız dosya talimat olamaz)', () => {
  const registered = new Set(parseCsv(read('company/state/artifact-registry.csv')).map((x) => x.path));
  const dirs = ['production/pilots/2026-10-n2-pilot-test/', 'intelligence/creative/brand/', 'intelligence/creative/doctrine/'];
  const extra = ['intelligence/creative/README.md', 'intelligence/creative/creative-feedback-log.md', 'intelligence/creative/documentary-style-benchmarks.md'];
  const required = [...tracked].filter((f) => dirs.some((d) => f.startsWith(d))).concat(extra);
  const missing = required.filter((f) => !registered.has(f));
  assert.deepEqual(missing, []);
});

test('tek güncel durum: current-state yapısı; dashboard ve backlog durum kaynağı değil', () => {
  const cs = read('company/state/current-state.md');
  assert.match(cs, /\| Son güncelleme \| \d{4}-\d{2}-\d{2} \|/);
  assert.match(cs, /## 2\. Bugün sıradaki iş\n\*\*/);
  const version = read('os/VERSION').trim();
  assert.ok(cs.includes(version), 'current-state must state os/VERSION');
  assert.match(read('dashboards/company.md'), /^> \*\*SUPERSEDED/);
  assert.match(read('company/backlog.md'), /^> \*\*2026-10-14 \(D-042\):\*\* Bu dosya yalnız \*\*iş listesidir\*\*/);
  for (const f of ['.claude/skills/founder-brief/SKILL.md', '.claude/skills/founder-interface/SKILL.md', '.claude/skills/founder-help/SKILL.md', '.claude/skills/session-close/SKILL.md', '.claude/skills/system-health-check/SKILL.md']) {
    assert.ok(read(f).includes('company/state/current-state.md'), `${f} must read current-state`);
  }
});

test('kernel dosyalarındaki repo yolu referansları çözülüyor', () => {
  const files = ['CLAUDE.md', 'company/charter.md', '.claude/rules/governance.md', 'company/state/current-state.md', 'company/state/active-decisions.md', 'company/state/rule-registry.md'];
  const bad = [];
  for (const f of files) {
    for (const [, p] of read(f).matchAll(/`([^`\s<>*{}]+)`/g)) {
      if (!/^(\.claude|company|os|intelligence|production|finance|channels|dashboards)\//.test(p) && p !== 'CLAUDE.md' && p !== 'FOUNDER-MANUAL.md') continue;
      if (!exists(p.replace(/\/$/, ''))) bad.push(`${f}: ${p}`);
    }
  }
  assert.deepEqual(bad, []);
});

test('HARD çekirdek maddeler yerinde (davranış kaybı yok)', () => {
  const must = {
    '.claude/rules/founder-approval.md': ['**Para:**', '**Yayın:**', '**Hesaplar:**', '**Git:** remote push', '**Strateji:**', '**Üçüncü taraf araçlar:**', 'Açık nokta', 'Onay isteme formatı', 'L-009'],
    '.claude/rules/evidence-and-research.md': ['Varsayımı veri gibi sunma', 'Platform politikası konularında yalnızca resmi kaynak', 'kaynakları kontrol edilene kadar `[VARSAYIM]`', 'L-005', 'Source establishes truth'],
    '.claude/rules/self-repair-and-escalation.md': ['**Teşhis et.**', 'ne oldu (1 cümle) · neden (1 cümle) · önerdiğim tek adım', 'Kendin yapma — Founder onayı gerekir', 'GUIDED ACTION', 'BLOCKED_BY_CANONICAL_GAP', 'L-009'],
    '.claude/rules/company-memory.md': ['**Silme yok:**', '**Numaralandırma:**', 'company/state/current-state.md', 'company/state/active-decisions.md', 'artifact-registry.csv'],
    '.claude/rules/git-and-secrets.md': ['remote push', 'asla** repository', 'GitHub Desktop', 'L-009'],
    '.claude/rules/governance.md': ['BLOCKED_BY_CANONICAL_GAP', 'DIAGNOSTIC', 'Yukarı otomatik yükselme yok', 'her genel yetkinin', 'registry kazanır'],
    '.claude/skills/founder-interface/SKILL.md': ['Agam bugün napcaz?', 'Verilmiş kararı yeniden sorma', 'Üstlenilen işi kapatma', 'Dış yaratıcı danışman (ChatGPT)', 'AUTONOMOUS'],
    '.claude/skills/founder-help/SKILL.md': ['hangi bilgisayar', 'Founder\'a hata mesajını geri yapıştırtma', 'GUIDED ACTION'],
    'company/lessons.md': ['### L-009 —'],
    'company/decision-log.md': ['### D-042 —'],
  };
  for (const [f, needles] of Object.entries(must)) for (const n of needles) assert.ok(read(f).includes(n), `${f} lost: ${n}`);
});

test('secret biçim taraması (takip edilen metin dosyaları)', () => {
  const patterns = [/sk-[A-Za-z0-9_-]{20,}/, /sk_[a-f0-9]{40,}/, /ghp_[A-Za-z0-9]{30,}/, /github_pat_[A-Za-z0-9_]{30,}/, /AKIA[0-9A-Z]{16}/, /AIza[0-9A-Za-z_-]{35}/, /xox[baprs]-[A-Za-z0-9-]{10,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /Bearer\s+[A-Za-z0-9._-]{30,}/];
  const binary = /\.(jpg|jpeg|png|webp|gif|mp3|mp4|wav|pdf|ttf|otf|woff2?)$/i;
  const hits = [];
  for (const f of tracked) {
    if (binary.test(f) || f.endsWith('package-lock.json')) continue;
    let text;
    try { text = readFileSync(join(ROOT, f), 'utf8'); } catch { continue; }
    for (const p of patterns) if (p.test(text)) hits.push(`${f} ~ ${p}`);
  }
  assert.deepEqual(hits, []);
});

test('şirket katmanında kanala özgü yaratıcı kural yok (Company/Channel ayrımı)', () => {
  const companyFiles = ['company/charter.md', '.claude/rules/governance.md', '.claude/rules/founder-approval.md', '.claude/rules/evidence-and-research.md',
    '.claude/rules/self-repair-and-escalation.md', '.claude/rules/company-memory.md', '.claude/rules/git-and-secrets.md', 'CLAUDE.md'];
  const channelTerms = [/CASE INTRO/i, /Anti-PowerPoint/i, /opening grammar/i, /hook-first/i, /foto\s*\+\s*pan/i, /\bident\b/i, /motion DNA/i, /sound identity/i, /Industrial Casebook motion/i];
  const hits = [];
  for (const f of companyFiles) for (const t of channelTerms) if (t.test(read(f))) hits.push(`${f} ~ ${t}`);
  assert.deepEqual(hits, []);
  for (const id of ['D-043', 'D-044']) {
    const row = parseTable(read('company/state/active-decisions.md'), '## Aktif kararlar').find((x) => x.ID === id);
    assert.equal(row?.Kapsam, 'channel:the-industrial-casebook', `${id} must be channel-scoped`);
  }
});

test('zorunlu/değişmez prototype kuralı ACTIVE talimatlarda yok (D-043)', () => {
  const files = [...tracked].filter((f) => (f.startsWith('.claude/') || f.startsWith('channels/') || f === 'CLAUDE.md' || f.startsWith('company/')) && f.endsWith('.md') && f !== 'company/decision-log.md' && f !== 'company/lessons.md' && f !== 'company/backlog.md' && !f.startsWith('company/pending-sync/') && f !== 'dashboards/company.md');
  const bad = [/prototype kapısı \(değişmez/i, /prototype kapısı geçilmeden full production'a geçilmez/i, /Prototype kapısı geçilmeden tam VO üretilmez\./i, /Prototype handoff:\*\* creative treatment \+ taslak anlatı hazır olduğunda, otomatik/i];
  const hits = [];
  for (const f of files) for (const b of bad) if (b.test(read(f))) hits.push(`${f} ~ ${b}`);
  assert.deepEqual(hits, []);
});
