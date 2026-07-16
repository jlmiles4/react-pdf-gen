/**
 * Font Registration
 *
 * Registers the Inter font family with 7 weight/style variants (400, 400-italic,
 * 500, 600, 600-italic, 700, 700-italic) from local .ttf files. Disables
 * hyphenation globally for cleaner text rendering.
 *
 * Must be imported before any rendering (imported by Document.tsx, so every
 * entry point that renders the book gets registration automatically).
 */
import { Font } from '@react-pdf/renderer';
import path from 'path';

const FONTS_DIR = path.resolve(__dirname, '../fonts');

Font.register({
  family: 'Inter',
  fonts: [
    { src: path.join(FONTS_DIR, 'Inter-Regular.ttf'), fontWeight: 400 },
    { src: path.join(FONTS_DIR, 'Inter-Italic.ttf'), fontWeight: 400, fontStyle: 'italic' },
    { src: path.join(FONTS_DIR, 'Inter-Medium.ttf'), fontWeight: 500 },
    { src: path.join(FONTS_DIR, 'Inter-SemiBold.ttf'), fontWeight: 600 },
    { src: path.join(FONTS_DIR, 'Inter-SemiBoldItalic.ttf'), fontWeight: 600, fontStyle: 'italic' },
    { src: path.join(FONTS_DIR, 'Inter-Bold.ttf'), fontWeight: 700 },
    { src: path.join(FONTS_DIR, 'Inter-BoldItalic.ttf'), fontWeight: 700, fontStyle: 'italic' },
  ],
});

// Disable hyphenation for cleaner text rendering
Font.registerHyphenationCallback((word) => [word]);
