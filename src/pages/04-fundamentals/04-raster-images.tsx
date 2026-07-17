import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/shared';
import { ContentPage, SectionHeading, CodeBlock, WarningBox } from '../../components';

const Page: React.FC = () => (
  <ContentPage sectionTitle="Fundamentals" wrap={false}>
    <SectionHeading>Images</SectionHeading>
    <Text style={styles.body}>
      Image renders PNG, JPG, and base64 data URIs – but not SVG files (use the Svg component for those). The one real gotcha: without explicit dimensions an image renders at its native pixel size, where 1 pixel = 1 point. A 1000x500 image becomes 1000x500pt – about 14 x 7 inches – and overflows the page.
    </Text>
    <CodeBlock language="tsx">{`// Always size it – width/height, or a width plus objectFit
<Image src="/assets/photo.jpg"
  style={{ width: '100%', height: 200, objectFit: 'cover' }} />

// Authenticated URLs: pass a source object with headers
<Image source={{
  uri: 'https://api.example.com/image/123',
  method: 'GET',
  headers: { Authorization: 'Bearer <token>' },
}} />`}</CodeBlock>
    <WarningBox label="Size every image">
      An unsized image is the most common first-render overflow. Set width and height (or a width plus objectFit) on every Image, and prefer PNG for anything that needs transparency.
    </WarningBox>
  </ContentPage>
);

export default Page;
