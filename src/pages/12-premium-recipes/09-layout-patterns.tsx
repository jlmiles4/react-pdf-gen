import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, RecipeCard, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
    <SectionHeading>Layout Patterns Cheat Sheet</SectionHeading>
    <Text style={styles.body}>
      Four layouts you'll reach for repeatedly. Each is a self-contained pattern you can drop into any ContentPage.
    </Text>

    <RecipeCard title="Two-Column Layout">
      <CodeBlock language="tsx">{`<View style={{ flexDirection: 'row', gap: spacing.lg }}>
  <View style={{ flex: 1 }}>
    <Text style={styles.body}>Left column</Text>
  </View>
  <View style={{ flex: 1 }}>
    <Text style={styles.body}>Right column</Text>
  </View>
</View>`}</CodeBlock>
    </RecipeCard>

    <RecipeCard title="Sidebar + Content">
      <CodeBlock language="tsx">{`<View style={{ flexDirection: 'row', gap: spacing.lg }}>
  <View style={{ width: '28%',
    backgroundColor: colors.neutral[50],
    padding: spacing.md,
    borderRadius: borders.radius.md }}>
    <Text style={styles.h4}>Sidebar</Text>
  </View>
  <View style={{ flex: 1 }}>
    <Text style={styles.body}>Main content area</Text>
  </View>
</View>`}</CodeBlock>
    </RecipeCard>
  </ContentPage>
);

export default Page;
