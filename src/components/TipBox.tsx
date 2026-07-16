/**
 * TipBox / WarningBox / InfoBox — Callout boxes
 *
 * Left-bordered callout boxes with icon + label header, all rendered by one
 * base component (three color schemes, one skeleton — the matching style
 * pairs are built by one factory in shared.ts). All use wrap={false} to
 * prevent splitting across pages.
 *
 * - TipBox:     Gold border (accent[500]), cream bg (accent[50]), ZapIcon
 * - WarningBox: Red border (error), pink bg (errorLight), AlertTriangleIcon
 * - InfoBox:    Blue border (info), light blue bg (infoLight), InfoIcon
 *
 * Props: children (text content — strings or nested <Text> spans; block
 * elements like <View> are not valid inside the body <Text>),
 * label (optional string, defaults vary by variant)
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { colors, spacing, iconSize } from '../styles/theme';
import { ZapIcon, AlertTriangleIcon, InfoIcon } from './Icons';

interface TipBoxProps {
  children: React.ReactNode;
  label?: string;
}

interface CalloutSpec {
  boxStyle: typeof styles.tipBox;
  labelStyle: typeof styles.tipLabel;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  iconColor: string;
  defaultLabel: string;
}

const local = StyleSheet.create({
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
});

const makeCallout = ({ boxStyle, labelStyle, Icon, iconColor, defaultLabel }: CalloutSpec): React.FC<TipBoxProps> => {
  const Callout: React.FC<TipBoxProps> = ({ children, label = defaultLabel }) => (
    <View wrap={false} style={boxStyle}>
      <View style={local.labelRow}>
        <Icon size={iconSize.callout} color={iconColor} />
        <Text style={labelStyle}>{label}</Text>
      </View>
      <Text style={styles.body}>{children}</Text>
    </View>
  );
  return Callout;
};

export const TipBox = makeCallout({
  boxStyle: styles.tipBox,
  labelStyle: styles.tipLabel,
  Icon: ZapIcon,
  iconColor: colors.accent[700],
  defaultLabel: 'Tip',
});

export const WarningBox = makeCallout({
  boxStyle: styles.warningBox,
  labelStyle: styles.warningLabel,
  Icon: AlertTriangleIcon,
  iconColor: colors.error,
  defaultLabel: 'Warning',
});

export const InfoBox = makeCallout({
  boxStyle: styles.infoBox,
  labelStyle: styles.infoLabel,
  Icon: InfoIcon,
  iconColor: colors.info,
  defaultLabel: 'Note',
});
