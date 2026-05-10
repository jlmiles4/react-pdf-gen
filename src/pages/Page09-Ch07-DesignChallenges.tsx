// Group: CRAFT
/**
 * Chapter 07 — Design Challenges and Solutions
 *
 * What works well in react-pdf (flexbox layouts, cards, SVG, fixed headers)
 * and what doesn't (CSS Grid, shadows, float, gradients) with code workarounds
 * for each. Ends with a professional table recipe using flexbox.
 *
 * Sections: What Works Well, What Doesn't Work (4 recipe cards:
 *           CSS Grid, Drop Shadows, Text Wrapping, Gradients),
 *           Recipe: Professional Table
 * Components: BulletList, CodeBlock, TipBox, XIcon (+ custom recipe cards)
 * Renders: 1 chapter title + 4 content pages
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, fontScale, fontWeight, iconSize } from '../styles/theme';
import ContentPage from '../components/ContentPage';
import ChapterTitle from '../components/ChapterTitle';
import CodeBlock from '../components/CodeBlock';
import BulletList from '../components/BulletList';
import { XIcon } from '../components/Icons';
import SectionHeading from '../components/SectionHeading';

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
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
});

const Ch07DesignChallenges: React.FC = () => (
  <>
    <ChapterTitle
      number="07"
      title="Design Challenges and Solutions"
      subtitle="What works, what breaks, and the workarounds that actually hold up."
    />

    <ContentPage sectionTitle="Design Challenges">
      <SectionHeading>What Works Well</SectionHeading>
      <Text style={styles.body}>
        React-pdf will frustrate you if you fight it. Don't. These patterns work cleanly -- lean into them and you'll build faster than you expect:
      </Text>

      <BulletList items={[
        'Single-column layouts with clear heading hierarchy',
        'Two-column layouts using flexDirection: "row" with fixed widths',
        'Full-width colored banners and pull quotes with accent borders',
        'Consistent card patterns: bordered View with padding and borderRadius',
        'SVG decorative elements (lines, circles, icons)',
        'Bullet lists and tables built with flexbox rows',
        'Fixed headers/footers via fixed={true} and dynamic page numbers via render prop',
      ]} />

      <SectionHeading>What Doesn't Work (and Fixes)</SectionHeading>

      <View wrap={false} style={local.recipeCard}>
        <View style={local.iconRow}>
          <XIcon size={iconSize.sm} />
          <Text style={local.recipeTitle}>CSS Grid Layouts</Text>
        </View>
        <Text style={styles.bodySmall}>
          Not supported. Use nested flexbox with explicit widths instead:
        </Text>
        <CodeBlock language="tsx">{`// Three-column "grid" using flexbox
<View style={{ flexDirection: 'row' }}>
  <View style={{ width: '33%', padding: 8 }}>
    <Text>Column 1</Text>
  </View>
  <View style={{ width: '33%', padding: 8 }}>
    <Text>Column 2</Text>
  </View>
  <View style={{ width: '33%', padding: 8 }}>
    <Text>Column 3</Text>
  </View>
</View>`}</CodeBlock>
      </View>

      <View wrap={false} style={local.recipeCard}>
        <View style={local.iconRow}>
          <XIcon size={iconSize.sm} />
          <Text style={local.recipeTitle}>Drop Shadows</Text>
        </View>
        <Text style={styles.bodySmall}>
          box-shadow is not supported. Use a subtle border or an offset nested View:
        </Text>
        <CodeBlock language="tsx">{`// Fake shadow with border + offset background
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
      </View>

      <View wrap={false} style={local.recipeCard}>
        <View style={local.iconRow}>
          <XIcon size={iconSize.sm} />
          <Text style={local.recipeTitle}>Text Wrapping Around Images</Text>
        </View>
        <Text style={styles.bodySmall}>
          Float is not supported. Use a side-by-side row layout instead:
        </Text>
        <CodeBlock language="tsx">{`<View style={{ flexDirection: 'row', gap: 16 }}>
  <Image src="photo.png"
    style={{ width: 120, height: 90 }} />
  <View style={{ flex: 1 }}>
    <Text>Text flows in a column beside
      the image, not wrapped around it.
    </Text>
  </View>
</View>`}</CodeBlock>
      </View>

      <View wrap={false} style={local.recipeCard}>
        <View style={local.iconRow}>
          <XIcon size={iconSize.sm} />
          <Text style={local.recipeTitle}>Gradient Backgrounds</Text>
        </View>
        <Text style={styles.bodySmall}>
          CSS gradients don't work. Use an SVG LinearGradient behind your content:
        </Text>
        <CodeBlock language="tsx">{`<View style={{ position: 'relative', height: 100 }}>
  <Svg style={{ position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0 }}
    viewBox={\`0 0 \${page.contentWidth} 100\`}>
    <Defs>
      <LinearGradient id="bg" x1="0" y1="0"
        x2="1" y2="0">
        <Stop offset="0%" stopColor={colors.primary[700]} />
        <Stop offset="100%" stopColor={colors.primary[500]} />
      </LinearGradient>
    </Defs>
    <Rect width={page.contentWidth} height="100"
      fill="url(#bg)" />
  </Svg>
  <Text style={{ color: colors.white, padding: spacing.lg }}>
    Content over gradient
  </Text>
</View>`}</CodeBlock>
      </View>

      <SectionHeading>Recipe: Professional Table</SectionHeading>
      <Text style={styles.body}>
        Tables in react-pdf are built with flexbox rows, not HTML table elements. The key ingredients: a dark header row with white bold text, alternating row backgrounds for scan-ability, consistent padding, and subtle bottom borders. Use flex: 1 on cells for equal-width columns, or explicit widths like '30%' for custom proportions. Stick to 1-3 columns — anything wider gets cramped on LETTER or A4. If you need more columns, split into multiple tables or rotate to landscape.
      </Text>
      <CodeBlock language="tsx">{`const DataTable = ({ headers, rows, widths }) => (
  <View style={styles.tableContainer}>
    {/* Header row */}
    <View style={styles.tableHeader}>
      {headers.map((h, i) => (
        <Text key={i} style={[styles.tableHeaderText,
          { width: widths[i] }]}>{h}</Text>
      ))}
    </View>
    {/* Data rows with alternating colors */}
    {rows.map((row, ri) => (
      <View key={ri} style={ri % 2 === 1
        ? styles.tableRowAlt : styles.tableRow}>
        {row.map((cell, ci) => (
          <Text key={ci} style={[styles.tableCell,
            { width: widths[ci] }]}>{cell}</Text>
        ))}
      </View>
    ))}
  </View>
);`}</CodeBlock>

      <Text style={styles.body}>
        Every workaround in this chapter follows the same pattern: the CSS property you want doesn't exist, so you build it from View, Text, and flexbox. That's not a limitation -- it's the entire design philosophy. Once you stop reaching for web-centric CSS and start thinking in react-pdf primitives, layouts get faster to build, not slower.
      </Text>
    </ContentPage>
  </>
);

export default Ch07DesignChallenges;
