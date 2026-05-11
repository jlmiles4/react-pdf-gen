import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, WarningBox, CodeBlock } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Troubleshooting" wrap={false}>
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
);

export default Page;
