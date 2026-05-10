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
import { colors, spacing, layout } from '../styles/theme';

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
    width: layout.bulletWrapperWidth,
    paddingTop: spacing.xs,
  },
});

const BulletDot = () => (
  <View style={local.bulletWrapper}>
    <Svg width={layout.bulletDotSize} height={layout.bulletDotSize} viewBox={`0 0 ${layout.bulletDotSize} ${layout.bulletDotSize}`}>
      <Circle cx={layout.bulletDotSize / 2} cy={layout.bulletDotSize / 2} r={layout.bulletDotSize / 2} fill={colors.accent[500]} />
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
