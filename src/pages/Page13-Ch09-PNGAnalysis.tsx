// Group: SHIPPING
/**
 * Chapter 09 — AI Visual Analysis
 *
 * Why AI vision models can't analyze raw PDF files and the PNG export solution.
 * Covers the visual QA workflow (generate → export → AI review → fix), pdftoppm
 * conversion, DPI selection, the export script, and what AI can/can't spot.
 *
 * Sections: Why AI Can't Analyze PDF, Visual QA Workflow (flow diagram),
 *           PDF to PNG Conversion, Choosing a DPI, Export Script,
 *           What AI Can Spot (checklist), What AI Struggles With (checklist)
 * Components: CodeBlock, Table, TipBox, InfoBox, CheckIcon, XIcon
 *             (+ custom flow step diagram)
 * Renders: 1 chapter title + 2 content pages
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, typography, fontScale, fontWeight, iconSize, layout } from '../styles/theme';
import { ContentPage, ChapterTitle, CodeBlock, Table, SectionHeading } from '../components';
import { CheckIcon, XIcon } from '../components/Icons';

const local = StyleSheet.create({
  flowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.neutral[50],
    borderRadius: borders.radius.md,
  },
  flowStep: {
    alignItems: 'center',
    width: layout.flowStepWidth,
  },
  flowStepNum: {
    fontSize: typography.h2.fontSize,
    fontFamily: fonts.heading,
    fontWeight: fontWeight.bold,
    color: colors.accent[500],
    marginBottom: spacing.xs,
  },
  flowStepLabel: {
    fontSize: typography.code.fontSize,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.primary[700],
    textAlign: 'center',
  },
  flowArrow: {
    fontSize: typography.h3.fontSize,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[400],
  },
  checklistContainer: {
    marginBottom: spacing.md,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
});

const Ch09PNGAnalysis: React.FC = () => (
  <>
    <ChapterTitle
      number="09"
      title="AI Visual Analysis"
      subtitle="Export to PNG. Let AI see what the reader sees. Fix what doesn't look right."
    />

    <ContentPage sectionTitle="AI Visual Analysis">
      <SectionHeading>Why AI Can't Analyze PDF Files</SectionHeading>
      <Text style={styles.body}>
        You've built the page. It compiles. It renders. But how do you know it actually looks right? If you upload that .pdf directly to an AI, you'll get vague feedback at best. AI vision models understand pixels, not PDF coordinate systems and PostScript drawing commands.
      </Text>
      <Text style={styles.body}>
        The fix is dead simple: convert your PDF pages to PNG images, then show those images to the AI. Now it sees exactly what your reader sees.
      </Text>

      <SectionHeading>The Visual QA Workflow</SectionHeading>
      <View wrap={false} style={local.flowRow}>
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>1</Text>
          <Text style={local.flowStepLabel}>Generate PDF</Text>
        </View>
        <Text style={local.flowArrow}>&rarr;</Text>
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>2</Text>
          <Text style={local.flowStepLabel}>Export to PNG</Text>
        </View>
        <Text style={local.flowArrow}>&rarr;</Text>
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>3</Text>
          <Text style={local.flowStepLabel}>AI Reviews PNG</Text>
        </View>
        <Text style={local.flowArrow}>&rarr;</Text>
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>4</Text>
          <Text style={local.flowStepLabel}>Fix & Repeat</Text>
        </View>
      </View>

      <SectionHeading>PDF to PNG Conversion</SectionHeading>
      <Text style={styles.body}>
        The most reliable tool is pdftoppm from the poppler-utils package. It's fast, handles edge cases well, and produces clean output. DPI controls the trade-off between image quality and file size — 200 DPI is the sweet spot for AI analysis.
      </Text>
      <Table
        headers={['DPI', 'Use Case', 'File Size']}
        rows={[
          ['72', 'Quick preview, thumbnail', '~50-100KB per page'],
          ['150', 'Standard review, good detail', '~200-400KB per page'],
          ['200', 'Detailed AI analysis (recommended)', '~400-700KB per page'],
          ['300', 'Print-quality verification', '~800KB-1.5MB per page'],
        ]}
        columnWidths={['15%', '50%', '35%']}
      />
      <SectionHeading>The Export Script</SectionHeading>
      <Text style={styles.body}>
        Automate the full pipeline: build PDF, export PNGs, and optionally open for review. Add the export script to your package.json scripts — run "pnpm build" to generate PDF, then "pnpm export" to create PNGs, or combine them with "pnpm build && pnpm export" for the full pipeline.
      </Text>
      <CodeBlock language="bash">{'#!/bin/bash\n# scripts/export-pages.sh\nset -e\nPDF_FILE="output/ebook.pdf"\nPNG_DIR="output/pages"\nDPI=200\nmkdir -p "$PNG_DIR"\necho "Exporting pages at $DPI DPI..."\npdftoppm -png -r "$DPI" "$PDF_FILE" "$PNG_DIR/page"\necho "Export complete."\nls -lh "$PNG_DIR"/page-*.png'}</CodeBlock>

      <SectionHeading>What AI Can Spot</SectionHeading>
      <Text style={styles.body}>
        Be specific in your prompts: "Check if the heading alignment is consistent across pages 3-7" works better than "review this PDF." Ask about one concern at a time and feed one page image per question for best results. Here's what vision models reliably detect:
      </Text>
      <View style={local.checklistContainer}>
        {[
          'Alignment inconsistencies between elements',
          'Spacing irregularities (uneven margins, padding gaps)',
          'Font size mismatches across similar elements',
          'Color contrast issues (text hard to read on background)',
          'Layout balance problems (too heavy on one side)',
          'Missing or broken elements',
          'Orphaned lines at page breaks',
          'Overall visual hierarchy assessment',
        ].map((item, i) => (
          <View key={i} wrap={false} style={local.checklistRow}>
            <CheckIcon size={iconSize.xs} color={colors.success} />
            <Text style={styles.bodySmall}>{item}</Text>
          </View>
        ))}
      </View>

      <SectionHeading>What AI Struggles With</SectionHeading>
      <View style={local.checklistContainer}>
        {[
          'Exact pixel measurements (estimates within ~5-10%)',
          'Precise color matching (close, not pixel-perfect)',
          'Specific font identification',
          'Reading small text at low DPI',
          'Distinguishing very similar shades',
        ].map((item, i) => (
          <View key={i} wrap={false} style={local.checklistRow}>
            <XIcon size={iconSize.xs} color={colors.error} />
            <Text style={styles.bodySmall}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.body}>
        Here's what matters: AI catches relative problems, not absolute ones. It'll tell you "this heading looks different from that heading" but not "this margin is exactly 24px." Use it for what it's good at — alignment, spacing rhythm, visual hierarchy, broken elements — and verify exact values in your code.
      </Text>

      <SectionHeading>Three Review Prompts That Work</SectionHeading>
      <Text style={styles.body}>
        Chapter 6 covered prompts that <Text style={styles.bold}>generate</Text> pages. These are different — they ask AI to <Text style={styles.bold}>review</Text> a page that already exists. "Does this look good?" gets you "looks good." Single-axis prompts get you specifics:
      </Text>
      <CodeBlock language="text">{`SPACING: "Look at this PDF page. Are the vertical gaps
between sections consistent? Are any two adjacent
elements too close together or too far apart?"

HIERARCHY: "This page should have 4 levels of text:
page title (largest), section headings, body text,
and captions (smallest). Can you clearly identify all
4 levels? Are any two levels too similar in size?"

CONSISTENCY: "Here are pages 3 and 4 of the same
document. Do the headers look identical? Are the
margins the same? Do the callout boxes use the same
styling? Flag any inconsistencies between the pages."`}</CodeBlock>

      <Text style={styles.body}>
        Two or three render-review-fix cycles is all it takes to go from rough draft to polished output. Chapter 10 gives you the checklist to measure each cycle against.
      </Text>
    </ContentPage>
  </>
);

export default Ch09PNGAnalysis;
