# Components

Every component lives in `src/components/` and is re-exported from `src/components/index.ts`. Props listed below come from the actual TypeScript interfaces in source.

## Page wrappers

### `ContentPage`

[`src/components/ContentPage.tsx`](../../src/components/ContentPage.tsx) — standard LETTER page with shared page styles, fixed `<Header>` and fixed `<Footer>`. The `wrap` prop is plumbed through to the underlying `<Page>` and defaults to `false`, enforcing the **one source file = one PDF page** convention. Non-wrapping overflow can enlarge the physical page box; the build's `pdfinfo` guard rejects any page that is not uniform LETTER size.

```tsx
<ContentPage sectionTitle="Introduction" wrap={false}>
  ...children...
</ContentPage>
```

| Prop | Type | Required | Default | Notes |
|---|---|---|---|---|
| `children` | `ReactNode` | yes | — | |
| `sectionTitle` | `string` | no | — | Right-aligned text in the page header |
| `wrap` | `boolean` | no | `false` | Pass `true` only for a deliberate multi-page source component |

### `ChapterTitle`

[`src/components/ChapterTitle.tsx`](../../src/components/ChapterTitle.tsx) — full-bleed dark-navy `<Page>` (no `<Header>`/`<Footer>`; renders its own page number bottom-left) with a gold accent bar, "CHAPTER NN" label, large white title, optional subtitle, and decorative SVG circles in the corner.

```tsx
<ChapterTitle number="03" title="Project Architecture" subtitle="..." />
```

| Prop | Type | Required |
|---|---|---|
| `number` | `string` | yes |
| `title` | `string` | yes |
| `subtitle` | `string` | no |

## Headings

### `SectionHeading`

[`src/components/SectionHeading.tsx`](../../src/components/SectionHeading.tsx) — gold accent bar + h2 text. Uses `wrap={false}` and `minPresenceAhead={40}`. The primary section heading on every content page.

```tsx
<SectionHeading>Section Title</SectionHeading>
```

| Prop | Type | Required |
|---|---|---|
| `children` | `ReactNode` | yes — a plain string is the common case; `MarkdownRenderer` passes styled `<Text>` spans |

### `SectionBanner`

[`src/components/SectionBanner.tsx`](../../src/components/SectionBanner.tsx) — dark navy rounded card with gold accent bar, white title, optional subtitle. `wrap={false}`. Use for hero-style introductions inside a page.

```tsx
<SectionBanner title="..." subtitle="..." />
```

| Prop | Type | Required |
|---|---|---|
| `title` | `string` | yes |
| `subtitle` | `string` | no |

## Callouts

### `TipBox`, `WarningBox`, `InfoBox`

All three live in [`src/components/TipBox.tsx`](../../src/components/TipBox.tsx). Same shape, different colors and default labels:

| Variant | Border | Background | Icon | Default label |
|---|---|---|---|---|
| `TipBox` | `accent[500]` | `accent[50]` | `ZapIcon` (gold) | `Tip` |
| `WarningBox` | `error` | `errorLight` | `AlertTriangleIcon` (red) | `Warning` |
| `InfoBox` | `info` | `primary[50]` | `InfoIcon` (blue) | `Note` |

All use `wrap={false}`. Body text is rendered as a single `<Text>` with `styles.body` — pass strings, not nested `<View>` blocks.

```tsx
<TipBox>Default label is "Tip".</TipBox>
<WarningBox label="Watch Out">Custom label.</WarningBox>
<InfoBox>Default label is "Note".</InfoBox>
```

| Prop | Type | Required |
|---|---|---|
| `children` | `ReactNode` | yes |
| `label` | `string` | no |

## Code

### `CodeBlock`

[`src/components/CodeBlock.tsx`](../../src/components/CodeBlock.tsx) — dark-navy block, Courier font, optional gold language label, syntax highlighting via `src/utils/syntaxHighlight.ts`. `wrap={false}`. Keep code under ~15 lines so it doesn't overflow the page when pushed past a break.

```tsx
<CodeBlock language="tsx">{`const x = 1;`}</CodeBlock>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `children` | `string` | yes | The literal source. Pass as a template string. |
| `language` | `string` | no | Free-text label rendered in gold above the block |

## Lists and tables

### `BulletList`

[`src/components/BulletList.tsx`](../../src/components/BulletList.tsx) — vertical list with gold SVG circle bullets. Each item is `wrap={false}` individually so a dot can't get stranded from its text. `items` accepts strings (rendered as plain body text) or React nodes (rendered as-is, useful for inline `<Text style={styles.bold}>` / `<Text style={styles.inlineCode}>` spans). `keepTogether` puts `wrap={false}` on the whole list — use it for short lists known to fit on a single page.

```tsx
<BulletList items={['First', 'Second', 'Third']} />

<BulletList
  items={[
    <Text>Plain item</Text>,
    <Text><Text style={styles.bold}>Bold</Text> + body</Text>,
  ]}
  keepTogether
/>
```

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `(string \| ReactNode)[]` | yes | — |
| `keepTogether` | `boolean` | no | `false` |

### `Table`

[`src/components/Table.tsx`](../../src/components/Table.tsx) — navy header row, alternating row backgrounds, rounded container. The header row and every body row have `wrap={false}`. Pass `wrap={true}` to let a long table break between rows (each row still stays whole). If `columnWidths` is omitted, columns split evenly.

```tsx
<Table
  headers={['Token', 'Use']}
  rows={[['xs', '4pt'], ['sm', '8pt']]}
  columnWidths={['30%', '70%']}
/>
```

| Prop | Type | Required | Default |
|---|---|---|---|
| `headers` | `string[]` | yes | — |
| `rows` | `string[][]` | yes | — |
| `columnWidths` | `string[]` | no | even split |
| `wrap` | `boolean` | no | `false` |

### `ChecklistItem`, `ChecklistCategory`

Both live in [`src/components/ChecklistItem.tsx`](../../src/components/ChecklistItem.tsx) — the premium-checklist primitives shared by the Ch10 checklist pages. `ChecklistItem` is a `wrap={false}` row: a green `CheckIcon` (`iconSize.sm`, `colors.success`) beside body text. `ChecklistCategory` is the semibold sub-heading above a run of items.

```tsx
<ChecklistCategory>Typography</ChecklistCategory>
<ChecklistItem>Real fonts registered, no Helvetica fallback.</ChecklistItem>
```

| Prop | Type | Required |
|---|---|---|
| `children` | `ReactNode` | yes (the only prop, on both components) |

### `IconList`

[`src/components/IconList.tsx`](../../src/components/IconList.tsx) — vertical list of icon + `bodySmall` text rows. Pass an icon *component* (not an element); each row is `wrap={false}` so an icon can't get stranded from its label. Used for the Ch09 "what AI can/can't spot" lists.

```tsx
<IconList items={['Spacing drift', 'Orphaned headings']} icon={CheckIcon} color={colors.success} />
```

| Prop | Type | Required | Default |
|---|---|---|---|
| `items` | `string[]` | yes | — |
| `icon` | `ComponentType<{size?: number; color?: string}>` | yes | — |
| `color` | `string` | yes | — |
| `size` | `number` | no | `iconSize.xs` |

## Recipe cards

### `RecipeCard`

[`src/components/RecipeCard.tsx`](../../src/components/RecipeCard.tsx) — bordered card with a title row (optional leading icon) and body content. Neutral-50 background, neutral-200 border, medium radius. `wrap={false}`. Used in Ch07 design challenges and Ch10 layout patterns.

```tsx
<RecipeCard title="Card title" icon={<CheckIcon size={iconSize.sm} color={colors.success} />}>
  <Text style={styles.body}>Card body.</Text>
</RecipeCard>
```

| Prop | Type | Required |
|---|---|---|
| `title` | `string` | yes |
| `icon` | `ReactNode` | no |
| `children` | `ReactNode` | yes |

## Markdown

### `MarkdownRenderer`

[`src/components/MarkdownRenderer.tsx`](../../src/components/MarkdownRenderer.tsx) — parses a markdown string via `src/utils/markdownParser.ts` and renders each node as the matching project component (`SectionHeading` for `##`, `BulletList` for lists, `CodeBlock` for fenced blocks, `TipBox`/`WarningBox`/`InfoBox` for callouts). Inline `**bold**` and `` `code` `` runs are supported inside headings, paragraphs, list items, and callout bodies. The two pages in `src/pages/14-markdown-automation/` split `content/chapters/12-markdown-demo.md` at its authored page-break marker and render one half each. See [markdown-content guide](../guides/markdown-content.md) for full syntax.

```tsx
import { readFileSync } from 'fs';
const source = readFileSync('content/chapters/12-markdown-demo.md', 'utf8');
const body = source.replace(/^---[\s\S]*?---/, '').trim();
const [partOne, partTwo] = body.split('\n<!-- page-break -->\n');
<MarkdownRenderer content={partOne.trim()} /> // second page uses partTwo
```

| Prop | Type | Required |
|---|---|---|
| `content` | `string` | yes |

## Decor

### `AccentBar`

[`src/components/AccentBar.tsx`](../../src/components/AccentBar.tsx) — horizontal gold bar used by hero/title elements. Sizes are tokens from `theme.accentBar` (`sm`/`md`/`lg`/`xl`, plus `heading` — the vertical h2-bar geometry, normally consumed via `styles.h2Accent` rather than `<AccentBar>`).

```tsx
<AccentBar size="lg" mb={spacing.lg} />
```

| Prop | Type | Required | Default |
|---|---|---|---|
| `size` | `keyof typeof accentBar` (`'sm' \| 'md' \| 'lg' \| 'xl' \| 'heading'`) | no | `'md'` |
| `mb` | `number` | no | `spacing.md` |
| `color` | `string` | no | `colors.accent[500]` |

### `CoverDecor`

[`src/components/CoverDecor.tsx`](../../src/components/CoverDecor.tsx) — concentric-circle / crosshair geometric mark used as a low-opacity background flourish on hero pages (Cover, Conclusion). All defaults come from theme tokens (`layout.decorMarkSize`, `opacity.decor`, etc.).

```tsx
<CoverDecor opacity={opacity.decorSubtle} />
```

| Prop | Type | Required | Default |
|---|---|---|---|
| `size` | `number` | no | `layout.decorMarkSize` (160) |
| `opacity` | `number` | no | `opacity.decor` (0.08) |
| `right` | `number` | no | `layout.decorMarkRight` (40) |
| `bottom` | `number` | no | `layout.decorMarkBottom` (60) |
| `color` | `string` | no | `colors.accent[500]` |

## Page chrome

### `Header`, `Footer`

[`src/components/Header.tsx`](../../src/components/Header.tsx) and [`Footer.tsx`](../../src/components/Footer.tsx). Used internally by `ContentPage` and rendered as `fixed` so they repeat on every page. The footer renders the dynamic `pageNumber / totalPages` via the `Text render={({pageNumber, totalPages}) => ...}` API. Not typically composed directly.

## Icons

[`src/components/Icons.tsx`](../../src/components/Icons.tsx) — SVG Lucide-style icons. Each is a thin wrapper around `Icon.tsx` (the react-icons → react-pdf adapter). Available exports: `CheckIcon`, `XIcon`, `AlertTriangleIcon`, `InfoIcon`, `ArrowRightIcon`, `BookIcon`, `CodeIcon`, `LayersIcon`, `PaletteIcon`, `ZapIcon`. Each accepts `size` (number, default `iconSize.lg` = 16) and `color` (string, default varies by icon — e.g. `CheckIcon` defaults to `colors.success`).

```tsx
<CheckIcon size={iconSize.sm} color={colors.success} />
```

Pass sizes through the `iconSize` token (`xs`/`sm`/`callout`/`md`/`lg`/`xl`) — see [theme tokens reference](theme-tokens.md#icon-sizes). Never use emoji in this project — Inter doesn't ship emoji glyphs and the PDF will fall back to system fonts inconsistently.

### `Icon`

[`src/components/Icon.tsx`](../../src/components/Icon.tsx) — the underlying react-icons adapter. Use directly for icons not pre-bound in `Icons.tsx`.

```tsx
import { LuFile } from 'react-icons/lu';
<Icon icon={LuFile} size={iconSize.md} color={colors.primary[600]} />
```

| Prop | Type | Required | Default |
|---|---|---|---|
| `icon` | `IconType` (from react-icons) | yes | |
| `size` | `number` | no | `iconSize.lg` (16) |
| `color` | `string` | no | `colors.neutral[900]` |
