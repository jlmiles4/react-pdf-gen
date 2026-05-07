# React-PDF Page Sizes Reference

> Source: `@react-pdf/renderer` – https://react-pdf.org/components

## The Basics

Every `<Page>` component accepts a `size` prop and an `orientation` prop.

```tsx
<Page size="LETTER" orientation="portrait">
  {/* content */}
</Page>
```

The default size is `A4`. The default orientation is `portrait`.

---

## Unit: Points

All page dimensions in react-pdf are specified in **points**. One point is 1/72 of an inch.

| Conversion | Value |
|-----------|-------|
| 1 inch | 72 points |
| 1 centimeter | ~28.35 points |
| 1 millimeter | ~2.835 points |

So a LETTER page (8.5 x 11 inches) is 612 x 792 points.

---

## Standard Page Sizes

### US Sizes

| Name | Width (pt) | Height (pt) | Inches | Common Use |
|------|-----------|-------------|--------|------------|
| **LETTER** | 612 | 792 | 8.5 x 11 | Standard US documents |
| **LEGAL** | 612 | 1008 | 8.5 x 14 | US legal documents |
| **TABLOID** | 792 | 1224 | 11 x 17 | Large format US |
| **EXECUTIVE** | 521.86 | 756 | 7.25 x 10.5 | Executive memos |
| **FOLIO** | 612 | 936 | 8.5 x 13 | Folio format |

```tsx
<Page size="LETTER">   {/* 8.5 x 11 inches */}
<Page size="LEGAL">    {/* 8.5 x 14 inches */}
<Page size="TABLOID">  {/* 11 x 17 inches */}
<Page size="EXECUTIVE">{/* 7.25 x 10.5 inches */}
<Page size="FOLIO">    {/* 8.5 x 13 inches */}
```

### ISO A Series

| Name | Width (pt) | Height (pt) | mm |
|------|-----------|-------------|-----|
| **A0** | 2383.94 | 3370.39 | 841 x 1189 |
| **A1** | 1683.78 | 2383.94 | 594 x 841 |
| **A2** | 1190.55 | 1683.78 | 420 x 594 |
| **A3** | 841.89 | 1190.55 | 297 x 420 |
| **A4** | 595.28 | 841.89 | 210 x 297 |
| **A5** | 419.53 | 595.28 | 148 x 210 |
| **A6** | 297.64 | 419.53 | 105 x 148 |
| **A7** | 209.76 | 297.64 | 74 x 105 |
| **A8** | 147.40 | 209.76 | 52 x 74 |
| **A9** | 104.88 | 147.40 | 37 x 52 |
| **A10** | 73.70 | 104.88 | 26 x 37 |

```tsx
<Page size="A4">  {/* International standard – 210 x 297 mm */}
<Page size="A3">  {/* Double A4 */}
<Page size="A5">  {/* Half A4 – booklets, pocket guides */}
```

### ISO B Series

Sizes B0 through B10 are available. B series sizes are between consecutive A sizes. B5 (498.90 x 708.66 pt) is common for books.

```tsx
<Page size="B5">  {/* Book format – 176 x 250 mm */}
```

### ISO C Series

Sizes C0 through C10 are available. C series is primarily for envelopes. C4 fits an unfolded A4 sheet.

---

## Custom Page Sizes

Pass a `[width, height]` array in points for any custom dimensions:

```tsx
// Square page – 6 inches x 6 inches
<Page size={[432, 432]}>

// Business card – 3.5 x 2 inches
<Page size={[252, 144]}>

// Bookmark – 2 x 6 inches
<Page size={[144, 432]}>

// Social media card – 1080 x 1080 pixels at 72 DPI = 1080 x 1080 points
<Page size={[1080, 1080]}>
```

### Helper for Custom Sizes

If you think in inches or millimeters, define conversion helpers:

```tsx
const inches = (n: number) => n * 72;
const mm = (n: number) => n * 2.835;
const cm = (n: number) => n * 28.35;

// 6 x 9 inch book
<Page size={[inches(6), inches(9)]}>

// 100mm x 200mm custom
<Page size={[mm(100), mm(200)]}>
```

---

## Orientation

```tsx
<Page size="LETTER" orientation="portrait">   {/* 612 x 792 – tall */}
<Page size="LETTER" orientation="landscape">  {/* 792 x 612 – wide */}
```

Orientation swaps the width and height. An A4 landscape page is 841.89 x 595.28 points (297 x 210 mm).

When using custom `[width, height]` arrays, orientation still applies – `landscape` swaps the two values.

---

## Mixing Page Sizes in One Document

You can use different sizes and orientations for different pages in the same document:

```tsx
import { Document, Page, Text } from '@react-pdf/renderer';

const MixedDocument = () => (
  <Document>
    <Page size="LETTER" orientation="portrait">
      <Text>Standard portrait page</Text>
    </Page>
    <Page size="LETTER" orientation="landscape">
      <Text>Wide landscape page for charts</Text>
    </Page>
    <Page size={[612, 612]}>
      <Text>Square page for a special section</Text>
    </Page>
    <Page size="A4">
      <Text>A4 page for international readers</Text>
    </Page>
  </Document>
);
```

---

## Common Choices

**US audience:** Use `LETTER` (612 x 792 pt). This is what US printers expect and what US readers are accustomed to.

**International audience:** Use `A4` (595.28 x 841.89 pt). This is the ISO standard used in most of the world outside the US and Canada.

**Both audiences:** A4 is slightly narrower and taller than LETTER. If you design for A4, the content will fit on LETTER with slightly different margins. If you design for LETTER, the content may get clipped on A4 at the sides. Designing for A4 is the safer default for a mixed audience.

**Ebooks and digital-only:** You're free to choose any size. A4 or LETTER works, but you could also use a custom size optimized for screen reading – for instance, a 7 x 10 inch page (504 x 720 pt) is a common book trim size that reads well on screens.

---

## Page Size as a Prop Pattern

When you build page components, accepting size as a prop makes them flexible:

```tsx
interface PageProps {
  size?: string | [number, number];
  orientation?: 'portrait' | 'landscape';
  children: React.ReactNode;
}

const BasePage: React.FC<PageProps> = ({
  size = 'LETTER',
  orientation = 'portrait',
  children,
}) => (
  <Page
    size={size}
    orientation={orientation}
    style={{
      padding: 40,
      fontFamily: 'Inter',
      fontSize: 11,
    }}
  >
    {children}
  </Page>
);
```

---

## Quick Reference: Point Calculations

| Inches | Points |
|--------|--------|
| 0.25 | 18 |
| 0.5 | 36 |
| 0.75 | 54 |
| 1 | 72 |
| 1.5 | 108 |
| 2 | 144 |
| 3 | 216 |
| 4 | 288 |
| 5 | 360 |
| 6 | 432 |
| 7 | 504 |
| 8 | 576 |
| 8.5 | 612 |
| 9 | 648 |
| 10 | 720 |
| 11 | 792 |
| 14 | 1008 |
