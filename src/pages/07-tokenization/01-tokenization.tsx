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
      Every AI model has a context window – the maximum request budget for instructions, conversation history, supplied files, and, depending on the provider, output. Limits and accounting rules vary, so check the active model's documentation instead of treating window size as a quality score.
    </Text>
    <Table
      headers={['Planning Factor', 'Verify', 'Project Heuristic']}
      rows={[
        ['Request limit', 'Provider model docs', 'Stay below the documented limit'],
        ['Input selection', 'Files needed for the task', 'Send only relevant sources'],
        ['Output allowance', 'Provider accounting rules', 'Leave room for the response'],
      ]}
      columnWidths={['30%', '30%', '40%']}
    />

    <WarningBox label="The 'Lost in the Middle' Problem">
      In specific retrieval and question-answering tests, some models used relevant information less reliably when it appeared in the middle of a long context than at the beginning or end. That does not mean a model ignores every middle page. Focused inputs are a practical risk-reduction heuristic; test important workflows with your chosen model.
    </WarningBox>
  </ContentPage>
);

export default Page;
