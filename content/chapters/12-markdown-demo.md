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

const content = fs.readFileSync('content/chapters/12-markdown.md', 'utf-8');

const Page = () => (
  <ContentPage sectionTitle="Automation">
    <MarkdownRenderer content={content} />
  </ContentPage>
);
```

> [!TIP] label="Pro Tip"
> You can mix and match Markdown with custom JSX for complex layouts that Markdown can't handle.

## Supported Elements

The current parser supports:

* **Headings** (h2 and h3)
* **Body text** with automatic paragraph grouping
* **Bullet lists** using the `BulletList` component
* **Code blocks** with language-aware syntax highlighting
* **Callouts** (Tip, Warning, Info boxes)
