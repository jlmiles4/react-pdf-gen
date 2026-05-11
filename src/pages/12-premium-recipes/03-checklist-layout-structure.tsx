import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fonts, fontScale, fontWeight, lineHeight, iconSize } from '../../styles/theme';
import { ContentPage, CheckIcon } from '../../components';

const local = StyleSheet.create({
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
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

const ChecklistItem = ({ children }: { children: React.ReactNode }) => (
  <View wrap={false} style={local.checklistItem}>
    <CheckIcon size={iconSize.sm} color={colors.success} />
    <Text style={local.checklistText}>{children}</Text>
  </View>
);

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
    <Text style={local.checklistCategory}>Layout & Spacing</Text>
    <ChecklistItem>Generous page margins (50-70pt on all sides)</ChecklistItem>
    <ChecklistItem>Consistent spacing scale used throughout (4pt grid)</ChecklistItem>
    <ChecklistItem>Whitespace used intentionally – pages don't feel cramped</ChecklistItem>
    <ChecklistItem>No orphaned single lines at page breaks</ChecklistItem>
    <ChecklistItem>Visual breaks between major sections</ChecklistItem>

    <Text style={local.checklistCategory}>Structure & Navigation</Text>
    <ChecklistItem>Cover page with strong visual identity</ChecklistItem>
    <ChecklistItem>Table of contents with chapter listing</ChecklistItem>
    <ChecklistItem>Page numbers on every content page</ChecklistItem>
    <ChecklistItem>Headers with section context</ChecklistItem>
    <ChecklistItem>Footer with branding</ChecklistItem>
    <ChecklistItem>Chapter title pages with distinct design</ChecklistItem>

    <Text style={local.checklistCategory}>Content Components</Text>
    <ChecklistItem>Callout boxes for tips, warnings, and key information</ChecklistItem>
    <ChecklistItem>Styled code blocks with language labels</ChecklistItem>
    <ChecklistItem>Professional tables with header rows and alternating colors</ChecklistItem>
    <ChecklistItem>SVG icons (not emojis) for visual elements</ChecklistItem>
    <ChecklistItem>Bullet lists with consistent formatting</ChecklistItem>
    <ChecklistItem>Document metadata set (title, author, subject)</ChecklistItem>
  </ContentPage>
);

export default Page;
