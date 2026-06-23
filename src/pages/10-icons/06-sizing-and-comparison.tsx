import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Icons over Emojis" wrap={false}>
    <SectionHeading>Sizing Cheat Sheet</SectionHeading>
    <Text style={styles.body}>
      Match icons to the text beside them – oversized looks amateur, undersized disappears.
    </Text>
    <Table
      headers={['Context', 'Icon Size', 'Text Size']}
      rows={[
        ['Inline with body text', '12-14pt', '11pt body'],
        ['Bullet list markers', '10-12pt', '9.5-11pt'],
        ['Section headers', '16pt', '20pt h2'],
        ['Feature showcases', '24pt', 'Display or standalone'],
        ['Callout box labels', '13pt', '13pt label'],
      ]}
      columnWidths={['40%', '30%', '30%']}
    />

    <SectionHeading>Emoji vs Icon, Side by Side</SectionHeading>
    <Table
      headers={['Property', 'Emoji', 'SVG Icon']}
      rows={[
        ['Rendering', 'Platform-dependent', 'Identical everywhere'],
        ['Sizing', 'Fixed to font size', 'Any size, precise control'],
        ['Color', 'Cannot be changed', 'Any color from your palette'],
        ['Print quality', 'May rasterize poorly', 'Vector – infinite resolution'],
        ['AI consistency', 'Unpredictable', 'Deterministic output'],
      ]}
      columnWidths={['25%', '35%', '40%']}
    />
  </ContentPage>
);

export default Page;
