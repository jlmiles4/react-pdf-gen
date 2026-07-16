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
import { chapterDestinationId } from '../manifest';
import { colors, fonts, spacing, page, fontScale, typography, letterSpacing, layout, fontWeight, lineHeight, opacity } from '../styles/theme';
import AccentBar from './AccentBar';

interface PageNumberRenderArgs {
  pageNumber: number;
}

const noHyphenation = (word: string) => [word];

interface ChapterTitleProps {
  number: string;
  title: string;
  subtitle?: string;
}

const RINGS_SIZE = layout.decorRingsSize;
// Ring cluster sits past the bottom-right page corner so only arcs show.
const RINGS_OFFSET = -(spacing.xxxl + spacing.xs); // -52pt off-page overshoot
const RING_CENTER = 190; // off-center in the 240×240 viewBox so the larger rings clip at its edges
const RINGS = [
  { radius: 50, strokeWidth: 1.5 },
  { radius: 90, strokeWidth: 1 },
  { radius: 135, strokeWidth: 0.75 },
] as const;
// Subtitle measure: slightly wider than body maxTextWidth so two lines rag nicely.
const SUBTITLE_MAX_WIDTH = layout.maxTextWidth + spacing.sm; // ≈428pt

const ctStyles = StyleSheet.create({
  page: {
    minHeight: page.height,
    backgroundColor: colors.primary[800],
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: page.margin.left + page.chapterPaddingExtra,
  },
  // Renders "CHAPTER NN" via textTransform — the exact standalone line
  // src/build.tsx's TOC extraction regex matches (case-sensitively). The
  // uppercase transform and the "Chapter {number}" text are load-bearing:
  // change either only together with the regex in build.tsx.
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
    lineHeight: lineHeight.tight,
    marginBottom: spacing.md,
    maxWidth: layout.maxHeroWidth,
  },
  subtitle: {
    fontSize: typography.h4.fontSize,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[300],
    lineHeight: lineHeight.normal,
    maxWidth: SUBTITLE_MAX_WIDTH,
  },
  decorRings: {
    position: 'absolute',
    right: RINGS_OFFSET,
    bottom: RINGS_OFFSET,
    width: RINGS_SIZE,
    height: RINGS_SIZE,
  },
  pageNumber: {
    position: 'absolute',
    bottom: page.coverMargin.bottom,
    left: page.margin.left + page.chapterPaddingExtra,
    fontSize: fontScale.chromeLabel,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.accent[400],
    opacity: opacity.muted,
    letterSpacing: letterSpacing.wide,
  },
});

const ChapterTitle: React.FC<ChapterTitleProps> = ({ number, title, subtitle }) => (
  <Page id={chapterDestinationId(number)} size="LETTER" style={ctStyles.page} wrap={false}>
    <AccentBar size="lg" mb={spacing.lg} />
    <Text style={ctStyles.chapterLabel}>Chapter {number}</Text>
    <Text style={ctStyles.title} hyphenationCallback={noHyphenation}>{title}</Text>
    {subtitle && <Text style={ctStyles.subtitle}>{subtitle}</Text>}
    <Svg style={ctStyles.decorRings} viewBox={`0 0 ${RINGS_SIZE} ${RINGS_SIZE}`}>
      <G opacity={opacity.decor}>
        {RINGS.map(({ radius, strokeWidth }) => (
          <Circle
            key={radius}
            cx={RING_CENTER}
            cy={RING_CENTER}
            r={radius}
            stroke={colors.accent[500]}
            strokeWidth={strokeWidth}
            fill="none"
          />
        ))}
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
