# Prompt: PDF Quality Checklist

Use this prompt after building a PDF to verify it meets premium quality standards.

---

## Visual QA Workflow

```bash
# 1. Build the PDF
pnpm build

# 2. Export to PNG for visual review
pnpm export

# 3. Review every page image in output/pages/
# Look for each issue below
```

## Critical Issues (Must Fix)

### Orphaned Elements
- [ ] No heading (gold bar) appearing alone at bottom of a page without content below
- [ ] No bullet dot appearing without its text
- [ ] No callout box split across pages (empty colored box fragment)
- [ ] No table header row separated from its data
- [ ] No code block split across pages

**Fix:** Keep the element together with `wrap={false}`. On wrapping pages, add `minPresenceAhead={40}` to headings; on fixed pages, rebalance or split the source page.

### Page Overflow
- [ ] TOC fits on a single page
- [ ] No blank pages caused by overflow
- [ ] No single orphaned line on an otherwise empty page

**Fix:** Reduce spacing, tighten content, or restructure to fill pages naturally.

### Font Consistency
- [ ] No Helvetica or Arial visible anywhere (check rendered output, not code examples)
- [ ] All bold text appears properly bold (fontWeight is being applied)
- [ ] No missing characters or font fallback squares

**Fix:** Ensure every `fontFamily` has a matching `fontWeight`. Verify font files are registered.

## Premium Quality Checks

### Typography
- [ ] Custom font registered (not default Helvetica)
- [ ] 3+ distinct text sizes with clear hierarchy
- [ ] Consistent heading styles across all pages
- [ ] Body text readable (10-12pt) with adequate line height (1.5-1.6)
- [ ] Code blocks in monospace font with background

### Color & Visual
- [ ] Color palette limited to 3-5 intentional colors
- [ ] Primary color for headings and structural elements
- [ ] Accent color for highlights and callout borders
- [ ] Neutral scale for body text and borders
- [ ] Color carries meaning, not decoration

### Layout & Spacing
- [ ] Generous page margins (50-70pt)
- [ ] Consistent spacing scale throughout
- [ ] Pages don't feel cramped — whitespace is intentional
- [ ] Visual breaks between major sections

### Structure
- [ ] Cover page with strong visual identity
- [ ] Table of contents with chapter listing
- [ ] Page numbers on every content page
- [ ] Headers with section context
- [ ] Footer with branding
- [ ] Chapter title pages with distinct design

### Components
- [ ] Callout boxes for tips, warnings, and notes
- [ ] Styled code blocks with language labels
- [ ] Professional tables with header rows
- [ ] SVG icons (not emojis)
- [ ] Bullet lists with consistent formatting
- [ ] Document metadata set (title, author, subject)

## The Quick Tests

1. **Squint test:** Step back, squint. Can you see clear visual hierarchy? If it blurs to gray, needs more contrast.
2. **Scroll test:** Flip through all pages. Does it feel like one cohesive document?
3. **Share test:** Would you be proud if someone you respect saw this with your name on it?
4. **Comparison test:** Hold it next to a professionally published PDF. Where does yours fall short?

## AI Visual Review Prompt

After exporting to PNG, use this prompt with an AI vision model:

```
Review this PDF page image. Check for:
1. Are all elements properly aligned?
2. Is there consistent spacing between sections?
3. Are there any orphaned elements (heading without content, bullet without text)?
4. Does the visual hierarchy feel clear (headings > subheadings > body)?
5. Is the page density appropriate (not too cramped, not too sparse)?
6. Any visual issues: broken borders, misaligned columns, overlapping text?

Be specific about locations: "The heading on the left side at approximately 40% down the page..."
```
