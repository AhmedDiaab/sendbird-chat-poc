#!/usr/bin/env bash
#
# Usage:
#   ./start-pm2.sh
#   (always runs in development mode)

set -euo pipefail

ECOSYSTEM="ecosystem.config.js"

# -------- 1. Ensure PM2 is installed --------
if ! command -v pm2 &>/dev/null; then
  echo "⚙️  pm2 not found, installing globally..."
  npm install -g pm2
fi

# -------- 2. Start or reload all apps --------
if pm2 describe backend &>/dev/null; then
  echo "🔄 Reloading apps from $ECOSYSTEM (development)…"
  pm2 reload "$ECOSYSTEM" --env development
else
  echo "🚀 Starting apps from $ECOSYSTEM (development)…"
  pm2 start  "$ECOSYSTEM" --env development
fi

# -------- 3. Save and show status --------
pm2 save
echo "✅ PM2 processes:"
pm2 ls
