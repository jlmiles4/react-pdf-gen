import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, CodeBlock, TipBox, SectionHeading } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Language" wrap={false}>
    <View wrap={false}>
      <SectionHeading>Border and Radius Tokens</SectionHeading>
      <Text style={styles.body}>
        Define border widths and corner radii alongside your other tokens. Without these, AI mixes 4px rounded corners on one card with 8px on another – subtle but noticeable.
      </Text>
      <CodeBlock language="typescript">{`export const borders = {
  thin: 0.5,     // Dividers, table cell borders
  medium: 1,     // Card borders, callout boxes
  thick: 2,      // Emphasis borders, accent bars
  radius: {
    sm: 3,       // Subtle rounding (badges, tags)
    md: 6,       // Cards, callout boxes, code blocks
    lg: 10,      // Feature cards, hero elements
  },
};`}</CodeBlock>
    </View>

    <SectionHeading>Semantic Color Tokens</SectionHeading>
    <Text style={styles.body}>
      Beyond your core palette, define semantic colors for meaning: success (green), warning (amber), error (red), info (blue). Include light variants for callout backgrounds.
    </Text>
    <CodeBlock language="typescript">{`success: '#2D8B4E',  successLight: '#F0F9F4',
warning: '#D98E00',  warningLight: '#FEF8E6',
error:   '#C43333',  errorLight:   '#FEF3F3',
info:    '#2E6BB5',  infoLight:    '#EDF1F8',`}</CodeBlock>

    <TipBox label="The Complete Token Set">
      A professional design system for react-pdf needs exactly four categories: colors (5-8 base values), typography (7-9 sizes), spacing (6-8 values), and borders (3 widths + 3 radii). Add semantic colors for callouts. Anything more adds complexity without visible benefit.
    </TipBox>
  </ContentPage>
);

export default Page;
