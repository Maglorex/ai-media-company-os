# CAL-S5 — Production Scene Plan v1 (Stage 5 calibration)

> author: COO main session (Stage 5 production prep, 2026-10-15) · date: 2026-10-15 · status: DRAFT (independent creative QA → ACTIVE) · skill: `production-scene-plan` · decision: D-048 (render + ≤150 ElevenLabs credits; no new payment)
> inputs: `channels/the-industrial-casebook/calibration/` (Stage 5 design final: README, 01–05) · evidence: `production/pilots/2026-10-n2-pilot-test/P3-evidence-ledger.md` · rights: `channels/the-industrial-casebook/cases/CAL-S5/rights-ledger.csv` · assets: `channels/the-industrial-casebook/cases/CAL-S5/handoff/asset-manifest.csv`
> **Scope (binding for this plan):** CAL-S5 is a calibration case, not a video. P3 VO, assets and evidence are **calibration material only**; Golden Lock judges motion grammar, visual transformation quality, cinematography, sound behaviour, the CASE INTRO skeleton, CTA behaviour and NEXT CASE behaviour — **not** P3's story or opening structure. Reel order is a viewing order. J40 is a **demo NEXT CASE payload** only (`CASE 00X` placeholder). CTA lines are calibration copy, not a channel slogan. SP-10…SP-14 are **intentional anti-references** (internal, tagged on screen, never published) and are judged only on whether they show the named failure clearly and honestly.
> Evidence rule: only claims VERIFIED in the ledger appear (sentence audit: `calibration/02-golden-motion-and-anti-reference.md` §Kanıt denetimi — binding). Tool choices follow the scene (TIC-19); CASE INTRO implementation route (AE master / Remotion / hybrid) is decided **after** Golden Lock.

## VO cut list (AI-01 existing recording; cuts only at measured sentence boundaries; no new credits)
| Segment | Sentences used (verbatim from the recording) | Removed and why |
|---|---|---|
| VO-A (SP-01) | "The NS Savannah was the first nuclear-powered merchant ship. And she worked. In her first three commercial years, she made nineteen voyages on regular cargo routes. Her operators called her the most reliable ship they had." | — |
| VO-B (SP-02) | "Then, in 1970, federal auditors found something strange. The Savannah needed about two million dollars more in government support every year than comparable conventional freighters on the same route. Where was that money going?" | — |
| VO-C (SP-04) | "The auditors traced most of it to three lines: training a nuclear crew, keeping a nuclear staff ashore — and a third line bigger than the other two combined." | — |
| VO-D (SP-05) | "A nuclear servicing facility in Galveston, Texas. A pier. A pool for spent fuel. A servicing barge called the Atomic Servant. Even a spare reactor core. About one point one six million dollars a year." | "Heavy cranes." — plural not supported (C-31 records one 75-ton portal crane) |
| VO-E (SP-06) | "And then, for two years, the Savannah didn't come back. For her 1967 and 1968 inspections, the facility's staff went to her — in New York." | "The auditors wrote that…several nuclear ships." · "There was only one." · "So why was one working ship…several?" — verbatim GAO wording for "several" not in ledger (no Q- row) |
New lines (AI-03, ≤150 credits total under D-048; text is calibration copy, not locked): **L1** (SP-08) *"Every case on this channel starts with the evidence — and ends with how the whole system really worked. If you want the next one, subscribe."* · **L2** (SP-09) *"The ship worked. But one ship was carrying the whole system around her."* (C-11 / Q-02) · **L3** (SP-09, optional) *"Subscribe for the next case."*

### SP-01 — G1 The ship that worked
- **Beat:** CAL-G1 (calibration sample; no beat sheet)
- **Story Function:** BREAK ASSUMPTION, NEW INFORMATION
- **Claim:** First nuclear-powered merchant ship that worked; nineteen voyages in the first three commercial years (10 Mediterranean, 7 Northern Europe, 2 Far East); operators called her the most reliable ship (NPS).
- **Evidence Anchor:** C-30, C-14, C-44, C-36, Q-06, V-05
- **Presentation Visual:** The real 1962 photograph becomes a living scene with true depth, and then the ship's own hull outline becomes the marker that fills the regions she sailed to.
- **Visual Idea:** The photograph is separated into sky, bridge, ship and water; the camera starts on the static steel mass of the bridge and moves laterally until the ship in service is revealed underneath, without any object in the photo being displaced; on "And she worked." the move stops and holds; the hull contour is traced once in Atomic Teal, lifts off the photograph and lands on a quiet Atlantic map where three destination regions fill in turn with their GAO counts and a small counter settles on 19.
- **Motion / Spatial Behaviour:** reveal (lateral move uncovers the ship), transformation (hull contour → map marker), progression (regions fill in sequence); hold on "And she worked."
- **Transition Logic:** Object Carry — the contour is the bridge from archive to map; the marker then slides toward the paper world of SP-02.
- **Sound Role:** Narration leads over a restrained bed; one short low reveal texture as the ship appears; a breath after "And she worked."
- **UI Role:** label — `AEC / NATIONAL ARCHIVES · 1962`, `GAO · 1970` on the counts, `NPS` on the operators line; no quote text on screen.
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION (Photo: AEC / National Archives) — READY; V-28 public domain (Natural Earth) — READY; V-29 public domain (Natural Earth) — READY; OG-01 own graphic — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter commercial license) — READY; OG-10 own texture — TO_PRODUCE; M-01 music bed (Audio Library, rights row after download) — NEEDS_SOURCE
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
- **Sound Role:** Bed withdraws as the phrase lifts; the question is spoken into near silence (first reserved silence).
- **UI Role:** highlight + source clarity — one amber line; `EVIDENCE 01 · GAO B-136209 · 1970` mapped to C-04 / Q-01.
- **Rights / Asset Readiness:** V-03 public domain (GAO, not copyrighted) — READY; V-02 public domain (GAO) — READY; OG-02 own graphic — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01 music bed (Audio Library) — NEEDS_SOURCE
- **Anti-PowerPoint:** A slide could show the page and highlight the sentence; here the document's own words physically leave the page and become an open gap the viewer wants closed, which turns evidence into the question.
- **Tool:** Page images rendered from the PDF with `production/tools/pdf/pdf-to-png.ps1` (pixels verbatim) + After Effects 3D paper layers and camera; bracket as own vector (Illustrator → AE).

### SP-03 — I-A CASE INTRO (CASE 001 payload)
- **Beat:** CAL-I-A
- **Story Function:** CONNECT IDEAS
- **Claim:** none — framing beat
- **Evidence Anchor:** none — framing beat
- **Presentation Visual:** The question's open bracket becomes a single hairline that scans and registers the Savannah hull into the casebook, indexes CASE 001 and the title on the line, and then hands the line to the first evidence item.
- **Visual Idea:** Carry-in: the bracket flattens into the Case Line without a cut or blackout while the world behind softens in depth; Registration: the line passes along the hull like a section slit, the hull sharp and in natural colour inside the slit, then the slit opens to the whole isolated hull; Index: `CASE 001` settles at the left end in Plex Mono like a mechanical counter while `NS SAVANNAH` rises from below the line in Plex Sans Condensed; Motif: one thin orbit arc from 1960s technical drawing passes once in Atomic Teal; Release: title and number retract into the line, the hull recedes into its world and the line stays to become the underline of the first cost line in SP-04.
- **Motion / Spatial Behaviour:** transformation (bracket → Case Line → evidence underline), reveal (slit registration), progression (number settles, title rises).
- **Transition Logic:** Starts from SP-02's visual result and ends as SP-04's first visual element, so the open question is carried through the intro.
- **Sound Role:** No narration; the music bed continues; intro texture candidate S-1 (OG-08) and S-2 (OG-09) rendered as two variants of the same picture.
- **UI Role:** label — case number and title only; no channel logo card, no full-screen title, channel name at most as a micro line.
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION (hull isolated from the photograph) — READY; OG-05 own motion design — TO_PRODUCE; OG-08 own texture — TO_PRODUCE; OG-09 own texture — TO_PRODUCE; M-01 music bed (Audio Library) — NEEDS_SOURCE
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
- **Sound Role:** Narration over the returning bed; a very light paper texture only as each bracket draws.
- **UI Role:** highlight (one amber line at a time) + source clarity (`GAO · Summary p.2`).
- **Rights / Asset Readiness:** V-01 public domain (GAO) — READY; OG-02 own graphic — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; OG-10 own texture — TO_PRODUCE; M-01 music bed (Audio Library) — NEEDS_SOURCE
- **Anti-PowerPoint:** A slide would bullet three costs; here the page itself produces proportional objects beside the question's gap, so the viewer sees which line matters before being told.
- **Tool:** After Effects (page-to-block transformation) with own vectors.

### SP-05 — G3 The system on the shore
- **Beat:** CAL-G3
- **Story Function:** EXPLAIN SYSTEM, SHOW SCALE
- **Claim:** A nuclear servicing facility in Galveston with a pier, a spent-fuel pool, the Atomic Servant barge, a spare reactor core and one 75-ton portal crane cost about $1.16 million a year, all of it carried by one ship.
- **Evidence Anchor:** C-31, C-10, C-11, Q-02, V-13
- **Presentation Visual:** The cost block becomes a place: on it the facility's ledger components are drawn as an orthographic component sheet around one empty berth, so the viewer understands the facility as a system serving a single ship.
- **Visual Idea:** The base line becomes a Texas coastline and a short map descent reaches Galveston at city level only; the third cost block lands and becomes a ground plate; in a locked frame the components draw in sync with the narration as a component sheet, not a site plan, each with a Plex Mono label, the 75-TON PORTAL CRANE drawn once with its label and no narration; all components face an empty berth outline at the centre; the cost figure appears small with its source mark; the sheet carries DIAGRAM · NOT TO SCALE.
- **Motion / Spatial Behaviour:** transformation (block → ground plate), mechanism (components assemble around the berth), spatial relationship (everything faces one slot); locked frame because the content moves.
- **Transition Logic:** Base line → coastline → ground plate; the empty berth carries into SP-06.
- **Sound Role:** Narration and bed; no sound per component; one low mechanical texture when the plate lands.
- **UI Role:** label — component names, `GALVESTON`, `GAO · p.15`, `DIAGRAM · NOT TO SCALE`.
- **Rights / Asset Readiness:** V-13 public domain (GAO) — READY; V-28 public domain (Natural Earth) — READY; V-29 public domain (Natural Earth) — READY; OG-03 own diagram — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; OG-10 own texture — TO_PRODUCE; M-01 music bed (Audio Library) — NEEDS_SOURCE
- **Anti-PowerPoint:** A slide would line up five icons; here the money becomes a place and the components are built around a visibly empty slot, so the system is understood as space and purpose rather than a list.
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
- **Rights / Asset Readiness:** V-28 public domain (Natural Earth) — READY; V-29 public domain (Natural Earth) — READY; OG-03 own diagram — TO_PRODUCE; OG-04 own graphic — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01 music bed (Audio Library) — NEEDS_SOURCE
- **Anti-PowerPoint:** A slide would show a photo and "1967–1968"; here emptiness is the subject and the direction of movement reverses on screen, so the viewer grasps the consequence before anyone states it.
- **Tool:** After Effects reusing the SP-05 drawing; route inset as Remotion primitive; no new assets.

### SP-07 — I-B CASE INTRO (demo payload J40)
- **Beat:** CAL-I-B
- **Story Function:** CONNECT IDEAS
- **Claim:** none — framing beat
- **Evidence Anchor:** none — framing beat
- **Presentation Visual:** The same skeleton registers a different object: a line runs along the J40 engine's long axis, opens it stage by stage and indexes a placeholder case number and the title, proving the intro adapts without being copied.
- **Visual Idea:** From the horizon line of the archival test-stand frame the Case Line forms; it travels along the engine's axis like a section slit, revealing the isolated engine in its natural greyscale; `CASE 00X` settles in Plex Mono and `WESTINGHOUSE J40` rises from the line; a single pass of compressor-stage tick marks is drawn in a cool demo accent that differs from Atomic Teal and amber; the composition holds on the title because this is a context-free payload test.
- **Motion / Spatial Behaviour:** reveal (axial slit registration), progression (number and title settle), transformation (horizon → Case Line).
- **Transition Logic:** Standalone payload test; the same registration is reused in SP-09.
- **Sound Role:** Music bed with the same intro texture variants S-1 / S-2 as SP-03.
- **UI Role:** label — placeholder number and title only.
- **Rights / Asset Readiness:** V-90 public domain (NASA), CLEAR_WITH_ATTRIBUTION (NASA, engine only, researcher not used) — READY; OG-05 own motion design — TO_PRODUCE; OG-08 own texture — TO_PRODUCE; OG-09 own texture — TO_PRODUCE
- **Anti-PowerPoint:** A slide template would repeat the same title card with a new photo; here the line follows the new object's own axis and opens it stage by stage, so the identity is a behaviour, not a template.
- **Tool:** After Effects master (same comp as SP-03 with payload slots) + Photoshop engine isolation.

### SP-08 — C1 CTA / Subscribe motion reference
- **Beat:** CAL-C1
- **Story Function:** CONNECT IDEAS
- **Claim:** none — framing beat
- **Evidence Anchor:** none — framing beat
- **Presentation Visual:** Right after the three blocks settle, a short Case Line appears at the lower edge away from the subject, one small Plex Mono tag slides out while the identity line is spoken, and everything retracts so the scene continues.
- **Visual Idea:** The SP-04 composition keeps playing untouched; a short Case Line draws in the lower safe area; a single tag reads an example text such as NEXT CASE · SUBSCRIBE; it holds only while L1 is spoken, then slides back into the line and the line disappears while the story resumes from where it was.
- **Motion / Spatial Behaviour:** reveal and retract of one small element; the background scene holds its own motion.
- **Transition Logic:** Inserted after SP-04's payoff moment and returns directly into SP-05.
- **Sound Role:** Narration only (L1); the bed neither dips nor swells, so it never feels like an ad break.
- **UI Role:** guide — one small tag; no button, bell, cursor, popup or lower-third template.
- **Rights / Asset Readiness:** AI-03 ai-generated-own (ElevenLabs Starter, within D-048 cap) — TO_PRODUCE; OG-06 own motion design — TO_PRODUCE; M-01 music bed (Audio Library) — NEEDS_SOURCE
- **Anti-PowerPoint:** A template CTA would cover the frame with a red button; here the request speaks the channel's own grammar after a real answer and returns to the story within moments.
- **Tool:** After Effects (same Case Line as the intro).

### SP-09 — E1 End-screen / NEXT CASE continuation (modular)
- **Beat:** CAL-E1
- **Story Function:** PAYOFF, CONNECT IDEAS
- **Claim:** One ship was carrying the whole system around her.
- **Evidence Anchor:** C-11, Q-02, C-06
- **Presentation Visual:** The payoff image becomes a simple schema, the Case Line leaves it, the outgoing ship marker lifts away, and the same line registers the next case's hero object before the frame settles into a calm end-screen-aware layout.
- **Visual Idea:** SP-06's facility with its empty berth returns while SP-02's gap now fills largely with the three blocks, leaving the remaining share unlabelled; L2 is spoken as the camera pulls back to a schema of one object with a system around it; the Case Line exits that schema, the Savannah marker lifts from the berth, and the line registers the demo payload engine with `CASE 00X · WESTINGHOUSE J40`; the composition settles leaving empty, Case-Line-framed areas where platform end-screen elements will appear, with no fake buttons drawn; optional L3 last.
- **Motion / Spatial Behaviour:** transformation (payoff → schema → next registration), reveal (next object), hold for the end-screen layout.
- **Transition Logic:** The outgoing case's final visual result becomes the line that registers the next case; the NEXT CASE payload (hero object, title, number, motif, accent) is a variable slot filled at publish time.
- **Sound Role:** Narration (L2, optional L3) over a resolving bed; the intro texture variant chosen for SP-03 at the registration.
- **UI Role:** label + guide — next-case index and the framed empty end-screen areas only.
- **Rights / Asset Readiness:** V-90 public domain (NASA), CLEAR_WITH_ATTRIBUTION — READY; OG-02 own graphic — TO_PRODUCE; OG-03 own diagram — TO_PRODUCE; OG-05 own motion design — TO_PRODUCE; OG-07 own motion design — TO_PRODUCE; AI-03 ai-generated-own (ElevenLabs Starter, within D-048 cap) — TO_PRODUCE; M-01 music bed (Audio Library) — NEEDS_SOURCE
- **Anti-PowerPoint:** A generic end card pastes thumbnails over black; here the story's last image carries the viewer into the next object through the same line, so continuation is the narrative's own movement.
- **Tool:** After Effects reusing the intro master and the SP-05 drawing.

### SP-10 — AR1 Anti-reference: photo + slow zoom + text
- **Beat:** CAL-AR1 (paired with SP-01; same VO-A and bed)
- **Story Function:** BREAK ASSUMPTION (intentionally weak treatment)
- **Claim:** Same as SP-01.
- **Evidence Anchor:** C-30, C-14, C-36, Q-06, V-05
- **Presentation Visual:** Deliberately weak: the full-frame photograph with an aimless slow zoom, a dark full-screen text card with the voyage count, a crossfade to another ship photo and a second text card.
- **Visual Idea:** V-05 full frame with a slow zoom that has no target; a crossfade to a dark-blue card reading 19 VOYAGES; a crossfade to the launch photograph that literally illustrates the word ship; a card reading MOST RELIABLE SHIP; corner tag ANTI-REFERENCE · INTERNAL throughout.
- **Motion / Spatial Behaviour:** none — reason: the slow zoom is intentionally purposeless to show the failure; nothing carries information.
- **Transition Logic:** Default crossfades with no meaning (intentional failure).
- **Sound Role:** Identical to SP-01 so only the picture differs.
- **UI Role:** label — oversized text cards (intentional failure) + internal tag.
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION — READY; V-07 public domain (MARAD) — READY; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01 music bed (Audio Library) — NEEDS_SOURCE
- **Anti-PowerPoint:** Intentionally fails the test: this is exactly what a few PowerPoint transitions produce, shown so the pair with SP-01 makes the difference visible.
- **Tool:** Premiere default zoom and crossfade presets; deliberately low effort.

### SP-11 — AR2 Anti-reference: PDF + highlight + cut, dossier cards, UI clutter
- **Beat:** CAL-AR2 (paired with SP-02 / SP-04; same VO-B and VO-C)
- **Story Function:** BRING EVIDENCE (intentionally weak treatment)
- **Claim:** Same as SP-02 and SP-04.
- **Evidence Anchor:** C-04, Q-01, C-06, C-08, C-09, C-10, V-02, V-01
- **Presentation Visual:** Deliberately weak: a flat full-screen PDF page, a yellow highlighter swipe, a hard cut to a dark dossier card cluttered with labels, grid and metadata, then three bullet cards.
- **Visual Idea:** The summary page flat and full screen; a yellow swipe across the sentence; a hard cut to a dark card reading about 2 million a year with EVIDENCE 01, CASE 001, grid lines, a timestamp and coordinate decoration; three bullet cards slide in for the cost lines; corner tag ANTI-REFERENCE · INTERNAL; no number differs from the document.
- **Motion / Spatial Behaviour:** none — reason: slide-ins and the swipe are intentionally decorative to show the failure.
- **Transition Logic:** Hard cuts and slide-ins with no relation between ideas (intentional failure).
- **Sound Role:** Identical to the paired golden samples.
- **UI Role:** label — UI-dominant clutter (intentional failure) + internal tag.
- **Rights / Asset Readiness:** V-02 public domain (GAO) — READY; V-01 public domain (GAO) — READY; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01 music bed (Audio Library) — NEEDS_SOURCE
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
- **Rights / Asset Readiness:** V-13 public domain (GAO) — READY; V-07 public domain (MARAD) — READY; V-24 public domain (MARAD) — READY; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01 music bed (Audio Library) — NEEDS_SOURCE
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
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION — READY; V-19 CC0 (Nationaal Archief) — READY; V-07 public domain (MARAD) — READY; V-24 public domain (MARAD) — READY; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01 music bed (Audio Library) — NEEDS_SOURCE
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
- **Rights / Asset Readiness:** OG-05 own motion design (anti variant) — TO_PRODUCE; OG-10 own texture (anti variant) — TO_PRODUCE
- **Anti-PowerPoint:** Intentionally fails the test: an ad-break logo intro and a template CTA, so the pairs with SP-03 and SP-08 show why the channel avoids them.
- **Tool:** After Effects presets; deliberately low effort.

## Scene progression
Reel A (viewing order, not P3 structure): SP-01 → SP-02 → SP-03 → SP-04. Reel B: SP-04 → SP-05 → SP-06. Separate clips: SP-03 + SP-07 (recognition), SP-03 with S-1 / S-2, SP-08, SP-09, and pairs SP-10|SP-01, SP-11|SP-02+SP-04, SP-12|SP-05, SP-13|SP-06, SP-14. Each golden scene starts from the previous scene's visual result.

## Diagnostics (DIAGNOSTIC, not targets)
Literal scenes: none in golden samples · tool mix: After Effects in most scenes, Remotion for map data, Photoshop/Illustrator for preparation; watch for a one-tool look · silence used twice by design · measured lengths (intro, reels, CTA hold) reported in the delivery report, not judged by a number.

## Asset status & Founder actions
READY (existing Strong PC files; full SHA-256 / durations come from a Strong PC observation run): V-05, V-19, V-07, V-24, V-28, V-29, GAO PDF (V-01/V-02/V-03/V-13), AI-01, AI-02 · READY with full hash on Main PC: V-90 (downloaded by Strong PC from the NASA URL, verified by hash) · TO_PRODUCE: OG-01…OG-10, AI-03 (≤150 credits, D-048) · **NEEDS_SOURCE: M-01 music bed → Founder GUIDED ACTION** (YouTube Audio Library). HARD STOP: nothing goes to Strong PC production until the handoff is ISSUED (Stage 4).
Final creative PASS for renders comes from the independent evaluator, not from this session or Strong PC.
