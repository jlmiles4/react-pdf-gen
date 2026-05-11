/**
 * ContentPage — Standard content page wrapper
 *
 * Wraps children in a LETTER-sized Page with shared page styles, fixed Header
 * (book title + section name), and fixed Footer (brand + page numbers).
 *
 * Per-page architecture: each .tsx renders one PDF page, so wrap is default
 * (we don't expect wrapping to happen). The `wrap` prop is retained as an
 * escape hatch for the rare multi-page section.
 */
import React from 'react';
import { Page } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import { page as pageTokens } from '../styles/theme';
import Header from './Header';
import Footer from './Footer';

interface ContentPageProps {
  children: React.ReactNode;
  sectionTitle?: string;
  wrap?: boolean;
}

const ContentPage: React.FC<ContentPageProps> = ({ children, sectionTitle, wrap = true }) => (
  <Page size="LETTER" style={[styles.page, { minHeight: pageTokens.height }]} wrap={wrap}>
    <Header sectionTitle={sectionTitle} />
    {children}
    <Footer />
  </Page>
);

export default ContentPage;
