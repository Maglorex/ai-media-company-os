# Remotion şablonları

Plan: `production/tools/production-pipeline-plan.md` §1–3 · Karar: D-017 · Yalnız render bilgisayarında çalışır.

- Sürümler sabit (`package.json` + `package-lock.json`); yükseltme = yeni sürüm şartlarını yeniden okuma + Founder onayı. Yeni npm paketi = Skill Lab + Founder onayı.
- Kurulum: `npm.cmd ci --ignore-scripts` (bu klasörde).
- Renk/font yalnız `src/theme.ts`'ten.
- Çıktılar repoya girmez: `D:\CompanyOS-Production\<video-id>\02_graphics\` altına render edilir.
  - Premiere'e bindirme (alfa): `npx.cmd remotion render src/index.ts <Comp> <çıktı>.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le`
  - Tam kare: `--codec=h264`
- `licenseKey` ayarlanmaz (Free License; ayarlanırsa telemetri açılır).
