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

export function loadMarkdownDemoParts(): [string, string] {
  const content = fs.readFileSync(path.join(process.cwd(), MD_PATH), 'utf-8');
  const body = content.replace(/^---[\s\S]*?---/, '').trim();
  const parts = body.split(PAGE_BREAK_MARKER);
  if (parts.length !== 2) {
    throw new Error(`${MD_PATH}: expected exactly one page-break marker line (${PAGE_BREAK_MARKER.trim()})`);
  }
  return [parts[0].trim(), parts[1].trim()];
}
