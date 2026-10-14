# VID-001 — Production Scene Plan v2 (dry-run)

> author: COO main session (Stage 3 dry-run, 2026-10-14) · date: 2026-10-14 · status: DRAFT · skill: `production-scene-plan` · input: `03-beat-sheet-v2.md` (no script in dry-run) · supersedes: `05-scene-plan-sample.md` · responds to: `06-creative-qa-v1.md` · coverage: all 11 beats, beat order unchanged (adjacent beats only are combined)

Brand use (whole plan): archive in natural colour; documents in the warm paper world; engineering lines in `steel`; **amber only on the one active evidence line or key number per frame**; CASE 001 accent (Atomic Teal) reserved for the hero ship silhouette (SP-01, SP-09, SP-10). Sound arc: narration-led with a restrained bed that develops through the investigation; **silence is reserved for two turning points** — the central question (SP-02) and the empty berth (SP-08).

### SP-01 — The ship that worked
- **Beat:** B-01
- **Story Function:** BREAK ASSUMPTION, NEW CURIOSITY
- **Claim:** Demonstration phase ~90,000 miles and 55 ports (GAO); first three commercial years 19 voyages (10 Mediterranean, 7 Northern Europe, 2 Far East); operators: "the most reliable ship we have operating" (NPS).
- **Evidence Anchor:** C-14, C-44, Q-06
- **Presentation Visual:** The ship as a living hero object: the real 1962 photograph, then the same hull lifted out as a silhouette that carries the viewer from the demonstration years into a map where the commercial years appear as regions filling with voyage counts.
- **Visual Idea:** Open on the 1962 colour photograph (V-05), natural colour, held still; a 1964 demonstration-phase arrival in Rotterdam (V-19) follows with its own date caption, clearly the demonstration years; on "and she worked" the hull from V-05 is isolated, its outline traced once in the case accent, and it lifts onto a dark engineering map of the Atlantic where three destination regions (Mediterranean, Northern Europe, Far East) light up in turn with their GAO counts 10, 7, 2 — no route lines, only regions — and a small counter settles on 19 voyages.
- **Motion / Spatial Behaviour:** transformation (photo object → map token) and progression (regions fill in sequence); the camera holds on each photograph first so the change is readable.
- **Transition Logic:** Object Carry — the silhouette is the bridge from archive to engineering; at the end the token slides off-frame toward the paper world of SP-02.
- **Sound Role:** Narration leads over a low, restrained bed; the operators' quote is spoken over the bed (no silence here — silence is saved for SP-02).
- **UI Role:** label — source marks "AEC / NATIONAL ARCHIVES" (V-05), "ROTTERDAM · 1964" (V-19), "GAO · 1970" on the counts; "NPS" on the quote.
- **Rights / Asset Readiness:** V-05 public domain (NARA NAID 542141, "Use: Unrestricted") — READY; V-19 CC0 (Nationaal Archief/Anefo) — READY; region map from Natural Earth V-28/V-29 public domain — READY; rights-ledger rows to be added before production (DF-6).
- **Anti-PowerPoint:** A slide would zoom slowly into a photo and print "19 voyages"; here the photographed object itself becomes the map marker and the regions fill as it "travels", so the claim is seen rather than read, and the eras are never mixed.
- **Tool:** Photoshop subject isolation + After Effects for the object carry (one-off); the region fill is data-driven and fits a Remotion map primitive; no 3D because flat continuity is the idea.

### SP-02 — The audit's number
- **Beat:** B-02
- **Story Function:** NEW CURIOSITY, BRING EVIDENCE
- **Claim:** In 1970 GAO found it cost about $2 million a year more than the average operating subsidy paid for comparable conventional ships on the same route.
- **Evidence Anchor:** C-04, Q-01, V-02, V-03
- **Presentation Visual:** The audit staged as the act of finding: the 1970 report opens like a case file, the camera reaches the exact sentence, and the words "about $2 million more a year" are lifted out and left hanging as an unexplained gap between two labels — "average subsidy, comparable conventional ships" and "Savannah" — with no scaled bars.
- **Visual Idea:** The token from SP-01 lands on the real 1970 cover (V-03); the cover opens with paper depth; the camera travels to the summary sentence (V-02), only that sentence sharpens while the rest dims; the phrase detaches (Evidence Pull, verbatim) and settles between the two labels as a bracket marked "≈ $2 million a year more" — a gap, not a measurement, because the ledger gives no subsidy figure to scale; the bracket stays open on screen as the narrator asks the central question.
- **Motion / Spatial Behaviour:** reveal (the sentence emerges from the page) and transformation (quote → comparison gap); the camera moves only to reach the sentence, then holds.
- **Transition Logic:** The open bracket becomes the shape the next scene fills with the report's purpose; the paper world continues into SP-03.
- **Sound Role:** The bed drops out as the phrase is lifted; the central question is asked over silence (first of the two reserved silences).
- **UI Role:** highlight + source clarity — amber only on the lifted phrase; evidence label "EVIDENCE 01 · GAO B-136209 · 1970" mapped to C-04/Q-01.
- **Rights / Asset Readiness:** V-02, V-03 public domain (U.S. government report) — READY (page render via `production/tools/pdf/pdf-to-png.ps1`); comparison bracket own graphic — TO PRODUCE.
- **Anti-PowerPoint:** The document is not "shown and done": the scene stages finding the number and turns it into an open gap the viewer wants closed — a slide could display the sentence but not make the gap the question.
- **Tool:** After Effects for the file-opening and Evidence Pull (bespoke); exact page pixels from the PDF render keep the quote verbatim; no data tool needed because nothing is scaled.

### SP-03 — Why this audit existed
- **Beat:** B-03
- **Story Function:** NEW CURIOSITY, HUMAN DIMENSION
- **Claim:** The report informed Congress's choice: keep operating the ship, or lay it up as proposed in the fiscal 1971 budget.
- **Evidence Anchor:** C-23, V-14, V-03
- **Presentation Visual:** The case file acquires its stakes: on the summary's third page the "lay up" sentence surfaces, and the open gap from SP-02 now sits above a two-way fork — operate / lay up — so the viewer understands what this number was for.
- **Visual Idea:** Pages turn forward from the cover to the summary page carrying the fiscal 1971 lay-up proposal (V-14); that single sentence is isolated and the rest falls away; the bracket from SP-02 drops onto a thin fork drawn in steel with two plain words, "operate" and "lay up"; the CASE LABEL "CASE 001 · NS SAVANNAH" appears small at the frame edge as the file's tab, and the scene holds just long enough for the fork to register before the investigation starts.
- **Motion / Spatial Behaviour:** reveal (the decision sentence surfaces) and spatial (gap placed above the two choices); otherwise a still composition.
- **Transition Logic:** The fork's centre point becomes the anchor where the next page (V-01) slides in.
- **Sound Role:** Bed returns quietly under narration; no stinger on the CASE LABEL.
- **UI Role:** label — CASE LABEL only (small, edge, per `video-ui-spec-v1.md`; TIC-12); the CASE INTRO slot stays empty before Golden Master calibration (TIC-11).
- **Rights / Asset Readiness:** V-14, V-03 public domain (GAO) — READY; fork graphic own — TO PRODUCE.
- **Anti-PowerPoint:** A slide would add a bullet "the report informed Congress"; here the report's own sentence turns the abstract gap into a decision with two outcomes, which is the reason to keep watching.
- **Tool:** After Effects (page turn and isolation in the same file-opening system as SP-02).

### SP-04 — Three lines on a page (and what they leave out)
- **Beat:** B-04, B-05
- **Story Function:** BRING EVIDENCE, SET UP PAYOFF, NEW INFORMATION
- **Claim:** About $1.9M of the roughly $2M came from crew training, shore staff and a servicing facility; these figures exclude nuclear fuel, which was provided to the operator free.
- **Evidence Anchor:** C-06, C-16, C-38, V-01
- **Presentation Visual:** The summary page with its three consecutive cost lines bracketed in thin steel annotation, the gap from SP-02 visibly filling with three labelled blocks, and one honest footnote line stating that fuel sits outside these figures.
- **Visual Idea:** V-01 slides in under the fork's anchor; three thin brackets mark the three lines one after another, amber moving with the line being spoken so only one is ever highlighted; each line casts a block into the open gap above, filling most of it, with the remaining sliver left visibly unlabelled; a footnote-style line in the paper world reads "fuel: not included in these figures" with its source mark, and the blocks hold so the viewer sees the investigation narrowed to three things.
- **Motion / Spatial Behaviour:** transformation (page lines → blocks filling the gap) and progression (one line at a time).
- **Transition Logic:** The first block (training) detaches and becomes the starting object of SP-05.
- **Sound Role:** Narration names each item once over the bed; a soft paper texture as each bracket draws (SFX only if it clarifies).
- **UI Role:** highlight (one amber line at a time) + source clarity ("GAO · Summary p.2"; fuel note "GAO · Summary p.1 / NPS").
- **Rights / Asset Readiness:** V-01 public domain (GAO) — READY; block graphics own — TO PRODUCE.
- **Anti-PowerPoint:** A slide would bullet three costs; here the page itself fills the question's gap, and what is excluded is shown as part of the measurement rather than hidden.
- **Tool:** After Effects for the page-to-block transformation; blocks could be a reusable Remotion primitive since SP-09 reuses them.

### SP-05 — People who had to learn the reactor
- **Beat:** B-06
- **Story Function:** HUMAN DIMENSION, NEW INFORMATION, NEW CURIOSITY
- **Claim:** Training cost almost $300,000 a year; 27 of 67 crew needed nuclear training; reactor operators spent four to five months at the academy and four to five months aboard.
- **Evidence Anchor:** C-08, C-29, V-15
- **Presentation Visual:** The crew as people on a ship rather than an icon: 67 small upright figures arranged along the ship's own deck outline, 27 of them stepping forward, and two of those stretching into long training timelines that show months away from ordinary work.
- **Visual Idea:** The training block opens into the training page (V-15) where "27" and "67" are pulled verbatim; the numbers become 67 plain standing figures (no faces, no uniforms invented) placed along the ship's deck outline; 27 step forward into a second row; two of them extend into horizontal timelines labelled academy and aboard, growing month by month; the narrator states the open question — why does one ship need all this around it — while the composition holds.
- **Motion / Spatial Behaviour:** scale (67 people on one ship) and progression (training time stretches); figures move once, then hold.
- **Transition Logic:** The timelines run to the right edge and become the coastline of the shore map in SP-06.
- **Sound Role:** Narration with the bed slightly lifted; no silence.
- **UI Role:** compare — "27 / 67" labels; source mark "GAO p.13".
- **Rights / Asset Readiness:** V-15 public domain (GAO) — READY; figure graphics own (non-photorealistic, no invented details) — TO PRODUCE.
- **Anti-PowerPoint:** A slide would show the training page and highlight "27 of 67"; here the number becomes people on the ship and time away, which carries the human weight the line item hides.
- **Tool:** After Effects (bespoke figures and timelines); Remotion would also fit for the counted figures — chosen by who builds SP-06, no 3D needed.

### SP-06 — The shore team
- **Beat:** B-07
- **Story Function:** HUMAN DIMENSION, EXPLAIN SYSTEM
- **Claim:** About ten specially trained shore staff, about $409,000 a year; port surveys, entry and departure arrangements and annual inspections required more work and planning than a conventional ship.
- **Evidence Anchor:** C-09, C-30, V-16
- **Presentation Visual:** The ship's cost moving onto land: a small shore team of about ten represented as points on a coastline map, each task — surveys, arrangements, inspections — appearing as preparation that must happen before the ship can enter a port, with no arrows implying an order the source does not give.
- **Visual Idea:** The timelines from SP-05 settle into the U.S. Atlantic coastline (Natural Earth); about ten small points gather at one shore office; three task labels taken from the page (V-16) — port surveys, entry and departure arrangements, annual inspections — appear one by one as small dossiers stacking beside the office, unordered; a single destination port outline appears ahead of the ship token, waiting on those dossiers, before the ship is allowed in.
- **Motion / Spatial Behaviour:** spatial (cost shown on land, not on the ship) and progression (dossiers accumulate); no flow arrows (E-13).
- **Transition Logic:** The stack of dossiers becomes the first object of the Galveston facility scene, setting the place where support lives.
- **Sound Role:** Narration; light office/paper ambience at most.
- **UI Role:** label — task labels in the source's wording; source mark "GAO p.14".
- **Rights / Asset Readiness:** V-16 public domain (GAO) — READY; V-28/V-29 Natural Earth public domain — READY; own graphics — TO PRODUCE.
- **Anti-PowerPoint:** A slide would list three tasks; here the tasks are seen piling up between the ship and a port, so the viewer understands why a team on land was part of the ship's cost.
- **Tool:** Remotion map primitive for the coastline and points (data-driven), After Effects for the dossier stacking.

### SP-07 — A facility in Galveston
- **Beat:** B-08
- **Story Function:** SHOW SCALE, EXPLAIN SYSTEM
- **Claim:** The Galveston servicing facility cost about $1,162,000 a year: barge Atomic Servant, 75-ton gantry crane, maintenance building (bridge crane, water-filled spent-fuel pit, decontamination room), ~25-acre exclusion zone; Maritime supplied the spare core.
- **Evidence Anchor:** C-10, C-31, C-42, V-13
- **Presentation Visual:** The largest cost line turning into the things it paid for: a schematic, explicitly not-to-position drawing in which each listed component builds in turn around one ship silhouette, ending with a dashed exclusion boundary that dwarfs everything inside it.
- **Visual Idea:** The facility line on page V-13 is highlighted in amber and its figure lifts off; in steel line-work the components draw themselves one at a time as separate labelled objects — the barge, the gantry crane, the maintenance building opening to show the bridge crane, spent-fuel pit and decontamination room inside it — arranged as a component sheet, not a site plan; a single ship silhouette sits beside them for scale; a dashed boundary labelled "exclusion zone ~25 acres" expands around the set; a small note reads "spare core supplied by Maritime".
- **Motion / Spatial Behaviour:** transformation (number → objects) and scale (system grows around one ship); mechanism is not animated here.
- **Transition Logic:** The completed component sheet is reused in SP-08 with the ship silhouette removed.
- **Sound Role:** Narration names components once; restrained mechanical texture only where it helps identify an object.
- **UI Role:** label — component names from the page; "ILLUSTRATION · not to position" tag; source mark "GAO p.15".
- **Rights / Asset Readiness:** V-13 public domain (GAO) — READY; component drawing own — TO PRODUCE (only ledger components, no layout invented, E-11).
- **Anti-PowerPoint:** A slide would bullet the equipment next to a ship photo; here the line on the page physically becomes the equipment around one ship, so scale is understood without reading a list.
- **Tool:** After Effects line-draw build with Illustrator shapes; Blender not justified — a flat engineering drawing is clearer and cheaper.

### SP-08 — Two years away
- **Beat:** B-09
- **Story Function:** BREAK ASSUMPTION, HUMAN DIMENSION
- **Claim:** The ship did not return to the facility for two years (until August 1968); the 1967 and 1968 annual inspections were held in New York and facility staff travelled there.
- **Evidence Anchor:** C-32
- **Presentation Visual:** The same component sheet with the ship removed — an empty space where the ship should be — while two inspection years pass and a dotted line carries the facility's staff north to the ship in New York and back.
- **Visual Idea:** SP-07's drawing returns exactly as before but the ship silhouette is gone, leaving its outline as a faint dashed gap; a restrained calendar strip at the edge advances through 1967 and 1968; a dotted line leaves the facility on a coastline inset and reaches New York, where the ship token sits beside a small inspection mark, then returns; the camera holds on the empty space in silence.
- **Motion / Spatial Behaviour:** progression (time passes) and spatial (Galveston → New York); the drawing itself does not move.
- **Transition Logic:** The empty dashed outline becomes the place the ship returns to in SP-09, where the load is placed on it.
- **Sound Role:** Silence (second and last reserved silence), at most faint water ambience.
- **UI Role:** guide — calendar strip, "NEW YORK" label; source mark "GAO pp.15–16".
- **Rights / Asset Readiness:** own drawing (from SP-07) — TO PRODUCE; V-28/V-29 public domain — READY.
- **Anti-PowerPoint:** A slide would state "two years without a visit" on an image we do not have; here the absence is shown by subtraction from a scene the viewer has just learned, which makes the waiting felt.
- **Tool:** After Effects. AI illustration was considered by the five TIC-18 criteria and not chosen here: the scene need is real, but the accuracy need fails — the evidence gives no site layout (E-11), and the subtraction idea is stronger than a new image.

### SP-09 — A one-ship system
- **Beat:** B-10
- **Story Function:** EXPLAIN SYSTEM, CONNECT IDEAS, SET UP PAYOFF
- **Claim:** GAO: a "one ship system" — the entire cost had to be borne by the Savannah; while one vessel absorbs it, operation stays expensive; shore staff and facility could serve several nuclear ships at lower cost per ship; training is not shared.
- **Evidence Anchor:** C-11, C-12, C-33, Q-02, Q-03, V-12
- **Presentation Visual:** The real "one ship system" sentence as the anchor, then a load mechanism: the three blocks stack on the single ship and visibly lower its waterline; dashed outlines of other possible ships appear only as the auditors' conditional "could serve several", and only the shore-staff and facility blocks spread across them while the training block stays with the ship.
- **Visual Idea:** Evidence Pull of "one ship system" from page V-12 in its original type; the ship silhouette (case accent) returns to the dashed gap from SP-08 and the three blocks from SP-04 stack on it, its waterline sinking; a caption "could serve several" appears and unlabelled dashed ship outlines fade in beside it (no number); the shore-staff and facility blocks slide to be shared and the real ship's waterline rises, while the training block stays aboard; the dashed outlines remain clearly marked as a hypothetical while the narrator reads the GAO sentence about one vessel absorbing the full cost.
- **Motion / Spatial Behaviour:** mechanism (load sharing under GAO's condition) and transformation (single load → shareable parts).
- **Transition Logic:** The narration returns to the actual record; the dashed outlines dim back to the hypothetical caption, leaving the single ship with the full load — this image opens SP-10.
- **Sound Role:** The bed builds gently through the explanation without a stinger; it resolves at the start of SP-10.
- **UI Role:** compare — "one ship system" (verbatim) vs "could serve several" (verbatim, no number, D-018); evidence label for V-12.
- **Rights / Asset Readiness:** V-12 public domain (GAO) — READY; load-mechanism graphic own — TO PRODUCE.
- **Anti-PowerPoint:** A slide would place the quote beside a diagram; here the quote becomes a physical load the viewer watches being shared only where the evidence allows, so the mechanism is understood, not read.
- **Tool:** Remotion (reusing the SP-04 block data) or After Effects if the waterline motion needs hand-tuned easing; either fits, no 3D.

### SP-10 — The answer, and the decision
- **Beat:** B-11
- **Story Function:** PAYOFF
- **Claim:** Most of the extra (~$1.9M of ~$2M) came from nuclear support built around a single ship, not from the ship failing to work (audit points to it — inference); the report was written for Congress's operate-or-lay-up choice; the ship was deactivated at the end of 1971 (NPS).
- **Evidence Anchor:** C-06, C-11, C-27, C-23, C-24
- **Presentation Visual:** The opening gap closes: the bracket from SP-02 returns and fills with the three blocks, the fork from SP-03 reappears with its two choices, and the film ends on a dated museum photograph of the ship rather than a claim about the present.
- **Visual Idea:** From the single loaded ship, the camera pulls back into the paper world: SP-02's open bracket is now filled ("about $1.9M of ~$2M"), answering the question visually; the operate / lay-up fork from SP-03 returns without choosing for the viewer while the narrator says the decision lay beyond this report; a final cut to the museum-period photograph at Patriots Point, captioned "1990", and the CASE LABEL closes the file at the frame edge.
- **Motion / Spatial Behaviour:** transformation (open gap → filled answer) and hold on the final photograph.
- **Transition Logic:** Every earlier object returns (bracket, blocks, fork) so the end visibly assembles the parts; the cut to the photograph is deliberate punctuation.
- **Sound Role:** The bed resolves on the answer; the final line is spoken over a quiet tail, not silence (silence was used twice already).
- **UI Role:** label — caption "PATRIOTS POINT · 1990", source "NPS"; CASE LABEL small.
- **Rights / Asset Readiness:** V-26 public domain (NPS, 1990) — READY; own graphics reused — TO PRODUCE; rights-ledger row pending (DF-6).
- **Anti-PowerPoint:** A slide would end on a summary bullet; here the viewer sees the opening gap filled by the objects of the investigation, which is the "so that's what it was" moment rather than a recap.
- **Tool:** After Effects for the recomposition of earlier elements; the photograph is used as archive with natural colour.

## Scene progression
Real ship (it worked) → the audit's open gap (question) → the decision it was for (stakes) → three lines fill the gap (what was measured, and what was not) → people trained (human scale) → work on land (system) → the facility as objects (scale) → the facility without its ship (waiting) → the load on one ship, shareable only in part (mechanism) → the gap closed and the decision left with the record (payoff). Each scene starts from the previous scene's visual result and the beat order is unchanged.

## Diagnostics (DIAGNOSTIC)
No literal "show what is said" scenes; documents always carry an Evidence Pull and a transformation; archive kept natural with dates; AI considered once and rejected for an evidence reason (not as last resort); tool mix: After Effects in most scenes, Remotion for map/blocks — watch for one-tool look in the full plan; silence used twice by design.

## Asset status & Founder actions
READY: V-05, V-19, V-02, V-03, V-14, V-01, V-15, V-16, V-13, V-12, V-26, V-28/V-29. TO PRODUCE: own graphics (map regions, bracket, fork, blocks, figures, dossiers, component sheet, load mechanism). Before production (Stage 4): rights-ledger rows for every used V-ID (DF-6). Founder actions only when production opens: VO credits (FOUNDER DECISION). No AI asset needed in this plan.
