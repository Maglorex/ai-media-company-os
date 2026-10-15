# CAL-S5 — Independent Creative QA v6

> author: COO main session (Stage 5 revision v2, 2026-10-15) · evaluator: creative-qa-evaluator (separate context) · date: 2026-10-15 · inputs: `channels/the-industrial-casebook/cases/CAL-S5/05-scene-plan-v6.md`, `channels/the-industrial-casebook/cases/CAL-S5/05-scene-plan-v5.md`, `channels/the-industrial-casebook/cases/CAL-S5/05-scene-plan-v4.md`, `channels/the-industrial-casebook/cases/CAL-S5/06-creative-qa-v5.md`, `channels/the-industrial-casebook/cases/CAL-S5/06-creative-qa-v4.md`, `channels/the-industrial-casebook/cases/CAL-S5/08-delivery-report-v1.md`, `channels/the-industrial-casebook/cases/CAL-S5/09-founder-review-v1.md`, `channels/the-industrial-casebook/cases/CAL-S5/handoff/asset-manifest.csv`, `channels/the-industrial-casebook/cases/CAL-S5/rights-ledger.csv`, `channels/the-industrial-casebook/cases/CAL-S5/rights-proof/2026-10-15-web-captures.md`, `channels/the-industrial-casebook/cases/CAL-S5/handoff/measurement-report-v1.md`, `production/remotion/src/calibration/Reels.tsx`, `production/tools/backup/backup-production.ps1`, `os/factory/README.md` (§4–§8), `.claude/skills/creative-qa/SKILL.md`, `.claude/skills/creative-qa/TEMPLATE.md`, `channels/the-industrial-casebook/canon/README.md`, `channels/the-industrial-casebook/canon/01-viewer-promise.md` … `08-rejected-decisions.md`, `channels/the-industrial-casebook/pipeline/README.md`, `channels/the-industrial-casebook/calibration/README.md`, `channels/the-industrial-casebook/calibration/01-case-intro-golden-master.md` … `05-production-plan-and-preview.md`, `production/pilots/2026-10-n2-pilot-test/P3-evidence-ledger.md`, `production/pilots/2026-10-n2-pilot-test/P3-production-handoff-prototype-v2.md` (§2 only) · skill: `creative-qa`

**Coverage scope:** Production Scene Plan v6 only (render-before stage for the v2 preview set); no new renders exist and nothing visual or audible was judged. CAL-S5 is a calibration case: P3's story and opening structure are out of scope. I verified each v5 required change in the v6 file itself, compared v6 with v5 scene by scene, and re-checked every SP's Rights / Asset Readiness line against the manifest `scenes` column and the rights ledger `usage_locations`. A PASS covers the plan only; render QA follows delivery report v2.

## Re-check of v5 required changes (in `05-scene-plan-v6.md`)
| # | v5 required change | Found in v6 | Status |
|---|---|---|---|
| 1 | SP-05 / criterion B: functional relationships only, no invented positions (E-11) | Criterion B now reads "how the elements relate **functionally** … (positions shown only where physically necessary: barge on water, pier at the waterline) … no site plan implied". In SP-05, "depth separates drawing layers, it does not describe where things stand on the site". The gantry crane "rises as its own drawn element in a neutral position". "Every other element stands in a neutral, non-located position." The "water → pier → building" plane order is gone. The maintenance building section shows only its E-11 contents (bridge crane, spent-fuel pit). `NOT A SITE PLAN` is kept. | Resolved |
| 2 | SP-05 → SP-06 / SP-08 continuity | SP-05 now ends on "one berth drawn as the dashed outline of an absent ship (unscaled) … the berth is empty here, which is the state SP-06 opens on". Its Transition Logic says "the empty berth (dashed outline) carries into SP-06". SP-06 and SP-08 now say "layered system drawing" instead of "component sheet". SP-06's behaviour and SP-08's behaviour and placement are otherwise verbatim. | Resolved |
| 3 | v2-E audio conflict with rule 1 | v2-E is now two separate files, `v2-E1_PREMIUM_BOS.mp4` and `v2-E2_GOLDEN_aday.mp4`. Each has one continuous M-01 excerpt from the same source offset, "without restarting a bed inside a file". Criterion E says "(two files)". | Resolved |
| 4 | Null test specification; SP-06 silence rule | Rule 4(a) now tests the bed stem uncompressed (PCM) before the final encode, against M-01 decoded and resampled with the same decoder, sample rate and resampler from the same offset. It reports peak and RMS residual in dBFS, requires the residual at the numerical noise floor with no transient at any boundary, and includes the reserved silences. SP-06 Sound Role: the silence is "a fade of the **continuing** M-01 bed to inaudible … never stopped and restarted". | Resolved |
| 5 | SP-05 claim line | "whose reactor it existed to service" is replaced by "a nuclear ship servicing facility (C-10, E-11) … all of it carried by one ship (C-11, Q-02), and where her refuelling was done in August–October 1968 (C-32)". All three facts are in the ledger. | Resolved |
| 6 | SP-07 `TURBOJET` anchor | The Claim records the label and its source ("NASA caption 'Westinghouse's 11-stage J40 turbojet', rights-proof §V-90"). The Evidence Anchor points to the same capture. I verified it: rights-proof §V-90 says "Westinghouse'un 11 kademeli J40 turbojet'i". | Resolved |
| 7 | Stale asset text | SP-08 AI-03 is now "produced in v1, hashed — READY". The binding table adds SP-15 for V-05 and for V-02/V-03. The Asset status section now lists "AI-03 (produced in v1) … TO_PRODUCE under this plan (OG-01…OG-13)". **But** the footer line under the binding table still reads "TO_PRODUCE … OG-01…OG-11, AI-03". | Partly resolved; accepted below |

**Kept v1 material:**
- The VO cut list and L1–L3 are verbatim.
- SP-02's Document → Understanding behaviour, SP-04, SP-10…SP-14 and SP-15 are verbatim from v5.
- SP-06 and SP-08 change only by the "layered system drawing" wording (SP-08 also gets the AI-03 status); SP-06 also gets the continuing-bed silence rule.
- C1's placement is unchanged, and J40 stays `CASE 00X` as a demo only.
- S-1 and M-01 stay "preferred candidate, not GOLDEN".

**No new unsupported spatial or positional claims.** The only placements left are the two physically necessary ones (barge on water, pier at the waterline). The building-contains-crane-and-pit relation is from E-11. The relationship lines are unchanged and anchored: spare core ↔ REACTOR CORE by its own name; pit and barge pool ↔ FUEL ELEMENTS by C-42 / C-43. The ship is an unscaled dashed outline, and the cutaway plate is linked to it, not placed in a hull. One residual phrase remains in SP-05's Anti-PowerPoint line: parts "seen standing in depth around it". Read against the binding Visual Idea ("depth separates drawing layers, it does not describe where things stand on the site"), it describes drawing-layer depth, not site positions. No change is required.

**Bindings:** For every SP-01…SP-15, each asset in the Rights / Asset Readiness line carries that SP in the manifest. Each manifest asset/scene pair appears in the matching SP line, with two exceptions: AI-02 (timing data, covered by the binding table) and the M-02…M-04 records kept for v1 scenes. The rights ledger `usage_locations` agree, including V-08 (G3), AR6 on V-05, V-02, V-03, AI-01 and M-01, V-90 (I-B; E1) and AI-03 (C1; E1). All external and AI assets are CLEAR or CLEAR_WITH_ATTRIBUTION. V-08 is READY with the same full SHA-256 as rights-proof §V-08, and AI-03 is READY with its full hash.

## Areas
### Central question strength
- **Rating:** PASS
- **Reason:** Unchanged. "Where was that money going?" (SP-02) is specific and answerable from the ledger. It is raised after one assumption beat, answered in SP-04 → SP-05 and closed in SP-09 (TIC-06/07, TIC-09). It is judged only as the question the CASE INTRO carries.

### Narrative curiosity
- **Rating:** PASS
- **Reason:** The question chain is unchanged. The intro's CONNECT step visibly carries the open question onto the first cost line. C1 stays after the answer. SP-05 now hands an empty berth to SP-06, so the absence beat opens cleanly.

### Visual curiosity
- **Rating:** PASS
- **Reason:** The v5 ideas stand: one continuous investigation plane, the line as an instrument, a system built around a real 1960 MARAD cutaway, and the last image redrawn into the next object. Removing the invented site positions did not weaken SP-05: function lines and section openings still make the system visible, and the dashed outline of the absent ship now foreshadows SP-06.

### Audiovisual momentum plan
- **Rating:** PASS
- **Reason:** The architecture removes both causes found in `Reels.tsx`: per-scene `<Audio>` re-instantiation and the per-scene fade-out/fade-in envelope. It does so with one PCM-decoded excerpt per file and one global envelope, with silences as dips or fades of the continuing bed. The v5 conflicts are fixed:
  - the AR6 pair is two files, each with one continuous excerpt from the same offset;
  - the null test is specified where it can actually prove continuity (uncompressed stem, identical decode and resampling, peak and RMS residual reported, silences included);
  - SP-06's reserved silence now follows the same continuing-bed rule.

  The mix priority narration → S-1 event → bed answers O-9.

### Story progression
- **Rating:** PASS
- **Reason:** SP-01 → SP-04 is one unbroken spatial chain. SP-05 continues from SP-04's shore line and ends on the empty berth that SP-06 expects. C1 is inserted at the cost figure and returns into SP-06, and SP-09's marker returns to that berth (C-32). The stale "component sheet" references are gone.

### Evidence clarity
- **Rating:** CONCERN
- **Reason:** Every VO and on-screen claim is anchored to a VERIFIED ledger row or the rights-proof capture, SP-05's spatial content stays within what E-11 and the elements' own names support, and the asset and rights records agree for every SP; the only defect is the stale footer line under the binding table, accepted in the Verdict. The anchors are:
  - VO-A to VO-E: C-30, C-14, C-44, C-36 / Q-06 · E-2, V-03, C-04 / Q-01 · C-06, C-08–C-10 · C-31 / E-11, C-10 · C-32.
  - SP-03: C-30.
  - SP-05: C-10, C-11 / Q-02, C-31 / E-11, C-32, C-42, C-43, V-08.
  - SP-07: rights-proof §V-90.
  - SP-09: C-04, C-06, C-11 / Q-02, C-32.

  The spatial content is limited to what E-11 and the elements' own names support, and the asset and rights records agree for every SP. The single remaining defect is the stale footer line under the binding table ("TO_PRODUCE … OG-01…OG-11, AI-03"). It contradicts the plan's own Asset status section and the canonical manifest, where AI-03 is READY and OG-12/OG-13 are TO_PRODUCE. Accepted (see Verdict) because the manifest is canonical for the Stage 4 handoff and preflight, and the plan's Asset status, SP-08 and SP-09 lines are all correct, so no production instruction depends on the stale line.

### Anti-PowerPoint
- **Rating:** PASS
- **Reason:** Every revised golden scene keeps a scene test naming the new understanding. Acceptance criteria A–E are qualitative and bind the result regardless of tool (TIC-19). AR6 (SP-15) sits beside AR1–AR5 as the "polished but empty" failure, now in its own file next to the revised golden pair.

### CASE identity
- **Rating:** PASS
- **Reason:** The Case Line remains the single signature, now with five visible functions. The index and type tag are subordinate labels, with no title card or logo card (TIC-11, TIC-12, TIC-24). The J40 demo keeps `CASE 00X`, its own accent and a sourced type tag. The implementation route stays open until Golden Lock. S-1 is a preferred candidate, not GOLDEN.

### Payoff
- **Rating:** PASS
- **Reason:** SP-09 closes the question with the evidenced return (C-32) and the gap fill (C-04 / C-06) under L2 (C-11 / Q-02). It then redraws the berth-and-ship outline into the next hero object and leaves natural open space with no placeholders (O-8). The payload slot stays modular, filled with a real published case at publish time.

## Verdict
- **Verdict:** PASS
- **Accepted concerns:**
  - **Evidence clarity — stale footer line under the binding table** ("TO_PRODUCE … OG-01…OG-11, AI-03"). Accepted because the canonical `handoff/asset-manifest.csv` (AI-03 READY with full hash; OG-12/OG-13 TO_PRODUCE), the plan's Asset status section and the SP-08 / SP-09 asset lines all state the correct status, so preflight and production read the right values. Tidy the line to match Asset status when the plan is promoted to ACTIVE.
- **Required changes:** none
