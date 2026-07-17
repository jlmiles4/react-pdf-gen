# Rendering pipeline

End-to-end: TSX components → PDF file → PNG pages.

## Stage 1: PDF render (`pnpm build`)

`pnpm build` runs `pnpm sync && tsx src/build.tsx`. Sync regenerates `src/registry.ts` from `src/manifest.ts` + the `src/pages/` tree; the build script does a two-pass render so the TOC can show real page numbers.

```ts
import EbookDocument from './Document';    // Document.tsx side-effect-imports ./fonts (Font.register)

await renderPdf();                         // pass 1
const { positions, ambiguous } =
  extractTocPositions();                   // shells out to `pdftotext -layout`
// validate: no ambiguous, stray, or missing chapter markers
fs.writeFileSync(POSITIONS_FILE, ...);     // output/toc-positions.json (only after validation)
await renderPdf();                         // pass 2 — TOC reads positions
// re-extract from pass 2 and fail if any chapter position shifted
```

Fonts register as a side effect of importing `Document.tsx` (which imports `./fonts`), so any entry point that renders the book gets the Inter family automatically. The script:

1. Creates `output/` if it doesn't exist.
2. Pass 1: renders via `ReactPDF.render(...)`. The TOC reserves its page-number column but renders empty strings on first build (or stale positions from a prior run).
3. Spawns `pdftotext -layout output/react-pdf-ai-builders-guide.pdf -`, splits on form-feed (`\f`) for one block per page, and matches `^CHAPTER\s+(\d{1,2})$` line-by-line, recording the page each chapter's divider lands on. Three guards run before anything is written: a chapter marker found on more than one page (stray standalone "CHAPTER NN" body text) fails the build; an extracted number with no manifest chapter warns; a manifest chapter with no marker fails the build. Only then is `output/toc-positions.json` written.
4. Pass 2: re-renders. `src/pages/02-toc/01-toc.tsx` reads `toc-positions.json` via `src/tocPositions.ts` and fills the page-number column.
5. Re-extracts positions from the pass-2 PDF and fails if any chapter shifted between passes — the invariant that TOC layout doesn't depend on the page-number text is verified, not assumed.
6. Runs `pdfinfo` and rejects the build if the rendered page count differs from the registry length (each page file must render exactly one PDF page), or if any page's dimensions differ from 612 × 792pt LETTER. This catches non-wrapping content that silently grows a page box.
7. Logs file size and total elapsed ms (~10s for both passes on a current laptop). Exits 1 on failure.

The TOC layout is identical between passes (column reserved either way), so positions extracted from pass 1 are still correct for pass 2 — no convergence iteration needed, and step 5 proves it on every build.

### Clickable TOC wiring

The implementation uses React-pdf's [destination navigation](https://react-pdf.org/advanced#document-navigation): a target node gets an `id`, and a `Link` points to that ID with a leading `#`. The TOC combines two independent navigation concerns. Keep them separate: physical page numbers can change whenever content moves, while destination IDs must stay stable so links do not break.

| Concern | Source | Consumer |
|---|---|---|
| Displayed page number | `output/toc-positions.json`, generated between render passes | `positions[ch.num]` in `src/pages/02-toc/01-toc.tsx` |
| Click target | `chapterDestinationId(ch.num)` from `src/manifest.ts` | `<Link src="#chapter-NN">` on the TOC row and `<Page id="chapter-NN">` in `ChapterTitle` |

`src/manifest.ts` owns the naming function so the link and destination cannot invent different formats:

```ts
export const chapterDestinationId = (num: string) => `chapter-${num}`;
```

`ChapterTitle` places the destination on the divider's `<Page>`. The `id` has no leading hash:

```tsx
<Page
  id={chapterDestinationId(number)}
  size="LETTER"
  style={ctStyles.page}
  wrap={false}
>
  ...
</Page>
```

The TOC wraps each complete row in a `Link`, making the number, title, subtitle, whitespace, and displayed page number one click target. A destination reference does include the leading hash:

```tsx
<Link
  src={`#${chapterDestinationId(ch.num)}`}
  wrap={false}
  style={s.entry}
>
  <Text style={s.entryNum}>{ch.num}</Text>
  <View style={s.entryText}>...</View>
  <Text style={s.entryPage}>{positions[ch.num] ?? ''}</Text>
</Link>
```

React-pdf links default to blue underlined text, so `s.entry` explicitly restores the book's colors and sets `textDecoration: 'none'`. Do not use a physical page number as the destination ID and do not hand-build `chapter-...` strings in page files; use `chapterDestinationId` on both sides.

When adding a chapter, the manifest `num` and `<ChapterTitle number>` must match. That single value drives the TOC lookup, the link target, and the divider destination. After building, verify the named destinations and then click each row in a PDF viewer:

```bash
pnpm build
pdfinfo -dests output/react-pdf-ai-builders-guide.pdf
```

The destination listing should contain one `chapter-NN` entry per manifest chapter, pointing at the same page displayed in the TOC. For a lower-level optional check, `pdftohtml -xml -hidden -f 2 -l 2 output/react-pdf-ai-builders-guide.pdf /tmp/toc-check` reports the page targeted by each link annotation. Use `pnpm pipeline` and inspect `output/pages/page-02.png` after style changes; link wrappers must not change the one-page TOC layout.

`ReactPDF.render` is the Node-side API from `@react-pdf/renderer`. It walks the React tree synchronously, lays out pages with the embedded layout engine (Yoga flexbox), and streams the PDF to the given path. There is no separate "server" — `tsx` runs the file directly.

Chapter title pages render their own page number bottom-left via `<Text render={({pageNumber})=>...} fixed />` inside `ChapterTitle.tsx`. The Cover intentionally has none; the Conclusion renders its own page number bottom-right.

## Stage 2: PNG export (`pnpm export`)

`scripts/export-pages.sh` wraps `pdftoppm` (from `poppler-utils`):

```bash
pdftoppm -png -r 200 output/react-pdf-ai-builders-guide.pdf output/pages/page
```

Defaults:
- DPI: `200` (override via `./scripts/export-pages.sh 150` for faster/smaller output, or `300` for print-quality verification).
- Output: `output/pages/page-NN.png`, one file per PDF page, zero-padded numbering.
- The script clears existing `page-*.png` files before re-exporting, requires both `pdftoppm` and `pdfinfo`, and verifies that the PNG count matches the PDF page count. Missing tools, zero output, or a count mismatch make the export fail.

## Stage 3: combined (`pnpm pipeline`)

```
pnpm build && pnpm export
```

Use this whenever you want to verify visual output. PDF first; if the build fails, the export step is skipped via `&&`.

## Dev watch (`pnpm dev`)

`tsx watch` runs `scripts/dev.ts` for relevant source, manifest, page-tree, sync-script, and authored-Markdown changes. Every restart re-syncs the registry and runs the two-pass build in the watched process, so added or renamed pages are picked up without a manual sync. There is no PDF live-reload — open the regenerated `output/react-pdf-ai-builders-guide.pdf` in a viewer that reloads on file change (most macOS Preview-style viewers do not; Zathura and Skim do).

## Performance notes

- The full 78-page build renders twice, so layout dominates elapsed time; the script logs the measured duration because hardware and cache state vary.
- The current PDF is about 320 KB. `pdffonts` shows subset-embedded Inter variants actually used by visible text; Courier is a standard PDF base font. Raster images would add substantially more.
- PNG size at 200 DPI varies with page complexity (roughly 48–330 KB in the current export). 150 DPI is enough for layout review; 200 DPI is what the book itself recommends for AI vision analysis.

## Generated artifacts

`output/` is gitignored except the book PDF itself, which is tracked as the shipped deliverable. Everything in it can be regenerated by `pnpm pipeline` (note: a rebuild always dirties the tracked PDF with metadata-only byte changes — see the root `CLAUDE.md` gotcha before committing it):

| File | Generator | Notes |
|---|---|---|
| `output/react-pdf-ai-builders-guide.pdf` | `tsx src/build.tsx` | Final PDF |
| `output/toc-positions.json` | pass 1 of `build.tsx` | `{ "01": 3, "02": 6, ... }` — chapter → first page |
| `output/pages/page-NN.png` | `scripts/export-pages.sh` | One per PDF page, 200 DPI |

`src/registry.ts` is also auto-generated (by `pnpm sync`) and gitignored.
