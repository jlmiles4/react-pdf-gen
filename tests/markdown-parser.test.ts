import assert from 'node:assert/strict';
import test from 'node:test';

import { parseInline, parseMarkdown } from '../src/utils/markdownParser';

test('parseInline nests emphasis while keeping code and identifiers literal', () => {
  assert.deepEqual(parseInline('Use **bold with *italics* and `code`** in snake_case.'), [
    { type: 'plain', text: 'Use ' },
    {
      type: 'bold',
      children: [
        { type: 'plain', text: 'bold with ' },
        { type: 'italic', children: [{ type: 'plain', text: 'italics' }] },
        { type: 'plain', text: ' and ' },
        { type: 'code', text: 'code' },
      ],
    },
    { type: 'plain', text: ' in snake_case.' },
  ]);
});

test('parseInline does not close emphasis inside a code span', () => {
  assert.deepEqual(parseInline('Keep ** unmatched `code ** literal`.'), [
    { type: 'plain', text: 'Keep ** unmatched ' },
    { type: 'code', text: 'code ** literal' },
    { type: 'plain', text: '.' },
  ]);
});

test('parseMarkdown recognizes supported block structures and inline callout text', () => {
  const markdown = [
    '## A **useful** heading ##',
    '',
    '- one',
    '* two with `code`',
    '+ three',
    '',
    '> [!WARNING] label="Pay attention" Start **here**.',
    '> Then continue.',
  ].join('\n');

  assert.deepEqual(parseMarkdown(markdown), [
    {
      type: 'heading',
      level: 2,
      spans: [
        { type: 'plain', text: 'A ' },
        { type: 'bold', children: [{ type: 'plain', text: 'useful' }] },
        { type: 'plain', text: ' heading' },
      ],
    },
    {
      type: 'list',
      items: [
        [{ type: 'plain', text: 'one' }],
        [
          { type: 'plain', text: 'two with ' },
          { type: 'code', text: 'code' },
        ],
        [{ type: 'plain', text: 'three' }],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      label: 'Pay attention',
      spans: [
        { type: 'plain', text: 'Start ' },
        { type: 'bold', children: [{ type: 'plain', text: 'here' }] },
        { type: 'plain', text: '. Then continue.' },
      ],
    },
  ]);
});

test('parseMarkdown normalizes CRLF inside fenced code', () => {
  assert.deepEqual(parseMarkdown('```tsx\r\nconst value = 1;\r\n\r\nreturn value;\r\n```'), [
    {
      type: 'code',
      language: 'tsx',
      code: 'const value = 1;\n\nreturn value;',
    },
  ]);
});

test('parseMarkdown makes progress on tab-delimited unsupported syntax', () => {
  assert.deepEqual(parseMarkdown('#\tNot a heading\n-\tNot a list item'), [
    { type: 'text', spans: [{ type: 'plain', text: '#\tNot a heading' }] },
    { type: 'text', spans: [{ type: 'plain', text: '-\tNot a list item' }] },
  ]);
});
