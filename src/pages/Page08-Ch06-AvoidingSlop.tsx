/**
 * Chapter 06 — Avoiding AI Slop
 *
 * What makes AI-generated PDFs look cheap (default fonts, inconsistent spacing,
 * random colors), the root causes, side-by-side slop vs. premium comparisons,
 * the multi-pass iteration workflow, and an anti-slop prompt template.
 *
 * Sections: What AI Slop Looks Like, Root Causes, Slop vs. Premium (side-by-side),
 *           Iteration Workflow, Quality Signals, Anti-Slop Prompt Template
 * Components: BulletList, WarningBox, TipBox, CodeBlock, CheckIcon, XIcon
 *             (+ custom comparison columns)
 * Renders: 1 chapter title + 4 content pages
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, fontScale } from '../styles/theme';
import ContentPage from '../components/ContentPage';
import ChapterTitle from '../components/ChapterTitle';
import CodeBlock from '../components/CodeBlock';
import BulletList from '../components/BulletList';
import { TipBox, WarningBox } from '../components/TipBox';
import { CheckIcon, XIcon } from '../components/Icons';
import SectionHeading from '../components/SectionHeading';

const local = StyleSheet.create({
  comparisonRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  comparisonCol: {
    flex: 1,
    borderWidth: borders.medium,
    borderRadius: borders.radius.md,
    padding: spacing.md,
  },
  badCol: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  goodCol: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  compLabel: {
    fontSize: fontScale.labelSmall,
    fontFamily: fonts.bodyBold,
    fontWeight: 600 as const,
    marginBottom: spacing.sm,
  },
  badLabel: { color: colors.error },
  goodLabel: { color: colors.success },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
});

const Ch06AvoidingSlop: React.FC = () => (
  <>
    <ChapterTitle
      number="06"
      title="Avoiding AI Slop"
      subtitle="What makes output look cheap – and the specific fixes that make it premium."
    />

    <ContentPage sectionTitle="Avoiding AI Slop">
      <SectionHeading>What AI Slop Looks Like</SectionHeading>
      <Text style={styles.body}>
        You've seen it. The AI generates a PDF and it looks... generic. Default font. Random spacing. Every page feels like a different document. Here's what specifically goes wrong:
      </Text>

      <BulletList items={[
        'Default Helvetica everywhere – no typographic personality',
        'Inconsistent font sizes – 14pt here, 16pt there, no clear hierarchy',
        'Cramped margins – content pushed to the edges with no breathing room',
        'Random colors – the AI picked #333, #666, #007bff from different templates',
        'No visual hierarchy – body text and headings are nearly the same size',
        'Walls of text – no callout boxes, no bullet lists, no visual breaks',
        'Emojis as design elements – unprofessional and inconsistent',
        'Lorem ipsum remnants – placeholder text the AI forgot to replace',
      ]} />

      <SectionHeading>The Root Causes</SectionHeading>
      <Text style={styles.body}>
        AI slop isn't the AI's fault. It's a prompt and structure problem.
      </Text>
      <BulletList items={[
        'Lazy prompts: "Make me a PDF" gives the AI nothing to work with',
        'No design system: without tokens, the AI improvises – badly',
        'No visual QA: you accept the first output without reviewing the render',
        'Monolith structure: the AI can\'t focus on one page at a time',
        'No iteration: premium output takes 2-3 passes, not one',
      ]} />

      <WarningBox label="The First Draft Rule">
        AI's first attempt is a rough draft. Always. It gives you the structure and general direction, but the spacing, sizing, and visual balance need refinement. If you ship the first draft, you ship slop.
      </WarningBox>

      <SectionHeading>Slop vs. Premium – Side by Side</SectionHeading>

      <Text style={styles.h3}>Heading Styles</Text>
      <View wrap={false} style={local.comparisonRow}>
        <View style={[local.comparisonCol, local.badCol]}>
          <View style={local.iconRow}>
            <XIcon size={12} />
            <Text style={[local.compLabel, local.badLabel]}>Slop</Text>
          </View>
          <Text style={styles.bodySmall}>fontSize: 16, centered, default font, no color, no spacing above or below. Blends into body text.</Text>
        </View>
        <View style={[local.comparisonCol, local.goodCol]}>
          <View style={local.iconRow}>
            <CheckIcon size={12} />
            <Text style={[local.compLabel, local.goodLabel]}>Premium</Text>
          </View>
          <Text style={styles.bodySmall}>Uses typography.h2 (20pt), primary color, 16pt marginBottom, 24pt marginTop. Clear hierarchy break.</Text>
        </View>
      </View>

      <Text style={styles.h3}>Page Margins</Text>
      <View wrap={false} style={local.comparisonRow}>
        <View style={[local.comparisonCol, local.badCol]}>
          <View style={local.iconRow}>
            <XIcon size={12} />
            <Text style={[local.compLabel, local.badLabel]}>Slop</Text>
          </View>
          <Text style={styles.bodySmall}>padding: 20 on all sides. Content cramped against edges. Feels claustrophobic.</Text>
        </View>
        <View style={[local.comparisonCol, local.goodCol]}>
          <View style={local.iconRow}>
            <CheckIcon size={12} />
            <Text style={[local.compLabel, local.goodLabel]}>Premium</Text>
          </View>
          <Text style={styles.bodySmall}>54pt horizontal, 60pt vertical margins. Content has room to breathe. Professional whitespace.</Text>
        </View>
      </View>

      <SectionHeading>The Iteration Workflow</SectionHeading>
      <Text style={styles.body}>
        Premium output requires a loop, not a single prompt:
      </Text>
      <BulletList items={[
        'Pass 1: Generate structure and content – get the text right',
        'Pass 2: Apply design system – enforce tokens, fix spacing',
        'Pass 3: Visual QA – render to PNG, review, fix alignment and balance',
        'Optional Pass 4: Polish – add callouts, refine typography, check page breaks',
      ]} />

      <TipBox label="The Prompt That Fixes Slop">
        Instead of "make me a page about X", try: "Create a content page using ContentPage wrapper. Use typography from theme.ts: h2 for section titles, body for paragraphs. Include a TipBox callout and a BulletList. Match the spacing and style of Page05-Ch03-Architecture.tsx."
      </TipBox>

    </ContentPage>

    {/* --- Page 4: Prompt Templates & Patterns --- */}
    <ContentPage sectionTitle="Avoiding AI Slop">
      <SectionHeading>The Quality Signals</SectionHeading>
      <Text style={styles.body}>
        Here's what separates premium from slop. Every item is specific and checkable:
      </Text>
      <BulletList items={[
        'At least 3 distinct text sizes used intentionally (heading, body, caption)',
        'Color used for meaning: primary for headings, accent for emphasis, neutral for body',
        'Consistent component patterns: every callout looks the same, every table looks the same',
        'Whitespace used as a design element, not wasted space',
        'No orphaned single lines at the top or bottom of a page',
        'Every page could stand alone and look intentionally designed',
      ]} />

      <SectionHeading>Anti-Slop Prompt Template</SectionHeading>
      <Text style={styles.body}>
        Use this prompt structure when asking AI to generate or edit a page. It front-loads the design constraints so the AI can't improvise:
      </Text>
      <CodeBlock language="text">{`Create [page type] using these constraints:
- Import styles from '../styles/shared'
- Import tokens from '../styles/theme'
- Use ContentPage wrapper with sectionTitle="[section]"
- Headings: styles.h2 (20pt, primary[800])
- Body: styles.body (11pt, neutral[800])
- Include at least one: CodeBlock, BulletList, or TipBox
- Match spacing and density of [existing page file]
- No inline styles – use local StyleSheet.create()
- No emojis – use Icons from '../components/Icons'`}</CodeBlock>

      <TipBox label="The Copy-Paste Test">
        Take your prompt template and paste it into a new AI session with no prior context. If the AI produces a page that matches your existing pages on the first try, your prompt is good enough.
      </TipBox>

      <SectionHeading>Prompting Patterns for PDF Generation</SectionHeading>
      <Text style={styles.body}>
        The prompts that produce the best react-pdf output follow repeatable structures. These templates encode the constraints and context that prevent slop before it starts.
      </Text>

      <Text style={styles.h3}>Prompt Template: New Page</Text>
      <CodeBlock language="">{`Build a new ContentPage for [TOPIC].

Reference: src/pages/[EXISTING_PAGE].tsx for structure.
Design tokens: src/styles/theme.ts (use ONLY these values).
Components: SectionHeading, BulletList, CodeBlock, TipBox, Table.

Requirements:
- Use ContentPage wrapper with sectionTitle="[SECTION]"
- Import styles from '../styles/shared'
- All Text components need fontFamily + fontWeight
- wrap={false} on elements that must not split across pages
- No Helvetica, no emoji, no hardcoded colors`}</CodeBlock>

      <Text style={styles.h3}>Prompt Template: Layout Fix</Text>
      <CodeBlock language="">{`Fix the layout issue on [PAGE_FILE].

Problem: [WHAT YOU SEE — orphaned heading, split callout, etc.]
Current code at line [N]: [PASTE 5-10 LINES]

Constraints:
- Do not change content, only layout
- Do not remove existing wrap={false} props
- Use minPresenceAhead={40} for orphaned headings
- Check flexDirection is 'row' for side-by-side layouts`}</CodeBlock>

      <TipBox label="The Negative Constraint Pattern">
        Three or four negative constraints ("no Helvetica," "no emoji," "no hardcoded colors") consistently produce cleaner output than twice as many positive instructions. LLMs predict the most likely next token — negative constraints override bad defaults and close escape hatches the AI would otherwise use.
      </TipBox>
    </ContentPage>
  </>
);

export default Ch06AvoidingSlop;
