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
import { colors, fonts, spacing, page, borders, typography, fontScale } from '../styles/theme';
import Footer from '../components/Footer';

const groups = [
  {
    label: 'FOUNDATIONS',
    color: colors.primary[600],
    chapters: [
      { num: '01', title: 'Introduction', subtitle: 'Why react-pdf + AI, and who this is for' },
      { num: '02', title: 'React-PDF Fundamentals', subtitle: 'Components, styling, and the layout system' },
      { num: '03', title: 'Project Architecture for AI Agents', subtitle: 'File-per-page and modular structure' },
    ],
  },
  {
    label: 'DESIGN SYSTEM',
    color: colors.accent[600],
    chapters: [
      { num: '04', title: 'Specifying a Design Language', subtitle: 'Tokens, palettes, and typography scales' },
      { num: '05', title: 'Tokenization and Context Windows', subtitle: 'How LLMs read your code, and how to optimize' },
      { num: '06', title: 'Avoiding AI Slop', subtitle: 'What makes output look cheap, and how to fix it' },
    ],
  },
  {
    label: 'CRAFT',
    color: colors.success,
    chapters: [
      { num: '07', title: 'Design Challenges and Solutions', subtitle: 'What works, what breaks, and workarounds' },
      { num: '08', title: 'Icons over Emojis', subtitle: 'SVG icons for professional PDF output' },
    ],
  },
  {
    label: 'SHIPPING',
    color: colors.info,
    chapters: [
      { num: '09', title: 'AI Visual Analysis', subtitle: 'PNG export for design QA with AI vision' },
      { num: '10', title: 'Premium Deliverables & Recipes', subtitle: 'Quality checklist, invoices, data-driven pages, and layout patterns' },
      { num: '11', title: 'Troubleshooting & Common Errors', subtitle: 'The errors you\'ll hit and how to fix them' },
    ],
  },
];

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
    fontWeight: 700 as const,
    color: colors.primary[800],
    marginBottom: spacing.xs,
  },
  accentBar: {
    width: 48,
    height: 3,
    backgroundColor: colors.accent[500],
    borderRadius: borders.radius.xs,
    marginBottom: spacing.md,
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
    fontWeight: 600 as const,
    color: colors.white,
    letterSpacing: 1.2,
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
    width: 28,
    fontSize: fontScale.subtitle,
    fontFamily: fonts.heading,
    fontWeight: 700 as const,
    color: colors.accent[500],
    marginRight: spacing.sm,
  },
  entryText: {
    flex: 1,
  },
  entryTitle: {
    fontSize: fontScale.label,
    fontFamily: fonts.bodyBold,
    fontWeight: 600 as const,
    color: colors.primary[800],
    marginBottom: spacing.micro,
  },
  entrySubtitle: {
    fontSize: typography.code.fontSize,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[500],
    lineHeight: 1.4,
  },
});

const Page02TOC: React.FC = () => (
  <Page size="LETTER" style={s.page}>
    <Text style={s.heading}>Contents</Text>
    <View style={s.accentBar} />
    {groups.map((group) => (
      <View key={group.label} style={s.groupContainer}>
        <View style={s.groupLabelRow}>
          <View style={[s.groupBadge, { backgroundColor: group.color }]}>
            <Text style={s.groupLabel}>{group.label}</Text>
          </View>
        </View>
        {group.chapters.map((ch) => (
          <View key={ch.num} style={s.entry}>
            <Text style={s.entryNum}>{ch.num}</Text>
            <View style={s.entryText}>
              <Text style={s.entryTitle}>{ch.title}</Text>
              <Text style={s.entrySubtitle}>{ch.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
    ))}
    <Footer />
  </Page>
);

export default Page02TOC;
