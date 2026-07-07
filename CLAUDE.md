# React-PDF Project — Claude Code Instructions

## Commands
- **Build PDF:** `pnpm build` (syncs registry, then `tsx src/build.tsx` does a two-pass render: render → `pdftotext` extracts chapter page positions to `output/toc-positions.json` → render again so the TOC reflects them. Outputs `output/ebook.pdf`, ~10s.)
- **Sync Registry:** `pnpm sync` (regenerates `src/registry.ts` from `src/pages/`)
- **Export PNGs:** `pnpm export` (runs `scripts/export-pages.sh`, outputs to `output/pages/`)
- **Full pipeline:** `pnpm pipeline` (build + export)
- **Typecheck:** `pnpm typecheck` (sync, then `tsc --noEmit`)
- **Dev watch:** `pnpm dev`

## Architecture Rules
1. **One file per page.** Each `.tsx` under `src/pages/` renders exactly one PDF page. Layout is directory-based: one folder per chapter, `src/pages/NN-chapter/NN-page.tsx`. Each chapter folder starts with `00-title.tsx` (renders `<ChapterTitle>` only), then `01-<chapter>.tsx` (first `<ContentPage>`), then continuation pages `03-…`, `04-…` (continuations start at `03-` by convention). Book chrome (Cover, TOC, Conclusion) live in their own folders — `01-cover/`, `02-toc/`, `15-conclusion/` — each with a single `01-…tsx` file and no divider.
2. **Manifest, not metadata comments.** Chapter structure lives in `src/manifest.ts` — a `Group[]`, where each group has `id`/`title`/`chapters` and each chapter has `num`/`title`/`subtitle`/`entryPage`. `scripts/sync-project.ts` reads it plus the `src/pages/` tree to generate `src/registry.ts` (auto-generated, gitignored). Page files contain only React — no `// Group:` / `// Number:` / `// Title:` directives. To add a chapter, edit the manifest; to add a page within a chapter, just drop a file in the folder.
3. **Dir-number vs chapter-number.** The page directories are `01`–`15` (book-position order); manifest chapter numbers run `01`–`12`. The gap is the three chrome folders (`01-cover`, `02-toc`, `15-conclusion`). Chapter directory `NN` maps to manifest chapter `NN - 2`. This offset holds for the current 12 chapters only — it's a consequence of dir order, not a rule sync enforces. `scripts/sync-project.ts` pins `15-conclusion` (`CHROME_END`) as the last page regardless of directory number, so a new chapter simply takes the next free dir number after `15-` (i.e. `16-`, `17-`, …); its book position is driven entirely by where its entry sits in the manifest, not by that dir number.
4. **Design tokens only.** Never hardcode colors, fonts, weights, sizes, line heights, icon sizes, or spacing. Import from `src/styles/theme.ts`. Tokens cover: `colors`, `fonts`, `fontWeight`, `lineHeight`, `typography`, `fontScale`, `letterSpacing`, `spacing`, `page`, `borders`, `iconSize`, `opacity`, `accentBar`, `layout`, `syntax`.
5. **Shared components.** Use existing components from `src/components/` — never recreate patterns inline.
6. **No Helvetica.** All body and heading text uses Inter; code blocks and inline code use the monospace `fonts.mono`/`fonts.monoBold` (Courier) tokens. Always pair `fontFamily` with `fontWeight` from the `fontWeight` token (`fontWeight.regular`/`semibold`/`bold`) — never inline literals like `fontWeight: 700 as const`.
7. **Markdown support.** Use `<MarkdownRenderer content={body} />` to render a Markdown string. Supports `#`/`##`/`###` headings, `**bold**`, `*italic*`/`_italic_`, `` `code` ``, lists, fenced code blocks, and `> [!TIP|WARNING|INFO]` callouts. (Only `14-markdown-automation/01-…` and `14-markdown-automation/03-supported-elements` actually read from a `.md` file; the rest of the book is hand-authored TSX.)
8. **wrap={false}** on any element that must not split across pages.
9. **minPresenceAhead={40}** on section headings.

## Key Files
| File | Purpose |
|------|---------|
| `src/styles/theme.ts` | Design tokens (colors, fonts, spacing, borders, page) |
| `src/styles/shared.ts` | Shared StyleSheet used by all pages |
| `src/fonts.ts` | Inter font registration (7 weight/style variants) |
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
<Table headers={[...]} rows={[[...]]} columnWidths={['30%','70%']} />  — cells are plain strings (no inline JSX)
<TipBox label="Custom Label">text</TipBox>    — Gold callout (also: WarningBox, InfoBox)
<CheckIcon size={iconSize.sm} color={colors.success} /> — SVG icon (also: XIcon, InfoIcon, etc.)
<RecipeCard title="..." icon={<...>}>…</RecipeCard>  — bordered titled card (Ch07/Ch10 recipe pattern)
<ChecklistItem>text</ChecklistItem>      — check-icon checklist row; pair with <ChecklistCategory>Heading</ChecklistCategory> (Ch10 checklists)
<IconList items={[...]} icon={CheckIcon} color={colors.success} />  — icon + bodySmall row list, optional size (Ch09 checklists)
```

## When Adding a New Page
1. **Continuation page in an existing chapter:** create `src/pages/<chapter-folder>/NN-topic.tsx` exporting a component that returns a single `<ContentPage sectionTitle="…" wrap={false}>…</ContentPage>`. Sync picks it up automatically.
2. **New chapter:** add a `Chapter` entry to `src/manifest.ts` with `entryPage: 'NN-new-chapter/00-title'`, then create `00-title.tsx` (renders `<ChapterTitle>` only) and `01-<new-chapter>.tsx` (the first content page).
3. Build and visually verify: `pnpm pipeline`.

See `docs/guides/add-a-page.md` for full skeletons.

## Image Viewing Limit
Model APIs hard-cap images per conversation (the Claude API fails at **100** with an `invalid_request_error`; other providers have similar caps). This project exports ~70 page PNGs — close to that limit — so batch-reading them will break the session.

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
- `content/chapters/` — author Markdown drafts; **not** loaded by the build except `12-markdown-demo.md` (split on its `<!-- page-break -->` marker and rendered by `14-markdown-automation/01-…` and `03-supported-elements`). Editing the others does not change the PDF.
