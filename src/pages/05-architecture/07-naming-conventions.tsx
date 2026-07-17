import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, WarningBox, SectionHeading, Table } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>Naming Conventions</SectionHeading>
    <Text style={styles.body}>
      Chapter files follow a strict pattern: NN-chapter/, with 00-title.tsx for the divider and NN-topic.tsx for content. Cover, TOC, and conclusion are chrome exceptions: each has one 01- file and no divider. Components are PascalCase.tsx. Numeric prefixes keep files sorted and make the target unambiguous. The chapter structure itself lives in src/manifest.ts.
    </Text>

    <WarningBox label="Anti-Patterns">
      Avoid these structures – they make AI editing harder and more error-prone: monolithic single-file documents, inline styles on every element (use StyleSheet.create), deeply nested component trees that span pages, importing all components everywhere instead of just what's needed.
    </WarningBox>

    <SectionHeading>The Pattern at a Glance</SectionHeading>
    <Text style={styles.body}>
      Chapter paths resolve to a handful of shapes; chrome uses the exception above. Once your AI internalizes the rule, it can name new files correctly – and you can predict where anything lives.
    </Text>

    <Table
      headers={['Pattern', 'Example', 'What it is']}
      columnWidths={['32%', '34%', '34%']}
      rows={[
        ['NN-chapter/', '05-architecture/', 'One folder per chapter'],
        ['00-title.tsx', '00-title.tsx', 'The chapter divider page'],
        ['NN-topic.tsx', '07-naming-conventions.tsx', 'A single content page'],
        ['PascalCase.tsx', 'CodeBlock.tsx', 'A reusable component'],
        ['manifest.ts', 'src/manifest.ts', 'The chapter structure'],
      ]}
    />
  </ContentPage>
);

export default Page;
