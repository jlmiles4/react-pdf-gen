import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { ContentPage, SectionHeading, WarningBox, CodeBlock, Table } from '../components';

const Ch11Errors: React.FC = () => (
  <>
    {/* --- Page 2: Errors 4-6 --- */}
    <ContentPage sectionTitle="Troubleshooting">
      <SectionHeading>Orphaned Headings</SectionHeading>
      <WarningBox label="Symptom">
        A section heading (gold bar + title) appears at the very bottom of a page with no content following it. The body text starts on the next page.
      </WarningBox>
      <Text style={styles.body}>
        This happens when a heading fits at the page bottom but its following content doesn't. The fix is minPresenceAhead — it tells react-pdf to move the heading to the next page if there isn't enough room for both the heading and some content.
      </Text>
      <CodeBlock language="tsx">{`// Fix: add minPresenceAhead to heading wrapper
<View wrap={false} minPresenceAhead={40}>
  <Text style={styles.h2}>Section Title</Text>
</View>
// Now the heading only renders on this page if at least
// 40pt of content can fit below it`}</CodeBlock>

      <SectionHeading>Split Callout Boxes</SectionHeading>
      <WarningBox label="Symptom">
        A colored callout box (TipBox, WarningBox, InfoBox) splits across a page break. The top half shows the colored background and border, the bottom half appears on the next page without the background — looking broken.
      </WarningBox>
      <Text style={styles.body}>
        Callout boxes should always stay on a single page. The TipBox, WarningBox, and InfoBox components in this book already include wrap=false internally. If you build custom callouts, add wrap=false to the outer View. If a callout is too tall for one page, split it into two shorter boxes.
      </Text>
      <CodeBlock language="tsx">{`// The TipBox component already handles this:
<TipBox label="My Tip">
  Keep callout text concise — 2-3 sentences max.
</TipBox>

// For custom callouts, add wrap={false} yourself:
<View wrap={false} style={styles.tipBox}>
  <Text style={styles.tipLabel}>Custom Callout</Text>
  <Text style={styles.body}>Content here.</Text>
</View>`}</CodeBlock>

      <SectionHeading>Styles Not Applying</SectionHeading>
      <WarningBox label="Symptom">
        CSS-like styles that work in the browser have no effect in react-pdf. Properties seem to be ignored silently.
      </WarningBox>
      <Text style={styles.body}>
        react-pdf supports a subset of CSS. Property names must be camelCase, and several common web CSS properties are not available. Here are the most common mismatches:
      </Text>
      <Table
        headers={['Web CSS', 'react-pdf Equivalent']}
        rows={[
          ['box-shadow', 'Not supported — use borderWidth + borderColor'],
          ['text-decoration', 'textDecoration (underline, line-through)'],
          ['background: linear-gradient(...)', 'Not supported — use Svg + Defs'],
          ['display: grid', 'Not supported — use flexbox'],
          ['overflow: hidden', 'Not supported on Text'],
          ['font-weight: bold', 'fontWeight: 700 (numeric or named)'],
        ]}
        columnWidths={['45%', '55%']}
      />
    </ContentPage>
  </>
);

export default Ch11Errors;
