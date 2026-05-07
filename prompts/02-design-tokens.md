# Prompt: Creating a Design Token System

Use this prompt to create a centralized design token system for a react-pdf project.

---

## Prompt

Create a `src/styles/theme.ts` file that exports all design tokens for the project. This is the single source of truth — no page or component should hardcode colors, fonts, spacing, or borders.

### Token Structure

```typescript
// src/styles/theme.ts

export const colors = {
  // Primary palette (3-5 shades: 900, 800, 700, 500, 50 minimum)
  primary: {
    900: '#0B1426',   // Darkest - code block backgrounds
    800: '#121F3D',   // Dark - chapter titles, table headers
    700: '#1A2D54',   // Medium-dark - h3 headings
    500: '#2E4A82',   // Standard - brand color
    50:  '#EDF1F8',   // Lightest - info box backgrounds
  },
  // Accent palette (warm contrast to primary)
  accent: {
    700: '#BE7B00',   // Dark accent - tip labels
    500: '#F0A000',   // Standard - accent bars, bullet dots
    400: '#F5B733',   // Light accent - code labels
    50:  '#FEF8E6',   // Lightest - tip box backgrounds
  },
  // Neutral palette (10 shades for text, borders, backgrounds)
  neutral: {
    900: '#1A1A2E',   // Default text
    800: '#2D2D44',   // Body text
    500: '#7A7A91',   // Secondary text
    300: '#B2B2C2',   // Subtitles
    200: '#D0D0DB',   // Borders
    100: '#E8E8EF',   // Subtle lines
    50:  '#F5F5F8',   // Alternating rows
  },
  // Semantic (one color per meaning)
  success: '#2D8B4E',
  successLight: '#F0F9F4',
  error: '#C43333',
  errorLight: '#FEF3F3',
  info: '#2E6BB5',
  warning: '#D98E00',
  white: '#FFFFFF',
  black: '#0B1426',
} as const;

export const fonts = {
  heading: 'Inter',      // fontWeight 700
  headingLight: 'Inter', // fontWeight 500
  body: 'Inter',         // fontWeight 400
  bodyBold: 'Inter',     // fontWeight 600
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
  code:    { fontSize: 9, fontFamily: fonts.mono, lineHeight: 1.5 },
  codeSmall: { fontSize: 8, fontFamily: fonts.mono, lineHeight: 1.4 },
} as const;

export const spacing = {
  xs: 4,    // Tight gaps
  sm: 8,    // Standard element spacing
  md: 12,   // Component padding
  lg: 16,   // Section spacing
  xl: 24,   // Major breaks
  xxl: 32,  // Large separation
  xxxl: 48, // Hero spacing
} as const;

export const page = {
  width: 612,
  height: 792,
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

### Rules
- `as const` on every export for type safety
- `fontWeight` is always `700 as const`, `600 as const`, or `400 as const` — never a plain number
- All font tokens point to the same family name (e.g., 'Inter') — weight selects the variant
- Spacing follows a 4pt grid
- Color palette limited to 3 groups: primary, accent, neutral, plus semantics
- Never add a color that doesn't have a clear purpose documented in comments
