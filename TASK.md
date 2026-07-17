# React-PDF + AI Best Practices Ebook

## Project Overview

An ebook (78 pages) covering best practices for using `@react-pdf/renderer` with AI coding agents. The book teaches developers how to structure react-pdf projects for maximum AI productivity, avoid common pitfalls, and produce premium-quality PDF deliverables.

## Target Audience

- Developers using AI coding assistants (Claude, GPT, Copilot) to generate PDF documents
- Teams building automated PDF generation pipelines
- Anyone using `@react-pdf/renderer` who wants to improve output quality

## Status Tracker

78 source `.tsx` files in `src/pages/` render to 78 PDF pages in `output/react-pdf-ai-builders-guide.pdf`. Layout is directory-based: one folder per chapter, `NN-chapter/NN-page.tsx`, with `00-title.tsx` as the chapter divider. Chapter structure is defined in `src/manifest.ts`. Verify the rendered count with `pdfinfo output/react-pdf-ai-builders-guide.pdf` (or count `output/pages/*.png` after `pnpm pipeline`).

| Group | Chapter | Folder | Status |
|-------|---------|--------|--------|
| — | Cover | `01-cover/` | DONE |
| — | Table of Contents | `02-toc/` | DONE |
| Foundations | 01 — Introduction | `03-introduction/` | DONE |
| Foundations | 02 — React-PDF Fundamentals | `04-fundamentals/` | DONE |
| Foundations | 03 — Project Architecture for AI Agents | `05-architecture/` | DONE |
| Design System | 04 — Specifying a Design Language | `06-design-language/` | DONE |
| Design System | 05 — Tokenization and Context Windows | `07-tokenization/` | DONE |
| Design System | 06 — Avoiding AI Slop | `08-avoiding-slop/` | DONE |
| Craft | 07 — Design Challenges and Solutions | `09-design-challenges/` | DONE |
| Craft | 08 — Icons over Emojis | `10-icons/` | DONE |
| Shipping | 09 — AI Visual Analysis | `11-png-analysis/` | DONE |
| Shipping | 10 — Premium Deliverables & Recipes | `12-premium-recipes/` | DONE |
| Shipping | 11 — Troubleshooting & Common Errors | `13-troubleshooting/` | DONE |
| Shipping | 12 — Markdown Automation | `14-markdown-automation/` | DONE |
| — | Conclusion / Back Cover | `15-conclusion/` | DONE |

**Total: 78 source files → 78 rendered pages.**

## File Structure

```
react-pdf-gen/
├── CLAUDE.md                       # Build commands + architecture rules for Claude
├── TASK.md                         # This file - project roadmap
├── docs/                           # Project documentation (humans + AI agents; design system in docs/architecture/)
├── src/
│   ├── manifest.ts                 # Chapter structure (source of truth)
│   ├── registry.ts                 # AUTO-GENERATED page registry (gitignored)
│   ├── pages/                      # One folder per chapter: NN-chapter/NN-page.tsx
│   ├── components/                 # Shared components
│   └── styles/                     # theme.ts (tokens) + shared.ts (StyleSheet)
└── scripts/
    ├── sync-project.ts             # Registry generator (reads manifest.ts + walks src/pages/)
    └── export-pages.sh             # PDF → PNG via pdftoppm (default 200 DPI)
```

## Key Principles

1. **One page = one file** - Each PDF page is its own component for AI manageability
2. **Automated Assembly** - The registry is generated from `src/manifest.ts` plus a walk of `src/pages/` (no per-page metadata comments)
3. **Reference-first** - The `reference/` folder feeds AI context efficiently
4. **Markdown Integration** - Support for rendering content from .md files via `MarkdownRenderer`
5. **Design system driven** - Consistent tokens, colors, typography throughout
