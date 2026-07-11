import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, TipBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
    <SectionHeading>Quality Tests</SectionHeading>
    <BulletList items={[
      'The squint test: step back, squint at the page. Can you see clear visual hierarchy? If everything blurs into one gray block, you need more contrast.',
      'The scroll test: flip through all pages quickly. Do they feel like one cohesive document? Or do some pages look like they belong to a different PDF?',
      'The "would I share this?" test: if someone you respect saw this PDF with your name on it, would you be proud? If you hesitate, it needs more work.',
      'The comparison test: open a professionally designed PDF from a publisher. Hold yours next to it. Where does yours fall short? Fix those specific things.',
    ]} />

    <SectionHeading>From Checklist to Habit</SectionHeading>
    <Text style={styles.body}>
      The first time through this checklist takes effort. By the third document, it becomes muscle memory. You'll register custom fonts automatically, reach for your design tokens without thinking, and notice spacing inconsistencies at a glance. The goal isn't to check boxes forever – it's to internalize what premium looks like so your first drafts start closer to the finish line.
    </Text>

    <TipBox label="The Design System Payoff">
      If you built your theme.ts correctly and pages consume it directly or through shared styles and components, most of this checklist is satisfied automatically. The design system isn't extra work – it's the shortcut that makes every page look premium by default.
    </TipBox>
  </ContentPage>
);

export default Page;
