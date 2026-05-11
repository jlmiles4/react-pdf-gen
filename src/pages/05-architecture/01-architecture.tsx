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
        Big files also strain AI attention — Chapter 5 covers the token math in detail. The structural fix in this chapter is what stops the cross-page breakage even before tokens enter the picture.
      </Text>

      <SectionHeading>File-Per-Page Pattern</SectionHeading>
      <Text style={styles.body}>
        Split every page into its own component file. One file, one page, one concern.
      </Text>
      <CodeBlock language="bash">{`src/
  pages/
    Page01-Cover.tsx          # 80 lines
    Page02-TOC.tsx            # 65 lines
    Page03-Ch01-Intro.tsx     # 120 lines
    Page04-Ch02-Setup.tsx     # 150 lines
    ...
  components/
    Header.tsx                # 40 lines
    Footer.tsx                # 35 lines
    ChapterTitle.tsx          # 55 lines
    CodeBlock.tsx             # 20 lines
    TipBox.tsx                # 30 lines
    Table.tsx                 # 45 lines
    Icons.tsx                 # 80 lines
  styles/
    theme.ts                  # 90 lines – design tokens
    shared.ts                 # 150 lines – shared StyleSheet
  Document.tsx                # 30 lines – assembles pages
  build.tsx                   # 15 lines – renders to file`}</CodeBlock>

      <Text style={styles.h3}>Why This Works</Text>
      <BulletList items={[
        'Each file is 50-200 lines – well within AI effective attention',
        'AI can edit Page07 without seeing or touching Page03',
        'You give AI context: the page file + theme.ts + relevant components = ~1,500 tokens',
        'Diffs are small and reviewable – you see exactly what changed',
        'Multiple AI agents can work on different pages in parallel',
        'Components enforce consistency – every page uses the same Header and Footer',
      ]} />
  </ContentPage>
);

export default Page;
