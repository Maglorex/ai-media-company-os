---
name: documentary-evidence-ledger
description: Bir video için önemli iddiaları, kaynakları (tam konumuyla), hesaplamaları, çıkarımları, görselleri ve kullanım haklarını senaryodan önce tek bir kanıt kaydında toplar. Script ve packaging bu kayda dayanır; kayıtta desteği olmayan önemli iddia sessizce kullanılmaz.
---

# Documentary Evidence Ledger

Kapsam: N2 belge-öncelikli belgeseller. Çıktı: `production/.../<video>-evidence-ledger.md` (şablon: `TEMPLATE.md`). Ne zaman: virality gate ve packaging'den sonra, **senaryodan önce**; senaryo ve kurgu sırasında güncellenir.
Founder'a tablo gösterilmez; `founder-interface` uyarınca sade özet verilir. "Detayları göster" denince açılır.

## Durum etiketleri
| Etiket | Anlam |
|---|---|
| `VERIFIED FACT` | Kaynak, belirtilen konumda iddiayı açıkça söylüyor (kaynak gerçekten okundu) |
| `CALCULATION` | Kaynak verilerinden **bizim** yaptığımız hesap; formül yazılır |
| `INFERENCE` | Kaynaklardan çıkarılan, doğrudan yazmayan yorum; dayanakları yazılır |
| `UNVERIFIED` | Henüz doğrulanmadı (önceki taslaktan gelen ama bu kayıtta kaynağı okunmamış olanlar dahil) |
| `REJECTED` | Araştırıldı; kullanılmaması kararlaştırıldı, nedeni yazılır |

## Kurallar
1. **Claim → Evidence:** Videodaki her önemli iddia (sayı, tarih, neden, sonuç, kişi/kurum hakkında hüküm) bir satıra bağlanır. Kaynağı olmayan önemli iddia sessizce gerçek kabul edilmez → `UNVERIFIED`.
2. **Kaynak kalitesi:** birincil → güçlü kurumsal/akademik ikincil → güvenilir gazetecilik → diğer. Kaynak türü tek başına yeterli değil: iddianın kaynakta **gerçekten** bulunduğu kontrol edilir.
3. **Tam konum:** sayfa (basılı sayfa ve gerekirse PDF sayfası), bölüm, tablo, şekil, zaman damgası.
4. **Alıntı:** tam metin (gereksiz uzun değil), konuşan/yazan, kaynak, sayfa/zaman damgası. Telifli kaynaklardan kısa tutulur.
5. **Hesaplama:** `CALCULATION` açıkça işaretlenir; kaynağın kendi toplamı ile bizim toplamımız **ayrı satırlarda** tutulur ve karıştırılmaz.
6. **Nedensellik:** "X, Y'ye neden oldu" ancak kaynak nedenselliği açıkça söylüyorsa `VERIFIED FACT`. Kaynak yalnız maliyet/korelasyon/eşzamanlılık gösteriyorsa en fazla `INFERENCE`; senaryoda ihtiyatlı dille.
7. **"Desteklemediği" sütunu zorunlu:** Her önemli satırda kaynağın neyi **söylemediği** yazılır (kapsam, dönem, hariç tutulan kalemler, kimin görüşü olduğu).
8. **Görsel kanıt:** belge sayfası, fotoğraf, teknik çizim, harita, tablo, grafik, arşiv görüntüsü için ayrı bölüm: kaynak, kimlik (arşiv no/URL), konum, kalite notu.
9. **Haklar:** `public domain` · `Creative Commons (tür)` · `attribution required` · `permission required` · `unclear`. Kaynaklar çelişirse ikisi de yazılır ve daha kısıtlayıcı koşul uygulanır (örn. atıf). `unclear` materyal güvenli kabul edilmez; üretimde kullanılmaz.
10. **Script guardrail:** Senaryo yalnızca `VERIFIED FACT` ve açıkça işaretlenmiş `CALCULATION` üzerine iddia kurar; `INFERENCE` ihtiyatlı dille ("rapora göre…", "bu, … düşündürüyor") kullanılabilir; `UNVERIFIED` ve `REJECTED` kullanılmaz. Ledger'da desteği olmayan önemli iddia gerekiyorsa: araştır → yumuşat → çıkar. **Sessizce uydurma yok.**
11. **Packaging guardrail:** Başlık/thumbnail'daki her iddia ve belge ledger'da bir satıra bağlanır ("Packaging" sütunu). Packaging'de kullanılan sayı/belge senaryoda farklı anlamda kullanılamaz.
12. **Çelişki:** Kaynaklar arasında veya önceki taslaklarla çelişki bulunursa sessizce düzeltilmez: "Çelişkiler" bölümüne yazılır ve Founder'a sade dille bildirilir.
13. **Hafıza:** Satırlar silinmez; geçersiz kalan satır `REJECTED` veya yeni satıra referansla işaretlenir.
