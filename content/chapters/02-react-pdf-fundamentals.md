# Chapter 2: React-PDF Fundamentals

This chapter is your reference for everything `@react-pdf/renderer` can do. If you're already comfortable with the library, skim it. If you're new, read it end to end – every section builds on the previous one.

## Component Hierarchy

Every react-pdf document follows the same structure:

```
Document
  └── Page
        ├── View
        │     ├── Text
        │     ├── Image
        │     └── View (nested)
        ├── Text
        ├── Svg
        │     ├── Path
        │     ├── Circle
        │     └── Rect
        └── Link
```

The rules:

- `Document` is always the root. It contains only `Page` components.
- `Page` is a direct child of `Document`. Each `Page` is one physical page in the output.
- `View` is a generic container. Nest them as deep as you need.
- `Text` renders text. You cannot put raw strings inside `View` – they must be wrapped in `Text`.
- `Text` can be nested inside `Text` for inline styling (bold a single word, change color mid-sentence).
- `Image` and `Svg` go inside `View` or directly inside `Page`.

Breaking these rules produces silent failures or cryptic errors. The most common mistake: putting a bare string inside a `View` without wrapping it in `Text`.

## The Styling System

react-pdf uses JavaScript style objects – similar to React Native. You have two options:

### Inline styles

```tsx
<View style={{ padding: 16, backgroundColor: "#f5f5f5" }}>
  <Text style={{ fontSize: 12, color: "#333" }}>Hello</Text>
</View>
```

### StyleSheet.create()

```tsx
import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  body: {
    fontSize: 12,
    color: "#333",
  },
});

// Usage
<View style={styles.container}>
  <Text style={styles.body}>Hello</Text>
</View>
```

`StyleSheet.create()` doesn't do any special optimization in the current version – it's essentially an identity function that provides type checking. Use it anyway. It keeps styles organized and makes them reusable.

### Combining styles

Pass an array to merge multiple style objects:

```tsx
<Text style={[styles.body, styles.bold, { color: "#0066cc" }]}>
  Highlighted text
</Text>
```

Later entries override earlier ones, like `Object.assign()`.

## Supported vs. Unsupported CSS

This is where most people hit their first wall. react-pdf supports a subset of CSS. Knowing the boundaries upfront saves hours of debugging.

### What works

**Flexbox layout (the main layout tool):**
- `display` – only `flex` and `none`
- `flexDirection` – `row`, `column`, `row-reverse`, `column-reverse`
- `justifyContent` – `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`
- `alignItems` – `flex-start`, `center`, `flex-end`, `stretch`, `baseline`
- `alignSelf` – same values as `alignItems`
- `flexWrap` – `wrap`, `nowrap`
- `flexGrow`, `flexShrink`, `flexBasis`
- `gap`, `rowGap`, `columnGap`

**Dimensions:**
- `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`

**Spacing:**
- `margin` (and `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `marginHorizontal`, `marginVertical`)
- `padding` (same variants as margin)

**Positioning:**
- `position` – `relative` (default) or `absolute`
- `top`, `right`, `bottom`, `left`
- `zIndex`

**Typography:**
- `fontSize`, `fontFamily`, `fontWeight`, `fontStyle`
- `textAlign` – `left`, `center`, `right`, `justify`
- `lineHeight` (as a multiplier, e.g., `1.5`)
- `letterSpacing`
- `textDecoration` – `underline`, `line-through`, `none`
- `textTransform` – `uppercase`, `lowercase`, `capitalize`
- `textOverflow` – `ellipsis`

**Colors and backgrounds:**
- `color`, `backgroundColor`
- `opacity`
- Hex (`#ff0000`), RGB (`rgb(255, 0, 0)`), named colors (`red`)

**Borders:**
- `border`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`
- `borderWidth` (and per-side variants)
- `borderColor` (and per-side variants)
- `borderStyle` – `solid`, `dashed`, `dotted`
- `borderRadius` (and per-corner: `borderTopLeftRadius`, etc.)

**Other:**
- `overflow` – `hidden`
- `objectFit` – `contain`, `cover`, `fill`, `none`, `scale-down` (for images)
- `objectPosition` (for images)
- `transform` – `translate`, `rotate`, `scale`, `skew` and their X/Y variants

### What does NOT work

Do not attempt these. They will either silently fail or throw errors:

- **CSS Grid** – No `display: grid`. Use flexbox for everything.
- **Float** – No `float: left` or `float: right`.
- **Box shadow** – No `boxShadow`. Fake it with nested views and borders.
- **Text shadow** – No `textShadow`.
- **Animations / transitions** – It's a static document. None of this applies.
- **Pseudo-selectors** – No `:hover`, `:first-child`, `::before`, `::after`.
- **calc()** – No calculated values. Compute them in JavaScript before passing to styles.
- **CSS variables** – No `var(--color-primary)`. Use JavaScript constants instead.
- **Gradients** – No `linear-gradient()` or `radial-gradient()` in styles. You can draw gradients using SVG elements.
- **`display: inline`** – Only `flex` and `none`. For inline-like behavior, nest `Text` inside `Text`.
- **Percentage-based font sizes** – Use absolute point values.
- **`em` / `rem` units** – Not supported. Use points.
- **Shorthand properties** – Some work (`margin`, `padding`, `border`), some don't. When in doubt, use the longhand.

## Units System

The default unit in react-pdf is the **point** (pt). All numeric values without a unit suffix are interpreted as points.

| Unit | Equivalent | How to use |
|------|-----------|------------|
| Point (pt) | 1pt = 1/72 inch | `fontSize: 12` or `fontSize: "12pt"` |
| Inch (in) | 1in = 72pt | `width: "2in"` |
| Millimeter (mm) | 1mm = 2.835pt | `margin: "10mm"` |
| Centimeter (cm) | 1cm = 28.35pt | `padding: "1cm"` |
| Percentage (%) | Relative to parent | `width: "50%"` |
| Viewport width (vw) | Relative to page width | `width: "100vw"` |
| Viewport height (vh) | Relative to page height | `height: "50vh"` |

Key numbers to remember:

- **US Letter** = 612pt x 792pt (8.5in x 11in)
- **A4** = 595.28pt x 841.89pt (210mm x 297mm)
- **1 inch = 72 points** – this is the conversion you'll use most
- **Common margins:** 0.5in = 36pt, 0.75in = 54pt, 1in = 72pt

When a prop accepts a number, it's points. When you need other units, pass a string: `"2in"`, `"50%"`, `"10mm"`.

## Page Sizes

Set the page size with the `size` prop on `<Page>`:

```tsx
// Named sizes
<Page size="LETTER">    {/* 612 x 792 pt */}
<Page size="A4">         {/* 595.28 x 841.89 pt */}
<Page size="LEGAL">      {/* 612 x 1008 pt */}

// Custom size as [width, height] in points
<Page size={[468, 648]}>  {/* 6.5in x 9in – a common book size */}

// Landscape orientation
<Page size="LETTER" orientation="landscape">  {/* 792 x 612 pt */}
```

Available named sizes: `A0` through `A10`, `B0` through `B10`, `C0` through `C10`, `LETTER`, `LEGAL`, `TABLOID`, `EXECUTIVE`, `FOLIO`.

For ebooks and reports, US Letter (612x792) and A4 (595x842) cover 95% of use cases. Pick one and stick with it for the entire document.

## Font Registration

react-pdf ships with no fonts. If you don't register a font, it uses a built-in fallback that looks fine for prototyping but wrong for production.

### Basic registration

```tsx
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Inter-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/Inter-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Inter-Bold.ttf", fontWeight: 700 },
  ],
});
```

### Key constraints

- **TTF and WOFF only.** OTF and WOFF2 are not supported. If you have a WOFF2 font, convert it to TTF.
- **No variable fonts.** You need a separate file for each weight/style combination.
- **Italic is a separate registration.** Add `fontStyle: "italic"` to the font entry:

```tsx
Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Inter-Italic.ttf", fontWeight: 400, fontStyle: "italic" },
    { src: "/fonts/Inter-Bold.ttf", fontWeight: 700 },
    { src: "/fonts/Inter-BoldItalic.ttf", fontWeight: 700, fontStyle: "italic" },
  ],
});
```

- **Remote URLs work.** You can point `src` at a URL instead of a local file path. The font will be fetched at render time. For production, use local files – network requests add latency and can fail.

- **Register fonts once.** Put all `Font.register()` calls in a single file (e.g., `src/fonts.ts`) and import it early. Registering the same family twice causes undefined behavior.

### Disabling hyphenation

react-pdf hyphenates words by default. This is often undesirable – it splits words in places that look wrong, especially in headings. Disable it:

```tsx
Font.registerHyphenationCallback((word) => [word]);
```

Put this next to your font registrations.

### Emoji support

If you need emoji, register an emoji font:

```tsx
Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});
```

## Image Handling

Images are straightforward but have a few gotchas.

### Basic usage

```tsx
import { Image } from "@react-pdf/renderer";

// Local file
<Image src="/assets/logo.png" />

// Remote URL
<Image src="https://example.com/photo.jpg" />

// With explicit dimensions
<Image src="/assets/chart.png" style={{ width: 400, height: 200 }} />
```

### Source object with headers

For authenticated image URLs:

```tsx
<Image
  source={{
    uri: "https://api.example.com/image/123",
    method: "GET",
    headers: { Authorization: "Bearer token123" },
    body: "",
  }}
/>
```

### Supported formats

- **PNG** – works, supports transparency
- **JPG/JPEG** – works, no transparency
- **Base64 data URIs** – works: `src="data:image/png;base64,iVBOR..."`

**Not supported:** SVG files as images. If you need to render an SVG, use the `<Svg>` component with SVG primitives directly. You cannot do `<Image src="icon.svg" />`.

### Image sizing

Without explicit dimensions, the image renders at its native pixel size (1 pixel = 1 point). A 1000x500 pixel image will be 1000x500 points – roughly 13.8 x 6.9 inches – which overflows a standard page.

Always set explicit dimensions or use `objectFit`:

```tsx
<Image
  src="/assets/photo.jpg"
  style={{
    width: "100%",
    height: 200,
    objectFit: "cover",
  }}
/>
```

## SVG Support

react-pdf includes a full set of SVG primitive components. This is how you draw shapes, icons, and decorative elements.

```tsx
import { Svg, Path, Circle, Rect, Line, G, Defs, ClipPath } from "@react-pdf/renderer";
```

### Available SVG primitives

- `Svg` – Container (like `<svg>`)
- `G` – Group (like `<g>`)
- `Path` – Arbitrary path (like `<path>`)
- `Rect` – Rectangle
- `Circle` – Circle
- `Ellipse` – Ellipse
- `Line` – Line segment
- `Polyline` – Connected line segments
- `Polygon` – Closed polygon
- `Text` (SVG) – Text within SVG
- `Tspan` – Text span within SVG Text
- `Defs` – Definitions (for reusable elements)
- `ClipPath` – Clipping path
- `LinearGradient` – Linear gradient definition
- `RadialGradient` – Radial gradient definition
- `Stop` – Gradient stop

### Example: a simple icon

```tsx
const CheckIcon = ({ size = 16, color = "#22c55e" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M20 6L9 17l-5-5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);
```

### Example: decorative background shape

```tsx
const AccentBar = ({ width = 400, height = 6, color = "#0066cc" }) => (
  <Svg width={width} height={height}>
    <Rect x={0} y={0} width={width} height={height} fill={color} rx={3} />
  </Svg>
);
```

SVG is your tool for anything visual that isn't text or a raster image. Chapter 6 covers icon and graphic patterns in depth.

## The Render Prop Pattern

Several react-pdf components accept a `render` prop – a function that receives page metadata and returns JSX. This is how you add page numbers, conditional content, and other dynamic elements.

### Page numbers

```tsx
<Text
  render={({ pageNumber, totalPages }) =>
    `Page ${pageNumber} of ${totalPages}`
  }
  style={styles.pageNumber}
  fixed
/>
```

### Conditional rendering based on page

```tsx
<View
  render={({ pageNumber }) =>
    pageNumber > 1 ? <Header /> : null
  }
  fixed
/>
```

The `render` prop is available on `Text`, `View`, and `Page`. The callback receives an object with:

- `pageNumber` – current page number (1-indexed)
- `totalPages` – total number of pages in the document
- `subPageNumber` – page number within the current `<Page>` component (for wrapped pages)
- `subPageTotalPages` – total sub-pages within the current `<Page>` component

**Important:** Components using `render` props are evaluated in a second pass. The first pass determines pagination, the second pass fills in the render prop values. This means `totalPages` is always accurate.

## Fixed Elements

The `fixed` prop makes an element repeat on every page that a `<Page>` component generates. This is how you create persistent headers and footers.

```tsx
<Page size="LETTER" style={styles.page}>
  {/* This header appears on every page */}
  <View fixed style={styles.header}>
    <Text>Company Name</Text>
    <Text
      render={({ pageNumber, totalPages }) =>
        `${pageNumber} / ${totalPages}`
      }
    />
  </View>

  {/* This content flows across pages */}
  <View style={styles.content}>
    {/* ... lots of content ... */}
  </View>

  {/* This footer appears on every page */}
  <View fixed style={styles.footer}>
    <Text>Confidential</Text>
  </View>
</Page>
```

Fixed elements are positioned relative to the page, not the content flow. Use absolute positioning to place them exactly where you want:

```tsx
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 36,
    left: 72,
    right: 72,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
    color: "#999",
  },
});
```

## Page Breaking

When content overflows a single page, react-pdf handles page breaks automatically. You can control this behavior with several props.

### wrap

By default, `Page` components wrap their content to additional pages. Set `wrap={false}` to prevent wrapping (content will be clipped):

```tsx
<Page size="LETTER" wrap={false}>
  {/* Content will NOT overflow to a new page */}
</Page>
```

On `View` and `Text`, `wrap={false}` prevents that specific element from being split across pages. The element will move to the next page if it doesn't fit on the current one:

```tsx
<View wrap={false} style={styles.card}>
  {/* This entire card stays on one page */}
  <Text style={styles.cardTitle}>Q4 Results</Text>
  <Text style={styles.cardBody}>Revenue increased by 23%...</Text>
</View>
```

### break

Force a page break before an element:

```tsx
<View break>
  <Text>This starts on a new page</Text>
</View>
```

### minPresenceAhead

Specify the minimum height (in points) of content that must remain on the current page for this element to stay. If there isn't enough room, the element moves to the next page:

```tsx
<Text style={styles.sectionTitle} minPresenceAhead={100}>
  Section 3: Financial Overview
</Text>
```

This prevents orphaned headings – a section title sitting at the bottom of a page with all its content on the next page. A value of 80-120 works well for most cases.

### Practical page break strategy

For reports and long documents:

1. Wrap each logical section in a `<View wrap={false}>` if it should stay together.
2. Add `minPresenceAhead={100}` to section headings.
3. Use `<View break>` for chapter breaks or major sections.
4. Set `wrap={false}` on table rows that shouldn't split.

## Hello World: Complete Example

Here's a minimal but complete example you can run:

```tsx
// build.tsx
import React from "react";
import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Disable hyphenation
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    padding: 72,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  body: {
    fontSize: 12,
    lineHeight: 1.6,
    color: "#333",
  },
});

const MyDocument = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.title}>Hello, react-pdf</Text>
      <Text style={styles.body}>
        This is a PDF generated from JSX using @react-pdf/renderer.
        The layout uses flexbox, the styling uses JavaScript objects,
        and the whole thing renders server-side in Node.js.
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />, "./output/hello.pdf");
```

Run it with `npx tsx build.tsx` (assuming you have `@react-pdf/renderer` and `tsx` installed). You'll get a PDF in `./output/hello.pdf`.

## Realistic Page Layout

Here's something closer to what you'd actually build – a report cover page with a header, title block, metadata, and footer:

```tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Svg,
  Rect,
} from "@react-pdf/renderer";

const colors = {
  navy: "#1a2b4a",
  gold: "#d4a843",
  white: "#ffffff",
  gray: "#6b7280",
  lightGray: "#f3f4f6",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    fontFamily: "Helvetica",
  },
  topBar: {
    height: 8,
    backgroundColor: colors.navy,
  },
  content: {
    flex: 1,
    padding: 72,
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    color: colors.gold,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    color: colors.navy,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 48,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: colors.gold,
    marginBottom: 24,
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  metaLabel: {
    fontSize: 10,
    color: colors.gray,
    width: 80,
    textTransform: "uppercase",
  },
  metaValue: {
    fontSize: 10,
    color: colors.navy,
  },
  footer: {
    position: "absolute",
    bottom: 36,
    left: 72,
    right: 72,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 8,
    color: colors.gray,
  },
});

const CoverPage = () => (
  <Page size="LETTER" style={styles.page}>
    {/* Top accent bar */}
    <View style={styles.topBar} />

    {/* Main content */}
    <View style={styles.content}>
      <Text style={styles.label}>Annual Report</Text>
      <Text style={styles.title}>Financial Overview</Text>
      <Text style={styles.subtitle}>
        Fiscal Year 2025 – Q1 through Q4
      </Text>

      <View style={styles.divider} />

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Prepared by</Text>
        <Text style={styles.metaValue}>Finance Department</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Date</Text>
        <Text style={styles.metaValue}>January 15, 2026</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Status</Text>
        <Text style={styles.metaValue}>Final</Text>
      </View>
    </View>

    {/* Footer */}
    <View fixed style={styles.footer}>
      <Text style={styles.footerText}>ACME Corporation</Text>
      <Text style={styles.footerText}>Confidential</Text>
    </View>
  </Page>
);

const ReportDocument = () => (
  <Document>
    <CoverPage />
  </Document>
);

export default ReportDocument;
```

This example demonstrates:

- **Color constants** defined outside styles for reuse
- **Absolute positioning** for the footer
- **`fixed` prop** so the footer repeats if the page wraps
- **Typography hierarchy** – label (10pt uppercase), title (36pt bold), subtitle (16pt), body metadata (10pt)
- **Visual elements** – a top accent bar and a gold divider, both created with simple `View` styles
- **Consistent spacing** – margins follow a predictable scale

Notice there's no `<table>` for the metadata rows. It's a flexbox row with a fixed-width label and a value. This pattern – `flexDirection: "row"` with a fixed-width first child – is how you build every table-like layout in react-pdf.

## Summary

The building blocks of react-pdf are small and predictable:

- 6 core components: `Document`, `Page`, `View`, `Text`, `Image`, `Svg`
- Flexbox-only layout (no Grid, no float)
- JavaScript style objects (no CSS files, no className)
- Points as the default unit (72pt = 1 inch)
- TTF/WOFF fonts registered via `Font.register()`
- SVG primitives for shapes and icons
- `fixed` prop for repeating headers/footers
- `render` prop for page numbers and dynamic content
- `wrap`, `break`, and `minPresenceAhead` for page break control

Every PDF you build with this library is some combination of these primitives. The rest of this book is about organizing them so AI agents can work with them effectively.
