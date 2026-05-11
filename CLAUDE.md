# React-PDF Project — Claude Code Instructions

## Commands
- **Build PDF:** `pnpm build` (syncs registry, then `tsx src/build.tsx` does a two-pass render: render → `pdftotext` extracts chapter page positions to `output/toc-positions.json` → render again so the TOC reflects them. Outputs `output/ebook.pdf`, ~10s.)
- **Sync Registry:** `pnpm sync` (regenerates `src/registry.ts` from `src/pages/`)
- **Export PNGs:** `pnpm export` (runs `scripts/export-pages.sh`, outputs to `output/pages/`)
- **Full pipeline:** `pnpm pipeline` (build + export)
- **Dev watch:** `pnpm dev`

## Architecture Rules
1. **One file per page.** Each `.tsx` under `src/pages/` renders exactly one PDF page. Layout is directory-based: one folder per chapter, `src/pages/NN-chapter/NN-page.tsx`. Each chapter folder starts with `00-title.tsx` (renders `<ChapterTitle>` only), then `01-<chapter>.tsx` (first `<ContentPage>`), then continuation pages `02-…`, `03-…`. Book chrome (Cover, TOC, Conclusion) live in their own folders — `01-cover/`, `02-toc/`, `15-conclusion/` — each with a single `01-…tsx` file and no divider.
2. **Manifest, not metadata comments.** Chapter structure lives in `src/manifest.ts` (groups, num, title, subtitle, entryPage). `scripts/sync-project.ts` reads it plus the `src/pages/` tree to generate `src/registry.ts` (auto-generated, gitignored). Page files contain only React — no `// Group:` / `// Number:` / `// Title:` directives. To add a chapter, edit the manifest; to add a page within a chapter, just drop a file in the folder.
3. **Dir-number vs chapter-number.** The page directories are `01`–`15` (book-position order); manifest chapter numbers run `01`–`12`. The gap is the three chrome folders (`01-cover`, `02-toc`, `15-conclusion`). Chapter directory `NN` maps to manifest chapter `NN - 2`.
4. **Design tokens only.** Never hardcode colors, fonts, weights, sizes, line heights, icon sizes, or spacing. Import from `src/styles/theme.ts`. Tokens cover: `colors`, `fonts`, `fontWeight`, `lineHeight`, `typography`, `fontScale`, `letterSpacing`, `spacing`, `page`, `borders`, `iconSize`, `opacity`, `accentBar`, `layout`, `syntax`.
5. **Shared components.** Use existing components from `src/components/` — never recreate patterns inline.
6. **No Helvetica.** All text uses Inter. Always pair `fontFamily` with `fontWeight` from the `fontWeight` token (`fontWeight.regular`/`semibold`/`bold`) — never inline literals like `fontWeight: 700 as const`.
7. **Markdown support.** Use `<MarkdownRenderer content={body} />` to render content from .md files. Supports `#`/`##`/`###` headings, `**bold**`, `*italic*`/`_italic_`, `` `code` ``, lists, fenced code blocks, and `> [!TIP|WARNING|INFO]` callouts.
8. **wrap={false}** on any element that must not split across pages.
9. **minPresenceAhead={40}** on section headings.

## Key Files
| File | Purpose |
|------|---------|
| `src/styles/theme.ts` | Design tokens (colors, fonts, spacing, borders, page) |
| `src/styles/shared.ts` | Shared StyleSheet used by all pages |
| `src/fonts.ts` | Inter font registration (7 weights) |
| `src/Document.tsx` | Root Document component, assembles all pages |
| `src/build.tsx` | Build script |
| `STYLE.md` | Complete visual style guide |

## Component API Quick Reference
```tsx
<ContentPage sectionTitle="Title">       — Standard page wrapper with header/footer
<ChapterTitle number="01" title="..." subtitle="..." />  — Full-page chapter divider
<SectionHeading>Title</SectionHeading>   — Gold bar + h2 heading
<SectionBanner title="..." subtitle="..." />  — Dark navy hero card
<CodeBlock language="tsx">{code}</CodeBlock>   — Dark code block
<BulletList items={['item1', 'item2']} />     — Gold-dot bullet list
<Table headers={[...]} rows={[[...]]} columnWidths={['30%','70%']} />
<TipBox label="Custom Label">text</TipBox>    — Gold callout (also: WarningBox, InfoBox)
<CheckIcon size={iconSize.sm} color={colors.success} /> — SVG icon (also: XIcon, InfoIcon, etc.)
```

## When Adding a New Page
1. **Continuation page in an existing chapter:** create `src/pages/<chapter-folder>/NN-topic.tsx` exporting a component that returns a single `<ContentPage sectionTitle="…" wrap={false}>…</ContentPage>`. Sync picks it up automatically.
2. **New chapter:** add a `Chapter` entry to `src/manifest.ts` with `entryPage: 'NN-new-chapter/00-title'`, then create `00-title.tsx` (renders `<ChapterTitle>` only) and `01-<new-chapter>.tsx` (the first content page).
3. Build and visually verify: `pnpm pipeline`.

See `docs/guides/add-a-page.md` for full skeletons.

## Image Viewing Limit
The Claude API has a hard limit of **100 images per conversation**. This project exports ~70 page PNGs (close to the limit), so batch-reading them will break the session with an `invalid_request_error`.

- **Only open one PNG at a time.** Never batch-read all pages from `output/pages/`.
- When verifying visual output, open only the specific page(s) you changed.
- If you need to check multiple pages, review them one at a time and keep a mental count.
- If you hit the limit, start a fresh session with `/clear`.

## Quality Checks After Any Change
- Run `pnpm pipeline` and check PNG output for:
  - No orphaned headings (gold bar without text at page bottom)
  - No split callout boxes (empty colored boxes)
  - No orphaned bullet dots
  - TOC fits on one page
  - Consistent spacing between sections

## Reference Docs
- `docs/` — Project docs: `architecture/`, `guides/`, `reference/` (start at `docs/README.md`)
- `reference/react-pdf-api/` — Upstream react-pdf API docs
- `STYLE.md` — Visual style guide with color palette, typography, spacing
- `TASK.md` — Project roadmap and chapter status
