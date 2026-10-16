#!/usr/bin/env node
// Company OS control plane (Gate 1B) — yerel komut satırı. Paket yok.
//   node os/control/company.mjs status [--json]                     salt-okunur doctor (alias: doctor); çıkış 0 yalnız HEALTHY
//   node os/control/company.mjs mode                                salt-okunur (olay replay'inden)
//   node os/control/company.mjs events verify                       salt-okunur
//   node os/control/company.mjs job list | job show <JOB-ID>         salt-okunur
//   node os/control/company.mjs action list | action show <ACT-ID>   salt-okunur
//   node os/control/company.mjs init --as <role> [--predecessor-file archive/<name>.jsonl --predecessor-reason "<text>"]
//   node os/control/company.mjs pause --as <role> --reason "<text>"
//   node os/control/company.mjs resume --as <role> --reason "<text>" [--approval-ref <ref>]          Gate 1B: FOUNDER_APPROVAL_REQUIRED
//   node os/control/company.mjs job create --file <job.json> --as <role>
//   node os/control/company.mjs job transition <JOB-ID> <STATE> --as <role> --reason "<text>" [--blocker "<text>"]... [--next-owner <role>]
//   node os/control/company.mjs job approve <JOB-ID> --as <role> --approval-ref <ref>                  Gate 1B: FOUNDER_APPROVAL_REQUIRED
//   node os/control/company.mjs action authorize <ACT-ID> --as <role> --approval-ref <ref>             Gate 1B: fail-closed
//   node os/control/company.mjs reproject --as <role> --reason "<text>"                               açık kurtarma (olaylar değişmez)
//   node os/control/company.mjs safe-sync status|dry-run|sync [--json] [--repo-dir <path>]                 Gate 1D-A git.safe_sync
//        status: yalnız yerel ön kontrol (ağ yok) · dry-run: uzak okunur, hiçbir şey değişmez · sync: politika kontrolleri + taşıma
//        Uzak URL, refspec, doğrulama komutu verilemez: üretim politikası sabittir (os/lib/control/sync-policy.mjs).
//   node os/control/company.mjs safe-sync start --job <JOB-ID> [--json] [--repo-dir <path>]                 Gate 1D-B: job dalını kayıtlı tabandan oluştur
//   node os/control/company.mjs job assign <JOB-ID> --to <machine> --as <role> --reason "<text>"             Gate 1D-B: yalnız Main PC, temiz kontrol dalı
// Ortak: --runtime-dir <path> (varsayılan company/state/runtime). Çıkış kodu: 0 tamam · 1 sağlıksız/ret · 2 kullanım hatası.
// --as yalnız denetim/atıf meta verisidir; yetki vermez. CLI hiçbir zaman trusted authority veya action policy enjekte etmez.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runtimeContext, DEFAULT_RUNTIME_DIR, ControlError } from '../lib/control/common.mjs';
import { initRuntime, getMode, pauseCompany, resumeCompany, reproject, inspect } from '../lib/control/runtime.mjs';
import { createJob, readJob, listJobs, transitionJob, approveJob } from '../lib/control/jobs.mjs';
import { listActions, readAction, authorizeAction } from '../lib/control/actions.mjs';
import { doctor, formatReport } from '../lib/control/doctor.mjs';
import { safeSync, syncContext, startJobBranch, recordAssignment } from '../lib/control/safe-sync.mjs';

function parse(argv) {
  const pos = [];
  const opt = { blocker: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { pos.push(a); continue; }
    const k = a.slice(2);
    if (k === 'json') { opt.json = true; continue; }
    const v = argv[++i];
    if (v === undefined) throw new ControlError('USAGE', `--${k} needs a value`);
    if (k === 'blocker') opt.blocker.push(v); else opt[k.replace(/-/g, '_')] = v;
  }
  return { pos, opt };
}
const print = (o) => console.log(typeof o === 'string' ? o : JSON.stringify(o, null, 2));

function main(argv) {
  const { pos, opt } = parse(argv);
  const rt = runtimeContext({ dir: opt.runtime_dir ? resolve(opt.runtime_dir) : DEFAULT_RUNTIME_DIR });
  const [cmd, sub, ...rest] = pos;
  const as = { actor_role: opt.as };
  switch (cmd) {
    case 'status': case 'doctor': {
      const r = doctor(rt);
      print(opt.json ? r : formatReport(r));
      return r.healthy ? 0 : 1;
    }
    case 'mode': print(getMode(rt)); return 0;
    case 'init': {
      const predecessor = opt.predecessor_file ? { file: opt.predecessor_file, reason: opt.predecessor_reason } : null;
      print(initRuntime(rt, { ...as, predecessor }));
      return 0;
    }
    case 'pause': print(pauseCompany(rt, { ...as, reason: opt.reason })); return 0;
    case 'resume': print(resumeCompany(rt, { ...as, reason: opt.reason, approval_ref: opt.approval_ref })); return 0;
    case 'reproject': print(reproject(rt, { ...as, reason: opt.reason })); return 0;
    case 'safe-sync': {
      if (!['status', 'dry-run', 'sync', 'start'].includes(sub)) break;
      const sctx = syncContext(opt.repo_dir ? { repoDir: resolve(opt.repo_dir) } : {});
      const r = sub === 'start' ? startJobBranch(sctx, { job_id: opt.job }) : safeSync(sctx, { mode: sub });
      print(opt.json ? r : `${r.ok ? 'OK' : 'BLOCKED'} ${r.result}${r.code ? ` ${r.code}` : ''}${r.message ? ` — ${r.message}` : ''}`);
      return r.ok ? 0 : 1;
    }
    case 'events': {
      if (sub !== 'verify') break;
      const s = inspect(rt);
      const ok = s.log.ok && !s.replayErrors.length;
      print({ ok, count: s.log.events.length, head: s.log.head, errors: [...s.log.errors, ...s.replayErrors] });
      return ok ? 0 : 1;
    }
    case 'job':
      if (sub === 'list') { print(listJobs(rt)); return 0; }
      if (sub === 'show') { print(readJob(rt, rest[0])); return 0; }
      if (sub === 'create') {
        if (!opt.file) throw new ControlError('USAGE', 'job create needs --file');
        print(createJob(rt, JSON.parse(readFileSync(resolve(opt.file), 'utf8')), as));
        return 0;
      }
      if (sub === 'transition') {
        print(transitionJob(rt, rest[0], rest[1], { ...as, reason: opt.reason, blockers: opt.blocker.length ? opt.blocker : undefined, next_owner: opt.next_owner }));
        return 0;
      }
      if (sub === 'approve') { print(approveJob(rt, rest[0], { ...as, approval_ref: opt.approval_ref })); return 0; }
      if (sub === 'assign') { print(recordAssignment(syncContext(), { job_id: rest[0], to_machine: opt.to, reason: opt.reason, ...as })); return 0; }
      break;
    case 'action':
      if (sub === 'list') { print(listActions(rt)); return 0; }
      if (sub === 'show') { print(readAction(rt, rest[0])); return 0; }
      if (sub === 'authorize') { print(authorizeAction(rt, rest[0], { ...as, approval_ref: opt.approval_ref })); return 0; }
      break;
    default:
  }
  console.error('usage: see the header of os/control/company.mjs');
  return 2;
}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (e) {
  if (e instanceof ControlError) { console.error(`REFUSED ${e.message}`); process.exitCode = e.code === 'USAGE' ? 2 : 1; }
  else throw e;
}
