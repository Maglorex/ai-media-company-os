# CAL-S5 — Strong PC measurement report v1

> date: 2026-10-15 · author: Strong PC Claude session (DESKTOP-KVLH9B2) · request: `handoff/measurement-request-v1.md` · decision: D-048
> Repo: `os-v2-migration` @ `75bfc40` (clean tree, origin `Maglorex/ai-media-company-os`) · `node --test "os/tests/*.test.mjs"`: 88/88 pass.
> Scope: read-only measurement + V-90 download from canonical URL + music rights check from Founder's Studio screenshots. No render, no VO, no rename/move/transcode, no P3 edits, no music selection, no GOLDEN. `07-production-handoff-v1.md` stays BLOCKED; this report does not issue anything.
> **Result: READY_FOR_MAIN_PC_UPDATE** — one open item (§2): AI-01/AI-02 backup missing. M-03 identity resolved by Studio re-download (§5).

## 1. Existing assets (production_root = `D:/CompanyOS-Production`)
Method: `fileInfo()` from `os/lib/factory.mjs` (SHA-256, size, JPEG dimensions); PDF page count via Windows.Data.Pdf (same API as `production/tools/pdf/pdf-to-png.ps1`, no rendering); MP3 duration via Remotion ffprobe (`format=duration`).

| # | Asset | Path | Full SHA-256 | Bytes | Measured | Reference match |
|---|---|---|---|---|---|---|
| 1 | V-05 | `P3-ns-savannah/01_archive/photos/V-05_nara-542141_golden-gate_1962.jpg` | `a66ce07bb9a1a3fee25c7b316a9cd6d98a789fe73c415d6033082334b2990311` | 443002 | 1920×1588 | EVET |
| 2 | V-19 | `P3-ns-savannah/01_archive/photos/V-19_rotterdam_1964-09-30_cc0.jpg` | `7bc038e74d1432edb63394207ccae2d70c4c8177cd88a809b099cf0dff716cb6` | 1135428 | 1920×1907 | EVET |
| 3 | V-07 | `P3-ns-savannah/01_archive/photos/V-07_launch_marad.jpg` | `a54effc4b62760523c43bfeb48091aff0a722a4a44d361e38aeeb25658a7387f` | 56829 | 330×428 | EVET |
| 4 | V-24 | `P3-ns-savannah/01_archive/photos/V-24_fuel-element_marad-1961.jpg` | `14dc8d1f72168d2b9c1506c7048abeb372be088bedc22e94f0751932a117c2bd` | 49281 | 960×309 | EVET |
| 5 | V-28 | `P3-ns-savannah/01_archive/maps/ne_50m_admin_1_states_provinces.geojson` | `69a0e06e640b2d505858ae1cb63034e4677f3000b35a98e16312932b98c426b9` | 2325694 | — | EVET |
| 6 | V-29 | `P3-ns-savannah/01_archive/maps/ne_50m_land.geojson` | `e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b` | 1636166 | — | EVET |
| 7 | V-01/V-02/V-03/V-13 | `P3-ns-savannah/01_archive/b-136209.pdf` | `1070eb4057773a57ca8f903c6a0779cfece4cc5b3dbaced37cd96e00087936b0` | 3046181 | 38 pages (≥ 19) | EVET |
| 8 | AI-01 | `P3-ns-savannah/03_vo/prototype-v2/P3_VO_OPEN_v2_eleven_multilingual_v2.mp3` | `8a7712b63646bae9bfcf3a9d21537691a748066e6a77cc552592df0d287ca914` | 1232187 | 76.982857 s | — (no reference) |
| 9 | AI-02 | `P3-ns-savannah/03_vo/prototype-v2/P3_VO_OPEN_v2_eleven_multilingual_v2.json` | `b07bdeb69fd51c489ef7a8fd8c062337ce4c0664944fb76a4816cb1b60db07e8` | 41531 | — | — (no reference) |

## 2. AI-01 / AI-02 backup
| # | Check | Result |
|---|---|---|
| 10 | `C:/CompanyOS-Backup/` copy of `P3_VO_OPEN_v2_eleven_multilingual_v2.mp3` / `.json` | **NOT FOUND.** Backup root exists but holds only `P3-ns-savannah/03_vo/final/` (S01–S08 v1, full v1/v2) and `03_vo/tests/`; no `prototype-v2/` folder. Manifest `backup_status=BACKED_UP` for AI-01/AI-02 is **not true**. Backup layout not changed in this round. |

## 3. V-90 (J40)
| # | Asset | Path | Source | Full SHA-256 | Bytes | Measured | Match |
|---|---|---|---|---|---|---|---|
| 11 | V-90 | `CAL-S5/01_archive/grc-1951-c-28738.jpg` | `https://www.nasa.gov/wp-content/uploads/2025/05/grc-1951-c-28738.jpg` (HTTP 200, image/jpeg, downloaded 2026-10-15) | `90122879a66e71af94266ffcec191bb79b45c5b3c455bfcf7978af3ac9f5e0ff` | 734937 | 2009×2539 | EVET (hash + dimensions exact) |

## 4. Music candidates (none selected, none GOLDEN; no quality judgement)
Duration: ffprobe `format=duration`; cross-checked by full decode (`remotion ffmpeg -f null`), all 320 kb/s.

| # | Asset | Exact filename (`CAL-S5/04_music/`) | Full SHA-256 | Bytes | ffprobe (s) | Decoded | `_audio-library/` copy identical |
|---|---|---|---|---|---|---|---|
| 12 | M-01 | `Ether Oar - The Whole Other.mp3` | `8fde65ae2b09b90c2b2f4ed1215fed5ebc4d50e5754701ebd284d3b5957ff7e3` | 6386453 | 159.634286 | 02:39.60 | EVET |
| 13 | M-02 | `The Stalker - Hainbach.mp3` | `4d3b67f62049c7c42fc13b50686f758a46f7ed29be0cff2b46a14515f3ccc102` | 5522322 | 138.031020 | 02:17.99 | EVET |
| 14 | M-03 | `The Empty Moons of Jupiter - DivKid.mp3` | `41a4c81e17b35af85e89c6057e7dbd52683052d4d55f60765f5aa01613ab251d` | 7682126 | 192.026122 | 03:12.00 | EVET |
| 15 | M-04 | `Contact - The Tower of Light.mp3` | `787c818320bc283a6e6cf6721c6c2bc2ac6420c9fc1f4f2a6ae01102d210b134` | 7647645 | 191.164082 | 03:11.11 | EVET |
| 16 | master | `_audio-library/` same four names | identical SHA-256, size and duration to rows 12–15 | | | | EVET (4/4) |

## 5. Music rights R1–R4
Source: Founder's YouTube Studio → Audio Library screenshots (Turkish UI), `D:/CompanyOS-Production/CAL-S5/00_rights-proof/R1.png`…`R4.png` (2026-10-15). Claude did not log in to Studio. Values below are read from the screenshots only.

| # | Asset | Studio title | Studio artist | Studio duration | License (as shown) | Attribution | File vs Studio duration |
|---|---|---|---|---|---|---|---|
| R1 | M-01 | Ether Oar | The Whole Other | 2:39 | YouTube Ses Kitaplığı Lisansı — "para kazandığınız videolar dahil tüm videolarınızda kullanabilirsiniz" | Atıf gerekmez | consistent (2:39.60) |
| R2 | M-02 | The Stalker | Hainbach | 2:18 | YouTube Ses Kitaplığı Lisansı (same text) | Atıf gerekmez | consistent (2:17.99) |
| R3 | M-03 | The Empty Moons of Jupiter | DivKid | **3:08** | YouTube Ses Kitaplığı Lisansı (same text) | Atıf gerekmez | file 3:12.00 vs UI 3:08 — observation only; identity verified by re-download (below) |
| R4 | M-04 | Contact | The Tower of Light | 3:12 | YouTube Ses Kitaplığı Lisansı (same text) | Atıf gerekmez | consistent (3:11.11) |

Notes:
- R4 screenshot also shows a second "Contact" row (artist Causmic, Hip-Hop ve Rap); the license popup is anchored to the highlighted "The Tower of Light" row (same popup position as R1–R3). The Causmic track is not a candidate.
- Screenshots prove the Studio listing's license; they do not by themselves prove the local file is byte-identical to the Studio download. For R1, R2, R4 the durations agree within Studio's whole-second display.
- **M-03 identity — resolved (2026-10-15):** Founder re-downloaded the track directly from the verified Studio row ("The Empty Moons of Jupiter" — DivKid) → `Downloads/The Empty Moons of Jupiter - DivKid (1).mp3`: SHA-256 `41a4c81e17b35af85e89c6057e7dbd52683052d4d55f60765f5aa01613ab251d`, 7682126 bytes, ffprobe 192.026122 s, decoded 03:12.00 — **byte-identical** to `CAL-S5/04_music/` M-03 (and its `_audio-library/` copy). Asset identity verified; production file untouched. **M-03 rights: CLEAR (verified)** — YouTube Audio Library license, attribution not required. Observation (not a blocker): Studio UI lists 3:08 while the delivered file is 3:12.00; cause not determined.

## 6. Summary for Main PC
- 18 files measured; **no hash / dimension / duration mismatch** against Main PC references (rows 1–7, 11).
- V-90 acquired and verified → can move from NEEDS_SOURCE to READY on Main PC.
- M-01, M-02, M-03, M-04: rights verified — CLEAR (Audio Library license, attribution not required). M-03 identity confirmed by byte-identical Studio re-download; 3:08 UI vs 3:12 file is an observation only (§5).
- AI-01/AI-02: manifest backup claim false — run the backup script for `prototype-v2/` or correct `backup_status` on Main PC.
- Next (Main PC, per request §header): process this report → scene plan v3 (music prep + bed assignment) → independent QA → handoff v2. Nothing ISSUED here.
