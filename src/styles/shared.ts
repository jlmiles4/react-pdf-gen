import { StyleSheet } from '@react-pdf/renderer';
import { colors, typography, spacing, page, borders, fonts, fontWeight, lineHeight, accentBar } from './theme';

// One callout skeleton, three color schemes. Geometry changes here apply to
// tipBox/warningBox/infoBox at once (TipBox.tsx renders all three via one base).
const calloutBox = (background: string, borderColor: string) => ({
  backgroundColor: background,
  borderLeftWidth: borders.thick,
  borderLeftColor: borderColor,
  borderRadius: borders.radius.sm,
  padding: spacing.md,
  marginBottom: spacing.md,
  marginTop: spacing.sm,
});

const calloutLabel = (color: string) => ({
  ...typography.h4,
  color,
  marginBottom: spacing.xs,
});

/**
 * Shared styles used across all pages.
 * Import individual styles – never import the whole sheet into a page.
 */
export const styles = StyleSheet.create({
  // --- Page layouts ---
  page: {
    width: page.width,
    height: page.height,
    paddingTop: page.margin.top,
    paddingBottom: page.margin.bottom,
    paddingLeft: page.margin.left,
    paddingRight: page.margin.right,
    backgroundColor: colors.white,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    color: colors.neutral[900],
  },

  // --- Typography ---
  h1: {
    ...typography.h1,
    color: colors.primary[800],
    marginBottom: spacing.lg,
    marginTop: spacing.xl,
  },
  h2Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  h2Accent: {
    width: accentBar.heading.width,
    height: accentBar.heading.height,
    backgroundColor: colors.accent[500],
    borderRadius: borders.radius.sm,
  },
  h2Text: {
    ...typography.h2,
    color: colors.primary[800],
  },
  h3: {
    ...typography.h3,
    color: colors.primary[700],
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  h4: {
    ...typography.h4,
    color: colors.neutral[700],
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  body: {
    ...typography.body,
    color: colors.neutral[800],
    marginBottom: spacing.sm,
  },
  bodySmall: {
    ...typography.bodySmall,
    color: colors.neutral[600],
  },
  // Deliberately semibold (600), not 700: full bold reads too heavy against
  // 11pt Inter body text. `**bold**` markdown and every styles.bold consumer
  // get this weight.
  bold: {
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
  },
  italic: {
    fontStyle: 'italic',
  },

  // --- Layout helpers ---
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },

  // --- Code blocks ---
  codeBlock: {
    backgroundColor: colors.primary[900],
    borderRadius: borders.radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  codeText: {
    ...typography.code,
    color: colors.neutral[100],
  },
  codeLabel: {
    ...typography.codeSmall,
    color: colors.accent[400],
    marginBottom: spacing.xs,
  },
  inlineCode: {
    ...typography.code,
    backgroundColor: colors.neutral[100],
    color: colors.primary[700],
    borderRadius: borders.radius.sm,
    paddingHorizontal: spacing.xxs + spacing.micro,
    paddingVertical: spacing.micro,
  },

  // --- Callout boxes ---
  tipBox: calloutBox(colors.accent[50], colors.accent[500]),
  tipLabel: calloutLabel(colors.accent[700]),
  warningBox: calloutBox(colors.errorLight, colors.error),
  warningLabel: calloutLabel(colors.error),
  infoBox: calloutBox(colors.infoLight, colors.info),
  infoLabel: calloutLabel(colors.info),

  // --- Lists ---
  listContent: {
    flex: 1,
    ...typography.body,
    color: colors.neutral[800],
  },

  // --- Dividers ---
  dividerAccent: {
    borderBottomWidth: borders.medium,
    borderBottomColor: colors.accent[400],
    marginVertical: spacing.lg,
    width: accentBar.lg.width,
  },

  // --- Table ---
  tableContainer: {
    borderWidth: borders.thin,
    borderColor: colors.neutral[200],
    borderRadius: borders.radius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary[800],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  tableHeaderText: {
    ...typography.bodySmall,
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
    color: colors.white,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: borders.thin,
    borderBottomColor: colors.neutral[100],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  tableRowAlt: {
    flexDirection: 'row',
    borderBottomWidth: borders.thin,
    borderBottomColor: colors.neutral[100],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.neutral[50],
  },
  tableCell: {
    ...typography.bodySmall,
    color: colors.neutral[800],
    lineHeight: lineHeight.normal,
  },
});
