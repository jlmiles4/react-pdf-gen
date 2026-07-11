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
        ['Spacing', 'Inconsistent margins', '4pt base with micro tokens'],
        ['Components', 'Plain text + emoji', 'Styled boxes with SVG icons'],
        ['Hierarchy', 'Everything same size', 'Clear heading scale with accents'],
      ]}
      columnWidths={['20%', '35%', '45%']}
    />

    <SectionHeading>Recipes & Templates</SectionHeading>
    <Text style={styles.body}>
      These recipes turn the checklist into code. They use Chapter 4's tokens and Chapter 3's shared components; the invoice also reuses Chapter 7's Table. Review those chapters or clone the source if you're starting here.
    </Text>
    <Text style={styles.body}>
      Three recipes follow: an invoice component (the most-requested PDF use case), a data-driven page generator, and a layout patterns cheat sheet. Each is a self-contained pattern you can copy into your project and customize.
    </Text>
  </ContentPage>
);

export default Page;
