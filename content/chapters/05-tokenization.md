# Chapter 5: Tokenization and Context Windows

This chapter is about the math behind AI-assisted PDF generation. Understanding how LLMs process your code – and how much of it they can hold in focus at once – directly affects how you structure your projects and your prompts.

## What Tokenization Is

LLMs don't read characters. They read **tokens** – subword units that the model learned during training. Before your code reaches the model's neural network, a tokenizer breaks it into these chunks.

Here's how the sentence "Create a PDF page" tokenizes (using GPT-4 / Claude's tokenizer, approximately):

```
"Create" → [Create]
" a"     → [ a]
" PDF"   → [ PDF]
" page"  → [ page]
```

That's 4 tokens for 4 words. Simple English tokenizes efficiently.

Now here's how a react-pdf JSX snippet tokenizes:

```tsx
<View style={styles.container}>
```

```
"<"          → [<]
"View"       → [View]
" style"     → [ style]
"={"         → [={]
"styles"     → [styles]
"."          → [.]
"container"  → [container]
"}>"         → [}>]
```

That's roughly 8 tokens for one opening tag. The angle brackets, curly braces, dots, and prop assignments each consume tokens that plain English wouldn't need.

## Token Math

The rough conversion rates:

| Content type | Tokens per character | Tokens per line |
|-------------|---------------------|----------------|
| English prose | ~0.25 (4 chars/token) | 15–20 |
| TypeScript code | ~0.30 (3.3 chars/token) | 10–25 |
| JSX/TSX | ~0.33 (3 chars/token) | 12–30 |
| JSON data | ~0.35 (2.9 chars/token) | 15–35 |

JSX is about 30% more token-expensive than English prose because of its syntax density – angle brackets, prop names, string values, and curly brace expressions all consume tokens.

Some practical measurements from real react-pdf code:

| File type | Typical lines | Typical tokens |
|-----------|--------------|---------------|
| Simple page component | 80–120 lines | 200–400 tokens |
| Complex page component | 150–300 lines | 400–900 tokens |
| `theme.ts` | 80–100 lines | 300–500 tokens |
| `shared.ts` | 60–120 lines | 250–500 tokens |
| Shared component (Header, Footer) | 30–60 lines | 100–200 tokens |
| Shared component (DataTable, CalloutBox) | 60–120 lines | 200–400 tokens |
| Full monolith document (10 pages) | 1,500–3,000 lines | 4,000–10,000 tokens |

These numbers matter because they determine how much code you can feed an AI in a single prompt.

## Context Window Sizes

Every LLM has a maximum context window – the total number of tokens it can process in a single request (prompt + response combined).

| Category | Max context | Approximate lines of code |
|----------|------------|--------------------------|
| Standard models | 32K-128K tokens | ~6,000-25,000 lines |
| Large-context models | 128K-200K+ tokens | ~25,000-40,000 lines |
| Extended-context models | 500K-1M+ tokens | ~100,000-200,000 lines |

Specific models change frequently, but these categories remain stable. The numbers look huge. You might think: "200k tokens – I can dump my entire project in there and let the AI figure it out."

You can. But you shouldn't.

## The "Lost in the Middle" Problem

In 2023, researchers at Stanford, UC Berkeley, and Samaya AI published a paper titled "Lost in the Middle: How Language Models Use Long Contexts." The key finding:

**LLMs are most accurate when relevant information is at the very beginning or very end of the context. Performance degrades significantly when the relevant information is in the middle.**

In practical terms: if you give Claude a 50,000-token prompt with your question at the end and the relevant code buried at token 25,000, the model's ability to use that code drops measurably compared to when the same code is at the beginning.

This means:

- A 200k context window doesn't give you 200k tokens of "high attention" space.
- The effective "focused" context is much smaller – roughly the first few thousand tokens and the last few thousand tokens get the best treatment.
- Information in the middle of a large context is more likely to be missed, misinterpreted, or ignored.

For PDF generation, this has a direct implication: **don't dump all your pages into one prompt.** Give the AI the specific page you're working on, the relevant shared resources, and nothing else.

## Practical Context Strategy

Here's how to structure a prompt for editing a single page component:

```
[SYSTEM CONTEXT]
├── Design tokens (theme.ts)           ~400 tokens
├── Shared styles (shared.ts)          ~350 tokens
├── Shared component: Header           ~120 tokens
├── Shared component: Footer           ~100 tokens
├── Shared component: SectionTitle     ~130 tokens
├── The page to edit (Page04.tsx)      ~350 tokens
├── Your instructions                  ~200 tokens
└── TOTAL                              ~1,650 tokens
```

That's 1,650 tokens of context. The AI has full visibility on the design system, the reusable components, and the specific page. All of it fits comfortably in the "high attention" zone. The model can reason about every detail.

Compare that to the monolith approach:

```
[SYSTEM CONTEXT]
├── Monolith document (all 10 pages)   ~7,000 tokens
├── Your instructions                  ~200 tokens
└── TOTAL                              ~7,200 tokens
```

The page you want to edit (page 4) is buried somewhere around token 2,800. The AI might edit page 4 correctly. It might also accidentally modify a style it saw on page 2, or miss a shared pattern from page 8.

The small-context approach isn't just more token-efficient – it produces better results.

## Token Budget Planning

Before you prompt an AI to work on a page, do a rough token budget:

1. **Fixed overhead: theme + shared styles.**
   Measure this once. For the theme and shared styles from Chapter 4, it's roughly 700–900 tokens.

2. **Shared components used by this page.**
   If the page uses Header, Footer, and SectionTitle, that's about 350 tokens. If it also uses DataTable, add another 250.

3. **The page itself.**
   A typical page component is 200–600 tokens.

4. **Your instructions.**
   A detailed prompt with examples might be 200–500 tokens. A simple "change the chart colors" is 20 tokens.

5. **Response budget.**
   The AI needs room to write its response. For rewriting a full page component, budget 300–800 tokens.

**Example budget for editing Page04-FinancialCharts.tsx:**

| Item | Tokens |
|------|--------|
| theme.ts | 450 |
| shared.ts | 350 |
| Header.tsx | 120 |
| Footer.tsx | 100 |
| DataTable.tsx | 250 |
| Page04-FinancialCharts.tsx | 500 |
| Instructions | 300 |
| **Prompt total** | **2,070** |
| Response (rewritten page) | ~600 |
| **Grand total** | **~2,670** |

2,670 tokens out of a 200,000 token context window. You're using 1.3% of the available space. Everything is in the high-attention zone. The AI has full context on every design decision and every component it might use.

## Reducing Token Waste

Some patterns consume more tokens than necessary without adding clarity.

### Extract repeated style objects

**Wasteful:**

```tsx
<Text style={{ fontSize: 9, color: "#6b7280", marginBottom: 4 }}>Label 1</Text>
<Text style={{ fontSize: 9, color: "#6b7280", marginBottom: 4 }}>Label 2</Text>
<Text style={{ fontSize: 9, color: "#6b7280", marginBottom: 4 }}>Label 3</Text>
<Text style={{ fontSize: 9, color: "#6b7280", marginBottom: 4 }}>Label 4</Text>
```

Each inline style object is ~15 tokens. Four of them is ~60 tokens for styling alone.

**Efficient:**

```tsx
// In StyleSheet.create():
label: { fontSize: 9, color: "#6b7280", marginBottom: 4 },

// In JSX:
<Text style={styles.label}>Label 1</Text>
<Text style={styles.label}>Label 2</Text>
<Text style={styles.label}>Label 3</Text>
<Text style={styles.label}>Label 4</Text>
```

The style definition is ~15 tokens. Each usage is ~5 tokens. Total: ~35 tokens. That's a 42% reduction – and the code is more maintainable.

### Use short but clear variable names

```tsx
// Wasteful – verbose names that don't add clarity
const executiveSummaryPageContainerStyles = StyleSheet.create({
  executiveSummaryMainContentWrapper: { ... },
  executiveSummarySectionHeadingText: { ... },
});

// Efficient – clear and concise
const styles = StyleSheet.create({
  content: { ... },
  heading: { ... },
});
```

The file is named `Page03-ExecutiveSummary.tsx`. The reader (and the AI) already knows these styles belong to the executive summary. The redundant prefix wastes tokens.

### Remove redundant comments

```tsx
// Wasteful
// This is the header component that displays at the top of the page
const Header = () => (
  // Render a View container for the header
  <View style={styles.header}>
    {/* Display the company name text */}
    <Text style={styles.title}>ACME Corp</Text>
    {/* Display the page number */}
    <Text render={({ pageNumber }) => `${pageNumber}`} />
  </View>
);
```

Every comment is tokens. If the code is self-explanatory, the comment adds noise without value. Comments should explain *why*, not *what*:

```tsx
// Efficient
const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>ACME Corp</Text>
    {/* Second render pass fills in pageNumber */}
    <Text render={({ pageNumber }) => `${pageNumber}`} />
  </View>
);
```

One comment that explains a non-obvious behavior. Everything else is evident from the code.

### Use theme tokens instead of magic numbers

```tsx
// Wasteful and inconsistent
<View style={{ padding: 16, marginBottom: 24, gap: 8 }}>

// Efficient and consistent
<View style={{
  padding: theme.spacing[4],
  marginBottom: theme.spacing[6],
  gap: theme.spacing[2],
}}>
```

The token count is similar, but the second version gives the AI (and you) semantic meaning. `spacing[6]` communicates "medium section gap" in a way that `24` does not.

## The Project Docs Pattern

For larger projects, create a `docs/` folder with concise project documentation the AI can read without loading all source code. Reserve `reference/` for long-form research that is useful during authoring but too broad for routine edit context:

```
docs/
  ARCHITECTURE.md     # File structure, naming conventions, build command
  DESIGN_BRIEF.md     # Visual style summary (the 10-line brief from Ch4)
  COMPONENTS.md       # List of shared components with props and usage
  EXAMPLES.md         # 2-3 example page components showing patterns
```

### ARCHITECTURE.md

```markdown
# Architecture

## Build
npm run build:pdf → outputs to ./output/report.pdf

## File structure
- src/pages/PageNN-Name.tsx – one component per page, default export
- src/components/ – shared components (Header, Footer, SectionTitle, etc.)
- src/styles/theme.ts – all design tokens
- src/styles/shared.ts – reusable StyleSheet styles
- src/Document.tsx – assembles all pages
- src/build.tsx – renders to PDF

## Page component pattern
- Import: React, react-pdf components, theme, shared, needed components
- Local StyleSheet.create() for page-specific styles
- Single default-exported component returning <Page>
- Reusable visual values from theme; named local constants only for unique geometry
```

### COMPONENTS.md

```markdown
# Shared Components

## Header
- Props: title?: string (default: "Annual Report 2025")
- Fixed to top of each page. Shows title left, page number right.

## Footer
- Props: leftText?: string, rightText?: string
- Fixed to bottom. Absolute positioned at bottom: 24pt.

## SectionTitle
- Props: label?: string, title: string, showDivider?: boolean
- Uppercase label in accent color, title in h2, optional gold divider.
- Uses minPresenceAhead={100} for orphan protection when its parent Page wraps.

## CalloutBox
- Props: title?: string, children: string, variant?: "info"|"success"|"warning"|"neutral"
- Left-bordered box with tinted background. wrap={false}.

## DataTable
- Props: headers: string[], rows: string[][], columnWidths?: string[]
- Navy header row, alternating white/gray body. 9pt text.
```

This reference folder is under 400 tokens total. An AI agent can read it in one pass and understand your entire project's conventions without seeing a single source file. When it needs to generate a new page, it reads the reference docs + the theme file + the specific components it needs.

## Token Cost Comparison

Let's make the case with real numbers. A 10-page financial report:

### Monolith approach

| Context item | Tokens |
|-------------|--------|
| All 10 pages in one file | 6,500 |
| Instructions | 300 |
| **Total prompt** | **6,800** |

The page you're editing is somewhere in the middle. The AI must parse 6,500 tokens to find and modify the relevant 400.

### Split approach (editing Page 04)

| Context item | Tokens |
|-------------|--------|
| theme.ts | 450 |
| shared.ts | 350 |
| Header.tsx + Footer.tsx | 220 |
| DataTable.tsx (used on this page) | 250 |
| Page04-FinancialCharts.tsx | 450 |
| Instructions | 300 |
| **Total prompt** | **2,020** |

You've provided 70% less context, but the AI has 100% of the information it needs for this specific task. Every token is relevant. Nothing is filler.

### Adding a new page to the monolith

In the monolith approach, the AI has to:

1. Read the entire 6,500-token file to understand existing patterns.
2. Find the right insertion point.
3. Write the new page code.
4. Output the entire file (all 6,500+ tokens) so you can see the changes.
5. If something's wrong, you repeat with the new 7,000-token file.

Each iteration costs ~14,000 tokens (input + output).

### Adding a new page in the split approach

The AI has to:

1. Read theme.ts (450 tokens) + 1 example page (400 tokens) + component docs (200 tokens).
2. Write the new page file (~400 tokens).

Each iteration costs ~1,450 tokens. That's 10x cheaper per iteration. And because the context is focused, the first attempt is more likely to be correct – meaning fewer iterations.

## Measuring Tokens in Your Own Files

You can measure tokens using any of these methods:

### OpenAI's tokenizer (online)

Go to [platform.openai.com/tokenizer](https://platform.openai.com/tokenizer), paste your code, and see the token count. This uses GPT-4's tokenizer (cl100k_base). Claude uses a different tokenizer, but the counts are within 10–15% of each other.

### tiktoken (Python)

```python
import tiktoken

enc = tiktoken.encoding_for_model("gpt-4")

with open("src/styles/theme.ts") as f:
    code = f.read()

token_count = len(enc.encode(code))
print(f"theme.ts: {token_count} tokens")
```

### Quick estimate

Count the characters in the file and divide by 3.3 for code, or 4 for English prose. That gives you a ballpark within 15%.

```bash
wc -c src/styles/theme.ts
# Output: 1,650 src/styles/theme.ts
# Estimated tokens: 1,650 / 3.3 ≈ 500 tokens
```

## Try It Yourself

Theory is useful. Numbers you've measured yourself are better. Here's a quick exercise to make token budgets concrete for your project:

1. **Find your largest source file.** Run `wc -c` on it and divide by 3.3 to estimate tokens. If it's over 1,000 tokens, that's a candidate for splitting.
2. **Count the context files.** How many files does an AI need to edit one page? theme.ts + shared components + the page itself + your instructions. Add up the estimated tokens. Is the total under 2,000?
3. **Try the prompt sizing template** with your actual project files. Paste the context into your AI tool and ask it to generate a new page. Did it use the right design tokens?
4. **Check the gaps.** If the AI used wrong colors or spacing, check what was missing from the context. That gap is what causes slop in practice.

The compound effect is significant: a project where each page file is 400 tokens means the AI can read the complete context for any edit in under 1,500 tokens. That's less than 1% of most model context windows. The remaining 99% is available for reasoning, generating code that matches your patterns, and iterating.
