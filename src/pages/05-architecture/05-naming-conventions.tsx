import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, WarningBox, SectionHeading, Table } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>Naming Conventions</SectionHeading>
    <Text style={styles.body}>
      File names follow a strict pattern: one folder per chapter (NN-chapter/), with 00-title.tsx for the chapter divider and NN-topic.tsx for each content page. Components are PascalCase.tsx. The numeric prefixes keep files sorted in the right order in your editor and make it obvious which page you're editing. When you tell an AI "edit 05-architecture/05-naming-conventions", there's zero ambiguity about which file to open. The book's chapter structure itself lives in src/manifest.ts.
    </Text>

    <WarningBox label="Anti-Patterns">
      Avoid these structures – they make AI editing harder and more error-prone: monolithic single-file documents, inline styles on every element (use StyleSheet.create), deeply nested component trees that span pages, importing all components everywhere instead of just what's needed.
    </WarningBox>

    <SectionHeading>The Pattern at a Glance</SectionHeading>
    <Text style={styles.body}>
      Every path in the project resolves to one of a handful of shapes. Once your AI internalizes the rule, it can name new files correctly without being told – and you can predict where anything lives.
    </Text>

    <Table
      headers={['Pattern', 'Example', 'What it is']}
      columnWidths={['32%', '34%', '34%']}
      rows={[
        ['NN-chapter/', '05-architecture/', 'One folder per chapter'],
        ['00-title.tsx', '00-title.tsx', 'The chapter divider page'],
        ['NN-topic.tsx', '05-naming-conventions.tsx', 'A single content page'],
        ['PascalCase.tsx', 'CodeBlock.tsx', 'A reusable component'],
        ['manifest.ts', 'src/manifest.ts', 'The chapter structure'],
      ]}
    />
  </ContentPage>
);

export default Page;
