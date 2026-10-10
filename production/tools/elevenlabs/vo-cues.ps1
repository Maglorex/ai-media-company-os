# Company OS — VO kelime zamanlarından sahne (beat) ve animasyon (cue) zamanları üretir (D-022).
# Girdi: cue tanımı (JSON), 03_vo\final segment JSON'ları, birleşik zamanlama haritası (timing.json).
# Çıktı: Remotion için TypeScript modülü (saniye + kare) ve kurgu zaman çizelgesi (Markdown).
# Segment yeniden üretilirse önce vo-assemble, sonra bu betik yeniden çalıştırılır.
# Kullanım:
#   powershell -ExecutionPolicy Bypass -File production\tools\elevenlabs\vo-cues.ps1 -Cues <P3-vo-cues.json> -VoDir <03_vo\final> -Timing <P3_VO_full_v1.timing.json> -OutTs <src\videos\p3\voCues.ts> -OutMd <P3-edit-timeline.md>

param(
    [Parameter(Mandatory)] [string] $Cues,
    [Parameter(Mandatory)] [string] $VoDir,
    [Parameter(Mandatory)] [string] $Timing,
    [Parameter(Mandatory)] [string] $OutTs,
    [Parameter(Mandatory)] [string] $OutMd,
    [string] $Pattern = 'P3_VO_{0}_v1_eleven_multilingual_v2.json',
    [int] $Fps = 30
)

# Sayılar TypeScript'e nokta ondalıkla yazılmalı (Türkçe bölge ayarı virgül üretir).
[Threading.Thread]::CurrentThread.CurrentCulture = [Globalization.CultureInfo]::InvariantCulture

function Norm([string]$s) { (($s.ToLower() -replace '[‘’]', "'") -replace "[^a-z0-9'\-]", '').Trim("'") }

$cfg = Get-Content $Cues -Raw -Encoding UTF8 | ConvertFrom-Json
$map = Get-Content $Timing -Raw -Encoding UTF8 | ConvertFrom-Json
$offsets = @{}; foreach ($s in $map.segments) { $offsets[$s.id] = [double]$s.offset_s }
$words = @{}
foreach ($id in $offsets.Keys) {
    # Birleştirmedeki duraklama kısaltmaları uygulanmış kelime zamanları timing.json'da (words_local); yoksa segment JSON'ı.
    $segMap = $map.segments | Where-Object { $_.id -eq $id }
    $src = if ($segMap.words_local) { $segMap.words_local } else { (Get-Content (Join-Path $VoDir ($Pattern -f $id)) -Raw -Encoding UTF8 | ConvertFrom-Json).words }
    $words[$id] = @($src | ForEach-Object { [pscustomobject]@{ n = (Norm $_.w); start = [double]$_.start } } | Where-Object { $_.n })
}

function Find-Phrase($seg, $phrase) {
    $toks = @(($phrase -split '\s+') | ForEach-Object { Norm $_ } | Where-Object { $_ })
    $ws = $words[$seg]
    for ($i = 0; $i -le $ws.Count - $toks.Count; $i++) {
        $ok = $true
        for ($k = 0; $k -lt $toks.Count; $k++) { if ($ws[$i + $k].n -ne $toks[$k]) { $ok = $false; break } }
        if ($ok) { return [math]::Round($offsets[$seg] + $ws[$i].start, 3) }
    }
    throw "İfade bulunamadı: [$seg] '$phrase'"
}

$beats = @(); foreach ($b in $cfg.beats) { $beats += [pscustomobject]@{ id = $b.id; seg = $b.seg; visual = $b.visual; plan = $b.plan; phrase = $b.phrase; start = (Find-Phrase $b.seg $b.phrase) } }
$beats = @($beats | Sort-Object start)
for ($i = 0; $i -lt $beats.Count; $i++) {
    $end = if ($i -lt $beats.Count - 1) { $beats[$i + 1].start } else { [double]$map.total_s }
    $beats[$i] | Add-Member end ([math]::Round($end, 3))
    $beats[$i] | Add-Member frames ([int][math]::Ceiling(($end - $beats[$i].start) * $Fps))
}
$cueList = @(); foreach ($c in $cfg.cues) { $cueList += [pscustomobject]@{ id = $c.id; start = (Find-Phrase $c.seg $c.phrase) } }

# TypeScript modülü
$ts = New-Object System.Text.StringBuilder
[void]$ts.AppendLine('// OTOMATİK ÜRETİLDİ — elle düzenleme. Kaynak: production/tools/elevenlabs/vo-cues.ps1')
[void]$ts.AppendLine("// VO: $([IO.Path]::GetFileName($Timing)) · toplam $($map.total_s) sn · $Fps fps · üretim $(Get-Date -Format 'yyyy-MM-dd HH:mm')")
[void]$ts.AppendLine("export const VO_FPS = $Fps;")
[void]$ts.AppendLine("export const VO_TOTAL_S = $($map.total_s);")
[void]$ts.AppendLine('export const beats = {')
foreach ($b in $beats) { [void]$ts.AppendLine(("  {0}: {{start: {1}, end: {2}, frames: {3}}}, // {4} · {5}" -f $b.id, $b.start, $b.end, $b.frames, $b.plan, $b.visual)) }
[void]$ts.AppendLine('} as const;')
[void]$ts.AppendLine('export const cues = {')
foreach ($c in $cueList) { [void]$ts.AppendLine(("  {0}: {1}," -f $c.id, $c.start)) }
[void]$ts.AppendLine('} as const;')
[void]$ts.AppendLine('export type BeatId = keyof typeof beats;')
[void]$ts.AppendLine('export type CueId = keyof typeof cues;')
[void]$ts.AppendLine('/** Beat süresi (kare). */')
[void]$ts.AppendLine('export const beatFrames = (b: BeatId) => beats[b].frames;')
[void]$ts.AppendLine('/** Cue anının beat başlangıcına göre karesi (beat içinde animasyon tetikleme). */')
[void]$ts.AppendLine('export const at = (c: CueId, b: BeatId) => Math.max(0, Math.round((cues[c] - beats[b].start) * VO_FPS));')
[IO.File]::WriteAllText($OutTs, $ts.ToString().Replace("`r`n", "`n"), (New-Object Text.UTF8Encoding $false))

# Kurgu zaman çizelgesi
function Tc([double]$s) { $d = [math]::Floor($s * 10); '{0}:{1:00}.{2}' -f [math]::Floor($d / 600), [math]::Floor(($d % 600) / 10), ($d % 10) }
$md = New-Object System.Text.StringBuilder
[void]$md.AppendLine('# P3 — Kurgu zaman çizelgesi (VO senkron)')
[void]$md.AppendLine('')
[void]$md.AppendLine("> OTOMATİK ÜRETİLDİ ($(Get-Date -Format 'yyyy-MM-dd HH:mm')) — ``production/tools/elevenlabs/vo-cues.ps1``. Kaynak VO: ``03_vo\final\$([IO.Path]::GetFileName($Timing))`` (toplam $(Tc $map.total_s)). Tanım: ``P3-vo-cues.json``. Zamanlar edit plan v1'deki tahminlerin yerini alır (plan: ~9–10 dk; gerçek VO: $(Tc $map.total_s)).")
[void]$md.AppendLine('> Kurgu: her görsel beat başlangıcında başlar, sonraki beat başlangıcında biter. ``photo:`` = Premiere''de fotoğraf hareketi; ``@return``/``@end`` = kompozisyonun son bölümünden kullanım.')
[void]$md.AppendLine('')
[void]$md.AppendLine('| Beat | Başlangıç | Bitiş | Süre (sn) | Plan | Görsel | VO başlangıcı |')
[void]$md.AppendLine('|---|---|---|---|---|---|---|')
foreach ($b in $beats) { [void]$md.AppendLine(("| {0} | {1} | {2} | {3:N1} | {4} | ``{5}`` | ""{6}…"" |" -f $b.id, (Tc $b.start), (Tc $b.end), ($b.end - $b.start), $b.plan, $b.visual, $b.phrase)) }
[void]$md.AppendLine('')
[void]$md.AppendLine('## Animasyon cue''ları (grafik içi tetikleme)')
[void]$md.AppendLine('| Cue | Zaman |')
[void]$md.AppendLine('|---|---|')
foreach ($c in $cueList) { [void]$md.AppendLine(("| {0} | {1} |" -f $c.id, (Tc $c.start))) }
[IO.File]::WriteAllText($OutMd, $md.ToString().Replace("`r`n", "`n"), (New-Object Text.UTF8Encoding $false))
Write-Output ("{0} beat · {1} cue · toplam {2} · ilk beat {3} · son beat {4}" -f $beats.Count, $cueList.Count, (Tc $map.total_s), (Tc $beats[0].start), (Tc $beats[-1].start))
exit 0
