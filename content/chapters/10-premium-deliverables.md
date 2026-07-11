# Chapter 10: Premium Deliverables & Recipes

There's a gap between "this PDF has the right content" and "this PDF is worth paying for." The content might be identical. The difference is entirely in execution – fonts, spacing, hierarchy, consistency, and the small details that signal quality.

This chapter gives you the checklist, the reusable components, and the testing methods to cross that gap.

## The Premium Checklist

Print this out. Tape it next to your monitor. Check every item before you ship a document.

### Typography

- [ ] **Custom fonts registered** – not Helvetica, not Arial, not Times New Roman. A deliberate font choice signals that someone made a design decision. Inter, Source Sans, Lato, IBM Plex Sans – any well-designed sans-serif is an immediate upgrade.
- [ ] **3+ text sizes used purposefully** – display (24-32pt), heading (14-18pt), body (10-11pt), caption (8-9pt). Each size maps to a role.
- [ ] **Consistent line height** – body text at 1.5-1.6, headings at 1.2-1.3. No elements with the default line height unless it happens to be correct.
- [ ] **Letter spacing on labels** – uppercase labels and category markers should have 1-2pt letter spacing. Without it, they look cramped.

### Color

- [ ] **3-5 color palette defined** – primary, accent, text, muted, surface. Every color in the document comes from this list.
- [ ] **No random colors** – every color use maps to a purpose: headings, accents, status indicators, backgrounds.
- [ ] **Sufficient contrast** – body text against its background is easily readable. No light gray on white. No dark blue on dark gray.

### Spacing

- [ ] **Consistent spacing system** – all gaps are multiples of a base unit (typically 8pt). No arbitrary values like 13pt or 17pt.
- [ ] **Page padding at least 40pt** – 48pt (0.67 inches) is a good default. Below 36pt and content feels crammed.
- [ ] **Section gaps larger than element gaps** – 24-32pt between sections, 8-16pt between elements within a section. The hierarchy of spacing matches the hierarchy of content.

### Page Structure

- [ ] **Header on every page** – with section title, document title, or branding. Not just a decorative line – something that identifies the document and the section.
- [ ] **Footer on every page** – with page numbers at minimum. Company name, date, or confidentiality notice are good additions.
- [ ] **Page numbers** – sequential, formatted consistently (e.g., "Page 3 of 12" or just "3").
- [ ] **Table of contents** – for any document over 5 pages.
- [ ] **Cover page** – with document title, author/organization, date, and a visual element that sets the tone.

### Visual Elements

- [ ] **Callout boxes for key takeaways** – readers scan before they read. Callout boxes catch scanners.
- [ ] **Icons (not emojis)** – SVG icons that match your color scheme (see Chapter 8).
- [ ] **Tables with styled headers** – not just text in a grid. Dark header row, alternating row colors, aligned columns.
- [ ] **No orphans or widows** – no single lines stranded at the top or bottom of a page break.

### Metadata

- [ ] **Document title set** – visible in PDF viewer title bars and when shared.
- [ ] **Author set** – identifies the creator.
- [ ] **Subject set** – describes the document purpose.

```tsx
<Document
  title="Q4 2025 Financial Report"
  author="Acme Corporation"
  subject="Quarterly financial performance analysis"
  creator="react-pdf"
>
```

## Building Reusable Components

The fastest way to hit every checklist item is to build it once and use it everywhere. Here are the components that form a premium component library.

> For a complete PageHeader implementation, see Chapter 3 (Project Architecture). The `ContentPage` component wraps header, footer, and page structure into a single reusable component — use it instead of building headers from scratch.

> The PageFooter implementation is also covered in Chapter 3. The `Footer` component in this book's source code handles page numbers and branding automatically.

> For the ChapterTitle component pattern, see Chapter 7 (Design Challenges & Solutions). The implementation uses a full-page dark background with accent colors and the chapter number as a large watermark element.

> The TipBox, WarningBox, and InfoBox callout components are covered in Chapter 3. All three share the same structure — a colored left border, icon, label, and body text — with `wrap={false}` to prevent page-break splits.

> For the Table component, see Chapter 3 (shared components) and Chapter 7 (design patterns). The implementation takes headers, rows, and columnWidths props and renders styled rows with alternating backgrounds.

> The CodeBlock component is covered in Chapter 7. It renders dark-background code with a monospace font, optional language label, and `wrap={false}` to keep code blocks from splitting across pages.

## The Design System in a File

All of the components above reference colors, sizes, and spacing values. Those values should live in a single file – your design system. This is the file you hand to every AI interaction. This is the file that keeps 50 pages visually consistent.

```tsx
// theme.ts

export const colors = {
  primary: "#1a1a2e",
  secondary: "#3b82f6",
  text: "#374151",
  muted: "#6b7280",
  surface: "#f8fafc",
  border: "#e5e7eb",
  white: "#ffffff",

  // Semantic colors
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
} as const;

export const typography = {
  display: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    lineHeight: 1.2,
  },
  h1: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    lineHeight: 1.25,
  },
  h2: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: colors.text,
    lineHeight: 1.35,
  },
  body: {
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: colors.text,
    lineHeight: 1.6,
  },
  caption: {
    fontSize: 9,
    fontFamily: "Helvetica",
    color: colors.muted,
    lineHeight: 1.4,
  },
  label: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: colors.muted,
    textTransform: "uppercase" as const,
    letterSpacing: 1.5,
  },
  code: {
    fontSize: 9,
    fontFamily: "Courier",
    color: colors.text,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  page: 48, // page padding
} as const;

export const pageDefaults = {
  size: "LETTER" as const,
  padding: spacing.page,
  backgroundColor: colors.white,
};
```

Every component imports from `theme.ts`. When you want to change the primary color from navy to forest green, you change one value in one file, and every page updates.

When prompting your AI to build a new page, include this file in the context. The AI now has exact values for every design decision. No guessing.

## Testing Quality

### The Squint Test

Lean back from your screen. Squint at the page until the text is blurry. You should still be able to identify:

- Where the title is
- Where different sections start
- Where callout boxes or special elements are
- The general balance of content on the page

If everything blurs into one uniform mass, you don't have enough visual hierarchy. Add size contrast, color contrast, or background differentiation.

### The Scroll Test

Open the PDF and scroll through every page at normal speed – about 1 second per page. Ask:

- Do the pages look like they belong to the same document?
- Are headers and footers in the same position on every page?
- Is the text density consistent (no page that's 90% text next to a page that's 30% text)?
- Do the colors feel cohesive?

If any page looks like it belongs to a different document, it needs work.

### The "Would I Share This?" Test

Not "would I send this if I had to" – would you voluntarily share this with a colleague, a client, or on social media? Would you put your name on it?

If the answer is no, identify the weakest element. Fix it. Ask again.

### The Print Test

Print a page. Physical paper is unforgiving. Issues that are invisible on screen – color contrast, spacing, font readability – become obvious on paper. If you're producing documents that will be printed, this test is mandatory.

## Automation: PDF + PNG + Review Pipeline

For teams generating documents regularly, automate the quality loop.

### Package.json Scripts

```json
{
  "scripts": {
    "build:pdf": "tsx src/render.ts",
    "export:png": "pdftoppm -png -r 200 output.pdf pages/page",
    "build": "npm run build:pdf && npm run export:png",
    "clean": "rm -f output.pdf && rm -f pages/page-*.png"
  }
}
```

### CI Pipeline (GitHub Actions Example)

```yaml
name: Generate and Review PDF

on:
  push:
    paths:
      - 'src/**'
      - 'content/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install poppler-utils
        run: sudo apt-get install -y poppler-utils

      - name: Build PDF
        run: npm run build:pdf

      - name: Export pages to PNG
        run: npm run export:png

      - name: Upload PDF artifact
        uses: actions/upload-artifact@v4
        with:
          name: pdf-output
          path: output.pdf

      - name: Upload page images
        uses: actions/upload-artifact@v4
        with:
          name: page-images
          path: pages/page-*.png
```

This pipeline builds the PDF on every push, exports the pages to PNGs, and uploads both as artifacts. You can download the PNGs from the CI run and feed them to your AI for review.

### Optional: Automated AI Review

If you want to go further, add an AI review step. This requires an API key for your AI provider:

```tsx
// scripts/review.ts
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic();

async function reviewPage(imagePath: string, pageNum: number): Promise<string> {
  const imageData = fs.readFileSync(imagePath);
  const base64 = imageData.toString("base64");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: base64,
            },
          },
          {
            type: "text",
            text: `Review this PDF page (page ${pageNum}) for design quality. Check:
1. Is spacing consistent between elements?
2. Is there clear visual hierarchy (3+ text sizes)?
3. Are colors used consistently?
4. Is there adequate whitespace?
5. Are elements properly aligned?
Rate each from 1-5 and note any specific issues.`,
          },
        ],
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text : "No review generated.";
}

async function main() {
  const pagesDir = "./pages";
  const pages = fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith(".png") && f.startsWith("page-"))
    .sort();

  console.log(`Reviewing ${pages.length} pages...\n`);

  for (const page of pages) {
    const pageNum = parseInt(page.match(/\d+/)?.[0] || "0");
    console.log(`--- Page ${pageNum} ---`);
    const review = await reviewPage(path.join(pagesDir, page), pageNum);
    console.log(review);
    console.log();
  }
}

main();
```

Run with `tsx scripts/review.ts` after exporting PNGs. The AI reviews each page and gives you a quality score with specific feedback. Fix the issues, rebuild, re-review.

## What "Premium" Actually Means

Premium isn't about flashy design. It's about consistency, intention, and attention to detail.

A premium document has:

- **No accidents.** Every spacing value, color, and size is chosen from a defined system.
- **No inconsistencies.** The same type of element looks the same everywhere.
- **No cheap shortcuts.** Custom fonts, vector icons, proper page breaks.
- **Clear structure.** A reader knows where they are and what's important at a glance.
- **Professional metadata.** Title, author, and subject set correctly.

That's it. You don't need gradients, animations, or complex graphics. You need a design system, reusable components, and the discipline to iterate until the output meets your checklist.

## Recipes & Templates

The checklist tells you what premium looks like. These recipes show you how to build it. Each pattern uses the design tokens (Ch 4), shared components like ContentPage (Ch 3), and Table (Ch 7) from this book — if you're starting here, review those chapters first or clone the source code.

### Recipe: Invoice Component

The most-requested PDF use case. This invoice component takes a typed data object and renders a header, line items table, and totals. Swap the InvoiceData interface for any typed shape (receipts, purchase orders, quotes) and the structure stays the same.

```tsx
interface InvoiceData {
  number: string; date: string; due: string;
  from: { name: string; address: string };
  to: { name: string; address: string };
  items: { desc: string; qty: number; price: number }[];
  tax?: number;
}

const Invoice = ({ data }: { data: InvoiceData }) => {
  const subtotal = data.items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = subtotal * (data.tax ?? 0);
  return (
    <Page size="LETTER" style={styles.page}>
      <View style={{ flexDirection: 'row', marginBottom: spacing.xl }}>
        <View style={{ width: '50%' }}>
          <Text style={styles.h3}>{data.from.name}</Text>
          <Text style={styles.bodySmall}>{data.from.address}</Text>
        </View>
        <View style={{ width: '50%', alignItems: 'flex-end' }}>
          <Text style={styles.h2Text}>INVOICE #{data.number}</Text>
          <Text style={styles.bodySmall}>Due: {data.due}</Text>
        </View>
      </View>
      <Table headers={['Description','Qty','Price','Total']}
        rows={data.items.map(i => [i.desc, String(i.qty),
          `$${i.price.toFixed(2)}`, `$${(i.qty*i.price).toFixed(2)}`])}
        columnWidths={['50%','15%','15%','20%']} />
      <View style={{ alignItems: 'flex-end', marginTop: spacing.sm }}>
        <Text style={styles.body}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text style={styles.h3}>Total: ${(subtotal+tax).toFixed(2)}</Text>
      </View>
    </Page>
  );
};
```

### Recipe: Data-Driven Pages

Most useful PDFs are generated from data, not static content. The pattern: pass a typed data array, `.map()` over it, render one page per item. Conditional rendering controls which sections appear. Each page is a pure function of its data — change the data and the PDF updates automatically.

```tsx
interface Section {
  title: string;
  body: string;
  metrics?: { label: string; value: string }[];
}

const Report = ({ sections }: { sections: Section[] }) => (
  <Document>
    {sections.map((section, i) => (
      <ContentPage key={i} sectionTitle={section.title}>
        <SectionHeading>{section.title}</SectionHeading>
        <Text style={styles.body}>{section.body}</Text>
        {section.metrics && (
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            {section.metrics.map((m, j) => (
              <View key={j} wrap={false} style={{
                flex: 1, backgroundColor: colors.neutral[50],
                padding: spacing.md, borderRadius: borders.radius.md,
              }}>
                <Text style={styles.bodySmall}>{m.label}</Text>
                <Text style={styles.h3}>{m.value}</Text>
              </View>
            ))}
          </View>
        )}
      </ContentPage>
    ))}
  </Document>
);
```

### Layout Patterns Cheat Sheet

Four layouts you'll reach for repeatedly. All examples use design tokens from theme.ts.

**Two-Column Layout:**
```tsx
<View style={{ flexDirection: 'row', gap: spacing.lg }}>
  <View style={{ flex: 1 }}><Text style={styles.body}>Left</Text></View>
  <View style={{ flex: 1 }}><Text style={styles.body}>Right</Text></View>
</View>
```

**Sidebar + Content:**
```tsx
<View style={{ flexDirection: 'row', gap: spacing.lg }}>
  <View style={{ width: '28%', backgroundColor: colors.neutral[50],
    padding: spacing.md, borderRadius: borders.radius.md }}>
    <Text style={styles.h4}>Sidebar</Text>
  </View>
  <View style={{ flex: 1 }}><Text style={styles.body}>Main</Text></View>
</View>
```

**Card Grid (2x2):**
```tsx
<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
  {items.map((item, i) => (
    <View key={i} wrap={false} style={{
      width: '48%', padding: spacing.md,
      borderWidth: borders.medium, borderColor: colors.neutral[200],
      borderRadius: borders.radius.md,
    }}>
      <Text style={styles.h4}>{item.title}</Text>
      <Text style={styles.bodySmall}>{item.desc}</Text>
    </View>
  ))}
</View>
```

**Metric / KPI Row:**
```tsx
<View style={{ flexDirection: 'row', gap: spacing.md }}>
  {metrics.map((m, i) => (
    <View key={i} style={{ flex: 1, alignItems: 'center',
      padding: spacing.md, backgroundColor: colors.neutral[50],
      borderRadius: borders.radius.md }}>
      <Text style={styles.bodySmall}>{m.label}</Text>
      <Text style={styles.h2Text}>{m.value}</Text>
    </View>
  ))}
</View>
```

Every recipe follows the same principle: typed data in, styled PDF out. The interface defines the contract, the component handles layout, and the design tokens enforce visual consistency. Start with the recipe closest to your use case, adapt the interface to your data, and build from there.
