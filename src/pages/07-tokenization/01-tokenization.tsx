import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, WarningBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Tokenization" wrap={false}>
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
  </ContentPage>
);

export default Page;
