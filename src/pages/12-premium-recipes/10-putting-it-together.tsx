import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
    <SectionHeading>Putting It All Together</SectionHeading>
    <BulletList items={[
      'Review Chapter 3 (Architecture) for file-per-page structure that makes these recipes composable',
      'Use Chapter 4\'s design tokens — never hardcode colors or spacing in recipe code',
      'Apply Chapter 7\'s wrap={false} patterns to keep recipe cards from splitting across pages',
      'Clone the source code for this book — every pattern here is used in the pages you\'re reading',
      'Explore the react-pdf GitHub repo for additional component examples and API updates',
    ]} />

    <Text style={styles.body}>
      Every recipe in this chapter follows the same principle: typed data in, styled PDF out. The interface defines the contract, the component handles layout, and the design tokens enforce visual consistency. Start with the recipe closest to your use case, adapt the interface to your data, and build from there.
    </Text>
  </ContentPage>
);

export default Page;
