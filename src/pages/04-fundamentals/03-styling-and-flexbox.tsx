import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, Table, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Styling System</SectionHeading>
    <Text style={styles.body}>
      React-PDF styles are JavaScript objects, like React Native – not CSS strings or className props. Tokenize reusable choices; name one-off geometry locally.
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
      <Text style={styles.h3}>Supported Layout: Flexbox First</Text>
      <Text style={styles.body}>
        Column is the default. Normal flow uses flexbox – no Grid, floats, or inline/block display. Relative and absolute positioning, plus inline style objects, are valid.
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
