import React from 'react';
import fs from 'fs';
import path from 'path';
import { ContentPage, MarkdownRenderer } from '../../components';

const Page: React.FC = () => {
  const mdPath = path.join(process.cwd(), 'content/chapters/12-markdown-demo.md');
  const content = fs.readFileSync(mdPath, 'utf-8');
  const body = content.replace(/^---[\s\S]*?---/, '').trim();

  return (
    <ContentPage sectionTitle="Automation">
      <MarkdownRenderer content={body} />
    </ContentPage>
  );
};

export default Page;
