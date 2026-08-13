# Environment-Driven PostgreSQL Backup Script (Windows PowerShell)
$ErrorActionPreference = "Stop"

$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$TargetDir = $env:BACKUP_DIR
if ([string]::IsNullOrWhiteSpace($TargetDir)) { $TargetDir = ".\backups" }

$DbName = if ($env:PGDATABASE) { $env:PGDATABASE } else { "sreyas_media_club" }
$DbUser = if ($env:PGUSER) { $env:PGUSER } else { "postgres" }
$DbHost = if ($env:PGHOST) { $env:PGHOST } else { "localhost" }
$DbPort = if ($env:PGPORT) { $env:PGPORT } else { "5432" }

$DumpFile = Join-Path $TargetDir "sreyas_db_$Timestamp.dump"
$MediaDir = ".\backend\uploads"
$MediaBackupFile = Join-Path $TargetDir "media_uploads_$Timestamp.zip"

Write-Host "=== SREYAS MEDIA CLUB PRODUCTION BACKUP (PowerShell) ==="
Write-Host "Timestamp: $Timestamp"
Write-Host "Database: $DbName on ${DbHost}:${DbPort}"

New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null

# 1. PostgreSQL Custom Dump
Write-Host "[1/2] Creating PostgreSQL Custom Dump..."
$env:PGPASSWORD = $env:PGPASSWORD
pg_dump.exe -h $DbHost -p $DbPort -U $DbUser -d $DbName -F c -b -v -f $DumpFile

Write-Host "Database dump created: $DumpFile"

# 2. Local Media Uploads Backup
if (Test-Path $MediaDir) {
    Write-Host "[2/2] Archiving Local Media Uploads ($MediaDir)..."
    Compress-Archive -Path "$MediaDir\*" -DestinationPath $MediaBackupFile -Force
    Write-Host "Media backup created: $MediaBackupFile"
}

Write-Host "=== BACKUP COMPLETED SUCCESSFULLY ==="
