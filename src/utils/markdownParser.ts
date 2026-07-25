export type InlineSpan =
  | { type: 'plain'; text: string }
  | { type: 'bold'; children: InlineSpan[] }
  | { type: 'italic'; children: InlineSpan[] }
  | { type: 'code'; text: string };

export type MarkdownNode =
  | { type: 'heading'; level: number; spans: InlineSpan[] }
  | { type: 'text'; spans: InlineSpan[] }
  | { type: 'list'; items: InlineSpan[][] }
  | { type: 'code'; language: string; code: string }
  | { type: 'callout'; variant: 'tip' | 'warning' | 'info'; label: string; spans: InlineSpan[] };

/**
 * Parse `**bold**`, `*italic*` / `_italic_`, and `` `code` `` runs in a single
 * line of body text. Bold is matched before italic so `**x**` is not seen as
 * a stray italic. Underscore-italics require non-alphanumeric boundaries so
 * `snake_case` identifiers are left alone — wrap real identifiers in backticks.
 * Bold/italic content is parsed recursively so runs nest (`**a *b* c**`); code
 * spans are terminal and stay literal.
 *
 * Emphasis bodies are `(?:[^`]|`[^`]*`)+?` rather than `.+?` so a run may span
 * a *complete* code span (`**a `b` c**` still bolds) but can never end inside
 * one. With a plain `.+?`, an unpaired `**` would lazily close on a `**` that
 * sits inside a later code span, swallowing it and leaking literal backticks
 * into the PDF — e.g. "a ** b `c ** d`". Now the emphasis simply fails to
 * match, the `**` stays literal, and the code span parses on its own.
 */
export function parseInline(line: string): InlineSpan[] {
  const spans: InlineSpan[] = [];
  const re = /\*\*((?:[^`]|`[^`]*`)+?)\*\*|`([^`]+)`|\*((?:[^*\n`]|`[^`]*`)+?)\*|(?<![A-Za-z0-9])_((?:[^_\n`]|`[^`]*`)+?)_(?![A-Za-z0-9])/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) spans.push({ type: 'plain', text: line.slice(last, m.index) });
    if (m[1] !== undefined) spans.push({ type: 'bold', children: parseInline(m[1]) });
    else if (m[2] !== undefined) spans.push({ type: 'code', text: m[2] });
    else if (m[3] !== undefined) spans.push({ type: 'italic', children: parseInline(m[3]) });
    else if (m[4] !== undefined) spans.push({ type: 'italic', children: parseInline(m[4]) });
    last = m.index + m[0].length;
  }
  if (last < line.length) spans.push({ type: 'plain', text: line.slice(last) });
  if (spans.length === 0) spans.push({ type: 'plain', text: line });
  return spans;
}

/** A list item starts with `* `, `- `, or `+ ` (CommonMark bullet markers). */
function isListItem(line: string): boolean {
  return line.startsWith('* ') || line.startsWith('- ') || line.startsWith('+ ');
}

/** Strip an ATX closing sequence (`## Title ##` -> `Title`), per CommonMark. */
function stripHeadingSuffix(text: string): string {
  return text.replace(/\s+#+\s*$/, '');
}

export function parseMarkdown(md: string): MarkdownNode[] {
  // Normalize CRLF once, up front. Every branch except the code fence trims its
  // line (which would hide a stray \r); the fence pushes raw lines, so without
  // this a CRLF-authored file leaks \r into rendered code blocks.
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const nodes: MarkdownNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // Headings (check ### before ## before # to avoid prefix collisions)
    if (line.startsWith('### ')) {
      nodes.push({ type: 'heading', level: 3, spans: parseInline(stripHeadingSuffix(line.slice(4))) });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      nodes.push({ type: 'heading', level: 2, spans: parseInline(stripHeadingSuffix(line.slice(3))) });
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      nodes.push({ type: 'heading', level: 1, spans: parseInline(stripHeadingSuffix(line.slice(2))) });
      i++;
      continue;
    }
    // h4–h6 have no heading branch: warn and degrade to body text rather than
    // silently rendering the #### markers as literal text.
    if (/^#{4,6}\s/.test(line)) {
      console.warn(`markdownParser: heading levels deeper than ### are not supported — "${line.slice(0, 60)}" will render as plain body text`);
      nodes.push({ type: 'text', spans: parseInline(stripHeadingSuffix(line.replace(/^#{4,6}\s+/, ''))) });
      i++;
      continue;
    }

    // Lists
    if (isListItem(line)) {
      const items: InlineSpan[][] = [];
      while (i < lines.length && isListItem(lines[i].trim())) {
        items.push(parseInline(lines[i].trim().replace(/^[*+-]\s+/, '')));
        i++;
      }
      nodes.push({ type: 'list', items });
      continue;
    }

    // Code Blocks
    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i >= lines.length) {
        console.warn('markdownParser: unclosed code fence — everything after it renders as code');
      }
      nodes.push({ type: 'code', language, code: codeLines.join('\n') });
      i++;
      continue;
    }

    // Callouts (custom syntax: > [!TIP])
    if (line.startsWith('> [!')) {
      const variantMatch = line.match(/> \[!(TIP|WARNING|INFO)\]/i);
      if (variantMatch) {
        const variant = variantMatch[1].toLowerCase() as 'tip' | 'warning' | 'info';
        const labelMatch = line.match(/label="([^"]+)"/);
        const label = labelMatch ? labelMatch[1] : variant.toUpperCase();
        // Body text may start on the marker line itself (`> [!TIP] Do this.`).
        // Everything after the marker (and after an optional label="…") belongs
        // to the callout — dropping it silently rendered an empty box.
        const inlineBody = line
          .slice(variantMatch.index! + variantMatch[0].length)
          .replace(/^\s*label="[^"]*"/, '')
          .trim();
        i++;
        const calloutLines: string[] = inlineBody ? [inlineBody] : [];
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          calloutLines.push(lines[i].trim().replace(/^>\s*/, ''));
          i++;
        }
        nodes.push({ type: 'callout', variant, label, spans: parseInline(calloutLines.join(' ')) });
        continue;
      }
    }

    // Blockquote / unrecognized callout (e.g. `> [!NOTE]`, malformed `> [!TIP`,
    // or a plain `> quote`): blockquotes aren't a supported feature, so strip the
    // `> ` marker and degrade to body text. Always advances i so `> [!`-prefixed
    // lines that miss the callout branch above can't spin the outer loop.
    if (line.startsWith('>')) {
      nodes.push({ type: 'text', spans: parseInline(line.replace(/^>\s*/, '')) });
      i++;
      continue;
    }

    // Default: Body Text (group consecutive lines)
    // Ordered lists have no branch — without this warning they'd silently
    // collapse into one paragraph ("1. First 2. Second").
    if (/^\d+\.\s/.test(line)) {
      console.warn(`markdownParser: ordered lists are not supported — "${line.slice(0, 60)}" will render as plain body text (use "- " bullets instead)`);
    }
    const textLines: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].trim().match(/^(#{1,6}\s|[*+-]\s|```|>)/)) {
      textLines.push(lines[i].trim());
      i++;
    }
    if (textLines.length > 0) {
      nodes.push({ type: 'text', spans: parseInline(textLines.join(' ')) });
    } else {
      // Guaranteed progress. The grouping guard above is deliberately broader
      // than the branch predicates that precede it — it stops on `#{1,6}\s`
      // and `[*+-]\s`, where `\s` matches a tab, while the heading and list
      // branches require a literal space. So a line like "-\titem" or
      // "#\tTitle" reaches this branch, matches the guard, consumes nothing,
      // and would leave `i` unchanged: a silent infinite loop that hangs the
      // build with no error. Emit the line as body text and always advance.
      nodes.push({ type: 'text', spans: parseInline(line) });
      i++;
    }
  }

  return nodes;
}
