/**
 * SectionBanner — Dark navy hero card
 *
 * A prominent introduction block for major topics within a page.
 * Dark navy (primary[800]) rounded card with gold accent bar, white title,
 * and optional gray subtitle. Uses wrap={false} to prevent splitting.
 *
 * Props: title (string), subtitle (optional string)
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, spacing, borders, fontScale, typography, fontWeight } from '../styles/theme';
import AccentBar from './AccentBar';

interface SectionBannerProps {
  title: string;
  subtitle?: string;
}

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.primary[800],
    borderRadius: borders.radius.md,
    padding: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  title: {
    fontSize: fontScale.sectionTitle,
    fontFamily: fonts.heading,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontScale.labelSmall,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[300],
    lineHeight: typography.bodySmall.lineHeight,
  },
});

const SectionBanner: React.FC<SectionBannerProps> = ({ title, subtitle }) => (
  <View wrap={false} style={s.container}>
    <AccentBar size="sm" mb={spacing.sm} />
    <Text style={s.title}>{title}</Text>
    {subtitle && <Text style={s.subtitle}>{subtitle}</Text>}
  </View>
);

export default SectionBanner;
