# Company OS — VO segmentlerini tek dosyada birleştirir (.claude/rules/audio-production.md, D-022)
# Her segment konuşma sonundan (segment JSON: speech_end_s) +TailPad sn sonra kesilir, kısa fade-out uygulanır;
# segmentler arası boşluk "son kelime → sonraki ilk kelime" = Gap sn olacak şekilde sessizlikle doldurulur.
# Çıktılar: ham ana kopya (WAV, Premiere için), Founder dinleme kopyası (MP3, loudnorm), zamanlama haritası (JSON).
# Kullanım:
#   powershell -ExecutionPolicy Bypass -File production\tools\elevenlabs\vo-assemble.ps1 -Dir <03_vo\final> -Name P3_VO_full_v1
# Duraklama kısaltma (opsiyonel, segment içi): -PauseEdits 'S05:21.585:23.041:0.97' = S05'te 21,585–23,041 sn sessizliği
# 0,97 sn'ye indir (sessizliğin ortasından keser; konuşmaya dokunmaz; sonraki kelime/cümle zamanları kaydırılır).

param(
    [Parameter(Mandatory)] [string] $Dir,
    [Parameter(Mandatory)] [string] $Name,
    [string] $Pattern = 'P3_VO_S??_v1_eleven_multilingual_v2',
    [double] $TailPad = 0.30,
    [double] $Gap = 1.20,
    [double] $FadeMs = 30,
    [double] $ListenLufs = -16,
    [string[]] $PauseEdits = @()
)

$ffmpeg = Join-Path $PSScriptRoot '..\..\remotion\node_modules\@remotion\compositor-win32-x64-msvc\ffmpeg.exe'
$rate = 44100
[Threading.Thread]::CurrentThread.CurrentCulture = [Globalization.CultureInfo]::InvariantCulture
$edits = @($PauseEdits -join ',' -split ',' | Where-Object { $_ } | ForEach-Object { $p = $_ -split ':'; [pscustomobject]@{ seg = $p[0]; s = [double]$p[1]; e = [double]$p[2]; target = [double]$p[3] } })
function Invoke-FF([string]$ArgLine) {
    $psi = New-Object System.Diagnostics.ProcessStartInfo $ffmpeg, $ArgLine
    $psi.RedirectStandardError = $true; $psi.RedirectStandardOutput = $true; $psi.UseShellExecute = $false
    $p = [System.Diagnostics.Process]::Start($psi); $e = $p.StandardError.ReadToEnd(); $p.WaitForExit()
    if ($p.ExitCode -ne 0) { throw "ffmpeg hata ($($p.ExitCode)): $($e.Substring([Math]::Max(0, $e.Length - 400)))" }
    $e
}

$tmp = Join-Path $Dir '_assemble_tmp'; New-Item -ItemType Directory -Force $tmp | Out-Null
$metas = Get-ChildItem $Dir -Filter "$Pattern.json" | Sort-Object Name
if (-not $metas) { throw "Segment bulunamadı: $Pattern" }

$out = New-Object System.Collections.Generic.List[byte]
$map = @(); $cursor = 0.0; $prevSpeechEnd = $null
foreach ($mf in $metas) {
    $m = Get-Content $mf.FullName -Raw | ConvertFrom-Json
    $mp3 = $mf.FullName -replace '\.json$', '.mp3'
    # Bu ffmpeg sürümünde ham s16le çıkışı yok → WAV'a çöz, 'data' bölümünü ayıkla.
    $wavTmp = Join-Path $tmp ($m.id + '.wav')
    Invoke-FF "-hide_banner -y -i `"$mp3`" -c:a pcm_s16le -ac 1 -ar $rate `"$wavTmp`"" | Out-Null
    $all = [IO.File]::ReadAllBytes($wavTmp)
    $pos = 12; $pcm = $null
    while ($pos -lt $all.Length - 8) { $id = [Text.Encoding]::ASCII.GetString($all, $pos, 4); $len = [BitConverter]::ToInt32($all, $pos + 4); if ($id -eq 'data') { if ($len -le 0 -or $len -gt $all.Length - $pos - 8) { $len = $all.Length - $pos - 8 }; $pcm = New-Object byte[] $len; [Array]::Copy($all, $pos + 8, $pcm, 0, $len); break }; $pos += 8 + $len + ($len % 2) }
    if (-not $pcm) { throw "WAV data bölümü bulunamadı: $wavTmp" }
    # Segment içi duraklama kısaltmaları (sondan başa: önceki konumlar geçerli kalsın)
    $words = @($m.words | ForEach-Object { [pscustomobject]@{ w = $_.w; start = [double]$_.start; end = [double]$_.end } })
    $sents = @($m.sentences | ForEach-Object { [pscustomobject]@{ text = $_.text; start = [double]$_.start; end = [double]$_.end } })
    $speechEnd = [double]$m.speech_end_s; $applied = @()
    foreach ($ed in ($edits | Where-Object { $_.seg -eq $m.id } | Sort-Object s -Descending)) {
        $removed = ($ed.e - $ed.s) - $ed.target; if ($removed -le 0) { continue }
        $from = [int]([math]::Round(($ed.s + $ed.target / 2) * $rate)) * 2; $n = [int]([math]::Round($removed * $rate)) * 2
        $np = New-Object byte[] ($pcm.Length - $n); [Array]::Copy($pcm, 0, $np, 0, $from); [Array]::Copy($pcm, $from + $n, $np, $from, $pcm.Length - $from - $n); $pcm = $np
        foreach ($x in @($words) + @($sents)) { if ($x.start -ge $ed.e) { $x.start -= $removed }; if ($x.end -ge $ed.e) { $x.end -= $removed } }
        if ($speechEnd -ge $ed.e) { $speechEnd -= $removed }
        $applied += [ordered]@{ silence_start = $ed.s; silence_end = $ed.e; target_silence = $ed.target; removed_s = [math]::Round($removed, 3) }
    }
    $cut = [math]::Min([int]([math]::Round(($speechEnd + $TailPad) * $rate)) * 2, $pcm.Length)
    # Fade-out (doğrusal), kesme noktasında tık önlemek için
    $fadeN = [int]($FadeMs / 1000 * $rate)
    for ($k = 0; $k -lt $fadeN; $k++) {
        $idx = $cut - ($fadeN - $k) * 2; if ($idx -lt 0) { continue }
        $s = [BitConverter]::ToInt16($pcm, $idx); $v = [int16]([math]::Round($s * ($fadeN - $k) / $fadeN))
        $bb = [BitConverter]::GetBytes($v); $pcm[$idx] = $bb[0]; $pcm[$idx + 1] = $bb[1]
    }
    # Segmentler arası sessizlik: önceki konuşma sonu + Gap = bu segmentin konuşma başlangıcı
    if ($null -ne $prevSpeechEnd) {
        $silence = [math]::Max(0.0, ($prevSpeechEnd + $Gap) - $cursor - [double]$m.speech_start_s)
        $n = [int]([math]::Round($silence * $rate)) * 2
        $out.AddRange((New-Object byte[] $n)); $cursor += $n / 2 / $rate
    }
    $offset = $cursor
    $seg = New-Object byte[] $cut; [Array]::Copy($pcm, $seg, $cut); $out.AddRange($seg)
    $cursor += $cut / 2 / $rate
    $prevSpeechEnd = $offset + $speechEnd
    $map += [ordered]@{
        id = $m.id; source = [IO.Path]::GetFileName($mp3); offset_s = [math]::Round($offset, 3)
        speech_start_s = [math]::Round($offset + [double]$m.speech_start_s, 3); speech_end_s = [math]::Round($prevSpeechEnd, 3)
        cut_at_source_s = [math]::Round($cut / 2 / $rate, 3)
        pause_edits = $applied
        sentences = @($sents | ForEach-Object { [ordered]@{ text = $_.text; start = [math]::Round($offset + $_.start, 3); end = [math]::Round($offset + [math]::Min($_.end, $speechEnd), 3) } })
        # Segment içi (yerel) kelime zamanları, duraklama kısaltmaları uygulanmış; vo-cues bunları kullanır.
        words_local = @($words | ForEach-Object { [ordered]@{ w = $_.w; start = [math]::Round($_.start, 3); end = [math]::Round($_.end, 3) } })
    }
}

# WAV başlığı + PCM (ham ana kopya)
$wav = Join-Path $Dir "$Name.wav"
$data = $out.ToArray()
$fs = [IO.File]::Create($wav); $bw = New-Object IO.BinaryWriter $fs
$bw.Write([Text.Encoding]::ASCII.GetBytes('RIFF')); $bw.Write([int](36 + $data.Length)); $bw.Write([Text.Encoding]::ASCII.GetBytes('WAVEfmt '))
$bw.Write([int]16); $bw.Write([int16]1); $bw.Write([int16]1); $bw.Write([int]$rate); $bw.Write([int]($rate * 2)); $bw.Write([int16]2); $bw.Write([int16]16)
$bw.Write([Text.Encoding]::ASCII.GetBytes('data')); $bw.Write([int]$data.Length); $bw.Write($data); $bw.Close()

# Founder dinleme kopyası: loudnorm (tek geçiş) → MP3
$listen = Join-Path $Dir "$Name`_LISTEN.mp3"
Invoke-FF "-hide_banner -y -i `"$wav`" -af loudnorm=I=$($ListenLufs):TP=-1.5:LRA=11 -ar $rate -c:a libmp3lame -b:a 192k `"$listen`"" | Out-Null

$total = $data.Length / 2 / $rate
$mapFile = Join-Path $Dir "$Name.timing.json"
([ordered]@{ name = $Name; total_s = [math]::Round($total, 3); pause_edits = $PauseEdits; gap_s = $Gap; tail_pad_s = $TailPad; fade_ms = $FadeMs; listening_copy_lufs = $ListenLufs; segments = $map } | ConvertTo-Json -Depth 6) | Set-Content -Encoding utf8 $mapFile
Remove-Item -Recurse -Force -LiteralPath $tmp
Write-Output ("Birleştirildi: {0} segment · {1:N1} sn ({2}) · {3} · {4}" -f $map.Count, $total, ([TimeSpan]::FromSeconds($total).ToString('m\:ss')), [IO.Path]::GetFileName($wav), [IO.Path]::GetFileName($listen))
exit 0
