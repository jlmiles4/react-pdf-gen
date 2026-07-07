import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, TipBox, CodeBlock, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Page Breaking</SectionHeading>
    <BulletList items={[
      'wrap={true} on Page – allows content to overflow to next page (default)',
      'break={true} on View/Text – forces a page break before this element',
      'fixed={true} on View – repeats this element on every page (headers/footers)',
      'minPresenceAhead={number} – breaks to next page unless this many points of space remain after it',
      'orphans/widows on Text – minimum lines at bottom/top of page split',
    ]} />

    <TipBox>
      Use the render prop on View or Text to access pageNumber and totalPages for dynamic content like page numbers. Example: <Text style={styles.inlineCode}>{'render={({ pageNumber }) => pageNumber}'}</Text>
    </TipBox>

    <SectionHeading>A Complete Example</SectionHeading>
    <Text style={styles.body}>
      A fixed footer, a forced break before a new chapter, and a card that refuses to split – combined in one tree:
    </Text>
    <CodeBlock language="tsx">{`<Page wrap>
  <View fixed style={footer}>
    <Text render={({ pageNumber, totalPages }) =>
      \`\${pageNumber} / \${totalPages}\`} />
  </View>
  <View break>
    <Text>Chapter 2 starts on a fresh page</Text>
  </View>
  <View wrap={false}>
    {/* This card stays whole or moves down */}
  </View>
</Page>`}</CodeBlock>
  </ContentPage>
);

export default Page;
