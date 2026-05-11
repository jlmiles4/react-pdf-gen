import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, fonts, borders, fontScale, fontWeight, iconSize } from '../../styles/theme';
import { ContentPage, SectionHeading } from '../../components';
import { CheckIcon, XIcon } from '../../components/Icons';

const local = StyleSheet.create({
  comparisonRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  comparisonCol: {
    flex: 1,
    borderWidth: borders.medium,
    borderRadius: borders.radius.md,
    padding: spacing.md,
  },
  badCol: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  goodCol: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  compLabel: {
    fontSize: fontScale.labelSmall,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  badLabel: { color: colors.error },
  goodLabel: { color: colors.success },
});

const Page: React.FC = () => (
  <ContentPage sectionTitle="Avoiding AI Slop" wrap={false}>
    <SectionHeading>Slop vs. Premium – Side by Side</SectionHeading>

    <Text style={styles.h3}>Heading Styles</Text>
    <View wrap={false} style={local.comparisonRow}>
      <View style={[local.comparisonCol, local.badCol]}>
        <View style={styles.iconRow}>
          <XIcon size={iconSize.sm} />
          <Text style={[local.compLabel, local.badLabel]}>Slop</Text>
        </View>
        <Text style={styles.bodySmall}>fontSize: 16, centered, default font, no color, no spacing above or below. Blends into body text.</Text>
      </View>
      <View style={[local.comparisonCol, local.goodCol]}>
        <View style={styles.iconRow}>
          <CheckIcon size={iconSize.sm} />
          <Text style={[local.compLabel, local.goodLabel]}>Premium</Text>
        </View>
        <Text style={styles.bodySmall}>Uses typography.h2 (20pt), primary color, 16pt marginBottom, 24pt marginTop. Clear hierarchy break.</Text>
      </View>
    </View>

    <Text style={styles.h3}>Page Margins</Text>
    <View wrap={false} style={local.comparisonRow}>
      <View style={[local.comparisonCol, local.badCol]}>
        <View style={styles.iconRow}>
          <XIcon size={iconSize.sm} />
          <Text style={[local.compLabel, local.badLabel]}>Slop</Text>
        </View>
        <Text style={styles.bodySmall}>padding: 20 on all sides. Content cramped against edges. Feels claustrophobic.</Text>
      </View>
      <View style={[local.comparisonCol, local.goodCol]}>
        <View style={styles.iconRow}>
          <CheckIcon size={iconSize.sm} />
          <Text style={[local.compLabel, local.goodLabel]}>Premium</Text>
        </View>
        <Text style={styles.bodySmall}>54pt horizontal, 60pt vertical margins. Content has room to breathe. Professional whitespace.</Text>
      </View>
    </View>
  </ContentPage>
);

export default Page;
