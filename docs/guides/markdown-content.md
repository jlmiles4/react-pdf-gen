# Rendering markdown content

`<MarkdownRenderer content={body}>` parses a markdown string and emits the same components a hand-built page would use (`SectionHeading`, `BulletList`, `CodeBlock`, `TipBox`/`WarningBox`/`InfoBox`, body `<Text>`). It's the bridge for content authored in `.md` rather than TSX.

Source: [`src/components/MarkdownRenderer.tsx`](../../src/components/MarkdownRenderer.tsx). Parser: [`src/utils/markdownParser.ts`](../../src/utils/markdownParser.ts).

## Where it's used today

One page: [`src/pages/14-markdown-automation/01-markdown-automation.tsx`](../../src/pages/14-markdown-automation/01-markdown-automation.tsx). It reads `content/chapters/12-markdown-demo.md` at build time, strips a YAML-style frontmatter block, and passes the body to `<MarkdownRenderer>`:

```tsx
const mdPath = path.join(process.cwd(), 'content/chapters/12-markdown-demo.md');
const content = fs.readFileSync(mdPath, 'utf-8');
const body = content.replace(/^---[\s\S]*?---/, '').trim();

<MarkdownRenderer content={body} />
```

The other files in `content/chapters/` are author drafts, not loaded by the build.

## Supported syntax

The parser is intentionally minimal — it covers what this project's chapter format needs and nothing else.

| Markdown | Renders as |
|---|---|
| `# Heading` | `<Text style={styles.h1}>` |
| `## Heading` | `<SectionHeading>` (gold bar + h2) |
| `### Heading` | `<Text style={styles.h3}>` |
| `* item`, `- item`, or `+ item` (consecutive lines) | `<BulletList items={[...]} />` |
| ```` ```lang\ncode\n``` ```` | `<CodeBlock language="lang">{code}</CodeBlock>` |
| `> [!TIP]` block (see below) | `<TipBox>` |
| `> [!WARNING]` block | `<WarningBox>` |
| `> [!INFO]` block | `<InfoBox>` |
| `**bold**` (inline) | `<Text style={styles.bold}>` span |
| `*italic*` / `_italic_` (inline) | `<Text style={styles.italic}>` span |
| `` `code` `` (inline) | `<Text style={styles.inlineCode}>` span |
| Other text (consecutive lines) | `<Text style={styles.body}>` (joined with spaces) |

Anything not in this table falls through to body text — its characters render literally. There are no links, no images, no horizontal rules, no markdown tables. The inline `**bold**`, `*italic*`, and `` `code` `` runs are recognized inside headings, paragraphs, list items, and callout bodies (underscore italics require non-alphanumeric boundaries, so `snake_case` identifiers are left alone).

### Callout syntax

GitHub-flavored alert syntax with an optional inline `label`:

```markdown
> [!TIP] label="Pro tip"
> Multi-line callout
> body lines start with `>`.

> [!WARNING]
> Defaults to label "WARNING".
```

The variant token (`TIP`/`WARNING`/`INFO`) is matched case-insensitively. The label string falls back to the uppercase variant name.

### Paragraph wrapping

Consecutive non-blank, non-special lines are joined with a single space — newlines inside a paragraph become spaces. Use a blank line to start a new paragraph.

## When to use it

- Loading authored content from `.md` files at build time (current pattern: a single demo chapter).
- Roundtripping content from a CMS or a markdown-first authoring workflow.

For chapters where the layout matters (cross-page splits, custom callouts, side-by-side comparisons), write TSX directly — the parser doesn't expose enough of the component library to compose those. See [add-a-page](add-a-page.md).

## Limitations to know

- **Build-time read.** The markdown-automation page uses `fs.readFileSync` synchronously inside the React component body. That works because `tsx` runs the file in Node — but it ties the build to the markdown file's presence on disk. Move the read into a build-time prep step if you want to ship the rendered chapter without the source file.
- **No links, no images.** Link and image syntax pass through as raw characters. Use TSX if you need those.
- **Code-block language label is free-text.** `lang` is a string passed to `<CodeBlock>`, which renders it as the gold label. Syntax highlighting lives in `src/utils/syntaxHighlight.ts` and is keyed by the same string — check what's supported there before relying on it.
