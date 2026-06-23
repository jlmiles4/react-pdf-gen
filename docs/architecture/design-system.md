# Design system

Two files own the visual language: `src/styles/theme.ts` (tokens) and `src/styles/shared.ts` (styles built from those tokens). Pages import from both; pages should never define raw hex values, font sizes, or padding numbers.

This page describes the **shape** of the token system and the conventions for using it. For concrete values (every hex code, every spacing number), see [theme-tokens reference](../reference/theme-tokens.md).

## Token exports (`src/styles/theme.ts`)

Every export is `as const`. `typography` composes from `fontWeight` and `lineHeight`, so the rest of the codebase only needs to import the leaf tokens it actually styles with.

| Export | Shape | Examples |
|---|---|---|
| `colors` | `{ primary: {50..900}, accent: {50..900}, neutral: {50..900}, success, error, info, warning, ...Light, white, black }` | `colors.primary[800]`, `colors.accent[500]` |
| `fonts` | `{ heading, body, bodyBold, mono, monoBold }` | All Inter except `mono`/`monoBold` (Courier) |
| `fontWeight` | `{ regular: 400, semibold: 600, bold: 700 }` | Matches `Font.register` weights |
| `lineHeight` | `{ tight: 1.2, snug: 1.4, normal: 1.5, relaxed: 1.6 }` | For local styles that don't pull a typography preset |
| `typography` | `{ display, h1, h2, h3, h4, body, bodySmall, caption, code, codeSmall }` | Each is `{ fontSize, fontFamily, fontWeight, lineHeight }` |
| `fontScale` | `{ coverTitle, pageTitle, sectionTitle, subtitle, contentTitle, label, bodyMedium, labelSmall, navSmall, micro }` | Header/footer/chapter chrome sizes outside the body scale |
| `letterSpacing` | `{ tight, normal, wide, wider }` | Uppercase/tracked-out text (chapter label, cover author) |
| `spacing` | `{ micro: 1, xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 }` | 4pt grid (with sub-grid micros for fine-tuning) |
| `page` | `{ width: 612, height: 792, margin, coverMargin, headerHeight, footerHeight, topBarHeight, chapterPaddingExtra, contentWidth: 504, contentHeight: 672 }` | LETTER, in points |
| `borders` | `{ thin: 0.5, medium: 1, thick: 2, radius: { xs, sm, md, lg } }` | |
| `iconSize` | `{ xs, sm, callout, md, lg, xl }` | `<CheckIcon size={iconSize.sm} />` |
| `opacity` | `{ decor, decorSubtle, muted }` | Background flourishes, dim accents |
| `accentBar` | `{ sm, md, lg, xl, heading } → { width, height }` | `<AccentBar size="lg" />` |
| `layout` | Catch-all for layout constants — bullet dot size, decor offsets, hero max widths, etc. | |
| `syntax` | `{ keyword, string, comment, tag, number, punctuation, default }` | Tuned for the `primary[900]` code-block background |

## Shared styles (`src/styles/shared.ts`)

`styles` is a `StyleSheet.create({...})` with named entries grouped by purpose:

- **Page layout:** `page`
- **Typography:** `h1`, `h2Container`, `h2Accent`, `h2Text`, `h3`, `h4`, `body`, `bodySmall`, `bold`, `italic`
- **Layout helpers:** `iconRow` (icon + label on one baseline)
- **Code:** `codeBlock`, `codeText`, `codeLabel`, `inlineCode`
- **Callouts:** `tipBox`, `tipLabel`, `warningBox`, `warningLabel`, `infoBox`, `infoLabel`
- **Lists:** `listContent`
- **Dividers:** `dividerAccent`
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

`@react-pdf/renderer` resolves font weights by exact match. If you set `fontFamily: 'Inter'` and `fontWeight: 500`, weight 500 must be registered or you'll silently get a fallback. Stick to the four registered weights (400/500/600/700) unless you also add a `Font.register` entry. The `fontWeight` token only exposes 400/600/700 — Inter-Medium (500) is registered but has no token yet, so if you ever need Medium, extend the token (e.g. add `medium: 500`) rather than hardcoding the literal.

## Conventions

- **Pair `fontFamily` with `fontWeight`.** Inter is one family; weight alone selects the variant. `fonts.bodyBold` is `'Inter'` (same string as `fonts.body`) — boldness comes from `fontWeight: fontWeight.semibold` paired with it.
- **Use `fontWeight` tokens, never inline literals.** Write `fontWeight: fontWeight.bold`, not `fontWeight: 700 as const`. The token set is the contract with `Font.register` in `src/fonts.ts` — adding an unregistered weight silently falls back to Helvetica.
- **Never use Helvetica.** That's the react-pdf default if no font is set; check by looking at PNG output for telltale Helvetica letterforms.
- **Color usage carries meaning** — `primary` for structure (headings, dark backgrounds), `accent` for emphasis (bars, bullets, callouts), `neutral` for body and chrome, `success/error/info/warning` only for status.
- **Spacing is on a 4pt grid.** When a token doesn't fit, prefer composing two (`spacing.xxs + spacing.micro`) over inventing a new value.
- **Icon sizes go through `iconSize`.** `<CheckIcon size={iconSize.sm} />`, not `size={12}`. The presets are tuned for the 6 contexts icons appear in (inline body, callout label, showcase, etc.).
- **No raw numbers in style objects.** If a value isn't a token, it's either composing tokens (`spacing.lg + spacing.xs`) or a structural anchor (`top: 0`, `flex: 1`). Hex codes, font sizes, and padding numbers belong in `theme.ts`.
