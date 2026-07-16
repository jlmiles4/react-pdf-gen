import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors } from '../../styles/theme';
import { ContentPage, CodeBlock, TipBox, SectionHeading, IconList } from '../../components';
import { CheckIcon } from '../../components/Icons';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Icons over Emojis" wrap={false}>
    <SectionHeading>react-icons Adapter</SectionHeading>
    <Text style={styles.body}>
      react-icons returns plain HTML &lt;svg&gt;/&lt;path&gt; elements, which react-pdf can't render. The adapter walks the icon's React tree once and rebuilds it with react-pdf primitives, normalizing currentColor and string-typed numerics along the way.
    </Text>
    <CodeBlock language="tsx">{`import { Svg, Path, Circle, Line } from '@react-pdf/renderer';
import type { IconType } from 'react-icons';
import { iconSize } from '../styles/theme';
const TAG_MAP = { svg: Svg, path: Path, circle: Circle, line: Line /* ...etc */ };

const Icon = ({ icon, size = iconSize.lg, color }) => {
  const { attr, children } = icon({}).props;
  const svgProps = coerceProps(attr, color);
  return (
    <Svg width={size} height={size} {...svgProps}>
      {convertChildren(children, color, svgProps)}
    </Svg>
  );
};`}</CodeBlock>

    <SectionHeading>Using Icons in Context</SectionHeading>
    <IconList
      variant="feature"
      icon={CheckIcon}
      color={colors.success}
      items={[
        'Vector-sharp at any zoom level',
        'Matches your brand color palette',
        'Zero network dependencies at render time – no CDN, no internet',
      ]}
    />

    <TipBox label="When Emojis Are Acceptable">
      Internal team documents, quick prototypes, or documents where your brand literally uses emoji as part of its identity. For anything client-facing or paid – use SVG icons.
    </TipBox>
  </ContentPage>
);

export default Page;
