/**
 * Document — Root assembly file
 *
 * Imports all 14 page components and assembles them into a single Document
 * with metadata (title, author, subject, keywords). This is the only file
 * that knows about all pages — each page is self-contained.
 *
 * Page order: Cover → TOC → Ch01-Ch11 (11 chapters) → Conclusion
 * Total: 68 rendered pages
 */
import React from 'react';
import { Document } from '@react-pdf/renderer';

import Page01Cover from './pages/Page01-Cover';
import Page02TOC from './pages/Page02-TOC';
import Page03Ch01 from './pages/Page03-Ch01-Introduction';
import Page04Ch02 from './pages/Page04-Ch02-Fundamentals';
import Page05Ch03 from './pages/Page05-Ch03-Architecture';
import Page06Ch04 from './pages/Page06-Ch04-DesignLanguage';
import Page07Ch05 from './pages/Page07-Ch05-Tokenization';
import Page08Ch06 from './pages/Page08-Ch06-AvoidingSlop';
import Page09Ch07 from './pages/Page09-Ch07-DesignChallenges';
import Page10Ch08 from './pages/Page10-Ch08-IconsVsEmojis';
import Page11Ch09 from './pages/Page11-Ch09-PNGAnalysis';
import Page12Ch10 from './pages/Page12-Ch10-PremiumDeliverables';
import Page13Ch11 from './pages/Page13-Ch11-Troubleshooting';
import Page14Conclusion from './pages/Page14-Conclusion';

const EbookDocument: React.FC = () => (
  <Document
    title="React-PDF + AI: The Builder's Guide to Premium PDF Generation"
    author="Landon Miles"
    subject="Best practices for using @react-pdf/renderer with AI coding agents"
    keywords="react-pdf, AI, PDF generation, design systems, best practices"
    creator="react-pdf-gen"
  >
    <Page01Cover />
    <Page02TOC />
    <Page03Ch01 />
    <Page04Ch02 />
    <Page05Ch03 />
    <Page06Ch04 />
    <Page07Ch05 />
    <Page08Ch06 />
    <Page09Ch07 />
    <Page10Ch08 />
    <Page11Ch09 />
    <Page12Ch10 />
    <Page13Ch11 />
    <Page14Conclusion />
  </Document>
);

export default EbookDocument;
