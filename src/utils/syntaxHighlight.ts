/**
 * Simple regex-based syntax tokenizer for code block highlighting.
 * Designed for readability in react-pdf — not a full parser.
 * Handles: comments, strings, keywords, JSX tags, numbers, and default text.
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
  'style', 'wrap', 'fixed', 'render', 'size', 'key',
]);

// Single combined regex — order matters (first match wins)
// Groups: 1=comment, 2=string, 3=word (check against keywords), 4=JSX tag, 5=number
const TOKEN_RE =
  /(\/\/.*$|\/\*[\s\S]*?\*\/)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*\b)|(<\/?[A-Z][A-Za-z.]*)|(\b\d+\.?\d*\b)/gm;

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;

  TOKEN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_RE.exec(line)) !== null) {
    // Push any gap before this match as default text
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), type: 'default' });
    }

    if (match[1]) {
      tokens.push({ text: match[0], type: 'comment' });
    } else if (match[2]) {
      tokens.push({ text: match[0], type: 'string' });
    } else if (match[3]) {
      const type = KEYWORDS.has(match[0]) ? 'keyword' : 'default';
      tokens.push({ text: match[0], type });
    } else if (match[4]) {
      tokens.push({ text: match[0], type: 'tag' });
    } else if (match[5]) {
      tokens.push({ text: match[0], type: 'number' });
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining text
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), type: 'default' });
  }

  // If line was empty, push empty default
  if (tokens.length === 0) {
    tokens.push({ text: '', type: 'default' });
  }

  return tokens;
}

export function tokenize(code: string): Token[][] {
  return code.split('\n').map(tokenizeLine);
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
