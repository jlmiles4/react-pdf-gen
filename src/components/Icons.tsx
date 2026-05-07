import React from 'react';
import { Svg, Path, Circle, Polyline, Line } from '@react-pdf/renderer';
import { colors } from '../styles/theme';

interface IconProps {
  size?: number;
  color?: string;
}

/**
 * SVG icons for use in the ebook.
 * All derived from Lucide icon paths (MIT license).
 * Using SVG instead of emoji: vector-sharp, color-matched, no internet needed.
 */

export const CheckIcon: React.FC<IconProps> = ({ size = 16, color = colors.success }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ size = 16, color = colors.warning }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth={2} fill="none" />
    <Line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth={2} />
    <Line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth={2} />
  </Svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 16, color = colors.info }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} fill="none" />
    <Line x1="12" y1="16" x2="12" y2="12" stroke={color} strokeWidth={2} />
    <Line x1="12" y1="8" x2="12.01" y2="8" stroke={color} strokeWidth={2} />
  </Svg>
);

export const XIcon: React.FC<IconProps> = ({ size = 16, color = colors.error }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
  </Svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 16, color = colors.primary[500] }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Polyline points="12 5 19 12 12 19" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BookIcon: React.FC<IconProps> = ({ size = 16, color = colors.primary[500] }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);

export const CodeIcon: React.FC<IconProps> = ({ size = 16, color = colors.primary[500] }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Polyline points="16 18 22 12 16 6" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Polyline points="8 6 2 12 8 18" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LayersIcon: React.FC<IconProps> = ({ size = 16, color = colors.primary[500] }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2L2 7l10 5 10-5-10-5z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
    <Path d="M2 17l10 5 10-5" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 12l10 5 10-5" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PaletteIcon: React.FC<IconProps> = ({ size = 16, color = colors.primary[500] }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} fill="none" />
    <Circle cx="8" cy="10" r="1.5" fill={color} />
    <Circle cx="12" cy="7" r="1.5" fill={color} />
    <Circle cx="16" cy="10" r="1.5" fill={color} />
  </Svg>
);

export const ZapIcon: React.FC<IconProps> = ({ size = 16, color = colors.accent[500] }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
  </Svg>
);
