/**
 * SectionHeading — Gold accent bar + h2 heading
 *
 * The primary section heading used on every content page. Renders a 4px-wide
 * gold bar (accent[500]) beside the heading text. Uses wrap={false} to prevent
 * splitting and minPresenceAhead={40} to avoid orphaned headings at page bottom.
 */
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';

interface SectionHeadingProps {
  children: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => (
  <View wrap={false} minPresenceAhead={40} style={styles.h2Container}>
    <View style={styles.h2Accent} />
    <Text style={styles.h2Text}>{children}</Text>
  </View>
);

export default SectionHeading;
