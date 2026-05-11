import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, WarningBox, CodeBlock, BulletList } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Troubleshooting" wrap={false}>
    <SectionHeading>Build and Memory Errors</SectionHeading>
    <WarningBox label="Symptom">
      Build crashes with "JavaScript heap out of memory" or takes extremely long to complete.
    </WarningBox>
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
  </ContentPage>
);

export default Page;
