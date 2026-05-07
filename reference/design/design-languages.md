# Design Languages for React-PDF

> How to define a design system that keeps your AI-generated pages visually cohesive.

## Why You Need a Design Language

Without a design language, every page an AI generates looks different. The AI picks whatever colors, sizes, and spacing feel right in the moment. Page 3 uses 12pt body text, page 7 uses 11pt, page 14 uses 10pt. The primary color drifts from `#1a1a2e` to `#1b1c30` to `#2a2a3e`. Spacing is 16pt here, 20pt there, 12pt somewhere else.

A design language is a set of explicit, named tokens that constrain every visual decision. When the AI knows the body text is always `tokens.fontSize.body` (11pt) and the primary color is always `tokens.colors.primary` (`#1a1a2e`), every page it generates is consistent with every other page.

---

## Design Token File

This is the foundation. Define it once, import it everywhere.

```tsx
// src/styles/tokens.ts

export const tokens = {
  // ─── Colors ───────────────────────────────────────────
  colors: {
    primary: '#1a1a2e',        // dark navy – headings, emphasis
    secondary: '#16213e',      // slightly lighter navy
    accent: '#3498db',         // blue – links, highlights, callouts
    accentLight: '#ebf5fb',    // light blue – accent backgrounds

    text: '#333333',           // primary body text
    textSecondary: '#666666',  // secondary text, captions
    textInverse: '#ffffff',    // text on dark backgrounds

    surface: '#ffffff',        // page background
    surfaceLight: '#f8f9fa',   // card backgrounds, alt rows
    surfaceMedium: '#e9ecef',  // borders, dividers background

    border: '#dee2e6',         // standard border color
    borderLight: '#f0f0f0',    // subtle borders

    success: '#27ae60',        // green – positive indicators
    warning: '#f39c12',        // amber – warnings, cautions
    error: '#e74c3c',          // red – errors, critical
  },

  // ─── Typography ───────────────────────────────────────
  fontFamily: {
    body: 'Inter',
    heading: 'Inter',          // or a display font like 'Playfair'
    mono: 'JetBrainsMono',
  },

  fontSize: {
    h1: 28,                    // chapter titles
    h2: 20,                    // section titles
    h3: 16,                    // subsection titles
    h4: 13,                    // minor headings
    body: 11,                  // standard body text
    small: 9,                  // captions, footnotes, labels
    tiny: 7,                   // page numbers, fine print
  },

  fontWeight: {
    normal: 'normal' as const,
    medium: 'medium' as const,
    semibold: 'semibold' as const,
    bold: 'bold' as const,
  },

  lineHeight: {
    tight: 1.2,                // headings
    normal: 1.5,               // body text
    relaxed: 1.7,              // body text with extra breathing room
  },

  // ─── Spacing Scale ────────────────────────────────────
  // Based on 4pt increments for consistency
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },

  // ─── Page ─────────────────────────────────────────────
  page: {
    size: 'LETTER' as const,
    paddingTop: 40,
    paddingBottom: 60,         // extra bottom for footer
    paddingHorizontal: 40,
  },

  // ─── Borders ──────────────────────────────────────────
  borderRadius: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
  },

  borderWidth: {
    thin: 0.5,
    normal: 1,
    thick: 2,
    accent: 3,                 // left-border accent on callout boxes
  },
} as const;
```

---

## Typography Scale

A typography scale defines the visual hierarchy of your document. Every text element in your PDF should use one of these levels – no ad-hoc sizes.

| Level | Size | Weight | Line Height | Use |
|-------|------|--------|-------------|-----|
| H1 | 28pt | Bold | 1.2 | Chapter titles |
| H2 | 20pt | Bold | 1.2 | Section titles |
| H3 | 16pt | Semibold | 1.3 | Subsection titles |
| H4 | 13pt | Semibold | 1.3 | Minor headings |
| Body | 11pt | Normal | 1.5 | Standard paragraphs |
| Small | 9pt | Normal | 1.4 | Captions, footnotes |
| Tiny | 7pt | Normal | 1.2 | Page numbers, legal text |

Translate this into shared styles:

```tsx
// src/styles/sharedStyles.ts
import { StyleSheet } from '@react-pdf/renderer';
import { tokens } from './tokens';

export const sharedStyles = StyleSheet.create({
  // ─── Page ─────────────────────────────────────────────
  page: {
    paddingTop: tokens.page.paddingTop,
    paddingBottom: tokens.page.paddingBottom,
    paddingHorizontal: tokens.page.paddingHorizontal,
    fontFamily: tokens.fontFamily.body,
    fontSize: tokens.fontSize.body,
    color: tokens.colors.text,
    backgroundColor: tokens.colors.surface,
  },

  // ─── Typography ───────────────────────────────────────
  h1: {
    fontSize: tokens.fontSize.h1,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.primary,
    lineHeight: tokens.lineHeight.tight,
    marginBottom: tokens.spacing.lg,
  },
  h2: {
    fontSize: tokens.fontSize.h2,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.primary,
    lineHeight: tokens.lineHeight.tight,
    marginTop: tokens.spacing.xl,
    marginBottom: tokens.spacing.md,
  },
  h3: {
    fontSize: tokens.fontSize.h3,
    fontWeight: tokens.fontWeight.semibold,
    color: tokens.colors.primary,
    lineHeight: tokens.lineHeight.tight,
    marginTop: tokens.spacing.lg,
    marginBottom: tokens.spacing.sm,
  },
  h4: {
    fontSize: tokens.fontSize.h4,
    fontWeight: tokens.fontWeight.semibold,
    color: tokens.colors.primary,
    marginTop: tokens.spacing.md,
    marginBottom: tokens.spacing.xs,
  },
  body: {
    fontSize: tokens.fontSize.body,
    fontWeight: tokens.fontWeight.normal,
    lineHeight: tokens.lineHeight.normal,
    color: tokens.colors.text,
    marginBottom: tokens.spacing.sm,
  },
  small: {
    fontSize: tokens.fontSize.small,
    color: tokens.colors.textSecondary,
    lineHeight: tokens.lineHeight.normal,
  },
  tiny: {
    fontSize: tokens.fontSize.tiny,
    color: tokens.colors.textSecondary,
  },

  // ─── Common Patterns ─────────────────────────────────
  bold: {
    fontWeight: tokens.fontWeight.bold,
  },
  italic: {
    fontStyle: 'italic' as const,
  },
  mono: {
    fontFamily: tokens.fontFamily.mono,
  },
  uppercase: {
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
});
```

---

## Color Palette

Limit your palette. Three to five colors create a professional look. More than that creates noise.

### Minimum Viable Palette

```
Primary:     #1a1a2e  – headings, key text, strong borders
Accent:      #3498db  – links, highlights, interactive elements
Text:        #333333  – body text
Text Light:  #666666  – secondary text
Surface:     #f8f9fa  – card backgrounds
```

### Extended Palette

Add these only if your content requires status indicators:

```
Success:     #27ae60  – positive, complete, approved
Warning:     #f39c12  – caution, attention needed
Error:       #e74c3c  – critical, failed, blocked
```

### Using the Palette

Every color in your document should be one of these tokens. If you catch yourself typing a hex code directly in a style, stop and add it to the tokens file first.

```tsx
// GOOD – uses token
{ color: tokens.colors.primary }

// BAD – hard-coded hex
{ color: '#1a1a2e' }

// BAD – slightly different shade that will cause inconsistency
{ color: '#1b1b2f' }
```

---

## Spacing Scale

Use a consistent spacing scale – not arbitrary numbers. A scale based on 4pt increments creates visual rhythm.

```
4pt   (xs)    – tight padding, icon gaps
8pt   (sm)    – standard inner padding, paragraph spacing
12pt  (md)    – medium spacing between related elements
16pt  (lg)    – standard section padding, element spacing
24pt  (xl)    – major section breaks
32pt  (xxl)   – large gaps, chapter spacing
48pt  (xxxl)  – dramatic spacing, cover page elements
```

Using the scale:

```tsx
const styles = StyleSheet.create({
  section: {
    marginBottom: tokens.spacing.xl,    // 24pt between sections
  },
  card: {
    padding: tokens.spacing.lg,         // 16pt inside cards
    marginBottom: tokens.spacing.md,    // 12pt between cards
  },
  inlineElements: {
    gap: tokens.spacing.sm,             // 8pt between inline items
  },
});
```

Never use spacing values outside the scale. If 16pt feels too small and 24pt too large, use 20pt – but add it to the scale as a named value first.

---

## Component Patterns

Define reusable patterns for common elements. These are higher-level than styles – they are complete component definitions that ensure every instance of a card, table, or callout looks identical.

### Card Pattern

```tsx
// src/components/Card.tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../styles/tokens';

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.surfaceLight,
    borderRadius: tokens.borderRadius.md,
    padding: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
    borderLeftWidth: tokens.borderWidth.accent,
    borderLeftColor: tokens.colors.accent,
  },
  cardTitle: {
    fontSize: tokens.fontSize.h4,
    fontWeight: tokens.fontWeight.semibold,
    color: tokens.colors.primary,
    marginBottom: tokens.spacing.sm,
  },
  cardBody: {
    fontSize: tokens.fontSize.body,
    lineHeight: tokens.lineHeight.normal,
    color: tokens.colors.text,
  },
});

interface CardProps {
  title: string;
  accentColor?: string;
  children: React.ReactNode;
}

export const Card = ({ title, accentColor, children }: CardProps) => (
  <View
    style={[
      styles.card,
      accentColor ? { borderLeftColor: accentColor } : {},
    ]}
  >
    <Text style={styles.cardTitle}>{title}</Text>
    <View>{children}</View>
  </View>
);
```

### Table Pattern

```tsx
// src/components/DataTable.tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../styles/tokens';

const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderWidth: tokens.borderWidth.thin,
    borderColor: tokens.colors.border,
    borderRadius: tokens.borderRadius.sm,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: tokens.colors.primary,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
  },
  headerText: {
    fontSize: tokens.fontSize.small,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.textInverse,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    borderBottomWidth: tokens.borderWidth.thin,
    borderBottomColor: tokens.colors.borderLight,
  },
  altRow: {
    backgroundColor: tokens.colors.surfaceLight,
  },
  cellText: {
    fontSize: tokens.fontSize.body,
    color: tokens.colors.text,
  },
});

interface Column {
  key: string;
  label: string;
  flex?: number;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, string>[];
}

export const DataTable = ({ columns, data }: DataTableProps) => (
  <View style={styles.table}>
    <View style={styles.headerRow}>
      {columns.map((col) => (
        <View key={col.key} style={{ flex: col.flex || 1 }}>
          <Text style={styles.headerText}>{col.label}</Text>
        </View>
      ))}
    </View>
    {data.map((row, i) => (
      <View key={i} style={[styles.row, i % 2 === 1 ? styles.altRow : {}]}>
        {columns.map((col) => (
          <View key={col.key} style={{ flex: col.flex || 1 }}>
            <Text style={styles.cellText}>{row[col.key]}</Text>
          </View>
        ))}
      </View>
    ))}
  </View>
);
```

### Divider Pattern

```tsx
// src/components/Divider.tsx
import { View, StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../styles/tokens';

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: tokens.borderWidth.thin,
    borderBottomColor: tokens.colors.border,
    marginVertical: tokens.spacing.lg,
  },
  thickDivider: {
    borderBottomWidth: tokens.borderWidth.thick,
    borderBottomColor: tokens.colors.primary,
    marginVertical: tokens.spacing.xl,
  },
});

export const Divider = ({ thick = false }: { thick?: boolean }) => (
  <View style={thick ? styles.thickDivider : styles.divider} />
);
```

---

## How AI Benefits from Design Tokens

When you include `tokens.ts` in your AI prompt context, the AI:

1. **Uses correct, consistent values** – it references `tokens.colors.primary` instead of guessing a hex code
2. **Matches the spacing scale** – it picks `tokens.spacing.lg` instead of an arbitrary 18pt
3. **Follows the typography hierarchy** – it uses `tokens.fontSize.h2` for section titles, not a random 19pt
4. **Produces code that works with shared styles** – it imports `sharedStyles.body` instead of redefining body text styles

The design token file is small – typically 150-300 tokens (in the AI tokenization sense). Including it in every prompt costs almost nothing but prevents nearly all visual inconsistency.

---

## Without a Design Language

This is what happens when each AI-generated page defines its own styles:

- Page 3: body text is 11pt, #333, line-height 1.6
- Page 7: body text is 12pt, #444, line-height 1.5
- Page 12: body text is 10pt, #333, line-height 1.4
- Page 15: body text is 11pt, #222, line-height 1.6

The reader cannot articulate why, but the document feels sloppy. The inconsistency is subtle enough to miss on any individual page but obvious when reading through the document.

A design language eliminates this class of problem entirely.
