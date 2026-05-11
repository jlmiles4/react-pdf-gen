# React-PDF + AI Best Practices Ebook

## Project Overview

An ebook (approx. 60-70 pages) covering best practices for using `@react-pdf/renderer` with AI coding agents. The book teaches developers how to structure react-pdf projects for maximum AI productivity, avoid common pitfalls, and produce premium-quality PDF deliverables.

## Target Audience

- Developers using AI coding assistants (Claude, GPT, Copilot) to generate PDF documents
- Teams building automated PDF generation pipelines
- Anyone using `@react-pdf/renderer` who wants to improve output quality

## Status Tracker

22 source files in `src/pages/` render to 73 PDF pages in `output/ebook.pdf` after layout overflow. Each chapter spans one or more `PageNN-ChNN-Topic.tsx` files. Verify the rendered count by running `pnpm pipeline` and counting `output/pages/*.png`.

| Chapter                                | Source Files                                                                              | Status |
|----------------------------------------|-------------------------------------------------------------------------------------------|--------|
| Cover                                  | `Page01-Cover.tsx`                                                                        | DONE   |
| Table of Contents                      | `Page02-TOC.tsx`                                                                          | DONE   |
| 01 — Introduction                      | `Page03-Ch01-Introduction.tsx`                                                            | DONE   |
| 02 — React-PDF Fundamentals            | `Page04-Ch02-Fundamentals.tsx`                                                            | DONE   |
| 03 — Project Architecture for AI       | `Page05-Ch03-Architecture.tsx`                                                            | DONE   |
| 04 — Specifying a Design Language      | `Page06-Ch04-DesignLanguage.tsx`                                                          | DONE   |
| 05 — Tokenization & Context Windows    | `Page07-Ch05-Tokenization.tsx`                                                            | DONE   |
| 06 — Avoiding AI Slop                  | `Page08-Ch06-AvoidingSlop.tsx`                                                            | DONE   |
| 07 — Design Challenges & Solutions     | `Page09-Ch07-DesignChallenges.tsx`                                                        | DONE   |
| 08 — Icons over Emojis                 | `Page10-Ch08-Icons.tsx`                                                                   | DONE   |
| 09 — AI Visual Analysis                | `Page11-Ch09-PNGAnalysis.tsx`                                                             | DONE   |
| 10 — Premium Deliverables & Recipes    | `Page12-Ch10-PremiumRecipes.tsx`                                                          | DONE   |
| 11 — Troubleshooting & Common Errors   | `Page13-Ch11-Troubleshooting.tsx`                                                         | DONE   |
| 12 — Markdown Automation               | `Page14-Ch12-MarkdownAutomation.tsx`                                                      | DONE   |
| Conclusion / Back Cover                | `Page15-Conclusion.tsx`                                                                   | DONE   |

**Total: 15 source files → 73 rendered pages** (as of 2026-05-09).

## File Structure

```
react-pdf-gen/
├── CLAUDE.md                       # Build commands + architecture rules for Claude
├── TASK.md                         # This file - project roadmap
├── STYLE.md                        # Visual style guide (typography, palette, spacing)
├── docs/                           # Project documentation (humans + AI agents)
├── registry.ts                     # AUTO-GENERATED page registry
├── scripts/
│   ├── sync-project.ts             # Registry & TOC generator
│   └── export-pages.sh             # PDF → PNG via pdftoppm (default 200 DPI)
```

## Key Principles

1. **One page = one file** - Each page is its own component for AI manageability
2. **Automated Assembly** - Registry and TOC are automatically generated from page metadata
3. **Reference-first** - The `reference/` folder feeds AI context efficiently
4. **Markdown Integration** - Support for rendering content from .md files via `MarkdownRenderer`
5. **Design system driven** - Consistent tokens, colors, typography throughout
