import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { iconSize } from '../../styles/theme';
import { ContentPage, CodeBlock, RecipeCard } from '../../components';
import { XIcon } from '../../components/Icons';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Design Challenges" wrap={false}>
    <RecipeCard title="Text Wrapping Around Images" icon={<XIcon size={iconSize.sm} />}>
      <Text style={styles.bodySmall}>
        Float is unsupported. Use a row with named one-off geometry:
      </Text>
      <CodeBlock language="tsx">{`const mediaSize = { width: 120, height: 90 };
<View style={{ flexDirection: 'row', gap: spacing.lg }}>
  <Image src="photo.png" style={mediaSize} />
  <View style={{ flex: 1 }}>
    <Text>Text flows in a column beside
      the image, not wrapped around it.
    </Text>
  </View>
</View>`}</CodeBlock>
    </RecipeCard>

    <RecipeCard title="Gradient Backgrounds" icon={<XIcon size={iconSize.sm} />}>
      <Text style={styles.bodySmall}>
        CSS gradients need SVG. Name the layer height once:
      </Text>
      <CodeBlock language="tsx">{`const GRADIENT_HEIGHT = 100;
<View style={{ position: 'relative', height: GRADIENT_HEIGHT }}>
  <Svg style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    viewBox={\`0 0 \${page.contentWidth} \${GRADIENT_HEIGHT}\`}>
    <Defs>
      <LinearGradient id="bg" x1="0" y1="0"
        x2="1" y2="0">
        <Stop offset="0%" stopColor={colors.primary[700]} />
        <Stop offset="100%" stopColor={colors.primary[500]} />
      </LinearGradient>
    </Defs>
    <Rect width={page.contentWidth} height={GRADIENT_HEIGHT}
      fill="url(#bg)" />
  </Svg>
  <Text style={{ color: colors.white, padding: spacing.lg }}>
    Content over gradient
  </Text>
</View>`}</CodeBlock>
    </RecipeCard>
  </ContentPage>
);

export default Page;
