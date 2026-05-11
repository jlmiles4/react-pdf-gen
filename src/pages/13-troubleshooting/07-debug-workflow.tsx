import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, TipBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Troubleshooting" wrap={false}>
    <SectionHeading>Debug Workflow</SectionHeading>
    <Text style={styles.body}>
      When something looks wrong in your PDF, follow this sequence:
    </Text>
    <BulletList items={[
      'Simplify: comment out everything except the broken section. Does it still break in isolation?',
      'Isolate: move the broken component into a standalone single-page document. Render it alone.',
      'Check wrap: add wrap={false} to containers that should stay together, remove it from containers that need to split.',
      'Check fonts: temporarily switch to fontFamily: "Helvetica" to rule out font issues.',
      'Check styles: log style objects to console. Are values what you expect? Are you using camelCase?',
      'Rebuild incrementally: add sections back one at a time until the break reappears. That\'s your culprit.',
    ]} />

    <TipBox label="The Fastest Fix">
      Most react-pdf layout issues come from three sources: missing wrap=false on elements that should stay together, missing Text wrappers around strings, and flexDirection defaulting to column. Check these three things first before diving deeper.
    </TipBox>
  </ContentPage>
);

export default Page;
