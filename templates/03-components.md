# Template: React-PDF Component Library

Paste this into your AI agent to build the reusable component library for your react-pdf project. Each component is small, focused, and references design tokens.

---

## Components

### ContentPage — Standard Page Wrapper
Every content page uses this. Adds fixed header and footer.

```tsx
import React from 'react';
import { Page } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import Header from './Header';
import Footer from './Footer';

interface ContentPageProps {
  children: React.ReactNode;
  sectionTitle?: string;
}

const ContentPage: React.FC<ContentPageProps> = ({ children, sectionTitle }) => (
  <Page size="LETTER" style={styles.page} wrap>
    <Header sectionTitle={sectionTitle} />
    {children}
    <Footer />
  </Page>
);
```

### Header — Fixed Page Header
`ContentPage` inserts it in each source page. Use `fixed` so it also repeats on every subpage a wrapping `<Page>` generates; use `position: 'absolute'` for anchoring.

```tsx
const Header: React.FC<{ sectionTitle?: string }> = ({ sectionTitle }) => (
  <View style={headerStyles.container} fixed>
    <Text style={headerStyles.bookTitle}>Your Book Title</Text>
    {sectionTitle && <Text style={headerStyles.title}>{sectionTitle}</Text>}
  </View>
);
```

### Footer — Fixed Page Footer
Dynamic page numbers via the `render` prop.

```tsx
const Footer: React.FC = () => (
  <View style={footerStyles.container} fixed>
    <Text style={footerStyles.brand}>yoursite.com</Text>
    <Text
      style={footerStyles.pageNumber}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
);
```

### SectionHeading — Accent Bar + Heading
Use `wrap={false}` to keep the heading together. Add `minPresenceAhead={40}` when the ancestor Page wraps; pages that don't wrap must be authored to fit.

```tsx
const SectionHeading: React.FC<{ children: string }> = ({ children }) => (
  <View wrap={false} minPresenceAhead={40} style={styles.h2Container}>
    <View style={styles.h2Accent} />
    <Text style={styles.h2Text}>{children}</Text>
  </View>
);
```

### TipBox / WarningBox / InfoBox — Callout Boxes
Always `wrap={false}`. Left border + tinted background + icon + label.

```tsx
export const TipBox: React.FC<{ children: React.ReactNode; label?: string }> = ({
  children, label = 'Tip'
}) => (
  <View wrap={false} style={styles.tipBox}>
    <View style={local.labelRow}>
      <ZapIcon size={13} color={colors.accent[700]} />
      <Text style={styles.tipLabel}>{label}</Text>
    </View>
    <Text style={styles.body}>{children}</Text>
  </View>
);
// Create WarningBox (red) and InfoBox (blue) variants with the same pattern
```

### CodeBlock — Dark Code Display
Always `wrap={false}`. Keep each code block within the vertical space available on its page; split or move it when surrounding content makes it too tall.

```tsx
const CodeBlock: React.FC<{ children: string; language?: string }> = ({
  children, language
}) => (
  <View wrap={false} style={styles.codeBlock}>
    {language && <Text style={styles.codeLabel}>{language}</Text>}
    <Text style={styles.codeText}>{children}</Text>
  </View>
);
```

### BulletList — Accent Dot List
Each item uses `wrap={false}` to prevent orphaned dots.

```tsx
const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <View style={local.container}>
    {items.map((item, i) => (
      <View key={i} wrap={false} style={local.item}>
        <Svg width={6} height={6} viewBox="0 0 6 6">
          <Circle cx="3" cy="3" r="3" fill={colors.accent[500]} />
        </Svg>
        <Text style={styles.listContent}>{item}</Text>
      </View>
    ))}
  </View>
);
```

### Table — Professional Data Table
Navy header, alternating rows, custom column widths.

```tsx
const Table: React.FC<{
  headers: string[];
  rows: string[][];
  columnWidths?: string[];
}> = ({ headers, rows, columnWidths }) => {
  const widths = columnWidths || headers.map(() => `${100 / headers.length}%`);
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        {headers.map((h, i) => (
          <Text key={i} style={[styles.tableHeaderText, { width: widths[i] }]}>{h}</Text>
        ))}
      </View>
      {rows.map((row, ri) => (
        <View key={ri} style={ri % 2 === 1 ? styles.tableRowAlt : styles.tableRow}>
          {row.map((cell, ci) => (
            <Text key={ci} style={[styles.tableCell, { width: widths[ci] }]}>{cell}</Text>
          ))}
        </View>
      ))}
    </View>
  );
};
```

### Icons — SVG Vector Icons
Never use emoji. Get path data from [lucide.dev](https://lucide.dev) (MIT license).

```tsx
import { Svg, Path } from '@react-pdf/renderer';

interface IconProps {
  size?: number;
  color?: string;
}

export const CheckIcon: React.FC<IconProps> = ({ size = 16, color = colors.success }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={2.5}
      fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Add more icons as needed: XIcon, InfoIcon, AlertTriangleIcon, ArrowRightIcon, ZapIcon
// Keep to 8-12 icons max — icon bloat costs tokens in every AI prompt
```

---

## Rules
1. Every component that should not split across pages gets `wrap={false}`
2. Headings carry `minPresenceAhead={40}` for wrapping contexts; fixed pages are visually balanced by editing or splitting the source
3. All styles come from shared.ts or local `StyleSheet.create()` — never inline objects
4. `fontWeight` must always be present when `fontFamily` is set
5. Icons use `fill="none"` and `stroke={color}` for line icons
6. Keep each component file under 50 lines — small and focused
