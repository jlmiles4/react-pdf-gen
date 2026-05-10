# React-PDF Project — Claude Code Instructions

## Commands
- **Build PDF:** `pnpm build` (syncs registry + runs `tsx src/build.tsx`, outputs to `output/ebook.pdf`)
- **Sync Registry:** `pnpm sync` (updates `src/registry.ts` based on `src/pages/`)
- **Export PNGs:** `pnpm export` (runs `scripts/export-pages.sh`, outputs to `output/pages/`)
- **Full pipeline:** `pnpm pipeline` (build + export)
- **Dev watch:** `pnpm dev`

## Architecture Rules
1. **One file per page.** Each page is a separate component in `src/pages/`. Named `Page##-Ch##-Topic.tsx`.
2. **Metadata comments.** Every page file must start with metadata comments for the registry:
   ```tsx
   // Group: CATEGORY_NAME
   // Number: CH_NUMBER
   // Title: CH_TITLE
   // Subtitle: CH_SUBTITLE
   ```
3. **Design tokens only.** Never hardcode colors, fonts, weights, sizes, line heights, icon sizes, or spacing. Import from `src/styles/theme.ts`. Tokens cover: `colors`, `fonts`, `fontWeight`, `lineHeight`, `typography`, `fontScale`, `letterSpacing`, `spacing`, `page`, `borders`, `iconSize`, `opacity`, `accentBar`, `layout`, `syntax`.
4. **Shared components.** Use existing components from `src/components/` — never recreate patterns inline.
5. **No Helvetica.** All text uses Inter. Always pair `fontFamily` with `fontWeight` from the `fontWeight` token (`fontWeight.regular`/`semibold`/`bold`) — never inline literals like `fontWeight: 700 as const`.
6. **Markdown support.** Use `<MarkdownRenderer content={body} />` to render content from .md files.
7. **wrap={false}** on any element that must not split across pages.
8. **minPresenceAhead={40}** on section headings.

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
1. Create `src/pages/Page##-Ch##-Topic.tsx`.
2. Add the required metadata comments (Group, Number, Title, Subtitle) at the top.
3. Export component (usually wrapped in `<ChapterTitle .../>` and `<ContentPage ...>`).
4. Run `pnpm build` (this will automatically run `pnpm sync`).
5. Build and visually verify: `pnpm pipeline`.

## Image Viewing Limit
The Claude API has a hard limit of **100 images per conversation**. This project exports 77 page PNGs (close to the limit), so batch-reading them will break the session with an `invalid_request_error`.

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
- `reference/react-pdf-api/` — API documentation for components, styling, fonts, page sizes
- `STYLE.md` — Full visual style guide with color palette, typography, spacing
- `TASK.md` — Project roadmap and chapter status
