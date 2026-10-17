# VID-001 — Production Scene Plan (dry-run sample)

> author: COO main session (Stage 3 dry-run, 2026-10-14) · date: 2026-10-14 · status: DRAFT · skill: `production-scene-plan` · input: `03-beat-sheet.md` (no script in dry-run) · coverage: 5 representative beats, not the full video

### SP-01 — The ship that worked
- **Beat:** B-01
- **Story Function:** BREAK ASSUMPTION, NEW CURIOSITY
- **Claim:** The ship operated: ~90,000 miles / 55 ports (demonstration), 19 voyages in the first three commercial years; operators called it "the most reliable ship we have operating".
- **Evidence Anchor:** C-14, Q-06 (NPS attribution)
- **Presentation Visual:** The ship itself as a living hero object: separated from its 1962 background and then carried out of the photograph onto a moving route map where its voyages accumulate, so "it worked" is shown as distance travelled rather than stated.
- **Visual Idea:** Open on the real 1962 colour photograph (V-05) at full frame in its natural colour; the hull is isolated into its own layer and gains a slight depth separation; as the narration says "and she worked", the isolated silhouette lifts off the photo and becomes a small token on a dark engineering map; Atlantic voyage arcs draw themselves (Mediterranean, Northern Europe, Far East) while a counter only shows the GAO voyage count; a second real port photograph (V-19, Rotterdam 1964) appears where one arc lands, tying the abstract route to a real arrival.
- **Motion / Spatial Behaviour:** transformation (photo object → map token) and progression (routes accumulate); the camera holds still on the photo first so the change is readable.
- **Transition Logic:** Object Carry — the ship silhouette is the bridge from archive world to engineering world; the last arc's endpoint becomes the anchor point for the next scene's document.
- **Sound Role:** Narration leads; a low, restrained music bed; a short silence on the operators' quote so it lands.
- **UI Role:** label only — small source mark "AEC / NATIONAL ARCHIVES" on the photo and "NPS" on the quote; CASE LABEL not here.
- **Rights / Asset Readiness:** V-05 public domain (NARA NAID 542141, "Use: Unrestricted", evidence ledger §C) — READY; V-19 CC0 (Nationaal Archief/Anefo) — READY; route data from C-44 (own graphic) — TO PRODUCE; rights-ledger rows to be added before production (DF-6).
- **Anti-PowerPoint:** A slide would show the photo, zoom slowly and put "19 voyages" as text; here the photo object physically becomes the map and the voyages are seen happening, so the image itself proves the claim.
- **Tool:** Photoshop subject isolation + After Effects for the photo-to-map object carry (bespoke, one-off) — the route arcs are data-driven and could be a Remotion map primitive; no 3D needed because flat continuity is the idea.

### SP-02 — The audit's number (document beat as a scene)
- **Beat:** B-02
- **Story Function:** NEW CURIOSITY, BRING EVIDENCE
- **Claim:** In 1970 GAO found it cost about $2 million a year more than the average operating subsidy for comparable conventional ships on the same route.
- **Evidence Anchor:** C-04, Q-01, V-02, V-03
- **Presentation Visual:** The audit treated as a physical case file: the report's cover is opened, the camera travels into the exact sentence, and the "$2 million" phrase is lifted out of the page and placed on a simple two-column comparison — conventional ship subsidy versus Savannah — so the viewer sees what "more" is measured against.
- **Visual Idea:** The map token from SP-01 slides under the 1970 report cover (V-03, real page, warm paper world); the cover opens with real page depth; the camera moves down to the summary sentence on page 1 (V-02) and only that sentence sharpens while the rest dims; the phrase "about $2 million more a year" detaches as an Evidence Pull and settles between two simple bars labelled with the GAO comparison base; the bars hold while the narration asks the central question, then the "$2 million" gap glows briefly and stays as an open question.
- **Motion / Spatial Behaviour:** reveal (the sentence emerges from the page) and transformation (quote → comparison); camera moves only to reach the sentence, then holds.
- **Transition Logic:** Previous scene's map token becomes the object resting on the file; this scene ends on the unexplained gap, which becomes the starting shape of SP-03.
- **Sound Role:** Music drops out when the sentence is lifted; the central question is asked over silence.
- **UI Role:** highlight + source clarity — evidence label "EVIDENCE 01 · GAO B-136209 · 1970" tied to ledger rows C-04/Q-01; nothing else.
- **Rights / Asset Readiness:** V-02, V-03 public domain (U.S. government report, evidence ledger §C) — READY (page render via `production/tools/pdf/pdf-to-png.ps1`); comparison graphic own — TO PRODUCE.
- **Anti-PowerPoint:** The document is not shown "on screen and done": the scene stages the act of finding the number and turns it into a comparison the viewer can read, which a slide transition cannot do.
- **Tool:** After Effects for the file-opening and Evidence Pull (bespoke); the comparison bars can be a Remotion data primitive; exact page pixels from the PDF render keep the quote verbatim.

### SP-03 — Cost lines become infrastructure (bespoke animation)
- **Beat:** B-04, B-08
- **Story Function:** BRING EVIDENCE, SHOW SCALE, EXPLAIN SYSTEM
- **Claim:** About $1.9M of the extra came from three nuclear items; the largest, the Galveston servicing facility, cost about $1.16M a year (barge, 75-ton crane, spent fuel pool, spare core, exclusion zone).
- **Evidence Anchor:** C-06, C-10, C-31, C-42, V-01, V-13
- **Presentation Visual:** The three cost lines on the real GAO page are isolated as the evidence anchor, then each number unfolds into the physical things it paid for, so money becomes visible infrastructure gathered around one small ship.
- **Visual Idea:** Start on the real summary page (V-01) with the three consecutive lines highlighted in amber; the third line (servicing facility) lifts off the page and its figure turns into an outline drawing that builds piece by piece only from the ledger's components — a service barge, a gantry crane, a fuel pool, a spare core, a dashed exclusion boundary — around a single ship silhouette at the quay; the training and shore-staff lines become small human-scale icons that join the scene (crew, shore team); the final frame shows a large support system around one ship, held long enough to be read.
- **Motion / Spatial Behaviour:** transformation (number → objects) and scale (system grows around one ship); mechanism is not animated here — only composition and size relation.
- **Transition Logic:** The amber highlight from the page becomes the outline line that draws the infrastructure; the finished composition is reused, empty, in SP-04.
- **Sound Role:** A soft mechanical texture as each piece appears (SFX only if it clarifies), no dramatic stinger; narration names each item once.
- **UI Role:** label — small component labels drawn from C-31/C-42 wording; one ILLUSTRATION tag because the layout is a reconstruction.
- **Rights / Asset Readiness:** V-01, V-13 public domain (GAO) — READY; infrastructure outline is our own reconstruction graphic — TO PRODUCE; layout not invented beyond ledger components (no site plan exists in the evidence).
- **Anti-PowerPoint:** A slide would list the three costs as bullets next to a photo; here the line on the page physically becomes the thing it paid for, so the viewer understands scale without reading a list.
- **Tool:** After Effects (bespoke line-draw build, one-off) with shapes prepared in Illustrator; Blender is not justified because flat engineering drawing tells the story better and cheaper.

### SP-04 — Two years away (AI decision by scene need, not last resort)
- **Beat:** B-09
- **Story Function:** BREAK ASSUMPTION, HUMAN DIMENSION
- **Claim:** The ship did not return to the facility for two years (until August 1968); the 1967 and 1968 annual inspections were done in New York and facility staff travelled there.
- **Evidence Anchor:** C-32
- **Presentation Visual:** The empty Galveston facility, waiting: the same infrastructure from SP-03 now without the ship, while a calendar of absence runs and a thin travel line carries the facility's staff north to New York.
- **Visual Idea:** Cut to an illustrative wide establishing view of the facility at the water (stylised, clearly not a photograph) with the berth empty; time advances through two years in a restrained calendar strip at the edge; a dotted line leaves the facility and travels up the coast map to New York where a small inspection icon appears beside the ship; then the line returns to the still-empty berth and the scene holds in silence.
- **Motion / Spatial Behaviour:** progression (time passes) and spatial (Galveston → New York); the illustration itself stays still — only time and travel move.
- **Transition Logic:** Reuses SP-03's composition with the ship removed, so absence is felt by contrast; the travel line becomes the arrow that starts SP-05's mechanism.
- **Sound Role:** Silence is the main sound tool here; light ambience of water at most.
- **UI Role:** guide — calendar strip and route label; ILLUSTRATION tag on the establishing image.
- **Rights / Asset Readiness:** AI-01 (illustrative establishing view of a servicing facility built only from C-31/C-42 components; ai-generated-own, prompt recorded) — TO PRODUCE (Founder GUIDED ACTION in ChatGPT with the TOOL-LIBRARY prompt); coastline map Natural Earth V-28/V-29 public domain — READY.
- **Anti-PowerPoint:** A slide would state "two years without a visit" over a dock photo we do not have; here the reused infrastructure without its ship makes the waiting visible and the travel line shows the cost of the ship being elsewhere.
- **Tool:** AI illustration chosen by TIC-18 criteria — scene need (no real photo of the facility exists), accuracy need (only ledger components, labelled ILLUSTRATION), rights (own generation), disclosure (non-photorealistic, labelled), production value (an atmospheric wide shot the reconstruction graphic cannot give); animation of time/travel in After Effects or a Remotion map primitive.

### SP-05 — One ship carrying a system
- **Beat:** B-10, B-11
- **Story Function:** EXPLAIN SYSTEM, CONNECT IDEAS, PAYOFF
- **Claim:** GAO: a "one ship system" — as long as one vessel must absorb the full cost, these costs keep operation expensive; staff and facility could serve several nuclear ships at lower cost per ship.
- **Evidence Anchor:** C-11, C-12, C-33, Q-02, Q-03, V-12
- **Presentation Visual:** The real "one ship system" sentence on page 12 as the anchor, then a load mechanism: the three costs sit on one ship and visibly weigh it down; ghost outlines of "several" ships appear and the same load spreads across them, showing why one ship carrying everything was the problem — without ever giving a fleet number.
- **Visual Idea:** Evidence Pull of "one ship system" from V-12 in its real typeface; the three cost blocks from SP-03 stack onto a single ship silhouette, which sinks slightly lower in the water line; unlabelled, dashed ghost ships fade in alongside (count intentionally vague, no numeral) and the blocks slide to be shared, the waterline of the real ship rising back; the ghosts fade out because they never came, leaving the single ship carrying everything again as the narration answers the central question.
- **Motion / Spatial Behaviour:** mechanism (load sharing) and transformation (single load → shared → single again); the return to one ship is the payoff beat.
- **Transition Logic:** The travel arrow from SP-04 points into the stacked load; the final single-ship image dissolves into the present-day museum-ship photograph for the closing (deliberate punctuation).
- **Sound Role:** Music returns for the explanation and resolves on the answer; a short silence before the final line.
- **UI Role:** compare — "1 ship" vs "several" (word, not number, per D-018); evidence label for V-12.
- **Rights / Asset Readiness:** V-12 public domain (GAO) — READY; load-mechanism graphic own — TO PRODUCE; closing museum photo V-09 CC0 — READY (rights-ledger row pending, DF-6).
- **Anti-PowerPoint:** A slide would print the quote and a diagram side by side; here the quote becomes a physical load the viewer watches being shared and then not shared, so the mechanism is understood, not read.
- **Tool:** After Effects or Remotion for the load-sharing animation (both fit; Remotion if the blocks reuse SP-03 data, After Effects if the waterline motion needs hand-tuned easing).

## Scene progression
Real ship (proof it worked) → real audit (the paradox) → cost lines become infrastructure (scale) → infrastructure without its ship (waiting) → one ship carrying the system (answer). Each scene starts from the previous scene's visual result, so the investigation moves forward visually as well as verbally.

## Diagnostics (DIAGNOSTIC)
No scene is a literal "show what is said" image; document beats (SP-02, SP-05) carry evidence and are transformed; archive is kept natural; AI is used once by scene need and labelled; risk: four of five sample scenes use After Effects — fine for a dry run, watch for one-tool collapse in the full plan.

## Asset status & Founder actions
READY: V-05, V-19, V-02, V-03, V-01, V-13, V-12, V-28/V-29, V-09. TO PRODUCE: own graphics (route, comparison, infrastructure, load mechanism), AI-01. Before production (Stage 4): rights-ledger rows for all used V-IDs (DF-6). Founder action only when production opens: AI-01 via ChatGPT (GUIDED ACTION with ready prompt) and VO credits (FOUNDER DECISION).
