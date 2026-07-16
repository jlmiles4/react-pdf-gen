/**
 * CoverDecor — Concentric-circle / crosshair geometric mark.
 *
 * Used as a low-opacity background flourish on the Cover and Conclusion hero
 * pages. (ChapterTitle draws its own corner-anchored ring cluster — a different
 * mark, not this one.) Pull the size and opacity from props so callers can
 * place it without redeclaring the same SVG path data.
 */
import React from 'react';
import { Svg, Circle, Line, G } from '@react-pdf/renderer';
import { colors, layout, opacity as opacityTokens } from '../styles/theme';

interface CoverDecorProps {
  size?: number;
  opacity?: number;
  right?: number;
  bottom?: number;
  color?: string;
}

const CoverDecor: React.FC<CoverDecorProps> = ({
  size = layout.decorMarkSize,
  opacity = opacityTokens.decor,
  right = layout.decorMarkRight,
  bottom = layout.decorMarkBottom,
  color = colors.accent[500],
}) => (
  <Svg
    viewBox="0 0 160 160"
    width={size}
    height={size}
    style={{ position: 'absolute', right, bottom, width: size, height: size }}
  >
    <G opacity={opacity}>
      <Circle cx="80" cy="80" r="70" stroke={color} strokeWidth={1.5} fill="none" />
      <Circle cx="80" cy="80" r="45" stroke={color} strokeWidth={1} fill="none" />
      <Line x1="10" y1="80" x2="150" y2="80" stroke={color} strokeWidth={0.5} />
      <Line x1="80" y1="10" x2="80" y2="150" stroke={color} strokeWidth={0.5} />
    </G>
  </Svg>
);

export default CoverDecor;
