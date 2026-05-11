import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>Assembly File</SectionHeading>
    <Text style={styles.body}>
      Document.tsx imports all pages and wraps them in a Document component. This file is the only place that knows about all pages.
    </Text>
    <CodeBlock language="tsx">{`// Document.tsx
import React from 'react';
import { Document } from '@react-pdf/renderer';
import Page01Cover from './pages/Page01-Cover';
import Page02TOC from './pages/Page02-TOC';
import Page03Ch01 from './pages/Page03-Ch01-Intro';
// ... more imports

const EbookDocument: React.FC = () => (
  <Document
    title="React-PDF + AI: The Builder's Guide"
    author="Landon Miles"
    subject="PDF Generation Best Practices"
  >
    <Page01Cover />
    <Page02TOC />
    <Page03Ch01 />
    {/* ... more pages */}
  </Document>
);

export default EbookDocument;`}</CodeBlock>

    <SectionHeading>Build Script</SectionHeading>
    <Text style={styles.body}>
      A simple script renders the document to a PDF file. Run it with tsx or ts-node.
    </Text>
    <CodeBlock language="tsx">{`// build.tsx
import ReactPDF from '@react-pdf/renderer';
import EbookDocument from './Document';

ReactPDF.render(<EbookDocument />, './output/ebook.pdf');
console.log('PDF generated: output/ebook.pdf');`}</CodeBlock>
  </ContentPage>
);

export default Page;
