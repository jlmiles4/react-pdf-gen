# Documentation

Index of the project docs. For the project overview, quick start, prerequisites,
and repository layout, see the [root README](../README.md) — this file
deliberately does not repeat them, so there is one copy to keep current.

## Architecture

- [Overview](architecture/overview.md) — how pages, components, and the registry fit together
- [Page anatomy](architecture/page-anatomy.md) — entry pages, continuation pages, chrome pages, the one-source-file-per-PDF-page convention
- [Design system](architecture/design-system.md) — token shapes, shared styles, font registration, conventions

## Build

- [Pipeline](build/pipeline.md) — sync → two-pass render, clickable TOC wiring, and PNG export
- [Registry sync](build/registry-sync.md) — `scripts/sync-project.ts`, how `manifest.ts` + the pages tree become `registry.ts`
- [Pagination and layout](build/pagination.md) — `wrap={false}`, `minPresenceAhead`, fixed headers, orphan avoidance

## Guides

- [Add a page](guides/add-a-page.md) — step-by-step for adding a new chapter or content page
- [Markdown content](guides/markdown-content.md) — `MarkdownRenderer`, supported syntax, when to reach for it
- [Troubleshooting](guides/troubleshooting.md) — build errors, render surprises, the CodeBlock template-literal trap

## [Reference](reference/README.md)

- [Commands](reference/commands.md) — every `pnpm` script and what it does
- [Components](reference/components.md) — props for every component in `src/components/`
- [Theme tokens](reference/theme-tokens.md) — concrete color, typography, spacing, geometry values
- [Syntax highlighting](reference/syntax-highlighting.md) — how `<CodeBlock>` colors code (language-agnostic tokenizer)
