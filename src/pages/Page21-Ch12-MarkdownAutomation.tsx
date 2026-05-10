// Group: SHIPPING
// Number: 12
// Title: Markdown Automation
// Subtitle: Writing your book in Markdown and rendering it to premium PDF automatically.
import React from 'react';
import fs from 'fs';
import path from 'path';
import { ContentPage, ChapterTitle, MarkdownRenderer } from '../components';

const Page19MarkdownAutomation: React.FC = () => {
  // Use absolute path to ensure it works from any directory during build
  const mdPath = path.join(process.cwd(), 'content/chapters/12-markdown-demo.md');
  const content = fs.readFileSync(mdPath, 'utf-8');
  
  // Extract frontmatter (simple regex for demo)
  const title = content.match(/title: "([^"]+)"/)?.[1] || "Markdown Demo";
  const subtitle = content.match(/subtitle: "([^"]+)"/)?.[1] || "";
  const number = content.match(/number: "([^"]+)"/)?.[1] || "12";
  
  // Strip frontmatter for rendering
  const body = content.replace(/^---[\s\S]*?---/, '').trim();

  return (
    <>
      <ChapterTitle
        number={number}
        title={title}
        subtitle={subtitle}
      />
      <ContentPage sectionTitle="Automation">
        <MarkdownRenderer content={body} />
      </ContentPage>
    </>
  );
};

export default Page19MarkdownAutomation;
