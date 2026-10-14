# Consolidation Map — eski skill davranışları → yeni pipeline

> D-046 (Stage 3). Eski skill dosyaları **silinmedi**; SUPERSEDED işaretli ve tarihsel. Her satır, eski bir davranışın yeni pipeline'da nerede yaşadığını gösterir; "Kanıt ifadesi" sütunundaki metin hedef dosyada birebir bulunur (test: `os/tests/pipeline.test.mjs`). Bilinçli olarak bırakılan davranışlar "Bırakıldı" ile ve nedeniyle yazılır.

## Eşleme
| Eski skill | Davranış | Yeni yer | Kanıt ifadesi |
|---|---|---|---|
| documentary-virality-gate | 12 kapıda fikir değerlendirmesi, zorunlu kapılar (karar, kanıt, görsel kanıt, politika) | `.claude/skills/story-viability/SKILL.md` | Evidence gerçekten yeterli mi? |
| documentary-virality-gate | Sonuç + tek düzeltme önerisi | `.claude/skills/story-viability/SKILL.md` | tek öneri ve gerekçe |
| documentary-virality-gate | Policy/legal riski | `.claude/skills/story-viability/SKILL.md` | Mevcut araç, hak, zaman ve maliyetle |
| documentary-virality-gate | Only Us / originality | `.claude/skills/story-viability/SKILL.md` | Rakiplerden farklı anlatılabilir mi? |
| documentary-creative-treatment (v1) | Hook-first, hook adayları, yapı tablosu | `.claude/skills/documentary-creative-treatment/SKILL.md` | 2–3 hook adayı |
| documentary-creative-treatment (v1) | Gerilim/merak haritası | `.claude/skills/documentary-creative-treatment/SKILL.md` | Viewer Question / Curiosity State |
| documentary-creative-treatment (v1) | Sahne amaçları | `.claude/skills/documentary-creative-treatment/SKILL.md` | Earns screen time because |
| documentary-creative-treatment (v1) | Görsel dil, arşiv stratejisi, AI ihtiyacı, tipografi, müzik yönü | `.claude/skills/production-scene-plan/SKILL.md` | Sound Role |
| documentary-creative-treatment (v1) | KEEP / REBUILD / REMOVE | Bırakıldı → asset kararları scene plan "Rights / Asset Readiness" alanında | Rights / Asset Readiness |
| documentary-script (v1) | Ledger ana gerçek kaynağı; INFERENCE ihtiyatlı dil | `.claude/skills/documentary-script/SKILL.md` | Truth lock (HARD, ledger) |
| documentary-script (v1) | Sahte dram yok, rakam ve alıntı kuralları, self-review | `.claude/skills/documentary-script/SKILL.md` | Sahte dram yok |
| documentary-script (v1) | "Script metni değişmez" (edit-plan kural 10) | Bırakıldı → truth lock + kontrollü editorial değişiklik | Editorial flexibility |
| documentary-visual-plan | Her sahnenin işi, ekranda ne görülmeli | `.claude/skills/production-scene-plan/SKILL.md` | Visual Idea |
| documentary-visual-plan | Kanıt ekranda; uydurma kanıt yok; katman ayrımı | `.claude/skills/production-scene-plan/SKILL.md` | Katman ayrımı |
| documentary-visual-plan | Haklara duyarlı, V-ID bağı, CC BY-SA notu | `.claude/skills/production-scene-plan/SKILL.md` | CC BY-SA yükümlülükleri ayrıca not edilir |
| documentary-visual-plan | Script bütünlüğü (görsel yok diye claim eklenmez) | `.claude/skills/production-scene-plan/SKILL.md` | görsel bulunamadı diye yeni factual claim eklenmez |
| documentary-visual-plan | Zorluk ölçeği, asset envanteri | `.claude/skills/production-scene-plan/SKILL.md` | READY / TO PRODUCE / TO FIND / BLOCKED |
| documentary-edit-plan | Beat bazlı edit fikri, geçiş mantığı, müzik/SFX rolü | `.claude/skills/production-scene-plan/SKILL.md` | Transition Logic |
| documentary-edit-plan | Belge okunabilir süre; söylenen rakam ekranda | `.claude/skills/production-scene-plan/SKILL.md` | okunabilir süre verilir |
| documentary-edit-plan | Zaman kodu, ölçülen anlatıcı hızı, VO senkronu | Stage 4 production handoff (final VO'dan sonra) | Zaman kodları ve VO senkronu final VO'dan sonra Stage 4 handoff'ta üretilir |
| documentary-edit-plan | Closed captions (SRT) | `.claude/skills/production-scene-plan/SKILL.md` | closed captions her videoda |
| source-to-visual | İki soru: kaynak ne diyor / izleyici ne görmeli | `.claude/skills/production-scene-plan/SKILL.md` | Evidence Anchor ile **ayrı karardır** |
| source-to-visual | SOURCE → EXTRACT → EXPLAIN → CONSEQUENCE | `channels/the-industrial-casebook/canon/04-visual-storytelling.md` | SOURCE (gerçek belge) → EXTRACT |
| source-to-visual | Fotoğraf dönüştürme | `.claude/skills/production-scene-plan/SKILL.md` | uzun yavaş zoom varsayılan değildir |
| source-to-visual | AI politikası ve hazır ChatGPT prompt şablonu | `.claude/skills/production-scene-plan/TOOL-LIBRARY.md` | Must NOT invent |
| source-to-visual | Dünya ataması (Archive/Evidence/Engineering/Case UI) | `.claude/skills/production-scene-plan/SKILL.md` | Dünya ataması |
| source-to-visual | 7 adımlı "ilk evet kazanır" sırası | Bırakıldı → TIC-15/TIC-18/TIC-19 (sıra yok; scene'den sonra araç) | önce sahne, sonra araç |
| documentary-visual-storytelling | Visual language library | `.claude/skills/production-scene-plan/TOOL-LIBRARY.md` | En iyi taşıdığı |
| documentary-visual-storytelling | Arşiv footage taraması ve hak kuralı | `.claude/skills/production-scene-plan/SKILL.md` | Arşivde bulunmak telif güvenliği değildir |
| documentary-visual-storytelling | Seçici tipografi | `.claude/skills/production-scene-plan/SKILL.md` | ekran tipografisi yalnız kritik sayı |
| documentary-visual-storytelling | Teşhis testleri (literal, slideshow, sessiz izleme, ölü görüntü, vaat, kanıt ayrımı) | `.claude/skills/production-scene-plan/SKILL.md` | sessiz izlemede iskelet okunuyor mu |
| documentary-visual-storytelling | Founder'a hazır AI prompt deneyimi | `.claude/skills/production-scene-plan/TOOL-LIBRARY.md` | Bu sahne için ChatGPT'ye şunu olduğu gibi gönder |
| muted-preview-gate (karar rolü) | Creative PASS/REVISE | `.claude/skills/creative-qa/SKILL.md` | DIAGNOSTIC girdidir; karar burada verilir |

## Değişmeden kalan skill'ler
`documentary-evidence-ledger` · `documentary-packaging` (Packaging Hypothesis olarak genişletildi) · `documentary-voice-director` · `documentary-music-sfx` · `muted-preview-gate` (DIAGNOSTIC) · `documentary-production-handoff` (Stage 4'te yeniden yazılacak) · `video-launch-os` · `pre-publish-qa` · `growth-idea-scoring` (portföy + forecast lock; puan yalnız girdi) · `growth-performance-review`.
