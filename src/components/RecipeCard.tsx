/**
 * RecipeCard — Bordered card with title + content, used for "recipe" or
 * "pattern" entries (Ch07 design challenges, Ch10 layout patterns).
 *
 * Neutral-50 background, neutral-200 border, medium-radius. Optional `icon`
 * renders to the left of the title (typically <CheckIcon> / <XIcon> sized
 * via iconSize.sm). `wrap={false}` so the card never splits across pages.
 *
 * Props:
 *   - title:    card heading
 *   - icon?:    leading icon element (already sized + colored by caller)
 *   - children: card body
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, fontScale, fontWeight } from '../styles/theme';

interface RecipeCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const s = StyleSheet.create({
  card: {
    borderWidth: borders.medium,
    borderColor: colors.neutral[200],
    borderRadius: borders.radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.neutral[50],
  },
  title: {
    fontSize: fontScale.contentTitle,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.primary[700],
    marginBottom: spacing.sm,
  },
});

const RecipeCard: React.FC<RecipeCardProps> = ({ title, icon, children }) => (
  <View wrap={false} style={s.card}>
    {icon ? (
      <View style={styles.iconRow}>
        {icon}
        <Text style={s.title}>{title}</Text>
      </View>
    ) : (
      <Text style={s.title}>{title}</Text>
    )}
    {children}
  </View>
);

export default RecipeCard;
