/**
 * Build Script
 *
 * Renders the complete ebook Document to a PDF file at
 * output/react-pdf-ai-builders-guide.pdf.
 *
 * Two-pass: pass 1 renders the PDF, then `pdftotext` extracts the page where
 * each "CHAPTER NN" title page lands. Those positions get written to
 * output/toc-positions.json. Pass 2 re-renders so the TOC reflects them. The
 * TOC reserves its page-number column on both passes, so layout is identical
 * across passes and pass-1 positions remain valid for pass-2.
 *
 * Run: pnpm build (tsx src/build.tsx, sync runs first to refresh registry)
 */
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';
import { execFileSync } from 'child_process';
import './fonts';
import EbookDocument from './Document';
import { MANIFEST } from './manifest';
import { allPages } from './registry';

const OUTPUT_DIR = path.resolve(__dirname, '../output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'react-pdf-ai-builders-guide.pdf');
const POSITIONS_FILE = path.join(OUTPUT_DIR, 'toc-positions.json');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function renderPdf(): Promise<void> {
  await ReactPDF.render(<EbookDocument />, OUTPUT_FILE);
}

// Both tools ship with poppler-utils. Don't auto-install (sudo/network/OS vary) —
// detect them before pass 1 and print platform-specific guidance instead.
function checkPopplerTools(): void {
  const missing = ['pdftotext', 'pdfinfo'].filter((tool) => {
    try {
      execFileSync(tool, ['-v'], { stdio: 'ignore' });
      return false;
    } catch {
      return true;
    }
  });

  if (missing.length > 0) {
    console.error(`Error: required Poppler tool(s) not found: ${missing.join(', ')}`);
    console.error('Install poppler-utils:');
    console.error('  Debian/Ubuntu: sudo apt-get install -y poppler-utils');
    console.error('  macOS:         brew install poppler');
    console.error('  Fedora/RHEL:   sudo dnf install poppler-utils');
    process.exit(1);
  }
}

function extractTocPositions(): Record<string, number> {
  const text = execFileSync('pdftotext', ['-layout', OUTPUT_FILE, '-'], { encoding: 'utf8' });
  const pages = text.split('\f');
  const positions: Record<string, number> = {};
  for (let i = 0; i < pages.length; i++) {
    for (const raw of pages[i].split('\n')) {
      const match = raw.trim().match(/^CHAPTER\s+(\d{1,2})$/);
      if (match) {
        const key = match[1].padStart(2, '0');
        if (!(key in positions)) positions[key] = i + 1;
        break;
      }
    }
  }
  return positions;
}

const LETTER_WIDTH = 612;
const LETTER_HEIGHT = 792;

// A wrap={false} page whose content overflows silently grows the page box instead
// of erroring, so this must be checked after render rather than relying on react-pdf.
function checkPageSizes(): void {
  const info = execFileSync('pdfinfo', [OUTPUT_FILE], { encoding: 'utf8' });
  const pagesMatch = info.match(/^Pages:\s+(\d+)$/m);
  if (!pagesMatch) {
    console.error('Error: could not determine page count from pdfinfo output.');
    process.exit(1);
  }
  const pageCount = Number(pagesMatch[1]);
  if (pageCount !== allPages.length) {
    console.error(
      `Error: rendered ${pageCount} PDF page(s), but the registry contains ${allPages.length} page component(s). Each page file must render exactly one PDF page.`,
    );
    process.exit(1);
  }

  const perPage = execFileSync('pdfinfo', ['-f', '1', '-l', String(pageCount), OUTPUT_FILE], {
    encoding: 'utf8',
  });
  const sizes = new Map<number, { width: number; height: number }>();
  const offenders: string[] = [];
  for (const raw of perPage.split('\n')) {
    const match = raw.match(/^Page\s+(\d+)\s+size:\s+([\d.]+)\s+x\s+([\d.]+)\s+pts/);
    if (!match) continue;
    const [, page, width, height] = match;
    const pageNumber = Number(page);
    const numericWidth = Number(width);
    const numericHeight = Number(height);
    sizes.set(pageNumber, { width: numericWidth, height: numericHeight });
    if (numericWidth !== LETTER_WIDTH || numericHeight !== LETTER_HEIGHT) {
      offenders.push(`page ${page} (${width}x${height})`);
    }
  }
  const missingSizeRecords = Array.from({ length: pageCount }, (_, index) => index + 1)
    .filter((pageNumber) => !sizes.has(pageNumber));
  if (missingSizeRecords.length > 0) {
    console.error(
      `Error: pdfinfo returned no size record for ${missingSizeRecords.length} page(s): ${missingSizeRecords.join(', ')}`,
    );
    process.exit(1);
  }
  if (offenders.length > 0) {
    console.error(`Error: ${offenders.length} page(s) are not uniform LETTER size (${LETTER_WIDTH}x${LETTER_HEIGHT}): ${offenders.join(', ')}`);
    process.exit(1);
  }
}

export async function buildPdf(): Promise<void> {
  checkPopplerTools();

  console.log('Building PDF...');
  const start = Date.now();

  await renderPdf();

  const positions = extractTocPositions();
  fs.writeFileSync(POSITIONS_FILE, JSON.stringify(positions, null, 2) + '\n');
  console.log(`TOC positions: ${Object.keys(positions).length} chapters mapped`);

  // Guard against silent TOC regressions: every manifest chapter should map to a
  // page. A miss means a chapter divider's "CHAPTER NN" text didn't match and the
  // TOC will render a blank page number for it.
  const missing = MANIFEST.flatMap((g) => g.chapters)
    .filter((c) => !(c.num in positions))
    .map((c) => c.num);
  if (missing.length > 0) {
    console.error(`Error: TOC: ${missing.length} chapter(s) had no detected page and will render blank: ${missing.join(', ')}`);
    process.exit(1);
  }

  await renderPdf();

  checkPageSizes();

  const elapsed = Date.now() - start;
  const stats = fs.statSync(OUTPUT_FILE);
  console.log(`PDF generated: ${OUTPUT_FILE}`);
  console.log(`Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB | Time: ${elapsed}ms`);
}

if (path.resolve(process.argv[1] ?? '') === __filename) {
  buildPdf().catch((err: unknown) => {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Build failed:', message);
    process.exit(1);
  });
}
