# Style Guide — React-PDF + AI Ebook

This document defines the visual language for the ebook. Every page, component, and design decision follows these rules. Use it as the single reference when creating or reviewing pages.

---

## Typography

**Font Family:** Inter (Google Fonts)
Registered via `src/fonts.ts` with weights 400, 500, 600, 700, plus italics for 400/600/700.

| Token       | Size  | Weight | Use                                    |
|-------------|-------|--------|----------------------------------------|
| `display`   | 36pt  | 700    | Hero scale (cover title itself uses `fontScale.coverTitle` = 42pt) |
| `h1`        | 26pt  | 700    | Page-level headings (rarely used)      |
| `h2`        | 20pt  | 600    | Section headings (via `SectionHeading`)|
| `h3`        | 16pt  | 600    | Sub-section headings                   |
| `h4`        | 13pt  | 600    | Labels, callout titles                 |
| `body`      | 11pt  | 400    | Main reading text, line-height 1.6     |
| `bodySmall` | 9.5pt | 400    | Secondary text, table cells            |
| `caption`   | 8.5pt | 400    | Footer text, fine print                |
| `code`      | 9pt   | —      | Code blocks (Courier)                  |
| `codeSmall` | 8pt   | —      | Inline code labels                     |

**Rules:**
- Never use default Helvetica. Every text element must use `fonts.body`, `fonts.bodyBold`, or `fonts.heading` from `theme.ts` — except code, which uses `fonts.mono`/`fonts.monoBold` (Courier).
- Always pair `fontFamily: fonts.bodyBold` with `fontWeight: fontWeight.semibold` (Inter is a single family; weight alone controls boldness).
- Headings use `fontWeight.bold` (700) for heading-level or `fontWeight.semibold` (600) for sub-heading. Use the token, not the literal.
- Body text line-height: `lineHeight.relaxed` (1.6). Never below `lineHeight.snug` (1.4) for any text.
- Hyphenation is disabled globally (`Font.registerHyphenationCallback`).

---

## Color Palette

### Primary — Deep Navy
Authority, trust, professionalism. Used for headings, dark backgrounds, code blocks.

| Token | Hex       | Use                              |
|-------|-----------|----------------------------------|
| 900   | `#0B1426` | Code block background            |
| 800   | `#121F3D` | Chapter title pages, table headers, SectionBanner |
| 700   | `#1A2D54` | h3 headings, accent contexts     |
| 500   | `#2E4A82` | Primary brand                    |
| 50    | `#EDF1F8` | InfoBox background               |

### Accent — Warm Gold/Amber
Energy, premium feel. Used for accent bars, bullet dots, TipBox borders, highlights.

| Token | Hex       | Use                              |
|-------|-----------|----------------------------------|
| 700   | `#BE7B00` | TipBox label text                |
| 500   | `#F0A000` | Accent bars, bullet dots, gold line elements |
| 400   | `#F5B733` | Cover title accent ("+ AI"), code labels |
| 50    | `#FEF8E6` | TipBox background                |

### Neutral — Slate Grays
Body text, borders, subtle backgrounds, secondary information.

| Token | Hex       | Use                              |
|-------|-----------|----------------------------------|
| 900   | `#1A1A2E` | Page default text color          |
| 800   | `#2D2D44` | Body text                        |
| 500   | `#7A7A91` | Page numbers, header text        |
| 300   | `#B2B2C2` | Chapter title subtitles          |
| 200   | `#D0D0DB` | Borders, dividers                |
| 100   | `#E8E8EF` | Table row borders, subtle lines  |
| 50    | `#F5F5F8` | Alternating table row background |

### Semantic Colors

| Color         | Hex       | Use                    |
|---------------|-----------|------------------------|
| `success`     | `#2D8B4E` | Check icons, good examples |
| `successLight`| `#F0F9F4` | Good comparison column bg |
| `error`       | `#C43333` | X icons, warning labels, bad examples |
| `errorLight`  | `#FEF3F3` | Bad comparison column bg, WarningBox bg |
| `info`        | `#2E6BB5` | Info icons, InfoBox label |
| `warning`     | `#D98E00` | Alert triangle icons   |

**Rules:**
- Maximum 3-5 colors on any page. Navy + gold + one neutral shade covers most layouts.
- Color carries meaning: primary = structure, accent = emphasis, semantic = status.
- Never use random hex values. Always reference `colors.*` from `theme.ts`.

---

## Spacing Scale

Based on a 4pt grid, plus two sub-grid utility tokens:

| Token  | Value | Use                                     |
|--------|-------|-----------------------------------------|
| `micro`| 1pt   | Hairlines, inline-code vertical padding |
| `xxs`  | 2pt   | Sub-grid nudges (inline code, TOC rows) |
| `xs`   | 4pt   | Tight gaps, icon-to-label spacing       |
| `sm`   | 8pt   | Standard element spacing, list items    |
| `md`   | 12pt  | Component internal padding, margins     |
| `lg`   | 16pt  | Section spacing, component gaps         |
| `xl`   | 24pt  | Major section breaks                    |
| `xxl`  | 32pt  | Large vertical separation               |
| `xxxl` | 48pt  | Cover page / hero spacing               |

**Rules:**
- Always use spacing tokens. Never hardcode padding/margin values inline.
- Minimum space between sections: `spacing.lg` (16pt).
- Page margins: 54pt horizontal, 60pt vertical. Generous whitespace is intentional.
- Content width: 504pt (LETTER 612pt minus 54pt left + 54pt right).

---

## Page Layout

| Property       | Value   |
|----------------|---------|
| Page size      | LETTER (612 x 792pt) |
| Top margin     | 60pt    |
| Bottom margin  | 60pt    |
| Left margin    | 54pt    |
| Right margin   | 54pt    |
| Content area   | 504 x 672pt |

### Page Types

1. **Cover Page** (`01-cover/01-cover.tsx`) — Dark navy background, gold accent bar, large display title, no header/footer.
2. **Table of Contents** (`02-toc/01-toc.tsx`) — Custom layout with grouped chapter entries and colored category badges.
3. **Chapter Title Pages** (`ChapterTitle` component) — Dark navy full-bleed page, gold accent bar, chapter number + title + subtitle. Decorative SVG circle in corner.
4. **Content Pages** (`ContentPage` wrapper) — White background, fixed header with section title, fixed footer with brand + page number.

---

## Components

### SectionHeading
Gold accent bar (4px wide, 22px tall, `accent[500]`) + h2 text. Used for every section heading inside content pages.
```
┃ Section Title Text
```

### SectionBanner
Dark navy rounded card (`primary[800]`) with gold accent bar + white title + optional subtitle. Used for hero-style introductions within a page.

### ChapterTitle
Full-page dark navy background. Gold accent bar, uppercase "CHAPTER XX" label, large white title, neutral subtitle. Decorative SVG circle.

### ContentPage
Standard wrapper: `<Page>` with shared page styles, fixed `<Header>` (book title left, section title right), and fixed `<Footer>` (brand left, page number right).

### TipBox / WarningBox / InfoBox
Left-bordered callout boxes with `wrap={false}` to prevent splitting across pages.

| Variant    | Border Color   | Background       | Icon              |
|------------|---------------|------------------|-------------------|
| TipBox     | `accent[500]` | `accent[50]`     | ZapIcon (gold)    |
| WarningBox | `error`       | `errorLight`     | AlertTriangleIcon |
| InfoBox    | `info`        | `primary[50]`    | InfoIcon (blue)   |

### CodeBlock
Dark navy background (`primary[900]`), rounded corners, Courier font. Optional language label in gold (`accent[400]`). `wrap={false}` prevents splitting.

### BulletList
Gold SVG circle dots (`accent[500]`, 6px diameter) with body text. Each item is a flex row.

### Table
Rounded container with navy header row (`primary[800]`), white header text (600 weight), alternating row backgrounds (`white` / `neutral[50]`), subtle bottom borders.

### Icons
SVG-based Lucide icons. Never use emoji. Available: `CheckIcon`, `XIcon`, `AlertTriangleIcon`, `InfoIcon`, `ArrowRightIcon`, `BookIcon`, `CodeIcon`, `LayersIcon`, `PaletteIcon`, `ZapIcon`.

---

## Design Principles

1. **Consistency over creativity.** Every page should feel like it belongs to the same document. Use the same heading style, the same spacing, the same callout patterns.

2. **Whitespace is intentional.** Generous margins (54-60pt) and spacing between sections. Pages should breathe, not feel cramped.

3. **Hierarchy through contrast.** Three levels are enough: heading (20pt navy 600), body (11pt slate 400), caption/label (8-9.5pt light gray 400). Color and weight create distinction, not size alone.

4. **Components, not inline styles.** Every visual pattern has a component (`SectionHeading`, `TipBox`, `BulletList`, `Table`, `CodeBlock`). Page files should import and compose these — never recreate patterns with inline styles.

5. **Design tokens, not magic numbers.** Colors from `colors.*`, sizes from `typography.*`/`fontScale.*`, font weights from `fontWeight.*`, line heights from `lineHeight.*`, spacing from `spacing.*`, borders from `borders.*`, icon sizes from `iconSize.*`, opacity from `opacity.*`, layout constants from `layout.*`. Local `StyleSheet.create()` for page-specific styles that reference tokens.

6. **SVG icons, never emoji.** Icons are vector-sharp, color-matched, and consistent across renderers.

7. **No orphans.** If a callout box, table, or heading would appear alone at the bottom of a page, add content above or restructure to fill the page naturally.

---

## File Structure

```
src/
├── fonts.ts              # Inter font registration
├── build.tsx             # PDF build script (two-pass render)
├── Document.tsx          # Root Document component (maps the generated registry)
├── manifest.ts           # Chapter structure (source of truth)
├── registry.ts           # AUTO-GENERATED page list (gitignored)
├── tocPositions.ts       # Reads output/toc-positions.json
├── styles/
│   ├── theme.ts          # Design tokens (single source of truth)
│   └── shared.ts         # Shared StyleSheet used by all pages
├── components/
│   ├── ContentPage.tsx   # Standard page wrapper
│   ├── Header.tsx        # Fixed page header
│   ├── Footer.tsx        # Fixed page footer
│   ├── ChapterTitle.tsx  # Chapter title page
│   ├── SectionHeading.tsx# Gold bar + h2 heading
│   ├── SectionBanner.tsx # Dark navy hero banner
│   ├── TipBox.tsx        # TipBox, WarningBox, InfoBox
│   ├── CodeBlock.tsx     # Styled code block
│   ├── BulletList.tsx    # Gold-dot bullet list
│   ├── Table.tsx         # Professional table
│   ├── MarkdownRenderer.tsx # Renders Markdown strings (headings, lists, code, callouts)
│   ├── RecipeCard.tsx    # Bordered recipe/example card
│   ├── ChecklistItem.tsx # Check-icon checklist row + category heading
│   ├── IconList.tsx      # Icon + small-body row list
│   ├── AccentBar.tsx     # Horizontal gold hero bar
│   ├── CoverDecor.tsx    # Concentric-circle background flourish
│   ├── Icon.tsx          # react-icons → react-pdf adapter
│   ├── Icons.tsx         # SVG Lucide icons (bound via Icon.tsx)
│   └── index.ts          # Barrel re-export
├── utils/
│   ├── syntaxHighlight.ts# CodeBlock token coloring
│   └── markdownParser.ts # MarkdownRenderer parser
└── pages/                # One folder per chapter: NN-chapter/NN-page.tsx
    ├── 01-cover/01-cover.tsx
    ├── 02-toc/01-toc.tsx
    ├── 03-introduction/00-title.tsx       # chapter divider
    ├── 03-introduction/01-introduction.tsx
    ├── 03-introduction/03-who-this-is-for.tsx # continuations start at 03-
    └── ...                                # 04-fundamentals/ … 15-conclusion/
fonts/
    ├── Inter-Regular.ttf
    ├── Inter-Medium.ttf
    ├── Inter-SemiBold.ttf
    ├── Inter-Bold.ttf
    ├── Inter-Italic.ttf
    ├── Inter-SemiBoldItalic.ttf
    └── Inter-BoldItalic.ttf
```

---

## Prompt Template for AI Page Generation

When asking AI to create or edit a page, include these constraints:

```
Create [page type] using these constraints:
- Import styles from '../../styles/shared'
- Import tokens from '../../styles/theme'
- Use ContentPage wrapper with sectionTitle="[section]"
- Section headings: <SectionHeading> component (gold bar + h2)
- Body text: styles.body (11pt Inter, neutral[800])
- Include at least one: CodeBlock, BulletList, or TipBox
- Match spacing and density of [existing page file]
- No inline styles except in local StyleSheet.create()
- No emojis – use icons from the '../../components' barrel (CheckIcon, XIcon, ...)
- fontWeight must accompany every fontFamily reference, sourced from `fontWeight.*` token (never inline literals)
```
