import React from 'react';
import { ContentPage, ChecklistItem, ChecklistCategory } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
    <ChecklistCategory>Layout & Spacing</ChecklistCategory>
    <ChecklistItem>Generous page margins (50-70pt on all sides)</ChecklistItem>
    <ChecklistItem>Consistent spacing scale used throughout (4pt base with micro-adjustments)</ChecklistItem>
    <ChecklistItem>Whitespace used intentionally – pages don't feel cramped</ChecklistItem>
    <ChecklistItem>No orphaned single lines at page breaks</ChecklistItem>
    <ChecklistItem>Visual breaks between major sections</ChecklistItem>

    <ChecklistCategory>Structure & Navigation</ChecklistCategory>
    <ChecklistItem>Cover page with strong visual identity</ChecklistItem>
    <ChecklistItem>Table of contents with chapter listing</ChecklistItem>
    <ChecklistItem>Page numbers on every content page</ChecklistItem>
    <ChecklistItem>Headers with section context</ChecklistItem>
    <ChecklistItem>Footer with branding</ChecklistItem>
    <ChecklistItem>Chapter title pages with distinct design</ChecklistItem>

    <ChecklistCategory>Content Components</ChecklistCategory>
    <ChecklistItem>Callout boxes for tips, warnings, and key information</ChecklistItem>
    <ChecklistItem>Styled code blocks with language labels</ChecklistItem>
    <ChecklistItem>Professional tables with header rows and alternating colors</ChecklistItem>
    <ChecklistItem>SVG icons (not emojis) for visual elements</ChecklistItem>
    <ChecklistItem>Bullet lists with consistent formatting</ChecklistItem>
    <ChecklistItem>Document metadata set (title, author, subject)</ChecklistItem>
  </ContentPage>
);

export default Page;
