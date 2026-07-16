/**
 * BulletList — Gold-dot bullet list
 *
 * Renders an array of strings as a vertical list with gold SVG circle dots
 * (accent[500], 6px diameter). Each item uses wrap={false} to prevent
 * orphaned dots at page breaks.
 *
 * Props: items (string[] or ReactNode[] — strings render as plain body text;
 *        ReactNodes render as-is, useful for inline markdown like bold/code spans)
 *        wrap (optional bool, default true — the list may split across pages,
 *        items staying whole; pass wrap={false} only for short lists known to fit)
 */
import React from 'react';
import { View, Text, Svg, Circle, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, layout } from '../styles/theme';

interface BulletListProps {
  items: (string | React.ReactNode)[];
  wrap?: boolean;
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
  nodeContent: {
    flex: 1,
  },
});

const BulletDot = () => (
  <View style={local.bulletWrapper}>
    <Svg width={layout.bulletDotSize} height={layout.bulletDotSize} viewBox={`0 0 ${layout.bulletDotSize} ${layout.bulletDotSize}`}>
      <Circle cx={layout.bulletDotSize / 2} cy={layout.bulletDotSize / 2} r={layout.bulletDotSize / 2} fill={colors.accent[500]} />
    </Svg>
  </View>
);

const BulletList: React.FC<BulletListProps> = ({ items, wrap = true }) => (
  <View style={local.container} wrap={wrap}>
    {items.map((item, i) => (
      <View key={i} wrap={false} style={local.item}>
        <BulletDot />
        {typeof item === 'string'
          ? <Text style={styles.listContent}>{item}</Text>
          : <View style={local.nodeContent}>{item}</View>}
      </View>
    ))}
  </View>
);

export default BulletList;
