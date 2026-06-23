# Commands

All commands run from the project root. Package manager: `pnpm` (declared in `package.json`).

## `pnpm build`

Chains `pnpm sync && tsx src/build.tsx`:

1. `pnpm sync` regenerates `src/registry.ts` from `src/pages/*.tsx`.
2. `tsx src/build.tsx` does a **two-pass render**: render → `pdftotext -layout` extracts each `CHAPTER NN` title page position into `output/toc-positions.json` → render again so the TOC reflects the positions.

Logs (one line each pass + final):

```
Building PDF...
TOC positions: 12 chapters mapped
PDF generated: /abs/path/output/ebook.pdf
Size: 0.27 MB | Time: 10340ms
```

Exits 1 on render failure. Creates `output/` if it doesn't exist. Does not clean previous PNGs. Requires `pdftotext` (poppler-utils) on PATH for pass 1's extraction.

## `pnpm sync`

Runs `tsx scripts/sync-project.ts`. Reads `src/manifest.ts` (chapter structure) plus the `src/pages/` tree, then writes `src/registry.ts` (auto-generated, gitignored). The registry exports `allPages` (the ordered page array `Document.tsx` renders, with chrome at the ends and manifest chapters in between) — its only export. The TOC page reads `MANIFEST` directly.

You don't normally run sync directly — `pnpm build` runs it first, and `pnpm dev` runs it once at startup.

## `pnpm export`

Runs `bash scripts/export-pages.sh`. Calls `pdftoppm -png -r 200 output/ebook.pdf output/pages/page`, producing `output/pages/page-NN.png` (one file per PDF page).

- Default DPI: `200` (matches Chapter 9's recommendation for AI vision analysis). Override with a positional arg: `./scripts/export-pages.sh 150` (faster) or `./scripts/export-pages.sh 300` (print-quality).
- Clears existing `page-*.png` before exporting.
- Errors out if `output/ebook.pdf` doesn't exist (run `pnpm build` first).
- If `pdftoppm` is not on PATH, prints platform-specific `poppler-utils` install instructions (apt / brew / dnf) and exits 1 — the script never runs an install itself.

## `pnpm pipeline`

`pnpm build && pnpm export` chained — render PDF, then rasterize. The `&&` means the export step is skipped if the build fails. This is the standard command after any change.

## `pnpm dev`

Runs `pnpm sync && tsx watch src/build.tsx`. Re-syncs the registry once, then watches `src/` and re-runs the two-pass build on every change. There is no live reload for the PDF viewer — open `output/ebook.pdf` in a viewer that auto-reloads on file change (Skim, Zathura), or re-open after each rebuild.

Note: dev watch re-runs `tsx src/build.tsx` only — if you add a new page file or edit `src/manifest.ts`, the registry won't pick it up until the next explicit `pnpm sync` (or restart of dev watch).

## `pnpm typecheck`

Runs `pnpm sync && tsc --noEmit`. Regenerates `src/registry.ts` first (so the auto-generated, gitignored registry type-checks), then runs the TypeScript compiler in no-emit mode against `tsconfig.json`. `tsx` only transpiles on the fly and never type-checks, so this is the command that actually catches type errors — run it before committing. No separate manual `tsc` invocation is needed.
