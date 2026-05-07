# Prompt: Creating New Pages

Use this prompt when adding a new page/chapter to a react-pdf document.

---

## Template: Content Page

```tsx
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders } from '../styles/theme';
import ContentPage from '../components/ContentPage';
import ChapterTitle from '../components/ChapterTitle';
import SectionHeading from '../components/SectionHeading';
import CodeBlock from '../components/CodeBlock';
import BulletList from '../components/BulletList';
import { TipBox, InfoBox } from '../components/TipBox';
import Table from '../components/Table';

// Local styles for page-specific layouts
const local = StyleSheet.create({
  // Only add styles unique to this page
  // Always reference tokens: colors.*, spacing.*, fonts.*, borders.*
});

const PageNN_ChNN_Topic: React.FC = () => (
  <>
    {/* Chapter title page — full-page dark divider */}
    <ChapterTitle
      number="NN"
      title="Chapter Title Here"
      subtitle="One-line description of what this chapter covers."
    />

    {/* First content page */}
    <ContentPage sectionTitle="Section Name">
      <SectionHeading>First Section</SectionHeading>
      <Text style={styles.body}>
        Body text here. Keep paragraphs concise — 2-4 sentences.
      </Text>

      <BulletList items={[
        'First point with actionable information',
        'Second point that adds value',
        'Third point that completes the thought',
      ]} />

      <SectionHeading>Code Example</SectionHeading>
      <Text style={styles.body}>
        Brief explanation before the code block.
      </Text>
      <CodeBlock language="tsx">{`// Your code example here
const example = 'clean and readable';`}</CodeBlock>

      <SectionHeading>Comparison Table</SectionHeading>
      <Table
        headers={['Feature', 'Option A', 'Option B']}
        rows={[
          ['Speed', 'Fast', 'Slower'],
          ['Quality', 'Good', 'Excellent'],
        ]}
        columnWidths={['30%', '35%', '35%']}
      />

      <TipBox>
        End sections with a practical tip the reader can act on immediately.
      </TipBox>
    </ContentPage>
  </>
);

export default PageNN_ChNN_Topic;
```

## Registration Checklist

After creating the page file:

1. **Import in Document.tsx:**
```tsx
import PageNNChNN from './pages/PageNN-ChNN-Topic';
// Add to render order:
<PageNNChNN />
```

2. **Add to TOC in Page02-TOC.tsx:**
```tsx
{ num: 'NN', title: 'Chapter Title', subtitle: 'Description' },
```

3. **Build and verify:**
```bash
pnpm pipeline
# Check output/pages/ PNGs for:
# - No orphaned elements
# - Consistent spacing
# - TOC still fits one page
```

## Content Density Guidelines

- **Target:** 3-5 SectionHeadings per ContentPage
- **Body text:** 2-4 sentences per paragraph, never wall-of-text
- **Code blocks:** Keep under 15 lines. Longer code should be split into explained chunks
- **Tables:** Maximum 3 columns for readability. 4-8 rows ideal
- **Callout boxes:** 1-2 per page. End with a TipBox when possible
- **BulletLists:** 3-8 items. Trim to essentials

## Page Layout Patterns

### Pattern: Tutorial Page
```
ChapterTitle → ContentPage [
  SectionHeading "Concept"
  Body text (explanation)
  CodeBlock (example)
  SectionHeading "Step by Step"
  BulletList (steps)
  CodeBlock (complete example)
  TipBox (practical advice)
]
```

### Pattern: Reference Page
```
ChapterTitle → ContentPage [
  SectionBanner (hero intro)
  SectionHeading "Quick Reference"
  Table (comparison data)
  SectionHeading "Details"
  Body text + CodeBlock pairs
  InfoBox (important note)
]
```

### Pattern: Checklist Page
```
ChapterTitle → ContentPage [
  SectionHeading "Category 1"
  Checklist items (View rows with CheckIcon + Text)
  SectionHeading "Category 2"
  Checklist items
  Divider
  TipBox (summary advice)
]
```

## Common Mistakes to Avoid
- Forgetting `wrap={false}` on card-style Views (causes split fragments)
- Using inline style objects instead of `StyleSheet.create()`
- Hardcoding colors/spacing instead of importing tokens
- Putting too much content on one page (let it flow to next page naturally)
- Forgetting to add `fontWeight` alongside `fontFamily`
- Using emoji instead of SVG icons
