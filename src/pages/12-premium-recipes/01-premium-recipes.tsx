import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, ChecklistItem, ChecklistCategory } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Premium Deliverables & Recipes" wrap={false}>
      <SectionHeading>Premium Checklist</SectionHeading>
      <Text style={styles.body}>
        Every item below is concrete and verifiable. A PDF that hits all of these looks intentionally designed – not generated.
      </Text>

      <ChecklistCategory>Typography</ChecklistCategory>
      <ChecklistItem>Custom font registered (not default Helvetica/Arial)</ChecklistItem>
      <ChecklistItem>3+ distinct text sizes used with clear hierarchy</ChecklistItem>
      <ChecklistItem>Consistent heading styles across all pages</ChecklistItem>
      <ChecklistItem>Body text at readable size (10-12pt) with 1.5-1.6 line height</ChecklistItem>
      <ChecklistItem>Code blocks in monospace font with background color</ChecklistItem>

      <ChecklistCategory>Color & Visual</ChecklistCategory>
      <ChecklistItem>Color palette limited to 3-5 intentional colors</ChecklistItem>
      <ChecklistItem>Primary color for headings and emphasis areas</ChecklistItem>
      <ChecklistItem>Accent color for highlights, callout borders, interactive elements</ChecklistItem>
      <ChecklistItem>Neutral scale for body text, borders, and backgrounds</ChecklistItem>
      <ChecklistItem>Color used for meaning, not decoration</ChecklistItem>

      <ChecklistCategory>Production & Polish</ChecklistCategory>
      <ChecklistItem>Fonts embedded so output renders identically everywhere</ChecklistItem>
      <ChecklistItem>File size kept lean – images compressed, no unused assets</ChecklistItem>
      <ChecklistItem>Selectable, copyable text (not rasterized into images)</ChecklistItem>
      <ChecklistItem>Final PDF proofed at 100% zoom and at print scale</ChecklistItem>
  </ContentPage>
);

export default Page;
