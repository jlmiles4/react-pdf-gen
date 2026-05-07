# Prompting Strategies for AI-Assisted PDF Generation

> How to write effective prompts when using AI to build react-pdf documents.

## Ground Rules

AI models produce better react-pdf code when you give them:

1. **Constraints** – what the design system allows
2. **Context** – existing code the new code must be consistent with
3. **Specifics** – exact measurements, colors, and layout descriptions

Vague prompts produce vague PDFs. Specific prompts produce usable output on the first try.

---

## Provide a Design System Spec as Context

Before asking the AI to generate any page, give it your design tokens file and shared styles. This is the single most effective thing you can do to get consistent output.

**Good prompt:**

```
Here is my design tokens file:

[paste tokens.ts]

Here is my shared styles file:

[paste sharedStyles.ts]

Using these tokens and styles, create Page08-Chapter2Intro.tsx.
The page should have:
- A chapter title "Building the Foundation" using sharedStyles.chapterTitle
- A subtitle "How design systems prevent visual drift" in 14pt, textSecondary color
- Two paragraphs of body text (use placeholder text)
- A callout box (tip type) at the bottom with a one-sentence tip

Export the component as Page08_Chapter2Intro.
```

**Bad prompt:**

```
Create a nice-looking chapter intro page for my PDF.
```

The "bad" prompt forces the AI to invent a design system. It will pick arbitrary colors, spacing, and fonts that don't match your other pages.

---

## Reference Existing Pages as Examples

When requesting a new page, include a completed page as a reference. The AI will match the structure, style, and patterns.

**Good prompt:**

```
Here is an existing chapter intro page from my ebook:

[paste Page04-Chapter1Intro.tsx]

Create Page08-Chapter2Intro.tsx following the same structure
and style patterns, but with this content:
- Chapter title: "Data Pipeline Architecture"
- Subtitle: "From raw input to structured output"
- Intro paragraph: [your text here]
- Key topics list: ["Extraction", "Transformation", "Validation", "Loading"]
```

The AI now has a concrete template. It will mirror the imports, style references, component structure, and naming conventions.

---

## Ask for One Page at a Time

Do not ask the AI to generate an entire multi-page document in a single prompt. The output quality drops as the scope increases.

**Good workflow:**

1. Generate Page01-Cover.tsx → review → finalize
2. Generate Page02-TOC.tsx → review → finalize
3. Generate Page03-Chapter1Intro.tsx → review → finalize
4. ... and so on

**Bad workflow:**

```
Generate all 30 pages of my ebook.
```

This will produce inconsistent results, repeated patterns where variety is needed, and pages that lack the specific attention each one deserves.

---

## Include Shared Components in Context

If the AI needs to use your Header, Footer, or CalloutBox components, include their source code in the prompt. The AI cannot import components it has never seen.

```
Here are my shared components:

Header.tsx:
[paste Header.tsx]

Footer.tsx:
[paste Footer.tsx]

CalloutBox.tsx:
[paste CalloutBox.tsx]

Using these components, create Page12-BestPractices.tsx with:
- Header with title "Chapter 3"
- Three sections, each with a sectionTitle and body paragraph
- A CalloutBox (type: "warning") after the second section
- Footer component at the bottom
```

---

## Describe Layout in Spatial Terms

AI models understand spatial descriptions better than abstract CSS concepts. Describe what you want to **see**, not the CSS you want written.

**Good spatial descriptions:**

```
Two-column layout: sidebar on the left (30% width) with a
list of terms, main content on the right (70% width) with
explanations.
```

```
Three equal-width cards in a horizontal row with 12pt gaps
between them. Each card has a colored top border, a bold
title, and a body paragraph.
```

```
Full-width header at the top with the chapter title left-aligned
and a small badge right-aligned. Below that, a horizontal
divider line, then the body content.
```

**Vague descriptions that produce unpredictable results:**

```
Make it look modern.
```

```
Nice layout with some columns.
```

---

## Specify Exact Measurements

Be precise about dimensions. Every number you specify is a decision the AI does not have to guess.

**Good:**

```
- Page padding: 40pt on all sides
- Title: 28pt, bold, color #1a1a2e
- Body text: 11pt, line height 1.6, color #333333
- Section spacing: 24pt gap between sections
- Cards: 4pt border radius, 16pt internal padding, #f8f9fa background
- Two-column gap: 20pt
```

**Bad:**

```
- Big title at the top
- Some body text
- A couple of cards
```

---

## Use Screenshot Feedback Loops

The most effective way to iterate on PDF design with AI is the **render-review-revise** loop:

### Step 1: Generate the page

```
Create Page15-DataSummary.tsx with a two-column layout showing
key metrics on the left and a summary paragraph on the right.
Use sharedStyles for typography.
```

### Step 2: Render to PNG

Generate the PDF and convert the relevant page to a PNG image. (See `reference/ai-patterns/png-vs-pdf-analysis.md` for tools.)

### Step 3: Show the AI the result

```
Here is a screenshot of the rendered Page15-DataSummary.tsx:

[attach PNG image]

Issues I see:
- The left column metrics are too close to the top, add 16pt margin
- The right column text is too small, bump to 12pt
- The gap between columns is too tight, increase to 24pt
- The overall page feels top-heavy, center the content vertically

Update the component to fix these issues.
```

### Step 4: Repeat

Render again, review, and revise. Most pages converge in 2-3 iterations.

This feedback loop works because:
- The AI can **see** the visual problem in the PNG
- You describe the fix in specific, measurable terms
- The AI modifies only the component you're focused on

---

## Iteration Strategy: Structure, Content, Polish

For complex pages, use a three-pass approach:

### Pass 1: Structure

```
Create Page20-Comparison.tsx with a layout that has:
- A section title at the top
- A 3-column comparison table below
- A summary callout box at the bottom

Use placeholder text for all content. Focus on getting
the layout structure right.
```

### Pass 2: Content

```
Here is Page20-Comparison.tsx with the layout structure:

[paste current file]

Replace all placeholder text with this real content:
- Title: "Framework Comparison"
- Column 1: React-PDF – [details]
- Column 2: Puppeteer – [details]
- Column 3: wkhtmltopdf – [details]
- Summary: [your summary text]
```

### Pass 3: Polish

```
Here is the rendered Page20-Comparison.tsx:

[attach PNG]

Polish adjustments:
- Alternate row colors in the comparison table (#f8f9fa for odd rows)
- Add a 3pt left border to the summary callout in accent color
- Reduce body text line height from 1.6 to 1.4 to fit more content
- The column headers need 'uppercase' textTransform and letter spacing of 0.5
```

---

## Prompt Templates

### New Page from Scratch

```
Context files:
- tokens.ts: [paste]
- sharedStyles.ts: [paste]
- Header.tsx: [paste]
- Footer.tsx: [paste]

Create [PageXX-Name.tsx] with:
- Page size: LETTER, portrait
- Header component with title "[Chapter Name]"
- [Layout description with specific measurements]
- [Content description or placeholder instructions]
- Footer component
- Export as [PageXX_Name]
- Page-specific styles in a local StyleSheet.create()
- Import shared styles from '../styles/sharedStyles'
- Import tokens from '../styles/tokens'
```

### Modify Existing Page

```
Here is the current [PageXX-Name.tsx]:

[paste file]

Changes needed:
1. [Specific change with measurements]
2. [Specific change with measurements]
3. [Specific change with measurements]

Keep everything else the same. Return the complete updated file.
```

### Design Review from Screenshot

```
Here is a screenshot of [page description]:

[attach PNG]

Review this page for:
- Alignment consistency
- Spacing balance
- Typography hierarchy
- Color usage
- Overall visual weight distribution

List specific issues and suggest fixes with exact measurements.
```

---

## What to Avoid in Prompts

**Do not ask the AI to "make it look professional."** That is subjective and unverifiable. Instead, specify what "professional" means to you: consistent 40pt margins, Inter font family, #1a1a2e headings, 1.6 line height body text.

**Do not provide conflicting context.** If your tokens file says the primary color is `#1a1a2e` but your prompt says "use dark blue for headings," the AI has to guess which one you mean.

**Do not ask for "creative" layouts unless you're prepared for surprises.** AI will try things. Sometimes they work, sometimes they don't. If you want predictability, be prescriptive.

**Do not skip the design system context.** Every prompt that lacks tokens and shared styles produces an island page that looks different from everything else.
