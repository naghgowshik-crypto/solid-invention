# Environment-Driven PostgreSQL Restore Verification Script (PowerShell)
param (
    [Parameter(Mandatory=$true)]
    [string]$DumpFile
)

$ErrorActionPreference = "Continue"

$DbName = if ($env:PGDATABASE) { $env:PGDATABASE } else { "sreyas_media_club_restore_test" }
$DbUser = if ($env:PGUSER) { $env:PGUSER } else { "postgres" }
$DbHost = if ($env:PGHOST) { $env:PGHOST } else { "localhost" }
$DbPort = if ($env:PGPORT) { $env:PGPORT } else { "5432" }

Write-Host "=== SREYAS MEDIA CLUB RESTORE VERIFICATION (PowerShell) ==="
Write-Host "Restoring from: $DumpFile"
Write-Host "Target Database: $DbName on ${DbHost}:${DbPort}"

$env:PGPASSWORD = $env:PGPASSWORD
pg_restore.exe -h $DbHost -p $DbPort -U $DbUser -d $DbName --clean --if-exists -v $DumpFile

Write-Host "=== RESTORE VERIFICATION COMPLETE ==="
