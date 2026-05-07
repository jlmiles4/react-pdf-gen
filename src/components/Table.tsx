/**
 * Table — Professional data table
 *
 * Navy header row (primary[800]) with white bold text, alternating row backgrounds
 * (white / neutral[50]), subtle bottom borders, and rounded container. Supports
 * custom column widths via percentage strings.
 *
 * Props: headers (string[]), rows (string[][]), columnWidths (optional string[])
 */
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';

interface TableProps {
  headers: string[];
  rows: string[][];
  columnWidths?: string[];
}

const Table: React.FC<TableProps> = ({ headers, rows, columnWidths }) => {
  if (!headers.length) return null;
  const widths = columnWidths || headers.map(() => `${100 / headers.length}%`);

  return (
    <View wrap={false} style={styles.tableContainer}>
      <View wrap={false} style={styles.tableHeader}>
        {headers.map((header, i) => (
          <Text key={i} style={[styles.tableHeaderText, { width: widths[i] }]}>
            {header}
          </Text>
        ))}
      </View>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} wrap={false} style={rowIdx % 2 === 1 ? styles.tableRowAlt : styles.tableRow}>
          {row.map((cell, cellIdx) => (
            <Text key={cellIdx} style={[styles.tableCell, { width: widths[cellIdx] }]}>
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Table;
