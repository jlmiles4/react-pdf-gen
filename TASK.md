# React-PDF + AI Best Practices Ebook

## Project Overview

An ebook (~65 pages) covering best practices for using `@react-pdf/renderer` with AI coding agents. The book teaches developers how to structure react-pdf projects for maximum AI productivity, avoid common pitfalls, and produce premium-quality PDF deliverables.

## Target Audience

- Developers using AI coding assistants (Claude, GPT, Copilot) to generate PDF documents
- Teams building automated PDF generation pipelines
- Anyone using `@react-pdf/renderer` who wants to improve output quality

## Status Tracker

| Chapter | Pages | Status |
|---------|-------|--------|
| 00 - Cover & Title | 2 | DONE |
| 01 - Introduction | 3 | DONE |
| 02 - React-PDF Fundamentals | 5 | DONE |
| 03 - Project Architecture for AI | 5 | DONE |
| 04 - Design Language Specification | 5 | DONE |
| 05 - Tokenization & Context Windows | 5 | DONE |
| 06 - Avoiding AI Slop | 5 | DONE |
| 07 - Design Challenges & Solutions | 5 | DONE |
| 08 - Icons vs Emojis | 4 | DONE |
| 09 - AI Visual Analysis (PNG vs PDF) | 4 | DONE |
| 10 - Premium Deliverables | 4 | DONE |
| 11 - Recipes & Templates | 6 | DONE |
| 12 - Troubleshooting & Common Errors | 7 | DONE |
| **Total** | **~65** | |

## File Structure

```
react-pdf-gen/
├── TASK.md                          # This file - project roadmap
├── reference/                       # AI-optimized knowledge base
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
├── content/                         # Markdown book content
│   └── chapters/                   # One file per chapter
│       ├── 00-cover.md
│       ├── 01-introduction.md
│       ├── 02-react-pdf-fundamentals.md
│       ├── 03-project-architecture.md
│       ├── 04-design-language.md
│       ├── 05-tokenization.md
│       ├── 06-avoiding-ai-slop.md
│       ├── 07-design-challenges.md
│       ├── 08-icons-vs-emojis.md
│       ├── 09-png-vs-pdf-analysis.md
│       ├── 10-premium-deliverables.md
│       ├── 11-advanced-patterns.md
│       └── 12-troubleshooting.md
└── src/                             # React-PDF source for rendering
    ├── pages/                       # One component per page/chapter
    ├── components/                  # Shared components
    ├── styles/                      # Shared style definitions
    └── assets/                      # Fonts, icons, images
```

## Key Principles

1. **One page = one file** - Each page is its own component for AI manageability
2. **Reference-first** - The `reference/` folder feeds AI context efficiently
3. **Markdown-first** - Content written in markdown, then rendered to PDF
4. **Design system driven** - Consistent tokens, colors, typography throughout
