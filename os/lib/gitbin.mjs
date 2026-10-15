// Company OS — taşınabilir git bulucu (records.mjs ve factory.mjs ortak kullanır). Paket yok.
// Sıra: PATH'teki `git` → GitHub Desktop'un gömülü git'i (%LOCALAPPDATA%\GitHubDesktop\app-<en yeni>\…\git.exe)
// → standart Git for Windows kurulumu (%ProgramFiles%\Git\cmd\git.exe). Kişisel/sabit yol yok; Founder'ın PATH ayarı gerekmez.
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const defaultProbe = (bin) => { try { execFileSync(bin, ['--version'], { stdio: 'ignore' }); return true; } catch { return false; } };

// Ortam bağımlılıkları enjekte edilebilir (testler PATH'te git olmayan makineyi simüle eder).
export function gitCandidates({ env = process.env, exists = existsSync, list = readdirSync } = {}) {
  const out = ['git'];
  if (env.LOCALAPPDATA) {
    const base = join(env.LOCALAPPDATA, 'GitHubDesktop');
    if (exists(base)) {
      const apps = list(base).filter((d) => /^app-\d/.test(d)).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
      for (const a of apps) out.push(join(base, a, 'resources', 'app', 'git', 'cmd', 'git.exe'));
    }
  }
  for (const pf of [env.ProgramFiles, env['ProgramFiles(x86)']].filter(Boolean)) out.push(join(pf, 'Git', 'cmd', 'git.exe'));
  return out;
}

export function locateGit({ env = process.env, exists = existsSync, list = readdirSync, probe = defaultProbe } = {}) {
  for (const c of gitCandidates({ env, exists, list })) {
    if (c !== 'git' && !exists(c)) continue;
    if (probe(c)) return c;
  }
  return null;
}

let cache;
export function findGit() {
  if (cache) return cache;
  cache = locateGit();
  if (!cache) throw new Error('git not found: not on PATH, no GitHub Desktop bundled git, no Git for Windows install');
  return cache;
}
