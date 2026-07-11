# Prompt: React-PDF Component Library

Use this prompt to create the reusable component library for a react-pdf project. Each component is small, focused, and references design tokens.

---

## Component Patterns

### ContentPage — Standard Page Wrapper
Every content page uses this. It adds the fixed header and footer.

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

### Header / Footer — Fixed Elements
`ContentPage` inserts them in each source page. Use `fixed` so they also repeat on every subpage a wrapping `<Page>` generates; use `position: 'absolute'` for anchoring.

```tsx
// Footer with dynamic page numbers
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

### SectionHeading — Gold Bar + h2
Use `wrap={false}` to keep the heading together. Add `minPresenceAhead={40}` when the ancestor Page wraps; fixed pages must be authored to fit.

```tsx
const SectionHeading: React.FC<{ children: string }> = ({ children }) => (
  <View wrap={false} minPresenceAhead={40} style={styles.h2Container}>
    <View style={styles.h2Accent} />
    <Text style={styles.h2Text}>{children}</Text>
  </View>
);
```

### SectionBanner — Dark Hero Card
For introducing major topics within a page.

```tsx
const SectionBanner: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <View wrap={false} style={s.container}>
    <View style={s.accentBar} />
    <Text style={s.title}>{title}</Text>
    {subtitle && <Text style={s.subtitle}>{subtitle}</Text>}
  </View>
);
// container: backgroundColor primary[800], borderRadius md, padding lg
// title: white, 18pt, fontWeight 700
```

### ChapterTitle — Full-Page Divider
Renders as its own `<Page>`. Dark navy background, gold accent bar, decorative SVG circle.

```tsx
const ChapterTitle: React.FC<ChapterTitleProps> = ({ number, title, subtitle }) => (
  <Page size="LETTER" style={ctStyles.page}>
    <View style={ctStyles.accentBar} />
    <Text style={ctStyles.chapterLabel}>Chapter {number}</Text>
    <Text style={ctStyles.title}>{title}</Text>
    {subtitle && <Text style={ctStyles.subtitle}>{subtitle}</Text>}
    <Svg style={ctStyles.decorCircle} viewBox="0 0 200 200">
      <Rect x="0" y="0" width="200" height="200" rx="100" fill={colors.accent[500]} />
    </Svg>
  </Page>
);
```

### TipBox / WarningBox / InfoBox — Callout Boxes
Always `wrap={false}`. Left border + tinted background + icon + label.

```tsx
export const TipBox: React.FC<{ children: React.ReactNode; label?: string }> = ({ children, label = 'Tip' }) => (
  <View wrap={false} style={styles.tipBox}>
    <View style={local.labelRow}>
      <ZapIcon size={13} color={colors.accent[700]} />
      <Text style={styles.tipLabel}>{label}</Text>
    </View>
    <Text style={styles.body}>{children}</Text>
  </View>
);
// Variants: TipBox (gold), WarningBox (red), InfoBox (blue)
```

### CodeBlock — Dark Code Display
Always `wrap={false}`. Dark navy background, Courier font, optional language label in gold.

```tsx
const CodeBlock: React.FC<{ children: string; language?: string }> = ({ children, language }) => (
  <View wrap={false} style={styles.codeBlock}>
    {language && <Text style={styles.codeLabel}>{language}</Text>}
    <Text style={styles.codeText}>{children}</Text>
  </View>
);
```

### BulletList — Gold Dot List
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
const Table: React.FC<{ headers: string[]; rows: string[][]; columnWidths?: string[] }> = ({ headers, rows, columnWidths }) => {
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

### Icons — SVG Lucide Icons
Never use emoji. Use vector SVG icons with configurable size and color.

Available: `CheckIcon`, `XIcon`, `AlertTriangleIcon`, `InfoIcon`, `ArrowRightIcon`, `BookIcon`, `CodeIcon`, `LayersIcon`, `PaletteIcon`, `ZapIcon`

```tsx
export const CheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#2D8B4E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
```

---

## Critical Rules
1. Every component that should not split across pages gets `wrap={false}`
2. Headings carry `minPresenceAhead={40}` for wrapping contexts; fixed pages are visually balanced by editing or splitting the source
3. All styles come from shared.ts or local `StyleSheet.create()` — never inline objects
4. `fontWeight` must always be present when `fontFamily` is set
5. Icons are SVG with `fill="none"` and `stroke={color}` — never filled shapes for line icons
