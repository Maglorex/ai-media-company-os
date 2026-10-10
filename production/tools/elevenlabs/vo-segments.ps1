# Company OS — bölümlü final VO üretimi (.claude/rules/audio-production.md, D-021, D-022)
# Her segment: üretim metni (.txt), ses (.mp3), metadata + kelime/cümle zamanları + QA (.json).
# Zaten üretilmiş segment (mp3 + json mevcut) yeniden üretilmez; yalnız -Only ile belirtilenler zorla yeniden üretilir.
# Kullanım:
#   powershell -ExecutionPolicy Bypass -File production\tools\elevenlabs\vo-segments.ps1 -Segments <segments.json> -OutDir <03_vo\final> -CreditCap 4000 [-Only S05]

param(
    [Parameter(Mandatory)] [string] $Segments,
    [Parameter(Mandatory)] [string] $OutDir,
    [Parameter(Mandatory)] [int] $CreditCap,
    [string] $Only = '',
    [string] $Prefix = 'P3_VO',
    [string] $Version = 'v1',
    [switch] $QaOnly
)

. (Join-Path $PSScriptRoot 'el-common.ps1')
$ffmpeg = Join-Path $PSScriptRoot '..\..\remotion\node_modules\@remotion\compositor-win32-x64-msvc\ffmpeg.exe'
$cfg = Get-Content $Segments -Raw -Encoding UTF8 | ConvertFrom-Json
New-Item -ItemType Directory -Force $OutDir | Out-Null

function Invoke-FF([string]$ArgLine) {
    $psi = New-Object System.Diagnostics.ProcessStartInfo $ffmpeg, $ArgLine
    $psi.RedirectStandardError = $true; $psi.RedirectStandardOutput = $true; $psi.UseShellExecute = $false
    $p = [System.Diagnostics.Process]::Start($psi); $e = $p.StandardError.ReadToEnd(); $p.WaitForExit(); $e
}

function Get-Words($al) {
    # Karakter hizalamasından kelime zamanları (boşlukla ayrılan belirteçler).
    $words = @(); $cur = ''; $start = $null; $end = $null
    for ($i = 0; $i -lt $al.characters.Count; $i++) {
        $c = $al.characters[$i]
        if ($c -match '\s') { if ($cur) { $words += [pscustomobject]@{ w = $cur; start = $start; end = $end }; $cur = '' }; continue }
        if (-not $cur) { $start = [double]$al.character_start_times_seconds[$i] }
        $cur += $c; $end = [double]$al.character_end_times_seconds[$i]
    }
    if ($cur) { $words += [pscustomobject]@{ w = $cur; start = $start; end = $end } }
    $words
}

function Get-Sentences($words) {
    $out = @(); $buf = @()
    foreach ($w in $words) {
        $buf += $w
        if ($w.w -match '[\.\?!]["\u201D\u2019]?$') { $out += [pscustomobject]@{ text = ($buf.w -join ' '); start = $buf[0].start; end = $buf[-1].end }; $buf = @() }
    }
    if ($buf.Count) { $out += [pscustomobject]@{ text = ($buf.w -join ' '); start = $buf[0].start; end = $buf[-1].end } }
    $out
}

$spent = 0
foreach ($seg in $cfg.segments) {
    $base = Join-Path $OutDir ("{0}_{1}_{2}_{3}" -f $Prefix, $seg.id, $Version, $cfg.model)
    $mp3 = "$base.mp3"; $meta = "$base.json"
    if ($QaOnly) {
        if (-not ((Test-Path $mp3) -and (Test-Path $meta))) { continue }
        $old = Get-Content $meta -Raw | ConvertFrom-Json
        $r = [pscustomobject]@{ character_cost = $old.credits_measured; request_id = $old.request_id; alignment = (Get-Content ($base + '.alignment.json') -Raw | ConvertFrom-Json) }
    }
    elseif ((Test-Path $mp3) -and (Test-Path $meta) -and ($Only -ne $seg.id)) {
        $old = Get-Content $meta -Raw | ConvertFrom-Json; $spent += [int]$old.credits_measured
        Write-Output "$($seg.id): mevcut, yeniden üretilmedi"; continue
    }
    if (-not $QaOnly -and $Only -and $Only -ne $seg.id) { continue }
    # Tavan kontrolü: tahmini maliyet (0,45 kredi/karakter, güvenli üst sınır) tavanı aşacaksa dur.
    $est = [math]::Ceiling($seg.text.Length * 0.45)
    if (-not $QaOnly -and $spent + $est -gt $CreditCap) { Write-Output "DUR: $($seg.id) tavanı aşabilir (harcanan $spent + tahmini $est > $CreditCap)"; break }

    if (-not $QaOnly) {
    [IO.File]::WriteAllText("$base.txt", $seg.text, (New-Object Text.UTF8Encoding $false))
    $r = Invoke-ElTtsTimestamps -VoiceId $cfg.voice_id -ModelId $cfg.model -Text $seg.text -OutFile $mp3 -PreviousText $seg.previous_text -NextText $seg.next_text
    ($r.alignment | ConvertTo-Json -Depth 4 -Compress) | Set-Content -Encoding utf8 ($base + '.alignment.json')
    }
    $spent += [int]$r.character_cost

    $words = @(Get-Words $r.alignment); $sents = @(Get-Sentences $words)
    $probe = Invoke-FF "-hide_banner -i `"$mp3`" -f null -"
    $dur = if ($probe -match 'Duration: (\d+):(\d+):([\d.]+)') { [int]$matches[1]*3600 + [int]$matches[2]*60 + [double]$matches[3] } else { $null }
    $sil = Invoke-FF "-hide_banner -nostats -i `"$mp3`" -af silencedetect=noise=-45dB:d=0.35 -f null -"
    $pauses = @([regex]::Matches($sil, 'silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+) \| silence_duration: ([\d.]+)') | ForEach-Object { [pscustomobject]@{ start = [double]$_.Groups[1].Value; end = [double]$_.Groups[2].Value; dur = [double]$_.Groups[3].Value } })
    $ln = Invoke-FF "-hide_banner -nostats -i `"$mp3`" -af loudnorm=print_format=json -f null -"
    $lj = $null; if ($ln -match '(\{[\s\S]*\})') { $lj = $matches[1] | ConvertFrom-Json }

    # QA kuralları (ölçülebilir; kulak kontrolü değil)
    $issues = @()
    $alignedText = -join $r.alignment.characters
    if ($alignedText -ne $seg.text) { $issues += 'hizalama metni üretim metniyle birebir değil' }
    $lastEnd = if ($words.Count) { $words[-1].end } else { 0 }
    # Kesilme: hizalamanın son karakteri (noktalama) sondaki sessizliği kapsayabildiği için gerçek ses ölçümüne bakılır:
    # dosya sonunda >= 0,15 sn sessizlik olmalı.
    # Son kelimeden sonra başlayan >= 0,3 sn sessizlik = konuşma sonu. Ardından gelen kısa, düşük seviyeli ses (ör. nefes)
    # uyarı olarak kaydedilir ve birleştirmede kırpılır (vo-assemble). Böyle bir sessizlik yoksa kesilme şüphesi.
    $lastWordStart = if ($words.Count) { $words[-1].start } else { 0 }
    $tail = $pauses | Where-Object { $_.start -gt $lastWordStart -and ($_.end - $_.start) -ge 0.3 } | Select-Object -Last 1
    if ($dur -and -not $tail) { $issues += 'son kelimeden sonra sessizlik yok (kesilme şüphesi)' }
    $speechEnd = if ($tail) { $tail.start } else { $lastEnd }
    $warnings = @(); if ($tail -and ($dur - $tail.end) -gt 0.1) { $warnings += ('sonda kısa ses (' + ('{0:N2}' -f ($dur - $tail.end)) + ' sn) — birleştirmede kırpılır') }
    $midLong = $pauses | Where-Object { $_.dur -gt 1.6 -and $_.start -gt 0.2 -and $_.end -lt ($dur - 0.2) }
    if ($midLong) { $issues += ('uzun iç sessizlik: ' + (($midLong | ForEach-Object { '{0:N1}s ({1:N2})' -f $_.start, $_.dur }) -join ', ')) }
    if ($lj -and [double]$lj.input_tp -gt -1.0) { $issues += "true peak yüksek ($($lj.input_tp) dBTP)" }
    $wpm = if ($speechEnd -gt 0) { [math]::Round($words.Count / (($speechEnd - $words[0].start) / 60), 0) } else { 0 }
    if ($wpm -lt 110 -or $wpm -gt 175) { $issues += "tempo olağandışı ($wpm kelime/dk)" }

    $record = [ordered]@{
        id = $seg.id; version = $Version; model = $cfg.model; voice = $cfg.voice_name; voice_id = $cfg.voice_id
        script_source = $cfg.script_source; production_text_notes = $seg.notes
        text = $seg.text; previous_text = $seg.previous_text; next_text = $seg.next_text
        chars = $seg.text.Length; credits_measured = [int]$r.character_cost; request_id = $r.request_id
        duration_s = $dur; speech_start_s = $words[0].start; speech_end_s = $speechEnd; alignment_end_s = $lastEnd; words_per_min = $wpm
        loudness = if ($lj) { [ordered]@{ integrated_lufs = $lj.input_i; true_peak_dbtp = $lj.input_tp; lra = $lj.input_lra } } else { $null }
        pauses = $pauses; qa_issues = $issues; qa_warnings = $warnings; qa_pass = ($issues.Count -eq 0)
        sentences = $sents; words = $words
        generated = (Get-Date).ToString('yyyy-MM-dd HH:mm')
    }
    ($record | ConvertTo-Json -Depth 6) | Set-Content -Encoding utf8 $meta
    Write-Output ("{0}: {1} kar · {2} kredi · {3:N1} sn · {4} kel/dk · {5} · QA {6}" -f $seg.id, $seg.text.Length, $r.character_cost, $dur, $wpm, $(if ($lj) { "$($lj.input_i) LUFS / $($lj.input_tp) dBTP" } else { '-' }), $(if ($issues.Count) { 'SORUN: ' + ($issues -join '; ') } else { 'temiz' }))
}
Write-Output "Toplam ölçülen kredi (bu klasör): $spent / tavan $CreditCap"
exit 0
