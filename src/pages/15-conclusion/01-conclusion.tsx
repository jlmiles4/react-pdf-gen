/**
 * Conclusion / Back Cover
 *
 * Full-bleed dark navy page matching the cover's visual weight.
 * Seven key takeaways referencing specific chapters, next steps call to action,
 * and author branding. No standard Header/Footer components – a cover-style bottom
 * strip carries the brand and page number.
 *
 * Renders: 1 page
 */
import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, spacing, page, borders, fontScale, typography, layout, accentBar, fontWeight, opacity } from '../../styles/theme';
import { AccentBar, CoverDecor } from '../../components';

const s = StyleSheet.create({
  page: {
    minHeight: page.height,
    backgroundColor: colors.primary[800],
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
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
  heading: {
    fontSize: fontScale.pageTitle,
    fontFamily: fonts.heading,
    fontWeight: fontWeight.bold,
    color: colors.white,
    lineHeight: typography.h1.lineHeight,
    marginBottom: spacing.md,
  },
  headingAccent: {
    fontWeight: fontWeight.bold,
    color: colors.accent[400],
  },
  subtitle: {
    fontSize: fontScale.contentTitle,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[300],
    lineHeight: typography.body.lineHeight,
    marginBottom: spacing.xl,
    maxWidth: layout.maxTextWidth - spacing.xl, // 396pt approx
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
    lineHeight: typography.bodySmall.lineHeight,
  },
  divider: {
    width: accentBar.md.width,
    height: layout.dividerHeight,
    backgroundColor: colors.accent[500],
    opacity: opacity.muted,
    marginVertical: spacing.lg,
    borderRadius: borders.radius.xs,
  },
  ctaText: {
    fontSize: typography.h4.fontSize,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[300],
    lineHeight: typography.body.lineHeight,
    marginBottom: spacing.lg,
    maxWidth: layout.maxTextWidth,
  },
  ctaBold: {
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
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
    fontWeight: fontWeight.regular,
    color: colors.neutral[500],
  },
});

const takeaways = [
  'Structure your project for AI – one file per page, design tokens in one place, components that compose (Ch 3).',
  'Define your design language once – colors, typography, spacing, borders. The theme file enforces consistency so you don\'t have to (Ch 4).',
  'Optimize for token budgets – small, focused files mean small, focused prompts that keep AI in its high-attention zone (Ch 5).',
  'Export to PNG for visual QA – controlled rasterization shows AI the same rendered pixels readers see. The loop is generate, export, review, fix (Ch 9).',
  'Iterate past the first draft – premium output takes 2-3 passes. Use the recipes and checklists from Chapter 10 to close the gap.',
  'Use the troubleshooting playbook – most issues trace to three things: missing wrap, missing Text wrappers, or flexDirection defaulting to column (Ch 11).',
  'Automate your workflow – use Markdown for content and let the rendering pipeline handle the layout, so you focus on writing (Ch 12).',
];

const Conclusion: React.FC = () => (
  <Page size="LETTER" style={s.page} wrap={false}>
    <View style={s.topBar} />
    <AccentBar size="xl" mb={spacing.xl} />
    <Text style={s.heading}>
      Now{'\n'}
      <Text style={s.headingAccent}>Ship It.</Text>
    </Text>
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

    <Text style={s.ctaText}>
      The source code for this entire book is included:{'\n'}
      A design token system (theme.ts) ready to customize.{'\n'}
      A reusable component library – ContentPage, CodeBlock, Table, TipBox, Icons.{'\n'}
      A build and PNG export pipeline.{'\n'}
      AI-optimized reference documentation.{'\n'}
      Clone it. Change the colors. Build your own.{'\n'}
      <Text style={s.ctaBold}>landonmiles.com</Text>
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
