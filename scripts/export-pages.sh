#!/bin/bash
# Export PDF pages to PNG images for AI visual analysis.
# Usage: ./scripts/export-pages.sh [DPI]
# Default DPI: 200

set -e

PDF_FILE="output/ebook.pdf"
PNG_DIR="output/pages"
DPI="${1:-200}"

if [ ! -f "$PDF_FILE" ]; then
  echo "Error: $PDF_FILE not found. Run 'pnpm build' first."
  exit 1
fi

# Check for pdftoppm
if ! command -v pdftoppm &> /dev/null; then
  echo "Installing poppler-utils for pdftoppm..."
  sudo apt-get install -y poppler-utils
fi

mkdir -p "$PNG_DIR"
rm -f "$PNG_DIR"/page-*.png

echo "Exporting PDF pages to PNG at ${DPI} DPI..."
pdftoppm -png -r "$DPI" "$PDF_FILE" "$PNG_DIR/page"

PAGE_COUNT=$(ls "$PNG_DIR"/page-*.png 2>/dev/null | wc -l)
echo ""
echo "Exported $PAGE_COUNT pages to $PNG_DIR/"
echo ""
ls -lh "$PNG_DIR"/page-*.png
