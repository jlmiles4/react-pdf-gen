# Add a page

Adding a chapter or content page is a three-step edit. The registry, TOC entry, and TOC page numbers are all auto-generated — you just create the file.

Naming convention: `PageNN-ChNN-Topic.tsx` where the first `NN` is the absolute page-component index in render order (Cover = 01, TOC = 02, Ch01 = 03, …) and the second is the chapter number. Book chrome (Cover, TOC, Conclusion) drops the `ChNN` segment.

## 1. Create the page file

Path: `src/pages/PageNN-ChNN-Topic.tsx`. The first file of each chapter starts the chapter and gets a `// Group:` metadata comment; subsequent files in the same chapter (multi-file chapters like Ch08, Ch10, Ch11) skip the comment and just render content. Skeleton matches [`Page03-Ch01-Introduction.tsx`](../../src/pages/Page03-Ch01-Introduction.tsx):

```tsx
// Group: CRAFT
import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import {
  ContentPage,
  ChapterTitle,
  SectionHeading,
  BulletList,
  TipBox,
} from '../components';

const ChXXTopic: React.FC = () => (
  <>
    <ChapterTitle
      number="XX"
      title="Chapter Title"
      subtitle="One-sentence summary."
    />
    <ContentPage sectionTitle="Chapter Title">
      <SectionHeading>First Section</SectionHeading>
      <Text style={styles.body}>Body paragraph.</Text>
      <BulletList items={['First point', 'Second point']} />
      <TipBox>Pull-out callout.</TipBox>
    </ContentPage>
  </>
);

export default ChXXTopic;
```

Group values currently in use: `FOUNDATIONS`, `DESIGN SYSTEM`, `CRAFT`, `SHIPPING`. Pick one or add a new one — `Page02-TOC.tsx`'s `GROUP_CONFIG` controls the badge color, so a new group also needs an entry there.

`scripts/sync-project.ts` reads each page file and extracts:
- `// Group: NAME` from a comment (first file of a chapter only)
- `number`, `title`, `subtitle` from the `<ChapterTitle ... />` JSX in the same file

Multi-file chapters: only the first file of each chapter has both `// Group:` AND a `<ChapterTitle>`, so only the first file becomes a TOC entry. Subsequent files render straight into the chapter without a new title page.

## 2. Run the build

```bash
pnpm pipeline
```

This does, in order:

1. `pnpm sync` regenerates `src/registry.ts` from page files (alphabetical by filename).
2. `tsx src/build.tsx` pass 1 renders the PDF.
3. `pdftotext -layout` finds where each `CHAPTER NN` title page landed; positions are written to `output/toc-positions.json`.
4. Pass 2 re-renders so the TOC reflects the new page positions.
5. `pnpm export` rasterizes to `output/pages/page-NN.png` at 200 DPI.

You don't edit `Document.tsx`, `Page02-TOC.tsx`, or `registry.ts` — all three follow from the page files.

## 3. Visually verify

Open the relevant PNG(s) in `output/pages/`. Check for:

- No orphaned section headings (gold bar with the title pushed onto the next page alone)
- Callouts and tables not split across page boundaries
- Bullet lists where a single item didn't get isolated at the top of the next page
- Footer page number is consistent with the TOC entry
- Header section title matches the `sectionTitle` prop on `ContentPage`
- Chapter title page shows the correct page number bottom-left

If a section is breaking awkwardly, see [pagination](pagination.md) — the usual fixes are `wrap={false}`, `minPresenceAhead={40}`, or restructuring content density.

## Conventions to keep

- Import styles only from `../styles/shared` and tokens only from `../styles/theme`. Don't reach into `theme.ts` for raw values inside JSX — use the named token (`colors.accent[500]`, not `'#F0A000'`).
- Reuse components from `src/components/`. If a visual pattern repeats, promote it to a component instead of duplicating local styles.
- Pair every `fontFamily` with a `fontWeight` token (`fontWeight.regular`, `fontWeight.semibold`, `fontWeight.bold`) — never inline literals like `fontWeight: 700 as const`. The token set is the contract with `Font.register` in `src/fonts.ts`; an unregistered weight silently falls back to Helvetica.
- Use SVG icons from `src/components/Icons.tsx` sized via `iconSize.*` tokens, never emoji — Inter doesn't ship emoji glyphs and `pdftoppm` won't pull them from the system.
