import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, Table, TipBox } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Language" wrap={false}>
    <SectionHeading>Tested Color Palettes</SectionHeading>
    <Text style={styles.body}>
      Generate your own at coolors.co, or start from one of these. Each pairs a dark primary with a saturated accent; keep enough contrast between the two that they read as distinct side by side – a navy primary with a near-navy accent looks muddy. A muted mid-tone secondary fills borders and captions.
    </Text>
    <Table
      headers={['Scheme', 'Primary', 'Accent', 'Best for']}
      rows={[
        ['Navy + Gold', '#1a2b4a', '#d4a843', 'Financial, legal, executive'],
        ['Teal + Amber', '#0f766e', '#f59e0b', 'Tech & product docs'],
        ['Charcoal + Blue', '#1e293b', '#3b82f6', 'SaaS & analytics'],
        ['Black + Red', '#18181b', '#dc2626', 'Editorial, bold statements'],
        ['Warm Earth', '#44403c', '#b45309', 'Nonprofit, sustainability'],
      ]}
      columnWidths={['24%', '19%', '19%', '38%']}
    />
    <TipBox label="Wire the palette into tokens">
      Drop the primary and accent hex values into colors in theme.ts once, and derive the secondary as a desaturated mid-tone of your primary. Every component reads from there, so re-skinning the whole document is a small change – and your AI agent picks up the new palette automatically.
    </TipBox>
  </ContentPage>
);

export default Page;
