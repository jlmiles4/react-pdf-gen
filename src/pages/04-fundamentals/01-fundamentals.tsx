import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, BulletList, WarningBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
      <SectionHeading>Component Hierarchy</SectionHeading>
      <Text style={styles.body}>
        Every react-pdf document follows a strict component hierarchy. Break it and the renderer throws errors.
      </Text>
      <CodeBlock language="tsx">{`import { Document, Page, View, Text, Image }
  from '@react-pdf/renderer';

const MyDoc = () => (
  <Document>
    <Page size="LETTER">
      <View>
        <Text>All visible text must be in a Text component.</Text>
        <Image src="photo.png" />
      </View>
    </Page>
  </Document>
);`}</CodeBlock>

      <Text style={styles.body}>The rules:</Text>
      <BulletList items={[
        'Document is the root – only Page elements can be direct children',
        'Page defines a physical page – size, orientation, margins',
        'View is the container (like div) – handles layout via flexbox',
        'Text renders text – all visible text must be inside Text',
        'Image renders PNG and JPG – no SVG files (use Svg components instead)',
        'No HTML elements allowed inside Document – only react-pdf components',
      ]} />

      <WarningBox label="Common Mistake">
        Putting a raw string outside of a Text component crashes the renderer. Every piece of text, even a space, needs a Text wrapper.
      </WarningBox>
  </ContentPage>
);

export default Page;
