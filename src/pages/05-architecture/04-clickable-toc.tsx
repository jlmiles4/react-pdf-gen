import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, CodeBlock, InfoBox } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>Clickable Navigation</SectionHeading>
    <Text style={styles.body}>
      react-pdf turns a Link whose src is #id into an internal jump to the element that carries that id – usually a Page. Give one helper ownership of the destination name so the link and its target can never drift apart; the TOC in this book is built exactly this way.
    </Text>
    <CodeBlock language="tsx">{`// manifest.ts – one helper owns the destination name
export const chapterDestinationId = (num) => \`chapter-\${num}\`;

// Destination: the chapter divider page carries the id
<Page id={chapterDestinationId('03')}> … </Page>

// Source: the TOC row links to that same id
<Link src={\`#\${chapterDestinationId('03')}\`}>
  <Text>Project Architecture</Text>
</Link>`}</CodeBlock>

    <SectionHeading>Real Page Numbers</SectionHeading>
    <Text style={styles.body}>
      The page a chapter lands on isn't known until layout runs, so a static TOC can't hardcode it. This book renders twice: pass 1 renders the PDF, pdftotext finds the page holding each "CHAPTER NN" marker and writes the positions to toc-positions.json, then pass 2 re-renders with the numbers filled in. The TOC reserves its number column on both passes, so layout is identical and the pass 1 positions stay valid.
    </Text>

    <InfoBox label="Keep the marker unambiguous">
      The extractor matches a standalone uppercase "CHAPTER NN" line. Don't print that exact string in body text, or two chapters could resolve to the wrong page – the build fails loudly if a marker appears on more than one page.
    </InfoBox>
  </ContentPage>
);

export default Page;
