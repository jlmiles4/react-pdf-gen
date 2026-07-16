/**
 * CodeBlock — Dark code display with syntax highlighting
 *
 * Dark navy background (primary[900]) with Courier font. Optional language
 * label in gold (accent[400]) above the code. Syntax highlighting colors
 * keywords (gold), strings (green), comments (muted), JSX tags (blue),
 * and numbers (warm gold). Defaults to wrap={false} to prevent splitting
 * across pages — size each block to the vertical space remaining on its
 * page, or pass wrap={true} for a block that may legitimately span pages.
 *
 * Props: children (string — the code), language (optional string label),
 *        wrap (optional bool, default false)
 */
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { tokenize, syntaxColor } from '../utils/syntaxHighlight';

interface CodeBlockProps {
  children: string;
  language?: string;
  wrap?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language, wrap = false }) => {
  const lines = tokenize(children);

  return (
    <View wrap={wrap} style={styles.codeBlock}>
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
