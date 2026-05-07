/**
 * Footer — Fixed page footer
 *
 * Renders at the bottom of every page via `fixed` prop.
 * Shows brand URL on the left and dynamic "pageNumber / totalPages" on the right,
 * separated by a subtle top border.
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, page, borders, fontScale, typography } from '../styles/theme';

const footerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: page.footerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: page.margin.left,
    borderTopWidth: borders.thin,
    borderTopColor: colors.neutral[200],
  },
  brand: {
    fontSize: fontScale.navSmall,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[400],
  },
  pageNumber: {
    fontSize: typography.codeSmall.fontSize,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[500],
  },
});

const Footer: React.FC = () => (
  <View style={footerStyles.container} fixed>
    <Text style={footerStyles.brand}>landonmiles.com</Text>
    <Text
      style={footerStyles.pageNumber}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
);

export default Footer;
