import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Introduction">
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
  </ContentPage>
);

export default Page;
