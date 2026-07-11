#!/bin/bash
# Export PDF pages to PNG images for AI visual analysis.
# Usage: ./scripts/export-pages.sh [DPI]
# Default DPI: 200

set -euo pipefail

PDF_FILE="output/ebook.pdf"
PNG_DIR="output/pages"
DPI="${1:-200}"

if [ ! -f "$PDF_FILE" ]; then
  echo "Error: $PDF_FILE not found. Run 'pnpm build' first."
  exit 1
fi

# pdftoppm and pdfinfo ship with poppler-utils. Don't auto-install
# (sudo/network/OS vary) — detect them and print guidance instead.
MISSING_TOOLS=()
for TOOL in pdftoppm pdfinfo; do
  if ! command -v "$TOOL" &> /dev/null; then
    MISSING_TOOLS+=("$TOOL")
  fi
done
if [ "${#MISSING_TOOLS[@]}" -gt 0 ]; then
  echo "Error: required Poppler tool(s) not found: ${MISSING_TOOLS[*]}" >&2
  echo "Install poppler-utils:" >&2
  echo "  Debian/Ubuntu: sudo apt-get install -y poppler-utils" >&2
  echo "  macOS:         brew install poppler" >&2
  echo "  Fedora/RHEL:   sudo dnf install poppler-utils" >&2
  exit 1
fi

PDF_PAGE_COUNT=$(pdfinfo "$PDF_FILE" | sed -n 's/^Pages:[[:space:]]*//p')
if ! [[ "$PDF_PAGE_COUNT" =~ ^[1-9][0-9]*$ ]]; then
  echo "Error: could not determine a valid page count for $PDF_FILE." >&2
  exit 1
fi

mkdir -p "$PNG_DIR"
rm -f "$PNG_DIR"/page-*.png

echo "Exporting PDF pages to PNG at ${DPI} DPI..."
pdftoppm -png -r "$DPI" "$PDF_FILE" "$PNG_DIR/page"

shopt -s nullglob
PNG_FILES=("$PNG_DIR"/page-*.png)
PAGE_COUNT=${#PNG_FILES[@]}
if [ "$PAGE_COUNT" -eq 0 ]; then
  echo "Error: pdftoppm completed without producing any PNG files." >&2
  exit 1
fi
if [ "$PAGE_COUNT" -ne "$PDF_PAGE_COUNT" ]; then
  echo "Error: exported $PAGE_COUNT PNG page(s), but the PDF contains $PDF_PAGE_COUNT page(s)." >&2
  exit 1
fi

echo ""
echo "Exported $PAGE_COUNT pages to $PNG_DIR/"
echo ""
ls -lh "${PNG_FILES[@]}"
