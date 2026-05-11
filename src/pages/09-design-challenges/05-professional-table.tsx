import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Challenges" wrap={false}>
    <SectionHeading>Recipe: Professional Table</SectionHeading>
    <Text style={styles.body}>
      Tables in react-pdf are built with flexbox rows, not HTML table elements. The key ingredients: a dark header row with white bold text, alternating row backgrounds for scan-ability, consistent padding, and subtle bottom borders. Use flex: 1 on cells for equal-width columns, or explicit widths like '30%' for custom proportions. Stick to 1-3 columns — anything wider gets cramped on LETTER or A4.
    </Text>
    <CodeBlock language="tsx">{`const DataTable = ({ headers, rows, widths }) => (
  <View style={styles.tableContainer}>
    {/* Header row */}
    <View style={styles.tableHeader}>
      {headers.map((h, i) => (
        <Text key={i} style={[styles.tableHeaderText,
          { width: widths[i] }]}>{h}</Text>
      ))}
    </View>
    {/* Data rows with alternating colors */}
    {rows.map((row, ri) => (
      <View key={ri} style={ri % 2 === 1
        ? styles.tableRowAlt : styles.tableRow}>
        {row.map((cell, ci) => (
          <Text key={ci} style={[styles.tableCell,
            { width: widths[ci] }]}>{cell}</Text>
        ))}
      </View>
    ))}
  </View>
);`}</CodeBlock>

    <Text style={styles.body}>
      Every workaround in this chapter follows the same pattern: the CSS property you want doesn't exist, so you build it from View, Text, and flexbox. That's not a limitation -- it's the entire design philosophy. Once you stop reaching for web-centric CSS and start thinking in react-pdf primitives, layouts get faster to build, not slower.
    </Text>
  </ContentPage>
);

export default Page;
