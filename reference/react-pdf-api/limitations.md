# React-PDF Limitations and Workarounds

> This file documents what react-pdf cannot do and how to work around each limitation.

React-pdf is a layout engine that targets PDF output – not a browser rendering engine. It implements a subset of CSS. Knowing what is missing – and how to compensate – saves you hours of trial and error.

---

## Layout Limitations

### No CSS Grid

React-pdf does not support `display: grid`, `grid-template-columns`, or any Grid properties.

**Workaround:** Use flexbox rows and columns. For a grid of cards, nest a row container with flex children.

```tsx
const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '48%',   // ~2 columns with gap
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
});

<View style={styles.grid}>
  {items.map((item, i) => (
    <View key={i} style={styles.gridItem}>
      <Text>{item.title}</Text>
    </View>
  ))}
</View>
```

For exact column counts, calculate widths based on available space:

```tsx
// 3-column grid on a LETTER page with 40pt padding on each side
// Available width: 612 - 80 = 532pt
// With 12pt gaps between 3 columns: (532 - 24) / 3 = ~169pt per column
const COL_WIDTH = 169;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  cell: {
    width: COL_WIDTH,
  },
});
```

### No HTML Tables

There is no `<table>`, `<tr>`, `<td>`. You cannot use `display: table`.

**Workaround:** Build tables with `View` components and flexbox.

```tsx
const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 8,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableCell: {
    flex: 1,
    padding: 8,
  },
  tableCellText: {
    fontSize: 10,
    color: '#333333',
  },
  altRow: {
    backgroundColor: '#f8f9fa',
  },
});

interface TableRow {
  name: string;
  role: string;
  status: string;
}

const Table = ({ data }: { data: TableRow[] }) => (
  <View style={styles.table}>
    <View style={styles.tableHeaderRow}>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Name</Text>
      </View>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Role</Text>
      </View>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Status</Text>
      </View>
    </View>
    {data.map((row, i) => (
      <View
        key={i}
        style={[styles.tableRow, i % 2 === 1 ? styles.altRow : {}]}
      >
        <View style={styles.tableCell}>
          <Text style={styles.tableCellText}>{row.name}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.tableCellText}>{row.role}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.tableCellText}>{row.status}</Text>
        </View>
      </View>
    ))}
  </View>
);
```

For columns with specific widths instead of equal flex:

```tsx
const styles = StyleSheet.create({
  nameCol: { width: '40%', padding: 8 },
  roleCol: { width: '35%', padding: 8 },
  statusCol: { width: '25%', padding: 8 },
});
```

### No Float Layout

`float: left` and `float: right` do not exist.

**Workaround:** Use `flexDirection: 'row'` with `justifyContent: 'space-between'` or manual flex sizing.

```tsx
// Image floated to the right of text
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  textCol: {
    flex: 1,
  },
  imageCol: {
    width: 120,
  },
});

<View style={styles.row}>
  <View style={styles.textCol}>
    <Text>Your paragraph text goes here and fills the remaining space.</Text>
  </View>
  <View style={styles.imageCol}>
    <Image src="photo.jpg" />
  </View>
</View>
```

### No `display: inline`, `block`, or `table`

Every element in react-pdf is a flex container by default. You cannot change this.

**Workaround for inline elements:** Use nested `<Text>` components.

```tsx
<Text>
  This is regular text with <Text style={{ fontWeight: 'bold' }}>bold</Text> and{' '}
  <Text style={{ color: '#e74c3c' }}>colored</Text> words inline.
</Text>
```

Only `<Text>` components support true inline behavior when nested inside another `<Text>`.

---

## Visual Effect Limitations

### No box-shadow

`box-shadow` is not a supported style property.

**Workaround options:**

1. **Use borders** to create a visible edge:

```tsx
{
  borderWidth: 1,
  borderColor: '#e0e0e0',
  borderRadius: 4,
}
```

2. **Use a layered View** to fake a shadow with an offset rectangle:

```tsx
const styles = StyleSheet.create({
  shadowContainer: {
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: -2,
    bottom: -2,
    backgroundColor: '#d0d0d0',
    borderRadius: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

<View style={styles.shadowContainer}>
  <View style={styles.shadow} />
  <View style={styles.card}>
    <Text>Card with faux shadow</Text>
  </View>
</View>
```

3. **Use SVG** for more realistic shadow effects (more complex but more flexible).

### No text-shadow

**Workaround:** Layer two `<Text>` elements – one offset and transparent as the "shadow," one on top as the real text. This is fragile and rarely worth the effort. In most cases, skip the shadow.

### No CSS Animations

PDFs are static documents. There is nothing to animate. No workaround needed – this is by design.

### No CSS Variables (`var()`)

**Workaround:** Use JavaScript constants. This is actually better for react-pdf because your design tokens are typed and statically analyzable.

```tsx
// Instead of CSS variables, use a design tokens object
const tokens = {
  colors: {
    primary: '#1a1a2e',
    accent: '#3498db',
    text: '#333333',
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
};

const styles = StyleSheet.create({
  heading: {
    color: tokens.colors.primary,
    marginBottom: tokens.spacing.md,
  },
});
```

### No `calc()`

**Workaround:** Compute values in JavaScript before passing them to styles.

```tsx
const PAGE_WIDTH = 612; // LETTER
const PAGE_PADDING = 40;
const AVAILABLE_WIDTH = PAGE_WIDTH - PAGE_PADDING * 2;
const COL_GAP = 16;
const COL_WIDTH = (AVAILABLE_WIDTH - COL_GAP) / 2;

const styles = StyleSheet.create({
  col: {
    width: COL_WIDTH,
  },
});
```

### No Media Queries

**Workaround:** Use JavaScript logic based on the page size you're targeting. Since you control the page size at render time, you know exactly what dimensions you're working with.

```tsx
const isLandscape = orientation === 'landscape';
const styles = StyleSheet.create({
  page: {
    padding: isLandscape ? 30 : 40,
  },
  columns: {
    flexDirection: 'row',
    gap: isLandscape ? 24 : 16,
  },
});
```

### No Pseudo-selectors

No `:hover`, `:first-child`, `::before`, `::after`, or any other pseudo-selectors.

**Workaround:** Handle all conditional styling in JavaScript.

```tsx
{data.map((item, i) => (
  <View
    key={i}
    style={[
      styles.row,
      i === 0 ? styles.firstRow : {},
      i === data.length - 1 ? styles.lastRow : {},
      i % 2 === 1 ? styles.altRow : {},
    ]}
  >
    <Text>{item.label}</Text>
  </View>
))}
```

---

## Image Limitations

### Only PNG and JPG

React-pdf supports PNG and JPG images. SVG is supported via the `<Svg>` component family, not as an image source. GIF, WebP, AVIF, and TIFF are not supported.

**Workaround:** Convert images to PNG or JPG before using them. For vector graphics, use the react-pdf SVG components directly (`<Svg>`, `<Path>`, `<Circle>`, etc.).

### No `background-image`

You cannot set a background image via CSS.

**Workaround:** Use absolute positioning to layer an `<Image>` behind content.

```tsx
const styles = StyleSheet.create({
  page: {
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  content: {
    padding: 40,
    zIndex: 1,
  },
});

<Page style={styles.page}>
  <Image src="background-pattern.png" style={styles.backgroundImage} />
  <View style={styles.content}>
    <Text>Content on top of background</Text>
  </View>
</Page>
```

---

## Font Limitations

### Only TTF and WOFF

OTF and WOFF2 are not supported. Variable fonts are not supported.

**Workaround:** Convert OTF to TTF using [Transfonter](https://transfonter.org/) or FontForge. For variable fonts, export individual static weight files.

### Emoji Requires CDN Connection

Emoji rendering requires `Font.registerEmojiSource()` and a live internet connection to a CDN at render time.

**Workaround:** Use SVG icons instead of emojis. See `reference/design/icons-vs-emojis.md`.

---

## Page Break Limitations

Page breaks can be difficult to control precisely. Content can break in awkward places – a heading at the bottom of a page with its body on the next, or a single line orphaned.

### Controlling Page Breaks

**Force a break before an element:**

```tsx
<View break>
  <Text>This starts on a new page</Text>
</View>
```

**Prevent an element from being split across pages:**

```tsx
<View wrap={false}>
  <Text style={styles.heading}>Section Title</Text>
  <Text style={styles.body}>
    This entire block stays on one page. If it doesn't fit,
    the whole thing moves to the next page.
  </Text>
</View>
```

**Keep content together with `minPresenceAhead`:**

```tsx
<Text
  style={styles.heading}
  minPresenceAhead={50}  // require at least 50pt of space after this element on the same page
>
  Section Title
</Text>
<Text style={styles.body}>
  Body text that should appear on the same page as the heading.
</Text>
```

**Orphan and widow control on `<Text>`:**

```tsx
<Text
  orphans={2}   // minimum 2 lines at bottom of page before break
  widows={2}    // minimum 2 lines at top of next page after break
>
  Long paragraph text that might span a page break...
</Text>
```

**Disable page wrapping on a container:**

```tsx
<View wrap={false}>
  {/* All content here stays on one page */}
</View>
```

### Practical Page Break Strategy

```tsx
// A section component that keeps its heading with at least
// some of its content
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View>
    <Text style={styles.sectionTitle} minPresenceAhead={80}>
      {title}
    </Text>
    {children}
  </View>
);

// A card that should never be split
const Card = ({ children }: { children: React.ReactNode }) => (
  <View wrap={false} style={styles.card}>
    {children}
  </View>
);

// Force a new page before a chapter
const ChapterStart = ({ title }: { title: string }) => (
  <View break>
    <Text style={styles.chapterTitle}>{title}</Text>
  </View>
);
```

---

## Performance Limitations

### Large Documents Can Be Slow

Documents with many pages (50+), large images, or complex layouts can take significant time to render.

**Mitigations:**

1. **Optimize images.** Compress PNGs and JPGs before embedding. Use appropriate resolution – 150 DPI is sufficient for screen viewing, 300 DPI for print.

2. **Reduce image count.** Each image adds to render time and file size.

3. **Simplify layouts.** Deeply nested View trees make the layout engine work harder. Flatten where you can.

4. **Render server-side.** Use `renderToFile()` or `renderToStream()` in Node.js rather than rendering in the browser, especially for large documents.

```tsx
import { renderToFile } from '@react-pdf/renderer';

await renderToFile(<MyDocument />, '/output/document.pdf');
```

5. **Split into multiple documents.** If your content exceeds 100 pages, consider generating separate PDFs per chapter or section.

---

## Text Wrapping Limitations

React-pdf's text wrapping is functional but less sophisticated than browser text layout.

- Long words without spaces may overflow their container rather than breaking
- Hyphenation is basic unless you provide a custom callback
- Text inside fixed-width containers may not break as expected

**Workaround:** Use `Font.registerHyphenationCallback()` for better word breaking, and test with your actual content – not just placeholder text.

```tsx
// Allow breaking on any character (aggressive but prevents overflow)
Font.registerHyphenationCallback((word) => {
  if (word.length > 20) {
    return word.split('');
  }
  return [word];
});
```

---

## Summary Table

| Limitation | Workaround |
|-----------|------------|
| No CSS Grid | Flexbox with `flexDirection: 'row'`, `flexWrap: 'wrap'` |
| No HTML tables | Build with `<View>` rows and flex cells |
| No float | Flexbox row with sized children |
| No display: inline/block | Nested `<Text>` for inline; everything else is flex |
| No box-shadow | Borders, offset rectangles, or SVG |
| No text-shadow | Layered offset text (fragile, not recommended) |
| No CSS animations | N/A – PDFs are static |
| No CSS variables | JS constants / design token objects |
| No calc() | Pre-compute in JavaScript |
| No media queries | JS conditionals based on page size |
| No pseudo-selectors | JS conditionals (index, array position) |
| Only PNG/JPG images | Convert other formats; use SVG components for vectors |
| No background-image | Absolute-positioned `<Image>` behind content |
| Only TTF/WOFF fonts | Convert OTF to TTF; export static weights from variable fonts |
| No variable fonts | Use individual static weight files |
| Emoji needs CDN | Host emoji images locally or use SVG icons |
| Awkward page breaks | Use `break`, `wrap={false}`, `minPresenceAhead`, `orphans`, `widows` |
| Slow large documents | Optimize images, flatten layouts, render server-side |
| Limited text wrapping | Custom `registerHyphenationCallback()` |
