import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
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
          <Text style={styles.h2Text}>INVOICE #` + `{data.number}</Text>
          <Text style={styles.bodySmall}>Due: ` + `{data.due}</Text>
        </View>
      </View>
      <Table headers={['Description','Qty','Price','Total']}
        rows={data.items.map(i => [i.desc, String(i.qty),
          '$' + i.price.toFixed(2), '$' + (i.qty*i.price).toFixed(2)])}
        columnWidths={['50%','15%','15%','20%']} />
      <View style={{ alignItems: 'flex-end', marginTop: spacing.sm }}>
        <Text style={styles.body}>Subtotal: $` + `{subtotal.toFixed(2)}</Text>
        <Text style={styles.h3}>Total: $` + `{(subtotal+tax).toFixed(2)}</Text>
      </View>
    </Page>
  );
};`}</CodeBlock>
  </ContentPage>
);

export default Page;
