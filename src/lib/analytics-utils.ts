export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/**
 * Removes undefined values and truncates string parameters to GA4's 100-char limit.
 */
export function sanitizeAnalyticsParams(
  params?: AnalyticsParams
): Record<string, string | number | boolean> | undefined {
  if (!params) return undefined;

  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    cleaned[key] = typeof value === "string" ? value.slice(0, 100) : value;
  }

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}
