/**
 * ChecklistItem / ChecklistCategory — premium-checklist primitives
 *
 * A check-icon + body row (ChecklistItem) and the category sub-heading above a
 * run of items (ChecklistCategory). Shared by the Ch10 premium-checklist pages
 * so the checklist visuals live in one place. wrap={false} keeps each row whole.
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fonts, fontScale, fontWeight, lineHeight, iconSize } from '../styles/theme';
import { CheckIcon } from './Icons';

const local = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  text: {
    flex: 1,
    fontSize: fontScale.bodyMedium,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[800],
    lineHeight: lineHeight.normal,
  },
  category: {
    fontSize: fontScale.label,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.primary[700],
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
});

export const ChecklistItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View wrap={false} style={local.item}>
    <CheckIcon size={iconSize.sm} color={colors.success} />
    <Text style={local.text}>{children}</Text>
  </View>
);

export const ChecklistCategory: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={local.category}>{children}</Text>
);
