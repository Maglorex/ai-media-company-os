# company/state/runtime — makine-okunur yürütme durumu (Gate 1B)

> Kapsam: company · Kod: `os/lib/control/` · CLI: `os/control/company.mjs` · Testler: `os/tests/control-plane.test.mjs`.
> **Yetki sınırı:** bu klasör yalnız **yürütme** durumunda yetkilidir (mod, iş durumu, eylem/receipt, onay kaydı, kaynak sahipliği). Kararlar (`company/decision-log.md`, `company/state/active-decisions.md`), governance (`.claude/rules/`) ve artifact statüsü (`company/state/artifact-registry.csv`) mevcut yetkilerini korur. `company/state/current-state.md` insan-okunur özettir.

## Neden `company/state/` altında (v2.1)
Şirketin durum kayıtları zaten `company/state/` hiyerarşisindedir (current-state, active-decisions, rule-registry, artifact-registry). Yürütme durumu da bir şirket durumu kaydıdır; aynı hiyerarşide, ayrı bir alt klasörde durur: insan-okunur özet `current-state.md`, makine-okunur yürütme gerçeği `runtime/`. Kod `os/` altında, veri `company/` altında kalır.

## Kanonik model: olay günlüğü yetkilidir
| Dosya | Rol |
|---|---|
| `events.jsonl` | **Yetkili yazma modeli.** Her satır tek kanonik JSON olay: `event_version`, `seq`, `ts`, `type`, `actor_role`, `machine`, `job_id`, `details`, `prev_hash`, `hash` |
| `state.json` | Türetilmiş projeksiyon: mod, şema, control plane sürümü, aktif gate, kaynak sahipliği, olay başı |
| `jobs/<job_id>.json` | Türetilmiş projeksiyon: iş durumu, yetki-doğrulanmış onaylar, Founder kapısı |
| `actions/<action_id>.json` | Türetilmiş projeksiyon: eylem, policy, grant, receipt, doğrulama |

- Tüm yetki (mod, iş/eylem durumu, onaylar, kaynak sahipliği) olayların deterministik **replay**'inden türetilir (`os/lib/control/model.mjs`). Okumalar da replay'den gelir; projeksiyon dosyasını elle değiştirmek davranışı değiştirmez.
- **Her mutasyon:** kilit → olay günlüğünü doğrula → replay → projeksiyonları replay ile karşılaştır → aday olayı kur → olayın tamamını (grant, gerekçe, onay referansı, receipt dahil) secret-tara ve anlamsal olarak doğrula → olayı ekle + fsync → projeksiyonları atomik yaz (temp + fsync + rename) → projeksiyonları replay ile yeniden karşılaştır. Doğrulama başarısızsa hiçbir dosya değişmez.
- **Olay eklendi ama projeksiyon yazılamadıysa:** olay geçmişi geri alınmaz/yeniden yazılmaz; `PROJECTION_WRITE_FAILED` döner, sonraki her mutasyon `PROJECTION_DIVERGENCE` ile reddedilir, `status` kurtarma ister. Normal işleyişte projeksiyon sessizce onarılmaz; onarım yalnız açık komutla: `reproject --as <rol> --reason "…"` (olayları değiştirmez, `RUNTIME_REPROJECTED` olayı ekler; geçici dosya veya olay günlüğünde karşılığı olmayan dosya varsa önce elle inceleme ister).

## Olay sürümü
Her olay `event_version` taşır (zarfın parçası, hash'in kapsamında). **Olay sürümü, gelecekteki Company OS sürümleri eski olayların şemasını sessizce tahmin etmek yerine onları açıkça ele alabilsin diye vardır.** Gate 1B yalnız sürüm `1`'i bilir ve her yeni olayı sürüm `1` ile yazar; sürümü eksik veya bilinmeyen olay replay'de, başka hiçbir alanı yorumlanmadan fail-closed reddedilir (`BROKEN_EVENT_LOG`). Upcaster, migration çerçevesi veya şema kayıt defteri yoktur.
- `archive/events-unversioned-2026-10-16.jsonl`: sürüm alanı öncesi yazılmış iki Gate 1B olayı (genesis + yeniden projeksiyon), **değiştirilmeden** arşivlendi (yanında eski `state.json`). Yeni sürümlü genesis bu dosyaya bayt SHA-256'sı, satır sayısı ve gerekçeyle bağlanır (`details.predecessor`); eski olaylar yeniden oynatılmaz. Geçmiş yeniden yazılmadı: eski zincir olduğu gibi duruyor, yeni zincir ona referans veriyor.

## Güvenli kimlikler
`job_id` / `action_id` dosya yoluna yalnız tek doğrulayıcı (`safeIdError` / `recordPath`, `os/lib/control/common.mjs`) üzerinden girer: `JOB-` / `ACT-` + 1–64 karakter `A-Z 0-9 . _ -`, harf/rakamla başlar, nokta ile bitmez; Windows aygıt adları reddedilir. Küçük harf bilinçli olarak yoktur (Windows büyük/küçük harf duyarsız: iki kimlik aynı dosyaya düşmesin). Ayırıcı, `..`, sürücü harfi, mutlak yol, boşluk ve kontrol karakteri biçim gereği imkânsızdır. Tehlikeli kimlik temizlenmez, reddedilir. `recordPath` ayrıca çözülen yolun `jobs/` veya `actions/`ün doğrudan çocuğu olduğunu kontrol eder; dosya adı ile içteki kimlik birebir aynı olmalıdır (projeksiyon karşılaştırması).

## Rol dizesi yetki değildir; enjeksiyon kimlik doğrulaması değildir
- `actor_role`, `requested_by`, CLI `--as founder` / `--as coo` yalnız **denetim/atıf meta verisidir**.
- Korumalı yetki (AWAITING_FOUNDER kapısından çıkış, eylem yetkilendirmesi, PAUSED'dan çıkış) yalnız bir **trusted authority doğrulayıcısından** gelir ve olaya grant olarak (`authority`, `purpose`, `subject`, `source`, `approval_ref`, `verifier`, `recorded_by`) yazılır. Çağıranın verdiği `approvals` kabul edilmez.
- Eylemin yetki gereksinimi (`required_authority`, `requires_ref`) çağıranın seçimi değildir; eylem türünün **güvenilir policy**'sinden gelir. Üretim policy tablosu Gate 1B'de **boştur**: kayıtsız her eylem türü `ACTION_KIND_UNREGISTERED` ile reddedilir. Policy, eylemin idempotent kimliğinin parçasıdır.
- **Gate 1B'de güvenilir Founder onay mekanizması yoktur.** Canlı yol fail-closed'dur (`FOUNDER_APPROVAL_REQUIRED` / `TRUSTED_AUTHORITY_UNAVAILABLE`). Sonuç: Gate 1B'de şirket bir kez PAUSED olursa canlı yoldan çıkamaz; AWAITING_FOUNDER'daki iş ilerleyemez. Bu bilinçlidir.
- **Bağımlılık enjeksiyonu (doğrulayıcı/policy) bir test ve entegrasyon dikişidir, kimlik doğrulaması değildir.** Keyfi kod veya dosya sistemi yazma yetkisi olan her süreç süreç-içi bir kütüphaneyi atlayabilir (doğrulayıcı enjekte edebilir, olay günlüğünü zinciri yeniden hesaplayarak yazabilir). Gerçek yetki zorlaması nihayetinde sonraki **Action Gateway**'e, işletim sistemi/araç izinlerine ve aşağı akış kontrollerine dayanır. Bu yüzden Gate 1B güvenilir yetki olmadan bilinçli olarak fail-closed çalışır. CLI hiçbir doğrulayıcı veya policy enjekte etmez; testler yalnız kendi dosyalarında tanımlı, açıkça TEST-ONLY işaretli doğrulayıcı/policy kullanır.

## Kurallar
- **Elle düzenleme yok.** Değişiklik yalnız `os/control/company.mjs` (veya `os/lib/control/` API'si) ile.
- **Olay günlüğü biçimi:** dosya boş değilse son bayt satır sonu olmalıdır; değilse (yarım/elle düzenlenmiş son satır) ekleme reddedilir. Hash zinciri bozulma/kurcalama **tespiti** içindir; kriptografik değiştirilemezlik değildir.
- **Dayanıklılık:** olay ekleme ve projeksiyon geçici dosyaları `fsync` edilir; rename'in ve dizin girdisinin güç kesintisine dayanıklılığı işletim sistemi/dosya sistemine bağlıdır (dizin fsync'i Windows'ta yapılmaz). Bundan güçlü bir garanti iddia edilmez.
- **Kilit (`.lock`) ve geçici dosyalar (`*.tmp-*`) asla otomatik silinmez.** `status` bunları `STALE_LOCK` / `INTERRUPTED_WRITE` olarak raporlar; varken mutasyonlar reddedilir. Kurtarma elle: çalışan bir mutasyon olmadığı doğrulanınca kaldırılır.
- **`status` genel durumları:** `HEALTHY` · `PROJECTION_DIVERGENCE` · `INTERRUPTED_WRITE` · `STALE_LOCK` · `BROKEN_EVENT_LOG` · `RUNTIME_MISSING`.
- **PAUSED:** tüm mutasyonlar reddedilir (zaten başlamış bir eylemin sonucunun kaydı hariç). Duraklatma emniyet frenidir ve yetki istemez.
- **Dışlayıcı kaynak:** iş türü yalnız açıklayıcıdır; dışlayıcılık `resource_claims` ile (ör. `["production"]`) gelir. Aynı kaynağı talep eden iki iş aynı anda IN_PROGRESS (veya ondan sonraki bekleme durumlarında) olamaz. Sahiplik olaylardan türetilir. Lease/timeout yoktur.
- **Secret yok:** sezgisel tarayıcı (`os/lib/control/common.mjs`) her secret'ı yakalayamaz; yanlış pozitifte reddederek güvenli kalır ve hata mesajında yalnız kategori + yol verir, değeri asla. Secret içeren receipt saklanmaz ve sonuç `UNKNOWN` sayılır.
- **İdempotency ve belirsizlik:** aynı `action_id` + aynı intent + aynı policy ikinci kez yürütülmez; farklı intent `IDEMPOTENCY_CONFLICT`, farklı policy `POLICY_CONFLICT`. Dış yan etki gerçekleşip son kaydı yapılamadıysa (çökme, kilit, uyuşmazlık) eylem `EXECUTING` kalır → **belirsiz, uzlaştırma gerekli**; asla otomatik yeniden yürütülmez ve `VERIFIED` olamaz. Çökme sonrası dış sağlayıcıda yan etkinin olup olmadığını kanıtlamanın genel bir yolu yoktur; sağlayıcıya özgü idempotency/uzlaştırma gelecekteki eylem adaptörlerinin işidir.

## Makineler arası model (Gate 1D-B, D-050)
- **Tek yazıcı:** yetkili olay günlüğüne yalnız **Main PC** olay ekler, yalnız kontrol dalında (`os-v2-migration`; değişikliği ayrı Founder kararı). Strong PC runtime'a olay eklemez. `state.json` ve `events.jsonl` iki makineden eşzamanlı yazıma hâlâ güvenli değildir; `.lock` makineleri ayırmaz — model bu yüzden tek yazıcıya dayanır.
- **İş devri:** `node os/control/company.mjs job assign <JOB-ID> --to <makine> --as <rol> --reason "…"` (yalnız Main PC, temiz kontrol dalı, kayıtlı makine) bir `JOB_ASSIGNED` olayı yazar: `owner_machine` değişir; ilk atama `publication_base`'i (o anki kontrol dalı HEAD'i) sabitler, sonra değişmez. COMPLETE veya etkin kaynak tutan iş devredilemez. Etki, kontrol dalı commit'lenip **Founder manuel push ettiğinde** başlar — bu bir iş akışı sınırıdır, kriptografik kimlik doğrulaması değildir.
- **Uzak yetki:** safe-sync iş sahipliğini ve ilk yayın tabanını yerel çalışma ağacından değil, onaylı uzaktaki kontrol dalının tam commit'indeki `events.jsonl`'den okur ve aynı Gate 1B kurallarıyla (biçim, zincir, sürüm, replay) doğrular; eksik/bozuk → fail-closed. Job dalındaki yerel runtime anlık görüntüsü yetki vermez. Push öncesi kontrol dalı yeniden okunur; hareket ettiyse `CONTROL_CHANGED`.
- **İlk yayın:** `node os/control/company.mjs safe-sync start --job <JOB-ID>` job dalını yalnız kayıtlı `publication_base`'ten oluşturur; taban tahmin edilmez. safe-sync kontrol dalını asla push etmez.
- **Kapsam dışı:** job dalının kontrol dalına merge'ü, genel kimlik doğrulama, lease/timeout.

## Komutlar
```
node os/control/company.mjs status
node os/control/company.mjs pause --as coo --reason "<neden>"
node os/control/company.mjs job list
node os/control/company.mjs reproject --as coo --reason "<inceleme sonrası neden>"
```
