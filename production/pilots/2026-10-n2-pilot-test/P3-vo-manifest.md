# P3 — Final voice-over manifestosu (v1)

> Üretim: 2026-10-10, render bilgisayarı · Founder onayı 2026-10-10 (tavan 4.000 kredi) · Kurallar: D-021 (anlatıcı/model), D-022 + `.claude/rules/audio-production.md`
> **Anlatıcı:** Bill L. Oxley (`iiidtqDt9FBdT1vfBluA`) · **Model:** `eleven_multilingual_v2` · **Script:** `P3-script-v2.md` v2.5 (S-bölüm VO blokları) · Üretim kopyası farkı: S04 "$2 million" → "two million dollars"
> **Konum (repo dışı):** `D:\CompanyOS-Production\P3-ns-savannah\03_vo\final\` · **Yedek:** `C:\CompanyOS-Backup\P3-ns-savannah\03_vo\final\` — 2026-10-10 SHA-256 karşılaştırması: 35/35 dosya birebir.
> **Araçlar:** `production/tools/elevenlabs/vo-segments.ps1` (segment üretimi + QA), `vo-assemble.ps1` (birleştirme). Kredi ve request_id ayrıntısı: `voice-ledger.md` #5–#12.

## Segmentler
| ID | Karakter | Ölçülen kredi | Süre (sn) | Konuşma sonu (sn) | Kelime/dk | LUFS / dBTP | QA | request_id |
|---|---|---|---|---|---|---|---|---|
| S01 | 858 | 343 | 58,41 | 57,65 | 150 | -24.43 / -5.56 | geçti | `iUoQebgy4wn4p3CwnXhi` |
| S02 | 989 | 396 | 65,62 | 64,67 | 157 | -23.76 / -5.89 | geçti | `5cAcWCFS1wVZu0jldF56` |
| S03 | 452 | 181 | 30,09 | 29,20 | 152 | -23.29 / -5.63 | geçti (uyarı: sonda kısa ses, kırpıldı) | `emMXslRaTfB5gmtZNl5q` |
| S04 | 1337 | 535 | 81,92 | 80,97 | 161 | -24.29 / -5.80 | geçti | `jX3UYNmg4NJ4TmTdKYGU` |
| S05 | 1949 | 780 | 129,75 | 128,36 | 152 | -23.00 / -4.89 | geçti (uyarı: sonda kısa ses, kırpıldı) | `ygoF2TMnz2omQ4D5jwvr` |
| S06 | 817 | 327 | 50,89 | 50,22 | 168 | -23.78 / -6.14 | geçti | `bSACYUk83nOjd0eJmcJo` |
| S07 | 698 | 279 | 40,39 | 39,83 | 172 | -23.48 / -6.81 | geçti (uyarı: sonda kısa ses, kırpıldı) | `NXOmaAwsSbIy4vy9tsTm` |
| S08 | 610 | 244 | 40,02 | 39,40 | 155 | -23.24 / -5.07 | geçti | `eBoPqK6HM7XgzKcHBYHD` |
| **Toplam** | **7.710** | **3.085** | | | ≈157 ort. | | 8/8 | |

## Birleşik dosyalar
- `P3_VO_full_v1.wav` — ham ana kopya (Premiere), 499,0 sn (8:19), −23,6 LUFS, TP −4,9 dBTP.
- `P3_VO_full_v1_LISTEN.mp3` — Founder dinleme kopyası, −16,3 LUFS, TP −1,7 dBTP.
- `P3_VO_full_v1.timing.json` — bölüm ofsetleri ve cümle başlangıç/bitişleri (edit timeline'ı buna göre kurulur). Bölüm arası 1,20 sn; kesim konuşma sonu + 0,30 sn; 30 ms fade.
- Bölüm başlangıçları (dinleme kopyasında): S1 0:00 · S2 0:59 · S3 2:05 · S4 2:35 · S5 3:57 · S6 6:07 · S7 6:58 · S8 7:39.

## Durum
- Founder kulak kontrolü: **bekleniyor** (doğallık, 7 bölüm geçişi, 4:19 civarı 1,42 sn duraklama).
- S01 için ayrı `.alignment.json` yok (eski hat); kelime/cümle zamanları `.json` içinde.

## SHA-256 (`03_vo\final`)
| Dosya | KB | SHA-256 |
|---|---|---|
| `P3_VO_full_v1.timing.json` | 35 | `D20828ACCBA030B2A788D78F996193272C0FF3A4AAB5801E25F90338780FF840` |
| `P3_VO_full_v1.wav` | 42981 | `E329A422E3BCFFD5E5B1C31F97E8AE741596345369215EA4381307B72B1575A1` |
| `P3_VO_full_v1_LISTEN.mp3` | 11697 | `E420FDC0703CC12489B6311616B6C864A1D54ACDAED58B603990872F9A3C06A6` |
| `P3_VO_S01_v1_eleven_multilingual_v2.json` | 29 | `09B9F27512F90335906F891EFEBE9EB1BF7200DB31B7D777BE321C5F3CA188AB` |
| `P3_VO_S01_v1_eleven_multilingual_v2.mp3` | 913 | `4E517B06458B7C338C27EA0CADB72AB5F8195688982CCB8CFD06609C104921E6` |
| `P3_VO_S01_v1_eleven_multilingual_v2.txt` | 1 | `85890217F1466ADDD66872525210229716A059C0ADAF4A953B11DA4467D6618C` |
| `P3_VO_S02_v1_eleven_multilingual_v2.alignment.json` | 17 | `38DBA4DD82D093B1F724C16BA68CACBBAC69334E3A71315764B6051E36370E57` |
| `P3_VO_S02_v1_eleven_multilingual_v2.json` | 32 | `722000F94554B3BED6D4399EC0312035F813631D61F343D40BE15F834658D92E` |
| `P3_VO_S02_v1_eleven_multilingual_v2.mp3` | 1026 | `8042C415BFC82A01DA6B2ACF3ABC3F2730CB507FEB9E8E16480FE47A19C6A705` |
| `P3_VO_S02_v1_eleven_multilingual_v2.txt` | 1 | `3EF93D33B986030AFE1C1D5457DBAA47CD83327047EC739C54C5026BFB35742B` |
| `P3_VO_S03_v1_eleven_multilingual_v2.alignment.json` | 8 | `067E05875A022A7D818E8AD65E4AA1291846E61E3B1B7CB3AC57DE5100489A05` |
| `P3_VO_S03_v1_eleven_multilingual_v2.json` | 16 | `7E65AA01EFEAF34F88F354D4500893FB1AF679BCBCC3E2C9DCE338E4E04E12AA` |
| `P3_VO_S03_v1_eleven_multilingual_v2.mp3` | 471 | `CFC8605F863D2E891A865826377940A983E17FFD3B82391EFE4B7E2C86CDC236` |
| `P3_VO_S03_v1_eleven_multilingual_v2.txt` | 0 | `D2AB260DD6F5E493CC8B35B8295DD20F4CC2827073C889F933CCAD4D879C4693` |
| `P3_VO_S04_v1_eleven_multilingual_v2.alignment.json` | 23 | `386622898DC6DEE4BCFA1D1089779FAADAD87AD6A7227287687732F3BB05F04A` |
| `P3_VO_S04_v1_eleven_multilingual_v2.json` | 43 | `822DBABB5DD1821C58B453D0CE8CDED5F6CBE08F336ECD4F437D5DCD757365D0` |
| `P3_VO_S04_v1_eleven_multilingual_v2.mp3` | 1280 | `B4B267EB44748722ED1948724C9106C233CA36401FC1C4AB9FE94FFBF89C8E1D` |
| `P3_VO_S04_v1_eleven_multilingual_v2.txt` | 1 | `7B0A31954E75BE96EE9A04C13C36AF442999F19083BC6FFD4CB1E1BF37CBEA80` |
| `P3_VO_S05_v1_eleven_multilingual_v2.alignment.json` | 35 | `3DF50E1B27936F9590E5082A4ABBCE5FAE23ED0AC10B753C65012F589A6EE581` |
| `P3_VO_S05_v1_eleven_multilingual_v2.json` | 63 | `3A4E0D88FFF5AD159D633BC8B0A872B83010C25FD924DC38BB44C8E85AD4391B` |
| `P3_VO_S05_v1_eleven_multilingual_v2.mp3` | 2028 | `806CB75A289EAAEDB039EE98DE759EA800FBC368EDFD4F8272F40E468431EBD7` |
| `P3_VO_S05_v1_eleven_multilingual_v2.txt` | 2 | `E234A0F8E290A0FA376BBB2C7017B557E173BF70C5A91B9A2C52189D0E414C98` |
| `P3_VO_S06_v1_eleven_multilingual_v2.alignment.json` | 14 | `E81A1E49845DCDA4162C59858C909278A198B176039A05018BC480FC8AF7033D` |
| `P3_VO_S06_v1_eleven_multilingual_v2.json` | 28 | `0F59F537E22F8D94F61ACE8B8DAE22F607EEF6CC61E4FC6B6C4A58DD247ED8BB` |
| `P3_VO_S06_v1_eleven_multilingual_v2.mp3` | 796 | `A25B0B7962C059038B7CB0A33C07818B929DC419713D34295467DB8A4A310683` |
| `P3_VO_S06_v1_eleven_multilingual_v2.txt` | 1 | `90E544451F794C41E21F0F641D208FBA19D0346DF76CC5D70B5E9FD1DAB79B0E` |
| `P3_VO_S07_v1_eleven_multilingual_v2.alignment.json` | 12 | `F340E68582DBA2ED0006AE6915BCBCAEE208EE104D36DF4E79F236C7AB4F741B` |
| `P3_VO_S07_v1_eleven_multilingual_v2.json` | 24 | `AD3792863D26A8BBEA5746AE99C818A567BE46F776CEDD487FFFE0D815FE5240` |
| `P3_VO_S07_v1_eleven_multilingual_v2.mp3` | 631 | `A0DD04D43DDC74908D9E6ED7E5DC71917E1F5F8D840CF9CDD55CE8F1EDC87C6C` |
| `P3_VO_S07_v1_eleven_multilingual_v2.txt` | 1 | `566F77BE9F93486C835ECD7D138066C86E53B8D2C2979747DA59C2BA60F40089` |
| `P3_VO_S08_v1_eleven_multilingual_v2.alignment.json` | 10 | `493B4F9CE431612582237122BAB07E04B9A3C233F6CD55BEE087614FEB5C9DF9` |
| `P3_VO_S08_v1_eleven_multilingual_v2.json` | 21 | `34F9C3E6C09A74AC40AE703807667236DAFC7C900AA6D71FA5F50C0522316CDA` |
| `P3_VO_S08_v1_eleven_multilingual_v2.mp3` | 626 | `54C2CD8BD583FEA13A2E21C2B2CCB27B78A6F3018581FA8E1F79F2432D25A234` |
| `P3_VO_S08_v1_eleven_multilingual_v2.txt` | 1 | `84A82D303FF7BF3A60FD12B2C7BDE16D35E816FE9E76E7BA3DA85C1CCCE7333D` |
| `segments.json` | 12 | `BAB5287EBB5AFC8FE5150B73058549C3FC840E4B8287DE3BFE3C9F85CD79E4B0` |