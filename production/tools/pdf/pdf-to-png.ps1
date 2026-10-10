# Company OS — PDF sayfasını PNG'ye çevirir (Windows'un yerleşik Windows.Data.Pdf API'si; üçüncü taraf araç yok).
# Sayfa içeriği değiştirilmez; yalnız seçilen genişlikte rasterleştirilir.
# Kullanım:
#   powershell -ExecutionPolicy Bypass -File production\tools\pdf\pdf-to-png.ps1 -Pdf <dosya.pdf> -Pages 5,6 -OutDir <klasör> [-Width 2400]
# Sayfa numarası = PDF sayfası (1'den başlar), raporun basılı sayfa numarası değil.

param(
    [Parameter(Mandatory)] [string] $Pdf,
    # -File ile çağrıldığında "5,6" tek metin olarak gelir; bu yüzden metin alınıp ayrıştırılır.
    [Parameter(Mandatory)] [string[]] $Pages,
    [Parameter(Mandatory)] [string] $OutDir,
    [int] $Width = 2400
)

Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime]

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } |
    Select-Object -First 1
$asTaskAction = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' } |
    Select-Object -First 1

function Await($op, [type] $resultType) {
    $task = $asTaskGeneric.MakeGenericMethod($resultType).Invoke($null, @($op))
    $task.Wait() | Out-Null
    $task.Result
}
function AwaitAction($op) {
    $task = $asTaskAction.Invoke($null, @($op))
    $task.Wait() | Out-Null
}

[int[]] $pageNumbers = $Pages -join ',' -split '[,\s]+' | Where-Object { $_ }
$pdfPath = (Resolve-Path $Pdf).Path
New-Item -ItemType Directory -Force $OutDir | Out-Null
$outPath = (Resolve-Path $OutDir).Path

$file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfPath)) ([Windows.Storage.StorageFile])
$doc = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)) ([Windows.Data.Pdf.PdfDocument])
Write-Output "PDF: $($doc.PageCount) sayfa"

foreach ($n in $pageNumbers) {
    if ($n -lt 1 -or $n -gt $doc.PageCount) { Write-Warning "Sayfa yok: $n"; continue }
    $page = $doc.GetPage([uint32]($n - 1))
    $opts = New-Object Windows.Data.Pdf.PdfPageRenderOptions
    $opts.DestinationWidth = [uint32]$Width
    $opts.DestinationHeight = [uint32][math]::Round($Width * $page.Size.Height / $page.Size.Width)
    $opts.BackgroundColor = [Windows.UI.Color]::FromArgb(255, 255, 255, 255)
    $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
    AwaitAction ($page.RenderToStreamAsync($stream, $opts))

    $target = Join-Path $outPath ("page-{0:D2}.png" -f $n)
    $net = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($stream.GetInputStreamAt(0))
    $fs = [System.IO.File]::Create($target)
    $net.CopyTo($fs); $fs.Close(); $net.Close(); $stream.Dispose(); $page.Dispose()
    Write-Output "$target  ($($opts.DestinationWidth)x$($opts.DestinationHeight))"
}
# PowerShell 5.1, WinRT nesnelerini süreç kapanışında serbest bırakırken çökebiliyor (0xC0000005);
# çıktı dosyaları bu noktada zaten yazılmış durumda. Temizliği önceden yapıp süreci doğrudan kapatıyoruz.
$doc = $null; $file = $null
[GC]::Collect(); [GC]::WaitForPendingFinalizers()
[Environment]::Exit(0)
