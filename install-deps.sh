#!/bin/bash

echo "🔍 Installing dependencies in backend and frontend..."

install_deps() {
  DIR=$1
  echo "📁 Entering $DIR..."
  cd "$DIR" || exit 1

  if [ -f "pnpm-lock.yaml" ]; then
    echo "📦 Installing with pnpm in $DIR..."
    pnpm install
  elif [ -f "yarn.lock" ]; then
    echo "📦 Installing with yarn in $DIR..."
    yarn install
  elif [ -f "package-lock.json" ]; then
    echo "📦 Installing with npm in $DIR..."
    npm install
  else
    echo "❌ No lock file found in $DIR."
  fi

  cd - >/dev/null || exit 1
}

install_deps "backend"
install_deps "frontend"

echo "✅ All dependencies installed!"
