# React-PDF Components Reference

> Source: `@react-pdf/renderer` - https://react-pdf.org/components

## Core Components

### Document
The root element. Every PDF must be wrapped in `<Document>`.

```jsx
<Document
  title="string"           // PDF metadata title
  author="string"          // PDF metadata author
  subject="string"         // PDF metadata subject
  keywords="string"        // PDF metadata keywords
  creator="string"         // PDF metadata creator (default: "react-pdf")
  producer="string"        // PDF metadata producer (default: "react-pdf")
  onRender={fn}           // Callback after render completes
>
```

**Rules:**
- Only `<Page>` elements can be direct children
- No non-react-pdf components allowed inside

---

### Page
Represents a single page in the PDF.

```jsx
<Page
  size="A4"               // Page size: "A4", "LETTER", "LEGAL", [width, height], etc.
  orientation="portrait"  // "portrait" | "landscape"
  wrap={true}             // Enable page wrapping (content overflow to next page)
  style={object}          // Style object
  dpi={72}                // Dots per inch
  debug={false}           // Show layout debug borders
>
```

**Common sizes:** A0-A10, B0-B10, C0-C10, LETTER, LEGAL, TABLOID, EXECUTIVE, FOLIO
**Custom size:** `size={[width, height]}` in points (1 inch = 72 points)

---

### View
The general-purpose container (equivalent to `<div>`).

```jsx
<View
  style={object}
  wrap={true}             // Allow content to wrap across pages
  break={false}           // Force page break before this element
  fixed={false}           // Repeat on every page (headers/footers)
  debug={false}
  render={fn}             // Dynamic render function: ({pageNumber, totalPages}) => content
>
```

**Key behaviors:**
- Primary layout building block
- Supports flexbox layout
- `fixed={true}` makes it repeat on every page (use for headers/footers)
- `render` prop gives access to page numbers for dynamic content

---

### Text
Renders text content. **All text must be inside a `<Text>` component.**

```jsx
<Text
  style={object}
  wrap={true}
  break={false}
  fixed={false}
  debug={false}
  hyphenationCallback={fn}
  orphans={2}             // Minimum lines at bottom of page
  widows={2}              // Minimum lines at top of next page
  render={fn}             // Dynamic: ({pageNumber, totalPages, subPageNumber, subPageTotalPages}) => string
>
```

**Key behaviors:**
- Supports nested `<Text>` for inline styling (bold words within a sentence)
- `render` prop is useful for page numbers: `render={({pageNumber}) => pageNumber}`
- Text outside `<Text>` will cause errors

---

### Image
Renders images (PNG, JPG) and base64 data URIs.

```jsx
<Image
  src="url|path|base64"   // Image source
  source={object}         // Alternative: {uri, method, headers, body}
  style={object}
  fixed={false}
  debug={false}
  cache={true}            // Cache fetched images
/>
```

**Supported formats:** PNG, JPG
**Source options:**
- URL string: `src="https://example.com/image.png"`
- Local path (Node): `src="/absolute/path/to/image.png"`
- Base64: `src="data:image/png;base64,..."`
- Object with headers: `source={{uri: "url", headers: {Authorization: "Bearer token"}}}`

---

### Link
Renders a clickable hyperlink.

```jsx
<Link
  src="url"               // Target URL
  style={object}
  wrap={true}
  debug={false}
>
```

---

### Note
Adds an annotation/note to the PDF.

```jsx
<Note style={object}>
  Annotation text here
</Note>
```

---

### Canvas
Low-level drawing API using a painter object.

```jsx
<Canvas
  style={object}
  paint={(painter, availableWidth, availableHeight) => {
    // painter has methods: moveTo, lineTo, stroke, fill, etc.
    return null;
  }}
/>
```

---

### SVG Components
React-pdf includes SVG support with these components:

```jsx
import { Svg, Line, Polyline, Polygon, Path, Rect, Circle, Ellipse,
         Text as SvgText, Tspan, G, Stop, Defs, ClipPath,
         LinearGradient, RadialGradient } from '@react-pdf/renderer';
```

**SVG example:**
```jsx
<Svg width={100} height={100} viewBox="0 0 100 100">
  <Circle cx={50} cy={50} r={40} fill="#3498db" />
  <Rect x={10} y={10} width={30} height={30} fill="#e74c3c" />
  <Path d="M 10 80 C 40 10, 65 10, 95 80" stroke="#2ecc71" fill="none" />
</Svg>
```

---

## Component Hierarchy Rules

```
Document
  └── Page (one or more)
        ├── View (containers)
        │     ├── Text (all text content)
        │     ├── Image
        │     ├── Link
        │     ├── Canvas
        │     └── Svg (with SVG sub-components)
        └── View (with fixed={true} for headers/footers)
```

**Critical rules:**
1. Only react-pdf components work inside `<Document>` — no HTML elements
2. All visible text must be wrapped in `<Text>`
3. `<Page>` must be a direct child of `<Document>`
4. Styles use JavaScript objects, not CSS strings
