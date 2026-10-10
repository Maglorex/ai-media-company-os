# Company OS - ElevenLabs ortak yardımcı (şirketin kendi betiği; üçüncü taraf kod yok)
# Anahtar repo DIŞINDA, Windows kullanıcısına bağlı DPAPI şifreli dosyada durur:
#   $env:USERPROFILE\.companyos\elevenlabs.xml  (Founder tarafından Export-Clixml ile oluşturulur)
# Bu betik anahtarı asla ekrana, dosyaya veya loga yazmaz.

$ErrorActionPreference = 'Stop'
$script:ElBase = 'https://api.elevenlabs.io'
$script:ElKeyFile = Join-Path $env:USERPROFILE '.companyos\elevenlabs.xml'

function Get-ElHeaders {
    if (-not (Test-Path $script:ElKeyFile)) { throw "Anahtar dosyasi bulunamadi (Founder kurulum adimi eksik)." }
    $sec = Import-Clixml $script:ElKeyFile
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
    try { $plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
    return @{ 'xi-api-key' = $plain.Trim() }
}

function Invoke-ElGet([string]$Path) {
    $h = Get-ElHeaders
    try { return Invoke-RestMethod -Method Get -Uri ($script:ElBase + $Path) -Headers $h }
    catch {
        $code = $null; try { $code = [int]$_.Exception.Response.StatusCode } catch {}
        $detail = ''; try { $detail = $_.ErrorDetails.Message } catch {}
        if ($detail.Length -gt 400) { $detail = $detail.Substring(0,400) }
        throw "ElevenLabs GET $Path basarisiz (HTTP $code). $detail"
    }
    finally { $h.Clear() }
}

# TTS: yalnız Founder onaylı üretimlerde çağrılır. Dosyayı kaydeder, ölçülen maliyeti döndürür.
function Invoke-ElTts([string]$VoiceId, [string]$ModelId, [string]$Text, [string]$OutFile,
                      [string]$OutputFormat = 'mp3_44100_128') {
    $h = Get-ElHeaders
    $h['Accept'] = 'audio/mpeg'
    $body = @{ text = $Text; model_id = $ModelId } | ConvertTo-Json -Compress
    $bytes = [Text.Encoding]::UTF8.GetBytes($body)
    $uri = "$script:ElBase/v1/text-to-speech/$VoiceId`?output_format=$OutputFormat"
    try {
        $r = Invoke-WebRequest -UseBasicParsing -Method Post -Uri $uri -Headers $h -ContentType 'application/json; charset=utf-8' -Body $bytes
        New-Item -ItemType Directory -Force (Split-Path $OutFile) | Out-Null
        [IO.File]::WriteAllBytes($OutFile, $r.Content)
        return [pscustomobject]@{
            file = $OutFile; model = $ModelId; voice = $VoiceId; chars = $Text.Length
            character_cost = $r.Headers['character-cost']; request_id = $r.Headers['request-id']
            bytes = $r.Content.Length
        }
    }
    catch {
        $code = $null; try { $code = [int]$_.Exception.Response.StatusCode } catch {}
        $detail = ''; try { $detail = $_.ErrorDetails.Message } catch {}
        if ($detail.Length -gt 400) { $detail = $detail.Substring(0,400) }
        throw "ElevenLabs TTS basarisiz (HTTP $code). $detail"
    }
    finally { $h.Clear() }
}

# TTS + karakter zaman damgaları (with-timestamps). previous_text / next_text yalnız bağlamdır, seslendirilmez.
# Ses dosyasını ve hizalamayı döndürür; ölçülen kredi yanıt başlığından (character-cost).
function Invoke-ElTtsTimestamps([string]$VoiceId, [string]$ModelId, [string]$Text, [string]$OutFile,
                                [string]$PreviousText = '', [string]$NextText = '',
                                [string]$OutputFormat = 'mp3_44100_128') {
    $h = Get-ElHeaders
    $h['Accept'] = 'application/json'
    $payload = [ordered]@{ text = $Text; model_id = $ModelId }
    if ($PreviousText) { $payload['previous_text'] = $PreviousText }
    if ($NextText) { $payload['next_text'] = $NextText }
    $bytes = [Text.Encoding]::UTF8.GetBytes(($payload | ConvertTo-Json -Compress))
    $uri = "$script:ElBase/v1/text-to-speech/$VoiceId/with-timestamps`?output_format=$OutputFormat"
    try {
        $r = Invoke-WebRequest -UseBasicParsing -Method Post -Uri $uri -Headers $h -ContentType 'application/json; charset=utf-8' -Body $bytes
        $json = [Text.Encoding]::UTF8.GetString($r.RawContentStream.ToArray()) | ConvertFrom-Json
        New-Item -ItemType Directory -Force (Split-Path $OutFile) | Out-Null
        [IO.File]::WriteAllBytes($OutFile, [Convert]::FromBase64String($json.audio_base64))
        return [pscustomobject]@{
            file = $OutFile; model = $ModelId; voice = $VoiceId; chars = $Text.Length
            character_cost = $r.Headers['character-cost']; request_id = $r.Headers['request-id']
            alignment = $json.alignment
        }
    }
    catch {
        $code = $null; try { $code = [int]$_.Exception.Response.StatusCode } catch {}
        $detail = ''; try { $detail = $_.ErrorDetails.Message } catch {}
        if ($detail.Length -gt 400) { $detail = $detail.Substring(0,400) }
        throw "ElevenLabs TTS (timestamps) basarisiz (HTTP $code). $detail"
    }
    finally { $h.Clear() }
}
