import { describe, it, expect } from "vitest";
import { get, pick, omit, isEmpty, deepMerge } from "./object";

describe("object", () => {
  describe("get", () => {
    const obj = { a: { b: { c: 42 } } };

    it("should get nested value", () => {
      expect(get(obj, "a.b.c")).toBe(42);
    });

    it("should return undefined for missing path", () => {
      expect(get(obj, "a.b.x")).toBeUndefined();
    });

    it("should return default value for missing path", () => {
      expect(get(obj, "a.b.x", "default")).toBe("default");
    });

    it("should handle null intermediate", () => {
      expect(get({ a: null } as any, "a.b", "fallback")).toBe("fallback");
    });
  });

  describe("pick", () => {
    it("should pick specified keys", () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });

    it("should handle empty keys", () => {
      expect(pick({ a: 1, b: 2 }, [])).toEqual({});
    });
  });

  describe("omit", () => {
    it("should omit specified keys", () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ b: 2 });
    });

    it("should return full object when omitting nothing", () => {
      expect(omit({ a: 1, b: 2 }, [])).toEqual({ a: 1, b: 2 });
    });
  });

  describe("isEmpty", () => {
    it("should return true for empty object", () => {
      expect(isEmpty({})).toBe(true);
    });

    it("should return false for non-empty object", () => {
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });

  describe("deepMerge", () => {
    it("should shallow merge flat objects", () => {
      expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it("should deep merge nested objects", () => {
      expect(
        deepMerge({ a: { x: 1 } }, { a: { y: 2 }, b: 3 })
      ).toEqual({ a: { x: 1, y: 2 }, b: 3 });
    });

    it("should override with source value for non-objects", () => {
      expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });
  });
});
