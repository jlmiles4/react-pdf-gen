// Group: SHIPPING
/**
 * Chapter 11 — Troubleshooting & Common Errors
 *
 * The top 8 react-pdf errors with causes and fixes, plus a debug workflow.
 * Each error: SectionHeading + WarningBox with error message + body explanation
 * + CodeBlock with fix. Uses wrap={false} error cards.
 *
 * Sections: Text String Error, Fonts Not Loading, Content Overflows,
 *           Orphaned Headings, Split Callout Boxes, Styles Not Applying,
 *           Flexbox Surprises, Build & Memory Errors, The Debug Workflow
 * Components: CodeBlock, BulletList, TipBox, WarningBox, Table, SectionHeading
 * Renders: 1 chapter title + 3 content pages
 */
import React from 'react';
import path from 'path';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { ContentPage, ChapterTitle, SectionHeading, WarningBox, CodeBlock } from '../components';

const Ch11Troubleshooting: React.FC = () => (
  <>
    <ChapterTitle
      number="11"
      title="Troubleshooting & Common Errors"
      subtitle="The errors you'll hit, why they happen, and how to fix them fast."
    />

    {/* --- Page 1: Errors 1-3 --- */}
    <ContentPage sectionTitle="Troubleshooting">
      <SectionHeading>Text String Must Be Rendered Inside Text</SectionHeading>
      <WarningBox label="Error Message">
        "Text string must be rendered inside a &lt;Text&gt; component."
      </WarningBox>
      <Text style={styles.body}>
        This is the most common react-pdf crash. Raw strings placed directly inside a View (or any non-Text component) cause the renderer to fail. Every piece of visible text must be wrapped in a Text component.
      </Text>
      <CodeBlock language="tsx">{`// Broken — raw string inside View
<View>
  This will crash
</View>

// Fixed — wrap in Text
<View>
  <Text style={styles.body}>This renders correctly</Text>
</View>`}</CodeBlock>

      <SectionHeading>Fonts Not Loading</SectionHeading>
      <WarningBox label="Symptom">
        Text renders in Helvetica instead of your registered font, or the PDF shows blank text where custom fonts should appear.
      </WarningBox>
      <Text style={styles.body}>
        Font issues are silent — react-pdf falls back to Helvetica without warning. Common causes: wrong file path, unregistered weight, or mismatched fontFamily name.
      </Text>
      <CodeBlock language="tsx">{`// Check 1: Is the path correct? Use a resolved base dir.
const FONTS_DIR = path.resolve(__dirname, '../fonts');
Font.register({ family: 'Inter', fonts: [
  { src: path.join(FONTS_DIR, 'Inter-Regular.ttf'),
    fontWeight: 400 },
  { src: path.join(FONTS_DIR, 'Inter-Bold.ttf'),
    fontWeight: 700 },
]});

// Check 2: Does fontWeight match a registered weight?
// If you use a weight that wasn't registered (e.g., 300), 
// it falls back to the nearest available weight.
<Text style={{ fontFamily: 'Inter', fontWeight: 300 }}>Mismatched weight</Text>`}
</CodeBlock>

      <SectionHeading>Content Overflows the Page</SectionHeading>
      <WarningBox label="Symptom">
        Content runs off the bottom of the page, disappearing below the margin. Footer may overlap with body text.
      </WarningBox>
      <Text style={styles.body}>
        Two common causes: a parent View has wrap=false (preventing page breaks), or fixed heights constrain the layout. react-pdf needs wrapping enabled to split content across pages.
      </Text>
      <CodeBlock language="tsx">{`// Problem: wrap={false} prevents page breaks
<View wrap={false} style={{ minHeight: 800 }}>
  {/* Content can't split — overflows the page */}
</View>

// Fix: wrap the parent, lock individual items
<View> {/* wrap={true} is default */}
  {items.map((item, i) => (
    <View key={i} wrap={false}> {/* Each item stays together */}
      <Text style={styles.body}>{item}</Text>
    </View>
  ))}
</View>`}</CodeBlock>
    </ContentPage>
  </>
);

export default Ch11Troubleshooting;
