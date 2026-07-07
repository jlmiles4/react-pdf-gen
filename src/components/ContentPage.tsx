/**
 * ContentPage — Standard content page wrapper
 *
 * Wraps children in a LETTER-sized Page with shared page styles, fixed Header
 * (book title + section name), and fixed Footer (brand + page numbers).
 *
 * Per-page architecture: each .tsx renders one PDF page, so non-wrapping is
 * the default (we don't expect wrapping to happen). `wrap={true}` is the
 * opt-in escape hatch for the rare multi-page section.
 *
 * The Header is positioned so its rule sits a little above the content top
 * (see Header.tsx), giving every page a consistent gap below the header without
 * stealing vertical content space — important because content starts at the
 * full top margin (60pt) and the bottom margin must stay clear of the footer.
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

const ContentPage: React.FC<ContentPageProps> = ({ children, sectionTitle, wrap = false }) => (
  <Page size="LETTER" style={[styles.page, { minHeight: pageTokens.height }]} wrap={wrap}>
    <Header sectionTitle={sectionTitle} />
    {children}
    <Footer />
  </Page>
);

export default ContentPage;
