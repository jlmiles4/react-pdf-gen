import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, fonts, borders, typography, fontWeight, layout, iconSize } from '../../styles/theme';
import { ContentPage, Table, SectionHeading } from '../../components';
import { ArrowRightIcon } from '../../components/Icons';

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
});

const Page: React.FC = () => (
  <ContentPage sectionTitle="AI Visual Analysis" wrap={false}>
      <SectionHeading>Why PNGs Beat Raw PDFs for AI Review</SectionHeading>
      <Text style={styles.body}>
        AI tools preprocess PDFs differently, often combining extracted text with page images. For visual QA, control that conversion: export PNGs at a chosen DPI so the model reviews the same rendered pixels your reader sees.
      </Text>

      <SectionHeading>Visual QA Workflow</SectionHeading>
      <View wrap={false} style={local.flowRow}>
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>1</Text>
          <Text style={local.flowStepLabel}>Generate PDF</Text>
        </View>
        <ArrowRightIcon size={iconSize.md} color={colors.neutral[400]} />
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>2</Text>
          <Text style={local.flowStepLabel}>Export to PNG</Text>
        </View>
        <ArrowRightIcon size={iconSize.md} color={colors.neutral[400]} />
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>3</Text>
          <Text style={local.flowStepLabel}>AI Reviews PNG</Text>
        </View>
        <ArrowRightIcon size={iconSize.md} color={colors.neutral[400]} />
        <View style={local.flowStep}>
          <Text style={local.flowStepNum}>4</Text>
          <Text style={local.flowStepLabel}>Fix & Repeat</Text>
        </View>
      </View>

      <SectionHeading>PDF to PNG Conversion</SectionHeading>
      <Text style={styles.body}>
        The most reliable tool is pdftoppm from the poppler-utils package. It's fast, handles edge cases well, and produces clean output. DPI trades image quality against file size – 200 DPI is the sweet spot. Sizes below are measured from this book's text-heavy pages.
      </Text>
      <Table
        headers={['DPI', 'Use Case', 'File Size']}
        rows={[
          ['72', 'Quick preview, thumbnail', '~15-105KB per page'],
          ['150', 'Standard review, good detail', '~35-265KB per page'],
          ['200', 'Detailed AI analysis (recommended)', '~50-320KB per page'],
          ['300', 'Print-quality verification', '~80-440KB per page'],
        ]}
        columnWidths={['15%', '50%', '35%']}
      />
  </ContentPage>
);

export default Page;
