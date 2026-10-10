# Company OS — yayın için müzik/SFX kredi bloğu ve lisans kodu listesi (D-024)
# Kaynak: production/audio-library/audio-ledger.csv (tek doğruluk kaynağı).
# Kullanım: powershell -ExecutionPolicy Bypass -File production\tools\audio\attribution.ps1 -Video VID-001

param([Parameter(Mandatory)] [string] $Video)

$ledger = Join-Path $PSScriptRoot '..\..\audio-library\audio-ledger.csv'
$rows = @(Import-Csv $ledger -Encoding UTF8 | Where-Object { $_.status -in 'approved', 'used' -and ($_.used_in -split ';' | Where-Object { $_ -like "$($Video):*" }) })

$blocked = @($rows | Where-Object { $_.commercial_use -ne 'yes' -or $_.modification_allowed -in 'no', 'unclear' -or ($_.attribution_required -eq 'yes' -and -not $_.attribution_text) })
if ($blocked) { Write-Output "DUR: lisans bilgisi eksik/uygunsuz asset: $(($blocked | ForEach-Object { $_.asset_id }) -join ', ')"; exit 1 }

Write-Output "=== Açıklama kredi bloğu ($Video) ==="
$credits = @($rows | Where-Object { $_.attribution_required -eq 'yes' })
if ($credits) { Write-Output 'Music:'; $credits | ForEach-Object { Write-Output $_.attribution_text } } else { Write-Output '(attribution gerekmiyor)' }
Write-Output ''
Write-Output "=== Lisans kodları (Content ID dispute için; açıklamaya yazılmaz) ==="
$codes = @($rows | Where-Object { $_.source -eq 'adobe-stock' })
if ($codes) { $codes | ForEach-Object { Write-Output "$($_.asset_id) · $($_.title) · $($_.license_proof)" } } else { Write-Output '(yok)' }
Write-Output ''
Write-Output "Kaynak özeti: $(($rows | Group-Object source | ForEach-Object { "$($_.Name) ×$($_.Count)" }) -join ', ')"
exit 0
