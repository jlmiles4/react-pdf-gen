# Chapter 4: Specifying a Design Language

You can have the cleanest project architecture in the world, and your AI-generated pages will still look like they were made by five different people – unless you give the AI explicit visual rules to follow. That's what a design language does.

## What a Design Language Is (In This Context)

For our purposes, a design language is a single TypeScript file – `theme.ts` – that defines every visual value your document uses:

- Colors (primary, accent, neutrals, semantic)
- Typography (font families, sizes, weights, line heights)
- Spacing (margins, padding, gaps)
- Border treatments (widths, radii, colors)
- Opacity values

When an AI generates a page component, it imports this file and pulls values from it. It never invents a color. It never guesses a font size. Every visual decision is already made.

## Why AI Needs Explicit Tokens

Without a token system, here's what happens across three AI-generated pages:

| Property | Page 1 | Page 2 | Page 3 |
|----------|--------|--------|--------|
| Heading color | `#1a2b4a` | `#1B2B4A` | `#1e3a5f` |
| Body font size | `11` | `12` | `11.5` |
| Section spacing | `24` | `20` | `32` |
| Accent color | `#d4a843` | `#c9982d` | `#e0b045` |

The AI is trying to maintain consistency, but it's reconstructing values from memory each time. Even small variations – `#1a2b4a` vs `#1e3a5f` – are visible when pages sit next to each other.

With a token system:

| Property | Every Page |
|----------|-----------|
| Heading color | `theme.colors.primary` |
| Body font size | `theme.typography.body.fontSize` |
| Section spacing | `theme.spacing[6]` |
| Accent color | `theme.colors.accent` |

The values resolve to the same numbers every time because they're imported from a single source of truth.

## Building the Theme File

Here's a complete `theme.ts` that covers a professional document. I'll explain each section.

```tsx
// src/styles/theme.ts

export const theme = {
  // ─── Colors ─────────────────────────────────────────────
  colors: {
    primary: "#1a2b4a",      // Dark navy – headings, emphasis
    secondary: "#2d4a7a",    // Medium blue – subheadings, borders
    accent: "#d4a843",       // Gold – highlights, dividers, callouts

    white: "#ffffff",
    black: "#111111",

    // Neutral scale – gray ramp for text, backgrounds, borders
    neutral: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },

    // Semantic colors – for callouts, status indicators, data viz
    success: "#16a34a",
    warning: "#d97706",
    error: "#dc2626",
    info: "#2563eb",
  },

  // ─── Typography ─────────────────────────────────────────
  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
  },

  typography: {
    h1: { fontSize: 28, fontWeight: 700 as const, lineHeight: 1.2 },
    h2: { fontSize: 22, fontWeight: 600 as const, lineHeight: 1.3 },
    h3: { fontSize: 18, fontWeight: 600 as const, lineHeight: 1.3 },
    h4: { fontSize: 14, fontWeight: 600 as const, lineHeight: 1.4 },
    body: { fontSize: 11, fontWeight: 400 as const, lineHeight: 1.6 },
    bodySmall: { fontSize: 10, fontWeight: 400 as const, lineHeight: 1.5 },
    caption: { fontSize: 9, fontWeight: 400 as const, lineHeight: 1.4 },
    label: { fontSize: 9, fontWeight: 600 as const, lineHeight: 1.2, letterSpacing: 1.5, textTransform: "uppercase" as const },
    code: { fontSize: 9, fontWeight: 400 as const, lineHeight: 1.5 },
  },

  // ─── Spacing ────────────────────────────────────────────
  // 4pt base grid
  spacing: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    18: 72,   // 1 inch – standard page margin
    24: 96,
  },

  // ─── Borders ────────────────────────────────────────────
  borderRadius: {
    sm: 2,
    md: 4,
    lg: 8,
  },
  borderWidth: {
    thin: 0.5,
    normal: 1,
    thick: 2,
  },

  // ─── Opacity ────────────────────────────────────────────
  opacity: {
    subtle: 0.1,
    light: 0.3,
    medium: 0.5,
    heavy: 0.7,
  },

  // ─── Page ───────────────────────────────────────────────
  page: {
    size: "LETTER" as const,
    margin: {
      top: 72,
      right: 72,
      bottom: 72,
      left: 72,
    },
  },
} as const;

export type Theme = typeof theme;
```

### Color palette breakdown

The palette has three layers:

1. **Brand colors** – `primary`, `secondary`, `accent`. These define the document's identity. Every document needs at most 3 brand colors.

2. **Neutral scale** – A 10-step gray ramp from near-white (`50`) to near-black (`900`). This handles:
   - `neutral[50]`–`neutral[100]` – subtle backgrounds, alternating table rows
   - `neutral[200]`–`neutral[300]` – borders, dividers
   - `neutral[400]`–`neutral[500]` – placeholder text, secondary labels
   - `neutral[600]`–`neutral[700]` – body text, data values
   - `neutral[800]`–`neutral[900]` – headings (when not using brand colors)

3. **Semantic colors** – `success`, `warning`, `error`, `info`. For callout boxes, status badges, and data visualization.

### Typography scale

The scale follows a clear hierarchy:

| Token | Size | Use case |
|-------|------|----------|
| `h1` | 28pt | Page titles, cover headings |
| `h2` | 22pt | Section headings |
| `h3` | 18pt | Subsection headings |
| `h4` | 14pt | Card titles, table headers |
| `body` | 11pt | Body text, paragraphs |
| `bodySmall` | 10pt | Secondary body text, dense content |
| `caption` | 9pt | Footnotes, page numbers, timestamps |
| `label` | 9pt | Uppercase labels, category tags |
| `code` | 9pt | Code blocks, monospace content |

The jump between each level is large enough to create visual hierarchy. If your heading sizes are 14, 13, and 12, they all look the same on the page.

Why 11pt for body text? At standard reading distance, 10–12pt is comfortable. 11pt is the sweet spot for professional documents – readable without being large. 10pt works for dense data tables. Anything below 9pt is hard to read in print.

### Spacing scale

The spacing scale uses a 4pt base grid. Every spacing value is a multiple of 4:

```
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 96
```

Why 4pt? It's small enough for fine control but large enough that adjacent values (4 vs 8, 12 vs 16) produce visible differences. And 72 – a common page margin – divides evenly into the grid.

Usage guidelines:
- `spacing[1]` (4pt) – tight gaps between related items (icon + label)
- `spacing[2]` (8pt) – standard gap between elements in a group
- `spacing[3]` (12pt) – space between small sections
- `spacing[4]` (16pt) – space between cards, padding inside containers
- `spacing[6]` (24pt) – space between sections
- `spacing[8]` (32pt) – large gaps between major sections
- `spacing[18]` (72pt) – page margins (1 inch)

## Choosing a Color Scheme

You need to make three decisions:

1. **Primary color** – The dominant brand color. Used for headings, accent bars, emphasis.
2. **Accent color** – A contrasting color for highlights, callouts, dividers. Should be visually distinct from the primary.
3. **Neutral base** – Your gray ramp. Either warm (brownish grays) or cool (bluish grays).

### Starting from a brand

If you have brand colors, use them. Pull the primary from the logo or brand guide. Pick the accent from the secondary palette.

### Starting from scratch

Go to [coolors.co](https://coolors.co) and generate palettes, or pick from these tested combinations:

**Professional Navy + Gold:**
```tsx
primary: "#1a2b4a"    // Dark navy
secondary: "#2d4a7a"  // Medium blue
accent: "#d4a843"     // Warm gold
```
Works for: financial reports, executive presentations, legal documents.

**Modern Teal + White:**
```tsx
primary: "#0f766e"    // Deep teal
secondary: "#14b8a6"  // Bright teal
accent: "#f59e0b"     // Amber
```
Works for: tech company reports, product documentation, marketing materials.

**Corporate Charcoal + Blue:**
```tsx
primary: "#1e293b"    // Charcoal
secondary: "#3b82f6"  // Bright blue
accent: "#10b981"     // Emerald
```
Works for: SaaS reports, analytics dashboards, developer documentation.

**Minimal Black + Red:**
```tsx
primary: "#18181b"    // Near black
secondary: "#52525b"  // Gray
accent: "#dc2626"     // Red
```
Works for: editorial content, bold statements, minimalist branding.

**Warm Earth Tones:**
```tsx
primary: "#44403c"    // Stone dark
secondary: "#78716c"  // Stone medium
accent: "#b45309"     // Amber dark
```
Works for: nonprofit reports, sustainability documents, lifestyle branding.

The key constraint: your primary and accent should have enough contrast to be distinguishable side by side. A navy primary with a slightly different navy accent will look muddy.

## Font Selection

Two rules:

1. **Maximum two font families.** One for headings, one for body. Using more than two creates visual noise.
2. **Register only the weights you use.** Each font file adds to build time and file size. Four weights per family is usually sufficient: Regular (400), Medium (500), SemiBold (600), Bold (700).

### Recommended combinations

**Inter (heading) + Inter (body):**
One family handles everything. Inter has excellent readability at small sizes and clear weight differentiation. This is the safe default.

**Montserrat (heading) + Source Sans 3 (body):**
Montserrat's geometric shapes add personality to headings while Source Sans keeps body text clean.

**Playfair Display (heading) + Lato (body):**
Playfair's serifs give headings an editorial feel. Lato keeps paragraphs legible.

**Roboto Slab (heading) + Roboto (body):**
The slab serif on headings adds weight and authority. Same family keeps them harmonious.

For most business documents, a single sans-serif family (Inter, Source Sans 3, Noto Sans) with 4 weights is all you need.

### Where to get fonts

Download TTF files from [Google Fonts](https://fonts.google.com). Every font there is open source and free for commercial use. Download the "static" TTF files, not the variable font files.

## Creating Shared Styles from Tokens

The theme file defines values. You also want a `shared.ts` file that maps those values to common style objects:

```tsx
// src/styles/shared.ts
import { StyleSheet } from "@react-pdf/renderer";
import { theme } from "./theme";

export const shared = StyleSheet.create({
  // Page base
  page: {
    fontFamily: theme.fonts.body,
    backgroundColor: theme.colors.white,
    paddingTop: theme.page.margin.top,
    paddingRight: theme.page.margin.right,
    paddingBottom: theme.page.margin.bottom,
    paddingLeft: theme.page.margin.left,
  },

  // Typography
  h1: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    fontFamily: theme.fonts.heading,
    lineHeight: theme.typography.h1.lineHeight,
    color: theme.colors.primary,
  },
  h2: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    fontFamily: theme.fonts.heading,
    lineHeight: theme.typography.h2.lineHeight,
    color: theme.colors.primary,
  },
  h3: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    fontFamily: theme.fonts.heading,
    lineHeight: theme.typography.h3.lineHeight,
    color: theme.colors.primary,
  },
  h4: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    fontFamily: theme.fonts.heading,
    lineHeight: theme.typography.h4.lineHeight,
    color: theme.colors.neutral[800],
  },
  body: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    lineHeight: theme.typography.body.lineHeight,
    color: theme.colors.neutral[700],
  },
  bodySmall: {
    fontSize: theme.typography.bodySmall.fontSize,
    fontWeight: theme.typography.bodySmall.fontWeight,
    lineHeight: theme.typography.bodySmall.lineHeight,
    color: theme.colors.neutral[600],
  },
  caption: {
    fontSize: theme.typography.caption.fontSize,
    lineHeight: theme.typography.caption.lineHeight,
    color: theme.colors.neutral[400],
  },
  label: {
    fontSize: theme.typography.label.fontSize,
    fontWeight: theme.typography.label.fontWeight,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: theme.colors.accent,
  },

  // Layout helpers
  row: {
    flexDirection: "row" as const,
  },
  rowBetween: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
  },
  rowCenter: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  center: {
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },

  // Dividers
  dividerHorizontal: {
    height: theme.borderWidth.thin,
    backgroundColor: theme.colors.neutral[200],
    marginVertical: theme.spacing[4],
  },
  dividerAccent: {
    width: 40,
    height: theme.borderWidth.thick,
    backgroundColor: theme.colors.accent,
    marginVertical: theme.spacing[3],
  },
});
```

Now a page component can compose styles quickly:

```tsx
import { shared } from "../styles/shared";
import { theme } from "../styles/theme";

// In the component:
<View style={shared.page}>
  <Text style={shared.h1}>Annual Report</Text>
  <View style={shared.dividerAccent} />
  <Text style={shared.body}>
    This paragraph uses the standard body style.
  </Text>
  <View style={shared.rowBetween}>
    <Text style={shared.caption}>Left</Text>
    <Text style={shared.caption}>Right</Text>
  </View>
</View>
```

The AI doesn't need to remember that `h1` is 28pt Inter Bold in navy. It writes `shared.h1` and moves on.

## The Design Brief Pattern

When you start a new document project, write a 10-line design brief and save it as a markdown file in your project:

```markdown
<!-- src/DESIGN_BRIEF.md -->

# Design Brief

- **Palette:** Navy (#1a2b4a) primary, gold (#d4a843) accent, cool gray neutral scale
- **Fonts:** Inter for everything. Bold for headings, Regular for body.
- **Heading sizes:** H1=28pt, H2=22pt, H3=18pt. Body=11pt. Captions=9pt.
- **Spacing:** 4pt grid. Page margins are 72pt (1 inch). Section gaps are 24pt.
- **Visual style:** Clean and professional. Generous white space. No decorative borders.
- **Accent usage:** Gold dividers under section headings. Gold left-border on callout boxes.
- **Tables:** Navy header row, alternating white/light gray body rows. 9pt text.
- **Page numbers:** Bottom right, 9pt gray, "Page X of Y" format.
- **Cover page:** Centered title block, large heading, gold divider, metadata below.
- **Tone:** Corporate but not stuffy. Data-focused.
```

Include this file in your AI prompts when starting a new page. It gives the model a quick gestalt of the visual direction without needing to parse the full theme file. The brief is a summary; the theme file is the source of truth.

## Real Example: Using the Theme in a Page

Here's a complete page component that demonstrates theme usage:

```tsx
// src/pages/Page03-ExecutiveSummary.tsx
import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { theme } from "../styles/theme";
import { shared } from "../styles/shared";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import CalloutBox from "../components/CalloutBox";

const styles = StyleSheet.create({
  page: {
    ...shared.page,
    paddingTop: theme.spacing[12],
  },
  paragraph: {
    ...shared.body,
    marginBottom: theme.spacing[3],
  },
  metricsRow: {
    flexDirection: "row",
    gap: theme.spacing[4],
    marginVertical: theme.spacing[6],
  },
  metricCard: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing[4],
    borderTopWidth: theme.borderWidth.thick,
    borderTopColor: theme.colors.accent,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 700,
    color: theme.colors.primary,
    marginBottom: theme.spacing[1],
  },
  metricLabel: {
    ...shared.caption,
  },
  bulletList: {
    marginVertical: theme.spacing[3],
    paddingLeft: theme.spacing[4],
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: theme.spacing[2],
  },
  bullet: {
    width: 16,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.accent,
  },
  bulletText: {
    flex: 1,
    ...shared.body,
  },
});

const metrics = [
  { value: "$4.2M", label: "Annual Revenue" },
  { value: "23%", label: "Year-over-Year Growth" },
  { value: "142", label: "Enterprise Clients" },
  { value: "98.7%", label: "Client Retention" },
];

const Page03ExecutiveSummary = () => (
  <Page size={theme.page.size} style={styles.page}>
    <Header />

    <SectionTitle label="Overview" title="Executive Summary" />

    <Text style={styles.paragraph}>
      Fiscal year 2025 marked the strongest period of growth in the
      company's history. Revenue reached $4.2 million, representing a
      23% increase over the prior year. This growth was driven by
      expansion into the enterprise segment, where we added 38 new
      clients while maintaining a 98.7% retention rate across our
      existing base.
    </Text>

    <View style={styles.metricsRow}>
      {metrics.map((m, i) => (
        <View key={i} style={styles.metricCard}>
          <Text style={styles.metricValue}>{m.value}</Text>
          <Text style={styles.metricLabel}>{m.label}</Text>
        </View>
      ))}
    </View>

    <Text style={[shared.h3, { marginBottom: theme.spacing[3] }]}>
      Key Accomplishments
    </Text>

    <View style={styles.bulletList}>
      {[
        "Launched self-serve onboarding, reducing time-to-value from 14 days to 3 days",
        "Expanded engineering team from 12 to 19 full-time engineers",
        "Achieved SOC 2 Type II certification in Q3",
        "Released API v3 with 40% faster response times",
      ].map((item, i) => (
        <View key={i} style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>

    <CalloutBox title="Looking Ahead" variant="info">
      The 2026 roadmap focuses on international expansion and AI-powered
      automation features. We project 30% revenue growth with a target of
      200 enterprise clients by year-end.
    </CalloutBox>

    <Footer />
  </Page>
);

export default Page03ExecutiveSummary;
```

Count the hardcoded visual values in that file: zero. Every color, size, spacing value, and font reference comes from the theme or shared styles. When an AI generates this page, it can't drift from the design because the design is enforced by the import.

## Swapping Themes

Because the design language is a single file, you can swap the entire visual identity by replacing `theme.ts`. Here's the "Modern Teal + White" version of the same token structure:

```tsx
// src/styles/theme-teal.ts

export const theme = {
  colors: {
    primary: "#0f766e",
    secondary: "#14b8a6",
    accent: "#f59e0b",

    white: "#ffffff",
    black: "#111111",

    neutral: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },

    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  fonts: {
    heading: "Montserrat",
    body: "Source Sans 3",
    mono: "JetBrains Mono",
  },

  typography: {
    h1: { fontSize: 30, fontWeight: 700 as const, lineHeight: 1.1 },
    h2: { fontSize: 22, fontWeight: 600 as const, lineHeight: 1.2 },
    h3: { fontSize: 17, fontWeight: 600 as const, lineHeight: 1.3 },
    h4: { fontSize: 13, fontWeight: 600 as const, lineHeight: 1.4 },
    body: { fontSize: 10.5, fontWeight: 400 as const, lineHeight: 1.6 },
    bodySmall: { fontSize: 9.5, fontWeight: 400 as const, lineHeight: 1.5 },
    caption: { fontSize: 8.5, fontWeight: 400 as const, lineHeight: 1.4 },
    label: { fontSize: 8.5, fontWeight: 600 as const, lineHeight: 1.2, letterSpacing: 2, textTransform: "uppercase" as const },
    code: { fontSize: 9, fontWeight: 400 as const, lineHeight: 1.5 },
  },

  spacing: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    18: 72,
    24: 96,
  },

  borderRadius: {
    sm: 3,
    md: 6,
    lg: 12,
  },
  borderWidth: {
    thin: 0.5,
    normal: 1,
    thick: 2,
  },

  opacity: {
    subtle: 0.08,
    light: 0.25,
    medium: 0.5,
    heavy: 0.75,
  },

  page: {
    size: "LETTER" as const,
    margin: {
      top: 64,
      right: 64,
      bottom: 64,
      left: 64,
    },
  },
} as const;
```

Same structure, different values. Every page component works unchanged. The entire document gets a new visual identity from a single file swap.

## Summary

A design language for AI-generated PDFs comes down to:

1. **One `theme.ts` file** that defines every visual value.
2. **One `shared.ts` file** that maps tokens to reusable style objects.
3. **One design brief** (optional but recommended) that summarizes the visual direction in plain language.
4. **Zero hardcoded values** in page components.

Build the theme first, before any pages. When you hand an AI a theme file and say "build a page that shows quarterly revenue data," it has everything it needs to produce output that matches the rest of your document. That's the goal.
