// Company OS — taşınabilir ve güvenli git bulucu (records, doctor, factory, safe-sync ortak kullanır). Paket yok.
// Sıra: PATH'teki git (yalnız mutlak dizinler) → GitHub Desktop'un gömülü git'i (%LOCALAPPDATA%\GitHubDesktop\app-<en yeni>\…\git.exe)
// → standart Git for Windows kurulumu (%ProgramFiles%\Git\cmd\git.exe). Kişisel/sabit yol yok; Founder'ın PATH ayarı gerekmez.
//
// Güvenlik sınırı (Gate 1D-A Revision 4): çıplak `git` adı HİÇBİR ZAMAN çalıştırılmaz (sürüm yoklaması dahil). Windows'ta libuv,
// çıplak adı PATH'ten önce geçerli klasörde arar (NoDefaultCurrentDirectoryInExePath ayarlı değilse): depo kökündeki bir `git.exe`
// çalışırdı. Bu yüzden aday listesi yalnız mutlak yollardan oluşur ve ilk alt süreçten önce mutlak yol seçilir:
//  - PATH'teki göreli/boş girdiler ('.', '', 'bin') atlanır; geçerli klasör ve Company OS deposunun içindeki PATH dizinleri atlanır.
//  - Windows'ta yalnız `git.exe` aranır: `.cmd`/`.bat` kabuk gerektirir, `.com` Git tarafından dağıtılmaz.
//  - NoDefaultCurrentDirectoryInExePath'e güvenilmez.
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { isAbsolute, join, resolve, sep, delimiter as hostDelimiter } from 'node:path';
import { fileURLToPath } from 'node:url';

// Company OS deposunun kökü (records.mjs ile aynı türetme; döngüsel import olmasın diye burada).
export const REPO_ROOT = resolve(fileURLToPath(new URL('../..', import.meta.url)));

const isFile = (p) => { try { return statSync(p).isFile(); } catch { return false; } };
const defaultProbe = (bin) => {
  if (!isAbsolute(bin)) return false; // savunma: çıplak/göreli ad asla çalıştırılmaz
  try { execFileSync(bin, ['--version'], { stdio: 'ignore', windowsHide: true }); return true; } catch { return false; }
};
const canonDir = (p, platform) => {
  let r = resolve(p);
  try { r = realpathSync.native(r); } catch { /* yoksa çözümlenmiş yol */ }
  return platform === 'win32' ? r.toLowerCase() : r;
};
const within = (child, parent) => child === parent || child.startsWith(parent.endsWith(sep) ? parent : parent + sep);

// PATH'teki git adayları: yalnız mutlak, depo dışı, geçerli klasör olmayan dizinler.
export function pathGitCandidates({ env = process.env, platform = process.platform, cwd = process.cwd(), repoRoot = REPO_ROOT, exists = existsSync } = {}) {
  const key = Object.keys(env).find((k) => k.toUpperCase() === 'PATH');
  const raw = key ? env[key] ?? '' : '';
  const delim = platform === 'win32' ? ';' : (platform === process.platform ? hostDelimiter : ':');
  const name = platform === 'win32' ? 'git.exe' : 'git';
  const cwdC = canonDir(cwd, platform);
  const rootC = canonDir(repoRoot, platform);
  const out = [];
  for (const d0 of String(raw).split(delim)) {
    const d = d0.trim().replace(/^"(.*)"$/, '$1');
    if (!d || !isAbsolute(d)) continue;               // göreli PATH girdisi (ör. '.') asla kullanılmaz
    const dc = canonDir(d, platform);
    if (dc === cwdC || within(dc, rootC)) continue;   // geçerli klasör veya depo içi dizin: depo kontrollü olabilir
    const p = join(d, name);
    if (exists(p) && !out.includes(p)) out.push(p);
  }
  return out;
}

// Ortam bağımlılıkları enjekte edilebilir (testler PATH'te git olmayan makineyi simüle eder). Dönüş: yalnız mutlak yollar.
export function gitCandidates({ env = process.env, exists = existsSync, list = readdirSync, platform = process.platform, cwd = process.cwd(), repoRoot = REPO_ROOT } = {}) {
  const out = pathGitCandidates({ env, platform, cwd, repoRoot, exists });
  if (env.LOCALAPPDATA && isAbsolute(env.LOCALAPPDATA)) {
    const base = join(env.LOCALAPPDATA, 'GitHubDesktop');
    if (exists(base)) {
      const apps = list(base).filter((d) => /^app-\d/.test(d)).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
      for (const a of apps) out.push(join(base, a, 'resources', 'app', 'git', 'cmd', 'git.exe'));
    }
  }
  for (const pf of [env.ProgramFiles, env['ProgramFiles(x86)']].filter((p) => p && isAbsolute(p))) out.push(join(pf, 'Git', 'cmd', 'git.exe'));
  return out;
}

export function locateGit({ env = process.env, exists = existsSync, list = readdirSync, probe = defaultProbe, platform = process.platform, cwd = process.cwd(), repoRoot = REPO_ROOT } = {}) {
  for (const c of gitCandidates({ env, exists, list, platform, cwd, repoRoot })) {
    if (!isAbsolute(c) || !exists(c)) continue;
    if (probe(c)) return c;
  }
  return null;
}

let cache;
// Dönüş her zaman mutlak bir git yürütülebilir dosyasıdır; ilk çağrıdan sonra sabittir (raporlanan = çalıştırılan).
export function findGit() {
  if (cache) return cache;
  const found = locateGit();
  if (!found || !isAbsolute(found) || !isFile(found)) throw new Error('git not found: not on PATH (absolute, outside the repository), no GitHub Desktop bundled git, no Git for Windows install');
  cache = found;
  return cache;
}
