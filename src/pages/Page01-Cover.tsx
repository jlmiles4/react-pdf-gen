/**
 * Page 1 — Cover Page
 *
 * Full-bleed dark navy background with gold accent bar, book title ("React-PDF + AI"),
 * subtitle, author name, and decorative SVG geometric element.
 * No header or footer — standalone design.
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
  title: {
    fontSize: fontScale.coverTitle,
    fontFamily: fonts.heading,
    fontWeight: 700 as const,
    color: colors.white,
    lineHeight: 1.1,
    marginBottom: spacing.md,
  },
  titleAccent: {
    fontSize: fontScale.coverTitle,
    fontFamily: fonts.heading,
    fontWeight: 700 as const,
    color: colors.accent[400],
  },
  subtitle: {
    fontSize: fontScale.subtitle,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[300],
    lineHeight: 1.5,
    marginBottom: spacing.xxxl,
    maxWidth: 360,
  },
  author: {
    fontSize: typography.h4.fontSize,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[400],
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  decorContainer: {
    position: 'absolute',
    right: 40,
    bottom: 60,
    width: 160,
    height: 160,
    opacity: 0.08,
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
});

const Page01Cover: React.FC = () => (
  <Page size="LETTER" style={s.page}>
    <View style={s.topBar} />
    <View style={s.accentLine} />
    <Text style={s.title}>
      React-PDF{'\n'}
      <Text style={s.titleAccent}>+ AI</Text>
    </Text>
    <Text style={s.subtitle}>
      The builder's guide to premium PDF generation.{'\n'}
      Practical patterns for developers who ship.
    </Text>
    <Text style={s.author}>Landon Miles</Text>
    <Svg style={s.decorContainer} viewBox="0 0 160 160">
      <Circle cx="80" cy="80" r="70" stroke={colors.accent[500]} strokeWidth={1.5} fill="none" />
      <Circle cx="80" cy="80" r="45" stroke={colors.accent[500]} strokeWidth={1} fill="none" />
      <Line x1="10" y1="80" x2="150" y2="80" stroke={colors.accent[500]} strokeWidth={0.5} />
      <Line x1="80" y1="10" x2="80" y2="150" stroke={colors.accent[500]} strokeWidth={0.5} />
    </Svg>
    <View style={s.bottomInfo}>
      <Text style={s.bottomText}>landonmiles.com</Text>
      <Text style={s.bottomText}>2026</Text>
    </View>
  </Page>
);

export default Page01Cover;
