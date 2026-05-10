import React from 'react';
import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing } from '../styles/theme';
import { ContentPage, SectionHeading, CodeBlock, Table } from '../components';

const Ch10Recipes: React.FC = () => (
  <>
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
  </>
);

export default Ch10Recipes;
