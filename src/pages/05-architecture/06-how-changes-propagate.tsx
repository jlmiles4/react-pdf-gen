import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, CodeBlock, Table } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>How Changes Propagate</SectionHeading>
    <Text style={styles.body}>
      When you change a design token in theme.ts, every page that imports it updates automatically on the next build. Change your primary color once, and all 30 headings update. Change body font size once, and every paragraph adjusts. This is the power of the architecture: centralized decisions, distributed rendering.
    </Text>
    <Text style={styles.body}>
      The same applies to shared components. Update the Footer component, and every content page gets the new footer. Fix a bug in CodeBlock, and every code example benefits. You never have to hunt through a monolith file to find every instance of a repeated pattern.
    </Text>
    <Text style={styles.body}>
      A useful rule of thumb: if a style block or component appears on 3+ pages, extract it into the shared folder. If it only appears once, keep it local to that page file. This keeps the shared layer focused and avoids bloat while still centralizing everything that needs to be consistent.
    </Text>
    <SectionHeading>One Edit, Many Pages</SectionHeading>
    <Text style={styles.body}>
      The whole system hinges on importing values instead of repeating them. A heading color lives in exactly one place, so a one-line edit ripples through every page that references it on the next build:
    </Text>
    <CodeBlock language="ts">{`// src/styles/theme.ts – the single source of truth (excerpt)
export const colors = {
  primary: { 800: '#121F3D' /* ...9 more steps */ }, // change here ...
  accent:  { 500: '#F0A000' /* ...9 more steps */ }, // ...every page follows
};`}</CodeBlock>
    <Table
      headers={['You change...', 'What updates', 'Blast radius']}
      rows={[
        ['A design token', 'Every page importing it', 'Whole book'],
        ['A shared component', 'Every page using it', 'Many pages'],
        ['One page file', 'Only that page', 'Single page'],
      ]}
      columnWidths={['30%', '42%', '28%']}
    />
  </ContentPage>
);

export default Page;
