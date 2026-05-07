# Commands

All commands run from the project root. Package manager: `pnpm` (declared in `package.json`).

## `pnpm build`

Runs `tsx src/build.tsx`. Reads `src/Document.tsx`, renders the React tree to `output/ebook.pdf`, and logs:

```
Building PDF...
PDF generated: /abs/path/output/ebook.pdf
Size: 4.21 MB | Time: 2843ms
```

Exits 1 on render failure. Creates `output/` if it doesn't exist. Does not clean previous PNGs.

## `pnpm export`

Runs `bash scripts/export-pages.sh`. Calls `pdftoppm -png -r 200 output/ebook.pdf output/pages/page`, producing `output/pages/page-NN.png` (one file per PDF page).

- Default DPI: `200` (matches Chapter 9's recommendation for AI vision analysis). Override with a positional arg: `./scripts/export-pages.sh 150` (faster) or `./scripts/export-pages.sh 300` (print-quality).
- Clears existing `page-*.png` before exporting.
- Errors out if `output/ebook.pdf` doesn't exist (run `pnpm build` first).
- If `pdftoppm` is not on PATH, runs `sudo apt-get install -y poppler-utils`. On non-Debian systems, install `poppler` manually before running.

## `pnpm pipeline`

`pnpm build && pnpm export` chained — render PDF, then rasterize. The `&&` means the export step is skipped if the build fails. This is the standard command after any change.

## `pnpm dev`

Runs `tsx watch src/build.tsx`. Re-renders the PDF on every file change in `src/`. There is no live reload for the PDF viewer — open `output/ebook.pdf` in a viewer that auto-reloads on file change (Skim, Zathura), or re-open after each rebuild.

## TypeScript

There is no separate `pnpm typecheck` script. `tsx` does on-the-fly transpilation but does not type-check. To type-check, run `pnpm exec tsc --noEmit` against `tsconfig.json`.
