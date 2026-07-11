/**
 * Design tokens for the React-PDF + AI ebook.
 * Every color, font size, and spacing value in the book comes from here.
 * This is the single source of truth for visual consistency.
 */

export const colors = {
  // Primary: deep navy – authority, trust, professionalism
  primary: {
    900: '#0B1426',
    800: '#121F3D',
    700: '#1A2D54',
    600: '#243B6B',
    500: '#2E4A82',
    400: '#4A6BA5',
    300: '#6E8DC4',
    200: '#9BB3DB',
    100: '#C8D6ED',
    50: '#EDF1F8',
  },
  // Accent: warm amber/gold – energy, premium feel
  accent: {
    900: '#7A4F00',
    800: '#9C6500',
    700: '#BE7B00',
    600: '#D98E00',
    500: '#F0A000',
    400: '#F5B733',
    300: '#F8CB66',
    200: '#FBDF99',
    100: '#FDF0CC',
    50: '#FEF8E6',
  },
  // Neutral: slate grays
  neutral: {
    900: '#1A1A2E',
    800: '#2D2D44',
    700: '#45455E',
    600: '#5E5E77',
    500: '#7A7A91',
    400: '#9696AA',
    300: '#B2B2C2',
    200: '#D0D0DB',
    100: '#E8E8EF',
    50: '#F5F5F8',
  },
  // Semantic
  success: '#2D8B4E',
  successLight: '#F0F9F4',
  warning: '#D98E00',
  warningLight: '#FEF8E6',
  error: '#C43333',
  errorLight: '#FEF3F3',
  info: '#2E6BB5',
  infoLight: '#EDF1F8',
  // Base
  white: '#FFFFFF',
} as const;

export const fonts = {
  heading: 'Inter',
  body: 'Inter',
  bodyBold: 'Inter',
  mono: 'Courier',
  monoBold: 'Courier-Bold',
} as const;

/** Font-weight tokens. fonts.ts registers these three plus Inter-Medium (500), which has no token yet — extend here (e.g. medium: 500) before using it. */
export const fontWeight = {
  regular: 400,
  semibold: 600,
  bold: 700,
} as const;

/** Line-height multipliers, for standalone use and for the typography presets below whose steps fit the scale (heading presets use bespoke tighter values instead). */
export const lineHeight = {
  tight: 1.2,
  snug: 1.4,
  normal: 1.5,
  relaxed: 1.6,
} as const;

export const typography = {
  // Display – cover page, chapter titles
  display: { fontSize: 36, fontFamily: fonts.heading, fontWeight: fontWeight.bold, lineHeight: 1.1 },
  // H1 – section headers
  h1: { fontSize: 26, fontFamily: fonts.heading, fontWeight: fontWeight.bold, lineHeight: lineHeight.tight },
  // H2 – subsection headers
  h2: { fontSize: 20, fontFamily: fonts.heading, fontWeight: fontWeight.semibold, lineHeight: 1.25 },
  // H3 – minor headers
  h3: { fontSize: 16, fontFamily: fonts.heading, fontWeight: fontWeight.semibold, lineHeight: 1.3 },
  // H4 – label-level headers
  h4: { fontSize: 13, fontFamily: fonts.bodyBold, fontWeight: fontWeight.semibold, lineHeight: 1.35 },
  // Body – main reading text
  body: { fontSize: 11, fontFamily: fonts.body, fontWeight: fontWeight.regular, lineHeight: lineHeight.relaxed },
  // Body small
  bodySmall: { fontSize: 9.5, fontFamily: fonts.body, fontWeight: fontWeight.regular, lineHeight: lineHeight.normal },
  // Caption
  caption: { fontSize: 8.5, fontFamily: fonts.body, fontWeight: fontWeight.regular, lineHeight: lineHeight.snug },
  // Code
  code: { fontSize: 9, fontFamily: fonts.mono, fontWeight: fontWeight.regular, lineHeight: lineHeight.normal },
  // Code small
  codeSmall: { fontSize: 8, fontFamily: fonts.mono, fontWeight: fontWeight.regular, lineHeight: lineHeight.snug },
} as const;

export const spacing = {
  none: 0,
  micro: 1,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const page = {
  width: 612,   // LETTER width in points
  height: 792,  // LETTER height in points
  margin: {
    top: 60,
    bottom: 60,
    left: 54,
    right: 54,
  },
  coverMargin: {
    horizontal: 72,
    bottom: 36,
  },
  headerHeight: 40,
  footerHeight: 36,
  topBarHeight: 6,
  chapterPaddingExtra: 20,
  contentWidth: 612 - 54 - 54, // 504pt
  contentHeight: 792 - 60 - 60, // 672pt
} as const;

// Syntax highlighting — designed for readability on primary[900] background
export const syntax = {
  keyword: colors.accent[400],      // gold for reserved words
  string: '#7EC89F',                // soft green — readable on dark navy
  comment: colors.neutral[500],     // muted for comments
  tag: colors.primary[300],         // light blue for JSX/HTML tags
  number: colors.accent[300],       // warm gold for literals
  punctuation: colors.primary[200], // subtle for brackets/operators
  default: colors.neutral[200],     // base code text
} as const;

export const borders = {
  thin: 0.5,
  medium: 1,
  thick: 2,
  radius: {
    xs: 1.5,
    sm: 3,
    md: 6,
    lg: 10,
  },
} as const;

/** Font sizes for infrastructure elements outside the content typography scale */
export const fontScale = {
  coverTitle: 42,
  pageTitle: 32,
  sectionTitle: 18,
  subtitle: 15,
  contentTitle: 14,
  label: 12,
  bodyMedium: 10.5,
  labelSmall: 10,
  navSmall: 7.5,
  micro: 7,
} as const;

/** Horizontal accent bar dimensions (width × height in points) for hero decor. */
export const accentBar = {
  sm: { width: 32, height: 3 },   // SectionBanner
  md: { width: 48, height: 3 },   // TOC heading
  lg: { width: 60, height: 4 },   // ChapterTitle
  xl: { width: 64, height: 4 },   // Cover / Conclusion hero
  heading: { width: 4, height: 22 }, // vertical gold bar beside SectionHeading h2
} as const;

/** Letter spacing tokens for uppercase / tracked-out text. */
export const letterSpacing = {
  tight: 1,
  normal: 1.2,
  wide: 1.5,
  wider: 2.5,
} as const;

/** Common layout constraints to avoid magic numbers in page components. */
export const layout = {
  maxTextWidth: 420,
  maxHeroWidth: 460,
  bulletWrapperWidth: 14,
  bulletDotSize: 6,
  tocEntryNumWidth: 28,
  tocPageColWidth: 28,  // TOC page-number column (right-aligned)
  cardShadowOffset: 2,
  flowStepWidth: 100,
  dividerHeight: 2,
  decorMarkSize: 160,   // CoverDecor concentric mark
  decorRingsSize: 240,  // ChapterTitle decorative rings
  decorMarkRight: 40,   // CoverDecor default right offset
  decorMarkBottom: 60,  // CoverDecor default bottom offset
} as const;

/** Icon sizes for SVG icons rendered via the Icon adapter. */
export const iconSize = {
  xs: 10,       // dense inline checklists (Ch09 PNGAnalysis)
  sm: 12,       // standard inline check/x in body text
  callout: 13,  // TipBox / WarningBox / InfoBox label icons
  md: 14,       // recommended adapter size
  lg: 16,       // adapter default
  xl: 24,       // showcase / hero icons
} as const;

/** Opacity tokens for layered decor and de-emphasized accents. */
export const opacity = {
  decor: 0.08,        // background SVG flourishes (CoverDecor, ChapterTitle rings)
  decorSubtle: 0.06,  // a touch dimmer for already-busy dark pages (Conclusion)
  muted: 0.4,         // de-emphasized accent (Conclusion divider)
} as const;
