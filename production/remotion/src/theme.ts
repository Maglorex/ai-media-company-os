// Tüm şablonlar renk/font için yalnız bu dosyadan beslenir (plan §3).
// Şu an P3 geçici pilot dili — kalıcı kanal markası DEĞİL; marka gelince yalnız bu dosya değişir.
export const theme = {
  background: '#0f1b2d', // koyu lacivert
  text: '#f2efe8', // kırık beyaz
  accent: '#e0a23a', // tek kehribar vurgu
  muted: '#b4bccb',
  // Belge vurgusu: kehribarın açık tonu; multiply ile kâğıtta fosforlu kalem gibi durur, siyah metin okunur kalır.
  highlight: 'rgba(240, 186, 80, 0.55)',
  labelBackground: 'rgba(15, 27, 45, 0.85)',
  // Grafik serileri: vurgusuz öğeler için sakin tonlar; vurgulu öğe `accent` alır.
  series: ['#8fa3bf', '#c7b48e', '#6f8299', '#a89a7c'],
  // Harita: deniz = background; kara koyu, vurgulu bölge biraz açık.
  mapLand: '#1d2b42',
  mapHighlight: '#2c3e5c',
  mapBorder: '#3a4b66',
  fontFamily: 'Segoe UI, Arial, sans-serif',
};
