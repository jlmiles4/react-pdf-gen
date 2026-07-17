/**
 * Page 1 – Cover Page
 *
 * Full-bleed dark navy background with gold accent bar, book title ("React-PDF + AI"),
 * subtitle, author name, and decorative SVG geometric element.
 * No header or footer – standalone design.
 *
 * Renders: 1 page
 */
import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, spacing, page, fontScale, typography, letterSpacing, layout, fontWeight, lineHeight } from '../../styles/theme';
import { AccentBar, CoverDecor } from '../../components';

// Subtitle measure, tuned so the two-line rag clears the CoverDecor mark.
const SUBTITLE_MAX_WIDTH = layout.maxHeroWidth - spacing.xl - spacing.xxl; // ≈404pt

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
  // duplicated in 15-conclusion/01-conclusion.tsx — only these two pages use
  // it. Keep the two files in sync when changing it.
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: page.topBarHeight,
    backgroundColor: colors.accent[500],
  },
  title: {
    fontSize: fontScale.coverTitle,
    fontFamily: fonts.heading,
    fontWeight: fontWeight.bold,
    color: colors.white,
    lineHeight: typography.display.lineHeight,
  },
  titleAccent: {
    color: colors.accent[400],
  },
  titleGap: {
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fontScale.subtitle,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[300],
    lineHeight: lineHeight.normal,
    maxWidth: SUBTITLE_MAX_WIDTH,
  },
  subtitleGap: {
    marginBottom: spacing.xxxl,
  },
  author: {
    fontSize: typography.h4.fontSize,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[400],
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
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

const Page01Cover: React.FC = () => (
  <Page size="LETTER" style={s.page} wrap={false}>
    <View style={s.topBar} />
    <AccentBar size="xl" mb={spacing.xl} />
    <Text style={s.title}>React-PDF</Text>
    <Text style={[s.title, s.titleAccent, s.titleGap]}>+ AI</Text>
    <Text style={s.subtitle}>The builder's guide to premium PDF generation.</Text>
    <Text style={[s.subtitle, s.subtitleGap]}>Practical patterns for developers who ship.</Text>
    <Text style={s.author}>Landon Miles</Text>
    <CoverDecor />
    <View style={s.bottomInfo}>
      <Text style={s.bottomText}>landonmiles.com</Text>
      <Text style={s.bottomText}>2026</Text>
    </View>
  </Page>
);

export default Page01Cover;
