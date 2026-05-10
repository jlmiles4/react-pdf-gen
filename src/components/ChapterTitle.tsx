/**
 * ChapterTitle — Full-page chapter divider
 *
 * Dark navy full-bleed page with gold accent bar, "CHAPTER NN" label,
 * large white title, gray subtitle, and decorative SVG circle in the corner.
 * Renders as its own <Page> — no header or footer.
 *
 * Props: number (string "01"-"12"), title, subtitle (optional)
 */
import React from 'react';
import { Page, Text, StyleSheet, Svg, Circle, G } from '@react-pdf/renderer';
import { colors, fonts, spacing, page, fontScale, typography, letterSpacing, layout, fontWeight, opacity } from '../styles/theme';
import AccentBar from './AccentBar';

interface PageNumberRenderArgs {
  pageNumber: number;
  totalPages: number;
}

const noHyphenation = (word: string) => [word];

interface ChapterTitleProps {
  number: string;
  title: string;
  subtitle?: string;
}

const RINGS_SIZE = layout.decorRingsSize;

const ctStyles = StyleSheet.create({
  page: {
    backgroundColor: colors.primary[800],
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: page.margin.left + page.chapterPaddingExtra,
  },
  chapterLabel: {
    fontSize: fontScale.label,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.accent[400],
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.wider,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontScale.pageTitle,
    fontFamily: fonts.heading,
    fontWeight: fontWeight.bold,
    color: colors.white,
    lineHeight: typography.h1.lineHeight,
    marginBottom: spacing.md,
    maxWidth: layout.maxHeroWidth,
  },
  subtitle: {
    fontSize: typography.h4.fontSize,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[300],
    lineHeight: typography.bodySmall.lineHeight,
    maxWidth: layout.maxTextWidth + spacing.sm, // 428pt approx
  },
  decorRings: {
    position: 'absolute',
    right: -spacing.xxxl - spacing.xs,
    bottom: -spacing.xxxl - spacing.xs,
    width: RINGS_SIZE,
    height: RINGS_SIZE,
  },
  pageNumber: {
    position: 'absolute',
    bottom: page.coverMargin.bottom,
    left: page.margin.left + page.chapterPaddingExtra,
    fontSize: typography.codeSmall.fontSize,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.accent[400],
    opacity: opacity.muted,
    letterSpacing: letterSpacing.wide,
  },
});

const ChapterTitle: React.FC<ChapterTitleProps> = ({ number, title, subtitle }) => (
  <Page size="LETTER" style={ctStyles.page}>
    <AccentBar size="lg" mb={spacing.lg} />
    <Text style={ctStyles.chapterLabel}>Chapter {number}</Text>
    <Text style={ctStyles.title} hyphenationCallback={noHyphenation}>{title}</Text>
    {subtitle && <Text style={ctStyles.subtitle}>{subtitle}</Text>}
    <Svg style={ctStyles.decorRings} viewBox={`0 0 ${RINGS_SIZE} ${RINGS_SIZE}`}>
      <G opacity={opacity.decor}>
        <Circle cx="190" cy="190" r="50" stroke={colors.accent[500]} strokeWidth="1.5" fill="none" />
        <Circle cx="190" cy="190" r="90" stroke={colors.accent[500]} strokeWidth="1" fill="none" />
        <Circle cx="190" cy="190" r="135" stroke={colors.accent[500]} strokeWidth="0.75" fill="none" />
      </G>
    </Svg>
    <Text
      style={ctStyles.pageNumber}
      render={({ pageNumber }: PageNumberRenderArgs) => String(pageNumber)}
      fixed
    />
  </Page>
);

export default ChapterTitle;
