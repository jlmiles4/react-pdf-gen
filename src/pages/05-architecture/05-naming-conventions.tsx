import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, WarningBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>Naming Conventions</SectionHeading>
    <Text style={styles.body}>
      File names follow a strict pattern: PageNN-ChNN-Topic.tsx for pages, PascalCase.tsx for components. The page number prefix keeps files sorted in the correct order in your editor and makes it obvious which page you're editing. When you tell an AI "edit Page07", there's zero ambiguity about which file to open.
    </Text>

    <WarningBox label="Anti-Patterns">
      Avoid these structures – they make AI editing harder and more error-prone: monolithic single-file documents, inline styles on every element (use StyleSheet.create), deeply nested component trees that span pages, importing all components everywhere instead of just what's needed.
    </WarningBox>
  </ContentPage>
);

export default Page;
