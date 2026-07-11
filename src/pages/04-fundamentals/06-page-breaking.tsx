import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, TipBox, CodeBlock, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Page Breaking</SectionHeading>
    <BulletList items={[
      'wrap={true} on Page – allows content to overflow to next page (default)',
      'break={true} on View/Text – forces a break when the ancestor Page wraps',
      'fixed={true} on View – repeats on each subpage produced by its Page',
      'minPresenceAhead={number} – moves forward when too little can follow on a wrapping Page',
      'orphans/widows on Text – minimum lines around a split on wrapping pages',
    ]} />

    <TipBox>
      Use Text's render prop for pageNumber and totalPages. View's typed render prop exposes pageNumber and subPageNumber. Example: <Text style={styles.inlineCode}>{'render={({ pageNumber }) => pageNumber}'}</Text>
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
