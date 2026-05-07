/**
 * ContentPage — Standard content page wrapper
 *
 * Wraps children in a LETTER-sized Page with shared page styles, fixed Header
 * (book title + section name), and fixed Footer (brand + page numbers).
 * Every content page in the document uses this wrapper.
 *
 * Props: children (ReactNode), sectionTitle (optional string for header)
 */
import React from 'react';
import { Page } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import Header from './Header';
import Footer from './Footer';

interface ContentPageProps {
  children: React.ReactNode;
  sectionTitle?: string;
}
const ContentPage: React.FC<ContentPageProps> = ({ children, sectionTitle }) => (
  <Page size="LETTER" style={styles.page} wrap>
    <Header sectionTitle={sectionTitle} />
    {children}
    <Footer />
  </Page>
);

export default ContentPage;
