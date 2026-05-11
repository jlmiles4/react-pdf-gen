import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, WarningBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Avoiding AI Slop" wrap={false}>
      <SectionHeading>What AI Slop Looks Like</SectionHeading>
      <Text style={styles.body}>
        You've seen it. The AI generates a PDF and it looks... generic. Default font. Random spacing. Every page feels like a different document. Here's what specifically goes wrong:
      </Text>

      <BulletList items={[
        'Default Helvetica everywhere – no typographic personality',
        'Inconsistent font sizes – 14pt here, 16pt there, no clear hierarchy',
        'Cramped margins – content pushed to the edges with no breathing room',
        'Random colors – #333, #666, #007bff borrowed from different templates',
        'No visual hierarchy – body text and headings nearly the same size',
        'Walls of text – no callout boxes, no bullet lists, no visual breaks',
        'Lorem ipsum remnants – placeholder text the AI forgot to replace',
      ]} />

      <SectionHeading>Root Causes</SectionHeading>
      <Text style={styles.body}>
        AI slop isn't the AI's fault. It's a prompt and structure problem.
      </Text>
      <BulletList items={[
        'Lazy prompts: "Make me a PDF" gives the AI nothing to work with',
        'No design system: without tokens, the AI improvises – badly',
        'No visual QA: you accept the first output without reviewing the render',
        'Monolith structure: the AI can\'t focus on one page at a time',
        'No iteration: premium output takes 2-3 passes, not one',
      ]} />

      <WarningBox label="The First Draft Rule">
        AI's first attempt is a rough draft. Always. It gives you the structure and general direction, but the spacing, sizing, and visual balance need refinement. If you ship the first draft, you ship slop.
      </WarningBox>
  </ContentPage>
);

export default Page;
