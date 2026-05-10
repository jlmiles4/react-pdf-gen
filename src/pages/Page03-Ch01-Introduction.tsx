// Group: FOUNDATIONS
/**
 * Chapter 01 — Introduction
 *
 * Sets the stage: what this book is, the core thesis (react-pdf + AI = premium PDFs),
 * who it's for, and why react-pdf over other tools.
 *
 * Sections: What This Book Is, The Core Thesis, Who This Is For, Why React-PDF
 * Components: SectionBanner, BulletList, TipBox
 * Renders: 1 chapter title + 2 content pages
 */
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import ContentPage from '../components/ContentPage';
import ChapterTitle from '../components/ChapterTitle';
import BulletList from '../components/BulletList';
import { TipBox } from '../components/TipBox';
import SectionHeading from '../components/SectionHeading';
import SectionBanner from '../components/SectionBanner';

const Ch01Intro: React.FC = () => (
  <>
    <ChapterTitle
      number="01"
      title="Introduction"
      subtitle="Why react-pdf and AI belong together – and what this book will teach you."
    />

    <ContentPage sectionTitle="Introduction">
      <SectionHeading>What This Book Is</SectionHeading>
      <Text style={styles.body}>
        A practical guide for developers using AI coding agents – Claude Code, Cursor, Copilot – to generate PDFs with @react-pdf/renderer. You know React. What you may not know is how to structure a react-pdf project so AI produces premium output instead of generic templates. That gap is what this book closes.
      </Text>
      <Text style={styles.body}>
        Every page you're reading was built with these patterns. The theme file, component library, build scripts, and reference docs are the actual tools that produced this document — not hypothetical examples.
      </Text>

      <SectionBanner
        title="Built for AI-Assisted Development"
        subtitle="The patterns in this book turn your AI coding agent from a generic template generator into a precision PDF builder."
      />

      <View style={styles.dividerAccent} />

      <SectionHeading>The Core Thesis</SectionHeading>
      <Text style={styles.body}>
        React-pdf is uniquely suited for AI-assisted development. It uses JSX – which AI models have deep training data on. It uses flexbox for layout – a familiar mental model. It renders server-side, so you can automate the entire pipeline.
      </Text>
      <Text style={styles.body}>
        However, the default output from an LLM rarely meets professional standards. Bridging that distance requires a specific set of architectural and design patterns:
      </Text>
      <BulletList items={[
        'Project architecture that fits within AI context windows',
        'Design systems with explicit tokens that enforce consistency',
        'File structures that let AI edit one page without breaking others',
        'Visual QA loops using PNG exports instead of raw PDF files',
        'SVG icons instead of emojis for professional output',
        'Iteration workflows that refine first drafts into polished deliverables',
      ]} />

      <SectionHeading>Who This Is For</SectionHeading>
      <Text style={styles.body}>
        You're a developer using AI tools to build. You need to generate PDFs – reports, ebooks, invoices, proposals, documentation – and you want them to look like someone with design sense made them, not like a default template.
      </Text>
      <Text style={styles.body}>
        You might be a solo builder shipping a product, a technical lead evaluating stacks, or a developer on a team that needs automated PDF generation. This book covers all three angles, weighted toward the hands-on builder.
      </Text>

      <TipBox label="What You Won't Find Here">
        This is not an API reference for react-pdf. The official docs at react-pdf.org cover that. This book is about the patterns and workflows that make AI + react-pdf produce premium results.
      </TipBox>

      <SectionHeading>Why React-PDF</SectionHeading>
      <Text style={styles.body}>
        There are many PDF generation tools. Here's why react-pdf stands out for AI-assisted workflows:
      </Text>
      <BulletList items={[
        'It\'s React – AI models have extensive training data on React components and JSX',
        'Declarative layout – you describe what you want, the engine handles rendering',
        'Flexbox – the same layout model you use on the web, not PDF-specific coordinates',
        'Server-side rendering – ReactPDF.render() outputs to file or stream, fully automatable',
        'Component model – reusable, composable pieces that AI can generate one at a time',
        'Active maintenance – regular updates, solid community, well-documented API',
      ]} />
    </ContentPage>
  </>
);

export default Ch01Intro;
