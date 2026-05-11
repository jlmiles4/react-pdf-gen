import React from 'react';
import { ContentPage, CodeBlock, RecipeCard } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
    <RecipeCard title="Card Grid (2x2)">
      <CodeBlock language="tsx">{`<View style={{ flexDirection: 'row', flexWrap: 'wrap',
  gap: spacing.md }}>
  {items.map((item, i) => (
    <View key={i} wrap={false} style={{
      width: '48%', padding: spacing.md,
      borderWidth: borders.medium,
      borderColor: colors.neutral[200],
      borderRadius: borders.radius.md,
    }}>
      <Text style={styles.h4}>{item.title}</Text>
      <Text style={styles.bodySmall}>{item.desc}</Text>
    </View>
  ))}
</View>`}</CodeBlock>
    </RecipeCard>

    <RecipeCard title="Metric / KPI Row">
      <CodeBlock language="tsx">{`<View style={{ flexDirection: 'row', gap: spacing.md }}>
  {metrics.map((m, i) => (
    <View key={i} style={{ flex: 1, alignItems: 'center',
      padding: spacing.md,
      backgroundColor: colors.neutral[50],
      borderRadius: borders.radius.md }}>
      <Text style={styles.bodySmall}>{m.label}</Text>
      <Text style={styles.h2Text}>{m.value}</Text>
    </View>
  ))}
</View>`}</CodeBlock>
    </RecipeCard>
  </ContentPage>
);

export default Page;
