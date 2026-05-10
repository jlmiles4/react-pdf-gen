import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, typography, fontScale, fontWeight } from '../styles/theme';
import { ContentPage, SectionHeading, WarningBox, CodeBlock, BulletList, TipBox, Table } from '../components';

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
    fontWeight: fontWeight.semibold,
    color: colors.primary[700],
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  compareBadLabel: {
    fontSize: typography.code.fontSize,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.error,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  mockBlock: {
    backgroundColor: colors.neutral[200],
    borderRadius: borders.radius.sm,
    height: spacing.lg + spacing.xs, // 20pt
    marginBottom: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockBlockSmall: {
    flex: 1,
    backgroundColor: colors.neutral[200],
    borderRadius: borders.radius.sm,
    height: spacing.lg + spacing.xs, // 20pt
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
    fontWeight: fontWeight.regular,
    color: colors.neutral[600],
  },
});

const Ch11Debug: React.FC = () => (
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
      Chapter 1 started with a simple premise: professional-grade PDF generation is achievable with AI if you apply the right constraints. This chapter is the practical application of that theory. Every error above has a deterministic solution, and every solution reinforces the architectural patterns we've covered:
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
);

export default Ch11Debug;
