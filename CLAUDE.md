# React-PDF Project — Claude Code Instructions

## Project Overview
This is a `@react-pdf/renderer` ebook project. It generates a professional PDF from React/TSX components using the `tsx` runtime.

## Commands
- **Build PDF:** `pnpm build` (runs `tsx src/build.tsx`, outputs to `output/ebook.pdf`)
- **Export PNGs:** `pnpm export` (runs `scripts/export-pages.sh`, outputs to `output/pages/`)
- **Full pipeline:** `pnpm pipeline` (build + export)
- **Dev watch:** `pnpm dev`

## Architecture Rules
1. **One file per page.** Each page is a separate component in `src/pages/`. Named `Page##-Ch##-Topic.tsx`.
2. **Design tokens only.** Never hardcode colors, fonts, or spacing. Import from `src/styles/theme.ts`.
3. **Shared components.** Use existing components from `src/components/` — never recreate patterns inline.
4. **No Helvetica.** All text uses Inter font. Always pair `fontFamily` with explicit `fontWeight` (400, 500, 600, or 700).
5. **No emoji.** Use SVG icons from `src/components/Icons.tsx`.
6. **wrap={false}** on any element that must not split across pages: callout boxes, code blocks, table rows, bullet items, recipe cards.
7. **minPresenceAhead={40}** on section headings to prevent orphaned headings at page bottom.

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
```
<ContentPage sectionTitle="Title">       — Standard page wrapper with header/footer
<ChapterTitle number="01" title="..." subtitle="..." />  — Full-page chapter divider
<SectionHeading>Title</SectionHeading>   — Gold bar + h2 heading
<SectionBanner title="..." subtitle="..." />  — Dark navy hero card
<CodeBlock language="tsx">{code}</CodeBlock>   — Dark code block
<BulletList items={['item1', 'item2']} />     — Gold-dot bullet list
<Table headers={[...]} rows={[[...]]} columnWidths={['30%','70%']} />
<TipBox label="Custom Label">text</TipBox>    — Gold callout (also: WarningBox, InfoBox)
<CheckIcon size={12} color={colors.success} /> — SVG icon (also: XIcon, InfoIcon, etc.)
```

## When Adding a New Page
1. Create `src/pages/Page##-Ch##-Topic.tsx`
2. Import from `../styles/shared`, `../styles/theme`, and relevant components
3. Export component wrapped in `<> <ChapterTitle .../> <ContentPage ...> ... </ContentPage> </>`
4. Register in `src/Document.tsx`
5. Update TOC in `src/pages/Page02-TOC.tsx`
6. Build and visually verify: `pnpm pipeline`

## Image Viewing Limit
The Claude API has a hard limit of **100 images per conversation**. This project exports 100+ page PNGs, so careless viewing will hit this limit and break the session with an `invalid_request_error`.

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
