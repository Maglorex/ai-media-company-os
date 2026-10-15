# CAL-S5 — Delivery report (technical QA) v1

> handoff: CAL-S5-HO@v2 · producer: Strong PC (production-engineer, DESKTOP-KVLH9B2) · date: 2026-10-15 · preflight: READY_FOR_PRODUCTION at f8ff8d0
> Lint: `node os/factory/factory.mjs lint delivery channels/the-industrial-casebook/cases/CAL-S5/08-delivery-report-v1.md --manifest channels/the-industrial-casebook/cases/CAL-S5/handoff/asset-manifest.csv`. Bu rapor creative karar vermez.
> Scope kept: calibration samples SP-01…SP-14 only. No P3 production, no publish, no Golden Lock, no music or texture selection, no push, no merge.

## Technical QA
- **Version:** PASS — preflight `READY_FOR_PRODUCTION` on branch os-v2-migration, HEAD f8ff8d0 (required_commit 70c4e0f is an ancestor), clean tree, os/VERSION 2.0.0-stage5, handoff CAL-S5-HO@v2 ACTIVE/ISSUED, scene plan CALS5-SP-V4 (ACTIVE) and QA v4 PASS pinned by blob. Only non-blocking notes at boot: AI-01 / AI-02 had no backup (resolved before production, see Backup).
- **Assets:** PASS — every input is a manifest REQUIRED asset; files copied verbatim into the render public dir by `stage.ps1` and their SHA-256 re-verified after the copy (V-05, V-07, V-19, V-24, V-28, V-29, V-90, AI-01 identical to the manifest). GAO pages (V-03 PDF p.1, V-02 p.5, V-01 p.6, V-13 p.19) rendered with `production/tools/pdf/pdf-to-png.ps1` at 2400 px, pixels verbatim; PDF hash = manifest. No QUARANTINED / REJECTED asset (V-20, V-21) used; nothing imported from `production/remotion/src/videos/p3/`; no substitution. Produced: AI-03 `CAL-S5/03_vo/CAL_VO_copy_v1.mp3` sha256 f7ff8405c08a489b0457fb2b92d90a8ef0e981c94444a8b3768c0fdaddcf7420; OG-08 c87118f4ac0f39c867f889a9ad5a74eb3f0d6e2a98d845879baf99c5d3476602; OG-09 48062b785ef9c7d82732db20024ef08ad4448c4ed15364b19fdb8c284da01e8a; OG-10 75532421db0a1375e4f13ee29ce028c4a3694bcddf489c695b3354f923e18bf5 (own synthesis, `05_projects/synth.mjs`, no samples). OG-01…OG-07 and OG-11 are produced as code-native elements of the scene compositions (`production/remotion/src/calibration/`), not as separate .mov / .aep files (see Tool changes).
- **Rights:** PASS — all external / AI assets are CLEAR in `rights-ledger.csv`; attribution delivered by a one-line credit card at the end of every review file and in `07_review/00_OKU_BENI.txt` (V-05 "Photo: AEC / National Archives", V-90 "NASA", no NASA logo, no endorsement implied; the researcher in V-90 is outside every frame by mask). Music: YouTube Audio Library, cut / faded / level-matched only (no pitch or tempo change, not redistributed separately). AI narration disclosed on the credit cards. Anti-references are tagged ANTI-REFERENCE · INTERNAL for their full duration and use built-in shapes only (no stock, no YouTube logo).
- **Render validity:** PASS — all 11 review videos decode completely with the bundled ffprobe (`-count_frames`): 0 errors, H.264 1920×1080 30 fps + AAC 48 kHz stereo in every file.
- **Missing files/frames:** PASS — decoded video frame counts equal the composition durations exactly: 01 = 1620, 02 = 1440, 03 = 1092, 04 = 642, 05 = 5208, 06 = 375, 07 = 2202, 09 M01–M04 = 1620 each; all 12 package files present (00 … 09).
- **Captions:** N/A — internal calibration review copies; captions are not in the handoff scope (pre-publish matter).
- **Measurable audio:** PASS — per file after the fixed master gain (integrated LUFS / true peak dBTP): 01 −16.07 / −1.60 · 02 −16.53 / −1.01 · 03 −23.72 / −8.51 · 04 −23.87 / −9.37 · 05 −17.03 / −1.00 · 06 −13.01 / −1.00 · 07 −17.40 / −2.09 · 09 M01 −15.99 / −1.62 · M02 −15.85 / −0.71 · M03 −15.90 / −1.58 · M04 −15.58 / −1.63. Master gain +8 dB on every file, lowered only where the peak would pass −1 dBTP (02 +7.09, 05 +6.69, 06 −0.65); the four 09 files share exactly +8 dB so the music comparison is not biased (M02 peak −0.71 dBTP, no clipping). Music candidates level-matched before mixing (two-pass loudnorm to −23 LUFS integrated; measured raw M-01 −14.09, M-02 −11.76, M-03 −14.01, M-04 −12.73) and sit at the same bed gain under narration. Textures S-1 / S-2 matched to ≈ −32 LUFS each (measured −20.7 / −23.4 LUFS raw). 03 / 04 are quiet by design (no narration). AI-03: 243 characters, 16.67 s, 159 wpm, −24.41 LUFS / −7.30 dBTP; the script's QA flag "no silence after the last word" was measured: speech ends 16.35 s and 0.28 s of silence (−50 dB) follows to the file end — not truncated (threshold 0.30 s). Ear checks (naturalness, balance) stay with the Founder.
- **Resolution:** PASS — 1920×1080 in every file; pixel format yuvj420p (full range, as written by Remotion's encoder), plays on desktop and mobile players.
- **Technical delivery:** PASS — package at Strong PC `D:\CompanyOS-Production\CAL-S5\07_review\` with the names of `calibration/05-production-plan-and-preview.md` §6 plus `09_MUZIK_karsilastirma_M01…M04.mp4` (scene plan v4); 09 = one picture render (`06_renders/REVIEW-09-ReelA-picture.mp4`, sha256 8656bf62325d93dc2e8142971a3e9c0407a7625bef145bac5a9438eb9de2350a) stream-copied with four audio mixes identical except the bed.
- **Backup:** PASS — before production the canonical `production/tools/backup/backup-production.ps1` copied `P3-ns-savannah/03_vo/prototype-v2`; AI-01 8a7712b6…0d287ca914 and AI-02 b07bdeb6…b60db07e8 source = backup = manifest (full SHA-256). After production the same script backed up `CAL-S5/03_vo` (AI-03 identical), and the produced `04_sfx`, `05_projects` (scripts + staging) and `07_review` were copied to `C:\CompanyOS-Backup\CAL-S5\` with the same robocopy method (no delete): 22 / 22 produced files verified hash-identical. `factory.mjs backup` UNPROTECTED in CAL-S5: `00_rights-proof/R1–R4.png` (Founder-placed evidence, not produced here) and `06_renders/*` (raw intermediates, regenerable from code; delivered copies are protected). Same-machine copy only; off-machine backup decision stays open (current-state §6).
- **Technical verdict:** PASS
- **Creative QA:** PENDING_INDEPENDENT

## Scenes
- **SP-01:** MICRO — framing: V-05 shows the bridge steel only as a small corner (x 1726–1906, y 1402–1574), so the opening frame starts tight on that corner over water and the move is a tilt/pan up-left to the ship; depth comes from the near-plane steel layer moving 1.35× and leaving frame first, with neutral water texture (same photo, 300 px to the left) under its original position; ship, hills and water stay one plane, no pixel invented. Hull contour marker 140 px on the map.
- **SP-02:** MICRO — timing: Evidence Pull, amber line and open gap timed to AI-02 word times ("about" 20.75 s); colour match: the receded page is darkened further so the gap labels stay legible.
- **SP-03:** MICRO — layer order: after the slit opens the Case Line descends to sit under the levelled hull as its base and the number + title hang from it, so the hero object is never covered; the line takes the ink colour when it lands on the white page as SP-04's first underline.
- **SP-04:** MICRO — layer order: the rest of the page recedes under an ink panel so the three blocks and the still-open (unscaled) gap read clearly beside the three cost lines.
- **SP-05:** AS_PLANNED
- **SP-06:** MICRO — framing: the facility inset on the coastline map is shown at 24 % scale so it reads as the same sheet.
- **SP-07:** MICRO — framing: the Case Line forms on the test-section plate edge in the upright photo, then the camera rolls −93.8° so the engine axis lies on the horizontal line for the stage-by-stage registration; the researcher and the caption are outside every frame.
- **SP-08:** AS_PLANNED
- **SP-09:** AS_PLANNED
- **SP-10:** AS_PLANNED
- **SP-11:** AS_PLANNED
- **SP-12:** AS_PLANNED
- **SP-13:** AS_PLANNED
- **SP-14:** AS_PLANNED

## Assets used
- V-05
- V-19
- V-07
- V-24
- V-28
- V-29
- V-03
- V-02
- V-01
- V-13
- V-90
- AI-01
- AI-02
- AI-03
- M-01
- M-02
- M-03
- M-04
- OG-01
- OG-02
- OG-03
- OG-04
- OG-05
- OG-06
- OG-07
- OG-08
- OG-09
- OG-10
- OG-11

## Tool changes
- SP-01–SP-09: After Effects / Photoshop / Illustrator → Remotion 4.0.529 (React/SVG/CSS, code in `production/remotion/src/calibration/`) · reason: cost-complexity — one deterministic, versioned, re-renderable route on the Strong PC for all eleven review files and the four-way music mix; masks drawn from measured pixel coordinates; the CASE INTRO implementation route stays open until Golden Lock as the scene plan says · intent: preserved
- SP-10–SP-14: Premiere / After Effects presets → Remotion default-style presets (crossfade, slide-in, bounce, wipe, dip-to-white) · reason: cost-complexity · intent: preserved
- Sound: Premiere mix → Remotion audio + bundled FFmpeg (loudnorm level match, fixed master gain) · reason: accuracy — measurable, identical mix behaviour across the four music variants · intent: preserved
- OG-08 / OG-09 / OG-10: own synthesis with a dependency-free Node script (`05_projects/synth.mjs`) instead of recorded foley · reason: rights — no third-party samples · intent: preserved

## Outputs
- `07_review/00_OKU_BENI.txt` · Strong PC `D:\CompanyOS-Production\CAL-S5\07_review\` · Founder reading guide (Turkish), credits
- `01_REEL_A_acilis.mp4` · 54.06 s · 1920×1080 · bed M-01 · sha256 0fcff2178f6a7e05e4b8fb6a371a4a11ad90339bd4f42c4937ea5dd32cf0aa95 · G1 → G2a → I-A → G2b (I-A without texture: no pre-selection)
- `02_REEL_B_sorusturma.mp4` · 48.06 s · 1920×1080 · bed M-02 · sha256 2cb905d2faef401f6fc37c651b3b9f75ae8ca2344055894168aa1ee30e089a1f · G2b → G3 → G4
- `03_INTRO_tanima.mp4` · 36.46 s · 1920×1080 · bed M-03 · sha256 6f39050bbe815ebea8d37263c0398a015064df2ad0d6f55692b1ba73e98dd58c · I-A + I-B with S-1, then with S-2
- `04_INTRO_ses_S1_S2.mp4` · 21.46 s · 1920×1080 · bed M-03 · sha256 a6ca75ac8967d3945db4e0e57bef580cea89236938917a23fa6326aa3976534e · same I-A, S-1 then S-2
- `05_CIFTLER_iyi_kotu.mp4` · 2:53.65 · 1920×1080 · sha256 14afed394fbdfe25b2e48d6def8dfe3372406f9be5aac6b295e4b6e59a16f01b · AR1|G1 (M-03) · AR2|G2a+G2b (M-04) · AR3|G3 (M-01) · AR4|G4 (M-02); anti first, same narration and bed on both sides
- `06_ANTI_intro_cta.mp4` · 12.54 s · 1920×1080 · own textures only · sha256 7fef66eec071da1b1fbdcef024169671f61398f202ab191f72055b13bb29aab1
- `07_CTA_ve_final.mp4` · 1:13.45 · 1920×1080 · bed M-04 · sha256 461ec39fff3941c805242c4855451d2ef99089c5bb6371c8291e1ac0bd0c0e0f · G3 end → C1 (L1) → G4 start, then E1 with S-1 and E1 with S-2 (L2 + optional L3)
- `08_karesayfasi.jpg` · 1920×1080 · sha256 7f25006281e9161dddb8f2ff4d6a0b8128d922c5c3b55de3de00cddf5b92a4ed · muted 4×4 contact sheet (DIAGNOSTIC input only)
- `09_MUZIK_karsilastirma_M01.mp4` · 54.00 s · sha256 a6fb6c83e4b95659c008bc9a153d7d99ee19c18094a02ef0d3239caf5873739f
- `09_MUZIK_karsilastirma_M02.mp4` · 54.00 s · sha256 69f2c67cfe40df5d2b2aaf2e24f35b663c5f057387a0784d0ef3b2aba436f107
- `09_MUZIK_karsilastirma_M03.mp4` · 54.00 s · sha256 d9b0d8cb8b9c7fff15f5368286664af2a50179a63ea69c619d1598efa8d39881
- `09_MUZIK_karsilastirma_M04.mp4` · 54.00 s · sha256 c611cbd638effb4340ef681f7545bdb5b6213bb14b82f6e51ffc04bf0f419dc4

## For Main PC (records not written by the Strong PC)
- ElevenLabs usage to log (`finance/ledgers/usage.csv`, voice ledger): 2026-10-15 · CAL-S5 AI-03 calibration copy L1+L2+L3 · Bill L. Oxley (iiidtqDt9FBdT1vfBluA) / eleven_multilingual_v2 · 243 characters · **97 credits measured** (character-cost header) · request_id oy27h5icfLRzaGKMrnRU · D-048 cap 150 → 53 left unused · no new payment. Cut list: L1 0.00–8.90 s · L2 9.60–14.34 s · L3 14.34–16.67 s.
- Manifest: AI-03 row can take sha256 f7ff8405…ddcf7420, duration 16.67 s, recoverability BACKED_UP (C:\CompanyOS-Backup\CAL-S5\03_vo); AI-01 / AI-02 can move from LOCAL_ONLY to BACKED_UP (same-disk-set copy on C:, verified).
- Observations (no creative decision taken here): V-05 contains only a small bridge-steel corner, which limits how much "bridge mass" the SP-01 opening can show; the Reel A intro runs without a texture so that neither S-1 nor S-2 is pre-selected (textures are compared in 03, 04 and 07).
