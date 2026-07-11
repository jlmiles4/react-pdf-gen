import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, WarningBox, CodeBlock, Table } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Troubleshooting" wrap={false}>
    <SectionHeading>Content Overflows the Page</SectionHeading>
    <WarningBox label="Symptom">
      Content runs off the bottom of the page, disappearing below the margin. Footer may overlap with body text.
    </WarningBox>
    <Text style={styles.body}>
      This project renders one non-wrapping ContentPage per source file. If one overflows, shorten or split that file. In a wrapping document, a wrap=false parent or fixed content height can block page breaks.
    </Text>
    <CodeBlock language="tsx">{`// On a wrapping Page, this child cannot break
<View wrap={false} style={{ minHeight: 800 }}>
  {/* Content can't split – overflows the page */}
</View>
// Fix there: allow the parent to wrap, lock each item
<View> {/* wrap={true} is default */}
  {items.map((item, i) => (
    <View key={i} wrap={false}> {/* Each item stays together */}
      <Text style={styles.body}>{item}</Text>
    </View>
  ))}
</View>`}</CodeBlock>

    <SectionHeading>Other Culprits to Check</SectionHeading>
    <Table
      headers={['Property', 'Why it overflows', 'Fix']}
      rows={[
        ['height / minHeight', 'Forces a content box taller than the page can hold.', 'Remove it from content containers.'],
        ['position: absolute', 'Escapes flow, so react-pdf cannot break it.', 'Use flex layout for body content.'],
      ]}
      columnWidths={['28%', '42%', '30%']}
    />
  </ContentPage>
);

export default Page;
