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
        These icons come from Lucide via the react-icons package (MIT license). A small adapter rewrites react-icons' browser SVG output as @react-pdf/renderer Svg/Path nodes — so size, color, and stroke all stay under your control.
      </Text>

      <SectionHeading>The react-icons Adapter</SectionHeading>
      <Text style={styles.body}>
        react-icons returns plain HTML &lt;svg&gt;/&lt;path&gt; elements, which react-pdf can't render. The adapter walks the icon's React tree once and rebuilds it with react-pdf primitives, normalizing currentColor and string-typed numerics along the way.
      </Text>
      <CodeBlock language="tsx">{`import { Svg, Path, Circle, Line } from '@react-pdf/renderer';
import type { IconType } from 'react-icons';

const TAG_MAP = { svg: Svg, path: Path,
  circle: Circle, line: Line /* ...etc */ };

const Icon = ({ icon, size = 16, color }) => {
  // react-icons component returns <IconBase attr={...}>
  const root = icon({});
  const { attr, children } = root.props;
  return (
    <Svg width={size} height={size} {...normalize(attr, color)}>
      {convertChildren(children, color)}
    </Svg>
  );
};`}</CodeBlock>

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

      <SectionHeading>Skip the Path Data — Use react-icons</SectionHeading>
      <Text style={styles.body}>
        The book's source ships an Icon adapter that takes any react-icons IconType and renders it through @react-pdf/renderer's Svg primitives. You get 50,000+ vetted icons (Lucide, Heroicons, Feather, Tabler, Font Awesome) with one import — no path-string copying, no SVG hand-tuning.
      </Text>
      <CodeBlock language="tsx">{`import { LuCheck, LuTriangleAlert } from 'react-icons/lu';
import Icon from './components/Icon';

<Icon icon={LuCheck} size={14} color={colors.success} />
<Icon icon={LuTriangleAlert} size={16} color={colors.warning} />`}</CodeBlock>
      <Text style={styles.body}>
        Re-export the icons your document actually uses from a single Icons.tsx so prompts stay short. Keep that re-export file under ~12 icons; ad-hoc <Text style={styles.bold}>react-icons/lu</Text> imports are fine for one-off uses.
      </Text>

      <WarningBox label="Path Data Quality">
        Not every icon library renders cleanly. Stick to stroke-based sets (Lucide, Feather, Heroicons-outline). Avoid icons that rely on filters, masks, or clipPath — react-pdf's SVG renderer skips those features silently.
      </WarningBox>

      <SectionHeading>Sizing Cheat Sheet</SectionHeading>
      <Text style={styles.body}>
        Match icons to the text they sit next to. Oversized icons next to small text looks amateur; undersized icons disappear.
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

      <SectionHeading>Emoji vs Icon, Side by Side</SectionHeading>
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

      <TipBox label="The 10-Icon Rule">
        Re-export at most 10 icons from your project's Icons.tsx. Anything more bloats every prompt that imports it. If a page needs a one-off, import directly from <Text style={styles.bold}>react-icons/lu</Text> at the call site instead.
      </TipBox>
    </ContentPage>
  </>
);

export default Ch08Icons;
