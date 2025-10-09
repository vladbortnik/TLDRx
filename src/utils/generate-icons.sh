#!/bin/bash

# Script to generate HIGH-QUALITY PNG icons from VscTerminalBash SVG
# Requires: imagemagick (install with: brew install imagemagick)

echo "🎨 Generating HIGH-QUALITY PWA icons from VscTerminalBash SVG..."

# Check if imagemagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found!"
    echo "📦 Install with: brew install imagemagick"
    exit 1
fi

# Use 'magick' command (IMv7) or fallback to 'convert' (IMv6)
CMD="magick"
if ! command -v magick &> /dev/null; then
    CMD="convert"
fi

# High-quality settings
QUALITY_SETTINGS="-density 600 -background none -quality 100"

# Convert icon.svg to PNG at different sizes with HIGH QUALITY
echo "🔄 Converting to 192x192 (high quality)..."
$CMD $QUALITY_SETTINGS public/icons/icon.svg -resize 192x192 -sharpen 0x1.0 public/icons/icon-192x192.png

echo "🔄 Converting to 512x512 (high quality)..."
$CMD $QUALITY_SETTINGS public/icons/icon.svg -resize 512x512 -sharpen 0x1.0 public/icons/icon-512x512.png

echo "🔄 Converting favicon..."
$CMD $QUALITY_SETTINGS public/favicon.svg -resize 32x32 public/favicon.ico

echo "✅ Done! High-quality VscTerminalBash icons generated:"
echo "   - public/icons/icon-192x192.png (transparent, custom shape)"
echo "   - public/icons/icon-512x512.png (transparent, custom shape)"
echo "   - public/favicon.ico"
