import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Putting It Together</SectionHeading>
    <Text style={styles.body}>
      These fundamentals – the document/page structure, page sizes, images, JavaScript-object styling, flexbox layout, font registration, and page breaking – are the building blocks. Every page in this book uses them.
    </Text>
    <Text style={styles.body}>
      Internalizing these constraints is the first step toward mastery. Once you stop reaching for web-specific CSS and embrace the react-pdf primitives – no grid, no CSS display: inline/block, no CSS variables – you can leverage the engine's predictable layout behavior to build complex, multi-page documents with confidence.
    </Text>
    <Text style={styles.body}>
      The next chapter shows how to organize these building blocks into a project architecture that AI agents can work with efficiently. The goal: a structure where AI can edit one page without reading (or breaking) the rest.
    </Text>

    <Table
      headers={['Concept', 'Key Rule']}
      rows={[
        ['Component structure', 'Document > Page; Page accepts react-pdf primitives directly'],
        ['Page sizes', 'size prop – named sizes or [width, height] in points; keep uniform'],
        ['Images', 'Always set dimensions – unsized renders at 1px = 1pt and overflows'],
        ['Styling', 'JavaScript objects or arrays – no CSS text or className'],
        ['Layout', 'Flexbox for normal flow – default direction is column'],
        ['Fonts', 'Register TTF/WOFF explicitly – no synthesized bold/italic'],
        ['Page breaks', 'wrap, break, fixed, minPresenceAhead props'],
        ['Units', 'Points (default), inches, mm, cm, percentages'],
      ]}
      columnWidths={['35%', '65%']}
    />
  </ContentPage>
);

export default Page;
