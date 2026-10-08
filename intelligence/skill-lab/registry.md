# Skill Lab Registry

> Tek doğruluk kaynağı: Company OS'a eklenmesi düşünülen tüm üçüncü taraf skill/plugin/MCP adayları.
> Kural: `.claude/rules/third-party-skill-security.md` · Süreç: `skill-evaluator` · Kayıtlar silinmez.
> Risk: Düşük / Orta / Yüksek / Kritik · Karar: REJECT / TEST IN SANDBOX / ADAPT BEFORE USE / APPROVE FOR PROJECT

| # | İsim | Repo | Commit / version | Lisans | İnceleme tarihi | Durum | Risk seviyesi | Company OS kullanım amacı (hipotez) | Son karar |
|---|---|---|---|---|---|---|---|---|---|
| SL-001 | skill-creator (anthropics/skills) | https://github.com/anthropics/skills | — (inceleme sırasında sabitlenecek) | — | — | PENDING REVIEW | — | Şirkete özel skill'leri yazma, iyileştirme ve test etme (eval). Not: bu çalışma ortamında `anthropic-skills:skill-creator` yerleşik olarak mevcut; örtüşme (kontrol 12) incelenmeli | — |
| SL-002 | youtuber-skills (ravsau) | https://github.com/ravsau/youtuber-skills | 603367b35d0c842c9e84f83d946e9ce95c61954d (2026-10-01) | MIT | 2026-10-08 | REVIEWED — adaptasyon Founder onayı bekliyor | Orta (youtube-connect dahil edilirse Yüksek) | YouTube üretim iş akışları: paketleme, script, edit list, outlier, yayın öncesi kapı | packaging / script / edit-list / outliers / virality-gate: ADAPT BEFORE USE; youtube-connect ve AGENTS.md: REJECT. Detay: evaluations/2026-10-08-youtuber-skills.md |
| SL-003 | video-motion-craft | https://github.com/vibegameengine/video-motion-craft | — | — | — | PENDING REVIEW | — | Motion graphics / video animasyonu; production-engineer şablonlarına girdi (içerik henüz incelenmedi) | — |
| SL-004 | youtube-data-skills | https://github.com/nikhilbhansali/youtube-data-skills | — | — | — | PENDING REVIEW | — | YouTube veri analizi; analytics-analyst'e girdi. Credential (API key/OAuth) gerektirip gerektirmediği incelenecek | — |

## Notlar
- 2026-10-08: SL-001–SL-004 Founder talimatıyla aday olarak eklendi. Repoların varlığı, içeriği ve lisansı **henüz kontrol edilmedi**; hiçbiri indirilmedi, kurulmadı, çalıştırılmadı.
- Adobe Premiere / After Effects MCP'leri bilinçli olarak eklenmedi (production olgunlaşınca).
- 2026-10-08: SL-002 statik olarak incelendi (commit 603367b). Hiçbir şey kurulmadı, çalıştırılmadı, uyarlanmadı; Founder onayı bekleniyor.
