import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>Assembly File</SectionHeading>
    <Text style={styles.body}>
      The generated registry imports every page. Document.tsx imports that ordered list and maps it into one Document, so the assembly never drifts from the page tree.
    </Text>
    <CodeBlock language="tsx">{`// Document.tsx (metadata abridged)
import React from 'react';
import { Document } from '@react-pdf/renderer';
import { allPages } from './registry';
const EbookDocument: React.FC = () => (
  <Document
    title="React-PDF + AI: The Builder's Guide"
    author="Landon Miles"
  >
    {allPages.map((Page, index) => <Page key={index} />)}
  </Document>
);
export default EbookDocument;`}</CodeBlock>

    <SectionHeading>Build Script</SectionHeading>
    <Text style={styles.body}>
      The simplest build script renders the document to a PDF in one call – run it with tsx or ts-node. (This book's own build.tsx adds a second render pass to fill in real TOC page numbers.)
    </Text>
    <CodeBlock language="tsx">{`// build.tsx
import ReactPDF from '@react-pdf/renderer';
import EbookDocument from './Document';
ReactPDF.render(<EbookDocument />, './output/react-pdf-ai-builders-guide.pdf')
  .then(() => console.log('PDF generated: output/react-pdf-ai-builders-guide.pdf'));`}</CodeBlock>
  </ContentPage>
);

export default Page;
