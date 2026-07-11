import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, TipBox, InfoBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Tokenization" wrap={false}>
    <Text style={styles.body}>
      Total context: roughly 2,650 tokens. The AI has everything it needs to produce code that matches your design system, uses the correct component wrapper, and fits the existing page structure. No guesswork required.
    </Text>

    <InfoBox label="Project Docs vs. Research">
      Keep concise project guidance – design tokens, component API, conventions – in docs/. Reserve reference/ for long-form research. Point AI to the smallest relevant docs instead of loading all source files.
    </InfoBox>

    <TipBox label="Token Budget Template">
      For each AI edit session, aim for this budget: theme (1,650) + components (350) + target page (450) + instructions (200) = 2,650 tokens. In a 128K context window, that leaves about 98% available for reasoning and output.
    </TipBox>

    <SectionHeading>Measure Your Own Files</SectionHeading>
    <Text style={styles.body}>
      Estimates lie. Real numbers don't. Run this in your project root for a per-file token estimate (4 chars ≈ 1 token):
    </Text>
    <CodeBlock language="bash">{`# Approximate token count per .tsx file, largest first
find src -name '*.tsx' -exec wc -c {} \\; \\
  | awk '{ printf "%6d tokens  %s\\n", $1/4, $2 }' \\
  | sort -rn | head -20`}</CodeBlock>
    <Text style={styles.body}>
      Page or feature files over 1,500 tokens are worth reviewing for a split. Cohesive source-of-truth files such as theme.ts can stay larger when dividing them would make the system harder to follow. Then sum the files an AI actually needs for one edit (theme + components + target page + instructions). A total under 4,000 is compact even for a 32K model and uses just over 3% of a 128K context window.
    </Text>
  </ContentPage>
);

export default Page;
