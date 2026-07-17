# Syntax highlighting

`<CodeBlock>` colors code with one regex tokenizer in [`src/utils/syntaxHighlight.ts`](../../src/utils/syntaxHighlight.ts). It is **language-agnostic**: the same JS/TS-oriented rules run on every block. The `language` prop is only a cosmetic gold label above the block — it is never passed to the tokenizer. Passing `language="python"` (or `bash`, `json`, anything) changes the label text and nothing about the coloring.

```tsx
// The label reads "python", but the tokens are matched with the JS/TS ruleset below.
<CodeBlock language="python">{`def f(): return 1`}</CodeBlock>
```

`CodeBlock` calls `tokenize(children)` with the code only ([`CodeBlock.tsx:26`](../../src/components/CodeBlock.tsx)); `language` is rendered separately as `styles.codeLabel` ([`CodeBlock.tsx:30`](../../src/components/CodeBlock.tsx)).

## How a line is tokenized

`tokenize(code)` splits on `\n` and scans each line left-to-right with a single combined regex (`TOKEN_RE`), **first match wins**; any gap between matches becomes `default` text. A `/*` comment or backtick template literal left open at end-of-line is tracked, and following lines are colored until its closer. The seven token types, in match priority:

| # | Token type | What matches | Example |
|---|---|---|---|
| 1 | `comment` | `// to end of line`, or `/* ... */` | `// note`, `/* block */` |
| 2 | `string` | `'...'`, `"..."`, or `` `...` `` (with `\` escapes) | `'hi'`, `` `tpl` `` |
| 3 | `keyword` / `default` | a word (`[a-zA-Z_$][a-zA-Z0-9_$]*`); `keyword` if it's in the keyword set, else `default` | `const` → keyword; `foo` → default |
| 4 | `tag` | a JSX open/close tag with an **uppercase initial**: `</?[A-Z][A-Za-z.]*` | `<ContentPage`, `</Table`, `<Icons.Check` |
| 5 | `number` | `\d+\.?\d*` | `42`, `1.5` |
| 6 | `punctuation` | a run of `{}()[],.;=+-*/&|!<>?:` | `=>`, `({`, `);` |

Blank lines render a single space so their line-height doesn't collapse ([`CodeBlock.tsx:36`](../../src/components/CodeBlock.tsx)).

## Colors

`syntaxColor` maps each token type to a `syntax.*` token from [`theme.ts`](../../src/styles/theme.ts), tuned for the `primary[900]` (`#0B1426`) code-block background. The concrete hex values live in [theme-tokens: Syntax highlighting](theme-tokens.md#syntax-highlighting):

| Token type | `syntax` token | Reads as |
|---|---|---|
| `keyword` | `syntax.keyword` | gold |
| `string` | `syntax.string` | green |
| `comment` | `syntax.comment` | muted gray |
| `tag` | `syntax.tag` | light blue |
| `number` | `syntax.number` | warm gold |
| `punctuation` | `syntax.punctuation` | subtle slate |
| `default` | `syntax.default` | base code text |

## Keyword set

The `keyword` color applies to an exact allowlist (`KEYWORDS` in [`syntaxHighlight.ts`](../../src/utils/syntaxHighlight.ts)) — a JS/TS core plus a few react-pdf prop names so book snippets read well. It is not a general language grammar. Current members:

- **JS/TS keywords:** `const` `let` `var` `function` `return` `import` `from` `export` `default` `if` `else` `new` `class` `interface` `type` `extends` `implements` `async` `await` `void` `typeof` `as` `in` `of` `for` `while` `switch` `case` `break` `continue` `throw` `try` `catch` `finally` `yield` `static` `readonly` `public` `private` `protected` `set` `get`
- **Literals:** `true` `false` `null` `undefined`
- **react-pdf prop names (so they color like keywords in JSX):** `style` `wrap` `fixed` `render` `size` `key`

Any identifier not in this set is `default` text. To make a new word highlight as a keyword, add it to `KEYWORDS`.

## Limitations to know

- **No per-language modes.** One tokenizer for everything; the `language` prop is decorative. Non-JS languages (Python, Bash, JSON, YAML) are colored with the JS/TS rules, which is usually close enough for short snippets but will miscolor language-specific keywords.
- **JSX tags need an uppercase initial.** `<ContentPage>` colors as a `tag`; a lowercase HTML tag like `<div>` does not — its `<` falls to `punctuation` and `div` to `default`.
- **Regex, not a parser.** No awareness of template-literal interpolation (`${...}`) — interpolations stay string-colored — and no context sensitivity. First-match-wins can occasionally mis-slice unusual input.
- **Keyword allowlist is fixed.** Words outside the set above stay `default`, even common ones like `let`-adjacent identifiers or DOM globals.

## Related

- [Components: `CodeBlock`](components.md#codeblock) — the props and usage.
- [theme-tokens: Syntax highlighting](theme-tokens.md#syntax-highlighting) — the concrete hex values.
- [Markdown content](../guides/markdown-content.md) — fenced code blocks in `.md` become `<CodeBlock>`, carrying the same behavior.
