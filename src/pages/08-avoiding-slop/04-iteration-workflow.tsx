import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, TipBox, SectionHeading } from '../../components';

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
      Instead of "make me a page about X", try: "Create a content page using ContentPage wrapper. Use typography from theme.ts: h2 for section titles, body for paragraphs. Include a TipBox callout and a BulletList. Match the spacing and style of Page05-Ch03-Architecture.tsx."
    </TipBox>
  </ContentPage>
);

export default Page;
