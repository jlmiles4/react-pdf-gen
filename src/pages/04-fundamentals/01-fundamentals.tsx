import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, BulletList, WarningBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
      <SectionHeading>Component Hierarchy</SectionHeading>
      <Text style={styles.body}>
        Every react-pdf document has a required root and page structure. Inside a Page, supported react-pdf primitives can be direct children. Invalid trees may warn, omit content, or fail to render.
      </Text>
      <CodeBlock language="tsx">{`import { Document, Page, View, Text, Image }
  from '@react-pdf/renderer';

const MyDoc = () => (
  <Document>
    <Page size="LETTER">
      <View>
        <Text>Ordinary visible copy belongs in Text.</Text>
        <Image src="photo.png" />
      </View>
    </Page>
  </Document>
);`}</CodeBlock>

      <Text style={styles.body}>The rules:</Text>
      <BulletList items={[
        'Document is the root – its rendered direct children must be Page elements',
        'Page defines a physical page – size, orientation, margins',
        'View is an optional container (like div) – it handles layout via flexbox',
        'Text renders ordinary visible copy – Page can contain Text directly',
        'Image renders PNG and JPG – no SVG files (use Svg components instead)',
        'No DOM elements inside Document – custom components must resolve to react-pdf primitives',
      ]} />

      <WarningBox label="Common Mistake">
        A raw string directly under Page or View triggers a console warning and is omitted. Put ordinary copy in Text; text-capable primitives such as Link are exceptions.
      </WarningBox>
  </ContentPage>
);

export default Page;
