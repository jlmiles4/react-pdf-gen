import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table, WarningBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Icons over Emojis" wrap={false}>
      <SectionHeading>Why Emojis Fail in PDFs</SectionHeading>
      <Text style={styles.body}>
        Emojis look harmless. They're quick to type and AI agents love inserting them. But in react-pdf, they introduce real problems:
      </Text>

      <Table
        headers={['Issue', 'Impact']}
        rows={[
          ['Requires Font.registerEmojiSource()', 'Internet connection needed at render time'],
          ['Raster images at fixed resolution', 'Blurry when zoomed – PDFs are vector-first'],
          ['Platform-dependent rendering', 'Looks different on Mac, Windows, Linux, mobile'],
          ['Can\'t match your color scheme', 'Always renders in original colors'],
          ['Informal appearance', 'Undercuts professional documents'],
          ['CDN dependency', 'Build fails if CDN is down or blocked'],
        ]}
        columnWidths={['40%', '60%']}
      />

      <WarningBox label="The CDN Problem">
        Font.registerEmojiSource() points to a CDN like Twemoji. If that CDN is down, behind a firewall, or the URL changes, your PDF build breaks. In production, this is an unacceptable dependency for a static document.
      </WarningBox>
  </ContentPage>
);

export default Page;
