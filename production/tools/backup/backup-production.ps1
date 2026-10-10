# Company OS — render bilgisayarı yerel yedek betiği
# Asıl dosyalar D: (HDD) üzerindeki üretim klasöründe; yedek C: (SSD) üzerinde, ayrı fiziksel disk.
# Kopyalanan: her videonun 03_vo (seslendirme) ve 05_premiere (proje) klasörleri.
# Final render'lar (06_renders) büyük olduğu için şimdilik dahil değil — bulut/harici yedek kararı açık.
# Silme yapmaz: kaynakta silinen dosya yedekte kalır (robocopy /E, /MIR değil).
# Kullanım: powershell -ExecutionPolicy Bypass -File production\tools\backup\backup-production.ps1

$Source = 'D:\CompanyOS-Production'
$Target = 'C:\CompanyOS-Backup'
$Folders = '03_vo', '05_premiere'

if (-not (Test-Path $Source)) { Write-Error "Üretim klasörü bulunamadı: $Source"; exit 1 }
New-Item -ItemType Directory -Force $Target | Out-Null
$log = Join-Path $Target ("backup-{0:yyyy-MM-dd_HHmm}.log" -f (Get-Date))

$failed = $false
foreach ($video in Get-ChildItem $Source -Directory) {
    foreach ($f in $Folders) {
        $src = Join-Path $video.FullName $f
        if (-not (Test-Path $src)) { continue }
        $dst = Join-Path (Join-Path $Target $video.Name) $f
        robocopy $src $dst /E /R:2 /W:5 /NP /LOG+:$log | Out-Null
        # robocopy çıkış kodu 0–7 başarılı, 8+ hata
        if ($LASTEXITCODE -ge 8) { $failed = $true; Write-Warning "Hata: $src (kod $LASTEXITCODE)" }
    }
}

if ($failed) { Write-Warning "Yedek hatalarla bitti. Günlük: $log"; exit 1 }
Write-Output "Yedek tamam: $Source -> $Target  (günlük: $log)"
