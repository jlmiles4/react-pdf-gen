/**
 * Simple regex-based syntax tokenizer for code block highlighting.
 * Designed for readability in react-pdf — not a full parser.
 * Handles: comments, strings, keywords, JSX tags, numbers, and default text.
 * Multi-line block comments and template literals are tracked across lines by
 * tokenize(); a line scanned while one is open is colored until its closer.
 */
import { syntax } from '../styles/theme';

export type TokenType = 'keyword' | 'string' | 'comment' | 'tag' | 'number' | 'punctuation' | 'default';

export interface Token {
  text: string;
  type: TokenType;
}

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'import', 'from', 'export',
  'default', 'if', 'else', 'new', 'class', 'interface', 'type', 'extends',
  'implements', 'async', 'await', 'true', 'false', 'null', 'undefined',
  'void', 'typeof', 'as', 'in', 'of', 'for', 'while', 'switch', 'case',
  'break', 'continue', 'throw', 'try', 'catch', 'finally', 'yield',
  'static', 'readonly', 'public', 'private', 'protected', 'set', 'get',
  // Deliberate hack: react-pdf prop names, so the book's JSX samples highlight
  // them. Cost: the same identifiers highlight anywhere (e.g. `const size = 5`).
  'style', 'wrap', 'fixed', 'render', 'size', 'key',
]);

// Single combined regex — order matters (first match wins)
// Groups: 1=comment, 2=string, 3=word, 4=JSX tag, 5=number, 6=punctuation
// The trailing /* and backtick alternatives match constructs that open on this
// line without closing; tokenize() carries that state into the following lines.
const TOKEN_RE =
  /(\/\/.*$|\/\*[\s\S]*?\*\/|\/\*.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|`[^`\\]*$)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*\b)|(<\/?[A-Z][A-Za-z.]*)|(\b\d+\.?\d*\b)|([{}()\[\],.;=+\-*/&|!<>?:]+)/gm;

type OpenBlock = 'comment' | 'template' | null;

interface LineScan {
  tokens: Token[];
  /** The multi-line construct this line leaves open, if any. */
  openBlock: OpenBlock;
}

function scanLine(line: string): LineScan {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let openBlock: OpenBlock = null;

  // Fresh regex per line: TOKEN_RE is global, so sharing one instance would
  // couple callers through lastIndex.
  const re = new RegExp(TOKEN_RE.source, TOKEN_RE.flags);
  let match: RegExpExecArray | null;

  while ((match = re.exec(line)) !== null) {
    // Push any gap before this match as default text
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), type: 'default' });
    }

    if (match[1]) {
      tokens.push({ text: match[0], type: 'comment' });
      // /* without a closing */ on the same line opens a multi-line comment.
      if (match[0].startsWith('/*') && !match[0].endsWith('*/')) openBlock = 'comment';
    } else if (match[2]) {
      tokens.push({ text: match[0], type: 'string' });
      // A backtick string with no closing backtick opens a multi-line template.
      if (match[0][0] === '`' && (match[0].length === 1 || !match[0].endsWith('`'))) openBlock = 'template';
    } else if (match[3]) {
      const type = KEYWORDS.has(match[0]) ? 'keyword' : 'default';
      tokens.push({ text: match[0], type });
    } else if (match[4]) {
      tokens.push({ text: match[0], type: 'tag' });
    } else if (match[5]) {
      tokens.push({ text: match[0], type: 'number' });
    } else if (match[6]) {
      tokens.push({ text: match[0], type: 'punctuation' });
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining text
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), type: 'default' });
  }

  return { tokens, openBlock };
}

/** Index of the first backtick not escaped by an odd run of backslashes, or -1. */
function findClosingBacktick(line: string): number {
  for (let i = 0; i < line.length; i++) {
    if (line[i] !== '`') continue;
    let backslashes = 0;
    for (let j = i - 1; j >= 0 && line[j] === '\\'; j--) backslashes++;
    if (backslashes % 2 === 0) return i;
  }
  return -1;
}

export function tokenizeLine(line: string): Token[] {
  const { tokens } = scanLine(line);
  // Keep the line renderable even when it produced no tokens (blank line).
  if (tokens.length === 0) tokens.push({ text: '', type: 'default' });
  return tokens;
}

export function tokenize(code: string): Token[][] {
  const lines = code.split('\n');
  const out: Token[][] = [];
  let openBlock: OpenBlock = null;

  for (const line of lines) {
    // A construct left open on a previous line colors this line's prefix up to
    // its closer; the remainder of that line tokenizes normally (and may open
    // a new construct of its own).
    if (openBlock === 'comment') {
      const end = line.indexOf('*/');
      if (end === -1) {
        out.push([{ text: line, type: 'comment' }]);
        continue;
      }
      const head: Token = { text: line.slice(0, end + 2), type: 'comment' };
      const rest = scanLine(line.slice(end + 2));
      out.push([head, ...rest.tokens]);
      openBlock = rest.openBlock;
      continue;
    }

    if (openBlock === 'template') {
      const end = findClosingBacktick(line);
      if (end === -1) {
        out.push([{ text: line, type: 'string' }]);
        continue;
      }
      const head: Token = { text: line.slice(0, end + 1), type: 'string' };
      const rest = scanLine(line.slice(end + 1));
      out.push([head, ...rest.tokens]);
      openBlock = rest.openBlock;
      continue;
    }

    const scan = scanLine(line);
    // Blank lines must still yield a token so CodeBlock renders the line height.
    out.push(scan.tokens.length > 0 ? scan.tokens : [{ text: '', type: 'default' }]);
    openBlock = scan.openBlock;
  }

  return out;
}

export const syntaxColor: Record<TokenType, string> = {
  keyword: syntax.keyword,
  string: syntax.string,
  comment: syntax.comment,
  tag: syntax.tag,
  number: syntax.number,
  punctuation: syntax.punctuation,
  default: syntax.default,
};
