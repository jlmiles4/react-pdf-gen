/**
 * Footer — Fixed page footer
 *
 * Brand and page number both rendered as `<Text fixed>` siblings with absolute
 * positioning. Border drawn as a `<View fixed>` line above them. Both texts'
 * vertical positions are computed as `pageHeight - footerHeight + (footerHeight
 * - fontSize) / 2` so their visual centers land on the same baseline regardless
 * of their (slightly different) font sizes.
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, page, borders, fontScale, typography, fontWeight } from '../styles/theme';

const brandTop = page.height - page.footerHeight + (page.footerHeight - fontScale.navSmall) / 2;
const pageNumberTop = page.height - page.footerHeight + (page.footerHeight - typography.codeSmall.fontSize) / 2;

const footerStyles = StyleSheet.create({
  border: {
    position: 'absolute',
    bottom: page.footerHeight,
    left: page.margin.left,
    right: page.margin.right,
    borderTopWidth: borders.thin,
    borderTopColor: colors.neutral[200],
  },
  brand: {
    position: 'absolute',
    top: brandTop,
    left: page.margin.left,
    fontSize: fontScale.navSmall,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[400],
  },
  pageNumber: {
    position: 'absolute',
    top: pageNumberTop,
    left: page.margin.left,
    right: page.margin.right,
    textAlign: 'right',
    fontSize: typography.codeSmall.fontSize,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[500],
  },
});

const Footer: React.FC = () => (
  <>
    <View style={footerStyles.border} fixed />
    <Text style={footerStyles.brand} fixed>landonmiles.com</Text>
    <Text
      style={footerStyles.pageNumber}
      fixed
      render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
    />
  </>
);

export default Footer;
