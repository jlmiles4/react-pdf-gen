import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
    <SectionHeading>Free vs. Premium at a Glance</SectionHeading>
    <Table
      headers={['Signal', 'Free / Generic', 'Premium / Polished']}
      rows={[
        ['Fonts', 'Default Helvetica', 'Custom registered typeface'],
        ['Colors', 'Random hex values', 'Systematic palette with intent'],
        ['Spacing', 'Inconsistent margins', 'Spacing scale (4pt grid)'],
        ['Components', 'Plain text + emoji', 'Styled boxes with SVG icons'],
        ['Hierarchy', 'Everything same size', 'Clear heading scale with accents'],
      ]}
      columnWidths={['20%', '35%', '45%']}
    />

    <SectionHeading>Recipes & Templates</SectionHeading>
    <Text style={styles.body}>
      The checklist tells you what premium looks like. These recipes show you how to build it. Each pattern uses the design tokens from Chapter 4, the shared components from Chapter 3, and the Table component (Chapter 7's table recipe) – if you're starting here, review those chapters first or clone the source code.
    </Text>
    <Text style={styles.body}>
      Three recipes follow: an invoice component (the most-requested PDF use case), a data-driven page generator, and a layout patterns cheat sheet. Each is a self-contained pattern you can copy into your project and customize.
    </Text>
  </ContentPage>
);

export default Page;
