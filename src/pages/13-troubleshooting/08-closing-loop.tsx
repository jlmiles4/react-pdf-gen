import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Troubleshooting" wrap={false}>
    <SectionHeading>Closing the Loop</SectionHeading>
    <Text style={styles.body}>
      Chapter 1 started with a simple premise: professional-grade PDF generation is achievable with AI if you apply the right constraints. Every error above has a deterministic solution, and every solution reinforces the architectural patterns we've covered:
    </Text>
    <Table
      headers={['Error', 'Root Fix', 'Pattern From']}
      rows={[
        ['Text not in <Text>', 'Wrap all strings', 'Ch2: Fundamentals'],
        ['Wrong font', 'Check family/path; register intended weights', 'Ch2: Fundamentals'],
        ['Content overflow', 'Shorten/split the fixed source page', 'Ch2: Fundamentals'],
        ['Orphaned heading', 'Edit/split the fixed source page', 'Ch2: Fundamentals'],
        ['Split callout', 'wrap={false} on outer View', 'Ch2: Fundamentals'],
        ['Styles ignored', 'Use camelCase, check support', 'Ch2: Fundamentals'],
        ['Wrong layout', 'Set flexDirection: "row"', 'Ch7: Challenges'],
        ['Out of memory', 'Resize images, increase heap', 'Ch11: Troubleshooting'],
      ]}
      columnWidths={['25%', '40%', '35%']}
    />
    <Text style={styles.body}>
      The debug workflow isn't something you do when things go wrong. It's the last step in the build loop: write, render, export, review, fix. When that loop is fast – and with react-pdf and PNG export, it's very fast – you stop fearing bugs and start shipping.
    </Text>
  </ContentPage>
);

export default Page;
