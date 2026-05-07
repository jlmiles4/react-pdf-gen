/**
 * Semantic icon wrappers backed by react-icons (Lucide set).
 *
 * Each named icon binds a specific react-icons IconType through the Icon adapter,
 * so consumer pages can keep using <CheckIcon/> while the underlying SVG path
 * data and stroke geometry come from react-icons.
 */
import React from 'react';
import {
  LuCheck,
  LuTriangleAlert,
  LuInfo,
  LuX,
  LuArrowRight,
  LuZap,
} from 'react-icons/lu';
import type { IconType } from 'react-icons';
import Icon from './Icon';
import { colors } from '../styles/theme';

interface IconProps {
  size?: number;
  color?: string;
}

const make = (icon: IconType, defaultColor: string) => {
  const C: React.FC<IconProps> = ({ size = 16, color = defaultColor }) => (
    <Icon icon={icon} size={size} color={color} />
  );
  return C;
};

export const CheckIcon = make(LuCheck, colors.success);
export const AlertTriangleIcon = make(LuTriangleAlert, colors.warning);
export const InfoIcon = make(LuInfo, colors.info);
export const XIcon = make(LuX, colors.error);
export const ArrowRightIcon = make(LuArrowRight, colors.primary[500]);
export const ZapIcon = make(LuZap, colors.accent[500]);

export { default as Icon } from './Icon';
