import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, fontScale } from '../styles/theme';
import { ContentPage, BulletList, TipBox, Table, SectionHeading } from '../components';

const Ch10Quality: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes">
    <SectionHeading>The Quality Tests</SectionHeading>
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
      If you built your theme.ts correctly and every page imports from it, most of this checklist is satisfied automatically. The design system isn't extra work – it's the shortcut that makes every page look premium by default.
    </TipBox>

    <View wrap={false}>
      <SectionHeading>Free vs. Premium at a Glance</SectionHeading>
      <Table
        headers={['Signal', 'Free / Generic', 'Premium / Polished']}
        rows={[
          ['Fonts', 'Default Helvetica', 'Custom registered typeface'],
          ['Colors', 'Random hex values', 'Systematic palette with intent'],
          ['Spacing', 'Inconsistent margins', 'Spacing scale (4pt grid)'],
          ['Components', 'Plain text + emoji', 'Styled boxes with SVG icons'],
          ['Hierarchy', 'Everything same size', 'Clear heading scale with accents'],
        ]}
        columnWidths={['20%', '35%', '45%']}
      />
    </View>

    <View style={styles.dividerAccent} />

    <SectionHeading>Recipes & Templates</SectionHeading>
    <Text style={styles.body}>
      The checklist tells you what premium looks like. These recipes show you how to build it. Each pattern uses the design tokens from Chapter 4, the shared components from Chapter 3, and the Table component from Chapter 7 — if you're starting here, review those chapters first or clone the source code.
    </Text>
    <Text style={styles.body}>
      Three recipes follow: an invoice component (the most-requested PDF use case), a data-driven page generator, and a layout patterns cheat sheet. Each is a self-contained pattern you can copy into your project and customize.
    </Text>
  </ContentPage>
);

export default Ch10Quality;
