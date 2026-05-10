/**
 * Document — Root assembly file
 *
 * Imports all 15 page components and assembles them into a single Document
 * with metadata (title, author, subject, keywords). This is the only file
 * that knows about all pages — each page is self-contained.
 *
 * Page order: Cover → TOC → Ch01-Ch12 (12 chapters) → Conclusion
 * Total: 58-71 rendered pages (depending on layout overflow)
 */
import React from 'react';
import { Document } from '@react-pdf/renderer';
import { allPages } from './registry';

const EbookDocument: React.FC = () => (
  <Document
    title="React-PDF + AI: The Builder's Guide to Premium PDF Generation"
    author="Landon Miles"
    subject="Best practices for using @react-pdf/renderer with AI coding agents"
    keywords="react-pdf, AI, PDF generation, design systems, best practices"
    creator="react-pdf-gen"
  >
    {allPages.map((Page, index) => (
      <Page key={index} />
    ))}
  </Document>
);

export default EbookDocument;
