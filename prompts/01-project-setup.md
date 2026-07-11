# Prompt: React-PDF Project Setup

Use this prompt to scaffold a new `@react-pdf/renderer` project from scratch.

---

## Prompt

Set up a new React-PDF project with the following structure:

### Dependencies
```json
{
  "dependencies": {
    "@react-pdf/renderer": "^4.5.1",
    "react": "^19.2.4"
  },
  "devDependencies": {
    "@types/node": "^22.20.1",
    "@types/react": "^19.2.13",
    "tsx": "^4.23.0",
    "typescript": "^5.9.3"
  }
}
```

### Scripts
```json
{
  "build": "tsx src/build.tsx",
  "export": "bash scripts/export-pages.sh",
  "pipeline": "tsx src/build.tsx && bash scripts/export-pages.sh"
}
```

### File Structure
```
project/
├── fonts/                    # .ttf font files (Inter or your choice)
├── output/                   # Generated PDF + PNG pages
├── scripts/
│   └── export-pages.sh       # pdftoppm PNG export script
├── src/
│   ├── fonts.ts              # Font.register() calls
│   ├── build.tsx             # ReactPDF.render() build script
│   ├── Document.tsx          # Root <Document> component
│   ├── styles/
│   │   ├── theme.ts          # Design tokens (single source of truth)
│   │   └── shared.ts         # Shared StyleSheet
│   ├── components/           # Reusable components
│   │   ├── ContentPage.tsx   # Standard page wrapper
│   │   ├── Header.tsx        # Fixed page header
│   │   ├── Footer.tsx        # Fixed page footer
│   │   └── ...
│   └── pages/                # One file per page
│       ├── Page01-Cover.tsx
│       └── ...
├── CLAUDE.md                 # Claude Code project instructions
├── STYLE.md                  # Visual style guide
└── package.json
```

### Font Registration Pattern
```typescript
// src/fonts.ts
import { Font } from '@react-pdf/renderer';
import path from 'path';

const FONTS_DIR = path.resolve(__dirname, '../fonts');

Font.register({
  family: 'Inter',
  fonts: [
    { src: path.join(FONTS_DIR, 'Inter-Regular.ttf'), fontWeight: 400 },
    { src: path.join(FONTS_DIR, 'Inter-Italic.ttf'), fontWeight: 400, fontStyle: 'italic' },
    { src: path.join(FONTS_DIR, 'Inter-Medium.ttf'), fontWeight: 500 },
    { src: path.join(FONTS_DIR, 'Inter-SemiBold.ttf'), fontWeight: 600 },
    { src: path.join(FONTS_DIR, 'Inter-Bold.ttf'), fontWeight: 700 },
  ],
});

// Disable hyphenation for clean text
Font.registerHyphenationCallback((word) => [word]);
```

### Build Script Pattern
```tsx
// src/build.tsx
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';
import './fonts';
import MyDocument from './Document';

const OUTPUT_DIR = path.resolve(__dirname, '../output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'document.pdf');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('Building PDF...');
const start = Date.now();

ReactPDF.render(<MyDocument />, OUTPUT_FILE).then(() => {
  const elapsed = Date.now() - start;
  const stats = fs.statSync(OUTPUT_FILE);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`PDF generated: ${OUTPUT_FILE}`);
  console.log(`Size: ${sizeMB} MB | Time: ${elapsed}ms`);
});
```

### PNG Export Script
```bash
#!/bin/bash
# scripts/export-pages.sh
set -e
PDF_FILE="output/document.pdf"
PNG_DIR="output/pages"
DPI=150
mkdir -p "$PNG_DIR"
echo "Exporting pages at $DPI DPI..."
pdftoppm -png -r "$DPI" "$PDF_FILE" "$PNG_DIR/page"
echo "Export complete."
ls -lh "$PNG_DIR"/page-*.png
```

### Critical Rules
1. Always use `fontWeight` alongside `fontFamily` — Inter is a single family, weight selects the variant
2. Always use `wrap={false}` on elements that must not split across pages
3. Always reference design tokens from theme.ts — never hardcode values
4. Use LETTER page size (612 x 792pt) with generous margins (50-60pt)
5. Disable hyphenation globally via `Font.registerHyphenationCallback`
