import { describe, it, expect } from "vitest";
import { deepMerge } from "../utils/deep-merge";

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
