import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, WarningBox, CodeBlock } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Troubleshooting" wrap={false}>
      <SectionHeading>Raw Strings Outside a Text Component</SectionHeading>
      <WarningBox label="Console Warning">
        "Invalid '...' string child outside &lt;Text&gt; component"
      </WarningBox>
      <Text style={styles.body}>
        This is the most common react-pdf mistake. Raw strings placed inside a View (or any non-Text component) are silently dropped from the PDF – the only trace is a console warning. Every visible string must be wrapped in a Text component.
      </Text>
      <CodeBlock language="tsx">{`// Broken – raw string inside View
<View>
  This text silently disappears
</View>

// Fixed – wrap in Text
<View>
  <Text style={styles.body}>This renders correctly</Text>
</View>`}</CodeBlock>

      <SectionHeading>Fonts Not Loading</SectionHeading>
      <WarningBox label="Symptom">
        The build reports an unregistered family or unreadable font file, or text uses a different weight than expected.
      </WarningBox>
      <Text style={styles.body}>
        An unknown family or bad file path fails the build. An unavailable weight is quieter: react-pdf selects the nearest registered weight in that family. Helvetica appears when fontFamily is omitted.
      </Text>
  </ContentPage>
);

export default Page;
