---
name: research-request
description: Bir karar için dış bilgi gerektiğinde araştırma talebini planlar ve yürütür; research-analyst'e görev verir veya Founder için hazır ChatGPT prompt'u üretir, dönen sonucu şirket hafızasına işler.
---

# Research Request

## 1. Talebi tanımla
- **Karar:** Bu araştırma hangi kararı besliyor?
- **Soru:** Tek cümle.
- **Kapsam / kapsam dışı.**
- **Yeterlilik eşiği:** Hangi bilgi elde edilince karar verilebilir?
- Önce `intelligence/` altında daha önce yapılmış araştırma var mı kontrol et.

## 2. Yürütücüyü seç
| Durum | Yürütücü |
|---|---|
| Web araştırması, rakip/pazar taraması, politika okuma | `research-analyst` agent |
| İkinci görüş, bağımsız fact check, Claude'un erişemediği güncel kaynaklar, uzman analizi | ChatGPT (Founder üzerinden) |
| Kritik karar | İkisi birlikte; sonuçlar karşılaştırılır |

## 3. ChatGPT gerekiyorsa
- `production/templates/chatgpt-prompt.md` formatında **kopyala-yapıştır hazır** prompt üret.
- Prompt'a gizli bilgi, credential veya kişisel veri koyma.
- Founder'a tek satırla ne zaman ve neden gerektiğini söyle; asla yalnızca "ChatGPT'ye sor" deme.

## 4. Sonucu işle
1. Her iddiayı kaynağıyla kontrol et; kaynaksız iddiayı `[VARSAYIM]` say.
2. Claude ve ChatGPT bulguları çelişiyorsa çelişkiyi açıkça yaz.
3. Raporu ilgili `intelligence/` klasörüne kaydet (`.claude/rules/evidence-and-research.md`).
4. Karara etkisini belirt; gerekiyorsa `decision-review` skill'ini çalıştır.
