// Group: SHIPPING
// Number: 10
// Title: Premium Deliverables & Recipes
// Subtitle: The checklist that separates a free PDF from a $50 one — plus copy-paste patterns for invoices, data-driven pages, and common layouts.
/**
 * Chapter 10 — Premium Deliverables & Recipes
 *
 * The comprehensive checklist that separates a free PDF from a paid one,
 * plus practical recipes for invoices, data-driven pages, and layout patterns.
 * Five checklist categories (Typography, Color & Visual, Layout & Spacing,
 * Structure & Navigation, Content Components) with specific, verifiable items.
 * Includes quality tests, the design system payoff, free vs. premium comparison,
 * invoice recipe, data-driven recipe, and layout patterns cheat sheet.
 *
 * Sections: Premium Checklist (5 categories), Quality Tests, From Checklist to Habit,
 *           Free vs. Premium at a Glance, Invoice Recipe, Data-Driven Pages,
 *           Layout Patterns Cheat Sheet
 * Components: BulletList, Table, TipBox, CheckIcon, CodeBlock, SectionHeading
 * Renders: 1 chapter title + 6 content pages
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, fontScale, fontWeight, lineHeight, iconSize } from '../styles/theme';
import { ContentPage, ChapterTitle, SectionHeading, CheckIcon } from '../components';

const local = StyleSheet.create({
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: borders.thin,
    borderBottomColor: colors.neutral[100],
  },
  checklistText: {
    flex: 1,
    fontSize: fontScale.bodyMedium,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[800],
    lineHeight: lineHeight.normal,
  },
  checklistCategory: {
    fontSize: fontScale.label,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.primary[700],
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
});

const Ch10Premium: React.FC = () => (
  <>
    <ChapterTitle
      number="10"
      title="Premium Deliverables & Recipes"
      subtitle="The checklist that separates a free PDF from a $50 one — plus copy-paste patterns for invoices, data-driven pages, and common layouts."
    />

    {/* --- Page 1: Premium Checklist --- */}
    <ContentPage sectionTitle="Premium Deliverables & Recipes">
      <SectionHeading>The Premium Checklist</SectionHeading>
      <Text style={styles.body}>
        Every item below is concrete and verifiable. A PDF that hits all of these looks intentionally designed – not generated.
      </Text>

      <Text style={local.checklistCategory}>Typography</Text>
      {[
        'Custom font registered (not default Helvetica/Arial)',
        '3+ distinct text sizes used with clear hierarchy',
        'Consistent heading styles across all pages',
        'Body text at readable size (10-12pt) with 1.5-1.6 line height',
        'Code blocks in monospace font with background color',
      ].map((item, i) => (
        <View key={i} wrap={false} style={local.checklistItem}>
          <CheckIcon size={iconSize.sm} color={colors.success} />
          <Text style={local.checklistText}>{item}</Text>
        </View>
      ))}

      <Text style={local.checklistCategory}>Color & Visual</Text>
      {[
        'Color palette limited to 3-5 intentional colors',
        'Primary color for headings and emphasis areas',
        'Accent color for highlights, callout borders, interactive elements',
        'Neutral scale for body text, borders, and backgrounds',
        'Color used for meaning, not decoration',
      ].map((item, i) => (
        <View key={i} wrap={false} style={local.checklistItem}>
          <CheckIcon size={iconSize.sm} color={colors.success} />
          <Text style={local.checklistText}>{item}</Text>
        </View>
      ))}

      <Text style={local.checklistCategory}>Layout & Spacing</Text>
      {[
        'Generous page margins (50-70pt on all sides)',
        'Consistent spacing scale used throughout (4pt grid)',
        'Whitespace used intentionally – pages don\'t feel cramped',
        'No orphaned single lines at page breaks',
        'Visual breaks between major sections',
      ].map((item, i) => (
        <View key={i} wrap={false} style={local.checklistItem}>
          <CheckIcon size={iconSize.sm} color={colors.success} />
          <Text style={local.checklistText}>{item}</Text>
        </View>
      ))}

      <Text style={local.checklistCategory}>Structure & Navigation</Text>
      {[
        'Cover page with strong visual identity',
        'Table of contents with chapter listing',
        'Page numbers on every content page',
        'Headers with section context',
        'Footer with branding',
        'Chapter title pages with distinct design',
      ].map((item, i) => (
        <View key={i} wrap={false} style={local.checklistItem}>
          <CheckIcon size={iconSize.sm} color={colors.success} />
          <Text style={local.checklistText}>{item}</Text>
        </View>
      ))}

      <Text style={local.checklistCategory}>Content Components</Text>
      {[
        'Callout boxes for tips, warnings, and key information',
        'Styled code blocks with language labels',
        'Professional tables with header rows and alternating colors',
        'SVG icons (not emojis) for visual elements',
        'Bullet lists with consistent formatting',
        'Document metadata set (title, author, subject)',
      ].map((item, i) => (
        <View key={i} wrap={false} style={local.checklistItem}>
          <CheckIcon size={iconSize.sm} color={colors.success} />
          <Text style={local.checklistText}>{item}</Text>
        </View>
      ))}
    </ContentPage>
  </>
);

export default Ch10Premium;
