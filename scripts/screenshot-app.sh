#!/bin/bash

# Screenshot verification script
set -e

echo "📸 Taking screenshots for verification..."

# Create screenshots directory
mkdir -p screenshots

# Start dev server in background
echo "🚀 Starting dev server..."
npm run dev > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server..."
sleep 10

# Check if server is responding
if ! curl -s http://localhost:5173 > /dev/null; then
    echo "❌ Server not responding"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Take screenshot using puppeteer
node scripts/take-screenshot.js

# Kill server
kill $SERVER_PID 2>/dev/null || true

echo "✅ Screenshots saved to screenshots/ directory"
echo "📝 Manual verification required - check screenshots before claiming completion"
