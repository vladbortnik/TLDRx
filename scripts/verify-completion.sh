#!/bin/bash

# Verification script that blocks completion claims without proof
set -e

echo "🔍 VERIFICATION REQUIRED - Checking completion claims..."

# Check if .cascade-rules verification is enabled
if grep -q "VERIFICATION_REQUIRED=true" .cascade-rules 2>/dev/null; then
    echo "✅ Verification rules enabled"
else
    echo "❌ VERIFICATION_REQUIRED not set in .cascade-rules"
    exit 1
fi

# Check if app builds successfully
echo "🔨 Testing build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - completion blocked"
    exit 1
fi

# Check if tests pass
echo "🧪 Running tests..."
if npm test > /dev/null 2>&1; then
    echo "✅ Tests passed"
else
    echo "❌ Tests failed - completion blocked"
    exit 1
fi

# Check if dev server starts
echo "🚀 Testing dev server start..."
timeout 10s npm run dev > /dev/null 2>&1 &
SERVER_PID=$!
sleep 5

if kill -0 $SERVER_PID 2>/dev/null; then
    echo "✅ Dev server starts successfully"
    kill $SERVER_PID
else
    echo "❌ Dev server failed to start - completion blocked"
    exit 1
fi

echo "✅ ALL VERIFICATIONS PASSED - Completion allowed"
exit 0
