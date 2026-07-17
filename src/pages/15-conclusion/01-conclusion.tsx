/**
 * Conclusion / Back Cover
 *
 * Full-bleed dark navy page matching the cover's visual weight.
 * Seven key takeaways referencing specific chapters, a bulleted list of what
 * ships with the book, and a closing call to action. No standard Header/Footer
 * components – a cover-style bottom strip carries the brand and page number.
 *
 * Renders: 1 page
 */
import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, spacing, page, borders, fontScale, typography, layout, accentBar, fontWeight, lineHeight, opacity } from '../../styles/theme';
import { AccentBar, BulletList, CoverDecor } from '../../components';

// Subtitle measure, slightly narrower than body maxTextWidth for the hero rag.
const SUBTITLE_MAX_WIDTH = layout.maxTextWidth - spacing.xl; // ≈396pt

const s = StyleSheet.create({
  page: {
    minHeight: page.height,
    backgroundColor: colors.primary[800],
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    justifyContent: 'center',
    paddingHorizontal: page.coverMargin.horizontal,
  },
  // Cover/back-cover chrome (topBar + bottomInfo/bottomText) is deliberately
  // duplicated in 01-cover/01-cover.tsx — only these two pages use it. Keep
  // the two files in sync when changing it.
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: page.topBarHeight,
    backgroundColor: colors.accent[500],
  },
  heading: {
    fontSize: fontScale.pageTitle,
    fontFamily: fonts.heading,
    fontWeight: fontWeight.bold,
    color: colors.white,
    lineHeight: lineHeight.tight,
  },
  headingAccent: {
    fontWeight: fontWeight.bold,
    color: colors.accent[400],
  },
  headingGap: {
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontScale.contentTitle,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[300],
    lineHeight: lineHeight.relaxed,
    marginBottom: spacing.xl,
    maxWidth: SUBTITLE_MAX_WIDTH,
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
    fontWeight: fontWeight.bold,
    color: colors.accent[500],
    width: spacing.xl,
  },
  takeawayText: {
    flex: 1,
    fontSize: fontScale.bodyMedium,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[200],
    lineHeight: lineHeight.normal,
  },
  divider: {
    width: accentBar.md.width,
    height: layout.dividerHeight,
    backgroundColor: colors.accent[500],
    opacity: opacity.muted,
    marginVertical: spacing.lg,
    borderRadius: borders.radius.xs,
  },
  ctaIntro: {
    fontSize: typography.h4.fontSize,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.white,
    lineHeight: typography.h4.lineHeight,
    marginBottom: spacing.sm,
  },
  ctaItem: {
    fontSize: fontScale.bodyMedium,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[300],
    lineHeight: lineHeight.normal,
    maxWidth: layout.maxTextWidth,
  },
  ctaClose: {
    fontSize: fontScale.contentTitle,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.white,
    lineHeight: typography.h4.lineHeight,
    marginTop: spacing.md,
  },
  ctaCloseAccent: {
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
    fontSize: fontScale.chromeLabel,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[500],
  },
});

const takeaways = [
  'Structure your project for AI – one file per page, design tokens in one place, components that compose (Ch 3).',
  'Define your design language once – colors, typography, spacing, borders. The theme file enforces consistency so you don\'t have to (Ch 4).',
  'Optimize for token budgets – small, focused files mean small, focused prompts that keep AI in its high-attention zone (Ch 5).',
  'Export to PNG for visual QA – controlled rasterization gives AI a consistent view of reader-visible layout. The loop is generate, export, review, fix (Ch 9).',
  'Iterate past the first draft – premium output takes 2-3 passes. Use the recipes and checklists from Chapter 10 to close the gap.',
  'Troubleshoot methodically – check fixed-page overflow, missing Text wrappers, unsupported styles, and column-default flexbox (Ch 11).',
  'Automate your workflow – use Markdown for content, shared components for styling, and explicit markers for page breaks (Ch 12).',
];

const Conclusion: React.FC = () => (
  <Page size="LETTER" style={s.page} wrap={false}>
    <View style={s.topBar} />
    <AccentBar size="xl" mb={spacing.xl} />
    <Text style={s.heading}>Now</Text>
    <Text style={[s.heading, s.headingAccent, s.headingGap]}>Ship It.</Text>
    <Text style={s.subtitle}>
      Twelve chapters, from architecture to automation. You have the patterns, the source code, and the templates. The distance between a basic AI-generated PDF and a high-end, professional deliverable is shorter than you think.
    </Text>

    {takeaways.map((text, i) => (
      <View key={i} wrap={false} style={s.takeawayRow}>
        <Text style={s.takeawayNum}>{i + 1}</Text>
        <Text style={s.takeawayText}>{text}</Text>
      </View>
    ))}

    <View style={s.divider} />

    <Text style={s.ctaIntro}>The source code for this entire book is included:</Text>
    <BulletList
      wrap={false}
      items={[
        <Text style={s.ctaItem}>A design token system (theme.ts) ready to customize.</Text>,
        <Text style={s.ctaItem}>A reusable component library – ContentPage, CodeBlock, Table, TipBox, Icons.</Text>,
        <Text style={s.ctaItem}>A build and PNG export pipeline.</Text>,
        <Text style={s.ctaItem}>AI-optimized reference documentation.</Text>,
      ]}
    />
    <Text style={s.ctaClose}>
      Clone it. Change the colors. <Text style={s.ctaCloseAccent}>Build your own.</Text>
    </Text>

    <CoverDecor opacity={opacity.decorSubtle} />
    <View style={s.bottomInfo}>
      <Text style={s.bottomText}>landonmiles.com</Text>
      <Text
        style={s.bottomText}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </View>
  </Page>
);

export default Conclusion;
