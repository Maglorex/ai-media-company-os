// Company OS control plane (Gate 1D-A) — git.safe_sync: deterministik Git taşıma yolu.
//
// Ne yapar: yalnız onaylı uzak (origin = PRODUCTION_SYNC_POLICY.remote.url) ile, yalnız kanonik bir Gate 1B işine bağlı
// `job/<JOB-ID>` dalı için: uzak inceleme (ls-remote), tek dalın nesnelerini getirme, yalnız fast-forward alma,
// force'suz tam-refspec push ve push sonrası uzak ref doğrulaması. Keyfi git komutu, refspec, uzak URL veya test komutu almaz.
//
// Gate 1C ilişkisi: Gate 1C izin kuralları doğrudan kabuktan `git push/pull/fetch/remote` gibi komutları engeller/caydırır.
// safe-sync taşıma işini bilinçli olarak politika kontrollerinden SONRA, şirket kontrollü bu Node yolunun İÇİNDE yapar.
// Bu, keyfi Bash'i kusursuz bir OS sandbox'ı yapmaz; Gate 4 otonom çalışanları sınırlı giriş noktalarına daraltacaktır.
//
// Taşıma güven sınırı (Revision 1): safe-sync'in çalıştırdığı HER git alt süreci
//  - şirketin oluşturduğu boş, depo dışı bir hooks klasörüyle (`-c core.hooksPath=<boş>`) ve `-c core.fsmonitor=false` ile çalışır:
//    .git/hooks, yapılandırılmış core.hooksPath ve fsmonitor programı hiçbir safe-sync komutunda çalışmaz (kullanıcı hook'larına
//    dokunulmaz; yalnız bu yol için etkisizleşir). Komut satırı -c değerleri yapılandırma dosyalarını geçer; GIT_CONFIG_* ortamı silinir.
//  - replace nesnelerini yok sayar (`--no-replace-objects` + GIT_NO_REPLACE_OBJECTS=1, GIT_REPLACE_REF_BASE silinir); ayrıca
//    refs/replace/*, info/grafts veya shallow depo varsa ön kontrol fail-closed durur: taranan nesneler = aktarılan nesneler.
// Yürütme + TLS sınırı (Revision 2): TLS doğrulaması zorlanır ve kapatılmışsa fail-closed; push imzası/miras push seçeneği ve
// birleştirme imza doğrulaması kapalı; core.askPass ve depo-yerel credential helper fail-closed; etkin içerik filtresi (smudge/
// clean/process, LFS dahil) olan izlenen veya gelen yol varsa durur; doğrulama profili NODE_OPTIONS/NODE_PATH almaz.
// Revision 3: LOCAL/WORKTREE http.* ve remote.<ad>.proxy* fail-closed.
// Revision 4: LOCAL/WORKTREE credential.* tamamı fail-closed (host GCM'i yönlendiremez); depo içindeki dosyadan gelen GLOBAL/SYSTEM
// yapılandırma fail-closed; git yalnız mutlak yoldan çalışır (gitbin.mjs; çıplak ad / geçerli klasör yok) ve git'i gölgeleyebilecek
// yürütülebilir adlar (git.exe, git.cmd, git-*.exe …) ne ağaçta ne aralıkta kabul edilir; iz/kimlik-deposu/TLS-zayıflatma ortamı silinir.
// Revision 5: core.hooksPath yapılandırmayla tanımlı hook'ları (hook.<ad>.event/command, Git ≥ 2.54) KAPATMAZ → HER kapsamdaki
// (system/global dahil) hook.* fail-closed; core.alternateRefsCommand (her kapsam) ve etkin objects/info/alternates fail-closed.
// Bu kontroller ön kontrolün ilk adımıdır: öncesinde yalnız `rev-parse --show-toplevel` çalışır (hook/alternates tüketmez).
// Revision 6: (1) alt modül özyinelemesi: gitlink (mod 160000; index veya HEAD) status'tan ÖNCE fail-closed ve status
// `--ignore-submodules=all` (alt modülün kendi yapılandırması/hook'u hiçbir safe-sync komutunda okunmaz/çalışmaz).
// (2) yerel yürütme yüzeyi -c ile yalnız bastırılmaz, reddedilir: LOCAL/WORKTREE core.fsmonitor, HER kapsamda core.hooksPath ve
// hooks klasöründe `.sample` olmayan her giriş. (3) doğrulama profili (testler kendi git alt süreçlerini başlatır) GIT_CONFIG_COUNT
// ortamıyla aynı sertleştirmeyi miras alır ve os/ altındaki yok sayılan (izlenmeyen) dosya profilde çalıştırılmaz.
// Güven ayrımı: ortam sertleştirmesi İSTENMEYEN hook/fsmonitor yürütmesini engeller; profilin test kodu ise bilinçli olarak çalıştırılan
// güvenilir koddur (izlenen, protected os/ = uzaktaki onaylı içerik) ve bu bir sandbox DEĞİLDİR.
// Revision 6 kapanış düzeltmesi: profil girdisi pathspec'leri büyük/küçük harf duyarsız (`:(glob,icase)`; F1).
// Kabul edilen kalıntı riskler (P3, bağımsız kapanış incelemesi; bilinçli olarak çözülmedi):
//  - Yapılandırma hook'u TOCTOU: son ön kontrol ile push arasında host tarafında eşzamanlı yazılan hook.<ad>.* (Git ≥ 2.54) push'ta
//    çalışabilir; core.hooksPath bunu kapatmaz. Depo içeriğiyle tetiklenemez; aynı kullanıcı yetkisiyle eşzamanlı değişiklik gerektirir.
//  - Güvenilir doğrulama kodu (ör. test yardımcılarının gitEnv()'i) miras GIT_CONFIG_* sertleştirmesini kendi kontrollü fikstürlerinde
//    bilinçli olarak temizleyebilir; yüzeyler ön kontrolde zaten reddedilir.
//  - Alma yönünde gelen gitlink GITLINK_FORBIDDEN değil SECRET_SCAN_INCOMPLETE ile durur (doğru engel, yanıltıcı kod).
//
// Taşıma makbuzları (receipt): çözümlenmiş Git dizininde `<git-dir>/ai-media-company/transport/<action_id>.json`.
//  - Yerel operasyonel kanıt + idempotency/uzlaştırma durumudur. Şirket canon'u DEĞİLDİR, Git'te takip edilmez, push edilmez,
//    güvenlik otoritesi değildir. company/state/runtime'a yazılmaz: taşıma kendi taşıdığı kanonik durumu her push'ta kirletip
//    özyinelemeli bir senkron sorunu yaratmasın diye.
//  - Uzak Git durumunun yetkili kanıtı makbuz değil, uzak ref okumasıdır (ls-remote).
import { spawnSync } from 'node:child_process';
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readdirSync, realpathSync, rmdirSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve, sep } from 'node:path';
import { hostname, tmpdir } from 'node:os';
import { findGit } from '../gitbin.mjs';
import { ROOT } from '../records.mjs';
import { ControlError, canon, sha256, readJson, writeJsonAtomic, secretFindings, runtimeContext } from './common.mjs';
import { inspect } from './runtime.mjs';
import { PRODUCTION_SYNC_POLICY, routineBranch, isProtectedPath, ambiguousWindowsPath, executableShadowName, buildPushArgs, buildFetchArgs, buildLsRemoteArgs } from './sync-policy.mjs';

export const RECEIPT_SCHEMA = 'safe-sync-receipt/1';
export const RESULT_SCHEMA = 'safe-sync-result/1';
const SHA = /^[0-9a-f]{40}$/;
const MAX_BLOB_BYTES = 100 * 1024 * 1024;
const hasOwn = (o, k) => Object.prototype.hasOwnProperty.call(o ?? {}, k);

// ctx: repoDir, policy, machine, hooks (yalnız testler: beforePush/afterPush çökme simülasyonu), trace (çağrılan git argv'leri).
// `hooks` test çökme dikişleridir, Git hook'u değildir; Git hook'ları her git çağrısında bastırılır (git()).
export function syncContext({ repoDir = ROOT, policy = PRODUCTION_SYNC_POLICY, machine = hostname(), now = () => new Date().toISOString(), hooks = {}, trace = null } = {}) {
  const dir = resolve(repoDir);
  return { repoDir: dir, policy, machine, now, hooks, trace, rt: runtimeContext({ dir: join(dir, 'company', 'state', 'runtime'), machine, now }) };
}

// ---------- git yürütülebilir dosyası (tek çözümleme noktası) ----------
// findGit() (gitbin.mjs) her zaman MUTLAK bir yol döndürür ve aday yoklamasında bile çıplak `git` çalıştırmaz (Revision 4: Windows'ta
// çıplak ad geçerli klasörde aranırdı). Raporlanan yol ile çalıştırılan yol aynıdır.
export function gitExecutable() {
  const bin = findGit();
  if (!isAbsolute(bin)) throw new ControlError('GIT_UNAVAILABLE', 'git executable did not resolve to an absolute path');
  return bin;
}

// Ortamdan Git'i başka depoya/yapılandırmaya/nesne görünümüne yönlendirebilecek, TLS doğrulamasını kapatabilecek/zayıflatabilecek,
// ağ proxy komutunu değiştirebilecek, parola programı çalıştırabilecek veya kimlik bilgisini iz/dosyaya yazdırabilecek değişkenler
// temizlenir; etkileşimli kimlik istemi kapalı.
// Kimlik güven sınırı: sistem/kullanıcı (system/global) credential manager'ı HOST güven katmanıdır (gelecekte onaylı HTTPS
// kimlik doğrulaması için gerekir; şirket canon'u değildir) ve dokunulmaz. Senkronlanan deponun kendi (local/worktree) credential.*
// yapılandırması ve her kapsamdaki core.askPass güvenilmez → ön kontrol fail-closed (checkTransportTrust).
// Revision 4 (P2-b) — ek olarak silinenler:
//  - İz/loglama: GIT_TRACE* (GIT_TRACE_CURL, GIT_TRACE_REDACT, GIT_TRACE2_* dahil), GIT_CURL_VERBOSE, GCM_TRACE* (GCM_TRACE_SECRETS
//    dahil), GCM_DEBUG: kimlik doğrulama başlıklarını veya token'ı loglayabilir / süreci bekletebilir.
//  - GCM kimlik deposu yönlendirme: GCM_CREDENTIAL_STORE, GCM_PLAINTEXT_STORE_PATH (token düz metin dosyaya yazılabilir).
//  - TLS zayıflatma: GIT_SSL_VERSION, GIT_SSL_CIPHER_LIST. CA geçersiz kılma (R3 ile tutarlı): SSL_CERT_FILE, SSL_CERT_DIR, CURL_CA_BUNDLE.
//  - GIT_SSH (program; GIT_SSH_COMMAND gibi).
// Bilinçli olarak KORUNAN host ortamı (kabul edilen host güveni; ayrıntı aşağıda HOST_ENV_ACCEPTED): HTTP(S)_PROXY/ALL_PROXY/NO_PROXY,
// GCM_HTTP_PROXY, GIT_HTTP_PROXY_AUTHMETHOD, istemci sertifikası değişkenleri, HOME/USERPROFILE/XDG_CONFIG_HOME, PATH.
export const STRIPPED_ENV = /^(GIT_(DIR|WORK_TREE|INDEX_FILE|OBJECT_DIRECTORY|ALTERNATE_OBJECT_DIRECTORIES|NAMESPACE|COMMON_DIR|CEILING_DIRECTORIES|CONFIG.*|EXEC_PATH|SSH|SSH_COMMAND|ASKPASS|REPLACE_REF_BASE|NO_REPLACE_OBJECTS|SSL_NO_VERIFY|SSL_CAINFO|SSL_CAPATH|PROXY_SSL_CAINFO|PROXY_COMMAND|TRACE.*|CURL_VERBOSE|SSL_VERSION|SSL_CIPHER_LIST)|SSH_ASKPASS(_REQUIRE)?|GCM_TRACE.*|GCM_DEBUG|GCM_CREDENTIAL_STORE|GCM_PLAINTEXT_STORE_PATH|SSL_CERT_FILE|SSL_CERT_DIR|CURL_CA_BUNDLE)$/i;
// Host ortamı olarak kabul edilen (silinmeyen) taşıma ilgili değişkenler ve gerekçesi — rapor/test için tek kaynak.
export const HOST_ENV_ACCEPTED = Object.freeze({
  proxy: 'HTTP_PROXY/HTTPS_PROXY/ALL_PROXY/NO_PROXY, GCM_HTTP_PROXY, GIT_HTTP_PROXY_AUTHMETHOD: host ağ yapılandırması; TLS doğrulaması zorlanır ve CA ortamı silinir, proxy uçtan uca TLS içeriğini göremez',
  client_identity: 'GIT_SSL_CERT/GIT_SSL_KEY/GIT_SSL_CERT_PASSWORD_PROTECTED, GIT_PROXY_SSL_CERT/KEY: host istemci kimliği; sunucu doğrulamasını gevşetmez',
  config_location: 'HOME/USERPROFILE/XDG_CONFIG_HOME: GLOBAL yapılandırmanın yerini seçer; çağıran sürecin ortamı host güvenidir (PATH ile aynı sınıf). Depo içeriği bunları ayarlayamaz; depo içindeki bir dosyadan gelen GLOBAL/SYSTEM yapılandırması ise reddedilir (HOST_CONFIG_IN_REPOSITORY)',
});
export function syncGitEnv() {
  const env = { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never', LC_ALL: 'C', LANG: 'C' };
  for (const k of Object.keys(env)) if (STRIPPED_ENV.test(k)) delete env[k];
  env.GIT_NO_REPLACE_OBJECTS = '1';
  return env;
}
const isUrl = (u) => /^[a-z][a-z0-9+.-]*:\/\//i.test(u);
// Şirketin oluşturduğu boş hooks klasörü: işletim sisteminin geçici klasöründe, senkronlanan deponun DIŞINDA olmalı (depo kontrollü
// içerik hook klasörünün yerine geçemesin); değilse fail-closed. Çağıran, kullanımdan sonra yalnız boşsa siler.
function emptyHooksDir(ctx) {
  const dir = mkdtempSync(join(tmpdir(), 'cos-safe-sync-hooks-'));
  const c = canonPath(dir); const root = canonPath(ctx.repoDir);
  if (c === root || c.startsWith(root.endsWith(sep) ? root : root + sep)) { try { rmdirSync(dir); } catch { /* kanıt */ } fail('HOOKS_DIR_UNTRUSTED', 'the temporary directory is inside the synced repository; set TEMP/TMP outside it'); }
  return dir;
}
// Doğrulama profili ve onun torun git süreçleri için miras alınan sertleştirme (komut kapsamı; yerel/global yapılandırmayı geçer).
// Alt modül özyinelemesi de kapalı (diff.ignoreSubmodules=all status varsayılanını da kapsar).
const inheritedGitConfig = (hooksDir) => [['core.hooksPath', hooksDir], ['core.fsmonitor', 'false'], ['submodule.recurse', 'false'], ['diff.ignoreSubmodules', 'all']];
// Profil ortamı: Node yürütme enjeksiyonu (NODE_OPTIONS/NODE_PATH/NODE_TEST_CONTEXT) yok; STRIPPED_ENV (GIT_CONFIG_* dahil, büyük/küçük
// harf duyarsız) silinir, sonra yalnız şirketin GIT_CONFIG_COUNT/KEY/VALUE değerleri eklenir.
export function profileEnv(hooksDir) {
  const env = { ...process.env };
  for (const k of Object.keys(env)) if (/^(NODE_TEST_CONTEXT|NODE_OPTIONS|NODE_PATH)$/i.test(k) || STRIPPED_ENV.test(k)) delete env[k];
  const cfg = inheritedGitConfig(hooksDir);
  env.GIT_CONFIG_COUNT = String(cfg.length);
  cfg.forEach(([k, v], i) => { env[`GIT_CONFIG_KEY_${i}`] = k; env[`GIT_CONFIG_VALUE_${i}`] = v; });
  return env;
}
// Her safe-sync git çağrısının komut satırı değerleri (yapılandırma dosyalarını geçer): boş şirket hooks klasörü, fsmonitor kapalı,
// push imzası ve miras push seçenekleri kapalı, birleştirmede imza doğrulama programı yok, TLS doğrulaması açık (genel + onaylı
// URL'ye özgü; Git'te URL'ye özgü ayar genel ayarı geçtiği için ikisi birden). `tls: false` yalnız TLS yapılandırmasını
// OKUYAN ön kontrol çağrısı içindir (kendi değerimiz kullanıcının değerini maskelemesin).
function git(ctx, args, { allowFail = false, input, tls = true } = {}) {
  ctx.trace?.push([...args]);
  const hooksDir = emptyHooksDir(ctx);
  const { url } = ctx.policy.remote;
  const argv = ['--no-replace-objects', '-c', `core.hooksPath=${hooksDir}`, '-c', 'core.fsmonitor=false', '-c', 'submodule.recurse=false',
    '-c', 'push.gpgSign=false', '-c', 'push.pushOption=', '-c', 'merge.verifySignatures=false',
    ...(tls ? ['-c', 'http.sslVerify=true', ...(isUrl(url) ? ['-c', `http.${url}.sslVerify=true`] : [])] : []),
    ...args];
  let r;
  try { r = spawnSync(gitExecutable(), argv, { cwd: ctx.repoDir, env: syncGitEnv(), input, maxBuffer: 512 * 1024 * 1024, windowsHide: true }); }
  finally { try { rmdirSync(hooksDir); } catch { /* boş değilse kanıt olarak kalır */ } }
  if (r.error) throw new ControlError('GIT_UNAVAILABLE', r.error.code ?? 'spawn failed');
  // stderr asla hata mesajına konmaz (kimlik bilgisi içeren URL sızabilir).
  if (!allowFail && r.status !== 0) throw new ControlError('GIT_FAILED', `git ${args[0]} exited ${r.status}`);
  return { code: r.status, buf: r.stdout, text: r.stdout.toString('utf8') };
}
const gtext = (ctx, args) => git(ctx, args).text.trim();
const fail = (code, msg) => { throw new ControlError(code, msg); };
// realpathSync.native: Windows 8.3 kısa adlarını (ADMINI~1) Git'in döndürdüğü uzun yola genişletir.
const samePath = (a, b) => { const n = (p) => realpathSync.native(p); return process.platform === 'win32' ? n(a).toLowerCase() === n(b).toLowerCase() : n(a) === n(b); };
// Çok değerli çıktı: boş değerler dahil her satır sayılır (boş pushurl gibi değerler gizlenmez).
const lines = (text) => text.replace(/\r?\n$/, '').split(/\r?\n/);

// ---------- uzak hedef politikası ----------
// Etkin fetch hedef kümesi ve etkin push hedef kümesi TAM olarak tek değer olmalı ve onaylı URL'ye eşit olmalı (insteadOf /
// pushInsteadOf get-url tarafından uygulanır). Özel taşıma (vcs/uploadpack/receivepack) ve mirror (Git boolean anlamıyla) yasak.
function checkRemotePolicy(ctx) {
  const { name, url } = ctx.policy.remote;
  for (const push of [false, true]) {
    const r = git(ctx, ['remote', 'get-url', ...(push ? ['--push'] : []), '--all', name], { allowFail: true });
    const set = r.code === 0 ? lines(r.text) : [];
    if (set.length !== 1 || set[0] !== url) fail('REMOTE_POLICY_MISMATCH', `${name} ${push ? 'push' : 'fetch'} destinations must be exactly one approved URL (found ${set.length}${set.length === 1 ? ', not approved' : ''})`);
  }
  for (const key of ['vcs', 'uploadpack', 'receivepack']) {
    const r = git(ctx, ['config', '--get-all', `remote.${name}.${key}`], { allowFail: true });
    if (r.code !== 1) fail('REMOTE_POLICY_MISMATCH', `remote.${name}.${key} is configured; custom transport programs are not permitted`);
  }
  const m = git(ctx, ['config', '--type=bool', '--get-all', `remote.${name}.mirror`], { allowFail: true });
  if (m.code === 0 ? lines(m.text).some((v) => v.trim() !== 'false') : m.code !== 1) fail('REMOTE_POLICY_MISMATCH', 'mirror remotes are not permitted (or remote mirror setting is not a valid boolean)');
}

// ---------- TLS / parola programı / kimlik helper'ı güven sınırı (ağ yok) ----------
function checkTransportTrust(ctx) {
  const { url } = ctx.policy.remote;
  // Önce kapsam güveninin temeli: GLOBAL/SYSTEM diye görünen yapılandırma gerçekten depo dışından mı geliyor? (R4, P2-a)
  checkHostConfigLocation(ctx);
  // Etkin TLS doğrulaması: genel http.sslVerify (her kapsam, her değer) ve onaylı URL'ye eşleşen http.<url>.sslVerify false
  // olamaz; bozuk boolean fail-closed. Çağrılarda ayrıca -c http.sslVerify=true (+ URL'ye özgü) zorlanır.
  const gen = git(ctx, ['config', '--type=bool', '--get-all', 'http.sslVerify'], { allowFail: true, tls: false });
  if (gen.code === 0 ? lines(gen.text).some((v) => v.trim() !== 'true') : gen.code !== 1) fail('TLS_VERIFICATION_DISABLED', 'http.sslVerify is false or not a valid boolean; safe-sync never runs without TLS verification');
  if (isUrl(url)) {
    const u = git(ctx, ['config', '--type=bool', '--get-urlmatch', 'http.sslVerify', url], { allowFail: true, tls: false });
    if (u.code === 0 ? u.text.trim() !== 'true' : u.code !== 1) fail('TLS_VERIFICATION_DISABLED', 'http.<url>.sslVerify for the approved remote is false or not a valid boolean');
  }
  // Depo kendi HTTP/TLS/proxy taşıma güvenini tanımlayamaz: LOCAL/WORKTREE kapsamındaki HER http.* anahtarı (http.<url>.* dahil)
  // ve remote.<ad>.proxy / proxyAuthMethod fail-closed; değerler tek tek "güvenli" diye sınıflanmaz, silinmez/değiştirilmez.
  // SYSTEM/GLOBAL http.* host güven sınırıdır ve burada reddedilmez (yukarıdaki sslVerify=false koruması her kapsamda geçerli).
  // Revision 4: anahtarlar `--name-only -z` ile okunur (değerler bu sürece hiç girmez; boşluklu alt bölüm adı güvenle ayrışır).
  const { name } = ctx.policy.remote;
  const repoHttp = repoScopedKeys(ctx, `^(http\\..+|remote\\.${name}\\.(proxy|proxyauthmethod))$`, 'REPO_HTTP_CONFIG_FORBIDDEN', 'HTTP/proxy');
  if (repoHttp.length) fail('REPO_HTTP_CONFIG_FORBIDDEN', `repository-local HTTP/TLS/proxy configuration is not permitted: ${displayKeys(repoHttp)}`);
  // core.askPass bir programdır: hangi kapsamda olursa olsun safe-sync onu çalıştırmaz.
  if (git(ctx, ['config', '--get-all', 'core.askPass'], { allowFail: true }).code !== 1) fail('ASKPASS_CONFIGURED', 'core.askPass is configured; safe-sync does not run password programs');
  // Revision 4 (P1-a): deponun kendi credential.* yapılandırmasının TAMAMI güvenilmez — helper (R2 kodu korunur: önce raporlanır) ve
  // host credential manager'ını (GCM) yönlendiren her anahtar (trace, traceSecrets, httpProxy, credentialStore, plaintextStorePath,
  // credential.<url>.* …). Değerler sınıflanmaz. SYSTEM/GLOBAL credential.* host güven katmanıdır ve olduğu gibi çalışır.
  const cred = repoScopedKeys(ctx, '^credential\\.', 'REPO_CREDENTIAL_HELPER', 'credential', { scopes: (s) => s !== 'system' && s !== 'global' });
  const helpers = cred.filter((k) => /^credential\.(.+\.)?helper$/.test(k));
  if (helpers.length) fail('REPO_CREDENTIAL_HELPER', `${helpers.length} repository-local credential helper setting(s); only the system/user credential manager is used`);
  if (cred.length) fail('REPO_CREDENTIAL_CONFIG_FORBIDDEN', `repository-local credential configuration is not permitted (it steers the host credential manager): ${displayKeys(cred)}`);
}

// `git config --show-scope --name-only -z --get-regexp <re>` → [{ scope, key }] (değer okunmaz; include edilenler includer kapsamında).
// Okunamayan yapılandırma fail-closed (`code`).
function scopedKeys(ctx, re, code, what) {
  const r = git(ctx, ['config', '--show-scope', '--name-only', '-z', '--get-regexp', re], { allowFail: true, tls: false });
  if (r.code === 1) return [];
  if (r.code !== 0) fail(code, `${what} configuration could not be read`);
  const parts = r.text.split('\0');
  if (parts[parts.length - 1] === '') parts.pop();
  if (parts.length % 2) fail(code, `${what} configuration output could not be parsed`);
  const out = [];
  for (let i = 0; i < parts.length; i += 2) out.push({ scope: parts[i], key: parts[i + 1] });
  return out;
}
// Kapsamı `scopes` ile eşleşen anahtar adları.
function repoScopedKeys(ctx, re, code, what, { scopes = (s) => s === 'local' || s === 'worktree' } = {}) {
  return scopedKeys(ctx, re, code, what).filter((x) => scopes(x.scope)).map((x) => x.key);
}

// ---------- yapılandırmadan program çalıştırma (Revision 5; ağ yok, hiçbir şey çalıştırılmaz/silinmez) ----------
// - hook.<ad>.event/command: core.hooksPath'ten bağımsız çalışır. HER kapsam (local/worktree/command/global/system, include dahil)
//   reddedilir: GLOBAL/SYSTEM hook'u da safe-sync push/alma/dry-run'ında çalışırdı; komutlar "zararsız" diye sınıflanmaz.
//   Host credential manager etkilenmez (credential.* ayrı ve system/global'de serbest).
// - core.alternateRefsCommand: alternates varken fetch/push'ta kabukla çalışır → her kapsamda reddedilir.
// - objects/info/alternates (ve dumb-HTTP http-alternates): yol Git'in kendisinden (`--git-path`: bağlı worktree → common dir,
//   ayrı git dir) çözülür; herhangi bir giriş (boş dosya, klasör, kırık link dahil) fail-closed. GIT_ALTERNATE_OBJECT_DIRECTORIES /
//   GIT_OBJECT_DIRECTORY / GIT_COMMON_DIR ortamı zaten silinir (syncGitEnv).
function checkConfigExecution(ctx) {
  const scopesOf = (xs) => [...new Set(xs.map((x) => x.scope))].join('/');
  const hooks = scopedKeys(ctx, '^hook\\.', 'GIT_CONFIG_HOOK_FORBIDDEN', 'hook');
  if (hooks.length) fail('GIT_CONFIG_HOOK_FORBIDDEN', `configuration-defined hooks are not permitted in any scope (found in ${scopesOf(hooks)}: ${displayKeys(hooks.map((x) => x.key))}); core.hooksPath does not disable them`);
  const alt = scopedKeys(ctx, '^core\\.alternaterefscommand$', 'ALTERNATE_REFS_COMMAND_FORBIDDEN', 'core.alternateRefsCommand');
  if (alt.length) fail('ALTERNATE_REFS_COMMAND_FORBIDDEN', `core.alternateRefsCommand is configured (${scopesOf(alt)}); safe-sync does not run alternate-refs programs`);
  for (const rel of ['objects/info/alternates', 'objects/info/http-alternates']) {
    const r = git(ctx, ['rev-parse', '--git-path', rel], { allowFail: true, tls: false });
    const p = r.code === 0 ? r.text.trim() : '';
    if (!p) fail('GIT_OBJECT_ALTERNATES_FORBIDDEN', `${rel} location could not be resolved`);
    if (pathEntryExists(resolve(ctx.repoDir, p))) fail('GIT_OBJECT_ALTERNATES_FORBIDDEN', `${rel} exists; alternate object stores are not permitted (remove it by hand before syncing)`);
  }
  checkHookSurfaces(ctx);
}

// ---------- hook / fsmonitor yüzeyi (Revision 6; değerler okunmaz, hiçbir dosya silinmez/değiştirilmez) ----------
// Politika (fail-closed):
//  - core.hooksPath HER kapsamda (local/worktree/global/system, include dahil) reddedilir: safe-sync ve profili onu zaten kendi boş
//    klasörüyle geçersiz kılar; yapılandırılmış bir hook klasörü yalnız safe-sync dışı git kullanımında anlamlıdır ve bu yolda istenmez.
//    `command` kapsamı yalnız safe-sync'in kendi -c değeridir (GIT_CONFIG_* ortamı silinir).
//  - core.fsmonitor LOCAL/WORKTREE reddedilir (depo kontrollü program). SYSTEM/GLOBAL core.fsmonitor host güvenidir (ör. Git for
//    Windows'un yerleşik fsmonitor seçeneği); safe-sync ve profilin her git sürecinde core.fsmonitor=false ile bastırılır.
//  - Varsayılan hooks klasörü (common dir/hooks; bağlı worktree'nin kendi git dir'i de taranır): yalnız normal dosya olan `*.sample`
//    girdilerine izin verilir (Git bunları çalıştırmaz). Diğer her giriş — hook adı, `.exe`/uzantılı varyant, klasör, symlink/junction,
//    okunamayan giriş — fail-closed. hooks klasörünün kendisi symlink/junction veya klasör olmayan bir girişse fail-closed.
function checkHookSurfaces(ctx) {
  const hp = scopedKeys(ctx, '^core\\.hookspath$', 'HOOKS_PATH_CONFIGURED', 'core.hooksPath').filter((x) => x.scope !== 'command');
  if (hp.length) fail('HOOKS_PATH_CONFIGURED', `core.hooksPath is configured (${[...new Set(hp.map((x) => x.scope))].join('/')}); safe-sync never uses a configured hooks directory (remove the setting by hand before syncing)`);
  const fsm = repoScopedKeys(ctx, '^core\\.fsmonitor$', 'FSMONITOR_CONFIGURED', 'core.fsmonitor');
  if (fsm.length) fail('FSMONITOR_CONFIGURED', 'repository-local core.fsmonitor is configured; safe-sync does not run repository-configured fsmonitor programs (remove the setting by hand before syncing)');
  const dirs = [...new Set([gtext(ctx, ['rev-parse', '--git-common-dir']), gtext(ctx, ['rev-parse', '--absolute-git-dir'])].map((d) => resolve(ctx.repoDir, d, 'hooks')))];
  for (const dir of dirs) {
    const bad = activeHookEntries(dir);
    if (bad.length) fail('GIT_HOOK_FILE_PRESENT', `${bad.length} active hook entr(ies) in the repository hooks directory (e.g. ${JSON.stringify(category(bad[0]) ? '<withheld>' : bad[0])}); only *.sample files are permitted (move them out by hand before syncing)`);
  }
}
function activeHookEntries(dir) {
  let st;
  try { st = lstatSync(dir); } catch (e) { if (e.code === 'ENOENT') return []; return ['<unreadable hooks directory>']; }
  if (st.isSymbolicLink() || !st.isDirectory()) return ['<hooks directory is a link or not a directory>'];
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return ['<unreadable hooks directory>']; }
  return entries.filter((e) => !(e.isFile() && /\.sample$/i.test(e.name))).map((e) => e.name);
}

// ---------- gitlink / alt modül (Revision 6, Layer A) ----------
// Index (ls-files --stage) ve HEAD ağacındaki mod 160000 girdileri; status'tan önce. Salt okur: index yazılmaz, alt modüle girilmez.
function checkNoGitlinks(ctx) {
  const idx = git(ctx, ['ls-files', '--stage', '-z']).text.split('\0').filter((e) => e.startsWith('160000 ')).map((e) => e.slice(e.indexOf('\t') + 1));
  const head = git(ctx, ['rev-parse', '--verify', '-q', 'HEAD^{commit}'], { allowFail: true });
  const tree = head.code === 0
    ? git(ctx, ['ls-tree', '-r', '-z', '--full-tree', head.text.trim()]).text.split('\0').filter((e) => e.startsWith('160000 ')).map((e) => e.slice(e.indexOf('\t') + 1))
    : [];
  const all = [...new Set([...idx, ...tree])];
  if (all.length) fail('GITLINK_FORBIDDEN', `${all.length} gitlink(s) (submodule or embedded repository) in the index or HEAD (e.g. ${JSON.stringify(category(all[0]) ? '<withheld>' : all[0])}); Routine Sync never enters submodules`);
}

// Doğrulama profilinin çalıştıracağı kod yalnız izlenen dosyalardan gelebilir. Temiz status izlenmeyen dosyayı zaten engeller; yok
// sayılan dosya ise status'ta görünmez (ör. `*secret*` kalıbına uyan os/tests/x-secret.test.mjs profil glob'una girerdi).
// Kapsam bilinçli olarak dar — yalnız profil girdileri: (a) profil argv'sindeki dosya/glob yolları (Node --test glob'u gibi '*' klasör
// sınırını geçmez → `:(glob,icase)` pathspec) ve (b) os/ altında Node'un yükleyebileceği modül/paket dosyaları (.mjs/.cjs/.js/.json).
// os/ altındaki diğer yok sayılan dosyalar (log, medya, .env vb.) ve os/ dışı her şey engellemez. Dosya silinmez.
// Revision 6 kapanış düzeltmesi (F1): Windows'ta Node'un --test glob'u ve dosya sistemi büyük/küçük harf duyarsızdır (`b-SECRET.test.MJS`,
// `OS/Tests/…` eşleşir ve çalışır); Git pathspec'i ise değildir → tüm profil pathspec'leri `:(glob,icase)`.
const PROFILE_MODULE_PATHSPEC = ['mjs', 'cjs', 'js', 'json'].map((e) => `:(glob,icase)os/**/*.${e}`);
export function profileInputPathspecs(policy, profile) {
  const fromArgv = (policy.profiles[profile] ?? []).flatMap((s) => s.argv)
    .filter((a) => typeof a === 'string' && !a.startsWith('-') && /^[A-Za-z0-9_.\-/*]+$/.test(a) && a.includes('/') && !a.includes('..'))
    .map((a) => `:(glob,icase)${a}`);
  return [...new Set([...fromArgv, ...PROFILE_MODULE_PATHSPEC])];
}
function checkProfileCodeTracked(ctx, profile) {
  const ignored = git(ctx, ['ls-files', '-z', '--others', '--ignored', '--exclude-standard', '--', ...profileInputPathspecs(ctx.policy, profile)]).text.split('\0').filter(Boolean);
  if (ignored.length) fail('UNTRACKED_PROFILE_CODE', `${ignored.length} ignored untracked verification-profile input(s) could be executed or loaded by the profile (e.g. ${JSON.stringify(category(ignored[0]) ? '<withheld>' : ignored[0])}); move them out by hand before syncing`);
}
const pathEntryExists = (p) => { try { lstatSync(p); return true; } catch (e) { return !['ENOENT', 'ENOTDIR'].includes(e.code); } }; // okunamayan → var say (fail-closed)
// Hata metninde anahtar adı: alt bölüm (URL; gömülü kullanıcı adı/parola içerebilir) her zaman gizlenir; secret biçimi taşıyan ad tümden.
const displayKey = (k) => {
  if (category(k)) return '<withheld>';
  const a = k.indexOf('.'); const b = k.lastIndexOf('.');
  return a === b ? k : `${k.slice(0, a)}.<subsection>.${k.slice(b + 1)}`;
};
const displayKeys = (keys) => [...new Set(keys.map(displayKey))].join(', ');

// ---------- host yapılandırma konumu (Revision 4, P2-a) ----------
// SYSTEM/GLOBAL yapılandırma host güvenidir — ama yalnız depo dışındaki bir dosyadan geliyorsa. HOME/XDG_CONFIG_HOME depo içini
// gösteriyorsa veya host yapılandırması depo içindeki bir dosyayı include ediyorsa, depo kontrollü içerik GLOBAL/SYSTEM kapsamında
// görünürdü → fail-closed. Kaynak dosya yolları `--show-origin` ile Git'in kendisinden okunur; değerler okunmaz.
function checkHostConfigLocation(ctx) {
  const r = git(ctx, ['config', '--list', '--show-scope', '--show-origin', '--name-only', '-z'], { allowFail: true, tls: false });
  if (r.code !== 0) fail('HOST_CONFIG_IN_REPOSITORY', 'configuration origins could not be read');
  const parts = r.text.split('\0');
  if (parts[parts.length - 1] === '') parts.pop();
  if (parts.length % 3) fail('HOST_CONFIG_IN_REPOSITORY', 'configuration origin output could not be parsed');
  const roots = [ctx.repoDir, gtext(ctx, ['rev-parse', '--absolute-git-dir']), resolve(ctx.repoDir, gtext(ctx, ['rev-parse', '--git-common-dir']))].map(canonPath);
  const hits = new Set();
  for (let i = 0; i < parts.length; i += 3) {
    const [scope, origin] = [parts[i], parts[i + 1]];
    if (scope !== 'system' && scope !== 'global') continue;
    if (!origin.startsWith('file:')) continue; // 'command line:' vb. dosya değildir
    const file = canonPath(resolve(ctx.repoDir, origin.slice('file:'.length)));
    if (roots.some((root) => file === root || file.startsWith(root.endsWith(sep) ? root : root + sep))) hits.add(scope);
  }
  if (hits.size) fail('HOST_CONFIG_IN_REPOSITORY', `${[...hits].join('/')} configuration is loaded from a file inside the repository; host configuration must live outside the synced repository`);
}
// Var olan en yakın üst klasör üzerinden kanonik yol (Windows 8.3 kısa adları ve büyük/küçük harf).
function canonPath(p) {
  let cur = resolve(p); const rest = [];
  for (;;) {
    try { const r = join(realpathSync.native(cur), ...rest); return process.platform === 'win32' ? r.toLowerCase() : r; }
    catch { const up = dirname(cur); if (up === cur) return process.platform === 'win32' ? resolve(p).toLowerCase() : resolve(p); rest.unshift(cur.slice(up.length).replace(/^[\\/]/, '')); cur = up; }
  }
}

// ---------- dış içerik filtresi (smudge/clean/process) ----------
// Git'in öznitelik mekanizmasıyla (check-attr, NUL-güvenli) verilen yolların etkin `filter` özniteliği. `--cached`: .gitattributes
// index'ten (= temiz HEAD) okunur; info/attributes ve core.attributesFile de dahildir. Alma aralığında hiçbir .gitattributes
// değişemediği (protected) için bu kurallar hedef ağaçla aynıdır. Filtre çalıştırılmaz; LFS dahil her filtre şimdilik engeller.
function filteredPaths(ctx, paths) {
  if (!paths.length) return [];
  const out = git(ctx, ['check-attr', '--cached', '-z', '--stdin', 'filter'], { input: `${paths.join('\0')}\0` }).text.split('\0');
  const hits = [];
  for (let i = 0; i + 2 < out.length; i += 3) if (!['unspecified', 'unset'].includes(out[i + 2])) hits.push(out[i]);
  return hits;
}
function assertNoFilters(ctx, paths, where) {
  const hits = filteredPaths(ctx, paths);
  if (hits.length) fail('EXTERNAL_FILTER_PRESENT', `${hits.length} ${where} path(s) have an active filter attribute (e.g. ${JSON.stringify(category(hits[0]) ? '<withheld>' : hits[0])}); content filters are not run by Routine Sync`);
}

// ---------- yerel ön kontrol (ağ yok) ----------
export function preflight(ctx) {
  const checks = [];
  const ok = (name) => checks.push(name);
  const top = git(ctx, ['rev-parse', '--show-toplevel'], { allowFail: true });
  if (top.code !== 0) fail('NOT_A_REPOSITORY', ctx.repoDir);
  if (!samePath(top.text.trim(), ctx.repoDir)) fail('REPO_MISMATCH', 'repoDir is not the repository top level');
  ok('repository');
  // Revision 5: hook/alternate-refs programı tetikleyebilecek HER git çağrısından (status'un index yazımı → post-index-change,
  // fetch/merge ref işlemi → reference-transaction, push → pre-push, fetch/push → alternateRefsCommand) önce.
  checkConfigExecution(ctx);
  ok('no-config-execution');
  // Revision 6 (Layer A): alt modüle girebilecek herhangi bir status'tan önce.
  checkNoGitlinks(ctx);
  ok('no-gitlinks');
  const sym = git(ctx, ['symbolic-ref', '-q', 'HEAD'], { allowFail: true });
  const ref = sym.text.trim();
  if (sym.code !== 0 || !ref.startsWith('refs/heads/')) fail('DETACHED_HEAD', 'HEAD is not on a branch');
  const branch = ref.slice('refs/heads/'.length);
  ok('attached-head');
  for (const marker of ['MERGE_HEAD', 'CHERRY_PICK_HEAD', 'REVERT_HEAD', 'rebase-merge', 'rebase-apply', 'BISECT_LOG']) {
    if (existsSync(resolve(ctx.repoDir, gtext(ctx, ['rev-parse', '--git-path', marker])))) fail('OPERATION_IN_PROGRESS', marker);
  }
  ok('no-operation-in-progress');
  // Geçmiş görünümünü değiştiren mekanizmalar: taranan nesneler aktarılan nesnelerden farklı olabilir → fail-closed (hiçbiri silinmez).
  if (gtext(ctx, ['for-each-ref', '--format=%(refname)', 'refs/replace/'])) fail('REPLACE_REFS_PRESENT', 'refs/replace/* exist; replace objects can hide what would be transferred');
  if (existsSync(resolve(ctx.repoDir, gtext(ctx, ['rev-parse', '--git-path', 'info/grafts'])))) fail('GRAFTS_PRESENT', 'legacy info/grafts exists');
  if (gtext(ctx, ['rev-parse', '--is-shallow-repository']) !== 'false') fail('SHALLOW_REPOSITORY', 'shallow repositories cannot be inspected completely');
  ok('history-integrity');
  // Normal status'tan değişiklik gizleyebilen index bayrakları (ls-files -v: küçük harf = assume-unchanged, S/s = skip-worktree).
  const flagged = git(ctx, ['ls-files', '-v', '-z']).text.split('\0').filter(Boolean)
    .filter((e) => { const t = e[0]; return t !== t.toUpperCase() || t.toUpperCase() === 'S'; });
  if (flagged.length) fail('HIDDEN_INDEX_FLAGS', `${flagged.length} tracked file(s) marked assume-unchanged or skip-worktree; clear them by hand before syncing`);
  ok('no-hidden-index-flags');
  const tracked = git(ctx, ['ls-files', '-z']).text.split('\0').filter(Boolean);
  // Revision 4 (P1-b savunma derinliği): Git'i gölgeleyebilecek ad izlenen bir dosyada veya depo kökünde (izlenmeyen/yok sayılan dahil)
  // varsa dur. Dosya silinmez/taşınmaz; gitbin.mjs zaten depo klasöründen asla git seçmez.
  const shadows = [...tracked.filter((p) => executableShadowName(p)), ...readdirSync(ctx.repoDir).filter((n) => executableShadowName(n) && !tracked.includes(n))];
  if (shadows.length) fail('UNSAFE_EXECUTABLE_NAME', `${shadows.length} path(s) could shadow the git executable (e.g. ${JSON.stringify(category(shadows[0]) ? '<withheld>' : shadows[0])}); remove them by hand before syncing`);
  ok('no-executable-shadowing');
  // status, kirli görünen dosyada clean filtresini çalıştırabilir: filtre özniteliği olan izlenen yol varsa status'tan ÖNCE dur.
  assertNoFilters(ctx, tracked, 'tracked');
  ok('no-content-filters');
  // Revision 6 (Layer B): gitlink zaten reddedildi; yine de status hiçbir alt modüle girmez (savunma derinliği).
  const status = git(ctx, ['status', '--porcelain=v2', '-z', '--untracked-files=all', '--ignore-submodules=all']).text;
  if (status.length) fail('WORKTREE_DIRTY', `${status.split('\0').filter(Boolean).length} uncommitted or untracked entr(ies)`);
  ok('clean-worktree');
  const headR = git(ctx, ['rev-parse', '--verify', '-q', 'HEAD^{commit}'], { allowFail: true });
  const head = headR.text.trim();
  if (headR.code !== 0 || !SHA.test(head)) fail('NO_HEAD_COMMIT', 'HEAD does not resolve to a commit');
  ok('head-commit');
  const { job_id } = routineBranch(branch);
  ok('routine-branch');
  checkRemotePolicy(ctx);
  ok('remote-policy');
  checkTransportTrust(ctx);
  ok('transport-trust');
  const s = inspect(ctx.rt);
  if (!s.exists || !s.log.ok || s.replayErrors.length || s.divergence.length || s.tempFiles.length || s.locked) {
    fail('RUNTIME_UNHEALTHY', 'Gate 1B runtime is not healthy (broken log, divergence, interrupted write or lock)');
  }
  if (s.model.mode === 'PAUSED') fail('COMPANY_PAUSED', s.model.mode_reason);
  ok('runtime-healthy');
  const job = s.model.jobs[job_id];
  if (!job) fail('JOB_NOT_FOUND', `${job_id} is not in the canonical event log`);
  if (job.branch !== branch) fail('JOB_BRANCH_MISMATCH', `${job_id} is bound to branch ${job.branch}, not ${branch}`);
  if (job.state === 'COMPLETE') fail('JOB_COMPLETE', job_id);
  if (job.owner_machine !== ctx.machine) fail('JOB_OWNER_MISMATCH', `${job_id} is owned by ${job.owner_machine}, not this machine`);
  ok('job-binding');
  const profile = hasOwn(ctx.policy.machine_profiles, ctx.machine) ? ctx.policy.machine_profiles[ctx.machine] : null;
  if (!profile || !hasOwn(ctx.policy.profiles, profile)) fail('PROFILE_UNKNOWN', `no verification profile for machine ${ctx.machine}`);
  ok('verification-profile');
  checkProfileCodeTracked(ctx, profile);
  ok('profile-code-tracked');
  return { branch, head, job_id, job_state: job.state, profile, checks };
}

// ---------- uzak inceleme ----------
function lsRemote(ctx, branch) {
  const out = gtext(ctx, buildLsRemoteArgs(ctx.policy.remote.name, branch)).split('\n').filter(Boolean);
  const hits = out.map((l) => l.split('\t')).filter(([, r]) => r === `refs/heads/${branch}`);
  if (hits.length > 1 || !hits.every(([s]) => SHA.test(s))) fail('REMOTE_UNREADABLE', 'unexpected ls-remote output');
  return hits.length ? hits[0][0] : null;
}
function fetchObjects(ctx, branch, sha) {
  git(ctx, buildFetchArgs(ctx.policy.remote.name, branch));
  if (git(ctx, ['cat-file', '-e', `${sha}^{commit}`], { allowFail: true }).code !== 0) fail('REMOTE_CHANGED', `remote ${branch} moved during inspection`);
}
function isAncestor(ctx, a, b) {
  const r = git(ctx, ['merge-base', '--is-ancestor', a, b], { allowFail: true });
  if (r.code === 0) return true;
  if (r.code === 1) return false;
  return fail('GIT_FAILED', 'merge-base failed');
}
export function classify(ctx, local, remote) {
  if (!remote) return 'REMOTE_BRANCH_MISSING';
  if (local === remote) return 'EQUAL';
  if (isAncestor(ctx, remote, local)) return 'LOCAL_AHEAD';
  if (isAncestor(ctx, local, remote)) return 'REMOTE_AHEAD';
  return 'DIVERGED';
}

// ---------- aralık: hedefte yeni erişilebilir olacak commit'ler ----------
const commitsInRange = (ctx, head, exclude) => gtext(ctx, ['rev-list', head, '--not', exclude]).split('\n').filter(Boolean);

// Aralıktaki HER commit'in dokunduğu yollar (birleştirmelerde her ebeveyne karşı): protected yollar (Windows kanonik karşılaştırma)
// ve Windows'ta başka yola normalleşebilecek belirsiz yollar.
export function rangePaths(ctx, head, exclude) {
  const touched = new Set();
  for (const c of commitsInRange(ctx, head, exclude)) {
    for (const p of git(ctx, ['diff-tree', '--no-commit-id', '--name-only', '-r', '-z', '--no-renames', '-m', '--root', c]).text.split('\0')) if (p) touched.add(p);
  }
  const all = [...touched].sort();
  return {
    protectedPaths: all.filter((p) => isProtectedPath(p, ctx.policy.protected_paths)),
    ambiguous: all.map((p) => ({ path: p, reason: ambiguousWindowsPath(p) })).filter((x) => x.reason),
    executables: all.filter((p) => executableShadowName(p)),
  };
}

// `git cat-file --batch` çıktısını ayrıştırır: "<sha> <type> <size>\n<içerik>\n".
function readObjects(ctx, shas) {
  if (!shas.length) return [];
  const buf = git(ctx, ['cat-file', '--batch'], { input: `${shas.join('\n')}\n` }).buf;
  const out = [];
  let i = 0;
  while (i < buf.length) {
    const nl = buf.indexOf(0x0a, i);
    const [sha, type, sizeStr] = buf.subarray(i, nl).toString('utf8').split(' ');
    if (type === 'missing' || !SHA.test(sha)) fail('SECRET_SCAN_INCOMPLETE', 'an object required for scanning is missing');
    const size = Number(sizeStr);
    out.push({ sha, type, content: buf.subarray(nl + 1, nl + 1 + size) });
    i = nl + 1 + size + 1;
  }
  return out;
}
const category = (text) => { const f = secretFindings(text); return f.length ? /\(([^)]+)\)$/.exec(f[0])?.[1] ?? 'secret-like' : null; };
// Blob'un taranan metin görünümleri (sezgisel; sıkıştırılmış/şifreli kaplar kapsam dışı):
//  - latin1: her bayt bir karakter (UTF-8 ve ikili içerikteki ASCII secret biçimleri)
//  - BOM'lu UTF-16LE / UTF-16BE: güvenli çözülmüş metin
//  - NUL içeren içerik: NUL baytları atılmış görünüm (BOM'suz UTF-16 ASCII metni)
function blobViews(buf) {
  const views = [buf.toString('latin1')];
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) views.push(buf.subarray(2, 2 + ((buf.length - 2) & ~1)).toString('utf16le'));
  else if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) views.push(Buffer.from(buf.subarray(2, 2 + ((buf.length - 2) & ~1))).swap16().toString('utf16le'));
  if (buf.includes(0)) views.push(Buffer.from(buf.filter((b) => b !== 0)).toString('latin1'));
  return views;
}
const blobCategory = (buf) => { for (const v of blobViews(buf)) { const c = category(v); if (c) return c; } return null; };

// Push/alma öncesi: (A) hedef HEAD ağacının tamamı ve (B) aralıktaki HER yeni commit mesajı ve HER yeni blob.
// A commit'inde eklenip B'de silinen secret, B commit'inin blob'u olarak (B) kapsamında yakalanır. Değer asla raporlanmaz.
export function scanForSecrets(ctx, head, exclude) {
  const findings = [];
  const report = (cat, path, object, commit) => {
    findings.push({ category: cat, path: path && !category(path) ? path : '<withheld>', object: object.slice(0, 12), ...(commit ? { commit: commit.slice(0, 12) } : {}) });
  };
  const commits = commitsInRange(ctx, head, exclude);
  for (const o of readObjects(ctx, commits)) {
    const cat = category(o.content.toString('latin1'));
    if (cat) report(cat, '(commit message/header)', o.sha, o.sha);
  }
  // (B) aralıkta yeni erişilebilir tüm nesneler (yol adlarıyla)
  const listed = gtext(ctx, ['rev-list', '--objects', head, '--not', exclude]).split('\n').filter(Boolean)
    .map((l) => { const sp = l.indexOf(' '); return sp < 0 ? { sha: l, path: null } : { sha: l.slice(0, sp), path: l.slice(sp + 1) }; });
  const pathOf = new Map(listed.map((x) => [x.sha, x.path]));
  // (A) HEAD ağacının tamamı
  const tree = git(ctx, ['ls-tree', '-r', '-z', '--full-tree', head]).text.split('\0').filter(Boolean).map((e) => {
    const tab = e.indexOf('\t');
    const [, type, sha] = e.slice(0, tab).split(' ');
    return { type, sha, path: e.slice(tab + 1) };
  });
  if (tree.some((t) => t.type === 'commit')) fail('SECRET_SCAN_INCOMPLETE', 'submodule entries cannot be inspected');
  for (const t of tree) if (!pathOf.has(t.sha)) pathOf.set(t.sha, t.path);
  const candidates = [...new Set([...listed.map((x) => x.sha), ...tree.map((t) => t.sha)])];
  const sizes = git(ctx, ['cat-file', '--batch-check=%(objectname) %(objecttype) %(objectsize)'], { input: `${candidates.join('\n')}\n` }).text.trim().split('\n').filter(Boolean);
  const blobs = [];
  for (const line of sizes) {
    const [sha, type, size] = line.split(' ');
    if (type === 'missing') fail('SECRET_SCAN_INCOMPLETE', 'object missing');
    if (type !== 'blob') continue;
    if (Number(size) > MAX_BLOB_BYTES) fail('SECRET_SCAN_INCOMPLETE', `blob ${sha.slice(0, 12)} exceeds the ${MAX_BLOB_BYTES}-byte scan limit`);
    blobs.push(sha);
  }
  for (let k = 0; k < blobs.length; k += 500) {
    for (const o of readObjects(ctx, blobs.slice(k, k + 500))) {
      const cat = blobCategory(o.content);
      if (cat) report(cat, pathOf.get(o.sha), o.sha);
    }
  }
  return { result: findings.length ? 'FAIL' : 'PASS', commits: commits.length, blobs: blobs.length, findings };
}

// Tek içerik sınırı — hem push (yerel → uzak) hem alma (uzak → yerel) için, hedef ref hareket etmeden ÖNCE:
// belirsiz Windows yolu → protected control-plane yolu → secret geçmişi. `direction` yalnız mesaj içindir.
function contentGate(ctx, res, head, exclude, direction) {
  const { protectedPaths, ambiguous, executables } = rangePaths(ctx, head, exclude);
  if (ambiguous.length) {
    res.ambiguous_paths = ambiguous.map((a) => ({ path: category(a.path) ? '<withheld>' : a.path, reason: a.reason }));
    fail('UNSAFE_WINDOWS_PATH', `${direction} range contains Windows-ambiguous paths: ${res.ambiguous_paths.map((a) => `${JSON.stringify(a.path)} (${a.reason})`).join(', ')}`);
  }
  // Revision 4: aralıkta (eklenip geri alınmış olsa da) git'i gölgeleyebilecek yürütülebilir ad → hedef ref hareket etmeden dur.
  if (executables.length) {
    res.executable_paths = executables.map((p) => (category(p) ? '<withheld>' : p));
    fail('UNSAFE_EXECUTABLE_NAME', `${direction} range contains names that could shadow the git executable: ${res.executable_paths.map((p) => JSON.stringify(p)).join(', ')}`);
  }
  if (protectedPaths.length && !ctx.policy.system_change_allowed) {
    res.protected_paths = protectedPaths;
    fail('SYSTEM_CHANGE_REQUIRED', `routine job ${direction} touches protected control-plane paths: ${protectedPaths.join(', ')}`);
  }
  const scan = scanForSecrets(ctx, head, exclude);
  res.secret_scan = { result: scan.result, commits: scan.commits, blobs: scan.blobs };
  if (scan.result !== 'PASS') { res.secret_findings = scan.findings; fail('SECRET_DETECTED', scan.findings.map((f) => `${f.category} @ ${f.path} (${f.commit ? `commit ${f.commit}` : `object ${f.object}`})`).join('; ')); }
  return scan;
}

// ---------- sabit doğrulama profili ----------
// Node yürütme enjeksiyonu yok (profileEnv). Revision 6: profil ve torun git süreçleri GIT_CONFIG_COUNT ile boş şirket hooks klasörü,
// core.fsmonitor=false ve alt modül özyinelemesi kapalı olarak çalışır. Bu, testlerin İSTENMEDEN tetikleyeceği hook/fsmonitor'u
// engeller; test kodunun kendisi güvenilir koddur (bilinçli olarak `-c`/ortam değiştiren test kodu bu sınırın konusu değildir).
// hooks klasörü profil boyunca boş kalmalı; değilse doğrulama başarısız sayılır ve klasör kanıt olarak bırakılır.
function runProfile(ctx, profile) {
  const results = [];
  const hooksDir = emptyHooksDir(ctx);
  let tampered = false;
  try {
    for (const step of ctx.policy.profiles[profile]) {
      const r = spawnSync(process.execPath, [...step.argv], { cwd: ctx.repoDir, env: profileEnv(hooksDir), stdio: 'ignore', timeout: ctx.policy.verification_timeout_ms, windowsHide: true });
      results.push({ name: step.name, ok: r.status === 0, exit: r.status });
      if (r.status !== 0) break;
    }
  } finally {
    try { tampered = readdirSync(hooksDir).length > 0; } catch { tampered = true; }
    if (!tampered) { try { rmdirSync(hooksDir); } catch { /* kanıt olarak kalır */ } }
  }
  if (tampered) results.push({ name: 'inherited-hooks-dir-empty', ok: false, exit: null });
  return { ok: !tampered && results.length === ctx.policy.profiles[profile].length && results.every((r) => r.ok), results };
}

// ---------- taşıma makbuzu (clone-local, takip edilmez) ----------
export function transportDir(ctx) { return join(gtext(ctx, ['rev-parse', '--absolute-git-dir']), 'ai-media-company', 'transport'); }
export function actionId(ctx, { operation, branch, intended_head, job_id, profile }) {
  return `SYNC-${sha256(canon({ operation, remote: ctx.policy.remote.url, branch, intended_head, job_id, policy_id: ctx.policy.policy_id, profile })).slice(0, 32)}`;
}
function readReceipt(dir, id) {
  const r = readJson(join(dir, `${id}.json`));
  if (!r.ok) {
    if (r.error === 'missing') return null;
    return fail('RECEIPT_CORRUPT', `transport receipt ${id} is unreadable; inspect it by hand`);
  }
  if (r.value?.schema !== RECEIPT_SCHEMA || r.value?.action_id !== id) fail('RECEIPT_CORRUPT', `transport receipt ${id} has an unexpected shape`);
  return r.value;
}
function writeReceipt(ctx, dir, receipt) {
  mkdirSync(dir, { recursive: true });
  const f = secretFindings(receipt);
  if (f.length) fail('RECEIPT_REJECTED', 'receipt would contain secret-like content');
  writeJsonAtomic(join(dir, `${receipt.action_id}.json`), receipt);
  return receipt;
}

// ---------- ana giriş ----------
// mode: 'status' (yalnız yerel ön kontrol, ağ yok) · 'dry-run' (uzak okunur, hiçbir ref/dal/uzak/makbuz değişmez) · 'sync'.
export function safeSync(ctx, { mode = 'sync' } = {}) {
  if (!['status', 'dry-run', 'sync'].includes(mode)) throw new ControlError('USAGE', `unknown mode ${mode}`);
  const res = { schema: RESULT_SCHEMA, mode, policy_id: ctx.policy.policy_id, machine: ctx.machine, ok: false, result: null, code: null, message: null };
  const done = (result, extra = {}) => Object.assign(res, { ok: true, result }, extra);
  try {
    res.git_executable = gitExecutable();
    const pf = preflight(ctx);
    Object.assign(res, { branch: pf.branch, job_id: pf.job_id, local_head: pf.head, profile: pf.profile, checks: pf.checks });
    if (mode === 'status') return done('PREFLIGHT_PASS');

    const remoteTip = lsRemote(ctx, pf.branch);
    res.remote_head_before = remoteTip;
    const id = actionId(ctx, { operation: 'push', branch: pf.branch, intended_head: pf.head, job_id: pf.job_id, profile: pf.profile });
    res.action_id = id;
    const dir = transportDir(ctx);
    const prior = readReceipt(dir, id);
    res.prior_receipt_state = prior?.state ?? null;
    const base = {
      schema: RECEIPT_SCHEMA, action_id: id, operation: 'push', machine: ctx.machine, job_id: pf.job_id, branch: pf.branch,
      policy_id: ctx.policy.policy_id, profile: pf.profile, local_head_before: pf.head, intended_head: pf.head,
    };
    // Her yazım bir öncekinin üzerine kurulur (STARTED'daki tarama/doğrulama özeti VERIFIED'da korunur).
    let current = prior;
    const stamp = (state, extra) => { current = writeReceipt(ctx, dir, { ...base, ...(current ?? {}), ...extra, state, updated_at: ctx.now(), created_at: current?.created_at ?? ctx.now() }); return current; };

    // Uzlaştırma: önceki deneme belirsizse önce uzak ref okunur; asla körlemesine yeniden push edilmez.
    if (prior && mode === 'sync') {
      if (['VERIFIED', 'RECONCILED_SUCCESS', 'RECONCILED_EQUAL'].includes(prior.state) && remoteTip === pf.head) return done('REPLAY_VERIFIED', { remote_head_after: remoteTip });
      if (['STARTED', 'AMBIGUOUS', 'FAILED'].includes(prior.state)) {
        if (remoteTip === pf.head) { stamp('RECONCILED_SUCCESS', { remote_head_after: remoteTip, result: 'RECONCILED_SUCCESS' }); return done('RECONCILED_SUCCESS', { remote_head_after: remoteTip }); }
        if (remoteTip !== prior.remote_head_before) { stamp('AMBIGUOUS', { remote_head_after: remoteTip, result: 'REMOTE_CHANGED_AMBIGUOUS' }); fail('REMOTE_CHANGED_AMBIGUOUS', 'remote moved to a third commit after an ambiguous attempt; manual reconciliation required'); }
        // uzak hâlâ bilinen eski commit'te: tam politika kontrolleri yeniden çalıştırılarak yeniden deneme uygun
      }
    }

    if (remoteTip) fetchObjects(ctx, pf.branch, remoteTip);
    const cls = classify(ctx, pf.head, remoteTip);
    res.classification = cls;
    let exclude;
    switch (cls) {
      case 'EQUAL':
        if (mode === 'sync' && !prior) stamp('RECONCILED_EQUAL', { remote_head_before: remoteTip, remote_head_after: remoteTip, classification: cls, result: 'NOOP_EQUAL' });
        return done('NOOP_EQUAL', { remote_head_after: remoteTip });
      case 'DIVERGED':
        return fail('DIVERGED', 'local and remote have diverged; no merge, rebase, reset or push');
      case 'REMOTE_AHEAD': {
        if (!isAncestor(ctx, pf.head, remoteTip)) fail('NOT_FAST_FORWARD', 'refusing non fast-forward update');
        // Gelen aralık (yerel HEAD → gözlenen uzak SHA) yerel dal hareket etmeden ÖNCE aynı içerik sınırından geçer.
        contentGate(ctx, res, remoteTip, pf.head, 'receive');
        // Çalışma ağacı güncellenmeden önce: gözlenen uzak SHA'nın tam hedef ağacındaki hiçbir yolda etkin filtre yok.
        assertNoFilters(ctx, git(ctx, ['ls-tree', '-r', '-z', '--name-only', '--full-tree', remoteTip]).text.split('\0').filter(Boolean), 'incoming target-tree');
        if (mode === 'dry-run') return done('WOULD_FAST_FORWARD', { target: remoteTip });
        git(ctx, ['merge', '--ff-only', '--no-edit', '--no-verify-signatures', remoteTip]);
        const now = gtext(ctx, ['rev-parse', '--verify', 'HEAD^{commit}']);
        if (now !== remoteTip) fail('RECEIVE_UNVERIFIED', 'local HEAD does not equal the fetched remote commit');
        return done('FAST_FORWARDED', { local_head_after: now });
      }
      case 'REMOTE_BRANCH_MISSING': {
        const approved = hasOwn(ctx.policy.first_publication_bases, pf.job_id) ? ctx.policy.first_publication_bases[pf.job_id] : null;
        if (!approved || !SHA.test(approved)) fail('FIRST_PUBLICATION_NOT_PERMITTED', `no approved base commit for ${pf.job_id}; the base is never guessed`);
        if (git(ctx, ['cat-file', '-e', `${approved}^{commit}`], { allowFail: true }).code !== 0 || !isAncestor(ctx, approved, pf.head)) fail('BASE_INVALID', 'approved base is not an ancestor of HEAD');
        const baseRef = ctx.policy.first_publication_base_ref;
        const remoteBase = lsRemote(ctx, baseRef);
        if (!remoteBase) fail('BASE_NOT_ON_REMOTE', `remote ${baseRef} missing`);
        fetchObjects(ctx, baseRef, remoteBase);
        if (!isAncestor(ctx, approved, remoteBase)) fail('BASE_NOT_ON_REMOTE', 'approved base is not reachable on the remote');
        exclude = approved;
        break;
      }
      case 'LOCAL_AHEAD':
        exclude = remoteTip;
        break;
      default:
        fail('CLASSIFICATION_UNKNOWN', cls);
    }

    // Push yolu: belirsiz yol → protected yol → secret geçmişi → (yalnız sync) doğrulama profili → STARTED makbuz → push → uzak doğrulama.
    contentGate(ctx, res, pf.head, exclude, 'push');
    const pushArgs = buildPushArgs(ctx.policy.remote.name, pf.head, pf.branch);
    if (mode === 'dry-run') return done('WOULD_PUSH', { push_args: pushArgs, would_run_profile: pf.profile });

    const ver = runProfile(ctx, pf.profile);
    res.verification = ver.results;
    if (!ver.ok) fail('VERIFICATION_FAILED', `verification profile ${pf.profile} failed: ${ver.results.filter((r) => !r.ok).map((r) => r.name).join(', ') || 'not run'}`);
    const again = preflight(ctx);
    if (again.head !== pf.head || again.branch !== pf.branch) fail('VERIFICATION_CHANGED_WORKTREE', 'HEAD or branch changed during verification');

    // Makbuz alan adı "history_scan": "secret_*" anahtarları secret taramasında (doğru olarak) reddedilir.
    stamp('STARTED', { remote_head_before: remoteTip, classification: cls, history_scan: res.secret_scan, verification: ver.results, result: null });
    ctx.hooks.beforePush?.();
    const pushed = git(ctx, pushArgs, { allowFail: true });
    ctx.hooks.afterPush?.();
    const after = lsRemote(ctx, pf.branch);
    res.remote_head_after = after;
    if (after === pf.head) { stamp('VERIFIED', { remote_head_after: after, push_exit: pushed.code, result: 'PUSHED_VERIFIED' }); return done('PUSHED_VERIFIED'); }
    if (after === remoteTip) { stamp('FAILED', { remote_head_after: after, push_exit: pushed.code, result: 'PUSH_REJECTED' }); return fail('PUSH_REJECTED', 'remote unchanged after push; retry is eligible after full checks'); }
    stamp('AMBIGUOUS', { remote_head_after: after, push_exit: pushed.code, result: 'PUSH_UNVERIFIED' });
    return fail('PUSH_UNVERIFIED', 'remote does not equal the intended commit; not reporting success');
  } catch (e) {
    if (!(e instanceof ControlError)) throw e;
    return Object.assign(res, { ok: false, result: 'BLOCKED', code: e.code, message: e.message });
  }
}
