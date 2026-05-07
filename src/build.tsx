/**
 * Build Script
 *
 * Renders the complete ebook Document to a PDF file at output/ebook.pdf.
 * Imports fonts.ts first to register Inter, then renders via ReactPDF.render().
 * Reports file size and build time on completion.
 *
 * Run: pnpm build (tsx src/build.tsx)
 */
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';
import './fonts';
import EbookDocument from './Document';

const OUTPUT_DIR = path.resolve(__dirname, '../output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'ebook.pdf');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('Building PDF...');
const start = Date.now();

ReactPDF.render(<EbookDocument />, OUTPUT_FILE).then(() => {
  const elapsed = Date.now() - start;
  const stats = fs.statSync(OUTPUT_FILE);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`PDF generated: ${OUTPUT_FILE}`);
  console.log(`Size: ${sizeMB} MB | Time: ${elapsed}ms`);
}).catch((err: Error) => {
  console.error('Build failed:', err.message);
  process.exit(1);
});
