import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, InfoBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Language" wrap={false}>
    <SectionHeading>Spacing Scale</SectionHeading>
    <Text style={styles.body}>
      Use a mostly 4-point grid with named 1pt and 2pt micro exceptions. Reusable gaps and padding come from it; page geometry has separate named tokens:
    </Text>
    <CodeBlock language="typescript">{`export const spacing = {
  none: 0, micro: 1, xxs: 2,       // zero + micro exceptions
  xs: 4, sm: 8, md: 12, lg: 16,    // 4pt core
  xl: 24, xxl: 32, xxxl: 48,       // major spacing
};`}</CodeBlock>

    <View wrap={false}>
      <SectionHeading>Theme File</SectionHeading>
      <Text style={styles.body}>
        Tokens live in theme.ts. Pages consume them directly or through shared styles/components; reusable design values are not hardcoded.
      </Text>
      <CodeBlock language="typescript">{`import { colors, fonts, typography, spacing } from '../../styles/theme';
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
