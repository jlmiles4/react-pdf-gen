/**
 * SectionHeading — Gold accent bar + h2 heading
 *
 * The primary section-heading pattern for content pages. Renders a 4px-wide
 * gold bar (accent[500]) beside the heading text. Uses wrap={false} to prevent
 * splitting and minPresenceAhead={40} for orphan protection when the ancestor
 * Page wraps. Fixed pages still must be authored to fit.
 */
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';

interface SectionHeadingProps {
  children: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => (
  <View wrap={false} minPresenceAhead={40} style={styles.h2Container}>
    <View style={styles.h2Accent} />
    <Text style={styles.h2Text}>{children}</Text>
  </View>
);

export default SectionHeading;
