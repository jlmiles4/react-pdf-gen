# Tokenization and AI Context Windows

> How token economics affect AI-assisted PDF generation with react-pdf.

## What Tokens Are

Large language models don't read characters or words – they read **tokens**. A token is a subword unit, typically 3-5 characters of English text.

Rough conversions:

| Metric | Approximate Value |
|--------|-------------------|
| 1 token | ~4 characters of English text |
| 1 token | ~0.75 words |
| 100 words | ~130-140 tokens |
| 1 line of code | ~10-15 tokens |
| 1 page of prose | ~300-400 tokens |

These are averages. Code tends to tokenize less efficiently than prose because of camelCase identifiers, special characters, and indentation.

---

## Why Token Count Matters

Every AI model has a **context window** – the maximum number of tokens it can process in a single conversation turn (input + output combined).

| Model | Context Window |
|-------|---------------|
| Claude (Anthropic) | 200,000 tokens |
| GPT-4 Turbo (OpenAI) | 128,000 tokens |
| GPT-4o (OpenAI) | 128,000 tokens |

These numbers sound large, but they fill up fast when you're working with code. If you paste an entire 50-page PDF's source code into a prompt, you may be using 10,000-15,000 tokens just on input – and that's before the AI generates any output, before you add instructions, and before you include reference materials.

More importantly, **AI performance degrades with longer contexts**. A model working with 2,000 tokens of focused code will produce better output than the same model working with 15,000 tokens of mixed code. You want the AI to focus on exactly what it needs – nothing more.

---

## Token Costs of React-PDF Components

Here are realistic token counts for common react-pdf patterns:

| Component | Typical Token Count |
|-----------|-------------------|
| A single page component (imports + JSX + styles) | 100-300 tokens |
| A `StyleSheet.create()` block with 10 style rules | 200-400 tokens |
| A shared design tokens file | 150-300 tokens |
| A reusable table component | 200-400 tokens |
| A reusable header/footer component | 80-150 tokens |
| A `Document.tsx` file assembling 20 pages | 100-200 tokens |
| A complete page with complex layout + inline styles | 300-600 tokens |

### Example: One Page Component

```tsx
// ~180 tokens
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { tokens } from '../styles/tokens';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Inter' },
  title: { fontSize: 24, fontWeight: 'bold', color: tokens.colors.primary, marginBottom: 16 },
  body: { fontSize: 11, lineHeight: 1.6, color: tokens.colors.text },
});

export const Page05_KeyFindings = () => (
  <Page size="LETTER" style={styles.page}>
    <View>
      <Text style={styles.title}>Key Findings</Text>
      <Text style={styles.body}>
        Our analysis revealed three significant patterns...
      </Text>
    </View>
  </Page>
);
```

That component is roughly 180 tokens. An AI can read it, understand it, modify it, and return the result – all within a tiny fraction of its context window.

---

## The Problem: Monolithic Document Files

If you put your entire document in one file:

```tsx
// ANTI-PATTERN: Everything in one file
// This file might be 3,000-15,000 tokens

import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  // 50+ style rules... (~500-800 tokens)
});

export const MyEbook = () => (
  <Document>
    <Page>{/* Cover page... 200 tokens */}</Page>
    <Page>{/* TOC... 300 tokens */}</Page>
    <Page>{/* Chapter 1 intro... 250 tokens */}</Page>
    <Page>{/* Chapter 1 content... 400 tokens */}</Page>
    {/* ... 46 more pages ... */}
  </Document>
);
```

When you ask an AI to "fix the spacing on page 12," it has to ingest all 15,000 tokens – including 49 pages it doesn't need to see. This wastes context, increases the chance of the AI making unintended changes to other pages, and slows down the feedback loop.

---

## The Solution: One File Per Page

Split your document so each page is its own file:

```
pages/
  Page01-Cover.tsx           // ~150 tokens
  Page02-TOC.tsx             // ~200 tokens
  Page03-Chapter1Intro.tsx   // ~180 tokens
  Page04-Chapter1Body.tsx    // ~250 tokens
  ...
styles/
  tokens.ts                  // ~200 tokens
  sharedStyles.ts            // ~300 tokens
components/
  Header.tsx                 // ~100 tokens
  Footer.tsx                 // ~100 tokens
  CalloutBox.tsx             // ~150 tokens
Document.tsx                 // ~150 tokens
```

Now when you tell the AI "fix the spacing on page 12," you give it:
- `Page12-WhateverSection.tsx` (~200 tokens)
- `tokens.ts` (~200 tokens)
- `sharedStyles.ts` (~300 tokens)

Total context: ~700 tokens. That is 95% smaller than the monolithic approach. The AI focuses on exactly what matters.

---

## Style Tokens Are Expensive

A `StyleSheet.create()` block is token-dense because every property name, value, and comma is a token.

```tsx
// This block alone is ~350 tokens
const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff', fontFamily: 'Inter' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#1a1a2e', paddingBottom: 12, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a2e' },
  subtitle: { fontSize: 14, color: '#666666', marginTop: 4 },
  body: { fontSize: 11, lineHeight: 1.6, color: '#333333' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1a1a2e', marginTop: 20, marginBottom: 8 },
  card: { backgroundColor: '#f8f9fa', borderRadius: 4, padding: 16, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#3498db' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#dee2e6', paddingTop: 8 },
});
```

If this block is duplicated across 20 page files, you're spending 7,000 tokens on redundant style definitions. **Extract shared styles into one file and import them.**

```tsx
// styles/sharedStyles.ts – defined once, ~350 tokens
// pages/Page12-Section.tsx – imports sharedStyles, adds only page-specific styles
import { sharedStyles } from '../styles/sharedStyles';

const localStyles = StyleSheet.create({
  highlight: { backgroundColor: '#fff3cd', padding: 8 },
});

// Use: style={[sharedStyles.body, localStyles.highlight]}
```

---

## Content Tokens vs. Structure Tokens

Separate your data from your layout. The text content of your document (paragraphs, headings, bullet points) is high-token data that the AI usually doesn't need to see when making layout changes.

```tsx
// data/chapter3.ts – content data
export const chapter3 = {
  title: 'Understanding the Market',
  sections: [
    {
      heading: 'Market Overview',
      body: 'The global market for...',    // potentially hundreds of tokens of prose
    },
    // ...
  ],
};

// pages/Page08-Chapter3.tsx – layout only
import { chapter3 } from '../data/chapter3';

export const Page08_Chapter3 = () => (
  <Page size="LETTER" style={sharedStyles.page}>
    <Text style={sharedStyles.chapterTitle}>{chapter3.title}</Text>
    {chapter3.sections.map((section, i) => (
      <View key={i}>
        <Text style={sharedStyles.sectionTitle}>{section.heading}</Text>
        <Text style={sharedStyles.body}>{section.body}</Text>
      </View>
    ))}
  </Page>
);
```

Now if you want the AI to adjust the layout, you give it the page component (~100 tokens) and shared styles (~300 tokens) – without the content data. If you want the AI to edit the content, you give it the data file – without the layout code.

---

## Practical Limits

These are guidelines based on how current AI models perform with code:

| Metric | Recommended Limit |
|--------|-------------------|
| Lines per file | Under 500 |
| Tokens per file | Under 2,000 |
| Files in AI context at once | 3-5 focused files |
| Total context for one edit task | Under 3,000 tokens of code |

These limits are not hard rules – they are the zone where AI agents produce the most reliable results. Beyond these limits, you start seeing:
- Omitted code sections (the AI "summarizes" instead of reproducing)
- Unintended changes to code the AI wasn't asked to modify
- Inconsistencies between the beginning and end of a long file

---

## Token Budget Planning

For a 50-page ebook project, plan your token budget like this:

| Component | Count | Tokens Each | Total |
|-----------|-------|-------------|-------|
| Page components | 50 | ~200 | ~10,000 |
| Shared styles | 1 | ~400 | ~400 |
| Design tokens | 1 | ~200 | ~200 |
| Shared components | 5 | ~150 | ~750 |
| Document assembly | 1 | ~200 | ~200 |
| Content data files | 10 | ~500 | ~5,000 |
| **Total project** | | | **~16,550** |

The entire project is ~16,550 tokens. But at any given moment, the AI only needs to see 500-1,000 tokens to make a targeted edit. That is the power of splitting.

---

## Key Takeaway

You are not optimizing for the smallest possible file. You are optimizing for **the smallest possible context an AI needs to do a specific task**. Every file should contain one concern. Every edit should require loading only the files relevant to that edit.
