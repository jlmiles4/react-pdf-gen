import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, TipBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Page Breaking</SectionHeading>
    <Text style={styles.body}>
      Control how content flows across pages with these props:
    </Text>
    <BulletList items={[
      'wrap={true} on Page – allows content to overflow to next page (default)',
      'break={true} on View/Text – forces a page break before this element',
      'fixed={true} on View – repeats this element on every page (headers/footers)',
      'minPresenceAhead={number} – minimum points of content that must remain on current page',
      'orphans/widows on Text – minimum lines at bottom/top of page split',
    ]} />

    <TipBox>
      Use the render prop on View or Text to access pageNumber and totalPages for dynamic content like page numbers: render=&#123;(&#123;pageNumber&#125;) =&gt; pageNumber&#125;
    </TipBox>
  </ContentPage>
);

export default Page;
