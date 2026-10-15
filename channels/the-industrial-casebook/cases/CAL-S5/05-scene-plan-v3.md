# CAL-S5 — Production Scene Plan v3 (Stage 5 calibration)

> author: COO main session (Stage 5 production prep, 2026-10-15) · date: 2026-10-15 · status: DRAFT (independent creative QA v3 → ACTIVE) · supersedes: `05-scene-plan-v2.md` · responds to: `handoff/measurement-report-v1.md` (Strong PC measurement, 2026-10-15) and the two accepted concerns of `06-creative-qa-v2.md` · **v3 changes only production readiness, asset binding, the music comparison plan and render/output intent — the creative design of v2 is unchanged** · skill: `production-scene-plan` · decision: D-048 (render + ≤150 ElevenLabs credits; no new payment)
> inputs: `channels/the-industrial-casebook/calibration/` (Stage 5 design final: README, 01–05) · evidence: `production/pilots/2026-10-n2-pilot-test/P3-evidence-ledger.md` · rights: `channels/the-industrial-casebook/cases/CAL-S5/rights-ledger.csv` · assets: `channels/the-industrial-casebook/cases/CAL-S5/handoff/asset-manifest.csv`
> **Scope (binding for this plan):** CAL-S5 is a calibration case, not a video. P3 VO, assets and evidence are **calibration material only**; Golden Lock judges motion grammar, visual transformation quality, cinematography, sound behaviour, the CASE INTRO skeleton, CTA behaviour and NEXT CASE behaviour — **not** P3's story or opening structure. Reel order is a viewing order. J40 is a **demo NEXT CASE payload** only (`CASE 00X` placeholder). CTA lines are calibration copy, not a channel slogan. SP-10…SP-14 are **intentional anti-references** (internal, tagged on screen, never published) and are judged only on whether they show the named failure clearly and honestly.
> Evidence rule: only claims VERIFIED in the ledger appear (sentence audit: `calibration/02-golden-motion-and-anti-reference.md` §Kanıt denetimi — binding). Tool choices follow the scene (TIC-19); CASE INTRO implementation route (AE master / Remotion / hybrid) is decided **after** Golden Lock.

## VO cut list (AI-01 existing recording; cuts only at measured sentence boundaries; no new credits)
| Segment | Sentences used (verbatim from the recording) | Removed and why |
|---|---|---|
| VO-A (SP-01) | "The NS Savannah was the first nuclear-powered merchant ship. And she worked. In her first three commercial years, she made nineteen voyages on regular cargo routes. Her operators called her the most reliable ship they had." | — |
| VO-B (SP-02) | "Then, in 1970, federal auditors found something strange. The Savannah needed about two million dollars more in government support every year than comparable conventional freighters on the same route. Where was that money going?" | — |
| VO-C (SP-04) | "The auditors traced most of it to three lines: training a nuclear crew, keeping a nuclear staff ashore — and a third line bigger than the other two combined." | — |
| VO-D (SP-05) | "A nuclear servicing facility in Galveston, Texas. A pier. Heavy cranes. A pool for spent fuel. A servicing barge called the Atomic Servant. Even a spare reactor core. About one point one six million dollars a year." | — ("Heavy cranes." kept: E-11, read from the GAO page, records a 75-ton gantry crane and a 75-ton bridge crane) |
| VO-E (SP-06) | "And then, for two years, the Savannah didn't come back. For her 1967 and 1968 inspections, the facility's staff went to her — in New York." | "The auditors wrote that…several nuclear ships." · "There was only one." · "So why was one working ship…several?" — verbatim GAO wording for "several" not in ledger (no Q- row) |
New lines (AI-03, ≤150 credits total under D-048; text is calibration copy, not locked): **L1** (SP-08) *"Every case on this channel starts with the evidence — and ends with how the whole system really worked. If you want the next one, subscribe."* · **L2** (SP-09) *"The ship worked. But one ship was carrying the whole system around her."* (C-11 / Q-02) · **L3** (SP-09, optional) *"Subscribe for the next case."*

### SP-01 — G1 The ship that worked
- **Beat:** CAL-G1 (calibration sample; no beat sheet)
- **Story Function:** BREAK ASSUMPTION, NEW INFORMATION
- **Claim:** First nuclear-powered merchant ship that worked; nineteen voyages in the first three commercial years (10 Mediterranean, 7 Northern Europe, 2 Far East); operators called her the most reliable ship (NPS).
- **Evidence Anchor:** C-30, C-14, C-44, C-36, Q-06, V-05
- **Presentation Visual:** The real 1962 photograph becomes a living scene with true depth, and then the ship's own hull outline becomes the marker that fills the regions she sailed to.
- **Visual Idea:** The photograph is separated into sky, bridge, ship and water; the camera starts on the static steel mass of the bridge and moves laterally until the ship in service is revealed underneath, without any object in the photo being displaced; on "And she worked." the move stops and holds; the hull contour is traced once in Atomic Teal, lifts off the photograph and lands on a quiet world map cropped to show the U.S. Atlantic ports and all three destination regions including the Far East (C-44), where the three regions fill in turn with their GAO counts and a small counter settles on 19.
- **Motion / Spatial Behaviour:** reveal (lateral move uncovers the ship), transformation (hull contour → map marker), progression (regions fill in sequence); hold on "And she worked." **Archive integrity rule (V-05):** no ship or hull detail is invented; parallax is limited to what existing pixels support; any gap is filled only with neutral sky or water texture; hidden hull parts are never completed; the isolated hull keeps only visible pixels in natural colour.
- **Transition Logic:** Object Carry — the contour is the bridge from archive to map; the marker then slides toward the paper world of SP-02.
- **Sound Role:** Narration leads over a restrained bed; one short low reveal texture as the ship appears; a breath after "And she worked."
- **UI Role:** label — `AEC / NATIONAL ARCHIVES · 1962`, `GAO · 1970` on the counts, `NPS` on the operators line; no quote text on screen.
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION (Photo: AEC / National Archives) — READY; V-28 public domain (Natural Earth) — READY; V-29 public domain (Natural Earth) — READY; OG-01 own graphic — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter commercial license) — READY; OG-10 own texture — TO_PRODUCE; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide can zoom into a photo and type "19 voyages"; here the photo's depth serves a camera intention and the hull itself becomes the map marker that reveals where she went, which a few transitions cannot approximate.
- **Tool:** Photoshop (layer separation, hull mask, natural colour) + After Effects (2.5D camera, contour, Object Carry); region fill as a Remotion map primitive composited in AE; no 3D because flat continuity is the idea.

### SP-02 — G2a The audit's gap
- **Beat:** CAL-G2a
- **Story Function:** NEW CURIOSITY, BRING EVIDENCE
- **Claim:** In 1970 auditors found the Savannah needed about $2 million a year more than the average operating subsidy for comparable conventional ships on the same route.
- **Evidence Anchor:** E-2, V-03, C-04, Q-01, V-02
- **Presentation Visual:** The 1970 report is opened as a physical file, the exact phrase is lifted out of the page verbatim and becomes an open, unscaled gap that the question hangs on.
- **Visual Idea:** The marker from SP-01 lands on the real 1970 cover, which opens with true paper depth and no fake ageing; the camera pushes in to the summary sentence, only that sentence sharpens while the rest of the page recedes; the phrase "about $2 million more a year" detaches from the page pixels and settles between two plain labels, Savannah and comparable conventional ships on the same route, as an open bracket with no bars because GAO gives no subsidy figure to scale; on the question the camera stops and the bracket stays open.
- **Motion / Spatial Behaviour:** reveal (push-in to the sentence), transformation (Evidence Pull: phrase → open gap), hold on the question.
- **Transition Logic:** The open bracket flattens into the Case Line that starts the CASE INTRO (SP-03).
- **Sound Role:** One short low reveal sound as the phrase detaches (Evidence Pull, per sound grammar); the bed withdraws; the question is spoken into near silence (first reserved silence).
- **UI Role:** highlight + source clarity — one amber line; `EVIDENCE 01 · GAO B-136209 · 1970` mapped to C-04 / Q-01.
- **Rights / Asset Readiness:** V-03 public domain (GAO, not copyrighted) — READY; V-02 public domain (GAO) — READY; OG-02 own graphic — TO_PRODUCE; OG-10 own texture (reveal sound) — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide could show the page and highlight the sentence; here the document's own words physically leave the page and become an open gap the viewer wants closed, which turns evidence into the question.
- **Tool:** Page images rendered from the PDF with `production/tools/pdf/pdf-to-png.ps1` (pixels verbatim) + After Effects 3D paper layers and camera; bracket as own vector (Illustrator → AE).

### SP-03 — I-A CASE INTRO (CASE 001 payload)
- **Beat:** CAL-I-A
- **Story Function:** CONNECT IDEAS
- **Claim:** none — framing beat
- **Evidence Anchor:** none — framing beat
- **Presentation Visual:** The question's open bracket becomes a single hairline that scans and registers the Savannah hull into the casebook, indexes CASE 001 and the title on the line, and then hands the line to the first evidence item.
- **Visual Idea:** Carry-in: the bracket flattens into the Case Line without a cut or blackout while the world behind softens in depth; Registration: the line passes along the hull like a section slit, the hull sharp and in natural colour inside the slit, then the slit opens to the whole isolated hull; Index: `CASE 001` settles at the left end in Plex Mono like a mechanical counter while `NS SAVANNAH` rises from below the line in Plex Sans Condensed; Motif: one thin orbit arc from 1960s technical drawing passes once in Atomic Teal; Release: title and number retract into the line, the hull recedes into its world and the line stays to become the underline of the first cost line in SP-04.
- **Motion / Spatial Behaviour:** transformation (bracket → Case Line → evidence underline), reveal (slit registration), progression (number settles, title rises). Archive integrity rule as SP-01: the isolated hull uses only visible V-05 pixels; nothing completed or invented.
- **Transition Logic:** Starts from SP-02's visual result and ends as SP-04's first visual element, so the open question is carried through the intro.
- **Sound Role:** No narration; the music bed **returns** under the intro after SP-02's silence (sound grammar); intro texture candidate S-1 (OG-08) and S-2 (OG-09) rendered as two variants of the same picture.
- **UI Role:** label — case number and title only; no channel logo card, no full-screen title, channel name at most as a micro line.
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION (hull isolated from the photograph) — READY; OG-05 own motion design — TO_PRODUCE; OG-08 own texture — TO_PRODUCE; OG-09 own texture — TO_PRODUCE; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide would cut to a title card; here the question's own shape becomes the line that registers the object and then becomes the first piece of evidence, so the intro is the investigation's first move rather than an ad break.
- **Tool:** After Effects Golden Master with payload slots + Photoshop hull isolation; implementation route for reuse decided after Golden Lock.

### SP-04 — G2b Three lines on a page
- **Beat:** CAL-G2b
- **Story Function:** BRING EVIDENCE, SHOW SCALE
- **Claim:** Most of the extra cost traced to three lines — nuclear crew training, nuclear shore staff, and a servicing facility larger than the other two combined.
- **Evidence Anchor:** C-06, C-08, C-09, C-10, V-01
- **Presentation Visual:** The summary page's three cost lines are bracketed one at a time and each leaves a labelled block beside the open gap, the third visibly larger than the first two together.
- **Visual Idea:** The Case Line from the intro lands under the first cost line of the real summary page; the three lines receive thin steel brackets in turn with amber moving to the line being spoken; each line casts a labelled block that settles beside the still-open gap, not inside it; the third block is visibly larger than the first two combined without any total written; its underline extends to the right edge and becomes the base line of SP-05.
- **Motion / Spatial Behaviour:** transformation (page lines → blocks), scale (third block against the other two), progression (one line at a time).
- **Transition Logic:** Document underline → engineering base line (SP-05).
- **Sound Role:** Narration over the bed, which continues from the intro; a very light paper texture only as each bracket draws.
- **UI Role:** highlight (one amber line at a time) + source clarity (`GAO · Summary p.2`).
- **Rights / Asset Readiness:** V-01 public domain (GAO) — READY; OG-02 own graphic — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; OG-10 own texture — TO_PRODUCE; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide would bullet three costs; here the page itself produces proportional objects beside the question's gap, so the viewer sees which line matters before being told.
- **Tool:** After Effects (page-to-block transformation) with own vectors.

### SP-05 — G3 The system on the shore
- **Beat:** CAL-G3
- **Story Function:** EXPLAIN SYSTEM, SHOW SCALE
- **Claim:** A nuclear servicing facility in Galveston — pier and platform area, a 75-ton gantry crane, a maintenance building with a 75-ton bridge crane and a water-filled spent-fuel pit, the Atomic Servant servicing barge, and a spare reactor core — cost about $1.16 million a year (operating cost, first three commercial years), all of it carried by one ship.
- **Evidence Anchor:** C-31, E-11, C-10, C-11, Q-02, V-13
- **Presentation Visual:** The cost block becomes a place: on it the facility's ledger components are drawn as an orthographic component sheet, in a neutral row facing one empty berth, so the viewer understands the facility as a system serving a single ship.
- **Visual Idea:** The base line becomes a Texas coastline and a short map descent reaches Galveston at city level only; the third cost block lands and becomes a ground plate; when the map descent ends on the Galveston city dot the map fades out completely to a plain ink sheet, so the drawing that follows carries no geography and cannot read as a site plan; in a locked frame the components draw in sync with the narration as a component sheet in GAO's own terms (E-11), each with a Plex Mono label: PIER, 75-TON GANTRY CRANE, MAINTENANCE BUILDING with its 75-TON BRIDGE CRANE and SPENT-FUEL PIT as labelled elements, ATOMIC SERVANT, SPARE REACTOR CORE; components sit in a neutral row facing an empty berth outline at the centre, with no relative positions implied; the cost figure appears small with its source mark; the sheet carries DIAGRAM · NOT TO SCALE · NOT A SITE PLAN.
- **Motion / Spatial Behaviour:** transformation (block → ground plate), mechanism (components assemble in a neutral row facing the berth), spatial relationship (everything faces one slot); locked frame because the content moves.
- **Transition Logic:** Base line → coastline → Galveston dot → map fades to a plain sheet → the third block becomes a neutral ground plate (not a lot outline); the empty berth carries into SP-06 (C1 / SP-08 is inserted after the cost figure lands, then returns here).
- **Sound Role:** Narration and bed; no sound per component; one low mechanical texture when the plate lands.
- **UI Role:** label — component names, `GALVESTON`, `GAO · p.15`, `DIAGRAM · NOT TO SCALE · NOT A SITE PLAN`.
- **Rights / Asset Readiness:** V-13 public domain (GAO) — READY; V-28 public domain (Natural Earth) — READY; V-29 public domain (Natural Earth) — READY; OG-03 own diagram — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; OG-10 own texture — TO_PRODUCE; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide would line up five icons; here the money becomes a place and the components are drawn facing a visibly empty slot, so the system is understood as space and purpose rather than a list.
- **Tool:** Illustrator vectors + After Effects line-draw; map descent as Remotion primitive; Blender deliberately not chosen because the ledger gives no layout or geometry and 3D would invent it.

### SP-06 — G4 The ship that didn't come back
- **Beat:** CAL-G4
- **Story Function:** NEW CURIOSITY, HUMAN DIMENSION
- **Claim:** For two years the ship did not return to Galveston; for the 1967 and 1968 inspections the facility's staff went to her in New York.
- **Evidence Anchor:** C-32
- **Presentation Visual:** Absence becomes the subject: the ready facility waits around its empty berth while time passes, then the direction of movement reverses as the staff travel to the ship instead of the ship coming home.
- **Visual Idea:** The component sheet from SP-05 holds and the empty berth outline sharpens into a dashed gap while a restrained calendar strip at the edge advances from 1967 to 1968; the camera pulls out until the facility is a small inset on a coastline map and a dotted line leaves Galveston for New York with a small staff mark travelling toward the ship, never placed in a specific shore office; the camera returns to Galveston, the full facility and the empty berth, and holds in silence.
- **Motion / Spatial Behaviour:** progression (calendar advances), spatial relationship (pull-out; reversed direction of travel), hold in silence as visual payoff.
- **Transition Logic:** Continues SP-05's drawing; map inset and return are built around the same empty berth; the reel ends on the hold.
- **Sound Role:** Bed thins; after "in New York." real silence over the empty berth (second reserved silence), room tone only.
- **UI Role:** minimal — `1967`, `1968`, `NEW YORK`, `GALVESTON`.
- **Rights / Asset Readiness:** V-28 public domain (Natural Earth) — READY; V-29 public domain (Natural Earth) — READY; OG-03 own diagram — TO_PRODUCE; OG-04 own graphic — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide would show a photo and "1967–1968"; here emptiness is the subject and the direction of movement reverses on screen, so the viewer grasps the consequence before anyone states it.
- **Tool:** After Effects reusing the SP-05 drawing; route inset as Remotion primitive; no new assets.

### SP-07 — I-B CASE INTRO (demo payload J40)
- **Beat:** CAL-I-B
- **Story Function:** CONNECT IDEAS
- **Claim:** none — framing beat
- **Evidence Anchor:** none — framing beat
- **Presentation Visual:** The same skeleton registers a different object: a line runs along the J40 engine's long axis, opens it stage by stage and indexes a placeholder case number and the title, proving the intro adapts without being copied.
- **Visual Idea:** Identity of the photograph: NASA Glenn GRC-1951-C-28738, captioned "J40 ENGINE IN ALTITUDE WIND TUNNEL" (Westinghouse J40, NACA Lewis, 1951–1952; capture in `rights-proof/2026-10-15-web-captures.md` §V-90). From a horizontal edge of the wind-tunnel test-section frame the Case Line forms; it travels along the engine's axis like a section slit, revealing the isolated engine in its natural greyscale (the researcher in the frame is not used); `CASE 00X` settles in Plex Mono and `WESTINGHOUSE J40` rises from the line; a single pass of evenly spaced tick marks is drawn in a cool demo accent that differs from Atomic Teal and amber — an identity motif, not a count of the engine's real compressor stages; the composition holds on the title because this is a context-free payload test.
- **Motion / Spatial Behaviour:** reveal (axial slit registration), progression (number and title settle), transformation (horizon → Case Line).
- **Transition Logic:** Standalone payload test; the same registration is reused in SP-09.
- **Sound Role:** Same music bed (M-01) and the same intro texture variants S-1 / S-2 as SP-03, so the two intros compare fairly.
- **UI Role:** label — placeholder number and title only.
- **Rights / Asset Readiness:** V-90 public domain (NASA), CLEAR_WITH_ATTRIBUTION (NASA, engine only, researcher not used) — READY; OG-05 own motion design — TO_PRODUCE; OG-08 own texture — TO_PRODUCE; OG-09 own texture — TO_PRODUCE; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide template would repeat the same title card with a new photo; here the line follows the new object's own axis and opens it stage by stage, so the identity is a behaviour, not a template.
- **Tool:** After Effects master (same comp as SP-03 with payload slots) + Photoshop engine isolation.

### SP-08 — C1 CTA / Subscribe motion reference
- **Beat:** CAL-C1
- **Story Function:** CONNECT IDEAS
- **Claim:** none — framing beat
- **Evidence Anchor:** none — framing beat
- **Presentation Visual:** Right after SP-05's cost figure lands — the first real answer to where the money went — a short Case Line appears at the lower edge away from the subject, one small Plex Mono tag slides out while the identity line is spoken, and everything retracts so the scene continues.
- **Visual Idea:** The SP-05 component sheet keeps holding untouched; a short Case Line draws in the lower safe area; a single tag reads an example text such as NEXT CASE · SUBSCRIBE; it holds only while L1 is spoken, then slides back into the line and the line disappears while the story resumes from where it was.
- **Motion / Spatial Behaviour:** reveal and retract of one small element; the background scene holds its own motion.
- **Transition Logic:** Inserted after SP-05's cost figure (no question is open at that moment: the gap's main line has just been answered) and returns directly into SP-06.
- **Sound Role:** Narration only (L1); the bed neither dips nor swells, so it never feels like an ad break.
- **UI Role:** guide — one small tag; no button, bell, cursor, popup or lower-third template.
- **Rights / Asset Readiness:** AI-03 ai-generated-own (ElevenLabs Starter, within D-048 cap) — TO_PRODUCE; OG-06 own motion design — TO_PRODUCE; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A template CTA would cover the frame with a red button; here the request speaks the channel's own grammar after a real answer and returns to the story within moments. Placement and behaviour are evaluated separately in the preview (clip shows the moment before and after).
- **Tool:** After Effects (same Case Line as the intro).

### SP-09 — E1 End-screen / NEXT CASE continuation (modular)
- **Beat:** CAL-E1
- **Story Function:** PAYOFF, CONNECT IDEAS
- **Claim:** One ship was carrying the whole system around her.
- **Evidence Anchor:** C-11, Q-02, C-06, C-04, C-32
- **Presentation Visual:** The payoff image becomes a simple schema, the Case Line leaves it, the outgoing ship marker lifts away, and the same line registers the next case's hero object before the frame settles into a calm end-screen-aware layout.
- **Visual Idea:** SP-06's facility with its empty berth returns; a small `AUG 1968` mark appears and the Savannah marker slides back into the berth (C-32: she returned to the facility in August 1968 for refuelling, August–October 1968); SP-02's gap reappears with its width set to about $2 million a year (C-04) on the same scale as the three blocks, which now move into it and fill about $1.9 million (C-06), the remaining share left visible and unlabelled; L2 is spoken as the camera pulls back to a schema of one object with a system around it; the Case Line exits that schema, the Savannah marker lifts from the berth, and the line registers the demo payload engine with `CASE 00X · WESTINGHOUSE J40`; the composition settles leaving empty, Case-Line-framed areas where platform end-screen elements will appear, with no fake buttons drawn; optional L3 last.
- **Motion / Spatial Behaviour:** transformation (payoff → schema → next registration), reveal (next object), hold for the end-screen layout.
- **Transition Logic:** The outgoing case's final visual result becomes the line that registers the next case; the NEXT CASE payload (hero object, title, number, motif, accent) is a variable slot filled at publish time.
- **Sound Role:** Narration (L2, optional L3) over a resolving bed; the intro texture variant chosen for SP-03 at the registration.
- **UI Role:** label + guide — next-case index and the framed empty end-screen areas only.
- **Rights / Asset Readiness:** V-90 public domain (NASA), CLEAR_WITH_ATTRIBUTION — READY; OG-02 own graphic — TO_PRODUCE; OG-03 own diagram — TO_PRODUCE; OG-05 own motion design — TO_PRODUCE; OG-07 own motion design — TO_PRODUCE; AI-03 ai-generated-own (ElevenLabs Starter, within D-048 cap) — TO_PRODUCE; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A generic end card pastes thumbnails over black; here the story's last image carries the viewer into the next object through the same line, so continuation is the narrative's own movement.
- **Tool:** After Effects reusing the intro master and the SP-05 drawing.

### SP-10 — AR1 Anti-reference: photo + slow zoom + text
- **Beat:** CAL-AR1 (paired with SP-01; same VO-A and bed)
- **Story Function:** BREAK ASSUMPTION (intentionally weak treatment)
- **Claim:** Same as SP-01.
- **Evidence Anchor:** C-30, C-14, C-36, Q-06, V-05
- **Presentation Visual:** Deliberately weak: the full-frame photograph with an aimless slow zoom, a dark full-screen text card with the voyage count, a crossfade to another ship photo and a second text card.
- **Visual Idea:** V-05 full frame with a slow zoom that has no target; a crossfade to a dark-blue card reading 19 VOYAGES; a crossfade to the launch photograph that literally illustrates the word ship; a card reading MOST RELIABLE SHIP with the source mark `NPS`; corner tag ANTI-REFERENCE · INTERNAL throughout.
- **Motion / Spatial Behaviour:** none — reason: the slow zoom is intentionally purposeless to show the failure; nothing carries information.
- **Transition Logic:** Default crossfades with no meaning (intentional failure).
- **Sound Role:** Identical to SP-01 so only the picture differs.
- **UI Role:** label — oversized text cards (intentional failure) + internal tag.
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION — READY; V-07 public domain (MARAD) — READY; OG-11 own anti-reference graphics (built-in software presets and shapes, no third-party stock) — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** Intentionally fails the test: this is exactly what a few PowerPoint transitions produce, shown so the pair with SP-01 makes the difference visible.
- **Tool:** Premiere default zoom and crossfade presets; deliberately low effort.

### SP-11 — AR2 Anti-reference: PDF + highlight + cut, dossier cards, UI clutter
- **Beat:** CAL-AR2 (paired with SP-02 / SP-04; same VO-B and VO-C)
- **Story Function:** BRING EVIDENCE (intentionally weak treatment)
- **Claim:** Same as SP-02 and SP-04.
- **Evidence Anchor:** C-04, Q-01, C-06, C-08, C-09, C-10, V-02, V-01
- **Presentation Visual:** Deliberately weak: a flat full-screen PDF page, a yellow highlighter swipe, a hard cut to a dark dossier card cluttered with labels, grid and metadata, then three bullet cards.
- **Visual Idea:** The summary page flat and full screen; a yellow swipe across the sentence; a hard cut to a dark card reading about 2 million a year more than comparable conventional ships on the same route (C-04 baseline kept) with EVIDENCE 01, CASE 001, grid lines and decoration built from obviously placeholder glyphs such as ##:##:## and --°--' that cannot be read as real data; three bullet cards slide in for the cost lines; corner tag ANTI-REFERENCE · INTERNAL; no number differs from the document.
- **Motion / Spatial Behaviour:** none — reason: slide-ins and the swipe are intentionally decorative to show the failure.
- **Transition Logic:** Hard cuts and slide-ins with no relation between ideas (intentional failure).
- **Sound Role:** Identical to the paired golden samples.
- **UI Role:** label — UI-dominant clutter (intentional failure) + internal tag.
- **Rights / Asset Readiness:** V-02 public domain (GAO) — READY; V-01 public domain (GAO) — READY; OG-11 own anti-reference graphics (built-in presets and shapes, no third-party stock) — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** Intentionally fails the test: document shown without visual thinking and everything turned into cards, so the pair shows why SP-02 is a scene.
- **Tool:** Premiere / After Effects presets; deliberately low effort.

### SP-12 — AR3 Anti-reference: decorative motion, random B-roll
- **Beat:** CAL-AR3 (paired with SP-05; same VO-D)
- **Story Function:** EXPLAIN SYSTEM (intentionally weak treatment)
- **Claim:** Same as SP-05.
- **Evidence Anchor:** C-31, C-10, V-13
- **Presentation Visual:** Deliberately weak: bouncing generic icons, a spinning gear, an aimlessly drifting document in the background, a bullet slide and loosely related filler photos.
- **Visual Idea:** Generic icon shapes bounce in as components are named; a gear spins in a corner the whole time; the GAO page drifts behind with pointless parallax; a FACILITY INCLUDES bullet slide; the launch and fuel element photos appear as filler while the list is spoken; wipe transitions; corner tag ANTI-REFERENCE · INTERNAL.
- **Motion / Spatial Behaviour:** none — reason: all motion is intentionally decorative and carries no information.
- **Transition Logic:** Wipes without meaning (intentional failure).
- **Sound Role:** Identical to SP-05.
- **UI Role:** label — bullet slide (intentional failure) + internal tag.
- **Rights / Asset Readiness:** V-13 public domain (GAO) — READY; V-07 public domain (MARAD) — READY; V-24 public domain (MARAD) — READY; OG-11 own anti-reference graphics (built-in presets and shapes, no third-party stock) — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** Intentionally fails the test: motion without a visual idea and random B-roll, so the pair shows why SP-05 explains a system.
- **Tool:** After Effects presets; deliberately low effort.

### SP-13 — AR4 Anti-reference: asset slideshow, literal illustration
- **Beat:** CAL-AR4 (paired with SP-06; same VO-E)
- **Story Function:** NEW CURIOSITY (intentionally weak treatment)
- **Claim:** Same as SP-06.
- **Evidence Anchor:** C-32, V-05, V-19
- **Presentation Visual:** Deliberately weak: every available photo in sequence with the same zoom and dip-to-white transitions, a stock lower-third for the years, a generic worker icon and a big place-name card.
- **Visual Idea:** V-05, V-19, the launch photo and the fuel element photo in turn with identical zooms and dips to white; a 1967 – 1968 lower-third template; a generic worker icon when the staff are mentioned; a large NEW YORK card; corner tag ANTI-REFERENCE · INTERNAL; the 1964 Rotterdam photo is captioned with its own year so no era is misrepresented.
- **Motion / Spatial Behaviour:** none — reason: identical zooms are intentionally purposeless.
- **Transition Logic:** Dip-to-white between unrelated photos (intentional failure).
- **Sound Role:** Identical to SP-06.
- **UI Role:** label — template lower-third (intentional failure) + internal tag.
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION — READY; V-19 CC0 (Nationaal Archief) — READY; V-07 public domain (MARAD) — READY; V-24 public domain (MARAD) — READY; OG-11 own anti-reference graphics (built-in presets and shapes, no third-party stock) — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** Intentionally fails the test: an asset slideshow that illustrates the narration literally, so the pair shows why SP-06 creates visual curiosity.
- **Tool:** Premiere default transitions; deliberately low effort.

### SP-14 — AR5 Anti-reference: standalone logo intro + generic CTA
- **Beat:** CAL-AR5 (paired with SP-03 and SP-08)
- **Story Function:** CONNECT IDEAS (intentionally weak treatment)
- **Claim:** none — framing beat
- **Evidence Anchor:** none — framing beat
- **Presentation Visual:** Deliberately weak: a cut to black, a spinning 3D channel-name logo with whoosh and boom and glitch, a large CASE 001 stamp, then a frame-covering red subscribe button with a bell and a hand cursor.
- **Visual Idea:** Hard cut to black; the channel name in generic 3D spins in with a whoosh, a boom and a glitch; a large CASE 001 stamp slams onto the frame; then a big red subscribe button with a ringing bell and a clicking hand cursor covers the subject with the text Don't forget to like and subscribe; no YouTube logo; corner tag ANTI-REFERENCE · INTERNAL.
- **Motion / Spatial Behaviour:** none — reason: the motion is intentionally decorative to show an ad-break intro and a generic CTA.
- **Transition Logic:** Cut to black and back (intentional failure: the story stops).
- **Sound Role:** Stock-style whoosh and boom made in-house (no third-party samples) to show the failure.
- **UI Role:** label — frame-covering CTA (intentional failure) + internal tag.
- **Rights / Asset Readiness:** OG-11 own anti-reference graphics (built-in presets and shapes for logo, stamp, button, bell and cursor, no third-party stock, no YouTube logo) — TO_PRODUCE; OG-10 own texture (anti variant) — TO_PRODUCE
- **Anti-PowerPoint:** Intentionally fails the test: an ad-break logo intro and a template CTA, so the pairs with SP-03 and SP-08 show why the channel avoids them.
- **Tool:** After Effects presets; deliberately low effort.

## Verified asset binding (Strong PC measurement 2026-10-15; production_root `D:/CompanyOS-Production`)
| Asset | Path | SHA-256 | Measured | Rights | Used in |
|---|---|---|---|---|---|
| V-05 | `P3-ns-savannah/01_archive/photos/V-05_nara-542141_golden-gate_1962.jpg` | `a66ce07b…b2990311` | 1920×1588 | CLEAR_WITH_ATTRIBUTION | SP-01, SP-03, SP-10, SP-13 |
| V-19 | `P3-ns-savannah/01_archive/photos/V-19_rotterdam_1964-09-30_cc0.jpg` | `7bc038e7…ff716cb6` | 1920×1907 | CLEAR (CC0) | SP-13 |
| V-07 | `P3-ns-savannah/01_archive/photos/V-07_launch_marad.jpg` | `a54effc4…58a7387f` | 330×428 | CLEAR | SP-10, SP-12, SP-13 |
| V-24 | `P3-ns-savannah/01_archive/photos/V-24_fuel-element_marad-1961.jpg` | `14dc8d1f…a117c2bd` | 960×309 | CLEAR | SP-12, SP-13 |
| V-28 / V-29 | `P3-ns-savannah/01_archive/maps/ne_50m_admin_1_states_provinces.geojson` / `ne_50m_land.geojson` | `69a0e06e…98c426b9` / `e874b27a…682f9826b` | data | CLEAR | SP-01, SP-05, SP-06 |
| V-01 / V-02 / V-03 / V-13 | `P3-ns-savannah/01_archive/b-136209.pdf` (PDF p.6 / p.5 / p.1 / p.19; 38 pages) | `1070eb40…087936b0` | page images rendered at production with `pdf-to-png.ps1` | CLEAR | SP-02, SP-04, SP-05, SP-11, SP-12 |
| V-90 | `CAL-S5/01_archive/grc-1951-c-28738.jpg` | `90122879…ac9f5e0ff` (verified after download) | 2009×2539 | CLEAR_WITH_ATTRIBUTION | SP-07, SP-09 |
| AI-01 / AI-02 | `P3-ns-savannah/03_vo/prototype-v2/P3_VO_OPEN_v2_eleven_multilingual_v2.mp3` / `.json` | `8a7712b6…0d287ca914` / `b07bdeb6…b60db07e8` | 76.98 s | CLEAR (ai-generated-own) | VO-A…VO-E |
| M-01 | `CAL-S5/04_music/Ether Oar - The Whole Other.mp3` | `8fde65ae…b3957ff7e3` | 159.63 s | CLEAR (Audio Library, no attribution) | see music plan |
| M-02 | `CAL-S5/04_music/The Stalker - Hainbach.mp3` | `4d3b67f6…f3ccc102` | 138.03 s | CLEAR | see music plan |
| M-03 | `CAL-S5/04_music/The Empty Moons of Jupiter - DivKid.mp3` | `41a4c81e…13ab251d` | 192.03 s (Studio UI 3:08 — observation only) | CLEAR | see music plan |
| M-04 | `CAL-S5/04_music/Contact - The Tower of Light.mp3` | `787c8183…2d210b134` | 191.16 s | CLEAR | see music plan |
Full values: `handoff/asset-manifest.csv` (canonical) and `handoff/measurement-report-v1.md`. TO_PRODUCE (made on Strong PC within this plan): OG-01…OG-11, AI-03 (≤150 credits, D-048).

## Music comparison plan (no selection in Stage 5)
The four candidates are compared, not chosen. Choice — or rejection of all — is the Founder's at Golden Lock.
- **Comparison file:** Reel A's picture is rendered once and mixed four times, identical except for the bed (M-01, M-02, M-03, M-04), same mix behaviour and the same two reserved silences.
- **Coverage assignment** so each candidate is heard in several contexts (this is coverage, **not** a preference): Reel A main → M-01 · Reel B → M-02 · pair AR1|G1 → M-03 · pair AR2|G2+G2b → M-04 · pair AR3|G3 → M-01 · pair AR4|G4 → M-02 · intro clips (recognition, S-1/S-2) → M-03 · C1 + E1 → M-04 · AR5 → own textures only. Within a golden/anti pair both sides use the same bed so only the picture differs.
- Edits allowed: cut, fade, loop within the track (normal video editing under the Audio Library licence); no pitch/tempo change; files never redistributed separately.

## Render / output intent
Internal 1080p review copies per `calibration/05-production-plan-and-preview.md` §6 (01 Reel A … 08 contact sheet) plus `09_MUZIK_karsilastirma_M01…M04` (comparison file above). Every file ends with its one-line credit card; anti-references carry `ANTI-REFERENCE · INTERNAL`. Nothing is published, nothing becomes P3 material. Strong PC delivers the delivery report (technical QA, `Creative QA: PENDING_INDEPENDENT`) and muted grids; final creative verdict is the independent evaluator's, then the Founder's Golden Lock.

## Backup observation (readiness, not a blocker)
AI-01 / AI-02 have **no backup copy** (measurement report §2): the earlier BACKED_UP claim was false and is corrected to LOCAL_ONLY. Under the factory protocol (`os/factory/README.md` §8) input-asset backup is a readiness warning, not a handoff gate; produced LOCAL_ONLY outputs must be backed up before delivery. Risk: if Strong PC D: fails, these exact files cannot be recovered (regeneration would cost credits and not be identical). Mitigation inside the handoff's allowed actions (`backup-produced-assets`): Strong PC's first technical step runs the existing `production/tools/backup/backup-production.ps1` (copies each video's `03_vo`, which includes `prototype-v2/`) and verifies with `factory.mjs backup`; no new policy, no Founder action.

## Scene progression
Reel A (viewing order, not P3 structure): SP-01 → SP-02 → SP-03 → SP-04. Reel B: SP-04 → SP-05 → SP-06 (the CTA clip SP-08 shows SP-05's end → C1 → SP-06's start). Separate clips: SP-03 + SP-07 (recognition), SP-03 with S-1 / S-2, SP-08, SP-09, and pairs SP-10|SP-01, SP-11|SP-02+SP-04, SP-12|SP-05, SP-13|SP-06, SP-14. Each golden scene starts from the previous scene's visual result.

## Attribution delivery (V-05, V-90)
V-05 ("Photo: AEC / National Archives") and V-90 ("NASA") require attribution. Where the image carries a source mark on screen (SP-01) that mark serves; in clips without on-screen credit (SP-03, SP-07, SP-09, SP-10, SP-13 and the reels) every review file ends with a one-line credit card listing the sources used in it, and `07_review/00_OKU_BENI.txt` lists all credits. No NASA endorsement is implied and no NASA logo is used.

## Diagnostics (DIAGNOSTIC, not targets)
Literal scenes: none in golden samples · tool mix: After Effects in most scenes, Remotion for map data, Photoshop/Illustrator for preparation; watch for a one-tool look · silence used twice by design · measured lengths (intro, reels, CTA hold) reported in the delivery report, not judged by a number.

## Asset status
All required assets READY with full SHA-256 (or TO_PRODUCE under this plan); rights CLEAR for every external/AI asset; music candidates M-01…M-04 READY and CLEAR (none selected). No Founder action is required before handoff. HARD STOP remains: nothing goes to Strong PC production until the handoff is ISSUED and preflight returns READY_FOR_PRODUCTION.
Final creative PASS for renders comes from the independent evaluator, not from this session or Strong PC.
