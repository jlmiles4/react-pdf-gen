/**
 * Page 14 — Conclusion / Back Cover
 *
 * Full-bleed dark navy page matching the cover's visual weight.
 * Six key takeaways referencing specific chapters, next steps call to action,
 * and author branding. No header or footer — standalone design mirroring the cover.
 *
 * Renders: 1 page
 */
import React from 'react';
import { Page, View, Text, StyleSheet, Svg, Circle, Line } from '@react-pdf/renderer';
import { colors, fonts, spacing, page, borders, fontScale, typography } from '../styles/theme';

const s = StyleSheet.create({
  page: {
    backgroundColor: colors.primary[800],
    justifyContent: 'center',
    paddingHorizontal: page.coverMargin.horizontal,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: page.topBarHeight,
    backgroundColor: colors.accent[500],
  },
  accentLine: {
    width: 64,
    height: 4,
    backgroundColor: colors.accent[500],
    borderRadius: spacing.xxs,
    marginBottom: spacing.xl,
  },
  heading: {
    fontSize: fontScale.pageTitle,
    fontFamily: fonts.heading,
    fontWeight: 700 as const,
    color: colors.white,
    lineHeight: 1.15,
    marginBottom: spacing.md,
  },
  headingAccent: {
    fontWeight: 700 as const,
    color: colors.accent[400],
  },
  subtitle: {
    fontSize: fontScale.contentTitle,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[300],
    lineHeight: 1.6,
    marginBottom: spacing.xl,
    maxWidth: 400,
  },
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  takeawayNum: {
    fontSize: fontScale.sectionTitle,
    fontFamily: fonts.heading,
    fontWeight: 700 as const,
    color: colors.accent[500],
    width: 24,
  },
  takeawayText: {
    flex: 1,
    fontSize: fontScale.bodyMedium,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[200],
    lineHeight: 1.5,
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: colors.accent[500],
    opacity: 0.4,
    marginVertical: spacing.lg,
    borderRadius: spacing.micro,
  },
  ctaText: {
    fontSize: typography.h4.fontSize,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[300],
    lineHeight: 1.6,
    marginBottom: spacing.lg,
    maxWidth: 420,
  },
  ctaBold: {
    fontFamily: fonts.bodyBold,
    fontWeight: 600 as const,
    color: colors.accent[400],
  },
  bottomInfo: {
    position: 'absolute',
    bottom: page.coverMargin.bottom,
    left: page.coverMargin.horizontal,
    right: page.coverMargin.horizontal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: typography.codeSmall.fontSize,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[500],
  },
  decorContainer: {
    position: 'absolute',
    right: 40,
    bottom: 60,
    width: 160,
    height: 160,
    opacity: 0.06,
  },
});

const takeaways = [
  'Structure your project for AI — one file per page, design tokens in one place, components that compose (Ch 3).',
  'Define your design language once — colors, typography, spacing, borders. The theme file enforces consistency so you don\'t have to (Ch 4).',
  'Optimize for token budgets — small, focused files mean small, focused prompts that keep AI in its high-attention zone (Ch 5).',
  'Export to PNG, not PDF — AI vision models see pixels, not PostScript. The QA loop is generate, export, review, fix (Ch 9).',
  'Use the troubleshooting playbook — most issues trace to three things: missing wrap, missing Text wrappers, or flexDirection defaulting to column (Ch 11).',
  'Iterate past the first draft — premium output takes 2-3 passes. Use the recipes and checklists from Chapter 10 to close the gap.',
];

const Page14Conclusion: React.FC = () => (
  <Page size="LETTER" style={s.page}>
    <View style={s.topBar} />
    <View style={s.accentLine} />
    <Text style={s.heading}>
      Now{'\n'}
      <Text style={s.headingAccent}>Ship It.</Text>
    </Text>
    <Text style={s.subtitle}>
      Eleven chapters, from architecture to troubleshooting. You have the patterns, the source code, and the templates. The gap between "AI-generated PDF" and "premium deliverable" is smaller than you think.
    </Text>

    {takeaways.map((text, i) => (
      <View key={i} wrap={false} style={s.takeawayRow}>
        <Text style={s.takeawayNum}>{i + 1}</Text>
        <Text style={s.takeawayText}>{text}</Text>
      </View>
    ))}

    <View style={s.divider} />

    <Text style={s.ctaText}>
      The source code for this entire book is included:{'\n'}
      A design token system (theme.ts) ready to customize.{'\n'}
      A reusable component library — ContentPage, CodeBlock, Table, TipBox, Icons.{'\n'}
      A build and PNG export pipeline.{'\n'}
      AI-optimized reference documentation.{'\n'}
      Clone it. Change the colors. Build your own.{'\n'}
      <Text style={s.ctaBold}>landonmiles.com</Text>
    </Text>

    <Svg style={s.decorContainer} viewBox="0 0 160 160">
      <Circle cx="80" cy="80" r="70" stroke={colors.accent[500]} strokeWidth={1.5} fill="none" />
      <Circle cx="80" cy="80" r="45" stroke={colors.accent[500]} strokeWidth={1} fill="none" />
      <Line x1="10" y1="80" x2="150" y2="80" stroke={colors.accent[500]} strokeWidth={0.5} />
      <Line x1="80" y1="10" x2="80" y2="150" stroke={colors.accent[500]} strokeWidth={0.5} />
    </Svg>
    <View style={s.bottomInfo}>
      <Text style={s.bottomText}>landonmiles.com</Text>
      <Text style={s.bottomText}>React-PDF + AI</Text>
    </View>
  </Page>
);

export default Page14Conclusion;
