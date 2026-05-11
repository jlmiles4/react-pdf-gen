import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, WarningBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Font Registration</SectionHeading>
    <Text style={styles.body}>
      Three font families are built in: Courier, Helvetica, and Times-Roman, each with bold and italic variants. For anything else, you register fonts explicitly.
    </Text>
    <CodeBlock language="tsx">{`import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Regular.ttf' },
    { src: '/fonts/Inter-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Inter-Italic.ttf', fontStyle: 'italic' },
  ],
});`}</CodeBlock>

    <WarningBox label="Font Limitations">
      Only TTF and WOFF formats work. OTF files and variable fonts are not supported. Register every weight and style you need – the renderer won't synthesize bold or italic from a regular font.
    </WarningBox>
  </ContentPage>
);

export default Page;
