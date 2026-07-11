import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, WarningBox, CodeBlock } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Troubleshooting" wrap={false}>
    <SectionHeading>Orphaned Headings</SectionHeading>
    <WarningBox label="Symptom">
      A section heading appears at the very bottom of a page with no content following it. The body text starts on the next page.
    </WarningBox>
    <Text style={styles.body}>
      On a wrapping Page, minPresenceAhead moves the heading forward when too little content can follow it. This project's ContentPage is non-wrapping, so prevent orphans by shortening or splitting the source page during visual QA.
    </Text>
    <CodeBlock language="tsx">{`{/* Use inside a wrapping Page */}
<View wrap={false} minPresenceAhead={40}>
  <Text style={styles.h2Text}>Section Title</Text>
</View>`}</CodeBlock>

    <SectionHeading>Split Callout Boxes</SectionHeading>
    <WarningBox label="Symptom">
      A colored callout box splits across a page break. The top half shows the colored background, the bottom appears without – looking broken.
    </WarningBox>
    <Text style={styles.body}>
      Callout boxes should always stay on a single page. The TipBox, WarningBox, and InfoBox components include wrap=false internally. For custom callouts, add wrap=false to the outer View.
    </Text>
  </ContentPage>
);

export default Page;
