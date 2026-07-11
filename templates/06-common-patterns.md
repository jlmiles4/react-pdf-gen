# Template: Common React-PDF Patterns & Workarounds

Reference for layout patterns that work in `@react-pdf/renderer` and fixes for what doesn't.

---

## Working Patterns

### Two-Column Layout
```tsx
<View style={{ flexDirection: 'row', gap: spacing.md }}>
  <View style={{ flex: 1 }}>
    <Text style={styles.body}>Left column</Text>
  </View>
  <View style={{ flex: 1 }}>
    <Text style={styles.body}>Right column</Text>
  </View>
</View>
```

### Three-Column "Grid"
CSS Grid is not supported. Use flexbox with explicit widths:
```tsx
<View style={{ flexDirection: 'row' }}>
  <View style={{ width: '33%', padding: 8 }}><Text>Col 1</Text></View>
  <View style={{ width: '33%', padding: 8 }}><Text>Col 2</Text></View>
  <View style={{ width: '33%', padding: 8 }}><Text>Col 3</Text></View>
</View>
```

### Card with Accent Border
```tsx
<View wrap={false} style={{
  borderWidth: 1,
  borderColor: colors.neutral[200],
  borderRadius: borders.radius.md,
  padding: spacing.lg,
  marginBottom: spacing.lg,
  backgroundColor: colors.neutral[50],
}}>
  <Text style={styles.h3}>Card Title</Text>
  <Text style={styles.body}>Card content here.</Text>
</View>
```

### Pull Quote
```tsx
<View wrap={false} style={{
  borderLeftWidth: 3,
  borderLeftColor: colors.accent[500],
  paddingLeft: spacing.lg,
  marginVertical: spacing.lg,
}}>
  <Text style={{
    ...typography.h3,
    fontStyle: 'italic',
    color: colors.primary[700],
  }}>
    "The quote text goes here."
  </Text>
</View>
```

### Checklist with Icons
```tsx
{items.map((item, i) => (
  <View key={i} wrap={false} style={{
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.neutral[100],
  }}>
    <CheckIcon size={12} color={colors.success} />
    <Text style={{ flex: 1, ...typography.body, color: colors.neutral[800] }}>{item}</Text>
  </View>
))}
```

### Horizontal Flow Diagram
```tsx
<View style={{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: spacing.md,
  backgroundColor: colors.neutral[50],
  borderRadius: borders.radius.md,
}}>
  {steps.map((step, i) => (
    <React.Fragment key={i}>
      {i > 0 && <Text style={{ fontSize: 16, color: colors.neutral[400] }}>→</Text>}
      <View style={{ alignItems: 'center', width: 80 }}>
        <Text style={{ fontSize: 18, fontFamily: fonts.heading, fontWeight: 700,
          color: colors.accent[500] }}>{i + 1}</Text>
        <Text style={{ fontSize: 9, fontFamily: fonts.bodyBold, fontWeight: 600,
          textAlign: 'center' }}>{step}</Text>
      </View>
    </React.Fragment>
  ))}
</View>
```

## What Doesn't Work (and Fixes)

### Drop Shadows
`box-shadow` is not supported. Fake it with asymmetric borders:
```tsx
<View style={{
  borderWidth: borders.medium,
  borderColor: colors.neutral[200],
  borderRadius: borders.radius.md,
  borderBottomWidth: borders.thick,
  borderRightWidth: borders.thick,
  borderBottomColor: colors.neutral[300],
  borderRightColor: colors.neutral[300],
  padding: spacing.lg,
  backgroundColor: colors.white,
}}>
  <Text>Card with faux shadow</Text>
</View>
```

### Gradient Backgrounds
CSS gradients don't work. Use SVG LinearGradient:
```tsx
import { Svg, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer';

<View style={{ position: 'relative', height: 100 }}>
  <Svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    viewBox={`0 0 ${page.contentWidth} 100`}>
    <Defs>
      <LinearGradient id="bg" x1="0" y1="0" x2={page.contentWidth} y2="0">
        <Stop offset="0%" stopColor={colors.primary[700]} />
        <Stop offset="100%" stopColor={colors.primary[500]} />
      </LinearGradient>
    </Defs>
    <Rect width={page.contentWidth} height="100" fill="url(#bg)" />
  </Svg>
  <Text style={{ color: colors.white, padding: spacing.lg }}>
    Content over gradient
  </Text>
</View>
```

### Text Wrapping Around Images
Float is not supported. Use side-by-side row:
```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <Image src="photo.png" style={{ width: 120, height: 90 }} />
  <View style={{ flex: 1 }}>
    <Text>Text beside the image, not wrapped around it.</Text>
  </View>
</View>
```

### Not Supported (No Workaround)
- CSS Grid (`grid-template-*`) — use flexbox with explicit widths
- `float` / `clear` — use flexDirection: 'row'
- `display: inline` / `block` / `table` — everything is flex
- `box-shadow` / `text-shadow` — use borders (see above)
- CSS animations / transitions — PDF is static
- `calc()` and CSS variables — use JS calculations (`@media` width/height/orientation queries are supported)
- Pseudo-selectors (`:hover`, `::before`) — not applicable to PDF

## Page Break Control

```tsx
// Prevent splitting across pages
<View wrap={false}>...</View>

// Keep heading with following content
<View wrap={false} minPresenceAhead={40}>...</View>

// Force page break before element
<View break>...</View>

// Repeat on every page (headers/footers)
<View fixed>...</View>
```

## Performance Tips
- Keep page files under 250 lines for AI context efficiency
- Use `StyleSheet.create()` over inline objects (memoized)
- Limit SVG complexity (simple icons, not illustrations)
- Register fonts once at startup, not per render
- Build time should be ~60ms per page — if slower, check image sizes
