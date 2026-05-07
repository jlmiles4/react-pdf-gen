/**
 * Chapter 11 — Troubleshooting & Common Errors
 *
 * The top 8 react-pdf errors with causes and fixes, plus a debug workflow.
 * Each error: SectionHeading + WarningBox with error message + body explanation
 * + CodeBlock with fix. Uses wrap={false} error cards.
 *
 * Sections: Text String Error, Fonts Not Loading, Content Overflows,
 *           Orphaned Headings, Split Callout Boxes, Styles Not Applying,
 *           Flexbox Surprises, Build & Memory Errors, The Debug Workflow
 * Components: CodeBlock, BulletList, TipBox, WarningBox, Table, SectionHeading
 * Renders: 1 chapter title + 3 content pages
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, typography, fontScale } from '../styles/theme';
import ContentPage from '../components/ContentPage';
import ChapterTitle from '../components/ChapterTitle';
import CodeBlock from '../components/CodeBlock';
import BulletList from '../components/BulletList';
import Table from '../components/Table';
import { TipBox, WarningBox } from '../components/TipBox';
import SectionHeading from '../components/SectionHeading';

const local = StyleSheet.create({
  compareRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  compareBox: {
    flex: 1,
    borderWidth: borders.medium,
    borderColor: colors.neutral[200],
    borderRadius: borders.radius.md,
    padding: spacing.md,
    backgroundColor: colors.neutral[50],
  },
  compareLabel: {
    fontSize: typography.code.fontSize,
    fontFamily: fonts.bodyBold,
    fontWeight: 600 as const,
    color: colors.primary[700],
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  compareBadLabel: {
    fontSize: typography.code.fontSize,
    fontFamily: fonts.bodyBold,
    fontWeight: 600 as const,
    color: colors.error,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  mockBlock: {
    backgroundColor: colors.neutral[200],
    borderRadius: borders.radius.sm,
    height: 20,
    marginBottom: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockBlockSmall: {
    flex: 1,
    backgroundColor: colors.neutral[200],
    borderRadius: borders.radius.sm,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  mockText: {
    fontSize: fontScale.micro,
    fontFamily: fonts.mono,
    fontWeight: 400 as const,
    color: colors.neutral[600],
  },
});

const Ch11Troubleshooting: React.FC = () => (
  <>
    <ChapterTitle
      number="11"
      title="Troubleshooting & Common Errors"
      subtitle="The errors you'll hit, why they happen, and how to fix them fast."
    />

    {/* --- Page 1: Errors 1-3 --- */}
    <ContentPage sectionTitle="Troubleshooting">
      <SectionHeading>Text String Must Be Rendered Inside Text</SectionHeading>
      <WarningBox label="Error Message">
        "Text string must be rendered inside a &lt;Text&gt; component."
      </WarningBox>
      <Text style={styles.body}>
        This is the most common react-pdf crash. Raw strings placed directly inside a View (or any non-Text component) cause the renderer to fail. Every piece of visible text must be wrapped in a Text component.
      </Text>
      <CodeBlock language="tsx">{`// Broken — raw string inside View
<View>
  This will crash
</View>

// Fixed — wrap in Text
<View>
  <Text style={styles.body}>This renders correctly</Text>
</View>`}</CodeBlock>

      <SectionHeading>Fonts Not Loading</SectionHeading>
      <WarningBox label="Symptom">
        Text renders in Helvetica instead of your registered font, or the PDF shows blank text where custom fonts should appear.
      </WarningBox>
      <Text style={styles.body}>
        Font issues are silent — react-pdf falls back to Helvetica without warning. Common causes: wrong file path, unregistered weight, or mismatched fontFamily name.
      </Text>
      <CodeBlock language="tsx">{`// Check 1: Is the path correct? Use a resolved base dir.
const FONTS_DIR = path.resolve(__dirname, '../fonts');
Font.register({ family: 'Inter', fonts: [
  { src: path.join(FONTS_DIR, 'Inter-Regular.ttf'),
    fontWeight: 400 },
  { src: path.join(FONTS_DIR, 'Inter-Bold.ttf'),
    fontWeight: 700 },
]});

// Check 2: Does fontWeight match a registered weight?
// This falls back to nearest weight (700) — not 600:
<Text style={{ fontFamily: 'Inter', fontWeight: 600 }}>Oops</Text>`}</CodeBlock>

      <SectionHeading>Content Overflows the Page</SectionHeading>
      <WarningBox label="Symptom">
        Content runs off the bottom of the page, disappearing below the margin. Footer may overlap with body text.
      </WarningBox>
      <Text style={styles.body}>
        Two common causes: a parent View has wrap=false (preventing page breaks), or fixed heights constrain the layout. react-pdf needs wrapping enabled to split content across pages.
      </Text>
      <CodeBlock language="tsx">{`// Problem: wrap={false} prevents page breaks
<View wrap={false} style={{ minHeight: 800 }}>
  {/* Content can't split — overflows the page */}
</View>

// Fix: wrap the parent, lock individual items
<View> {/* wrap={true} is default */}
  {items.map((item, i) => (
    <View key={i} wrap={false}> {/* Each item stays together */}
      <Text style={styles.body}>{item}</Text>
    </View>
  ))}
</View>`}</CodeBlock>
    </ContentPage>

    {/* --- Page 2: Errors 4-6 --- */}
    <ContentPage sectionTitle="Troubleshooting">
      <SectionHeading>Orphaned Headings</SectionHeading>
      <WarningBox label="Symptom">
        A section heading (gold bar + title) appears at the very bottom of a page with no content following it. The body text starts on the next page.
      </WarningBox>
      <Text style={styles.body}>
        This happens when a heading fits at the page bottom but its following content doesn't. The fix is minPresenceAhead — it tells react-pdf to move the heading to the next page if there isn't enough room for both the heading and some content.
      </Text>
      <CodeBlock language="tsx">{`// Fix: add minPresenceAhead to heading wrapper
<View wrap={false} minPresenceAhead={40}>
  <Text style={styles.h2}>Section Title</Text>
</View>
// Now the heading only renders on this page if at least
// 40pt of content can fit below it`}</CodeBlock>

      <SectionHeading>Split Callout Boxes</SectionHeading>
      <WarningBox label="Symptom">
        A colored callout box (TipBox, WarningBox, InfoBox) splits across a page break. The top half shows the colored background and border, the bottom half appears on the next page without the background — looking broken.
      </WarningBox>
      <Text style={styles.body}>
        Callout boxes should always stay on a single page. The TipBox, WarningBox, and InfoBox components in this book already include wrap=false internally. If you build custom callouts, add wrap=false to the outer View. If a callout is too tall for one page, split it into two shorter boxes.
      </Text>
      <CodeBlock language="tsx">{`// The TipBox component already handles this:
<TipBox label="My Tip">
  Keep callout text concise — 2-3 sentences max.
</TipBox>

// For custom callouts, add wrap={false} yourself:
<View wrap={false} style={styles.tipBox}>
  <Text style={styles.tipLabel}>Custom Callout</Text>
  <Text style={styles.body}>Content here.</Text>
</View>`}</CodeBlock>

      <SectionHeading>Styles Not Applying</SectionHeading>
      <WarningBox label="Symptom">
        CSS-like styles that work in the browser have no effect in react-pdf. Properties seem to be ignored silently.
      </WarningBox>
      <Text style={styles.body}>
        react-pdf supports a subset of CSS. Property names must be camelCase, and several common web CSS properties are not available. Here are the most common mismatches:
      </Text>
      <Table
        headers={['Web CSS', 'react-pdf Equivalent']}
        rows={[
          ['box-shadow', 'Not supported — use borderWidth + borderColor'],
          ['text-decoration', 'textDecoration (underline, line-through)'],
          ['background: linear-gradient(...)', 'Not supported — use Svg + Defs'],
          ['display: grid', 'Not supported — use flexbox'],
          ['overflow: hidden', 'Not supported on Text'],
          ['font-weight: bold', 'fontWeight: 700 (numeric or named)'],
        ]}
        columnWidths={['45%', '55%']}
      />
    </ContentPage>

    {/* --- Page 3: Errors 7-8 + Debug Workflow --- */}
    <ContentPage sectionTitle="Troubleshooting">
      <SectionHeading>Flexbox Layout Surprises</SectionHeading>
      <WarningBox label="Symptom">
        Elements stack vertically when you expect them side-by-side, or percentage widths don't add up correctly.
      </WarningBox>
      <Text style={styles.body}>
        react-pdf uses Yoga (React Native's layout engine), not browser CSS. The key difference: the default flexDirection is "column", not "row". Other gotchas include percentage widths requiring an explicit width on the parent.
      </Text>

      <View wrap={false} style={local.compareRow}>
        <View style={local.compareBox}>
          <Text style={local.compareBadLabel}>Default: column</Text>
          <View style={local.mockBlock}>
            <Text style={local.mockText}>width: 50%</Text>
          </View>
          <View style={local.mockBlock}>
            <Text style={local.mockText}>width: 50%</Text>
          </View>
        </View>
        <View style={local.compareBox}>
          <Text style={local.compareLabel}>Fixed: row</Text>
          <View style={local.mockRow}>
            <View style={local.mockBlockSmall}>
              <Text style={local.mockText}>50%</Text>
            </View>
            <View style={local.mockBlockSmall}>
              <Text style={local.mockText}>50%</Text>
            </View>
          </View>
        </View>
      </View>

      <CodeBlock language="tsx">{`// Gotcha: default is column (vertical stacking)
<View> {/* flexDirection: 'column' is implied */}
  <View style={{ width: '50%' }} /> {/* stacks vertically */}
  <View style={{ width: '50%' }} />
</View>

// Fix: explicitly set row direction
<View style={{ flexDirection: 'row' }}>
  <View style={{ width: '50%' }} /> {/* side by side */}
  <View style={{ width: '50%' }} />
</View>`}</CodeBlock>

      <View wrap={false}>
        <SectionHeading>Build and Memory Errors</SectionHeading>
        <WarningBox label="Symptom">
          Build crashes with "JavaScript heap out of memory" or takes extremely long to complete.
        </WarningBox>
      </View>
      <Text style={styles.body}>
        Large documents with many images consume significant memory. The Node.js default heap limit (~1.5 GB) may not be enough for image-heavy PDFs over 30-40 pages.
      </Text>
      <CodeBlock language="bash">{`# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096 pnpm build

# Or add to package.json scripts:
"build": "NODE_OPTIONS=--max-old-space-size=4096 tsx src/build.tsx"`}</CodeBlock>
      <BulletList items={[
        'Resize images to actual display size before embedding (2x for retina)',
        'Use JPEG for photos (quality 80), PNG only for graphics with transparency',
        'For 50+ page documents, consider splitting into multiple PDF files',
      ]} />

      <View wrap={false}>
        <SectionHeading>The Debug Workflow</SectionHeading>
        <Text style={styles.body}>
          When something looks wrong in your PDF, follow this sequence:
        </Text>
        <BulletList items={[
          'Simplify: comment out everything except the broken section. Does it still break in isolation?',
          'Isolate: move the broken component into a standalone single-page document. Render it alone.',
          'Check wrap: add wrap={false} to containers that should stay together, remove it from containers that need to split.',
          'Check fonts: temporarily switch to fontFamily: "Helvetica" to rule out font issues.',
          'Check styles: log style objects to console. Are values what you expect? Are you using camelCase?',
          'Rebuild incrementally: add sections back one at a time until the break reappears. That\'s your culprit.',
        ]} />
      </View>

      <TipBox label="The Fastest Fix">
        Most react-pdf layout issues come from three sources: missing wrap=false on elements that should stay together, missing Text wrappers around strings, and flexDirection defaulting to column. Check these three things first before diving deeper.
      </TipBox>

      <SectionHeading>Closing the Loop</SectionHeading>
      <Text style={styles.body}>
        Chapter 1 made a claim: the gap between "AI-generated PDF" and "premium deliverable" is a matter of specific patterns, not talent or luck. This chapter is proof. Every error above has a concrete fix. Every fix maps back to the patterns from earlier chapters:
      </Text>
      <Table
        headers={['Error', 'Root Fix', 'Pattern From']}
        rows={[
          ['Text not in <Text>', 'Wrap all strings', 'Ch2: Fundamentals'],
          ['Wrong font', 'Match fontWeight to registered weights', 'Ch4: Design Tokens'],
          ['Content overflow', 'Remove wrap={false} from parent', 'Ch7: Challenges'],
          ['Orphaned heading', 'minPresenceAhead={40}', 'Ch7: Challenges'],
          ['Split callout', 'wrap={false} on outer View', 'Ch7: Challenges'],
          ['Styles ignored', 'Use camelCase, check support', 'Ch2: Fundamentals'],
          ['Wrong layout', 'Set flexDirection: "row"', 'Ch7: Challenges'],
          ['Out of memory', 'Resize images, increase heap', 'Ch11: Troubleshooting'],
        ]}
        columnWidths={['25%', '40%', '35%']}
      />
      <Text style={styles.body}>
        The debug workflow isn't something you do when things go wrong. It's the last step in the build loop: write, render, export, review, fix. When that loop is fast — and with react-pdf and PNG export, it's very fast — you stop fearing bugs and start shipping.
      </Text>
    </ContentPage>
  </>
);

export default Ch11Troubleshooting;
