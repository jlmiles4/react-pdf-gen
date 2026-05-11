import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, TipBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Icons vs Emojis" wrap={false}>
    <SectionHeading>Sizing Cheat Sheet</SectionHeading>
    <Text style={styles.body}>
      Match icons to the text they sit next to. Oversized icons next to small text looks amateur; undersized icons disappear.
    </Text>
    <Table
      headers={['Context', 'Icon Size', 'Text Size']}
      rows={[
        ['Inline with body text', '12-14px', '11pt body'],
        ['Bullet list markers', '10-12px', '9.5-11pt'],
        ['Section headers', '18-20px', '20pt h2'],
        ['Feature showcases', '24-32px', 'Display or standalone'],
        ['Callout box labels', '14-16px', '11-13pt label'],
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
        ['Stroke width', 'N/A', 'Configurable per icon'],
        ['Print quality', 'May rasterize poorly', 'Vector – infinite resolution'],
        ['Token cost', '1-3 tokens', '~20-30 tokens per icon'],
        ['AI consistency', 'Unpredictable', 'Deterministic output'],
      ]}
      columnWidths={['25%', '35%', '40%']}
    />

    <TipBox label="The 10-Icon Rule">
      Re-export at most 10 icons from your project's Icons.tsx. Anything more bloats every prompt that imports it. If a page needs a one-off, import directly from <Text style={styles.bold}>react-icons/lu</Text> at the call site instead.
    </TipBox>
  </ContentPage>
);

export default Page;
