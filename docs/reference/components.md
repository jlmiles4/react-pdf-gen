# Components

Every component lives in `src/components/` and is re-exported from `src/components/index.ts`. Props listed below come from the actual TypeScript interfaces in source.

## Page wrappers

### `ContentPage`

[`src/components/ContentPage.tsx`](../../src/components/ContentPage.tsx) — standard LETTER page with shared page styles, fixed `<Header>` and fixed `<Footer>`. `wrap` is enabled.

```tsx
<ContentPage sectionTitle="Introduction">
  ...children...
</ContentPage>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `children` | `ReactNode` | yes | |
| `sectionTitle` | `string` | no | Right-aligned text in the page header |

### `ChapterTitle`

[`src/components/ChapterTitle.tsx`](../../src/components/ChapterTitle.tsx) — full-bleed dark-navy `<Page>` (no header/footer) with a gold accent bar, "CHAPTER NN" label, large white title, optional subtitle, and decorative SVG circles in the corner.

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
| `children` | `string` | yes |

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

[`src/components/BulletList.tsx`](../../src/components/BulletList.tsx) — vertical list with gold SVG circle bullets. Each item is `wrap={false}` individually.

```tsx
<BulletList items={['First', 'Second', 'Third']} />
```

| Prop | Type | Required |
|---|---|---|
| `items` | `string[]` | yes |

### `Table`

[`src/components/Table.tsx`](../../src/components/Table.tsx) — navy header row, alternating row backgrounds, rounded container. The header row and every body row have `wrap={false}`. If `columnWidths` is omitted, columns split evenly.

```tsx
<Table
  headers={['Token', 'Use']}
  rows={[['xs', '4pt'], ['sm', '8pt']]}
  columnWidths={['30%', '70%']}
/>
```

| Prop | Type | Required |
|---|---|---|
| `headers` | `string[]` | yes |
| `rows` | `string[][]` | yes |
| `columnWidths` | `string[]` | no |

## Page chrome

### `Header`, `Footer`

[`src/components/Header.tsx`](../../src/components/Header.tsx) and [`Footer.tsx`](../../src/components/Footer.tsx). Used internally by `ContentPage` and rendered as `fixed` so they repeat on every page. Not typically composed directly.

## Icons

[`src/components/Icons.tsx`](../../src/components/Icons.tsx) — SVG Lucide-style icons. Available exports: `CheckIcon`, `XIcon`, `AlertTriangleIcon`, `InfoIcon`, `ArrowRightIcon`, `BookIcon`, `CodeIcon`, `LayersIcon`, `PaletteIcon`, `ZapIcon`. Each accepts `size` (number, default varies) and `color` (string).

```tsx
<CheckIcon size={12} color={colors.success} />
```

Never use emoji in this project — Inter doesn't ship emoji glyphs and the PDF will fall back to system fonts inconsistently.
