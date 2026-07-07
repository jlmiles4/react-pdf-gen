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
        Text renders in Helvetica instead of your registered font, or the PDF shows blank text where custom fonts should appear.
      </WarningBox>
      <Text style={styles.body}>
        Font issues are silent, with no warning. A wrong file path or a mismatched fontFamily name drops you all the way to Helvetica; an unregistered weight falls back to the nearest weight within the same family instead.
      </Text>
  </ContentPage>
);

export default Page;
