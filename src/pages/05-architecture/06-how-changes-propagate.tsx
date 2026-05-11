import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>How Changes Propagate</SectionHeading>
    <Text style={styles.body}>
      When you change a design token in theme.ts, every page that imports it updates automatically on the next build. Change your primary color once, and all 30 headings update. Change body font size once, and every paragraph adjusts. This is the power of the architecture: centralized decisions, distributed rendering.
    </Text>
    <Text style={styles.body}>
      The same applies to shared components. Update the Footer component, and every page gets the new footer. Fix a bug in CodeBlock, and every code example benefits. You never have to hunt through a monolith file to find every instance of a repeated pattern.
    </Text>
    <Text style={styles.body}>
      A useful rule of thumb: if a style block or component appears on 3+ pages, extract it into the shared folder. If it only appears once, keep it local to that page file. This keeps the shared layer focused and avoids bloat while still centralizing everything that needs to be consistent.
    </Text>
  </ContentPage>
);

export default Page;
