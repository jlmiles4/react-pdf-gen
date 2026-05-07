# Rendering pipeline

End-to-end: TSX components → PDF file → PNG pages.

## Stage 1: PDF render (`pnpm build`)

`src/build.tsx` is the entry point. Run via `tsx src/build.tsx`.

```ts
import './fonts';                          // side-effect: Font.register
import EbookDocument from './Document';
ReactPDF.render(<EbookDocument />, 'output/ebook.pdf');
```

Order matters: `fonts.ts` must be imported before any `<Page>` renders, otherwise text falls back to Helvetica. The script:

1. Creates `output/` if it doesn't exist.
2. Calls `ReactPDF.render(...)` which returns a Promise that resolves once the file is written.
3. Logs file size in MB and elapsed ms on success; exits with code 1 on failure.

`ReactPDF.render` is the Node-side API from `@react-pdf/renderer`. It walks the React tree synchronously, lays out pages with the embedded layout engine (Yoga flexbox), and streams the PDF to the given path. There is no separate "server" — `tsx` runs the file directly.

## Stage 2: PNG export (`pnpm export`)

`scripts/export-pages.sh` wraps `pdftoppm` (from `poppler-utils`):

```bash
pdftoppm -png -r 200 output/ebook.pdf output/pages/page
```

Defaults:
- DPI: `200` (override via `./scripts/export-pages.sh 150` for faster/smaller output, or `300` for print-quality verification).
- Output: `output/pages/page-NN.png`, one file per PDF page, zero-padded numbering.
- The script clears existing `page-*.png` files before re-exporting and verifies `pdftoppm` is on PATH; on Debian/Ubuntu it runs `sudo apt-get install -y poppler-utils` if missing.

## Stage 3: combined (`pnpm pipeline`)

```
tsx src/build.tsx && bash scripts/export-pages.sh
```

Use this whenever you want to verify visual output. PDF first; if the build fails, the export step is skipped via `&&`.

## Dev watch (`pnpm dev`)

`tsx watch src/build.tsx` re-runs the build on every file change under `src/`. There is no PDF live-reload — open the regenerated `output/ebook.pdf` in a viewer that reloads on file change (most macOS Preview-style viewers do not; Zathura, Skim, and `xdg-open` chained to a PDF viewer with reload work).

## Performance notes

- A full 68-page render takes ~2–3 seconds on a modern laptop (current build: ~0.25 MB PDF, ~2.8s). Most of the time is layout, not I/O.
- PDF size is currently ~250 KB; the dominant cost would be embedded font subsets (Inter × 7 variants) plus any raster images. Removing unused weights from `src/fonts.ts` shrinks the file.
- PNG export at 200 DPI produces ~40–250 KB per page (text-heavy pages compress smaller). 150 DPI is enough for layout review; 200 DPI is what the book itself recommends for AI vision analysis.
