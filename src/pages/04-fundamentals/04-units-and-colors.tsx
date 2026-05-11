import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, Table } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <View wrap={false}>
      <Text style={styles.h3}>Units</Text>
      <Text style={styles.body}>
        The default unit is points (pt). 1 inch = 72 points. You can also use strings with unit suffixes.
      </Text>
      <Table
        headers={['Unit', 'Example', 'Notes']}
        rows={[
          ['Points', '16', 'Default – no suffix needed'],
          ['Inches', '"1in"', '1in = 72pt'],
          ['Millimeters', '"25.4mm"', '25.4mm = 1in = 72pt'],
          ['Centimeters', '"2.54cm"', '2.54cm = 1in = 72pt'],
          ['Percentage', '"50%"', 'Relative to parent container'],
        ]}
        columnWidths={['20%', '25%', '55%']}
      />
    </View>

    <Text style={styles.h3}>Colors</Text>
    <Text style={styles.body}>
      Hex, RGB, RGBA, HSL, and named colors all work. Define your palette once in a theme file and reference the constants everywhere.
    </Text>
  </ContentPage>
);

export default Page;
