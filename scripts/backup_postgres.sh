#!/usr/bin/env bash
# ==============================================================================
# Environment-Driven PostgreSQL & Media Backup Script for Sreyas Media Club
# ==============================================================================
# Usage:
#   export PGHOST="localhost"
#   export PGPORT="5432"
#   export PGDATABASE="sreyas_media_club"
#   export PGUSER="postgres"
#   export PGPASSWORD="your_secure_password"
#   export BACKUP_DIR="/path/to/offsite_backups"
#   ./backup_postgres.sh
# ==============================================================================

set -e

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
TARGET_DIR="${BACKUP_DIR:-./backups}"
DB_NAME="${PGDATABASE:-sreyas_media_club}"
DB_USER="${PGUSER:-postgres}"
DB_HOST="${PGHOST:-localhost}"
DB_PORT="${PGPORT:-5432}"
DUMP_FILE="${TARGET_DIR}/sreyas_db_${TIMESTAMP}.dump"
MEDIA_DIR="./backend/uploads"
MEDIA_BACKUP_FILE="${TARGET_DIR}/media_uploads_${TIMESTAMP}.tar.gz"

echo "=== SREYAS MEDIA CLUB PRODUCTION BACKUP ==="
echo "Timestamp: ${TIMESTAMP}"
echo "Database: ${DB_NAME} on ${DB_HOST}:${DB_PORT}"
echo "Target Backup Directory: ${TARGET_DIR}"

# Create backup directory
mkdir -p "${TARGET_DIR}"

# 1. PostgreSQL Database Dump
echo "[1/2] Creating PostgreSQL Custom Dump..."
PGPASSWORD="${PGPASSWORD}" pg_dump \
  -h "${DB_HOST}" \
  -p "${DB_PORT}" \
  -U "${DB_USER}" \
  -d "${DB_NAME}" \
  -F c -b -v -f "${DUMP_FILE}"

echo "Database dump created: ${DUMP_FILE}"

# 2. Local Media Uploads Backup
if [ -d "${MEDIA_DIR}" ]; then
  echo "[2/2] Archiving Local Media Uploads (${MEDIA_DIR})..."
  tar -czf "${MEDIA_BACKUP_FILE}" -C "${MEDIA_DIR}" .
  echo "Media backup archive created: ${MEDIA_BACKUP_FILE}"
else
  echo "[2/2] Media directory ${MEDIA_DIR} not found. Skipping media archive."
fi

echo "=== BACKUP COMPLETED SUCCESSFULLY ==="
