/**
 * Header — Fixed page header
 *
 * ContentPage inserts it on each source page; `fixed` repeats it on any
 * subpages produced when that Page wraps.
 * Shows book title ("React-PDF + AI") on the left and the current
 * section title on the right, separated by a subtle bottom border.
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, page, borders, fontScale, typography, letterSpacing, fontWeight, spacing } from '../styles/theme';

interface HeaderProps {
  sectionTitle?: string;
}

const headerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    // Header sits in the top margin. Lift it by spacing.md so its bottom border
    // clears the content top (60pt) instead of touching it – the page's top
    // breathing room, at no cost to content height. Inset left/right to the page
    // margins so the rule matches the footer's line (not edge-to-edge).
    top: page.margin.top - page.headerHeight - spacing.md,
    left: page.margin.left,
    right: page.margin.right,
    height: page.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
