/**
 * Table — Professional data table
 *
 * Navy header row (primary[800]) with white bold text, alternating row backgrounds
 * (white / neutral[50]), subtle bottom borders, and rounded container. Supports
 * custom column widths via percentage strings.
 *
 * The outer container defaults to `wrap={false}` so short tables stay intact
 * rather than splitting a row across pages. For tables that may exceed the
 * remaining page space, pass `wrap={true}` so the table can break — individual
 * rows still stay together because each row is wrap={false}.
 *
 * Props: headers (string[]), rows (string[][]), columnWidths (optional string[]),
 *        wrap (optional bool, default false)
 */
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { spacing } from '../styles/theme';

interface TableProps {
  headers: string[];
  rows: string[][];
  columnWidths?: string[];
  wrap?: boolean;
}

const Table: React.FC<TableProps> = ({ headers, rows, columnWidths, wrap = false }) => {
  if (!headers.length) return null;
  if (columnWidths && columnWidths.length !== headers.length) {
    console.warn(`Table: columnWidths has ${columnWidths.length} value(s) but there are ${headers.length} header(s) — cells beyond the widths render unsized`);
  }
  const overwideRows = rows.filter((row) => row.length > headers.length).length;
  if (overwideRows > 0) {
    console.warn(`Table: ${overwideRows} row(s) have more cells than headers — the extra cells render unsized`);
  }
  const widths = columnWidths || headers.map(() => `${100 / headers.length}%`);

  return (
    <View wrap={wrap} style={styles.tableContainer}>
      <View wrap={false} style={styles.tableHeader}>
        {headers.map((header, i) => (
          <Text
            key={i}
            style={[
              styles.tableHeaderText,
              { width: widths[i], paddingRight: i < headers.length - 1 ? spacing.sm : spacing.none },
            ]}
          >
            {header}
          </Text>
        ))}
      </View>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} wrap={false} style={rowIdx % 2 === 1 ? styles.tableRowAlt : styles.tableRow}>
          {row.map((cell, cellIdx) => (
            <Text
              key={cellIdx}
              style={[
                styles.tableCell,
                { width: widths[cellIdx], paddingRight: cellIdx < row.length - 1 ? spacing.sm : spacing.none },
              ]}
            >
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Table;
