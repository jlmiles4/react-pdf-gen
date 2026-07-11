import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors } from '../../styles/theme';
import { ContentPage, CodeBlock, SectionHeading, IconList } from '../../components';
import { CheckIcon } from '../../components/Icons';

const Page: React.FC = () => (
  <ContentPage sectionTitle="AI Visual Analysis" wrap={false}>
    <SectionHeading>Export Script</SectionHeading>
    <Text style={styles.body}>
      Wire the export into package.json: "pnpm build" generates the PDF, "pnpm export" rasterizes it to PNGs, and "pnpm pipeline" chains both. The script below is simplified – the full version also checks for a missing PDF or pdftoppm.
    </Text>
    <CodeBlock language="bash">{'#!/bin/bash\n# scripts/export-pages.sh (simplified)\nset -e\nPDF_FILE="output/react-pdf-ai-builders-guide.pdf"\nPNG_DIR="output/pages"\nDPI="${1:-200}"  # DPI argument, default 200\nmkdir -p "$PNG_DIR"\nrm -f "$PNG_DIR"/page-*.png  # clear stale pages\npdftoppm -png -r "$DPI" "$PDF_FILE" "$PNG_DIR/page"\necho "Exported to $PNG_DIR/"\nls -lh "$PNG_DIR"/page-*.png'}</CodeBlock>

    <SectionHeading>What AI Can Spot</SectionHeading>
    <Text style={styles.body}>
      Be specific in your prompts: "Check if the heading alignment is consistent across pages 3-7" works better than "review this PDF." And review in small batches – assistants cap images per conversation (the Claude API allows 100), so open only the pages you changed. Here's what vision models reliably detect:
    </Text>
    <IconList
      icon={CheckIcon}
      color={colors.success}
      items={[
        'Alignment inconsistencies between elements',
        'Spacing irregularities (uneven margins, padding gaps)',
        'Font size mismatches across similar elements',
        'Color contrast issues (text hard to read on background)',
        'Layout balance problems (too heavy on one side)',
        'Missing or broken elements',
        'Orphaned lines at page breaks',
        'Overall visual hierarchy assessment',
      ]}
    />
  </ContentPage>
);

export default Page;
