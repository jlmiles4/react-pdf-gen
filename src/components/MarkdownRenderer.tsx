import React from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { parseMarkdown, MarkdownNode, InlineSpan } from '../utils/markdownParser';
import SectionHeading from './SectionHeading';
import BulletList from './BulletList';
import CodeBlock from './CodeBlock';
import { TipBox, WarningBox, InfoBox } from './TipBox';

interface MarkdownRendererProps {
  content: string;
}

const renderSpans = (spans: InlineSpan[]): React.ReactNode =>
  spans.map((span, i) => {
    if (span.type === 'bold') return <Text key={i} style={styles.bold}>{span.text}</Text>;
    if (span.type === 'italic') return <Text key={i} style={styles.italic}>{span.text}</Text>;
    if (span.type === 'code') return <Text key={i} style={styles.inlineCode}>{span.text}</Text>;
    return <Text key={i}>{span.text}</Text>;
  });

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const nodes = parseMarkdown(content);

  return (
    <>
      {nodes.map((node, idx) => {
        switch (node.type) {
          case 'heading':
            if (node.level === 1) {
              return (
                <Text key={idx} style={styles.h1}>
                  {renderSpans(node.spans)}
                </Text>
              );
            }
            if (node.level === 2) {
              return <SectionHeading key={idx}>{renderSpans(node.spans)}</SectionHeading>;
            }
            return (
              <Text key={idx} style={styles.h3}>
                {renderSpans(node.spans)}
              </Text>
            );
          case 'text':
            return (
              <Text key={idx} style={styles.body}>
                {renderSpans(node.spans)}
              </Text>
            );
          case 'list':
            return (
              <BulletList
                key={idx}
                items={node.items.map((spans, i) => (
                  <Text key={i} style={styles.listContent}>{renderSpans(spans)}</Text>
                ))}
              />
            );
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
                  {renderSpans(node.spans)}
                </WarningBox>
              );
            }
            if (node.variant === 'info') {
              return (
                <InfoBox key={idx} label={node.label}>
                  {renderSpans(node.spans)}
                </InfoBox>
              );
            }
            return (
              <TipBox key={idx} label={node.label}>
                {renderSpans(node.spans)}
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
