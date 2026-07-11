import React from 'react';
import fs from 'fs';
import path from 'path';
import { ContentPage, MarkdownRenderer } from '../../components';

const Page: React.FC = () => {
  const mdPath = path.join(process.cwd(), 'content/chapters/12-markdown-demo.md');
  const content = fs.readFileSync(mdPath, 'utf-8');
  const body = content.replace(/^---[\s\S]*?---/, '').trim();
  // Split on the authored page-break marker so each half is its own LETTER page;
  // the parser never sees the marker.
  const parts = body.split('\n<!-- page-break -->\n');
  if (parts.length !== 2) throw new Error('Expected exactly one page-break marker line');
  const [partOne] = parts;

  return (
    <ContentPage sectionTitle="Automation" wrap={false}>
      <MarkdownRenderer content={partOne.trim()} />
    </ContentPage>
  );
};

export default Page;
