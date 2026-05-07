# Prompt: Common React-PDF Patterns & Workarounds

Reference for layout patterns that work in `@react-pdf/renderer` and workarounds for what doesn't.

---

## What Works Well

### Two-Column Layout
```tsx
<View style={{ flexDirection: 'row', gap: spacing.md }}>
  <View style={{ flex: 1 }}>
    <Text style={styles.body}>Left column content</Text>
  </View>
  <View style={{ flex: 1 }}>
    <Text style={styles.body}>Right column content</Text>
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

### Card Pattern
```tsx
<View wrap={false} style={{
  borderWidth: 1,
  borderColor: colors.neutral[200],
  borderRadius: borders.radius.md,
  padding: spacing.lg,
  marginBottom: spacing.lg,
  backgroundColor: colors.neutral[50],
}}>
  <Text style={local.cardTitle}>Card Title</Text>
  <Text style={styles.bodySmall}>Card content here.</Text>
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

### Flow Diagram (Horizontal Steps)
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
      {i > 0 && <Text style={{ fontSize: 16, color: colors.neutral[400] }}>&rarr;</Text>}
      <View style={{ alignItems: 'center', width: 100 }}>
        <Text style={{ fontSize: 20, fontFamily: fonts.heading, fontWeight: 700, color: colors.accent[500] }}>{i + 1}</Text>
        <Text style={{ fontSize: 9, fontFamily: fonts.bodyBold, fontWeight: 600, color: colors.primary[700], textAlign: 'center' }}>{step}</Text>
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
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: 6,
  borderBottomWidth: 2,
  borderRightWidth: 2,
  borderBottomColor: '#D0D0D0',
  borderRightColor: '#D0D0D0',
  padding: 16,
  backgroundColor: '#FFFFFF',
}}>
  <Text>Card with faux shadow</Text>
</View>
```

### Gradient Backgrounds
CSS gradients don't work. Use an SVG LinearGradient:
```tsx
<View style={{ position: 'relative', height: 100 }}>
  <Svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} viewBox="0 0 504 100">
    <Defs>
      <LinearGradient id="bg" x1="0" y1="0" x2="504" y2="0">
        <Stop offset="0%" stopColor="#1A2D54" />
        <Stop offset="100%" stopColor="#2E4A82" />
      </LinearGradient>
    </Defs>
    <Rect width="504" height="100" fill="url(#bg)" />
  </Svg>
  <Text style={{ color: '#FFF', padding: 16 }}>Content over gradient</Text>
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

### Hover / Interactive Styles
PDF is static. No hover, focus, or animation. Design for print.

### overflow: hidden on rounded corners
Works for clipping child content within rounded containers. Useful for tables:
```tsx
<View style={{ borderRadius: borders.radius.md, overflow: 'hidden' }}>
  {/* Children are clipped to rounded corners */}
</View>
```

## Page Break Control

### Prevent Element Splitting
```tsx
<View wrap={false}>
  {/* This entire block stays on one page */}
</View>
```

### Keep Heading With Content
```tsx
<View wrap={false} minPresenceAhead={40}>
  {/* Won't render at bottom of page unless 40pt of space follows */}
</View>
```

### Force Page Break
```tsx
<View break>
  {/* Starts on a new page */}
</View>
```

## Performance Tips
- Keep page files under 250 lines for AI context window efficiency
- Use `StyleSheet.create()` over inline objects — it's memoized
- Limit SVG complexity (simple icons, not illustrations)
- Prefer text over images where possible
- Build time scales linearly with page count (~60ms per page is good)
