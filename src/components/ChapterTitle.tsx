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
import { Page, View, Text, StyleSheet, Svg, Circle } from '@react-pdf/renderer';
import { colors, fonts, spacing, page, borders, fontScale, typography } from '../styles/theme';

// Disable hyphenation for chapter titles to prevent ugly word breaks
const noHyphenation = (word: string) => [word];

interface ChapterTitleProps {
  number: string;
  title: string;
  subtitle?: string;
}

const ctStyles = StyleSheet.create({
  page: {
    backgroundColor: colors.primary[800],
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: page.margin.left + page.chapterPaddingExtra,
  },
  accentBar: {
    width: 60,
    height: 4,
    backgroundColor: colors.accent[500],
    marginBottom: spacing.lg,
    borderRadius: borders.radius.sm,
  },
  chapterLabel: {
    fontSize: fontScale.label,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.accent[400],
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontScale.pageTitle,
    fontFamily: fonts.heading,
    fontWeight: 700 as const,
    color: colors.white,
    lineHeight: 1.15,
    marginBottom: spacing.md,
    maxWidth: 460,
  },
  subtitle: {
    fontSize: typography.h4.fontSize,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[300],
    lineHeight: 1.5,
    maxWidth: 430,
  },
  decorRings: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 240,
    height: 240,
    opacity: 0.08,
  },
});

const ChapterTitle: React.FC<ChapterTitleProps> = ({ number, title, subtitle }) => (
  <Page size="LETTER" style={ctStyles.page}>
    <View style={ctStyles.accentBar} />
    <Text style={ctStyles.chapterLabel}>Chapter {number}</Text>
    <Text style={ctStyles.title} hyphenationCallback={noHyphenation}>{title}</Text>
    {subtitle && <Text style={ctStyles.subtitle}>{subtitle}</Text>}
    <Svg style={ctStyles.decorRings} viewBox="0 0 240 240">
      <Circle cx="190" cy="190" r="50" stroke={colors.accent[500]} strokeWidth="1.5" fill="none" />
      <Circle cx="190" cy="190" r="90" stroke={colors.accent[500]} strokeWidth="1" fill="none" />
      <Circle cx="190" cy="190" r="135" stroke={colors.accent[500]} strokeWidth="0.75" fill="none" />
    </Svg>
  </Page>
);

export default ChapterTitle;
