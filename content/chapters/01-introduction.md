# Chapter 1: Introduction

## What This Book Is

This is a build guide. You will learn how to set up a `@react-pdf/renderer` project so that AI coding agents – Claude Code, Cursor, Copilot, or whatever ships next month – produce PDFs that look like a designer made them.

The book is structured so each chapter works two ways:

1. **As something you read** to understand the patterns and decisions.
2. **As a reference file you can feed directly to an AI agent** so it has the context it needs to generate good output.

That second point matters. Every chapter is written with token efficiency in mind. When you need your AI to build a new page, you can hand it the relevant chapter plus your design tokens and get back something usable on the first pass.

## Who This Is For

You're a developer who:

- Uses AI coding tools daily (Claude Code, Cursor, GitHub Copilot, Windsurf, etc.)
- Needs to generate PDFs – reports, proposals, invoices, ebooks, data exports
- Knows React and TypeScript at a working level
- Wants results that look professional, not like default LaTeX output

If you've never used React, start there. This book assumes you can read JSX and understand component composition. It does not assume you've used `@react-pdf/renderer` before – Chapter 2 covers the fundamentals.

## The Core Thesis

Here it is in one sentence:

**`@react-pdf/renderer` is the best target for AI-assisted PDF generation because it's JSX, but you need specific project patterns to get premium output instead of AI slop.**

Why JSX matters: every major LLM has been trained on millions of React components. When you ask an AI to generate a react-pdf page, it's working in its strongest domain – component composition, props, and flexbox layout. Compare that to asking it to generate raw PostScript, manipulate a binary PDF, or write LaTeX.

But raw capability isn't enough. If you dump a 2,000-line monolith file at an AI agent and say "add a new page," you'll get back something that half-works, uses inconsistent styling, and breaks the layout of pages 3 through 7. The difference between AI slop and premium output comes down to:

- **Project architecture** – small, focused files the AI can reason about
- **Design tokens** – explicit values so the AI doesn't guess at colors and spacing
- **Context management** – giving the AI exactly the right reference material, nothing more
- **Visual QA** – rendering to PNG so you (and the AI) can verify output

This book covers all four.

Every page you're reading was built with react-pdf using these patterns. The source code is included — the theme file, component library, build scripts, and reference docs aren't hypothetical examples. They're the actual tools that produced this document.

## What You'll Learn

- **Chapter 2: React-PDF Fundamentals** – Components, styling, fonts, layout, and page breaking. Everything you need to know about `@react-pdf/renderer` to be productive.

- **Chapter 3: Project Architecture** – The file-per-page pattern, shared components, and build scripts. How to organize a project so AI agents can work on one piece at a time.

- **Chapter 4: Specifying a Design Language** – Color palettes, typography scales, spacing systems, and the design token file that keeps every page visually consistent.

- **Chapter 5: Tokenization & Context Windows** – LLM token math, context strategy, and practical techniques for fitting the right amount of context into each AI interaction.

- **Chapter 6: Avoiding AI Slop** – Anti-patterns that make output look cheap, the iteration workflow, and prompting patterns for PDF generation.

- **Chapter 7: Design Challenges & Solutions** – What works, what breaks, and flexbox workarounds for common react-pdf layout problems.

- **Chapter 8: Icons over Emojis** – SVG icons for professional output and building a reusable icon library.

- **Chapter 9: AI Visual Analysis** – PNG export, the AI review workflow, and what vision models catch that you miss.

- **Chapter 10: Premium Deliverables & Recipes** – The quality checklist, invoice and data-driven recipes, and layout patterns.

- **Chapter 11: Troubleshooting** – The top react-pdf errors, why they happen, and the debug workflow.

## A Brief Overview of react-pdf

`@react-pdf/renderer` is a library that lets you build PDF documents using React components. You write JSX, and it outputs a PDF file. It runs server-side (Node.js) or client-side (browser).

The core components:

| Component | Purpose |
|-----------|---------|
| `<Document>` | Root wrapper. Contains one or more Pages. |
| `<Page>` | A single PDF page. Has a size (LETTER, A4, custom). |
| `<View>` | The `<div>` equivalent. A flexbox container. |
| `<Text>` | Renders ordinary visible copy; text-capable primitives such as Link are exceptions. |
| `<Image>` | Renders PNG or JPG images. |
| `<Svg>` | Container for SVG primitives. |
| `<Link>` | Clickable hyperlink. |
| `<Canvas>` | Low-level drawing API. |

That's the entire component surface. There's no `<table>`, no `<ul>`, no `<h1>`. You build everything from `View` and `Text` using flexbox. This constraint is actually an advantage for AI – there are fewer components to get wrong.

Here's the minimum viable PDF:

```tsx
import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const MyDocument = () => (
  <Document>
    <Page size="LETTER">
      <View style={{ padding: 72 }}>
        <Text style={{ fontSize: 24 }}>Hello, PDF.</Text>
      </View>
    </Page>
  </Document>
);
```

That produces a single US Letter page with "Hello, PDF." in 24-point text, inset 1 inch from each edge (72 points = 1 inch).

## Why react-pdf

There are many ways to generate PDFs. Here's why `@react-pdf/renderer` is the right choice for AI-assisted workflows:

- **It's React.** LLMs have deep training data on React. They understand component composition, props, and JSX natively. You're working with the AI's strongest skill.

- **It's declarative.** You describe what the page should look like, not the sequence of draw commands to produce it. Declarative code is easier for both humans and AI to reason about.

- **It uses flexbox.** The layout model is the same one every web developer already knows. AI models have seen millions of flexbox layouts in their training data. There's no new layout engine to learn.

- **It renders server-side.** You can run it in a Node.js script, a serverless function, or a CI pipeline. No browser required. This makes it trivial to automate.

- **It's TypeScript-friendly.** Full type definitions mean your AI agent gets autocomplete context and type checking catches errors before rendering.

- **It's composable.** Small components snap together into full documents. This maps perfectly to the "small file, focused context" pattern that makes AI agents effective.

Alternatives and when they make sense:

- **Puppeteer / Playwright** – Render HTML to PDF via a headless browser. More flexible styling (full CSS), but slower, heavier infrastructure, and harder to get consistent page breaks.
- **pdfkit** – Low-level imperative PDF generation. More control, but the imperative style (moveTo, lineTo, text at x,y) is harder for AI to reason about than declarative JSX.
- **LaTeX** – Excellent for academic papers and math-heavy documents. AI can write LaTeX, but the error messages are cryptic and debugging is painful.
- **jsPDF** – Similar to pdfkit. Imperative, coordinate-based. Good for simple documents, tedious for complex layouts.

If your document is primarily a designed layout with consistent branding – reports, proposals, invoices, ebooks, marketing materials – `@react-pdf/renderer` is the tool.

## What This Book Is NOT

A few things this book won't cover, so you know where to look elsewhere:

- **A complete `@react-pdf/renderer` API reference.** Chapter 2 covers the essentials, but for every prop on every component, read the [official docs](https://react-pdf.org/).
- **A general AI prompting guide.** There are plenty of those. This book focuses specifically on the patterns that work for PDF generation.
- **A design tutorial.** You'll get practical design token systems and color palettes, but this isn't a course on graphic design principles.
- **A React tutorial.** You need to know how to read and write React components before this book will make sense.

Let's build something.
