# Chapter 7: Design Challenges and Solutions

react-pdf will frustrate you. No CSS Grid, no floats, no `box-shadow`, no `overflow: hidden` that works the way you expect. If you're coming from web CSS, half your muscle memory is useless here. But here's the thing -- those constraints are actually why AI-assisted PDF generation works so well. Fewer options means fewer ways for AI to go wrong. Every layout in this chapter uses the same four tools: `View`, `Text`, flexbox, and your design tokens.

This chapter is a reference. It tells you what works, what doesn't, what to do instead, and gives you copy-paste recipes for the patterns you'll use most often.

## What Works Well

These are your reliable tools. Don't get creative -- lean into what works and you'll move fast.

### Single and Two-Column Layouts

Flexbox row with `flex` on each child. This is the bread and butter of react-pdf layout.

```tsx
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 16,
  },
  colHalf: {
    flex: 1,
  },
  colThird: {
    flex: 1,
  },
  colTwoThirds: {
    flex: 2,
  },
});
```

Works perfectly up to 3 columns. Beyond that, the columns get narrow enough on LETTER/A4 that content becomes hard to read.

### Full-Width Color Banners

A `View` with `backgroundColor` and horizontal padding, spanning the full page width. You need to account for page padding – either set the page padding to 0 and handle it per-section, or use negative margins (not supported) – so the cleanest approach is a page with zero horizontal padding and inner content containers that add their own padding.

```tsx
const styles = StyleSheet.create({
  page: {
    paddingVertical: 48,
    paddingHorizontal: 0,
  },
  banner: {
    backgroundColor: "#1a1a2e",
    paddingVertical: 24,
    paddingHorizontal: 48,
    marginBottom: 24,
  },
  bannerText: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  content: {
    paddingHorizontal: 48,
  },
});

<Page size="LETTER" style={styles.page}>
  <View style={styles.banner}>
    <Text style={styles.bannerText}>Section Title</Text>
  </View>
  <View style={styles.content}>
    <Text style={styles.body}>Content with side padding.</Text>
  </View>
</Page>
```

### Card Patterns

A `View` with border, padding, background, and optional border-left accent. This is the single most reusable component in react-pdf design.

```tsx
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    padding: 16,
    marginBottom: 12,
  },
  cardAccent: {
    backgroundColor: "#f8fafc",
    borderLeftWidth: 3,
    borderLeftColor: "#3b82f6",
    borderRadius: 4,
    padding: 16,
    marginBottom: 12,
  },
});
```

### SVG Icons and Decorative Elements

react-pdf has solid SVG support. You can use `Svg`, `Path`, `Circle`, `Rect`, `Line`, and `G` to render vector graphics inline. This is how you add icons (see Chapter 8).

Decorative elements like dividers, corner marks, or accent shapes work well as inline SVGs:

```tsx
const Divider = () => (
  <Svg width="100%" height={2} viewBox="0 0 500 2">
    <Rect x={0} y={0} width={500} height={2} fill="#e5e7eb" />
  </Svg>
);
```

### Background Color Sections

Alternating between white and light gray backgrounds breaks up long content effectively:

```tsx
<View style={{ backgroundColor: "#ffffff", padding: 24 }}>
  <Text style={styles.body}>Section on white background.</Text>
</View>
<View style={{ backgroundColor: "#f8fafc", padding: 24 }}>
  <Text style={styles.body}>Section on light gray background.</Text>
</View>
```

### Pull Quotes and Callout Boxes

A large text quote with a left border accent:

```tsx
const styles = StyleSheet.create({
  pullQuote: {
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
    paddingLeft: 16,
    paddingVertical: 8,
    marginVertical: 16,
  },
  pullQuoteText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#374151",
    lineHeight: 1.6,
  },
});
```

### Bullet and Numbered Lists

No `<ul>` or `<ol>` exists in react-pdf. Build them with flex rows:

```tsx
const BulletItem = ({ children }: { children: string }) => (
  <View style={{ flexDirection: "row", marginBottom: 6 }}>
    <Text style={{ fontSize: 10.5, color: "#374151", width: 16 }}>{"\u2022"}</Text>
    <Text style={{ fontSize: 10.5, color: "#374151", flex: 1, lineHeight: 1.5 }}>
      {children}
    </Text>
  </View>
);

const NumberedItem = ({ n, children }: { n: number; children: string }) => (
  <View style={{ flexDirection: "row", marginBottom: 6 }}>
    <Text style={{ fontSize: 10.5, color: "#6b7280", width: 20 }}>{`${n}.`}</Text>
    <Text style={{ fontSize: 10.5, color: "#374151", flex: 1, lineHeight: 1.5 }}>
      {children}
    </Text>
  </View>
);
```

### Flexbox Tables

Tables built with flex rows render reliably and handle long content well. See the recipe section below for the full pattern.

### Page Numbers via Render Prop

The `render` prop on `<Text>` gives you dynamic access to page numbers:

```tsx
<Text
  style={styles.pageNumber}
  render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
  fixed
/>
```

The `fixed` prop makes this element repeat on every page.

### Fixed Headers and Footers

Combine `fixed` with absolute positioning:

```tsx
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
  },
});

<View style={styles.footer} fixed>
  <Text style={styles.caption}>Acme Corp – Confidential</Text>
  <Text
    style={styles.caption}
    render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
  />
</View>
```

## What Doesn't Work (and Workarounds)

This is where you'll spend most of your time. Every workaround below exists because someone hit the same wall you're about to hit.

### Complex Multi-Column Layouts

**The problem:** Anything beyond 3 columns gets too narrow for readable text on LETTER (8.5" wide) or A4 (8.27" wide). After subtracting margins, you have about 6.5" of usable width. Four columns gives you about 1.5" each – barely enough for a sentence.

**The workaround:** Stick to 1-3 columns. If you need to display more items, use a grid-like pattern with `flexWrap: 'wrap'`:

```tsx
const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridItem: {
    width: "48%",  // 2 per row with gap
  },
  // or for 3 per row:
  gridItemThird: {
    width: "31%",
  },
});
```

Use percentage widths and account for the gap. `48%` with a 12pt gap gives you a clean 2-column grid. `31%` gives you 3 columns.

### CSS Grid

**The problem:** Not supported. At all.

**The workaround:** Nested flexbox with explicit widths. For a dashboard-style layout:

```tsx
const styles = StyleSheet.create({
  dashboardRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  cardWide: {
    flex: 2,
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 4,
  },
  cardNarrow: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 4,
  },
});

// First row: one wide card, one narrow card
<View style={styles.dashboardRow}>
  <View style={styles.cardWide}>
    <Text>Revenue chart placeholder</Text>
  </View>
  <View style={styles.cardNarrow}>
    <Text>KPI summary</Text>
  </View>
</View>
// Second row: three equal cards
<View style={styles.dashboardRow}>
  <View style={{ flex: 1 }}><Text>Metric 1</Text></View>
  <View style={{ flex: 1 }}><Text>Metric 2</Text></View>
  <View style={{ flex: 1 }}><Text>Metric 3</Text></View>
</View>
```

### Rounded Images

**The problem:** Applying `borderRadius` to an `<Image>` component has limited and inconsistent support. You can set it, but rendering varies.

**The workaround:** Wrap the image in a `View` with `borderRadius` and `overflow: 'hidden'`:

```tsx
const styles = StyleSheet.create({
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
  },
  avatarImage: {
    width: 64,
    height: 64,
    objectFit: "cover",
  },
});

<View style={styles.avatarContainer}>
  <Image src="headshot.png" style={styles.avatarImage} />
</View>
```

For a perfect circle, set `borderRadius` to half of `width` and `height`.

### Drop Shadows

**The problem:** `box-shadow` is not supported. There is no shadow property.

**The workaround:** Fake it with a border or a slightly offset background `View`:

```tsx
// Option 1: Subtle border (simpler, usually sufficient)
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    padding: 16,
    backgroundColor: "#ffffff",
  },
});

// Option 2: Offset View to simulate shadow (more complex)
const ShadowCard = ({ children }: { children: React.ReactNode }) => (
  <View style={{ position: "relative", marginBottom: 14 }}>
    {/* Shadow layer */}
    <View
      style={{
        position: "absolute",
        top: 2,
        left: 2,
        right: -2,
        bottom: -2,
        backgroundColor: "#d1d5db",
        borderRadius: 4,
      }}
    />
    {/* Content layer */}
    <View
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 4,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e5e7eb",
      }}
    >
      {children}
    </View>
  </View>
);
```

Option 1 is almost always the right choice. Real drop shadows rarely add enough value in a PDF to justify the complexity of Option 2.

### Gradients in Backgrounds

**The problem:** CSS gradients (`linear-gradient`, `radial-gradient`) are not supported as style properties.

**The workaround:** Use an SVG `LinearGradient` positioned behind your content:

```tsx
import { View, Text, Svg, Defs, LinearGradient, Stop, Rect } from "@react-pdf/renderer";

const GradientBanner = ({ children }: { children: React.ReactNode }) => (
  <View style={{ position: "relative", height: 80 }}>
    {/* Gradient background */}
    <Svg
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      viewBox="0 0 612 80"
    >
      <Defs>
        <LinearGradient id="bannerGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#1a1a2e" />
          <Stop offset="100%" stopColor="#3b82f6" />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={612} height={80} fill="url(#bannerGrad)" />
    </Svg>
    {/* Content on top */}
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        paddingHorizontal: 48,
      }}
    >
      {children}
    </View>
  </View>
);
```

Note: The `viewBox` width (612) matches LETTER width in points. Adjust for your page size.

### Text Wrapping Around Images

**The problem:** `float` doesn't exist. There's no way to have text flow around an image.

**The workaround:** Use a side-by-side layout:

```tsx
<View style={{ flexDirection: "row", gap: 16 }}>
  <Image src="photo.png" style={{ width: 120, height: 90 }} />
  <View style={{ flex: 1 }}>
    <Text style={styles.body}>
      Text content goes here, adjacent to the image.
      It won't wrap underneath the image – it stays
      in its column. This is the only option.
    </Text>
  </View>
</View>
```

If you need text below the image as well, add a second `<Text>` element after the row:

```tsx
<View style={{ flexDirection: "row", gap: 16, marginBottom: 8 }}>
  <Image src="photo.png" style={{ width: 120, height: 90 }} />
  <View style={{ flex: 1 }}>
    <Text style={styles.body}>Text next to the image.</Text>
  </View>
</View>
<Text style={styles.body}>
  More text below, full width, continues the discussion.
</Text>
```

### Dynamic Table Column Widths

**The problem:** There's no `table-layout: auto`. You can't have columns size themselves based on content.

**The workaround:** Calculate percentage widths manually based on your data:

```tsx
interface Column {
  key: string;
  label: string;
  width: string; // percentage
}

const columns: Column[] = [
  { key: "name", label: "Name", width: "30%" },
  { key: "role", label: "Role", width: "25%" },
  { key: "department", label: "Department", width: "25%" },
  { key: "status", label: "Status", width: "20%" },
];
```

For truly dynamic sizing, you can calculate widths based on max content length:

```tsx
function calculateColumnWidths(data: Record<string, string>[], keys: string[]): Record<string, string> {
  const maxLengths = keys.map((key) => {
    const maxContent = Math.max(key.length, ...data.map((row) => String(row[key]).length));
    return maxContent;
  });
  const total = maxLengths.reduce((sum, len) => sum + len, 0);
  const widths: Record<string, string> = {};
  keys.forEach((key, i) => {
    widths[key] = `${Math.round((maxLengths[i] / total) * 100)}%`;
  });
  return widths;
}
```

This is approximate – character count doesn't perfectly map to rendered width because fonts aren't monospaced – but it's good enough for most data tables.

### Syntax Highlighting in Code Blocks

**The problem:** No CSS classes, no `<code>` element, no syntax highlighting library that outputs react-pdf components.

**The workaround:** Manually style with colored `<Text>` spans inside a monospaced container:

```tsx
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      backgroundColor: "#1e293b",
      borderRadius: 4,
      padding: 16,
      marginVertical: 12,
    }}
  >
    {children}
  </View>
);

const CodeLine = ({ children }: { children: React.ReactNode }) => (
  <Text style={{ fontFamily: "Courier", fontSize: 9, lineHeight: 1.6 }}>
    {children}
  </Text>
);

const K = ({ children }: { children: string }) => (
  <Text style={{ color: "#c084fc" }}>{children}</Text>
);
const S = ({ children }: { children: string }) => (
  <Text style={{ color: "#86efac" }}>{children}</Text>
);
const V = ({ children }: { children: string }) => (
  <Text style={{ color: "#93c5fd" }}>{children}</Text>
);
const P = ({ children }: { children: string }) => (
  <Text style={{ color: "#d1d5db" }}>{children}</Text>
);

// Usage:
<CodeBlock>
  <CodeLine>
    <K>const</K> <V>name</V> <P>=</P> <S>"react-pdf"</S><P>;</P>
  </CodeLine>
</CodeBlock>
```

This is tedious for long code samples. For anything over 10 lines, consider rendering the code block as a PNG image externally and importing it with `<Image>`.

### Complex Charts

**The problem:** react-pdf's SVG support doesn't extend to full charting libraries. You can draw basic shapes (bars, lines, circles), but complex charts (area charts, scatter plots, interactive legends) are impractical to build from SVG primitives.

**The workaround:** Render charts externally as PNG images and import them:

1. Use a charting library (Chart.js, D3, Recharts) in a headless browser or Node canvas.
2. Export the chart as a PNG at 2x resolution (300 DPI).
3. Import the PNG into your react-pdf document with `<Image>`.

```tsx
<View style={{ marginVertical: 16 }}>
  <Text style={styles.caption}>Figure 1: Revenue by Quarter</Text>
  <Image
    src="./charts/revenue-by-quarter.png"
    style={{ width: "100%", height: 240, objectFit: "contain" }}
  />
</View>
```

For simple charts – bar charts, progress bars, pie charts – you can build them directly in SVG. Here's a horizontal bar:

```tsx
const Bar = ({ label, value, max }: { label: string; value: number; max: number }) => {
  const pct = (value / max) * 100;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
      <Text style={{ fontSize: 9, width: 80, color: "#374151" }}>{label}</Text>
      <View style={{ flex: 1, height: 12, backgroundColor: "#e5e7eb", borderRadius: 2 }}>
        <View
          style={{
            width: `${pct}%`,
            height: 12,
            backgroundColor: "#3b82f6",
            borderRadius: 2,
          }}
        />
      </View>
      <Text style={{ fontSize: 9, width: 40, textAlign: "right", color: "#6b7280" }}>
        {value}
      </Text>
    </View>
  );
};
```

## Recipe Book

Stop writing layouts from scratch. These patterns are battle-tested -- copy them, swap in your design tokens, and move on.

### Recipe: Professional Table

```tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

interface TableColumn {
  key: string;
  label: string;
  width: string;
  align?: "left" | "center" | "right";
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, string | number>[];
}

const tableStyles = StyleSheet.create({
  table: {
    marginVertical: 12,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerCell: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  rowAlt: {
    backgroundColor: "#f8fafc",
  },
  cell: {
    fontSize: 10,
    color: "#374151",
  },
});

const Table = ({ columns, data }: TableProps) => (
  <View style={tableStyles.table}>
    {/* Header */}
    <View style={tableStyles.headerRow}>
      {columns.map((col) => (
        <Text
          key={col.key}
          style={[
            tableStyles.headerCell,
            { width: col.width, textAlign: col.align || "left" },
          ]}
        >
          {col.label}
        </Text>
      ))}
    </View>
    {/* Body */}
    {data.map((row, i) => (
      <View
        key={i}
        style={[tableStyles.row, i % 2 === 1 ? tableStyles.rowAlt : {}]}
      >
        {columns.map((col) => (
          <Text
            key={col.key}
            style={[
              tableStyles.cell,
              { width: col.width, textAlign: col.align || "left" },
            ]}
          >
            {String(row[col.key])}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

// Usage:
const columns: TableColumn[] = [
  { key: "name", label: "Name", width: "35%" },
  { key: "role", label: "Role", width: "25%" },
  { key: "department", label: "Department", width: "25%" },
  { key: "revenue", label: "Revenue", width: "15%", align: "right" },
];

const data = [
  { name: "Alice Chen", role: "Engineering Lead", department: "Product", revenue: "$1.2M" },
  { name: "Bob Park", role: "Sales Director", department: "Revenue", revenue: "$3.4M" },
  { name: "Carol Liu", role: "Design Lead", department: "Product", revenue: "$0.8M" },
];
```

### Recipe: Callout / Tip Box

```tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

type CalloutVariant = "tip" | "warning" | "note" | "important";

const variantConfig: Record<CalloutVariant, { bg: string; border: string; label: string }> = {
  tip: { bg: "#f0fdf4", border: "#22c55e", label: "TIP" },
  warning: { bg: "#fffbeb", border: "#f59e0b", label: "WARNING" },
  note: { bg: "#eff6ff", border: "#3b82f6", label: "NOTE" },
  important: { bg: "#fef2f2", border: "#ef4444", label: "IMPORTANT" },
};

interface CalloutProps {
  variant: CalloutVariant;
  children: string;
}

const calloutStyles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    borderRadius: 4,
    padding: 14,
    marginVertical: 12,
  },
  label: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  body: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#374151",
  },
});

const Callout = ({ variant, children }: CalloutProps) => {
  const config = variantConfig[variant];
  return (
    <View
      style={[
        calloutStyles.container,
        { backgroundColor: config.bg, borderLeftColor: config.border },
      ]}
    >
      <Text style={[calloutStyles.label, { color: config.border }]}>{config.label}</Text>
      <Text style={calloutStyles.body}>{children}</Text>
    </View>
  );
};

// Usage:
<Callout variant="tip">
  Use StyleSheet.create() for all styles. It provides better performance
  and keeps your code organized.
</Callout>

<Callout variant="warning">
  Never use Font.register() inside a component render function.
  It must be called once at the module level.
</Callout>
```

### Recipe: Two-Column Layout

```tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const twoColStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 24,
  },
  colLeft: {
    flex: 1,
  },
  colRight: {
    flex: 1,
  },
  // Sidebar variant: narrow left, wide right
  sidebar: {
    width: 160,
  },
  main: {
    flex: 1,
  },
});

// Equal columns
const EqualColumns = () => (
  <View style={twoColStyles.row}>
    <View style={twoColStyles.colLeft}>
      <Text style={styles.h3}>Left Column</Text>
      <Text style={styles.body}>Content for the left side.</Text>
    </View>
    <View style={twoColStyles.colRight}>
      <Text style={styles.h3}>Right Column</Text>
      <Text style={styles.body}>Content for the right side.</Text>
    </View>
  </View>
);

// Sidebar + main content
const SidebarLayout = () => (
  <View style={twoColStyles.row}>
    <View style={twoColStyles.sidebar}>
      <Text style={styles.caption}>QUICK FACTS</Text>
      <Text style={styles.body}>Founded: 2019</Text>
      <Text style={styles.body}>Team: 42 people</Text>
      <Text style={styles.body}>Revenue: $12M ARR</Text>
    </View>
    <View style={twoColStyles.main}>
      <Text style={styles.h2}>Company Overview</Text>
      <Text style={styles.body}>
        Main content area with the detailed description.
        This column grows to fill the remaining space.
      </Text>
    </View>
  </View>
);
```

### Recipe: Chapter Title Page

```tsx
import React from "react";
import { Page, View, Text, Svg, Rect, StyleSheet } from "@react-pdf/renderer";

const chapterStyles = StyleSheet.create({
  page: {
    backgroundColor: "#1a1a2e",
    padding: 0,
    justifyContent: "flex-end",
  },
  topAccent: {
    height: 4,
    backgroundColor: "#3b82f6",
  },
  content: {
    padding: 48,
  },
  chapterNumber: {
    fontSize: 72,
    fontFamily: "Helvetica-Bold",
    color: "rgba(255, 255, 255, 0.15)",
    marginBottom: 8,
  },
  chapterLabel: {
    fontSize: 11,
    fontFamily: "Helvetica",
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#3b82f6",
    marginBottom: 8,
  },
  chapterTitle: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    marginBottom: 16,
    lineHeight: 1.2,
  },
  chapterDesc: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 1.6,
    maxWidth: 400,
  },
  divider: {
    width: 48,
    height: 3,
    backgroundColor: "#3b82f6",
    marginBottom: 16,
  },
});

interface ChapterTitlePageProps {
  number: number;
  title: string;
  description: string;
}

const ChapterTitlePage = ({ number, title, description }: ChapterTitlePageProps) => (
  <Page size="LETTER" style={chapterStyles.page}>
    <View style={chapterStyles.topAccent} />
    <View style={{ flex: 1 }} />
    <View style={chapterStyles.content}>
      <Text style={chapterStyles.chapterNumber}>
        {String(number).padStart(2, "0")}
      </Text>
      <Text style={chapterStyles.chapterLabel}>Chapter {number}</Text>
      <View style={chapterStyles.divider} />
      <Text style={chapterStyles.chapterTitle}>{title}</Text>
      <Text style={chapterStyles.chapterDesc}>{description}</Text>
    </View>
  </Page>
);

// Usage:
<ChapterTitlePage
  number={3}
  title="Project Architecture"
  description="How to structure your react-pdf project so AI agents can work on one piece at a time without breaking everything else."
/>
```

### Recipe: Code Block with Line Numbers

```tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const codeStyles = StyleSheet.create({
  container: {
    backgroundColor: "#1e293b",
    borderRadius: 4,
    padding: 16,
    marginVertical: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  filename: {
    fontSize: 9,
    fontFamily: "Courier",
    color: "#94a3b8",
  },
  language: {
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  line: {
    flexDirection: "row",
  },
  lineNumber: {
    width: 28,
    fontSize: 8,
    fontFamily: "Courier",
    color: "#475569",
    textAlign: "right",
    paddingRight: 12,
  },
  lineContent: {
    flex: 1,
    fontSize: 9,
    fontFamily: "Courier",
    color: "#e2e8f0",
    lineHeight: 1.6,
  },
});

interface CodeBlockProps {
  filename?: string;
  language?: string;
  lines: string[];
}

const CodeBlock = ({ filename, language, lines }: CodeBlockProps) => (
  <View style={codeStyles.container} wrap={false}>
    {(filename || language) && (
      <View style={codeStyles.header}>
        <Text style={codeStyles.filename}>{filename || ""}</Text>
        <Text style={codeStyles.language}>{language || ""}</Text>
      </View>
    )}
    {lines.map((line, i) => (
      <View key={i} style={codeStyles.line}>
        <Text style={codeStyles.lineNumber}>{i + 1}</Text>
        <Text style={codeStyles.lineContent}>{line}</Text>
      </View>
    ))}
  </View>
);

// Usage:
<CodeBlock
  filename="theme.ts"
  language="TypeScript"
  lines={[
    'export const colors = {',
    '  primary: "#1a1a2e",',
    '  secondary: "#3b82f6",',
    '  text: "#374151",',
    '  muted: "#6b7280",',
    '  surface: "#f8fafc",',
    '};',
  ]}
/>
```

## The Decision Matrix

Before you spend twenty minutes fighting a layout, check this table. It'll save you the trip.

| Design Goal | Feasibility | Approach |
|-------------|-------------|----------|
| 1-3 column layout | Easy | `flexDirection: 'row'` with `flex` children |
| 4+ column grid | Moderate | `flexWrap: 'wrap'` with percentage widths |
| Full-bleed color sections | Easy | Zero horizontal page padding + per-section padding |
| Cards with borders | Easy | `View` with `borderWidth`, `padding`, `borderRadius` |
| Rounded images | Moderate | `View` with `borderRadius` + `overflow: 'hidden'` |
| Drop shadows | Avoid | Use borders instead – cleaner and more reliable |
| Gradient backgrounds | Moderate | SVG `LinearGradient` behind content |
| Text wrapping around images | Not possible | Side-by-side layout only |
| Auto-sizing table columns | Moderate | Calculate widths from data in JS |
| Syntax highlighting | Tedious | Colored `Text` spans, or render code as PNG |
| Complex charts | Use images | Render externally, import as PNG |
| Watermarks | Easy | Absolutely positioned, rotated `Text` |
| Background images | Moderate | Absolutely positioned `Image` behind content |
| Numbered/bullet lists | Easy | Flex rows with fixed-width number/bullet column |

When in doubt, build a 3-line prototype, render it, and check. react-pdf either supports something cleanly or doesn't support it at all – there's rarely a middle ground.
