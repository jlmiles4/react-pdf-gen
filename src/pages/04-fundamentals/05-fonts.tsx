import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, WarningBox, SectionHeading, Table } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Font Registration</SectionHeading>
    <Text style={styles.body}>
      Three font families are built in: Courier, Helvetica, and Times-Roman, each with bold and italic variants. For anything else, you register fonts explicitly.
    </Text>
    <CodeBlock language="tsx">{`Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Regular.ttf' },
    { src: '/fonts/Inter-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Inter-Italic.ttf', fontStyle: 'italic' },
  ],
});`}</CodeBlock>

    <WarningBox label="Font Limitations">
      Only TTF and WOFF formats work – OTF files and variable fonts are not supported. Register every weight and style you need; the renderer won't synthesize them.
    </WarningBox>

    <SectionHeading>Using Registered Fonts</SectionHeading>
    <Text style={styles.body}>
      Reference a registered family by name and request a weight or style – the numeric weight must match one you registered.
    </Text>
    <Table
      headers={['Style', 'Resolves to', 'Common use']}
      rows={[
        ['fontWeight: 400', 'Inter-Regular.ttf', 'Body copy, captions'],
        ['fontWeight: 700', 'Inter-Bold.ttf', 'Headings, emphasis'],
        ["fontStyle: 'italic'", 'Inter-Italic.ttf', 'Quotes, asides'],
      ]}
      columnWidths={['34%', '34%', '32%']}
    />
  </ContentPage>
);

export default Page;
