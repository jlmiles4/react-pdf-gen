import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, WarningBox, CodeBlock, BulletList, Table } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Troubleshooting" wrap={false}>
    <SectionHeading>Build and Memory Errors</SectionHeading>
    <WarningBox label="Symptom">
      Build crashes with "JavaScript heap out of memory" or takes extremely long to complete.
    </WarningBox>
    <Text style={styles.body}>
      Large documents with many images consume significant memory. Node's default heap (typically 2–4 GB, sized from system memory) may not be enough for image-heavy PDFs past ~50 pages.
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
    <SectionHeading>Slow Builds: Find the Culprit</SectionHeading>
    <Table
      headers={['Symptom', 'Likely cause', 'Fix']}
      columnWidths={['28%', '36%', '36%']}
      rows={[
        ['Build hangs early', 'Remote image URLs blocking on the network', 'Download assets once, embed locally'],
        ['Steady RAM climb', 'Full-resolution images embedded as-is', 'Pre-resize to display size, prefer JPEG'],
        ['Slow on every run', 'Re-registering fonts per render', 'Register fonts once at module load'],
      ]}
    />
  </ContentPage>
);

export default Page;
