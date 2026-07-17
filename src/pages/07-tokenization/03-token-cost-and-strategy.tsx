import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, Table, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Tokenization" wrap={false}>
    <SectionHeading>Token Cost of React-PDF Code</SectionHeading>
    <Text style={styles.body}>
      JSX is token-expensive compared to plain text. Here's what typical react-pdf structures cost:
    </Text>
    <Table
      headers={['Structure', 'Approximate Tokens']}
      rows={[
        ['A StyleSheet.create() with 10 style objects', '200-350'],
        ['A simple page (title, 3 paragraphs)', '150-250'],
        ['A complex page (table, code block, callouts)', '400-800'],
        ['A shared component (Header or Footer)', '400-500'],
        ['A theme.ts with full design tokens', '1,700-1,900'],
        ['A 30-page monolith file', '8,000-15,000'],
      ]}
      columnWidths={['60%', '40%']}
    />

    <SectionHeading>Practical Strategy</SectionHeading>
    <Text style={styles.body}>
      When you ask AI to edit a page, it needs context. Here's the optimal context budget:
    </Text>
    <BulletList items={[
      'theme.ts (design tokens): ~1,800 tokens',
      'Relevant shared components: ~300-500 tokens',
      'The page file being edited: ~200-600 tokens',
      'Your instructions: ~100-300 tokens',
      'Total: 2,400-3,200 tokens of context – well within any model\'s sweet spot',
    ]} />
  </ContentPage>
);

export default Page;
