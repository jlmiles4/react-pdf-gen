import { StyleSheet } from '@react-pdf/renderer';
import { colors, typography, spacing, page, borders, fonts, fontScale, fontWeight, lineHeight } from './theme';

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
  pageNoPadding: {
    backgroundColor: colors.white,
    fontFamily: fonts.body,
    fontWeight: fontWeight.regular,
    fontSize: typography.body.fontSize,
    color: colors.neutral[900],
  },

  // --- Typography ---
  display: {
    ...typography.display,
    color: colors.primary[800],
  },
  h1: {
    ...typography.h1,
    color: colors.primary[800],
    marginBottom: spacing.lg,
    marginTop: spacing.xl,
  },
  h2: {
    ...typography.h2,
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
    width: 4,
    height: 22,
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
  caption: {
    ...typography.caption,
    color: colors.neutral[500],
  },
  bold: {
    fontFamily: fonts.bodyBold,
    fontWeight: fontWeight.semibold,
  },
  italic: {
    fontStyle: 'italic',
  },

  // --- Layout helpers ---
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
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
  tipBox: {
    backgroundColor: colors.accent[50],
    borderLeftWidth: borders.thick,
    borderLeftColor: colors.accent[500],
    borderRadius: borders.radius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  tipLabel: {
    ...typography.h4,
    color: colors.accent[700],
    marginBottom: spacing.xs,
  },
  warningBox: {
    backgroundColor: colors.errorLight,
    borderLeftWidth: borders.thick,
    borderLeftColor: colors.error,
    borderRadius: borders.radius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  warningLabel: {
    ...typography.h4,
    color: colors.error,
    marginBottom: spacing.xs,
  },
  infoBox: {
    backgroundColor: colors.primary[50],
    borderLeftWidth: borders.thick,
    borderLeftColor: colors.info,
    borderRadius: borders.radius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  infoLabel: {
    ...typography.h4,
    color: colors.info,
    marginBottom: spacing.xs,
  },

  // --- Lists ---
  listItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
    paddingLeft: spacing.sm,
  },
  listBullet: {
    width: 16,
    ...typography.body,
    color: colors.accent[500],
  },
  listContent: {
    flex: 1,
    ...typography.body,
    color: colors.neutral[800],
  },

  // --- Dividers ---
  divider: {
    borderBottomWidth: borders.thin,
    borderBottomColor: colors.neutral[200],
    marginVertical: spacing.lg,
  },
  dividerAccent: {
    borderBottomWidth: borders.medium,
    borderBottomColor: colors.accent[400],
    marginVertical: spacing.lg,
    width: 60,
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
