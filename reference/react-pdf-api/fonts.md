# React-PDF Font Management Reference

> Source: `@react-pdf/renderer` – https://react-pdf.org/fonts

## Built-in Fonts

React-pdf ships with three font families available without registration:

| Family | Variants |
|--------|----------|
| **Courier** | Courier, Courier-Bold, Courier-Oblique, Courier-BoldOblique |
| **Helvetica** | Helvetica, Helvetica-Bold, Helvetica-Oblique, Helvetica-BoldOblique |
| **Times-Roman** | Times-Roman, Times-Bold, Times-Italic, Times-BoldItalic |

These are PDF standard fonts – they render without embedding any font data, which keeps file size small. But they look generic. For any professional deliverable, register custom fonts.

---

## Font.register() – Single Font

Register one font file at a time:

```tsx
import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  src: '/fonts/Inter-Regular.ttf',
});
```

After registration, reference it in styles:

```tsx
{
  fontFamily: 'Inter',
}
```

### Source Options

The `src` property accepts:

- **Local file path** (Node.js): `'/absolute/path/to/font.ttf'`
- **URL**: `'https://example.com/fonts/Inter-Regular.ttf'`
- **Relative path** (bundler-resolved): `'./fonts/Inter-Regular.ttf'`

```tsx
// From a URL
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5nw.woff',
});

// From local file
Font.register({
  family: 'Inter',
  src: path.resolve(__dirname, '../fonts/Inter-Regular.ttf'),
});
```

---

## Supported Font Formats

| Format | Supported | Notes |
|--------|-----------|-------|
| **TTF** (TrueType) | Yes | Recommended. Widest compatibility. |
| **WOFF** (Web Open Font Format) | Yes | Smaller file size than TTF. Works well. |
| **OTF** (OpenType) | **No** | Not supported. Convert to TTF first. |
| **WOFF2** | **No** | Not supported. Use WOFF or TTF. |
| **Variable fonts** | **No** | Not supported. You need individual static font files for each weight/style. |

If you have OTF or variable font files, convert them to static TTF files using a tool like [Transfonter](https://transfonter.org/) or FontForge before registering.

---

## Registering a Font Family with Multiple Weights and Styles

To use bold, italic, and other variants, register them under the same `family` name using the `fonts` array:

```tsx
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: '/fonts/Inter-Regular.ttf',
      fontWeight: 'normal',    // or 400
      fontStyle: 'normal',
    },
    {
      src: '/fonts/Inter-Medium.ttf',
      fontWeight: 'medium',    // or 500
      fontStyle: 'normal',
    },
    {
      src: '/fonts/Inter-SemiBold.ttf',
      fontWeight: 'semibold',  // or 600
      fontStyle: 'normal',
    },
    {
      src: '/fonts/Inter-Bold.ttf',
      fontWeight: 'bold',      // or 700
      fontStyle: 'normal',
    },
    {
      src: '/fonts/Inter-Italic.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: '/fonts/Inter-BoldItalic.ttf',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  ],
});
```

Then in styles, react-pdf selects the correct font file automatically:

```tsx
const styles = StyleSheet.create({
  normal: {
    fontFamily: 'Inter',
    fontWeight: 'normal',     // uses Inter-Regular.ttf
  },
  bold: {
    fontFamily: 'Inter',
    fontWeight: 'bold',       // uses Inter-Bold.ttf
  },
  italic: {
    fontFamily: 'Inter',
    fontStyle: 'italic',      // uses Inter-Italic.ttf
  },
  boldItalic: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontStyle: 'italic',      // uses Inter-BoldItalic.ttf
  },
});
```

### Font Weight Values

| String | Numeric |
|--------|---------|
| `'thin'` | 100 |
| `'ultralight'` | 200 |
| `'light'` | 300 |
| `'normal'` | 400 |
| `'medium'` | 500 |
| `'semibold'` | 600 |
| `'bold'` | 700 |
| `'ultrabold'` | 800 |
| `'heavy'` | 900 |

---

## Font Weight Fallback Behavior

If you request a weight that is not registered, react-pdf follows the browser/CSS fallback algorithm. For example, with only `normal` (400) and `bold` (700), a request for 500 resolves to 400 and a request for 600 resolves to 700.

This can produce unexpected results. Register every weight you plan to use to avoid ambiguity.

```tsx
// If only these two are registered:
//   400 (normal) and 700 (bold)
//
// fontWeight: 500 → falls back to 400
// fontWeight: 600 → falls back to 700
//
// To avoid surprises, register 500 and 600 explicitly.
```

---

## Font.registerHyphenationCallback()

Controls how react-pdf breaks words at line endings. By default, react-pdf uses a basic hyphenation algorithm. You can override it.

### Disable hyphenation entirely

```tsx
Font.registerHyphenationCallback((word) => [word]);
```

This tells react-pdf to never break a word – the whole word moves to the next line instead.

### Custom hyphenation with a library

```tsx
import Hyphenator from 'hyphen/en';

const hyphenate = async (word: string): Promise<string[]> => {
  const hyphenated = await Hyphenator(word);
  return hyphenated.split('\u00AD'); // soft hyphen character
};

// Note: registerHyphenationCallback expects a synchronous function
// that returns string[]. If you need async, pre-compute.
Font.registerHyphenationCallback((word) => {
  // Simple syllable-based splitting
  return word.split(/(?=[aeiou])/i).filter(Boolean);
});
```

### Character-level word breaking (for CJK or long strings)

```tsx
Font.registerHyphenationCallback((word) => {
  // Break on every character – useful for URLs, long identifiers,
  // or CJK text that doesn't use spaces
  return word.split('');
});
```

---

## Font.registerEmojiSource()

Enables emoji rendering by pointing to a CDN that serves emoji images.

```tsx
Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});
```

**Requirements:**
- Internet connection at PDF render time
- The CDN must be available
- Emoji images are fetched individually per unique emoji

**Parameters:**
- `format`: `'png'` – the image format the CDN provides
- `url`: Base URL for the emoji images. The emoji codepoint is appended as the filename.

**Practical concern:** If you're rendering PDFs on a server, you need outbound internet access to that CDN. If the CDN is down or slow, your PDF render will fail or hang. For production systems, consider hosting the emoji images locally or – better – use SVG icons instead of emojis (see `reference/design/icons-vs-emojis.md`).

---

## Complete Font Registration Example

A typical production setup with two font families:

```tsx
import { Font } from '@react-pdf/renderer';
import path from 'path';

const fontsDir = path.resolve(__dirname, '../assets/fonts');

// Primary font – for body text
Font.register({
  family: 'Inter',
  fonts: [
    { src: `${fontsDir}/Inter-Regular.ttf`, fontWeight: 'normal' },
    { src: `${fontsDir}/Inter-Medium.ttf`, fontWeight: 'medium' },
    { src: `${fontsDir}/Inter-SemiBold.ttf`, fontWeight: 'semibold' },
    { src: `${fontsDir}/Inter-Bold.ttf`, fontWeight: 'bold' },
    { src: `${fontsDir}/Inter-Italic.ttf`, fontWeight: 'normal', fontStyle: 'italic' },
    { src: `${fontsDir}/Inter-BoldItalic.ttf`, fontWeight: 'bold', fontStyle: 'italic' },
  ],
});

// Display font – for headings
Font.register({
  family: 'Playfair',
  fonts: [
    { src: `${fontsDir}/PlayfairDisplay-Regular.ttf`, fontWeight: 'normal' },
    { src: `${fontsDir}/PlayfairDisplay-Bold.ttf`, fontWeight: 'bold' },
    { src: `${fontsDir}/PlayfairDisplay-Italic.ttf`, fontWeight: 'normal', fontStyle: 'italic' },
  ],
});

// Monospace font – for code blocks
Font.register({
  family: 'JetBrainsMono',
  fonts: [
    { src: `${fontsDir}/JetBrainsMono-Regular.ttf`, fontWeight: 'normal' },
    { src: `${fontsDir}/JetBrainsMono-Bold.ttf`, fontWeight: 'bold' },
  ],
});

// Disable hyphenation globally
Font.registerHyphenationCallback((word) => [word]);
```

---

## Best Practices

1. **Bundle fonts locally for production.** Fetching fonts from URLs at render time adds latency and creates a failure point. Download the font files and include them in your project.

2. **Register all needed weights upfront.** Do it once at app initialization, before any component renders. If you register fonts inside a component, you risk race conditions.

3. **Use a dedicated font registration file.** Create a `registerFonts.ts` file that runs all `Font.register()` calls, then import it at the top of your entry point.

4. **Test with real content.** Some fonts have poor support for special characters, ligatures, or non-Latin scripts. Render a test PDF with your actual content before committing to a font.

5. **Check file sizes.** Variants actually used by rendered text are subset-embedded; registering a variant does not by itself guarantee it appears in the PDF. Inspect the finished artifact with `pdffonts`, and avoid carrying registrations you never intend to use.

6. **Use two font families maximum.** One for body text, one for headings. A monospace font for code blocks is optional but common. More than that creates visual noise.

7. **Register the weights you intend to render.** Fallback is deterministic, but it can still change hierarchy — with only `normal` and `bold`, `semibold` resolves to bold. Be explicit about what you register and use.
