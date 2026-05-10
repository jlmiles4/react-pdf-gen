import { styles } from '../styles/shared';

export type MarkdownNode =
  | { type: 'heading'; level: number; text: string }
  | { type: 'text'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language: string; code: string }
  | { type: 'callout'; variant: 'tip' | 'warning' | 'info'; label: string; text: string };

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

    // Headings
    if (line.startsWith('## ')) {
      nodes.push({ type: 'heading', level: 2, text: line.replace('## ', '') });
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      nodes.push({ type: 'heading', level: 3, text: line.replace('### ', '') });
      i++;
      continue;
    }

    // Lists
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('* ') || lines[i].trim().startsWith('- '))) {
        items.push(lines[i].trim().replace(/^[*+-]\s+/, ''));
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
        nodes.push({ type: 'callout', variant, label, text: calloutLines.join(' ') });
        continue;
      }
    }

    // Default: Body Text (group consecutive lines)
    const textLines: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].trim().match(/^(##|###|\*|-|```|> \[!)/)) {
      textLines.push(lines[i].trim());
      i++;
    }
    if (textLines.length > 0) {
      nodes.push({ type: 'text', text: textLines.join(' ') });
    }
  }

  return nodes;
}
