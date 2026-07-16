/**
 * Page 2 – Table of Contents
 *
 * Custom layout with four category groups (Foundations, Design System, Craft, Shipping),
 * each with a colored badge and clickable chapter entries showing number, title,
 * subtitle, and page number (via src/tocPositions.ts reading
 * output/toc-positions.json, populated by the two-pass build). Each row links to the
 * matching ChapterTitle destination. Uses its own Page (not ContentPage) with Footer only.
 *
 * Renders from src/manifest.ts (Top-Down Architecture)
 */
import React from 'react';
import { Link, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, spacing, page, borders, typography, fontScale, letterSpacing, layout, fontWeight, lineHeight } from '../../styles/theme';
import { Footer, AccentBar } from '../../components';
import { chapterDestinationId, MANIFEST } from '../../manifest';
import { getTocPositions } from '../../tocPositions';

// Define the order and styles for groups
const GROUP_CONFIG: Record<string, { color: string }> = {
  'FOUNDATIONS': { color: colors.primary[600] },
  'DESIGN_SYSTEM': { color: colors.accent[600] },
  'CRAFT': { color: colors.success },
  'SHIPPING': { color: colors.info },
};

const s = StyleSheet.create({
  page: {
    minHeight: page.height,
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
    color: colors.primary[800],
    textDecoration: 'none',
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
    width: layout.tocPageColWidth,
    fontSize: fontScale.label,
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
    <Page size="LETTER" style={s.page} wrap={false}>
      <Text style={s.heading}>Contents</Text>
      <AccentBar size="md" />
      {MANIFEST.map((group) => {
        const config = GROUP_CONFIG[group.id];
        if (!config) {
          // Fail the build instead of silently rendering a neutral badge for a
          // renamed/added manifest group.
          throw new Error(`TOC: no GROUP_CONFIG entry for manifest group "${group.id}" — add its badge color in src/pages/02-toc/01-toc.tsx`);
        }
        return (
          <View key={group.id} style={s.groupContainer}>
            <View style={s.groupLabelRow}>
              <View style={[s.groupBadge, { backgroundColor: config.color }]}>
                <Text style={s.groupLabel}>{group.title}</Text>
              </View>
            </View>
            {group.chapters.map((ch) => (
              <Link
                key={ch.num}
                src={`#${chapterDestinationId(ch.num)}`}
                wrap={false}
                style={s.entry}
              >
                <Text style={s.entryNum}>{ch.num}</Text>
                <View style={s.entryText}>
                  <Text style={s.entryTitle}>{ch.title}</Text>
                  <Text style={s.entrySubtitle}>{ch.subtitle}</Text>
                </View>
                <Text style={s.entryPage}>{positions[ch.num] ?? ''}</Text>
              </Link>
            ))}
          </View>
        );
      })}
      <Footer />
    </Page>
  );
};

export default Page02TOC;
