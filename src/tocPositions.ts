import fs from 'fs';
import path from 'path';

const FILE = path.resolve(__dirname, '../output/toc-positions.json');

/**
 * Returns chapter-number → first-page mapping written by `src/build.tsx`
 * after pass 1 (via `pdftotext` extraction). Empty on first build, populated
 * thereafter — `build.tsx` always runs a second render so the TOC reflects
 * current positions.
 */
export function getTocPositions(): Record<string, number> {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    return {};
  }
}
