import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, fontScale, fontWeight } from '../styles/theme';
import { ContentPage, SectionHeading, CodeBlock, BulletList, TipBox } from '../components';

const local = StyleSheet.create({
  recipeCard: {
    borderWidth: borders.medium,
    borderColor: colors.neutral[200],
    borderRadius: borders.radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.neutral[50],
  },
  recipeTitle: {
    fontSize: fontScale.contentTitle,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.primary[700],
    marginBottom: spacing.sm,
  },
});

const Ch10Patterns: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes">
    <SectionHeading>Layout Patterns Cheat Sheet</SectionHeading>
    <Text style={styles.body}>
      Four layouts you'll reach for repeatedly. Each is a self-contained pattern you can drop into any ContentPage. All examples use design tokens from theme.ts for spacing, colors, and border radii.
    </Text>

    <View wrap={false} style={local.recipeCard}>
      <Text style={local.recipeTitle}>Two-Column Layout</Text>
      <CodeBlock language="tsx">{`<View style={{ flexDirection: 'row', gap: spacing.lg }}>
  <View style={{ width: '50%' }}>
    <Text style={styles.body}>Left column</Text>
  </View>
  <View style={{ width: '50%' }}>
    <Text style={styles.body}>Right column</Text>
  </View>
</View>`}</CodeBlock>
    </View>

    <View wrap={false} style={local.recipeCard}>
      <Text style={local.recipeTitle}>Sidebar + Content</Text>
      <CodeBlock language="tsx">{`<View style={{ flexDirection: 'row', gap: spacing.lg }}>
  <View style={{ width: '30%',
    backgroundColor: colors.neutral[50],
    padding: spacing.md,
    borderRadius: borders.radius.md }}>
    <Text style={styles.h4}>Sidebar</Text>
  </View>
  <View style={{ width: '70%' }}>
    <Text style={styles.body}>Main content area</Text>
  </View>
</View>`}</CodeBlock>
    </View>

    <View wrap={false} style={local.recipeCard}>
      <Text style={local.recipeTitle}>Card Grid (2x2)</Text>
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
    </View>

    <View wrap={false} style={local.recipeCard}>
      <Text style={local.recipeTitle}>Metric / KPI Row</Text>
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
    </View>

    <SectionHeading>Putting It All Together</SectionHeading>
    <BulletList items={[
      'Review Chapter 3 (Architecture) for file-per-page structure that makes these recipes composable',
      'Use Chapter 4\'s design tokens — never hardcode colors or spacing in recipe code',
      'Apply Chapter 7\'s wrap={false} patterns to keep recipe cards from splitting across pages',
      'Clone the source code for this book — every pattern here is used in the pages you\'re reading',
      'Explore the react-pdf GitHub repo for additional component examples and API updates',
    ]} />

    <Text style={styles.body}>
      Every recipe in this chapter follows the same principle: typed data in, styled PDF out. The interface defines the contract, the component handles layout, and the design tokens enforce visual consistency. Start with the recipe closest to your use case, adapt the interface to your data, and build from there.
    </Text>

    <TipBox label="The Recipe Workflow">
      Copy a recipe into a new page file. Replace the sample data with your real data types. Run pnpm build to render. Export to PNG and review. Adjust spacing and typography using theme tokens — never hardcode values. Two iterations gets you from template to production-ready component.
    </TipBox>

    <Text style={styles.body}>
      The next chapter covers what to do when things go wrong — the eight most common react-pdf errors, why they happen, and the specific fix for each one.
    </Text>
  </ContentPage>
);

export default Ch10Patterns;
