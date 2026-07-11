# PDF Quality Checklist

> What separates a professional PDF deliverable from something that looks auto-generated.

This checklist is organized by category. Use it as a final review pass before shipping any PDF.

---

## Typography

### Consistent typography scale

Every piece of text in the document should use a defined level from your typography scale – H1, H2, H3, H4, body, small, tiny. No ad-hoc font sizes.

```tsx
// GOOD – uses defined scale
<Text style={sharedStyles.h2}>Section Title</Text>
<Text style={sharedStyles.body}>Body paragraph text.</Text>

// BAD – arbitrary sizes
<Text style={{ fontSize: 17 }}>Section Title</Text>
<Text style={{ fontSize: 10.5 }}>Body paragraph text.</Text>
```

### Proper heading hierarchy

Headings should follow a logical order: H1 > H2 > H3. Do not skip levels (jumping from H1 to H3). Do not use an H3 as a page title when H1 is available.

### Professional font choices

The default Helvetica is functional but generic. A custom font – Inter, Source Sans, IBM Plex, Lora, or similar – signals intentional design. Register your custom fonts and use them consistently.

### Readable body text size

Body text should be 10-12pt. Below 10pt, extended reading becomes uncomfortable. Above 12pt, the document looks like it's padded.

### Appropriate line height

Body text needs 1.4-1.7 line height. The default of 1.0 creates dense, hard-to-read blocks. 1.5-1.6 is the sweet spot for most body text.

```tsx
body: {
  fontSize: 11,
  lineHeight: 1.5,   // not 1.0, not 2.0
}
```

---

## Spacing and Layout

### Proper margins and whitespace

Do not cram content to the edges. Use at least 36pt (0.5 inches) of page margin; 50-70pt reads as premium – this kit uses 54-60pt. Generous margins look more professional than tight margins.

```tsx
page: {
  paddingTop: 60,
  paddingBottom: 60,     // room for footer
  paddingHorizontal: 54,
}
```

### Consistent spacing between elements

Use your spacing scale. The gap between a heading and its body text should be the same on every page. The gap between sections should be the same everywhere.

### No content touching edges

Every element should have breathing room. Cards need internal padding. Tables need cell padding. If text touches a border or the edge of a container, add padding.

### The "squint test"

Step back from your screen (or squint) and look at the page. You should see clear blocks of content with comfortable whitespace between them. The page should feel balanced – not top-heavy, not bottom-heavy, not lopsided.

If the page looks like a wall of text with no visual breaks, you need more whitespace, more headings, or content elements like callout boxes and dividers.

---

## Color

### Limited palette

Limit your document to 3-5 core color roles. Use tonal shades within those roles, plus semantic colors where status needs distinct meaning.

```tsx
// Three-color palette is sufficient for most documents
colors: {
  primary: '#1a1a2e',     // headings, emphasis
  accent: '#3498db',      // highlights, links
  text: '#333333',        // body text
}
```

### Sufficient color contrast

Text must be readable against its background. Dark text on light backgrounds. Light text on dark backgrounds. Avoid light gray text on white backgrounds – a common mistake.

```tsx
// GOOD – strong contrast
{ color: '#333333', backgroundColor: '#ffffff' }
{ color: '#ffffff', backgroundColor: '#1a1a2e' }

// BAD – insufficient contrast
{ color: '#aaaaaa', backgroundColor: '#ffffff' }
{ color: '#cccccc', backgroundColor: '#f0f0f0' }
```

### Consistent color usage

If section headings are `#1a1a2e` on page 3, they should be `#1a1a2e` on page 30. Use design tokens – never hard-code colors in individual page components.

---

## Page Structure

### Headers on every page

Content pages should have a running header that orients the reader – chapter name, section name, or document title. The cover page and back cover may omit headers.

```tsx
<View style={styles.header} fixed>
  <Text style={styles.headerText}>Chapter 3: Architecture</Text>
  <Text style={styles.headerText}>React-PDF Best Practices</Text>
</View>
```

### Page numbers

Every page after the cover should show its page number. Common placements: bottom center, bottom right, or bottom in a "page X of Y" format.

```tsx
<Text
  style={styles.pageNumber}
  render={({ pageNumber, totalPages }) =>
    `${pageNumber} / ${totalPages}`
  }
  fixed
/>
```

### Table of contents with accurate page references

If your document has more than 10 pages, include a table of contents. Page numbers in the TOC must match the actual pages where sections begin.

For react-pdf, you typically build the TOC as a static component with manually-set page numbers, updated after the final page count is known:

```tsx
const tocEntries = [
  { title: 'Introduction', page: 3 },
  { title: 'Chapter 1: Getting Started', page: 5 },
  { title: 'Chapter 2: Advanced Patterns', page: 12 },
  { title: 'Chapter 3: Production Deployment', page: 22 },
  { title: 'Appendix', page: 35 },
];

const TOC = () => (
  <Page size="LETTER" style={sharedStyles.page}>
    <Text style={sharedStyles.h1}>Table of Contents</Text>
    {tocEntries.map((entry, i) => (
      <View key={i} style={styles.tocRow}>
        <Text style={styles.tocTitle}>{entry.title}</Text>
        <Text style={styles.tocDots}>
          {'.' .repeat(60)}
        </Text>
        <Text style={styles.tocPage}>{entry.page}</Text>
      </View>
    ))}
  </Page>
);
```

```tsx
const styles = StyleSheet.create({
  tocRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  tocTitle: {
    fontSize: 11,
    color: tokens.colors.text,
  },
  tocDots: {
    flex: 1,
    fontSize: 11,
    color: tokens.colors.border,
    marginHorizontal: 4,
    overflow: 'hidden',
    maxLines: 1,
  },
  tocPage: {
    fontSize: 11,
    color: tokens.colors.text,
    fontWeight: 'bold',
    width: 24,
    textAlign: 'right',
  },
});
```

---

## Content Quality

### No orphaned lines at page breaks

An orphan is a single line of a paragraph left alone at the bottom of a page. A widow is a single line at the top of a new page. Both look sloppy.

```tsx
<Text orphans={2} widows={2}>
  Long paragraph that might break across pages...
</Text>
```

### Heading never appears alone at page bottom

If a section heading appears at the bottom of a wrapping page with no body text after it, the heading should move to the next page. On a fixed page, rebalance or split the authored source instead.

```tsx
<Text style={sharedStyles.h2} minPresenceAhead={60}>
  Section Title That Stays With Its Content
</Text>
```

### Code blocks with visual distinction

Code should be visually distinct from body text – different font (monospace), different background, and clear borders.

```tsx
const styles = StyleSheet.create({
  codeBlock: {
    fontFamily: 'JetBrainsMono',
    fontSize: 9,
    backgroundColor: '#1e1e2e',
    color: '#cdd6f4',
    padding: 14,
    borderRadius: 4,
    marginVertical: 12,
    lineHeight: 1.5,
  },
});

<View style={styles.codeBlock}>
  <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 9, color: '#cdd6f4' }}>
    {'const greeting = "Hello, world";'}
  </Text>
  <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 9, color: '#cdd6f4' }}>
    {'console.log(greeting);'}
  </Text>
</View>
```

### Callout boxes for tips, warnings, notes

Break up long text with callout boxes. They draw the eye, provide visual variety, and highlight important information.

### Images at appropriate resolution

Images should be clear and not pixelated. For print: 300 DPI. For screen: 150 DPI minimum. An image displayed at 200pt width needs to be at least 300px wide (for screen) or 600px wide (for print quality).

---

## Alignment

### Consistent alignment throughout

Pick an alignment strategy and stick with it. Most documents are left-aligned. Headings may be centered. But if body text is left-aligned on page 5, it should not be justified on page 8.

### Elements align to an invisible grid

Headings, body text, cards, and images should all align to the same left margin. When elements have different left edges on the same page, the page looks disorganized.

```tsx
// GOOD – all content shares the same left edge (page padding)
page: { paddingHorizontal: 54 }  // everything starts at 54pt from left

// BAD – some elements have extra left margin, creating misalignment
heading: { marginLeft: 0 }
body: { marginLeft: 10 }     // why is this shifted?
card: { marginLeft: 5 }      // and this different again?
```

---

## Brand and Identity

### Brand elements present

Include your logo (or the client's logo) on the cover page and optionally in headers or footers. This marks the document as an intentional publication, not a generic export.

### Metadata filled in

Set the Document metadata. PDF viewers display this information in the file properties.

```tsx
<Document
  title="React-PDF Best Practices Guide"
  author="Your Name"
  subject="A comprehensive guide to building professional PDFs"
  keywords="react-pdf, pdf generation, react, typescript"
  creator="Your Company"
>
```

---

## Final Review Checklist

Use this as a pass/fail checklist before shipping:

```
Typography
  [ ] All text uses the defined typography scale
  [ ] Heading hierarchy is H1 > H2 > H3 (no skipped levels)
  [ ] Custom fonts are registered and rendering correctly
  [ ] Body text is 10-12pt with 1.4-1.7 line height
  [ ] No text is smaller than 7pt

Spacing
  [ ] Page margins are at least 36pt on all sides (50-70pt reads as premium)
  [ ] Consistent spacing between sections
  [ ] Cards and containers have internal padding
  [ ] Passes the squint test (balanced blocks with breathing room)

Color
  [ ] 3-5 color palette maximum
  [ ] Sufficient contrast on all text
  [ ] Colors are consistent throughout (using tokens)

Page Structure
  [ ] Headers on every content page
  [ ] Page numbers on every page after cover
  [ ] Table of contents (if 10+ pages) with correct page numbers
  [ ] Cover page with title, author, and date/version

Content
  [ ] No orphaned or widowed lines
  [ ] Headings are never alone at page bottom
  [ ] Code blocks are visually distinct
  [ ] Images are sharp (not pixelated)
  [ ] No content clipped or overflowing

Alignment
  [ ] All elements align to a consistent grid
  [ ] No accidental horizontal shifts between elements

Brand
  [ ] Logo present (cover and/or header)
  [ ] PDF metadata filled in (title, author, subject)
  [ ] Consistent visual identity throughout
```

---

## The One-Sentence Test

Look at any single page of your document in isolation. Ask: "Does this look like it belongs to the same document as every other page?" If the answer is no, something in your design system is inconsistent. Fix the tokens, not the individual page.
