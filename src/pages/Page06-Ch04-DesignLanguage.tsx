// Group: DESIGN SYSTEM
/**
 * Chapter 04 — Specifying a Design Language
 *
 * How to create a design token system: color palettes (primary navy, accent gold,
 * neutral grays), typography scale (9 sizes), spacing grid (4pt base), border tokens,
 * semantic colors, and the centralized theme.ts pattern.
 *
 * Sections: Why AI Needs Tokens, Color Palette, Typography Scale, Spacing Scale,
 *           Theme File, Border Tokens, Semantic Colors, Design Token Checklist
 * Components: CodeBlock, Table, TipBox, InfoBox (+ custom swatch & scale displays)
 * Renders: 1 chapter title + 3 content pages
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, typography, fontScale, fontWeight } from '../styles/theme';
import { ContentPage, ChapterTitle, CodeBlock, BulletList, TipBox, InfoBox, Table, SectionHeading } from '../components';

const local = StyleSheet.create({
  swatchRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  swatch: {
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: borders.radius.md,
  },
  swatchLabel: {
    fontSize: fontScale.micro,
    fontFamily: fonts.mono,
    fontWeight: fontWeight.regular,
    color: colors.neutral[600],
    marginTop: spacing.xs,
    textAlign: 'center',
    width: spacing.xxxl,
  },
  swatchGroup: {
    alignItems: 'center',
  },
  scaleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
    paddingBottom: spacing.xxs,
    borderBottomWidth: borders.thin,
    borderBottomColor: colors.neutral[100],
  },
  scaleLabel: {
    width: spacing.xxxl + spacing.xl, // 72pt
    fontSize: typography.code.fontSize,
    fontFamily: fonts.mono,
    fontWeight: fontWeight.regular,
    color: colors.neutral[500],
  },
  scaleSize: {
    marginBottom: 0,
    width: spacing.xxxl + spacing.xs, // 52pt
  },
  scaleUse: {
    flex: 1,
  },
});

const Ch04DesignLanguage: React.FC = () => (
  <>
    <ChapterTitle
      number="04"
      title="Specifying a Design Language"
      subtitle="Define your visual system once. Use it everywhere. Let AI enforce it."
    />

    <ContentPage sectionTitle="Design Language">
      <SectionHeading>Why AI Needs Explicit Design Tokens</SectionHeading>
      <Text style={styles.body}>
        Without a design system, every AI-generated page is a coin flip. The AI picks fontSize 14 on one page and 16 on the next. It uses #333 for body text here and #444 there. The result looks like five different people designed it.
      </Text>
      <Text style={styles.body}>
        A design token file solves this. It's a single source of truth for every visual decision: colors, font sizes, spacing, border radii. You include it in every AI prompt, and the output is automatically consistent.
      </Text>

      <SectionHeading>Color Palette</SectionHeading>
      <Text style={styles.body}>
        Pick one primary color, one accent, and a neutral scale. That's it. Three to five colors handle 95% of document design.
      </Text>

      <View style={local.swatchRow}>
        {[
          { color: colors.primary[800], label: 'pri-800' },
          { color: colors.primary[500], label: 'pri-500' },
          { color: colors.primary[100], label: 'pri-100' },
          { color: colors.accent[500], label: 'acc-500' },
          { color: colors.accent[100], label: 'acc-100' },
          { color: colors.neutral[800], label: 'neu-800' },
          { color: colors.neutral[400], label: 'neu-400' },
          { color: colors.neutral[100], label: 'neu-100' },
        ].map((s, i) => (
          <View key={i} style={local.swatchGroup}>
            <View style={[local.swatch, { backgroundColor: s.color }]} />
            <Text style={local.swatchLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.body}>
        This book uses navy primary (#121F3D) with amber/gold accent (#F0A000) and slate neutrals. The navy conveys trust and professionalism. The gold adds warmth and draws the eye to important elements.
      </Text>

      <TipBox>
        Use your primary dark shade (800-900) for headings and backgrounds. Use the accent for highlights, callout borders, and chapter numbers. Neutrals handle body text, dividers, and secondary information.
      </TipBox>

      <SectionHeading>Typography Scale</SectionHeading>
      <Text style={styles.body}>
        Define every text size upfront. No magic numbers in page components.
      </Text>

      <View>
        {[
          { name: 'display', size: '36pt', use: 'Cover title' },
          { name: 'h1', size: '26pt', use: 'Chapter titles' },
          { name: 'h2', size: '20pt', use: 'Section headers' },
          { name: 'h3', size: '16pt', use: 'Subsections' },
          { name: 'h4', size: '13pt', use: 'Labels, small headers' },
          { name: 'body', size: '11pt', use: 'Main reading text' },
          { name: 'bodySmall', size: '9.5pt', use: 'Secondary text' },
          { name: 'caption', size: '8.5pt', use: 'Footnotes, captions' },
          { name: 'code', size: '9pt', use: 'Code blocks' },
        ].map((t, i) => (
          <View key={i} style={local.scaleRow}>
            <Text style={local.scaleLabel}>{t.name}</Text>
            <Text style={[styles.body, local.scaleSize]}>{t.size}</Text>
            <Text style={[styles.bodySmall, local.scaleUse]}>{t.use}</Text>
          </View>
        ))}
      </View>

      <SectionHeading>Spacing Scale</SectionHeading>
      <Text style={styles.body}>
        Use a consistent spacing scale based on a 4-point grid. Every margin, padding, and gap should come from this list:
      </Text>
      <CodeBlock language="typescript">{`export const spacing = {
  xs:   4,    // Tight gaps, inline spacing
  sm:   8,    // List item gaps, small padding
  md:   12,   // Standard padding, paragraph gaps
  lg:   16,   // Section spacing, card padding
  xl:   24,   // Major section breaks
  xxl:  32,   // Chapter-level spacing
  xxxl: 48,   // Cover page spacing
};`}</CodeBlock>

      <View wrap={false}>
        <SectionHeading>The Theme File</SectionHeading>
        <Text style={styles.body}>
          All tokens live in a single theme.ts file. Every page component imports from here – never hardcodes values.
        </Text>
        <CodeBlock language="typescript">{`// Import in every page component:
import { colors, fonts, typography, spacing }
  from '../styles/theme';

// Use tokens, not magic numbers:
const s = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.primary[800],
    marginBottom: spacing.lg,
  },
});`}</CodeBlock>
      </View>

      <InfoBox label="The AI Context Pattern">
        When prompting AI to create a new page, include theme.ts in the context. The AI will use your defined tokens instead of inventing its own values. This single practice eliminates most visual inconsistency.
      </InfoBox>

      <View wrap={false}>
        <SectionHeading>Border and Radius Tokens</SectionHeading>
        <Text style={styles.body}>
          Define border widths and corner radii alongside your other tokens. Without these, AI mixes 4px rounded corners on one card with 8px on another – subtle but noticeable.
        </Text>
        <CodeBlock language="typescript">{`export const borders = {
  thin: 0.5,     // Dividers, table cell borders
  medium: 1,     // Card borders, callout boxes
  thick: 2,      // Emphasis borders, accent bars
  radius: {
    sm: 3,       // Subtle rounding (badges, tags)
    md: 6,       // Cards, callout boxes, code blocks
    lg: 10,      // Feature cards, hero elements
  },
};`}</CodeBlock>
      </View>

    </ContentPage>

    <ContentPage sectionTitle="Design Language">
      <SectionHeading>Semantic Color Tokens</SectionHeading>
      <Text style={styles.body}>
        Beyond your core palette, define semantic colors for meaning: success (green), warning (amber), error (red), info (blue). Include light variants for callout backgrounds.
      </Text>
      <CodeBlock language="typescript">{`success: '#2D8B4E',  successLight: '#F0F9F4',
warning: '#D98E00',  warningLight: '#FEF8E6',
error:   '#C43333',  errorLight:   '#FEF3F3',
info:    '#2E6BB5',  infoLight:    '#EDF1F8',`}</CodeBlock>

      <TipBox label="The Complete Token Set">
        A professional design system for react-pdf needs exactly four categories: colors (5-8 base values), typography (7-9 sizes), spacing (6-8 values), and borders (3 widths + 3 radii). Add semantic colors for callouts. Anything more adds complexity without visible benefit.
      </TipBox>

      <SectionHeading>Design Token Checklist</SectionHeading>
      <Table
        headers={['Category', 'Count', 'Example']}
        rows={[
          ['Colors (primary + accent)', '8-13 shades', '#121F3D navy, #F0A000 gold'],
          ['Neutrals + semantic', '5-8 + 4 pairs', 'Gray scale + success/warning/error/info'],
          ['Typography', '7-9 sizes', '8pt caption to 36pt display'],
          ['Spacing', '6-8 values', '4pt (xs) to 48pt (xxxl)'],
          ['Borders', '3 widths + 3 radii', '0.5pt thin to 10pt lg radius'],
        ]}
        columnWidths={['35%', '20%', '45%']}
      />
    </ContentPage>
  </>
);

export default Ch04DesignLanguage;
