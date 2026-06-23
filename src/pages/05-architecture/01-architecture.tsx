import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, BulletList, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
      <SectionHeading>Why Monoliths Break for AI</SectionHeading>
      <Text style={styles.body}>
        The most common react-pdf mistake is putting everything in one file. Your entire 30-page document lives in a single 2,000-line component. You paste it into an AI prompt. The AI edits page 12 and accidentally breaks the styling on page 4.
      </Text>
      <Text style={styles.body}>
        Big files also strain AI attention – Chapter 5 covers the token math in detail. The structural fix in this chapter is what stops the cross-page breakage even before tokens enter the picture.
      </Text>

      <SectionHeading>File-Per-Page Pattern</SectionHeading>
      <Text style={styles.body}>
        Split every page into its own component file. One file, one page, one concern.
      </Text>
      <CodeBlock language="bash">{`src/
  pages/
    01-cover/01-cover.tsx
    02-toc/01-toc.tsx
    03-introduction/00-title.tsx       # chapter divider
    03-introduction/01-introduction.tsx
    ...
  components/   # Header, Footer, ChapterTitle, CodeBlock, Table, ...
  styles/
    theme.ts        # design tokens
    shared.ts       # shared StyleSheet
  manifest.ts       # chapter structure (source of truth)
  Document.tsx      # maps the generated registry into one <Document>
  build.tsx         # two-pass render to output/ebook.pdf`}</CodeBlock>

      <Text style={styles.h3}>Why This Works</Text>
      <BulletList items={[
        'Each file is 50-200 lines – well within AI effective attention',
        'AI can edit one page (e.g. 05-architecture/05-naming-conventions.tsx) without touching the others',
        'You give AI context: the page file + theme.ts + relevant components = ~3,000 tokens',
        'Components enforce consistency – every content page uses the same Header and Footer',
      ]} />
  </ContentPage>
);

export default Page;
