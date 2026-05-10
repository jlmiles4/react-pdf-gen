// Group: FOUNDATIONS
/**
 * Chapter 02 — React-PDF Fundamentals
 *
 * Core building blocks: the component hierarchy (Document > Page > View > Text),
 * StyleSheet-based styling, flexbox-only layout, supported/unsupported CSS, units,
 * font registration, and page breaking control.
 *
 * Sections: Component Hierarchy, Styling System, Flexbox Layout, Units, Colors,
 *           Font Registration, Page Breaking, Putting It Together
 * Components: CodeBlock, BulletList, Table, TipBox, WarningBox
 * Renders: 1 chapter title + 5 content pages
 */
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/shared';
import ContentPage from '../components/ContentPage';
import ChapterTitle from '../components/ChapterTitle';
import CodeBlock from '../components/CodeBlock';
import BulletList from '../components/BulletList';
import Table from '../components/Table';
import { TipBox, WarningBox } from '../components/TipBox';
import SectionHeading from '../components/SectionHeading';

const Ch02Fundamentals: React.FC = () => (
  <>
    <ChapterTitle
      number="02"
      title="React-PDF Fundamentals"
      subtitle="Components, styling, layout, and the rules of the rendering engine."
    />

    <ContentPage sectionTitle="Fundamentals">
      <SectionHeading>The Component Hierarchy</SectionHeading>
      <Text style={styles.body}>
        Every react-pdf document follows a strict component hierarchy. Break it and the renderer throws errors.
      </Text>
      <CodeBlock language="tsx">{`import { Document, Page, View, Text, Image }
  from '@react-pdf/renderer';

const MyDoc = () => (
  <Document>
    <Page size="LETTER">
      <View>
        <Text>All visible text must be in a Text component.</Text>
        <Image src="photo.png" />
      </View>
    </Page>
  </Document>
);`}</CodeBlock>

      <Text style={styles.body}>The rules:</Text>
      <BulletList items={[
        'Document is the root – only Page elements can be direct children',
        'Page defines a physical page – size, orientation, margins',
        'View is the container (like div) – handles layout via flexbox',
        'Text renders text – all visible text must be inside Text',
        'Image renders PNG and JPG – no SVG files (use Svg components instead)',
        'No HTML elements allowed inside Document – only react-pdf components',
      ]} />

      <WarningBox label="Common Mistake">
        Putting a raw string outside of a Text component crashes the renderer. Every piece of text, even a space, needs a Text wrapper.
      </WarningBox>

      <SectionHeading>The Styling System</SectionHeading>
      <Text style={styles.body}>
        React-pdf uses JavaScript objects for styles, similar to React Native. No CSS strings, no className props. Always reference your theme tokens to ensure consistency.
      </Text>
      <CodeBlock language="tsx">{`import { StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, typography } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.lg,
    backgroundColor: colors.neutral[50],
    borderRadius: 6,
  },
  title: {
    ...typography.h2,
    color: colors.primary[800],
    marginBottom: spacing.sm,
  },
});`}</CodeBlock>

      <View wrap={false}>
        <Text style={styles.h3}>Supported Layout: Flexbox Only</Text>
        <Text style={styles.body}>
          React-pdf uses flexbox as its only layout engine. No CSS Grid. No floats. No display: inline or block. Everything is flex.
        </Text>
        <Text style={styles.body}>
          Default flex direction is column (top to bottom), not row. This catches people coming from web CSS where the default is effectively row-based block flow.
        </Text>

        <Table
          headers={['Supported', 'Not Supported']}
          rows={[
            ['flexDirection, alignItems, justifyContent', 'CSS Grid (grid-template-*)'],
            ['width, height, minWidth, maxWidth', 'float, clear'],
            ['margin, padding (all sides)', 'display: inline / block / table'],
            ['position: relative / absolute', 'box-shadow, text-shadow'],
            ['border (width, color, style, radius)', 'CSS animations / transitions'],
            ['backgroundColor, opacity, overflow', 'calc(), CSS variables, media queries'],
            ['transform (rotate, scale, translate)', 'pseudo-selectors (:hover, ::before)'],
          ]}
          columnWidths={['50%', '50%']}
        />
      </View>

      <View wrap={false}>
        <Text style={styles.h3}>Units</Text>
        <Text style={styles.body}>
          The default unit is points (pt). 1 inch = 72 points. You can also use strings with unit suffixes.
        </Text>
        <Table
          headers={['Unit', 'Example', 'Notes']}
          rows={[
            ['Points', '16', 'Default – no suffix needed'],
            ['Inches', '"1in"', '1in = 72pt'],
            ['Millimeters', '"25.4mm"', '25.4mm = 1in = 72pt'],
            ['Centimeters', '"2.54cm"', '2.54cm = 1in = 72pt'],
            ['Percentage', '"50%"', 'Relative to parent container'],
          ]}
          columnWidths={['20%', '25%', '55%']}
        />
      </View>

      <Text style={styles.h3}>Colors</Text>
      <Text style={styles.body}>
        Hex, RGB, RGBA, HSL, and named colors all work. Define your palette once in a theme file and reference the constants everywhere.
      </Text>

      <SectionHeading>Font Registration</SectionHeading>
      <Text style={styles.body}>
        Three font families are built in: Courier, Helvetica, and Times-Roman, each with bold and italic variants. For anything else, you register fonts explicitly.
      </Text>
      <CodeBlock language="tsx">{`import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Regular.ttf' },
    { src: '/fonts/Inter-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Inter-Italic.ttf', fontStyle: 'italic' },
  ],
});`}</CodeBlock>

      <WarningBox label="Font Limitations">
        Only TTF and WOFF formats work. OTF files and variable fonts are not supported. Register every weight and style you need – the renderer won't synthesize bold or italic from a regular font.
      </WarningBox>

      <SectionHeading>Page Breaking</SectionHeading>
      <Text style={styles.body}>
        Control how content flows across pages with these props:
      </Text>
      <BulletList items={[
        'wrap={true} on Page – allows content to overflow to next page (default)',
        'break={true} on View/Text – forces a page break before this element',
        'fixed={true} on View – repeats this element on every page (headers/footers)',
        'minPresenceAhead={number} – minimum points of content that must remain on current page',
        'orphans/widows on Text – minimum lines at bottom/top of page split',
      ]} />

      <TipBox>
        Use the render prop on View or Text to access pageNumber and totalPages for dynamic content like page numbers: render=&#123;(&#123;pageNumber&#125;) =&gt; pageNumber&#125;
      </TipBox>

      <SectionHeading>Putting It Together</SectionHeading>
      <Text style={styles.body}>
        These fundamentals – the component hierarchy, StyleSheet-based styling, flexbox layout, font registration, and page breaking – are the building blocks. Every page in this book uses them.
      </Text>
      <Text style={styles.body}>
        Internalizing these constraints is the first step toward mastery. Once you stop reaching for web-specific CSS and embrace the react-pdf primitives – no grid, no inline, no CSS variables – you can leverage the engine's predictable layout behavior to build complex, multi-page documents with confidence.
      </Text>
      <Text style={styles.body}>
        The next chapter shows how to organize these building blocks into a project architecture that AI agents can work with efficiently. The goal: a structure where AI can edit one page without reading (or breaking) the rest.
      </Text>

      <Table
        headers={['Concept', 'Key Rule']}
        rows={[
          ['Component hierarchy', 'Document > Page > View > Text – no shortcuts'],
          ['Styling', 'StyleSheet.create() objects only – no CSS strings'],
          ['Layout', 'Flexbox only – default direction is column'],
          ['Fonts', 'Register TTF/WOFF explicitly – no synthesized bold/italic'],
          ['Page breaks', 'wrap, break, fixed, minPresenceAhead props'],
          ['Units', 'Points (default), inches, mm, cm, percentages'],
        ]}
        columnWidths={['35%', '65%']}
      />
    </ContentPage>
  </>
);

export default Ch02Fundamentals;
