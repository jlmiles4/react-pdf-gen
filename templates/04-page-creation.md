# Template: Creating New Pages

Paste this into your AI agent when adding a new page or chapter to your document.

---

## Page Template

```tsx
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders } from '../styles/theme';
import ContentPage from '../components/ContentPage';
import SectionHeading from '../components/SectionHeading';
import CodeBlock from '../components/CodeBlock';
import BulletList from '../components/BulletList';
import { TipBox, InfoBox } from '../components/TipBox';
import Table from '../components/Table';

/**
 * Page ## — [Title]
 *
 * [Brief description of what this page covers]
 *
 * Sections: [List key sections]
 * Components: [List components used]
 */

// Local styles for page-specific layouts (reference tokens, don't hardcode)
const local = StyleSheet.create({
  // Add page-specific styles here
});

const PageName: React.FC = () => (
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

    <SectionHeading>Comparison</SectionHeading>
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
);

export default PageName;
```

## After Creating the Page

1. **Register in Document.tsx:**
```tsx
import PageName from './pages/Page##-Name';
// Add to render order inside <Document>:
<PageName />
```

2. **Build and verify:**
```bash
pnpm pipeline
# Check output/pages/ PNGs for visual issues
```

## Content Density Guidelines

| Element | Guideline |
|---------|-----------|
| SectionHeadings | 3-5 per ContentPage |
| Body text | 2-4 sentences per paragraph |
| Code blocks | Under 15 lines. Split longer code into explained chunks |
| Tables | Max 3 columns. 4-8 rows ideal |
| Callout boxes | 1-2 per page. End with a TipBox when practical |
| BulletLists | 3-8 items. Trim to essentials |

## Layout Patterns

**Tutorial page:** SectionHeading → body text → CodeBlock → SectionHeading → BulletList → CodeBlock → TipBox

**Reference page:** SectionHeading → Table → SectionHeading → body + CodeBlock pairs → InfoBox

**Checklist page:** SectionHeading → checklist items (View rows with CheckIcon + Text) → divider → TipBox

## Common Mistakes
- Forgetting `wrap={false}` on card-style Views (causes split fragments across pages)
- Using inline style objects instead of `StyleSheet.create()`
- Hardcoding colors/spacing instead of importing tokens
- Forgetting `fontWeight` alongside `fontFamily`
- Using emoji instead of SVG icons
- Code blocks longer than 15 lines (they won't fit on one page with wrap={false})
