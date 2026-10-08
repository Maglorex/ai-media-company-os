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
| SL-005 | ElevenLabs Claude Code plugin | https://github.com/elevenlabs/plugin | c7eef3cbcf1ff3ef12066a4e8ea964749d8e94be | MIT | 2026-10-08 | REVIEWED | Orta | Ses seçimi/TTS otomasyonu | REJECT (ihtiyaç dışı geniş kapsam/yetki). evaluations/2026-10-08-elevenlabs-official-integrations.md |
| SL-006 | ElevenLabs skills | https://github.com/elevenlabs/skills | 1d08a4a250cff67cc8056ec31587c031ecb06d2f | MIT | 2026-10-08 | REVIEWED | Düşük | TTS bilgi kaynağı | ADAPT BEFORE USE (yalnız bilgi; kurulum yok; setup-api-key yaklaşımı kullanılmaz) |
| SL-007 | ElevenLabs hosted MCP (OAuth) | https://api.elevenlabs.io/v1/mcp | hizmet (2026-10-08 belgeleri) | Hizmet şartları | 2026-10-08 | REVIEWED | Orta | OAuth ile TTS | REJECT (şimdilik): Voice Library arama yok, scope geniş; koşullu yeniden değerlendirme |
| SL-008 | ElevenLabs yerel MCP | https://github.com/elevenlabs/elevenlabs-mcp | c6dc1688ead5e0e67cdcaa5e336bed647019340c | MIT | 2026-10-08 | REVIEWED | Yüksek (terk edilmiş) | — | REJECT (deprecated) |

## Notlar
- 2026-10-08: SL-001–SL-004 Founder talimatıyla aday olarak eklendi. Repoların varlığı, içeriği ve lisansı **henüz kontrol edilmedi**; hiçbiri indirilmedi, kurulmadı, çalıştırılmadı.
- Adobe Premiere / After Effects MCP'leri bilinçli olarak eklenmedi (production olgunlaşınca).
- 2026-10-08: SL-002 statik olarak incelendi (commit 603367b). Hiçbir şey kurulmadı, çalıştırılmadı, uyarlanmadı; Founder onayı bekleniyor.
- 2026-10-08: SL-002 `youtube-virality-gate` mantığından Company OS'a uyarlanan ilk bileşen oluşturuldu: `.claude/skills/documentary-virality-gate/` (metin kopyalanmadı, yeniden yazıldı; kaynak: commit 603367b, MIT). Diğer 4 bileşen (packaging, script, edit-list, outliers) henüz adapte edilmedi. İlk test: P3 → REVISE BEFORE PILOT (`production/pilots/2026-10-n2-pilot-test/P3-virality-gate-eval.md`).
- 2026-10-08: SL-002 ikinci uyarlanmış bileşen: `youtube-packaging` prensiplerinden `.claude/skills/documentary-packaging/` oluşturuldu (yeniden yazıldı, metin kopyalanmadı; kaynak commit 603367b, MIT). Kalan: script, edit-list, outliers. İlk test: P3 (`production/pilots/2026-10-n2-pilot-test/P3-packaging-eval.md`).
- 2026-10-08: SL-005…SL-008 ElevenLabs resmî entegrasyonları incelendi. Öneri: üçüncü taraf entegrasyon kurmadan doğrudan REST API + şirketin kendi PowerShell betiği + kısıtlı/kotalı API anahtarı (repo dışı, DPAPI). Founder onayı bekleniyor (plan + credential).
