# Değerlendirme — ElevenLabs resmî entegrasyonları (SL-005 … SL-008)

> Tarih: 2026-10-08 · İnceleyen: COO (statik inceleme; kod yok/çalıştırma yok) · Süreç: `skill-evaluator`
> Amaç: `documentary-voice-director`'ın Founder müdahalesi olmadan (1) Voice Library'yi filtreleyip aday bulması, (2) ücretsiz preview'larla elemesi, (3) Founder onayından sonra kısa test ve final voice-over üretmesi, (4) her üretimin kredi/maliyetini kaydetmesi.
> Kapsam: yalnız ElevenLabs'in resmî kaynakları. ChatGPT'nin bildirdiği noktalar `[VARSAYIM]` kabul edildi ve resmî kaynaklarla kontrol edildi (aşağıda).
> Kurulum, çalıştırma, credential, TTS üretimi: **yapılmadı**.

## Adaylar ve sabitlenen sürümler
| ID | Aday | Kaynak / sürüm | Lisans |
|---|---|---|---|
| SL-005 | ElevenLabs Claude Code plugin (`elevenlabs/plugin`) | github.com/elevenlabs/plugin @ `c7eef3cbcf1ff3ef12066a4e8ea964749d8e94be` (2026-10-05), plugin.json v0.4.0 | MIT |
| SL-006 | ElevenLabs skills (`elevenlabs/skills`) | github.com/elevenlabs/skills @ `1d08a4a250cff67cc8056ec31587c031ecb06d2f` (2026-10-07) | MIT |
| SL-007 | Hosted MCP sunucusu (OAuth) | `https://api.elevenlabs.io/v1/mcp` — elevenlabs.io/docs/eleven-agents/operate/hosted-mcp (erişim 2026-10-08) | Hizmet (ElevenLabs şartları) |
| SL-008 | Yerel MCP sunucusu (`elevenlabs/elevenlabs-mcp`) | @ `c6dc1688ead5e0e67cdcaa5e336bed647019340c` (2026-08-20) | MIT |
| — | Doğrudan REST API (üçüncü taraf kodu yok; şirketin kendi küçük betiği) | elevenlabs.io/docs/api-reference (erişim 2026-10-08) | API şartları |

## ChatGPT bulgularının kontrolü
| İddia | Resmî kaynak sonucu |
|---|---|
| Voice Library API ile filtrelenebilir | **Doğrulandı:** `GET /v1/shared-voices` — `language`, `locale`, `accent`, `category` (professional / high_quality / famous), `use_cases`, `descriptives`, `gender`, `age`, `search`, `sort` (usage_character_count_1y vb.), `include_custom_rates`; yanıtta `preview_url` |
| API ile TTS | **Doğrulandı** |
| API fiyatı web'den düşük olabilir | **Doğrulandı:** PAYG belgesi: "API usage has lower rates than UI usage". Starter'da UI ≈ 30 dk/ay. API kotası: **Founder kaydı (2026-10-08): Starter API v3 ≈ 60.000 karakter / ~60 dk** — kesin veri değil. Not: COO'nun 2026-10-08 fiyat sayfası okumasında v3/Multilingual v2 Starter sütunu 75.000 gösteriyordu; çelişki Founder'a bildirildi. Kesin değer API kullanım kayıtlarından ölçülecek; v4 için 12 Ekim'e kadar indirim |
| Resmî Claude Code plugin/skills var | **Doğrulandı** (SL-005, SL-006) |
| Hosted entegrasyonda OAuth | **Doğrulandı** (SL-007); ancak belgelenen kapsam ajan yönetimi + TTS üretimi; **Voice Library arama/filtre aracı belgelenmemiş** |

## Ek kritik bulgular (resmî)
1. **Ticari lisans yalnız ücretli abonelikte:** "The free plan does not include a commercial license… All paid plans include a commercial license" (Help Center: Can I publish the content I generate…). Ücretli abonelik sırasında üretilen içerik süresiz ticari kullanılabilir; abonelik dışı (öncesi/sonrası) üretilen içerik ticari kullanılamaz. PAYG bakiyesi plan sınırlarını değiştirmez. Beta servislerle üretilen içerik ticari kullanılamaz. → **Final voice-over ücretli bir plan aktifken üretilmeli.**
2. **API anahtarı kısıtlanabilir:** endpoint scope kısıtlaması, **kredi kotası**, IP allowlist, kullanıcı anahtarları için 15 dk–30 gün süre sonu (API Keys belgesi). GitHub'a sızan anahtarlar otomatik devre dışı bırakılabiliyor.
3. **Bazı kütüphane sesleri "custom rate" (ek ücret) veya kaldırılma bildirim süresi taşıyabilir** → aramada `include_custom_rates=false`, uzun vadeli kanal sesi için bildirim süresi alanı kontrol edilir.
4. **Yerel MCP (SL-008) README: "deprecated… no longer actively maintained"**, hosted MCP'ye yönlendiriyor.

## 15 maddelik kontrol (özet)
| # | Kontrol | SL-005 plugin | SL-006 skills | SL-007 hosted MCP | SL-008 yerel MCP |
|---|---|---|---|---|---|
| 1 | Geliştirici | ElevenLabs (resmî) | Resmî | Resmî | Resmî |
| 2 | Güncellik | Aktif (10/2026) | Aktif | Hizmet | **Terk edildi (deprecated)** |
| 3 | Lisans | MIT | MIT | Hizmet şartları | MIT |
| 4 | İçerik | ~40 skill (çoğu sesli ajan "Architect"), komut, `.mjs` betikleri, hosted MCP yapılandırması | 10 ürün skill'i + `evals/run_all.py` | Uzak sunucu | Python sunucu |
| 5 | Çalıştırılabilir kod | Var (`check-examples.mjs`, `local-executor.mjs`) | Var (evals) | Yok (uzak) | Var |
| 6 | Network | Hosted MCP | Skill'ler API çağrısı tarif eder | Evet | Evet |
| 7 | Credential | OAuth (geniş scope: `convai_write`, `image_video_generation`, `voice_generation`, `flows`…) | API anahtarı | OAuth (aynı geniş scope seti) | API anahtarı env'de |
| 8 | Dosya yazma | Skill talimatları | `setup-api-key` anahtarı **proje `.env`'ine** yazdırır | TTS kısa ömürlü link | `output_directory` |
| 9 | Shell | Betikler | Evals | — | `uvx` |
| 10 | Dependency | Plugin kurulumu | `npx skills` | — | `uv`/pip |
| 11 | Company OS çatışması | Gereksiz geniş yetki; ajan silme/yayınlama araçları | `.env`-in-repo yaklaşımı `git-and-secrets.md`'den zayıf; mevcut skill'lerimizle örtüşmüyor | Ajan araçları "publishes directly"; geniş scope | Anahtar config'te |
| 12 | Örtüşme / ihtiyaç | İhtiyacımızın küçük kısmı (TTS) | Bilgi kaynağı olarak faydalı (TTS/voice settings) | Library arama yok → ihtiyaç 5 karşılanmıyor | — |
| 13 | Gerçek sorun | Kısmi | Kısmi | Kısmi | — |
| 15 | Bakım riski | Düşük (resmî) ama hızlı değişiyor | Düşük | Düşük | **Yüksek (terk)** |

## Kararlar
| ID | Karar | Gerekçe |
|---|---|---|
| SL-005 plugin | **REJECT** (bu ihtiyaç için) | Paketin çoğu sesli ajan geliştirme içindir; geniş OAuth yetkileri ve betikler gereksiz yüzey yaratır; Voice Library filtrelemesini çözmez. |
| SL-006 skills | **ADAPT BEFORE USE** (yalnız bilgi) | `text-to-speech` ve `voice-settings` referansları `documentary-voice-director`'a kaynak olarak okunabilir; kurulmaz. `setup-api-key` yaklaşımı (anahtar proje `.env`'inde) kullanılmaz. |
| SL-007 hosted MCP | **REJECT (şimdilik)** — yeniden değerlendirme koşullu | En güvenli kimlik doğrulama (OAuth) ama belgelenen araçlarda Voice Library arama/filtre yok; scope seti ihtiyaçtan geniş. Library araması eklenirse veya scope daraltılabilirse tekrar incelenir. |
| SL-008 yerel MCP | **REJECT** | Resmî olarak terk edilmiş; API anahtarını istemci yapılandırmasına yazdırır; `uv` bağımlılığı. |
| Doğrudan REST API | **Önerilen** (üçüncü taraf kod yok) | Tüm ihtiyaçları karşılar: shared-voices filtreleri + `preview_url` (ücretsiz dinleme), TTS, kullanıcı/abonelik uç noktasıyla kredi bakiyesi takibi. Şirketin kendi küçük PowerShell betiği (Windows'ta yerleşik; yeni dependency yok). |

## Önerilen kurulum tasarımı (Founder onayıyla)
- **Kimlik:** Founder, ElevenLabs'te **kısıtlı bir API anahtarı** oluşturur: yalnız Text to Speech + Voices (okuma) + kullanıcı/abonelik okuma; **kredi kotası** (ör. test için 10.000); isteğe bağlı süre sonu.
- **Saklama:** Anahtar **repo dışında**, Windows kullanıcı hesabına bağlı şifreli dosyada (PowerShell `Read-Host -AsSecureString | Export-Clixml` → DPAPI, `%USERPROFILE%\.companyos\`). Founder anahtarı **kendi terminaline** yazar; sohbete yapıştırmaz; Claude anahtarı görmez, yazdırmaz, loglamaz. Repo'ya hiçbir şey yazılmaz.
- **Betik:** `production/tools/elevenlabs/` altında şirketin kendi PowerShell betikleri: `search-voices` (filtreler, `include_custom_rates=false`), `fetch-previews` (preview mp3'leri `production/.../voice-tests/` — gitignore), `tts-test` (karakter sayısı + tahmini kredi gösterir, onay bayrağı olmadan çalışmaz), `credits` (bakiye). Her üretim `production/.../voice-ledger.md`'ye karakter, model, ses, tahmini/gerçek kredi ile yazılır.
- **Model:** Final için kalite + uzun anlatım kararlılığı + maliyet: aday modeller Eleven v4 ve Multilingual v2; Flash/Turbo yalnız kalite eşdeğer çıkarsa.
- **Ticari lisans:** Final üretim ücretli plan aktifken yapılır (bkz. kritik bulgu 1).

## Founder'dan gereken
1. Plan kararı (para): ücretli abonelik (öneri: Starter, aylık) — `founder-approval.md`.
2. Credential onayı ve tek işlem: kısıtlı API anahtarı oluşturup Claude'un vereceği tek komutla kendi bilgisayarında saklamak.
