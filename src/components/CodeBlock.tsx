/**
 * CodeBlock — Dark code display with syntax highlighting
 *
 * Dark navy background (primary[900]) with Courier font. Optional language
 * label in gold (accent[400]) above the code. Syntax highlighting colors
 * keywords (gold), strings (green), comments (muted), JSX tags (blue),
 * and numbers (warm gold). Uses wrap={false} to prevent splitting across
 * pages — keep code blocks under ~15 lines.
 *
 * Props: children (string — the code), language (optional string label)
 */
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { tokenize, syntaxColor } from '../utils/syntaxHighlight';

interface CodeBlockProps {
  children: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => {
  const lines = tokenize(children);

  return (
    <View wrap={false} style={styles.codeBlock}>
      {language && <Text style={styles.codeLabel}>{language}</Text>}
      {lines.map((lineTokens, lineIdx) => (
        <Text key={lineIdx} style={styles.codeText}>
          {lineTokens.map((token, i) => (
            <Text key={i} style={{ color: syntaxColor[token.type] }}>
              {/* blank lines must still occupy a line-height, or they collapse to 0 and adjacent code merges visually */}
              {token.text || ' '}
            </Text>
          ))}
        </Text>
      ))}
    </View>
  );
};

export default CodeBlock;
