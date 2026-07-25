/**
 * Shared loader for the markdown-automation demo pages.
 *
 * Reads content/chapters/12-markdown-demo.md (the one authored .md file the
 * build consumes), strips its frontmatter, and splits on the authored
 * page-break marker so each half renders as its own LETTER page. Both
 * 14-markdown-automation pages use this — the path, marker, and assertion
 * live here once.
 */
import fs from 'fs';
import path from 'path';

const MD_PATH = 'content/chapters/12-markdown-demo.md';
const PAGE_BREAK_MARKER = '\n<!-- page-break -->\n';
// Anchored on __dirname, not process.cwd(), so the build works from any
// invocation directory — matching src/build.tsx and src/tocPositions.ts.
const MD_FILE = path.resolve(__dirname, '../..', MD_PATH);

// Both delimiters must own a whole line. An unanchored /^---[\s\S]*?---/ ends
// the strip at the first `---` *anywhere*, including inside a quoted YAML
// value (title: "a --- b"), leaking the rest of the frontmatter into the page.
const FRONTMATTER_RE = /^---[ \t]*\n[\s\S]*?\n---[ \t]*(?:\n|$)/;

export function loadMarkdownDemoParts(): [string, string] {
  const content = fs.readFileSync(MD_FILE, 'utf-8').replace(/\r\n/g, '\n');
  const body = content.replace(FRONTMATTER_RE, '').trim();
  const parts = body.split(PAGE_BREAK_MARKER);
  if (parts.length !== 2) {
    throw new Error(`${MD_PATH}: expected exactly one page-break marker line (${PAGE_BREAK_MARKER.trim()})`);
  }
  return [parts[0].trim(), parts[1].trim()];
}
