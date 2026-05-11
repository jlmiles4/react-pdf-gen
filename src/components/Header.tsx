/**
 * Header — Fixed page header
 *
 * Renders at the top of every content page via `fixed` prop.
 * Shows book title ("React-PDF + AI") on the left and the current
 * section title on the right, separated by a subtle bottom border.
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, page, borders, fontScale, typography, letterSpacing, fontWeight } from '../styles/theme';

interface HeaderProps {
  sectionTitle?: string;
}

const headerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: page.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: page.margin.left,
    borderBottomWidth: borders.thin,
    borderBottomColor: colors.neutral[200],
  },
  title: {
    fontSize: typography.codeSmall.fontSize,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[500],
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.tight,
  },
  bookTitle: {
    fontSize: fontScale.navSmall,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[400],
  },
});

const Header: React.FC<HeaderProps> = ({ sectionTitle }) => (
  <View style={headerStyles.container} fixed>
    <Text style={headerStyles.bookTitle}>React-PDF + AI</Text>
    {sectionTitle && <Text style={headerStyles.title}>{sectionTitle}</Text>}
  </View>
);

export default Header;
