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
import { colors, spacing, fonts, borders, typography } from '../styles/theme';
import ContentPage from '../components/ContentPage';
import ChapterTitle from '../components/ChapterTitle';
import CodeBlock from '../components/CodeBlock';
import BulletList from '../components/BulletList';
import Table from '../components/Table';
import { TipBox, WarningBox } from '../components/TipBox';
import { CheckIcon, AlertTriangleIcon, InfoIcon, XIcon, ArrowRightIcon, ZapIcon } from '../components/Icons';
import SectionHeading from '../components/SectionHeading';

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
    width: 72,
  },
  iconLabel: {
    fontSize: typography.codeSmall.fontSize,
    fontFamily: fonts.mono,
    fontWeight: 400 as const,
    color: colors.neutral[600],
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
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
          <CheckIcon size={24} color={colors.success} />
          <Text style={local.iconLabel}>Check</Text>
        </View>
        <View style={local.iconItem}>
          <XIcon size={24} color={colors.error} />
          <Text style={local.iconLabel}>X / Close</Text>
        </View>
        <View style={local.iconItem}>
          <AlertTriangleIcon size={24} color={colors.warning} />
          <Text style={local.iconLabel}>Warning</Text>
        </View>
        <View style={local.iconItem}>
          <InfoIcon size={24} color={colors.info} />
          <Text style={local.iconLabel}>Info</Text>
        </View>
        <View style={local.iconItem}>
          <ArrowRightIcon size={24} color={colors.primary[600]} />
          <Text style={local.iconLabel}>Arrow</Text>
        </View>
        <View style={local.iconItem}>
          <ZapIcon size={24} color={colors.accent[500]} />
          <Text style={local.iconLabel}>Zap</Text>
        </View>
      </View>

      <Text style={styles.body}>
        These icons are defined as react-pdf Svg components using Path data from the Lucide icon library (MIT license). They take size and color props, making them fully customizable.
      </Text>

      <SectionHeading>Building an Icon Component</SectionHeading>
      <Text style={styles.body}>
        The pattern is straightforward: wrap SVG path data in a reusable component.
      </Text>
      <CodeBlock language="tsx">{`import { Svg, Path } from '@react-pdf/renderer';

interface IconProps {
  size?: number;
  color?: string;
}

// Get path data from Lucide, Heroicons, or Feather
export const CheckIcon = ({
  size = 16, color = '#2D8B4E'
}: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M20 6L9 17l-5-5"
      stroke={color}
      strokeWidth={2.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);`}</CodeBlock>

      <SectionHeading>Using Icons in Context</SectionHeading>
      <Text style={styles.body}>
        Icons work best when paired with text in a row layout:
      </Text>

      <View style={local.demoRow}>
        <CheckIcon size={14} color={colors.success} />
        <Text style={styles.body}>Vector-sharp at any zoom level</Text>
      </View>
      <View style={local.demoRow}>
        <CheckIcon size={14} color={colors.success} />
        <Text style={styles.body}>Matches your brand color palette</Text>
      </View>
      <View style={local.demoRow}>
        <CheckIcon size={14} color={colors.success} />
        <Text style={styles.body}>Zero external dependencies – no CDN, no internet</Text>
      </View>
      <View style={local.demoRow}>
        <CheckIcon size={14} color={colors.success} />
        <Text style={styles.body}>Consistent rendering across all PDF viewers</Text>
      </View>

      <CodeBlock language="tsx">{`// Icon + text row pattern
<View style={{ flexDirection: 'row',
  alignItems: 'center', gap: 8 }}>
  <CheckIcon size={14} color={colors.success} />
  <Text style={styles.body}>
    Item description here
  </Text>
</View>`}</CodeBlock>

      <TipBox label="When Emojis Are Acceptable">
        Internal team documents, quick prototypes, or documents where your brand literally uses emoji as part of its identity. For anything client-facing or paid – use SVG icons.
      </TipBox>

      <SectionHeading>Building Your Icon Library</SectionHeading>
      <Text style={styles.body}>
        Create a single Icons.tsx file with all the icons your document needs. You'll probably start with five and end up with fifteen -- that's fine, the library grows with your project. Most ebooks need 8-12 icons at most: check, x, info, warning, arrow, and a few domain-specific ones. Get the SVG path data from lucide.dev -- every icon is MIT licensed and copies directly into react-pdf Svg components.
      </Text>

      <SectionHeading>Icon Sizing Guidelines</SectionHeading>
      <Text style={styles.body}>
        Match icon sizes to the text they accompany. Oversized icons next to small text looks amateur. Undersized icons disappear.
      </Text>
      <Table
        headers={['Context', 'Icon Size', 'Text Size']}
        rows={[
          ['Inline with body text', '12-14px', '11pt body'],
          ['Bullet list markers', '10-12px', '9.5-11pt'],
          ['Section headers', '18-20px', '20pt h2'],
          ['Feature showcases', '24-32px', 'Display or standalone'],
          ['Callout box labels', '14-16px', '11-13pt label'],
        ]}
        columnWidths={['40%', '30%', '30%']}
      />

      <WarningBox label="Path Data Quality">
        Not all icon libraries export clean SVG paths. Test each icon in react-pdf before committing it – some paths use features like clipPath or mask that react-pdf's SVG renderer doesn't support. Stick to simple Path elements with stroke or fill.
      </WarningBox>

      <SectionHeading>Icon Sources for React-PDF</SectionHeading>
      <BulletList items={[
        'Lucide (lucide.dev) – clean, consistent 24x24 grid, MIT licensed. Best overall choice.',
        'Heroicons (heroicons.com) – by the Tailwind team, two styles (outline/solid), MIT licensed.',
        'Feather Icons (feathericons.com) – lightweight, stroke-based, MIT licensed.',
        'Tabler Icons (tabler-icons.io) – 4,000+ icons, consistent stroke width, MIT licensed.',
      ]} />
      <Text style={styles.body}>
        For any source, the workflow is the same: find the icon, copy its SVG path data, paste it into a react-pdf Svg/Path component. One file, all your icons, zero runtime dependencies.
      </Text>

      <TipBox label="The 10-Icon Rule">
        Start with 10 icons maximum. Add more only when a page genuinely needs one that doesn't exist yet. Icon bloat is real – a 50-icon file costs tokens in every AI prompt that imports it.
      </TipBox>

      <SectionHeading>From Emojis to Professional Output</SectionHeading>
      <Text style={styles.body}>
        This is one of those changes that seems small until you see the before and after. Swap emojis for SVG icons and your document stops looking like a group chat and starts looking like something someone designed on purpose.
      </Text>

      <Table
        headers={['Property', 'Emoji', 'SVG Icon']}
        rows={[
          ['Rendering', 'Platform-dependent', 'Identical everywhere'],
          ['Sizing', 'Fixed to font size', 'Any size, precise control'],
          ['Color', 'Cannot be changed', 'Any color from your palette'],
          ['Stroke width', 'N/A', 'Configurable per icon'],
          ['Print quality', 'May rasterize poorly', 'Vector – infinite resolution'],
          ['Token cost', '1-3 tokens', '~20-30 tokens per icon'],
          ['AI consistency', 'Unpredictable', 'Deterministic output'],
        ]}
        columnWidths={['25%', '35%', '40%']}
      />

      <Text style={styles.body}>
        The effort is minimal: one Icons.tsx file, a handful of Lucide path strings, and consistent sizing rules. Every callout box, status indicator, and visual marker in your PDF benefits immediately.
      </Text>
    </ContentPage>
  </>
);

export default Ch08Icons;
