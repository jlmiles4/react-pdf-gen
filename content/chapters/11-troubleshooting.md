# Chapter 11: Troubleshooting & Common Errors

The errors you'll hit, why they happen, and how to fix them fast. This chapter covers the top 8 react-pdf issues and a systematic debug workflow.

## 1. "Text string must be rendered inside a `<Text>` component"

The most common react-pdf crash. Raw strings placed directly inside a `View` (or any non-Text component) cause the renderer to fail.

```tsx
// Broken — raw string inside View
<View>
  This will crash
</View>

// Fixed — wrap in Text
<View>
  <Text style={styles.body}>This renders correctly</Text>
</View>
```

Every piece of visible text must be wrapped in a `<Text>` component. This includes string interpolation, conditional text, and array items rendered with `.map()`.

## 2. Fonts Not Loading

**Symptom:** Text renders in Helvetica instead of your registered font, or shows blank where custom fonts should appear.

Font issues are silent — react-pdf falls back to Helvetica without warning. Common causes:

- **Wrong file path**: Use a resolved base directory, not relative paths from components
- **Unregistered weight**: Using `fontWeight: 600` but only registering 400 and 700
- **Mismatched fontFamily name**: The `fontFamily` in your style must exactly match the `family` in `Font.register()`

```tsx
// Check 1: Is the path correct? Use a resolved base dir.
const FONTS_DIR = path.resolve(__dirname, '../fonts');
Font.register({ family: 'Inter', fonts: [
  { src: path.join(FONTS_DIR, 'Inter-Regular.ttf'), fontWeight: 400 },
  { src: path.join(FONTS_DIR, 'Inter-Bold.ttf'), fontWeight: 700 },
]});

// Check 2: Does fontWeight match a registered weight?
// This falls back to Helvetica — weight 600 isn't registered:
<Text style={{ fontFamily: 'Inter', fontWeight: 600 }}>Oops</Text>
```

## 3. Content Overflows the Page

**Symptom:** Content runs off the bottom of the page, disappearing below the margin.

Two common causes:
- A parent `View` has `wrap={false}` (preventing page breaks)
- Fixed heights constrain the layout

```tsx
// Problem: wrap={false} prevents page breaks
<View wrap={false} style={{ minHeight: 800 }}>
  {/* Content can't split — overflows the page */}
</View>

// Fix: wrap the parent, lock individual items
<View> {/* wrap={true} is default */}
  {items.map((item, i) => (
    <View key={i} wrap={false}> {/* Each item stays together */}
      <Text style={styles.body}>{item}</Text>
    </View>
  ))}
</View>
```

## 4. Orphaned Headings

**Symptom:** A section heading appears at the very bottom of a page with no content following it.

```tsx
// Fix: add minPresenceAhead to heading wrapper
<View wrap={false} minPresenceAhead={40}>
  <Text style={styles.h2}>Section Title</Text>
</View>
```

`minPresenceAhead={40}` tells react-pdf: "Only render this heading on the current page if at least 40pt of content can fit below it." Otherwise, move it to the next page.

## 5. Split Callout Boxes

**Symptom:** A colored callout box splits across a page break — top half has the background color, bottom half on the next page appears without it.

The TipBox, WarningBox, and InfoBox components in this book already include `wrap={false}` internally. If you build custom callouts, add `wrap={false}` to the outer View:

```tsx
// The TipBox component already handles this:
<TipBox label="My Tip">
  Keep callout text concise — 2-3 sentences max.
</TipBox>

// For custom callouts, add wrap={false} yourself:
<View wrap={false} style={styles.tipBox}>
  <Text style={styles.tipLabel}>Custom Callout</Text>
  <Text style={styles.body}>Content here.</Text>
</View>
```

If a callout is too tall for one page, split the content into two shorter callout boxes rather than allowing a page break mid-box.

## 6. Styles Not Applying

**Symptom:** CSS-like styles that work in the browser have no effect in react-pdf.

react-pdf supports a subset of CSS. Property names must be camelCase. Common mismatches:

| Web CSS | react-pdf Equivalent |
|---------|---------------------|
| `box-shadow` | Not supported — use `borderWidth` + `borderColor` |
| `text-decoration` | `textDecoration` (underline only) |
| `background: linear-gradient(...)` | Not supported — use `Svg` + `Defs` |
| `display: grid` | Not supported — use flexbox |
| `overflow: hidden` | Not supported on Text |
| `font-weight: bold` | `fontWeight: 700` (numeric only) |

## 7. Flexbox Layout Surprises

**Symptom:** Elements stack vertically when you expect them side-by-side.

react-pdf uses Yoga (React Native's layout engine), not browser CSS. The key difference: **the default `flexDirection` is `"column"`, not `"row"`**.

```tsx
// Gotcha: default is column (vertical stacking)
<View> {/* flexDirection: 'column' is implied */}
  <View style={{ width: '50%' }} /> {/* stacks vertically */}
  <View style={{ width: '50%' }} />
</View>

// Fix: explicitly set row direction
<View style={{ flexDirection: 'row' }}>
  <View style={{ width: '50%' }} /> {/* side by side */}
  <View style={{ width: '50%' }} />
</View>
```

Other gotchas:
- Percentage widths require the parent to have an explicit width
- `gap` is supported but `rowGap`/`columnGap` may not work as expected
- `alignItems` defaults to `stretch`, not `flex-start`

## 8. Build & Memory Errors

**Symptom:** Build crashes with "JavaScript heap out of memory."

```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096 pnpm build

# Or add to package.json scripts:
"build": "NODE_OPTIONS=--max-old-space-size=4096 tsx src/build.tsx"
```

Prevention:
- Resize images to actual display size before embedding (2x for retina)
- Use JPEG for photos (quality 80), PNG only for graphics with transparency
- For 50+ page documents, consider splitting into multiple PDF files

## The Debug Workflow

When something looks wrong in your PDF, follow this sequence:

1. **Simplify**: Comment out everything except the broken section. Does it still break in isolation?
2. **Isolate**: Move the broken component into a standalone single-page document. Render it alone.
3. **Check wrap**: Add `wrap={false}` to containers that should stay together, remove it from containers that need to split.
4. **Check fonts**: Temporarily switch to `fontFamily: "Helvetica"` to rule out font issues.
5. **Check styles**: Log style objects to console. Are values what you expect? Are you using camelCase?
6. **Rebuild incrementally**: Add sections back one at a time until the break reappears. That's your culprit.

**The fastest fix:** Most react-pdf layout issues come from three sources: missing `wrap={false}` on elements that should stay together, missing `<Text>` wrappers around strings, and `flexDirection` defaulting to `column`. Check these three things first.

## Closing the Loop

Chapter 1 made a claim: the gap between "AI-generated PDF" and "premium deliverable" is a matter of specific patterns, not talent or luck. This chapter is proof. Every error above has a concrete fix. Every fix maps back to the patterns from earlier chapters — design tokens that prevent style drift, wrap props that control page breaks, file-per-page architecture that isolates problems.

The debug workflow isn't something you do when things go wrong. It's the last step in the build loop: write, render, export, review, fix. When that loop is fast — and with react-pdf and PNG export, it's very fast — you stop fearing bugs and start shipping.
