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
 */
export function parseInline(line: string): InlineSpan[] {
  const spans: InlineSpan[] = [];
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\*([^*\n]+)\*|(?<![A-Za-z0-9])_([^_\n]+)_(?![A-Za-z0-9])/g;
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

export function parseMarkdown(md: string): MarkdownNode[] {
  const lines = md.split('\n');
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
      nodes.push({ type: 'heading', level: 3, spans: parseInline(line.replace('### ', '')) });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      nodes.push({ type: 'heading', level: 2, spans: parseInline(line.replace('## ', '')) });
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      nodes.push({ type: 'heading', level: 1, spans: parseInline(line.replace('# ', '')) });
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
      const language = line.replace('```', '').trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      nodes.push({ type: 'code', language, code: codeLines.join('\n') });
      i++;
      continue;
    }

    // Callouts (custom syntax: > [!TIP])
    if (line.startsWith('> [!')) {
      const variantMatch = line.match(/> \[!(TIP|WARNING|INFO)\]/i);
      if (variantMatch) {
        const variant = variantMatch[1].toLowerCase() as any;
        const labelMatch = line.match(/label="([^"]+)"/);
        const label = labelMatch ? labelMatch[1] : variant.toUpperCase();
        i++;
        const calloutLines: string[] = [];
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
    const textLines: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].trim().match(/^(#{1,3}\s|[*+-]\s|```|>)/)) {
      textLines.push(lines[i].trim());
      i++;
    }
    if (textLines.length > 0) {
      nodes.push({ type: 'text', spans: parseInline(textLines.join(' ')) });
    }
  }

  return nodes;
}
