import { describe, it, expect } from "vitest";
import { getType, isArray, isPlainObject, isPromise } from "./is";

describe("is", () => {
  describe("getType", () => {
    it("should return correct type string", () => {
      expect(getType([])).toBe("Array");
      expect(getType({})).toBe("Object");
      expect(getType(42)).toBe("Number");
      expect(getType("str")).toBe("String");
      expect(getType(null)).toBe("Null");
      expect(getType(undefined)).toBe("Undefined");
    });
  });

  describe("isArray", () => {
    it("should return true for arrays", () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
    });

    it("should return false for non-arrays", () => {
      expect(isArray({})).toBe(false);
      expect(isArray("str")).toBe(false);
    });
  });

  describe("isPlainObject", () => {
    it("should return true for plain objects", () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
    });

    it("should return false for arrays", () => {
      expect(isPlainObject([])).toBe(false);
    });

    it("should return false for null", () => {
      expect(isPlainObject(null)).toBe(false);
    });
  });

  describe("isPromise", () => {
    it("should return true for Promise", () => {
      expect(isPromise(Promise.resolve())).toBe(true);
    });

    it("should return false for non-Promise", () => {
      expect(isPromise({})).toBe(false);
      expect(isPromise(42)).toBe(false);
    });
  });
});
