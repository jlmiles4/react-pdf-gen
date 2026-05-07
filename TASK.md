# React-PDF + AI Best Practices Ebook

## Project Overview

An ebook (68 pages) covering best practices for using `@react-pdf/renderer` with AI coding agents. The book teaches developers how to structure react-pdf projects for maximum AI productivity, avoid common pitfalls, and produce premium-quality PDF deliverables.

## Target Audience

- Developers using AI coding assistants (Claude, GPT, Copilot) to generate PDF documents
- Teams building automated PDF generation pipelines
- Anyone using `@react-pdf/renderer` who wants to improve output quality

## Status Tracker

Page counts below are the actual rendered count in `output/ebook.pdf` (chapter-title page + content pages after layout overflow). Source files live in `src/pages/PageNN-...tsx`.

| Source File                        | Chapter                              | Pages | Status |
|------------------------------------|--------------------------------------|-------|--------|
| Page01-Cover                       | Cover                                | 1     | DONE   |
| Page02-TOC                         | Table of Contents                    | 1     | DONE   |
| Page03-Ch01-Introduction           | 01 - Introduction                    | 3     | DONE   |
| Page04-Ch02-Fundamentals           | 02 - React-PDF Fundamentals          | 6     | DONE   |
| Page05-Ch03-Architecture           | 03 - Project Architecture for AI     | 5     | DONE   |
| Page06-Ch04-DesignLanguage         | 04 - Specifying a Design Language    | 4     | DONE   |
| Page07-Ch05-Tokenization           | 05 - Tokenization & Context Windows  | 5     | DONE   |
| Page08-Ch06-AvoidingSlop           | 06 - Avoiding AI Slop                | 5     | DONE   |
| Page09-Ch07-DesignChallenges       | 07 - Design Challenges & Solutions   | 5     | DONE   |
| Page10-Ch08-IconsVsEmojis          | 08 - Icons over Emojis               | 5     | DONE   |
| Page11-Ch09-PNGAnalysis            | 09 - AI Visual Analysis              | 3     | DONE   |
| Page12-Ch10-PremiumDeliverables    | 10 - Premium Deliverables & Recipes  | 8     | DONE   |
| Page13-Ch11-Troubleshooting        | 11 - Troubleshooting & Common Errors | 4     | DONE   |
| Page14-Conclusion                  | Conclusion / Back Cover              | 1     | DONE   |
| **Total**                          |                                      | **68**|        |

> **Note:** Chapter 10 ("Premium Deliverables & Recipes") merges what TASK.md previously listed as separate "Premium Deliverables" and "Recipes & Templates" chapters. The book is now 11 numbered chapters, not 12.

## File Structure

```
react-pdf-gen/
├── CLAUDE.md                       # Build commands + architecture rules for Claude
├── TASK.md                         # This file - project roadmap
├── STYLE.md                        # Visual style guide (typography, palette, spacing)
├── docs/                           # Project documentation (humans + AI agents)
├── reference/                      # AI-optimized knowledge base
│   ├── react-pdf-api/              # API documentation
│   │   ├── components.md           # All react-pdf components
│   │   ├── styling.md              # CSS-like styling system
│   │   ├── fonts.md                # Font registration & management
│   │   ├── page-sizes.md           # Supported page sizes
│   │   └── limitations.md          # Known limitations & workarounds
│   ├── ai-patterns/                # AI integration patterns
│   │   ├── tokenization.md         # Token counts, context windows
│   │   ├── file-splitting.md       # Page-per-file architecture
│   │   ├── prompting.md            # Prompting strategies for PDF gen
│   │   └── png-vs-pdf-analysis.md  # Why AI reads PNG better than PDF
│   └── design/                     # Design reference
│       ├── design-languages.md     # Specifying design systems
│       ├── icons-vs-emojis.md      # Why icons beat emojis in PDF
│       └── quality-checklist.md    # Premium deliverable checklist
├── content/                        # Markdown book content (source for prose)
│   └── chapters/                   # 00-cover.md ... 11-troubleshooting.md
├── prompts/                        # Long-form prompt templates (current)
├── templates/                      # Older copies + CLAUDE.md.template + README
├── fonts/                          # Inter TTF files (7 weights)
├── scripts/
│   └── export-pages.sh             # PDF → PNG via pdftoppm (default 200 DPI)
├── src/                            # React-PDF source for rendering
│   ├── fonts.ts                    # Inter font registration
│   ├── build.tsx                   # PDF build script
│   ├── Document.tsx                # Root Document component
│   ├── styles/
│   │   ├── theme.ts                # Design tokens (single source of truth)
│   │   └── shared.ts               # Shared StyleSheet used by all pages
│   ├── components/                 # ContentPage, ChapterTitle, TipBox, ...
│   ├── pages/                      # PageNN-...tsx — one file per logical page
│   └── utils/
│       └── syntaxHighlight.ts      # Regex tokenizer for CodeBlock
└── output/                         # Generated artifacts (gitignored)
    ├── ebook.pdf                   # pnpm build
    └── pages/                      # pnpm export → page-NN.png
```

## Key Principles

1. **One page = one file** - Each page is its own component for AI manageability
2. **Reference-first** - The `reference/` folder feeds AI context efficiently
3. **Markdown-first** - Content written in markdown, then rendered to PDF
4. **Design system driven** - Consistent tokens, colors, typography throughout
