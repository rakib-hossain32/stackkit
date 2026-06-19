import { describe, it, expect } from "vitest";

// Inline the deepMerge implementation for testing
function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const output = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (target[key]) {
        output[key] = deepMerge(
          target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>,
        );
      } else {
        output[key] = source[key];
      }
    } else if (Array.isArray(source[key])) {
      const targetArr = (target[key] as unknown[]) || [];
      const sourceArr = source[key] as unknown[];
      const merged = [...targetArr];
      for (const item of sourceArr) {
        if (typeof item === "object" && item !== null) {
          const exists = merged.some((m) => JSON.stringify(m) === JSON.stringify(item));
          if (!exists) merged.push(item);
        } else {
          if (!merged.includes(item)) merged.push(item);
        }
      }
      output[key] = merged;
    } else {
      output[key] = source[key];
    }
  }

  return output;
}

describe("deepMerge", () => {
  it("should merge simple values", () => {
    const result = deepMerge({ a: 1 }, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("should overwrite with source values", () => {
    const result = deepMerge({ a: 1 }, { a: 2 });
    expect(result).toEqual({ a: 2 });
  });

  it("should deeply merge nested objects", () => {
    const result = deepMerge({ a: { b: 1 } }, { a: { c: 2 } });
    expect(result).toEqual({ a: { b: 1, c: 2 } });
  });

  it("should merge primitive arrays uniquely", () => {
    const result = deepMerge({ arr: ["a", "b"] }, { arr: ["b", "c"] });
    expect(result).toEqual({ arr: ["a", "b", "c"] });
  });

  it("should deduplicate object arrays by JSON equality", () => {
    const target = { items: [{ id: 1 }, { id: 2 }] };
    const source = { items: [{ id: 2 }, { id: 3 }] };
    const result = deepMerge(target, source);
    expect(result).toEqual({ items: [{ id: 1 }, { id: 2 }, { id: 3 }] });
  });

  it("should handle empty target", () => {
    const result = deepMerge({}, { a: 1, b: { c: 2 } });
    expect(result).toEqual({ a: 1, b: { c: 2 } });
  });

  it("should handle empty source", () => {
    const result = deepMerge({ a: 1 }, {});
    expect(result).toEqual({ a: 1 });
  });
});
