import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { iconSize } from '../../styles/theme';
import { ContentPage, CodeBlock, SectionHeading, RecipeCard } from '../../components';
import { XIcon } from '../../components/Icons';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Challenges" wrap={false}>
    <SectionHeading>What Doesn't Work (and Fixes)</SectionHeading>

    <RecipeCard title="CSS Grid Layouts" icon={<XIcon size={iconSize.sm} />}>
      <Text style={styles.bodySmall}>
        Not supported. Use nested flexbox with explicit widths instead:
      </Text>
      <CodeBlock language="tsx">{`// Three-column "grid" using flexbox
<View style={{ flexDirection: 'row' }}>
  {['Column 1', 'Column 2', 'Column 3'].map((label) => (
    <View key={label} style={{ width: '33%', padding: spacing.sm }}>
      <Text>{label}</Text>
    </View>
  ))}
</View>`}</CodeBlock>
    </RecipeCard>

    <RecipeCard title="Drop Shadows" icon={<XIcon size={iconSize.sm} />}>
      <Text style={styles.bodySmall}>
        box-shadow is not supported. Use a subtle border or an offset nested View:
      </Text>
      <CodeBlock language="tsx">{`// Fake shadow via darker bottom/right borders
<View style={{
  borderWidth: borders.medium,
  borderColor: colors.neutral[200],
  borderRadius: borders.radius.md,
  borderBottomWidth: borders.thick,
  borderRightWidth: borders.thick,
  borderBottomColor: colors.neutral[300],
  borderRightColor: colors.neutral[300],
  padding: spacing.lg,
  backgroundColor: colors.white,
}}>
  <Text>Card with faux shadow</Text>
</View>`}</CodeBlock>
    </RecipeCard>
  </ContentPage>
);

export default Page;
