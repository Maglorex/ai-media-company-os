# CAL-S5 — Independent Creative QA v4

> author: COO main session (Stage 5 production prep, 2026-10-15) · evaluator: creative-qa-evaluator (separate context) · date: 2026-10-15 · inputs: `channels/the-industrial-casebook/cases/CAL-S5/05-scene-plan-v4.md`, `channels/the-industrial-casebook/cases/CAL-S5/05-scene-plan-v3.md`, `channels/the-industrial-casebook/cases/CAL-S5/05-scene-plan-v2.md`, `channels/the-industrial-casebook/cases/CAL-S5/06-creative-qa-v1.md`, `channels/the-industrial-casebook/cases/CAL-S5/06-creative-qa-v2.md`, `channels/the-industrial-casebook/cases/CAL-S5/06-creative-qa-v3.md`, `channels/the-industrial-casebook/cases/CAL-S5/handoff/asset-manifest.csv` (updated), `channels/the-industrial-casebook/cases/CAL-S5/rights-ledger.csv` (updated), `channels/the-industrial-casebook/cases/CAL-S5/handoff/measurement-report-v1.md`, `channels/the-industrial-casebook/cases/CAL-S5/handoff/measurement-request-v1.md`, `channels/the-industrial-casebook/cases/CAL-S5/rights-proof/2026-10-15-web-captures.md`, `production/tools/backup/backup-production.ps1`, `os/factory/README.md` (§4–§8), `.claude/skills/creative-qa/SKILL.md`, `.claude/skills/creative-qa/TEMPLATE.md`, `channels/the-industrial-casebook/canon/README.md`, `channels/the-industrial-casebook/canon/01-viewer-promise.md` … `08-rejected-decisions.md`, `channels/the-industrial-casebook/pipeline/README.md`, `channels/the-industrial-casebook/calibration/README.md`, `channels/the-industrial-casebook/calibration/01-case-intro-golden-master.md`, `channels/the-industrial-casebook/calibration/02-golden-motion-and-anti-reference.md`, `channels/the-industrial-casebook/calibration/03-sound-grammar.md`, `channels/the-industrial-casebook/calibration/04-cta-and-next-case.md`, `channels/the-industrial-casebook/calibration/05-production-plan-and-preview.md`, `production/pilots/2026-10-n2-pilot-test/P3-evidence-ledger.md`, `production/pilots/2026-10-n2-pilot-test/P3-production-handoff-prototype-v2.md` (§2 only) · skill: `creative-qa`

**Coverage scope:** Production Scene Plan v4 only (render-before stage); no renders or audio exist and nothing visual or audible was judged. CAL-S5 is a calibration case: P3's story / opening structure is out of scope. I verified every v3 required change in the plan, the manifest and the rights ledger themselves. I re-checked each SP's Rights / Asset Readiness line against the manifest `scenes` column and the rights ledger `usage_locations`, in both directions. I compared each SP block of v4 with v3 (and, through v3, with v2), and read the backup script to check the `prototype-v2` mitigation claim. A PASS covers the plan only; render QA is `09-creative-qa-render-v1.md`.

## Re-check of v3 required changes (in the files themselves)
| # | v3 required change | Found in v4 / manifest / rights ledger | Status |
|---|---|---|---|
| 1 | SP-09 intro texture pre-selection | SP-09 Sound Role: "rendered in **two audio variants, S-1 (OG-08) and S-2 (OG-09)**, exactly like SP-03 — no texture is pre-selected; the choice is the Founder's at Golden Lock". SP-09 asset line lists OG-08 (S-1) and OG-09 (S-2). Manifest OG-08 / OG-09 scenes `SP-03;SP-07;SP-09`. | Resolved |
| 2 | SP-07 bed "M-01" | SP-07 Sound Role: SP-07 and SP-03 sit over the **same** bed (M-03 per the coverage assignment) and the same S-1 / S-2 variants in the recognition and S-1/S-2 clips, "coverage, not a preference". It matches the coverage table (intro clips → M-03). | Resolved |
| 3 | V-05 in SP-03 | Manifest V-05 scenes `SP-01;SP-03;SP-10;SP-13`; rights ledger V-05 usage `G1;I-A;AR1;AR4`. SP-09's Savannah marker is a traced contour, not V-05 pixels, so no E1 binding is needed. | Resolved |
| 4 | V-13 in SP-12 | Manifest V-13 scenes `SP-05;SP-12`; rights ledger V-13 usage `G3;AR3`; the plan's binding table notes "V-13 in SP-05 and SP-12". | Resolved |
| 5 | OG-10 bindings | Manifest OG-10 scenes `SP-01;SP-02;SP-04;SP-05;SP-06;SP-14`; SP-06 asset line now has "OG-10 own room tone under the silence"; SP-14 keeps OG-10 (anti variant). | Resolved |
| 6 | Music recoverability | Manifest M-01…M-04 `recoverability = REDOWNLOADABLE`, `backup_ref` empty. Provenance names the Studio Audio Library re-download route and states that byte-identity was verified for M-03 only. Notes say the `_audio-library/` copy is "not a backup (§8)". The plan's music section says the same. | Resolved |

**Full binding cross-check (plan SP lines ↔ manifest `scenes`):** For every SP-01…SP-14, every asset named in the Rights / Asset Readiness line carries that SP in the manifest. Every manifest asset/scene pair appears in the matching SP line. The exceptions are AI-02 (timing JSON for the VO cuts, bound to SP-01–SP-06 in the manifest and covered by the plan's binding table) and the M-xx rows: the manifest lists all four candidates for SP-01…SP-13, and the plan's per-SP "M-01…M-04" lines plus the coverage table say which one is heard where. SP-14 correctly has no music row (own textures only). Rights ledger `usage_locations` agree with the manifest for V-05, V-07, V-13, V-19, V-24, V-28/V-29, V-01/V-02/V-03, V-90, AI-01 and AI-03. All external and AI assets are CLEAR or CLEAR_WITH_ATTRIBUTION with proof locations. The binding table's hashes and durations are unchanged from v3 and still match the manifest and the measurement report.

**Creative intent vs v2/v3:** Only these items changed from v3:
- SP-06 asset line (OG-10 added).
- SP-07 Sound Role (bed per coverage).
- SP-09 Sound Role and asset line (two texture variants).
- The binding table's V-13 note.
- The recoverability bullet in the music section.

Every Beat, Story Function, Claim, Evidence Anchor, Presentation Visual, Visual Idea, Motion, Transition, UI and Anti-PowerPoint entry is identical to v3. Those entries were already identical to v2 apart from the two v2 accepted-concern fixes. The VO cut list and L1–L3 are verbatim. I re-verified the claims against the ledger:
- VO-A: C-30, C-14, C-44, C-36 / Q-06.
- VO-B: E-2 / V-03, C-04 / Q-01.
- VO-C: C-06, C-08–C-10.
- VO-D: C-31 / E-11, C-10.
- VO-E: C-32.
- SP-09: `AUG 1968` C-32; gap fill C-04 / C-06.
- L2: C-14 + C-11 / Q-02.

The cut sentences still match handoff §2.

**Backup mitigation claim:** `backup-production.ps1` loops over every folder under `D:\CompanyOS-Production` and runs `robocopy … /E` on each video's `03_vo` (and `05_premiere`) to `C:\CompanyOS-Backup\<video>\03_vo`. `/E` includes subfolders, so `P3-ns-savannah\03_vo\prototype-v2\` (AI-01 / AI-02) **is** copied. The plan's claim is correct, and verifying with `factory.mjs backup` is consistent with `os/factory/README.md` §8.

## Areas
### Central question strength
- **Rating:** PASS
- **Reason:** Unchanged. "Where was that money going?" (SP-02) is specific, answerable from the ledger and set up after one assumption beat; it is answered in SP-04 → SP-05 and closed in SP-09 (TIC-06/07, TIC-09). It is judged only as the question the CASE INTRO carries.

### Narrative curiosity
- **Rating:** PASS
- **Reason:** The opening and closing of questions is unchanged. C1 still comes after the third line has been answered (SP-08), and the reels remain a viewing order. The v4 edits touch only sound-variant and binding instructions.

### Visual curiosity
- **Rating:** PASS
- **Reason:** All golden visual ideas are verbatim from v2/v3 (contour → marker, phrase → open gap, money → place around an empty berth, absence and reversed travel, evidenced berth return). None was reduced.

### Audiovisual momentum plan
- **Rating:** PASS
- **Reason:** The sound path is coherent: the bed withdraws at the SP-02 question, returns under the intro, continues in SP-04, and SP-06 ends in real silence with OG-10 room tone, now bound. Both v3 contradictions are fixed. SP-07 and SP-03 share one bed in the clips where they are compared. SP-09 renders both texture variants instead of a "chosen" one, so texture and bed comparisons isolate exactly what the Founder judges. The music comparison file (one picture × four beds), the per-clip coverage assignment and the "pair shares a bed" rule are unchanged and do not rank any candidate.

### Story progression
- **Rating:** PASS
- **Reason:** The scene progression and the reel / clip structure are verbatim. Each golden scene starts from the previous visual result, and the CTA clip boundaries are stated.

### Evidence clarity
- **Rating:** PASS
- **Reason:** Every claim is anchored to a VERIFIED ledger row and none is new. The asset and rights records now agree in both directions for every SP. The recoverability classes are truthful: AI-01 / AI-02 `LOCAL_ONLY` with a verified mitigation path, music `REDOWNLOADABLE` with the scope of its verification stated, and no same-disk copy is presented as a backup. Attribution delivery for V-05 / V-90 is unchanged and defined. J40 identity remains traceable to the NASA capture.

### Anti-PowerPoint
- **Rating:** PASS
- **Reason:** All scene tests are verbatim (pipeline §3). Tool choices are unchanged (TIC-19). Anti-references SP-10…SP-14 still each demonstrate one named failure honestly, with OG-11 own/preset graphics and the `ANTI-REFERENCE · INTERNAL` tag.

### CASE identity
- **Rating:** PASS
- **Reason:** The SP-03 / SP-07 skeleton, typography, accent use, CASE LABEL limits and "implementation route after Golden Lock" are verbatim (TIC-11, TIC-12, TIC-24). J40 remains a demo NEXT CASE payload with the `CASE 00X` placeholder, no J40 factual sentence and a variable payload slot "filled at publish time". The intro texture remains an open Founder ear decision across SP-03, SP-07 and SP-09.

### Payoff
- **Rating:** PASS
- **Reason:** SP-09's visual payoff is unchanged and evidence-anchored: the berth return (C-32), the scaled gap fill (C-04 / C-06) and L2 (C-11 / Q-02), followed by the next-case registration and an end-screen-aware layout with no fake buttons. L1–L3 remain calibration copy, not locked, and nothing in the plan canonizes P3's story structure or the CTA wording.

## Verdict
- **Verdict:** PASS
- **Accepted concerns:** none. Non-blocking observations for the COO and Strong PC, which need no change to the plan:
  - `backup-production.ps1` copies only `03_vo` and `05_premiere`. CAL-S5's produced files under `02_graphics/`, `04_sfx/`, `05_projects/` and `06_renders/` are not covered by it. The plan's rule "produced LOCAL_ONLY outputs must be backed up before delivery" is enforced by the delivery report's Backup field (`os/factory/README.md` §6, §8), so Strong PC must show those outputs as PROTECTED in `factory.mjs backup` or report them.
  - Some composite elements reuse other scenes' own graphics without their own manifest row: the SP-08 CTA clip shows the SP-05 sheet (OG-03), and SP-09's Savannah marker comes from the SP-01 hull token. They are own graphics with no rights implication; the delivery report's per-scene asset list should name them.
- **Required changes:** none
