import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
    <SectionHeading>Recipe: Data-Driven Pages</SectionHeading>
    <Text style={styles.body}>
      Most useful PDFs are generated from data, not static content. The pattern: pass a typed array, .map() to render one page per item, use conditional rendering to control which sections appear. Each page becomes a pure function of its data – change the input and the PDF rebuilds.
    </Text>
    <CodeBlock language="tsx">{`interface Section {
  title: string;
  body: string;
  metrics?: { label: string; value: string }[];
}

const Report = ({ sections }: { sections: Section[] }) => (
  <Document>
    {sections.map((section, i) => (
      <ContentPage key={i} sectionTitle={section.title}>
        <SectionHeading>{section.title}</SectionHeading>
        <Text style={styles.body}>{section.body}</Text>

        {section.metrics && (
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            {section.metrics.map((m, j) => (
              <View key={j} wrap={false} style={{
                flex: 1,
                backgroundColor: colors.neutral[50],
                padding: spacing.md,
                borderRadius: borders.radius.md,
              }}>
                <Text style={styles.bodySmall}>{m.label}</Text>
                <Text style={styles.h3}>{m.value}</Text>
              </View>
            ))}
          </View>
        )}
      </ContentPage>
    ))}
  </Document>
);`}</CodeBlock>
  </ContentPage>
);

export default Page;
