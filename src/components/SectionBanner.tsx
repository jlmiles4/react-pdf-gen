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
import { colors, fonts, spacing, borders, fontScale } from '../styles/theme';

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
  accentBar: {
    width: 32,
    height: 3,
    backgroundColor: colors.accent[500],
    borderRadius: borders.radius.xs,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontScale.sectionTitle,
    fontFamily: fonts.heading,
    fontWeight: 700 as const,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontScale.labelSmall,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[300],
    lineHeight: 1.5,
  },
});

const SectionBanner: React.FC<SectionBannerProps> = ({ title, subtitle }) => (
  <View wrap={false} style={s.container}>
    <View style={s.accentBar} />
    <Text style={s.title}>{title}</Text>
    {subtitle && <Text style={s.subtitle}>{subtitle}</Text>}
  </View>
);

export default SectionBanner;
