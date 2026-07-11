# Pagination and layout

`@react-pdf/renderer` lays out pages with a Yoga flexbox engine and breaks across pages automatically. The defaults are usually wrong for visual content. This page covers the four levers used in this project.

## `<Page>` and `wrap`

`ContentPage` wraps children in `<Page size="LETTER" style={styles.page} wrap={wrap}>`, with `wrap` controllable via prop and defaulting to `false`. Setting `wrap={true}` allows content to flow across multiple physical pages within one `<Page>` element.

The project's per-source-file convention is **one `.tsx` file = one PDF page**, so pages use the non-wrapping default — a single source file that overflows is treated as a layout bug to fix, not as content to flow. Opt into `wrap={true}` only when one source component deliberately spans multiple physical pages.

Non-wrapping overflow can grow the PDF page box beyond LETTER rather than creating a second page. After the second render, `src/build.tsx` runs `pdfinfo` over every page and fails if any width or height differs from 612 × 792 points. Shorten or split an offending source page; do not rely on clipping.

`ChapterTitle` and the cover, TOC, and conclusion explicitly set `wrap={false}` and a tokenized minimum LETTER height so each standalone source stays exactly one physical page.

## `wrap={false}` on a `<View>`

When `wrap={false}` is set on a child `<View>`, react-pdf treats that view as a single unit. If it doesn't fit in the remaining space, the entire view is pushed to the next page. Used in this project on:

| Component | Why |
|---|---|
| `SectionHeading` | The gold bar + title must stay together |
| `TipBox` / `WarningBox` / `InfoBox` | Empty colored boxes look broken when split |
| `CodeBlock` | Splitting a code listing across pages destroys readability — keep blocks under ~15 lines |
| `BulletList` items | Each item is `wrap={false}` so the gold dot never separates from its text |
| `Table` | Header row plus body must stay together; tables split mid-row look like rendering bugs |
| `SectionBanner` | Hero card splits look broken |

When you build a new layout primitive that includes a colored background or a leading icon/marker, default to `wrap={false}`.

## `minPresenceAhead`

`minPresenceAhead={N}` on a `<View>` says: "if there are fewer than N points of vertical space remaining, push me to the next page." `SectionHeading` uses `minPresenceAhead={40}` so a section heading never lands at the very bottom of a page with its body content stranded on the next.

Raise the value (~60) for headings that are followed by tall mandatory content (a banner, a code block). Lower values rarely help.

## Fixed headers and footers

`Header` and `Footer` are rendered inside `ContentPage` and use `fixed` so they repeat on every page that the wrapping `<Page>` flows onto. The footer's page number renders via the react-pdf `render={({ pageNumber, totalPages }) => ...}` API. Fixed elements don't count toward `wrap` decisions for sibling content.

## Avoiding the common failure modes

- **Orphaned heading** — gold bar appears at the bottom of a page with no body underneath. Fix: confirm `minPresenceAhead` is set, or shorten the previous section.
- **Split callout** — empty cream/red box at the top or bottom of a page. Fix: confirm `wrap={false}` on the callout. If it's still too tall, split the content into two callouts.
- **Orphan bullet** — single bullet pushed alone to the next page. `BulletList` items are `wrap={false}` individually, so the symptom is usually the *whole list* needing to move, which the engine won't do. Fix: shorten content above so the entire list fits, or break the list into two with intervening prose.
- **Table split mid-row** — only happens if you bypass `Table` and roll your own. The `Table` component sets `wrap={false}` on the container and on each row.

## Visual review loop

After any layout change run `pnpm pipeline` and open the affected PNGs in `output/pages/`. The PNG export is the fastest way to spot pagination problems — issues that look fine in a PDF viewer (where the eye fills in continuity) jump out as obviously broken on a single-page raster.
