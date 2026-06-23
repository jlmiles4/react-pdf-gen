import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, Table, InfoBox } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Introduction" wrap={false}>
    <SectionHeading>Who This Is For</SectionHeading>
    <Text style={styles.body}>
      This book is for developers who want to move beyond "Hello World" PDFs. If you're building invoices, resumes, reports, or ebooks, and you want to use AI to speed up the process without sacrificing quality, this is for you.
    </Text>
    <Text style={styles.body}>
      We assume you know React and basic CSS. We don't assume you're an expert in PDF typography or the specific quirks of the react-pdf engine – we'll cover those as we go.
    </Text>

    <SectionHeading>Why React-PDF?</SectionHeading>
    <Text style={styles.body}>
      While there are many ways to generate PDFs (Puppeteer, LaTeX, specialized APIs), @react-pdf/renderer offers the best balance of developer experience and AI compatibility. Because it's "just React," your existing skills – and your AI's knowledge of React patterns – apply directly.
    </Text>
    <Table
      headers={['Approach', 'Trade-off', 'AI fit']}
      rows={[
        ['Puppeteer', 'Ships a headless browser; heavy and slow', 'Medium'],
        ['LaTeX', 'Beautiful output, steep and arcane syntax', 'Low'],
        ['PDF APIs', 'Fast to start, opaque and hard to customize', 'Low'],
        ['React-PDF', 'Component model you already think in', 'High'],
      ]}
      columnWidths={['22%', '58%', '20%']}
    />
    <InfoBox label="Why AI fit matters">
      Your AI agent has seen millions of React components. When the layout is JSX, it can reason about structure, reuse your design tokens, and edit a page the same way it edits any component – no PDF-specific dialect to learn first.
    </InfoBox>
  </ContentPage>
);

export default Page;
