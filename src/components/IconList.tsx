/**
 * IconList — vertical list of icon + small-body rows
 *
 * A run of `items` each rendered as an icon (passed via the `icon` prop, e.g.
 * CheckIcon or XIcon) beside `bodySmall` text. Each row is wrap={false} so an
 * icon can't get stranded from its label at a page break. Used for the Ch09
 * "what AI can/can't spot" checklists.
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
}

const local = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
});

const IconList: React.FC<IconListProps> = ({ items, icon: ItemIcon, color, size = iconSize.xs }) => (
  <>
    {items.map((item, i) => (
      <View key={i} wrap={false} style={local.row}>
        <ItemIcon size={size} color={color} />
        <Text style={styles.bodySmall}>{item}</Text>
      </View>
    ))}
  </>
);

export default IconList;
