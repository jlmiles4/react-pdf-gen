import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, TipBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Avoiding AI Slop" wrap={false}>
    <SectionHeading>Prompt Templates That Prevent Slop</SectionHeading>
    <Text style={styles.body}>
      The prompts that produce premium react-pdf output share one trait: they front-load constraints so the AI can't improvise. The template below is copy-paste ready – fill the bracketed slots and run it. Six fuller templates ship in the repo's templates/ directory.
    </Text>

    <Text style={styles.h3}>New Page</Text>
    <CodeBlock language="">{`Build a new ContentPage for [TOPIC].

Reference: src/pages/[EXISTING_PAGE].tsx for structure.
Design tokens: src/styles/theme.ts (use ONLY these values).
Components: SectionHeading, BulletList, CodeBlock, TipBox, Table.

Requirements:
- Use ContentPage wrapper with sectionTitle="[SECTION]"
- Import styles from '../../styles/shared'
- All Text components need fontFamily + fontWeight
- wrap={false} on elements that must not split across pages
- No Helvetica, no emoji, no hardcoded colors`}</CodeBlock>

    <TipBox label="The Negative Constraint Pattern">
      Three or four negative constraints ("no Helvetica," "no emoji," "no hardcoded colors") consistently produce cleaner output than twice as many positive instructions. LLMs predict the most likely next token – negative constraints override bad defaults and close escape hatches the AI would otherwise use.
    </TipBox>

    <SectionHeading>Copy-Paste Test</SectionHeading>
    <Text style={styles.body}>
      Open a fresh AI session with no prior context. Paste only the template plus the files it references. If the generated page matches your existing pages, the prompt is good enough; if not, the gap reveals which constraint is missing.
    </Text>
  </ContentPage>
);

export default Page;
