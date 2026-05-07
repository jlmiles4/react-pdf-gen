# Page-Per-File Architecture

> How to structure a react-pdf project so AI agents can work on it efficiently.

## The Core Principle

**One file per page.** Each page of your PDF is a standalone React component in its own file. A central `Document.tsx` imports and assembles them in order.

This is not just a code organization preference. It is a structural choice that determines whether an AI agent can edit page 37 without reading pages 1-36 first.

---

## File Naming Convention

```
PageXX-SectionName.tsx
```

- `XX` is a zero-padded page number: `01`, `02`, `03`, ... `50`
- `SectionName` is a short, descriptive PascalCase name
- The number prefix keeps files sorted in the correct order in your editor and in directory listings

### Examples

```
Page01-Cover.tsx
Page02-TableOfContents.tsx
Page03-AboutTheAuthor.tsx
Page04-Chapter1Intro.tsx
Page05-Chapter1KeyFindings.tsx
Page06-Chapter1DataTable.tsx
Page07-Chapter1Summary.tsx
Page08-Chapter2Intro.tsx
...
Page48-Appendix.tsx
Page49-Glossary.tsx
Page50-BackCover.tsx
```

---

## Recommended Project Structure

```
project/
├── src/
│   ├── Document.tsx              # Assembles all pages
│   ├── registerFonts.ts          # All Font.register() calls
│   ├── pages/
│   │   ├── Page01-Cover.tsx
│   │   ├── Page02-TOC.tsx
│   │   ├── Page03-Chapter1Intro.tsx
│   │   ├── Page04-Chapter1Body.tsx
│   │   ├── Page05-Chapter1Charts.tsx
│   │   └── ...
│   ├── components/
│   │   ├── Header.tsx            # Repeating page header
│   │   ├── Footer.tsx            # Repeating page footer with page number
│   │   ├── CalloutBox.tsx        # Tip/warning/note boxes
│   │   ├── Table.tsx             # Reusable table component
│   │   ├── SectionTitle.tsx      # Styled heading component
│   │   └── CodeBlock.tsx         # Styled code display
│   ├── styles/
│   │   ├── tokens.ts             # Design tokens (colors, spacing, fonts)
│   │   └── sharedStyles.ts       # StyleSheet.create() for common patterns
│   ├── data/
│   │   ├── chapter1.ts           # Text content for chapter 1
│   │   ├── chapter2.ts           # Text content for chapter 2
│   │   └── ...
│   └── assets/
│       ├── fonts/
│       │   ├── Inter-Regular.ttf
│       │   ├── Inter-Bold.ttf
│       │   └── ...
│       └── images/
│           ├── cover-bg.png
│           ├── logo.png
│           └── ...
├── render.ts                     # Script to generate the PDF
├── package.json
└── tsconfig.json
```

---

## The Document Assembly File

`Document.tsx` imports every page and renders them in sequence. This file has a single responsibility: ordering the pages.

```tsx
// src/Document.tsx
import { Document } from '@react-pdf/renderer';
import { Page01_Cover } from './pages/Page01-Cover';
import { Page02_TOC } from './pages/Page02-TOC';
import { Page03_Chapter1Intro } from './pages/Page03-Chapter1Intro';
import { Page04_Chapter1Body } from './pages/Page04-Chapter1Body';
import { Page05_Chapter1Charts } from './pages/Page05-Chapter1Charts';
import { Page06_Chapter2Intro } from './pages/Page06-Chapter2Intro';
// ... more imports

export const MyEbook = () => (
  <Document
    title="React-PDF Best Practices"
    author="Your Name"
    subject="A guide to building professional PDFs with react-pdf"
  >
    <Page01_Cover />
    <Page02_TOC />
    <Page03_Chapter1Intro />
    <Page04_Chapter1Body />
    <Page05_Chapter1Charts />
    <Page06_Chapter2Intro />
    {/* ... more pages */}
  </Document>
);
```

This file stays small – just imports and JSX. It rarely needs AI edits. When you add or remove a page, you change two lines: one import and one JSX element.

---

## A Page Component

Each page file follows a consistent pattern:

```tsx
// src/pages/Page05-Chapter1Charts.tsx
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../styles/tokens';
import { sharedStyles } from '../styles/sharedStyles';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  chartBox: {
    flex: 1,
    height: 180,
    backgroundColor: tokens.colors.surfaceLight,
    borderRadius: 4,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartLabel: {
    fontSize: 10,
    color: tokens.colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});

export const Page05_Chapter1Charts = () => (
  <Page size="LETTER" style={sharedStyles.page}>
    <Header title="Chapter 1" />
    <Text style={sharedStyles.sectionTitle}>Performance Metrics</Text>
    <Text style={sharedStyles.body}>
      The following charts illustrate the performance improvements
      observed during the testing period.
    </Text>
    <View style={styles.chartContainer}>
      <View style={styles.chartBox}>
        <Text style={styles.chartLabel}>Response Time (ms)</Text>
      </View>
      <View style={styles.chartBox}>
        <Text style={styles.chartLabel}>Throughput (req/s)</Text>
      </View>
    </View>
    <Footer />
  </Page>
);
```

**Key traits of a good page component:**

1. Imports only what it needs
2. Has page-specific styles defined locally
3. Uses shared styles for common patterns (page padding, body text, headings)
4. Uses shared components for repeating elements (Header, Footer)
5. Is self-contained – you can understand the page by reading this one file plus the imports

---

## Shared Components

Create reusable components for elements that appear on multiple pages.

### Header

```tsx
// src/components/Header.tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../styles/tokens';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border,
    paddingBottom: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 9,
    color: tokens.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bookTitle: {
    fontSize: 9,
    color: tokens.colors.textSecondary,
  },
});

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => (
  <View style={styles.header} fixed>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.bookTitle}>React-PDF Best Practices</Text>
  </View>
);
```

### Footer with Page Number

```tsx
// src/components/Footer.tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../styles/tokens';

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border,
    paddingTop: 8,
  },
  text: {
    fontSize: 8,
    color: tokens.colors.textSecondary,
  },
});

export const Footer = () => (
  <View style={styles.footer} fixed>
    <Text style={styles.text}>Copyright 2025 Your Name</Text>
    <Text
      style={styles.text}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
);
```

### Callout Box

```tsx
// src/components/CalloutBox.tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../styles/tokens';

type CalloutType = 'tip' | 'warning' | 'note';

const accentColors: Record<CalloutType, string> = {
  tip: tokens.colors.success,
  warning: tokens.colors.warning,
  note: tokens.colors.accent,
};

const labels: Record<CalloutType, string> = {
  tip: 'TIP',
  warning: 'WARNING',
  note: 'NOTE',
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 4,
    padding: 14,
    marginVertical: 12,
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 4,
  },
  label: {
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
    color: tokens.colors.text,
  },
});

interface CalloutBoxProps {
  type: CalloutType;
  children: string;
}

export const CalloutBox = ({ type, children }: CalloutBoxProps) => (
  <View style={[styles.box, { borderLeftColor: accentColors[type] }]}>
    <Text style={[styles.label, { color: accentColors[type] }]}>
      {labels[type]}
    </Text>
    <Text style={styles.content}>{children}</Text>
  </View>
);
```

---

## Shared Styles

```tsx
// src/styles/sharedStyles.ts
import { StyleSheet } from '@react-pdf/renderer';
import { tokens } from './tokens';

export const sharedStyles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 60,
    fontFamily: 'Inter',
    fontSize: 11,
    color: tokens.colors.text,
    backgroundColor: '#ffffff',
  },
  chapterTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: tokens.colors.primary,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: tokens.colors.primary,
    marginTop: 20,
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: 13,
    fontWeight: 'semibold',
    color: tokens.colors.primary,
    marginTop: 14,
    marginBottom: 6,
  },
  body: {
    fontSize: 11,
    lineHeight: 1.6,
    color: tokens.colors.text,
    marginBottom: 8,
  },
  caption: {
    fontSize: 9,
    color: tokens.colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
});
```

---

## Benefits of Page-Per-File

### 1. Parallel editing

An AI agent can work on Page12 while you manually edit Page03. No merge conflicts, no risk of one edit corrupting another page.

### 2. Smaller diffs

When you regenerate Page08, only `Page08-WhateverSection.tsx` changes. Your version control history is clean and reviewable.

### 3. Easier review

You can read a 150-line page component and verify it in 30 seconds. You cannot effectively review a 3,000-line monolithic file.

### 4. AI focuses on one page at a time

You provide the AI with one page file + shared styles + relevant shared components. The AI's output is constrained to a single page – it cannot accidentally break other pages.

### 5. Selective regeneration

If the AI produces a bad result for one page, you discard that file and try again. You do not lose any work on other pages.

---

## Anti-Patterns

### One massive file

```tsx
// DO NOT DO THIS
// AllPages.tsx – 3,000+ lines
export const MyDoc = () => (
  <Document>
    <Page>{/* 80 lines of cover page */}</Page>
    <Page>{/* 120 lines of TOC */}</Page>
    <Page>{/* 200 lines of chapter 1 */}</Page>
    {/* ... 47 more pages ... */}
  </Document>
);
```

Problems: AI must ingest the entire file for any edit. High risk of unintended changes. Difficult to review diffs. Cannot parallelize work.

### Deeply nested component trees spanning multiple pages

```tsx
// DO NOT DO THIS
// A Chapter component that internally renders 8 pages
const Chapter1 = () => (
  <>
    <Page>{/* intro */}</Page>
    <Page>{/* content A */}</Page>
    <Page>{/* content B */}</Page>
    <Page>{/* charts */}</Page>
    <Page>{/* summary */}</Page>
  </>
);
```

This defeats the purpose of splitting. An AI editing "content B" must read the entire Chapter1 component. Split each page into its own file instead.

### Styles scattered across 50 files with no shared tokens

```tsx
// DO NOT DO THIS – inconsistency guaranteed
// Page01-Cover.tsx
const styles = StyleSheet.create({
  title: { fontSize: 28, color: '#1a1a2e' },
});

// Page15-Chapter3.tsx
const styles = StyleSheet.create({
  title: { fontSize: 26, color: '#1b1b2f' },  // slightly different!
});
```

Without shared tokens and shared styles, every file drifts. Colors are off by a shade, font sizes vary by a point, spacing is inconsistent. Use a central `tokens.ts` and `sharedStyles.ts`.

---

## Adding and Removing Pages

**To add a page:**

1. Create the new file: `Page11-NewSection.tsx`
2. If inserting between existing pages, renumber subsequent files (or use a gap numbering scheme like `Page10`, `Page11`, `Page15`, `Page20`)
3. Add the import and JSX element to `Document.tsx`

**To remove a page:**

1. Delete the file
2. Remove the import and JSX element from `Document.tsx`

**To reorder pages:**

1. Rename files to reflect the new order (or adjust numbers)
2. Reorder the JSX elements in `Document.tsx`

The `Document.tsx` file is the source of truth for page ordering. The file numbering is a convenience for humans browsing the directory.

---

## Gap Numbering for Flexibility

If you anticipate adding pages later, leave gaps in your numbering:

```
Page01-Cover.tsx
Page05-TOC.tsx
Page10-Chapter1Intro.tsx
Page15-Chapter1Body.tsx
Page20-Chapter2Intro.tsx
Page25-Chapter2Body.tsx
```

Now you can add `Page12-Chapter1Sidebar.tsx` between pages 10 and 15 without renaming anything. The actual order is always controlled by `Document.tsx`, not the filenames – but sorted filenames are easier to navigate.
