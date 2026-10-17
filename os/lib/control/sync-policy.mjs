// Company OS control plane (Gate 1D-A) — git.safe_sync üretim politikası ve komut kurucuları.
// Çağıran uzak URL, refspec, test komutu veya yetki seçemez: hepsi burada sabittir. Testler yalnız açıkça TEST-ONLY
// işaretli bir politika nesnesi enjekte eder (geçici yerel bare uzak + sabit test profili); CLI hiçbir şey enjekte etmez.
import { safeIdError, ControlError } from './common.mjs';

// Routine Sync yalnız `job/<JOB-ID>` dallarında: dal adı kanonik Gate 1B iş kimliğine deterministik olarak eşlenir.
export const JOB_BRANCH = /^job\/(JOB-[A-Z0-9](?:[A-Z0-9._-]{0,62}[A-Z0-9_-])?)$/;
// Hiçbir koşulda routine yetkisi olmayan dallar (açık liste; desen eşleşmesinden önce kontrol edilir).
const NEVER_ROUTINE = [/^main$/, /^master$/, /^os-v2-migration$/, /^draft\//, /^archive\//, /^HEAD$/];

// Routine işin itebileceği değişikliklerin dışında kalan control-plane / güvenlik yüzeyi (önek veya tam yol).
// Bu yollara dokunan aralık SYSTEM_CHANGE_REQUIRED ile durur; Gate 1D-A Founder onayı taklit etmez.
export const PROTECTED_PATHS = Object.freeze([
  '.claude/', 'os/', 'company/state/runtime/', '.gitattributes', '.gitignore', 'CLAUDE.md',
]);
// Routine Sync Windows makinelerini hedefler (NTFS büyük/küçük harf duyarsız): karşılaştırma yalnız politika için kanonik biçimde
// yapılır, Git yolu yeniden adlandırılmaz/temizlenmez. Kanonik biçim: '\' → '/', Unicode NFC, sonra toUpperCase().toLowerCase()
// (iki yönlü katlama: 'ſ'→'S'→'s', 'ı'→'I'→'i' gibi NTFS büyük-harf tablosunda ASCII'ye düşen harfler de yakalanır).
export const canonicalPolicyPath = (p) => String(p).replace(/\\/g, '/').normalize('NFC').toUpperCase().toLowerCase();
// Her derinlikte protected olan dosya adları: .gitattributes filtre/smudge programı seçebilir (alt klasördeki dahil).
export const PROTECTED_BASENAMES = Object.freeze(['.gitattributes']);
export const isProtectedPath = (p, list = PROTECTED_PATHS) => {
  const c = canonicalPolicyPath(p);
  if (PROTECTED_BASENAMES.includes(c.split('/').pop())) return true;
  return list.some((x) => { const k = canonicalPolicyPath(x); return k.endsWith('/') ? c.startsWith(k) : c === k; });
};
// Windows'ta başka bir yola normalleşebilecek belirsiz yol parçaları: DOS kısa ad takma adı (`CLAUDE~1`, `name~2.ext`),
// sonda nokta/boşluk (Windows siler), ':' (alternatif veri akışı), '\' ve kontrol karakterleri. Genel bir NTFS öykünücüsü değildir;
// bilinçli olarak fazla engeller (ör. `notes~1.md`). Dönüş: belirsiz parça açıklaması veya null.
const DOS_SHORT_ALIAS = /~[0-9]+(\.|$)/;
export function ambiguousWindowsPath(p) {
  for (const seg of String(p).split('/')) {
    if (DOS_SHORT_ALIAS.test(seg)) return 'dos-short-name-alias';
    if (/[. ]$/.test(seg)) return 'trailing-dot-or-space';
    if (/[:\\]/.test(seg)) return 'colon-or-backslash';
    if (/[\x00-\x1f]/.test(seg)) return 'control-character';
  }
  return null;
}

// Git'i (veya Git'in PATH üzerinden başlattığı git-* yardımcılarını: git-credential-manager, git-remote-https, git-lfs …) depo
// klasöründen gölgeleyebilecek yürütülebilir adlar (Revision 4, P1-b savunma derinliği). Asıl koruma gitbin.mjs'nin mutlak yol
// çözümlemesidir; bu liste onun yerine geçmez. Her derinlikte, Windows kanonik (büyük/küçük harf duyarsız) karşılaştırma; uzantısız
// ad (POSIX) ve Windows'un çalıştırılabilir/PATHEXT uzantıları. Bilinçli olarak fazla engeller.
export const SHADOW_EXECUTABLE_EXTENSIONS = Object.freeze(['', '.exe', '.com', '.cmd', '.bat', '.ps1', '.vbs', '.vbe', '.js', '.jse', '.wsf', '.wsh', '.msc', '.cpl', '.scr', '.pif', '.lnk']);
const SHADOW_STEM = /^git(-[a-z0-9][a-z0-9._-]*)?$/;
export function executableShadowName(p) {
  const base = canonicalPolicyPath(p).split('/').pop();
  for (const ext of SHADOW_EXECUTABLE_EXTENSIONS) {
    if (ext && !base.endsWith(ext)) continue;
    const stem = ext ? base.slice(0, -ext.length) : base;
    // uzantısız: 'git-foo.md' gibi adlar yürütülebilir sayılmaz (stem'de nokta varsa uzantılı kabul edilir)
    if (!ext && /\./.test(stem.replace(/^git-/, ''))) continue;
    if (SHADOW_STEM.test(stem)) return base;
  }
  return null;
}

export const PRODUCTION_SYNC_POLICY = Object.freeze({
  policy_id: 'safe-sync/1',
  remote: Object.freeze({ name: 'origin', url: 'https://github.com/Maglorex/ai-media-company-os.git' }),
  // Makine → doğrulama profili (company/machines.md). Kayıtsız makine push yapamaz.
  machine_profiles: Object.freeze({ 'WIN-028TMNOG5MJ': 'MAIN_PC', 'DESKTOP-KVLH9B2': 'FACTORY' }),
  // Sabit doğrulama profilleri: `node <argv>` repo kökünde, kabuk yok. Çağıran komut veremez.
  profiles: Object.freeze({
    MAIN_PC: Object.freeze([
      Object.freeze({ name: 'shared-os-suite', argv: Object.freeze(['--test', 'os/tests/*.test.mjs']) }),
      Object.freeze({ name: 'main-pc-suite', argv: Object.freeze(['--test', 'os/tests/main-pc/*.test.mjs']) }),
    ]),
    FACTORY: Object.freeze([Object.freeze({ name: 'shared-os-suite', argv: Object.freeze(['--test', 'os/tests/*.test.mjs']) })]),
  }),
  protected_paths: PROTECTED_PATHS,
  // Protected yol değişikliği için SYSTEM_CHANGE yolu üretimde yoktur (Founder onayı taklit edilmez).
  system_change_allowed: false,
  // Gate 1D-B: yetkili runtime olay günlüğünün yaşadığı kontrol dalı (ayrı Founder kararıyla değişir) ve tek yazıcı makine.
  // İş sahipliği ve ilk yayın tabanı, uzak kontrol dalının tam commit'indeki olay günlüğünden okunur (JOB_ASSIGNED);
  // kontrol dalını safe-sync asla push etmez (Founder GitHub Desktop ile manuel push).
  control_branch: 'os-v2-migration',
  runtime_writer: 'WIN-028TMNOG5MJ',
  verification_timeout_ms: 20 * 60 * 1000,
});

// Dal politikası. Dönüş: { job_id } veya ControlError.
export function routineBranch(branch) {
  if (typeof branch !== 'string' || !branch) throw new ControlError('BRANCH_NOT_ELIGIBLE', 'no branch');
  if (NEVER_ROUTINE.some((re) => re.test(branch))) throw new ControlError('BRANCH_NOT_ELIGIBLE', `${branch} is never eligible for routine sync`);
  const m = JOB_BRANCH.exec(branch);
  if (!m || safeIdError('job', m[1])) throw new ControlError('BRANCH_NOT_ELIGIBLE', `${branch} is not a routine job branch (job/<JOB-ID>)`);
  return { job_id: m[1] };
}

const SHA = /^[0-9a-f]{40}$/;
// Tek push biçimi: <tam sha>:refs/heads/job/<JOB-ID>. '+' yok, --force yok, joker yok, silme yok, etiket yok.
export function buildPushArgs(remoteName, sha, branch) {
  routineBranch(branch);
  if (!SHA.test(sha ?? '')) throw new ControlError('PUSH_REFUSED', 'push source must be a full commit id');
  if (!/^[a-z][a-z0-9-]{0,30}$/.test(remoteName ?? '')) throw new ControlError('PUSH_REFUSED', 'invalid remote name');
  const refspec = `${sha}:refs/heads/${branch}`;
  if (refspec.startsWith('+') || refspec.startsWith(':') || /[*?[\\\s]/.test(refspec) || refspec.split(':').length !== 2) throw new ControlError('PUSH_REFUSED', 'unsafe refspec');
  // --no-signed: kullanıcının push.gpgSign değerinden bağımsız olarak imza programı çalışmaz (motor ayrıca -c push.gpgSign=false
  // ve -c push.pushOption= ile miras push seçeneklerini sıfırlar).
  return ['push', '--porcelain', '--no-signed', '--no-follow-tags', '--recurse-submodules=no', remoteName, refspec];
}

// Yalnız tek dalın nesnelerini getirir; hiçbir yerel ref yazmaz: FETCH_HEAD yok (--no-write-fetch-head), etiket yok,
// prune yok ve boş --refmap= ile yapılandırılmış remote.<ad>.fetch eşlemesinin "fırsatçı" refs/remotes/* güncellemesi kapalı.
// Salt-okunur inceleme (ls-remote / nesne getirme) için izinli kontrol dalları; push hiçbir zaman (buildPushArgs → routineBranch).
export const INSPECTABLE_CONTROL_BRANCHES = Object.freeze(['main', 'os-v2-migration']);
const inspectable = (b) => INSPECTABLE_CONTROL_BRANCHES.includes(b) || JOB_BRANCH.test(b);

export function buildFetchArgs(remoteName, branch) {
  if (!/^[a-z][a-z0-9-]{0,30}$/.test(remoteName ?? '')) throw new ControlError('FETCH_REFUSED', 'invalid remote name');
  if (!inspectable(branch)) throw new ControlError('FETCH_REFUSED', `fetch of ${branch} not permitted`);
  return ['fetch', '--no-tags', '--no-prune', '--no-write-fetch-head', '--refmap=', '--recurse-submodules=no', remoteName, `refs/heads/${branch}`];
}

export function buildLsRemoteArgs(remoteName, branch) {
  if (!/^[a-z][a-z0-9-]{0,30}$/.test(remoteName ?? '')) throw new ControlError('LS_REMOTE_REFUSED', 'invalid remote name');
  if (!inspectable(branch)) throw new ControlError('LS_REMOTE_REFUSED', `inspection of ${branch} not permitted`);
  return ['ls-remote', '--heads', remoteName, `refs/heads/${branch}`];
}
