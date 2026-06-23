import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, SectionHeading, CodeBlock } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Units</SectionHeading>
    <Text style={styles.body}>
      The default unit is points (pt). 1 inch = 72 points. You can also use strings with unit suffixes.
    </Text>
    <Table
      headers={['Unit', 'Example', 'Notes']}
      rows={[
        ['Points', '16', 'Default – no suffix needed'],
        ['Inches', '"1in"', '1in = 72pt'],
        ['Millimeters', '"25.4mm"', '25.4mm = 1in = 72pt'],
        ['Centimeters', '"2.54cm"', '2.54cm = 1in = 72pt'],
        ['Percentage', '"50%"', 'Relative to parent container'],
      ]}
      columnWidths={['20%', '25%', '55%']}
    />

    <SectionHeading>Colors</SectionHeading>
    <Text style={styles.body}>
      Hex, RGB, RGBA, HSL, and named colors all work. Define your palette once in a theme file and reference the constants everywhere.
    </Text>
    <CodeBlock language="tsx">{`export const colors = {
  navy: '#0f2942',       // hex
  gold: 'rgb(245, 184, 73)', // rgb
  muted: 'hsl(215, 16%, 47%)', // hsl
  overlay: 'rgba(15, 41, 66, 0.6)', // rgba with alpha
};

// Reference everywhere – change once, update the whole document
<Text style={{ color: colors.navy }}>Heading</Text>`}</CodeBlock>
  </ContentPage>
);

export default Page;
