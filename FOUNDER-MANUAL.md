# Founder Kullanım Kılavuzu

Kısa prosedürler. Teknik ayrıntı bilmen gerekmez.

## Ana komut
Bilgisayarı açıp Claude'a şunu yaz:

> **Agam bugün napcaz?**

(Alternatif: **Founder oturumunu başlat.** · Ayrıca "Devam edelim." / "Şimdi ne yapmam gerekiyor?" da çalışır.)

Company OS şirketin durumunu kendisi inceler ve sana sade Türkçe ile şunları söyler: bugünkü hedef, neden, senin yapacağın şey, benim arka planda yapacağım şey, tahmini zamanın. Gerekli iç işleri kendisi seçer; sen agent, skill veya dosya adı bilmek zorunda değilsin.

Teknik ayrıntıyı görmek istersen: **Detayları göster.** Bu komut ilgili raporu, kaynakları ve dosyaları açar.

Dil: Benimle yazışma Türkçedir. Ama kanalın gerçek yayın metinleri (başlık, kapak yazısı, senaryo, seslendirme, açıklama) kanalın dilinde (İngilizce) gösterilir; hemen altında Türkçe anlamını yazarım. Her mesajda senden yalnızca tek bir karar isterim.

Not: Para, yayın, hesap, GitHub'a gönderme gibi işlemler yine senin açık onayını ister; bu değişmedi.

---
Aşağısı yalnızca ihtiyaç olursa bakacağın referans bölümüdür. Takıldığında "ne yapmam lazım?" yazman yeter.

## 1. Çalışma gününe başlama
1. (İkinci bilgisayardan geldiysen) GitHub Desktop → **Fetch / Pull**.
2. Claude Code'da projeyi aç.
3. "Agam bugün napcaz?" yaz; Claude günün tek işini ve senden gerekeni söyler. Onay gerektiren bir şey varsa açıkça sorar.

## 2. Çalışma gününü kapatma
1. Claude'a "kapanış" de → hafızayı günceller, yerel commit atar.
2. GitHub Desktop → **Push origin**.

## 3. Claude "ne yapacağını" nasıl belirler
Dashboard, hedefler, backlog ve son kararlara bakar; etki ve öğrenme değeri en yüksek, kısıtlara uyan **tek** işi önerir. Onay gerektirmiyorsa başlar. Sen yalnızca karar ve onay verirsin.

## 4. Başka bilgisayara geçme
1. Eski bilgisayarda: kapanış + **Push**.
2. Yeni bilgisayarda: **Fetch / Pull** → projeyi aç.
3. İlk kez kullanılan bilgisayarsa Claude'a "yeni bilgisayarı bağla" de; sadece gerekli adımları söyler. Makine rolleri: `company/machines.md`.
4. Aynı anda iki bilgisayarda çalışma.

## 5. GitHub senkron sorunu
Claude'a "GitHub senkron sorunu var" de ve GitHub Desktop'taki mesajı olduğu gibi yapıştır. Claude durumu inceler, nedenini ve tek çözümü söyler. Kendi başına **Force push** veya "discard changes" yapma.

## 6. Company OS bozuk görünürse
Claude'a "sistem kontrolü yap" de (`system-health-check`). Güvenli sorunları kendisi düzeltir; çözemediğini tek öneriyle sana bildirir.

## 7. Yeni yazılım veya ücretli araç gerekirse
1. Claude önce mevcut ve ücretsiz/açık kaynak seçenekleri dener.
2. Ücretli gerekiyorsa maliyet, alternatif ve beklenen kazançla **tek öneri** sunar.
3. **Sen onaylamadan** hiçbir ödeme, abonelik veya kredi alımı yapılmaz. Onay `decision-log.md`'ye kaydedilir.

## 8. Ne zaman müdahale etmelisin
- Claude **onay** isterse (para, yayın, hesap/credential, remote git, geri dönüşsüz işlem, strateji değişikliği).
- Giriş yapma, yazılım kurma, GitHub Desktop'ta Push gibi **senin yapman gereken** insan işlemleri.
- Claude çözemediğini bildirirse.

Bunun dışında Claude'dan "ne yapmalıyım?" sorusu beklenmez; öneri ve hazır iş gelir.
