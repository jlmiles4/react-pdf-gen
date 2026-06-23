import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, SectionBanner } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Introduction" wrap={false}>
    <SectionHeading>What This Book Is</SectionHeading>
    <Text style={styles.body}>
      A practical guide for developers using AI coding agents – Claude Code, Cursor, Copilot – to generate PDFs with @react-pdf/renderer. You know React. What you may not know is how to structure a react-pdf project so AI produces premium output instead of generic templates. That gap is what this book closes.
    </Text>
    <Text style={styles.body}>
      Every page you're reading was built with these patterns. The theme file, component library, build scripts, and reference docs are the actual tools that produced this document – not hypothetical examples.
    </Text>

    <SectionBanner
      title="Built for AI-Assisted Development"
      subtitle="The patterns in this book turn your AI coding agent from a generic template generator into a precision PDF builder."
    />

    <View style={styles.dividerAccent} />

    <SectionHeading>The Core Thesis</SectionHeading>
    <Text style={styles.body}>
      React-PDF is uniquely suited for AI-assisted development. It uses JSX – which AI models have deep training data on. It uses flexbox for layout – a familiar mental model. It renders server-side, so you can automate the entire pipeline.
    </Text>
    <Text style={styles.body}>
      However, the default output from an LLM rarely meets professional standards. Closing that gap is what the rest of this book is about – the specific architectural and design patterns that turn generic output into something premium.
    </Text>
  </ContentPage>
);

export default Page;
