/**
 * AccentBar — Horizontal gold accent line used by hero/title elements.
 *
 * Sizes come from theme.accentBar tokens so every hero decoration shares the
 * same visual rhythm. Use `mb` to override the default bottom margin per context.
 */
import React from 'react';
import { View } from '@react-pdf/renderer';
import { colors, accentBar, borders, spacing } from '../styles/theme';

type Size = keyof typeof accentBar;

interface AccentBarProps {
  size?: Size;
  mb?: number;
  color?: string;
}

const AccentBar: React.FC<AccentBarProps> = ({
  size = 'md',
  mb = spacing.md,
  color = colors.accent[500],
}) => {
  const { width, height } = accentBar[size];
  return (
    <View
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: borders.radius.xs,
        marginBottom: mb,
      }}
    />
  );
};

export default AccentBar;
