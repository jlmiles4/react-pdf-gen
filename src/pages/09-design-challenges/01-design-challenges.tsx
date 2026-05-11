import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Challenges" wrap={false}>
      <SectionHeading>What Works Well</SectionHeading>
      <Text style={styles.body}>
        React-pdf will frustrate you if you fight it. Don't. These patterns work cleanly -- lean into them and you'll build faster than you expect:
      </Text>

      <BulletList items={[
        'Single-column layouts with clear heading hierarchy',
        'Two-column layouts using flexDirection: "row" with fixed widths',
        'Full-width colored banners and pull quotes with accent borders',
        'Consistent card patterns: bordered View with padding and borderRadius',
        'SVG decorative elements (lines, circles, icons)',
        'Bullet lists and tables built with flexbox rows',
        'Fixed headers/footers via fixed={true} and dynamic page numbers via render prop',
      ]} />
  </ContentPage>
);

export default Page;
