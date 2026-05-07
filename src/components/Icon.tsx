/**
 * Icon — react-icons adapter for @react-pdf/renderer
 *
 * react-icons returns browser SVG elements (<svg>, <path>, etc.). @react-pdf/renderer
 * needs its own components (Svg, Path, etc.). This adapter walks the icon's React tree,
 * extracts the IconBase wrapper's attr prop, and rebuilds the tree with @react-pdf nodes.
 *
 * Usage: <Icon icon={LuCheck} size={14} color={colors.success} />
 */
import React from 'react';
import {
  Svg,
  Path,
  Circle,
  Line,
  Polyline,
  Polygon,
  Rect,
  G,
  Ellipse,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
} from '@react-pdf/renderer';
import type { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
}

const TAG_MAP: Record<string, React.ComponentType<any>> = {
  svg: Svg,
  path: Path,
  circle: Circle,
  line: Line,
  polyline: Polyline,
  polygon: Polygon,
  rect: Rect,
  g: G,
  ellipse: Ellipse,
  defs: Defs,
  linearGradient: LinearGradient,
  radialGradient: RadialGradient,
  stop: Stop,
  clipPath: ClipPath,
};

const NUMERIC_KEYS = new Set([
  'cx', 'cy', 'r', 'rx', 'ry',
  'x', 'y', 'x1', 'x2', 'y1', 'y2',
  'width', 'height',
  'strokeWidth', 'opacity', 'strokeOpacity', 'fillOpacity',
  'offset',
]);

const INHERITABLE = ['fill', 'stroke', 'strokeWidth', 'strokeLinecap', 'strokeLinejoin', 'strokeOpacity', 'fillOpacity', 'opacity'] as const;

function coerceProps(rawProps: Record<string, unknown>, color: string): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key in rawProps) {
    if (key === 'children' || key === 'key' || key === 'className' || key === 'style' || key === 'xmlns') continue;
    let value = rawProps[key];
    if (value === 'currentColor' || value === 'currentcolor') value = color;
    if (typeof value === 'string' && NUMERIC_KEYS.has(key)) {
      const num = parseFloat(value);
      if (!Number.isNaN(num)) value = num;
    }
    out[key] = value;
  }
  return out;
}

function convertChildren(
  children: React.ReactNode,
  color: string,
  inherited: Record<string, unknown>,
): React.ReactNode {
  return React.Children.map(children, (child, i) => {
    if (!React.isValidElement(child)) return child;
    const element = child as React.ReactElement<Record<string, unknown>>;
    const tag = element.type;
    if (typeof tag !== 'string') return null;
    const PdfComponent = TAG_MAP[tag];
    if (!PdfComponent) return null;
    const own = coerceProps(element.props, color);
    const merged: Record<string, unknown> = { ...own };
    for (const key of INHERITABLE) {
      if (merged[key] === undefined && inherited[key] !== undefined) {
        merged[key] = inherited[key];
      }
    }
    const inner = convertChildren(element.props.children as React.ReactNode, color, merged);
    return React.createElement(PdfComponent, { ...merged, key: i }, inner);
  });
}

const Icon: React.FC<IconProps> = ({ icon, size = 16, color = 'currentColor' }) => {
  const rendered = (icon as (props: object) => React.ReactNode)({});
  if (!React.isValidElement(rendered)) return null;
  const wrapper = rendered as React.ReactElement<{ attr?: Record<string, unknown>; children?: React.ReactNode }>;
  const attr = wrapper.props.attr ?? {};
  const svgProps = coerceProps(attr, color);
  const children = convertChildren(wrapper.props.children, color, svgProps);
  return React.createElement(Svg, { width: size, height: size, ...svgProps }, children);
};

export default Icon;
