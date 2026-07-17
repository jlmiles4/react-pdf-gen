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
    <CodeBlock language="tsx">{`import { Font } from '@react-pdf/renderer';
import path from 'path';
const dir = path.resolve(__dirname, '../fonts');
Font.register({ family: 'Inter', fonts: [
  { src: path.join(dir, 'Inter-Regular.ttf'),  fontWeight: 400 },
  { src: path.join(dir, 'Inter-SemiBold.ttf'), fontWeight: 600 },
  { src: path.join(dir, 'Inter-Bold.ttf'),     fontWeight: 700 },
] });  // + Medium 500 and italics in the real project`}</CodeBlock>

    <WarningBox label="Font Limitations">
      Only TTF and WOFF formats work – OTF files and variable fonts are not supported. Missing styles fail; missing weights resolve to the nearest registered weight.
    </WarningBox>

    <SectionHeading>Using Registered Fonts</SectionHeading>
    <Text style={styles.body}>
      Reference a registered family by name and request a weight or style. Register the variants you intend to use so nearest-weight fallback never changes the design unexpectedly.
    </Text>
    <Table
      headers={['Style', 'Resolves to', 'Common use']}
      rows={[
        ['fontWeight: 400', 'Inter-Regular.ttf', 'Body copy, captions'],
        ['fontWeight: 600', 'Inter-SemiBold.ttf', 'Headings, bold text'],
        ['fontWeight: 700', 'Inter-Bold.ttf', 'Heaviest emphasis'],
      ]}
      columnWidths={['34%', '34%', '32%']}
    />
  </ContentPage>
);

export default Page;
