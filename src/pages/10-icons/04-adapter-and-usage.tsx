import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { colors, spacing, iconSize } from '../../styles/theme';
import { ContentPage, CodeBlock, TipBox, SectionHeading } from '../../components';
import { CheckIcon } from '../../components/Icons';

const iconRow = { flexDirection: 'row' as const, alignItems: 'center' as const, gap: spacing.sm, marginBottom: spacing.sm, paddingLeft: spacing.sm };

const Page: React.FC = () => (
  <ContentPage sectionTitle="Icons vs Emojis" wrap={false}>
    <SectionHeading>react-icons Adapter</SectionHeading>
    <Text style={styles.body}>
      react-icons returns plain HTML &lt;svg&gt;/&lt;path&gt; elements, which react-pdf can't render. The adapter walks the icon's React tree once and rebuilds it with react-pdf primitives, normalizing currentColor and string-typed numerics along the way.
    </Text>
    <CodeBlock language="tsx">{`import { Svg, Path, Circle, Line } from '@react-pdf/renderer';
import type { IconType } from 'react-icons';

const TAG_MAP = { svg: Svg, path: Path,
  circle: Circle, line: Line /* ...etc */ };

const Icon = ({ icon, size = 16, color }) => {
  const root = icon({});
  const { attr, children } = root.props;
  return (
    <Svg width={size} height={size} {...normalize(attr, color)}>
      {convertChildren(children, color)}
    </Svg>
  );
};`}</CodeBlock>

    <SectionHeading>Using Icons in Context</SectionHeading>
    <Text style={styles.body}>
      Icons work best when paired with text in a row layout:
    </Text>

    <View style={iconRow}>
      <CheckIcon size={iconSize.md} color={colors.success} />
      <Text style={styles.body}>Vector-sharp at any zoom level</Text>
    </View>
    <View style={iconRow}>
      <CheckIcon size={iconSize.md} color={colors.success} />
      <Text style={styles.body}>Matches your brand color palette</Text>
    </View>
    <View style={iconRow}>
      <CheckIcon size={iconSize.md} color={colors.success} />
      <Text style={styles.body}>Zero external dependencies – no CDN, no internet</Text>
    </View>

    <TipBox label="When Emojis Are Acceptable">
      Internal team documents, quick prototypes, or documents where your brand literally uses emoji as part of its identity. For anything client-facing or paid – use SVG icons.
    </TipBox>
  </ContentPage>
);

export default Page;
