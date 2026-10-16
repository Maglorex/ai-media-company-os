// Gate 1C — izin ve rol sertleştirme: paylaşılan proje Claude ayarları (.claude/settings.json) ve uzman ajan araç listeleri.
//
// Güvenlik varsayımı (settings.local.json'ın kalıcı yokluğuna DAYANMAZ; dosya .gitignore'dadır ve var olabilir):
//  - .claude/settings.local.json, sıradan skaler ayarlarda paylaşılan proje ayarından (.claude/settings.json) DAHA YÜKSEK önceliklidir.
//  - İzin allow/ask/deny LİSTELERİ ise kapsamlar arasında birleşir (managed, user, project, local) ve normal izin değerlendirmesi
//    önce DENY, sonra ASK, sonra ALLOW uygular. Bu yüzden bir insanın "Yes, and don't ask again" ile yerel ayara eklediği allow
//    kuralı, buradaki proje ask/deny kurallarını geçersiz kılamaz.
//  - Bazı güvenlik-hassas ayarlar Claude Code'un kendisine göre daha katı-değer davranışı kullanır; bu, Claude Code'a aittir.
//  - Dolayısıyla depo, paylaşılan ayardaki HER skaler anahtarın yerel kullanıcı/oturum tarafından geçersiz kılınamayacağını
//    İDDİA ETMEZ. Gate 1C, Claude Code içinde savunma derinliğidir; işletim sistemi veya hesap yöneticisi güvenlik sınırı değildir.
//  - Edit/Read ask/deny yol kuralları Claude Code'un yerleşik dosya işlemlerini ve tanınan kabuk dosya işlemlerini korur;
//    savunma derinliğidir, işletim sistemi veya süreç sınırı DEĞİLDİR. Keyfi bir alt süreç (ör. özel Node/Python kodu) bu yol
//    kurallarının dışında dosyalara erişebilir. Komut kalıbı kuralları da tam bir kabuk sınırı değildir (alternatif yazımlar:
//    `git -C . push`, takma adlar, betikler). Daha güçlü sınır Gate 1D Action Gateway / control-plane zorlamasıdır.
//  - Gate 1C hook (PreToolUse/PostToolUse) kullanmaz; hook'lar ileride savunma derinliği olarak eklenebilir, kök sınır değildir.
//
// MCP sınırı (gerçekte ne zorlanıyor):
//  - Depo politikası Code'un kendisinin çektiği claude.ai bağlayıcılarını kapatır (disableClaudeAiConnectors).
//  - Depo politikası normal `mcp__claude_ai_*` araç ad alanını reddeder (savunma derinliği).
//  - Sertleştirilmiş uzman ajanların MCP yetkisi yoktur; proje tanımlı MCP yapılandırması (.mcp.json) Gate 1C ile yasaktır.
//  - Genel `mcp__*` reddi YOKTUR: Desktop Code ana makinesi kendi iş akışı/oturum araçlarını da MCP aracı olarak sunar
//    (ör. mcp__ccd_turn__*); genel ret bunları bozar.
//  - Desktop yerel/SSH Code oturumlarında claude.ai bağlayıcıları ana makine tarafından süreç içinde verilir; depo yapılandırması
//    bunları ana makine araçlarını etkilemeden evrensel olarak kapatamaz. Bu bir ana makine/hesap sınırıdır; bu depo tarafından
//    zorlandığı iddia edilmez. Gelecekte MCP eklemek bilinçli bir SYSTEM_CHANGE olmalıdır.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, git } from '../lib/records.mjs';

const settings = () => JSON.parse(readFileSync(join(ROOT, '.claude', 'settings.json'), 'utf8'));

// Ajan frontmatter'ını gerçekten ayrıştırır (düz metin araması değil). FAIL-CLOSED: güvenle yorumlanamayan biçim
// (eksik `tools`, boş değer, YAML blok/akış listesi, girintili devam satırı, tekrar eden anahtar) "araç yok" sayılmaz, hata verir.
// `tools` alanı olmayan ajan Claude Code'da tüm araçları devralır; bu yüzden eksiklik güvenlik hatasıdır.
const TOOL_NAME = /^[A-Za-z][A-Za-z0-9_-]*$/;
const agent = (name) => parseAgent(name, readFileSync(join(ROOT, '.claude', 'agents', `${name}.md`), 'utf8'));
function parseAgent(name, raw) {
  const text = raw.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(m, `${name}: frontmatter missing`);
  const fm = {};
  for (const line of m[1].split('\n')) {
    if (!line.trim()) continue;
    const kv = /^([A-Za-z][A-Za-z0-9_-]*):(?:\s+(.*))?$/.exec(line);
    assert.ok(kv, `${name}: unsupported frontmatter line (block list / continuation?): ${line}`);
    assert.ok(!(kv[1] in fm), `${name}: duplicate frontmatter key ${kv[1]}`);
    fm[kv[1]] = (kv[2] ?? '').trim();
  }
  const list = (key, required) => {
    const v = fm[key];
    if (v === undefined && !required) return [];
    assert.ok(v !== undefined, `${name}: '${key}' missing — agent would inherit every tool`);
    assert.ok(v !== '', `${name}: '${key}' empty or block-list form — cannot be safely interpreted`);
    const items = v.split(',').map((s) => s.trim());
    for (const t of items) assert.match(t, TOOL_NAME, `${name}: '${key}' item not a plain tool name: ${JSON.stringify(t)}`);
    return items;
  };
  return { name: fm.name, tools: list('tools', true), disallowed: list('disallowedTools', false), raw: fm };
}

const EXTERNAL = (t) => t === 'WebSearch' || t === 'WebFetch' || t.startsWith('mcp__') || t === 'MCP';
const MUTATING = (t) => ['Write', 'Edit', 'NotebookEdit', 'Bash', 'PowerShell'].includes(t);
const HARDENED = {
  'research-analyst': ['Read', 'Grep', 'Glob', 'WebSearch', 'WebFetch'],
  'systems-operator': ['Read', 'Grep', 'Glob', 'Write', 'Edit', 'Bash'],
  'finance-controller': ['Read', 'Grep', 'Glob', 'Write', 'Edit'],
  'production-engineer': ['Read', 'Grep', 'Glob', 'Write', 'Edit', 'Bash'],
  'company-file-scanner': ['Read', 'Grep', 'Glob'],
};

test('settings.json: katı JSON; Manual mod, auto ve bypass kapalı, çalışma dizini dışı okuma engelli, Claude.ai bağlayıcıları kapalı', () => {
  const s = settings();
  assert.equal(s.permissions.defaultMode, 'default');
  assert.equal(s.permissions.disableAutoMode, 'disable');
  assert.equal(s.permissions.disableBypassPermissionsMode, 'disable');
  assert.equal(s.permissions.blockReadsOutsideWorkingDirectories, true);
  assert.equal(s.disableClaudeAiConnectors, true);
  assert.ok(!('hooks' in s), 'Gate 1C creates no hooks');
  assert.ok(!('additionalDirectories' in s.permissions), 'no extra working directories');
});

// Claude Code araç kuralı kalıbı: '*' herhangi bir dizi.
const ruleMatches = (rule, tool) => new RegExp(`^${rule.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`).test(tool);

test('settings.json: MCP — genel mcp__* reddi yok (Desktop iç araçları korunur); dar mcp__claude_ai_* reddi var', () => {
  const p = settings().permissions;
  for (const list of [p.deny, p.ask ?? [], p.allow ?? []]) {
    assert.ok(!list.includes('mcp__*') && !list.includes('mcp__') && !list.includes('mcp__**'), 'no bare/global MCP rule');
  }
  assert.ok(p.deny.includes('mcp__claude_ai_*'), 'narrow claude.ai connector namespace deny');
  const mcpDenies = p.deny.filter((r) => r.startsWith('mcp__'));
  assert.deepEqual(mcpDenies, ['mcp__claude_ai_*'], 'the only MCP deny is the narrow connector namespace');
  for (const internal of ['mcp__ccd_turn__update_plan', 'mcp__ccd_turn__wrap_up', 'mcp__ccd_session__start_session', 'mcp__Claude_Browser__navigate']) {
    assert.ok(!mcpDenies.some((r) => ruleMatches(r, internal)), `Desktop internal tool must not be matched: ${internal}`);
  }
  for (const connector of ['mcp__claude_ai_Gmail__send_message', 'mcp__claude_ai_Google_Drive__search']) {
    assert.ok(mcpDenies.some((r) => ruleMatches(r, connector)), `connector tool must be matched: ${connector}`);
  }
  assert.equal(settings().disableClaudeAiConnectors, true);
});

test('proje MCP yüzeyi yok: .mcp.json ve .claude/.mcp.json yok; ayarlarda proje MCP sunucusu etkinleştirilmemiş', () => {
  for (const f of ['.mcp.json', join('.claude', '.mcp.json')]) assert.ok(!existsSync(join(ROOT, f)), `unapproved project MCP config: ${f}`);
  const s = settings();
  for (const k of ['mcpServers', 'enableAllProjectMcpServers', 'enabledMcpjsonServers']) assert.ok(!(k in s), `project MCP setting present: ${k}`);
});

test('settings.json: geniş allow kuralı yok', () => {
  const p = settings().permissions;
  const allow = p.allow ?? [];
  for (const r of allow) {
    assert.ok(!/^(Bash|PowerShell)(\(\*\)|\(\s*\)|$)/.test(r), `broad shell allow: ${r}`);
    assert.ok(!/^(WebFetch|WebSearch)(\(|$)/.test(r), `web allow: ${r}`);
    assert.ok(!/^mcp__/.test(r), `MCP allow: ${r}`);
    assert.ok(!/^(Edit|Write|Read)(\(\*\*?\)|$)/.test(r), `broad file allow: ${r}`);
  }
  for (const r of p.ask ?? []) assert.ok(!(p.allow ?? []).includes(r), `rule both asked and allowed: ${r}`);
});

// Yol kuralları savunma derinliğidir (yukarıdaki başlık); bu test yalnız kuralların varlığını doğrular, süreç sınırı iddia etmez.
test('settings.json: kritik control-plane yolları ASK (kalıcı deny değil); belgeler bunları OS/süreç sınırı diye sunmaz', () => {
  const header = readFileSync(join(ROOT, 'os', 'tests', 'permissions.test.mjs'), 'utf8');
  assert.match(header, /işletim sistemi veya süreç sınırı DEĞİLDİR/);
  assert.match(header, /Keyfi bir alt süreç/);
  const p = settings().permissions;
  for (const path of ['/.claude/settings.json', '/.claude/agents/**', '/os/lib/control/**', '/os/control/**', '/company/state/runtime/**',
    '/os/tests/control-plane.test.mjs', '/os/tests/migration.test.mjs']) {
    assert.ok(p.ask.includes(`Edit(${path})`), `missing ask: Edit(${path})`);
    assert.ok(!p.deny.includes(`Edit(${path})`), `should be ask, not deny: ${path}`);
  }
});

test('settings.json: secret dosya sınıfları okunamaz; şirket belgeleri (git-and-secrets.md) engellenmez', () => {
  const deny = settings().permissions.deny;
  for (const r of ['Read(**/.env)', 'Read(**/.env.*)', 'Read(**/*.pem)', 'Read(**/*.key)', 'Read(**/client_secret*.json)', 'Read(**/token*.json)', 'Read(**/*credential*.json)']) {
    assert.ok(deny.includes(r), `missing secret read deny: ${r}`);
  }
  // Aşırı geniş kalıp yok: yalnız JSON/anahtar uzantıları; "*secret*" gibi belge adlarını yakalayan kalıp yok.
  const readRules = deny.filter((r) => r.startsWith('Read('));
  for (const r of readRules) assert.ok(!/\*secret\*|\*\*\/\*\)|Read\(\*\*\)/.test(r), `overbroad read deny: ${r}`);
  const toRegex = (glob) => new RegExp(`^${glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*\//g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '(?:.*/)?')}$`);
  const blocked = (p) => readRules.some((r) => toRegex(r.slice(5, -1)).test(p));
  for (const p of ['.claude/rules/git-and-secrets.md', 'company/state/runtime/events.jsonl', 'os/tests/integrity.test.mjs', 'finance/ledgers/usage.csv', 'production/tools/env-setup.md']) {
    assert.ok(!blocked(p), `legitimate file blocked: ${p}`);
  }
  for (const p of ['.env', 'config/.env.local', 'keys/server.pem', 'a/b/id.key', 'client_secret_123.json', 'token.json', 'gcp/my-credentials.json']) {
    assert.ok(blocked(p), `secret file not covered: ${p}`);
  }
});

test('settings.json: doğrudan git uzak/yıkıcı komutları Bash ve PowerShell için reddedilir; salt-okunur git reddedilmez', () => {
  const deny = settings().permissions.deny;
  for (const tool of ['Bash', 'PowerShell']) {
    for (const cmd of ['git push', 'git pull', 'git fetch', 'git remote', 'git reset --hard', 'git clean', 'git branch -D', 'git tag -d']) {
      assert.ok(deny.includes(`${tool}(${cmd}:*)`), `missing deny: ${tool}(${cmd}:*)`);
    }
    for (const ok of ['git status', 'git log', 'git diff', 'git commit', 'git add', 'git show', 'git rev-parse']) {
      assert.ok(!deny.some((r) => r.startsWith(`${tool}(${ok}`)), `read-only/local git must not be denied: ${ok}`);
    }
    assert.ok(!deny.includes(`${tool}(git:*)`) && !deny.includes(`${tool}(git *)`), 'all git must not be denied');
  }
});

test('ajanlar: sertleştirilmiş uzmanların ayrıştırılmış araç listeleri hedefle birebir aynı', () => {
  for (const [name, expected] of Object.entries(HARDENED)) {
    const a = agent(name);
    assert.equal(a.name, name);
    assert.deepEqual([...a.tools].sort(), [...expected].sort(), `${name} tools`);
    assert.ok(!a.tools.includes('*'), `${name}: wildcard tools`);
    assert.ok(!a.tools.some((t) => t.startsWith('mcp__') || t === 'MCP'), `${name}: MCP tool`);
    assert.ok(!('mcpServers' in a.raw), `${name}: agent-scoped MCP servers`);
  }
  const scanner = agent('company-file-scanner');
  for (const t of ['Write', 'Edit', 'NotebookEdit', 'Bash', 'PowerShell', 'WebSearch', 'WebFetch']) assert.ok(scanner.disallowed.includes(t), `scanner must disallow ${t}`);
  assert.match(scanner.raw.description, /Salt-okunur/, 'scanner claims read-only and its capability now matches');
});

test('rol değişmezi: hiçbir sertleştirilmiş uzman dış/güvenilmeyen erişim (A) ile mutasyon/çalıştırma (B) yetkisini birlikte taşımaz', () => {
  for (const name of Object.keys(HARDENED)) {
    const { tools } = agent(name);
    const a = tools.filter(EXTERNAL);
    const b = tools.filter(MUTATING);
    assert.ok(!(a.length && b.length), `${name} combines external ${a.join('/')} with mutation ${b.join('/')}`);
  }
  // Bilgi: aynı değişmez diğer ajan dosyalarında da kontrol edilir (araç listesi olan her ajan).
  for (const f of readdirSync(join(ROOT, '.claude', 'agents')).filter((n) => n.endsWith('.md'))) {
    const { name, tools } = agent(f.replace(/\.md$/, ''));
    assert.ok(!(tools.some(EXTERNAL) && tools.some(MUTATING)), `${name} combines external retrieval with mutation/execution`);
  }
});

test('ajan ayrıştırıcı fail-closed: eksik tools, blok/akış listesi, girintili devam ve tekrar eden anahtar "araç yok" sayılmaz', () => {
  const fm = (body) => `---\nname: x\ndescription: d\n${body}---\n\nbody\n`;
  assert.deepEqual(parseAgent('x', fm('tools: Read, Grep\n')).tools, ['Read', 'Grep'], 'control: inline list parses');
  for (const [label, body] of [
    ['missing tools', 'model: sonnet\n'],
    ['YAML block list', 'tools:\n  - Read\n  - Bash\n'],
    ['YAML block list, dash at column 0', 'tools:\n- WebFetch\n- Bash\n'],
    ['flow list', 'tools: [Read, Bash]\n'],
    ['empty value', 'tools: \n'],
    ['wildcard', 'tools: *\n'],
    ['duplicate key', 'tools: Read\ntools: Bash, WebFetch\n'],
    ['quoted item', 'tools: "Read", Bash\n'],
  ]) {
    assert.throws(() => parseAgent('x', fm(body)), assert.AssertionError, `must fail closed: ${label}`);
  }
});

// Proje-yerel ayar yaşam döngüsü: .claude/settings.local.json iş istasyonuna özeldir, .gitignore'dadır ve VAR OLABİLİR.
// Bu test dosyanın yokluğunu şart koşmaz ve içeriğini okumaz (kişisel durum, şirket kanonu değil).
const ignoredBy = (p) => {
  let out;
  try { out = git('check-ignore', '-v', '--no-index', '--', p).trim(); } catch { return null; } // çıkış 1 = yok sayılmıyor
  // -v, son eşleşen kural `!` istisnasıysa onu da yazar (ör. git-and-secrets.md): o durumda dosya yok sayılmıyor.
  return /^[^\t]*?:\d+:!/.test(out) ? null : out;
};
test('settings.local.json yaşam döngüsü: tek ve birebir .gitignore kuralı; paylaşılan .claude dosyaları yok sayılmıyor', () => {
  const gi = readFileSync(join(ROOT, '.gitignore'), 'utf8').replace(/\r\n/g, '\n').split('\n').map((l) => l.trim());
  assert.ok(gi.includes('.claude/settings.local.json'), 'exact local-settings exclusion missing from .gitignore');
  const claudeRules = gi.filter((l) => l && !l.startsWith('#') && /(^|\/)\.claude(\/|$)/.test(l.replace(/^!/, '')));
  assert.deepEqual(claudeRules.filter((l) => !l.startsWith('!')), ['.claude/settings.local.json'], 'no other/broader .claude ignore rule');
  // Kural deponun kendi .gitignore'undan gelir (kullanıcının global ignore'una güvenilmez; temiz clone / Strong PC).
  assert.match(ignoredBy('.claude/settings.local.json') ?? '', /^\.gitignore:\d+:\.claude\/settings\.local\.json\t/, 'local settings must be ignored by the repo .gitignore');
  for (const p of ['.claude/settings.json', ...readdirSync(join(ROOT, '.claude', 'agents')).map((n) => `.claude/agents/${n}`),
    '.claude/rules/governance.md', '.claude/rules/git-and-secrets.md', '.claude/skills/session-close/SKILL.md']) {
    assert.equal(ignoredBy(p), null, `shared .claude file must not be ignored: ${p}`);
  }
});

test('settings.local.json varlığından bağımsız: proje izin listeleri yalnız ask/deny katkısı yapar, birleşmede DENY > ASK > ALLOW korunur', (t) => {
  t.diagnostic(`.claude/settings.local.json present: ${existsSync(join(ROOT, '.claude', 'settings.local.json'))} (not read; outcome must be identical)`);
  const p = settings().permissions;
  assert.ok(p.deny.length > 0 && p.ask.length > 0, 'project contributes deny and ask lists');
  // Proje allow listesi yok: yerel bir allow girdisi proje ask/deny ile aynı listeye birleşir ve değerlendirmede onlardan sonra gelir.
  assert.ok(!('allow' in p), 'project settings define no allow list');
});
