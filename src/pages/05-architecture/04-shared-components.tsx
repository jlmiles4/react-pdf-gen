import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>Shared Components</SectionHeading>
    <Text style={styles.body}>
      Components that appear on multiple pages live in the components/ folder. This is where consistency comes from.
    </Text>

    <Table
      headers={['Component', 'Purpose', 'Used By']}
      rows={[
        ['Header', 'Book title + section name at top', 'Every content page'],
        ['Footer', 'Page number + branding at bottom', 'Every page'],
        ['ChapterTitle', 'Full-page chapter opener', 'Start of each chapter'],
        ['ContentPage', 'Standard page with header/footer', 'All content pages'],
        ['CodeBlock', 'Styled code display', 'Technical chapters'],
        ['TipBox / WarningBox', 'Callout boxes', 'Any page with key info'],
        ['Table', 'Flexbox-based data table', 'Comparison/reference pages'],
        ['BulletList', 'Consistent bullet lists', 'Throughout'],
        ['Icons (SVG)', 'Vector icons for visual interest', 'Headers, callouts, lists'],
      ]}
      columnWidths={['25%', '40%', '35%']}
    />
  </ContentPage>
);

export default Page;
