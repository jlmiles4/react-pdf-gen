import React from 'react';
import fs from 'fs';
import path from 'path';
import { ContentPage, MarkdownRenderer } from '../../components';

const Page: React.FC = () => {
  const mdPath = path.join(process.cwd(), 'content/chapters/12-markdown-demo.md');
  const content = fs.readFileSync(mdPath, 'utf-8');
  const body = content.replace(/^---[\s\S]*?---/, '').trim();
  // Render the half after the authored page-break marker; the parser never sees it.
  const parts = body.split('\n<!-- page-break -->\n');
  if (parts.length !== 2) throw new Error('Expected exactly one page-break marker line');
  const [, partTwo] = parts;

  return (
    <ContentPage sectionTitle="Automation" wrap={false}>
      <MarkdownRenderer content={partTwo.trim()} />
    </ContentPage>
  );
};

export default Page;
