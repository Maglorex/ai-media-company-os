# CAL-S5 — Independent Creative QA v5

> author: COO main session (Stage 5 revision v2, 2026-10-15) · evaluator: creative-qa-evaluator (separate context) · date: 2026-10-15 · inputs: `channels/the-industrial-casebook/cases/CAL-S5/05-scene-plan-v5.md`, `channels/the-industrial-casebook/cases/CAL-S5/05-scene-plan-v4.md`, `channels/the-industrial-casebook/cases/CAL-S5/06-creative-qa-v4.md`, `channels/the-industrial-casebook/cases/CAL-S5/06-creative-qa-v3.md`, `channels/the-industrial-casebook/cases/CAL-S5/08-delivery-report-v1.md`, `channels/the-industrial-casebook/cases/CAL-S5/09-founder-review-v1.md`, `channels/the-industrial-casebook/cases/CAL-S5/handoff/asset-manifest.csv`, `channels/the-industrial-casebook/cases/CAL-S5/rights-ledger.csv`, `channels/the-industrial-casebook/cases/CAL-S5/rights-proof/2026-10-15-web-captures.md` (incl. §V-08), `channels/the-industrial-casebook/cases/CAL-S5/handoff/measurement-report-v1.md`, `production/remotion/src/calibration/Reels.tsx`, `production/tools/backup/backup-production.ps1`, `os/factory/README.md` (§4–§8), `.claude/skills/creative-qa/SKILL.md`, `.claude/skills/creative-qa/TEMPLATE.md`, `channels/the-industrial-casebook/canon/README.md`, `channels/the-industrial-casebook/canon/01-viewer-promise.md` … `08-rejected-decisions.md`, `channels/the-industrial-casebook/pipeline/README.md`, `channels/the-industrial-casebook/calibration/README.md`, `channels/the-industrial-casebook/calibration/01-case-intro-golden-master.md` … `05-production-plan-and-preview.md`, `production/pilots/2026-10-n2-pilot-test/P3-evidence-ledger.md`, `production/pilots/2026-10-n2-pilot-test/P3-production-handoff-prototype-v2.md` (§2 only) · skill: `creative-qa`

**Coverage scope:** Production Scene Plan v5 only (render-before stage for the v2 preview set). I judged the plan text, not the v1 renders, which I have not seen; Founder observations come only from `09-founder-review-v1.md`. CAL-S5 is a calibration case: P3's story and opening structure are out of scope. I verified every check item in the files themselves:
- plan v5 against v4, scene by scene;
- the manifest `scenes` column and the rights ledger `usage_locations`, for every SP;
- every new visual claim against the P3 evidence ledger and the rights-proof captures;
- the v1 audio code in `Reels.tsx`, to judge the diagnosis of the audio fault.

A PASS here would cover the plan only; render QA follows delivery report v2.

## Check-by-check findings
| # | Check | Finding |
|---|---|---|
| 1 | Plan answers each Founder observation without becoming doctrine | **Yes.** O-1 → Reel audio architecture. O-2 → one continuous investigation plane plus AR6. O-3 → SP-02 behaviour kept. O-4 → SP-05 spatial system around V-08. O-5 → SP-03/SP-07 line functions, hand-refined mattes (OG-12/OG-13), J40 kept as `CASE 00X`. O-6 → "Material world balance" (no dark panels; archive and paper dominate). O-7 → SP-15 AR6. O-8 → SP-09 last idea becomes the next object, no brackets; C1 unchanged. O-9 → S-1 events under narration priority. The plan states that the review is "calibration evidence for this case, not doctrine" and that canon is unchanged. The material balance is "a usage balance for this calibration, measured only as a DIAGNOSTIC". The acceptance criteria are scoped to this case's previews. No canon, rule register or Brand System change is implied (governance §1, §3). |
| 2 | Kept material truly unchanged | **SP-02:** the Document → Understanding behaviour is intact (verbatim phrase → open unscaled gap → question hold; the bracket flattens into the Case Line). Only the ground changes, from an ink panel to the page's own paper, and a cut is replaced by a camera continuation. That matches O-3/O-6 and is not a behaviour change. **VO cut list, L1–L3 and evidence audit:** verbatim v4. **SP-08 (C1):** verbatim v4, placement unchanged. **SP-10…SP-14 (AR1–AR5):** verbatim v4. **SP-06:** text verbatim v4, but it now contradicts the revised SP-05 (see Story progression). |
| 3 | Evidence integrity of new visual claims | **Mostly sound.** The SP-03 tag `NUCLEAR MERCHANT SHIP` is supported by C-30 ("first nuclear-powered merchant vessel"). The SP-05 barge's 129 × 36 ft proportion, own crane and lead-lined fuel pool come from C-42 (NPS; the ledger allows it for diagram accuracy, with no new VO). The relationship lines are spare core ↔ REACTOR CORE (the element's own name), spent-fuel pit ↔ FUEL ELEMENTS (own name + C-43) and barge fuel pool ↔ FUEL ELEMENTS (C-42); the pier, cranes and building get no functional lines, which is correct. The ship is an explicitly unscaled silhouette. The cutaway is linked to the ship, never placed inside the hull. `NOT A SITE PLAN` is kept and the exclusion zone is not drawn. V-08 is a verbatim crop from the source plate with the promotional caption removed; its printed labels and the source are confirmed by rights-proof §V-08 and ledger V-08. **Gaps:** layered "water / pier / building" planes with the gantry crane "on the pier plane", plus acceptance criterion B ("a viewer can say how the elements stand… to one another"), assert spatial positions that E-11 says GAO does not give. The SP-05 claim "a reactor it existed to service" is an inference. The SP-07 `TURBOJET` tag is a factual label but has no anchor recorded in the plan. |
| 4 | Anti-PowerPoint intent and acceptance criteria | Every revised scene has a scene test that names the new understanding (one plane instead of cards; a line that measures, separates, registers, classifies and connects; parts standing around a real engineering source; the last image redrawn into the next object). Criteria A–E are qualitative, bind the result regardless of tool, and answer O-2/O-4/O-5 directly. Criterion B's wording needs the evidence boundary (see Evidence clarity). |
| 5 | Audio architecture vs the v1 restart problem | **Diagnosis confirmed in `Reels.tsx`:** the `Reel` renderer pushes a separate `<Audio>` inside a `<Sequence>` for every segment (`startFrom = BED_OFFSET + bedPos`), so the decoder re-seeks at every scene boundary. The volume is a segment-local `bedShape`; the default `flat = fadeInOut(t, d, 0.8, 0.6)` fades the bed out over the last 0.6 s of each scene and back in over the first 0.8 s of the next, and `shapes.intro` adds a further swell. Even with the position continued, this produces an audible dip and re-entry at every cut, which is the "restarting / repeating" impression in O-1. **The v2 architecture removes both causes:** one PCM decode, one excerpt placed once, one global envelope, silences as dips, no edits to scene boundaries. The QA tests (null test with the envelope disabled to prove the samples are continuous; a discontinuity scan of the real stem at every boundary and silence edge) are the right pair. Two specification gaps remain: (a) v2-E breaks the one-bed rule; (b) the null test's reference point is ambiguous (see Audiovisual momentum). |
| 6 | CTA placement; NEXT CASE modular | C1 is unchanged (after SP-05's cost figure, no open question). SP-09: J40 remains a demo payload with `CASE 00X`; the incoming payload is a slot "filled at publish time with a real published case"; brackets, corner marks and framed placeholder boxes are explicitly removed; open space comes from where the object sits in the frame. |
| 7 | AR6 separated from the golden pair | SP-15 is its own SP with the `ANTI-REFERENCE · INTERNAL` tag throughout, the same VO-A+VO-B and the same M-01 excerpt as the revised SP-01+SP-02, and is never published. It is distinct from AR1, which is the obviously cheap slideshow. Its emptiness is clearly defined: nothing transforms or carries meaning to the next idea. |
| 8 | S-1 / M-01 preferred only; no canonizing | Every mention reads "preferred candidate, not GOLDEN". M-02…M-04 and S-2 keep their records, and OG-09 stays in the manifest. There is no Golden Lock. The scope keeps P3 structure and CTA copy as calibration material ("not locked"). |
| 9 | Asset / rights bindings | New rows are present and consistent: V-08 (manifest SP-05, READY, full hash = rights-proof; rights G3, CLEAR, PD) · OG-12 (SP-01;SP-03) · OG-13 (SP-07;SP-09) · SP-15 added to V-05, V-02, V-03, AI-01, M-01 and OG-11 in the manifest, and AR6 added to V-05, V-02, V-03, AI-01 and M-01 in the rights ledger · AI-03 manifest READY with full hash and BACKED_UP. Every SP's asset line is matched by the manifest. **Stale plan text:** SP-08 still lists AI-03 "TO_PRODUCE". The binding table's "Used in" omits SP-15 for V-05 and for V-02/V-03, and its footer still says "TO_PRODUCE … OG-01…OG-11, AI-03" (AI-03 is produced; OG-12/OG-13 are missing). |

## Areas
### Central question strength
- **Rating:** PASS
- **Reason:** Unchanged. "Where was that money going?" (SP-02) is specific, answerable from the ledger, raised after one assumption beat, answered in SP-04 → SP-05 and closed in SP-09 (TIC-06/07, TIC-09). It is judged only as the question the CASE INTRO carries.

### Narrative curiosity
- **Rating:** PASS
- **Reason:** The question chain is unchanged, and the revision strengthens how it is carried. In SP-03 the intro's CONNECT step visibly moves the line onto the first cost line, so the open question visibly continues through the intro (O-5). C1 stays after the third line is answered.

### Visual curiosity
- **Rating:** PASS
- **Reason:** The revision answers O-2/O-4 with ideas, not decoration:
  - archive, chart and report lie on one physical plane that the camera travels across;
  - the Case Line works as an instrument (inspect → isolate → register → classify → connect);
  - the engineering scene centres a real 1960 MARAD cutaway and connects parts to it by function;
  - E1 redraws the last image into the next object.

  Each makes the viewer ask "how will they show this?" rather than reading a list.

### Audiovisual momentum plan
- **Rating:** CONCERN
- **Reason:** The architecture correctly fixes the cause found in `Reels.tsx` (per-scene `<Audio>` re-instantiation plus per-scene fade-out/fade-in envelopes), and the mix priority narration → S-1 event → bed answers O-9. Three specification problems:
  1. **v2-E breaks rule 1.** The file holds AR6 and then the revised SP-01+SP-02 "with the same excerpt and offset on both sides". That places the same excerpt twice in one file and restarts it at the second half, which rule 1 forbids ("never restarted… no part of the excerpt is used twice"). The null test (a) would then fail or be skipped for this file. The pair needs an explicit, stated exception: for example, two halves separated by a slate where the bed is deliberately out, each half tested separately, or two files.
  2. **The null test's reference point is ambiguous.** "Residual at codec noise floor" against "the source excerpt" does not say where the test is done. A null against an MP3 source after AAC encoding of the deliverable will not reach a clean floor even with perfect continuity, and a loose pass threshold could hide a short splice. The test should be specified on the uncompressed bed stem (PCM at the mix sample rate, before the final AAC encode), against the same decode of M-01 resampled identically, with the residual bound stated.
  3. **SP-06's "real silence, room tone only"** conflicts with the architecture's "reserved silences are dips of the continuing bed". SP-06 is not fully re-rendered in v2 (v2-D shows only its start), so this does not affect the v2 previews, but the plan should say which rule governs SP-06 when it is next rendered.

### Story progression
- **Rating:** CONCERN
- **Reason:** SP-01 → SP-02 → SP-03 → SP-04 → SP-05 now form one unbroken spatial chain (print → chart → report → line → underline → shore line), which answers O-2/O-3. The handover from SP-05 to the unchanged SP-06 is broken:
  - Revised SP-05 ends with "the berth with the **ship silhouette**" and its Transition Logic says this "carries into SP-06".
  - Unchanged SP-06 begins from "the **component sheet** from SP-05" and "the **empty** berth outline sharpens into a dashed gap".
  - SP-09 depends on that empty berth before the marker "slides back" (C-32).

  As written, the ship is in the berth at the end of SP-05 and absent at the start of SP-06 without any move, and the "component sheet" no longer exists in v2 form. v2-D renders exactly this junction (SP-05 end → C1 → SP-06 start), so the Founder will see it. SP-08's "SP-05 component sheet keeps holding" has the same stale term. The plan must say how the silhouette leaves the berth, or whether SP-05 ends with it empty, and update the SP-06/SP-08 references to the layered system, without changing SP-06's or C1's behaviour.

### Evidence clarity
- **Rating:** CONCERN
- **Reason:** Every VO and on-screen claim carried over from v4 still maps to VERIFIED ledger rows (VO-A C-30/C-14/C-44/C-36·Q-06 · VO-B E-2/V-03, C-04/Q-01 · VO-C C-06, C-08–C-10 · VO-D C-31/E-11, C-10 · VO-E C-32 · SP-09 C-32, C-04/C-06 · L2 C-14 + C-11/Q-02). The new elements are well anchored (see check 3), and V-08 has rights proof and an evidence row. Remaining issues:
  1. **Unsupported spatial arrangement in SP-05 (E-11).** Two physically necessary relations are fine as schematic statements: the barge floats on water, and the pier meets the waterline. Placing the 75-TON GANTRY CRANE "on the pier plane", and ordering water / pier / building as depth planes, implies relative positions GAO does not give. Acceptance criterion B ("a viewer can say how the elements stand and relate to one another") asks the render to show exactly what the ledger cannot support, and it contradicts the plan's own "no site plan implied". Restate criterion B as functional relationships (what each part serves) plus only the physically necessary arrangements, and leave the gantry crane, the building and the pier neutral in position.
  2. **SP-05 claim line "whose reactor it existed to service"** is an inference beyond C-10/E-11 (a nuclear ship servicing facility) and C-32 (refuelling done there). The claim line should state those facts, not a purpose. The line is not on screen, but the claim line is the truth record.
  3. **SP-07 `TURBOJET` tag** is a factual on-screen label, while the SP's Claim / Evidence Anchor still say "none — framing beat". Record the anchor: rights-proof §V-90 ("Westinghouse's 11-stage J40 turbojet", NASA caption), as SP-03 now does for `NUCLEAR MERCHANT SHIP` (C-30).
  4. **Stale asset text** (no rights effect, but the plan is what Strong PC reads): SP-08's AI-03 says "TO_PRODUCE" while the manifest has it READY and hashed; the binding table omits SP-15 for V-05 and V-02/V-03; the footer's TO_PRODUCE list still names AI-03 and lacks OG-12/OG-13.

### Anti-PowerPoint
- **Rating:** PASS
- **Reason:** All revised golden scenes pass the scene test with ideas a few transitions could not approximate (continuous plane, working line, system around a real source plate, outline-to-object continuation). Tool choice follows the scene and the criteria bind the result regardless of tool (TIC-19). This answers the delivery report v1's tool change ("intent: preserved") that the Founder's O-4/O-5/O-6 contradicted. AR6 adds the missing "polished but empty" failure category without weakening AR1–AR5.

### CASE identity
- **Rating:** PASS
- **Reason:** The Case Line remains the single recognisable signature, now doing named work. The title is subordinate (a compact Plex Mono index plus a type tag sized as a label, with no title card, logo card or channel name card), which answers O-5 and keeps CASE LABEL from being enlarged into an intro (TIC-11, TIC-12). Atomic Teal is used for the single motif pass and the J40 demo keeps its own non-registered accent. Hand-refined mattes are required with stated edge criteria. The implementation route stays open until Golden Lock. S-1 is a preferred candidate, not GOLDEN.

### Payoff
- **Rating:** PASS
- **Reason:** SP-09 keeps the evidenced payoff: the return in August 1968 (C-32), the gap filled to about $1.9M of about $2M (C-04/C-06) and L2 (C-11/Q-02). The NEXT CASE move is now the story's own image: the berth-and-ship outline is redrawn into the next hero object, and the frame leaves natural space with no placeholder frames (O-8). The payload stays modular. Its dependency on an empty berth after SP-06 is covered by the Story progression fix.

## Verdict
- **Verdict:** REVISE
- **Accepted concerns:** none
- **Required changes:** (priority order; none changes the kept material's behaviour)
  1. **SP-05 / acceptance criterion B (evidence, E-11):** restate criterion B as functional relationships plus only physically necessary arrangements (barge on water, pier at the waterline). Remove "the gantry crane rises on the pier plane" and the implied water → pier → building depth order, or mark those planes explicitly as schematic layers with no positional meaning. Keep `NOT A SITE PLAN`.
  2. **SP-05 → SP-06 / SP-08 continuity:** state how the ship silhouette leaves the berth at the end of SP-05 (or end SP-05 with the berth empty), so that SP-06 opens on the empty berth it expects. Update SP-06's and SP-08's "component sheet" wording to the v2 layered system, without changing SP-06's or C1's behaviour. v2-D shows this junction.
  3. **v2-E audio:** resolve the conflict with rule 1. Either declare the pair file an explicit two-part exception (each half its own continuous excerpt at the same offset, separated by a bed-out slate, null-tested per half) or deliver the two sides as separate files.
  4. **Audio QA (a):** specify the null test on the uncompressed bed stem at the mix sample rate before the final encode, against an identically resampled decode of M-01, with the residual bound stated. Say which rule (dip vs real silence) governs SP-06's reserved silence when it is next rendered.
  5. **SP-05 claim line:** replace "whose reactor it existed to service" with the ledger facts: a nuclear ship servicing facility (C-10/E-11) where her refuelling was done (C-32).
  6. **SP-07 anchor:** record the evidence for the `TURBOJET` tag (rights-proof §V-90, NASA caption) in SP-07's Claim / Evidence Anchor.
  7. **Stale asset text:**
     - SP-08 AI-03 → READY (produced in v1, hashed).
     - Binding table: add SP-15 to V-05 and to V-02/V-03.
     - Footer: TO_PRODUCE list → OG-01…OG-13, with AI-03 removed.
