# Run locally in PowerShell. The key is masked and never appears in command history.
$ErrorActionPreference = 'Stop'
$secretInput = Read-Host 'Paste your Beijing Bailian API Key (input is hidden)' -AsSecureString
$secretPointer = [IntPtr]::Zero
try {
    $secretPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secretInput)
    $translationKey = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($secretPointer).Trim()
    if ([string]::IsNullOrWhiteSpace($translationKey)) { throw 'The key is empty.' }
    if ($translationKey -match '\s') { throw 'The key must not contain whitespace.' }
    $keyPath = Join-Path $PSScriptRoot '.dashscope-key'
    [IO.File]::WriteAllText($keyPath, $translationKey, [Text.UTF8Encoding]::new($false))
    Write-Host 'Saved locally to tools/.dashscope-key (ignored by Git).'
    Write-Host 'Check configuration: node tools/qwen-mt-check.mjs'
    Write-Host 'Make one real translation request: node tools/qwen-mt-check.mjs --live'
} finally {
    if ($secretPointer -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($secretPointer) }
    $translationKey = $null
    $secretInput.Dispose()
}
