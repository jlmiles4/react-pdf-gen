/**
 * BulletList — Gold-dot bullet list
 *
 * Renders an array of strings as a vertical list with gold SVG circle dots
 * (accent[500], 6px diameter). Each item uses wrap={false} to prevent
 * orphaned dots at page breaks.
 *
 * Props: items (string[])
 */
import React from 'react';
import { View, Text, Svg, Circle, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing } from '../styles/theme';

interface BulletListProps {
  items: string[];
}

const local = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
  },
  bulletWrapper: {
    width: 14,
    paddingTop: spacing.xs,
  },
});

const BulletDot = () => (
  <View style={local.bulletWrapper}>
    <Svg width={6} height={6} viewBox="0 0 6 6">
      <Circle cx="3" cy="3" r="3" fill={colors.accent[500]} />
    </Svg>
  </View>
);

const BulletList: React.FC<BulletListProps> = ({ items }) => (
  <View style={local.container}>
    {items.map((item, i) => (
      <View key={i} wrap={false} style={local.item}>
        <BulletDot />
        <Text style={styles.listContent}>{item}</Text>
      </View>
    ))}
  </View>
);

export default BulletList;
