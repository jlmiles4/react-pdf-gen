import fs from 'fs';
import path from 'path';

const FILE = path.resolve(__dirname, '../output/toc-positions.json');

/**
 * Returns chapter-number → first-page mapping written by `src/build.tsx`
 * after pass 1 (via `pdftotext` extraction). Empty on first build, populated
 * thereafter — `build.tsx` always runs a second render so the TOC reflects
 * current positions.
 *
 * A missing file is expected (pass 1); a malformed one is not — it's warned
 * about rather than silently swallowed, since a single-pass render (e.g. a
 * future preview) would otherwise ship blank TOC numbers with no diagnostics.
 */
export function getTocPositions(): Record<string, number> {
  let raw: string;
  try {
    raw = fs.readFileSync(FILE, 'utf8');
  } catch {
    return {};
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('expected a JSON object of chapter -> page number');
    }
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new Error(`non-numeric page value for chapter "${key}"`);
      }
    }
    return parsed as Record<string, number>;
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(`tocPositions: ignoring malformed ${FILE} (${reason}) — TOC page numbers will render blank this pass`);
    return {};
  }
}
