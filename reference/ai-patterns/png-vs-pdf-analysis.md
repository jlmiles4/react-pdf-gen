# PNG vs. PDF for AI Design Analysis

> Why you should convert PDFs to PNG before asking AI to review your designs.

## The Problem

You've generated a PDF with react-pdf. You want an AI to review the visual design – check alignment, spacing, font sizes, color balance, overall layout quality. You have two options:

1. Give the AI the PDF file
2. Give the AI a PNG screenshot of the rendered page

Option 2 is dramatically better. Here's why.

---

## AI Vision Models Are Trained on Images

AI vision models – Claude, GPT-4V, and others – are trained on billions of images. They understand visual composition: alignment, whitespace, balance, hierarchy, color relationships, typography weight. When you show them a PNG of a page, they **see** what a human reader would see.

They are not trained on PDF binary format. A PDF file is a complex binary container with streams, font subsetting data, coordinate transformations, cross-reference tables, and encoded content streams. Even a "simple" PDF is thousands of bytes of structured binary data that has no visual meaning until rendered.

---

## What AI Sees: PDF vs. PNG

### When you give AI a PDF file:

The AI receives raw binary content. Depending on the tool, it might:
- See the text content extracted from the PDF (losing all layout information)
- See metadata (author, title, creation date)
- See nothing useful at all

It **cannot** see:
- Where elements are positioned on the page
- How much whitespace exists between sections
- Whether text is properly aligned
- The visual weight and balance of the layout
- Color relationships between elements
- Font size ratios
- Whether content is clipped or overflowing

### When you give AI a PNG image:

The AI sees exactly what a human sees – a pixel-perfect representation of the rendered page. It can identify:

- **Alignment issues:** "The left margin of the body text doesn't align with the heading above it"
- **Spacing problems:** "There's too much space between the title and subtitle, and not enough before the next section"
- **Font size inconsistencies:** "The caption text on the left card is noticeably larger than the caption on the right card"
- **Color contrast issues:** "The light gray text on the white background is hard to read"
- **Layout balance:** "The page is top-heavy – all the content is in the upper third"
- **Visual hierarchy:** "The section headings don't stand out enough from the body text"
- **Orphaned content:** "There's a single line of text at the bottom of the page that should move to the next page"

---

## The Workflow

```
1. Write react-pdf component
2. Render to PDF
3. Convert PDF page(s) to PNG
4. Send PNG to AI with review prompt
5. AI identifies issues with specific suggestions
6. Update the component
7. Repeat from step 2
```

### Step 2-3: Render and Convert

```tsx
// render.ts – Generate the PDF
import { renderToFile } from '@react-pdf/renderer';
import { MyDocument } from './src/Document';

await renderToFile(<MyDocument />, './output/document.pdf');
```

Then convert to PNG using one of the tools below.

---

## Conversion Tools

### pdf-to-png (Node.js)

```bash
npm install pdf-to-png-converter
```

```tsx
import { pdfToPng } from 'pdf-to-png-converter';

const pages = await pdfToPng('./output/document.pdf', {
  disableFontFace: false,
  useSystemFonts: false,
  viewportScale: 2.0,         // 2x resolution for sharp rendering
  outputFolder: './output/pages',
  outputFileMaskFunc: (pageNumber) => `page-${String(pageNumber).padStart(2, '0')}.png`,
  pagesToProcess: [1, 2, 3],  // specific pages, or omit for all
});
```

### pdftoppm (Command Line – Linux/Mac)

Part of the `poppler-utils` package.

```bash
# Install
sudo apt-get install poppler-utils   # Linux
brew install poppler                  # Mac

# Convert all pages at 300 DPI
pdftoppm -png -r 300 output/document.pdf output/pages/page

# Convert a specific page (page 5)
pdftoppm -png -r 300 -f 5 -l 5 output/document.pdf output/pages/page
```

### Ghostscript (Command Line)

```bash
gs -dNOPAUSE -dBATCH -sDEVICE=png16m -r300 \
   -sOutputFile=output/pages/page-%02d.png \
   output/document.pdf
```

### sharp (Node.js – from PDF buffer)

If you already have the PDF as a buffer:

```bash
npm install sharp
```

```tsx
import sharp from 'sharp';
import fs from 'fs';

// sharp can convert PDF pages if compiled with libvips PDF support
const pdfBuffer = fs.readFileSync('./output/document.pdf');
await sharp(pdfBuffer, { page: 0 })  // page 0 = first page
  .png()
  .toFile('./output/pages/page-01.png');
```

Note: `sharp` PDF support depends on your system's libvips build. The dedicated PDF-to-PNG tools above are more reliable for this specific use case.

---

## Resolution Recommendations

| Use Case | DPI / Scale | Notes |
|----------|-------------|-------|
| Quick AI review | 150 DPI / 1x scale | Fast, good enough for layout review |
| Detailed AI review | 300 DPI / 2x scale | Better for checking typography and spacing details |
| Print proofing | 300 DPI / 2x scale | Matches print resolution |

Higher resolution PNGs give the AI more detail to work with, but also use more tokens for vision analysis. 300 DPI (2x scale) is the sweet spot.

---

## Prompting AI with PNG Screenshots

### Layout Review

```
Here is a PNG screenshot of page 5 of my ebook:

[attach page-05.png]

Review this page for:
1. Alignment – are all elements properly aligned?
2. Spacing – is the whitespace consistent and balanced?
3. Typography – does the heading/body hierarchy work?
4. Color – are the colors appropriate and readable?
5. Balance – does the page feel visually balanced?

For each issue you identify, describe the problem and suggest
a specific fix with measurements (in points).
```

### Comparison Review

```
Here are two versions of page 12:

Before: [attach page-12-v1.png]
After: [attach page-12-v2.png]

Which version is better? What specific improvements do you see
in the second version? What remaining issues should be fixed?
```

### Consistency Check

```
Here are pages 3, 7, and 11 from my ebook. These are all
chapter intro pages that should follow the same layout pattern:

[attach page-03.png]
[attach page-07.png]
[attach page-11.png]

Are these pages visually consistent? Identify any differences in:
- Heading position and size
- Spacing between elements
- Color usage
- Overall layout structure
```

---

## What AI Can Identify from PNG

| Category | AI Is Good At | AI Is Not Good At |
|----------|---------------|-------------------|
| **Layout** | Alignment, spacing, balance, visual weight | Exact point measurements (it estimates) |
| **Typography** | Size hierarchy, readability, consistency | Identifying specific font names |
| **Color** | Contrast, palette harmony, accessibility | Exact hex values (it approximates) |
| **Content** | Reading text, identifying orphans/widows | Detecting subtle kerning issues |
| **Overall** | "Something looks off" gut checks | Matching to a specific brand guide it hasn't seen |

AI gives you directional feedback – "the heading is too close to the body text, add more space." It won't say "add exactly 8pt." You'll need to translate its feedback into specific values, or ask it to suggest values and then verify visually.

---

## What AI Cannot Do with PDF Source Code

Do not expect an AI to reliably predict the visual output by reading react-pdf source code alone. The AI might:

- Misjudge how flexbox will distribute space
- Not account for text wrapping at specific widths
- Miss that content overflows a container
- Incorrectly predict how page breaks will fall
- Not realize an image is too large for its container

**The source code is for editing. The PNG is for reviewing.** Use each for what it's good at.

---

## Automation Script

Combine rendering and conversion into a single script:

```tsx
// scripts/render-and-preview.ts
import { renderToFile } from '@react-pdf/renderer';
import { pdfToPng } from 'pdf-to-png-converter';
import { MyDocument } from '../src/Document';

async function main() {
  const pdfPath = './output/document.pdf';
  const pngDir = './output/pages';

  console.log('Rendering PDF...');
  await renderToFile(<MyDocument />, pdfPath);

  console.log('Converting to PNG...');
  await pdfToPng(pdfPath, {
    viewportScale: 2.0,
    outputFolder: pngDir,
    outputFileMaskFunc: (pageNum) =>
      `page-${String(pageNum).padStart(2, '0')}.png`,
  });

  console.log(`Done. PNGs saved to ${pngDir}/`);
}

main().catch(console.error);
```

Run this after every change, then feed the relevant page PNG to the AI for review. This loop – code, render, screenshot, review, adjust – is how you converge on a polished result.

---

## Summary

- **PDF files** are for final delivery to readers
- **PNG screenshots** are for AI design review
- Always convert to PNG before asking AI to evaluate visual quality
- Use 300 DPI / 2x scale for detailed review
- Automate the render-to-PNG pipeline so the feedback loop is fast
