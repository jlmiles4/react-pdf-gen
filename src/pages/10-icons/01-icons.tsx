import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, WarningBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Icons over Emojis" wrap={false}>
      <SectionHeading>Emoji Trade-offs in PDFs</SectionHeading>
      <Text style={styles.body}>
        Emojis look harmless. They're quick to type and AI agents love inserting them. But in react-pdf, they introduce real problems:
      </Text>

      <Table
        headers={['Issue', 'Impact']}
        rows={[
          ['Needs an emoji image source', 'Remote sources add network risk; vendored sources work offline'],
          ['Raster images at fixed resolution', 'Blurry when zoomed – PDFs are vector-first'],
          ['Source-dependent artwork', 'A fixed source renders consistently across platforms'],
          ['Color baked into the artwork', 'Cannot be recolored with document tokens'],
          ['Informal appearance', 'Undercuts professional documents'],
          ['Remote CDN outage', 'Breaks builds only when the selected source is remote'],
        ]}
        columnWidths={['40%', '60%']}
      />

      <WarningBox label="Remote Source Risk">
        Font.registerEmojiSource() can use a remote set such as Twemoji or a vendored local image set. A remote source makes builds depend on the network and its host; vendor the assets when offline and reproducible rendering matter.
      </WarningBox>
  </ContentPage>
);

export default Page;
