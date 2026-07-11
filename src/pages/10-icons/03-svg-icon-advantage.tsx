import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, fonts, borders, typography, fontWeight, iconSize } from '../../styles/theme';
import { ContentPage, SectionHeading, Table } from '../../components';
import { CheckIcon, AlertTriangleIcon, InfoIcon, XIcon, ArrowRightIcon, ZapIcon } from '../../components/Icons';

const local = StyleSheet.create({
  iconShowcase: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginVertical: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.neutral[50],
    borderRadius: borders.radius.md,
  },
  iconItem: {
    alignItems: 'center',
    width: spacing.xxxl + spacing.xl,
  },
  iconLabel: {
    fontSize: typography.codeSmall.fontSize,
    fontFamily: fonts.mono,
    fontWeight: fontWeight.regular,
    color: colors.neutral[600],
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});

const Page: React.FC = () => (
  <ContentPage sectionTitle="Icons over Emojis" wrap={false}>
    <SectionHeading>SVG Icon Advantage</SectionHeading>
    <Text style={styles.body}>
      React-PDF has extensive SVG support. SVG icons are vector graphics – they scale cleanly at any zoom level, match any color, and render consistently across PDF viewers with no network or CDN dependency at render time.
    </Text>

    <View wrap={false} style={local.iconShowcase}>
      <View style={local.iconItem}>
        <CheckIcon size={iconSize.xl} color={colors.success} />
        <Text style={local.iconLabel}>Check</Text>
      </View>
      <View style={local.iconItem}>
        <XIcon size={iconSize.xl} color={colors.error} />
        <Text style={local.iconLabel}>X / Close</Text>
      </View>
      <View style={local.iconItem}>
        <AlertTriangleIcon size={iconSize.xl} color={colors.warning} />
        <Text style={local.iconLabel}>Warning</Text>
      </View>
      <View style={local.iconItem}>
        <InfoIcon size={iconSize.xl} color={colors.info} />
        <Text style={local.iconLabel}>Info</Text>
      </View>
      <View style={local.iconItem}>
        <ArrowRightIcon size={iconSize.xl} color={colors.primary[600]} />
        <Text style={local.iconLabel}>Arrow</Text>
      </View>
      <View style={local.iconItem}>
        <ZapIcon size={iconSize.xl} color={colors.accent[500]} />
        <Text style={local.iconLabel}>Zap</Text>
      </View>
    </View>

    <Text style={styles.body}>
      These icons come from Lucide via the react-icons package (ISC license). A small adapter rewrites react-icons' browser SVG output as @react-pdf/renderer Svg/Path nodes. Size and color stay under your control; stroke weight follows the source icon unless you expose it as another adapter prop.
    </Text>

    <SectionHeading>Why Not Emojis?</SectionHeading>
    <Table
      headers={['Property', 'SVG icon', 'Emoji glyph']}
      columnWidths={['34%', '33%', '33%']}
      rows={[
        ['Color', 'Any token you want', 'Fixed by the artwork'],
        ['Rendering', 'Consistent vector path', 'Depends on chosen source'],
        ['Stroke weight', 'Set by source icon', 'None'],
        ['Print fidelity', 'Crisp vectors', 'Often missing'],
      ]}
    />
  </ContentPage>
);

export default Page;
