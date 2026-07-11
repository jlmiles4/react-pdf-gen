# Design system

Two files own the visual language: `src/styles/theme.ts` (tokens) and `src/styles/shared.ts` (styles built from those tokens). Pages import from both; pages should never define raw hex values, font sizes, or padding numbers.

This page describes the **shape** of the token system and the conventions for using it. For concrete values (every hex code, every spacing number), see [theme-tokens reference](../reference/theme-tokens.md).

## Token exports (`src/styles/theme.ts`)

Every export is `as const`. `typography` composes from `fontWeight` and `lineHeight`, so the rest of the codebase only needs to import the leaf tokens it actually styles with.

| Export | Shape | Examples |
|---|---|---|
| `colors` | `{ primary: {50..900}, accent: {50..900}, neutral: {50..900}, success, error, info, warning, ...Light, white }` | `colors.primary[800]`, `colors.accent[500]` |
| `fonts` | `{ heading, body, bodyBold, mono, monoBold }` | All Inter except `mono`/`monoBold` (Courier) |
| `fontWeight` | `{ regular: 400, semibold: 600, bold: 700 }` | Matches `Font.register` weights |
| `lineHeight` | `{ tight: 1.2, snug: 1.4, normal: 1.5, relaxed: 1.6 }` | For local styles that don't pull a typography preset |
| `typography` | `{ display, h1, h2, h3, h4, body, bodySmall, caption, code, codeSmall }` | Each is `{ fontSize, fontFamily, fontWeight, lineHeight }` |
| `fontScale` | `{ coverTitle, pageTitle, sectionTitle, subtitle, contentTitle, label, bodyMedium, labelSmall, navSmall, micro }` | Header/footer/chapter chrome sizes outside the body scale |
| `letterSpacing` | `{ tight, normal, wide, wider }` | Uppercase/tracked-out text (chapter label, cover author) |
| `spacing` | `{ none: 0, micro: 1, xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 }` | 4pt grid (with zero/sub-grid values for overrides) |
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

`@react-pdf/renderer` uses an exact registered font weight when available and otherwise selects the nearest weight in the same family. Stick to the four registered Inter weights (400/500/600/700) so the result is deliberate. The `fontWeight` token only exposes 400/600/700 — Inter-Medium (500) is registered but has no token yet, so if you need Medium, extend the token (for example, add `medium: 500`) rather than hardcoding the literal. An unknown family or unreadable font path fails the build; Helvetica is the default only when `fontFamily` is omitted.

## Conventions

- **Pair `fontFamily` with `fontWeight`.** Inter is one family; weight alone selects the variant. `fonts.bodyBold` is `'Inter'` (same string as `fonts.body`) — boldness comes from `fontWeight: fontWeight.semibold` paired with it.
- **Use `fontWeight` tokens, never inline literals.** Write `fontWeight: fontWeight.bold`, not `fontWeight: 700 as const`. The token set keeps requests aligned with `Font.register`; an unavailable weight resolves to the nearest registered weight and may change the intended hierarchy.
- **Never use Helvetica.** That's the react-pdf default if no font is set; check by looking at PNG output for telltale Helvetica letterforms.
- **Color usage carries meaning** — `primary` for structure (headings, dark backgrounds), `accent` for emphasis (bars, bullets, callouts), `neutral` for body and chrome, `success/error/info/warning` only for status.
- **Core spacing is on a 4pt grid.** `micro` (1pt) and `xxs` (2pt) are intentional fine-adjustment exceptions; prefer composing named tokens (`spacing.xxs + spacing.micro`) over inventing a new value.
- **Icon sizes go through `iconSize`.** `<CheckIcon size={iconSize.sm} />`, not `size={12}`. The presets are tuned for the 6 contexts icons appear in (inline body, callout label, showcase, etc.).
- **No scattered design literals.** Reusable values belong in `theme.ts`; token composition (`spacing.lg + spacing.xs`) and structural anchors (`top: 0`, `flex: 1`) remain local. A unique dimension may use a named local constant, but hex codes, font sizes, and reusable padding values stay tokenized.
