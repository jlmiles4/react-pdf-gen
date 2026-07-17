import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, Table, InfoBox } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Architecture" wrap={false}>
    <SectionHeading>PDF Metadata</SectionHeading>
    <Text style={styles.body}>
      The Document component accepts metadata props that get embedded in the PDF's info dictionary. Viewers show them in tab and title bars, search tools and file browsers index them, and assistive technology reads them – so setting them is a few props of effort for a more professional, accessible deliverable.
    </Text>
    <Table
      headers={['Prop', 'What it sets']}
      rows={[
        ['title', 'Shown in viewer tabs and title bars; used when shared or indexed'],
        ['author', 'Person or organization credited as the author'],
        ['subject', "One-line description of the document's topic"],
        ['keywords', 'Comma-separated terms that search tools index'],
        ['creator', 'The application the content was authored in'],
        ['producer', 'The library that generated the PDF (react-pdf sets a default)'],
      ]}
      columnWidths={['20%', '80%']}
    />
    <InfoBox label="Set title and author at minimum">
      They surface in viewer chrome and file listings and are read by screen readers, so a document without them looks unfinished when shared. Drive the values from your data so every generated file is labeled correctly.
    </InfoBox>
  </ContentPage>
);

export default Page;
