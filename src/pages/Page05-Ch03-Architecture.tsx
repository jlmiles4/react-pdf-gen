// Group: FOUNDATIONS
/**
 * Chapter 03 — Project Architecture for AI Agents
 *
 * The file-per-page pattern: why monolithic documents fail with AI, how to split
 * pages into individual files, the assembly Document.tsx, shared components,
 * naming conventions, and how design changes propagate.
 *
 * Sections: The Monolith Problem, File-Per-Page Pattern, Assembly File, Build Script,
 *           Shared Components, Naming Conventions, How Changes Propagate
 * Components: CodeBlock, BulletList, Table, TipBox, WarningBox
 * Renders: 1 chapter title + 4 content pages
 */
import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { ContentPage, ChapterTitle, CodeBlock, BulletList, Table, TipBox, WarningBox, SectionHeading } from '../components';

const Ch03Architecture: React.FC = () => (
  <>
    <ChapterTitle
      number="03"
      title="Project Architecture for AI Agents"
      subtitle="Structure your codebase so AI can edit one page without breaking the rest."
    />

    <ContentPage sectionTitle="Architecture">
      <SectionHeading>The Monolith Problem</SectionHeading>
      <Text style={styles.body}>
        The most common react-pdf mistake is putting everything in one file. Your entire 30-page document lives in a single 2,000-line component. You paste it into an AI prompt. The AI edits page 12 and accidentally breaks the styling on page 4.
      </Text>
      <Text style={styles.body}>
        Big files also strain AI attention — Chapter 5 covers the token math in detail. The structural fix in this chapter is what stops the cross-page breakage even before tokens enter the picture.
      </Text>

      <SectionHeading>The File-Per-Page Pattern</SectionHeading>
      <Text style={styles.body}>
        Split every page into its own component file. One file, one page, one concern.
      </Text>
      <CodeBlock language="bash">{`src/
  pages/
    Page01-Cover.tsx          # 80 lines
    Page02-TOC.tsx            # 65 lines
    Page03-Ch01-Intro.tsx     # 120 lines
    Page04-Ch02-Setup.tsx     # 150 lines
    ...
  components/
    Header.tsx                # 40 lines
    Footer.tsx                # 35 lines
    ChapterTitle.tsx          # 55 lines
    CodeBlock.tsx             # 20 lines
    TipBox.tsx                # 30 lines
    Table.tsx                 # 45 lines
    Icons.tsx                 # 80 lines
  styles/
    theme.ts                  # 90 lines – design tokens
    shared.ts                 # 150 lines – shared StyleSheet
  Document.tsx                # 30 lines – assembles pages
  build.tsx                   # 15 lines – renders to file`}</CodeBlock>

      <Text style={styles.h3}>Why This Works</Text>
      <BulletList items={[
        'Each file is 50-200 lines – well within AI effective attention',
        'AI can edit Page07 without seeing or touching Page03',
        'You give AI context: the page file + theme.ts + relevant components = ~1,500 tokens',
        'Diffs are small and reviewable – you see exactly what changed',
        'Multiple AI agents can work on different pages in parallel',
        'Components enforce consistency – every page uses the same Header and Footer',
      ]} />

      <SectionHeading>The Assembly File</SectionHeading>
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

      <SectionHeading>The Build Script</SectionHeading>
      <Text style={styles.body}>
        A simple script renders the document to a PDF file. Run it with tsx or ts-node.
      </Text>
      <CodeBlock language="tsx">{`// build.tsx
import ReactPDF from '@react-pdf/renderer';
import EbookDocument from './Document';

ReactPDF.render(<EbookDocument />, './output/ebook.pdf');
console.log('PDF generated: output/ebook.pdf');`}</CodeBlock>

      <SectionHeading>Shared Components</SectionHeading>
      <Text style={styles.body}>
        Components that appear on multiple pages live in the components/ folder. This is where consistency comes from.
      </Text>

      <Table
        headers={['Component', 'Purpose', 'Used By']}
        rows={[
          ['Header', 'Book title + section name at top', 'Every content page'],
          ['Footer', 'Page number + branding at bottom', 'Every page'],
          ['ChapterTitle', 'Full-page chapter opener', 'Start of each chapter'],
          ['ContentPage', 'Standard page with header/footer', 'All content pages'],
          ['CodeBlock', 'Styled code display', 'Technical chapters'],
          ['TipBox / WarningBox', 'Callout boxes', 'Any page with key info'],
          ['Table', 'Flexbox-based data table', 'Comparison/reference pages'],
          ['BulletList', 'Consistent bullet lists', 'Throughout'],
          ['Icons (SVG)', 'Vector icons for visual interest', 'Headers, callouts, lists'],
        ]}
        columnWidths={['25%', '40%', '35%']}
      />

      <SectionHeading>Naming Conventions</SectionHeading>
      <Text style={styles.body}>
        File names follow a strict pattern: PageNN-ChNN-Topic.tsx for pages, PascalCase.tsx for components. The page number prefix keeps files sorted in the correct order in your editor and makes it obvious which page you're editing. When you tell an AI "edit Page07", there's zero ambiguity about which file to open.
      </Text>

      <WarningBox label="Anti-Patterns">
        Avoid these structures – they make AI editing harder and more error-prone: monolithic single-file documents, inline styles on every element (use StyleSheet.create), deeply nested component trees that span pages, importing all components everywhere instead of just what's needed.
      </WarningBox>

      <SectionHeading>How Changes Propagate</SectionHeading>
      <Text style={styles.body}>
        When you change a design token in theme.ts, every page that imports it updates automatically on the next build. Change your primary color once, and all 30 headings update. Change body font size once, and every paragraph adjusts. This is the power of the architecture: centralized decisions, distributed rendering.
      </Text>
      <Text style={styles.body}>
        The same applies to shared components. Update the Footer component, and every page gets the new footer. Fix a bug in CodeBlock, and every code example benefits. You never have to hunt through a monolith file to find every instance of a repeated pattern.
      </Text>
      <Text style={styles.body}>
        A useful rule of thumb: if a style block or component appears on 3+ pages, extract it into the shared folder. If it only appears once, keep it local to that page file. This keeps the shared layer focused and avoids bloat while still centralizing everything that needs to be consistent.
      </Text>
    </ContentPage>
  </>
);

export default Ch03Architecture;
