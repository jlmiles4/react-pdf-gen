# Troubleshooting

Common build errors and rendering surprises when editing the source, with the smallest fix that resolves each. End-user troubleshooting (what readers of the book see) lives in the book itself at `src/pages/13-troubleshooting/`.

## Build errors

### Console warning: `Invalid '...' string child outside <Text> component`

A raw string ended up directly under a `<Page>` or `<View>`. The renderer logs the warning above and omits the string from the output, so the symptom is text disappearing from the rendered page. Put ordinary copy in `<Text>`; text-capable primitives such as `<Link>` are exceptions. Wrap it:

```tsx
// Wrong
<View>Hello</View>
// Right
<View><Text style={styles.body}>Hello</Text></View>
```

This also fires for stray whitespace inside conditional fragments like `{cond && ' '}`. Either drop the space or wrap it.

### Build hangs or runs out of memory on large pages

`ReactPDF.render` walks the tree synchronously and lays out every page in memory. If the PDF grows past ~50 image-heavy pages, set `NODE_OPTIONS=--max-old-space-size=4096 pnpm build`.

### Font registration, loading, and weight fallback

The symptom identifies the cause:

1. An omitted `fontFamily` uses react-pdf's built-in Helvetica default.
2. An unknown or mismatched `fontFamily` throws a "Font family not registered" build error. Keep the `src/fonts.ts` side-effect import before rendering.
3. A path in `Font.register` that does not resolve fails while loading the font. Check that the `.ttf` file exists in `fonts/`.
4. An unavailable `fontWeight` silently resolves to the nearest registered weight in the same family. Inter registers 400 / 500 / 600 / 700; use the project's weight tokens so the requested result is intentional.

To verify: open a content page in `output/pages/page-NN.png` and look for Helvetica's narrow letterforms versus Inter's wider ones.

### Build fails with "expected exactly one page-break marker line"

`content/chapters/12-markdown-demo.md` is the one authored Markdown file the build consumes, and editing it is the one `.md` change that can fail the build: both `src/pages/14-markdown-automation/` pages split it on a single `<!-- page-break -->` marker line (via `src/utils/markdownDemo.ts`). Deleting the marker, duplicating it, or breaking its own-line placement throws this error — restore exactly one marker line between the two halves.

## Rendering surprises

### CodeBlock displays `$$` instead of `$`

The `<CodeBlock>` body is a JS template literal. Inside template literals:

- `${expr}` — interpolates `expr`
- `\${expr}` — renders the literal characters `${expr}`
- `$\${expr}` — renders `$${expr}` (one literal `$` plus another from the escape)

When the *displayed* code is itself a template literal (e.g. an invoice formatter rendering `` `$${price}` ``), the `$\${...}` form is correct because the inner `${...}` is a real interpolation in the displayed snippet.

When the *displayed* code is JSX (`<Text>Total: ${price}</Text>`), the `$` is a literal character and `{price}` is a JSX expression — write `\${price}` in the source, not `$\${price}`. Otherwise the rendered PDF shows `$$`.

There is also a third option that sidesteps escaping entirely: split the displayed snippet into concatenated pieces so no `${` appears in the outer template literal. That's what `src/pages/12-premium-recipes/06-recipe-invoice.tsx` does (`` 'INVOICE #' + ... `` style) — read it as the working example of the concatenation approach, not of the `\${...}` escape.

### Section heading appears at the bottom of a page with no body

On a wrapping `<Page>`, add `minPresenceAhead={40}` to the heading wrapper; `<SectionHeading>` already carries it. On this project's default fixed `ContentPage wrap={false}`, rebalance the page or split later content into another source file instead.

### Callout box splits across a page

The colored box renders empty on one side of the page break. `<TipBox>`, `<WarningBox>`, `<InfoBox>` all set `wrap={false}` internally. If you composed a callout by hand from `<View style={styles.tipBox}>`, add `wrap={false}` to the outer `<View>`.

If the callout legitimately doesn't fit on one page even alone, split the content across two callouts.

### Bullet list orphans the dot from its text

`<BulletList>` items are `wrap={false}` individually. The dot can only orphan if you're using a custom list — wrap each `{dot, text}` row in `<View wrap={false}>`.

### Two `<View style={{ width: '50%' }}>` stack vertically

`flexDirection` defaults to `'column'`. Add `flexDirection: 'row'` to the parent.

## PNG export

### `pdftoppm: command not found`

Install poppler-utils:

- Debian / Ubuntu: `sudo apt-get install -y poppler-utils` (the script prints this command; it never runs it for you).
- macOS: `brew install poppler`.
- Fedora / RHEL: `sudo dnf install poppler-utils`.

### Exported PNGs look stale

`scripts/export-pages.sh` runs `rm -f output/pages/page-*.png` before re-rendering, so stale files shouldn't persist. If they do, you may have files from a previous build with a different page count — check that the page numbers go up to the value `pdfinfo output/react-pdf-ai-builders-guide.pdf` reports.

### Export fails with "react-pdf-ai-builders-guide.pdf not found"

Run `pnpm build` first, or use `pnpm pipeline` to chain both.

## Workflow

### TypeScript "errors" during build

`tsx` does not type-check; it transpiles. To type-check, run `pnpm typecheck`. The build still succeeds even when types fail — catching this requires the explicit step. (Plain `tsc --noEmit` fails on a fresh clone: `src/registry.ts` is gitignored and only exists after `pnpm typecheck`/`pnpm sync` regenerates it.)

### Hot reload doesn't update the PDF viewer

`pnpm dev` (`tsx watch`) re-renders the PDF on save, but most PDF viewers don't reload from disk automatically. Use Skim (macOS) or Zathura (Linux), or just re-open `output/react-pdf-ai-builders-guide.pdf` after each save.

### Page count changed unexpectedly after a one-line edit

Adding a line of body text to a page near the bottom can exceed the intended LETTER box. With `<ContentPage wrap={false}>` (the project default), react-pdf can enlarge that physical page rather than add another one; the build's `pdfinfo` guard then fails and identifies the offending page. Split legitimate overflow into a continuation file instead of fighting the layout. After non-trivial edits, confirm the page count with `pdfinfo output/react-pdf-ai-builders-guide.pdf` and update any docs that cite it (`README.md`, `docs/README.md`, `TASK.md`).
