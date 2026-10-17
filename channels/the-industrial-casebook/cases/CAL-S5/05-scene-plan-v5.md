# CAL-S5 — Production Scene Plan v5 (Stage 5 calibration — targeted revision after Founder review v1)

> author: COO main session (Stage 5 revision v2, 2026-10-15) · date: 2026-10-15 · status: DRAFT (independent creative QA v5 → ACTIVE) · skill: `production-scene-plan` · decision: D-048 (render + ≤150 ElevenLabs credits; 97 used in v1; v2 needs **0** new credits) · supersedes: `05-scene-plan-v4.md` · responds to: `09-founder-review-v1.md` (CAL-S5 v1 = REVISE, no Golden Lock) and `08-delivery-report-v1.md`
> inputs: `channels/the-industrial-casebook/calibration/` (Stage 5 design final: README, 01–05) · evidence: `production/pilots/2026-10-n2-pilot-test/P3-evidence-ledger.md` · rights: `channels/the-industrial-casebook/cases/CAL-S5/rights-ledger.csv` · assets: `channels/the-industrial-casebook/cases/CAL-S5/handoff/asset-manifest.csv`
> **Scope (binding for this plan):** CAL-S5 is a calibration case, not a video. P3 VO, assets and evidence are **calibration material only**; Golden Lock judges motion grammar, visual transformation quality, cinematography, sound behaviour, the CASE INTRO skeleton, CTA behaviour and NEXT CASE behaviour — **not** P3's story or opening structure. Reel order is a viewing order. J40 is a **demo NEXT CASE payload** only (`CASE 00X` placeholder). CTA lines are calibration copy, not a channel slogan. SP-10…SP-14 are **intentional anti-references** (internal, tagged on screen, never published) and are judged only on whether they show the named failure clearly and honestly.
> Evidence rule: only claims VERIFIED in the ledger appear (sentence audit: `calibration/02-golden-motion-and-anti-reference.md` §Kanıt denetimi — binding). Tool choices follow the scene (TIC-19); CASE INTRO implementation route (AE master / Remotion / hybrid) is decided **after** Golden Lock.

## Revision v2 — scope (read first)
Founder review v1 is **calibration evidence for this case, not doctrine** (`09-founder-review-v1.md`). Canon is not changed. Only the scenes the Founder must re-judge are revised; accepted material is not re-rendered for completeness.
| Kept from v1 (unchanged) | Revised in v2 | New in v2 |
|---|---|---|
| SP-02's DOCUMENT → UNDERSTANDING behaviour (verbatim phrase → open unscaled gap → three proportional blocks) · evidence audit and VO cut list · CTA C1 (SP-08) behaviour and placement · SP-06 G4 · anti-references AR1–AR5 (SP-10…SP-14) · J40 as demo payload `CASE 00X` · no Golden Lock, no music selection beyond the Founder's preferred candidates | SP-01/SP-02/SP-04 as **one continuous investigation plane** (no card sequence; paper and archive colour, not dark panels) · SP-03/SP-07 CASE INTRO: the Case Line **inspects → isolates → registers → classifies → connects**, title subordinate, hand-refined mattes · SP-05 Engineering as a **spatial system** around the real 1960 MARAD reactor cutaway (V-08) · SP-09 E1: the ending's last visual idea becomes the next hero object; no bracket/corner placeholders · **audio architecture**: one continuous M-01 bed per file | SP-15 AR6 **PREMIUM-LOOKING BUT EMPTY** (paired with revised SP-01+SP-02) · V-08 source asset · OG-12 / OG-13 refined mattes |
Preferred candidates (Founder, not GOLDEN): **S-1** intro texture, **M-01** music bed. M-02…M-04 and S-2 keep their records and are not used in v2 previews.

## Material world balance (v2)
ARCHIVE (natural photographic colour) and EVIDENCE (real paper, real ink, warm amber/brass accents) carry most of the screen time; ENGINEERING uses a light ground with steel linework and only goes dark where depth genuinely needs it; CASE LAYER stays a thin label layer. No dark navy panel behind documents or maps; no scene is turned into a CASE-LAYER card. (Brand System v1 tokens unchanged; this is a usage balance for this calibration, measured only as a DIAGNOSTIC.)

## Reel audio architecture (fixes O-1; binding for every v2 review file)
1. **One bed per file.** M-01 is decoded once to PCM and a **single uninterrupted excerpt** (one start offset, long enough for the whole file — M-01 ≈159.6 s covers Reel A ≈54 s with no loop) is placed **once** on the timeline. It is never re-instantiated per scene, never restarted, never looped, never spliced, never cut on a picture cut, and no part of the excerpt is used twice.
2. **One global gain envelope** over the whole file (not per scene): narration ducking derived from AI-02 word times with smooth attack/release (no pumping, no step changes); reserved silences are **dips of the continuing bed** (the bed keeps running underneath), never stop-and-restart; S-1 events sit above the bed and below narration.
3. **No forced sync:** the bed is not edited to scene boundaries.
4. **Technical QA (delivery report, Measurable audio — must PASS):** (a) *continuity null test* — render the bed stem with the envelope disabled (unity gain) for the whole file and null it against the source excerpt (phase-inverted sum): residual at codec noise floor for the full duration, proving no restart, splice, repeat or loop; (b) *envelope smoothness* — render the actual bed stem and scan for gain discontinuities at every scene boundary and silence edge; (c) report the excerpt's source offset and length; (d) the question "does the music feel like one uninterrupted bed?" is answered in the report and then by the Founder's ear.

## Acceptance criteria per revised preview (qualitative; bind the result regardless of tool)
- **A Reel A:** reads as one continuous investigation across one physical plane — no "next card" moment; SP-02's Document → Understanding intact; archive colour and paper dominate; audio architecture tests pass.
- **B Engineering:** a viewer can say how the elements stand and relate to one another and to one reactor; the real MARAD cutaway is visible as source material; no icon tiles, no dark UI panel; no site plan implied; labels in GAO terms.
- **C CASE INTRO:** the line's five functions are each visible; hero edges clean at full-screen 1080p (no halo, no stair-stepping); title is a subordinate label; the line ends as the evidence underline in one unbroken move; J40 shows the same behaviour on a different axis.
- **D CTA / NEXT CASE:** C1 unchanged; in E1 the ending's last visual idea becomes the next hero object through one continuous line; open space comes from composition, with no brackets or corner placeholders.
- **E Premium-but-empty pair:** AR6 looks polished but only illustrates; the revised SP-01+SP-02 shows reveal, transformation and connection with the same material and sound.

## Asset acquisition before preflight (hash-pinned, PD)
V-08 is downloaded on Strong PC from `https://commons.wikimedia.org/wiki/Special:FilePath/The_pressurized_water_reactor_of_NS_Savannah.jpg` (descriptive User-Agent without personal data) to `CAL-S5/01_archive/V-08_pwr-cutaway_marad-1960.jpg`; preflight verifies SHA-256 `d1652dde906a318264904a6dec46d7c81e411f6160d64b7a5991a2b129298118` and 931×2242 (measured on Main PC 2026-10-15). Mismatch → BLOCKED_BY_ASSET; no substitute.

## v2 preview set (only what the Founder must re-judge)
| File (`07_review_v2/`) | Contents | Bed |
|---|---|---|
| `v2-A_REEL_A.mp4` | SP-01 → SP-02 → SP-03 (S-1) → SP-04, one continuous plane | M-01, one continuous excerpt |
| `v2-B_MUHENDISLIK.mp4` | SP-04's last line → SP-05 → hold (with VO-D) | M-01, one continuous excerpt |
| `v2-C_INTRO_tanima.mp4` | SP-03 then SP-07 (`CASE 00X`) | M-01, one continuous excerpt, S-1 |
| `v2-D_CTA_ve_NEXT_CASE.mp4` | SP-05 end → C1 (SP-08, unchanged behaviour) → SP-06 start; then SP-09 E1 v2 | M-01, one continuous excerpt per file |
| `v2-E_PREMIUM_BOS_vs_GOLDEN.mp4` | SP-15 AR6, then revised SP-01 + SP-02 | M-01, same excerpt and offset on both sides |
| `v2-00_OKU_BENI.txt` · `v2-08_karesayfasi.jpg` | Turkish guide + credits · muted contact sheet (DIAGNOSTIC) | — |
Not re-rendered: Reel B, AR1–AR5 pairs, the four-way music comparison, the S-1/S-2 comparison. VO: AI-01 and AI-03 already exist — **0 new ElevenLabs credits**.


## VO cut list (AI-01 existing recording; cuts only at measured sentence boundaries; no new credits)
| Segment | Sentences used (verbatim from the recording) | Removed and why |
|---|---|---|
| VO-A (SP-01) | "The NS Savannah was the first nuclear-powered merchant ship. And she worked. In her first three commercial years, she made nineteen voyages on regular cargo routes. Her operators called her the most reliable ship they had." | — |
| VO-B (SP-02) | "Then, in 1970, federal auditors found something strange. The Savannah needed about two million dollars more in government support every year than comparable conventional freighters on the same route. Where was that money going?" | — |
| VO-C (SP-04) | "The auditors traced most of it to three lines: training a nuclear crew, keeping a nuclear staff ashore — and a third line bigger than the other two combined." | — |
| VO-D (SP-05) | "A nuclear servicing facility in Galveston, Texas. A pier. Heavy cranes. A pool for spent fuel. A servicing barge called the Atomic Servant. Even a spare reactor core. About one point one six million dollars a year." | — ("Heavy cranes." kept: E-11, read from the GAO page, records a 75-ton gantry crane and a 75-ton bridge crane) |
| VO-E (SP-06) | "And then, for two years, the Savannah didn't come back. For her 1967 and 1968 inspections, the facility's staff went to her — in New York." | "The auditors wrote that…several nuclear ships." · "There was only one." · "So why was one working ship…several?" — verbatim GAO wording for "several" not in ledger (no Q- row) |
New lines (AI-03, ≤150 credits total under D-048; text is calibration copy, not locked): **L1** (SP-08) *"Every case on this channel starts with the evidence — and ends with how the whole system really worked. If you want the next one, subscribe."* · **L2** (SP-09) *"The ship worked. But one ship was carrying the whole system around her."* (C-11 / Q-02) · **L3** (SP-09, optional) *"Subscribe for the next case."*

### SP-01 — G1 The ship that worked (v2: one continuous investigation)
- **Beat:** CAL-G1 (calibration sample; no beat sheet)
- **Story Function:** BREAK ASSUMPTION, NEW INFORMATION
- **Claim:** First nuclear-powered merchant ship that worked; nineteen voyages in the first three commercial years (10 Mediterranean, 7 Northern Europe, 2 Far East); operators called her the most reliable ship (NPS).
- **Evidence Anchor:** C-30, C-14, C-44, C-36, Q-06, V-05
- **Presentation Visual:** The real 1962 photograph is a physical print lying on one continuous investigation plane; the ship is revealed inside it, and its hull outline leaves the print to become the marker on a light chart drawn on the same plane, so archive and map are one space, not two cards.
- **Visual Idea:** v2 change — the whole of Reel A happens on one continuous spatial plane (a neutral surface, no desk props, no detective styling) that the camera travels across without cuts; the 1962 print is a physical object with its own paper edge and natural colour; inside the print the camera move reveals the ship (v1's framing note stands: V-05 holds only a small bridge corner, so depth comes from the print itself and a restrained push, never from invented pixels); on "And she worked." the move holds; the hull outline lifts off the print (refined matte, OG-12) and slides onto a light chart laid on the same plane — paper ground with steel linework, not a dark panel — where the three destination regions including the Far East fill in turn with their GAO counts and a small counter settles on 19.
- **Motion / Spatial Behaviour:** reveal (camera finds the ship in the print), transformation (hull outline → chart marker), spatial relationship (print and chart share one plane), progression (regions fill). Archive integrity rule: no ship or hull detail invented; hidden hull parts never completed; the matte keeps only visible pixels.
- **Transition Logic:** Object Carry across one plane — the marker travels on the chart toward the 1970 report that already lies further along the same surface (SP-02); no card change, no dissolve.
- **Sound Role:** Narration leads; M-01 bed begins here as the start of the single continuous bed for the whole reel (see Reel audio architecture); one short low reveal texture as the ship appears.
- **UI Role:** label — `AEC / NATIONAL ARCHIVES · 1962`, `GAO · 1970` on the counts, `NPS` on the operators line; no quote text on screen.
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION (Photo: AEC / National Archives) — READY; V-28 public domain (Natural Earth) — READY; V-29 public domain (Natural Earth) — READY; OG-01 own graphic (light chart) — TO_PRODUCE; OG-12 own refined hull matte derived from V-05 (public domain, covered by its CLEAR_WITH_ATTRIBUTION row) — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter commercial license) — READY; OG-10 own texture — TO_PRODUCE; M-01 music bed (preferred candidate, not GOLDEN), YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide can zoom into a photo and type "19 voyages"; here the print, the chart and the next document are one physical space the camera moves through, and the hull itself becomes the marker, which a few transitions cannot approximate.
- **Tool:** Photoshop (refined hull matte by hand, natural colour) + layered 2.5D camera move over physical-material layers (After Effects, or Remotion only if the same material depth and edge quality are achieved); chart data as a deterministic map primitive. Acceptance criteria below bind the result regardless of tool.

### SP-02 — G2a The audit's gap (v2: same Document → Understanding, on the continuous plane)
- **Beat:** CAL-G2a
- **Story Function:** NEW CURIOSITY, BRING EVIDENCE
- **Claim:** In 1970 auditors found the Savannah needed about $2 million a year more than the average operating subsidy for comparable conventional ships on the same route.
- **Evidence Anchor:** E-2, V-03, C-04, Q-01, V-02
- **Presentation Visual:** Preserved from v1 (Founder: strongest element): the real 1970 report is opened, the exact phrase is lifted out of the page verbatim and becomes an open, unscaled gap that the question hangs on — now on the same plane as SP-01 and in the paper world, not on a dark panel.
- **Visual Idea:** The chart marker from SP-01 reaches the real 1970 cover lying on the same surface; the camera continues (no cut) and the cover opens with true paper depth and no fake ageing; the camera pushes in to the summary sentence; the rest of the page recedes by depth and focus on its own paper — not under an ink panel — while only that sentence stays sharp; the phrase "about $2 million more a year" detaches from the page pixels and settles between two plain labels, Savannah and comparable conventional ships on the same route, as an open bracket with no bars because GAO gives no subsidy figure to scale; on the question the camera stops and the bracket stays open.
- **Motion / Spatial Behaviour:** reveal (push-in to the sentence), transformation (Evidence Pull: phrase → open gap), hold on the question.
- **Transition Logic:** The open bracket flattens into the Case Line that starts the CASE INTRO (SP-03) — still on the same plane.
- **Sound Role:** One short low reveal sound as the phrase detaches; the continuous M-01 bed **dips** (gain dip, never stopped or restarted) so the question is spoken into near silence (first reserved silence).
- **UI Role:** highlight + source clarity — one amber line; `EVIDENCE 01 · GAO B-136209 · 1970` mapped to C-04 / Q-01.
- **Rights / Asset Readiness:** V-03 public domain (GAO, not copyrighted) — READY; V-02 public domain (GAO) — READY; OG-02 own graphic — TO_PRODUCE; OG-10 own texture (reveal sound) — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01 music bed (preferred candidate, not GOLDEN), YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide could show the page and highlight the sentence; here the document's own words physically leave the page and become an open gap the viewer wants closed, which turns evidence into the question.
- **Tool:** Page images rendered from the PDF with `production/tools/pdf/pdf-to-png.ps1` (pixels verbatim); paper-depth camera move; bracket as own vector. v1's behaviour is the reference to preserve.

### SP-03 — I-A CASE INTRO (CASE 001 payload; v2: the line does the work)
- **Beat:** CAL-I-A
- **Story Function:** CONNECT IDEAS
- **Claim:** CASE 001 is a nuclear merchant ship (classification label only).
- **Evidence Anchor:** C-30, V-05
- **Presentation Visual:** The Case Line is an instrument, not a stroke: it inspects the hull, isolates it, registers it on its own base line, classifies it with a small index, and then visibly carries the investigation onto the first line of evidence — the hull stays the hero and the title never becomes a title card.
- **Visual Idea:** INSPECT — the open bracket from SP-02 flattens into a single hairline that travels to the 1962 print and runs along the hull like an inspection pass, leaving small extent ticks at bow and stern (ticks only, no dimensions); ISOLATE — behind the passing line the hull separates from the print along a hand-refined matte (OG-12) while the rest of the print drops back in depth and keeps its natural colour; REGISTER — the line settles under the hull as its base and the hull seats onto it; CLASSIFY — at the line's end a compact index sets in Plex Mono, `CASE 001 · NS SAVANNAH` with the type tag `NUCLEAR MERCHANT SHIP` (C-30), sized as a label subordinate to the hull, and one thin orbit arc passes once in Atomic Teal; CONNECT — the line releases the hull and, in one continuous visible move with no cut, travels across the plane onto the GAO summary page where it becomes the underline of the first cost line as narration resumes.
- **Motion / Spatial Behaviour:** reveal (inspection pass), transformation (bracket → instrument line → evidence underline), spatial relationship (the line physically connects the object to the evidence), progression (inspect → isolate → register → classify → connect).
- **Transition Logic:** Starts from SP-02's open bracket and ends as SP-04's first underline in one unbroken line movement, so the open question is carried through the intro and the intro becomes the investigation's first act.
- **Sound Role:** No narration; the continuous M-01 bed returns gently after SP-02's dip; S-1 (OG-08) events only on inspect, register and classify, mixed under narration priority and above the bed (narration → meaningful S-1 event → bed); never a jingle, never in front of the picture.
- **UI Role:** label — compact index and type tag only; no large title, no logo card, no channel name card.
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION (hull isolated from the print) — READY; OG-12 own refined hull matte — TO_PRODUCE; OG-05 own motion design — TO_PRODUCE; OG-08 own texture S-1 (preferred candidate, not GOLDEN) — TO_PRODUCE; M-01 music bed (preferred candidate, not GOLDEN), YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide would cut to a title card; here one line measures, separates, registers and classifies the real object and then carries the viewer to the evidence, so the identity is a working behaviour, not a card.
- **Tool:** Hero matte refined by hand in Photoshop (edge clean at full-screen 1080p, no halo, no stair-stepping); line choreography in After Effects or an equivalent route; implementation route for reuse decided after Golden Lock.

### SP-04 — G2b Three lines on a page (v2: paper world kept)
- **Beat:** CAL-G2b
- **Story Function:** BRING EVIDENCE, SHOW SCALE
- **Claim:** Most of the extra cost traced to three lines — nuclear crew training, nuclear shore staff, and a servicing facility larger than the other two combined.
- **Evidence Anchor:** C-06, C-08, C-09, C-10, V-01
- **Presentation Visual:** Preserved behaviour: the summary page's three cost lines are bracketed one at a time and each leaves a labelled block beside the open gap, the third visibly larger than the first two together — now with the page staying a paper object rather than receding under a dark panel.
- **Visual Idea:** The Case Line arrives as the underline of the first cost line on the real summary page; the three lines receive thin steel brackets in turn with amber moving to the line being spoken; the rest of the page recedes by focus and depth on its own paper; each line casts a labelled block that settles beside the still-open gap, not inside it; the third block is visibly larger than the first two combined without any total written; its underline extends and becomes the shore line where SP-05 begins.
- **Motion / Spatial Behaviour:** transformation (page lines → blocks), scale (third block against the other two), progression (one line at a time).
- **Transition Logic:** Document underline → shore line (SP-05).
- **Sound Role:** Narration over the continuous M-01 bed; a very light paper texture only as each bracket draws.
- **UI Role:** highlight (one amber line at a time) + source clarity (`GAO · Summary p.2`).
- **Rights / Asset Readiness:** V-01 public domain (GAO) — READY; OG-02 own graphic — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; OG-10 own texture — TO_PRODUCE; M-01 music bed (preferred candidate, not GOLDEN), YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide would bullet three costs; here the page itself produces proportional objects beside the question's gap, so the viewer sees which line matters before being told.
- **Tool:** Paper-depth composition (same route as SP-02).

### SP-05 — G3 The system on the shore (v2: spatial system, real engineering source)
- **Beat:** CAL-G3
- **Story Function:** EXPLAIN SYSTEM, SHOW SCALE
- **Claim:** A nuclear servicing facility in Galveston — pier and platform area, a 75-ton gantry crane, a maintenance building with a 75-ton bridge crane and a water-filled spent-fuel pit, the Atomic Servant servicing barge with its own crane and lead-lined fuel pool, and a spare reactor core — cost about $1.16 million a year, all of it carried by one ship whose reactor it existed to service.
- **Evidence Anchor:** C-31, E-11, C-42, C-10, C-11, Q-02, C-32, V-13, V-08
- **Presentation Visual:** The facility is understood as one physical system around one reactor: a real 1960 MARAD cutaway of the Savannah's pressurized water reactor (V-08) is the source plate at the centre of meaning, and the shore elements are drawn in layered depth around it, each tied by a relationship line only to the part of the reactor its own name or ledger description says it serves — a spatial system, not an icon list and not a site plan.
- **Visual Idea:** The shore line from SP-04 leads to a short city-level arrival at Galveston on the light chart, then the camera moves into the system: planes separate in depth (water plane, pier plane, building plane) like a layered engineering drawing on a light ground with steel linework; in sync with the narration the PIER and platform establish the waterline, the 75-TON GANTRY CRANE rises on the pier plane, the MAINTENANCE BUILDING opens in section to show its 75-TON BRIDGE CRANE and the water surface of the SPENT-FUEL PIT, and the ATOMIC SERVANT barge settles on the water plane in its documented 129 × 36 ft proportion with its own crane and lead-lined fuel pool shown in section (C-42); on "Even a spare reactor core." the real 1960 MARAD cutaway enters as a physical paper plate with its printed labels REACTOR CORE and FUEL ELEMENTS legible (verbatim crop, promotional caption cropped out), and thin relationship lines connect: spare reactor core ↔ REACTOR CORE, spent-fuel pit ↔ FUEL ELEMENTS, barge fuel pool ↔ FUEL ELEMENTS; the camera pulls back so the whole layered system faces one berth where the ship stands as an unscaled silhouette and the cutaway plate is linked to it by a line, never placed at a specific position inside the hull; the cost figure lands small with its source mark; the sheet carries DIAGRAM · NOT TO SCALE · NOT A SITE PLAN; the exclusion zone is not drawn.
- **Motion / Spatial Behaviour:** spatial relationship (layered planes and controlled depth show how the parts stand to each other and to one reactor), mechanism (relationship lines reveal what each part is for), reveal (section openings), scale (barge in its documented proportion; ship explicitly unscaled).
- **Transition Logic:** Shore line → Galveston → layered system; the berth with the ship silhouette carries into SP-06; C1 / SP-08 is inserted after the cost figure lands, then returns.
- **Sound Role:** Narration and the continuous M-01 bed; one low mechanical texture when the system settles; no sound per element.
- **UI Role:** label — GAO terms for each element, `GALVESTON`, `GAO · p.15`, `MARAD · 1960` on the cutaway plate, `DIAGRAM · NOT TO SCALE · NOT A SITE PLAN`; no card panels, no icon tiles.
- **Rights / Asset Readiness:** V-08 public domain (MARAD / AEC 1960, Commons PD) — READY; V-13 public domain (GAO) — READY; V-28 public domain (Natural Earth) — READY; V-29 public domain (Natural Earth) — READY; OG-03 own layered engineering drawing — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; OG-10 own texture — TO_PRODUCE; M-01 music bed (preferred candidate, not GOLDEN), YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide would line up five icons on a dark panel; here a real period engineering drawing anchors the reactor and the shore parts are seen standing in depth around it, each linked to what it serves, so the viewer understands the system's physical logic rather than reading a list.
- **Tool:** Layered 2.5D engineering drawing with real parallax between planes and section openings (After Effects, or an equivalent route that achieves the same depth and line quality); V-08 handled as a physical paper plate in its own colours; Blender still not chosen (no authoritative geometry exists).

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
- **Rights / Asset Readiness:** V-28 public domain (Natural Earth) — READY; V-29 public domain (Natural Earth) — READY; OG-03 own diagram — TO_PRODUCE; OG-04 own graphic — TO_PRODUCE; OG-10 own room tone under the silence — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01…M-04 music bed candidates, YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A slide would show a photo and "1967–1968"; here emptiness is the subject and the direction of movement reverses on screen, so the viewer grasps the consequence before anyone states it.
- **Tool:** After Effects reusing the SP-05 drawing; route inset as Remotion primitive; no new assets.

### SP-07 — I-B CASE INTRO (demo payload J40, `CASE 00X`; v2: same working line)
- **Beat:** CAL-I-B
- **Story Function:** CONNECT IDEAS
- **Claim:** none — framing beat
- **Evidence Anchor:** none — framing beat
- **Presentation Visual:** The same instrument line performs the same functions on a different object — inspects along the J40 engine's long axis, isolates it, registers it, classifies it with `CASE 00X · WESTINGHOUSE J40` and the tag `TURBOJET`, then exits toward an unseen next evidence item — proving the behaviour adapts without being copied.
- **Visual Idea:** Identity of the photograph: NASA Glenn GRC-1951-C-28738, "J40 ENGINE IN ALTITUDE WIND TUNNEL" (rights-proof §V-90). The hairline forms on a horizontal edge of the wind-tunnel frame and inspects along the engine's axis, leaving extent ticks; the engine separates on a hand-refined matte (the researcher is outside every frame); it registers on the line; the compact index and tag set as labels; evenly spaced tick marks pass once in a cool demo accent as an identity motif, not a count of real compressor stages; the line then leaves the frame as if to the next document.
- **Motion / Spatial Behaviour:** reveal (axial inspection), progression (inspect → isolate → register → classify → connect), transformation (frame edge → instrument line).
- **Transition Logic:** Standalone recognition test placed after SP-03; the same registration is reused in SP-09.
- **Sound Role:** Same continuous M-01 bed and the same S-1 events as SP-03 so both intros compare fairly.
- **UI Role:** label — placeholder number, title and tag only.
- **Rights / Asset Readiness:** V-90 public domain (NASA), CLEAR_WITH_ATTRIBUTION (NASA, engine only, researcher not used) — READY; OG-05 own motion design — TO_PRODUCE; OG-13 own refined engine matte derived from V-90 (public domain, covered by its CLEAR_WITH_ATTRIBUTION row) — TO_PRODUCE; OG-08 own texture S-1 — TO_PRODUCE; M-01 music bed (preferred candidate, not GOLDEN), YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A template would repeat a title card with a new photo; here the line follows the new object's own axis and performs the same work on it, so the identity is a behaviour, not a template.
- **Tool:** Same route as SP-03; engine matte refined by hand in Photoshop.

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

### SP-09 — E1 End-screen / NEXT CASE continuation (modular; v2: the last idea becomes the next object)
- **Beat:** CAL-E1
- **Story Function:** PAYOFF, CONNECT IDEAS
- **Claim:** One ship was carrying the whole system around her.
- **Evidence Anchor:** C-11, Q-02, C-06, C-04, C-32
- **Presentation Visual:** The ending's own last visual idea — the outline of the berth with its single ship — is traced by the Case Line, and that same continuous line reshapes into the next case's hero object outline, which then fills with the real photograph; the composition simply leaves natural open space for platform elements.
- **Visual Idea:** SP-06's facility returns; a small `AUG 1968` mark and the Savannah marker slides back into the berth (C-32); SP-02's gap reappears with its width set to about $2 million a year (C-04) on the same scale as the three blocks, which move into it and fill about $1.9 million (C-06), the remaining share visible and unlabelled; L2 is spoken; the Case Line then traces the berth-and-ship outline — the outgoing case's last visual idea — and, without breaking, the traced contour reshapes into the outline of the demo payload object (J40 engine); the engine photograph fills that outline, the compact index `CASE 00X · WESTINGHOUSE J40` sets on the line, and the camera settles with the object off-centre so the remaining frame is naturally open space for end-screen elements — no brackets, no corner marks, no framed placeholder boxes; optional L3 last.
- **Motion / Spatial Behaviour:** transformation (berth outline → next object outline → photograph), reveal (next object), hold on a composition with natural negative space.
- **Transition Logic:** Modular slot: outgoing motif = the ending's last visual idea (here the berth with one ship); incoming payload = next case hero object, title, number, motif, accent (filled at publish time with a real published case; demo here).
- **Sound Role:** Narration (L2, optional L3) over the continuous M-01 bed resolving; one S-1 event at the registration.
- **UI Role:** label — next-case index only; no decorative frame for end-screen areas.
- **Rights / Asset Readiness:** V-90 public domain (NASA), CLEAR_WITH_ATTRIBUTION — READY; OG-02 own graphic — TO_PRODUCE; OG-03 own layered engineering drawing — TO_PRODUCE; OG-05 own motion design — TO_PRODUCE; OG-07 own end composition — TO_PRODUCE; OG-08 own texture S-1 — TO_PRODUCE; OG-13 own refined engine matte — TO_PRODUCE; AI-03 ai-generated-own (ElevenLabs Starter, produced in v1) — READY; M-01 music bed (preferred candidate, not GOLDEN), YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** A generic end card pastes thumbnails over black; here the story's last image is literally redrawn into the next object by one line, so continuation is the narrative's own movement.
- **Tool:** Same route as SP-03; contour morph between two traced outlines.

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

### SP-15 — AR6 Anti-reference: PREMIUM-LOOKING BUT EMPTY (pair with revised SP-01 + SP-02)
- **Beat:** CAL-AR6 (paired with the revised SP-01 + SP-02; same VO-A + VO-B, same M-01 excerpt)
- **Story Function:** BREAK ASSUMPTION, BRING EVIDENCE (intentionally empty treatment)
- **Claim:** Same as SP-01 and SP-02.
- **Evidence Anchor:** C-30, C-14, C-36, Q-06, C-04, Q-01, V-05, V-03, V-02
- **Presentation Visual:** Deliberately attractive but creatively empty: elegant typography, smooth easing, premium colours and clean minimal UI applied to the same material, yet the sequence never goes beyond photo → zoom → text → document → transition.
- **Visual Idea:** The 1962 photograph with a smooth slow push and tasteful grain; an elegant serif headline "THE SHIP THAT WORKED" fades up over it; a refined minimal number "19" with a thin rule; a soft parallax pan over the 1970 cover; a graceful highlight sweep on the summary sentence; a polished cross-dissolve to the next element; everything is accurate and beautiful but nothing transforms, nothing is revealed that the narration has not already said, no object carries meaning to the next idea; corner tag ANTI-REFERENCE · INTERNAL throughout.
- **Motion / Spatial Behaviour:** none — reason: the smooth motion is intentionally decorative; it carries no reveal, transformation or relationship.
- **Transition Logic:** Polished dissolves and soft pushes between unrelated frames (intentional failure).
- **Sound Role:** Identical narration and the identical continuous M-01 excerpt as the revised pair so only the visual thinking differs.
- **UI Role:** label — tasteful headline and number (intentional failure) + internal tag.
- **Rights / Asset Readiness:** V-05 public domain, CLEAR_WITH_ATTRIBUTION — READY; V-03 public domain (GAO) — READY; V-02 public domain (GAO) — READY; OG-11 own anti-reference graphics (polished variant, built-in presets, no third-party stock) — TO_PRODUCE; AI-01 ai-generated-own (ElevenLabs Starter) — READY; M-01 music bed (preferred candidate, not GOLDEN), YouTube Audio Library license (CLEAR, no attribution) — READY
- **Anti-PowerPoint:** Intentionally fails the test while looking expensive: a premium slideshow is still a slideshow, shown so the system learns to reject elegant emptiness, not only obvious ugliness.
- **Tool:** Built-in easing and dissolve presets with premium typography; deliberately thin visual thinking, normal polish.

## Verified asset binding (Strong PC measurement 2026-10-15; production_root `D:/CompanyOS-Production`)
| Asset | Path | SHA-256 | Measured | Rights | Used in |
|---|---|---|---|---|---|
| V-05 | `P3-ns-savannah/01_archive/photos/V-05_nara-542141_golden-gate_1962.jpg` | `a66ce07b…b2990311` | 1920×1588 | CLEAR_WITH_ATTRIBUTION | SP-01, SP-03, SP-10, SP-13 |
| V-19 | `P3-ns-savannah/01_archive/photos/V-19_rotterdam_1964-09-30_cc0.jpg` | `7bc038e7…ff716cb6` | 1920×1907 | CLEAR (CC0) | SP-13 |
| V-07 | `P3-ns-savannah/01_archive/photos/V-07_launch_marad.jpg` | `a54effc4…58a7387f` | 330×428 | CLEAR | SP-10, SP-12, SP-13 |
| V-24 | `P3-ns-savannah/01_archive/photos/V-24_fuel-element_marad-1961.jpg` | `14dc8d1f…a117c2bd` | 960×309 | CLEAR | SP-12, SP-13 |
| V-28 / V-29 | `P3-ns-savannah/01_archive/maps/ne_50m_admin_1_states_provinces.geojson` / `ne_50m_land.geojson` | `69a0e06e…98c426b9` / `e874b27a…682f9826b` | data | CLEAR | SP-01, SP-05, SP-06 |
| V-01 / V-02 / V-03 / V-13 | `P3-ns-savannah/01_archive/b-136209.pdf` (PDF p.6 / p.5 / p.1 / p.19; 38 pages) | `1070eb40…087936b0` | page images rendered at production with `pdf-to-png.ps1` | CLEAR | SP-02, SP-04, SP-05, SP-11, SP-12 (V-13 in SP-05 and SP-12) |
| V-90 | `CAL-S5/01_archive/grc-1951-c-28738.jpg` | `90122879…ac9f5e0ff` (verified after download) | 2009×2539 | CLEAR_WITH_ATTRIBUTION | SP-07, SP-09 |
| V-08 | `CAL-S5/01_archive/V-08_pwr-cutaway_marad-1960.jpg` (downloaded before preflight) | `d1652dde…129298118` | 931×2242 | CLEAR (PD, MARAD/AEC 1960) | SP-05 |
| AI-03 | `CAL-S5/03_vo/CAL_VO_copy_v1.mp3` (produced in v1) | `f7ff8405…ddcf7420` | 16.67 s | CLEAR (ai-generated-own) | SP-08, SP-09 |
| AI-01 / AI-02 | `P3-ns-savannah/03_vo/prototype-v2/P3_VO_OPEN_v2_eleven_multilingual_v2.mp3` / `.json` | `8a7712b6…0d287ca914` / `b07bdeb6…b60db07e8` | 76.98 s | CLEAR (ai-generated-own) | VO-A…VO-E |
| M-01 | `CAL-S5/04_music/Ether Oar - The Whole Other.mp3` | `8fde65ae…b3957ff7e3` | 159.63 s | CLEAR (Audio Library, no attribution) | see music plan |
| M-02 | `CAL-S5/04_music/The Stalker - Hainbach.mp3` | `4d3b67f6…f3ccc102` | 138.03 s | CLEAR | see music plan |
| M-03 | `CAL-S5/04_music/The Empty Moons of Jupiter - DivKid.mp3` | `41a4c81e…13ab251d` | 192.03 s (Studio UI 3:08 — observation only) | CLEAR | see music plan |
| M-04 | `CAL-S5/04_music/Contact - The Tower of Light.mp3` | `787c8183…2d210b134` | 191.16 s | CLEAR | see music plan |
Full values: `handoff/asset-manifest.csv` (canonical) and `handoff/measurement-report-v1.md`. TO_PRODUCE (made on Strong PC within this plan): OG-01…OG-11, AI-03 (≤150 credits, D-048).

## Music plan (v2)
Founder's preferred candidate **M-01 (Ether Oar)** is the bed of every v2 preview file, as one continuous excerpt per file (Reel audio architecture). It is **not GOLDEN**; M-02…M-04 keep their CLEAR records and v1 comparison renders; no new comparison is produced. Recoverability: M-01…M-04 are REDOWNLOADABLE from YouTube Studio Audio Library; the `_audio-library/` copy is a convenience copy on the same disk, not a backup.

## Render / output intent
Internal 1080p review copies only — the v2 preview set above. Every file ends with its one-line credit card; AR6 carries `ANTI-REFERENCE · INTERNAL`. Nothing is published, nothing becomes P3 material. Strong PC delivers delivery report v2 (technical QA incl. the audio continuity tests, `Creative QA: PENDING_INDEPENDENT`) and a muted contact sheet; the creative verdict is the independent evaluator's, then the Founder's.

## Backup state
AI-01 / AI-02 / AI-03 and the v1 produced files were backed up on Strong PC's separate C: disk and verified hash-identical (delivery report v1, Backup). Same machine only; the off-machine backup decision remains open (current-state §6). v2 produced files follow the same rule before delivery.

## Scene progression
Reel A (viewing order, not P3 structure): SP-01 → SP-02 → SP-03 → SP-04 on one continuous plane; SP-05 continues from SP-04's last line; C1 sits after SP-05's cost figure; SP-06 unchanged; SP-09 turns the ending's last visual idea into the next object. Each golden scene starts from the previous scene's visual result. AR6 is paired with revised SP-01 + SP-02.

## Diagnostics (DIAGNOSTIC, not targets)
Literal scenes: none in golden samples · tool mix: After Effects in most scenes, Remotion for map data, Photoshop/Illustrator for preparation; watch for a one-tool look · silence used twice by design · measured lengths (intro, reels, CTA hold) reported in the delivery report, not judged by a number.

## Asset status
All required assets READY with full SHA-256 (or TO_PRODUCE under this plan); rights CLEAR for every external/AI asset; music candidates M-01…M-04 READY and CLEAR (none selected). No Founder action is required before handoff. HARD STOP remains: nothing goes to Strong PC production until the handoff is ISSUED and preflight returns READY_FOR_PRODUCTION.
Final creative PASS for renders comes from the independent evaluator, not from this session or Strong PC.
