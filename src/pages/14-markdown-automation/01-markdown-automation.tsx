import React from 'react';
import { ContentPage, MarkdownRenderer } from '../../components';
import { loadMarkdownDemoParts } from '../../utils/markdownDemo';

const Page: React.FC = () => {
  const [partOne] = loadMarkdownDemoParts();

  return (
    <ContentPage sectionTitle="Automation" wrap={false}>
      <MarkdownRenderer content={partOne} />
    </ContentPage>
  );
};

export default Page;
