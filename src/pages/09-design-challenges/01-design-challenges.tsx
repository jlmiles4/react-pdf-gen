import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, SectionHeading, WarningBox } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Challenges" wrap={false}>
      <SectionHeading>What Works Well</SectionHeading>
      <Text style={styles.body}>
        React-PDF will frustrate you if you fight it. Don't. These patterns work cleanly – lean into them and you'll build faster than you expect:
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

      <SectionHeading>What to Avoid</SectionHeading>
      <Text style={styles.body}>
        The flip side: a handful of patterns that feel reasonable in a browser but quietly break in PDF. Reach for them and you'll spend your afternoon debugging layout instead of shipping pages:
      </Text>

      <BulletList items={[
        'Percentage heights in an unsized parent – they resolve against nothing and collapse',
        'Floated or grid layouts – only flexbox is supported, so stick to row and column',
        'position: "fixed" – no such style value; repetition comes from the fixed={true} prop',
        'Deeply nested Views chasing pixel-perfect alignment – flatten and let flex do the work',
      ]} />

      <WarningBox label="Watch out">
        When a layout misbehaves, the cause is almost always an unsupported CSS property failing silently rather than a bug in your component – check against the supported-style list before you start bisecting.
      </WarningBox>
  </ContentPage>
);

export default Page;
