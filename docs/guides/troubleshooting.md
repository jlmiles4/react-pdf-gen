# Troubleshooting

Common build errors and rendering surprises when editing the source, with the smallest fix that resolves each. End-user troubleshooting (what readers of the book see) lives in the book itself at `src/pages/13-troubleshooting/`.

## Build errors

### `Text string must be rendered inside a <Text> component`

A raw string ended up inside a `<View>` (or any non-`<Text>` element). Wrap it:

```tsx
// Wrong
<View>Hello</View>
// Right
<View><Text style={styles.body}>Hello</Text></View>
```

This also fires for stray whitespace inside conditional fragments like `{cond && ' '}`. Either drop the space or wrap it.

### Build hangs or runs out of memory on large pages

`ReactPDF.render` walks the tree synchronously and lays out every page in memory. If the PDF grows past ~50 image-heavy pages, set `NODE_OPTIONS=--max-old-space-size=4096 pnpm build`.

### Font silently falls back to Helvetica

Three causes, in order of likelihood:

1. `src/fonts.ts` was not imported before render. `src/build.tsx` imports it as a side-effect on its first line — keep that import first.
2. The `fontWeight` you used is not registered. Inter is registered for 400 / 500 / 600 / 700 only. Setting `fontWeight: 800` falls back without warning.
3. The path in `Font.register` doesn't resolve. Check that the `.ttf` file exists in `fonts/`.

To verify: open a content page in `output/pages/page-NN.png` and look for Helvetica's narrow letterforms versus Inter's wider ones.

## Rendering surprises

### CodeBlock displays `$$` instead of `$`

The `<CodeBlock>` body is a JS template literal. Inside template literals:

- `${expr}` — interpolates `expr`
- `\${expr}` — renders the literal characters `${expr}`
- `$\${expr}` — renders `$${expr}` (one literal `$` plus another from the escape)

When the *displayed* code is itself a template literal (e.g. an invoice formatter rendering `` `$${price}` ``), the `$\${...}` form is correct because the inner `${...}` is a real interpolation in the displayed snippet.

When the *displayed* code is JSX (`<Text>Total: ${price}</Text>`), the `$` is a literal character and `{price}` is a JSX expression — write `\${price}` in the source, not `$\${price}`. Otherwise the rendered PDF shows `$$`.

Fixed example: `src/pages/12-premium-recipes/06-recipe-invoice.tsx`.

### Section heading appears at the bottom of a page with no body

Add `minPresenceAhead={40}` to the heading wrapper. `<SectionHeading>` already does this — if you wrote a custom heading, it doesn't.

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

- Debian / Ubuntu: the script offers to do this with `sudo apt-get install -y poppler-utils`.
- macOS: `brew install poppler`.
- Fedora / RHEL: `sudo dnf install poppler-utils`.

### Exported PNGs look stale

`scripts/export-pages.sh` runs `rm -f output/pages/page-*.png` before re-rendering, so stale files shouldn't persist. If they do, you may have files from a previous build with a different page count — check that the page numbers go up to the value `pdfinfo output/ebook.pdf` reports.

### Export fails with "ebook.pdf not found"

Run `pnpm build` first, or use `pnpm pipeline` to chain both.

## Workflow

### TypeScript "errors" during build

`tsx` does not type-check; it transpiles. To type-check, run `pnpm exec tsc --noEmit`. The build still succeeds even when types fail — catching this requires the explicit `tsc` step.

### Hot reload doesn't update the PDF viewer

`pnpm dev` (`tsx watch`) re-renders the PDF on save, but most PDF viewers don't reload from disk automatically. Use Skim (macOS) or Zathura (Linux), or just re-open `output/ebook.pdf` after each save.

### Page count changed unexpectedly after a one-line edit

Adding a line of body text to a page near the bottom can push content over a page break and ripple downstream. With `<ContentPage wrap={false}>` (the project default), overflow clips silently — the symptom is missing content at the bottom of the page rather than an extra page appearing. If the content legitimately needs more room, split it into a new continuation file in the same chapter folder rather than fighting the layout. After non-trivial edits, also re-check the page count in `docs/README.md`, `TASK.md`, and the `src/Document.tsx` docstring.
