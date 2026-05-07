# Add a page

Adding a new chapter or content page is a five-step edit. The numbered chapters use the file naming convention `PageNN-ChNN-Topic.tsx` where the first `NN` is the absolute page-component index (Cover = 01, TOC = 02, Ch01 = 03, …) and the second is the chapter number.

## 1. Create the page file

Path: `src/pages/PageNN-ChNN-Topic.tsx`. Start from this skeleton (matches [Page03-Ch01-Introduction](../../src/pages/Page03-Ch01-Introduction.tsx)):

```tsx
import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import ContentPage from '../components/ContentPage';
import ChapterTitle from '../components/ChapterTitle';
import SectionHeading from '../components/SectionHeading';
import BulletList from '../components/BulletList';
import { TipBox } from '../components/TipBox';

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

If the chapter spans multiple pages, render multiple `<ContentPage>` blocks back-to-back inside the same fragment. `react-pdf` will paginate within a single `<ContentPage>` automatically — only split into a second `<ContentPage>` when you want a hard break.

## 2. Wire it into `Document.tsx`

Edit `src/Document.tsx`:

```tsx
import PageXXChXX from './pages/PageXX-ChXX-Topic';
// ...
<Document ...>
  ...
  <PageXXChXX />
  ...
</Document>
```

Order in the JSX is the order in the final PDF.

## 3. Update the TOC

`src/pages/Page02-TOC.tsx` is hand-curated. Add an entry that matches the new chapter's number, title, and starting page. Page numbers refer to the rendered PDF — re-run `pnpm pipeline` after adding the page to see where it lands, then update the TOC.

## 4. Build and visually verify

```bash
pnpm pipeline
```

Open the relevant PNG(s) in `output/pages/`. Check for:

- No orphaned section headings (gold bar with the title pushed onto the next page alone)
- Callouts and tables not split across page boundaries
- Bullet lists where a single item didn't get isolated at the top of the next page
- Footer page number is consistent with the TOC entry
- Header section title matches `sectionTitle` prop

## 5. Iterate

If a section is breaking awkwardly, see [pagination](pagination.md) — the usual fixes are `wrap={false}`, `minPresenceAhead={40}`, or restructuring content density.

## Conventions to keep

- Import styles only from `../styles/shared` and tokens only from `../styles/theme`. Don't reach into `theme.ts` for raw values inside JSX — use the named token (`colors.accent[500]`, not `'#F0A000'`).
- Reuse components from `src/components/`. If a visual pattern repeats, promote it to a component instead of duplicating styles.
- Pair every `fontFamily` with an explicit `fontWeight` (400, 500, 600, or 700).
- Use SVG icons from `src/components/Icons.tsx`, never emoji — Inter doesn't ship emoji glyphs and `pdftoppm` won't pull them from the system.
