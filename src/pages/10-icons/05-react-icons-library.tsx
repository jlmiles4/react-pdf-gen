import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, WarningBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Icons vs Emojis" wrap={false}>
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
  </ContentPage>
);

export default Page;
