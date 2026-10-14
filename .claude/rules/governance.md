# Governance — Kural Sınıfları, Öncelik, Katmanlar, Modlar

> Katman: **L0 — HARD** (bu öncelik sistemi kendisi) · Kapsam: company · Kaynak: Founder Charter 2026-10-14 §11, §15, §19 · D-042.
> Makine-okunur karşılığı: `os/precedence.json` + `os/lib/precedence.mjs` (testler: `os/tests/`). Metin ile JSON çelişirse test FAIL verir; ikisi birlikte düzeltilir.

## 1. Kural sınıfları
| Sınıf | Anlamı |
|---|---|
| **HARD** | İhlal edilemez. Yalnız: truth, evidence integrity, rights, safety, security, disclosure ve Founder'ın costly/external/irreversible action yetkisi. |
| **HEURISTIC** | Genellikle iyi başlangıç noktası; hikâye daha iyi çalışıyorsa **bilinçli ve gerekçeli** değiştirilebilir. |
| **EXPERIMENT** | Henüz doğrulanmamış hipotez; test edilir, kural gibi uygulanmaz. |
| **DIAGNOSTIC** | Oran, süre, kaynak yüzdesi, shot ölçümü vb. Sorun bulmaya yarar; **creative objective veya PASS/FAIL hedefi değildir**, tek başına karar vermez. |
| **CASE-SPECIFIC** | Yalnız belirli video/case için verilen karar. |
- Bir Founder gözlemi otomatik HARD veya global kural olmaz. Bir video sonucu otomatik doctrine oluşturmaz.
- Dosya içinde bölüm etiketi kullanılabilir: `[HARD]`, `[HEURISTIC]`, `[EXPERIMENT]`, `[DIAGNOSTIC]`; HARD olmayan bağlayıcı şirket prosedürü kaynağını karar ID'siyle gösterir (ör. "(D-004)") ve L1 sayılır.
- v1'den kalan sayısal eşikler (ör. "15 sn statik", "≥%55 arşiv", "≤%25 koyu", "2,6–4,4 sn/olay", "≤~6 sn") **DIAGNOSTIC**'tir; ölçülür ve raporlanır, kapı olarak kullanılmaz.

## 2. Öncelik (precedence) — çelişkide kazanan
| Sıra | Katman | Ne girer |
|---|---|---|
| **L0** | HARD company boundaries | Sınıfı HARD olan her kayıt |
| **L1** | Company active decisions | Şirket kapsamlı aktif kararlar ve bağlayıcı şirket prosedürleri |
| **L2** | Channel canon | Kanal kapsamlı bağlayıcı kurallar/kararlar (`channels/<kanal>/`) |
| **L3** | Active video/case state | `current-state.md` ve case durum kayıtları |
| **L4** | Case-specific decisions | CASE-SPECIFIC sınıfı kararlar |
| **L5** | Heuristics / experiments / diagnostics | Sınıfı HEURISTIC, EXPERIMENT veya DIAGNOSTIC olan her kayıt (hangi kapsamda olursa olsun) |
Çözüm algoritması (`resolve()`):
1. Yalnız **aktif** (`ACTIVE`/`LIMITED`) ve bağlama **uygulanabilir** kayıtlar alınır: kapsam `company`, ya da `channel:<bu kanal>`, ya da `case:<bu case>`. Başka kanalın/case'in kaydı uygulanmaz.
2. DIAGNOSTIC kayıtlar kazanamaz; yalnız bilgi verir. Yalnız DIAGNOSTIC kaldıysa sonuç `DIAGNOSTIC_ONLY` (karar yok).
3. En düşük sıra numaralı katman kazanır.
4. Aynı katmanda birden çok kayıt çelişiyorsa: diğerlerini `supersedes` ile açıkça geçersiz kılan kayıt kazanır; yoksa sonuç **`BLOCKED_BY_CANONICAL_GAP`** (uydurma yok; §4).
Katman, kaydın türü + sınıfı + kapsamından türetilir; `active-decisions.md` ve `rule-registry.md`'deki "Katman" sütunu bu türetmeyle aynı olmak zorundadır (test).

## 3. Kapsam ve yukarı yükselme yasağı
- Kapsam: `company` · `channel:<id>` (ör. `channel:the-industrial-casebook`) · `case:<id>` (ör. `case:VID-001`). Her case bir kanala aittir.
- Alt katman üst katmanı **daraltabilir, gevşetemez** (L0 her zaman kazanır).
- **Yukarı otomatik yükselme yok:** bir kaydın kapsamı, dayandığı kanıtın kapsamından genişse (ör. yalnız `case:` kanıtıyla `channel:` veya `company` kuralı) kayıt `promoted_by: D-XXX` (Founder kararı) taşımak zorundadır; yoksa geçersizdir (test). Founder gözlemi (`origin: founder-observation`) promotion kararı olmadan HARD olamaz.
- Kanal öğrenimi başka kanala geçmez; şirket kuralı olacaksa ayrı Founder kararıyla.

## 4. Founder Guidance modları (her adımda biri seçilir)
| Mod | Ne zaman | Nasıl |
|---|---|---|
| **AUTONOMOUS** | Repository ve canonical sistem cevabı biliyor; iş onay gerektirmiyor | Kendin yap, sonucu raporla (`self-repair-and-escalation.md`) |
| **GUIDED ACTION** | Founder'ın bilgisayarında fiziksel işlem gerekiyor (giriş, push, kopyalama, Studio) | Tek adım: ne yapılacak, tam yol/hazır komut veya prompt, beklenen sonuç; aynı anda gereksiz çok işlem yok |
| **FOUNDER DECISION** | Gerçek taste, strategy, money, publication, external action, irreversible karar (`founder-approval.md`) | Tek öneri + onay formatı; dosyada cevabı olan bilgi sorulmaz |
| **BLOCKED_BY_CANONICAL_GAP** | Gerekli karar canonical sistemde yok veya aynı katmanda çözülemeyen çelişki var | Dur; boşluğu tek cümleyle yaz, önerilen kararı sun; doctrine uydurma |
Founder'a soru yalnız FOUNDER DECISION, GUIDED ACTION (yapması gereken işlem) veya BLOCKED_BY_CANONICAL_GAP için gelir. Repository'de cevabı olan sistem sorusunu sormak başarısızlıktır.

## 5. Açık Founder talimatı genel yetkinin önündedir
Founder'ın oturumdaki açık kısıtı ("read-only", "implementation yok", "dosya değiştirme", "commit alma", "yalnız Stage N") o kapsam için **her genel yetkinin** (ör. "yerel commit serbest", "güvenli işi doğrudan yap", Production Autonomy) önündedir. Yararlı görünen dokümantasyon dahil hiçbir dosya oluşturulmaz, commit alınmaz. Kısıt HARD sınırları gevşetemez, yalnız daraltır. (L-009)

## 6. Artifact yaşam döngüsü
Statüler (`company/state/artifact-registry.csv`):
| Statü | Talimat olarak kullanılabilir mi? |
|---|---|
| `ACTIVE` | Evet — kendi kapsamında geçerli çalışma/kayıt dosyası |
| `DRAFT` | Hayır — Founder/ilgili kapı onayı bekler |
| `FROZEN` | Hayır — içerik geçerli kayıt ama yürütülemez; açılması karar gerektirir |
| `SUPERSEDED` | Hayır — yerine geçen (`superseded_by`) kullanılır |
| `HISTORICAL` | Hayır — yalnız tarih/kanıt/negatif benchmark |
| `REJECTED` | Hayır — Founder reddetti; tarih için durur |
- Registry'de olmayan case/kanal yaratıcı dosyası talimat olarak kullanılmaz; önce kaydedilir.
- Eski bir dosyanın kendi içinde "HAZIR", "bağlayıcı" demesi registry statüsünü geçmez; **registry kazanır**.
- Fiziksel `legacy/` taşıması yalnız registry + referans doğrulaması temizse ve ayrı aşamada yapılır; dosyalar silinmez.

## 7. Tek doğruluk kaynakları (state)
- Güncel durum: **yalnız** `company/state/current-state.md`. `dashboards/company.md` ve backlog durum kaynağı değildir.
- Yürürlükteki kararlar: `company/state/active-decisions.md` (çalışma görünümü). Tarih: `company/decision-log.md` (append-only; silinmez, yeniden yazılmaz).
- Kural dosyalarının katman/sınıfı: `company/state/rule-registry.md`.
- Artifact statüsü: `company/state/artifact-registry.csv`.

## 8. Mimari değişiklik kontrolü
v2 kabulünden sonra yeni bulgu önce sınıflanır: **BLOCKER · EXPERIMENT · CASE-SPECIFIC · BACKLOG**. Kernel değişikliği yalnız BLOCKER veya Founder kararıyla. Skill/agent/kural eklemek için sabit sayı hedefi yoktur; ölçüt **en küçük ve açık sorumluluk seti**dir. Context boyutu, dosya/skill sayısı gibi ölçüler yalnız DIAGNOSTIC olarak raporlanır.
