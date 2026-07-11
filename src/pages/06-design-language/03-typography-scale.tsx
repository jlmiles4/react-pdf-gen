import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, fonts, typography, fontWeight } from '../../styles/theme';
import { ContentPage, SectionHeading, CodeBlock } from '../../components';

const local = StyleSheet.create({
  scaleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  scaleLabel: {
    width: spacing.xxxl + spacing.xl,
    fontSize: typography.code.fontSize,
    fontFamily: fonts.mono,
    fontWeight: fontWeight.regular,
    color: colors.neutral[500],
  },
  scaleSize: {
    marginBottom: spacing.none,
    width: spacing.xxxl + spacing.xs,
  },
  scaleUse: {
    flex: 1,
  },
});

const scale = [
  { name: 'display', size: '36pt', use: 'Hero/display text' },
  { name: 'h1', size: '26pt', use: 'Top-level headings' },
  { name: 'h2', size: '20pt', use: 'Section headers' },
  { name: 'h3', size: '16pt', use: 'Subsections' },
  { name: 'h4', size: '13pt', use: 'Labels, small headers' },
  { name: 'body', size: '11pt', use: 'Main reading text' },
  { name: 'bodySmall', size: '9.5pt', use: 'Secondary text' },
  { name: 'caption', size: '8.5pt', use: 'Footnotes, captions' },
  { name: 'code', size: '9pt', use: 'Code blocks' },
  { name: 'codeSmall', size: '8pt', use: 'Dense code, labels' },
];

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Language" wrap={false}>
    <SectionHeading>Typography Scale</SectionHeading>
    <Text style={styles.body}>
      Define every text size upfront. No magic numbers in page components.
      Page chrome – this book's 42pt cover title, 32pt chapter titles – comes
      from a separate fontScale token.
    </Text>

    <View>
      {scale.map((t, i) => (
        <View key={i} style={local.scaleRow}>
          <Text style={local.scaleLabel}>{t.name}</Text>
          <Text style={[styles.body, local.scaleSize]}>{t.size}</Text>
          <Text style={[styles.bodySmall, local.scaleUse]}>{t.use}</Text>
        </View>
      ))}
    </View>

    <SectionHeading>One Source of Truth</SectionHeading>
    <Text style={styles.body}>
      Encode the scale as an object in theme.ts and read every size from it.
      When you tell your AI agent to build a page, it pulls from these tokens –
      so headings stay proportional and nothing drifts into a stray 14.5pt.
    </Text>

    <CodeBlock language="tsx">{`export const typography = {
  display: { fontSize: 36, fontFamily: fonts.heading, fontWeight: fontWeight.bold },
  h2:      { fontSize: 20, fontFamily: fonts.heading, fontWeight: fontWeight.semibold },
  body:    { fontSize: 11, fontFamily: fonts.body, fontWeight: fontWeight.regular },
} as const;`}</CodeBlock>
  </ContentPage>
);

export default Page;
