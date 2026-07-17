import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, CodeBlock, InfoBox } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Page Sizes</SectionHeading>
    <Text style={styles.body}>
      Set the physical page with the size prop on Page. Pass a named size, or a custom [width, height] in points (72pt = 1 inch); orientation flips it to landscape.
    </Text>
    <CodeBlock language="tsx">{`// Named sizes
<Page size="LETTER">   {/* 612 x 792 pt */}
<Page size="A4">       {/* 595 x 842 pt */}
<Page size="LEGAL">    {/* 612 x 1008 pt */}

// Custom trim: [width, height] in points
<Page size={[468, 648]}>   {/* 6.5in x 9in book */}

// Landscape
<Page size="LETTER" orientation="landscape">`}</CodeBlock>
    <Text style={styles.body}>
      Named sizes include A0–A10, B0–B10, C0–C10, LETTER, LEGAL, TABLOID, EXECUTIVE, and FOLIO. For ebooks and reports, US Letter (612x792) and A4 (595x842) handle almost everything – pick one and use it for every page.
    </Text>
    <InfoBox label="Keep it uniform">
      Mixing page sizes in one document reads as a bug. This book's build runs pdfinfo and fails if any page isn't a uniform LETTER, so an accidental A4 or landscape page can't slip through.
    </InfoBox>
  </ContentPage>
);

export default Page;
