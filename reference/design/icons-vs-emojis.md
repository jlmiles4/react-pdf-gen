# Icons vs. Emojis in React-PDF

> Why SVG icons are the right choice for PDF documents, and why emojis are not.

## The Problem with Emojis in PDF

Emojis seem convenient. A quick `checkmark` or `warning sign` added directly to your text. But in react-pdf, emojis introduce problems that SVG icons do not have.

---

## Emoji Limitations

### 1. Remote emoji sources require internet at render time

To render emojis, react-pdf needs `Font.registerEmojiSource()` pointing to a CDN:

```tsx
Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});
```

At render time, react-pdf fetches each unique emoji as a PNG image from that CDN. If the CDN is down, slow, or blocked by a firewall, your PDF generation fails or hangs.

For server-side rendering in production, this is a reliability risk. Your PDF generation now depends on a third-party service's uptime.

### 2. Rendering varies across platforms

Emojis look different on Apple, Google, Microsoft, Samsung, and Twemoji. When you use `Font.registerEmojiSource()`, you lock to one set (typically Twemoji). But if the reader copies text from your PDF and pastes it elsewhere, or if the emoji source changes, the appearance shifts.

### 3. Emojis are raster images at fixed resolution

The CDN serves emoji as PNG images – raster graphics at a fixed pixel size (typically 72x72). When scaled up in a PDF, they pixelate. When scaled down, they waste space. They don't scale cleanly at arbitrary sizes the way vector graphics do.

### 4. No color customization

Emojis have fixed colors. You cannot make a `checkmark` match your brand's green (`#27ae60`). You cannot make a `warning` triangle match your warning color (`#f39c12`). They are opaque images with their own color palette.

### 5. Unprofessional appearance in formal documents

Emojis carry a casual, informal connotation. In a business report, legal document, or professional ebook, emojis look out of place. They signal "text message" not "considered publication."

---

## SVG Icons: The Alternative

React-pdf has full SVG support. You can render any icon as resolution-independent vector graphics that scale perfectly at any size and match your color scheme exactly.

### React-pdf SVG Components

```tsx
import { Svg, Path, Circle, Rect, Line, G } from '@react-pdf/renderer';
```

These components correspond to standard SVG elements. Any icon that is defined as SVG path data can be rendered directly in react-pdf.

---

## Icon Approach: Inline SVG Path Data

Most icon libraries (Lucide, Heroicons, Feather Icons, Tabler Icons) publish their icons as SVG path data. You can extract the `d` attribute from any icon and use it directly.

### Check Icon

```tsx
import { Svg, Path } from '@react-pdf/renderer';

interface IconProps {
  size?: number;
  color?: string;
}

export const CheckIcon = ({ size = 16, color = '#27ae60' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M20 6L9 17l-5-5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);
```

### Warning Triangle Icon

```tsx
export const WarningIcon = ({ size = 16, color = '#f39c12' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path d="M12 9v4" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M12 17h.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);
```

### Info Circle Icon

```tsx
export const InfoIcon = ({ size = 16, color = '#3498db' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} fill="none" />
    <Path d="M12 16v-4" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M12 8h.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);
```

### Arrow Right Icon

```tsx
export const ArrowRightIcon = ({ size = 16, color = '#333333' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M5 12h14M12 5l7 7-7 7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);
```

### Star Icon (Filled)

```tsx
export const StarIcon = ({ size = 16, color = '#f39c12' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={color}
      stroke={color}
      strokeWidth={1}
    />
  </Svg>
);
```

---

## Using Icons in Components

### Inline with Text

React-pdf does not support placing SVG inside `<Text>`. You need a flexbox row layout to place an icon next to text.

```tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { CheckIcon } from '../icons/CheckIcon';
import { tokens } from '../styles/tokens';

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  iconContainer: {
    width: 16,
    height: 16,
    marginTop: 2,  // align with text baseline
  },
  text: {
    flex: 1,
    fontSize: tokens.fontSize.body,
    lineHeight: tokens.lineHeight.normal,
    color: tokens.colors.text,
  },
});

interface ChecklistItemProps {
  text: string;
}

export const ChecklistItem = ({ text }: ChecklistItemProps) => (
  <View style={styles.listItem}>
    <View style={styles.iconContainer}>
      <CheckIcon size={14} color={tokens.colors.success} />
    </View>
    <Text style={styles.text}>{text}</Text>
  </View>
);
```

### In Callout Boxes

```tsx
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { WarningIcon } from '../icons/WarningIcon';
import { InfoIcon } from '../icons/InfoIcon';
import { CheckIcon } from '../icons/CheckIcon';
import { tokens } from '../styles/tokens';

type CalloutType = 'tip' | 'warning' | 'note';

const iconMap: Record<CalloutType, React.FC<{ size?: number; color?: string }>> = {
  tip: CheckIcon,
  warning: WarningIcon,
  note: InfoIcon,
};

const colorMap: Record<CalloutType, string> = {
  tip: tokens.colors.success,
  warning: tokens.colors.warning,
  note: tokens.colors.accent,
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: tokens.colors.surfaceLight,
    borderRadius: tokens.borderRadius.md,
    padding: 14,
    marginVertical: 12,
    borderLeftWidth: 4,
  },
  iconCol: {
    width: 20,
    paddingTop: 2,
  },
  contentCol: {
    flex: 1,
  },
  label: {
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
    color: tokens.colors.text,
  },
});

interface CalloutProps {
  type: CalloutType;
  children: string;
}

export const Callout = ({ type, children }: CalloutProps) => {
  const Icon = iconMap[type];
  const color = colorMap[type];

  return (
    <View style={[styles.box, { borderLeftColor: color }]}>
      <View style={styles.iconCol}>
        <Icon size={16} color={color} />
      </View>
      <View style={styles.contentCol}>
        <Text style={[styles.label, { color }]}>
          {type.toUpperCase()}
        </Text>
        <Text style={styles.content}>{children}</Text>
      </View>
    </View>
  );
};
```

### Rating Display

```tsx
import { View, StyleSheet } from '@react-pdf/renderer';
import { StarIcon } from '../icons/StarIcon';
import { tokens } from '../styles/tokens';

const styles = StyleSheet.create({
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
});

export const Rating = ({ value, max = 5 }: { value: number; max?: number }) => (
  <View style={styles.stars}>
    {Array.from({ length: max }, (_, i) => (
      <StarIcon
        key={i}
        size={14}
        color={i < value ? tokens.colors.warning : tokens.colors.border}
      />
    ))}
  </View>
);
```

---

## Comparison: Emoji vs. SVG Icon Approach

### Emoji Approach

```tsx
// Requires: Font.registerEmojiSource() + CDN at render time
// Colors: fixed, cannot match brand
// Scaling: raster, pixelates at large sizes
// Reliability: depends on CDN uptime

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

<Text style={{ fontSize: 11 }}>
  Status: Complete
</Text>
```

### SVG Icon Approach

```tsx
// Requires: nothing external
// Colors: fully customizable to your palette
// Scaling: vector, perfect at any size
// Reliability: self-contained, no network dependency

<View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
  <CheckIcon size={14} color={tokens.colors.success} />
  <Text style={{ fontSize: 11 }}>Status: Complete</Text>
</View>
```

---

## Where to Get SVG Path Data

### Lucide Icons (recommended)

- Website: https://lucide.dev
- Well-organized, consistent stroke-based icons
- Each icon page shows the SVG source – copy the `d` attribute from the `<path>` element

### Heroicons

- Website: https://heroicons.com
- Outline and solid variants
- Click an icon to copy its SVG markup

### Feather Icons

- Website: https://feathericons.com
- Minimal, clean stroke icons

### Tabler Icons

- Website: https://tabler.io/icons
- Large collection, consistent style

### Manual process

1. Find the icon on the library's website
2. Copy the SVG markup
3. Extract the `viewBox`, `path d`, and any `circle`/`rect` data
4. Create a react-pdf component using `<Svg>`, `<Path>`, `<Circle>`, etc.

---

## Creating an Icon Library for Your Project

Organize all icons in one folder:

```
src/
  icons/
    index.ts              # re-exports all icons
    CheckIcon.tsx
    WarningIcon.tsx
    InfoIcon.tsx
    ArrowRightIcon.tsx
    StarIcon.tsx
    ExternalLinkIcon.tsx
    BookOpenIcon.tsx
    CodeIcon.tsx
```

The `index.ts` barrel file:

```tsx
// src/icons/index.ts
export { CheckIcon } from './CheckIcon';
export { WarningIcon } from './WarningIcon';
export { InfoIcon } from './InfoIcon';
export { ArrowRightIcon } from './ArrowRightIcon';
export { StarIcon } from './StarIcon';
```

All icons follow the same interface:

```tsx
interface IconProps {
  size?: number;   // default 16
  color?: string;  // default tokens.colors.text
}
```

This consistency means any page component can import and use any icon with predictable behavior.

---

## Summary

| Factor | Emojis | SVG Icons |
|--------|--------|-----------|
| Network dependency | CDN required at render time | None |
| Color customization | None | Full control |
| Scaling quality | Raster – pixelates | Vector – perfect at any size |
| Visual consistency | Varies by platform | Always matches your design |
| File size impact | Each emoji is a downloaded PNG | Path data is a few bytes of text |
| Professional appearance | Casual | Formal and controlled |
| Reliability | Depends on CDN uptime | Self-contained |

Use SVG icons. Reserve emojis for contexts where they're genuinely appropriate – and even then, consider whether an icon would serve better.
