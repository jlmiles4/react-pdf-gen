import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, InfoBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Language" wrap={false}>
    <SectionHeading>Spacing Scale</SectionHeading>
    <Text style={styles.body}>
      Use a spacing scale based on a 4-point grid. Every margin, padding, and gap should come from it (this book also keeps hairline micro: 1 and xxs: 2 below the grid):
    </Text>
    <CodeBlock language="typescript">{`export const spacing = {
  xs:   4,    // Tight gaps, inline spacing
  sm:   8,    // List item gaps, small padding
  md:   12,   // Standard padding, paragraph gaps
  lg:   16,   // Section spacing, card padding
  xl:   24,   // Major section breaks
  xxl:  32,   // Chapter-level spacing
  xxxl: 48,   // Cover page spacing
};`}</CodeBlock>

    <View wrap={false}>
      <SectionHeading>Theme File</SectionHeading>
      <Text style={styles.body}>
        All tokens live in a single theme.ts file. Every page component imports from here – never hardcodes values.
      </Text>
      <CodeBlock language="typescript">{`import { colors, fonts, typography, spacing }
  from '../../styles/theme';

const s = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.primary[800],
    marginBottom: spacing.lg,
  },
});`}</CodeBlock>
    </View>

    <InfoBox label="The AI Context Pattern">
      When prompting AI to create a new page, include theme.ts in the context. The AI will use your defined tokens instead of inventing its own values.
    </InfoBox>
  </ContentPage>
);

export default Page;
