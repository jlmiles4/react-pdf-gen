# Chapter 6: Avoiding AI Slop

You asked your AI agent to generate a PDF. It gave you something. You rendered it, opened the file, and felt... nothing. It looks like every other AI-generated document you've seen. Generic. Flat. Forgettable.

That's AI slop. And you're shipping it if you don't know what to look for.

This chapter is opinionated. It names the specific anti-patterns, shows you what they look like in code, and gives you the fix for each one. By the end, you'll have a quality bar that separates "technically a PDF" from "someone would pay money for this."

## What AI Slop Looks Like

Open any AI-generated PDF that wasn't built with a design system. You'll see most of these:

- **Default Helvetica everywhere.** No font registration, no typographic personality. The document screams "I didn't try."
- **No visual hierarchy.** Every piece of text is 12pt. Headings are just bold 12pt. Nothing guides the eye.
- **Walls of text.** Long paragraphs with no breaks, no callout boxes, no lists, no breathing room.
- **Generic centered titles.** A big centered heading at the top of every page with no weight, no color, no decorative element. Just `textAlign: 'center'` and `fontSize: 24`.
- **Random colors.** The AI picks colors that "seem right" – a blue here, a green there, a red accent – with no palette connecting them.
- **Lorem ipsum left in.** Placeholder text that made it to the final render. This happens more than you'd think.
- **Emojis as icons.** Stars, checkmarks, warning signs – all rendered as raster emoji images at one fixed resolution, looking different in every PDF viewer.
- **No whitespace.** Content crammed edge-to-edge, margins set to 20pt, no gap between sections.
- **Inconsistent spacing.** 16pt gap here, 8pt there, 24pt somewhere else – with no system behind it.
- **Orphaned lines.** A single line of a paragraph sitting alone at the top of a new page.

If your PDF has three or more of these, it's slop.

## Root Causes

AI slop doesn't happen because the AI is bad at generating code. It happens because of how you asked.

**Lazy prompts.** "Make me a PDF report" gives the AI zero constraints. It will produce the most average, median output from its training data – which is exactly what generic looks like.

**No design system provided.** Without explicit colors, fonts, and spacing values, the AI guesses. Its guesses are safe, boring, and inconsistent.

**No visual QA loop.** You accepted the first output without rendering it, looking at it, and asking "does this look good?" The AI can't see the PDF it generated. Neither can you, until you render it.

**Accepting the first draft.** This deserves its own section.

## The First Draft Problem

Here's the truth about AI-generated PDFs: the first output is a rough draft. Always. Even with a good prompt, even with a design system, even with a well-structured project.

The first draft gets you:

- Correct structure (components, props, hierarchy)
- Approximate layout (the right elements in roughly the right places)
- Functional code (it compiles, it renders)

The first draft does not get you:

- Precise spacing (gaps that feel right, not just "not zero")
- Visual balance (elements weighted correctly on the page)
- Typographic refinement (line heights, letter spacing, font size ratios that create hierarchy)
- Edge case handling (what happens when a title wraps to two lines, when data is longer than expected)

You need 2-4 iterations to go from rough draft to premium. Plan for that. Budget the time. If you're only running one pass, you're shipping a rough draft.

## Anti-Patterns and Fixes

### Anti-Pattern 1: Generic Centered Titles

What the AI produces by default:

```tsx
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
});

const Page01 = () => (
  <Page size="LETTER" style={{ padding: 40 }}>
    <Text style={styles.title}>Quarterly Report</Text>
    {/* rest of content */}
  </Page>
);
```

The problem: no visual weight, no color, no supporting elements. It looks like a Word document from 2004.

**The fix:** Give the title actual presence.

```tsx
const styles = StyleSheet.create({
  titleBlock: {
    marginBottom: 32,
    borderBottomWidth: 3,
    borderBottomColor: "#1a1a2e",
    paddingBottom: 16,
  },
  titleLabel: {
    fontSize: 10,
    fontFamily: "Helvetica",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#6b7280",
    marginBottom: 6,
  },
  titleText: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a2e",
  },
  titleSub: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 6,
  },
});

const Page01 = () => (
  <Page size="LETTER" style={{ padding: 48 }}>
    <View style={styles.titleBlock}>
      <Text style={styles.titleLabel}>Q4 2025</Text>
      <Text style={styles.titleText}>Quarterly Report</Text>
      <Text style={styles.titleSub}>Prepared for the Board of Directors</Text>
    </View>
    {/* rest of content */}
  </Page>
);
```

What changed: the title is now a block with a label above, a subtitle below, a border to separate it from content, and specific spacing. It has weight. It has hierarchy. It has intention.

### Anti-Pattern 2: All Text One Size

```tsx
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginBottom: 8,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
});

// Everything is 12pt. "Headings" are just bold.
<View>
  <Text style={[styles.text, styles.bold]}>Section Title</Text>
  <Text style={styles.text}>Body text goes here.</Text>
  <Text style={[styles.text, styles.bold]}>Another Section</Text>
  <Text style={styles.text}>More body text.</Text>
</View>
```

**The fix:** Establish a type scale with at least 3 distinct sizes.

```tsx
const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  h2: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a2e",
    marginTop: 24,
    marginBottom: 8,
  },
  h3: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    marginTop: 16,
    marginBottom: 6,
  },
  body: {
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: 8,
  },
  caption: {
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#6b7280",
    lineHeight: 1.4,
  },
});
```

You now have 5 levels: 24pt, 16pt, 13pt, 10.5pt, 9pt. Each serves a purpose. The reader's eye knows where to go first.

### Anti-Pattern 3: Random Colors

```tsx
// The AI picks colors that "look fine" individually
const heading = { color: "#2196F3" };      // Material Blue
const accent = { backgroundColor: "#4CAF50" }; // Material Green
const highlight = { color: "#FF5722" };     // Material Deep Orange
const border = { borderColor: "#9C27B0" };  // Material Purple
```

Four colors from four different families. No relationship between them. It looks like a children's birthday party.

**The fix:** Define 3-5 core color roles, use tonal shades deliberately, and reserve semantic colors for meaning.

```tsx
const colors = {
  primary: "#1a1a2e",     // Deep navy – headings, borders, emphasis
  secondary: "#3b82f6",   // Blue – links, accents, icons
  text: "#374151",        // Dark gray – body text
  muted: "#6b7280",       // Medium gray – captions, labels
  surface: "#f8fafc",     // Light gray – card backgrounds, alternating rows
  border: "#e5e7eb",      // Border gray
  white: "#ffffff",       // Page background
};
```

Seven values. That's it. Every component in your document pulls from this object. When the AI reaches for a color, it has exactly these options.

### Anti-Pattern 4: Cramming Too Much on One Page

```tsx
<Page size="LETTER" style={{ padding: 20 }}>
  <Text style={{ fontSize: 20 }}>Report Title</Text>
  <Text style={{ fontSize: 10 }}>{longParagraph1}</Text>
  <Text style={{ fontSize: 10 }}>{longParagraph2}</Text>
  <Text style={{ fontSize: 10 }}>{longParagraph3}</Text>
  {/* table with 30 rows */}
  <Text style={{ fontSize: 10 }}>{longParagraph4}</Text>
  {/* another table */}
  <Text style={{ fontSize: 10 }}>{longParagraph5}</Text>
</Page>
```

Padding of 20pt is 0.28 inches. That's almost no margin. Combined with dense text, the page feels suffocating.

**The fix:** Use real margins and let content flow to the next page.

```tsx
<Page size="LETTER" style={{ padding: 48 }} wrap>
  <View style={styles.titleBlock}>
    <Text style={styles.h1}>Report Title</Text>
  </View>

  <View style={{ marginBottom: 24 }}>
    <Text style={styles.body}>{paragraph1}</Text>
  </View>

  <View style={{ marginBottom: 24 }}>
    <Text style={styles.h2}>Analysis</Text>
    <Text style={styles.body}>{paragraph2}</Text>
  </View>

  {/* Table in its own section with space above and below */}
  <View style={{ marginBottom: 24 }} wrap={false}>
    <DataTable rows={tableData} />
  </View>

  <View style={{ marginBottom: 24 }}>
    <Text style={styles.h2}>Recommendations</Text>
    <Text style={styles.body}>{paragraph3}</Text>
  </View>
</Page>
```

Key changes:

- Padding is 48pt (0.67 inches) – actual margins
- Each section has 24pt of space below
- `wrap` is enabled on the page so content flows to the next page
- `wrap={false}` on the table keeps it from splitting mid-row
- Content is broken into logical sections, not dumped as a stream

### Anti-Pattern 5: No Breathing Room

```tsx
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 10,
  },
});

<View style={styles.card}>
  <Text style={styles.cardText}>Key metric: 47% increase in conversion rate</Text>
</View>
```

No padding inside the card. 4pt margin between cards. The border is touching the text. It looks cramped and cheap.

**The fix:**

```tsx
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f8fafc",
  },
  cardLabel: {
    fontSize: 9,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a2e",
  },
});

<View style={styles.card}>
  <Text style={styles.cardLabel}>Conversion Rate</Text>
  <Text style={styles.cardValue}>47% increase</Text>
</View>
```

16pt padding gives the content room to breathe. 12pt margin between cards creates visible separation. The background color and radius make it feel like an actual design element, not a box drawn around text.

## The Iteration Workflow

Here's the loop that produces premium output:

1. **Generate.** Prompt your AI to build the page component. Provide the design tokens, a description of the content, and a reference to an existing page if you have one.

2. **Render.** Run your build script to produce the PDF. Time varies with page count, assets, hardware, and cache state.

3. **Export to PNG.** Convert the PDF page to a 300 DPI image. (Chapter 9 covers the tooling for this.)

4. **Review.** Look at the PNG. Actually look at it. Open it full-screen. Ask yourself:
   - Is there enough whitespace?
   - Can I tell the heading from the body at a glance?
   - Does the spacing feel consistent?
   - Would I be comfortable sending this to a client?

5. **Prompt corrections.** Be specific. Don't say "make it look better." Say:
   - "Increase the marginBottom on the section headings from 8pt to 16pt."
   - "The card backgrounds are too dark – change from #e5e7eb to #f8fafc."
   - "Add a 3pt left border in #3b82f6 to each callout box."
   - "The gap between the title and the first paragraph needs to be at least 24pt."

6. **Repeat.** Steps 2-5, usually 2-3 more times.

This loop is not optional. Skipping it is how you ship slop.

### Using AI in the Review Step

You can feed the exported PNG back to a multimodal AI and ask it to evaluate the design. Good review prompts:

- "Look at this PDF page. Is the spacing between sections consistent? Are any elements too close together or too far apart?"
- "Does this page have clear visual hierarchy? Can you identify heading, subheading, body text, and caption levels?"
- "Are the colors used consistently? Does any element use a color that doesn't match the rest of the palette?"

The AI won't catch everything a designer would. But it catches the obvious problems – and obvious problems are what make slop look like slop.

## Quality Signals

These are the markers that separate premium from generic. When reviewing your output, check for each one:

### Intentional Whitespace

Every gap between elements should be a deliberate multiple of your spacing unit. If your base unit is 8pt:

- Between paragraphs: 8pt or 16pt
- Between sections: 24pt or 32pt
- Page padding: 48pt (6 units)
- Inside cards: 16pt

If you see a 13pt gap somewhere, that's accidental. Fix it.

### Visual Hierarchy (3+ Distinct Text Sizes)

Your document needs at minimum:

| Level | Purpose | Example Size |
|-------|---------|-------------|
| Display | Page/chapter titles | 24-32pt |
| Heading | Section headings | 14-18pt |
| Body | Main content | 10-11pt |
| Caption | Labels, footnotes, metadata | 8-9pt |

If everything is the same size, there's no hierarchy. If you have more than 6 distinct sizes, it's chaotic. Aim for 4-5 sizes used consistently.

### Color Used for Meaning

Every color in your document should have a job:

- Primary color marks headings, borders, and emphasis elements
- Accent color marks interactive elements (links) or highlights
- Text color is for body copy
- Muted color is for secondary information
- Surface color is for backgrounds that differentiate sections

If a color appears once and never again, it's decoration, not design. Remove it or assign it a role.

### Consistent Component Patterns

Every callout box should look the same. Every table should use the same header style. Every bullet list should have the same indent and marker style.

If your AI generated three callout boxes and they each use different padding, different border widths, and different background colors – that's slop. Extract a shared component and use it everywhere.

### Proper Page Breaks

No orphaned lines (a single line of a paragraph at the top of a new page). No widowed lines (a single line of a paragraph at the bottom of a page, with the rest continuing on the next page).

react-pdf gives you `orphans` and `widows` props on `<Text>`:

```tsx
<Text style={styles.body} orphans={3} widows={3}>
  {longParagraph}
</Text>
```

This ensures at least 3 lines stay together at the bottom and top of page breaks. Set this on every body text element.

Use `wrap={false}` on elements that should never split across pages:

```tsx
<View wrap={false} style={styles.card}>
  <Text style={styles.cardTitle}>Key Metric</Text>
  <Text style={styles.cardBody}>This card stays on one page.</Text>
</View>
```

Use `break` to force a page break before a section:

```tsx
<View break style={styles.section}>
  <Text style={styles.h1}>New Chapter</Text>
</View>
```

## The "Would You Pay For This?" Test

Open your rendered PDF. Pretend you didn't make it. Pretend someone is selling it to you for $30.

Would you buy it?

If the answer is "no" or "maybe," identify exactly why. The answer is almost always one of:

- It looks generic (no typographic personality, default fonts)
- It feels cheap (cramped spacing, no visual variety)
- It's hard to scan (no hierarchy, walls of text)
- It's inconsistent (different styling for similar elements)

Each of those maps to a specific fix. Apply the fix. Render again. Ask the question again.

## Writing Prompts That Produce Premium Output

The difference between slop and premium often starts with the prompt. Here's what to include:

### Be Specific About Measurements

Bad:
> "Add some padding to the cards."

Good:
> "Set card padding to 16pt on all sides. Set marginBottom between cards to 12pt. Add a 3pt left border in color #3b82f6."

### Reference Existing Pages

Bad:
> "Make a new page for the financial summary."

Good:
> "Create a new page component for the financial summary. Match the layout and styling of Page03 (the metrics overview page). Use the same card component, the same heading sizes, and the same spacing values. The content is: [specific content here]."

### Describe the Visual Result

Bad:
> "Make it look professional."

Good:
> "The page should have a full-width dark blue (#1a1a2e) header bar, 48pt tall, with white text for the section title left-aligned at 16pt. Below that, 24pt of space, then two columns of metric cards – 3 cards per column, each card using the cardStyle from theme.ts. The cards should use the surface background color with a subtle border."

### Provide the Constraints

Bad:
> "Use nice colors."

Good:
> "Use only the colors defined in theme.ts: primary (#1a1a2e), secondary (#3b82f6), text (#374151), muted (#6b7280), surface (#f8fafc), border (#e5e7eb), white (#ffffff). Do not introduce any colors not in this list."

### Specify What Not To Do

This is underrated. AIs are good at following negative constraints:

> "Do not use emojis. Do not center body text. Do not use more than 3 font sizes on this page. Do not set any margin or padding to less than 8pt. Do not use color for decoration – only for meaning (headings, accents, status indicators)."

## Prompting Patterns for PDF Generation

The prompts that produce the best react-pdf output follow repeatable structures. These templates encode the constraints and context that prevent slop before it starts.

### Prompt Template: New Page

When you need a new page added to your document, this template gives the AI everything it needs on the first pass:

```
Build a new ContentPage for [TOPIC].

Reference: src/pages/[EXISTING_PAGE].tsx for structure and import patterns.
Design tokens: src/styles/theme.ts (use ONLY these colors, spacing, fonts).
Components available: SectionHeading, BulletList, CodeBlock, TipBox, Table, WarningBox.

Requirements:
- Use ContentPage wrapper with sectionTitle="[SECTION]"
- Import styles from '../styles/shared'
- All Text components need explicit fontFamily + fontWeight
- Add wrap={false} to any element that must not split across pages
- No Helvetica, no emoji, no hardcoded colors
```

The key is the negative constraints at the end. Without them, the AI defaults to its training distribution — which includes millions of examples using Helvetica, emoji, and inline hex values.

### Prompt Template: Layout Fix

Post-render corrections are where most iteration time goes. This template focuses the AI on what's wrong without re-explaining the entire project:

```
Fix the layout issue on [PAGE_FILE].

Problem: [DESCRIBE WHAT YOU SEE — e.g., "heading orphaned at page bottom", "callout box split across pages", "two-column layout stacking vertically"]

Current code at line [N]: [PASTE 5-10 RELEVANT LINES]

Constraints:
- Do not change content, only layout
- Do not remove existing wrap={false} props
- On a wrapping Page, use minPresenceAhead={40} for orphaned headings; on a fixed page, rebalance or split the source
- Check flexDirection is 'row' for side-by-side layouts
```

Notice the structure: what's wrong, where it is, and what NOT to change. This prevents the AI from "fixing" your layout by rewriting the entire component.

### Prompt Template: Design Iteration

After the first pass looks roughly right, this template drives refinement:

```
Review [PAGE_FILE] against these quality checks:

1. Spacing: Are all gaps using spacing tokens (spacing.xs through spacing.xl)? No arbitrary values?
2. Typography: Does every Text have fontFamily + fontWeight? Is there clear hierarchy (h2 > h3 > body)?
3. Color: Are all colors from the theme? No hardcoded hex values?
4. Page breaks: Will any element split awkwardly? Add wrap={false} where needed.
5. Consistency: Does this page match the visual style of [REFERENCE_PAGE]?

Make only the changes needed to pass these checks. Do not restructure the component.
```

### The Negative Constraint Pattern

The most effective single technique for preventing AI slop is telling the model what NOT to do. LLMs generate text by predicting the most likely next token — and the most likely patterns include every bad habit in their training data.

Negative constraints override those defaults:

- "No Helvetica" prevents font fallback (the #1 slop signal in PDF output)
- "No emoji" forces SVG icon usage, which looks professional instead of playful
- "No hardcoded colors" forces theme token usage, which maintains consistency
- "Do not add features beyond what's listed" prevents scope creep that breaks layout
- "Do not restructure the component" prevents well-meaning rewrites that introduce bugs

Three or four negative constraints at the end of a prompt consistently produce cleaner output than twice as many positive instructions. The AI already knows how to build components — your job is to fence off the common failure modes.

A worked example:

Without negative constraints:
> "Build a TipBox component for react-pdf"
Result: Uses Helvetica, hardcodes #f0f0f0 background, adds emoji icon, wraps text in nested Views unnecessarily.

With negative constraints:
> "Build a TipBox component for react-pdf. Use Inter font (fontWeight 400 for body, 600 for label). Import colors from theme.ts — no hardcoded hex values. Use SVG icon, not emoji. Add wrap={false} to the outer View. Do not nest Views unnecessarily."
Result: Clean component matching the design system on the first pass.

The difference isn't that the second prompt is longer. It's that the second prompt closes the escape hatches the AI would otherwise use.

## The Slop Checklist

Before you ship, run through this list. If you check any box, you have more work to do:

- [ ] Any text using the default Helvetica that should use a custom font
- [ ] Any two consecutive elements with inconsistent spacing
- [ ] Any color not in your defined palette
- [ ] Any page with only one text size
- [ ] Any page with less than 40pt of padding on all sides
- [ ] Any callout box, table, or card that looks different from others of the same type
- [ ] Any emoji character in the document
- [ ] Any lorem ipsum or placeholder text
- [ ] Any page where a single line sits alone at the top or bottom
- [ ] Any section heading that looks the same as body text

Zero checks = ready to ship. Any checks = back to the iteration loop.

## Summary

AI slop is the default output. Premium is the iterated output. The difference between them is:

- A defined color palette (not random picks)
- A type scale with 4-5 sizes (not everything at 12pt)
- Consistent spacing using a base unit (not arbitrary values)
- Components reused for similar elements (not one-off styling)
- 2-4 iterations with visual review (not first-draft-and-ship)
- Specific prompts with measurements (not vague adjectives)

The AI can produce premium output. But it won't do it unprompted. You have to define what premium looks like, give it the constraints, and iterate until it gets there.
