import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, fonts, borders, typography, fontScale, fontWeight } from '../../styles/theme';
import { ContentPage, SectionHeading, WarningBox, Table } from '../../components';

const local = StyleSheet.create({
  compareRow: { flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.md },
  compareBox: { flex: 1, borderWidth: borders.medium, borderColor: colors.neutral[200], borderRadius: borders.radius.md, padding: spacing.md, backgroundColor: colors.neutral[50] },
  compareLabel: { fontSize: typography.code.fontSize, fontFamily: fonts.bodyBold, fontWeight: fontWeight.semibold, color: colors.primary[700], marginBottom: spacing.sm, textAlign: 'center' },
  compareBadLabel: { fontSize: typography.code.fontSize, fontFamily: fonts.bodyBold, fontWeight: fontWeight.semibold, color: colors.error, marginBottom: spacing.sm, textAlign: 'center' },
  mockBlock: { backgroundColor: colors.neutral[200], borderRadius: borders.radius.sm, height: spacing.lg + spacing.xs, marginBottom: spacing.xs, justifyContent: 'center', alignItems: 'center' },
  mockBlockSmall: { flex: 1, backgroundColor: colors.neutral[200], borderRadius: borders.radius.sm, height: spacing.lg + spacing.xs, justifyContent: 'center', alignItems: 'center' },
  mockRow: { flexDirection: 'row', gap: spacing.xs },
  mockText: { fontSize: fontScale.micro, fontFamily: fonts.mono, fontWeight: fontWeight.regular, color: colors.neutral[600] },
});

const Page: React.FC = () => (
  <ContentPage sectionTitle="Troubleshooting" wrap={false}>
    <SectionHeading>Styles Not Applying</SectionHeading>
    <Text style={styles.body}>
      react-pdf supports a subset of CSS. Property names must be camelCase, and several common web CSS properties are not available:
    </Text>
    <Table
      headers={['Web CSS', 'react-pdf Equivalent']}
      rows={[
        ['box-shadow', 'Not supported – use borderWidth + borderColor'],
        ['text-decoration', 'textDecoration (underline, line-through)'],
        ['linear-gradient', 'Not supported – use Svg + Defs'],
        ['display: grid', 'Not supported – use flexbox'],
        ['font-weight: bold', 'fontWeight: 700 (numeric or named)'],
      ]}
      columnWidths={['45%', '55%']}
    />

    <SectionHeading>Flexbox Layout Surprises</SectionHeading>
    <WarningBox label="Symptom">
      Elements stack vertically when you expect them side-by-side. Default flexDirection is "column", not "row".
    </WarningBox>

    <View wrap={false} style={local.compareRow}>
      <View style={local.compareBox}>
        <Text style={local.compareBadLabel}>Default: column</Text>
        <View style={local.mockBlock}><Text style={local.mockText}>width: 50%</Text></View>
        <View style={local.mockBlock}><Text style={local.mockText}>width: 50%</Text></View>
      </View>
      <View style={local.compareBox}>
        <Text style={local.compareLabel}>Fixed: row</Text>
        <View style={local.mockRow}>
          <View style={local.mockBlockSmall}><Text style={local.mockText}>50%</Text></View>
          <View style={local.mockBlockSmall}><Text style={local.mockText}>50%</Text></View>
        </View>
      </View>
    </View>
  </ContentPage>
);

export default Page;
