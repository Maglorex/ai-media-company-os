// Company OS control plane (Gate 1B) — ortak yardımcılar: hata tipi, kanonik JSON, hash, dayanıklı/atomik yazım, kilit,
// secret taraması, trusted authority ve action policy varsayılanları. Paket yok; Node yerleşik modülleri.
import { createHash, randomBytes } from 'node:crypto';
import { hostname } from 'node:os';
import { join, dirname, basename, resolve } from 'node:path';
import { readFileSync, openSync, closeSync, writeSync, fsyncSync, renameSync, rmSync, existsSync } from 'node:fs';
import { ROOT } from '../records.mjs';

export const DEFAULT_RUNTIME_DIR = join(ROOT, 'company', 'state', 'runtime');

export class ControlError extends Error {
  constructor(code, message) { super(`${code}: ${message}`); this.code = code; }
}

export const ROLE = /^[a-z][a-z0-9-]{1,40}$/;
export const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
export const isIso = (s) => typeof s === 'string' && ISO.test(s) && !Number.isNaN(Date.parse(s));
export const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
export const nonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;
export const clone = (v) => structuredClone(v);

// ---------- güvenli kimlik (job_id / action_id) — dosya yoluna giren TEK doğrulayıcı ----------
// Biçim: <PREFIX>-<gövde>. Gövde yalnız A-Z 0-9 . _ - ; harf/rakamla başlar, '.' ile bitmez; toplam ≤ 68 karakter.
// Küçük harf bilinçli olarak yok: Windows dosya sistemi büyük/küçük harf duyarsızdır ("JOB-a" ile "JOB-A" aynı dosyaya düşerdi).
// Sondaki nokta yok: Windows onu siler ("JOB-A." → "JOB-A"). Ayırıcı, boşluk, kontrol karakteri, sürücü harfi, '..' biçim gereği imkânsız.
// Tehlikeli kimlik başka geçerli kimliğe "temizlenmez"; reddedilir.
const SAFE_ID_BODY = /^[A-Z0-9](?:[A-Z0-9._-]{0,62}[A-Z0-9_-])?$/;
const RESERVED_DEVICE = /^(CON|PRN|AUX|NUL|COM[0-9]|LPT[0-9]|CONIN\$|CONOUT\$)$/i;
export const ID_PREFIX = { job: 'JOB', action: 'ACT' };
export function safeIdError(kind, id) {
  const prefix = ID_PREFIX[kind];
  if (!prefix) return `unknown id kind ${kind}`;
  if (typeof id !== 'string') return `${kind} id must be a string`;
  if (!id.startsWith(`${prefix}-`)) return `${kind} id must start with ${prefix}-`;
  const body = id.slice(prefix.length + 1);
  if (!SAFE_ID_BODY.test(body)) return `${kind} id must be ${prefix}- followed by 1-64 of A-Z 0-9 . _ - (start alphanumeric, no trailing dot)`;
  if (RESERVED_DEVICE.test(id.split('.')[0]) || RESERVED_DEVICE.test(body.split('.')[0])) return `${kind} id uses a reserved device name`;
  return null;
}
export const isSafeId = (kind, id) => safeIdError(kind, id) === null;

// Projeksiyon dosya yolu: kimliği doğrular, yolu kurar ve sonucun hedef klasörün doğrudan çocuğu olduğunu ayrıca kontrol eder.
export function recordPath(dir, kind, id) {
  const err = safeIdError(kind, id);
  if (err) throw new ControlError('ID_UNSAFE', err);
  const sub = kind === 'job' ? 'jobs' : 'actions';
  const parent = resolve(dir, sub);
  const file = resolve(parent, `${id}.json`);
  if (dirname(file) !== parent || basename(file) !== `${id}.json`) throw new ControlError('ID_UNSAFE', `${kind} id escapes ${sub}/`);
  return file;
}

// Anahtarları sıralı, undefined'sız JSON — hash, fingerprint ve projeksiyon karşılaştırması için tek biçim.
export function canon(v) {
  if (Array.isArray(v)) return `[${v.map(canon).join(',')}]`;
  if (v && typeof v === 'object') {
    return `{${Object.keys(v).sort().filter((k) => v[k] !== undefined).map((k) => `${JSON.stringify(k)}:${canon(v[k])}`).join(',')}}`;
  }
  return JSON.stringify(v);
}
export const sha256 = (s) => createHash('sha256').update(s).digest('hex');

export function readJson(file) {
  if (!existsSync(file)) return { ok: false, error: 'missing' };
  try { return { ok: true, value: JSON.parse(readFileSync(file, 'utf8')) }; }
  catch { return { ok: false, error: 'unparseable JSON' }; }
}

// Geçici dosya önekleri: doctor bunları "kesintiye uğramış yazım" kanıtı olarak raporlar; hiçbir kod onları silmez.
export const TEMP_MARK = '.tmp-';

// Atomik projeksiyon yazımı: geçici dosyaya yaz → fsync → rename. Rename başarısız olursa geçici dosya kanıt olarak kalır.
// Dizin fsync'i taşınabilir değildir (Windows); rename'in kendisinin güç kesintisine dayanıklılığı dosya sistemine bağlıdır.
export function writeJsonAtomic(file, obj) {
  const tmp = join(dirname(file), `.${basename(file)}${TEMP_MARK}${process.pid}-${randomBytes(4).toString('hex')}`);
  const fd = openSync(tmp, 'wx');
  try {
    writeSync(fd, `${JSON.stringify(obj, null, 2)}\n`);
    fsyncSync(fd);
  } finally { closeSync(fd); }
  renameSync(tmp, file);
}

// Tek yazıcı kilidi (O_EXCL). Kilit varsa mutasyon reddedilir; kilit asla otomatik silinmez (doctor elle kurtarma ister).
export function withLock(rt, fn) {
  const lock = join(rt.dir, '.lock');
  let fd;
  try { fd = openSync(lock, 'wx'); }
  catch (e) {
    if (e.code === 'EEXIST') throw new ControlError('LOCKED', `another control-plane mutation holds ${lock} (or it is stale: manual recovery required)`);
    if (e.code === 'ENOENT') throw new ControlError('RUNTIME_MISSING', `runtime directory not found: ${rt.dir}`);
    throw e;
  }
  try {
    writeSync(fd, JSON.stringify({ pid: process.pid, machine: rt.machine, at: rt.now() }));
    fsyncSync(fd);
    closeSync(fd);
    fd = null;
    return fn();
  } finally {
    if (fd !== null) closeSync(fd);
    // Kilidi yalnız onu alan süreç bırakır. Süreç çökerse kilit kalır → doctor STALE_LOCK (elle kurtarma).
    rmSync(lock, { force: true });
  }
}

// ---------- secret taraması (sezgisel; her secret'ı yakalayamaz, yanlış pozitifte reddederek güvenli kalır) ----------
const SECRET_VALUE = [
  ['openai-style key', /\bsk-[A-Za-z0-9_-]{20,}/],
  ['stripe-style key', /\b[sr]k_(live|test)_[A-Za-z0-9]{8,}/],
  ['elevenlabs-style key', /\bsk_[a-f0-9]{40,}/],
  ['github token', /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}|\bgithub_pat_[A-Za-z0-9_]{30,}/],
  ['aws access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['google api key', /\bAIza[0-9A-Za-z_-]{35}/],
  ['slack token', /\bxox[baprs]-[A-Za-z0-9-]{10,}/],
  ['jwt', /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/],
  ['private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['bearer credential', /\bBearer\s+(?=[A-Za-z0-9._~+/-]*[0-9._~+/-])[A-Za-z0-9._~+/-]{12,}=*/i],
  ['basic credential', /\bBasic\s+(?=[A-Za-z0-9+/]*[0-9+/])[A-Za-z0-9+/]{12,}=*/],
  ['credential assignment', /\b[A-Za-z0-9_-]*(password|passwd|pwd|secret|api[_-]?key|access[_-]?token|auth[_-]?token|refresh[_-]?token|client[_-]?secret)\s*[=:]\s*\S{3,}/i],
  ['url with credentials', /:\/\/[^\s/:@]+:[^\s/@]+@/],
];
const SECRET_KEY = /(^|_)(password|passwd|pwd|secret|secrets|token|api_key|apikey|x_api_key|auth|auth_token|access_token|refresh_token|id_token|authorization|cookie|set_cookie|private_key|credential|credentials|bearer|session_key)($|_)/;
const normKey = (k) => String(k).replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[-\s.]+/g, '_').toLowerCase();

// Yalnız kategori + yol döner; değer asla döndürülmez/basılmaz.
export function secretFindings(value, path = '$') {
  const out = [];
  if (typeof value === 'string') {
    for (const [cat, re] of SECRET_VALUE) if (re.test(value)) { out.push(`${path} (${cat})`); break; }
  } else if (Array.isArray(value)) value.forEach((v, i) => out.push(...secretFindings(v, `${path}[${i}]`)));
  else if (isPlainObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      const safeKey = /^[A-Za-z0-9_.-]{1,64}$/.test(k) ? k : '<key>';
      if (SECRET_KEY.test(normKey(k))) out.push(`${path}.${safeKey} (secret-like key)`);
      out.push(...secretFindings(v, `${path}.${safeKey}`));
    }
  }
  return out;
}
export function assertNoSecrets(value, what) {
  const f = secretFindings(value);
  if (f.length) throw new ControlError('SECRET_REJECTED', `${what} contains secret-like content at ${f.join('; ')}`);
}

// ---------- trusted authority ----------
// Rol dizesi (actor_role, requested_by, `--as founder`) YETKİ DEĞİLDİR; yalnız atıftır.
// Korumalı yetki yalnız rt.authority doğrulayıcısından gelir. Bağımlılık enjeksiyonu bir test/entegrasyon dikişidir,
// kimlik doğrulaması değildir. Gate 1B'de güvenilir Founder onayı yoktur: varsayılan doğrulayıcı her talebi reddeder.
// Arayüz: verify({ authority, purpose, subject, approval_ref }) → { source, approval_ref } veya ControlError.
export const NO_TRUSTED_AUTHORITY = Object.freeze({
  id: 'none',
  verify({ authority, purpose }) {
    throw new ControlError(authority === 'founder' ? 'FOUNDER_APPROVAL_REQUIRED' : 'TRUSTED_AUTHORITY_UNAVAILABLE',
      `${purpose} requires trusted ${authority} approval, which is not available in Gate 1B (a role string such as --as ${authority} is not authority)`);
  },
});

// Doğrulayıcıyı çağırır ve olaya girecek grant'i kurar. Grant olaya yazılmadan önce mutation kapısında secret-taramasından geçer.
export function requestGrant(rt, { authority, purpose, subject, approval_ref = null }, recorded_by) {
  const verifier = rt.authority ?? NO_TRUSTED_AUTHORITY;
  const g = verifier.verify({ authority, purpose, subject, approval_ref });
  if (!(isPlainObject(g) && nonEmpty(g.source))) throw new ControlError('AUTHORITY_REJECTED', `${purpose}: verifier returned no grant`);
  return { authority, purpose, subject, source: g.source, approval_ref: g.approval_ref ?? null, verifier: String(verifier.id ?? 'unnamed'), recorded_by };
}

// ---------- action policy ----------
// Yetki gereksinimi çağıranın seçimi değildir; eylem türüne (kind) bağlı güvenilir policy'den gelir.
// Gate 1B üretim policy'si BOŞTUR: kayıtsız her kind fail-closed reddedilir. Testler TEST-ONLY policy enjekte eder.
export const PRODUCTION_ACTION_POLICY = Object.freeze({});

export function policyFor(rt, kind) {
  const table = rt.actionPolicy ?? PRODUCTION_ACTION_POLICY;
  const p = Object.prototype.hasOwnProperty.call(table, kind) ? table[kind] : null;
  if (!p) throw new ControlError('ACTION_KIND_UNREGISTERED', `no trusted action policy for kind ${kind}`);
  if (!(nonEmpty(p.policy_id) && ROLE.test(p.required_authority ?? '') && typeof p.requires_ref === 'boolean')) {
    throw new ControlError('ACTION_POLICY_INVALID', `policy for ${kind} must be {policy_id, required_authority, requires_ref}`);
  }
  return { policy_id: p.policy_id, required_authority: p.required_authority, requires_ref: p.requires_ref };
}

// rt: runtime bağlamı. Testler dir/now/machine/authority/actionPolicy enjekte eder; CLI hiçbirini enjekte etmez.
export function runtimeContext({ dir = DEFAULT_RUNTIME_DIR, now = () => new Date().toISOString(), machine = hostname(),
  authority = NO_TRUSTED_AUTHORITY, actionPolicy = PRODUCTION_ACTION_POLICY } = {}) {
  return { dir, now, machine, authority, actionPolicy };
}
