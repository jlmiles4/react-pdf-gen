import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, fonts, borders, typography, fontWeight, layout } from '../../styles/theme';
import { ContentPage, Table, SectionHeading } from '../../components';

const local = StyleSheet.create({
  flowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.neutral[50],
    borderRadius: borders.radius.md,
  },
  flowStep: {
    alignItems: 'center',
    width: layout.flowStepWidth,
  },
  flowStepNum: {
    fontSize: typography.h2.fontSize,
    fontFamily: fonts.heading,
    fontWeight: fontWeight.bold,
    color: colors.accent[500],
    marginBottom: spacing.xs,
  },
  flowStepLabel: {
    fontSize: typography.code.fontSize,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.primary[700],
    textAlign: 'center',
  },
  flowArrow: {
    fontSize: typography.h3.fontSize,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    color: colors.neutral[400],
  },
});

const Page: React.FC = () => (
  <ContentPage sectionTitle="AI Visual Analysis" wrap={false}>
      <SectionHeading>Why AI Can't Analyze PDF Files</SectionHeading>
      <Text style={styles.body}>
        You've built the page. It compiles. It renders. But how do you know it actually looks right? If you upload that .pdf directly to an AI, you'll get vague feedback at best. AI vision models understand pixels, not PDF coordinate systems and PostScript drawing commands.
      </Text>
      <Text style={styles.body}>
        The fix is dead simple: convert your PDF pages to PNG images, then show those images to the AI. Now it sees exactly what your reader sees.
      </Text>

      <SectionHeading>Visual QA Workflow</SectionHeading>
      <View wrap={false} style={local.flowRow}>
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>1</Text>
          <Text style={local.flowStepLabel}>Generate PDF</Text>
        </View>
        <Text style={local.flowArrow}>&rarr;</Text>
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>2</Text>
          <Text style={local.flowStepLabel}>Export to PNG</Text>
        </View>
        <Text style={local.flowArrow}>&rarr;</Text>
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>3</Text>
          <Text style={local.flowStepLabel}>AI Reviews PNG</Text>
        </View>
        <Text style={local.flowArrow}>&rarr;</Text>
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>4</Text>
          <Text style={local.flowStepLabel}>Fix & Repeat</Text>
        </View>
      </View>

      <SectionHeading>PDF to PNG Conversion</SectionHeading>
      <Text style={styles.body}>
        The most reliable tool is pdftoppm from the poppler-utils package. It's fast, handles edge cases well, and produces clean output. DPI controls the trade-off between image quality and file size — 200 DPI is the sweet spot for AI analysis.
      </Text>
      <Table
        headers={['DPI', 'Use Case', 'File Size']}
        rows={[
          ['72', 'Quick preview, thumbnail', '~50-100KB per page'],
          ['150', 'Standard review, good detail', '~200-400KB per page'],
          ['200', 'Detailed AI analysis (recommended)', '~400-700KB per page'],
          ['300', 'Print-quality verification', '~800KB-1.5MB per page'],
        ]}
        columnWidths={['15%', '50%', '35%']}
      />
  </ContentPage>
);

export default Page;
