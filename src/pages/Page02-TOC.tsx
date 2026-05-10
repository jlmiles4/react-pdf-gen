/**
 * Page 2 — Table of Contents
 *
 * Custom layout with four category groups (Foundations, Design System, Craft, Shipping),
 * each with a colored badge and chapter entries showing number, title, and subtitle.
 * Uses its own Page (not ContentPage) with Footer only.
 *
 * Renders: 1 page
 */
import React from 'react';
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, spacing, page, borders, typography, fontScale, letterSpacing, layout, fontWeight, lineHeight } from '../styles/theme';
import { Footer, AccentBar } from '../components';
import { tocGroups } from '../registry';
import { getTocPositions } from '../tocPositions';

// Define the order and styles for groups
const GROUP_CONFIG: Record<string, { color: string }> = {
  'FOUNDATIONS': { color: colors.primary[600] },
  'DESIGN SYSTEM': { color: colors.accent[600] },
  'CRAFT': { color: colors.success },
  'SHIPPING': { color: colors.info },
};

const s = StyleSheet.create({
  page: {
    paddingTop: page.margin.top,
    paddingBottom: page.margin.bottom,
    paddingHorizontal: page.margin.left,
    backgroundColor: colors.white,
  },
  heading: {
    fontSize: typography.h1.fontSize,
    fontFamily: fonts.heading,
    fontWeight: fontWeight.bold,
    color: colors.primary[800],
    marginBottom: spacing.xs,
  },
  groupContainer: {
    marginBottom: spacing.sm,
  },
  groupLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  groupBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borders.radius.sm,
  },
  groupLabel: {
    fontSize: fontScale.navSmall,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.white,
    letterSpacing: letterSpacing.normal,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.xs + spacing.xxs,
    paddingLeft: spacing.sm,
    borderBottomWidth: borders.thin,
    borderBottomColor: colors.neutral[100],
  },
  entryNum: {
    width: layout.tocEntryNumWidth,
    fontSize: fontScale.subtitle,
    fontFamily: fonts.heading,
    fontWeight: fontWeight.bold,
    color: colors.accent[500],
    marginRight: spacing.sm,
  },
  entryText: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  entryTitle: {
    fontSize: fontScale.label,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.primary[800],
    marginBottom: spacing.micro,
  },
  entrySubtitle: {
    fontSize: typography.code.fontSize,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[500],
    lineHeight: lineHeight.snug,
  },
  entryPage: {
    width: layout.tocEntryNumWidth,
    fontSize: fontScale.subtitle,
    fontFamily: fonts.heading,
    fontWeight: fontWeight.semibold,
    color: colors.neutral[600],
    textAlign: 'right',
    paddingTop: spacing.xxs,
  },
});

const Page02TOC: React.FC = () => {
  const positions = getTocPositions();
  return (
    <Page size="LETTER" style={s.page}>
      <Text style={s.heading}>Contents</Text>
      <AccentBar size="md" />
      {Object.entries(tocGroups).map(([groupLabel, chapters]) => {
        const config = GROUP_CONFIG[groupLabel] || { color: colors.neutral[500] };
        return (
          <View key={groupLabel} style={s.groupContainer}>
            <View style={s.groupLabelRow}>
              <View style={[s.groupBadge, { backgroundColor: config.color }]}>
                <Text style={s.groupLabel}>{groupLabel}</Text>
              </View>
            </View>
            {chapters.map((ch) => (
              <View key={ch.num} style={s.entry}>
                <Text style={s.entryNum}>{ch.num}</Text>
                <View style={s.entryText}>
                  <Text style={s.entryTitle}>{ch.title}</Text>
                  <Text style={s.entrySubtitle}>{ch.subtitle}</Text>
                </View>
                <Text style={s.entryPage}>{positions[ch.num] ?? ''}</Text>
              </View>
            ))}
          </View>
        );
      })}
      <Footer />
    </Page>
  );
};

export default Page02TOC;
