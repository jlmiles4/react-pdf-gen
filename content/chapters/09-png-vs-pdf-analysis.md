# Chapter 9: AI Visual Analysis -- PNG vs PDF

You've built the page. It compiles. It renders. You have a `.pdf` file. But how do you know it actually looks right?

AI tools preprocess uploaded PDFs in different ways, often combining extracted text with rasterized page images. That is useful for understanding content, but it gives you little control over visual-review resolution. This chapter shows how to export consistent PNGs, let the AI review the rendered page, and build a feedback loop that catches problems before your client does.

## Why Controlled Rasterization Helps Visual QA

### PDF Is a Page Description Format

A PDF file is a complex binary format. It contains:

- Compressed content streams with PostScript-like drawing operators
- Font subsets (only the glyphs actually used, not full font files)
- Cross-reference tables for random access to objects
- Metadata dictionaries
- Optional transparency groups, color spaces, and embedded ICC profiles

When you open a PDF, your viewer application interprets all of these instructions and rasterizes them into pixels on your screen. The PDF file itself is not pixels – it's instructions for creating pixels.

### Visual Layout Reaches Models as Raster Images

Multimodal models analyze page appearance through raster images, even when the surrounding product also extracts the PDF's text layer.

When you upload a PDF to a chat interface, preprocessing may combine several steps:

1. **Page rendering.** The application converts pages to images for visual analysis. Resolution, cropping, and resizing vary by product.
2. **Text extraction.** The application may also send extracted text, which improves content understanding but does not replace layout review.

For consistent design review, control the conversion settings yourself.

### AI Can't "See" PDFs from Source Code

This is the other failure mode. You show the AI your react-pdf JSX code and ask "does this layout look good?" The AI can reason about the code – it understands that `flexDirection: 'row'` creates a horizontal layout, that `padding: 48` adds space – but it cannot mentally render the exact visual output.

The AI doesn't know:

- Exactly how much visual space 48pt of padding takes up relative to the page
- How a 10.5pt font at 1.6 line height actually looks
- Whether two colors have sufficient contrast
- How a long text string wraps within a specific column width
- Whether the overall page feels balanced or top-heavy

For design review, you need the actual rendered output as an image.

## The PNG Workflow

Here's the process:

1. **Generate your PDF.** Run your react-pdf build script to produce the `.pdf` file.
2. **Export each page to PNG.** Convert at 2x resolution (150-300 DPI) for clear, detailed images.
3. **Feed individual page PNGs to your AI.** One page at a time, with specific questions.
4. **Ask targeted questions.** Don't say "is this good?" – ask about specific design qualities.
5. **Apply fixes, re-render, re-export, re-review.**

### Why PNG and Not JPEG?

PNG is lossless. JPEG introduces compression artifacts, especially around text edges and sharp color boundaries – exactly the elements you're trying to evaluate. PNG files are larger, but the quality difference matters for AI analysis. A compression artifact could be misinterpreted as a design flaw.

### Resolution Recommendations

| Use Case | DPI | Pixels per LETTER Page | File Size (approx.) |
|----------|-----|----------------------|---------------------|
| Quick review | 150 | 1275 x 1650 | 200-500 KB |
| Standard review | 200 | 1700 x 2200 | 400-900 KB |
| Detailed analysis | 300 | 2550 x 3300 | 700 KB - 1.5 MB |

150 DPI is good enough for checking layout and spacing. 300 DPI is better for evaluating font rendering, fine lines, and subtle color differences. 200 DPI is the sweet spot for most reviews.

## Tools for PDF-to-PNG Conversion

### pdftoppm (poppler-utils)

The fastest and most reliable CLI tool. Part of the Poppler PDF rendering library, available on all major platforms.

**Install:**

```bash
# Ubuntu/Debian
sudo apt-get install poppler-utils

# macOS
brew install poppler

# Windows (via chocolatey)
choco install poppler
```

**Usage:**

```bash
# Convert all pages to PNG at 200 DPI
pdftoppm -png -r 200 output.pdf pages/page

# Produces: pages/page-1.png, pages/page-2.png, etc.

# Convert a single page (page 3)
pdftoppm -png -r 200 -f 3 -l 3 output.pdf pages/page

# Convert with specific output prefix and zero-padded names
pdftoppm -png -r 200 -sep "-" output.pdf pages/page
```

`pdftoppm` is fast. A 10-page document converts in under a second at 200 DPI.

### Ghostscript

More powerful than `pdftoppm` but with a steeper learning curve. Useful if you need specific color space handling or post-processing.

```bash
# Convert all pages to PNG at 300 DPI
gs -dNOPAUSE -dBATCH -sDEVICE=png16m -r300 \
   -sOutputFile=pages/page-%02d.png output.pdf
```

The `-r300` flag sets 300 DPI. The `%02d` in the output filename gives you zero-padded page numbers: `page-01.png`, `page-02.png`.

### Node.js Options

If you want the conversion inside your Node.js build pipeline:

**pdf2pic:**

```bash
npm install pdf2pic
```

```tsx
import { fromPath } from "pdf2pic";

const converter = fromPath("output.pdf", {
  density: 200,
  saveFilename: "page",
  savePath: "./pages",
  format: "png",
  width: 1700,
  height: 2200,
});

// Convert all pages
const results = await converter.bulk(-1, { responseType: "image" });
console.log(`Converted ${results.length} pages`);
```

**pdf-poppler:**

```bash
npm install pdf-poppler
```

```tsx
import * as pdfPoppler from "pdf-poppler";

const opts: pdfPoppler.Options = {
  format: "png",
  out_dir: "./pages",
  out_prefix: "page",
  scale: 2048,
};

await pdfPoppler.convert("output.pdf", opts);
```

Note: `pdf-poppler` requires Poppler to be installed on the system. It's a wrapper around the CLI tools.

### Sharp for Post-Processing

After conversion, you might want to crop, resize, or annotate the PNGs. Sharp is the go-to Node.js image processing library:

```bash
npm install sharp
```

```tsx
import sharp from "sharp";

// Resize for faster AI upload (if 300 DPI images are too large)
await sharp("pages/page-01.png")
  .resize(1700, 2200, { fit: "inside" })
  .toFile("pages/page-01-review.png");

// Create a thumbnail for quick scanning
await sharp("pages/page-01.png")
  .resize(400)
  .toFile("pages/page-01-thumb.png");
```

## Building an Automated Export Script

Here's a shell script that handles the full conversion pipeline:

```bash
#!/bin/bash
# export-pages.sh
# Converts a PDF to per-page PNGs for AI review

set -e

PDF_FILE="${1:-output.pdf}"
OUTPUT_DIR="${2:-pages}"
DPI="${3:-200}"

# Validate input
if [ ! -f "$PDF_FILE" ]; then
  echo "Error: PDF file not found: $PDF_FILE"
  exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Clean previous exports
rm -f "$OUTPUT_DIR"/page-*.png

# Convert
echo "Converting $PDF_FILE at ${DPI} DPI..."
pdftoppm -png -r "$DPI" "$PDF_FILE" "$OUTPUT_DIR/page"

# Count results
PAGE_COUNT=$(ls -1 "$OUTPUT_DIR"/page-*.png 2>/dev/null | wc -l)
echo "Exported $PAGE_COUNT pages to $OUTPUT_DIR/"

# List files with sizes
ls -lh "$OUTPUT_DIR"/page-*.png
```

Usage:

```bash
chmod +x export-pages.sh

# Default: output.pdf → pages/ at 200 DPI
./export-pages.sh

# Custom: report.pdf → review/ at 300 DPI
./export-pages.sh report.pdf review 300
```

### Node.js Export Script

If you want the full pipeline in Node.js – render the PDF, then immediately export to PNGs:

```tsx
// export-pages.ts
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

interface ExportOptions {
  pdfPath: string;
  outputDir: string;
  dpi: number;
}

function exportPages({ pdfPath, outputDir, dpi }: ExportOptions): string[] {
  // Create output directory
  fs.mkdirSync(outputDir, { recursive: true });

  // Clean previous exports
  const existing = fs.readdirSync(outputDir).filter((f) => f.startsWith("page-") && f.endsWith(".png"));
  existing.forEach((f) => fs.unlinkSync(path.join(outputDir, f)));

  // Run pdftoppm
  execSync(`pdftoppm -png -r ${dpi} "${pdfPath}" "${path.join(outputDir, "page")}"`, {
    stdio: "inherit",
  });

  // Return list of exported files
  const pages = fs
    .readdirSync(outputDir)
    .filter((f) => f.startsWith("page-") && f.endsWith(".png"))
    .sort()
    .map((f) => path.join(outputDir, f));

  console.log(`Exported ${pages.length} pages at ${dpi} DPI`);
  return pages;
}

// Usage:
const pages = exportPages({
  pdfPath: "output.pdf",
  outputDir: "./pages",
  dpi: 200,
});
```

## What AI Can Spot in PNG Reviews

When you give an AI a page image and ask it to evaluate the design, it's reliably good at:

### Alignment Inconsistencies

"The left edge of the third card doesn't line up with the cards above it." AI models are surprisingly good at detecting misalignment – they can tell when elements that should share an edge don't.

### Spacing Irregularities

"The gap between sections 2 and 3 appears larger than between sections 1 and 2." It won't give you exact point values, but it can tell when spacing is inconsistent.

### Font Size Mismatches

"The heading on this page looks smaller than the heading on the previous page." If you feed it two page images, it can compare relative sizes across pages.

### Color Contrast Issues

"The light gray text on the white background may be difficult to read." It can flag low-contrast combinations, though it can't calculate exact WCAG ratios.

### Layout Balance

"The page feels top-heavy – most content is in the upper third with empty space at the bottom." This is a subjective judgment, but AI models are trained on enough well-designed content to have useful intuitions here.

### Missing Elements or Broken Layouts

"There's a large empty space in the middle of the page that looks unintentional." It can spot gaps where content should be, elements that overlap, or sections that appear cut off.

## What AI Struggles With

### Exact Measurement Verification

If you ask "is the padding exactly 48pt?" – the AI can't measure. It can estimate ("the padding appears to be about half an inch") but can't verify precise values. For exact measurements, check the code.

### Color Accuracy

AI can say "that looks like a dark blue" but it can't tell you it's `#1a1a2e` vs `#1a1a3e`. If you need to verify exact color values, use a screenshot color picker tool, not AI.

### Font Identification

AI can usually distinguish serif from sans-serif and can sometimes guess well-known fonts. But it can't reliably tell you whether the document is using Inter, Helvetica, or Arial. Don't rely on it for font verification.

### Sub-Pixel Rendering Details

Fine details like 1pt borders, subtle border-radius differences, or hairline rules may not be visible at 150 DPI and may be misinterpreted even at 300 DPI.

## Effective Review Prompts

Generic prompts get generic responses. Be specific:

### Spacing Review

> "Look at this PDF page. Are the vertical gaps between sections consistent? Are any two adjacent elements too close together (less than 8pt visually) or too far apart (creating an unintentional break)?"

### Hierarchy Review

> "This page should have 4 levels of text hierarchy: a page title (largest), section headings, body text, and captions (smallest). Can you clearly identify all 4 levels? Are any two levels too similar in size to distinguish at a glance?"

### Consistency Review (Multi-Page)

> "Here are pages 3 and 4 of the same document. Do the headers look identical? Are the margins the same? Do the callout boxes use the same styling? Flag any inconsistencies between the two pages."

### Color Review

> "This document uses a specific color palette: dark navy for headings, blue for accents, dark gray for body text, light gray for backgrounds. Are all colors in the document consistent with this description? Is any element using a color that seems out of place?"

### Overall Quality Check

> "Rate this PDF page on a scale of 1-10 for professional quality. Specifically evaluate: (1) whitespace usage, (2) visual hierarchy, (3) alignment consistency, (4) color coherence, (5) overall balance. For any score below 7, explain what specific change would improve it."

## The Feedback Loop

This is where the real work happens. Not in the first render -- in the second, third, and fourth passes where AI catches the things you missed.

```
┌─────────────┐
│ Write/Edit  │
│ JSX Code    │
└──────┬──────┘
       │
       v
┌─────────────┐
│ Render PDF  │
│ (1-5 sec)   │
└──────┬──────┘
       │
       v
┌─────────────┐
│ Export PNGs  │
│ (< 1 sec)   │
└──────┬──────┘
       │
       v
┌─────────────┐
│ AI Review   │    "Spacing between cards is
│ (send PNG)  │──> inconsistent. Cards 1-2 have
└──────┬──────┘    ~16pt gap, cards 2-3 have ~8pt."
       │
       v
┌─────────────┐
│ Apply Fixes │    Change marginBottom from 8 to 16
│ to JSX      │    on the second card container.
└──────┬──────┘
       │
       └──────> (back to Render PDF)
```

Each cycle takes 30-90 seconds. Two to four cycles gets you from rough draft to polished output. The total time investment for a 10-page document is 10-30 minutes of iteration – far less than manually tweaking styles by eye.

## Integrating with Your Build Script

Add the export step to your `package.json`:

```json
{
  "scripts": {
    "build": "tsx src/render.ts",
    "export": "pdftoppm -png -r 200 output.pdf pages/page",
    "review": "npm run build && npm run export && echo 'Pages exported to pages/'"
  }
}
```

Now `npm run review` gives you fresh PNGs after every code change. Feed those PNGs to your AI, get feedback, make changes, run `npm run review` again.

## Batch Review for Multi-Page Documents

For documents with 5+ pages, reviewing each page individually is slow. Create a summary view:

```bash
# Create a 2x2 grid of the first 4 pages (requires ImageMagick)
montage pages/page-*.png -tile 2x -geometry 800x1035+4+4 pages/overview.png
```

This produces a single image with all pages visible at reduced size. Good for checking overall consistency, bad for checking details. Use the overview for a first pass, then review individual pages for anything that looks off.

If you don't have ImageMagick, you can achieve similar results with Sharp in Node:

```tsx
import sharp from "sharp";
import fs from "fs";

async function createOverview(pageDir: string, outputPath: string) {
  const pages = fs
    .readdirSync(pageDir)
    .filter((f) => f.endsWith(".png") && f.startsWith("page-"))
    .sort();

  const thumbWidth = 400;
  const thumbHeight = 518; // LETTER aspect ratio
  const cols = 3;
  const rows = Math.ceil(pages.length / cols);
  const gap = 8;

  const canvasWidth = cols * thumbWidth + (cols + 1) * gap;
  const canvasHeight = rows * thumbHeight + (rows + 1) * gap;

  const composites = await Promise.all(
    pages.map(async (page, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const buffer = await sharp(`${pageDir}/${page}`)
        .resize(thumbWidth, thumbHeight, { fit: "contain", background: "#ffffff" })
        .toBuffer();
      return {
        input: buffer,
        left: gap + col * (thumbWidth + gap),
        top: gap + row * (thumbHeight + gap),
      };
    })
  );

  await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 3,
      background: "#e5e7eb",
    },
  })
    .composite(composites)
    .toFile(outputPath);
}
```

This gives you a single image showing all pages in a grid – perfect for a quick consistency check before diving into individual page reviews.

Two to three render-review-fix cycles is all it takes to go from rough draft to polished output. The next chapter gives you the checklist to measure that quality against — every item concrete, every item verifiable.
