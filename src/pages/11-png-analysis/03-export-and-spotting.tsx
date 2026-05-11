import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, iconSize } from '../../styles/theme';
import { ContentPage, CodeBlock, SectionHeading } from '../../components';
import { CheckIcon } from '../../components/Icons';

const local = StyleSheet.create({
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
});

const Page: React.FC = () => (
  <ContentPage sectionTitle="AI Visual Analysis" wrap={false}>
    <SectionHeading>Export Script</SectionHeading>
    <Text style={styles.body}>
      Automate the full pipeline: build PDF, export PNGs, and optionally open for review. Add the export script to your package.json scripts — run "pnpm build" to generate PDF, then "pnpm export" to create PNGs.
    </Text>
    <CodeBlock language="bash">{'#!/bin/bash\n# scripts/export-pages.sh\nset -e\nPDF_FILE="output/ebook.pdf"\nPNG_DIR="output/pages"\nDPI=200\nmkdir -p "$PNG_DIR"\necho "Exporting pages at $DPI DPI..."\npdftoppm -png -r "$DPI" "$PDF_FILE" "$PNG_DIR/page"\necho "Export complete."\nls -lh "$PNG_DIR"/page-*.png'}</CodeBlock>

    <SectionHeading>What AI Can Spot</SectionHeading>
    <Text style={styles.body}>
      Be specific in your prompts: "Check if the heading alignment is consistent across pages 3-7" works better than "review this PDF." Here's what vision models reliably detect:
    </Text>
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
  </ContentPage>
);

export default Page;
