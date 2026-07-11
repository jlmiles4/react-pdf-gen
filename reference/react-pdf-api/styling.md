# React-PDF Styling Reference

> Source: `@react-pdf/renderer` – https://react-pdf.org/styling

## Fundamentals

React-pdf uses JavaScript objects for styling – not CSS strings, not class names, not inline CSS strings. You pass a plain object to the `style` prop on any react-pdf component.

```tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';

// Inline style object
<View style={{ backgroundColor: '#f0f0f0', padding: 20 }}>
  <Text style={{ fontSize: 14, color: '#333' }}>Hello</Text>
</View>
```

### StyleSheet.create()

Use `StyleSheet.create()` to define named style groups. This is the recommended approach – it provides better performance and keeps your styles organized.

```tsx
import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a2e',
  },
  body: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#333333',
  },
});

// Usage
<View style={styles.page}>
  <Text style={styles.heading}>Title</Text>
  <Text style={styles.body}>Body content here.</Text>
</View>
```

### Combining Styles

Pass an array to `style` to merge multiple style objects. Later items in the array override earlier ones.

```tsx
<Text style={[styles.body, styles.bold, { color: '#0000ff' }]}>
  Bold blue text
</Text>
```

---

## Layout: Flexbox Only

React-pdf uses **flexbox as its only layout system**. There is no CSS Grid, no floats, no `display: inline`, no `display: table`. Everything is flexbox.

The default flex direction is `column` (not `row` like the web). This means children stack vertically by default.

### Core Flex Properties

```tsx
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',        // 'row' | 'column' | 'row-reverse' | 'column-reverse'
    justifyContent: 'flex-start', // 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
    alignItems: 'stretch',       // 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
    alignContent: 'flex-start',  // same values as justifyContent
    flexWrap: 'nowrap',          // 'nowrap' | 'wrap' | 'wrap-reverse'
    gap: 8,                      // gap between flex children
    rowGap: 8,                   // gap between rows
    columnGap: 8,                // gap between columns
  },
  child: {
    flex: 1,                     // shorthand grow value
    flexGrow: 1,                 // how much this item grows
    flexShrink: 0,               // how much this item shrinks
    flexBasis: 'auto',           // base size before growing/shrinking
    alignSelf: 'center',         // override parent's alignItems for this child
    order: 0,                    // ordering within flex container
  },
});
```

### Common Layout Patterns

**Two-column layout:**

```tsx
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  colLeft: {
    flex: 1,
  },
  colRight: {
    flex: 2,
  },
});

<View style={styles.row}>
  <View style={styles.colLeft}>
    <Text>Sidebar content</Text>
  </View>
  <View style={styles.colRight}>
    <Text>Main content</Text>
  </View>
</View>
```

**Three equal columns:**

```tsx
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  col: {
    flex: 1,
  },
});

<View style={styles.row}>
  <View style={styles.col}><Text>Column 1</Text></View>
  <View style={styles.col}><Text>Column 2</Text></View>
  <View style={styles.col}><Text>Column 3</Text></View>
</View>
```

**Centered content (both axes):**

```tsx
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

**Footer pinned to bottom:**

```tsx
const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    paddingTop: 8,
  },
});

<Page style={styles.page}>
  <View style={styles.content}>
    <Text>Main content grows to fill space</Text>
  </View>
  <View style={styles.footer}>
    <Text>Pinned to the bottom</Text>
  </View>
</Page>
```

---

## Dimensions

```tsx
{
  width: 200,           // fixed width in points
  height: 100,          // fixed height in points
  minWidth: 50,         // minimum width
  maxWidth: 400,        // maximum width
  minHeight: 20,        // minimum height
  maxHeight: 300,       // maximum height
}
```

---

## Units

React-pdf supports several unit types when expressed as strings:

| Unit | Example | Notes |
|------|---------|-------|
| Points (default) | `20` or `'20pt'` | 1 point = 1/72 inch. Numbers without a unit are points. |
| Inches | `'1in'` | 1 inch = 72 points |
| Millimeters | `'10mm'` | |
| Centimeters | `'2cm'` | |
| Percentages | `'50%'` | Relative to parent container |

```tsx
const styles = StyleSheet.create({
  box: {
    width: '50%',        // half the parent width
    height: '1in',       // one inch
    padding: '5mm',      // five millimeters
    marginTop: '1cm',    // one centimeter
    fontSize: 12,        // 12 points
  },
});
```

---

## Spacing: Margin and Padding

```tsx
{
  // Individual sides
  marginTop: 10,
  marginRight: 15,
  marginBottom: 10,
  marginLeft: 15,
  paddingTop: 8,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12,

  // Shorthand – vertical and horizontal
  marginVertical: 10,      // top + bottom
  marginHorizontal: 15,    // left + right
  paddingVertical: 8,
  paddingHorizontal: 12,

  // Uniform shorthand
  margin: 10,              // all four sides
  padding: 8,              // all four sides
}
```

**Note:** React-pdf does not support the CSS multi-value shorthand like `margin: '10 15 10 15'`. You must use individual side properties or the Vertical/Horizontal shorthands.

---

## Borders

```tsx
{
  // Individual sides
  borderTopWidth: 1,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  borderTopColor: '#cccccc',
  borderRightColor: '#cccccc',
  borderBottomColor: '#cccccc',
  borderLeftColor: '#cccccc',
  borderTopStyle: 'solid',       // 'solid' | 'dashed' | 'dotted'
  borderRightStyle: 'solid',
  borderBottomStyle: 'solid',
  borderLeftStyle: 'solid',

  // Shorthand – all sides
  borderWidth: 1,
  borderColor: '#cccccc',
  borderStyle: 'solid',

  // Border radius
  borderRadius: 4,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
  borderBottomLeftRadius: 4,
}
```

---

## Colors and Backgrounds

### Supported Color Formats

```tsx
{
  color: '#3498db',            // hex (6-digit)
  color: '#fff',               // hex (3-digit shorthand)
  color: 'rgb(52, 152, 219)',  // rgb()
  color: 'rgba(52, 152, 219, 0.8)',  // rgba() with alpha
  color: 'hsl(204, 70%, 53%)', // hsl()
  color: 'blue',               // named CSS color
}
```

### Background

```tsx
{
  backgroundColor: '#f5f5f5',
}
```

**Note:** React-pdf does not support `background-image`, gradients via CSS, or `background-size`. If you need gradient backgrounds, use SVG components layered inside a View.

---

## Typography

```tsx
{
  fontSize: 12,                // size in points
  fontFamily: 'Helvetica',     // registered font family name
  fontWeight: 'bold',          // 'thin' | 'ultralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'ultrabold' | 'heavy' | number (100-900)
  fontStyle: 'normal',         // 'normal' | 'italic' | 'oblique'
  textAlign: 'left',           // 'left' | 'center' | 'right' | 'justify'
  textDecoration: 'none',      // 'none' | 'underline' | 'line-through' | 'underline line-through'
  textDecorationColor: '#000',
  textDecorationStyle: 'solid', // 'solid' | 'dashed' | 'dotted'
  textTransform: 'none',       // 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  lineHeight: 1.5,             // multiplier of fontSize
  letterSpacing: 0.5,          // additional space between characters in points
  textIndent: 20,              // indentation of first line
  textOverflow: 'ellipsis',    // 'ellipsis' – truncate with ...
  maxLines: 3,                 // limit visible lines (pair with textOverflow)
}
```

### Inline Text Styling

Nest `<Text>` components for inline formatting:

```tsx
<Text style={{ fontSize: 11 }}>
  This is normal text with{' '}
  <Text style={{ fontWeight: 'bold' }}>bold words</Text> and{' '}
  <Text style={{ fontStyle: 'italic', color: '#e74c3c' }}>
    red italic words
  </Text>{' '}
  in the same paragraph.
</Text>
```

---

## Position

```tsx
{
  position: 'relative',   // default – flows in the layout
  position: 'absolute',   // removed from flow, positioned relative to parent

  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
  zIndex: 10,
}
```

**Common use for absolute positioning:** watermarks, decorative elements, page numbers in corners.

```tsx
const styles = StyleSheet.create({
  page: {
    padding: 40,
    position: 'relative',
  },
  watermark: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    fontSize: 60,
    color: 'rgba(200, 200, 200, 0.3)',
    transform: 'rotate(-45deg)',
  },
});

<Page style={styles.page}>
  <Text style={styles.watermark}>DRAFT</Text>
  <Text>Regular page content here</Text>
</Page>
```

---

## Overflow and Opacity

```tsx
{
  overflow: 'hidden',   // 'visible' | 'hidden'
  opacity: 0.8,         // 0 to 1
}
```

---

## Transform

```tsx
{
  transform: 'rotate(-45deg)',
  transformOrigin: '50% 50%',     // origin point as percentages or values
}
```

Supported transform functions: `rotate()`, `scale()`, `scaleX()`, `scaleY()`, `translate()`, `translateX()`, `translateY()`, `skew()`, `skewX()`, `skewY()`, `matrix()`.

---

## Object Fit (Images)

```tsx
<Image
  src="photo.jpg"
  style={{
    width: 200,
    height: 150,
    objectFit: 'cover',       // 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
    objectPositionX: '50%',
    objectPositionY: '50%',
  }}
/>
```

---

## Media Queries

React-pdf v4 supports media queries inside style objects. Queries can target minimum or maximum page width and height, plus orientation:

```tsx
const styles = StyleSheet.create({
  section: {
    width: 200,
    '@media max-width: 400': { width: '100%' },
    '@media orientation: landscape': { width: 400 },
  },
});
```

Use JavaScript conditionals when the document's content must change; use media queries when only styles change with page geometry.

---

## Debug Mode

Set `debug={true}` on any component (or add `debug: true` to a style) to render colored borders showing the element's layout box. This is invaluable for diagnosing flexbox issues.

```tsx
<View debug={true} style={styles.row}>
  <View debug={true} style={styles.col}><Text>Col 1</Text></View>
  <View debug={true} style={styles.col}><Text>Col 2</Text></View>
</View>
```

Every element with debug enabled renders with a semi-transparent colored background and border so you can see exactly where it sits in the layout.

---

## What Is NOT Supported

| Feature | Status | Workaround |
|---------|--------|------------|
| CSS Grid | Not supported | Use flexbox rows and columns |
| `float` | Not supported | Use flexbox |
| `display: inline / block / table` | Not supported | Everything is flex by default |
| `box-shadow` | Not supported | Use borders or SVG |
| `text-shadow` | Not supported | Duplicate text with offset and lower opacity |
| CSS animations | Not supported | N/A – PDFs are static |
| CSS variables (`var()`) | Not supported | Use JS constants |
| `calc()` | Not supported | Compute values in JS |
| Pseudo-selectors (`:hover`, `::before`) | Not supported | N/A |
| `background-image` | Not supported | Use `<Image>` or SVG behind content |
| Multi-value shorthand (`margin: '10 20'`) | Not supported | Use `marginVertical` / `marginHorizontal` |

---

## Full Example: Styled Page

```tsx
import { Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#1a1a2e',
    paddingBottom: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  badge: {
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    fontSize: 9,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 3,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  col: {
    flex: 1,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1a1a2e',
  },
  cardBody: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#555555',
  },
});

const StyledPage = () => (
  <Page size="LETTER" style={styles.page}>
    <View style={styles.header}>
      <Text style={styles.title}>Chapter 4</Text>
      <Text style={styles.badge}>Draft</Text>
    </View>
    <View style={styles.twoCol}>
      <View style={[styles.col, styles.card]}>
        <Text style={styles.cardTitle}>Key Takeaway</Text>
        <Text style={styles.cardBody}>
          React-pdf gives you flexbox and nothing else for layout.
          Once you accept that, you stop fighting the system and
          start building faster.
        </Text>
      </View>
      <View style={[styles.col, styles.card]}>
        <Text style={styles.cardTitle}>Pro Tip</Text>
        <Text style={styles.cardBody}>
          Use StyleSheet.create() for all styles. Keep them at the
          bottom of the file or in a shared styles module.
        </Text>
      </View>
    </View>
  </Page>
);
```
