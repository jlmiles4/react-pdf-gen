import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, WarningBox, CodeBlock } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Troubleshooting" wrap={false}>
      <SectionHeading>Text String Must Be Rendered Inside Text</SectionHeading>
      <WarningBox label="Error Message">
        "Text string must be rendered inside a &lt;Text&gt; component."
      </WarningBox>
      <Text style={styles.body}>
        This is the most common react-pdf crash. Raw strings placed directly inside a View (or any non-Text component) cause the renderer to fail. Every piece of visible text must be wrapped in a Text component.
      </Text>
      <CodeBlock language="tsx">{`// Broken — raw string inside View
<View>
  This will crash
</View>

// Fixed — wrap in Text
<View>
  <Text style={styles.body}>This renders correctly</Text>
</View>`}</CodeBlock>

      <SectionHeading>Fonts Not Loading</SectionHeading>
      <WarningBox label="Symptom">
        Text renders in Helvetica instead of your registered font, or the PDF shows blank text where custom fonts should appear.
      </WarningBox>
      <Text style={styles.body}>
        Font issues are silent — react-pdf falls back to Helvetica without warning. Common causes: wrong file path, unregistered weight, or mismatched fontFamily name.
      </Text>
  </ContentPage>
);

export default Page;
