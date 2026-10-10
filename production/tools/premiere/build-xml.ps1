# Company OS — Premiere Pro için FCP 7 XML (xmeml v4) başlangıç timeline'ı üretir.
# Girdi: video tanımı (<video>-premiere.json), voCues.ts (VO beat/cue zamanları), Remotion klip listesi (_compositions.csv: id,frames).
# Track düzeni: V1 grafik + fotoğraf · V2 üst iz (overlay beat'ler) · V3 opsiyonel fotoğraf eklemeleri (devre dışı) · A1 VO.
# Müzik/SFX dosyası yok: sequence marker'ları (MUSIC / SFX / SILENCE) + fotoğraf klip marker'ları (Premiere hareket notları).
# Kullanım:
#   powershell -ExecutionPolicy Bypass -File production\tools\premiere\build-xml.ps1 -Config <json> -Cues <voCues.ts> -Comps <_compositions.csv> -Out <xml> [-Only b00,b02,b03] [-Name <seq>]

param(
    [Parameter(Mandatory)] [string] $Config,
    [Parameter(Mandatory)] [string] $Cues,
    [Parameter(Mandatory)] [string] $Comps,
    [Parameter(Mandatory)] [string] $Out,
    [string] $Only = '',
    [string] $Name = ''
)
[Threading.Thread]::CurrentThread.CurrentCulture = [Globalization.CultureInfo]::InvariantCulture
$cfg = Get-Content $Config -Raw -Encoding UTF8 | ConvertFrom-Json
$fps = [int]$cfg.fps; $SeqW = [int]$cfg.width; $SeqH = [int]$cfg.height
$pre = [int][math]::Round([double]$cfg.preroll_s * $fps)
$seqName = if ($Name) { $Name } else { $cfg.name }
$onlySet = @($Only -split ',' | Where-Object { $_ })

# voCues.ts ayrıştırma
$ts = Get-Content $Cues -Raw -Encoding UTF8
$beats = @{}; foreach ($m in [regex]::Matches($ts, '(?m)^\s+(\w+): \{start: ([\d.]+), end: ([\d.]+), frames: (\d+)\}')) { $beats[$m.Groups[1].Value] = [pscustomobject]@{ start = [double]$m.Groups[2].Value; end = [double]$m.Groups[3].Value } }
$cueT = @{}; foreach ($m in [regex]::Matches($ts, '(?m)^\s+(\w+): ([\d.]+),\s*$')) { $cueT[$m.Groups[1].Value] = [double]$m.Groups[2].Value }
$voTotal = [double]([regex]::Match($ts, 'VO_TOTAL_S = ([\d.]+)').Groups[1].Value)
$ToFrame = { param([double]$s) $pre + [int][math]::Round($s * $fps) }
$seqDur = $pre + [int][math]::Ceiling($voTotal * $fps)

function Esc([string]$s) { [Security.SecurityElement]::Escape($s) }
function Url([string]$p) { $parts = @(($p -replace '\\', '/') -split '/' | ForEach-Object { [uri]::EscapeDataString($_) }); 'file://localhost/' + ($parts -join '/') }
$fileIds = @{}; $n = 0
function FileXml([string]$path, [int]$dur, [string]$kind, [int]$w = 0, [int]$h = 0) {
    if ($fileIds.ContainsKey($path)) { return "<file id=""$($fileIds[$path])""/>" }
    $script:n++; $id = "file-$($script:n)"; $fileIds[$path] = $id
    $media = if ($kind -eq 'audio') { "<audio><samplecharacteristics><depth>16</depth><samplerate>44100</samplerate></samplecharacteristics><channelcount>1</channelcount></audio>" }
             elseif ($kind -eq 'still') { "<video><samplecharacteristics><width>$w</width><height>$h</height></samplecharacteristics></video>" }
             else { "<video><samplecharacteristics><width>$SeqW</width><height>$SeqH</height></samplecharacteristics></video>" }
    "<file id=""$id""><name>$(Esc ([IO.Path]::GetFileName($path)))</name><pathurl>$(Url $path)</pathurl><rate><timebase>$fps</timebase><ntsc>FALSE</ntsc></rate><duration>$dur</duration><media>$media</media></file>"
}
function Scale($w, $h, $fit) {
    switch ($fit) { 'cover' { [math]::Round(100 * [math]::Max($SeqW / $w, $SeqH / $h), 2) } 'contain' { [math]::Round(100 * [math]::Min($SeqW / $w, $SeqH / $h) * 0.85, 2) } 'contain-small' { 100 } default { 100 } }
}
function MotionFilter([double]$scale) { "<filter><effect><name>Basic Motion</name><effectid>basic</effectid><effectcategory>motion</effectcategory><effecttype>motion</effecttype><mediatype>video</mediatype><parameter><parameterid>scale</parameterid><name>Scale</name><valuemin>0</valuemin><valuemax>1000</valuemax><value>$scale</value></parameter></effect></filter>" }
function Marker([string]$name, [string]$comment, [int]$at) { "<marker><name>$(Esc $name)</name><comment>$(Esc $comment)</comment><in>$at</in><out>-1</out></marker>" }
$ci = 0
function Clip([string]$name, [string]$fileXml, [int]$start, [int]$len, [string]$extra = '', [bool]$enabled = $true) {
    $script:ci++
    "<clipitem id=""clip-$($script:ci)""><name>$(Esc $name)</name><enabled>$(if ($enabled) { 'TRUE' } else { 'FALSE' })</enabled><duration>$len</duration><rate><timebase>$fps</timebase><ntsc>FALSE</ntsc></rate><start>$start</start><end>$($start + $len)</end><in>0</in><out>$len</out>$fileXml$extra</clipitem>"
}

$problems = @(); $want = { param($b) (-not $onlySet) -or ($onlySet -contains $b) }
# Grafik klipleri
$compList = @(Get-Content $Comps -Encoding UTF8 | ForEach-Object { $p = $_ -split ','; [pscustomobject]@{ id = $p[0]; frames = [int]$p[1]; beat = ($p[0] -split '-')[1] } })
$v1 = @(); $v2 = @(); $v3 = @(); $v1raw = @()
foreach ($c in $compList) {
    if (-not (& $want $c.beat)) { continue }
    $path = Join-Path $cfg.graphics_dir "$($c.id).mov"
    if (-not (Test-Path $path)) { $problems += "eksik medya: $path"; continue }
    $start = if ($c.beat -eq 'b00') { 0 } else { & $ToFrame $beats[$c.beat].start }
    if ($cfg.overlay_beats -contains $c.beat) { $v2 += Clip $c.id (FileXml $path $c.frames 'video') $start $c.frames }
    else { $v1raw += [pscustomobject]@{ name = $c.id; file = (FileXml $path $c.frames 'video'); start = $start; len = $c.frames; extra = '' } }
}
# Ana fotoğraflar (beat boyunca)
foreach ($ph in $cfg.photos) {
    if (-not (& $want $ph.beat)) { continue }
    $path = Join-Path $cfg.photos_dir $ph.file
    if (-not (Test-Path $path)) { $problems += "eksik foto: $path"; continue }
    $s = & $ToFrame $beats[$ph.beat].start; $e = & $ToFrame $beats[$ph.beat].end; $len = $e - $s
    $extra = (MotionFilter (Scale $ph.w $ph.h $ph.fit)) + (Marker 'PREMIERE MOTION' $ph.note 0)
    $v1raw += [pscustomobject]@{ name = ("PHOTO " + $ph.file); file = (FileXml $path ($len) 'still' $ph.w $ph.h); start = $s; len = $len; extra = $extra }
}
# V1: her klip bir sonrakinin başlangıcına kırpılır (yuvarlamadan doğan 1 karelik çakışmalar; kırpma = son karelerin atılması)
$v1raw = @($v1raw | Sort-Object start)
for ($i = 0; $i -lt $v1raw.Count; $i++) { $it = $v1raw[$i]; if ($i -lt $v1raw.Count - 1) { $it.len = [math]::Min($it.len, $v1raw[$i + 1].start - $it.start) }; $v1 += Clip $it.name $it.file $it.start $it.len $it.extra }
# Opsiyonel eklemeler (devre dışı)
foreach ($ins in $cfg.inserts) {
    if ($onlySet) { continue }
    $path = Join-Path $cfg.photos_dir $ins.file
    if (-not (Test-Path $path)) { $problems += "eksik foto: $path"; continue }
    $s = & $ToFrame ($cueT[$ins.cue] + [double]$ins.offset_s); $len = [int][math]::Round([double]$ins.dur_s * $fps)
    $extra = (MotionFilter (Scale $ins.w $ins.h $ins.fit)) + (Marker 'OPTIONAL INSERT' $ins.note 0)
    $v3 += Clip ("OPTIONAL " + $ins.file) (FileXml $path $len 'still' $ins.w $ins.h) $s $len $extra $false
}
# VO
$voLen = [int][math]::Ceiling($voTotal * $fps)
if (-not (Test-Path $cfg.vo)) { $problems += "eksik VO: $($cfg.vo)" }
$a1 = Clip ([IO.Path]::GetFileName($cfg.vo)) (FileXml $cfg.vo $voLen 'audio') $pre $voLen '<sourcetrack><mediatype>audio</mediatype><trackindex>1</trackindex></sourcetrack>'
# Sequence marker'ları
$seqMarkers = @()
foreach ($mk in $cfg.markers) {
    $mt = if ($mk.cue_beat) { $beats[$mk.cue_beat].start } else { $cueT[$mk.cue] }
    if ($null -eq $mt) { $problems += "marker zamanı yok: $($mk.name)"; continue }
    if ($onlySet -and -not ($onlySet -contains $mk.cue_beat)) { continue }
    $seqMarkers += Marker "[$($mk.kind.ToUpper())] $($mk.name)" $mk.comment (& $ToFrame $mt)
}
$seqMarkers += Marker '[INFO] Start timeline v1 - no music/SFX, no branding' 'Generated by build-xml.ps1; graphics = Remotion SYNC clips; VO v2' 0

$track = { param($items, $label) "<track><enabled>TRUE</enabled><locked>FALSE</locked>$($items -join '')</track>" }
$xml = @"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="4">
<sequence id="sequence-1"><name>$(Esc $seqName)</name><duration>$seqDur</duration><rate><timebase>$fps</timebase><ntsc>FALSE</ntsc></rate>
<timecode><rate><timebase>$fps</timebase><ntsc>FALSE</ntsc></rate><string>00:00:00:00</string><frame>0</frame><displayformat>NDF</displayformat></timecode>
<media>
<video><format><samplecharacteristics><rate><timebase>$fps</timebase><ntsc>FALSE</ntsc></rate><width>$SeqW</width><height>$SeqH</height><anamorphic>FALSE</anamorphic><pixelaspectratio>square</pixelaspectratio><fielddominance>none</fielddominance></samplecharacteristics></format>
$(& $track ($v1 | Sort-Object { [int]([regex]::Match($_, '<start>(\d+)</start>').Groups[1].Value) }) 'V1')
$(& $track $v2 'V2')
$(& $track $v3 'V3')
</video>
<audio><numOutputChannels>2</numOutputChannels><format><samplecharacteristics><depth>16</depth><samplerate>48000</samplerate></samplecharacteristics></format>
<track><enabled>TRUE</enabled><locked>FALSE</locked>$a1</track>
<track><enabled>TRUE</enabled><locked>FALSE</locked></track>
<track><enabled>TRUE</enabled><locked>FALSE</locked></track>
</audio>
</media>
$($seqMarkers -join "`n")
</sequence>
</xmeml>
"@
[IO.File]::WriteAllText($Out, $xml.Replace("`r`n", "`n"), (New-Object Text.UTF8Encoding $false))
# Doğrulama: XML ayrıştırma, V1 boşluk/çakışma, süre
[xml]$doc = Get-Content $Out -Raw -Encoding UTF8
$items = @($doc.xmeml.sequence.media.video.track[0].clipitem | ForEach-Object { [pscustomobject]@{ n = $_.name; s = [int]$_.start; e = [int]$_.end } } | Sort-Object s)
$gaps = @(); $over = @()
for ($i = 1; $i -lt $items.Count; $i++) { $d = $items[$i].s - $items[$i - 1].e; if ($d -gt 0) { $gaps += "$($items[$i-1].n)→$($items[$i].n): $d kare boş" } elseif ($d -lt 0) { $over += "$($items[$i-1].n)↔$($items[$i].n): $(-$d) kare çakışma" } }
Write-Output ("XML: {0} · V1 {1} klip · V2 {2} · V3 {3} (devre dışı) · A1 VO {4:N1} sn · marker {5} · sekans {6:N1} sn" -f [IO.Path]::GetFileName($Out), $v1.Count, $v2.Count, $v3.Count, ($voLen / $fps), $seqMarkers.Count, ($seqDur / $fps))
if ($problems) { Write-Output "SORUN: $($problems -join ' | ')" }
if ($gaps) { Write-Output "V1 boşluk: $($gaps -join ' | ')" }
if ($over) { Write-Output "V1 çakışma: $($over -join ' | ')" }
exit 0
