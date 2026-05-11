import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, fonts, fontScale, fontWeight, lineHeight, iconSize } from '../../styles/theme';
import { ContentPage, SectionHeading, CheckIcon } from '../../components';

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
      <SectionHeading>Premium Checklist</SectionHeading>
      <Text style={styles.body}>
        Every item below is concrete and verifiable. A PDF that hits all of these looks intentionally designed – not generated.
      </Text>

      <Text style={local.checklistCategory}>Typography</Text>
      <ChecklistItem>Custom font registered (not default Helvetica/Arial)</ChecklistItem>
      <ChecklistItem>3+ distinct text sizes used with clear hierarchy</ChecklistItem>
      <ChecklistItem>Consistent heading styles across all pages</ChecklistItem>
      <ChecklistItem>Body text at readable size (10-12pt) with 1.5-1.6 line height</ChecklistItem>
      <ChecklistItem>Code blocks in monospace font with background color</ChecklistItem>

      <Text style={local.checklistCategory}>Color & Visual</Text>
      <ChecklistItem>Color palette limited to 3-5 intentional colors</ChecklistItem>
      <ChecklistItem>Primary color for headings and emphasis areas</ChecklistItem>
      <ChecklistItem>Accent color for highlights, callout borders, interactive elements</ChecklistItem>
      <ChecklistItem>Neutral scale for body text, borders, and backgrounds</ChecklistItem>
      <ChecklistItem>Color used for meaning, not decoration</ChecklistItem>
  </ContentPage>
);

export default Page;
