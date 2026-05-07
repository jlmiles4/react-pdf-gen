# react-pdf-gen

A `@react-pdf/renderer` project that builds a 68-page ebook ("React-PDF + AI: The Builder's Guide to Premium PDF Generation") from React/TSX components. The build script renders TSX to a PDF; a shell script rasterizes the PDF to PNG pages for visual review.

## Quick start

```bash
pnpm install
pnpm build       # render PDF -> output/ebook.pdf
pnpm export      # rasterize PDF -> output/pages/page-NN.png (needs poppler-utils)
pnpm pipeline    # build + export
pnpm dev         # tsx watch on src/build.tsx
```

`pnpm export` shells out to `pdftoppm`. On Debian/Ubuntu it auto-installs `poppler-utils` via `sudo apt-get install` if missing (see `scripts/export-pages.sh`).

## Documentation

- [Architecture](architecture/overview.md) — how pages, components, and the build pipeline fit together
  - [Rendering pipeline](architecture/rendering-pipeline.md) — TSX → PDF → PNG, end to end
  - [Design system](architecture/design-system.md) — theme tokens, shared styles, font registration
- Guides
  - [Add a page](guides/add-a-page.md) — step-by-step for adding a new chapter or content page
  - [Pagination and layout](guides/pagination.md) — `wrap={false}`, `minPresenceAhead`, fixed headers, orphan avoidance
  - [Troubleshooting](guides/troubleshooting.md) — build errors, render surprises, the CodeBlock template-literal trap
- Reference
  - [Commands](reference/commands.md) — every `pnpm` script and what it does
  - [Components](reference/components.md) — props for every component in `src/components/`
  - [Theme tokens](reference/theme-tokens.md) — colors, typography, spacing, page geometry

## Repository layout

```
src/
  build.tsx              entry point; calls ReactPDF.render(<EbookDocument/>, output/ebook.pdf)
  Document.tsx           assembles all 14 page components into one <Document>
  fonts.ts               registers Inter (7 weights) and disables hyphenation
  styles/
    theme.ts             design tokens (colors, typography, spacing, page, borders, syntax)
    shared.ts            StyleSheet shared by every page
  components/            ContentPage, ChapterTitle, SectionHeading, TipBox, CodeBlock, Table, ...
  pages/                 one file per page: PageNN-ChNN-Topic.tsx
  utils/syntaxHighlight.ts
scripts/export-pages.sh  pdftoppm wrapper, default 200 DPI
fonts/                   Inter .ttf files (Regular, Medium, SemiBold, Bold + italics)
content/chapters/        source markdown the prose was drafted in (not loaded by the build)
reference/               long-form research notes referenced while authoring (not loaded by the build)
templates/               readers' starter pack — generalized prompt files + project-instructions template
prompts/                 internal authoring prompts — same structure as templates/, project-specific
output/                  generated PDF and PNGs (gitignored)
```

`templates/` and `prompts/` look similar but serve different audiences. See [`docs/architecture/overview.md`](architecture/overview.md#authoring-inputs-vs-build-inputs) for the distinction.
