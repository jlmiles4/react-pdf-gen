/**
 * TipBox / WarningBox / InfoBox — Callout boxes
 *
 * Left-bordered callout boxes with icon + label header. All use wrap={false}
 * to prevent splitting across pages.
 *
 * - TipBox:     Gold border (accent[500]), cream bg (accent[50]), ZapIcon
 * - WarningBox: Red border (error), pink bg (errorLight), AlertTriangleIcon
 * - InfoBox:    Blue border (info), light blue bg (primary[50]), InfoIcon
 *
 * Props: children (ReactNode), label (optional string, defaults vary by variant)
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing } from '../styles/theme';
import { ZapIcon, AlertTriangleIcon, InfoIcon } from './Icons';

interface TipBoxProps {
  children: React.ReactNode;
  label?: string;
}

const local = StyleSheet.create({
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
});

export const TipBox: React.FC<TipBoxProps> = ({ children, label = 'Tip' }) => (
  <View wrap={false} style={styles.tipBox}>
    <View style={local.labelRow}>
      <ZapIcon size={13} color={colors.accent[700]} />
      <Text style={styles.tipLabel}>{label}</Text>
    </View>
    <Text style={styles.body}>{children}</Text>
  </View>
);

export const WarningBox: React.FC<TipBoxProps> = ({ children, label = 'Warning' }) => (
  <View wrap={false} style={styles.warningBox}>
    <View style={local.labelRow}>
      <AlertTriangleIcon size={13} color={colors.error} />
      <Text style={styles.warningLabel}>{label}</Text>
    </View>
    <Text style={styles.body}>{children}</Text>
  </View>
);

export const InfoBox: React.FC<TipBoxProps> = ({ children, label = 'Note' }) => (
  <View wrap={false} style={styles.infoBox}>
    <View style={local.labelRow}>
      <InfoIcon size={13} color={colors.info} />
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.body}>{children}</Text>
  </View>
);
