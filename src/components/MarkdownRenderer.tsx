import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { parseMarkdown, MarkdownNode } from '../utils/markdownParser';
import SectionHeading from './SectionHeading';
import BulletList from './BulletList';
import CodeBlock from './CodeBlock';
import { TipBox, WarningBox, InfoBox } from './TipBox';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const nodes = parseMarkdown(content);

  return (
    <>
      {nodes.map((node, idx) => {
        switch (node.type) {
          case 'heading':
            if (node.level === 2) {
              return <SectionHeading key={idx}>{node.text}</SectionHeading>;
            }
            return (
              <Text key={idx} style={styles.h3}>
                {node.text}
              </Text>
            );
          case 'text':
            return (
              <Text key={idx} style={styles.body}>
                {node.text}
              </Text>
            );
          case 'list':
            return <BulletList key={idx} items={node.items} />;
          case 'code':
            return (
              <CodeBlock key={idx} language={node.language}>
                {node.code}
              </CodeBlock>
            );
          case 'callout':
            if (node.variant === 'warning') {
              return (
                <WarningBox key={idx} label={node.label}>
                  {node.text}
                </WarningBox>
              );
            }
            if (node.variant === 'info') {
              return (
                <InfoBox key={idx} label={node.label}>
                  {node.text}
                </InfoBox>
              );
            }
            return (
              <TipBox key={idx} label={node.label}>
                {node.text}
              </TipBox>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default MarkdownRenderer;
