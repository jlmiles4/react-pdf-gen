import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, TipBox, WarningBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Avoiding AI Slop" wrap={false}>
    <SectionHeading>Iteration Workflow</SectionHeading>
    <Text style={styles.body}>
      Premium output requires a loop, not a single prompt:
    </Text>
    <BulletList items={[
      'Pass 1: Generate structure and content – get the text right',
      'Pass 2: Apply design system – enforce tokens, fix spacing',
      'Pass 3: Visual QA – render to PNG, review, fix alignment and balance',
      'Optional Pass 4: Polish – add callouts, refine typography, check page breaks',
    ]} />

    <TipBox label="The Prompt That Fixes Slop">
      Instead of "make me a page about X", try: "Create a content page using ContentPage wrapper. Use typography from theme.ts: h2 for section titles, body for paragraphs. Include a TipBox callout and a BulletList. Match the spacing and style of 05-architecture/01-architecture.tsx."
    </TipBox>

    <SectionHeading>Knowing When to Stop</SectionHeading>
    <Text style={styles.body}>
      The loop has a floor. Past a certain point, more passes add churn, not quality – and over-polishing reintroduces its own kind of slop. Stop when:
    </Text>
    <BulletList items={[
      'The page renders cleanly with no orphaned headings, split callouts, or stray bullet dots',
      'Every reusable color, font, and spacing value traces back to a named token',
      'The layout reads at a glance – clear hierarchy, comfortable density, balanced whitespace',
      'A fresh read surfaces only nitpicks you would not pay to fix',
    ]} />

    <WarningBox label="Diminishing Returns">
      If your AI keeps "improving" a page that already passes QA, you are spending tokens to move pixels. Lock the page, commit it, and move the loop to the next one.
    </WarningBox>
  </ContentPage>
);

export default Page;
