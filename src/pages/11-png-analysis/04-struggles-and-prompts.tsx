import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, iconSize } from '../../styles/theme';
import { ContentPage, CodeBlock, SectionHeading } from '../../components';
import { XIcon } from '../../components/Icons';

const local = StyleSheet.create({
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
});

const Page: React.FC = () => (
  <ContentPage sectionTitle="AI Visual Analysis" wrap={false}>
    <SectionHeading>What AI Struggles With</SectionHeading>
    {[
      'Exact pixel measurements (estimates within ~5-10%)',
      'Precise color matching (close, not pixel-perfect)',
      'Specific font identification',
      'Reading small text at low DPI',
      'Distinguishing very similar shades',
    ].map((item, i) => (
      <View key={i} wrap={false} style={local.checklistRow}>
        <XIcon size={iconSize.xs} color={colors.error} />
        <Text style={styles.bodySmall}>{item}</Text>
      </View>
    ))}

    <Text style={styles.body}>
      Here's what matters: AI catches relative problems, not absolute ones. It'll tell you "this heading looks different from that heading" but not "this margin is exactly 24px." Use it for what it's good at — alignment, spacing rhythm, visual hierarchy, broken elements — and verify exact values in your code.
    </Text>

    <SectionHeading>Three Review Prompts That Work</SectionHeading>
    <Text style={styles.body}>
      Chapter 6 covered prompts that <Text style={styles.bold}>generate</Text> pages. These are different — they ask AI to <Text style={styles.bold}>review</Text> a page that already exists. Single-axis prompts get you specifics:
    </Text>
    <CodeBlock language="text">{`SPACING: "Look at this PDF page. Are the vertical gaps
between sections consistent? Are any two adjacent
elements too close together or too far apart?"

HIERARCHY: "This page should have 4 levels of text:
page title (largest), section headings, body text,
and captions (smallest). Can you clearly identify all
4 levels? Are any two levels too similar in size?"

CONSISTENCY: "Here are pages 3 and 4 of the same
document. Do the headers look identical? Are the
margins the same? Do the callout boxes use the same
styling? Flag any inconsistencies between the pages."`}</CodeBlock>
  </ContentPage>
);

export default Page;
