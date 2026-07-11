import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, Table, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Styling System</SectionHeading>
    <Text style={styles.body}>
      React-PDF uses JavaScript objects for styles, similar to React Native. No CSS strings, no className props. Always reference your theme tokens to ensure consistency.
    </Text>
    <CodeBlock language="tsx">{`import { StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, borders } from '../../styles/theme';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.lg,
    backgroundColor: colors.neutral[50],
    borderRadius: borders.radius.md,
  },
});`}</CodeBlock>

    <View wrap={false}>
      <Text style={styles.h3}>Supported Layout: Flexbox Only</Text>
      <Text style={styles.body}>
        Default flex direction is column (top to bottom), not row – which catches people coming from web CSS. React-PDF's only layout engine is flexbox: no CSS Grid, no floats, no inline/block.
      </Text>

      <Table
        headers={['Supported', 'Not Supported']}
        rows={[
          ['flexDirection, alignItems, justifyContent', 'CSS Grid (grid-template-*)'],
          ['width, height, minWidth, maxWidth', 'float, clear'],
          ['margin, padding (all sides)', 'display: inline / block / table'],
          ['position: relative / absolute', 'box-shadow, text-shadow'],
          ['border (width, color, style, radius)', 'CSS animations / transitions'],
          ['backgroundColor, opacity, @media queries', 'calc(), CSS variables, background-image'],
        ]}
        columnWidths={['50%', '50%']}
      />
    </View>
  </ContentPage>
);

export default Page;
