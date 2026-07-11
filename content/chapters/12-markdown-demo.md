---
number: "12"
title: "Markdown Automation"
subtitle: "Writing your book in Markdown and rendering it to premium PDF automatically."
group: "SHIPPING"
---
## The Power of Markdown

Writing content in React components is powerful but tedious. By using a Markdown-to-JSX pipeline, you can focus on writing while the system handles the layout.

### Why Markdown?

* **Focus on content** – no more JSX syntax errors while writing prose.
* **Portable** – your content lives in standard .md files.
* **AI Friendly** – AI models are excellent at writing and editing Markdown.

## How it Works

The `MarkdownRenderer` component parses your Markdown and maps it to the project's premium component library.

```tsx
import { MarkdownRenderer } from '../components';
import fs from 'fs';
const content = fs.readFileSync('content/chapters/12-markdown-demo.md', 'utf-8');
const body = content.replace(/^---[\s\S]*?---/, '').trim();
const pages = body.split('\n<!-- page-break -->\n');
if (pages.length !== 2) throw new Error('Expected one page-break marker');
const page = (index: 0 | 1) => (
  <ContentPage sectionTitle="Automation" wrap={false}>
    <MarkdownRenderer content={pages[index].trim()} />
  </ContentPage>
);
```

> [!TIP] label="Pro Tip"
> You can mix and match Markdown with custom JSX for complex layouts that Markdown can't handle.

<!-- page-break -->

## Supported Elements

The current parser supports:

* **Headings** (h1, h2, and h3)
* **Body text** with automatic paragraph grouping
* **Bullet lists** using the `BulletList` component
* **Code blocks** with syntax highlighting and a language label
* **Callouts** (Tip, Warning, Info boxes)

> [!WARNING] label="Keep code blocks short"
> Fenced blocks render through `CodeBlock`, which uses `wrap={false}` – a block that outgrows the page cannot split, so keep code samples under ~15 lines.

## Inline Formatting

You can mix **bold**, *italic*, and `inline code` directly in any paragraph, and the renderer maps each run to the matching text style. Reach for *emphasis* where a word carries weight, and `code` whenever you name a prop, file, or value.

> [!INFO] label="Round-trip ready"
> Because the source is plain Markdown, your AI agent can draft, edit, and review chapters as text – then this pipeline renders them into the same premium components every hand-built page uses.
