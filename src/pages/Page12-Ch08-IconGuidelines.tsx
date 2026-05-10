import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors } from '../styles/theme';
import { ContentPage, SectionHeading, CodeBlock, Table, TipBox, WarningBox } from '../components';

const Ch08IconGuidelines: React.FC = () => (
  <ContentPage sectionTitle="Icons vs Emojis">
    <SectionHeading>Skip the Path Data — Use react-icons</SectionHeading>
    <Text style={styles.body}>
      The book's source ships an Icon adapter that takes any react-icons IconType and renders it through @react-pdf/renderer's Svg primitives. You get 50,000+ vetted icons (Lucide, Heroicons, Feather, Tabler, Font Awesome) with one import — no path-string copying, no SVG hand-tuning.
    </Text>
    <CodeBlock language="tsx">{`import { LuCheck, LuTriangleAlert } from 'react-icons/lu';
import Icon from './components/Icon';

<Icon icon={LuCheck} size={14} color={colors.success} />
<Icon icon={LuTriangleAlert} size={16} color={colors.warning} />`}</CodeBlock>
    <Text style={styles.body}>
      Re-export the icons your document actually uses from a single Icons.tsx so prompts stay short. Keep that re-export file under ~12 icons; ad-hoc <Text style={styles.bold}>react-icons/lu</Text> imports are fine for one-off uses.
    </Text>

    <WarningBox label="Path Data Quality">
      Not every icon library renders cleanly. Stick to stroke-based sets (Lucide, Feather, Heroicons-outline). Avoid icons that rely on filters, masks, or clipPath — react-pdf's SVG renderer skips those features silently.
    </WarningBox>

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

export default Ch08IconGuidelines;
