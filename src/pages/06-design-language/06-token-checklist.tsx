import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, SectionHeading, BulletList } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Language" wrap={false}>
    <SectionHeading>Design Token Checklist</SectionHeading>
    <Table
      headers={['Category', 'Count', 'Example']}
      rows={[
        ['Colors (primary + accent)', '20 shades (10 each)', '#121F3D navy, #F0A000 gold'],
        ['Neutrals + semantic', '5-10 + 4 pairs', 'Gray scale + success/warning/error/info'],
        ['Typography', '10 presets', '8pt codeSmall to 36pt display'],
        ['Spacing', '9 positive + zero', '1pt micro to 48pt xxxl'],
        ['Borders', '3 widths + 4 radii', '0.5pt thin to 10pt lg radius'],
      ]}
      columnWidths={['35%', '20%', '45%']}
    />

    <View wrap={false} minPresenceAhead={40}>
      <SectionHeading>Auditing Your Tokens</SectionHeading>
      <Text style={styles.body}>
        Run your theme.ts through this starter list before you build a single page – then let it grow. This book's theme reached 15 categories, from font weights to icon sizes:
      </Text>
    </View>
    <BulletList
      items={[
        'Reusable design values live in theme.ts; unique geometry uses named local constants instead of scattered literals.',
        'Each scale has an intentional progression – a mostly 4pt spacing grid with micro exceptions and a curated type hierarchy.',
        'Semantic colors map to meaning – success, warning, error, info – not to a specific shade you might want to swap later.',
        'Names describe role, not appearance – primary[800] over navyDark, so a rebrand is a centralized palette change.',
      ]}
    />
  </ContentPage>
);

export default Page;
