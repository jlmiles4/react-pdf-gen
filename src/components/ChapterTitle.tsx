/**
 * ChapterTitle — Full-page chapter divider
 *
 * Dark navy full-bleed page with gold accent bar, "CHAPTER NN" label,
 * large white title, gray subtitle, and decorative SVG circle in the corner.
 * Renders as its own <Page> — no header or footer.
 *
 * Props: number (string "01"-"11"), title, subtitle (optional)
 */
import React from 'react';
import { Page, Text, StyleSheet, Svg, Circle, G } from '@react-pdf/renderer';
import { colors, fonts, spacing, page, fontScale, typography, letterSpacing } from '../styles/theme';
import AccentBar from './AccentBar';

const noHyphenation = (word: string) => [word];

interface ChapterTitleProps {
  number: string;
  title: string;
  subtitle?: string;
}

const RINGS_SIZE = 240;

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
    fontWeight: 400 as const,
    color: colors.accent[400],
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.wider,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontScale.pageTitle,
    fontFamily: fonts.heading,
    fontWeight: 700 as const,
    color: colors.white,
    lineHeight: typography.h1.lineHeight,
    marginBottom: spacing.md,
    maxWidth: 460,
  },
  subtitle: {
    fontSize: typography.h4.fontSize,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[300],
    lineHeight: typography.bodySmall.lineHeight,
    maxWidth: 430,
  },
  decorRings: {
    position: 'absolute',
    right: -spacing.xxxl - spacing.xs,
    bottom: -spacing.xxxl - spacing.xs,
    width: RINGS_SIZE,
    height: RINGS_SIZE,
  },
});

const ChapterTitle: React.FC<ChapterTitleProps> = ({ number, title, subtitle }) => (
  <Page size="LETTER" style={ctStyles.page}>
    <AccentBar size="lg" mb={spacing.lg} />
    <Text style={ctStyles.chapterLabel}>Chapter {number}</Text>
    <Text style={ctStyles.title} hyphenationCallback={noHyphenation}>{title}</Text>
    {subtitle && <Text style={ctStyles.subtitle}>{subtitle}</Text>}
    <Svg style={ctStyles.decorRings} viewBox="0 0 240 240">
      <G opacity={0.08}>
        <Circle cx="190" cy="190" r="50" stroke={colors.accent[500]} strokeWidth="1.5" fill="none" />
        <Circle cx="190" cy="190" r="90" stroke={colors.accent[500]} strokeWidth="1" fill="none" />
        <Circle cx="190" cy="190" r="135" stroke={colors.accent[500]} strokeWidth="0.75" fill="none" />
      </G>
    </Svg>
  </Page>
);

export default ChapterTitle;
