import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, BulletList, SectionHeading, CodeBlock, TipBox } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
    <SectionHeading>Putting It All Together</SectionHeading>
    <BulletList items={[
      'Use Chapter 3\'s file-per-page structure to keep recipes composable',
      'Use Chapter 4\'s tokens for reusable colors and spacing in recipe code',
      'Apply Chapter 2\'s wrap={false} patterns to keep recipe cards from splitting across pages',
      'Clone the source – every pattern here follows conventions used throughout the book',
      'Explore the react-pdf GitHub repo for additional component examples and API updates',
    ]} />

    <Text style={styles.body}>
      The invoice and report recipes follow typed data in, styled PDF out: interfaces define the contract, components handle layout, and tokens enforce consistency. The layout recipes instead demonstrate reusable composition without a data model. Start with the pattern closest to your use case and build from there.
    </Text>

    <SectionHeading>The Shape of a Data-Driven Recipe</SectionHeading>
    <Text style={styles.body}>
      Strip away the specifics and each data-driven recipe reduces to the same three lines. Hand your AI this skeleton and the recipe page it should follow – it will fill in the interface and layout against your real data.
    </Text>
    <CodeBlock language="tsx">{`interface ReportData { /* your typed contract */ }

const Report = ({ data }: { data: ReportData }) =>
  <Document><Page style={styles.page}>{/* tokens + components */}</Page></Document>;`}</CodeBlock>

    <TipBox label="One Pattern, Many Documents">
      Invoices, reports, certificates, dashboards – they all share this skeleton. Once your AI internalizes the typed-data-in, styled-PDF-out shape, generating a new document type is mostly a matter of swapping the interface and picking which components to compose.
    </TipBox>
  </ContentPage>
);

export default Page;
