import React from 'react';
import { ContentPage, Table, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Language" wrap={false}>
    <SectionHeading>Design Token Checklist</SectionHeading>
    <Table
      headers={['Category', 'Count', 'Example']}
      rows={[
        ['Colors (primary + accent)', '8-13 shades', '#121F3D navy, #F0A000 gold'],
        ['Neutrals + semantic', '5-8 + 4 pairs', 'Gray scale + success/warning/error/info'],
        ['Typography', '7-9 sizes', '8pt caption to 36pt display'],
        ['Spacing', '6-8 values', '4pt (xs) to 48pt (xxxl)'],
        ['Borders', '3 widths + 3 radii', '0.5pt thin to 10pt lg radius'],
      ]}
      columnWidths={['35%', '20%', '45%']}
    />
  </ContentPage>
);

export default Page;
