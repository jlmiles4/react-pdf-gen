# React-PDF + AI — Starter Templates

These templates are the executable version of the ebook. Each file is a self-contained prompt you can paste into Claude, GPT, Cursor, or any AI coding agent to scaffold, build, and refine a professional react-pdf project.

## How to Use

1. **Starting a new project?** Open `01-project-setup.md`, paste it into your AI agent, and follow along.
2. **Need a design system?** Feed `02-design-tokens.md` to your AI with your brand colors.
3. **Building components?** Use `03-components.md` as a reference for every reusable pattern.
4. **Adding pages?** Copy the template from `04-page-creation.md` and customize.
5. **Ready to ship?** Run through `05-quality-checklist.md` before publishing.
6. **Stuck on layout?** Check `06-common-patterns.md` for working workarounds.

## The CLAUDE.md File

Drop `CLAUDE.md.template` into your project root as `CLAUDE.md`. Claude Code reads this file automatically and follows the rules — correct imports, design tokens, wrap={false}, no Helvetica, no emoji. It turns Claude from a generic code generator into a react-pdf specialist.

**To customize:** Open it, replace the placeholder values (`[YOUR-PROJECT]`, `[your-font]`, etc.) with your actual project details.

## The Source Code

The full source of the ebook you purchased is in the `src/` directory of this repo. It's a working 54-page PDF that demonstrates every pattern discussed in the book:

- `src/styles/theme.ts` — Complete design token system
- `src/styles/shared.ts` — Shared StyleSheet with 40+ styles
- `src/components/` — 11 reusable components
- `src/pages/` — 13 page files (cover, TOC, 11 chapters)
- `src/fonts.ts` — Font registration pattern
- `src/build.tsx` — Build script
- `STYLE.md` — Design system documentation

Run `pnpm install && pnpm build` to generate the PDF yourself. Run `pnpm pipeline` to also export every page as a PNG for AI visual review.

## Template Index

| File | When to Use |
|------|-------------|
| `CLAUDE.md.template` | Drop into any react-pdf project root (as `CLAUDE.md`) for AI assistance |
| `01-project-setup.md` | Starting a new react-pdf project from scratch |
| `02-design-tokens.md` | Creating your centralized theme/token system |
| `03-components.md` | Building reusable components (pages, callouts, tables, icons) |
| `04-page-creation.md` | Adding new pages or chapters to your document |
| `05-quality-checklist.md` | Pre-ship QA — checking for visual issues |
| `06-common-patterns.md` | Layout recipes and CSS workarounds |
