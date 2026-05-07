# Chapter 8: Icons over Emojis

Your AI agent just put a checkmark emoji in your PDF. Then a warning triangle. Then a star. Then a thumbs up. The document looks like a group chat.

This happens because emojis are the path of least resistance. The AI knows emojis exist in Unicode, they don't require imports, and they communicate meaning quickly. But in a PDF, emojis are the wrong tool. SVG icons are the right one. This chapter explains why and shows you how to build a reusable icon system for react-pdf.

## The Problem with Emojis in PDF

### Font.registerEmojiSource() Requires Internet at Render Time

react-pdf doesn't include emoji glyphs in its built-in fonts. To render emojis, you need to register an emoji source:

```tsx
import { Font } from "@react-pdf/renderer";

Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});
```

This fetches individual emoji PNGs from a CDN at render time. That means:

- Your build process requires an internet connection
- Render time increases by 100-500ms per emoji (network latency)
- The CDN could go down, breaking your PDF generation
- CI/CD environments behind firewalls may not have access

If you're generating PDFs on a server, in a Docker container, or in a CI pipeline, depending on an external CDN for visual elements is a liability.

### Emojis Render as Raster Images

When react-pdf fetches emoji PNGs from the CDN, they're raster images at a fixed resolution – typically 72x72 pixels. At small sizes (12-16pt text), they look fine. At larger sizes or on high-DPI displays, they look pixelated.

You can't scale an emoji up to 48pt without it looking blurry. Vector icons scale to any size with zero quality loss.

### Inconsistent Rendering Across PDF Viewers

If you don't register an emoji source and the emoji happens to render through a system font fallback, the appearance depends on the viewer:

- macOS Preview: Apple emoji style
- Adobe Acrobat: may show a blank box or a different glyph set
- Chrome's PDF viewer: yet another rendering
- Printed output: unpredictable

You can't control which emoji set the viewer uses (unless you use `registerEmojiSource`), and even then, the PNGs look different from native system emoji. Your "consistent brand" is now at the mercy of the viewer application.

### Emojis Can't Match Your Color Scheme

Emojis come in predefined colors. The warning triangle is yellow. The red circle is red. The checkmark is green. You can't make the checkmark match your brand's `#3b82f6` blue. You can't give the warning icon your `#f59e0b` amber.

In a document with a deliberate color palette, emojis are the elements that refuse to participate.

### Emojis Look Informal

This is subjective but important. Emojis carry the connotation of casual communication – text messages, Slack, social media. In a financial report, a client proposal, or a compliance document, they undermine the tone.

There's a difference between "professional document with visual elements" and "document that looks like it was written in a messaging app." Emojis push you toward the latter.

## The SVG Icon Advantage

### Vector Graphics Scale Perfectly

SVG icons are mathematical paths, not pixel grids. A 16pt icon and a 64pt icon render from the same data with identical sharpness. No pixelation, no resolution-dependent quality.

### Match Your Brand Colors

An SVG `Path` takes a `fill` prop. Set it to any color in your palette:

```tsx
<Svg viewBox="0 0 24 24" width={16} height={16}>
  <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#3b82f6" />
</Svg>
```

That checkmark is now your brand blue. Change the prop, change the color. Every icon matches the design system.

### Consistent Rendering

SVG in react-pdf renders to native PDF vector instructions. The output is identical in every PDF viewer – Adobe Acrobat, macOS Preview, Chrome, Firefox, printed on paper. There's nothing to interpret differently because the vector data is embedded directly in the PDF.

### No Internet Connection Required

The icon is defined in your source code. It ships with your application. No CDN, no fetch, no network dependency.

### Full react-pdf SVG Support

react-pdf supports the SVG elements you need for icons: `Svg`, `Path`, `Circle`, `Rect`, `Line`, `G`, `Polygon`, `Polyline`, `Ellipse`, `ClipPath`, `Defs`, `LinearGradient`, `RadialGradient`. Every common icon library uses `Path` data that works directly in react-pdf.

## How to Use Icons in react-pdf

### Step 1: Find Path Data

Icon libraries publish their icons as SVG files. You need the `d` attribute from the `<path>` element inside each SVG. Here's where to find it:

- **Lucide** (https://lucide.dev): Open source, 1400+ icons, clean design. Click any icon, select "Copy SVG", extract the path data.
- **Heroicons** (https://heroicons.com): From the Tailwind team. 300+ icons in outline and solid variants.
- **Feather** (https://feathericons.com): 287 icons, minimal and consistent.

The raw SVG for Lucide's "check" icon looks like this:

```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
     viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 6 9 17l-5-5"/>
</svg>
```

The path data you need is: `M20 6 9 17l-5-5`

Note that Lucide/Feather use `stroke` rather than `fill`. This matters for your react-pdf icon component.

### Step 2: Create a Reusable Icon Component

```tsx
import React from "react";
import { Svg, Path } from "@react-pdf/renderer";

interface IconProps {
  d: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// For stroke-based icons (Lucide, Feather)
const StrokeIcon = ({
  d,
  size = 16,
  color = "#374151",
  strokeWidth = 2,
}: IconProps) => (
  <Svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <Path
      d={d}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLineCap="round"
      strokeLineJoin="round"
      fill="none"
    />
  </Svg>
);

// For fill-based icons (Heroicons solid, Material)
const FillIcon = ({
  d,
  size = 16,
  color = "#374151",
}: Omit<IconProps, "strokeWidth">) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path d={d} fill={color} />
  </Svg>
);

export { StrokeIcon, FillIcon };
```

### Step 3: Build an Icon Library

Create a file that exports named icon path data. This is your single source of truth for all icons used in the project. You'll probably start with five icons and end up with fifteen. That's fine -- the library grows with your project.

```tsx
// icons.ts

// Lucide icon paths (stroke-based, viewBox 0 0 24 24)
export const iconPaths = {
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  alertTriangle:
    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  info: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 16v-4M12 8h.01",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
  chevronRight: "m9 18 6-6-6-6",
  chevronDown: "m6 9 6 6 6-6",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  fileText:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  settings:
    "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
} as const;

export type IconName = keyof typeof iconPaths;
```

Some of these icons use multiple path commands separated into one continuous string. That works – `Path` in react-pdf handles compound paths the same way the browser SVG engine does.

For icons with multiple distinct `<path>` elements (common in some icon sets), you need to use a `G` group:

```tsx
import { Svg, Path, G } from "@react-pdf/renderer";

// Icon with multiple paths
const MultiPathIcon = ({ paths, size = 16, color = "#374151" }: {
  paths: string[];
  size?: number;
  color?: string;
}) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <G>
      {paths.map((d, i) => (
        <Path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={2}
          strokeLineCap="round"
          strokeLineJoin="round"
          fill="none"
        />
      ))}
    </G>
  </Svg>
);
```

### Step 4: Use Icons in Named Components

For ergonomic use throughout your document, wrap the generic icon in named components:

```tsx
import React from "react";
import { Svg, Path } from "@react-pdf/renderer";
import { iconPaths, IconName } from "./icons";

interface NamedIconProps {
  size?: number;
  color?: string;
}

const Icon = ({
  name,
  size = 16,
  color = "#374151",
}: NamedIconProps & { name: IconName }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path
      d={iconPaths[name]}
      stroke={color}
      strokeWidth={2}
      strokeLineCap="round"
      strokeLineJoin="round"
      fill="none"
    />
  </Svg>
);

export { Icon };
```

Usage becomes clean:

```tsx
<Icon name="check" size={14} color="#22c55e" />
<Icon name="alertTriangle" size={14} color="#f59e0b" />
<Icon name="info" size={14} color="#3b82f6" />
```

## Complete Examples

### Icons in Callout Boxes

```tsx
import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Icon } from "./Icon";

const tipBoxStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f0fdf4",
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e",
    borderRadius: 4,
    padding: 14,
    marginVertical: 12,
    gap: 10,
  },
  iconColumn: {
    paddingTop: 1,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#22c55e",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  body: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.5,
  },
});

const TipBox = ({ children }: { children: string }) => (
  <View style={tipBoxStyles.container}>
    <View style={tipBoxStyles.iconColumn}>
      <Icon name="check" size={14} color="#22c55e" />
    </View>
    <View style={tipBoxStyles.content}>
      <Text style={tipBoxStyles.label}>Tip</Text>
      <Text style={tipBoxStyles.body}>{children}</Text>
    </View>
  </View>
);

const WarningBox = ({ children }: { children: string }) => (
  <View
    style={[
      tipBoxStyles.container,
      { backgroundColor: "#fffbeb", borderLeftColor: "#f59e0b" },
    ]}
  >
    <View style={tipBoxStyles.iconColumn}>
      <Icon name="alertTriangle" size={14} color="#f59e0b" />
    </View>
    <View style={tipBoxStyles.content}>
      <Text style={[tipBoxStyles.label, { color: "#f59e0b" }]}>Warning</Text>
      <Text style={tipBoxStyles.body}>{children}</Text>
    </View>
  </View>
);
```

### Icons in Feature Lists

```tsx
const FeatureItem = ({ text }: { text: string }) => (
  <View style={{ flexDirection: "row", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
    <View style={{ paddingTop: 2 }}>
      <Icon name="check" size={12} color="#22c55e" />
    </View>
    <Text style={{ fontSize: 10.5, color: "#374151", flex: 1, lineHeight: 1.5 }}>
      {text}
    </Text>
  </View>
);

// Usage:
<View style={{ marginVertical: 16 }}>
  <FeatureItem text="Vector graphics that scale to any size" />
  <FeatureItem text="Brand-consistent colors on every icon" />
  <FeatureItem text="No internet connection required at render time" />
  <FeatureItem text="Identical rendering across all PDF viewers" />
</View>
```

### Icons in Table Headers

```tsx
const StatusCell = ({ status }: { status: "active" | "inactive" | "pending" }) => {
  const config = {
    active: { icon: "check" as const, color: "#22c55e", label: "Active" },
    inactive: { icon: "x" as const, color: "#ef4444", label: "Inactive" },
    pending: { icon: "info" as const, color: "#f59e0b", label: "Pending" },
  };
  const { icon, color, label } = config[status];
  return (
    <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
      <Icon name={icon} size={10} color={color} />
      <Text style={{ fontSize: 9, color }}>{label}</Text>
    </View>
  );
};
```

### Icons in Page Headers

```tsx
const PageHeader = ({ title, iconName }: { title: string; iconName: IconName }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      borderBottomWidth: 2,
      borderBottomColor: "#1a1a2e",
      paddingBottom: 12,
      marginBottom: 24,
    }}
  >
    <Icon name={iconName} size={20} color="#1a1a2e" />
    <Text style={{ fontSize: 22, fontFamily: "Helvetica-Bold", color: "#1a1a2e" }}>
      {title}
    </Text>
  </View>
);

// Usage:
<PageHeader title="System Settings" iconName="settings" />
<PageHeader title="Email Report" iconName="mail" />
```

## When Emojis ARE Acceptable

There are limited cases where emojis make sense:

- **Quick internal prototypes.** If you're generating a draft PDF for your own team to review and will never ship it to a client, emojis are fine. Speed matters more than polish.
- **Informal internal documents.** A fun team newsletter or internal recap that's meant to feel casual.
- **When your brand literally uses emoji.** Some brands – particularly those targeting younger audiences or operating in casual communication spaces – incorporate emoji into their visual identity. If your brand guide says "use emoji," use emoji.

Even in these cases, consider whether an SVG icon would serve the same purpose without the rendering inconsistencies.

## The Practical Tradeoff

The counter-argument to this chapter is: "Setting up an icon system takes time. Emojis work right now."

Fair. Here's the math:

- Building the `Icon` component and `icons.ts` file: 15-20 minutes
- Adding a new icon to the library: 2 minutes (find the SVG, copy the path data, add an entry)
- Total setup for 10-15 commonly used icons: about 40 minutes

That's a one-time investment. After that, every icon in every document renders perfectly, matches your colors, works offline, and looks identical in every PDF viewer. The 40 minutes pays for itself the first time you avoid debugging why an emoji shows up as a blank square in a client's PDF viewer.

## Telling Your AI to Use Icons

When prompting your AI agent, be explicit:

> "Do not use emoji characters anywhere in the document. For visual indicators, use the Icon component from ./Icon with icons from ./icons.ts. Available icons: check, x, alertTriangle, info, arrowRight, star, fileText, download, settings, mail. Use the appropriate icon with the matching semantic color from theme.ts."

If you don't say this, the AI will reach for emojis by default. It's the path of least resistance in its training data. You need to close that path and open the right one.
