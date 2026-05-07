# Design system

Two files own the visual language: `src/styles/theme.ts` (tokens) and `src/styles/shared.ts` (styles built from those tokens). Pages import from both; pages should never define raw hex values, font sizes, or padding numbers.

For the full token tables see [theme-tokens reference](../reference/theme-tokens.md).

## Tokens (`src/styles/theme.ts`)

Six exports, all `as const`:

| Export | Shape | Examples |
|---|---|---|
| `colors` | `{ primary: {50..900}, accent: {50..900}, neutral: {50..900}, success, error, info, warning, ...Light, white, black }` | `colors.primary[800]`, `colors.accent[500]` |
| `fonts` | `{ heading, headingLight, body, bodyBold, mono, monoBold }` | All Inter except `mono`/`monoBold` (Courier) |
| `typography` | `{ display, h1, h2, h3, h4, body, bodySmall, caption, code, codeSmall }` | Each is `{ fontSize, fontFamily, fontWeight, lineHeight }` |
| `spacing` | `{ micro: 1, xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 }` | 4pt grid (with sub-grid micros for fine-tuning) |
| `page` | `{ width: 612, height: 792, margin, coverMargin, headerHeight, footerHeight, topBarHeight, chapterPaddingExtra, contentWidth: 504, contentHeight: 672 }` | LETTER, in points |
| `borders` | `{ thin: 0.5, medium: 1, thick: 2, radius: { xs, sm, md, lg } }` | |
| `syntax` | `{ keyword, string, comment, tag, number, punctuation, default }` | Tuned for `primary[900]` background |
| `fontScale` | `{ coverTitle, pageTitle, sectionTitle, subtitle, contentTitle, label, bodyMedium, labelSmall, navSmall, micro }` | Sizes for header/footer/chapter chrome that don't fit the body typography scale |

## Shared styles (`src/styles/shared.ts`)

`styles` is a `StyleSheet.create({...})` with named entries grouped by purpose:

- **Page layout:** `page`, `pageNoPadding`
- **Typography:** `display`, `h1`, `h2`, `h2Container`, `h2Accent`, `h2Text`, `h3`, `h4`, `body`, `bodySmall`, `caption`, `bold`, `italic`
- **Layout helpers:** `row`, `col`, `center`, `spaceBetween`, `flex1`, `flexWrap`
- **Code:** `codeBlock`, `codeText`, `codeLabel`, `inlineCode`
- **Callouts:** `tipBox`, `tipLabel`, `warningBox`, `warningLabel`, `infoBox`, `infoLabel`
- **Lists:** `listItem`, `listBullet`, `listContent`
- **Dividers:** `divider`, `dividerAccent`
- **Tables:** `tableContainer`, `tableHeader`, `tableHeaderText`, `tableRow`, `tableRowAlt`, `tableCell`

Use these directly: `<Text style={styles.body}>`. For one-off styles in a page, create a local `StyleSheet.create({...})` that *references* tokens — never inline literal numbers or hex codes.

## Font registration (`src/fonts.ts`)

Inter is registered with seven `(weight, style)` variants pointing at `.ttf` files in `fonts/`:

| Weight | Style | File |
|---|---|---|
| 400 | normal | `Inter-Regular.ttf` |
| 400 | italic | `Inter-Italic.ttf` |
| 500 | normal | `Inter-Medium.ttf` |
| 600 | normal | `Inter-SemiBold.ttf` |
| 600 | italic | `Inter-SemiBoldItalic.ttf` |
| 700 | normal | `Inter-Bold.ttf` |
| 700 | italic | `Inter-BoldItalic.ttf` |

Hyphenation is disabled globally with `Font.registerHyphenationCallback((word) => [word])`.

`@react-pdf/renderer` resolves font weights by exact match. If you set `fontFamily: 'Inter'` and `fontWeight: 500` somewhere, weight 500 must be registered or you'll silently get a fallback. Stick to the four weights present (400/500/600/700) unless you also add a `Font.register` entry.

## Conventions

- **Pair `fontFamily` with `fontWeight`.** Inter is one family; weight alone selects the variant. `fonts.bodyBold` is `'Inter'` (same string as `fonts.body`) — the bold-ness comes from `fontWeight: 600` paired with it.
- **Never use Helvetica.** That's the react-pdf default if no font is set; check by looking at PNG output for telltale Helvetica letterforms.
- **Color usage carries meaning** — `primary` for structure (headings, dark backgrounds), `accent` for emphasis (bars, bullets, callouts), `neutral` for body and chrome, `success/error/info/warning` only for status.
- **Spacing is on a 4pt grid.** When a token doesn't fit, prefer composing two (`spacing.xxs + spacing.micro`) over inventing a new value.
