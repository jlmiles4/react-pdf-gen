// Group: CRAFT
/**
 * Chapter 08 — Icons over Emojis
 *
 * Why emojis fail in PDF (CDN dependency, raster, platform-inconsistent) and
 * how SVG icons solve every problem (vector, color-matched, offline). Includes
 * an icon showcase, the component pattern, sizing guidelines, and source libraries.
 *
 * Sections: Problem with Emojis, SVG Icon Advantage, Building an Icon Component,
 *           Using Icons in Context, Icon Library, Sizing Guidelines, Icon Sources,
 *           Emojis vs Icons comparison table
 * Components: CodeBlock, BulletList, Table, TipBox, WarningBox, all 6 Icons
 *             (+ custom icon showcase and demo rows)
 * Renders: 1 chapter title + 4 content pages
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, typography, fontWeight, iconSize } from '../styles/theme';
import { ContentPage, ChapterTitle, SectionHeading, Table, WarningBox } from '../components';
import { CheckIcon, AlertTriangleIcon, InfoIcon, XIcon, ArrowRightIcon, ZapIcon } from '../components/Icons';

const local = StyleSheet.create({
  iconShowcase: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    marginVertical: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.neutral[50],
    borderRadius: borders.radius.md,
  },
  iconItem: {
    alignItems: 'center',
    width: spacing.xxxl + spacing.xl, // 72pt
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

const Ch08Icons: React.FC = () => (
  <>
    <ChapterTitle
      number="08"
      title="Icons over Emojis"
      subtitle="SVG icons render sharp, match your brand, and work offline."
    />

    <ContentPage sectionTitle="Icons vs Emojis">
      <SectionHeading>The Problem with Emojis in PDF</SectionHeading>
      <Text style={styles.body}>
        Emojis look harmless. They're quick to type and AI agents love inserting them. But in react-pdf, they introduce real problems:
      </Text>

      <Table
        headers={['Issue', 'Impact']}
        rows={[
          ['Requires Font.registerEmojiSource()', 'Internet connection needed at render time'],
          ['Raster images at fixed resolution', 'Blurry when zoomed – PDFs are vector-first'],
          ['Platform-dependent rendering', 'Looks different on Mac, Windows, Linux, mobile'],
          ['Can\'t match your color scheme', 'Always renders in original colors'],
          ['Informal appearance', 'Undercuts professional documents'],
          ['CDN dependency', 'Build fails if CDN is down or blocked'],
        ]}
        columnWidths={['40%', '60%']}
      />

      <WarningBox label="The CDN Problem">
        Font.registerEmojiSource() points to a CDN like Twemoji. If that CDN is down, behind a firewall, or the URL changes, your PDF build breaks. In production, this is an unacceptable dependency for a static document.
      </WarningBox>

      <SectionHeading>The SVG Icon Advantage</SectionHeading>
      <Text style={styles.body}>
        React-pdf has extensive SVG support. SVG icons are vector graphics – they scale perfectly at any zoom level, match any color, and render identically on every platform with zero external dependencies.
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
        These icons come from Lucide via the react-icons package (MIT license). A small adapter rewrites react-icons' browser SVG output as @react-pdf/renderer Svg/Path nodes — so size, color, and stroke all stay under your control.
      </Text>
    </ContentPage>
  </>
);

export default Ch08Icons;
