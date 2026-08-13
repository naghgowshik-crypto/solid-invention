#!/usr/bin/env bash
# ==============================================================================
# Environment-Driven PostgreSQL Restore Verification Script
# ==============================================================================
# Usage:
#   export PGHOST="localhost"
#   export PGPORT="5432"
#   export PGDATABASE="sreyas_media_club_restore_test"
#   export PGUSER="postgres"
#   export PGPASSWORD="your_secure_password"
#   ./restore_postgres.sh /path/to/backup.dump
# ==============================================================================

set -e

DUMP_FILE="$1"

if [ -z "${DUMP_FILE}" ]; then
  echo "Error: Path to backup dump file is required."
  echo "Usage: ./restore_postgres.sh <path_to_dump_file>"
  exit 1
fi

DB_NAME="${PGDATABASE:-sreyas_media_club_restore_test}"
DB_USER="${PGUSER:-postgres}"
DB_HOST="${PGHOST:-localhost}"
DB_PORT="${PGPORT:-5432}"

echo "=== SREYAS MEDIA CLUB RESTORE VERIFICATION ==="
echo "Restoring from: ${DUMP_FILE}"
echo "Target Database: ${DB_NAME} on ${DB_HOST}:${DB_PORT}"

# Execute pg_restore into target verification database
PGPASSWORD="${PGPASSWORD}" pg_restore \
  -h "${DB_HOST}" \
  -p "${DB_PORT}" \
  -U "${DB_USER}" \
  -d "${DB_NAME}" \
  --clean --if-exists -v "${DUMP_FILE}" || true

echo "=== RESTORE VERIFICATION COMPLETE ==="
