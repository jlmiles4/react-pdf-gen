# Template: Design Token System

Paste this into your AI agent to create a centralized design token file. Replace the color values with your brand colors.

---

## Prompt

Create a `src/styles/theme.ts` file that exports all reusable design tokens for the project. Pages and components must use it for colors, fonts, spacing, and borders; unique structural geometry may use a named local constant.

### Structure

```typescript
// src/styles/theme.ts

export const colors = {
  // Primary palette — your main brand color (3-5 shades minimum)
  // Replace these with your brand colors
  primary: {
    900: '#0B1426',   // Darkest — code block backgrounds
    800: '#121F3D',   // Dark — section headers, table headers
    700: '#1A2D54',   // Medium-dark — sub-headings
    500: '#2E4A82',   // Standard — brand color
    50:  '#EDF1F8',   // Lightest — info backgrounds
  },
  // Accent palette — contrast color for emphasis
  accent: {
    700: '#BE7B00',   // Dark accent — callout labels
    500: '#F0A000',   // Standard — accent bars, highlights
    400: '#F5B733',   // Light accent — code labels
    50:  '#FEF8E6',   // Lightest — tip backgrounds
  },
  // Neutral palette — text, borders, backgrounds
  neutral: {
    900: '#1A1A2E',   // Default text color
    800: '#2D2D44',   // Body text
    500: '#7A7A91',   // Secondary text, page numbers
    400: '#9696AA',   // Muted glyphs, diagram arrows
    300: '#B2B2C2',   // Subtitles
    200: '#D0D0DB',   // Borders, dividers
    100: '#E8E8EF',   // Subtle lines
    50:  '#F5F5F8',   // Alternating row backgrounds
  },
  // Semantic — one color per meaning
  success: '#2D8B4E',
  successLight: '#F0F9F4',
  error: '#C43333',
  errorLight: '#FEF3F3',
  info: '#2E6BB5',
  infoLight: '#EDF1F8',
  warning: '#D98E00',
  warningLight: '#FEF8E6',
  white: '#FFFFFF',
  black: '#0B1426',
} as const;

export const fonts = {
  heading: 'YourFont',      // fontWeight 700
  body: 'YourFont',         // fontWeight 400
  bodyBold: 'YourFont',     // fontWeight 600
  mono: 'Courier',
  monoBold: 'Courier-Bold',
} as const;

export const typography = {
  display: { fontSize: 36, fontFamily: fonts.heading, fontWeight: 700 as const, lineHeight: 1.1 },
  h1:      { fontSize: 26, fontFamily: fonts.heading, fontWeight: 700 as const, lineHeight: 1.2 },
  h2:      { fontSize: 20, fontFamily: fonts.heading, fontWeight: 600 as const, lineHeight: 1.25 },
  h3:      { fontSize: 16, fontFamily: fonts.heading, fontWeight: 600 as const, lineHeight: 1.3 },
  h4:      { fontSize: 13, fontFamily: fonts.bodyBold, fontWeight: 600 as const, lineHeight: 1.35 },
  body:    { fontSize: 11, fontFamily: fonts.body, fontWeight: 400 as const, lineHeight: 1.6 },
  bodySmall: { fontSize: 9.5, fontFamily: fonts.body, fontWeight: 400 as const, lineHeight: 1.5 },
  caption: { fontSize: 8.5, fontFamily: fonts.body, fontWeight: 400 as const, lineHeight: 1.4 },
  code:    { fontSize: 9, fontFamily: fonts.mono, fontWeight: 400 as const, lineHeight: 1.5 },
  codeSmall: { fontSize: 8, fontFamily: fonts.mono, fontWeight: 400 as const, lineHeight: 1.4 },
} as const;

export const spacing = {
  xs: 4,    // Tight gaps, icon-to-label
  sm: 8,    // Standard element spacing
  md: 12,   // Component internal padding
  lg: 16,   // Section spacing
  xl: 24,   // Major section breaks
  xxl: 32,  // Large separation
  xxxl: 48, // Hero / cover spacing
} as const;

export const page = {
  width: 612,   // LETTER width in points
  height: 792,  // LETTER height in points
  margin: { top: 60, bottom: 60, left: 54, right: 54 },
  contentWidth: 612 - 54 - 54,  // 504pt
  contentHeight: 792 - 60 - 60, // 672pt
} as const;

export const borders = {
  thin: 0.5,
  medium: 1,
  thick: 2,
  radius: { sm: 3, md: 6, lg: 10 },
} as const;
```

### Customization Guide

**Colors:** Replace primary/accent with your brand. Keep the shade structure (900→50). You need at minimum: one dark shade for backgrounds, one medium for headings, one light for tinted backgrounds.

**Fonts:** Replace `'YourFont'` with your registered font family name. All tokens point to the same family — weight selects the variant.

**Typography:** Adjust sizes if needed, but keep the hierarchy (display > h1 > h2 > h3 > h4 > body > bodySmall > caption). The ratios matter more than absolute sizes.

**Spacing:** The 4pt grid (4, 8, 12, 16, 24, 32, 48) works for most documents. Adjust if your content density requires it.

**Page:** LETTER (612x792) for US audiences, A4 (595x842) for international. Margins of 50-60pt give professional whitespace.

## Step 2: Shared StyleSheet — `src/styles/shared.ts`

`theme.ts` holds raw values; `shared.ts` composes them into the named styles every
page and component imports. The prompts in `03-components.md`, `04-page-creation.md`,
and `06-common-patterns.md` all import from here, so create it before those steps.

```
Create src/styles/shared.ts. Import the tokens from ./theme and export a single
`styles` object built with StyleSheet.create() from @react-pdf/renderer.

Define exactly these keys, using only theme tokens — no literal colors, sizes, or
spacing anywhere in this file:

  page            page padding + default fontFamily/fontSize/color for a content page
  body            body paragraph: typography.body + neutral text color + marginBottom
  h3              minor heading: typography.h3 + heading color + margins

  h2Container     row wrapper for the accent-bar heading (flexDirection: 'row',
                  alignItems: 'center', gap, marginBottom)
  h2Accent        the vertical accent bar beside an h2 (small fixed width, taller
                  height, accent background, small borderRadius)
  h2Text          typography.h2 + heading color

  codeBlock       dark code container: darkest primary background, padding,
                  borderRadius, marginBottom
  codeText        typography.code + light-on-dark code color
  codeLabel       the small language label above a code block: caption size,
                  accent color, letterSpacing, uppercase

  tipBox          callout box: tinted accent background, left accent border,
                  padding, borderRadius, marginBottom
  tipLabel        callout label row text: typography.h4 + accent color

  listContent     flex: 1 text cell for a bullet row (body typography)

  tableContainer  rounded, clipped table wrapper with a thin neutral border
  tableHeader     navy header row: primary background, flexDirection 'row', padding
  tableHeaderText typography.h4-ish, white, semibold
  tableRow        white data row: flexDirection 'row', padding, thin bottom border
  tableRowAlt     same as tableRow with a light neutral background (zebra striping)
  tableCell       typography.bodySmall + neutral text color

Rules: every value comes from ./theme; no raw hex, no magic numbers. Export as
`export const styles = StyleSheet.create({ ... })`.
```

Keep `shared.ts` limited to styles that are genuinely reused. A style used by one
component belongs in that component's own local `StyleSheet.create()`.

## Step 3: TypeScript config — `tsconfig.json`

The dependency list above installs TypeScript, so the project needs a config at the
repo root. This one matches the `tsx`-based build (transpile-only at build time,
`tsc --noEmit` for checking):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noEmit": true
  },
  "include": ["src/**/*", "scripts/**/*"],
  "exclude": ["node_modules"]
}
```

Add a matching script so type errors are catchable — `tsx` transpiles without
type-checking, so nothing catches them otherwise:

```json
{ "typecheck": "tsc --noEmit" }
```

### Rules
- `as const` on every export for TypeScript type safety
- `fontWeight` is always a weight your `Font.register` call includes, written `as const` (`700 as const`, `600 as const`, `500 as const`, or `400 as const`) — never a plain number
- Core spacing follows a 4pt grid; named micro tokens may handle 1pt/2pt fine adjustments
- Never add a color without a documented purpose
- This file should be under 130 lines — if it's growing, you're over-engineering
