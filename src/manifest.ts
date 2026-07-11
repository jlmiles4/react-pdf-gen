/**
 * BOOK MANIFEST
 *
 * This is the single source of truth for the book's structure.
 * The sync script (scripts/sync-project.ts) uses this to generate src/registry.ts.
 * The TOC (src/pages/02-toc/01-toc.tsx) uses this to render entries.
 */

export interface Chapter {
  num: string;
  title: string;
  subtitle: string;
  /** The chapter-title divider page; first file of the chapter (used for TOC ordering) */
  entryPage: string;
}

export interface Group {
  id: string;
  title: string;
  chapters: Chapter[];
}

/** Stable PDF destination shared by TOC links and chapter divider pages. */
export const chapterDestinationId = (num: string) => `chapter-${num}`;

export const MANIFEST: Group[] = [
  {
    id: 'FOUNDATIONS',
    title: 'FOUNDATIONS',
    chapters: [
      {
        num: '01',
        title: 'Introduction',
        subtitle: 'Why react-pdf and AI belong together – and what this book will teach you.',
        entryPage: '03-introduction/00-title',
      },
      {
        num: '02',
        title: 'React-PDF Fundamentals',
        subtitle: 'Components, styling, layout, and the rules of the rendering engine.',
        entryPage: '04-fundamentals/00-title',
      },
      {
        num: '03',
        title: 'Project Architecture for AI Agents',
        subtitle: 'Structure your codebase so AI can edit one page without breaking the rest.',
        entryPage: '05-architecture/00-title',
      },
    ],
  },
  {
    id: 'DESIGN_SYSTEM',
    title: 'DESIGN SYSTEM',
    chapters: [
      {
        num: '04',
        title: 'Specifying a Design Language',
        subtitle: 'Define your visual system once. Use it everywhere. Let AI enforce it.',
        entryPage: '06-design-language/00-title',
      },
      {
        num: '05',
        title: 'Tokenization and Context Windows',
        subtitle: 'How LLMs read your code – and how to make every token count.',
        entryPage: '07-tokenization/00-title',
      },
      {
        num: '06',
        title: 'Avoiding AI Slop',
        subtitle: 'What makes output look cheap – and the specific fixes that make it premium.',
        entryPage: '08-avoiding-slop/00-title',
      },
    ],
  },
  {
    id: 'CRAFT',
    title: 'CRAFT',
    chapters: [
      {
        num: '07',
        title: 'Design Challenges and Solutions',
        subtitle: 'What works, what breaks, and the workarounds that actually hold up.',
        entryPage: '09-design-challenges/00-title',
      },
      {
        num: '08',
        title: 'Icons over Emojis',
        subtitle: 'SVG icons render sharp, match your brand, and work offline.',
        entryPage: '10-icons/00-title',
      },
    ],
  },
  {
    id: 'SHIPPING',
    title: 'SHIPPING',
    chapters: [
      {
        num: '09',
        title: 'AI Visual Analysis',
        subtitle: 'Export to PNG. Let AI see what the reader sees. Fix what doesn\'t look right.',
        entryPage: '11-png-analysis/00-title',
      },
      {
        num: '10',
        title: 'Premium Deliverables & Recipes',
        subtitle: 'The checklist that separates a free PDF from a $50 one.',
        entryPage: '12-premium-recipes/00-title',
      },
      {
        num: '11',
        title: 'Troubleshooting & Common Errors',
        subtitle: 'The errors you\'ll hit, why they happen, and how to fix them fast.',
        entryPage: '13-troubleshooting/00-title',
      },
      {
        num: '12',
        title: 'Markdown Automation',
        subtitle: 'Markdown authoring with shared components and explicit page breaks.',
        entryPage: '14-markdown-automation/00-title',
      },
    ],
  },
];
