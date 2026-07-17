import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, CodeBlock, TipBox } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Challenges" wrap={false}>
    <SectionHeading>Charts and Data Viz</SectionHeading>
    <Text style={styles.body}>
      react-pdf has no charting primitive, and browser charting libraries (Chart.js, Recharts, D3's DOM rendering) don't run in the renderer – though D3's pure math modules (d3-scale, d3-shape) can compute path data for the Svg primitives. Two routes cover almost every case: render a complex chart externally to a PNG and place it with Image, or build a simple one from Views.
    </Text>
    <Text style={styles.body}>
      For anything intricate – area, scatter, stacked – render it in a headless browser or node-canvas, export a PNG at 3–4x the placed size, and drop it in with a caption. For bars, progress, and gauges, nest two Views and drive the inner width off a percentage:
    </Text>
    <CodeBlock language="tsx">{`const Bar = ({ label, value, max }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
    <Text style={{ fontSize: 9, width: 80 }}>{label}</Text>
    <View style={{ flex: 1, height: 12, backgroundColor: '#e5e7eb', borderRadius: 2 }}>
      <View style={{ width: \`\${(value / max) * 100}%\`, height: 12,
        backgroundColor: '#3b82f6', borderRadius: 2 }} />
    </View>
  </View>
);`}</CodeBlock>
    <TipBox label="Match exported charts to your tokens">
      When you render a PNG chart externally, feed it the same hex values from theme.ts so it doesn't clash with the document, and export at 3–4x the placed size so it prints crisp – a 2x export only reaches roughly 150 DPI.
    </TipBox>
  </ContentPage>
);

export default Page;
