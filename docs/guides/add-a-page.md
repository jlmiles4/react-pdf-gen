# Add a page

Adding a page is either a one-file edit (continuation page in an existing chapter) or a three-file edit (divider + first content page + manifest entry, for a new chapter). The registry and TOC are auto-generated — you don't touch them.

The convention is **one `.tsx` file = one PDF page**. Pages call `<ContentPage ... wrap={false}>` so overflow is a layout bug, not silent flow onto a second physical page.

## Adding a continuation page to an existing chapter

The common case. Drop a new file in the chapter folder; `pnpm build` picks it up.

Path: `src/pages/<chapter-folder>/NN-topic.tsx`, where `NN` is the next available numeric prefix (`00-title` is the divider, `01-<chapter>` is the first content page, continuations are `02-`, `03-`, …).

Skeleton — matches [`src/pages/04-fundamentals/03-styling-and-flexbox.tsx`](../../src/pages/04-fundamentals/03-styling-and-flexbox.tsx):

```tsx
import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, CodeBlock } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>The Styling System</SectionHeading>
    <Text style={styles.body}>Body paragraph.</Text>
    <CodeBlock language="tsx">{`const x = 1;`}</CodeBlock>
  </ContentPage>
);

export default Page;
```

No `<ChapterTitle>`, no manifest edit — continuation files are picked up automatically because they're siblings of the chapter's divider page (declared in `src/manifest.ts` as the chapter's `entryPage`). The `sectionTitle` prop repeats the chapter name so the page header shows it.

## Adding a new chapter

Three edits.

**1. Add the chapter to the manifest.** Open [`src/manifest.ts`](../../src/manifest.ts) and add a `Chapter` entry to the appropriate `Group`:

```ts
{
  num: '13',
  title: 'New Chapter',
  subtitle: 'One-sentence summary shown in the TOC.',
  entryPage: '16-new-chapter/00-title',
},
```

`entryPage` is the path to the chapter-divider file under `src/pages/` (no `.tsx` extension). Groups currently in use: `FOUNDATIONS`, `DESIGN_SYSTEM`, `CRAFT`, `SHIPPING`. To add a new group, append a `Group` entry to `MANIFEST` and add a `GROUP_CONFIG` entry in [`src/pages/02-toc/01-toc.tsx`](../../src/pages/02-toc/01-toc.tsx) to give it a badge color.

**2. Create the divider file.** Path matches `entryPage`. It renders just `<ChapterTitle>`. Skeleton — matches [`src/pages/03-introduction/00-title.tsx`](../../src/pages/03-introduction/00-title.tsx):

```tsx
import React from 'react';
import { ChapterTitle } from '../../components';

const Page: React.FC = () => (
  <ChapterTitle
    number="13"
    title="New Chapter"
    subtitle="One-sentence summary shown in the TOC."
  />
);

export default Page;
```

The `number`/`title`/`subtitle` props should match the manifest entry — sync doesn't enforce the match, but the manifest drives the TOC and the JSX drives the rendered title page, so divergence shows up visually.

**3. Create the first content page.** Path: `src/pages/16-new-chapter/01-new-chapter.tsx`. Use the continuation-page skeleton above.

For additional pages in the new chapter, follow "Adding a continuation page" above.

## Build and verify

```bash
pnpm pipeline
```

This does, in order:

1. `pnpm sync` regenerates `src/registry.ts` from `src/manifest.ts` + the `src/pages/` tree.
2. `tsx src/build.tsx` pass 1 renders the PDF.
3. `pdftotext -layout` finds where each `CHAPTER NN` title page landed; positions are written to `output/toc-positions.json`.
4. Pass 2 re-renders so the TOC reflects the new page positions.
5. `pnpm export` rasterizes to `output/pages/page-NN.png` at 200 DPI.

You don't edit `Document.tsx` or `registry.ts` — both follow from the manifest plus the page files.

## Visually verify

Open the relevant PNG(s) in `output/pages/`. Check for:

- No orphaned section headings (gold bar with the title pushed onto the next page alone)
- Callouts and tables not split across page boundaries
- Bullet lists where a single item didn't get isolated at the top of the next page
- Footer page number is consistent with the TOC entry
- Header section title matches the `sectionTitle` prop on `ContentPage`
- Chapter title page shows the correct page number bottom-left
- Content fits within one physical page when `wrap={false}` is set — if it doesn't, react-pdf clips silently; shorten the content or split it into a continuation file

If a section is breaking awkwardly, see [pagination](../build/pagination.md) — the usual fixes are `wrap={false}` on the offending block, `minPresenceAhead={40}`, or restructuring content density.

## Conventions to keep

- One source file = one PDF page. Set `wrap={false}` on `<ContentPage>` and split into a continuation file rather than letting one source file flow.
- Import styles only from `../../styles/shared` and tokens only from `../../styles/theme`. Don't reach into `theme.ts` for raw values inside JSX — use the named token (`colors.accent[500]`, not `'#F0A000'`).
- Reuse components from `src/components/`. If a visual pattern repeats, promote it to a component instead of duplicating local styles.
- Pair every `fontFamily` with a `fontWeight` token (`fontWeight.regular`, `fontWeight.semibold`, `fontWeight.bold`) — never inline literals like `fontWeight: 700 as const`. The token set is the contract with `Font.register` in `src/fonts.ts`; an unregistered weight silently falls back to Helvetica.
- Use SVG icons from `src/components/Icons.tsx` sized via `iconSize.*` tokens, never emoji — Inter doesn't ship emoji glyphs and `pdftoppm` won't pull them from the system.
