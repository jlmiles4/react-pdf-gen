import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, Table, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Styling System</SectionHeading>
    <Text style={styles.body}>
      React-pdf uses JavaScript objects for styles, similar to React Native. No CSS strings, no className props. Always reference your theme tokens to ensure consistency.
    </Text>
    <CodeBlock language="tsx">{`import { StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, typography } from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.lg,
    backgroundColor: colors.neutral[50],
    borderRadius: 6,
  },
  title: {
    ...typography.h2,
    color: colors.primary[800],
    marginBottom: spacing.sm,
  },
});`}</CodeBlock>

    <View wrap={false}>
      <Text style={styles.h3}>Supported Layout: Flexbox Only</Text>
      <Text style={styles.body}>
        React-pdf uses flexbox as its only layout engine. No CSS Grid. No floats. No display: inline or block. Everything is flex.
      </Text>
      <Text style={styles.body}>
        Default flex direction is column (top to bottom), not row. This catches people coming from web CSS where the default is effectively row-based block flow.
      </Text>

      <Table
        headers={['Supported', 'Not Supported']}
        rows={[
          ['flexDirection, alignItems, justifyContent', 'CSS Grid (grid-template-*)'],
          ['width, height, minWidth, maxWidth', 'float, clear'],
          ['margin, padding (all sides)', 'display: inline / block / table'],
          ['position: relative / absolute', 'box-shadow, text-shadow'],
          ['border (width, color, style, radius)', 'CSS animations / transitions'],
          ['backgroundColor, opacity, overflow', 'calc(), CSS variables, media queries'],
          ['transform (rotate, scale, translate)', 'pseudo-selectors (:hover, ::before)'],
        ]}
        columnWidths={['50%', '50%']}
      />
    </View>
  </ContentPage>
);

export default Page;
