#!/bin/bash

# Production startup script for Hostinger
# Run this to test the production build locally

export NODE_ENV=production
export PORT=${PORT:-5000}

echo "Starting StratiumeX in PRODUCTION mode..."
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install --production
fi

# Ensure build exists
if [ ! -d "dist/public" ]; then
  echo "Building application..."
  npm run build
fi

echo "Starting server..."
node dist/index.cjs
