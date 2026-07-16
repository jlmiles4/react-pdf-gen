/**
 * IconList — vertical list of icon + text rows
 *
 * A run of `items` each rendered as an icon (passed via the `icon` prop, e.g.
 * CheckIcon or XIcon) beside text. Each row is wrap={false} so an icon can't
 * get stranded from its label at a page break.
 *
 * Variants:
 * - 'checklist' (default): tight bodySmall rows with xs icons — the Ch09
 *   "what AI can/can't spot" checklists.
 * - 'feature': body-size text, md icons, relaxed indented rows — the Ch10
 *   adapter-benefits list.
 *
 * Props: items (string[]), icon, color, size (optional, defaults per variant),
 *        variant (optional, default 'checklist')
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { spacing, iconSize } from '../styles/theme';

interface IconListProps {
  items: string[];
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  size?: number;
  variant?: 'checklist' | 'feature';
}

const local = StyleSheet.create({
  featureRow: {
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
  },
});

const IconList: React.FC<IconListProps> = ({ items, icon: ItemIcon, color, size, variant = 'checklist' }) => {
  const feature = variant === 'feature';
  const resolvedSize = size ?? (feature ? iconSize.md : iconSize.xs);
  return (
    <>
      {items.map((item, i) => (
        <View key={i} wrap={false} style={feature ? [styles.iconRow, local.featureRow] : styles.iconRow}>
          <ItemIcon size={resolvedSize} color={color} />
          <Text style={feature ? styles.body : styles.bodySmall}>{item}</Text>
        </View>
      ))}
    </>
  );
};

export default IconList;
