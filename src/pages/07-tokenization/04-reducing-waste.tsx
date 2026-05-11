import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, CodeBlock, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Tokenization" wrap={false}>
    <Text style={styles.body}>
      Compare that to the monolith approach: 8,000-15,000 tokens dumped into context, with your edit instructions buried somewhere inside. The file-per-page architecture isn't just about code organization. It's about giving AI the right amount of focused context.
    </Text>

    <SectionHeading>Reducing Token Waste</SectionHeading>
    <BulletList items={[
      'Extract repeated styles into shared.ts – define once, reference everywhere',
      'Use short but descriptive variable names – "s" for local styles is fine',
      'Don\'t add comments that restate the obvious – "// Render the title" above a title render',
      'Keep page components focused – if a section could be its own page, make it one',
      'Use the reference/ folder pattern – AI reads concise docs instead of loading all source',
    ]} />

    <SectionHeading>Prompt Sizing in Practice</SectionHeading>
    <Text style={styles.body}>
      Here's what an efficient AI prompt looks like. Notice how small and focused the context is:
    </Text>
    <CodeBlock language="text">{`Context files (paste these):
  1. theme.ts (your design tokens)
  2. ContentPage.tsx (the wrapper component)
  3. Page07-Ch05-Tokenization.tsx (the target page)

Instruction:
  "Add a new section called 'Prompt Sizing' after
  the BulletList. Use styles.h2 for the heading
  and styles.body for the paragraph. Include a
  CodeBlock showing an example prompt."`}</CodeBlock>
  </ContentPage>
);

export default Page;
