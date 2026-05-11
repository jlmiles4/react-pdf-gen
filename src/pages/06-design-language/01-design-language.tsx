import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, fonts, borders, fontScale, fontWeight } from '../../styles/theme';
import { ContentPage, TipBox, SectionHeading } from '../../components';

const local = StyleSheet.create({
  swatchRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  swatch: {
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: borders.radius.md,
  },
  swatchLabel: {
    fontSize: fontScale.micro,
    fontFamily: fonts.mono,
    fontWeight: fontWeight.regular,
    color: colors.neutral[600],
    marginTop: spacing.xs,
    textAlign: 'center',
    width: spacing.xxxl,
  },
  swatchGroup: {
    alignItems: 'center',
  },
});

const swatches = [
  { color: colors.primary[800], label: 'pri-800' },
  { color: colors.primary[500], label: 'pri-500' },
  { color: colors.primary[100], label: 'pri-100' },
  { color: colors.accent[500], label: 'acc-500' },
  { color: colors.accent[100], label: 'acc-100' },
  { color: colors.neutral[800], label: 'neu-800' },
  { color: colors.neutral[400], label: 'neu-400' },
  { color: colors.neutral[100], label: 'neu-100' },
];

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Language" wrap={false}>
      <SectionHeading>Why AI Needs Explicit Design Tokens</SectionHeading>
      <Text style={styles.body}>
        Without a design system, every AI-generated page is a coin flip. The AI picks fontSize 14 on one page and 16 on the next. It uses #333 for body text here and #444 there. The result looks like five different people designed it.
      </Text>
      <Text style={styles.body}>
        A design token file solves this. It's a single source of truth for every visual decision: colors, font sizes, spacing, border radii. You include it in every AI prompt, and the output is automatically consistent.
      </Text>

      <SectionHeading>Color Palette</SectionHeading>
      <Text style={styles.body}>
        Pick one primary color, one accent, and a neutral scale. That's it. Three to five colors handle 95% of document design.
      </Text>

      <View style={local.swatchRow}>
        {swatches.map((s, i) => (
          <View key={i} style={local.swatchGroup}>
            <View style={[local.swatch, { backgroundColor: s.color }]} />
            <Text style={local.swatchLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.body}>
        This book uses navy primary (#121F3D) with amber/gold accent (#F0A000) and slate neutrals. The navy conveys trust and professionalism. The gold adds warmth and draws the eye to important elements.
      </Text>

      <TipBox>
        Use your primary dark shade (800-900) for headings and backgrounds. Use the accent for highlights, callout borders, and chapter numbers. Neutrals handle body text, dividers, and secondary information.
      </TipBox>
  </ContentPage>
);

export default Page;
