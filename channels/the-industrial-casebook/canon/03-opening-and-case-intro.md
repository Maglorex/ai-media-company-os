# 03 — Central Question, Opening, CASE INTRO (TIC-06 … TIC-12)

## 1. Merkezi soru (TIC-06, TIC-07)
- Production başlamadan önce her video için şu soru **açıkça yazılır** (treatment'ta, İngilizce + Türkçe anlamı):
  **"What exact question is the viewer waiting to have answered?"**
- Video, hikâyenin izin verdiği **en erken anda** spesifik ve cevaplanabilir bir bilgi boşluğu açar. İzleyici çok erken "Bunun cevabı ne?" diye düşünmelidir.
- **Bağlam meraktan önce yığılmaz** (TIC-07): kuruluş, tarihçe, teknik tanım ancak bir sonraki kanıtı anlamak için gerektiği anda ve kadar verilir.
- Kanıt uygunsa paradoksun doğrudan bir soru olarak ifade edilmesi tercih edilir — ama soru gerçek vakadan doğmalıdır.

## 2. Açılış mantığı — şablon değil (TIC-08, TIC-09, TIC-10)
- **Varsayılan yaklaşım (HEURISTIC, TIC-08):** PARADOX / QUESTION → CASE ENTRY → RECURRING CASE INTRO → EVIDENCE TEASE → INVESTIGATION. Hikâye başka sırayla daha iyi çalışıyorsa gerekçe yazılarak değiştirilir.
- **Kelime ya da saniye şablonu değildir (TIC-10):** ilk kelimenin "Why" olması, her videonun aynı süre içinde aynı formülle açılması gerekmez ve istenmez. Ölçüt formül değil, izleyicide gerçek bir sorunun oluşmasıdır.
- **Generic rhetorical question yasak (TIC-09):** "Have you ever wondered…?", "What if I told you…?" gibi vakadan bağımsız yapay sorular kullanılmaz. Yerine gerçek vakadan doğan spesifik problem: somut nesne/karar + anormallik + bahis.

## 3. CASE INTRO ≠ CASE LABEL (TIC-11, TIC-12; D-044)
| | CASE INTRO | CASE LABEL |
|---|---|---|
| Nedir | Kanalın **tekrar tanınabilir motion signature'ı** — stable skeleton / recognizable motion DNA | Küçük yardımcı **metadata/UI** öğesi (ör. `CASE 001 · NS SAVANNAH`) |
| Sabit | Skeleton: yapı, hareket karakteri, tipografi hiyerarşisi, ses rolü (kalibrasyonda kilitlenir) | Görünüm kuralları `video-ui-spec-v1.md` |
| Değişken (payload) | case number · title · hero object · motif · case accent | Metin |
| Ne değildir | Uzun standalone logo intro değildir; hikâyeyi durdurmaz; açılış mantığında CASE ENTRY'den sonra gelir | **Intro değildir.** Tek başına kanal kimliği/intro işlevi görmez |
- **Golden Master** (skeleton'ın kesin tasarımı ve referans render'ı) **bir defalık kalibrasyon işidir** — Stage 5 (`06`). Stage 2 yalnız bu spec'i tanımlar; CASE INTRO tasarlanmaz, render edilmez.
- Kalibrasyon tamamlanana kadar videolarda CASE INTRO yerine geçici çözüm üretilmez; CASE LABEL'ın intro gibi büyütülmesi yasaktır.
- Eski "her videoda yeniden tasarlanan ident / ident render'ı tekrar kullanılmaz" yaklaşımı (D-034) SUPERSEDED. Eski davranış kütüphanesi (Object Outline → Label, Document Line → Title, Route → Mark vb.) **payload fikirleri için HEURISTIC kaynak** olarak okunabilir (`intelligence/creative/brand/dynamic-case-ident-system.md`, artifact SUPERSEDED).
