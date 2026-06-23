# Theme tokens

The concrete values for every token in [`src/styles/theme.ts`](../../src/styles/theme.ts). For the conceptual layer — what each export is for, how they compose, and conventions for using them — see [design-system](../architecture/design-system.md). Sizes are in PDF points (1pt = 1/72 inch).

## Colors

### `colors.primary` — deep navy

| Token | Hex | Common use |
|---|---|---|
| `900` | `#0B1426` | Code block background |
| `800` | `#121F3D` | Chapter title page, table header, `SectionBanner` |
| `700` | `#1A2D54` | h3, accent contexts |
| `600` | `#243B6B` | |
| `500` | `#2E4A82` | Primary brand |
| `400` | `#4A6BA5` | |
| `300` | `#6E8DC4` | Chapter subtitle, JSX tag syntax |
| `200` | `#9BB3DB` | Code punctuation |
| `100` | `#C8D6ED` | |
| `50` | `#EDF1F8` | `InfoBox` background |

### `colors.accent` — warm gold/amber

| Token | Hex | Common use |
|---|---|---|
| `900` | `#7A4F00` | |
| `800` | `#9C6500` | |
| `700` | `#BE7B00` | `TipBox` label text |
| `600` | `#D98E00` | `warning` semantic |
| `500` | `#F0A000` | Accent bars, bullet dots, `TipBox` border |
| `400` | `#F5B733` | Cover title accent, code labels, syntax keywords |
| `300` | `#F8CB66` | Number literals |
| `200` | `#FBDF99` | |
| `100` | `#FDF0CC` | |
| `50` | `#FEF8E6` | `TipBox` background |

### `colors.neutral` — slate grays

| Token | Hex | Common use |
|---|---|---|
| `900` | `#1A1A2E` | Page default text |
| `800` | `#2D2D44` | Body text |
| `700` | `#45455E` | h4 |
| `600` | `#5E5E77` | `bodySmall` |
| `500` | `#7A7A91` | Page numbers, header text, code comments |
| `400` | `#9696AA` | |
| `300` | `#B2B2C2` | Chapter subtitles |
| `200` | `#D0D0DB` | Borders, dividers, default code text |
| `100` | `#E8E8EF` | Table row borders |
| `50` | `#F5F5F8` | Alternating table rows |

### Semantic

| Name | Hex |
|---|---|
| `success` | `#2D8B4E` |
| `successLight` | `#F0F9F4` |
| `warning` | `#D98E00` |
| `warningLight` | `#FEF8E6` |
| `error` | `#C43333` |
| `errorLight` | `#FEF3F3` |
| `info` | `#2E6BB5` |
| `infoLight` | `#EDF1F8` |
| `white` | `#FFFFFF` |
| `black` | `#0B1426` |

## Typography

`typography.*` entries are full style objects — `{ fontSize, fontFamily, fontWeight, lineHeight }`. They reference the `fontWeight` and `lineHeight` tokens below.

| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `display` | 36 | `bold` (700) | 1.1 | Cover title |
| `h1` | 26 | `bold` (700) | `tight` (1.2) | Page-level (rare) |
| `h2` | 20 | `semibold` (600) | 1.25 | Section headings |
| `h3` | 16 | `semibold` (600) | 1.3 | Sub-section |
| `h4` | 13 | `semibold` (600) | 1.35 | Labels, callout titles |
| `body` | 11 | `regular` (400) | `relaxed` (1.6) | Reading text |
| `bodySmall` | 9.5 | `regular` (400) | `normal` (1.5) | Tables, secondary |
| `caption` | 8.5 | `regular` (400) | `snug` (1.4) | Footer, fine print |
| `code` | 9 | `regular` (400) | `normal` (1.5) | Code blocks (Courier) |
| `codeSmall` | 8 | `regular` (400) | `snug` (1.4) | Inline code labels |

`fontScale.*` holds the chrome sizes that don't fit the body scale: `coverTitle: 42`, `pageTitle: 32`, `sectionTitle: 18`, `subtitle: 15`, `contentTitle: 14`, `label: 12`, `bodyMedium: 10.5`, `labelSmall: 10`, `navSmall: 7.5`, `micro: 7`.

`fonts.*` values: `heading`, `body`, `bodyBold` are all the string `'Inter'`; `mono` is `'Courier'`, `monoBold` is `'Courier-Bold'`. The bold/heading distinction comes from `fontWeight`, not the family name.

### `fontWeight`

A curated subset of the weights registered in `src/fonts.ts` (which also registers 500/Medium, currently unexposed as a token). Use these instead of inline literals (`fontWeight: 700 as const`) so usage stays in sync with the registered set.

| Token | Value | Use |
|---|---|---|
| `regular` | 400 | Body, captions, default |
| `semibold` | 600 | h2–h4, labels, emphasized inline |
| `bold` | 700 | display, h1, cover/chapter titles |

### `lineHeight`

Multipliers for text outside the typography presets (e.g. local `StyleSheet` entries that compose their own `fontSize`).

| Token | Value | Use |
|---|---|---|
| `tight` | 1.2 | Display/h1 — multi-line titles where stacking matters |
| `snug` | 1.4 | Captions, codeSmall, dense tabular text |
| `normal` | 1.5 | bodySmall, code, table cells |
| `relaxed` | 1.6 | body — primary reading text |

## Spacing

4pt grid, with sub-grid micros for fine adjustment.

| Token | Value |
|---|---|
| `micro` | 1 |
| `xxs` | 2 |
| `xs` | 4 |
| `sm` | 8 |
| `md` | 12 |
| `lg` | 16 |
| `xl` | 24 |
| `xxl` | 32 |
| `xxxl` | 48 |

## Page geometry

LETTER, in points.

| Field | Value |
|---|---|
| `width` | 612 |
| `height` | 792 |
| `margin.top` | 60 |
| `margin.bottom` | 60 |
| `margin.left` | 54 |
| `margin.right` | 54 |
| `coverMargin.horizontal` | 72 |
| `coverMargin.bottom` | 36 |
| `headerHeight` | 40 |
| `footerHeight` | 36 |
| `topBarHeight` | 6 |
| `chapterPaddingExtra` | 20 |
| `contentWidth` | 504 (612 − 54 − 54) |
| `contentHeight` | 672 (792 − 60 − 60) |

## Borders

| Field | Value |
|---|---|
| `thin` | 0.5 |
| `medium` | 1 |
| `thick` | 2 |
| `radius.xs` | 1.5 |
| `radius.sm` | 3 |
| `radius.md` | 6 |
| `radius.lg` | 10 |

## Icon sizes

For SVG icons rendered through `src/components/Icon.tsx` (the react-icons → react-pdf adapter). Pass via the `size` prop: `<CheckIcon size={iconSize.sm} />`.

| Token | Value | Use |
|---|---|---|
| `xs` | 10 | Dense inline checklists (e.g. Ch09 PNG-analysis flags) |
| `sm` | 12 | Standard inline check/x in body text |
| `callout` | 13 | `TipBox`, `WarningBox`, `InfoBox` label icons |
| `md` | 14 | Recommended adapter size |
| `lg` | 16 | `Icon`/named-icon default |
| `xl` | 24 | Showcase / hero icons |

## Opacity

Layered decor and de-emphasized accents.

| Token | Value | Use |
|---|---|---|
| `decor` | 0.08 | Background SVG flourishes — `CoverDecor`, `ChapterTitle` rings |
| `decorSubtle` | 0.06 | One step dimmer for already-busy dark pages (Conclusion) |
| `muted` | 0.4 | De-emphasized accent (e.g. divider in Conclusion) |

## Letter spacing

Tracking values for uppercase / tracked-out text.

| Token | Value | Use |
|---|---|---|
| `tight` | 1 | Header section title (uppercase) |
| `normal` | 1.2 | TOC group labels |
| `wide` | 1.5 | Cover author name |
| `wider` | 2.5 | Chapter label ("CHAPTER 03") |

## Accent bar

`accentBar.<size>` returns `{ width, height }` for the gold horizontal bar used by hero blocks. Consumed by `<AccentBar size="md" />`.

| Size | Width | Height | Use |
|---|---|---|---|
| `sm` | 32 | 3 | `SectionBanner` |
| `md` | 48 | 3 | TOC heading, Conclusion divider |
| `lg` | 60 | 4 | `ChapterTitle` |
| `xl` | 64 | 4 | Cover, Conclusion hero |
| `heading` | 4 | 22 | Vertical gold bar beside `SectionHeading` h2 |

## Layout

Catch-all for layout constants that don't fit any other token bucket.

| Field | Value | Use |
|---|---|---|
| `maxTextWidth` | 420 | Body-text max width (Conclusion CTA, ChapterTitle subtitle) |
| `maxHeroWidth` | 460 | Cover/ChapterTitle title block max width |
| `bulletWrapperWidth` | 14 | `BulletList` dot column width |
| `bulletDotSize` | 6 | `BulletList` SVG circle width/height |
| `tocEntryNumWidth` | 28 | TOC chapter-number column |
| `tocPageColWidth` | 28 | TOC page-number column (right-aligned) |
| `cardShadowOffset` | 2 | Faux-shadow border offset (recipe) |
| `flowStepWidth` | 100 | Ch11 troubleshooting flow-diagram step width |
| `dividerHeight` | 2 | Conclusion accent divider |
| `decorMarkSize` | 160 | `CoverDecor` concentric-mark size |
| `decorRingsSize` | 240 | `ChapterTitle` decorative-rings size |
| `decorMarkRight` | 40 | `CoverDecor` default right offset |
| `decorMarkBottom` | 60 | `CoverDecor` default bottom offset |

## Syntax highlighting

`syntax.*` colors are tuned for the `primary[900]` (`#0B1426`) code-block background:

| Token | Hex | Use |
|---|---|---|
| `keyword` | `#F5B733` | Reserved words |
| `string` | `#7EC89F` | String literals |
| `comment` | `#7A7A91` | Comments |
| `tag` | `#6E8DC4` | JSX/HTML tags |
| `number` | `#F8CB66` | Number literals |
| `punctuation` | `#9BB3DB` | Brackets, operators |
| `default` | `#D0D0DB` | Base code text |
