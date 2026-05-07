/**
 * Chapter 10 — Premium Deliverables & Recipes
 *
 * The comprehensive checklist that separates a free PDF from a paid one,
 * plus practical recipes for invoices, data-driven pages, and layout patterns.
 * Five checklist categories (Typography, Color & Visual, Layout & Spacing,
 * Structure & Navigation, Content Components) with specific, verifiable items.
 * Includes quality tests, the design system payoff, free vs. premium comparison,
 * invoice recipe, data-driven recipe, and layout patterns cheat sheet.
 *
 * Sections: Premium Checklist (5 categories), Quality Tests, From Checklist to Habit,
 *           Free vs. Premium at a Glance, Invoice Recipe, Data-Driven Pages,
 *           Layout Patterns Cheat Sheet
 * Components: BulletList, Table, TipBox, CheckIcon, CodeBlock, SectionHeading
 * Renders: 1 chapter title + 6 content pages
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, fonts, borders, fontScale } from '../styles/theme';
import ContentPage from '../components/ContentPage';
import ChapterTitle from '../components/ChapterTitle';
import BulletList from '../components/BulletList';
import { TipBox } from '../components/TipBox';
import { CheckIcon } from '../components/Icons';
import Table from '../components/Table';
import SectionHeading from '../components/SectionHeading';
import CodeBlock from '../components/CodeBlock';

const local = StyleSheet.create({
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: borders.thin,
    borderBottomColor: colors.neutral[100],
  },
  checklistText: {
    flex: 1,
    fontSize: fontScale.bodyMedium,
    fontFamily: fonts.body,
    fontWeight: 400 as const,
    color: colors.neutral[800],
    lineHeight: 1.5,
  },
  checklistCategory: {
    fontSize: fontScale.label,
    fontFamily: fonts.bodyBold,
    fontWeight: 600 as const,
    color: colors.primary[700],
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
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
    fontWeight: 600 as const,
    color: colors.primary[700],
    marginBottom: spacing.sm,
  },
});

const Ch10Premium: React.FC = () => (
  <>
    <ChapterTitle
      number="10"
      title="Premium Deliverables & Recipes"
      subtitle="The checklist that separates a free PDF from a $50 one — plus copy-paste patterns for invoices, data-driven pages, and common layouts."
    />

    {/* --- Page 1: Premium Checklist --- */}
    <ContentPage sectionTitle="Premium Deliverables & Recipes">
      <SectionHeading>The Premium Checklist</SectionHeading>
      <Text style={styles.body}>
        Every item below is concrete and verifiable. A PDF that hits all of these looks intentionally designed – not generated.
      </Text>

      <Text style={local.checklistCategory}>Typography</Text>
      {[
        'Custom font registered (not default Helvetica/Arial)',
        '3+ distinct text sizes used with clear hierarchy',
        'Consistent heading styles across all pages',
        'Body text at readable size (10-12pt) with 1.5-1.6 line height',
        'Code blocks in monospace font with background color',
      ].map((item, i) => (
        <View key={i} wrap={false} style={local.checklistItem}>
          <CheckIcon size={12} color={colors.success} />
          <Text style={local.checklistText}>{item}</Text>
        </View>
      ))}

      <Text style={local.checklistCategory}>Color & Visual</Text>
      {[
        'Color palette limited to 3-5 intentional colors',
        'Primary color for headings and emphasis areas',
        'Accent color for highlights, callout borders, interactive elements',
        'Neutral scale for body text, borders, and backgrounds',
        'Color used for meaning, not decoration',
      ].map((item, i) => (
        <View key={i} wrap={false} style={local.checklistItem}>
          <CheckIcon size={12} color={colors.success} />
          <Text style={local.checklistText}>{item}</Text>
        </View>
      ))}

      <Text style={local.checklistCategory}>Layout & Spacing</Text>
      {[
        'Generous page margins (50-70pt on all sides)',
        'Consistent spacing scale used throughout (4pt grid)',
        'Whitespace used intentionally – pages don\'t feel cramped',
        'No orphaned single lines at page breaks',
        'Visual breaks between major sections',
      ].map((item, i) => (
        <View key={i} wrap={false} style={local.checklistItem}>
          <CheckIcon size={12} color={colors.success} />
          <Text style={local.checklistText}>{item}</Text>
        </View>
      ))}

      <Text style={local.checklistCategory}>Structure & Navigation</Text>
      {[
        'Cover page with strong visual identity',
        'Table of contents with chapter listing',
        'Page numbers on every content page',
        'Headers with section context',
        'Footer with branding',
        'Chapter title pages with distinct design',
      ].map((item, i) => (
        <View key={i} wrap={false} style={local.checklistItem}>
          <CheckIcon size={12} color={colors.success} />
          <Text style={local.checklistText}>{item}</Text>
        </View>
      ))}

      <Text style={local.checklistCategory}>Content Components</Text>
      {[
        'Callout boxes for tips, warnings, and key information',
        'Styled code blocks with language labels',
        'Professional tables with header rows and alternating colors',
        'SVG icons (not emojis) for visual elements',
        'Bullet lists with consistent formatting',
        'Document metadata set (title, author, subject)',
      ].map((item, i) => (
        <View key={i} wrap={false} style={local.checklistItem}>
          <CheckIcon size={12} color={colors.success} />
          <Text style={local.checklistText}>{item}</Text>
        </View>
      ))}
    </ContentPage>

    {/* --- Page 2: Quality Tests + Free vs Premium --- */}
    <ContentPage sectionTitle="Premium Deliverables & Recipes">
      <SectionHeading>The Quality Tests</SectionHeading>
      <BulletList items={[
        'The squint test: step back, squint at the page. Can you see clear visual hierarchy? If everything blurs into one gray block, you need more contrast.',
        'The scroll test: flip through all pages quickly. Do they feel like one cohesive document? Or do some pages look like they belong to a different PDF?',
        'The "would I share this?" test: if someone you respect saw this PDF with your name on it, would you be proud? If you hesitate, it needs more work.',
        'The comparison test: open a professionally designed PDF from a publisher. Hold yours next to it. Where does yours fall short? Fix those specific things.',
      ]} />

      <SectionHeading>From Checklist to Habit</SectionHeading>
      <Text style={styles.body}>
        The first time through this checklist takes effort. By the third document, it becomes muscle memory. You'll register custom fonts automatically, reach for your design tokens without thinking, and notice spacing inconsistencies at a glance. The goal isn't to check boxes forever – it's to internalize what premium looks like so your first drafts start closer to the finish line.
      </Text>

      <TipBox label="The Design System Payoff">
        If you built your theme.ts correctly and every page imports from it, most of this checklist is satisfied automatically. The design system isn't extra work – it's the shortcut that makes every page look premium by default.
      </TipBox>

      <View wrap={false}>
        <SectionHeading>Free vs. Premium at a Glance</SectionHeading>
        <Table
          headers={['Signal', 'Free / Generic', 'Premium / Polished']}
          rows={[
            ['Fonts', 'Default Helvetica', 'Custom registered typeface'],
            ['Colors', 'Random hex values', 'Systematic palette with intent'],
            ['Spacing', 'Inconsistent margins', 'Spacing scale (4pt grid)'],
            ['Components', 'Plain text + emoji', 'Styled boxes with SVG icons'],
            ['Hierarchy', 'Everything same size', 'Clear heading scale with accents'],
          ]}
          columnWidths={['20%', '35%', '45%']}
        />
      </View>

      <View style={styles.dividerAccent} />

      <SectionHeading>Recipes & Templates</SectionHeading>
      <Text style={styles.body}>
        The checklist tells you what premium looks like. These recipes show you how to build it. Each pattern uses the design tokens from Chapter 4, the shared components from Chapter 3, and the Table component from Chapter 7 — if you're starting here, review those chapters first or clone the source code.
      </Text>
      <Text style={styles.body}>
        Three recipes follow: an invoice component (the most-requested PDF use case), a data-driven page generator, and a layout patterns cheat sheet. Each is a self-contained pattern you can copy into your project and customize.
      </Text>
    </ContentPage>

    {/* --- Page: Invoice Recipe --- */}
    <ContentPage sectionTitle="Premium Deliverables & Recipes">
      <SectionHeading>Recipe: Invoice Component</SectionHeading>
      <Text style={styles.body}>
        This invoice component takes a typed data object and renders a header, line items table, and totals. Swap the InvoiceData interface for any typed shape (receipts, purchase orders, quotes) and the structure stays the same.
      </Text>
      <CodeBlock language="tsx">{`interface InvoiceData {
  number: string; date: string; due: string;
  from: { name: string; address: string };
  to: { name: string; address: string };
  items: { desc: string; qty: number; price: number }[];
  tax?: number;
}

const Invoice = ({ data }: { data: InvoiceData }) => {
  const subtotal = data.items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = subtotal * (data.tax ?? 0);
  return (
    <Page size="LETTER" style={styles.page}>
      <View style={{ flexDirection: 'row', marginBottom: spacing.xl }}>
        <View style={{ width: '50%' }}>
          <Text style={styles.h3}>{data.from.name}</Text>
          <Text style={styles.bodySmall}>{data.from.address}</Text>
        </View>
        <View style={{ width: '50%', alignItems: 'flex-end' }}>
          <Text style={styles.h2Text}>INVOICE #{data.number}</Text>
          <Text style={styles.bodySmall}>Due: {data.due}</Text>
        </View>
      </View>
      <Table headers={['Description','Qty','Price','Total']}
        rows={data.items.map(i => [i.desc, String(i.qty),
          \`$\${i.price.toFixed(2)}\`, \`$\${(i.qty*i.price).toFixed(2)}\`])}
        columnWidths={['50%','15%','15%','20%']} />
      <View style={{ alignItems: 'flex-end', marginTop: spacing.sm }}>
        <Text style={styles.body}>Subtotal: \${subtotal.toFixed(2)}</Text>
        <Text style={styles.h3}>Total: \${(subtotal+tax).toFixed(2)}</Text>
      </View>
    </Page>
  );
};`}</CodeBlock>
    </ContentPage>

    {/* --- Page 4: Data-Driven Pages --- */}
    <ContentPage sectionTitle="Premium Deliverables & Recipes">
      <SectionHeading>Recipe: Data-Driven Pages</SectionHeading>
      <Text style={styles.body}>
        Most useful PDFs are generated from data, not static content. The pattern: pass a typed array, .map() to render one page per item, use conditional rendering to control which sections appear. Each page becomes a pure function of its data — change the input and the PDF rebuilds.
      </Text>
      <Text style={styles.body}>
        TypeScript interfaces are the contract between your data source and your layout: define the shape once, and both the fetching code and the rendering code agree. The pattern works cleanly for 5-20 pages; past 50 pages with images, watch Node.js heap usage (Chapter 11 covers the fix).
      </Text>
      <CodeBlock language="tsx">{`interface Section {
  title: string;
  body: string;
  metrics?: { label: string; value: string }[];
}

const Report = ({ sections }: { sections: Section[] }) => (
  <Document>
    {sections.map((section, i) => (
      <ContentPage key={i} sectionTitle={section.title}>
        <SectionHeading>{section.title}</SectionHeading>
        <Text style={styles.body}>{section.body}</Text>

        {section.metrics && (
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            {section.metrics.map((m, j) => (
              <View key={j} wrap={false} style={{
                flex: 1,
                backgroundColor: colors.neutral[50],
                padding: spacing.md,
                borderRadius: borders.radius.md,
              }}>
                <Text style={styles.bodySmall}>{m.label}</Text>
                <Text style={styles.h3}>{m.value}</Text>
              </View>
            ))}
          </View>
        )}
      </ContentPage>
    ))}
  </Document>
);`}</CodeBlock>
    </ContentPage>

    {/* --- Page 5: Layout Patterns Cheat Sheet --- */}
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
  </>
);

export default Ch10Premium;
