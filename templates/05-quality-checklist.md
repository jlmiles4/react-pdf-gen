# Template: PDF Quality Checklist

Run through this checklist after building your PDF to verify it meets professional standards.

---

## Visual QA Workflow

```bash
# 1. Build the PDF
pnpm build

# 2. Export to PNG for visual review (requires poppler-utils)
pnpm export

# 3. Review every page image in output/pages/
# Or feed specific pages to an AI vision model for automated review
```

## Critical Issues (Must Fix Before Shipping)

### Orphaned Elements
- [ ] No heading appearing alone at page bottom without content below it
- [ ] No bullet dot / list marker appearing without its text
- [ ] No callout box split across pages (empty colored box fragment)
- [ ] No table header row separated from its data
- [ ] No code block split across pages

**Fix:** Keep the element together with `wrap={false}`. On wrapping pages, add `minPresenceAhead={40}` to headings; on fixed pages, rebalance or split the source page.

### Page Overflow
- [ ] No blank or near-blank pages caused by a single overflowing element
- [ ] No single orphaned line on an otherwise empty page

**Fix:** Tighten spacing on the previous page, reduce content, or restructure.

### Font Consistency
- [ ] No default Helvetica visible anywhere in rendered output
- [ ] All bold text renders properly bold (fontWeight is being applied)
- [ ] No missing characters or fallback squares

**Fix:** Ensure every `fontFamily` has a matching `fontWeight`. Verify .ttf files exist and are registered.

## Premium Quality Checks

### Typography
- [ ] Custom font registered (not default Helvetica/Arial)
- [ ] 3+ distinct text sizes with clear hierarchy
- [ ] Consistent heading styles across all pages
- [ ] Body text readable (10-12pt) with adequate line height (1.5-1.6)
- [ ] Code blocks in monospace font with contrasting background

### Color & Visual
- [ ] Color palette limited to 3-5 intentional colors
- [ ] Primary color for headings and structural elements
- [ ] Accent color for highlights and callout borders
- [ ] Neutral scale for body text and borders
- [ ] Color carries meaning, not decoration

### Layout & Spacing
- [ ] Generous page margins (50-70pt)
- [ ] Consistent spacing scale throughout (no magic numbers)
- [ ] Pages don't feel cramped — whitespace is intentional
- [ ] Visual breaks between major sections

### Structure
- [ ] Cover page with clear visual identity
- [ ] Table of contents (if applicable)
- [ ] Page numbers on every content page
- [ ] Headers with section context
- [ ] Footer with branding
- [ ] Document metadata set (title, author, subject)

### Components
- [ ] Callout boxes for tips, warnings, and key info
- [ ] Styled code blocks with language labels
- [ ] Professional tables with header rows
- [ ] SVG icons (not emojis) for visual elements
- [ ] Bullet lists with consistent formatting

## Quick Tests

1. **Squint test:** Step back, squint. Can you see clear visual hierarchy? If it blurs to one gray block, needs more contrast.
2. **Scroll test:** Flip through all pages quickly. Does it feel like one cohesive document?
3. **Share test:** Would you be proud if a client or colleague saw this with your name on it?
4. **Comparison test:** Hold it next to a professionally published PDF. Where does yours fall short?

## AI Visual Review Prompt

After exporting to PNG, paste individual page images into an AI vision model with this prompt:

```
Review this PDF page image for quality issues:

1. Are all elements properly aligned?
2. Is spacing consistent between sections?
3. Are there any orphaned elements (heading without content, bullet without text)?
4. Does the visual hierarchy feel clear (headings > subheadings > body)?
5. Is page density appropriate (not too cramped, not too sparse)?
6. Any broken borders, misaligned columns, or overlapping text?

Be specific about locations. One issue per line.
```
