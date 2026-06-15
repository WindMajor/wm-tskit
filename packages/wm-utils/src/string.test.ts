import { describe, it, expect } from "vitest";
import {
  camelToKebab,
  kebabToCamel,
  capitalize,
  truncate,
  randomStr,
  stripWhitespace,
} from "./string";

describe("string", () => {
  describe("camelToKebab", () => {
    it("should convert camelCase to kebab-case", () => {
      expect(camelToKebab("helloWorld")).toBe("hello-world");
    });

    it("should handle single word", () => {
      expect(camelToKebab("hello")).toBe("hello");
    });
  });

  describe("kebabToCamel", () => {
    it("should convert kebab-case to camelCase", () => {
      expect(kebabToCamel("hello-world")).toBe("helloWorld");
    });

    it("should handle single word", () => {
      expect(kebabToCamel("hello")).toBe("hello");
    });
  });

  describe("capitalize", () => {
    it("should capitalize first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
    });

    it("should handle already capitalized", () => {
      expect(capitalize("Hello")).toBe("Hello");
    });
  });

  describe("truncate", () => {
    it("should truncate long string", () => {
      expect(truncate("hello world", 8)).toBe("hello...");
    });

    it("should not truncate short string", () => {
      expect(truncate("hi", 5)).toBe("hi");
    });
  });

  describe("randomStr", () => {
    it("should generate string of given length", () => {
      expect(randomStr(10)).toHaveLength(10);
    });

    it("should default to length 8", () => {
      expect(randomStr()).toHaveLength(8);
    });
  });

  describe("stripWhitespace", () => {
    it("should remove all whitespace", () => {
      expect(stripWhitespace("a b  c\td\ne")).toBe("abcde");
    });
  });
});
