/**
 * Chapter 05 — Tokenization and Context Windows
 *
 * How LLMs read code as tokens, context window sizes across models, the
 * "lost in the middle" problem, token costs of react-pdf structures,
 * the practical context-budget strategy, and reducing token waste.
 *
 * Sections: What Tokens Are, Context Window Math, Token Cost of React-PDF Code,
 *           Practical Strategy, Reducing Token Waste, Prompt Sizing, Key Takeaways
 * Components: CodeBlock, BulletList, Table, TipBox, WarningBox, InfoBox
 * Renders: 1 chapter title + 4 content pages
 */
import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import ContentPage from '../components/ContentPage';
import ChapterTitle from '../components/ChapterTitle';
import CodeBlock from '../components/CodeBlock';
import BulletList from '../components/BulletList';
import Table from '../components/Table';
import { TipBox, WarningBox, InfoBox } from '../components/TipBox';
import SectionHeading from '../components/SectionHeading';

const Ch05Tokenization: React.FC = () => (
  <>
    <ChapterTitle
      number="05"
      title="Tokenization and Context Windows"
      subtitle="How LLMs read your code – and how to make every token count."
    />

    <ContentPage sectionTitle="Tokenization">
      <SectionHeading>What Tokens Are</SectionHeading>
      <Text style={styles.body}>
        LLMs don't read characters or words. They read tokens – subword units that the model was trained to recognize. In English text, one token is roughly 4 characters or 0.75 words. Code tokenizes differently because of syntax characters.
      </Text>
      <Text style={styles.body}>
        This matters for react-pdf because your page components are code. The angle brackets, prop names, style objects, and JSX structure all consume tokens. A simple page component with a few Text elements and a StyleSheet might be 200-400 tokens. A complex page with tables and code blocks could be 600-1,000 tokens.
      </Text>

      <SectionHeading>Context Window Math</SectionHeading>
      <Text style={styles.body}>
        Every AI model has a context window – the total amount of text it can process in a single conversation turn. Specific models change frequently, but the categories remain stable:
      </Text>
      <Table
        headers={['Category', 'Context Window', 'Effective Working Memory']}
        rows={[
          ['Standard models', '32K-128K tokens', '~4,000-12,000 tokens (sweet spot)'],
          ['Large-context models', '128K-200K+ tokens', '~10,000-20,000 tokens (sweet spot)'],
          ['Extended-context models', '500K-1M+ tokens', '~20,000-40,000 tokens (sweet spot)'],
        ]}
        columnWidths={['30%', '30%', '40%']}
      />

      <WarningBox label="The 'Lost in the Middle' Problem">
        Research shows LLMs pay most attention to the beginning and end of their context. Content in the middle gets less attention. A 15,000-token monolithic PDF file means your AI is likely ignoring the pages in the middle – exactly where bugs hide.
      </WarningBox>

      <SectionHeading>Token Cost of React-PDF Code</SectionHeading>
      <Text style={styles.body}>
        JSX is token-expensive compared to plain text. Here's what typical react-pdf structures cost:
      </Text>
      <Table
        headers={['Structure', 'Approximate Tokens']}
        rows={[
          ['A StyleSheet.create() with 10 style objects', '200-350'],
          ['A simple page (title, 3 paragraphs)', '150-250'],
          ['A complex page (table, code block, callouts)', '400-800'],
          ['A shared component (Header or Footer)', '80-120'],
          ['A theme.ts with full design tokens', '300-500'],
          ['A 30-page monolith file', '8,000-15,000'],
        ]}
        columnWidths={['60%', '40%']}
      />

      <SectionHeading>The Practical Strategy</SectionHeading>
      <Text style={styles.body}>
        When you ask AI to edit a page, it needs context. Here's the optimal context budget:
      </Text>
      <BulletList items={[
        'theme.ts (design tokens): ~400 tokens',
        'Relevant shared components: ~200-400 tokens',
        'The page file being edited: ~200-600 tokens',
        'Your instructions: ~100-300 tokens',
        'Total: 900-1,700 tokens of context – well within any model\'s sweet spot',
      ]} />
      <Text style={styles.body}>
        Compare that to the monolith approach: 8,000-15,000 tokens dumped into context, with your edit instructions buried somewhere inside. The file-per-page architecture isn't just about code organization. It's about giving AI the right amount of focused context.
      </Text>

      <SectionHeading>Reducing Token Waste</SectionHeading>
      <BulletList items={[
        'Extract repeated styles into shared.ts – define once, reference everywhere',
        'Use short but descriptive variable names – "s" for local styles is fine',
        'Don\'t add comments that restate the obvious – "// Render the title" above a title render',
        'Keep page components focused – if a section could be its own page, make it one',
        'Use the reference/ folder pattern – AI reads concise docs instead of loading all source',
      ]} />

      <SectionHeading>Prompt Sizing in Practice</SectionHeading>
      <Text style={styles.body}>
        Here's what an efficient AI prompt looks like. Notice how small and focused the context is:
      </Text>
      <CodeBlock language="text">{`Context files (paste these):
  1. theme.ts (your design tokens)
  2. ContentPage.tsx (the wrapper component)
  3. Page07-Ch05-Tokenization.tsx (the target page)

Instruction:
  "Add a new section called 'Prompt Sizing' after
  the BulletList. Use styles.h2 for the heading
  and styles.body for the paragraph. Include a
  CodeBlock showing an example prompt."`}</CodeBlock>
      <Text style={styles.body}>
        Total context: roughly 1,200 tokens. The AI has everything it needs to produce code that matches your design system, uses the correct component wrapper, and fits the existing page structure. No guesswork required.
      </Text>

      <InfoBox label="The Reference Folder">
        Keep a reference/ folder with concise markdown docs about your project: design tokens, component API, coding conventions. When prompting AI, point it to these docs instead of loading all source files. Markdown tokenizes more efficiently than TypeScript code.
      </InfoBox>

      <TipBox label="Token Budget Template">
        For each AI edit session, aim for this budget: theme (400) + components (300) + target page (400) + instructions (200) = 1,300 tokens. That leaves the AI 98% of its context window for reasoning and generating output.
      </TipBox>

      <SectionHeading>Try It Yourself</SectionHeading>
      <Text style={styles.body}>
        Theory is useful. Numbers you've measured yourself are better. Here's a quick exercise to make token budgets concrete for your project:
      </Text>
      <BulletList items={[
        'Find your largest source file. Run "wc -c" on it and divide by 3.3 to estimate tokens. If it\'s over 1,000 tokens, that\'s a candidate for splitting.',
        'Count the files an AI needs to edit one page: theme.ts + shared components + the page itself + your instructions. Add up the estimated tokens. Is the total under 2,000?',
        'Try the prompt sizing template from this chapter with your actual project files. Paste the context into your AI tool and ask it to generate a new page. Did it use the right design tokens?',
        'If it didn\'t, check what was missing from the context — that gap is what causes slop in practice.',
      ]} />

      <Text style={styles.body}>
        The compound effect is significant: a project where each page file is 400 tokens means the AI can read the complete context for any edit in under 1,500 tokens. That's less than 1% of most model context windows. The remaining 99% is available for reasoning, generating code that matches your patterns, and iterating.
      </Text>
    </ContentPage>
  </>
);

export default Ch05Tokenization;
