# Chapter 3: Project Architecture for AI Agents

This is the chapter that makes everything else work. The patterns here aren't theoretical – they're the difference between an AI agent that produces usable pages on the first try and one that breaks your document every time you ask for a change.

## The Monolith Problem

Here's what happens when you put your entire PDF in one file:

```tsx
// document.tsx – 1,800 lines
const MyDocument = () => (
  <Document>
    <Page>{/* Cover page – 150 lines */}</Page>
    <Page>{/* Table of contents – 200 lines */}</Page>
    <Page>{/* Executive summary – 180 lines */}</Page>
    <Page>{/* Financial charts – 300 lines */}</Page>
    <Page>{/* Team bios – 250 lines */}</Page>
    <Page>{/* Appendix A – 200 lines */}</Page>
    <Page>{/* Appendix B – 250 lines */}</Page>
    {/* ... */}
  </Document>
);
```

Now you tell your AI agent: "Change the background color on the cover page and add a new chart to page 4."

What goes wrong:

- **Context overload.** The AI loads 1,800 lines. Most of it is irrelevant to the task. The model's attention is spread across content it doesn't need to see.
- **Lost in the middle.** Research on LLMs shows they pay the most attention to the beginning and end of their context window. Content in the middle – like your page 4 chart section – gets less precise treatment.
- **Collateral damage.** The AI edits the cover page but inadvertently changes a style object that's shared with page 6. You don't notice until you look at the final PDF.
- **Merge conflicts.** If you're iterating on multiple pages, every change touches the same file. Diffs are noisy. Git history is useless.
- **Token waste.** You're paying (in tokens and latency) to process 1,800 lines when you only need 150.

The fix is structural.

## The Page-Per-File Pattern

Every page in your document gets its own file. Every file exports a single component. The document assembly file imports them all.

```
src/
  pages/
    Page01-Cover.tsx
    Page02-TOC.tsx
    Page03-ExecutiveSummary.tsx
    Page04-FinancialCharts.tsx
    Page05-TeamBios.tsx
    Page06-AppendixA.tsx
    Page07-AppendixB.tsx
  components/
    Header.tsx
    Footer.tsx
    SectionTitle.tsx
    CalloutBox.tsx
    DataTable.tsx
    MetricCard.tsx
  styles/
    theme.ts
    shared.ts
  assets/
    fonts/
      Inter-Regular.ttf
      Inter-Bold.ttf
      Inter-SemiBold.ttf
    images/
      logo.png
      hero-bg.png
    icons/
      check.tsx
      arrow-right.tsx
  fonts.ts
  Document.tsx
  build.tsx
```

### Why this structure works for AI

1. **Small files.** Each page component is 100–300 lines. That's 200–600 tokens. An AI agent can hold the entire file in focus.

2. **Clear boundaries.** When you say "edit Page04-FinancialCharts.tsx," the AI knows exactly what to open and what to change. There's no ambiguity about scope.

3. **Isolated changes.** Editing one page cannot break another page – unless you change a shared component or style, which is a deliberate choice.

4. **Minimal context.** To edit a page, the AI needs: the page file + `theme.ts` + any shared components used on that page. That's typically 1,000–2,000 tokens total. Plenty of room for instructions.

5. **Parallel work.** You can have one AI conversation editing the cover page and another editing the charts page simultaneously. No conflicts.

6. **Readable diffs.** When you change the cover page, the diff shows changes in `Page01-Cover.tsx` only. Code review is straightforward.

## File Naming Convention

Use this format: `PageNN-DescriptiveName.tsx`

- **Number prefix** (`01`, `02`, ...) – Keeps files in page order in your file explorer and in imports.
- **Descriptive name** – Tells the AI (and you) what the page contains without opening the file.
- **PascalCase after the number** – Matches React component naming convention.

Examples:

```
Page01-Cover.tsx
Page02-TOC.tsx
Page03-Introduction.tsx
Page04-MarketAnalysis.tsx
Page05-FinancialOverview.tsx
Page06-TeamBios.tsx
Page07-AppendixA.tsx
Page08-AppendixB.tsx
```

Why numbers matter: when you tell an AI "add a new page between the market analysis and financial overview," it can look at the numbering and know where the new page goes. Name it `Page04b-CompetitorAnalysis.tsx` or renumber the sequence – either works.

## The Page Component

Every page file follows the same structure:

```tsx
// src/pages/Page01-Cover.tsx
import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { theme } from "../styles/theme";

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.white,
    fontFamily: theme.fonts.body,
  },
  content: {
    flex: 1,
    padding: theme.spacing[16],
    justifyContent: "center",
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    color: theme.colors.primary,
    fontFamily: theme.fonts.heading,
    marginBottom: theme.spacing[4],
  },
  subtitle: {
    fontSize: theme.typography.h3.fontSize,
    color: theme.colors.neutral[600],
    lineHeight: 1.4,
  },
});

const Page01Cover = () => (
  <Page size="LETTER" style={styles.page}>
    <View style={styles.content}>
      <Text style={styles.title}>Annual Report 2025</Text>
      <Text style={styles.subtitle}>
        Building for the next decade
      </Text>
    </View>
  </Page>
);

export default Page01Cover;
```

The pattern:

1. **Imports** at the top – react-pdf components, theme, shared components.
2. **Local styles** defined with `StyleSheet.create()` – styles specific to this page.
3. **Component** – a single exported component that returns a `<Page>`.
4. **Default export** – so the assembly file can import it cleanly.

Notice: the component uses `theme.colors.primary` instead of `"#1a2b4a"`. Every visual value comes from the theme. This is how you prevent the AI from inventing colors.

## Shared Components

Shared components live in `src/components/` and handle repeating elements across pages.

### Header

```tsx
// src/components/Header.tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { theme } from "../styles/theme";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing[16],
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
  },
  title: {
    fontSize: 9,
    color: theme.colors.neutral[500],
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  pageNumber: {
    fontSize: 9,
    color: theme.colors.neutral[400],
  },
});

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Annual Report 2025" }: HeaderProps) => (
  <View fixed style={styles.header}>
    <Text style={styles.title}>{title}</Text>
    <Text
      style={styles.pageNumber}
      render={({ pageNumber, totalPages }) =>
        `${pageNumber} / ${totalPages}`
      }
    />
  </View>
);

export default Header;
```

### Footer

```tsx
// src/components/Footer.tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { theme } from "../styles/theme";

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 24,
    left: theme.spacing[16],
    right: theme.spacing[16],
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 8,
    color: theme.colors.neutral[400],
  },
});

interface FooterProps {
  leftText?: string;
  rightText?: string;
}

const Footer = ({
  leftText = "Confidential",
  rightText = "ACME Corporation",
}: FooterProps) => (
  <View fixed style={styles.footer}>
    <Text style={styles.text}>{leftText}</Text>
    <Text style={styles.text}>{rightText}</Text>
  </View>
);

export default Footer;
```

### SectionTitle

```tsx
// src/components/SectionTitle.tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { theme } from "../styles/theme";

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing[6],
  },
  label: {
    fontSize: 9,
    color: theme.colors.accent,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: theme.spacing[2],
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    color: theme.colors.primary,
    fontFamily: theme.fonts.heading,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.accent,
    marginTop: theme.spacing[3],
  },
});

interface SectionTitleProps {
  label?: string;
  title: string;
  showDivider?: boolean;
}

const SectionTitle = ({
  label,
  title,
  showDivider = true,
}: SectionTitleProps) => (
  <View style={styles.container} minPresenceAhead={100}>
    {label && <Text style={styles.label}>{label}</Text>}
    <Text style={styles.title}>{title}</Text>
    {showDivider && <View style={styles.divider} />}
  </View>
);

export default SectionTitle;
```

### CalloutBox

```tsx
// src/components/CalloutBox.tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { theme } from "../styles/theme";

type CalloutVariant = "info" | "success" | "warning" | "neutral";

const variantColors: Record<
  CalloutVariant,
  { bg: string; border: string; text: string }
> = {
  info: {
    bg: "#eff6ff",
    border: theme.colors.primary,
    text: theme.colors.primary,
  },
  success: {
    bg: "#f0fdf4",
    border: "#16a34a",
    text: "#15803d",
  },
  warning: {
    bg: "#fffbeb",
    border: "#d97706",
    text: "#92400e",
  },
  neutral: {
    bg: theme.colors.neutral[100],
    border: theme.colors.neutral[300],
    text: theme.colors.neutral[700],
  },
};

interface CalloutBoxProps {
  title?: string;
  children: string;
  variant?: CalloutVariant;
}

const CalloutBox = ({
  title,
  children,
  variant = "info",
}: CalloutBoxProps) => {
  const palette = variantColors[variant];

  return (
    <View
      wrap={false}
      style={{
        backgroundColor: palette.bg,
        borderLeftWidth: 3,
        borderLeftColor: palette.border,
        padding: theme.spacing[4],
        marginVertical: theme.spacing[3],
        borderRadius: 4,
      }}
    >
      {title && (
        <Text
          style={{
            fontSize: 10,
            fontFamily: theme.fonts.heading,
            color: palette.text,
            marginBottom: theme.spacing[1],
          }}
        >
          {title}
        </Text>
      )}
      <Text
        style={{
          fontSize: 10,
          color: palette.text,
          lineHeight: 1.5,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default CalloutBox;
```

### DataTable

```tsx
// src/components/DataTable.tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { theme } from "../styles/theme";

interface DataTableProps {
  headers: string[];
  rows: string[][];
  columnWidths?: string[];
}

const DataTable = ({ headers, rows, columnWidths }: DataTableProps) => {
  const defaultWidth = `${100 / headers.length}%`;
  const widths = columnWidths || headers.map(() => defaultWidth);

  return (
    <View style={{ marginVertical: theme.spacing[3] }}>
      {/* Header row */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme.colors.primary,
          paddingVertical: theme.spacing[2],
          paddingHorizontal: theme.spacing[3],
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      >
        {headers.map((header, i) => (
          <Text
            key={i}
            style={{
              width: widths[i],
              fontSize: 9,
              color: theme.colors.white,
              fontFamily: theme.fonts.heading,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {header}
          </Text>
        ))}
      </View>

      {/* Data rows */}
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          wrap={false}
          style={{
            flexDirection: "row",
            paddingVertical: theme.spacing[2],
            paddingHorizontal: theme.spacing[3],
            backgroundColor:
              rowIndex % 2 === 0
                ? theme.colors.white
                : theme.colors.neutral[50],
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.neutral[200],
          }}
        >
          {row.map((cell, cellIndex) => (
            <Text
              key={cellIndex}
              style={{
                width: widths[cellIndex],
                fontSize: 9,
                color: theme.colors.neutral[700],
                lineHeight: 1.4,
              }}
            >
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

export default DataTable;
```

These five components – Header, Footer, SectionTitle, CalloutBox, DataTable – cover a large percentage of what you'll need across pages. Build them once, reuse everywhere.

## The Assembly File

`Document.tsx` imports all pages and wraps them in a `Document` component. It contains zero styling and zero content – it's purely structural.

```tsx
// src/Document.tsx
import React from "react";
import { Document } from "@react-pdf/renderer";

import Page01Cover from "./pages/Page01-Cover";
import Page02TOC from "./pages/Page02-TOC";
import Page03ExecutiveSummary from "./pages/Page03-ExecutiveSummary";
import Page04FinancialCharts from "./pages/Page04-FinancialCharts";
import Page05TeamBios from "./pages/Page05-TeamBios";
import Page06AppendixA from "./pages/Page06-AppendixA";
import Page07AppendixB from "./pages/Page07-AppendixB";

const ReportDocument = () => (
  <Document
    title="Annual Report 2025"
    author="ACME Corporation"
    subject="FY2025 Annual Report"
  >
    <Page01Cover />
    <Page02TOC />
    <Page03ExecutiveSummary />
    <Page04FinancialCharts />
    <Page05TeamBios />
    <Page06AppendixA />
    <Page07AppendixB />
  </Document>
);

export default ReportDocument;
```

The `Document` component accepts metadata props (`title`, `author`, `subject`, `keywords`, `creator`, `producer`) that get embedded in the PDF file metadata. Set them – they help with accessibility and search.

This file changes only when you add or remove pages. It's the table of contents for your codebase.

## The Build Script

`build.tsx` renders the document to a file. It's the entry point you run to produce the PDF.

```tsx
// src/build.tsx
import React from "react";
import ReactPDF from "@react-pdf/renderer";
import ReportDocument from "./Document";

// Import font registrations
import "./fonts";

const OUTPUT_PATH = "./output/report.pdf";

async function build() {
  console.log("Rendering PDF...");
  const start = Date.now();

  await ReactPDF.render(<ReportDocument />, OUTPUT_PATH);

  const elapsed = Date.now() - start;
  console.log(`Done. ${OUTPUT_PATH} (${elapsed}ms)`);
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
```

### The font registration file

Keep font registrations separate so they're loaded once and importable from anywhere:

```tsx
// src/fonts.ts
import { Font } from "@react-pdf/renderer";
import path from "path";

const fontsDir = path.join(__dirname, "assets", "fonts");

Font.register({
  family: "Inter",
  fonts: [
    { src: path.join(fontsDir, "Inter-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "Inter-Medium.ttf"), fontWeight: 500 },
    { src: path.join(fontsDir, "Inter-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(fontsDir, "Inter-Bold.ttf"), fontWeight: 700 },
  ],
});

Font.register({
  family: "JetBrains Mono",
  fonts: [
    {
      src: path.join(fontsDir, "JetBrainsMono-Regular.ttf"),
      fontWeight: 400,
    },
  ],
});

// Disable hyphenation
Font.registerHyphenationCallback((word) => [word]);
```

### Running the build

Add a script to your `package.json`:

```json
{
  "scripts": {
    "build:pdf": "tsx src/build.tsx"
  }
}
```

Then: `npm run build:pdf`

For faster iteration, add a watch mode:

```json
{
  "scripts": {
    "build:pdf": "tsx src/build.tsx",
    "dev:pdf": "tsx watch src/build.tsx"
  }
}
```

`tsx watch` re-runs the build whenever you save a file. Combine this with a PDF viewer that auto-refreshes (like the VS Code PDF viewer extension) and you get near-instant feedback.

## Passing Data to Pages

Many documents are data-driven – you're rendering a report from a JSON payload, not hardcoding text. Here's how to wire that up:

```tsx
// src/types.ts
export interface ReportData {
  title: string;
  date: string;
  preparedBy: string;
  sections: {
    title: string;
    content: string;
    metrics?: { label: string; value: string }[];
  }[];
  financials: {
    quarter: string;
    revenue: number;
    expenses: number;
    profit: number;
  }[];
}
```

```tsx
// src/Document.tsx
import React from "react";
import { Document } from "@react-pdf/renderer";
import { ReportData } from "./types";

import Page01Cover from "./pages/Page01-Cover";
import Page02FinancialTable from "./pages/Page02-FinancialTable";

interface Props {
  data: ReportData;
}

const ReportDocument = ({ data }: Props) => (
  <Document title={data.title}>
    <Page01Cover
      title={data.title}
      date={data.date}
      preparedBy={data.preparedBy}
    />
    <Page02FinancialTable financials={data.financials} />
  </Document>
);

export default ReportDocument;
```

```tsx
// src/build.tsx
import React from "react";
import ReactPDF from "@react-pdf/renderer";
import ReportDocument from "./Document";
import reportData from "./data/report.json";
import "./fonts";

async function build() {
  await ReactPDF.render(
    <ReportDocument data={reportData} />,
    "./output/report.pdf"
  );
}

build();
```

Each page component declares its own props interface and receives only the data it needs. This keeps the dependency graph shallow and makes each page independently testable.

## Anti-Patterns

Things that will make your AI workflow painful:

### 1. The monolith file

Already covered above. One file with all pages. Every edit risks breaking unrelated content.

### 2. Styles mixed into components

```tsx
// Bad: styles defined inline, duplicated across files
<Text style={{ fontSize: 22, color: "#1a2b4a", fontFamily: "Inter" }}>
  Section Title
</Text>
```

When the AI generates a new page, it'll guess at these values. Sometimes it'll use `#1a2b4a`, sometimes `#1B2B4A`, sometimes `#192a49`. The result looks inconsistent.

**Fix:** Always reference theme tokens.

### 3. Inline styles everywhere

```tsx
// Bad: every element has ad-hoc inline styles
<View style={{ padding: 20, marginBottom: 15, backgroundColor: "#f0f0f0" }}>
  <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 8 }}>
    Title
  </Text>
  <Text style={{ fontSize: 11, lineHeight: 1.5, color: "#444" }}>
    Body text here.
  </Text>
</View>
```

This is hard to update globally. Changing the body font size means finding every instance across every file.

**Fix:** Use `StyleSheet.create()` with theme tokens. Inline styles should be rare – use them only for one-off overrides.

### 4. Deeply nested imports

```tsx
// Bad: page imports a component that imports a utility that imports the theme
// Page -> CardGrid -> Card -> CardHeader -> theme
```

When an AI needs to understand how CardHeader is styled, it has to trace through four files. Keep the import depth to 2 levels max: page -> shared component -> theme.

### 5. No design tokens

Building pages without a theme file means every page is styled independently. Over 10 pages, you end up with 4 different blues, 3 different heading sizes, and spacing that follows no pattern.

**Fix:** Chapter 4.

### 6. Giant shared components

A `Table` component that handles 15 different configurations with complex conditional logic. The AI can't reason about it clearly. Keep shared components under 100 lines. If a component needs to handle many variations, split it into multiple components.

## Putting It Together

Here's the workflow when you need to add a new page to your document:

1. **Create the file.** `src/pages/Page05-NewSection.tsx`
2. **Tell the AI what to build.** Give it:
   - The new page file (empty or scaffolded)
   - `theme.ts`
   - Any shared components it should use
   - A description of what the page should contain
3. **The AI generates the page.** It has full context on the theme and components, and a focused scope (one page).
4. **Add the import to `Document.tsx`.** One line.
5. **Build and check.** `npm run build:pdf`
6. **Iterate.** If something's off, give the AI just the page file again with your feedback.

Each iteration costs minimal tokens and produces targeted changes. No risk of breaking other pages. Fast feedback loop.

This architecture is the foundation everything else in this book builds on. Get this right and the rest follows naturally.
