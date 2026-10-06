# Founder Kullanım Kılavuzu

Kısa prosedürler. Teknik ayrıntı bilmen gerekmez; takıldığında Claude'a "ne yapmam lazım?" yaz, o önce dosyalara bakıp çözümü verir.

## 1. Çalışma gününe başlama
1. (İkinci bilgisayardan geldiysen) GitHub Desktop → **Fetch / Pull**.
2. Claude Code'da projeyi aç.
3. Claude günlük **Founder Brief**'i verir. Onay gerektiren bir şey varsa brief'in son satırında yazar.

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
