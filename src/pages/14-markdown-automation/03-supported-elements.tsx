import React from 'react';
import { ContentPage, MarkdownRenderer } from '../../components';
import { loadMarkdownDemoParts } from '../../utils/markdownDemo';

const Page: React.FC = () => {
  const [, partTwo] = loadMarkdownDemoParts();

  return (
    <ContentPage sectionTitle="Automation" wrap={false}>
      <MarkdownRenderer content={partTwo} />
    </ContentPage>
  );
};

export default Page;
