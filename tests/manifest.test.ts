import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { chapterDestinationId, MANIFEST } from '../src/manifest';

const chapters = MANIFEST.flatMap((group) => group.chapters);

test('manifest chapter and group identities are unique', () => {
  const groupIds = MANIFEST.map((group) => group.id);
  const numbers = chapters.map((chapter) => chapter.num);
  const entries = chapters.map((chapter) => chapter.entryPage);

  assert.equal(new Set(groupIds).size, groupIds.length);
  assert.equal(new Set(numbers).size, numbers.length);
  assert.equal(new Set(entries).size, entries.length);
});

test('manifest chapter numbers are sequential zero-padded identifiers', () => {
  const expected = chapters.map((_, index) => String(index + 1).padStart(2, '0'));
  assert.deepEqual(chapters.map((chapter) => chapter.num), expected);
});

test('chapter destination IDs are stable, unique, and derived from manifest numbers', () => {
  const destinations = chapters.map((chapter) => chapterDestinationId(chapter.num));

  assert.deepEqual(
    destinations,
    chapters.map((chapter) => `chapter-${chapter.num}`),
  );
  assert.equal(new Set(destinations).size, destinations.length);
});

test('every manifest entry points to a matching chapter-title source file', () => {
  for (const chapter of chapters) {
    assert.match(chapter.entryPage, /\/00-title$/);

    const sourcePath = path.resolve('src/pages', `${chapter.entryPage}.tsx`);
    assert.equal(fs.existsSync(sourcePath), true, `${sourcePath} should exist`);

    const source = fs.readFileSync(sourcePath, 'utf8');
    const escapedNumber = chapter.num.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.match(
      source,
      new RegExp(`<ChapterTitle[\\s\\S]*?number=["']${escapedNumber}["']`),
      `${sourcePath} should render the manifest chapter number`,
    );
  }
});
