import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeAnalyticsParams } from "./analytics-utils.ts";

describe("analytics helpers", () => {
  it("sanitizeAnalyticsParams strips undefined values", () => {
    const result = sanitizeAnalyticsParams({
      source: "hero",
      label: undefined,
      count: 3,
      external: false,
    });

    assert.deepEqual(result, {
      source: "hero",
      count: 3,
      external: false,
    });
  });

  it("sanitizeAnalyticsParams truncates strings to 100 chars", () => {
    const longString = "a".repeat(150);
    const result = sanitizeAnalyticsParams({ label: longString });

    assert.equal(result?.label, "a".repeat(100));
  });

  it("sanitizeAnalyticsParams returns undefined when all values are undefined", () => {
    const result = sanitizeAnalyticsParams({ a: undefined, b: undefined });
    assert.equal(result, undefined);
  });
});
