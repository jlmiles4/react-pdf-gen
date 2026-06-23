/**
 * Build Script
 *
 * Renders the complete ebook Document to a PDF file at output/ebook.pdf.
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
import { execSync } from 'child_process';
import './fonts';
import EbookDocument from './Document';
import { MANIFEST } from './manifest';

const OUTPUT_DIR = path.resolve(__dirname, '../output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'ebook.pdf');
const POSITIONS_FILE = path.join(OUTPUT_DIR, 'toc-positions.json');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function renderPdf(): Promise<void> {
  await ReactPDF.render(<EbookDocument />, OUTPUT_FILE);
}

// pdftotext ships with poppler-utils. Don't auto-install (sudo/network/OS vary) —
// detect it before pass 1 and print platform-specific guidance instead.
function checkPdftotext(): void {
  try {
    execSync('pdftotext -v', { stdio: 'ignore' });
  } catch {
    console.error('Error: pdftotext not found (needed to extract TOC page positions).');
    console.error('Install poppler-utils:');
    console.error('  Debian/Ubuntu: sudo apt-get install -y poppler-utils');
    console.error('  macOS:         brew install poppler');
    console.error('  Fedora/RHEL:   sudo dnf install poppler-utils');
    process.exit(1);
  }
}

function extractTocPositions(): Record<string, number> {
  const text = execSync(`pdftotext -layout "${OUTPUT_FILE}" -`, { encoding: 'utf8' });
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

async function main(): Promise<void> {
  checkPdftotext();

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
    console.warn(`⚠ TOC: ${missing.length} chapter(s) had no detected page and will render blank: ${missing.join(', ')}`);
  }

  await renderPdf();

  const elapsed = Date.now() - start;
  const stats = fs.statSync(OUTPUT_FILE);
  console.log(`PDF generated: ${OUTPUT_FILE}`);
  console.log(`Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB | Time: ${elapsed}ms`);
}

main().catch((err: Error) => {
  console.error('Build failed:', err.message);
  process.exit(1);
});
