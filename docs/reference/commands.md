# Commands

All commands run from the project root. Package manager: `pnpm` (declared in `package.json`).

## `pnpm build`

Chains `pnpm sync && tsx src/build.tsx`:

1. `pnpm sync` regenerates `src/registry.ts` from `src/manifest.ts` + the `src/pages/` tree.
2. `tsx src/build.tsx` does a **two-pass render**: render → `pdftotext -layout` extracts each `CHAPTER NN` title page position into `output/toc-positions.json` → render again so the TOC reflects the positions → re-extract to verify no position shifted between passes.

Logs (example; size and elapsed time vary):

```
Building PDF...
TOC positions: 12 chapters mapped
PDF generated: /abs/path/output/react-pdf-ai-builders-guide.pdf
Size: 0.28 MB | Time: 12345ms
```

Exits 1 on render failure, an incomplete or ambiguous TOC map (a chapter marker missing, or found on more than one page), chapter positions shifting between the two passes, a rendered page count that differs from the registry length (each page file must render exactly one PDF page), or any page whose `pdfinfo` dimensions differ from uniform LETTER size. Creates `output/` if it doesn't exist and does not clean previous PNGs. Requires both `pdftotext` and `pdfinfo` (from poppler-utils) on PATH.

## `pnpm sync`

Runs `tsx scripts/sync-project.ts`. Reads `src/manifest.ts` (chapter structure) plus the `src/pages/` tree, then writes `src/registry.ts` (auto-generated, gitignored). The registry exports `allPages` (the ordered page array `Document.tsx` renders, with chrome at the ends and manifest chapters in between) — its only export. The TOC page reads `MANIFEST` directly.

Sync validates its inputs before writing (duplicate chapter numbers or entryPages, entryPages without files, generated-identifier collisions, empty chrome folders, two chapters sharing one directory — all exit 1), and only rewrites `registry.ts` when the generated content actually changed. That idempotence is what keeps `pnpm dev` from looping: the watcher excludes `src/registry.ts`, and an unchanged registry means no spurious file event either way.

You don't normally run sync directly — `pnpm build` runs it first, and `pnpm dev` runs it before every watched rebuild.

## `pnpm export`

Runs `bash scripts/export-pages.sh`. Calls `pdftoppm -png -r 200 output/react-pdf-ai-builders-guide.pdf output/pages/page`, producing `output/pages/page-NN.png` (one file per PDF page).

- Default DPI: `200` (matches Chapter 9's recommendation for AI vision analysis). Override with a positional arg: `./scripts/export-pages.sh 150` (faster) or `./scripts/export-pages.sh 300` (print-quality).
- Clears existing `page-*.png` before exporting.
- Errors out if `output/react-pdf-ai-builders-guide.pdf` doesn't exist (run `pnpm build` first).
- Requires `pdftoppm` and `pdfinfo` on PATH. If either is missing, prints platform-specific `poppler-utils` install instructions (apt / brew / dnf) and exits 1 — the script never runs an install itself.
- Fails if rasterization produces zero PNGs or if the PNG count differs from the PDF page count reported by `pdfinfo`.

## `pnpm pipeline`

`pnpm build && pnpm export` chained — render PDF, then rasterize. The `&&` means the export step is skipped if the build fails. This is the standard command after any change.

## `pnpm dev`

Runs `tsx watch` on `scripts/dev.ts` with the source tree and authored Markdown file included. Each relevant change starts a fresh watched process, re-syncs `src/registry.ts`, then runs the two-pass build directly. New, renamed, or deleted page files and manifest changes are therefore picked up without restarting watch mode. There is no live reload for the PDF viewer — open `output/react-pdf-ai-builders-guide.pdf` in a viewer that auto-reloads on file change (Skim, Zathura), or re-open after each rebuild.

## `pnpm typecheck`

Runs `pnpm sync && tsc --noEmit`. Regenerates `src/registry.ts` first (so the auto-generated, gitignored registry type-checks), then runs the TypeScript compiler in no-emit mode against `tsconfig.json`. `tsx` only transpiles on the fly and never type-checks, so this is the command that actually catches type errors — run it before committing. No separate manual `tsc` invocation is needed.
