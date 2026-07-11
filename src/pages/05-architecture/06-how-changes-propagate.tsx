import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, CodeBlock, Table } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>How Changes Propagate</SectionHeading>
    <Text style={styles.body}>
      When you change a design token in theme.ts, every consumer updates on the next build. Change primary[800], and the heading roles that use it update. Change typography.body.fontSize, and copy using the body preset adjusts. This is centralized decision-making with distributed rendering.
    </Text>
    <Text style={styles.body}>
      The same applies to shared components. Update the Footer component, and every content page gets the new footer. Fix a bug in CodeBlock, and every code example benefits. You never have to hunt through a monolith file to find every instance of a repeated pattern.
    </Text>
    <Text style={styles.body}>
      A useful rule of thumb: if a style block or component appears on 3+ pages, extract it into the shared folder. If it only appears once, keep it local to that page file. This keeps the shared layer focused and avoids bloat while still centralizing everything that needs to be consistent.
    </Text>
    <SectionHeading>One Edit, Many Pages</SectionHeading>
    <Text style={styles.body}>
      The system hinges on importing values instead of repeating them. Each heading role references a named color, so a token edit reaches every component that consumes it on the next build:
    </Text>
    <CodeBlock language="ts">{`// src/styles/theme.ts – reusable design tokens (excerpt)
export const colors = {
  primary: { 800: '#121F3D' /* ...9 more steps */ }, // change here ...
  accent:  { 500: '#F0A000' /* ...9 more steps */ }, // ...every consumer follows
};`}</CodeBlock>
    <Table
      headers={['You change...', 'What updates', 'Blast radius']}
      rows={[
        ['A design token', 'Every component consuming it', 'Targeted to book-wide'],
        ['A shared component', 'Every page using it', 'Many pages'],
        ['One page file', 'Only that page', 'Single page'],
      ]}
      columnWidths={['30%', '42%', '28%']}
    />
  </ContentPage>
);

export default Page;
