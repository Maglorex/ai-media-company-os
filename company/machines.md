# Makineler

> Tek doğruluk kaynağı: hangi bilgisayar hangi iş için. Donanım ayrıntısı/araç envanteri: `production/tools/README.md`. Güncelleme: `machine-onboarding` skill'i.

## Kayıt
| Makine | Özellik | Rol | Durum | Son doğrulama |
|---|---|---|---|---|
| Operasyon bilgisayarı (hostname: WIN-028TMNOG5MJ) | Windows 10 Pro; donanım kaydedilmedi | Claude Code oturumları (COO), araştırma, yazım, analiz, şirket dosyaları | Aktif | 2026-10-06 |
| Render bilgisayarı (hostname: DESKTOP-KVLH9B2) | **Doğrulandı (komutla, 2026-10-10):** Windows 11 Pro build 26300; Ryzen 5 5600; 16 GB RAM; Radeon RX 580 8 GB; C: 224 GB SSD (95 GB boş), D: 1 TB HDD (849 GB boş). Adobe kurulu: Premiere Pro 2026, Media Encoder 2026, Photoshop 2026, After Effects 2026, Illustrator 2026. GitHub Desktop 3.6.7; repo `D:\YOUTUBe\ai-media-company-os` (origin/main ile eşleşik). Node.js 24.21.0 LTS + Remotion 4.0.529 kurulu ve test render'ı geçti. **Marka fontları (2026-10-13):** IBM Plex Sans Condensed / Plex Mono / Source Serif 4 kullanıcı düzeyinde kurulu (`%LOCALAPPDATA%\Microsoft\Windows\Fonts`; oturum yönetici değildi → yalnız `Berkan` hesabı görür); Windows, Remotion Chromium, Photoshop, Illustrator, After Effects, Premiere Pro'da doğrulandı. | **Ana production/render makinesi** (D-017): Premiere/Media Encoder/Photoshop, Remotion, büyük medya yerel üretim klasörü | **Aktif** — onboarding tamam (2026-10-10). Açık: Media Encoder AMD donanım H.264 kontrolü (P3 ilk export'ta), makine dışı yedek, ElevenLabs anahtarı (gerekirse) | 2026-10-10 |

## Çalışma düzeni
- Kaynak: GitHub reposu `Maglorex/ai-media-company-os` (`main`). Senkron GitHub Desktop ile Founder tarafından yapılır.
- Bir makinede çalışmaya başlamadan önce **Fetch/Pull**; bitirince **commit + Push**. Aynı anda iki makinede çalışılmaz.
- Büyük medya ve render çıktıları repoya girmez (`.gitignore`); makineler arası taşıma gerekirse yerel/harici depolama kullanılır.
- Secret'lar repoda yoktur; her makinede repo dışında, Windows kullanıcısına bağlı DPAPI dosyasında tutulur (`%USERPROFILE%\.companyos\`; makineler arası kopyalanamaz).

## Render bilgisayarı depolama (2026-10-10)
| Ne | Yer |
|---|---|
| Üretim klasörü (büyük medya) | `D:\CompanyOS-Production\<video-id>\` (01_archive · 02_graphics · 03_vo · 04_music · 05_premiere · 06_renders) — D: 1 TB HDD |
| Premiere Media Cache + Database | `C:\CompanyOS-Cache\Adobe` (SSD; otomatik silme 40 GB). Plan §5'teki "önbellek üretim klasöründe" önerisinden bilinçli sapma: HDD önbellek için yavaş. |
| Yedek | `C:\CompanyOS-Backup\` — `production/tools/backup/backup-production.ps1` her videonun 03_vo + 05_premiere klasörünü kopyalar (silmez). Ayrı fiziksel disk; çalınma/tam arızaya karşı korumaz. |
| Açık | Final render'lar (06_renders) ve makine dışı (bulut/harici) yedek — Founder "sonra düşünürüz" dedi (2026-10-10). VO üretildikten sonra yeniden gündeme alınır. |

## Notlar
- Render bilgisayarında `git` PATH'te yok; Claude, GitHub Desktop'un içindeki git'i kullanır (`%LOCALAPPDATA%\GitHubDesktop\app-<sürüm>\resources\app\git\cmd\git.exe`). GitHub Desktop güncellenince sürüm klasörü değişir.
- Render makinesi için NVENC yok; AMD AMF veya CPU kodlaması test edilecek (bkz. `production/tools/README.md`).
- Makine rolü değişirse bu tablo güncellenir; önemli değişiklik `decision-log.md`'ye işlenir.
