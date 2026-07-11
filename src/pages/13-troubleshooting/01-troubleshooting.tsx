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
        This is the most common react-pdf mistake. In this version, a raw string directly under Page or View triggers a warning and is omitted. Put ordinary copy in Text; text-capable primitives such as Link are exceptions.
      </Text>
      <CodeBlock language="tsx">{`// Broken – raw string inside View
<View>
  This raw string is invalid
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
        An unknown family or bad file path fails the build. For an unavailable weight, react-pdf selects the nearest registered weight. Helvetica is the default only when neither Text nor an ancestor sets fontFamily; this project's ContentPage inherits Inter from its Page style.
      </Text>
  </ContentPage>
);

export default Page;
