# Kendi Kendini Onarma ve Eskalasyon Kuralları

Sistem sorunu çıktığında Founder'ın hata mesajıyla baş başa kalması istenmez. Sıra: teşhis → yerel çözüm → gerekirse araştırma → yalnızca gerçekten gerekirse Founder.

## Sıra
1. **Teşhis et.** Hata mesajını, ilgili dosyayı, `git status`/`git log`'u ve yapılandırmayı oku. Neden olduğunu bulmadan değiştirme.
2. **Mevcut dosyalardan çöz.** Cevap `company/`, `.claude/`, `production/tools/README.md`, `company/machines.md` gibi dosyalarda varsa Founder'a sorma.
3. **Güvenli, geri alınabilir yerel düzeltmeyi kendin yap.** Örn.: bozuk frontmatter, eksik referans, dashboard tutarsızlığı, `.gitignore` boşluğu, yerel commit edilmemiş iş. Düzeltmeyi raporda belirt.
4. **Gerekirse resmi kaynağa bak.** Araç/yapılandırma sorunu için resmi dokümantasyon (WebFetch); belirsizse `research-request` ile araştırma iste. Üçüncü taraf yorumu `[VARSAYIM]`dır.
5. **Founder'a yalnızca şu durumlarda başvur:** onay gerektiren işlem, insan müdahalesi (giriş yapma, GitHub Desktop'ta push, ödeme, fiziksel makine işlemi) veya iki eşit derecede riskli yol arasında gerçek karar.

## Founder'a başvururken
- Hata mesajını tek başına bırakma. Format: **ne oldu (1 cümle) · neden (1 cümle) · önerdiğim tek adım**.
- Seçenek listesi verme; tek çözüm öner. Yığılmış teknik ayrıntı verme.
- Onay gerekiyorsa `founder-approval.md` formatını kullan; onay talepleri gruplanır.

## Kendin yapma — Founder onayı gerekir
- Para harcama, abonelik, kredi satın alma.
- Public yayın veya dış mesaj.
- Credential/secret girişi, hesap ayarı değişikliği.
- Remote git işlemleri: push, force push, history rewrite, branch silme, remote ayarı değiştirme.
- Geri döndürülemez her işlem (veri silme dahil; şirket kayıtları zaten silinmez).

## Güvenlik sınırı
- Onarım sırasında secret asla okunup yazılmaz, sohbette veya commit'te yer almaz. Secret bulunursa `git-and-secrets.md` uygulanır: konum bildirilir, anahtarın yenilenmesi önerilir.
- Emin değilsen değiştirme; önce yerel commit ile mevcut durumu koru, sonra düzelt.
- Aynı sorun tekrar ediyorsa köklü neden `company/lessons.md`'ye öğrenim olarak önerilir.
